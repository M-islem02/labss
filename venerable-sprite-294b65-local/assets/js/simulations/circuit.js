/* ═══════════════════════════════════════════════════════════════
   CIRCUIT SIMULATION  ·  circuit.js
   Drag-and-drop circuit builder on canvas
   Levels: 1) Basic bulb, 2) Add switch, 3) Series, 4) Parallel
═══════════════════════════════════════════════════════════════ */
'use strict';

window.labInit = function({ lang, canvas, controlsEl, measurementsEl, hudEl,
  graphPanelEl, formulaEl, instructionsTitle, instructionsList,
  expSelector, loadingEl }) {

  // ── i18n ─────────────────────────────────────────────────────
  const T = {
    ar: { voltage:'الجهد', current:'التيار', resistance:'المقاومة', connected:'الدارة مغلقة ✓', disconnected:'الدارة مفتوحة', level:'المستوى', challenge:'التحدي', hint:'اتصل بالمكونات بالسلك', success:'أحسنت! الدارة صحيحة ✓', reset:'إعادة', switchOn:'القاطع: مغلق', switchOff:'القاطع: مفتوح' },
    fr: { voltage:'Tension', current:'Courant', resistance:'Résistance', connected:'Circuit fermé ✓', disconnected:'Circuit ouvert', level:'Niveau', challenge:'Défi', hint:'Connectez les composants', success:'Bravo ! Circuit correct ✓', reset:'Réinitialiser', switchOn:'Interrupteur: fermé', switchOff:'Interrupteur: ouvert' }
  };
  const tx = k => (T[lang] || T.ar)[k] || k;

  // ── Levels config ─────────────────────────────────────────────
  const LEVELS = [
    { id: 1, ar: 'بطارية + مصباح', fr: 'Batterie + Ampoule',
      ar_desc: 'اربط البطارية بالمصباح لإضاءته', fr_desc: 'Connectez la batterie à l\'ampoule',
      components: ['battery','bulb'] },
    { id: 2, ar: 'إضافة قاطع', fr: 'Ajouter un interrupteur',
      ar_desc: 'أضف قاطعاً في الدارة', fr_desc: 'Ajoutez un interrupteur dans le circuit',
      components: ['battery','bulb','switch'] },
    { id: 3, ar: 'توصيل على التوالي', fr: 'Circuit en série',
      ar_desc: 'مصباحان على التوالي مع البطارية', fr_desc: 'Deux ampoules en série',
      components: ['battery','bulb','bulb','resistor'] },
    { id: 4, ar: 'توصيل على التوازي', fr: 'Circuit en parallèle',
      ar_desc: 'مصباحان على التوازي', fr_desc: 'Deux ampoules en parallèle',
      components: ['battery','bulb','bulb'] }
  ];

  let currentLevel = 0;
  let ctx2d, W, H;

  // ── Component definitions ─────────────────────────────────────
  const COMP_SIZE = 64;
  const GRID = 88;

  // Board state
  let placed = [];     // { type, gx, gy, id, switchOn? }
  let wires  = [];     // { from: {id,port}, to: {id,port} }
  let dragging = null; // { type } dragging from palette OR { idx } dragging placed component
  let wireStart = null;// { id, port, x, y }
  let mousePos = { x: 0, y: 0 };
  let circuitClosed = false;
  let switchOn = true;
  let humCtx = null, humOsc = null, humGain = null;

  // Palette items
  const PALETTE = [
    { type: 'battery',  icon: '🔋', ar: 'بطارية', fr: 'Batterie' },
    { type: 'bulb',     icon: '💡', ar: 'مصباح',  fr: 'Ampoule' },
    { type: 'switch',   icon: '🔌', ar: 'قاطع',   fr: 'Interrupteur' },
    { type: 'resistor', icon: '⚡', ar: 'مقاومة',  fr: 'Résistance' },
  ];

  // ── Canvas setup ──────────────────────────────────────────────
  function resizeCanvas() {
    const area = canvas.parentElement;
    canvas.width  = area.clientWidth;
    canvas.height = area.clientHeight;
    W = canvas.width; H = canvas.height;
  }
  window.addEventListener('resize', () => { resizeCanvas(); });
  resizeCanvas();
  ctx2d = canvas.getContext('2d');

  // ── Build level selector ──────────────────────────────────────
  LEVELS.forEach((lv, idx) => {
    const btn = document.createElement('button');
    btn.className = 'exp-tab' + (idx === 0 ? ' active' : '');
    btn.textContent = lang === 'fr' ? lv.fr : lv.ar;
    btn.dataset.level = idx;
    btn.addEventListener('click', () => loadLevel(idx));
    expSelector.appendChild(btn);
  });

  // ── Load level ────────────────────────────────────────────────
  function loadLevel(idx) {
    currentLevel = idx;
    placed = [];
    wires = [];
    circuitClosed = false;
    wireStart = null;
    dragging = null;
    document.querySelectorAll('.exp-tab').forEach(t => t.classList.toggle('active', +t.dataset.level === idx));

    // Pre-place required components in a neat layout
    const lv = LEVELS[idx];
    const startX = 3, startY = 3;
    lv.components.forEach((type, i) => {
      placed.push({
        type, id: `comp-${idx}-${i}-${Date.now()}`,
        gx: startX + i * 2, gy: startY,
        switchOn: type === 'switch' ? true : undefined
      });
    });

    // Instructions
    instructionsTitle.textContent = lang === 'fr'
      ? `Niveau ${idx+1}: ${lv.fr}`
      : `المستوى ${idx+1}: ${lv.ar}`;
    instructionsList.innerHTML = '';
    const steps = [
      lang === 'fr' ? lv.fr_desc : lv.ar_desc,
      lang === 'fr' ? 'Glissez les composants sur le plateau' : 'اسحب المكونات على اللوح',
      lang === 'fr' ? 'Cliquez sur un terminal pour relier' : 'اضغط على طرف لتوصيله',
      lang === 'fr' ? 'Le circuit s\'allume si fermé correctement' : 'تضيء الدارة عند الإغلاق الصحيح'
    ];
    steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="step-num">${i+1}</span><span>${s}</span>`;
      instructionsList.appendChild(li);
    });

    buildControls();
    updateMeasurements();
    stopHum();
  }

  // ── Controls ──────────────────────────────────────────────────
  function buildControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">Composants</div>
        ${PALETTE.map(p => `
          <div class="palette-drag" data-type="${p.type}" draggable="false"
            style="display:flex;align-items:center;gap:.5rem;padding:.4rem .6rem;
            border-radius:6px;cursor:grab;background:rgba(255,255,255,0.04);
            border:1px solid rgba(255,255,255,0.08);margin-bottom:.35rem;
            font-size:.78rem;color:var(--text-muted);">
            <span style="font-size:1.1rem;">${p.icon}</span>
            ${lang === 'fr' ? p.fr : p.ar}
          </div>`).join('')}
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-secondary" id="circ-switch-btn">${switchOn ? tx('switchOn') : tx('switchOff')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="circ-reset-btn">↺ ${tx('reset')}</button>
        <button class="ctrl-btn ctrl-btn-secondary" id="circ-clear-wires-btn">✂ ${lang==='fr'?'Effacer fils':'حذف الأسلاك'}</button>
      </div>`;

    document.getElementById('circ-switch-btn').addEventListener('click', () => {
      switchOn = !switchOn;
      document.getElementById('circ-switch-btn').textContent = switchOn ? tx('switchOn') : tx('switchOff');
      placed.forEach(p => { if (p.type === 'switch') p.switchOn = switchOn; });
      checkCircuit();
    });
    document.getElementById('circ-reset-btn').addEventListener('click', () => loadLevel(currentLevel));
    document.getElementById('circ-clear-wires-btn').addEventListener('click', () => { wires = []; circuitClosed = false; stopHum(); });

    // Palette drag-to-add
    document.querySelectorAll('.palette-drag').forEach(el => {
      el.addEventListener('mousedown', e => {
        e.preventDefault();
        dragging = { type: el.dataset.type, fromPalette: true };
      });
    });
  }

  // ── Grid helpers ──────────────────────────────────────────────
  function gridToPixel(gx, gy) {
    const offX = 140, offY = 40;
    return { x: offX + gx * GRID + GRID/2, y: offY + gy * GRID + GRID/2 };
  }
  function pixelToGrid(x, y) {
    const offX = 140, offY = 40;
    return { gx: Math.floor((x - offX) / GRID), gy: Math.floor((y - offY) / GRID) };
  }
  function getTerminals(comp) {
    const { x, y } = gridToPixel(comp.gx, comp.gy);
    return {
      left:  { x: x - COMP_SIZE/2, y },
      right: { x: x + COMP_SIZE/2, y },
    };
  }
  function snapToTerminal(px, py, excludeId = null) {
    let best = null, bestDist = 22;
    placed.forEach(comp => {
      if (comp.id === excludeId) return;
      const terms = getTerminals(comp);
      ['left','right'].forEach(port => {
        const t = terms[port];
        const dist = Math.hypot(px - t.x, py - t.y);
        if (dist < bestDist) { bestDist = dist; best = { id: comp.id, port, x: t.x, y: t.y }; }
      });
    });
    return best;
  }

  // ── Circuit check ─────────────────────────────────────────────
  function checkCircuit() {
    // Simple check: battery + bulb + closed wires form a loop
    const hasBattery = placed.some(p => p.type === 'battery');
    const hasBulb    = placed.some(p => p.type === 'bulb');
    if (!hasBattery || !hasBulb || wires.length < 2) {
      circuitClosed = false; stopHum(); return;
    }
    // Verify all active components have 2 wire connections each
    const openSwitch = placed.find(p => p.type === 'switch' && !p.switchOn);
    if (openSwitch) { circuitClosed = false; stopHum(); return; }

    // Count connections per component terminal
    const connMap = {};
    wires.forEach(w => {
      const k1 = `${w.from.id}-${w.from.port}`;
      const k2 = `${w.to.id}-${w.to.port}`;
      connMap[k1] = (connMap[k1]||0)+1;
      connMap[k2] = (connMap[k2]||0)+1;
    });

    // Each component must have at least both terminals connected
    const allConnected = placed.every(p => {
      const l = connMap[`${p.id}-left`]  || 0;
      const r = connMap[`${p.id}-right`] || 0;
      return l >= 1 && r >= 1;
    });

    circuitClosed = allConnected;
    if (circuitClosed) startHum(); else stopHum();
    updateMeasurements();
  }

  // ── Measurements ─────────────────────────────────────────────
  function updateMeasurements() {
    const bulbs = placed.filter(p => p.type === 'bulb').length;
    const res   = placed.filter(p => p.type === 'resistor').length;
    const totalR = 5 + res * 10;
    const V = 9;
    const I = circuitClosed ? (V / totalR) : 0;
    measurementsEl.innerHTML = `
      <div class="measurement-row"><span class="measurement-key">${tx('voltage')}</span><span class="measurement-val">${V}.0 V</span></div>
      <div class="measurement-row"><span class="measurement-key">${tx('resistance')}</span><span class="measurement-val">${totalR} Ω</span></div>
      <div class="measurement-row"><span class="measurement-key">${tx('current')}</span><span class="measurement-val">${I.toFixed(3)} A</span></div>
      <div class="measurement-row"><span class="measurement-key">V = IR</span><span class="measurement-val">${circuitClosed?'✓':'—'}</span></div>`;
    setHUD([[tx('voltage'),'9 V'],[tx('current'), I.toFixed(3)+' A']]);
    formulaEl.style.display = 'block';
    formulaEl.textContent = `V = I·R  →  9 = ${I.toFixed(3)} × ${totalR}`;
  }
  function setHUD(pairs) {
    hudEl.innerHTML = '';
    pairs.forEach(([l,v]) => {
      const d = document.createElement('div');
      d.className = 'hud-chip';
      d.innerHTML = `<span class="hud-label">${l}: </span>${v}`;
      hudEl.appendChild(d);
    });
  }

  // ── Sound ─────────────────────────────────────────────────────
  function startHum() {
    try {
      if (!humCtx) humCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (humOsc) return;
      humOsc  = humCtx.createOscillator();
      humGain = humCtx.createGain();
      humOsc.connect(humGain); humGain.connect(humCtx.destination);
      humOsc.type = 'sine'; humOsc.frequency.value = 120;
      humGain.gain.setValueAtTime(0.04, humCtx.currentTime);
      humOsc.start();
    } catch {}
  }
  function stopHum() {
    try { if (humOsc) { humOsc.stop(); humOsc = null; } } catch {}
  }

  // ── Mouse events ──────────────────────────────────────────────
  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    // Check terminal snap for wire drawing
    const snap = snapToTerminal(mx, my);
    if (snap) {
      wireStart = snap;
      return;
    }

    // Drag placed component
    const pg = pixelToGrid(mx, my);
    const idx = placed.findIndex(p => p.gx === pg.gx && p.gy === pg.gy);
    if (idx !== -1) {
      dragging = { idx, fromPalette: false };
    }
  });

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });

  canvas.addEventListener('mouseup', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;

    // Finish wire
    if (wireStart) {
      const snap = snapToTerminal(mx, my, wireStart.id);
      if (snap && snap.id !== wireStart.id) {
        // Avoid duplicate wires
        const exists = wires.find(w =>
          (w.from.id===wireStart.id && w.from.port===wireStart.port && w.to.id===snap.id && w.to.port===snap.port) ||
          (w.to.id===wireStart.id && w.to.port===wireStart.port && w.from.id===snap.id && w.from.port===snap.port)
        );
        if (!exists) {
          wires.push({ from: { id: wireStart.id, port: wireStart.port }, to: { id: snap.id, port: snap.port } });
          checkCircuit();
        }
      }
      wireStart = null;
    }

    // Drop dragged component
    if (dragging) {
      const pg = pixelToGrid(mx, my);
      if (dragging.fromPalette) {
        // Add new component
        const gridW = Math.floor((W - 140) / GRID), gridH = Math.floor((H - 40) / GRID);
        if (pg.gx >= 0 && pg.gx < gridW && pg.gy >= 0 && pg.gy < gridH) {
          const occupied = placed.find(p => p.gx === pg.gx && p.gy === pg.gy);
          if (!occupied) {
            placed.push({ type: dragging.type, id: `c-${Date.now()}`, gx: pg.gx, gy: pg.gy, switchOn: dragging.type === 'switch' ? switchOn : undefined });
            checkCircuit();
          }
        }
      } else {
        // Move placed component
        const old = placed[dragging.idx];
        const occupied = placed.find((p, i) => i !== dragging.idx && p.gx === pg.gx && p.gy === pg.gy);
        if (!occupied) { old.gx = pg.gx; old.gy = pg.gy; checkCircuit(); }
      }
      dragging = null;
    }
  });

  canvas.addEventListener('dblclick', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const pg = pixelToGrid(mx, my);
    const idx = placed.findIndex(p => p.gx === pg.gx && p.gy === pg.gy);
    if (idx !== -1) {
      placed.splice(idx, 1);
      wires = wires.filter(w => w.from.id !== placed[idx]?.id && w.to.id !== placed[idx]?.id);
      checkCircuit();
    }
  });

  // ── Draw ──────────────────────────────────────────────────────
  function drawComp(comp) {
    const { x, y } = gridToPixel(comp.gx, comp.gy);
    const s = COMP_SIZE;

    ctx2d.save();
    ctx2d.translate(x, y);

    // Bounding box
    ctx2d.strokeStyle = circuitClosed && (comp.type === 'bulb' || comp.type === 'battery')
      ? 'rgba(0,212,180,0.5)' : 'rgba(255,255,255,0.12)';
    ctx2d.lineWidth = 1.5;
    ctx2d.beginPath();
    ctx2d.roundRect(-s/2, -s/2, s, s, 8);
    ctx2d.stroke();

    // Component symbol
    ctx2d.fillStyle = '#f0f4ff';
    ctx2d.font = 'bold 22px sans-serif';
    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'middle';
    const icons = { battery:'🔋', bulb: circuitClosed ? '💡' : '⚫', switch: comp.switchOn ? '🔌' : '🚫', resistor:'⚡' };
    ctx2d.fillText(icons[comp.type] || '?', 0, 0);

    // Terminal dots
    ['left','right'].forEach(port => {
      const tx2 = port === 'left' ? -s/2 : s/2;
      const snap = wireStart && snapToTerminal(mousePos.x, mousePos.y);
      const isHot = snap && snap.id === comp.id && snap.port === port;
      ctx2d.beginPath();
      ctx2d.arc(tx2, 0, isHot ? 7 : 5, 0, Math.PI * 2);
      ctx2d.fillStyle = isHot ? '#00d4b4' : 'rgba(255,255,255,0.3)';
      ctx2d.fill();
    });

    ctx2d.restore();

    // Bulb glow effect
    if (comp.type === 'bulb' && circuitClosed) {
      const grd = ctx2d.createRadialGradient(x, y, 0, x, y, s);
      grd.addColorStop(0, 'rgba(255,240,100,0.35)');
      grd.addColorStop(1, 'rgba(255,240,100,0)');
      ctx2d.beginPath();
      ctx2d.arc(x, y, s, 0, Math.PI * 2);
      ctx2d.fillStyle = grd;
      ctx2d.fill();
    }
  }

  function drawWires() {
    wires.forEach(w => {
      const from = placed.find(p => p.id === w.from.id);
      const to   = placed.find(p => p.id === w.to.id);
      if (!from || !to) return;
      const ft = getTerminals(from)[w.from.port];
      const tt = getTerminals(to)[w.to.port];
      ctx2d.beginPath();
      ctx2d.moveTo(ft.x, ft.y);
      const mid = (ft.x + tt.x) / 2;
      ctx2d.bezierCurveTo(mid, ft.y, mid, tt.y, tt.x, tt.y);
      ctx2d.strokeStyle = circuitClosed ? '#00d4b4' : 'rgba(255,255,255,0.4)';
      ctx2d.lineWidth = circuitClosed ? 2.5 : 1.8;
      ctx2d.stroke();
      // current flow dots
      if (circuitClosed) {
        const t = (Date.now() % 1200) / 1200;
        const bx = Math.pow(1-t,3)*ft.x + 3*Math.pow(1-t,2)*t*mid + 3*(1-t)*t*t*mid + t*t*t*tt.x;
        const by = Math.pow(1-t,3)*ft.y + 3*Math.pow(1-t,2)*t*ft.y + 3*(1-t)*t*t*tt.y + t*t*t*tt.y;
        ctx2d.beginPath(); ctx2d.arc(bx, by, 3, 0, Math.PI*2);
        ctx2d.fillStyle = '#f5c842'; ctx2d.fill();
      }
    });
  }

  function drawDraftWire() {
    if (!wireStart) return;
    ctx2d.save();
    ctx2d.setLineDash([5, 4]);
    ctx2d.strokeStyle = 'rgba(0,212,180,0.5)';
    ctx2d.lineWidth = 1.5;
    ctx2d.beginPath();
    ctx2d.moveTo(wireStart.x, wireStart.y);
    ctx2d.lineTo(mousePos.x, mousePos.y);
    ctx2d.stroke();
    ctx2d.restore();
  }

  function drawGrid() {
    const offX = 140, offY = 40;
    ctx2d.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx2d.lineWidth = 0.5;
    for (let gx = 0; gx * GRID + offX < W; gx++) {
      for (let gy = 0; gy * GRID + offY < H; gy++) {
        ctx2d.strokeRect(offX + gx * GRID, offY + gy * GRID, GRID, GRID);
      }
    }
  }

  function drawDraggingGhost() {
    if (!dragging) return;
    const icon = PALETTE.find(p => p.type === dragging.type);
    if (!icon) return;
    ctx2d.save();
    ctx2d.globalAlpha = 0.5;
    ctx2d.font = 'bold 26px sans-serif';
    ctx2d.textAlign = 'center'; ctx2d.textBaseline = 'middle';
    ctx2d.fillText(icon.icon, mousePos.x, mousePos.y);
    ctx2d.restore();
  }

  function drawStatusBanner() {
    if (!circuitClosed) return;
    ctx2d.save();
    ctx2d.fillStyle = 'rgba(0,212,180,0.12)';
    ctx2d.beginPath();
    ctx2d.roundRect(W/2 - 150, H - 42, 300, 30, 8);
    ctx2d.fill();
    ctx2d.fillStyle = '#00d4b4';
    ctx2d.font = 'bold 13px DM Sans, sans-serif';
    ctx2d.textAlign = 'center'; ctx2d.textBaseline = 'middle';
    ctx2d.fillText(tx('success'), W/2, H - 27);
    ctx2d.restore();
  }

  // ── Main loop ─────────────────────────────────────────────────
  function loop() {
    ctx2d.clearRect(0, 0, W, H);
    drawGrid();
    drawWires();
    placed.forEach(drawComp);
    drawDraftWire();
    drawDraggingGhost();
    drawStatusBanner();
    requestAnimationFrame(loop);
  }

  // ── Public reset ─────────────────────────────────────────────
  window.labReset = () => loadLevel(currentLevel);

  // ── Start ────────────────────────────────────────────────────
  loadLevel(0);
  loadingEl.classList.add('hidden');
  loop();

  // Touch support
  function toMouse(e) {
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    return { clientX: t.clientX, clientY: t.clientY };
  }
  canvas.addEventListener('touchstart',  e => { e.preventDefault(); canvas.dispatchEvent(Object.assign(new MouseEvent('mousedown'), toMouse(e))); }, { passive: false });
  canvas.addEventListener('touchmove',   e => { e.preventDefault(); const m = toMouse(e); const rect = canvas.getBoundingClientRect(); mousePos = { x: m.clientX - rect.left, y: m.clientY - rect.top }; }, { passive: false });
  canvas.addEventListener('touchend',    e => { e.preventDefault(); canvas.dispatchEvent(Object.assign(new MouseEvent('mouseup'), toMouse(e))); }, { passive: false });
};
