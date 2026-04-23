/* ═══════════════════════════════════════════════════════════════
   PHYSICS SIMULATION  ·  physics.js
   Experiments: Free Fall · Inclined Plane · Pendulum · Newton's Cradle · Projectile
   Vanilla Canvas 2D — no Three.js dependency
═══════════════════════════════════════════════════════════════ */
'use strict';

window.labInit = function({ lang, canvas, controlsEl, measurementsEl, hudEl,
  graphPanelEl, graphCanvas, formulaEl, instructionsTitle, instructionsList,
  expSelector, loadingEl }) {

  const G = 9.81; // m/s²
  const SCALE = 60; // px per metre
  let currentExp = 'freefall';
  let animId = null;
  let ctx, GW, GH;

  // ── Helpers ────────────────────────────────────────────────
  const T = {
    ar: {
      freefall: 'السقوط الحر',
      inclined: 'المستوى المائل',
      pendulum: 'البندول',
      cradle:   'مهد نيوتن',
      projectile:'الحركة المقذوفة',
      height: 'الارتفاع', velocity: 'السرعة', time: 'الزمن',
      angle: 'الزاوية', friction: 'الاحتكاك', length: 'الطول',
      drop: 'أسقط الكرة', release: 'حرر', fire: 'أطلق',
      reset: 'إعادة', pull: 'اسحب البندول',
      ballsLabel: 'عدد الكرات', velLabel: 'السرعة الابتدائية',
      angleLabel: 'زاوية الإطلاق',
      step: ['اضبط الارتفاع', 'اضغط أسقط', 'شاهد السقوط والتسارع', 'راقب الرسم البياني'],
    },
    fr: {
      freefall: 'Chute Libre',
      inclined: 'Plan Incliné',
      pendulum: 'Pendule',
      cradle:   'Pendule de Newton',
      projectile:'Tir Parabolique',
      height: 'Hauteur', velocity: 'Vitesse', time: 'Temps',
      angle: 'Angle', friction: 'Friction', length: 'Longueur',
      drop: 'Lâcher la balle', release: 'Relâcher', fire: 'Lancer',
      reset: 'Réinitialiser', pull: 'Tirer le pendule',
      ballsLabel: 'Nombre de billes', velLabel: 'Vitesse initiale',
      angleLabel: 'Angle de lancement',
      step: ['Ajustez la hauteur', 'Cliquez Lâcher', 'Observez la chute', 'Regardez le graphique'],
    }
  };
  const tx = k => (T[lang] || T.ar)[k] || k;

  // ── Build exp selector tabs ─────────────────────────────────
  const exps = ['freefall','inclined','pendulum','cradle','projectile'];
  exps.forEach(e => {
    const btn = document.createElement('button');
    btn.className = 'exp-tab' + (e === currentExp ? ' active' : '');
    btn.textContent = tx(e);
    btn.dataset.exp = e;
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => switchExp(e));
    expSelector.appendChild(btn);
  });

  // ── Canvas setup ────────────────────────────────────────────
  function resizeCanvas() {
    const area = canvas.parentElement;
    canvas.width  = area.clientWidth;
    canvas.height = area.clientHeight;
    GW = canvas.width;
    GH = canvas.height;
  }
  window.addEventListener('resize', () => { resizeCanvas(); initExp(); });
  resizeCanvas();
  ctx = canvas.getContext('2d');

  // ── Instructions ────────────────────────────────────────────
  function setInstructions(steps) {
    instructionsList.innerHTML = '';
    steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="step-num">${i+1}</span><span>${s}</span>`;
      instructionsList.appendChild(li);
    });
  }

  // ── HUD update ───────────────────────────────────────────────
  function setHUD(pairs) {
    hudEl.innerHTML = '';
    pairs.forEach(([label, val]) => {
      const chip = document.createElement('div');
      chip.className = 'hud-chip';
      chip.innerHTML = `<span class="hud-label">${label}: </span>${val}`;
      hudEl.appendChild(chip);
    });
  }

  // ── Measurements ─────────────────────────────────────────────
  function setMeasurements(pairs) {
    measurementsEl.innerHTML = '';
    pairs.forEach(([k, v]) => {
      const row = document.createElement('div');
      row.className = 'measurement-row';
      row.innerHTML = `<span class="measurement-key">${k}</span><span class="measurement-val">${v}</span>`;
      measurementsEl.appendChild(row);
    });
  }

  // ── Graph ─────────────────────────────────────────────────────
  const graphCtx = graphCanvas.getContext('2d');
  let graphData = { t: [], v: [], h: [] };

  function resizeGraph() {
    graphCanvas.width  = graphCanvas.parentElement.clientWidth;
    graphCanvas.height = graphCanvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeGraph);
  resizeGraph();

  function drawGraph() {
    const gw = graphCanvas.width, gh = graphCanvas.height;
    graphCtx.clearRect(0, 0, gw, gh);
    graphCtx.fillStyle = 'rgba(10,14,26,0.0)';
    graphCtx.fillRect(0, 0, gw, gh);

    if (graphData.t.length < 2) return;

    const maxT = Math.max(...graphData.t, 0.01);
    const maxV = Math.max(...graphData.v, 0.01);
    const maxH = Math.max(...graphData.h, 0.01);
    const pad = 30;

    // axes
    graphCtx.strokeStyle = 'rgba(255,255,255,0.1)';
    graphCtx.beginPath();
    graphCtx.moveTo(pad, pad); graphCtx.lineTo(pad, gh - pad);
    graphCtx.moveTo(pad, gh - pad); graphCtx.lineTo(gw - 10, gh - pad);
    graphCtx.stroke();

    // velocity (teal)
    graphCtx.strokeStyle = '#00d4b4'; graphCtx.lineWidth = 1.5;
    graphCtx.beginPath();
    graphData.t.forEach((t, i) => {
      const x = pad + (t / maxT) * (gw - pad - 10);
      const y = gh - pad - (graphData.v[i] / maxV) * (gh - 2 * pad);
      i === 0 ? graphCtx.moveTo(x, y) : graphCtx.lineTo(x, y);
    });
    graphCtx.stroke();

    // height (gold)
    graphCtx.strokeStyle = '#f5c842'; graphCtx.lineWidth = 1.5;
    graphCtx.beginPath();
    graphData.t.forEach((t, i) => {
      const x = pad + (t / maxT) * (gw - pad - 10);
      const y = gh - pad - (graphData.h[i] / maxH) * (gh - 2 * pad);
      i === 0 ? graphCtx.moveTo(x, y) : graphCtx.lineTo(x, y);
    });
    graphCtx.stroke();

    // legend
    graphCtx.font = '10px JetBrains Mono, monospace';
    graphCtx.fillStyle = '#00d4b4'; graphCtx.fillText('v(t)', gw - 45, pad + 6);
    graphCtx.fillStyle = '#f5c842'; graphCtx.fillText('h(t)', gw - 45, pad + 18);
  }

  // ── Reusable draw helpers ─────────────────────────────────────
  function drawBall(x, y, r = 16, color = '#00d4b4', label = '') {
    const grd = ctx.createRadialGradient(x - r*0.3, y - r*0.3, r*0.1, x, y, r);
    grd.addColorStop(0, '#fff');
    grd.addColorStop(0.3, color);
    grd.addColorStop(1, '#0a0e1a');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    if (label) {
      ctx.fillStyle = '#fff';
      ctx.font = '11px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
    }
  }

  function drawGround(y) {
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, y, GW, GH - y);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(GW, y); ctx.stroke();
  }

  function drawDashedLine(x1, y1, x2, y2, color = 'rgba(255,255,255,0.15)') {
    ctx.save();
    ctx.setLineDash([6, 5]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════
  //  FREE FALL
  // ═══════════════════════════════════════════════════════════
  let ff = {};
  function initFreeFall() {
    ff = {
      h0: 5, // metres
      y: 0, vy: 0, t: 0,
      dropped: false, landed: false,
      trail: [],
      heightSlider: null
    };
    graphData = { t: [], v: [], h: [] };
    graphPanelEl.classList.add('show');
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'h(t) = h₀ - ½g·t²   |   v(t) = g·t';
    setInstructions(T[lang].step.map((s, i) => s));
    buildFreeFallControls();
    setMeasurements([
      [tx('height'), `${ff.h0.toFixed(1)} m`],
      [tx('velocity'), '0.00 m/s'],
      [tx('time'), '0.00 s']
    ]);
  }

  function buildFreeFallControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">${tx('height')}</div>
        <div class="control-row">
          <span class="control-label">${tx('height')}</span>
          <input type="range" class="control-slider" id="ff-height" min="1" max="12" step="0.5" value="${ff.h0}" />
          <span class="control-value" id="ff-height-val">${ff.h0} m</span>
        </div>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-primary" id="ff-drop-btn">⬇ ${tx('drop')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="ff-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    const slider = document.getElementById('ff-height');
    const valEl  = document.getElementById('ff-height-val');
    slider.addEventListener('input', () => {
      if (!ff.dropped) {
        ff.h0 = parseFloat(slider.value);
        valEl.textContent = ff.h0 + ' m';
        setMeasurements([[tx('height'), ff.h0.toFixed(1)+' m'],[tx('velocity'),'0.00 m/s'],[tx('time'),'0.00 s']]);
      }
    });

    document.getElementById('ff-drop-btn').addEventListener('click', () => {
      if (!ff.dropped && !ff.landed) {
        ff.dropped = true;
        ff.y = 0; ff.vy = 0; ff.t = 0;
        ff.trail = [];
        graphData = { t: [], v: [], h: [] };
        playBeep(440);
      }
    });

    document.getElementById('ff-reset-btn').addEventListener('click', resetFreeFall);
  }

  function resetFreeFall() {
    ff.dropped = false; ff.landed = false;
    ff.y = 0; ff.vy = 0; ff.t = 0;
    ff.trail = [];
    graphData = { t: [], v: [], h: [] };
    setMeasurements([[tx('height'), ff.h0.toFixed(1)+' m'],[tx('velocity'),'0.00 m/s'],[tx('time'),'0.00 s']]);
  }

  function stepFreeFall(dt) {
    if (!ff.dropped || ff.landed) return;
    ff.vy += G * dt;
    ff.y  += ff.vy * dt;
    ff.t  += dt;

    const hNow = Math.max(0, ff.h0 - ff.y);
    graphData.t.push(+ff.t.toFixed(3));
    graphData.v.push(+ff.vy.toFixed(3));
    graphData.h.push(+hNow.toFixed(3));

    setMeasurements([
      [tx('height'),   hNow.toFixed(2) + ' m'],
      [tx('velocity'), ff.vy.toFixed(2) + ' m/s'],
      [tx('time'),     ff.t.toFixed(2)  + ' s']
    ]);
    setHUD([[tx('height'), hNow.toFixed(2)+' m'],[tx('velocity'), ff.vy.toFixed(2)+' m/s']]);

    if (ff.y >= ff.h0) {
      ff.landed = true;
      ff.y = ff.h0;
      playBeep(220, 'triangle', 0.3);
    }
  }

  function drawFreeFall() {
    const groundY = GH - 60;
    const cx = GW / 2;
    const maxH = ff.h0 * SCALE;
    const ballY = groundY - maxH + ff.y * SCALE;

    ctx.clearRect(0, 0, GW, GH);
    drawGround(groundY);

    // height indicator line
    drawDashedLine(cx - 50, groundY - maxH, cx - 50, groundY);
    ctx.fillStyle = 'rgba(0,212,180,0.6)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${ff.h0}m`, cx - 70, groundY - maxH / 2);

    // trail
    ff.trail.push({ x: cx, y: ballY });
    if (ff.trail.length > 40) ff.trail.shift();
    ff.trail.forEach((pt, i) => {
      const alpha = i / ff.trail.length;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4 * alpha, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,180,${alpha * 0.5})`;
      ctx.fill();
    });

    drawBall(cx, ballY, 16, '#00d4b4');

    if (ff.landed) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = 'bold 14px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      const msg = lang === 'ar'
        ? `الارتفاع: ${ff.h0}m  ·  الزمن: ${ff.t.toFixed(2)}s  ·  السرعة: ${ff.vy.toFixed(1)}m/s`
        : `H=${ff.h0}m · t=${ff.t.toFixed(2)}s · v=${ff.vy.toFixed(1)}m/s`;
      ctx.fillText(msg, GW / 2, groundY - 15);
    }
    drawGraph();
  }

  // ═══════════════════════════════════════════════════════════
  //  INCLINED PLANE
  // ═══════════════════════════════════════════════════════════
  let ip = {};
  function initInclined() {
    ip = { angle: 30, mu: 0.2, released: false, s: 0, vs: 0, t: 0 };
    graphData = { t: [], v: [], h: [] };
    graphPanelEl.classList.add('show');
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'a = g·sin θ - μ·g·cos θ';
    buildInclinedControls();
    setMeasurements([[tx('velocity'),'0.00 m/s'],[tx('time'),'0.00 s'],[tx('angle'),ip.angle+'°']]);
  }

  function buildInclinedControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">Paramètres</div>
        <div class="control-row">
          <span class="control-label">${tx('angle')}</span>
          <input type="range" class="control-slider" id="ip-angle" min="5" max="70" step="1" value="${ip.angle}" />
          <span class="control-value" id="ip-angle-val">${ip.angle}°</span>
        </div>
        <div class="control-row">
          <span class="control-label">${tx('friction')}</span>
          <input type="range" class="control-slider" id="ip-mu" min="0" max="0.8" step="0.05" value="${ip.mu}" />
          <span class="control-value" id="ip-mu-val">${ip.mu.toFixed(2)}</span>
        </div>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-primary" id="ip-release-btn">▶ ${tx('release')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="ip-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    document.getElementById('ip-angle').addEventListener('input', e => {
      if (!ip.released) {
        ip.angle = +e.target.value;
        document.getElementById('ip-angle-val').textContent = ip.angle + '°';
      }
    });
    document.getElementById('ip-mu').addEventListener('input', e => {
      if (!ip.released) {
        ip.mu = +e.target.value;
        document.getElementById('ip-mu-val').textContent = ip.mu.toFixed(2);
      }
    });
    document.getElementById('ip-release-btn').addEventListener('click', () => {
      if (!ip.released) { ip.released = true; ip.s = 0; ip.vs = 0; ip.t = 0; graphData = {t:[],v:[],h:[]}; playBeep(440); }
    });
    document.getElementById('ip-reset-btn').addEventListener('click', () => { ip.released = false; ip.s = 0; ip.vs = 0; ip.t = 0; graphData = {t:[],v:[],h:[]}; });
  }

  function stepInclined(dt) {
    if (!ip.released) return;
    const rad   = ip.angle * Math.PI / 180;
    const acc   = G * Math.sin(rad) - ip.mu * G * Math.cos(rad);
    if (acc > 0) {
      ip.vs += acc * dt;
      ip.s  += ip.vs * dt;
      ip.t  += dt;
    }
    const rampLen = 6; // metres
    if (ip.s >= rampLen) { ip.s = rampLen; ip.released = false; playBeep(330, 'triangle', 0.3); }
    graphData.t.push(+ip.t.toFixed(3));
    graphData.v.push(+ip.vs.toFixed(3));
    graphData.h.push(+(ip.s * Math.sin(ip.angle * Math.PI/180)).toFixed(3));
    setMeasurements([[tx('velocity'),ip.vs.toFixed(2)+' m/s'],[tx('time'),ip.t.toFixed(2)+' s'],[tx('angle'),ip.angle+'°']]);
  }

  function drawInclined() {
    ctx.clearRect(0, 0, GW, GH);
    const px = GW * 0.15, py = GH - 80;
    const rad = ip.angle * Math.PI / 180;
    const rampPx = 400;
    const ex = px + Math.cos(rad) * rampPx;
    const ey = py - Math.sin(rad) * rampPx;

    ctx.fillStyle = 'rgba(26,35,50,0.8)';
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.lineTo(ex, py); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,212,180,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.stroke();

    // angle arc
    ctx.strokeStyle = 'rgba(245,200,66,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ex, py, 40, Math.PI, Math.PI + rad); ctx.stroke();
    ctx.fillStyle = '#f5c842'; ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center'; ctx.fillText(ip.angle + '°', ex - 55, py - 10);

    // ball on ramp
    const rampLen = 6;
    const frac = Math.min(ip.s / rampLen, 1);
    const bx = ex - Math.cos(rad) * rampPx * (1 - frac);
    const by = py - Math.sin(rad) * rampPx * (1 - frac);
    drawBall(bx, by, 14, '#00d4b4');

    // force arrows when sliding
    if (ip.released) {
      drawArrow(bx, by, bx + Math.cos(rad)*40*ip.vs/5, by - Math.sin(rad)*40*ip.vs/5, '#00d4b4', 'v');
    }
    drawGround(py);
    drawGraph();
  }

  function drawArrow(x1, y1, x2, y2, color, label) {
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.translate(x2, y2); ctx.rotate(angle);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-8,-4); ctx.lineTo(-8,4); ctx.closePath(); ctx.fill();
    ctx.restore();
    if (label) { ctx.fillStyle = color; ctx.font = '11px sans-serif'; ctx.fillText(label, x2+5, y2-5); }
  }

  // ═══════════════════════════════════════════════════════════
  //  PENDULUM
  // ═══════════════════════════════════════════════════════════
  let pend = {};
  function initPendulum() {
    pend = { L: 1.5, theta: 0.6, omega: 0, t: 0, dragging: false, damping: 0.999, running: false };
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'T = 2π√(L/g)';
    graphPanelEl.classList.remove('show');
    buildPendulumControls();
    setMeasurements([['T', calcPeriod(pend.L)+'s'],['θ', (pend.theta*180/Math.PI).toFixed(1)+'°'],[tx('length'),pend.L+' m']]);
  }

  function calcPeriod(L) { return (2 * Math.PI * Math.sqrt(L / G)).toFixed(3); }

  function buildPendulumControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">${tx('length')}</div>
        <div class="control-row">
          <span class="control-label">${tx('length')}</span>
          <input type="range" class="control-slider" id="pend-L" min="0.3" max="4" step="0.1" value="${pend.L}" />
          <span class="control-value" id="pend-L-val">${pend.L} m</span>
        </div>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-primary" id="pend-start-btn">▶ ${tx('release')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="pend-reset-btn">↺ ${tx('reset')}</button>
      </div>
      <div class="control-section">
        <div class="control-section-title">Période calculée</div>
        <div class="measurement-row">
          <span class="measurement-key">T</span>
          <span class="measurement-val" id="pend-period">${calcPeriod(pend.L)} s</span>
        </div>
      </div>`;

    document.getElementById('pend-L').addEventListener('input', e => {
      pend.L = +e.target.value;
      document.getElementById('pend-L-val').textContent = pend.L + ' m';
      document.getElementById('pend-period').textContent = calcPeriod(pend.L) + ' s';
      setMeasurements([['T', calcPeriod(pend.L)+'s'],['θ', (pend.theta*180/Math.PI).toFixed(1)+'°'],[tx('length'),pend.L+' m']]);
    });
    document.getElementById('pend-start-btn').addEventListener('click', () => { pend.running = true; playBeep(520); });
    document.getElementById('pend-reset-btn').addEventListener('click', () => { pend.running = false; pend.theta = 0.6; pend.omega = 0; pend.t = 0; });
  }

  function stepPendulum(dt) {
    if (!pend.running) return;
    const alpha = -(G / pend.L) * Math.sin(pend.theta);
    pend.omega += alpha * dt;
    pend.omega *= pend.damping;
    pend.theta += pend.omega * dt;
    pend.t += dt;
    setHUD([['θ', (pend.theta*180/Math.PI).toFixed(1)+'°'],['ω', pend.omega.toFixed(3)+' rad/s']]);
  }

  function drawPendulum() {
    ctx.clearRect(0, 0, GW, GH);
    const pivotX = GW / 2, pivotY = 100;
    const Lpx = pend.L * SCALE * 1.5;
    const bx = pivotX + Lpx * Math.sin(pend.theta);
    const by = pivotY + Lpx * Math.cos(pend.theta);

    // string
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bx, by); ctx.stroke();

    // pivot
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fill();

    // equilibrium line
    drawDashedLine(pivotX, pivotY, pivotX, pivotY + Lpx + 20);

    drawBall(bx, by, 18, '#f5c842');

    // arc trail
    ctx.strokeStyle = 'rgba(245,200,66,0.2)'; ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, Lpx, Math.PI/2 - Math.abs(pend.theta)*1.2, Math.PI/2 + Math.abs(pend.theta)*1.2);
    ctx.stroke();

    formulaEl.textContent = `T = 2π√(L/g) = ${calcPeriod(pend.L)} s  ·  θ = ${(pend.theta*180/Math.PI).toFixed(1)}°`;
  }

  // ═══════════════════════════════════════════════════════════
  //  NEWTON'S CRADLE
  // ═══════════════════════════════════════════════════════════
  let cradle = {};
  function initCradle() {
    const n = 5, R = 18, spacing = 42;
    const cx = GW / 2;
    cradle = {
      n, R, spacing,
      balls: Array.from({ length: n }, (_, i) => ({
        theta: 0, omega: 0, L: 160,
        x: cx + (i - (n-1)/2) * spacing,
        y: 0 // will be computed
      })),
      pulled: 0, running: false
    };
    cradle.pivotY = 80;
    cradle.balls.forEach(b => { b.y = cradle.pivotY + b.L; });
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'Conservation de la quantité de mouvement : m₁v₁ = m₂v₂';
    graphPanelEl.classList.remove('show');
    buildCradleControls();
  }

  function buildCradleControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">${tx('ballsLabel')}</div>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap;">
          ${[1,2,3].map(n => `<button class="ctrl-btn ctrl-btn-secondary" style="flex:1;min-width:50px;" id="cradle-pull-${n}">${n}</button>`).join('')}
        </div>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-danger" id="cradle-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    [1,2,3].forEach(n => {
      document.getElementById(`cradle-pull-${n}`).addEventListener('click', () => {
        pullCradle(n);
        playBeep(440);
      });
    });
    document.getElementById('cradle-reset-btn').addEventListener('click', () => {
      cradle.balls.forEach(b => { b.theta = 0; b.omega = 0; });
      cradle.running = false;
    });
  }

  function pullCradle(n) {
    // Pull n balls from the left
    for (let i = 0; i < cradle.n; i++) {
      cradle.balls[i].theta = i < n ? -Math.PI / 4 : 0;
      cradle.balls[i].omega = 0;
    }
    cradle.running = true;
    cradle.pulled = n;
  }

  function stepCradle(dt) {
    if (!cradle.running) return;
    cradle.balls.forEach(b => {
      const alpha = -(G / b.L * 100) * Math.sin(b.theta);
      b.omega += alpha * dt;
      b.omega *= 0.999;
      b.theta += b.omega * dt;
    });
    // Simple collision: left flying balls hit right static balls
    // When leftmost ball(s) approach equilibrium from left at high speed, transfer
    const tol = 0.05;
    for (let i = 0; i < cradle.n - 1; i++) {
      const b1 = cradle.balls[i], b2 = cradle.balls[i + 1];
      if (Math.abs(b1.theta) < tol && b1.omega > 0.3 && Math.abs(b2.theta) < tol && Math.abs(b2.omega) < 0.1) {
        b2.omega = b1.omega;
        b1.omega = 0;
        playBeep(660 + i * 40, 'sine', 0.08);
      }
    }
  }

  function drawCradle() {
    ctx.clearRect(0, 0, GW, GH);
    const pivotY = cradle.pivotY;
    const topBarY = pivotY - 8;
    const cx = GW / 2;
    // Support frame
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 3;
    ctx.strokeRect(cx - 130, topBarY - 20, 260, 20);

    cradle.balls.forEach((b, i) => {
      const px = cx + (i - (cradle.n-1)/2) * cradle.spacing;
      const bx = px + b.L * Math.sin(b.theta);
      const by = pivotY + b.L * Math.cos(b.theta);
      // string
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(px, pivotY); ctx.lineTo(bx, by); ctx.stroke();
      drawBall(bx, by, cradle.R, i < cradle.pulled ? '#f5c842' : '#00d4b4');
    });
    formulaEl.textContent = lang === 'ar'
      ? `حفظ كمية التحرك · الكرات المسحوبة: ${cradle.pulled}`
      : `Conservation de la qté de mouvement · billes tirées: ${cradle.pulled}`;
  }

  // ═══════════════════════════════════════════════════════════
  //  PROJECTILE
  // ═══════════════════════════════════════════════════════════
  let proj = {};
  function initProjectile() {
    proj = { angle: 45, v0: 15, fired: false, x: 0, y: 0, vx: 0, vy: 0, t: 0, trail: [] };
    graphPanelEl.classList.remove('show');
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'x = v₀·cos θ·t   |   y = v₀·sin θ·t - ½g·t²';
    buildProjectileControls();
    setMeasurements([['x','0.00 m'],['y','0.00 m'],['v','0.00 m/s'],[tx('time'),'0.00 s']]);
  }

  function buildProjectileControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">Paramètres</div>
        <div class="control-row">
          <span class="control-label">${tx('angleLabel')}</span>
          <input type="range" class="control-slider" id="proj-angle" min="5" max="85" step="1" value="${proj.angle}" />
          <span class="control-value" id="proj-angle-val">${proj.angle}°</span>
        </div>
        <div class="control-row">
          <span class="control-label">${tx('velLabel')}</span>
          <input type="range" class="control-slider" id="proj-v0" min="5" max="40" step="1" value="${proj.v0}" />
          <span class="control-value" id="proj-v0-val">${proj.v0} m/s</span>
        </div>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-primary" id="proj-fire-btn">🚀 ${tx('fire')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="proj-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    document.getElementById('proj-angle').addEventListener('input', e => {
      if (!proj.fired) { proj.angle = +e.target.value; document.getElementById('proj-angle-val').textContent = proj.angle + '°'; }
    });
    document.getElementById('proj-v0').addEventListener('input', e => {
      if (!proj.fired) { proj.v0 = +e.target.value; document.getElementById('proj-v0-val').textContent = proj.v0 + ' m/s'; }
    });
    document.getElementById('proj-fire-btn').addEventListener('click', () => {
      if (!proj.fired) {
        const rad = proj.angle * Math.PI / 180;
        proj.vx = proj.v0 * Math.cos(rad);
        proj.vy = proj.v0 * Math.sin(rad);
        proj.x = 0; proj.y = 0; proj.t = 0; proj.fired = true; proj.trail = [];
        playBeep(600, 'sawtooth', 0.2);
      }
    });
    document.getElementById('proj-reset-btn').addEventListener('click', () => {
      proj.fired = false; proj.x = 0; proj.y = 0; proj.t = 0; proj.trail = [];
    });
  }

  function stepProjectile(dt) {
    if (!proj.fired) return;
    proj.vy -= G * dt;
    proj.x += proj.vx * dt;
    proj.y += proj.vy * dt;
    proj.t += dt;
    const spd = Math.sqrt(proj.vx**2 + proj.vy**2);
    proj.trail.push({ x: proj.x, y: proj.y });
    if (proj.trail.length > 300) proj.trail.shift();
    setMeasurements([
      ['x', proj.x.toFixed(2)+' m'],
      ['y', Math.max(0, proj.y).toFixed(2)+' m'],
      ['v', spd.toFixed(2)+' m/s'],
      [tx('time'), proj.t.toFixed(2)+' s']
    ]);
    if (proj.y < 0) { proj.fired = false; proj.y = 0; playBeep(220,'triangle',0.3); }
  }

  function drawProjectile() {
    ctx.clearRect(0, 0, GW, GH);
    const groundY = GH - 60;
    const oX = 80, scaleX = 12, scaleY = 12;

    drawGround(groundY);

    // Cannon
    const ang = proj.angle * Math.PI / 180;
    ctx.save();
    ctx.translate(oX, groundY);
    ctx.rotate(-ang);
    ctx.fillStyle = '#8892a4';
    ctx.fillRect(0, -6, 40, 12);
    ctx.restore();

    // Trail
    if (proj.trail.length > 1) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(0,212,180,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath();
      proj.trail.forEach((pt, i) => {
        const px = oX + pt.x * scaleX;
        const py = groundY - pt.y * scaleY;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Ball
    if (proj.trail.length) {
      const last = proj.trail[proj.trail.length - 1];
      const px = oX + last.x * scaleX;
      const py = groundY - last.y * scaleY;
      drawBall(px, py, 12, '#f5c842');
    }

    // Range label
    if (!proj.fired && proj.trail.length) {
      const rangeM = proj.trail[proj.trail.length - 1].x;
      const rangeLabel = lang === 'ar' ? `المدى: ${rangeM.toFixed(1)} m` : `Portée: ${rangeM.toFixed(1)} m`;
      ctx.fillStyle = '#f5c842'; ctx.font = '12px JetBrains Mono, monospace'; ctx.textAlign = 'center';
      ctx.fillText(rangeLabel, GW / 2, groundY - 20);
    }
  }

  // ── Audio ─────────────────────────────────────────────────────
  let audioCtx = null;
  function playBeep(freq = 440, type = 'sine', dur = 0.15, vol = 0.25) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.start(); osc.stop(audioCtx.currentTime + dur);
    } catch {}
  }

  // ── Switch experiment ────────────────────────────────────────
  function switchExp(name) {
    currentExp = name;
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.toggle('active', t.dataset.exp === name));
    graphPanelEl.classList.remove('show');
    formulaEl.style.display = 'none';
    hudEl.innerHTML = '';
    if (name === 'freefall')   initFreeFall();
    if (name === 'inclined')   initInclined();
    if (name === 'pendulum')   initPendulum();
    if (name === 'cradle')     initCradle();
    if (name === 'projectile') initProjectile();
  }

  // ── Main loop ─────────────────────────────────────────────────
  let lastTime = 0;
  function loop(ts) {
    const dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts;

    if (currentExp === 'freefall')   { stepFreeFall(dt);   drawFreeFall(); }
    if (currentExp === 'inclined')   { stepInclined(dt);   drawInclined(); }
    if (currentExp === 'pendulum')   { stepPendulum(dt);   drawPendulum(); }
    if (currentExp === 'cradle')     { stepCradle(dt);     drawCradle(); }
    if (currentExp === 'projectile') { stepProjectile(dt); drawProjectile(); }

    animId = requestAnimationFrame(loop);
  }

  // ── Public reset ─────────────────────────────────────────────
  window.labReset = () => switchExp(currentExp);

  // ── Start ────────────────────────────────────────────────────
  switchExp('freefall');
  loadingEl.classList.add('hidden');
  requestAnimationFrame(ts => { lastTime = ts; loop(ts); });
};
