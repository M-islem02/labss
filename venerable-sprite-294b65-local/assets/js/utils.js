// ─── Utilities ───

const STORAGE_KEY = 'edu-platform-data-v2';
const SESSION_KEY = 'edu-professor-session-v1';

// ── UUID ──────────────────────────────────────────────────────────────────────
function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2);
}

// ── Date helpers ──────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-DZ', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-DZ', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `منذ ${hrs} ساعة`;
  const days = Math.floor(hrs / 24);
  return `منذ ${days} يوم`;
}

// ── Storage ───────────────────────────────────────────────────────────────────
const SEED_DATA = {
  professor: { username: 'professor', password: '123456', displayName: 'الأستاذ' },
  labs: [
    {
      id: uuid(),
      titleAr: 'مختبر الفيزياء',
      titleFr: 'Laboratoire de Physique',
      subject: 'physics',
      level: 'lycee',
      descriptionAr: 'تجارب السقوط الحر، المستوى المائل، البندول، والحركة المقذوفة داخل مختبر تفاعلي ثلاثي الأبعاد.',
      descriptionFr: 'Expériences de chute libre, plan incliné, pendule et mouvement projectile dans un laboratoire interactif 3D.',
      labType: 'physics',
      available: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'مختبر الدوائر الكهربائية',
      titleFr: 'Laboratoire de Circuits Électriques',
      subject: 'electricity',
      level: 'cem',
      descriptionAr: 'تركيب دارة كهربائية وملاحظة عمل البطارية والقاطع والمصباح في بيئة تفاعلية.',
      descriptionFr: 'Construction d\'un circuit électrique et observation du fonctionnement de la batterie, du commutateur et de l\'ampoule.',
      labType: 'circuit',
      available: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'مختبر الأحياء — الأوزموز',
      titleFr: 'Laboratoire de Biologie — Osmose',
      subject: 'biology',
      level: 'cem',
      descriptionAr: 'تجربة امتصاص النبات للماء الملون ومراقبة التمثيل الضوئي في بيئة تفاعلية.',
      descriptionFr: 'Expérience d\'absorption d\'eau colorée par la plante et observation de la photosynthèse.',
      labType: 'biology',
      available: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'مختبر الكيمياء — الزنك والحمض',
      titleFr: 'Laboratoire de Chimie — Zinc et Acide',
      subject: 'chemistry',
      level: 'lycee',
      descriptionAr: 'تفاعل الزنك مع حمض الهيدروكلوريك ومتابعة الفقاعات والغاز الناتج H₂.',
      descriptionFr: 'Réaction du zinc avec l\'acide chlorhydrique et suivi des bulles et du gaz H₂ produit.',
      labType: 'chemistry',
      available: true,
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'ميكانيكا متقدمة',
      titleFr: 'Mécanique Avancée',
      subject: 'physics',
      level: 'lycee',
      descriptionAr: 'تجارب ميكانيكية متقدمة للصف النهائي — قيد التطوير.',
      descriptionFr: 'Expériences de mécanique avancée pour la classe terminale — en développement.',
      labType: 'physics',
      available: false,
      published: true,
      createdAt: new Date().toISOString()
    }
  ],
  quizzes: [
    {
      id: uuid(),
      titleAr: 'القوى والحركة',
      titleFr: 'Forces et Mouvement',
      subject: 'physics',
      questionAr: 'ما هي وحدة القوة في النظام الدولي؟',
      questionFr: 'Quelle est l\'unité de force dans le système international ?',
      options: [
        { textAr: 'نيوتن', textFr: 'Newton', isCorrect: true },
        { textAr: 'جول', textFr: 'Joule', isCorrect: false },
        { textAr: 'واط', textFr: 'Watt', isCorrect: false },
        { textAr: 'باسكال', textFr: 'Pascal', isCorrect: false }
      ],
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'الكهرباء',
      titleFr: 'Électricité',
      subject: 'electricity',
      questionAr: 'ما دور المقاومة في الدارة الكهربائية؟',
      questionFr: 'Quel est le rôle d\'une résistance dans un circuit électrique ?',
      options: [
        { textAr: 'إنتاج الكهرباء', textFr: 'Produire de l\'électricité', isCorrect: false },
        { textAr: 'تخزين الطاقة', textFr: 'Stocker l\'énergie', isCorrect: false },
        { textAr: 'تقليل شدة التيار', textFr: 'Réduire l\'intensité du courant', isCorrect: true },
        { textAr: 'توليد الضوء', textFr: 'Générer de la lumière', isCorrect: false }
      ],
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'تفاعلات كيميائية',
      titleFr: 'Réactions Chimiques',
      subject: 'chemistry',
      questionAr: 'ما الغاز الناتج عن تفاعل الزنك مع حمض الهيدروكلوريك؟',
      questionFr: 'Quel gaz est produit lors de la réaction du zinc avec l\'acide chlorhydrique ?',
      options: [
        { textAr: 'أكسجين', textFr: 'Oxygène', isCorrect: false },
        { textAr: 'هيدروجين', textFr: 'Hydrogène', isCorrect: true },
        { textAr: 'ثاني أكسيد الكربون', textFr: 'Dioxyde de carbone', isCorrect: false },
        { textAr: 'كلور', textFr: 'Chlore', isCorrect: false }
      ],
      published: true,
      createdAt: new Date().toISOString()
    },
    {
      id: uuid(),
      titleAr: 'علوم الأحياء',
      titleFr: 'Sciences Biologiques',
      subject: 'biology',
      questionAr: 'ما الغاز الذي تطلقه النباتات أثناء التمثيل الضوئي؟',
      questionFr: 'Quel gaz est libéré par les plantes lors de la photosynthèse ?',
      options: [
        { textAr: 'ثاني أكسيد الكربون', textFr: 'Dioxyde de carbone', isCorrect: false },
        { textAr: 'نيتروجين', textFr: 'Azote', isCorrect: false },
        { textAr: 'هيدروجين', textFr: 'Hydrogène', isCorrect: false },
        { textAr: 'أكسجين', textFr: 'Oxygène', isCorrect: true }
      ],
      published: true,
      createdAt: new Date().toISOString()
    }
  ],
  replies: []
};

const LEGACY_LAB_TYPE_BY_URL = {
  './lab-physique.html': 'physics',
  './lab-electrique.html': 'circuit',
  './lab-science-cem.html': 'biology',
  './lab-chimie-lycee.html': 'chemistry',
  './lab-view.html?lab=physics': 'physics',
  './lab-view.html?lab=circuit': 'circuit',
  './lab-view.html?lab=biology': 'biology',
  './lab-view.html?lab=chemistry': 'chemistry',
};

function normalizeSubject(value) {
  const subject = String(value || '').trim().toLowerCase();
  if (subject.includes('phys')) return 'physics';
  if (subject.includes('electric') || subject.includes('كهرب')) return 'electricity';
  if (subject.includes('bio') || subject.includes('science') || subject.includes('علوم') || subject.includes('cem')) return 'biology';
  if (subject.includes('chem') || subject.includes('chim') || subject.includes('كيمي')) return 'chemistry';
  return subject || 'physics';
}

function normalizeLevel(value) {
  const level = String(value || '').trim().toLowerCase();
  if (level.includes('cem') || level.includes('متوسط') || level.includes('moyen')) return 'cem';
  if (level.includes('lyc') || level.includes('ثانو')) return 'lycee';
  return level || 'lycee';
}

function inferLabType(lab) {
  if (lab?.labType) return String(lab.labType).trim().toLowerCase();

  const fromUrl = LEGACY_LAB_TYPE_BY_URL[String(lab?.url || '').trim()];
  if (fromUrl) return fromUrl;

  const text = [
    lab?.subject,
    lab?.titleAr,
    lab?.titleFr,
    lab?.title,
    lab?.descriptionAr,
    lab?.descriptionFr,
    lab?.description
  ].join(' ').toLowerCase();

  if (text.includes('circuit') || text.includes('electri') || text.includes('كهرب')) return 'circuit';
  if (text.includes('bio') || text.includes('science cem') || text.includes('plant') || text.includes('أحياء') || text.includes('علوم')) return 'biology';
  if (text.includes('chem') || text.includes('chim') || text.includes('acid') || text.includes('حمض') || text.includes('كيمي')) return 'chemistry';
  return 'physics';
}

function normalizeLab(lab) {
  const isLegacyLab = Boolean(lab && (lab.url || lab.title || lab.description) && !lab.titleAr && !lab.titleFr);
  const labType = inferLabType(lab);
  const subject = normalizeSubject(lab?.subject || labType);
  const chemistryLegacyRecovery = isLegacyLab && labType === 'chemistry';

  return {
    id: lab?.id || uuid(),
    titleAr: lab?.titleAr || lab?.title || '',
    titleFr: lab?.titleFr || lab?.title || '',
    subject,
    level: normalizeLevel(lab?.level),
    descriptionAr: lab?.descriptionAr || lab?.description || '',
    descriptionFr: lab?.descriptionFr || lab?.description || '',
    labType,
    available: chemistryLegacyRecovery ? true : Boolean(lab?.available),
    published: lab?.published !== false,
    createdAt: lab?.createdAt || new Date().toISOString()
  };
}

function normalizeQuiz(quiz) {
  return {
    id: quiz?.id || uuid(),
    titleAr: quiz?.titleAr || quiz?.title || '',
    titleFr: quiz?.titleFr || quiz?.title || '',
    subject: normalizeSubject(quiz?.subject),
    questionAr: quiz?.questionAr || quiz?.question || '',
    questionFr: quiz?.questionFr || quiz?.question || '',
    options: Array.isArray(quiz?.options) ? quiz.options.map((option) => ({
      textAr: option?.textAr || option?.text || '',
      textFr: option?.textFr || option?.text || '',
      isCorrect: Boolean(option?.isCorrect)
    })) : [],
    published: quiz?.published !== false,
    createdAt: quiz?.createdAt || new Date().toISOString()
  };
}

function normalizeReply(reply) {
  return {
    id: reply?.id || uuid(),
    quizId: reply?.quizId || '',
    quizTitleAr: reply?.quizTitleAr || reply?.quizTitle || '',
    quizTitleFr: reply?.quizTitleFr || reply?.quizTitle || '',
    studentName: reply?.studentName || reply?.visitorName || '',
    selectedTextAr: reply?.selectedTextAr || reply?.answerAr || reply?.answer || '',
    selectedTextFr: reply?.selectedTextFr || reply?.answerFr || reply?.answer || '',
    isCorrect: Boolean(reply?.isCorrect),
    submittedAt: reply?.submittedAt || reply?.createdAt || new Date().toISOString()
  };
}

const EXTRA_PORTAL_LABS = [];

function normalizeState(rawState) {
  const source = rawState && typeof rawState === 'object' ? rawState : {};
  const normalizedLabs = Array.isArray(source.labs) && source.labs.length
    ? source.labs.map(normalizeLab).filter((lab) => lab.labType !== 'unity')
    : SEED_DATA.labs.map((lab) => ({ ...lab }));
  const existingLabTypes = new Set(normalizedLabs.map((lab) => lab.labType));
  const canonicalLabs = [...SEED_DATA.labs, ...EXTRA_PORTAL_LABS];
  const missingSeedLabs = canonicalLabs
    .filter((lab) => !existingLabTypes.has(lab.labType))
    .map((lab) => ({ ...lab }));

  return {
    professor: {
      ...SEED_DATA.professor,
      ...(source.professor || {})
    },
    labs: [...normalizedLabs, ...missingSeedLabs],
    quizzes: Array.isArray(source.quizzes) && source.quizzes.length
      ? source.quizzes.map(normalizeQuiz)
      : SEED_DATA.quizzes.map((quiz) => ({ ...quiz, options: quiz.options.map((option) => ({ ...option })) })),
    replies: Array.isArray(source.replies)
      ? source.replies.map(normalizeReply)
      : []
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = normalizeState(SEED_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    const normalized = normalizeState(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    return normalizeState(SEED_DATA);
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Session ───────────────────────────────────────────────────────────────────
function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  } catch { return null; }
}

function setSession(prof) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(prof));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ── DOM helpers ───────────────────────────────────────────────────────────────
function el(id) { return document.getElementById(id); }
function qs(sel, root = document) { return root.querySelector(sel); }
function qsa(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function createElement(tag, classes = '', attrs = {}) {
  const elem = document.createElement(tag);
  if (classes) elem.className = classes;
  Object.entries(attrs).forEach(([k, v]) => elem.setAttribute(k, v));
  return elem;
}

function empty(elem) { while (elem.firstChild) elem.removeChild(elem.firstChild); }

// ── Debounce ──────────────────────────────────────────────────────────────────
function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Counter animation ─────────────────────────────────────────────────────────
function animateCounter(elem, target, duration = 1200) {
  const start = performance.now();
  const from = parseInt(elem.textContent, 10) || 0;
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    elem.textContent = Math.round(from + (target - from) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Notification toast ────────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  let container = el('toast-container');
  if (!container) {
    container = createElement('div', 'toast-container', { id: 'toast-container', 'aria-live': 'polite' });
    document.body.appendChild(container);
  }
  const item = createElement('div', `toast toast-${type}`);
  item.textContent = msg;
  container.appendChild(item);
  setTimeout(() => item.classList.add('toast-visible'), 10);
  setTimeout(() => {
    item.classList.remove('toast-visible');
    setTimeout(() => item.remove(), 300);
  }, 3000);
}

// ── Web Audio beep ────────────────────────────────────────────────────────────
let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq = 440, type = 'sine', dur = 0.15, vol = 0.3) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + dur);
  } catch { /* ignore */ }
}

function playSuccess() { playTone(880, 'sine', 0.2, 0.4); }
function playError()   { playTone(220, 'sawtooth', 0.3, 0.3); }
function playClick()   { playTone(660, 'sine', 0.1, 0.2); }
function playDrop()    { playTone(330, 'triangle', 0.2, 0.25); }

export {
  STORAGE_KEY, SESSION_KEY, SEED_DATA,
  uuid, formatDate, formatDateTime, timeAgo,
  loadState, saveState,
  getSession, setSession, clearSession,
  el, qs, qsa, createElement, empty,
  debounce, animateCounter, toast,
  playTone, playSuccess, playError, playClick, playDrop
};
