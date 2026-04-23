from __future__ import annotations

import argparse
import functools
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


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


class UnityFriendlyHandler(SimpleHTTPRequestHandler):
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


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the lab locally with Unity-friendly gzip headers.")
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent)
    args = parser.parse_args()

    mimetypes.init()
    for suffix, mime_type in EXTRA_TYPES.items():
        mimetypes.add_type(mime_type, suffix)

    directory = str(args.root.resolve())
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
