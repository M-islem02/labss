from __future__ import annotations

import argparse
import functools
import json
import mimetypes
import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib import error, request
from urllib.parse import urlparse


EXTRA_TYPES = {
    ".wasm": "application/wasm",
    ".js": "application/javascript; charset=utf-8",
    ".data": "application/octet-stream",
}

GZIP_TYPES = {
    ".js": "application/javascript; charset=utf-8",
    ".wasm": "application/wasm",
    ".data": "application/octet-stream",
    ".json": "application/json; charset=utf-8",
}

SYSTEM_PROMPT = """You are EduVirtuel, a warm educational assistant for Algerian students.
Your role is to help with school science and mathematics, especially physics, electricity, chemistry, biology, and lab activities.

Rules:
- Reply in the same language as the student message. If the user writes in Arabic, answer fully in Arabic. If they write in French, answer fully in French. If they write in English, answer fully in English.
- Keep the tone educational, calm, and encouraging.
- Give efficient, useful answers: explain the idea, then give concrete steps the learner can do now.
- When the question is about a lab, include the goal, needed materials, exact next action, common mistakes, expected observation, and safety when relevant.
- Use clear structure with short headings or numbered steps. Do not answer with only one sentence unless the student asks for something tiny.
- If the student is stuck, diagnose the likely cause and propose 2-4 checks.
- End with a small recap or "what to do next" line.
- If the learner greets you, greet them naturally and invite them to ask about the lesson or experiment.
- Do not claim to have done physical actions in the lab.
- If the request is unrelated to education, gently bring it back to study help.
"""

GEMINI_ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.0-flash:generateContent"
)


def load_dotenv(root: Path) -> None:
    env_path = root / ".env.local"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def sanitize_history(history):
    if not isinstance(history, list):
        return []

    items = []
    for entry in history[-8:]:
        if not isinstance(entry, dict):
            continue
        role = entry.get("role")
        text = entry.get("text")
        if role not in {"user", "assistant"} or not isinstance(text, str):
            continue
        text = text.strip()[:1500]
        if not text:
            continue
        items.append({
            "role": "model" if role == "assistant" else "user",
            "parts": [{"text": text}],
        })
    return items


def extract_reply(data):
    candidates = data.get("candidates")
    if not isinstance(candidates, list) or not candidates:
        return ""
    content = candidates[0].get("content", {})
    parts = content.get("parts")
    if not isinstance(parts, list):
        return ""
    return "".join(
        part.get("text", "") for part in parts if isinstance(part, dict)
    ).strip()


def build_local_fallback(message: str, lab_name: str) -> str:
    lowered = message.lower()
    arabic = any("\u0600" <= char <= "\u06ff" for char in message)

    if arabic:
        if any(word in lowered for word in ["hello", "hi"]) or "مرح" in message or "سلام" in message:
            return f"مرحبا. أنا مساعد تعليمي لمختبر {lab_name}. اسألني عن الهدف، الخطوات، الأخطاء الشائعة، أو تفسير النتيجة."
        return (
            f"مساعد Gemini غير مفعّل بعد. أضف المفتاح في ملف .env.local بهذا الشكل:\n"
            f"GEMINI_API_KEY=ضع_المفتاح_هنا\n"
            f"ثم أعد تشغيل الخادم. بعدها سأساعدك في {lab_name} بشرح تعليمي خطوة بخطوة."
        )

    if any(word in lowered for word in ["bonjour", "salut", "hello", "hi"]):
        return (
            f"Bonjour. Je suis l'assistant educatif du {lab_name}. "
            "Demandez l'objectif, les etapes, les erreurs frequentes ou l'explication du resultat."
        )
    return (
        "Gemini n'est pas encore active. Ajoutez la cle dans `.env.local` ainsi:\n"
        "GEMINI_API_KEY=votre_cle_ici\n"
        "Puis redemarrez le serveur local."
    )

def build_local_fallback(message: str, lab_name: str) -> str:
    lowered = message.lower().strip()
    arabic = any("\u0600" <= char <= "\u06ff" for char in message)

    if arabic:
        if any(word in lowered for word in ["تكلم معي بشكل عادي", "احكي معي عادي"]):
            return f"أكيد. سأتحدث معك بشكل عادي. أنا بخير، شكرا لسؤالك. وإذا أردت، يمكنني أيضا مساعدتك في {lab_name} أو في أي سؤال دراسي."
        if any(word in lowered for word in ["كيف حال", "كيفك"]):
            return "أنا بخير، شكرا لك. كيف يمكنني مساعدتك اليوم في الدراسة أو في التجربة؟"
        if any(word in lowered for word in ["مرحبا", "السلام", "اهلا", "hello", "hi"]):
            return f"مرحبا. أنا هنا للدردشة معك بشكل طبيعي ولمساعدتك أيضا في {lab_name} أو في أي سؤال دراسي."
        return f"يمكنني التحدث معك بشكل طبيعي، ويمكنني أيضا مساعدتك في {lab_name} أو شرح الخطوات والأخطاء الشائعة والنتيجة."

    if any(word in lowered for word in ["talk with me normal", "speak normally"]):
        return f"Of course. I can talk normally with you. I'm doing well, thanks. I can also help you with {lab_name} or any school question."
    if any(word in lowered for word in ["how are you", "how r u"]):
        return "I'm doing well, thank you. How can I help you today with your lesson or experiment?"
    if any(word in lowered for word in ["hello", "hi"]):
        return f"Hello. I'm here to chat normally and also help you with {lab_name} or any school question."
    if any(word in lowered for word in ["parle normalement"]):
        return f"Bien sur. Je peux parler normalement avec vous. Je vais bien, merci. Je peux aussi vous aider dans {lab_name} ou dans une question scolaire."
    if any(word in lowered for word in ["bonjour", "salut"]):
        return f"Bonjour. Je suis la pour discuter normalement avec vous et aussi pour vous aider dans {lab_name}."
    if any(word in lowered for word in ["comment ca va", "comment ça va"]):
        return "Je vais bien, merci. Comment puis-je vous aider aujourd'hui pour votre cours ou votre experience ?"
    return (
        f"Je peux vous aider efficacement dans {lab_name}.\n\n"
        "1. Dites-moi si vous voulez l'objectif, les etapes, l'erreur a corriger ou l'explication du resultat.\n"
        "2. Si vous etes bloque, decrivez ce que vous voyez dans le labo et je vous donne les verifications a faire.\n"
        "3. Pour avancer maintenant : relisez l'etape en cours, placez l'objet demande, puis observez le changement.\n\n"
        "Petit recap : je peux expliquer le cours, guider la manipulation et preparer le quiz final."
    )


def gemini_chat(message: str, history, lab_name: str) -> str:
    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        return build_local_fallback(message, lab_name)

    contents = [
        *sanitize_history(history),
        {"role": "user", "parts": [{"text": message[:3000]}]},
    ]

    payload = {
        "systemInstruction": {"parts": [{"text": f"{SYSTEM_PROMPT}\nCurrent lab context: {lab_name}"}]},
        "contents": contents,
        "generationConfig": {
            "temperature": 0.6,
            "topP": 0.9,
            "maxOutputTokens": 1100,
        },
        "safetySettings": [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ],
    }

    body = json.dumps(payload).encode("utf-8")
    req = request.Request(
        f"{GEMINI_ENDPOINT}?key={api_key}",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))
    except error.HTTPError:
        return build_local_fallback(message, lab_name)
    except error.URLError:
        return build_local_fallback(message, lab_name)
    except Exception:
        return build_local_fallback(message, lab_name)

    reply = extract_reply(data)
    if not reply:
        return build_local_fallback(message, lab_name)
    return reply


class UnityFriendlyHandler(SimpleHTTPRequestHandler):
    server_version = "EduVirtuelLocal/1.0"
    CLEAN_ROUTES = {
        "/admin": "/admin-dashboard.html",
        "/admin/": "/admin-dashboard.html",
    }

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def guess_type(self, path: str) -> str:
        path_obj = Path(path)
        if path_obj.suffix == ".gz":
            inner_suffix = Path(path_obj.stem).suffix
            return GZIP_TYPES.get(inner_suffix, "application/gzip")
        return EXTRA_TYPES.get(path_obj.suffix, mimetypes.guess_type(path)[0] or "application/octet-stream")

    def send_head(self):
        request_path = urlparse(self.path).path
        if request_path in self.CLEAN_ROUTES:
            self.path = self.CLEAN_ROUTES[request_path]

        path = self.translate_path(self.path)
        path_obj = Path(path)

        if path_obj.is_file() and path_obj.suffix == ".gz":
            file_handle = path_obj.open("rb")
            try:
                fs = path_obj.stat()
                self.send_response(200)
                self.send_header("Content-type", self.guess_type(str(path_obj)))
                self.send_header("Content-Encoding", "gzip")
                self.send_header("Content-Length", str(fs.st_size))
                self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
                self.end_headers()
                return file_handle
            except Exception:
                file_handle.close()
                raise

        return super().send_head()

    def do_OPTIONS(self):
        if self.path == "/api/chat":
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.end_headers()
            return
        super().do_OPTIONS()

    def do_POST(self):
        if self.path != "/api/chat":
            self.send_error(404, "Endpoint not found.")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(length).decode("utf-8")
            payload = json.loads(raw_body or "{}")
        except json.JSONDecodeError:
            self._send_json(400, {"error": "Invalid JSON payload."})
            return

        message = payload.get("message", "")
        history = payload.get("history", [])
        lab_name = str(payload.get("labName", "EduVirtuel")).strip() or "EduVirtuel"
        if not isinstance(message, str) or not message.strip():
            self._send_json(400, {"error": "Message is required."})
            return

        try:
            reply = gemini_chat(message.strip(), history, lab_name)
        except Exception as exc:
            self._send_json(500, {"error": str(exc)})
            return

        self._send_json(200, {"reply": reply})

    def _send_json(self, status: int, payload) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the lab locally with Unity-friendly gzip headers.")
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()

    mimetypes.init()
    for suffix, mime_type in EXTRA_TYPES.items():
        mimetypes.add_type(mime_type, suffix)

    directory = str(args.root.resolve())
    load_dotenv(args.root.resolve())
    handler = functools.partial(UnityFriendlyHandler, directory=directory)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    print(f"Serving recovered site at http://127.0.0.1:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
