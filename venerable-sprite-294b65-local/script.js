const STORAGE = {
  language: "virtulabLanguage",
  studentName: "studentName",
  studentClass: "studentClass",
  currentLevel: "currentLevel",
  currentSubject: "currentSubject",
  experimentScores: "experimentScores",
  quizScores: "quizScores",
  lastExperiment: "lastExperiment",
  lastResult: "virtulabLastResult",
  teacherLogged: "virtulabTeacherLogged",
  labCodes: "virtulabLabCodes",
  activeLabCode: "virtulabActiveLabCode"
};

const SUBJECTS = {
  primary: [{ id: "science-education", fr: "Education scientifique", ar: "التربية العلمية" }],
  cem: [
    { id: "natural-sciences", fr: "Sciences naturelles", ar: "العلوم الطبيعية" },
    { id: "physics", fr: "Physique", ar: "الفيزياء" }
  ],
  lycee: [
    { id: "svt", fr: "Sciences de la vie et de la Terre", ar: "علوم الطبيعة والحياة" },
    { id: "physics-chemistry", fr: "Physique-Chimie", ar: "فيزياء وكيمياء" },
    { id: "organic-chemistry", fr: "Chimie organique", ar: "الكيمياء العضوية" }
  ]
};

const LEVEL_LABELS = {
  primary: { fr: "Primaire", ar: "ابتدائي" },
  cem: { fr: "CEM", ar: "متوسط" },
  lycee: { fr: "Lycee", ar: "ثانوي" }
};

const SUBJECT_HINTS = {
  "science-education": { fr: "Experiences simples pour observer et comprendre.", ar: "تجارب بسيطة للملاحظة والفهم." },
  "natural-sciences": { fr: "Plantes, eau et observation du vivant.", ar: "النبات والماء وملاحظة الكائنات الحية." },
  physics: { fr: "Circuits, masses et mesures faciles.", ar: "دوائر وكتل وقياسات سهلة." },
  svt: { fr: "Sciences de la vie avec observation.", ar: "علوم الحياة مع الملاحظة." },
  "physics-chemistry": { fr: "Physique et chimie avec un labo 3D.", ar: "فيزياء وكيمياء مع مختبر ثلاثي." },
  "organic-chemistry": { fr: "Chimie plus avancee, etapes de securite.", ar: "كيمياء أكثر تقدما مع خطوات السلامة." }
};

const EXPERIMENT_AUDIENCE = {
  circuit: { levels: ["cem", "lycee"], subjects: ["physics", "physics-chemistry"] },
  plante: { levels: ["primary", "cem", "lycee"], subjects: ["science-education", "natural-sciences", "svt"] },
  masse: { levels: ["primary", "cem"], subjects: ["science-education", "physics"] },
  chimie: { levels: ["lycee"], subjects: ["physics-chemistry", "organic-chemistry"] }
};

const EXPERIMENTS = {
  circuit: {
    id: "circuit",
    title: { fr: "Circuit electrique", ar: "الدائرة الكهربائية" },
    subject: { fr: "Physique", ar: "الفيزياء" },
    intro: {
      fr: "Bienvenue. Nous allons construire un circuit ferme et verifier le bon placement des appareils de mesure.",
      ar: "أهلا بك. سنبني دارة مغلقة ونتحقق من الموضع الصحيح لأجهزة القياس."
    },
    help: {
      fr: "Commence par la boucle principale : pile, lampe, amperemetre et interrupteur. Le voltmetre reste a part en parallele.",
      ar: "ابدأ بالمسار الرئيسي: البطارية والمصباح والأمبيرمتر والمفتاح. أما الفولتميتر فيوضع منفصلا على التوازي."
    },
    next: {
      fr: "Observe l'etape non validee dans la liste et place le composant correspondant.",
      ar: "انظر إلى الخطوة غير المكتملة في القائمة وضع العنصر المناسب لها."
    },
    error: {
      fr: "Rappel : l'amperemetre se branche en serie et le voltmetre en parallele.",
      ar: "تذكير: الأمبيرمتر يوصل على التسلسل، والفولتميتر على التوازي."
    },
    success: {
      fr: "Excellent. La lampe s'allume car le circuit est correctement ferme.",
      ar: "رائع. أضاء المصباح لأن الدارة أغلقت بشكل صحيح."
    },
    defaultTip: {
      fr: "Revois calmement la place des appareils de mesure. L'amperemetre se met en serie et le voltmetre en parallele.",
      ar: "راجع بهدوء موضع أجهزة القياس: الأمبيرمتر على التسلسل والفولتميتر على التوازي."
    },
    quiz: [
      {
        prompt: { fr: "Ou place-t-on l'amperemetre ?", ar: "أين يوضع الأمبيرمتر؟" },
        options: [
          { fr: "En serie dans la boucle", ar: "على التسلسل داخل الدارة" },
          { fr: "En parallele avec la lampe", ar: "على التوازي مع المصباح" },
          { fr: "A l'exterieur du circuit", ar: "خارج الدارة" },
          { fr: "Sur la pile uniquement", ar: "على البطارية فقط" }
        ],
        correct: 0,
        explanation: {
          fr: "L'amperemetre mesure l'intensite qui traverse le circuit, il doit donc etre en serie.",
          ar: "يقيس الأمبيرمتر شدة التيار المار في الدارة، لذلك يجب أن يوصل على التسلسل."
        }
      },
      {
        prompt: { fr: "Le voltmetre se place en parallele.", ar: "يوصل الفولتميتر على التوازي." },
        options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
        correct: 0,
        explanation: {
          fr: "Oui, le voltmetre se branche en derivation pour comparer les potentiels.",
          ar: "نعم، يوصل الفولتميتر على التوازي لمقارنة فرق الجهد."
        }
      },
      {
        prompt: { fr: "Pourquoi la lampe s'allume-t-elle ?", ar: "لماذا يضيء المصباح؟" },
        options: [
          { fr: "Le circuit est ferme", ar: "لأن الدارة مغلقة" },
          { fr: "Le voltmetre est en serie", ar: "لأن الفولتميتر على التسلسل" },
          { fr: "Il n'y a pas de pile", ar: "لأنه لا توجد بطارية" },
          { fr: "Les fils sont deconnectes", ar: "لأن الأسلاك غير موصولة" }
        ],
        correct: 0,
        explanation: {
          fr: "La lampe ne fonctionne que si le courant peut circuler dans une boucle fermee.",
          ar: "لا يضيء المصباح إلا إذا أمكن للتيار أن يدور داخل دارة مغلقة."
        }
      },
      {
        prompt: { fr: "Un interrupteur ouvert laisse passer le courant.", ar: "المفتاح المفتوح يسمح بمرور التيار." },
        options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
        correct: 1,
        explanation: { fr: "Faux : un interrupteur ouvert coupe la boucle.", ar: "خطأ: المفتاح المفتوح يقطع مسار الدارة." }
      },
      {
        prompt: { fr: "Quel element fournit l'energie electrique ?", ar: "أي عنصر يزوّد بالطاقة الكهربائية؟" },
        options: [
          { fr: "La pile", ar: "البطارية" },
          { fr: "La lampe", ar: "المصباح" },
          { fr: "L'amperemetre", ar: "الأمبيرمتر" },
          { fr: "Le fil seul", ar: "السلك فقط" }
        ],
        correct: 0,
        explanation: { fr: "La pile est le generateur du circuit.", ar: "البطارية هي مولد الدارة." }
      }
    ]
  },
  plante: {
    id: "plante",
    title: { fr: "Absorption de l'eau par la plante", ar: "امتصاص الماء عند النبات" },
    subject: { fr: "Sciences naturelles", ar: "العلوم الطبيعية" },
    intro: { fr: "Nous allons montrer que l'eau monte dans la plante a travers des conduits.", ar: "سنبيّن أن الماء يصعد في النبات عبر أوعية ناقلة." },
    help: { fr: "Il faut respecter l'ordre : eau coloree, tige, observation, feuilles puis conclusion.", ar: "يجب احترام الترتيب: ماء ملون، ساق، ملاحظة، أوراق، ثم استنتاج." },
    next: { fr: "Cherche la prochaine action qui n'est pas encore surlignee dans la simulation.", ar: "ابحث عن الإجراء التالي غير المفعّل بعد داخل المحاكاة." },
    error: { fr: "Si tu observes trop tot, tu ne verras pas le trajet de l'eau. Il faut d'abord placer la plante.", ar: "إذا حاولت الملاحظة مبكرا فلن ترى مسار الماء. يجب أولا وضع النبات." },
    success: { fr: "Tres bien. La coloration montre que l'eau circule de la tige vers les feuilles.", ar: "ممتاز. يبيّن التلوّن أن الماء ينتقل من الساق نحو الأوراق." },
    defaultTip: { fr: "Observe le changement de couleur et relie-le au role des vaisseaux conducteurs.", ar: "اربط تغير اللون بدور الأوعية الناقلة في النبات." },
    quiz: []
  },
  masse: {
    id: "masse",
    title: { fr: "Masses et balance", ar: "الكتل والميزان" },
    subject: { fr: "Physique", ar: "الفيزياء" },
    intro: { fr: "Nous allons determiner la masse d'un objet en equilibrant une balance.", ar: "سنحدد كتلة جسم عبر موازنة ميزان." },
    help: { fr: "Pense a additionner les masses proposees jusqu'a 250 g avant de valider.", ar: "حاول جمع الكتل المقترحة حتى تصل إلى 250 غ قبل التأكيد." },
    next: { fr: "Observe la balance. Si elle n'est pas horizontale, ajuste la masse totale.", ar: "راقب الميزان. إذا لم يكن أفقيا فعدّل الكتلة الكلية." },
    error: { fr: "Si la masse totale depasse 250 g, le plateau droit devient trop lourd.", ar: "إذا تجاوزت الكتلة الكلية 250 غ تصبح الكفة اليمنى أثقل." },
    success: { fr: "Parfait. Une balance a l'equilibre montre ici une masse de 250 g.", ar: "ممتاز. توازن الميزان هنا يدل على كتلة قدرها 250 غ." },
    defaultTip: { fr: "Garde une trace des masses ajoutees pour comprendre comment on compense la masse inconnue.", ar: "احتفظ بسجل للكتل المضافة لفهم كيفية موازنة الكتلة المجهولة." },
    quiz: []
  },
  chimie: {
    id: "chimie",
    title: { fr: "Reaction produisant l'hydrogene", ar: "تفاعل إنتاج الهيدروجين" },
    subject: { fr: "Chimie", ar: "الكيمياء" },
    intro: { fr: "Nous allons suivre une reaction simple de production d'hydrogene avec vigilance.", ar: "سنتابع تفاعلا بسيطا لإنتاج الهيدروجين مع احترام احتياطات السلامة." },
    help: { fr: "Securite d'abord : lunettes, zinc, acide, collecte du gaz, puis test final.", ar: "السلامة أولا: النظارات، الزنك، الحمض، جمع الغاز، ثم الاختبار النهائي." },
    next: { fr: "Cherche l'action qui suit logiquement la derniere etape reussie.", ar: "ابحث عن الإجراء الذي يأتي منطقيا بعد آخر خطوة ناجحة." },
    error: { fr: "Un test a la flamme avant la collecte est dangereux et ne permet pas de verifier correctement le gaz.", ar: "إجراء اختبار اللهب قبل جمع الغاز غير آمن ولا يسمح بالتحقق الصحيح منه." },
    success: { fr: "Tres bien. Le test final confirme la presence d'hydrogene apres le degagement gazeux.", ar: "أحسنت. يؤكد الاختبار النهائي وجود الهيدروجين بعد انطلاق الغاز." },
    defaultTip: { fr: "Retenir l'ordre de securite aide a comprendre la reaction sans se precipiter.", ar: "تذكّر ترتيب السلامة يساعد على فهم التفاعل دون تسرع." },
    quiz: []
  }
};

const DEMO_RECORDS = [
  { studentName: "Ahmed B.", classCode: "CEM2026", experimentId: "circuit", score: 85, aiEvaluation: { fr: "Tres bien", ar: "جيد جدا" }, errors: [{ fr: "Placement initial du voltmetre a corriger.", ar: "تم تصحيح موضع الفولتميتر في البداية." }] },
  { studentName: "Sara M.", classCode: "CEM2026", experimentId: "plante", score: 72, aiEvaluation: { fr: "Bien", ar: "جيد" }, errors: [{ fr: "Observation faite avant la preparation complete.", ar: "تمت الملاحظة قبل إنهاء التحضير الكامل." }] },
  { studentName: "Youssef K.", classCode: "LYC2025", experimentId: "chimie", score: 90, aiEvaluation: { fr: "Excellent", ar: "ممتاز" }, errors: [{ fr: "Manipulation maitrissee avec rigueur.", ar: "المناولة كانت متقنة ومنظمة." }] },
  { studentName: "Fatima Z.", classCode: "CEM2026", experimentId: "masse", score: 60, aiEvaluation: { fr: "A renforcer", ar: "يحتاج دعما" }, errors: [{ fr: "Equilibre valide apres plusieurs essais.", ar: "تم الوصول إلى التوازن بعد عدة محاولات." }] }
];

const LAB_DETAILS = {
  circuit: {
    mode: "circuit",
    name: { fr: "Laboratoire electrique", ar: "مختبر الكهرباء" },
    summary: { fr: "Relie au labo 3D des circuits electriques.", ar: "مرتبط بمختبر الدوائر الكهربائية ثلاثي الأبعاد." }
  },
  plante: {
    mode: "biology",
    name: { fr: "Sciences CEM", ar: "علوم CEM" },
    summary: { fr: "Relie au labo 3D des sciences naturelles.", ar: "مرتبط بمختبر العلوم الطبيعية ثلاثي الأبعاد." }
  },
  masse: {
    mode: "physics",
    section: "scale",
    name: { fr: "Physique 3D", ar: "فيزياء ثلاثية الأبعاد" },
    summary: { fr: "Relie au labo 3D de physique.", ar: "مرتبط بمختبر الفيزياء ثلاثي الأبعاد." }
  },
  chimie: {
    mode: "chemistry",
    name: { fr: "Chimie lycee", ar: "كيمياء ثانوي" },
    summary: { fr: "Relie au labo 3D de chimie du lycee.", ar: "مرتبط بمختبر الكيمياء ثلاثي الأبعاد للثانوي." }
  }
};

let experimentRuntime = null;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function currentLanguage() {
  return localStorage.getItem(STORAGE.language) || "fr";
}

function getText(pair) {
  return pair[currentLanguage()] || pair.fr;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function dualText(fr, ar) {
  return `<span class="lang-fr">${escapeHtml(fr)}</span><span class="lang-ar">${escapeHtml(ar)}</span>`;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function scoreToBadge(score) {
  if (score >= 90) return { fr: "Excellent", ar: "ممتاز" };
  if (score >= 75) return { fr: "Tres bien", ar: "جيد جدا" };
  if (score >= 60) return { fr: "Bien", ar: "جيد" };
  return { fr: "A renforcer", ar: "يحتاج دعما" };
}

function clearSession() {
  const language = currentLanguage();
  Object.values(STORAGE).forEach((key) => {
    if (key !== STORAGE.language && key !== STORAGE.labCodes) localStorage.removeItem(key);
  });
  localStorage.setItem(STORAGE.language, language);
}

function updateStudentBadge() {
  const teacherLogged = localStorage.getItem(STORAGE.teacherLogged) === "true";
  const target = document.querySelector("[data-student-display]");
  if (!target) return;
  if (teacherLogged) {
    target.innerHTML = dualText("Espace enseignant", "فضاء الأستاذ");
    return;
  }
  target.innerHTML = dualText("Profil prive", "ملف خاص");
}

function applyLanguage(lang) {
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem(STORAGE.language, lang);
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
  document.querySelectorAll("[data-placeholder-fr]").forEach((input) => {
    input.placeholder = lang === "ar" ? input.dataset.placeholderAr : input.dataset.placeholderFr;
  });
  const frame = document.querySelector("[data-lab-frame]");
  if (frame && document.body.dataset.labMode) {
    const labDetails = getLabDetails(currentExperimentContextId());
    const nextSrc = buildLabViewUrl(document.body.dataset.labMode, lang, labDetails.section || "");
    if (frame.dataset.labLoaded === "true") {
      if (frame.getAttribute("src") !== nextSrc) frame.setAttribute("src", nextSrc);
    } else {
      frame.dataset.labSrc = nextSrc;
    }
  }
  updateStudentBadge();
}

function bindGlobalUi() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
  document.querySelectorAll(".logout-btn").forEach((button) => {
    button.addEventListener("click", () => {
      clearSession();
      window.location.href = "index.html";
    });
  });
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".topbar-nav");
  if (menuButton && nav) menuButton.addEventListener("click", () => nav.classList.toggle("open"));
}

function assistantFallback() {
  return {
    fr: "Je suis la pour vous aider. Posez-moi une question sur votre activite.",
    ar: "أنا هنا لمساعدتك. اطرح أي سؤال حول نشاطك."
  };
}

function getExperimentConfig(experimentId) {
  return EXPERIMENTS[experimentId] || EXPERIMENTS.circuit;
}

function getLabDetails(experimentId) {
  return LAB_DETAILS[experimentId] || LAB_DETAILS.circuit;
}

function currentExperimentContextId() {
  return document.body.dataset.experiment || localStorage.getItem(STORAGE.lastExperiment) || "circuit";
}

function normalizeLabCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function readLabCodes() {
  return readJson(STORAGE.labCodes, []);
}

function writeLabCodes(codes) {
  writeJson(STORAGE.labCodes, codes);
}

function findLabCodeAssignment(code) {
  const normalized = normalizeLabCode(code);
  if (!normalized) return null;
  return readLabCodes().find((item) => normalizeLabCode(item.code) === normalized) || null;
}

function getActiveLabAssignment() {
  return findLabCodeAssignment(localStorage.getItem(STORAGE.activeLabCode));
}

function subjectForExperiment(experimentId, level) {
  const audience = EXPERIMENT_AUDIENCE[experimentId];
  const levelSubjects = SUBJECTS[level] || [];
  if (!audience) return levelSubjects[0] || null;
  return levelSubjects.find((subject) => audience.subjects.includes(subject.id)) || levelSubjects[0] || null;
}

function createReadableLabCode(level, experimentId) {
  const levelPart = String(level || "lab").slice(0, 2).toUpperCase();
  const experimentPart = String(experimentId || "lab").slice(0, 3).toUpperCase();
  let code = "";
  do {
    const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    code = `${levelPart}-${experimentPart}-${randomPart}`;
  } while (findLabCodeAssignment(code));
  return code;
}

function buildLabViewUrl(mode, lang = currentLanguage(), section = "") {
  const params = new URLSearchParams({
    lab: mode,
    lang,
    single: "1"
  });
  if (section) params.set("section", section);
  return `lab-view.html?${params.toString()}`;
}

function isExperimentPage() {
  return document.body.dataset.page === "experiment";
}

function currentIncompleteStep() {
  if (!experimentRuntime) return 1;
  for (let step = 1; step <= 5; step += 1) {
    if (!experimentRuntime.completed.has(step)) return step;
  }
  return 5;
}

function currentStepHint(experimentId) {
  const stepNode = document.querySelector(`.instruction-step[data-step="${currentIncompleteStep()}"] .lang-${currentLanguage()}`);
  if (stepNode) return stepNode.textContent.trim();
  return getText(getExperimentConfig(experimentId).next);
}

function buildAssistantQuickActions() {
  return `
    <div class="assistant-shortcuts">
      <button type="button" class="shortcut-btn" data-assistant-shortcut="objectif">${dualText("Objectif", "الهدف")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="next">${dualText("Etape suivante", "الخطوة التالية")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="error">${dualText("Erreur frequente", "خطأ شائع")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="lab">${dualText("Nom du labo", "اسم المختبر")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="quiz">${dualText("Quiz", "الاختبار")}</button>
    </div>
  `;
}

function assistantGreeting(experimentId) {
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  return getText({
    fr: `Bonjour. Je peux vous guider dans ${config.title.fr}. Ce parcours est relie a ${lab.name.fr}.`,
    ar: `مرحبا. يمكنني مساعدتك في تجربة ${config.title.ar}. هذا المسار مرتبط بـ ${lab.name.ar}.`
  });
}

function getAssistantReply(input, experimentId) {
  const normalized = input.trim().toLowerCase();
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  if (!normalized) return getText(assistantFallback());
  const greetingWords = ["hello", "hi", "bonjour", "salut", "مرحبا", "السلام", "salam"];
  const helpWords = ["help", "aide", "مساعدة"];
  const nextWords = ["next", "suivant", "التالي"];
  const errorWords = ["error", "wrong", "erreur", "خطأ"];
  const objectiveWords = ["objectif", "goal", "objective", "هدف"];
  const labWords = ["lab", "labo", "laboratoire", "مختبر"];
  const quizWords = ["quiz", "test", "اختبار"];
  const finishWords = ["finish", "terminer", "end", "انهاء", "إنهاء"];
  if (greetingWords.some((word) => normalized.includes(word))) return assistantGreeting(experimentId);
  if (helpWords.some((word) => normalized.includes(word))) return getText(config.help);
  if (objectiveWords.some((word) => normalized.includes(word))) return getText(config.intro);
  if (nextWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${config.next.fr} Et maintenant : ${currentStepHint(experimentId)}`,
      ar: `${config.next.ar} والخطوة الحالية هي: ${currentStepHint(experimentId)}`
    });
  }
  if (errorWords.some((word) => normalized.includes(word))) return getText(config.error);
  if (labWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${lab.summary.fr} Ouvrez-le en grand si vous voulez travailler plus confortablement.`,
      ar: `${lab.summary.ar} ويمكنك فتحه بحجم كبير إذا أردت العمل براحة أكبر.`
    });
  }
  if (quizWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Quand vous avez termine la manipulation, cliquez sur le bouton de fin. Le quiz apparait ensuite avec 5 questions simples.",
      ar: "عندما تنهي التجربة اضغط على زر الإنهاء. بعد ذلك يظهر الاختبار وفيه 5 أسئلة بسيطة."
    });
  }
  if (finishWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Validez les etapes que vous avez faites, puis utilisez le bouton de fin sous le labo pour passer au resultat.",
      ar: "أكد الخطوات التي أنجزتها ثم استعمل زر الإنهاء الموجود تحت المختبر للانتقال إلى النتيجة."
    });
  }
  return getText({
    fr: `Je peux vous aider sur l'objectif, l'etape suivante, les erreurs frequentes ou le quiz de ${config.title.fr}.`,
    ar: `يمكنني مساعدتك في الهدف والخطوة التالية والأخطاء الشائعة أو اختبار ${config.title.ar}.`
  });
}

function appendAssistantMessage(container, text, role) {
  const message = document.createElement("div");
  message.className = `assistant-message ${role}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function shortcutLabel(button) {
  const lang = currentLanguage();
  const target = button.querySelector(`.lang-${lang}`);
  return target ? target.textContent.trim() : button.textContent.trim();
}

function createAssistantWidget() {
  if (isExperimentPage()) return;
  const root = document.getElementById("assistant-root");
  if (!root) return;
  root.innerHTML = `
    <div class="assistant-widget">
      <div class="assistant-popover" id="assistant-popover">
        <div class="assistant-header">
          <div>
            <h2>Assistant VirtuLab</h2>
            <p>${dualText("Aide rapide pour la navigation et les experiences.", "مساعدة سريعة للتنقل والتجارب.")}</p>
          </div>
        </div>
        <div class="assistant-messages" id="assistant-widget-messages"></div>
        ${buildAssistantQuickActions()}
        <form class="assistant-form" id="assistant-widget-form">
          <input type="text" id="assistant-widget-input" data-placeholder-fr="Tapez aide / suivant / erreur" data-placeholder-ar="اكتب مساعدة / التالي / خطأ">
          <button type="submit" class="primary-btn">${dualText("Envoyer", "إرسال")}</button>
        </form>
      </div>
      <button class="assistant-launcher" id="assistant-launcher" type="button">
        <span>💬</span>
        <span>${dualText("Assistant VirtuLab", "مساعد VirtuLab")}</span>
      </button>
    </div>
  `;

  const popover = document.getElementById("assistant-popover");
  const launcher = document.getElementById("assistant-launcher");
  const form = document.getElementById("assistant-widget-form");
  const input = document.getElementById("assistant-widget-input");
  const messages = document.getElementById("assistant-widget-messages");
  if (!popover || !launcher || !form || !input || !messages) return;

  input.placeholder = currentLanguage() === "ar" ? input.dataset.placeholderAr : input.dataset.placeholderFr;
  appendAssistantMessage(messages, assistantGreeting(currentExperimentContextId()), "bot");

  launcher.addEventListener("click", () => {
    popover.classList.toggle("open");
    if (popover.classList.contains("open")) input.focus();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendAssistantMessage(messages, value, "user");
    appendAssistantMessage(messages, getAssistantReply(value, currentExperimentContextId()), "bot");
    input.value = "";
  });

  root.querySelectorAll("[data-assistant-shortcut]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = String(button.dataset.assistantShortcut || "");
      appendAssistantMessage(messages, shortcutLabel(button), "user");
      appendAssistantMessage(messages, getAssistantReply(value, currentExperimentContextId()), "bot");
    });
  });
}

function bindEmbeddedAssistant(experimentId) {
  const form = document.querySelector("[data-assistant-form]");
  const input = document.querySelector("[data-assistant-input]");
  const messages = document.querySelector("[data-assistant-messages]");
  const scope = form ? (form.closest(".assistant-panel") || form.parentElement) : null;
  if (!form || !input || !messages) return;
  appendAssistantMessage(messages, assistantGreeting(experimentId), "bot");
  appendAssistantMessage(messages, getText(getLabDetails(experimentId).summary), "bot");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendAssistantMessage(messages, value, "user");
    appendAssistantMessage(messages, getAssistantReply(value, experimentId), "bot");
    input.value = "";
  });
  (scope ? scope.querySelectorAll("[data-assistant-shortcut]") : []).forEach((button) => {
    button.addEventListener("click", () => {
      const value = String(button.dataset.assistantShortcut || "");
      appendAssistantMessage(messages, shortcutLabel(button), "user");
      appendAssistantMessage(messages, getAssistantReply(value, experimentId), "bot");
    });
  });
}

function setStatus(text) {
  const target = document.querySelector("[data-experiment-status]");
  if (target) target.textContent = text;
}

function markStep(step, done) {
  if (!experimentRuntime || step === 0) return;
  if (done) experimentRuntime.completed.add(step);
  else experimentRuntime.completed.delete(step);
  document.querySelectorAll(".instruction-step").forEach((item) => {
    item.classList.toggle("done", experimentRuntime.completed.has(Number(item.dataset.step)));
  });
  const progressFill = document.querySelector("[data-progress-fill]");
  const indicator = document.querySelector("[data-step-indicator]");
  if (progressFill) progressFill.style.width = `${(experimentRuntime.completed.size / 5) * 100}%`;
  if (indicator) {
    const currentStep = Math.min(experimentRuntime.completed.size + 1, 5);
    indicator.innerHTML = dualText(`Etape ${currentStep} sur 5`, `الخطوة ${currentStep} من 5`);
  }
}

function addExperimentMessage(text) {
  const messages = document.querySelector("[data-assistant-messages]");
  if (messages) appendAssistantMessage(messages, text, "bot");
}

function registerMistake(messagePair) {
  if (!experimentRuntime) return;
  const key = `${messagePair.fr}__${messagePair.ar}`;
  if (!experimentRuntime.mistakeKeys.has(key)) {
    experimentRuntime.mistakeKeys.add(key);
    experimentRuntime.mistakes.push(messagePair);
  }
  const text = getText(messagePair);
  setStatus(text);
  addExperimentMessage(text);
}

function initializeExperimentRuntime(experimentId) {
  experimentRuntime = {
    id: experimentId,
    completed: new Set(),
    mistakes: [],
    mistakeKeys: new Set(),
    seconds: 0,
    timerHandle: null
  };
  const timer = document.querySelector("[data-timer]");
  if (timer) {
    timer.textContent = "00:00";
    experimentRuntime.timerHandle = window.setInterval(() => {
      experimentRuntime.seconds += 1;
      timer.textContent = formatTime(experimentRuntime.seconds);
    }, 1000);
  }
}

function loadEmbeddedLab(frame, labMode, section = "") {
  if (!frame) return;
  const nextSrc = buildLabViewUrl(labMode, currentLanguage(), section);
  frame.dataset.labLoaded = "true";
  frame.dataset.labSrc = nextSrc;
  frame.classList.remove("is-idle");
  if (frame.getAttribute("src") !== nextSrc) frame.setAttribute("src", nextSrc);
}

function computeExperimentScore() {
  if (!experimentRuntime) return 0;
  const score = experimentRuntime.completed.size * 18 + Math.max(0, 20 - experimentRuntime.mistakes.length * 5);
  return Math.max(30, Math.min(100, score));
}

function persistExperimentResult() {
  const experimentId = experimentRuntime.id;
  const config = getExperimentConfig(experimentId);
  const score = computeExperimentScore();
  const badge = scoreToBadge(score);
  const scores = readJson(STORAGE.experimentScores, {});
  scores[experimentId] = score;
  writeJson(STORAGE.experimentScores, scores);
  localStorage.setItem(STORAGE.lastExperiment, experimentId);
  writeJson(STORAGE.lastResult, {
    experimentId,
    score,
    badge,
    title: config.title,
    stepsCompleted: experimentRuntime.completed.size,
    errors: experimentRuntime.mistakes,
    elapsedSeconds: experimentRuntime.seconds,
    tip: experimentRuntime.mistakes[0] || config.defaultTip
  });
}

function finishExperiment() {
  persistExperimentResult();
  if (experimentRuntime && experimentRuntime.timerHandle) window.clearInterval(experimentRuntime.timerHandle);
  window.location.href = "result.html";
}

function ensureStudentSession() {
  const protectedPages = new Set(["dashboard", "experiences", "experiment", "result", "quiz"]);
  const pageId = document.body.dataset.page;
  if (!protectedPages.has(pageId)) return true;
  if (localStorage.getItem(STORAGE.studentName)) return true;
  window.location.href = "student.html";
  return false;
}

function experimentMatchesSelection(experimentId, level, subjectId, exactSubject = true) {
  const audience = EXPERIMENT_AUDIENCE[experimentId];
  if (!audience) return true;
  const levelMatches = audience.levels.includes(level);
  const subjectMatches = !subjectId || audience.subjects.includes(subjectId);
  return exactSubject ? levelMatches && subjectMatches : levelMatches;
}

function visibleExperimentIds(level, subjectId) {
  const ids = Object.keys(EXPERIMENT_AUDIENCE);
  const exact = ids.filter((id) => experimentMatchesSelection(id, level, subjectId, true));
  if (exact.length) return exact;
  return ids.filter((id) => experimentMatchesSelection(id, level, subjectId, false));
}

function initIndex() {
  const loader = document.getElementById("loading-screen");
  const main = document.getElementById("main-content");
  if (main) {
    main.style.opacity = "0";
    main.style.transition = "opacity 0.35s ease";
  }
  window.setTimeout(() => {
    if (loader) loader.classList.add("hidden");
    if (main) main.style.opacity = "1";
  }, 550);
}

function initStudentForm() {
  const form = document.getElementById("student-form");
  if (!form) return;
  const levelInput = form.querySelector('input[name="level"]');
  const levelButtons = form.querySelectorAll("[data-level-choice]");
  const savedLevel = localStorage.getItem(STORAGE.currentLevel) || "cem";

  function selectLevel(level) {
    if (levelInput) levelInput.value = level;
    levelButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.levelChoice === level);
    });
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const enteredCode = normalizeLabCode(data.get("classCode"));
    const assignment = findLabCodeAssignment(enteredCode);
    const classCode = enteredCode || "CEM2026";
    const level = String(data.get("level") || "").trim() || "cem";
    if (!firstName) {
      alert(getText({ fr: "Ecris ton prenom pour continuer.", ar: "اكتب اسمك للمتابعة." }));
      return;
    }
    localStorage.setItem(STORAGE.studentName, `${firstName} ${lastName}`.trim());
    localStorage.setItem(STORAGE.studentClass, classCode);
    localStorage.setItem(STORAGE.currentLevel, assignment ? assignment.level : level);
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);

    if (assignment) {
      const subject = subjectForExperiment(assignment.experimentId, assignment.level);
      if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
      localStorage.setItem(STORAGE.activeLabCode, assignment.code);
      window.location.href = `experiences.html?code=${encodeURIComponent(assignment.code)}`;
      return;
    }

    window.location.href = "dashboard.html";
  });
}

function renderSubjects(level) {
  const subjectGrid = document.getElementById("subject-grid");
  if (!subjectGrid) return;
  const assignment = getActiveLabAssignment();
  if (assignment && assignment.level === level) {
    const subject = subjectForExperiment(assignment.experimentId, assignment.level);
    const experiment = getExperimentConfig(assignment.experimentId);
    subjectGrid.classList.remove("empty-state");
    subjectGrid.innerHTML = `
      <button type="button" class="selection-card subject-card active" data-code="${escapeHtml(assignment.code)}">
        <strong>${dualText("Activite de ton professeur", "نشاط أستاذك")}</strong>
        <span class="subject-hint">${escapeHtml(getText(experiment.title))}</span>
        <span>${dualText(`Code : ${assignment.code}`, `الرمز: ${assignment.code}`)}</span>
      </button>
    `;
    const card = subjectGrid.querySelector("[data-code]");
    if (card) {
      card.addEventListener("click", () => {
        if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
        window.location.href = `experiences.html?code=${encodeURIComponent(assignment.code)}`;
      });
    }
    return;
  }
  const subjects = SUBJECTS[level] || [];
  subjectGrid.classList.remove("empty-state");
  subjectGrid.innerHTML = subjects.map((subject) => {
    const hint = SUBJECT_HINTS[subject.id] || { fr: "Choisissez cette matiere pour continuer.", ar: "اختر هذه المادة للمتابعة." };
    return `
      <button type="button" class="selection-card subject-card" data-level="${level}" data-subject="${subject.id}">
        <strong>${dualText(subject.fr, subject.ar)}</strong>
        <span class="subject-hint">${dualText(hint.fr, hint.ar)}</span>
        <span>${dualText("Voir mes experiences", "عرض تجاربي")}</span>
      </button>
    `;
  }).join("");
  document.querySelectorAll(".subject-card").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSubject = SUBJECTS[level].find((subject) => subject.id === button.dataset.subject);
      localStorage.setItem(STORAGE.currentLevel, level);
      localStorage.setItem(STORAGE.currentSubject, JSON.stringify(selectedSubject));
      window.location.href = `experiences.html?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(button.dataset.subject)}`;
    });
  });
}

function initDashboard() {
  const welcome = document.querySelector("[data-dashboard-welcome]");
  const studentName = localStorage.getItem(STORAGE.studentName) || "";
  if (welcome) {
    welcome.innerHTML = studentName
      ? dualText(`Bienvenue ${studentName}. Choisissez votre niveau puis votre matiere.`, `مرحبا ${studentName}. اختر مستواك ثم المادة.`)
      : dualText("Choisissez votre niveau puis votre matiere.", "اختر مستواك ثم المادة.");
  }
  const savedLevel = localStorage.getItem(STORAGE.currentLevel) || "cem";
  document.querySelectorAll(".level-card").forEach((button) => {
    if (button.dataset.level === savedLevel) button.classList.add("active");
    button.addEventListener("click", () => {
      document.querySelectorAll(".level-card").forEach((card) => card.classList.remove("active"));
      button.classList.add("active");
      localStorage.setItem(STORAGE.currentLevel, button.dataset.level);
      renderSubjects(button.dataset.level);
    });
  });
  if (savedLevel) renderSubjects(savedLevel);
}

function parseSavedSubject() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.currentSubject) || "null");
  } catch (error) {
    return null;
  }
}

function initExperiences() {
  const summary = document.querySelector("[data-experiences-summary]");
  if (!summary) return;
  const params = new URLSearchParams(window.location.search);
  const assignment = findLabCodeAssignment(params.get("code")) || getActiveLabAssignment();
  const level = assignment ? assignment.level : (params.get("level") || localStorage.getItem(STORAGE.currentLevel) || "cem");
  let subject = parseSavedSubject();
  const subjectId = assignment ? (subjectForExperiment(assignment.experimentId, assignment.level)?.id || "") : params.get("subject");
  if (subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || subject;
  if (!subject && subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || null;
  if (!subject) subject = (SUBJECTS[level] || [])[0] || { fr: "Physique", ar: "الفيزياء" };
  localStorage.setItem(STORAGE.currentLevel, level);
  localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
  if (assignment) localStorage.setItem(STORAGE.activeLabCode, assignment.code);
  const selectedSubjectId = subject.id || subjectId || "";
  const visibleIds = assignment ? [assignment.experimentId] : visibleExperimentIds(level, selectedSubjectId);
  document.querySelectorAll("[data-experiment-card]").forEach((card) => {
    card.hidden = !visibleIds.includes(card.dataset.experimentCard);
  });
  if (assignment) {
    const experiment = getExperimentConfig(assignment.experimentId);
    summary.innerHTML = dualText(
      `Code ${assignment.code} : une seule activite assignee par le professeur, ${experiment.title.fr}.`,
      `الرمز ${assignment.code}: نشاط واحد فقط حدده الأستاذ، ${experiment.title.ar}.`
    );
  } else {
    summary.innerHTML = dualText(
      `Voici ${visibleIds.length} experience(s) pour ${LEVEL_LABELS[level].fr} - ${subject.fr}.`,
      `هذه ${visibleIds.length} تجربة مناسبة لـ ${LEVEL_LABELS[level].ar} - ${subject.ar}.`
    );
  }
}

function initEmbeddedLabExperiment() {
  const experimentId = document.body.dataset.experiment;
  const labMode = document.body.dataset.labMode || getLabDetails(experimentId).mode;
  const lab = getLabDetails(experimentId);
  const labSection = lab.section || "";
  const frame = document.querySelector("[data-lab-frame]");
  const loadButton = document.querySelector("[data-load-lab]");
  const finishButton = document.querySelector("[data-finish-experiment]");
  const openButton = document.querySelector("[data-open-lab-full]");

  initializeExperimentRuntime(experimentId);
  bindEmbeddedAssistant(experimentId);

  if (frame) {
    frame.dataset.labSrc = buildLabViewUrl(labMode, currentLanguage(), labSection);
    frame.classList.add("is-idle");
    frame.addEventListener("load", () => {
      markStep(1, true);
      setStatus(getText({
        fr: `${lab.name.fr} est charge. Vous pouvez commencer la manipulation.`,
        ar: `تم تحميل ${lab.name.ar}. يمكنك الآن بدء المناولة.`
      }));
    });
  }

  if (loadButton && frame) {
    loadButton.addEventListener("click", () => {
      loadButton.disabled = true;
      loadEmbeddedLab(frame, labMode, labSection);
      setStatus(getText({
        fr: `Chargement de ${lab.name.fr} en cours...`,
        ar: `جار تحميل ${lab.name.ar}...`
      }));
    });
  }

  document.querySelectorAll("[data-step-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      if (frame && frame.dataset.labLoaded !== "true") {
        setStatus(getText({
          fr: "Chargez d'abord le labo 3D pour garder la page plus rapide.",
          ar: "قم أولا بتحميل المختبر الثلاثي الأبعاد حتى تبقى الصفحة أسرع."
        }));
        return;
      }
      const step = Number(button.dataset.stepComplete);
      const isActive = !button.classList.contains("active");
      button.classList.toggle("active", isActive);
      markStep(step, isActive);
      setStatus(getText({
        fr: "Etape enregistree. Continuez dans le labo 3D puis terminez quand vous etes pret.",
        ar: "تم تسجيل الخطوة. واصل داخل المختبر الثلاثي الأبعاد ثم أنهِ النشاط عندما تصبح جاهزًا."
      }));
    });
  });

  if (openButton) {
    openButton.addEventListener("click", () => {
      window.open(buildLabViewUrl(labMode, currentLanguage(), labSection), "_blank", "noopener");
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      if (frame && frame.dataset.labLoaded !== "true") {
        setStatus(getText({
          fr: "Chargez et utilisez d'abord le labo 3D avant de terminer l'experience.",
          ar: "قم أولا بتحميل واستعمال المختبر الثلاثي الأبعاد قبل إنهاء التجربة."
        }));
        return;
      }
      markStep(5, true);
      finishExperiment();
    });
  }

  setStatus(getText({
    fr: `Le labo 3D ne se charge pas au debut pour accelerer la page. Cliquez sur "Demarrer le labo 3D" quand vous etes pret.`,
    ar: `لا يتم تحميل المختبر الثلاثي الأبعاد في البداية حتى تصبح الصفحة أسرع. اضغط على "بدء المختبر الثلاثي الأبعاد" عندما تصبح جاهزا.`
  }));
}

function labelForComponent(component) {
  const labels = {
    battery: { fr: "Pile", ar: "البطارية" },
    switch: { fr: "Interrupteur", ar: "المفتاح" },
    ammeter: { fr: "Amperemetre", ar: "الأمبيرمتر" },
    bulb: { fr: "Lampe", ar: "المصباح" },
    voltmeter: { fr: "Voltmetre", ar: "الفولتميتر" }
  };
  return labels[component] || { fr: "Zone libre", ar: "منطقة فارغة" };
}

function setSlotLabel(button, slotName, component) {
  if (!button) return;
  if (!component) {
    button.classList.remove("filled");
    button.innerHTML = slotName === "parallel"
      ? dualText("Branche parallele", "فرع مواز")
      : dualText(`Serie ${slotName.replace("series", "")}`, `تسلسل ${slotName.replace("series", "")}`);
    return;
  }
  button.classList.add("filled");
  button.innerHTML = dualText(labelForComponent(component).fr, labelForComponent(component).ar);
}

function initCircuitExperiment() {
  initializeExperimentRuntime("circuit");
  bindEmbeddedAssistant("circuit");
  const state = {
    selected: null,
    slots: { series1: null, series2: null, series3: null, series4: null, parallel: null },
    wiresConnected: false,
    switchClosed: false
  };
  const selectedBox = document.querySelector("[data-selected-component]");
  const bulb = document.querySelector("[data-bulb-visual]");

  function updateSelectedBox() {
    if (!selectedBox) return;
    selectedBox.innerHTML = state.selected
      ? dualText(`Composant choisi : ${labelForComponent(state.selected).fr}`, `العنصر المختار: ${labelForComponent(state.selected).ar}`)
      : dualText("Aucun composant selectionne.", "لم يتم اختيار أي عنصر.");
  }

  function refreshCircuitStatus() {
    const seriesValues = Object.keys(state.slots).filter((key) => key.startsWith("series")).map((key) => state.slots[key]);
    const batteryInSeries = seriesValues.includes("battery");
    const bulbInSeries = seriesValues.includes("bulb");
    const ammeterInSeries = seriesValues.includes("ammeter");
    const switchInSeries = seriesValues.includes("switch");
    const voltmeterParallel = state.slots.parallel === "voltmeter";
    const ammeterParallel = state.slots.parallel === "ammeter";
    const voltmeterSeries = seriesValues.includes("voltmeter");

    markStep(1, batteryInSeries);
    markStep(2, bulbInSeries);
    markStep(3, ammeterInSeries && !ammeterParallel);
    markStep(4, voltmeterParallel && !voltmeterSeries);
    markStep(5, state.wiresConnected && state.switchClosed && switchInSeries);

    if (ammeterParallel) registerMistake({ fr: "Attention : l'amperemetre ne doit pas etre sur la branche parallele.", ar: "انتبه: لا يجب وضع الأمبيرمتر على الفرع الموازي." });
    if (voltmeterSeries) registerMistake({ fr: "Le voltmetre ne se place pas en serie dans cette experience.", ar: "لا يوضع الفولتميتر على التسلسل في هذه التجربة." });

    const success = batteryInSeries && bulbInSeries && ammeterInSeries && switchInSeries && voltmeterParallel && state.wiresConnected && state.switchClosed;
    if (bulb) bulb.classList.toggle("on", success);
    setStatus(success ? getText(getExperimentConfig("circuit").success) : getText({ fr: "Construisez la boucle principale puis verifiez la branche parallele.", ar: "ابن الحلقة الرئيسية ثم تحقق من الفرع الموازي." }));
  }

  document.querySelectorAll(".component-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".component-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.selected = button.dataset.component;
      updateSelectedBox();
    });
  });

  document.querySelectorAll(".slot-btn").forEach((slotButton) => {
    setSlotLabel(slotButton, slotButton.dataset.slot, null);
    slotButton.addEventListener("click", () => {
      if (!state.selected) {
        setStatus(getText({ fr: "Selectionnez un composant avant de choisir une zone.", ar: "اختر عنصرا قبل اختيار المنطقة." }));
        return;
      }
      Object.keys(state.slots).forEach((key) => {
        if (state.slots[key] === state.selected) {
          state.slots[key] = null;
          setSlotLabel(document.querySelector(`[data-slot="${key}"]`), key, null);
        }
      });
      state.slots[slotButton.dataset.slot] = state.selected;
      setSlotLabel(slotButton, slotButton.dataset.slot, state.selected);
      refreshCircuitStatus();
    });
  });

  document.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.toggle === "wires") state.wiresConnected = !state.wiresConnected;
      if (button.dataset.toggle === "switch") state.switchClosed = !state.switchClosed;
      button.classList.toggle("active");
      refreshCircuitStatus();
    });
  });

  const reset = document.querySelector('[data-action="reset-circuit"]');
  if (reset) {
    reset.addEventListener("click", () => {
      state.selected = null;
      state.wiresConnected = false;
      state.switchClosed = false;
      state.slots = { series1: null, series2: null, series3: null, series4: null, parallel: null };
      document.querySelectorAll(".component-btn, [data-toggle]").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".slot-btn").forEach((slotButton) => setSlotLabel(slotButton, slotButton.dataset.slot, null));
      updateSelectedBox();
      refreshCircuitStatus();
    });
  }

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  updateSelectedBox();
  refreshCircuitStatus();
}

function initPlantExperiment() {
  initializeExperimentRuntime("plante");
  bindEmbeddedAssistant("plante");
  const visual = document.querySelector(".plant-visual");
  const note = document.querySelector("[data-plant-note]");
  const state = { prepared: false, placed: false, observed: false, inspected: false, concluded: false };

  function setStage(stage) {
    if (visual) visual.className = `plant-visual stage-${stage}`;
  }

  document.querySelectorAll(".action-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "prepare-water") {
        state.prepared = true;
        markStep(1, true);
        setStage(1);
        setStatus(getText({ fr: "L'eau coloree est prete.", ar: "الماء الملون جاهز." }));
        return;
      }
      if (action === "place-plant") {
        if (!state.prepared) return registerMistake({ fr: "Prepare d'abord l'eau coloree.", ar: "حضّر الماء الملون أولا." });
        state.placed = true;
        markStep(2, true);
        setStage(2);
        setStatus(getText({ fr: "La tige est bien placee dans le becher.", ar: "تم وضع الساق بشكل صحيح داخل الكأس." }));
        return;
      }
      if (action === "observe-stem") {
        if (!state.placed) return registerMistake({ fr: "Place la tige avant d'observer.", ar: "ضع الساق قبل الملاحظة." });
        state.observed = true;
        markStep(3, true);
        setStage(3);
        if (note) note.innerHTML = dualText("Observation : la coloration monte progressivement dans la tige.", "الملاحظة: يصعد اللون تدريجيا داخل الساق.");
        setStatus(getText({ fr: "La coloration devient visible dans la tige.", ar: "أصبح اللون واضحا في الساق." }));
        return;
      }
      if (action === "inspect-leaf") {
        if (!state.observed) return registerMistake({ fr: "Observe la tige avant d'inspecter les feuilles.", ar: "لاحظ الساق أولا قبل فحص الأوراق." });
        state.inspected = true;
        markStep(4, true);
        setStage(4);
        if (note) note.innerHTML = dualText("Observation : les nervures des feuilles montrent le passage de l'eau coloree.", "الملاحظة: عروق الأوراق تبين مرور الماء الملون.");
        setStatus(getText({ fr: "Les feuilles confirment le transport de l'eau.", ar: "تؤكد الأوراق انتقال الماء داخل النبات." }));
        return;
      }
      if (action === "conclude-plant") {
        if (!state.inspected) return registerMistake({ fr: "Inspecte les feuilles avant de conclure.", ar: "افحص الأوراق قبل كتابة الاستنتاج." });
        state.concluded = true;
        markStep(5, true);
        if (note) note.innerHTML = dualText("Conclusion : la plante absorbe l'eau et la transporte vers les feuilles par des vaisseaux conducteurs.", "الاستنتاج: يمتص النبات الماء وينقله نحو الأوراق عبر أوعية ناقلة.");
        setStatus(getText(getExperimentConfig("plante").success));
      }
    });
  });

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  setStatus(getText({ fr: "Commencez par preparer l'eau coloree.", ar: "ابدأ بتحضير الماء الملون." }));
}

function initMassExperiment() {
  initializeExperimentRuntime("masse");
  bindEmbeddedAssistant("masse");
  const visual = document.querySelector(".balance-visual");
  const totalNode = document.querySelector("[data-weight-total]");
  const state = { selectedObject: false, weights: [], validated: false, target: 250 };

  function total() {
    return state.weights.reduce((sum, value) => sum + value, 0);
  }

  function refreshBalance() {
    const current = total();
    if (totalNode) totalNode.textContent = `${current} g`;
    if (visual) {
      visual.classList.remove("left-heavy", "right-heavy");
      if (current < state.target) visual.classList.add("left-heavy");
      else if (current > state.target) visual.classList.add("right-heavy");
    }
    markStep(2, current > 0);
    markStep(3, current === state.target);
    if (current > state.target) registerMistake({ fr: "La masse totale depasse 250 g. Retire une masse.", ar: "الكتلة الكلية تجاوزت 250 غ. انزع كتلة واحدة." });
    else setStatus(getText({ fr: "Ajustez les masses pour atteindre 250 g.", ar: "عدّل الكتل حتى تصل إلى 250 غ." }));
  }

  document.querySelector('[data-action="select-object"]').addEventListener("click", () => {
    state.selectedObject = true;
    markStep(1, true);
    setStatus(getText({ fr: "Objet mystere pret a etre mesure.", ar: "الجسم المجهول جاهز للقياس." }));
  });

  document.querySelectorAll(".weight-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.selectedObject) return registerMistake({ fr: "Selectionnez d'abord l'objet mystere.", ar: "اختر الجسم المجهول أولا." });
      state.weights.push(Number(button.dataset.weight));
      refreshBalance();
    });
  });

  document.querySelector('[data-action="remove-weight"]').addEventListener("click", () => {
    state.weights.pop();
    refreshBalance();
  });

  document.querySelector('[data-action="reset-scale"]').addEventListener("click", () => {
    state.weights = [];
    state.validated = false;
    markStep(4, false);
    markStep(5, false);
    refreshBalance();
  });

  document.querySelector('[data-action="validate-balance"]').addEventListener("click", () => {
    if (total() !== state.target) return registerMistake({ fr: "La balance n'est pas encore a l'equilibre exact.", ar: "الميزان ليس في حالة توازن دقيق بعد." });
    state.validated = true;
    markStep(4, true);
    setStatus(getText({ fr: "Equilibre valide : la masse de l'objet est de 250 g.", ar: "تم تأكيد التوازن: كتلة الجسم هي 250 غ." }));
  });

  document.querySelector('[data-action="record-mass"]').addEventListener("click", () => {
    if (!state.validated) return registerMistake({ fr: "Validez l'equilibre avant de noter la conclusion.", ar: "أكد التوازن قبل كتابة الاستنتاج." });
    markStep(5, true);
    setStatus(getText(getExperimentConfig("masse").success));
  });

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  refreshBalance();
}

function initChemistryExperiment() {
  initializeExperimentRuntime("chimie");
  bindEmbeddedAssistant("chimie");
  const visual = document.querySelector(".chemistry-visual");
  const note = document.querySelector("[data-chemistry-note]");
  const state = { goggles: false, zinc: false, acid: false, gas: false, flame: false };

  function setChemistryStage(stage) {
    if (visual) visual.className = `chemistry-visual stage-${stage}`;
  }

  document.querySelectorAll(".chemistry-grid .action-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "wear-goggles") {
        state.goggles = true;
        markStep(1, true);
        setChemistryStage(1);
        setStatus(getText({ fr: "Protection activee, vous pouvez preparer les reactifs.", ar: "تم تفعيل الحماية، يمكنك تحضير المتفاعلات." }));
        return;
      }
      if (action === "add-zinc") {
        if (!state.goggles) return registerMistake({ fr: "Mettez les lunettes avant toute manipulation.", ar: "ضع النظارات قبل أي مناولة." });
        state.zinc = true;
        markStep(2, true);
        setChemistryStage(2);
        setStatus(getText({ fr: "Le zinc est dans le ballon.", ar: "تم وضع الزنك في الدورق." }));
        return;
      }
      if (action === "add-acid") {
        if (!state.zinc) return registerMistake({ fr: "Ajoutez d'abord le zinc avant l'acide.", ar: "أضف الزنك أولا قبل الحمض." });
        state.acid = true;
        markStep(3, true);
        setChemistryStage(3);
        if (note) note.innerHTML = dualText("Observation : des bulles apparaissent, signe d'un degagement gazeux.", "الملاحظة: تظهر فقاعات، وهذا يدل على انطلاق غاز.");
        setStatus(getText({ fr: "La reaction commence et des bulles apparaissent.", ar: "بدأ التفاعل وظهرت الفقاعات." }));
        return;
      }
      if (action === "collect-gas") {
        if (!state.acid) return registerMistake({ fr: "Attendez le degagement gazeux avant la collecte.", ar: "انتظر انطلاق الغاز قبل جمعه." });
        state.gas = true;
        markStep(4, true);
        setChemistryStage(4);
        if (note) note.innerHTML = dualText("Observation : le gaz produit est recueilli pour verification.", "الملاحظة: تم جمع الغاز الناتج للتحقق منه.");
        setStatus(getText({ fr: "Le gaz est collecte avec precaution.", ar: "تم جمع الغاز بحذر." }));
        return;
      }
      if (action === "test-flame") {
        if (!state.gas) return registerMistake({ fr: "Recueillez d'abord le gaz avant le test a la flamme.", ar: "اجمع الغاز أولا قبل اختبار اللهب." });
        state.flame = true;
        markStep(5, true);
        setChemistryStage(5);
        if (note) note.innerHTML = dualText("Conclusion : le test final confirme la presence d'hydrogene.", "الاستنتاج: يؤكد الاختبار النهائي وجود الهيدروجين.");
        setStatus(getText(getExperimentConfig("chimie").success));
      }
    });
  });

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  setStatus(getText({ fr: "Commencez par mettre les lunettes de protection.", ar: "ابدأ بوضع نظارات الحماية." }));
}

function initExperimentPage() {
  if (document.querySelector("[data-lab-frame]")) {
    initEmbeddedLabExperiment();
    return;
  }
  const experimentId = document.body.dataset.experiment;
  if (experimentId === "circuit") initCircuitExperiment();
  if (experimentId === "plante") initPlantExperiment();
  if (experimentId === "masse") initMassExperiment();
  if (experimentId === "chimie") initChemistryExperiment();
}

function initResultPage() {
  const result = readJson(STORAGE.lastResult, null);
  if (!result) return (window.location.href = "experiences.html");
  const title = document.querySelector("[data-result-title]");
  const score = document.querySelector("[data-result-score]");
  const badge = document.querySelector("[data-result-badge]");
  const summary = document.querySelector("[data-result-summary]");
  const tip = document.querySelector("[data-result-tip]");
  const steps = document.querySelector("[data-result-steps]");
  const errors = document.querySelector("[data-result-errors]");
  if (title) title.textContent = getText(result.title);
  if (score) score.textContent = result.score;
  if (badge) badge.textContent = getText(result.badge);
  if (summary) summary.textContent = getText({ fr: `Vous avez complete ${result.stepsCompleted} etapes sur 5 avec un score de ${result.score}/100.`, ar: `أكملت ${result.stepsCompleted} خطوات من أصل 5 بنتيجة ${result.score}/100.` });
  if (tip) tip.textContent = getText(result.tip);
  if (steps) steps.textContent = String(result.stepsCompleted);
  if (errors) errors.textContent = String(result.errors.length);
}

EXPERIMENTS.plante.quiz = [
  {
    prompt: { fr: "Pourquoi utilise-t-on une eau coloree ?", ar: "لماذا نستعمل ماء ملونا؟" },
    options: [
      { fr: "Pour voir son trajet dans la plante", ar: "لرؤية مساره داخل النبات" },
      { fr: "Pour nourrir la plante en sucre", ar: "لتغذية النبات بالسكر" },
      { fr: "Pour remplacer la lumiere", ar: "لتعويض الضوء" },
      { fr: "Pour secher la tige", ar: "لتجفيف الساق" }
    ],
    correct: 0,
    explanation: { fr: "La coloration rend visible la circulation de l'eau.", ar: "يساعد التلوين على رؤية انتقال الماء داخل النبات." }
  },
  {
    prompt: { fr: "L'eau monte de la racine vers les feuilles.", ar: "يصعد الماء من الجذر نحو الأوراق." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, la plante transporte l'eau vers les parties aeriennes.", ar: "نعم، ينقل النبات الماء إلى الأجزاء الهوائية." }
  },
  {
    prompt: { fr: "Que remarque-t-on au niveau de la tige ?", ar: "ماذا نلاحظ على مستوى الساق؟" },
    options: [
      { fr: "Une coloration progressive", ar: "تلونا تدريجيا" },
      { fr: "Une disparition des feuilles", ar: "اختفاء الأوراق" },
      { fr: "Une production de flamme", ar: "ظهور لهب" },
      { fr: "Une baisse de masse", ar: "نقصانا في الكتلة" }
    ],
    correct: 0,
    explanation: { fr: "La tige se colore progressivement lorsque l'eau monte.", ar: "يتغير لون الساق تدريجيا عندما يصعد الماء." }
  },
  {
    prompt: { fr: "Les feuilles peuvent montrer les traces du colorant.", ar: "يمكن أن تظهر آثار الملون على الأوراق." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, les nervures des feuilles peuvent devenir colorees.", ar: "نعم، قد تظهر آثار اللون في عروق الأوراق." }
  },
  {
    prompt: { fr: "Quel est le role principal de cette experience ?", ar: "ما الهدف الرئيسي من هذه التجربة؟" },
    options: [
      { fr: "Montrer le transport de l'eau", ar: "إظهار انتقال الماء" },
      { fr: "Mesurer l'electricite", ar: "قياس الكهرباء" },
      { fr: "Calculer une masse", ar: "حساب الكتلة" },
      { fr: "Produire un gaz", ar: "إنتاج غاز" }
    ],
    correct: 0,
    explanation: { fr: "L'experience met en evidence le transport de l'eau dans la plante.", ar: "توضح التجربة انتقال الماء داخل النبات." }
  }
];

EXPERIMENTS.masse.quiz = [
  {
    prompt: { fr: "Quand la balance est-elle a l'equilibre ?", ar: "متى يكون الميزان في حالة توازن؟" },
    options: [
      { fr: "Quand les deux plateaux ont la meme masse", ar: "عندما تكون كتلة الكفتين متساوية" },
      { fr: "Quand un seul plateau bouge", ar: "عندما تتحرك كفة واحدة فقط" },
      { fr: "Quand le support est incline", ar: "عندما يكون الحامل مائلا" },
      { fr: "Quand il n'y a aucune masse", ar: "عندما لا توجد أي كتلة" }
    ],
    correct: 0,
    explanation: { fr: "L'equilibre traduit l'egalite des masses.", ar: "يدل التوازن على تساوي الكتل." }
  },
  {
    prompt: { fr: "On peut mesurer une masse inconnue avec des masses marquees.", ar: "يمكن قياس كتلة مجهولة باستعمال كتل معيارية." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, c'est le principe de la balance a plateaux.", ar: "نعم، هذا هو مبدأ الميزان ذي الكفتين." }
  },
  {
    prompt: { fr: "Quelle masse fallait-il atteindre dans cette simulation ?", ar: "ما الكتلة التي كان يجب الوصول إليها في هذه المحاكاة؟" },
    options: [
      { fr: "250 g", ar: "250 غ" },
      { fr: "100 g", ar: "100 غ" },
      { fr: "500 g", ar: "500 غ" },
      { fr: "50 g", ar: "50 غ" }
    ],
    correct: 0,
    explanation: { fr: "L'objet mystere avait ici une masse de 250 g.", ar: "كانت كتلة الجسم المجهول هنا 250 غ." }
  },
  {
    prompt: { fr: "Si le plateau droit est plus lourd, la balance penche a droite.", ar: "إذا كانت الكفة اليمنى أثقل فإن الميزان يميل نحو اليمين." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, le cote le plus lourd descend.", ar: "نعم، الجهة الأثقل هي التي تنخفض." }
  },
  {
    prompt: { fr: "Que signifie la masse ?", ar: "ماذا تعني الكتلة؟" },
    options: [
      { fr: "La quantite de matiere d'un objet", ar: "كمية المادة في جسم ما" },
      { fr: "La couleur d'un objet", ar: "لون الجسم" },
      { fr: "La temperature d'un objet", ar: "درجة حرارة الجسم" },
      { fr: "La vitesse d'un objet", ar: "سرعة الجسم" }
    ],
    correct: 0,
    explanation: { fr: "La masse exprime la quantite de matiere.", ar: "تعبر الكتلة عن كمية المادة." }
  }
];

EXPERIMENTS.chimie.quiz = [
  {
    prompt: { fr: "Quelle precaution vient en premier ?", ar: "ما أول احتياط يجب القيام به؟" },
    options: [
      { fr: "Mettre les lunettes", ar: "ارتداء النظارات الواقية" },
      { fr: "Allumer la flamme", ar: "إشعال اللهب" },
      { fr: "Verser tout l'acide rapidement", ar: "سكب الحمض بسرعة" },
      { fr: "Retirer le zinc", ar: "إزالة الزنك" }
    ],
    correct: 0,
    explanation: { fr: "La securite precede toute manipulation chimique.", ar: "السلامة تسبق أي تجربة كيميائية." }
  },
  {
    prompt: { fr: "Le zinc peut reagir avec un acide pour degager un gaz.", ar: "يمكن أن يتفاعل الزنك مع حمض مطلقا غازا." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, cette reaction peut produire de l'hydrogene.", ar: "نعم، هذا التفاعل قد ينتج غاز الهيدروجين." }
  },
  {
    prompt: { fr: "Quel signe visuel annonce la reaction ?", ar: "ما العلامة البصرية التي تدل على بداية التفاعل؟" },
    options: [
      { fr: "L'apparition de bulles", ar: "ظهور الفقاعات" },
      { fr: "La disparition du becher", ar: "اختفاء الكأس" },
      { fr: "Le gel de la solution", ar: "تجمد المحلول" },
      { fr: "La baisse de la lumiere de la salle", ar: "انخفاض ضوء الغرفة" }
    ],
    correct: 0,
    explanation: { fr: "Les bulles montrent qu'un gaz se degage.", ar: "تدل الفقاعات على انطلاق غاز." }
  },
  {
    prompt: { fr: "Il faut recueillir le gaz avant de le tester.", ar: "يجب جمع الغاز قبل اختباره." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, cela permet un test plus clair et plus sur.", ar: "نعم، هذا يجعل الاختبار أوضح وأكثر أمانا." }
  },
  {
    prompt: { fr: "Quel objectif a cette experience ?", ar: "ما هدف هذه التجربة؟" },
    options: [
      { fr: "Identifier un degagement d'hydrogene", ar: "التعرف على انطلاق الهيدروجين" },
      { fr: "Mesurer une masse", ar: "قياس كتلة" },
      { fr: "Comparer deux plantes", ar: "مقارنة نبتتين" },
      { fr: "Brancher un voltmetre", ar: "توصيل فولتميتر" }
    ],
    correct: 0,
    explanation: { fr: "Cette manipulation sert a mettre en evidence l'hydrogene.", ar: "تستخدم هذه التجربة لإبراز وجود الهيدروجين." }
  }
];

function renderQuizQuestion(state) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  const config = getExperimentConfig(state.experimentId);
  const question = state.questions[state.index];
  if (!stage || !progress || !question) return;
  progress.textContent = getText({ fr: `Question ${state.index + 1} sur ${state.questions.length}`, ar: `السؤال ${state.index + 1} من ${state.questions.length}` });
  stage.innerHTML = `
    <div class="quiz-question">
      <h2>${escapeHtml(getText(question.prompt))}</h2>
      <div class="quiz-options">
        ${question.options.map((option, index) => `<button type="button" class="quiz-option" data-option-index="${index}">${escapeHtml(getText(option))}</button>`).join("")}
      </div>
      <div class="quiz-feedback" id="quiz-feedback">${dualText("Choisissez une reponse pour obtenir un retour immediat.", "اختر إجابة لتحصل على تغذية راجعة فورية.")}</div>
    </div>
  `;
  const feedback = document.getElementById("quiz-feedback");
  stage.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.optionIndex);
      const correct = selected === question.correct;
      state.answers.push({ selected, correct, question });
      if (correct) state.score += 20;
      stage.querySelectorAll(".quiz-option").forEach((optionButton) => {
        optionButton.disabled = true;
        const optionIndex = Number(optionButton.dataset.optionIndex);
        if (optionIndex === question.correct) optionButton.classList.add("correct");
        else if (optionIndex === selected && !correct) optionButton.classList.add("wrong");
      });
      feedback.innerHTML = `<strong>${escapeHtml(getText(correct ? { fr: "Bonne reponse.", ar: "إجابة صحيحة." } : { fr: "Reponse a revoir.", ar: "إجابة تحتاج مراجعة." }))}</strong><p>${escapeHtml(getText(question.explanation))}</p>`;
      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.className = "primary-btn";
      nextButton.innerHTML = state.index === state.questions.length - 1 ? dualText("Voir le resultat final", "عرض النتيجة النهائية") : dualText("Question suivante", "السؤال التالي");
      nextButton.addEventListener("click", () => {
        state.index += 1;
        if (state.index >= state.questions.length) renderQuizResult(state, config);
        else renderQuizQuestion(state);
      });
      feedback.appendChild(nextButton);
    }, { once: true });
  });
}

function renderQuizResult(state, config) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  if (!stage || !progress) return;
  const badge = scoreToBadge(state.score);
  const quizScores = readJson(STORAGE.quizScores, {});
  quizScores[state.experimentId] = state.score;
  writeJson(STORAGE.quizScores, quizScores);
  progress.textContent = getText({ fr: "Quiz termine", ar: "تم إنهاء الاختبار" });
  stage.innerHTML = `
    <div class="quiz-result">
      <h2>${escapeHtml(getText(config.title))}</h2>
      <p>${escapeHtml(getText({ fr: `Score final : ${state.score}/100`, ar: `النتيجة النهائية: ${state.score}/100` }))}</p>
      <p class="result-badge">${escapeHtml(getText(badge))}</p>
      <div class="quiz-review-card">
        <h3>${dualText("Mode revision", "وضع المراجعة")}</h3>
        ${state.answers.map((answer, index) => `
          <div class="quiz-feedback">
            <strong>${escapeHtml(getText({ fr: `Question ${index + 1}`, ar: `السؤال ${index + 1}` }))}</strong>
            <p>${escapeHtml(getText(answer.question.prompt))}</p>
            <p>${escapeHtml(getText({ fr: `Bonne reponse : ${answer.question.options[answer.question.correct].fr}`, ar: `الإجابة الصحيحة: ${answer.question.options[answer.question.correct].ar}` }))}</p>
            <p>${escapeHtml(getText(answer.question.explanation))}</p>
          </div>
        `).join("")}
      </div>
      <div class="hero-actions">
        <a class="primary-btn" href="dashboard.html">${dualText("Retour au tableau de bord", "العودة إلى اللوحة")}</a>
        <a class="secondary-btn" href="experiences.html">${dualText("Retour aux experiences", "العودة إلى التجارب")}</a>
      </div>
    </div>
  `;
}

function initQuizPage() {
  const experimentId = localStorage.getItem(STORAGE.lastExperiment) || "circuit";
  const config = getExperimentConfig(experimentId);
  const title = document.querySelector("[data-quiz-title]");
  if (title) title.textContent = getText({ fr: `Quiz lie a l'experience : ${config.title.fr}.`, ar: `اختبار مرتبط بالتجربة: ${config.title.ar}.` });
  renderQuizQuestion({ experimentId, questions: config.quiz, index: 0, score: 0, answers: [] });
}

function initTeacherLogin() {
  const form = document.getElementById("teacher-login-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const password = String(data.get("password") || "").trim();
    if (username === "admin" && password === "1234") {
      localStorage.setItem(STORAGE.teacherLogged, "true");
      window.location.href = "prof-dashboard.html";
      return;
    }
    alert(getText({ fr: "Identifiants incorrects. Utilisez admin / 1234.", ar: "بيانات غير صحيحة. استعمل admin / 1234." }));
  });
}

function getTeacherRows() {
  const rows = [...DEMO_RECORDS];
  const studentName = localStorage.getItem(STORAGE.studentName);
  const studentClass = localStorage.getItem(STORAGE.studentClass) || "CEM2026";
  const experimentScores = readJson(STORAGE.experimentScores, {});
  const lastResult = readJson(STORAGE.lastResult, null);
  if (studentName) {
    Object.entries(experimentScores).forEach(([experimentId, score]) => {
      rows.push({
        studentName,
        classCode: studentClass,
        experimentId,
        score,
        aiEvaluation: scoreToBadge(score),
        errors: lastResult && lastResult.experimentId === experimentId ? lastResult.errors : [getExperimentConfig(experimentId).defaultTip]
      });
    });
  }
  return rows;
}

function renderTeacherDetail(record) {
  const detail = document.getElementById("student-detail");
  if (!detail) return;
  const experiment = getExperimentConfig(record.experimentId);
  detail.innerHTML = `
    <h3>${escapeHtml(record.studentName)}</h3>
    <p>${escapeHtml(getText({ fr: `Classe : ${record.classCode}`, ar: `القسم: ${record.classCode}` }))}</p>
    <p>${escapeHtml(getText({ fr: `Experience : ${experiment.title.fr}`, ar: `التجربة: ${experiment.title.ar}` }))}</p>
    <p>${escapeHtml(getText({ fr: `Score : ${record.score}%`, ar: `النتيجة: ${record.score}%` }))}</p>
    <p>${escapeHtml(getText({ fr: `Evaluation IA : ${record.aiEvaluation.fr}`, ar: `تقييم الذكاء الاصطناعي: ${record.aiEvaluation.ar}` }))}</p>
    <div class="quiz-feedback"><strong>${dualText("Experiences completees", "التجارب المنجزة")}</strong><p>${escapeHtml(getText(experiment.title))}</p></div>
    <div class="quiz-feedback"><strong>${dualText("Erreurs frequentes", "الأخطاء المتكررة")}</strong><p>${escapeHtml(getText(record.errors[0] || { fr: "Aucune erreur notable.", ar: "لا توجد أخطاء بارزة." }))}</p></div>
    <div class="quiz-feedback"><strong>${dualText("Texte d'evaluation", "نص التقييم")}</strong><p>${escapeHtml(getText({ fr: "L'analyse montre une progression utile avec des points de consolidation cibles.", ar: "يظهر التحليل تقدما جيدا مع نقاط محددة تحتاج إلى تدعيم." }))}</p></div>
  `;
}

function renderTeacherInsights(rows) {
  const container = document.getElementById("teacher-insights");
  if (!container) return;
  const average = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length) : 0;
  const supportCount = rows.filter((row) => row.score < 70).length;
  const grouped = rows.reduce((map, row) => {
    map[row.experimentId] = map[row.experimentId] || [];
    map[row.experimentId].push(row.score);
    return map;
  }, {});
  let bestExperimentId = "circuit";
  let bestAverage = 0;
  Object.entries(grouped).forEach(([experimentId, values]) => {
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    if (avg > bestAverage) {
      bestAverage = avg;
      bestExperimentId = experimentId;
    }
  });
  const bestExperiment = getExperimentConfig(bestExperimentId);
  container.innerHTML = `
    <div class="insight-item"><h3>${dualText("Moyenne de la classe", "متوسط القسم")}</h3><p>${escapeHtml(getText({ fr: `${average}% de reussite moyenne.`, ar: `${average}% هو متوسط النجاح الحالي.` }))}</p></div>
    <div class="insight-item"><h3>${dualText("Experience la mieux reussie", "أفضل تجربة من حيث النتائج")}</h3><p>${escapeHtml(getText(bestExperiment.title))}</p></div>
    <div class="insight-item"><h3>${dualText("Eleves a accompagner", "التلاميذ الذين يحتاجون دعما")}</h3><p>${escapeHtml(getText({ fr: `${supportCount} eleve(s) ont un score inferieur a 70%.`, ar: `${supportCount} متعلما أو متعلمة حصلوا على أقل من 70%.` }))}</p></div>
  `;
}

function renderTeacherTable(rows) {
  const tableBody = document.getElementById("teacher-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = rows.map((row, index) => {
    const experiment = getExperimentConfig(row.experimentId);
    return `<tr data-row-index="${index}"><td>${escapeHtml(row.studentName)}</td><td>${escapeHtml(row.classCode)}</td><td>${escapeHtml(getText(experiment.title))}</td><td>${escapeHtml(String(row.score))}%</td><td>${escapeHtml(getText(row.aiEvaluation))}</td></tr>`;
  }).join("");
  tableBody.querySelectorAll("tr").forEach((rowNode) => {
    rowNode.addEventListener("click", () => renderTeacherDetail(rows[Number(rowNode.dataset.rowIndex)]));
  });
  if (rows[0]) renderTeacherDetail(rows[0]);
}

function renderLabCodeList() {
  const list = document.getElementById("lab-code-list");
  if (!list) return;
  const codes = readLabCodes();
  if (!codes.length) {
    list.innerHTML = `
      <div class="empty-card">
        ${dualText("Aucun code cree. Choisissez un niveau et une activite, puis cliquez sur creer.", "لا يوجد رمز بعد. اختر المستوى والنشاط ثم اضغط على إنشاء.")}
      </div>
    `;
    return;
  }
  list.innerHTML = codes.map((item) => {
    const experiment = getExperimentConfig(item.experimentId);
    const level = LEVEL_LABELS[item.level] || LEVEL_LABELS.cem;
    return `
      <article class="generated-code-card">
        <div>
          <span class="code-value">${escapeHtml(item.code)}</span>
          <p class="code-meta">${escapeHtml(level.fr)} - ${escapeHtml(experiment.title.fr)}</p>
          <p class="code-meta">${escapeHtml(level.ar)} - ${escapeHtml(experiment.title.ar)}</p>
        </div>
        <button type="button" class="secondary-btn" data-copy-code="${escapeHtml(item.code)}">${dualText("Copier", "نسخ")}</button>
      </article>
    `;
  }).join("");
  list.querySelectorAll("[data-copy-code]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.copyCode;
      try {
        await navigator.clipboard.writeText(code);
      } catch (error) {
        console.warn("Clipboard unavailable", error);
      }
      button.innerHTML = dualText("Code pret", "الرمز جاهز");
    });
  });
}

function initLabCodeGenerator() {
  const form = document.getElementById("lab-code-form");
  if (!form) return;
  const levelSelect = form.querySelector('[name="codeLevel"]');
  const experimentSelect = form.querySelector('[name="codeExperiment"]');

  function refreshExperimentOptions() {
    const level = levelSelect ? levelSelect.value : "cem";
    if (!experimentSelect) return;
    [...experimentSelect.options].forEach((option) => {
      const audience = EXPERIMENT_AUDIENCE[option.value];
      option.hidden = audience ? !audience.levels.includes(level) : false;
    });
    const selectedOption = experimentSelect.options[experimentSelect.selectedIndex];
    if (selectedOption && selectedOption.hidden) {
      const firstVisible = [...experimentSelect.options].find((option) => !option.hidden);
      if (firstVisible) experimentSelect.value = firstVisible.value;
    }
  }

  if (levelSelect) levelSelect.addEventListener("change", refreshExperimentOptions);
  refreshExperimentOptions();
  renderLabCodeList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const level = String(data.get("codeLevel") || "cem");
    const experimentId = String(data.get("codeExperiment") || "plante");
    const audience = EXPERIMENT_AUDIENCE[experimentId];
    if (audience && !audience.levels.includes(level)) {
      alert(getText({ fr: "Cette activite ne correspond pas a ce niveau.", ar: "هذا النشاط لا يناسب هذا المستوى." }));
      return;
    }
    const subject = subjectForExperiment(experimentId, level);
    const code = createReadableLabCode(level, experimentId);
    const codes = readLabCodes();
    codes.unshift({
      code,
      level,
      subjectId: subject ? subject.id : "",
      experimentId,
      createdAt: new Date().toISOString()
    });
    writeLabCodes(codes.slice(0, 12));
    renderLabCodeList();
  });
}

function initTeacherDashboard() {
  if (localStorage.getItem(STORAGE.teacherLogged) !== "true") return (window.location.href = "prof-login.html");
  const rows = getTeacherRows();
  let descending = true;
  const filterInput = document.getElementById("class-filter");
  const sortButton = document.getElementById("sort-score-btn");

  function applyFilters() {
    const query = filterInput ? filterInput.value.trim().toLowerCase() : "";
    let filtered = rows.filter((row) => row.classCode.toLowerCase().includes(query));
    filtered = filtered.sort((a, b) => descending ? b.score - a.score : a.score - b.score);
    renderTeacherTable(filtered);
    renderTeacherInsights(filtered);
  }

  if (filterInput) filterInput.addEventListener("input", applyFilters);
  if (sortButton) sortButton.addEventListener("click", () => {
    descending = !descending;
    applyFilters();
  });
  initLabCodeGenerator();
  applyFilters();
}

function initPage() {
  bindGlobalUi();
  applyLanguage(currentLanguage());
  if (!ensureStudentSession()) return;
  const pageId = document.body.dataset.page;
  if (pageId === "index") initIndex();
  if (pageId === "student") initStudentForm();
  if (pageId === "dashboard") initDashboard();
  if (pageId === "experiences") initExperiences();
  if (pageId === "experiment") initExperimentPage();
  if (pageId === "result") initResultPage();
  if (pageId === "quiz") initQuizPage();
  if (pageId === "teacher-login") initTeacherLogin();
  if (pageId === "teacher-dashboard") initTeacherDashboard();
}

document.addEventListener("DOMContentLoaded", initPage);
