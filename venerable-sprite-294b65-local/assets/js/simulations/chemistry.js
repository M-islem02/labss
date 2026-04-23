/* ═══════════════════════════════════════════════════════════════
   CHEMISTRY SIMULATION  ·  chemistry.js
   Experiments: Zn + HCl (hydrogen gas) · Limewater + CO₂
   Step-by-step drag & drop with physics feel
═══════════════════════════════════════════════════════════════ */
'use strict';

window.labInit = function({ lang, canvas, controlsEl, measurementsEl, hudEl,
  formulaEl, instructionsTitle, instructionsList, expSelector, loadingEl }) {

  const T = {
    ar: {
      znhcl: 'الزنك + حمض HCl', limewater: 'ماء الجير + CO₂',
      step: 'الخطوة', step1: 'ضع حبيبات الزنك في الأنبوب', step2: 'صب حمض HCl على الزنك',
      step3: 'راقب الفقاعات', step4: 'اختبر الغاز بعود الثقاب المضيء',
      lime1: 'صب ماء الجير في الكأس', lime2: 'انفخ بواسطة القشة في الماء', lime3: 'راقب تعكّر الماء',
      reset: 'إعادة', reaction: 'التفاعل يجري', done: 'اكتمل التفاعل',
      safety: '⚠ الحمض خطر — ارتدِ نظارة الواقية', safetyFr: '⚠ Acide dangereux — portez des lunettes',
      click_to_continue: 'اضغط للمتابعة...'
    },
    fr: {
      znhcl: 'Zinc + HCl', limewater: 'Eau de Chaux + CO₂',
      step: 'Étape', step1: 'Mettre le zinc dans le tube', step2: 'Verser HCl sur le zinc',
      step3: 'Observer les bulles', step4: 'Tester le gaz avec une allumette',
      lime1: 'Verser l\'eau de chaux', lime2: 'Souffler dans la paille', lime3: 'Observer le trouble',
      reset: 'Réinitialiser', reaction: 'Réaction en cours', done: 'Réaction terminée',
      safety: '⚠ Acide dangereux — portez des lunettes de protection',
      click_to_continue: 'Cliquez pour continuer...'
    }
  };
  const tx = k => (T[lang]||T.ar)[k] || k;

  let currentExp = 'znhcl';
  let ctx2d, W, H;

  // ── Canvas ────────────────────────────────────────────────────
  function resizeCanvas() {
    const area = canvas.parentElement;
    canvas.width = area.clientWidth;
    canvas.height = area.clientHeight;
    W = canvas.width; H = canvas.height;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  ctx2d = canvas.getContext('2d');

  // ── Exp selector ──────────────────────────────────────────────
  ['znhcl','limewater'].forEach(e => {
    const btn = document.createElement('button');
    btn.className = 'exp-tab' + (e === currentExp ? ' active' : '');
    btn.textContent = tx(e);
    btn.dataset.exp = e;
    btn.addEventListener('click', () => switchExp(e));
    expSelector.appendChild(btn);
  });

  function switchExp(name) {
    currentExp = name;
    document.querySelectorAll('.exp-tab').forEach(b => b.classList.toggle('active', b.dataset.exp === name));
    bubbles = []; pellets = []; pourParticles = [];
    if (name === 'znhcl')     initZnHCl();
    if (name === 'limewater') initLimewater();
  }

  // ══════════════════════════════════════════════════════════════
  //  ZN + HCL EXPERIMENT
  // ══════════════════════════════════════════════════════════════
  let zn = {};
  let bubbles = [], pellets = [], pourParticles = [];

  const STEPS_ZN = [
    { ar: 'ضع حبيبات الزنك في أنبوب الاختبار', fr: 'Mettre les granulés de zinc dans le tube' },
    { ar: 'صب حمض HCl على الزنك بحذر', fr: 'Verser l\'acide HCl sur le zinc doucement' },
    { ar: 'راقب الفقاعات — غاز الهيدروجين ينطلق', fr: 'Observer les bulles — le gaz H₂ se dégage' },
    { ar: 'قرّب عود الثقاب المشتعل من الغاز', fr: 'Approcher une allumette du gaz' },
    { ar: 'انفجار صغير يؤكد وجود الهيدروجين ✓', fr: 'Un léger "pop" confirme le gaz H₂ ✓' }
  ];

  function initZnHCl() {
    zn = {
      step: 0, // 0=initial, 1=zinc added, 2=hcl poured, 3=reaction, 4=test, 5=done
      reactionProgress: 0,
      temperature: 20,
      flashed: false
    };
    bubbles = []; pellets = []; pourParticles = [];
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'Zn + 2HCl → ZnCl₂ + H₂↑';

    setInstructions(STEPS_ZN.map(s => lang === 'fr' ? s.fr : s.ar));
    buildZnControls();
    updateZnMeasurements();
  }

  function buildZnControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title" style="color:var(--warning);">${tx('safety')}</div>
      </div>
      <div class="control-section">
        <div class="control-section-title">${lang==='ar'?'خطوات التجربة':'Étapes de l\'expérience'}</div>
        ${STEPS_ZN.map((s, i) => `
          <div class="step-row" id="step-row-${i}" style="
            display:flex;gap:.5rem;align-items:flex-start;padding:.4rem .5rem;
            border-radius:6px;margin-bottom:.3rem;opacity:${i===0?1:0.4};
            background:${i===0?'rgba(0,212,180,0.08)':'transparent'};
            font-size:.78rem;color:var(--text-muted);">
            <span style="color:var(--accent-teal);font-weight:700;min-width:16px;">${i+1}</span>
            <span>${lang==='fr'?s.fr:s.ar}</span>
          </div>`).join('')}
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-primary" id="zn-next-btn">${lang==='ar'?'التالي ▶':'Suivant ▶'}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="zn-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    document.getElementById('zn-next-btn').addEventListener('click', advanceZnStep);
    document.getElementById('zn-reset-btn').addEventListener('click', () => initZnHCl());
  }

  function advanceZnStep() {
    if (zn.step >= 4) return;
    zn.step++;
    updateStepHighlight(zn.step);
    if (zn.step === 1) { spawnPellets(); playBeep(440,'triangle',0.2); }
    if (zn.step === 2) { startPour(); playBeep(360,'sine',0.3); }
    if (zn.step === 3) { /* bubbles start in draw */ }
    if (zn.step === 4) { zn.flashed = true; playBeep(880,'sawtooth',0.15); }
    updateZnMeasurements();
  }

  function updateStepHighlight(active) {
    for (let i = 0; i < 5; i++) {
      const row = document.getElementById(`step-row-${i}`);
      if (!row) continue;
      row.style.opacity = i <= active ? '1' : '0.4';
      row.style.background = i === active ? 'rgba(0,212,180,0.12)' : (i < active ? 'rgba(34,197,94,0.06)' : 'transparent');
      if (i < active) row.style.color = 'var(--success)';
    }
  }

  function spawnPellets() {
    for (let i = 0; i < 8; i++) {
      pellets.push({
        x: W * 0.5 + (Math.random() - 0.5) * 40,
        y: H * 0.55 + Math.random() * 40,
        r: 5 + Math.random() * 4,
        vy: 2 + Math.random() * 2,
        landed: false
      });
    }
  }

  function startPour() {
    for (let i = 0; i < 30; i++) {
      pourParticles.push({
        x: W * 0.5 + (Math.random()-0.5)*20,
        y: H * 0.35 + i * 4,
        vx: (Math.random()-0.5)*0.5,
        vy: 2 + Math.random(),
        alpha: 0.8,
        life: 1.0
      });
    }
  }

  function updateZnMeasurements() {
    const progress = zn.reactionProgress;
    const temp = zn.temperature.toFixed(1);
    const h2 = (progress * 0.045).toFixed(3);
    measurementsEl.innerHTML = `
      <div class="measurement-row"><span class="measurement-key">${lang==='ar'?'الخطوة':'Étape'}</span><span class="measurement-val">${zn.step+1}/5</span></div>
      <div class="measurement-row"><span class="measurement-key">T°</span><span class="measurement-val">${temp} °C</span></div>
      <div class="measurement-row"><span class="measurement-key">H₂</span><span class="measurement-val">${h2} L</span></div>
      <div class="measurement-row"><span class="measurement-key">pH</span><span class="measurement-val">${zn.step>=2?'1.2':'7.0'}</span></div>`;
  }

  function stepZn(dt) {
    if (zn.step >= 2 && zn.reactionProgress < 100) {
      zn.reactionProgress += 8 * dt;
      zn.temperature = 20 + zn.reactionProgress * 0.3;
      updateZnMeasurements();
    }

    // spawn bubbles during reaction
    if (zn.step >= 2 && zn.reactionProgress < 100 && Math.random() < 0.25) {
      const tubeX = W * 0.5 + (Math.random()-0.5)*28;
      const tubeY = H * 0.55;
      bubbles.push({ x: tubeX, y: tubeY, r: 3+Math.random()*4, vy: -(0.8+Math.random()), vx: (Math.random()-0.5)*0.3, life: 1.0 });
    }

    bubbles = bubbles.filter(b => b.life > 0.02);
    bubbles.forEach(b => { b.y += b.vy; b.x += b.vx; b.life -= 0.015; });

    pourParticles = pourParticles.filter(p => p.life > 0.05);
    pourParticles.forEach(p => { p.y += p.vy; p.x += p.vx; p.life -= 0.04; });

    // settle pellets
    pellets.forEach(p => {
      if (!p.landed) {
        p.y += p.vy;
        p.vy += 0.3;
        if (p.y >= H * 0.6) { p.y = H * 0.6; p.landed = true; }
      }
    });

    setHUD([['T°', zn.temperature.toFixed(1)+' °C'],['H₂', (zn.reactionProgress*0.045/100).toFixed(4)+' L']]);
  }

  function drawZnHCl() {
    ctx2d.clearRect(0, 0, W, H);
    ctx2d.fillStyle = '#0a0e1a';
    ctx2d.fillRect(0, 0, W, H);

    // Lab bench
    ctx2d.fillStyle = '#1a2332';
    ctx2d.fillRect(0, H * 0.75, W, H * 0.25);
    ctx2d.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx2d.lineWidth = 1;
    ctx2d.beginPath(); ctx2d.moveTo(0, H*0.75); ctx2d.lineTo(W, H*0.75); ctx2d.stroke();

    // Test tube
    const tubeX = W * 0.5, tubeTop = H * 0.28, tubeH = H * 0.38, tubeW = 46;
    ctx2d.strokeStyle = 'rgba(140,200,255,0.5)';
    ctx2d.lineWidth = 3;
    ctx2d.beginPath();
    ctx2d.moveTo(tubeX - tubeW/2, tubeTop);
    ctx2d.lineTo(tubeX - tubeW/2, tubeTop + tubeH - 20);
    ctx2d.quadraticCurveTo(tubeX - tubeW/2, tubeTop + tubeH, tubeX, tubeTop + tubeH);
    ctx2d.quadraticCurveTo(tubeX + tubeW/2, tubeTop + tubeH, tubeX + tubeW/2, tubeTop + tubeH - 20);
    ctx2d.lineTo(tubeX + tubeW/2, tubeTop);
    ctx2d.stroke();

    // Zinc pellets
    pellets.forEach(p => {
      const grd = ctx2d.createRadialGradient(p.x-1, p.y-1, 0, p.x, p.y, p.r);
      grd.addColorStop(0, '#c0c0d0'); grd.addColorStop(1, '#606070');
      ctx2d.beginPath(); ctx2d.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx2d.fillStyle = grd; ctx2d.fill();
    });

    // Acid liquid fill
    if (zn.step >= 2) {
      const fillH = (tubeH - 30) * 0.6;
      const acidColor = zn.reactionProgress > 50
        ? `rgba(240,220,60,0.35)` : `rgba(180,240,180,0.4)`;
      ctx2d.beginPath();
      ctx2d.moveTo(tubeX - tubeW/2, tubeTop + (tubeH - fillH));
      ctx2d.lineTo(tubeX - tubeW/2, tubeTop + tubeH - 20);
      ctx2d.quadraticCurveTo(tubeX-tubeW/2, tubeTop+tubeH, tubeX, tubeTop+tubeH);
      ctx2d.quadraticCurveTo(tubeX+tubeW/2, tubeTop+tubeH, tubeX+tubeW/2, tubeTop+tubeH-20);
      ctx2d.lineTo(tubeX + tubeW/2, tubeTop + (tubeH - fillH));
      ctx2d.closePath();
      ctx2d.fillStyle = acidColor;
      ctx2d.fill();
    }

    // Pour particles (HCl stream)
    pourParticles.forEach(p => {
      ctx2d.beginPath(); ctx2d.arc(p.x, p.y, 3, 0, Math.PI*2);
      ctx2d.fillStyle = `rgba(180,240,180,${p.life * 0.7})`;
      ctx2d.fill();
    });

    // HCl bottle (step < 2)
    if (zn.step < 2) {
      const bx = W * 0.72, by = H * 0.28;
      drawBottle(bx, by, '#3adc7a', 'HCl');
    }

    // Zinc jar (step < 1)
    if (zn.step < 1) {
      const jx = W * 0.28, jy = H * 0.28;
      drawJar(jx, jy, 'Zn');
    }

    // Gas collection (step >= 3)
    if (zn.step >= 3) {
      // Inverted tube over test tube
      ctx2d.strokeStyle = 'rgba(140,200,255,0.3)'; ctx2d.lineWidth = 2;
      ctx2d.beginPath();
      ctx2d.rect(tubeX - 20, tubeTop - 60, 40, 55);
      ctx2d.stroke();
      // H2 label
      const gasFill = Math.min(zn.reactionProgress / 100, 1);
      ctx2d.fillStyle = `rgba(200,220,255,${gasFill * 0.4})`;
      ctx2d.fillRect(tubeX - 18, tubeTop - 58 + (53 * (1-gasFill)), 36, 53 * gasFill);
      ctx2d.fillStyle = '#c0d8ff'; ctx2d.font = 'bold 12px JetBrains Mono, monospace';
      ctx2d.textAlign = 'center'; ctx2d.fillText('H₂', tubeX, tubeTop - 20);
    }

    // Flash test (step 4)
    if (zn.step === 4 && zn.flashed) {
      const flash = Math.sin(Date.now() / 80) > 0.5;
      if (flash) {
        ctx2d.fillStyle = 'rgba(255,200,50,0.15)';
        ctx2d.fillRect(tubeX - 60, tubeTop - 80, 120, 80);
      }
      ctx2d.fillStyle = '#f5c842'; ctx2d.font = 'bold 16px DM Sans'; ctx2d.textAlign = 'center';
      ctx2d.fillText(lang==='ar'?'POP! الهيدروجين ✓':'POP! H₂ confirmé ✓', tubeX, tubeTop - 90);
    }

    // Bubbles
    bubbles.forEach(b => {
      ctx2d.beginPath(); ctx2d.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx2d.strokeStyle = `rgba(0,212,180,${b.life * 0.7})`;
      ctx2d.lineWidth = 1; ctx2d.stroke();
    });

    // Equation banner
    if (zn.step >= 2) {
      ctx2d.fillStyle = 'rgba(10,14,26,0.85)';
      ctx2d.beginPath();
      ctx2d.roundRect(W/2 - 200, H * 0.82, 400, 32, 8);
      ctx2d.fill();
      ctx2d.fillStyle = '#f5c842'; ctx2d.font = '13px JetBrains Mono, monospace';
      ctx2d.textAlign = 'center'; ctx2d.fillText('Zn + 2HCl → ZnCl₂ + H₂↑', W/2, H*0.82+20);
    }
  }

  function drawBottle(x, y, color, label) {
    ctx2d.fillStyle = color;
    ctx2d.globalAlpha = 0.7;
    ctx2d.beginPath();
    ctx2d.roundRect(x-15, y, 30, 70, 6);
    ctx2d.fill();
    ctx2d.globalAlpha = 1;
    // cap
    ctx2d.fillStyle = '#333';
    ctx2d.fillRect(x-8, y-10, 16, 12);
    // label
    ctx2d.fillStyle = '#fff'; ctx2d.font = 'bold 12px JetBrains Mono, monospace';
    ctx2d.textAlign = 'center'; ctx2d.fillText(label, x, y+40);
  }

  function drawJar(x, y, label) {
    ctx2d.strokeStyle = 'rgba(200,200,220,0.5)';
    ctx2d.lineWidth = 2;
    ctx2d.beginPath();
    ctx2d.roundRect(x-25, y, 50, 60, 6);
    ctx2d.stroke();
    ctx2d.fillStyle = 'rgba(150,150,170,0.15)';
    ctx2d.fill();
    ctx2d.fillStyle = '#c0c0d0'; ctx2d.font = 'bold 14px JetBrains Mono, monospace';
    ctx2d.textAlign = 'center'; ctx2d.fillText(label, x, y+35);
  }

  // ══════════════════════════════════════════════════════════════
  //  LIMEWATER EXPERIMENT
  // ══════════════════════════════════════════════════════════════
  let lw = {};
  let co2Particles = [];

  function initLimewater() {
    lw = { step: 0, turbidity: 0, blowing: false };
    co2Particles = [];
    formulaEl.style.display = 'block';
    formulaEl.textContent = 'CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O';

    const steps = [
      lang==='ar' ? 'صب ماء الجير في الكأس' : 'Verser l\'eau de chaux dans le bécher',
      lang==='ar' ? 'أدخل القشة في السائل' : 'Insérer la paille dans le liquide',
      lang==='ar' ? 'انفخ بلطف في القشة' : 'Souffler doucement dans la paille',
      lang==='ar' ? 'راقب تعكّر السائل الأبيض' : 'Observer le trouble blanc (CaCO₃)'
    ];
    setInstructions(steps);
    buildLwControls();
    updateLwMeasurements();
  }

  function buildLwControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">${lang==='ar'?'الخطوات':'Étapes'}</div>
        <button class="ctrl-btn ctrl-btn-primary" id="lw-pour-btn">${lang==='ar'?'1. صب ماء الجير':'1. Verser eau de chaux'}</button>
        <button class="ctrl-btn ctrl-btn-secondary" id="lw-straw-btn" disabled>${lang==='ar'?'2. أدخل القشة':'2. Insérer la paille'}</button>
        <button class="ctrl-btn ctrl-btn-secondary" id="lw-blow-btn" disabled>${lang==='ar'?'3. انفخ (اضغط مطولاً)':'3. Souffler (maintenir)'}</button>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-danger" id="lw-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    document.getElementById('lw-pour-btn').addEventListener('click', () => {
      lw.step = 1;
      document.getElementById('lw-straw-btn').disabled = false;
      playBeep(440,'sine',0.3);
    });

    document.getElementById('lw-straw-btn').addEventListener('click', () => {
      lw.step = 2;
      document.getElementById('lw-blow-btn').disabled = false;
      playBeep(380,'sine',0.2);
    });

    const blowBtn = document.getElementById('lw-blow-btn');
    blowBtn.addEventListener('mousedown', () => { if (lw.step >= 2) { lw.blowing = true; lw.step = 3; } });
    blowBtn.addEventListener('mouseup', () => { lw.blowing = false; });
    blowBtn.addEventListener('mouseleave', () => { lw.blowing = false; });
    blowBtn.addEventListener('touchstart', e => { e.preventDefault(); if (lw.step >= 2) { lw.blowing = true; lw.step = 3; } }, { passive:false });
    blowBtn.addEventListener('touchend', () => { lw.blowing = false; });

    document.getElementById('lw-reset-btn').addEventListener('click', () => initLimewater());
  }

  function updateLwMeasurements() {
    const milky = Math.round(lw.turbidity);
    measurementsEl.innerHTML = `
      <div class="measurement-row"><span class="measurement-key">${lang==='ar'?'التعكّر':'Trouble'}</span><span class="measurement-val">${milky}%</span></div>
      <div class="measurement-row"><span class="measurement-key">CaCO₃</span><span class="measurement-val">${(lw.turbidity/100*0.4).toFixed(3)} g/L</span></div>
      <div class="measurement-row"><span class="measurement-key">pH</span><span class="measurement-val">${(12 - lw.turbidity/100 * 5).toFixed(1)}</span></div>`;
  }

  function stepLimewater(dt) {
    if (lw.blowing && lw.turbidity < 100) {
      lw.turbidity += 18 * dt;
      lw.turbidity = Math.min(lw.turbidity, 100);
      // spawn CO2 bubbles
      if (Math.random() < 0.3) {
        co2Particles.push({
          x: W * 0.5 + (Math.random()-0.5)*20,
          y: H * 0.62,
          vy: -(1+Math.random()),
          life: 1.0
        });
      }
      updateLwMeasurements();
    }
    co2Particles = co2Particles.filter(p => p.life > 0.05);
    co2Particles.forEach(p => { p.y += p.vy; p.life -= 0.025; });
    setHUD([[lang==='ar'?'التعكّر':'Trouble', Math.round(lw.turbidity)+'%']]);
  }

  function drawLimewater() {
    ctx2d.clearRect(0, 0, W, H);
    ctx2d.fillStyle = '#0a0e1a';
    ctx2d.fillRect(0, 0, W, H);

    // Bench
    ctx2d.fillStyle = '#1a2332';
    ctx2d.fillRect(0, H*0.75, W, H*0.25);

    const bx = W*0.5, by = H*0.35, bW = 100, bH = 160;

    // Beaker glass
    ctx2d.strokeStyle = 'rgba(140,200,255,0.4)'; ctx2d.lineWidth = 2.5;
    ctx2d.beginPath();
    ctx2d.moveTo(bx-bW/2, by); ctx2d.lineTo(bx-bW/2, by+bH);
    ctx2d.lineTo(bx+bW/2, by+bH); ctx2d.lineTo(bx+bW/2, by); ctx2d.stroke();

    // Liquid
    if (lw.step >= 1) {
      const t = lw.turbidity / 100;
      const liquidColor = `rgba(${200+Math.round(t*55)}, ${200+Math.round(t*55)}, ${200+Math.round(t*55)}, ${0.3+t*0.5})`;
      ctx2d.fillStyle = liquidColor;
      ctx2d.fillRect(bx-bW/2+3, by+bH*0.3, bW-6, bH*0.68);
    }

    // Straw
    if (lw.step >= 2) {
      ctx2d.strokeStyle = '#f5c842'; ctx2d.lineWidth = 4; ctx2d.lineCap = 'round';
      ctx2d.beginPath();
      ctx2d.moveTo(bx+10, by - 40);
      ctx2d.lineTo(bx+10, by + bH * 0.85);
      ctx2d.stroke();
    }

    // CO2 bubbles in liquid
    co2Particles.forEach(p => {
      ctx2d.beginPath(); ctx2d.arc(p.x, p.y, 4, 0, Math.PI*2);
      ctx2d.strokeStyle = `rgba(180,240,255,${p.life*0.8})`;
      ctx2d.lineWidth = 1; ctx2d.stroke();
      ctx2d.fillStyle = `rgba(180,240,255,${p.life*0.2})`;
      ctx2d.fill();
    });

    // Blowing person icon
    if (lw.blowing) {
      ctx2d.fillStyle = 'rgba(245,200,66,0.8)';
      ctx2d.font = '28px sans-serif'; ctx2d.textAlign = 'center';
      ctx2d.fillText('💨', bx + 55, by - 25);
    }

    // CaCO3 precipitate
    if (lw.turbidity > 30) {
      const sedH = (lw.turbidity / 100) * 25;
      ctx2d.fillStyle = 'rgba(220,220,225,0.6)';
      ctx2d.fillRect(bx-bW/2+3, by+bH-sedH-2, bW-6, sedH);
      ctx2d.fillStyle = '#c8c8cc'; ctx2d.font = '10px JetBrains Mono, monospace';
      ctx2d.textAlign = 'center'; ctx2d.fillText('CaCO₃↓', bx, by+bH-sedH/2);
    }

    // Equation
    ctx2d.fillStyle = 'rgba(10,14,26,0.85)';
    ctx2d.beginPath();
    ctx2d.roundRect(W/2-210, H*0.82, 420, 30, 8);
    ctx2d.fill();
    ctx2d.fillStyle = '#f5c842'; ctx2d.font = '12px JetBrains Mono, monospace';
    ctx2d.textAlign = 'center';
    ctx2d.fillText('CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O', W/2, H*0.82+20);

    // Status
    if (lw.turbidity >= 100) {
      ctx2d.fillStyle = '#4ade80'; ctx2d.font = 'bold 14px DM Sans, sans-serif';
      ctx2d.textAlign = 'center';
      ctx2d.fillText(lang==='ar'?'الماء أصبح أبيض — CaCO₃ مترسب ✓':'Eau blanche — CaCO₃ précipité ✓', W/2, H*0.78);
    }
  }

  // ── Instructions helper ───────────────────────────────────────
  function setInstructions(steps) {
    instructionsList.innerHTML = '';
    steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="step-num">${i+1}</span><span>${s}</span>`;
      instructionsList.appendChild(li);
    });
  }

  // ── Audio ─────────────────────────────────────────────────────
  let audioCtx = null;
  function playBeep(freq=440, type='sine', dur=0.2) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.start(); osc.stop(audioCtx.currentTime + dur);
    } catch {}
  }

  // ── Main loop ─────────────────────────────────────────────────
  let lastT = 0;
  function loop(ts) {
    const dt = Math.min((ts - lastT) / 1000, 0.05);
    lastT = ts;
    if (currentExp === 'znhcl')     { stepZn(dt);       drawZnHCl(); }
    if (currentExp === 'limewater') { stepLimewater(dt); drawLimewater(); }
    requestAnimationFrame(loop);
  }

  // ── Public reset ─────────────────────────────────────────────
  window.labReset = () => switchExp(currentExp);

  // ── Start ────────────────────────────────────────────────────
  switchExp('znhcl');
  loadingEl.classList.add('hidden');
  requestAnimationFrame(ts => { lastT = ts; loop(ts); });
};
