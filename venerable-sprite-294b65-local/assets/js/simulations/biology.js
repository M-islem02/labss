/* ═══════════════════════════════════════════════════════════════
   BIOLOGY SIMULATION  ·  biology.js
   Experiments: Osmosis (plant water absorption) · Photosynthesis
═══════════════════════════════════════════════════════════════ */
'use strict';

window.labInit = function({ lang, canvas, controlsEl, measurementsEl, hudEl,
  formulaEl, instructionsTitle, instructionsList, expSelector, loadingEl }) {

  const T = {
    ar: {
      osmosis: 'الأوزموز', photosynthesis: 'التمثيل الضوئي',
      time: 'الزمن', absorption: 'معدل الامتصاص', color: 'اللون',
      pour: 'صب الصبغة', light: 'الضوء', dark: 'الظلام',
      play: 'تشغيل', pause: 'توقف', reset: 'إعادة',
      hours: 'ساعة', observation: 'الملاحظة',
      eq: 'CO₂ + H₂O → جلوكوز + O₂',
      instructOsmosis: ['ضع الكوب أمامك','صب الصبغة في الماء','حرك شريط الزمن','راقب انتقال اللون في النبات'],
      instructPhoto: ['فعّل الضوء بالضغط على المصباح','راقب فقاعات الأكسجين على الأوراق','أطفئ الضوء لإيقاف التفاعل','الصيغة: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂']
    },
    fr: {
      osmosis: 'Osmose', photosynthesis: 'Photosynthèse',
      time: 'Temps', absorption: 'Taux d\'absorption', color: 'Couleur',
      pour: 'Verser colorant', light: 'Lumière', dark: 'Obscurité',
      play: 'Lancer', pause: 'Pause', reset: 'Réinitialiser',
      hours: 'heures', observation: 'Observation',
      eq: 'CO₂ + H₂O → Glucose + O₂',
      instructOsmosis: ['Préparez le bécher','Versez le colorant dans l\'eau','Déplacez le curseur de temps','Observez la montée de couleur'],
      instructPhoto: ['Activez la lumière','Observez les bulles d\'O₂ sur les feuilles','Éteignez la lumière pour arrêter','6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂']
    }
  };
  const tx = k => (T[lang]||T.ar)[k] || k;

  let currentExp = 'osmosis';
  let ctx2d, W, H;
  let animId = null;

  // ── Canvas ────────────────────────────────────────────────────
  function resizeCanvas() {
    const area = canvas.parentElement;
    canvas.width = area.clientWidth;
    canvas.height = area.clientHeight;
    W = canvas.width; H = canvas.height;
  }
  window.addEventListener('resize', () => { resizeCanvas(); });
  resizeCanvas();
  ctx2d = canvas.getContext('2d');

  // ── Exp selector ──────────────────────────────────────────────
  ['osmosis','photosynthesis'].forEach(e => {
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
    if (name === 'osmosis')        initOsmosis();
    if (name === 'photosynthesis') initPhoto();
  }

  // ══════════════════════════════════════════════════════════════
  //  OSMOSIS
  // ══════════════════════════════════════════════════════════════
  let os = {};
  function initOsmosis() {
    os = {
      timeH: 0,       // 0–72 h
      maxTime: 72,
      colored: false,
      colorR: 220, colorG: 60, colorB: 60,
      playing: false,
      playInterval: null
    };
    formulaEl.style.display = 'block';
    formulaEl.textContent = lang === 'ar'
      ? 'ضغط الأوزموز يدفع الماء من تركيز منخفض إلى مرتفع'
      : 'La pression osmotique déplace l\'eau du milieu dilué au milieu concentré';

    setInstructions(tx('instructOsmosis'));
    buildOsmosisControls();
    updateOsmosisMeasurements();
  }

  function buildOsmosisControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <div class="control-section-title">${tx('time')}</div>
        <div class="control-row">
          <span class="control-label">${tx('time')}</span>
          <input type="range" class="control-slider" id="os-time" min="0" max="72" step="1" value="0" />
          <span class="control-value" id="os-time-val">0 h</span>
        </div>
      </div>
      <div class="control-section">
        <div class="control-section-title">${tx('color')}</div>
        <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem;">
          ${[['#dc3c3c','أحمر/Rouge'],['#3c6adc','أزرق/Bleu'],['#3cdc7e','أخضر/Vert']].map(([c,l]) =>
            `<button class="ctrl-btn ctrl-btn-secondary" style="flex:1;min-width:50px;padding:.3rem;" data-color="${c}">${l.split('/')[lang==='fr'?1:0]}</button>`
          ).join('')}
        </div>
        <button class="ctrl-btn ctrl-btn-primary" id="os-pour-btn">💧 ${tx('pour')}</button>
      </div>
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-secondary" id="os-play-btn">▶ ${tx('play')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="os-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    document.getElementById('os-time').addEventListener('input', e => {
      os.timeH = +e.target.value;
      document.getElementById('os-time-val').textContent = os.timeH + ' h';
      updateOsmosisMeasurements();
    });

    document.querySelectorAll('[data-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        const hex = btn.dataset.color;
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        os.colorR = r; os.colorG = g; os.colorB = b;
      });
    });

    document.getElementById('os-pour-btn').addEventListener('click', () => {
      os.colored = true;
      playBeep(440, 'sine', 0.3);
    });

    let playing = false;
    document.getElementById('os-play-btn').addEventListener('click', () => {
      playing = !playing;
      document.getElementById('os-play-btn').textContent = playing ? `⏸ ${tx('pause')}` : `▶ ${tx('play')}`;
      if (playing) {
        os.playInterval = setInterval(() => {
          if (os.timeH >= os.maxTime) { clearInterval(os.playInterval); playing = false; return; }
          os.timeH = Math.min(os.timeH + 1, os.maxTime);
          const slider = document.getElementById('os-time');
          if (slider) slider.value = os.timeH;
          const val = document.getElementById('os-time-val');
          if (val) val.textContent = os.timeH + ' h';
          updateOsmosisMeasurements();
        }, 120);
      } else {
        clearInterval(os.playInterval);
      }
    });

    document.getElementById('os-reset-btn').addEventListener('click', () => {
      os.timeH = 0; os.colored = false; playing = false;
      clearInterval(os.playInterval);
      const slider = document.getElementById('os-time');
      if (slider) slider.value = 0;
      const val = document.getElementById('os-time-val');
      if (val) val.textContent = '0 h';
    });
  }

  function updateOsmosisMeasurements() {
    const rate = os.colored ? ((os.timeH / os.maxTime) * 2.4).toFixed(2) : '0.00';
    const percent = os.colored ? Math.round((os.timeH / os.maxTime) * 100) : 0;
    measurementsEl.innerHTML = `
      <div class="measurement-row"><span class="measurement-key">${tx('time')}</span><span class="measurement-val">${os.timeH} h</span></div>
      <div class="measurement-row"><span class="measurement-key">${tx('absorption')}</span><span class="measurement-val">${rate} ml/h</span></div>
      <div class="measurement-row"><span class="measurement-key">${lang==='ar'?'النسبة':'Avancement'}</span><span class="measurement-val">${percent}%</span></div>`;
  }

  function drawOsmosis() {
    ctx2d.clearRect(0, 0, W, H);

    // Background
    ctx2d.fillStyle = 'radial-gradient(circle, #0d1829, #0a0e1a)';
    ctx2d.fillStyle = '#0a0e1a';
    ctx2d.fillRect(0, 0, W, H);

    // table surface
    ctx2d.fillStyle = '#1a2332';
    ctx2d.fillRect(0, H * 0.72, W, H * 0.28);

    const cxBeaker = W * 0.3;
    const beakerW = 140, beakerH = 200;
    const beakerX = cxBeaker - beakerW / 2;
    const beakerY = H * 0.72 - beakerH;

    // Beaker glass
    ctx2d.strokeStyle = 'rgba(140,200,255,0.4)';
    ctx2d.lineWidth = 2.5;
    ctx2d.beginPath();
    ctx2d.moveTo(beakerX, beakerY);
    ctx2d.lineTo(beakerX, beakerY + beakerH);
    ctx2d.lineTo(beakerX + beakerW, beakerY + beakerH);
    ctx2d.lineTo(beakerX + beakerW, beakerY);
    ctx2d.stroke();

    // Water fill
    const waterAlpha = os.colored ? 0.7 : 0.25;
    const { r, g, b } = os.colored
      ? { r: os.colorR, g: os.colorG, b: os.colorB }
      : { r: 60, g: 160, b: 240 };
    const waterH2 = beakerH * 0.75;
    ctx2d.fillStyle = `rgba(${r},${g},${b},${waterAlpha})`;
    ctx2d.fillRect(beakerX + 2.5, beakerY + beakerH - waterH2, beakerW - 5, waterH2);

    // Plant stem
    const stemX = W * 0.58;
    const stemBottom = H * 0.72;
    const stemTop    = stemBottom - 240;
    const progress   = os.colored ? Math.min(os.timeH / os.maxTime, 1) : 0;
    const coloredHeight = (stemBottom - stemTop) * progress;

    // base stem (green)
    ctx2d.strokeStyle = '#2d8a2d';
    ctx2d.lineWidth = 10;
    ctx2d.lineCap = 'round';
    ctx2d.beginPath(); ctx2d.moveTo(stemX, stemBottom); ctx2d.lineTo(stemX, stemTop); ctx2d.stroke();

    // colored section
    if (os.colored && progress > 0) {
      ctx2d.strokeStyle = `rgba(${r},${g},${b},0.85)`;
      ctx2d.lineWidth = 8;
      ctx2d.beginPath();
      ctx2d.moveTo(stemX, stemBottom);
      ctx2d.lineTo(stemX, stemBottom - coloredHeight);
      ctx2d.stroke();
    }

    // Leaves (change color at 72h)
    const leafColor = os.colored && progress >= 1 ? `rgba(${r},${g},${b},0.9)` : '#3db53d';
    drawLeaf(stemX, stemBottom - 80,  1, leafColor);
    drawLeaf(stemX, stemBottom - 140, -1, leafColor);
    drawLeaf(stemX, stemBottom - 200, 1, leafColor);

    // Straw in water
    ctx2d.strokeStyle = 'rgba(140,200,255,0.3)';
    ctx2d.lineWidth = 3;
    ctx2d.beginPath();
    ctx2d.moveTo(cxBeaker, beakerY + beakerH - waterH2);
    ctx2d.lineTo(stemX, stemBottom);
    ctx2d.stroke();

    // Time label
    ctx2d.fillStyle = '#8892a4';
    ctx2d.font = '13px JetBrains Mono, monospace';
    ctx2d.textAlign = 'center';
    ctx2d.fillText(`${os.timeH}h / ${os.maxTime}h`, W / 2, H * 0.88);

    setHUD([[tx('time'), os.timeH+' h'],[tx('absorption'), os.colored ? ((os.timeH/os.maxTime)*2.4).toFixed(2)+' ml/h' : '0']]);
  }

  function drawLeaf(x, y, dir, color) {
    ctx2d.save();
    ctx2d.fillStyle = color;
    ctx2d.beginPath();
    ctx2d.ellipse(x + dir * 30, y, 32, 14, dir * 0.3, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.restore();
  }

  // ══════════════════════════════════════════════════════════════
  //  PHOTOSYNTHESIS
  // ══════════════════════════════════════════════════════════════
  let photo = {};
  let o2Bubbles = [];
  function initPhoto() {
    photo = { lightOn: false };
    formulaEl.style.display = 'block';
    formulaEl.textContent = tx('eq');
    setInstructions(tx('instructPhoto'));
    buildPhotoControls();
    measurementsEl.innerHTML = `
      <div class="measurement-row"><span class="measurement-key">CO₂ absorbé</span><span class="measurement-val" id="co2-val">0 ppm</span></div>
      <div class="measurement-row"><span class="measurement-key">O₂ produit</span><span class="measurement-val" id="o2-val">0 ppm</span></div>
      <div class="measurement-row"><span class="measurement-key">Lumière</span><span class="measurement-val" id="light-val">—</span></div>`;
    o2Bubbles = [];
  }

  let co2Count = 0, o2Count = 0;

  function buildPhotoControls() {
    controlsEl.innerHTML = `
      <div class="control-section">
        <button class="ctrl-btn ctrl-btn-primary" id="photo-light-btn">☀️ ${tx('light')}</button>
        <button class="ctrl-btn ctrl-btn-danger" id="photo-reset-btn">↺ ${tx('reset')}</button>
      </div>`;

    document.getElementById('photo-light-btn').addEventListener('click', () => {
      photo.lightOn = !photo.lightOn;
      document.getElementById('photo-light-btn').textContent = photo.lightOn
        ? `🌑 ${tx('dark')}` : `☀️ ${tx('light')}`;
      if (!photo.lightOn) { o2Bubbles = []; co2Count = 0; o2Count = 0; }
    });
    document.getElementById('photo-reset-btn').addEventListener('click', () => {
      photo.lightOn = false;
      o2Bubbles = [];
      co2Count = 0; o2Count = 0;
      document.getElementById('photo-light-btn').textContent = `☀️ ${tx('light')}`;
    });
  }

  function stepPhoto() {
    if (!photo.lightOn) return;
    // Spawn O2 bubbles randomly on leaves
    if (Math.random() < 0.15) {
      const leafX = W * 0.5 + (Math.random() - 0.5) * 120;
      const leafY = H * 0.3 + (Math.random() - 0.5) * 100;
      o2Bubbles.push({ x: leafX, y: leafY, vy: -(0.4 + Math.random() * 0.4), vx: (Math.random()-0.5)*0.3, life: 1.0 });
    }
    o2Bubbles = o2Bubbles.filter(b => b.life > 0.02);
    o2Bubbles.forEach(b => { b.y += b.vy; b.x += b.vx; b.life -= 0.012; });
    co2Count += 0.5; o2Count += 0.5;
    const co2El = document.getElementById('co2-val');
    const o2El  = document.getElementById('o2-val');
    const ltEl  = document.getElementById('light-val');
    if (co2El) co2El.textContent = Math.round(co2Count) + ' ppm';
    if (o2El)  o2El.textContent  = Math.round(o2Count)  + ' ppm';
    if (ltEl)  ltEl.textContent  = photo.lightOn ? (lang==='ar'?'مشغّل':'Actif') : '—';
  }

  function drawPhoto() {
    ctx2d.clearRect(0, 0, W, H);

    // Sky / water background
    const sky = photo.lightOn
      ? ctx2d.createLinearGradient(0,0,0,H)
      : ctx2d.createLinearGradient(0,0,0,H);
    if (photo.lightOn) {
      sky.addColorStop(0, '#1a3a6a');
      sky.addColorStop(1, '#0a0e1a');
    } else {
      sky.addColorStop(0, '#080c14');
      sky.addColorStop(1, '#0a0e1a');
    }
    ctx2d.fillStyle = sky;
    ctx2d.fillRect(0, 0, W, H);

    // Sun / moon
    if (photo.lightOn) {
      const sunX = W * 0.8, sunY = H * 0.15;
      const grd = ctx2d.createRadialGradient(sunX, sunY, 0, sunX, sunY, 80);
      grd.addColorStop(0, 'rgba(255,240,100,0.9)');
      grd.addColorStop(0.4, 'rgba(255,220,60,0.4)');
      grd.addColorStop(1, 'rgba(255,200,0,0)');
      ctx2d.beginPath(); ctx2d.arc(sunX, sunY, 80, 0, Math.PI*2);
      ctx2d.fillStyle = grd; ctx2d.fill();

      // Light rays on plant
      ctx2d.strokeStyle = 'rgba(255,240,100,0.08)';
      ctx2d.lineWidth = 20;
      for (let i = 0; i < 4; i++) {
        ctx2d.beginPath();
        ctx2d.moveTo(sunX, sunY);
        ctx2d.lineTo(W * 0.5, H * (0.3 + i * 0.1));
        ctx2d.stroke();
      }
    }

    // Plant body
    const cx = W * 0.5, plantBottom = H * 0.82, plantTop = H * 0.22;
    // stem
    ctx2d.strokeStyle = photo.lightOn ? '#2db52d' : '#1a6a1a';
    ctx2d.lineWidth = 12; ctx2d.lineCap = 'round';
    ctx2d.beginPath(); ctx2d.moveTo(cx, plantBottom); ctx2d.lineTo(cx, plantTop); ctx2d.stroke();

    // Leaves (6 of them)
    const leafColor = photo.lightOn ? '#2db52d' : '#1a5a1a';
    [-160,-110,-60,-20, 20, 60].forEach((dy, i) => {
      drawLeaf(cx, plantBottom + dy, i%2===0 ? 1 : -1, leafColor);
    });

    // Soil / pot
    ctx2d.fillStyle = '#6b4226';
    ctx2d.beginPath();
    ctx2d.ellipse(cx, plantBottom, 55, 18, 0, 0, Math.PI*2);
    ctx2d.fill();
    ctx2d.fillStyle = '#4a2d16';
    ctx2d.beginPath();
    ctx2d.ellipse(cx, plantBottom+6, 55, 15, 0, 0, Math.PI*2);
    ctx2d.fill();

    // O2 bubbles
    o2Bubbles.forEach(b => {
      ctx2d.save();
      ctx2d.globalAlpha = b.life;
      ctx2d.fillStyle = 'rgba(130,200,255,0.8)';
      ctx2d.beginPath();
      ctx2d.arc(b.x, b.y, 5 + b.life*3, 0, Math.PI*2);
      ctx2d.fill();
      ctx2d.font = '9px sans-serif';
      ctx2d.fillStyle = 'rgba(200,240,255,0.9)';
      ctx2d.textAlign = 'center'; ctx2d.textBaseline = 'middle';
      ctx2d.fillText('O₂', b.x, b.y);
      ctx2d.restore();
    });

    // CO2 indicators drifting down when light is on
    if (photo.lightOn && Math.random() < 0.06) {
      const co2X = cx + (Math.random()-0.5)*200;
      ctx2d.fillStyle = 'rgba(150,150,180,0.4)';
      ctx2d.font = '10px JetBrains Mono, monospace';
      ctx2d.textAlign = 'center';
      ctx2d.fillText('CO₂', co2X, H * 0.15 + Math.random() * H * 0.3);
    }

    setHUD([['O₂', Math.round(o2Count)+' ppm'],['CO₂', Math.round(co2Count)+' ppm']]);
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

  // ── Instructions helper ───────────────────────────────────────
  function setInstructions(steps) {
    instructionsList.innerHTML = '';
    steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="step-num">${i+1}</span><span>${s}</span>`;
      instructionsList.appendChild(li);
    });
  }

  // ── Main loop ─────────────────────────────────────────────────
  function loop() {
    if (currentExp === 'osmosis')        drawOsmosis();
    if (currentExp === 'photosynthesis') { stepPhoto(); drawPhoto(); }
    animId = requestAnimationFrame(loop);
  }

  // ── Public reset ─────────────────────────────────────────────
  window.labReset = () => switchExp(currentExp);

  // ── Start ────────────────────────────────────────────────────
  switchExp('osmosis');
  loadingEl.classList.add('hidden');
  loop();
};
