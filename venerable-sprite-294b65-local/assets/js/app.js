// ═══════════════════════════════════════════════════════════════
//  EDUCATIONAL PORTAL  ·  app.js
//  Bilingual AR/FR · Lab viewer · QCM · Professor dashboard · Chatbot
// ═══════════════════════════════════════════════════════════════
import { t, getLang, setLang, toggleLang, localizedField } from './i18n.js';
import {
  uuid, formatDateTime, timeAgo,
  loadState, saveState,
  getSession, setSession, clearSession,
  el, qs, qsa, createElement, empty,
  debounce, animateCounter, toast,
  playSuccess, playError, playClick, playDrop
} from './utils.js';

// ── State ──────────────────────────────────────────────────────
let state = loadState();
let chatHistory = [];

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLang(getLang());
  initParticles();
  initSidebar();
  initHeader();
  renderLabsGrid();
  renderQuizzesGrid();
  renderRepliesTimeline();
  updateKPIs();
  initLabViewer();
  initChatbot();
  initModals();
  initProfessorAuth();
  initScrollActiveNav();

  document.addEventListener('langchange', ({ detail }) => {
    applyLang(detail.lang);
    renderLabsGrid();
    renderQuizzesGrid();
    renderRepliesTimeline();
    updateKPIs();
  });
});

// ── Language ───────────────────────────────────────────────────
window.switchLang = function(lang) {
  setLang(lang);
  el('lang-ar').classList.toggle('active', lang === 'ar');
  el('lang-fr').classList.toggle('active', lang === 'fr');
};

function applyLang(lang) {
  qsa('[data-i18n]').forEach(node => {
    const key = node.dataset.i18n;
    if (key) node.textContent = t(key);
  });
  el('lang-ar').classList.toggle('active', lang === 'ar');
  el('lang-fr').classList.toggle('active', lang === 'fr');
  // placeholders
  const labsSearch = el('labs-search');
  if (labsSearch) labsSearch.placeholder = lang === 'ar' ? 'بحث في المختبرات...' : 'Rechercher...';
  const chatInput = el('chatbot-input');
  if (chatInput) chatInput.placeholder = t('chatbotPlaceholder');
}

// ── Particles (hero background) ────────────────────────────────
function initParticles() {
  const canvas = el('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,180,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    // draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,180,${0.08 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
}

// ── Sidebar ────────────────────────────────────────────────────
function initSidebar() {
  const shell = el('page-shell');
  const toggle = el('sidebar-toggle');
  toggle.addEventListener('click', () => {
    shell.classList.toggle('sidebar-open');
    playClick();
  });
}

// ── Header ─────────────────────────────────────────────────────
function initHeader() {
  el('prof-login-btn').addEventListener('click', () => openModal('login-modal'));
}

// ── KPIs ───────────────────────────────────────────────────────
function updateKPIs() {
  const labs = state.labs.filter(l => l.published).length;
  const quizzes = state.quizzes.filter(q => q.published).length;
  const replies = state.replies.length;

  animateCounter(el('kpi-labs'), labs);
  animateCounter(el('kpi-quizzes'), quizzes);
  animateCounter(el('kpi-replies'), replies);

  const badge = el('replies-count-badge');
  if (badge) badge.textContent = replies + (getLang() === 'ar' ? ' رد' : ' réponses');

  const repliesBadge = el('replies-badge');
  if (repliesBadge) {
    repliesBadge.textContent = replies;
    repliesBadge.classList.toggle('visible', replies > 0);
  }
}

// ── Labs Grid ──────────────────────────────────────────────────
function initScrollActiveNav() {
  const sections = ['hero-section','labs-section','quiz-section','replies-section'];
  const links = qsa('[data-section]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        qsa(`[data-section="${entry.target.id}"]`).forEach(a => a.classList.add('active'));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(id => { const s = el(id); if (s) obs.observe(s); });
}

const labSubjectMap = {
  physics: 'badge-physics',
  chemistry: 'badge-chemistry',
  biology: 'badge-biology',
  electricity: 'badge-electricity'
};
const labSubjectLabel = {
  physics: { ar: 'الفيزياء', fr: 'Physique' },
  chemistry: { ar: 'الكيمياء', fr: 'Chimie' },
  biology: { ar: 'العلوم', fr: 'Sciences' },
  electricity: { ar: 'الكهرباء', fr: 'Électricité' }
};
const labLevelLabel = {
  cem: { ar: 'متوسط', fr: 'CEM' },
  lycee: { ar: 'ثانوي', fr: 'Lycée' }
};

function normalizeLabType(lab) {
  const value = String(lab?.labType || '').trim().toLowerCase();
  if (['physics', 'circuit', 'biology', 'chemistry'].includes(value)) return value;

  const text = [
    lab?.subject,
    lab?.titleAr,
    lab?.titleFr,
    lab?.descriptionAr,
    lab?.descriptionFr
  ].join(' ').toLowerCase();

  if (text.includes('circuit') || text.includes('electri') || text.includes('كهرب')) return 'circuit';
  if (text.includes('bio') || text.includes('science') || text.includes('plant') || text.includes('أحياء') || text.includes('علوم')) return 'biology';
  if (text.includes('chem') || text.includes('chim') || text.includes('acid') || text.includes('حمض') || text.includes('كيمي')) return 'chemistry';
  return 'physics';
}

function renderLabsGrid(filter = {}) {
  const grid = el('labs-grid');
  if (!grid) return;

  let labs = state.labs.filter(l => l.published && normalizeLabType(l) !== 'unity');

  const search = (el('labs-search')?.value || '').toLowerCase();
  const subject = el('labs-filter-subject')?.value || '';
  const level = el('labs-filter-level')?.value || '';
  const chip = qs('.filter-chip.active')?.dataset.filter || 'all';

  if (search) labs = labs.filter(l =>
    localizedField(l, 'title').toLowerCase().includes(search) ||
    localizedField(l, 'description').toLowerCase().includes(search)
  );
  if (subject) labs = labs.filter(l => l.subject === subject);
  if (level)   labs = labs.filter(l => l.level === level);
  if (chip === 'available') labs = labs.filter(l => l.available);

  empty(grid);

  if (!labs.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <div class="empty-icon">🧪</div>
      <div class="empty-title">${t('emptyLabsTitle')}</div>
      <div class="empty-desc">${t('emptyLabsDesc')}</div>
    </div>`;
    return;
  }

  const lang = getLang();
  labs.forEach(lab => {
    const labType = normalizeLabType(lab);
    const subjectCls = labSubjectMap[lab.subject] || '';
    const subjectTxt = labSubjectLabel[lab.subject]?.[lang] || lab.subject;
    const levelTxt   = labLevelLabel[lab.level]?.[lang] || lab.level;
    const title = localizedField(lab, 'title');
    const desc  = localizedField(lab, 'description');

    const card = createElement('div', 'card lab-card');
    card.innerHTML = `
      <div class="card-body">
        <div class="lab-card-badges">
          <span class="badge ${subjectCls}">${subjectTxt}</span>
          <span class="badge badge-${lab.level}">${levelTxt}</span>
          <span class="badge badge-${lab.available ? 'available' : 'unavailable'}">
            ${lab.available ? (lang==='ar'?'متاح':'Disponible') : (lang==='ar'?'غير متاح':'Non disponible')}
          </span>
        </div>
        <h3 class="lab-card-title">${title}</h3>
        <p class="lab-card-desc">${desc}</p>
        <button
          class="open-lab-btn${lab.available ? '' : ' locked'}"
          data-lab-id="${lab.id}"
          data-lab-type="${labType}"
          data-lab-title="${title}"
          ${!lab.available ? 'disabled' : ''}
          aria-label="Open ${title}"
        >
          ${lab.available
            ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${t('openLab')}`
            : `🔒 ${t('labLocked')}`}
        </button>
      </div>`;
    grid.appendChild(card);
  });

  // Bind open buttons
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.open-lab-btn:not(.locked)');
    if (!btn) return;
    openLabViewer(btn.dataset.labId, btn.dataset.labType, btn.dataset.labTitle);
  });
}

// Debounced search
document.addEventListener('DOMContentLoaded', () => {
  const labsSearch = el('labs-search');
  if (labsSearch) labsSearch.addEventListener('input', debounce(() => renderLabsGrid(), 300));

  const filterSubject = el('labs-filter-subject');
  if (filterSubject) filterSubject.addEventListener('change', () => renderLabsGrid());

  const filterLevel = el('labs-filter-level');
  if (filterLevel) filterLevel.addEventListener('change', () => renderLabsGrid());

  qsa('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      qsa('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderLabsGrid();
    });
  });
});

// ── Lab Viewer ─────────────────────────────────────────────────
function initLabViewer() {
  el('lab-viewer-close').addEventListener('click', closeLabViewer);

  const requestedLab = new URLSearchParams(window.location.search).get('lab');
  if (!requestedLab) return;

  const matchingLab = state.labs.find((lab) => normalizeLabType(lab) === requestedLab && lab.published && lab.available);
  if (!matchingLab) return;

  openLabViewer(matchingLab.id, matchingLab.labType, localizedField(matchingLab, 'title'));
}

function openLabViewer(labId, labType, title) {
  const section = el('lab-viewer-section');
  const frame   = el('lab-viewer-frame');
  const titleEl = el('lab-viewer-title');
  const selectedLab = state.labs.find(l => l.id === labId);
  const safeLabType = normalizeLabType({ ...selectedLab, labType });
  const viewerUrl = `./lab-view.html?lab=${encodeURIComponent(safeLabType)}`;
  const pageUrl = new URL(window.location.href);
  pageUrl.searchParams.set('lab', safeLabType);

  titleEl.textContent = title;
  frame.src = viewerUrl;
  window.history.replaceState({}, '', `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash || '#labs-section'}`);
  section.classList.remove('hidden');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  playClick();
}

function closeLabViewer() {
  const section = el('lab-viewer-section');
  const frame   = el('lab-viewer-frame');
  const pageUrl = new URL(window.location.href);
  pageUrl.searchParams.delete('lab');
  frame.src = '';
  section.classList.add('hidden');
  window.history.replaceState({}, '', `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash || '#labs-section'}`);
}

// ── Quizzes Grid ───────────────────────────────────────────────
function renderQuizzesGrid() {
  const grid = el('quizzes-grid');
  if (!grid) return;

  const quizzes = state.quizzes.filter(q => q.published);
  empty(grid);
  const lang = getLang();

  if (!quizzes.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <div class="empty-icon">📝</div>
      <div class="empty-title">${t('emptyQuizzesTitle')}</div>
      <div class="empty-desc">${t('emptyQuizzesDesc')}</div>
    </div>`;
    return;
  }

  quizzes.forEach(quiz => {
    const title = localizedField(quiz, 'title');
    const question = localizedField(quiz, 'question');
    const subjectTxt = labSubjectLabel[quiz.subject]?.[lang] || quiz.subject;
    const subjectCls = labSubjectMap[quiz.subject] || '';

    const card = createElement('div', 'card quiz-card');
    const optionsHtml = quiz.options.map((opt, idx) => `
      <label class="quiz-option" data-idx="${idx}">
        <input type="radio" name="quiz-${quiz.id}" value="${idx}" />
        ${localizedField(opt, 'text')}
      </label>`).join('');

    card.innerHTML = `
      <div class="card-body">
        <div class="lab-card-badges mb-1">
          <span class="badge ${subjectCls}">${subjectTxt}</span>
        </div>
        <h3 class="quiz-card-title">${title}</h3>
        <p class="quiz-card-question">${question}</p>
        <input class="quiz-name-input" type="text" placeholder="${t('namePlaceholder')}" aria-label="${t('yourName')}" />
        <div class="quiz-options">${optionsHtml}</div>
        <button class="btn btn-primary" style="width:100%;" data-quiz-submit="${quiz.id}">${t('submitAnswer')}</button>
        <div class="quiz-result" id="quiz-result-${quiz.id}"></div>
      </div>`;

    // highlight selected option
    card.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        card.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    // Submit
    card.querySelector(`[data-quiz-submit="${quiz.id}"]`).addEventListener('click', () => {
      submitQuiz(card, quiz);
    });

    grid.appendChild(card);
  });
}

function submitQuiz(card, quiz) {
  const nameInput = card.querySelector('.quiz-name-input');
  const name = nameInput.value.trim();
  const selected = card.querySelector(`input[name="quiz-${quiz.id}"]:checked`);
  const resultEl = el(`quiz-result-${quiz.id}`);

  if (!name) {
    nameInput.focus();
    nameInput.style.borderColor = 'var(--danger)';
    setTimeout(() => nameInput.style.borderColor = '', 1500);
    return;
  }
  if (!selected) {
    toast(getLang() === 'ar' ? 'اختر إجابة أولاً' : 'Choisissez une réponse', 'info');
    return;
  }

  const idx = parseInt(selected.value, 10);
  const isCorrect = quiz.options[idx]?.isCorrect === true;

  // Disable the form
  card.querySelectorAll('input, button').forEach(el => el.disabled = true);

  // Visual feedback on options
  quiz.options.forEach((opt, i) => {
    const label = card.querySelector(`[data-idx="${i}"]`);
    if (!label) return;
    if (opt.isCorrect) label.classList.add('correct');
    else if (i === idx && !isCorrect) label.classList.add('incorrect');
  });

  // Result
  const lang = getLang();
  resultEl.classList.remove('hidden');
  resultEl.classList.add('show');
  if (isCorrect) {
    resultEl.textContent = '✅ ' + t('correct');
    resultEl.className = 'quiz-result show correct-result';
    playSuccess();
  } else {
    const correctOpt = quiz.options.find(o => o.isCorrect);
    const correctText = localizedField(correctOpt || {}, 'text');
    resultEl.textContent = `❌ ${t('incorrect')} "${correctText}"`;
    resultEl.className = 'quiz-result show incorrect-result';
    playError();
  }

  // Save reply
  const reply = {
    id: uuid(),
    studentName: name,
    quizId: quiz.id,
    quizTitleAr: quiz.titleAr,
    quizTitleFr: quiz.titleFr,
    selectedOptionIndex: idx,
    selectedTextAr: quiz.options[idx]?.textAr || '',
    selectedTextFr: quiz.options[idx]?.textFr || '',
    isCorrect,
    submittedAt: new Date().toISOString()
  };
  state.replies.unshift(reply);
  saveState(state);
  renderRepliesTimeline();
  updateKPIs();
  updateDashReplies();
}

// ── Replies Timeline ───────────────────────────────────────────
function renderRepliesTimeline() {
  const timeline = el('replies-timeline');
  if (!timeline) return;

  const replies = state.replies.slice(0, 20);
  empty(timeline);
  const lang = getLang();

  if (!replies.length) {
    timeline.innerHTML = `<div class="empty-state">
      <div class="empty-icon">💬</div>
      <div class="empty-title">${t('emptyRepliesTitle')}</div>
      <div class="empty-desc">${t('emptyRepliesDesc')}</div>
    </div>`;
    return;
  }

  replies.forEach(r => {
    const quizTitle = lang === 'fr' ? (r.quizTitleFr || r.quizTitleAr) : (r.quizTitleAr || r.quizTitleFr);
    const answer = lang === 'fr' ? (r.selectedTextFr || r.selectedTextAr) : (r.selectedTextAr || r.selectedTextFr);
    const initial = (r.studentName || '?')[0].toUpperCase();

    const item = createElement('div', 'reply-item fade-in');
    item.innerHTML = `
      <div class="reply-avatar">${initial}</div>
      <div class="reply-content">
        <div class="reply-meta">
          <span class="reply-name">${escapeHtml(r.studentName)}</span>
          <span class="badge badge-${r.isCorrect ? 'success' : 'danger'}">${r.isCorrect ? '✓' : '✗'}</span>
          <span class="reply-time">${timeAgo(r.submittedAt)}</span>
        </div>
        <p class="reply-quiz">${t('answeredQuiz')} <em>${escapeHtml(quizTitle)}</em></p>
        <p class="reply-answer">${t('selectedAnswer')} ${escapeHtml(answer)}</p>
      </div>`;
    timeline.appendChild(item);
  });
}

// ── Modals ─────────────────────────────────────────────────────
function initModals() {
  // Close on overlay click
  qsa('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
  // Close buttons with data-close-modal
  qsa('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });
  el('login-modal-close').addEventListener('click', () => closeModal('login-modal'));
  el('dashboard-modal-close').addEventListener('click', () => closeModal('dashboard-modal'));

  // Keyboard ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const open = qs('.modal-overlay.open');
      if (open) closeModal(open.id);
    }
  });
}

function openModal(id) {
  el(id)?.classList.add('open');
}
function closeModal(id) {
  el(id)?.classList.remove('open');
}

// ── Professor Auth ─────────────────────────────────────────────
function initProfessorAuth() {
  const loginForm = el('login-form');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = el('login-username').value.trim();
    const password = el('login-password').value;
    const prof = state.professor;

    if (username === prof.username && password === prof.password) {
      setSession({ username, displayName: prof.displayName });
      showLoggedIn();
      playSuccess();
      toast(getLang() === 'ar' ? 'مرحباً أستاذ!' : 'Bienvenue !', 'success');
    } else {
      const errEl = el('login-error');
      errEl.textContent = t('loginError');
      errEl.classList.add('show');
      playError();
      setTimeout(() => errEl.classList.remove('show'), 3000);
    }
  });

  el('logout-btn').addEventListener('click', () => {
    clearSession();
    showLoggedOut();
    closeModal('login-modal');
    toast(getLang() === 'ar' ? 'تم تسجيل الخروج' : 'Déconnecté', 'info');
    updateSidebarUser();
  });

  el('go-dashboard-btn').addEventListener('click', () => {
    closeModal('login-modal');
    openDashboard();
  });

  // Restore session on load
  const session = getSession();
  if (session) showLoggedIn();
  updateSidebarUser();
}

function showLoggedIn() {
  el('auth-login-view').classList.add('hidden');
  el('auth-logged-view').classList.remove('hidden');
  updateSidebarUser();
}

function showLoggedOut() {
  el('auth-login-view').classList.remove('hidden');
  el('auth-logged-view').classList.add('hidden');
  updateSidebarUser();
}

function updateSidebarUser() {
  const session = getSession();
  const nameEl = el('sidebar-user-name');
  const roleEl = el('sidebar-user-role');
  const avatarEl = el('sidebar-avatar');
  if (session) {
    nameEl.textContent = session.displayName || 'أستاذ';
    roleEl.textContent = 'Professeur';
    avatarEl.textContent = (session.displayName || 'P')[0];
  } else {
    nameEl.textContent = getLang() === 'ar' ? 'زائر' : 'Visiteur';
    roleEl.textContent = 'Visiteur';
    avatarEl.textContent = 'Z';
  }
}

// ── Dashboard ──────────────────────────────────────────────────
function openDashboard() {
  const session = getSession();
  if (!session) { openModal('login-modal'); return; }
  renderDashboard();
  openModal('dashboard-modal');
}

function renderDashboard() {
  updateDashCounts();
  renderDashLabs();
  renderDashQuizzes();
  updateDashReplies();
  initDashTabs();
  initLabForm();
  initQuizForm();
}

function updateDashCounts() {
  el('tab-count-labs').textContent = state.labs.length;
  el('tab-count-quizzes').textContent = state.quizzes.length;
  el('tab-count-replies').textContent = state.replies.length;
}

function initDashTabs() {
  qsa('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('[data-tab]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      qsa('.dash-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      el(`dash-panel-${btn.dataset.tab}`)?.classList.add('active');
      playClick();
    });
  });
}

// ── Dashboard Labs ─────────────────────────────────────────────
function renderDashLabs(filter = '') {
  const tbody = el('dash-labs-tbody');
  if (!tbody) return;
  const lang = getLang();
  let labs = state.labs;
  if (filter) labs = labs.filter(l =>
    localizedField(l, 'title').toLowerCase().includes(filter.toLowerCase())
  );

  empty(tbody);
  if (!labs.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem;">${t('emptyLabsTitle')}</td></tr>`;
    return;
  }

  labs.forEach(lab => {
    const title = localizedField(lab, 'title');
    const subjectTxt = labSubjectLabel[lab.subject]?.[lang] || lab.subject;
    const levelTxt = labLevelLabel[lab.level]?.[lang] || lab.level;
    const tr = createElement('tr');
    tr.innerHTML = `
      <td><span class="font-bold">${escapeHtml(title)}</span></td>
      <td><span class="badge ${labSubjectMap[lab.subject] || ''}">${subjectTxt}</span></td>
      <td><span class="badge badge-${lab.level}">${levelTxt}</span></td>
      <td><span class="badge badge-${lab.available ? 'available' : 'unavailable'}">${lab.available ? t('available') : t('unavailable')}</span></td>
      <td><span class="badge badge-${lab.published ? 'published' : 'draft'}">${lab.published ? t('published') : t('draft')}</span></td>
      <td>
        <div class="row-actions">
          <button class="row-action-btn edit-btn" data-action="edit" data-id="${lab.id}" title="Edit">✏️</button>
          <button class="row-action-btn ${lab.published ? 'unpublish-btn' : 'publish-btn'}" data-action="toggle-pub" data-id="${lab.id}" title="Toggle publish">
            ${lab.published ? '👁' : '📤'}
          </button>
          <button class="row-action-btn delete-btn" data-action="delete" data-id="${lab.id}" title="Delete">🗑</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'edit') openLabEdit(id);
    if (action === 'toggle-pub') toggleLabPublish(id);
    if (action === 'delete') confirmDelete('lab', id);
  });
}

function initLabForm() {
  el('add-lab-btn').onclick = () => {
    resetLabForm();
    el('lab-form-title').textContent = t('addLab');
    el('lab-form-id').value = '';
    openModal('lab-form-modal');
  };

  el('lab-form').onsubmit = e => {
    e.preventDefault();
    saveLabForm();
  };

  const searchInput = el('dash-labs-search');
  if (searchInput) searchInput.addEventListener('input', debounce(() => renderDashLabs(searchInput.value), 250));
}

function resetLabForm() {
  el('lab-title-ar').value = '';
  el('lab-title-fr').value = '';
  el('lab-desc-ar').value = '';
  el('lab-desc-fr').value = '';
  el('lab-subject').value = 'physics';
  el('lab-level').value = 'cem';
  el('lab-type').value = 'physics';
  el('lab-available').checked = true;
  el('lab-published').checked = true;
}

function openLabEdit(id) {
  const lab = state.labs.find(l => l.id === id);
  if (!lab) return;
  el('lab-form-id').value = lab.id;
  el('lab-title-ar').value = lab.titleAr || '';
  el('lab-title-fr').value = lab.titleFr || '';
  el('lab-desc-ar').value = lab.descriptionAr || '';
  el('lab-desc-fr').value = lab.descriptionFr || '';
  el('lab-subject').value = lab.subject || 'physics';
  el('lab-level').value = lab.level || 'cem';
  el('lab-type').value = lab.labType || 'physics';
  el('lab-available').checked = !!lab.available;
  el('lab-published').checked = !!lab.published;
  el('lab-form-title').textContent = t('editLab');
  openModal('lab-form-modal');
}

function saveLabForm() {
  const id = el('lab-form-id').value;
  const data = {
    titleAr: el('lab-title-ar').value.trim(),
    titleFr: el('lab-title-fr').value.trim(),
    descriptionAr: el('lab-desc-ar').value.trim(),
    descriptionFr: el('lab-desc-fr').value.trim(),
    subject: el('lab-subject').value,
    level: el('lab-level').value,
    labType: el('lab-type').value,
    available: el('lab-available').checked,
    published: el('lab-published').checked
  };
  if (!data.titleAr) { el('lab-title-ar').focus(); return; }

  if (id) {
    const idx = state.labs.findIndex(l => l.id === id);
    if (idx !== -1) state.labs[idx] = { ...state.labs[idx], ...data };
    toast(getLang() === 'ar' ? 'تم التحديث' : 'Mis à jour', 'success');
  } else {
    state.labs.push({ id: uuid(), ...data, createdAt: new Date().toISOString() });
    toast(getLang() === 'ar' ? 'تم الإضافة' : 'Ajouté', 'success');
  }
  saveState(state);
  closeModal('lab-form-modal');
  renderDashLabs();
  renderLabsGrid();
  updateKPIs();
  updateDashCounts();
  playSuccess();
}

function toggleLabPublish(id) {
  const lab = state.labs.find(l => l.id === id);
  if (!lab) return;
  lab.published = !lab.published;
  saveState(state);
  renderDashLabs();
  renderLabsGrid();
  updateKPIs();
  updateDashCounts();
}

// ── Dashboard Quizzes ──────────────────────────────────────────
function renderDashQuizzes(filter = '') {
  const tbody = el('dash-quizzes-tbody');
  if (!tbody) return;
  const lang = getLang();
  let quizzes = state.quizzes;
  if (filter) quizzes = quizzes.filter(q =>
    localizedField(q, 'title').toLowerCase().includes(filter.toLowerCase())
  );

  empty(tbody);
  if (!quizzes.length) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:2rem;">${t('emptyQuizzesTitle')}</td></tr>`;
    return;
  }

  quizzes.forEach(quiz => {
    const title = localizedField(quiz, 'title');
    const question = localizedField(quiz, 'question');
    const subjectTxt = labSubjectLabel[quiz.subject]?.[lang] || quiz.subject;
    const tr = createElement('tr');
    tr.innerHTML = `
      <td><span class="font-bold">${escapeHtml(title)}</span></td>
      <td><span class="badge ${labSubjectMap[quiz.subject] || ''}">${subjectTxt}</span></td>
      <td class="text-muted text-sm" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(question)}</td>
      <td><span class="badge badge-${quiz.published ? 'published' : 'draft'}">${quiz.published ? t('published') : t('draft')}</span></td>
      <td>
        <div class="row-actions">
          <button class="row-action-btn edit-btn" data-action="edit" data-id="${quiz.id}" title="Edit">✏️</button>
          <button class="row-action-btn ${quiz.published ? 'unpublish-btn' : 'publish-btn'}" data-action="toggle-pub" data-id="${quiz.id}">
            ${quiz.published ? '👁' : '📤'}
          </button>
          <button class="row-action-btn delete-btn" data-action="delete" data-id="${quiz.id}" title="Delete">🗑</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'edit') openQuizEdit(id);
    if (action === 'toggle-pub') toggleQuizPublish(id);
    if (action === 'delete') confirmDelete('quiz', id);
  });
}

function initQuizForm() {
  el('add-quiz-btn').onclick = () => {
    resetQuizForm();
    el('quiz-form-title').textContent = t('addQuiz');
    el('quiz-form-id').value = '';
    openModal('quiz-form-modal');
  };

  el('quiz-form').onsubmit = e => {
    e.preventDefault();
    saveQuizForm();
  };

  const searchInput = el('dash-quizzes-search');
  if (searchInput) searchInput.addEventListener('input', debounce(() => renderDashQuizzes(searchInput.value), 250));

  buildOptionRows();
}

function buildOptionRows(opts = [
  { textAr: '', textFr: '', isCorrect: true },
  { textAr: '', textFr: '', isCorrect: false },
  { textAr: '', textFr: '', isCorrect: false },
  { textAr: '', textFr: '', isCorrect: false }
]) {
  const builder = el('option-builder');
  if (!builder) return;
  empty(builder);
  opts.forEach((opt, idx) => {
    const row = createElement('div', 'option-row');
    row.innerHTML = `
      <input class="form-input" type="text" placeholder="الخيار (عربي)" value="${escapeHtml(opt.textAr)}" data-opt-ar="${idx}" />
      <input class="form-input" type="text" placeholder="Option (fr)" value="${escapeHtml(opt.textFr)}" data-opt-fr="${idx}" />
      <input type="radio" name="correct-opt" value="${idx}" ${opt.isCorrect ? 'checked' : ''} title="Correct" />
      <label style="font-size:.75rem;color:var(--text-muted);">✓</label>`;
    builder.appendChild(row);
  });
}

function resetQuizForm() {
  el('quiz-title-ar').value = '';
  el('quiz-title-fr').value = '';
  el('quiz-question-ar').value = '';
  el('quiz-question-fr').value = '';
  el('quiz-subject').value = 'physics';
  el('quiz-published').checked = true;
  buildOptionRows();
}

function openQuizEdit(id) {
  const quiz = state.quizzes.find(q => q.id === id);
  if (!quiz) return;
  el('quiz-form-id').value = quiz.id;
  el('quiz-title-ar').value = quiz.titleAr || '';
  el('quiz-title-fr').value = quiz.titleFr || '';
  el('quiz-question-ar').value = quiz.questionAr || '';
  el('quiz-question-fr').value = quiz.questionFr || '';
  el('quiz-subject').value = quiz.subject || 'physics';
  el('quiz-published').checked = !!quiz.published;
  buildOptionRows(quiz.options || []);
  el('quiz-form-title').textContent = t('editQuiz');
  openModal('quiz-form-modal');
}

function saveQuizForm() {
  const id = el('quiz-form-id').value;
  const builder = el('option-builder');
  const correctIdx = parseInt(qs('input[name="correct-opt"]:checked', builder)?.value ?? '0', 10);

  const options = Array.from(qsa('.option-row', builder)).map((row, idx) => ({
    textAr: row.querySelector(`[data-opt-ar="${idx}"]`)?.value.trim() || '',
    textFr: row.querySelector(`[data-opt-fr="${idx}"]`)?.value.trim() || '',
    isCorrect: idx === correctIdx
  }));

  const data = {
    titleAr: el('quiz-title-ar').value.trim(),
    titleFr: el('quiz-title-fr').value.trim(),
    questionAr: el('quiz-question-ar').value.trim(),
    questionFr: el('quiz-question-fr').value.trim(),
    subject: el('quiz-subject').value,
    options,
    published: el('quiz-published').checked
  };
  if (!data.titleAr) { el('quiz-title-ar').focus(); return; }
  if (!data.questionAr) { el('quiz-question-ar').focus(); return; }

  if (id) {
    const idx = state.quizzes.findIndex(q => q.id === id);
    if (idx !== -1) state.quizzes[idx] = { ...state.quizzes[idx], ...data };
    toast(getLang() === 'ar' ? 'تم التحديث' : 'Mis à jour', 'success');
  } else {
    state.quizzes.push({ id: uuid(), ...data, createdAt: new Date().toISOString() });
    toast(getLang() === 'ar' ? 'تم الإضافة' : 'Ajouté', 'success');
  }
  saveState(state);
  closeModal('quiz-form-modal');
  renderDashQuizzes();
  renderQuizzesGrid();
  updateKPIs();
  updateDashCounts();
  playSuccess();
}

function toggleQuizPublish(id) {
  const quiz = state.quizzes.find(q => q.id === id);
  if (!quiz) return;
  quiz.published = !quiz.published;
  saveState(state);
  renderDashQuizzes();
  renderQuizzesGrid();
  updateKPIs();
  updateDashCounts();
}

// ── Dashboard Replies ──────────────────────────────────────────
function updateDashReplies() {
  const tbody = el('dash-replies-tbody');
  if (!tbody) return;
  const lang = getLang();
  const replies = state.replies;

  el('stat-total-replies').textContent = replies.length;
  el('stat-correct-replies').textContent = replies.filter(r => r.isCorrect).length;
  el('stat-wrong-replies').textContent = replies.filter(r => !r.isCorrect).length;
  el('tab-count-replies').textContent = replies.length;

  empty(tbody);
  if (!replies.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem;">${t('emptyRepliesTitle')}</td></tr>`;
    return;
  }

  replies.forEach(r => {
    const quizTitle = lang === 'fr' ? (r.quizTitleFr || r.quizTitleAr) : (r.quizTitleAr || r.quizTitleFr);
    const answer = lang === 'fr' ? (r.selectedTextFr || r.selectedTextAr) : (r.selectedTextAr || r.selectedTextFr);
    const tr = createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(r.studentName)}</strong></td>
      <td>${escapeHtml(quizTitle || '-')}</td>
      <td>${escapeHtml(answer || '-')}</td>
      <td><span class="badge badge-${r.isCorrect ? 'success' : 'danger'}">${r.isCorrect ? '✓ صح' : '✗ خطأ'}</span></td>
      <td class="text-muted text-sm">${formatDateTime(r.submittedAt)}</td>
      <td>
        <button class="row-action-btn delete-btn" data-action="delete-reply" data-id="${r.id}">🗑</button>
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="delete-reply"]');
    if (!btn) return;
    confirmDelete('reply', btn.dataset.id);
  });

  // Clear All
  const clearBtn = el('clear-replies-btn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      confirmAction(
        '🗑️', t('clearAll'), t('confirmClearAll'),
        () => {
          state.replies = [];
          saveState(state);
          updateDashReplies();
          renderRepliesTimeline();
          updateKPIs();
          toast(getLang() === 'ar' ? 'تم حذف الكل' : 'Tout supprimé', 'success');
        }
      );
    };
  }
}

// ── Confirm Delete ─────────────────────────────────────────────
function confirmDelete(type, id) {
  confirmAction('⚠️', t('confirmDelete'), '', () => {
    if (type === 'lab') {
      state.labs = state.labs.filter(l => l.id !== id);
      renderDashLabs();
      renderLabsGrid();
    } else if (type === 'quiz') {
      state.quizzes = state.quizzes.filter(q => q.id !== id);
      renderDashQuizzes();
      renderQuizzesGrid();
    } else if (type === 'reply') {
      state.replies = state.replies.filter(r => r.id !== id);
      updateDashReplies();
      renderRepliesTimeline();
    }
    saveState(state);
    updateKPIs();
    updateDashCounts();
    toast(getLang() === 'ar' ? 'تم الحذف' : 'Supprimé', 'success');
  });
}

function confirmAction(icon, title, desc, onOk) {
  el('confirm-icon').textContent = icon;
  el('confirm-title').textContent = title;
  el('confirm-desc').textContent = desc;
  openModal('confirm-modal');

  const okBtn = el('confirm-ok');
  const cancelBtn = el('confirm-cancel');

  const cleanup = () => {
    okBtn.replaceWith(okBtn.cloneNode(true));
    cancelBtn.replaceWith(cancelBtn.cloneNode(true));
  };

  el('confirm-ok').addEventListener('click', () => {
    closeModal('confirm-modal');
    onOk();
    cleanup();
  }, { once: true });

  el('confirm-cancel').addEventListener('click', () => {
    closeModal('confirm-modal');
    cleanup();
  }, { once: true });
}

// ── Chatbot ────────────────────────────────────────────────────
function initChatbot() {
  const fab     = el('chatbot-fab');
  const widget  = el('chatbot-widget');
  const closeBtn= el('chatbot-close');
  const form    = el('chatbot-form');
  const input   = el('chatbot-input');
  const messages= el('chatbot-messages');

  fab.addEventListener('click', () => {
    const isOpen = widget.classList.toggle('open');
    fab.setAttribute('aria-expanded', isOpen);
    if (isOpen) setTimeout(() => input.focus(), 200);
    playClick();
  });
  closeBtn.addEventListener('click', () => {
    widget.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
  });

  // Enter to send (Shift+Enter for newline)
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    input.style.height = 'auto';

    appendChatBubble(msg, 'user');
    const typing = appendTypingIndicator();

    try {
      const res = await fetch('/.netlify/functions/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          history: chatHistory.slice(-6).map(m => ({ role: m.role, text: m.text }))
        })
      });
      const data = await res.json();
      typing.remove();

      if (data.reply) {
        appendChatBubble(data.reply, 'bot');
        chatHistory.push({ role: 'user', text: msg });
        chatHistory.push({ role: 'assistant', text: data.reply });
        if (chatHistory.length > 20) chatHistory.splice(0, 2);
      } else {
        appendChatBubble(t('chatbotError'), 'bot');
      }
    } catch {
      typing.remove();
      appendChatBubble(t('chatbotError'), 'bot');
    }
    messages.scrollTop = messages.scrollHeight;
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
}

function appendChatBubble(text, role) {
  const messages = el('chatbot-messages');
  const bubble = createElement('div', `chat-bubble ${role}`);
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function appendTypingIndicator() {
  const messages = el('chatbot-messages');
  const typing = createElement('div', 'chat-typing');
  typing.innerHTML = '<span class="chat-dot"></span><span class="chat-dot"></span><span class="chat-dot"></span>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  return typing;
}

// ── Helpers ────────────────────────────────────────────────────
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Intersection observer for counter animation ────────────────
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = el('hero-section');
  if (!heroSection) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      updateKPIs();
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(heroSection);
});
