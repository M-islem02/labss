    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
    import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
    import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm';
    import { LAB_MODES as BASE_LAB_MODES, LAB_QUERY_ALIASES as BASE_LAB_QUERY_ALIASES, TRANSLATIONS as BASE_TRANSLATIONS } from './lab-data.js';

    const ui = {
      freefallResult: document.getElementById('freefall-result'),
      angleLabel: document.getElementById('angle-label'),
      inclineResult: document.getElementById('incline-result'),
      scaleReading: document.getElementById('scale-reading'),
      pendulumPeriod: document.getElementById('pendulum-period'),
      pendulumAngle: document.getElementById('pendulum-angle'),
      collisionResult: document.getElementById('collision-result'),
      angleSlider: document.getElementById('angle-slider')
    };

    const languageButtons = [...document.querySelectorAll('.lang-switch-btn')];

    const circuitUi = {
      shell: document.getElementById('circuit-shell'),
      boardWrap: document.getElementById('circuit-board-wrap'),
      viewport: document.getElementById('circuit-viewport'),
      status: document.getElementById('circuit-status'),
      deleteButton: document.getElementById('circuit-delete'),
      resetButton: document.getElementById('circuit-reset'),
      lampReadout: document.getElementById('circuit-lamp-readout'),
      switchReadout: document.getElementById('circuit-switch-readout'),
      wiresReadout: document.getElementById('circuit-wires-readout'),
      componentsReadout: document.getElementById('circuit-components-readout'),
      paletteItems: [...document.querySelectorAll('[data-component-type]')],
      modeButtons: [...document.querySelectorAll('.lab-mode-btn')]
    };

    const unityUi = {
      shell: document.getElementById('unity-shell'),
      frame: document.getElementById('unity-frame'),
      loading: document.getElementById('unity-loading'),
      reloadButton: document.getElementById('unity-reload'),
      openButton: document.getElementById('unity-open'),
      fullscreenButton: document.getElementById('unity-fullscreen'),
      stage: document.getElementById('unity-stage')
    };
    const hasUnityUi = Boolean(
      unityUi.shell &&
      unityUi.frame &&
      unityUi.loading &&
      unityUi.reloadButton &&
      unityUi.openButton &&
      unityUi.fullscreenButton
    );

    const biologyUi = {
      shell: document.getElementById('biology-shell'),
      stage: document.getElementById('biology-stage'),
      viewport: document.getElementById('biology-viewport'),
      objectCards: [...document.querySelectorAll('[data-lab-object^="biology-"]')],
      resetButton: document.getElementById('biology-reset'),
      status: document.getElementById('biology-status'),
      observation: document.getElementById('biology-observation'),
      result: document.getElementById('biology-result'),
      waterReadout: document.getElementById('biology-water-readout'),
      leafReadout: document.getElementById('biology-leaf-readout')
    };

    const chemistryUi = {
      shell: document.getElementById('chemistry-shell'),
      stage: document.getElementById('chemistry-stage'),
      viewport: document.getElementById('chemistry-viewport'),
      objectCards: [...document.querySelectorAll('[data-lab-object^="chemistry-"]')],
      resetButton: document.getElementById('chemistry-reset'),
      status: document.getElementById('chemistry-status'),
      observation: document.getElementById('chemistry-observation'),
      result: document.getElementById('chemistry-result'),
      gasReadout: document.getElementById('chemistry-gas-readout'),
      flameReadout: document.getElementById('chemistry-flame-readout')
    };

    function looksLikeMojibake(value) {
      return typeof value === 'string' && /[ØÙÃÂ]/.test(value);
    }

    function decodeMojibake(value) {
      if (!looksLikeMojibake(value)) return value;
      try {
        const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
        return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      } catch {
        return value;
      }
    }

    function decodeContent(value) {
      if (typeof value === 'string') return decodeMojibake(value);
      if (Array.isArray(value)) return value.map((entry) => decodeContent(entry));
      if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, decodeContent(entry)]));
      }
      return value;
    }

    const TRANSLATIONS = {
      ar: decodeContent(BASE_TRANSLATIONS.ar),
      fr: decodeContent(BASE_TRANSLATIONS.fr)
    };

    const LAB_QUERY_ALIASES = Object.fromEntries(
      Object.entries(BASE_LAB_QUERY_ALIASES).filter(([, value]) => value !== 'unity')
    );
    const LAB_MODES = [...new Set(BASE_LAB_MODES.filter((mode) => mode !== 'unity'))];

    function getTranslationValue(language, key) {
      return key.split('.').reduce((value, part) => (value && value[part] !== undefined ? value[part] : undefined), TRANSLATIONS[language]);
    }

    let currentLanguage = 'ar';
    const queryParams = new URLSearchParams(window.location.search);
    const requestedLanguage = queryParams.get('lang');
    const UNITY_WEBGL_URL = './assets/unity-webgl/index.html';

    function getUnityLabUrl(forceFresh = false) {
      return forceFresh ? `${UNITY_WEBGL_URL}?t=${Date.now()}` : UNITY_WEBGL_URL;
    }

    try {
      const storedLanguage = window.localStorage.getItem('lab-language');
      if (TRANSLATIONS[storedLanguage]) currentLanguage = storedLanguage;
    } catch (error) {
      console.warn('Unable to read language preference', error);
    }

    if (TRANSLATIONS[requestedLanguage]) currentLanguage = requestedLanguage;

    function t(key) {
      const currentValue = getTranslationValue(currentLanguage, key);
      if (typeof currentValue === 'string' && /\?{2,}/.test(currentValue)) {
        return getTranslationValue('fr', key) ?? key;
      }
      return decodeMojibake(currentValue ?? getTranslationValue('fr', key) ?? getTranslationValue('ar', key) ?? key);
    }

    function normalizeLabMode(mode) {
      if (!mode) return 'physics';
      const normalized = LAB_QUERY_ALIASES[String(mode).toLowerCase()];
      return normalized && LAB_MODES.includes(normalized) ? normalized : 'physics';
    }

    const requestedLabMode = normalizeLabMode(queryParams.get('lab'));
    const isSingleLabView = ['1', 'true', 'yes'].includes((queryParams.get('single') || '').toLowerCase());
    const requestedSection = String(queryParams.get('section') || '').toLowerCase();

    let immersiveDragObjectId = '';

    function setImmersiveCardState(card, isUsed) {
      if (!card) return;
      card.classList.toggle('is-used', isUsed);
      card.disabled = Boolean(isUsed);
      card.draggable = !isUsed;
      card.setAttribute('aria-disabled', String(Boolean(isUsed)));
    }

    function bindImmersiveDragAndDrop(ui, labPrefix, onActivate) {
      const viewport = ui.viewport;
      const stage = ui.stage;

      const clearHover = () => {
        stage.classList.remove('is-drag-target');
        ui.objectCards.forEach((card) => card.classList.remove('is-drop-target'));
      };

      ui.objectCards.forEach((card) => {
        const objectId = card.dataset.labObject;

        card.addEventListener('click', () => {
          onActivate(objectId);
        });

        card.addEventListener('dragstart', (event) => {
          if (card.disabled) {
            event.preventDefault();
            return;
          }
          immersiveDragObjectId = objectId;
          event.dataTransfer.effectAllowed = 'copy';
          event.dataTransfer.setData('text/plain', objectId);
          card.classList.add('is-drop-target');
          stage.classList.add('is-drag-target');
        });

        card.addEventListener('dragend', () => {
          immersiveDragObjectId = '';
          clearHover();
        });
      });

      viewport.addEventListener('dragover', (event) => {
        const objectId = event.dataTransfer.getData('text/plain') || immersiveDragObjectId;
        if (!objectId || !objectId.startsWith(`${labPrefix}-`)) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        stage.classList.add('is-drag-target');
      });

      viewport.addEventListener('dragenter', (event) => {
        const objectId = event.dataTransfer.getData('text/plain') || immersiveDragObjectId;
        if (!objectId || !objectId.startsWith(`${labPrefix}-`)) return;
        event.preventDefault();
        stage.classList.add('is-drag-target');
      });

      viewport.addEventListener('dragleave', (event) => {
        if (event.relatedTarget && viewport.contains(event.relatedTarget)) return;
        clearHover();
      });

      viewport.addEventListener('drop', (event) => {
        const objectId = event.dataTransfer.getData('text/plain') || immersiveDragObjectId;
        immersiveDragObjectId = '';
        if (!objectId || !objectId.startsWith(`${labPrefix}-`)) {
          clearHover();
          return;
        }
        event.preventDefault();
        clearHover();
        onActivate(objectId);
      });
    }

    const circuitMessages = {
      get initial() { return t('circuit.status.initial'); },
      get ready() { return t('circuit.status.ready'); },
      get open() { return t('circuit.status.open'); },
      get closed() { return t('circuit.status.closed'); }
    };

    const circuitPalette = {
      battery: { width: 1.7, depth: 0.95, height: 0.5, color: 0x2f8d56 },
      bulb: { width: 1.35, depth: 0.9, height: 0.9, color: 0xffc44d },
      switch: { width: 1.7, depth: 0.85, height: 0.4, color: 0xc85b5b }
    };

    const circuitStarterLayout = [
      { type: 'battery', x: -3.55, z: 1.12 },
      { type: 'switch', x: 0.1, z: 1.02 },
      { type: 'bulb', x: 3.35, z: -0.08 }
    ];

    const circuitScene = new THREE.Scene();
    circuitScene.fog = new THREE.Fog(0xe6eff7, 12, 30);

    const circuitCamera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    circuitCamera.position.set(0, 7.2, 8.4);

    const circuitRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    circuitRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    circuitRenderer.shadowMap.enabled = true;
    circuitRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    circuitRenderer.outputEncoding = THREE.sRGBEncoding;
    circuitRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    circuitRenderer.toneMappingExposure = 0.84;
    circuitUi.viewport.appendChild(circuitRenderer.domElement);

    const circuitControls = new OrbitControls(circuitCamera, circuitRenderer.domElement);
    circuitControls.enableDamping = true;
    circuitControls.dampingFactor = 0.08;
    circuitControls.target.set(0, 1.1, 0);
    circuitControls.minDistance = 5.5;
    circuitControls.maxDistance = 13;
    circuitControls.maxPolarAngle = Math.PI / 2.1;
    circuitControls.enablePan = false;

    const circuitRaycaster = new THREE.Raycaster();
    const circuitPointer = new THREE.Vector2();
    const circuitBoardPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.12);
    const circuitBoardHit = new THREE.Vector3();

    const circuitWorld = {
      boardY: 1.12,
      boardWidth: 10.8,
      boardDepth: 6.4,
      boardMinX: -5.1,
      boardMaxX: 5.1,
      boardMinZ: -2.85,
      boardMaxZ: 2.85,
      wireY: 1.36,
      room: {
        benchCenterZ: 0.4
      }
    };

    const circuitInteraction = {
      draggedComponentId: null,
      dragOffset: new THREE.Vector3(),
      pressCandidate: null,
      hoveredPortId: null,
      hoveredWireId: null,
      selectedWireId: null,
      ghostWorld: new THREE.Vector3(),
      pointerInside: false
    };

    const circuitState = {
      components: [],
      wires: [],
      nextComponentId: 1,
      nextWireId: 1,
      wiringStart: null,
      activeNodes: new Set(),
      activeWireIds: new Set(),
      closedCircuit: false,
      paletteDrag: null,
      ghostComponent: null,
      tempWire: null,
      portMeshes: [],
      wireMeshes: [],
      componentMeshes: [],
      boardMesh: null,
      statusLight: null,
      powerUnitDisplayMaterial: null,
      taskLight: null,
      bulbLights: [],
      needsRedraw: true,
      viewportRect: null
    };

    let activeLabMode = 'physics';

    const BENCH_TOP_Y = 1.25;
    const BENCH_LENGTH = 16.8;
    const BENCH_DEPTH = 3.8;
    const BENCH_THICKNESS = 0.18;
    const ROOM_DEPTH = 18;
    const clock = new THREE.Clock();

    const physicsObjects = [];
    const draggableObjects = [];
    const sensorZones = [];
    const resettableStates = [];
    const weighableBodies = [];
    const interactiveMasses = [];

    const MODEL_URLS = {
      airTrack: '',
      incline: '',
      freeFallTower: '',
      scale: '',
      pendulum: '',
      opticalBench: ''
    };

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xb8d6e8, 20, 40);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.domElement.id = 'physics-canvas';
    document.body.prepend(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 8, 14);
    camera.lookAt(0, 1.4, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 1.5, 0);
    controls.minDistance = 7;
    controls.maxDistance = 26;
    controls.maxPolarAngle = Math.PI / 2.12;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE
    };

    const dormantDragControls = new DragControls([], camera, renderer.domElement);
    dormantDragControls.enabled = false;

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0)
    });
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    world.allowSleep = true;

    const defaultMaterial = new CANNON.Material('default');
    const floorMaterial = new CANNON.Material('floor');
    const massMaterial = new CANNON.Material('mass');
    const rampMaterial = new CANNON.Material('ramp');
    const cartMaterial = new CANNON.Material('cart');
    const scaleMaterial = new CANNON.Material('scale');

    world.defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
      friction: 0.38,
      restitution: 0.08
    });
    world.addContactMaterial(new CANNON.ContactMaterial(massMaterial, floorMaterial, {
      friction: 0.5,
      restitution: 0.12
    }));
    world.addContactMaterial(new CANNON.ContactMaterial(massMaterial, rampMaterial, {
      friction: 0.08,
      restitution: 0.04
    }));
    world.addContactMaterial(new CANNON.ContactMaterial(massMaterial, scaleMaterial, {
      friction: 0.36,
      restitution: 0.02
    }));
    world.addContactMaterial(new CANNON.ContactMaterial(cartMaterial, defaultMaterial, {
      friction: 0.01,
      restitution: 0.97
    }));

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragState = {
      mesh: null,
      body: null,
      mode: null,
      offset: new THREE.Vector3(),
      plane: new THREE.Plane(),
      planePoint: new THREE.Vector3(),
      planeHit: new THREE.Vector3()
    };

    const rampData = {
      angleDeg: 30,
      angleRad: THREE.MathUtils.degToRad(30),
      foot: new THREE.Vector3(-3.15, BENCH_TOP_Y, 0.42),
      length: 3.2,
      width: 1.15,
      thickness: 0.12,
      mesh: null,
      body: null,
      arcLine: null,
      pointerLine: null
    };

    const scaleData = {
      center: new THREE.Vector3(2.85, BENCH_TOP_Y + 0.18, 0.92),
      radius: 0.42,
      topY: BENCH_TOP_Y + 0.18,
      platform: null,
      basePlatformY: BENCH_TOP_Y + 0.18,
      readingMassKg: 0,
      readingTweenValue: { value: 0 }
    };

    const freeFallData = {
      heightMeters: 1.5,
      ballMesh: null,
      ballBody: null,
      sensorBody: null,
      active: false,
      completed: false,
      lastResult: null,
      startTimeMs: 0,
      x: 0.8,
      z: -0.05,
      baseTopY: BENCH_TOP_Y + 0.16,
      ballRadius: 0.11
    };

    const pendulumData = {
      pivot: new THREE.Vector3(5.3, BENCH_TOP_Y + 1.34, 0.32),
      length: 1.05,
      ballMesh: null,
      ballBody: null,
      pivotBody: null,
      constraint: null,
      stringLine: null,
      maxAngle: THREE.MathUtils.degToRad(72)
    };

    const collisionData = {
      cartA: null,
      cartB: null,
      railY: BENCH_TOP_Y + 0.24,
      railZ: -0.72,
      minX: -8.1,
      maxX: -3.7,
      active: false,
      collisionRegistered: false,
      collisionTime: 0,
      reportDone: false,
      initialMomentum: 0,
      lastResult: null
    };

    const biologyState = {
      dyeMix: 0,
      absorption: 0,
      plantPlaced: false,
      running: false,
      completed: false
    };

    const chemistryState = {
      zincPlaced: false,
      acidAdded: false,
      acidFill: 0,
      reactionProgress: 0,
      tested: false,
      flameFlash: 0
    };

    let biologyLab = null;
    let chemistryLab = null;
    let circuitInitialized = false;
    let biologyInitialized = false;
    let chemistryInitialized = false;
    let physicsInitialized = false;
    let physicsInitPromise = null;
    let globalControlsInitialized = false;

    const gltfLoader = new GLTFLoader();
    const fbxLoader = new FBXLoader();

    function createImmersiveRenderer(viewport) {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.physicallyCorrectLights = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.92;
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      viewport.appendChild(renderer.domElement);
      return renderer;
    }

    function createShowcaseTable(topColor, edgeColor) {
      const group = new THREE.Group();
      const topMaterial = new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.44, metalness: 0.08 });
      const baseMaterial = new THREE.MeshStandardMaterial({ color: edgeColor, roughness: 0.62, metalness: 0.04 });

      const top = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.28, 4.2), topMaterial);
      top.position.y = 0.04;
      top.castShadow = true;
      top.receiveShadow = true;
      group.add(top);

      const apron = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.28, 1.2), baseMaterial);
      apron.position.set(0, -0.35, 0);
      apron.castShadow = true;
      apron.receiveShadow = true;
      group.add(apron);

      const legGeometry = new THREE.CylinderGeometry(0.11, 0.13, 1.7, 18);
      const legPositions = [
        [-3.1, -0.88, -1.55],
        [3.1, -0.88, -1.55],
        [-3.1, -0.88, 1.55],
        [3.1, -0.88, 1.55]
      ];
      legPositions.forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeometry, baseMaterial);
        leg.position.set(x, y, z);
        leg.castShadow = true;
        leg.receiveShadow = true;
        group.add(leg);
      });

      return group;
    }

    function createGlassVessel({ radiusTop, radiusBottom = radiusTop, height, opacity = 0.22, tint = 0xe8fbff }) {
      const group = new THREE.Group();
      const shellMaterial = new THREE.MeshStandardMaterial({
        color: tint,
        roughness: 0.08,
        metalness: 0.08,
        transparent: true,
        opacity
      });
      const baseMaterial = shellMaterial.clone();
      baseMaterial.opacity = Math.min(opacity + 0.08, 0.42);

      const shell = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 56, 1, true), shellMaterial);
      shell.position.y = height / 2;
      shell.castShadow = true;
      group.add(shell);

      const base = new THREE.Mesh(new THREE.CylinderGeometry(radiusBottom * 0.94, radiusBottom * 0.98, 0.08, 48), baseMaterial);
      base.position.y = 0.04;
      base.receiveShadow = true;
      group.add(base);

      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(radiusTop * 0.98, 0.03, 16, 48),
        new THREE.MeshStandardMaterial({ color: 0xf6fdff, roughness: 0.14, metalness: 0.12, transparent: true, opacity: 0.9 })
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.y = height;
      group.add(rim);

      return group;
    }

    function createLeafMesh(color, width = 0.44, height = 0.92) {
      const shape = new THREE.Shape();
      shape.moveTo(0, -height * 0.5);
      shape.bezierCurveTo(width * 0.9, -height * 0.18, width * 0.82, height * 0.28, 0, height * 0.5);
      shape.bezierCurveTo(-width * 0.82, height * 0.28, -width * 0.9, -height * 0.18, 0, -height * 0.5);
      const geometry = new THREE.ShapeGeometry(shape, 28);
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
        roughness: 0.7,
        metalness: 0.02,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      return { mesh, material };
    }

    function createBiologyBackdropTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 768;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#203f35');
      gradient.addColorStop(0.55, '#5fa287');
      gradient.addColorStop(1, '#dff1dd');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      [120, 340, 560, 780].forEach((x) => {
        ctx.fillRect(x, 70, 120, 400);
        ctx.fillRect(x + 18, 88, 84, 364);
      });

      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath();
        ctx.arc(100 + i * 120, 620 - (i % 2) * 18, 86, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < 42; i += 1) {
        const x = 20 + i * 25;
        const h = 150 + (i % 5) * 25;
        ctx.fillStyle = `rgba(${40 + i * 3}, ${110 + i * 2}, ${60 + i}, 0.35)`;
        ctx.beginPath();
        ctx.ellipse(x, 768 - h * 0.4, 28, h, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function createChemistryBackdropTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 768;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#111827');
      gradient.addColorStop(0.55, '#22364a');
      gradient.addColorStop(1, '#324967');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const shelfColor = 'rgba(31, 44, 59, 0.72)';
      [168, 316, 464].forEach((y) => {
        ctx.fillStyle = shelfColor;
        ctx.fillRect(90, y, 844, 18);
      });

      for (let i = 0; i < 10; i += 1) {
        const x = 120 + i * 78;
        const hue = i % 3 === 0 ? '#6dd3ff' : i % 3 === 1 ? '#f7c778' : '#92e89d';
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(x, 108, 34, 62);
        ctx.fillStyle = hue;
        ctx.fillRect(x + 4, 134, 26, 28);

        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(x + 10, 256, 26, 50);
        ctx.beginPath();
        ctx.moveTo(x - 6, 446);
        ctx.lineTo(x + 20, 390);
        ctx.lineTo(x + 46, 446);
        ctx.closePath();
        ctx.fillStyle = hue;
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(255, 195, 111, 0.18)';
      ctx.beginPath();
      ctx.arc(860, 114, 92, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function updateBiologyVisuals() {
      if (!biologyLab) return;

      const dyeTint = THREE.MathUtils.clamp(biologyState.dyeMix, 0, 1);
      const absorption = THREE.MathUtils.clamp(biologyState.absorption, 0, 1);
      // Water stays lightly tinted — just enough to show the dye is present
      biologyLab.waterMaterial.color.copy(biologyLab.palette.waterBase.clone().lerp(biologyLab.palette.waterTint, dyeTint * 0.45));
      biologyLab.waterMaterial.opacity = THREE.MathUtils.lerp(0.35, 0.52, dyeTint);
      biologyLab.waterMaterial.needsUpdate = true;
      biologyLab.waterHalo.material.opacity = 0.06 + dyeTint * 0.1;
      biologyLab.glowLight.color.set(0xd94060);
      biologyLab.glowLight.intensity = dyeTint * 0.6 + absorption * 2.2;

      const visibleAbsorption = Math.max(absorption, 0.001);
      biologyLab.stemFlow.visible = biologyState.plantPlaced && (biologyState.running || biologyState.completed || biologyState.absorption > 0);
      biologyLab.stemFlow.scale.y = THREE.MathUtils.clamp(visibleAbsorption, 0.001, 1);
      biologyLab.stemFlow.position.y = 0.18 + biologyLab.stemFlowHeight * visibleAbsorption * 0.5;
      biologyLab.stemFlow.material.opacity = 0.22 + absorption * 0.78;
      biologyLab.stemFlow.material.color.copy(biologyLab.palette.dyeColor.clone());
      biologyLab.stemFlow.material.needsUpdate = true;

      // LEAVES change color dramatically — vivid red is the main visual effect
      biologyLab.leafMaterials.forEach((material, i) => {
        const delay = i * 0.1;
        const t = THREE.MathUtils.smoothstep(absorption, 0.10 + delay, 0.55 + delay);
        material.color.copy(biologyLab.palette.leafBase.clone().lerp(biologyLab.palette.leafTint, t));
        material.emissive = material.emissive || new THREE.Color();
        material.emissive.copy(biologyLab.palette.leafTint).multiplyScalar(t * 0.15);
        material.needsUpdate = true;
      });
      // PETALS change color fully — the most visible effect
      biologyLab.petalMaterials.forEach((material, i) => {
        const delay = i * 0.05;
        const t = THREE.MathUtils.smoothstep(absorption, 0.2 + delay, 0.75 + delay);
        material.color.copy(biologyLab.palette.petalBase.clone().lerp(biologyLab.palette.petalTint, t));
        material.emissive = material.emissive || new THREE.Color();
        material.emissive.copy(biologyLab.palette.petalTint).multiplyScalar(t * 0.18);
        material.needsUpdate = true;
      });

      // Stem color also tints reddish
      if (biologyLab.stemMaterial) {
        const stemT = THREE.MathUtils.smoothstep(absorption, 0.05, 0.45);
        biologyLab.stemMaterial.color.setRGB(
          THREE.MathUtils.lerp(0x6f / 255, 0xd9 / 255, stemT * 0.5),
          THREE.MathUtils.lerp(0x9b / 255, 0x40 / 255, stemT * 0.5),
          THREE.MathUtils.lerp(0x5d / 255, 0x60 / 255, stemT * 0.25)
        );
        biologyLab.stemMaterial.needsUpdate = true;
      }
    }

    function updateBiologyUi() {
      let statusKey = 'idle';
      let observationKey = 'idle';
      let resultKey = 'idle';

      if (biologyState.completed) {
        statusKey = 'complete';
        observationKey = 'complete';
        resultKey = 'complete';
      } else if (biologyState.running) {
        statusKey = 'running';
        observationKey = 'running';
        resultKey = 'running';
      } else if (biologyState.plantPlaced && biologyState.dyeMix > 0.1) {
        statusKey = 'ready';
        observationKey = 'plantPlaced';
        resultKey = 'running';
      } else if (biologyState.dyeMix > 0.1) {
        statusKey = 'needPlant';
        observationKey = 'dyeAdded';
      } else if (biologyState.plantPlaced) {
        statusKey = 'needDye';
      }

      biologyUi.status.textContent = t(`biology.status.${statusKey}`);
      biologyUi.observation.textContent = t(`biology.observation.${observationKey}`);
      biologyUi.result.textContent = t(`biology.result.${resultKey}`);
      biologyUi.waterReadout.textContent = biologyState.dyeMix > 0.1 ? t('biology.readouts.waterColored') : t('biology.readouts.waterClear');
      biologyUi.leafReadout.textContent = biologyState.absorption > 0.72 ? t('biology.readouts.leafTinted') : t('biology.readouts.leafWhite');
      setImmersiveCardState(document.getElementById('biology-tool-dye'), biologyState.dyeMix > 0.95);
      setImmersiveCardState(document.getElementById('biology-tool-plant'), biologyState.plantPlaced);

      updateBiologyVisuals();
    }

    function resetBiologyLab() {
      biologyState.dyeMix = 0;
      biologyState.absorption = 0;
      biologyState.plantPlaced = false;
      biologyState.running = false;
      biologyState.completed = false;
      biologyUi.stage.classList.remove('is-drag-target');

      if (biologyLab) {
        gsap.killTweensOf(biologyState);
        gsap.killTweensOf(biologyLab.plantGroup.position);
        gsap.killTweensOf(biologyLab.plantGroup.rotation);
        biologyLab.plantGroup.position.copy(biologyLab.dockPosition);
        biologyLab.plantGroup.rotation.set(0.1, biologyLab.dockRotationY, -0.05);
        // Reset dropper bottle to home position
        if (biologyLab.dropperBottle) {
          gsap.killTweensOf(biologyLab.dropperBottle.position);
          gsap.killTweensOf(biologyLab.dropperBottle.rotation);
          biologyLab.dropperBottle.position.set(2.84, 0.2, 0.24);
          biologyLab.dropperBottle.rotation.set(0, 0, -0.16);
        }
        if (biologyLab.pourStream) biologyLab.pourStream.visible = false;
        if (biologyLab.dropZoneRing) biologyLab.dropZoneRing.material.opacity = 0;
        biologyState.dragState = null;
      }

      updateBiologyUi();
    }

    function addBiologyDye() {
      if (biologyState.dyeMix > 0.05) return;
      gsap.killTweensOf(biologyState);

      // Animate bottle pour: lift ? tilt ? pour (???? ??????) ? return
      if (biologyLab && biologyLab.dropperBottle) {
        const bottle = biologyLab.dropperBottle;
        gsap.killTweensOf(bottle.position);
        gsap.killTweensOf(bottle.rotation);
        const pourTl = gsap.timeline();
        pourTl
          .to(bottle.position, { x: 0.88, y: 2.82, z: 0.1, duration: 0.55, ease: 'power2.out' })
          .to(bottle.rotation, { z: -Math.PI / 2.2, duration: 0.4, ease: 'power2.inOut' })
          .to({}, { duration: 0.85 })
          .to(bottle.rotation, { z: -0.16, duration: 0.38, ease: 'power2.inOut' })
          .to(bottle.position, { x: 2.84, y: 0.2, z: 0.24, duration: 0.75, ease: 'back.out(1.2)' });
        // Show red liquid-stream pour effect
        if (biologyLab.pourStream) {
          biologyLab.pourStream.visible = true;
          biologyLab.pourStream.material.opacity = 0;
          gsap.to(biologyLab.pourStream.material, { opacity: 0.82, delay: 0.54, duration: 0.18 });
          gsap.to(biologyLab.pourStream.material, {
            opacity: 0, delay: 1.38, duration: 0.24,
            onComplete: () => { if (biologyLab && biologyLab.pourStream) biologyLab.pourStream.visible = false; }
          });
        }
      }

      gsap.to(biologyState, {
        dyeMix: 1,
        duration: 2.8,
        ease: 'sine.inOut',
        onUpdate: updateBiologyUi,
        onComplete: () => {
          updateBiologyUi();
          if (biologyState.plantPlaced) runBiologyObservation();
        }
      });
    }

    function activateBiologyObject(objectId) {
      if (objectId === 'biology-dye') {
        addBiologyDye();
        return;
      }
      if (objectId === 'biology-plant') {
        placeBiologyPlant();
      }
    }

    function placeBiologyPlant() {
      if (biologyState.plantPlaced || !biologyLab) return;
      biologyState.plantPlaced = true;
      gsap.to(biologyLab.plantGroup.position, {
        x: biologyLab.beakerPosition.x,
        y: biologyLab.beakerPosition.y,
        z: biologyLab.beakerPosition.z,
        duration: 1.15,
        ease: 'power2.out'
      });
      gsap.to(biologyLab.plantGroup.rotation, {
        x: 0,
        y: biologyLab.beakerRotationY,
        z: 0,
        duration: 1.15,
        ease: 'power2.out'
      });
      updateBiologyUi();
      // Auto-start observation after plant settles into water
      window.setTimeout(() => {
        if (biologyState.dyeMix > 0.7) runBiologyObservation();
      }, 1200);
    }

    function runBiologyObservation() {
      if (biologyState.running || biologyState.completed) {
        return;
      }
      // If dye not yet fully added, wait for it
      if (biologyState.dyeMix < 0.5 || !biologyState.plantPlaced) {
        updateBiologyUi();
        return;
      }

      biologyState.running = true;
      updateBiologyUi();
      gsap.to(biologyState, {
        absorption: 1,
        duration: 8,  // 8 seconds total for dramatic visual effect
        ease: 'sine.inOut',
        onUpdate: updateBiologyUi,
        onComplete: () => {
          biologyState.running = false;
          biologyState.completed = true;
          updateBiologyUi();
        }
      });
    }

    function resizeBiologyViewport() {
      if (!biologyLab) return;
      const rect = biologyUi.viewport.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      biologyLab.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      biologyLab.renderer.setSize(rect.width, rect.height, false);
      biologyLab.camera.aspect = rect.width / rect.height;
      biologyLab.camera.updateProjectionMatrix();
    }

    function initializeBiologyLab() {
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xb9dac8, 10, 24);

      const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
      camera.position.set(4.8, 3.1, 6.4);

      const renderer = createImmersiveRenderer(biologyUi.viewport);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 4.6;
      controls.maxDistance = 9.8;
      controls.maxPolarAngle = Math.PI / 2.02;
      controls.target.set(0.4, 1.65, 0.18);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;

      scene.add(new THREE.AmbientLight(0xdaf7ea, 1.35));

      const keyLight = new THREE.DirectionalLight(0xfff4d8, 1.2);
      keyLight.position.set(3.5, 6.2, 3.2);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      scene.add(keyLight);

      const fillLight = new THREE.PointLight(0x73d8ff, 0.9, 14, 2.2);
      fillLight.position.set(-2.6, 3.4, 3.5);
      scene.add(fillLight);

      const glowLight = new THREE.PointLight(0xd94060, 0, 6, 2);
      glowLight.position.set(0.58, 1.8, 0.08);
      scene.add(glowLight);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 18),
        new THREE.MeshStandardMaterial({ color: 0xccdbce, roughness: 0.96, metalness: 0.04 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.22;
      floor.receiveShadow = true;
      scene.add(floor);

      const backdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 10),
        new THREE.MeshBasicMaterial({ map: createBiologyBackdropTexture() })
      );
      backdrop.position.set(0, 3.6, -5.3);
      scene.add(backdrop);

      const table = createShowcaseTable(0x7a5338, 0x4d3223);
      table.position.y = -0.12;
      scene.add(table);

      const notebook = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.08, 0.82),
        new THREE.MeshStandardMaterial({ color: 0xf2eee3, roughness: 0.74, metalness: 0.03 })
      );
      notebook.position.set(2.18, 0.24, 0.96);
      notebook.rotation.y = -0.28;
      notebook.castShadow = true;
      notebook.receiveShadow = true;
      scene.add(notebook);

      const notebookCover = new THREE.Mesh(
        new THREE.BoxGeometry(1.14, 0.03, 0.86),
        new THREE.MeshStandardMaterial({ color: 0x54744a, roughness: 0.62, metalness: 0.04 })
      );
      notebookCover.position.set(2.18, 0.3, 0.96);
      notebookCover.rotation.y = -0.28;
      notebookCover.castShadow = true;
      scene.add(notebookCover);

      const dropperBottle = new THREE.Group();
      const bottleGlass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.2, 0.62, 28),
        new THREE.MeshStandardMaterial({ color: 0xffb0b8, transparent: true, opacity: 0.72, roughness: 0.12, metalness: 0.08 })
      );
      bottleGlass.position.y = 0.31;
      dropperBottle.add(bottleGlass);
      const bottleCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 0.2, 24),
        new THREE.MeshStandardMaterial({ color: 0x2f4e62, roughness: 0.48, metalness: 0.14 })
      );
      bottleCap.position.y = 0.71;
      dropperBottle.add(bottleCap);
      dropperBottle.position.set(2.84, 0.2, 0.24);
      dropperBottle.rotation.z = -0.16;
      scene.add(dropperBottle);

      const prepDish = new THREE.Mesh(
        new THREE.CylinderGeometry(0.74, 0.82, 0.08, 48),
        new THREE.MeshStandardMaterial({ color: 0xd9dad4, roughness: 0.42, metalness: 0.08 })
      );
      prepDish.position.set(-2.42, 0.2, 1.18);
      prepDish.castShadow = true;
      prepDish.receiveShadow = true;
      scene.add(prepDish);

      const shadowDisk = new THREE.Mesh(
        new THREE.CircleGeometry(1.08, 48),
        new THREE.MeshBasicMaterial({ color: 0x0d171b, transparent: true, opacity: 0.16 })
      );
      shadowDisk.rotation.x = -Math.PI / 2;
      shadowDisk.position.set(0.58, 0.01, 0.1);
      scene.add(shadowDisk);

      const beakerGroup = createGlassVessel({ radiusTop: 0.92, radiusBottom: 0.8, height: 2.56, opacity: 0.2 });
      beakerGroup.position.set(0.58, 0.12, 0.1);
      scene.add(beakerGroup);

      const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0xe9fbff,
        roughness: 0.18,
        metalness: 0.04,
        transparent: true,
        opacity: 0.4
      });
      const water = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.68, 1.58, 48), waterMaterial);
      water.position.set(0.58, 0.92, 0.1);
      scene.add(water);

      const waterHalo = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.8, 0.04, 48),
        new THREE.MeshBasicMaterial({ color: 0x5ea8ff, transparent: true, opacity: 0.08 })
      );
      waterHalo.position.set(0.58, 1.7, 0.1);
      scene.add(waterHalo);

      const plantGroup = new THREE.Group();
      const stemHeight = 3.08;

      const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x6f9b5d, roughness: 0.72, metalness: 0.02 });
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, stemHeight, 18),
        stemMaterial
      );
      stem.position.y = stemHeight / 2;
      stem.castShadow = true;
      plantGroup.add(stem);

      // Add thin vein lines along the stem for realism
      for (let vi = 0; vi < 3; vi++) {
        const veinAngle = (vi / 3) * Math.PI * 2;
        const vein = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.014, stemHeight * 0.92, 8),
          new THREE.MeshStandardMaterial({ color: 0x5a8648, roughness: 0.9, metalness: 0 })
        );
        vein.position.set(Math.cos(veinAngle) * 0.065, stemHeight / 2, Math.sin(veinAngle) * 0.065);
        vein.castShadow = false;
        plantGroup.add(vein);
      }

      const stemFlowHeight = 2.9;
      const stemFlow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.032, 0.04, stemFlowHeight, 18),
        new THREE.MeshStandardMaterial({ color: 0xd94060, transparent: true, opacity: 0.18, roughness: 0.15 })
      );
      stemFlow.scale.y = 0.001;
      stemFlow.position.y = 0.18;
      stemFlow.visible = false;
      plantGroup.add(stemFlow);

      const leafMaterials = [];
      const leafMeshes = [];
      const leafSpecs = [
        { x: -0.38, y: 0.86, z: 0.06, ry: 0.95, rz: -0.58, s: 0.92 },
        { x: 0.36, y: 1.12, z: -0.04, ry: -0.9, rz: 0.48, s: 0.86 },
        { x: -0.3, y: 1.52, z: -0.08, ry: 0.85, rz: -0.38, s: 0.78 },
        { x: 0.28, y: 1.82, z: 0.06, ry: -0.82, rz: 0.34, s: 0.72 },
        { x: -0.2, y: 2.14, z: 0.02, ry: 0.72, rz: -0.28, s: 0.64 },
        { x: 0.18, y: 2.42, z: -0.03, ry: -0.68, rz: 0.22, s: 0.56 }
      ];
      leafSpecs.forEach((spec) => {
        const leaf = createLeafMesh(0xf5f3ec);  // Start WHITE as requested (???? ?????)
        leaf.mesh.position.set(spec.x, spec.y, spec.z);
        leaf.mesh.rotation.set(0.08, spec.ry, spec.rz);
        leaf.mesh.scale.set(spec.s, spec.s, spec.s);
        leaf.mesh.userData.baseRY = spec.ry;
        leaf.mesh.userData.baseRZ = spec.rz;
        plantGroup.add(leaf.mesh);
        leafMaterials.push(leaf.material);
        leafMeshes.push(leaf.mesh);

        // Add a thin center vein line on each leaf
        const veinLine = new THREE.Mesh(
          new THREE.BoxGeometry(0.008, spec.s * 0.7, 0.003),
          new THREE.MeshStandardMaterial({ color: 0xd8d4cc, roughness: 0.8 })
        );
        veinLine.position.copy(leaf.mesh.position);
        veinLine.rotation.copy(leaf.mesh.rotation);
        plantGroup.add(veinLine);
      });

      const petalMaterials = [];
      const flowerGroup = new THREE.Group();
      flowerGroup.position.set(0.02, 3.02, 0);
      for (let index = 0; index < 8; index += 1) {
        const petal = createLeafMesh(0xffffff, 0.28, 0.62);
        const angle = (index / 8) * Math.PI * 2;
        const layerOffset = index % 2 === 0 ? 0.18 : 0.24;
        petal.mesh.position.set(Math.cos(angle) * layerOffset, 0.02 + (index % 2) * 0.04, Math.sin(angle) * layerOffset);
        petal.mesh.rotation.set(0.1 + (index % 2) * 0.08, -angle, 0.25 + (index % 2) * 0.1);
        petal.mesh.scale.set(0.82 - (index % 2) * 0.08, 0.82, 0.82);
        flowerGroup.add(petal.mesh);
        petalMaterials.push(petal.material);
      }
      const flowerCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xf5d28e, roughness: 0.32, metalness: 0.12 })
      );
      flowerCore.castShadow = true;
      flowerGroup.add(flowerCore);
      // Small pistils on flower center
      for (let pi = 0; pi < 5; pi++) {
        const pistil = new THREE.Mesh(
          new THREE.SphereGeometry(0.025, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xe8b830, roughness: 0.4 })
        );
        const pa = (pi / 5) * Math.PI * 2;
        pistil.position.set(Math.cos(pa) * 0.06, 0.1, Math.sin(pa) * 0.06);
        flowerGroup.add(pistil);
      }
      plantGroup.add(flowerGroup);

      // Water surface ring for ripple animation
      const waterSurface = new THREE.Mesh(
        new THREE.RingGeometry(0.3, 0.72, 48),
        new THREE.MeshBasicMaterial({ color: 0xaad8ff, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
      );
      waterSurface.rotation.x = -Math.PI / 2;
      waterSurface.position.set(0.58, 1.7, 0.1);
      scene.add(waterSurface);

      // Dye particles that rise inside the stem
      const particles = [];
      for (let pi = 0; pi < 12; pi++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.015, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xd94060, transparent: true, opacity: 0 })
        );
        particle.userData.phase = pi / 12;
        particle.visible = false;
        scene.add(particle);
        particles.push(particle);
      }

      const dockPosition = new THREE.Vector3(-2.42, 0.26, 1.18);
      const beakerPosition = new THREE.Vector3(0.54, 0.26, 0.16);
      const dockRotationY = 0.68;
      const beakerRotationY = 0.12;
      plantGroup.position.copy(dockPosition);
      plantGroup.rotation.set(0.1, dockRotationY, -0.05);
      scene.add(plantGroup);

      // Pour-stream: red liquid column visible while bottle is tilted over beaker
      const pourStream = new THREE.Mesh(
        new THREE.CylinderGeometry(0.016, 0.026, 1.18, 12),
        new THREE.MeshStandardMaterial({ color: 0xd94060, transparent: true, opacity: 0, roughness: 0.12, metalness: 0.04 })
      );
      pourStream.position.set(0.72, 2.1, 0.1);
      pourStream.rotation.z = 0.14;
      pourStream.visible = false;
      scene.add(pourStream);

      // Drop-zone ring glows around beaker when dragging objects near it
      const bioDropZoneRing = new THREE.Mesh(
        new THREE.RingGeometry(0.92, 1.1, 40),
        new THREE.MeshBasicMaterial({ color: 0xd94060, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      bioDropZoneRing.rotation.x = -Math.PI / 2;
      bioDropZoneRing.position.set(0.58, 0.04, 0.1);
      scene.add(bioDropZoneRing);

      biologyLab = {
        scene,
        camera,
        renderer,
        controls,
        waterMaterial,
        waterHalo,
        waterSurface,
        glowLight,
        stemFlow,
        stemFlowHeight,
        stemMaterial,
        leafMaterials,
        leafMeshes,
        petalMaterials,
        plantGroup,
        particles,
        dockPosition,
        beakerPosition,
        dockRotationY,
        beakerRotationY,
        palette: {
          waterBase: new THREE.Color(0xe9fbff),
          waterTint: new THREE.Color(0xd94060),
          dyeColor: new THREE.Color(0xd94060),
          leafBase: new THREE.Color(0xf5f3ec),  // White
          leafTint: new THREE.Color(0xd94060),
          petalBase: new THREE.Color(0xffffff),
          petalTint: new THREE.Color(0xe83060)
        },
        raycaster: new THREE.Raycaster(),
        pointer: new THREE.Vector2(),
        dropperBottle: dropperBottle,
        pourStream,
        dropZoneRing: bioDropZoneRing
      };

      // 3D pointer drag for CEM lab: grab bottle or plant and drag into the beaker
      biologyUi.viewport.style.touchAction = 'none';
      const bioDragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.72);
      const BIO_BEAKER_X = 0.58, BIO_BEAKER_Z = 0.1, BIO_DROP_RADIUS = 1.5;
      let bioDragMoved = false;

      biologyUi.viewport.addEventListener('pointerdown', (event) => {
        if (!biologyLab || activeLabMode !== 'biology') return;
        const rect = biologyUi.viewport.getBoundingClientRect();
        biologyLab.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        biologyLab.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        biologyLab.raycaster.setFromCamera(biologyLab.pointer, biologyLab.camera);

        let activeMesh = null;
        let dragId = null;

        if (biologyLab.dropperBottle && biologyState.dyeMix < 0.05) {
          if (biologyLab.raycaster.intersectObjects(biologyLab.dropperBottle.children, true).length > 0) {
            activeMesh = biologyLab.dropperBottle;
            dragId = 'biology-dye';
          }
        }
        if (!activeMesh && biologyLab.plantGroup && !biologyState.plantPlaced) {
          if (biologyLab.raycaster.intersectObjects(biologyLab.plantGroup.children, true).length > 0) {
            activeMesh = biologyLab.plantGroup;
            dragId = 'biology-plant';
          }
        }

        if (activeMesh) {
          biologyLab.controls.enabled = false;
          document.body.style.cursor = 'grabbing';
          bioDragMoved = false;
          const intersect = new THREE.Vector3();
          biologyLab.raycaster.ray.intersectPlane(bioDragPlane, intersect);
          biologyState.dragState = {
            id: dragId,
            mesh: activeMesh,
            offset: intersect ? activeMesh.position.clone().sub(intersect) : new THREE.Vector3()
          };
          gsap.killTweensOf(activeMesh.position);
          gsap.to(activeMesh.position, { y: activeMesh.position.y + 0.38, duration: 0.14, ease: 'power1.out' });
        }
      });

      biologyUi.viewport.addEventListener('pointermove', (event) => {
        if (!biologyLab || !biologyState.dragState || activeLabMode !== 'biology') return;
        const rect = biologyUi.viewport.getBoundingClientRect();
        biologyLab.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        biologyLab.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        biologyLab.raycaster.setFromCamera(biologyLab.pointer, biologyLab.camera);
        const intersect = new THREE.Vector3();
        if (biologyLab.raycaster.ray.intersectPlane(bioDragPlane, intersect)) {
          const newPos = intersect.add(biologyState.dragState.offset);
          biologyState.dragState.mesh.position.x = newPos.x;
          biologyState.dragState.mesh.position.z = newPos.z;
          bioDragMoved = true;
        }
        const dist = Math.hypot(
          biologyState.dragState.mesh.position.x - BIO_BEAKER_X,
          biologyState.dragState.mesh.position.z - BIO_BEAKER_Z
        );
        biologyLab.dropZoneRing.material.opacity = dist < BIO_DROP_RADIUS ? 0.68 : 0.12;
        biologyLab.dropZoneRing.scale.setScalar(dist < BIO_DROP_RADIUS ? 1.18 : 1.0);
      });

      biologyUi.viewport.addEventListener('pointerup', () => {
        if (!biologyState.dragState || !biologyLab) return;
        biologyLab.controls.enabled = true;
        document.body.style.cursor = 'default';
        if (biologyLab.dropZoneRing) biologyLab.dropZoneRing.material.opacity = 0;
        const { id, mesh } = biologyState.dragState;
        const dist = Math.hypot(
          mesh.position.x - BIO_BEAKER_X,
          mesh.position.z - BIO_BEAKER_Z
        );
        if (!bioDragMoved || dist < BIO_DROP_RADIUS) {
          // Simple click OR dragged close enough ? activate
          activateBiologyObject(id);
        } else {
          // Dragged but missed the beaker — snap back to dock
          let dockPos = null;
          if (id === 'biology-dye') dockPos = new THREE.Vector3(2.84, 0.2, 0.24);
          if (id === 'biology-plant') dockPos = biologyLab.dockPosition.clone();
          if (dockPos) {
            gsap.to(mesh.position, { x: dockPos.x, y: dockPos.y, z: dockPos.z, duration: 0.48, ease: 'back.out(1.2)' });
            if (id === 'biology-dye') gsap.to(mesh.rotation, { z: -0.16, duration: 0.48 });
          }
        }
        biologyState.dragState = null;
        bioDragMoved = false;
      });


      bindImmersiveDragAndDrop(biologyUi, 'biology', activateBiologyObject);
      biologyUi.resetButton.addEventListener('click', resetBiologyLab);

      resetBiologyLab();
      resizeBiologyViewport();
    }

    function renderBiologyLab(time = 0) {
      if (activeLabMode !== 'biology' || !biologyLab) return;
      if (biologyLab.plantGroup) {
        const sway = Math.sin(time * 0.0009) * 0.02 + Math.sin(time * 0.0017) * 0.008;
        biologyLab.plantGroup.rotation.z = (biologyState.plantPlaced ? 0 : -0.05) + sway;
      }
      // Animate individual leaves swaying
      if (biologyLab.leafMeshes) {
        biologyLab.leafMeshes.forEach((leaf, i) => {
          const phase = i * 1.7;
          leaf.rotation.z = leaf.userData.baseRZ + Math.sin(time * 0.0012 + phase) * 0.04;
          leaf.rotation.y = leaf.userData.baseRY + Math.sin(time * 0.0008 + phase) * 0.03;
        });
      }
      
      updateBiologyVisuals(); // Ensure visuals update every frame just in case GSAP onUpdate misses the final frame

      // Animate water surface ripple
      if (biologyLab.waterSurface) {
        biologyLab.waterSurface.rotation.y = time * 0.0002;
        biologyLab.waterSurface.position.y = 1.7 + Math.sin(time * 0.0015) * 0.008;
      }
      // Animate particles rising inside stem
      if (biologyLab.particles && biologyState.running) {
        biologyLab.particles.forEach((p, i) => {
          const speed = 0.0004 + (i % 4) * 0.0001;
          const cycle = ((time * speed + p.userData.phase) % 1);
          p.position.y = 0.3 + cycle * biologyLab.stemFlowHeight;
          p.position.x = biologyLab.plantGroup.position.x + Math.sin(time * 0.002 + i) * 0.02;
          p.position.z = biologyLab.plantGroup.position.z + Math.cos(time * 0.002 + i) * 0.02;
          p.material.opacity = biologyState.absorption > 0.1 ? 0.5 + Math.sin(time * 0.003 + i * 2) * 0.3 : 0;
          p.visible = biologyState.absorption > 0.05;
        });
      }
      biologyLab.controls.update();
      biologyLab.renderer.render(biologyLab.scene, biologyLab.camera);
    }

    function updateChemistryVisuals(time = 0) {
      if (!chemistryLab) return;

      const acidFill = Math.max(chemistryState.acidFill, 0.001);
      chemistryLab.acidMesh.scale.y = acidFill;
      chemistryLab.acidMesh.position.y = chemistryLab.acidBaseY + chemistryLab.acidHeight * acidFill * 0.5;
      chemistryLab.acidMaterial.opacity = chemistryState.acidAdded ? 0.16 + chemistryState.reactionProgress * 0.44 : 0.02;
      chemistryLab.acidMaterial.color.copy(chemistryLab.palette.acidBase.clone().lerp(chemistryLab.palette.acidTint, chemistryState.reactionProgress * 0.55));

      chemistryLab.gasCloud.material.opacity = THREE.MathUtils.clamp((chemistryState.reactionProgress - 0.18) / 0.72, 0, 0.34);
      chemistryLab.gasCloud.scale.setScalar(0.82 + chemistryState.reactionProgress * 0.18);

      chemistryLab.zincMaterial.color.copy(chemistryLab.palette.zincBase.clone().lerp(chemistryLab.palette.zincTint, chemistryState.reactionProgress * 0.42));
      chemistryLab.zincStrip.scale.y = 1 - chemistryState.reactionProgress * 0.18;

      const flameFlicker = chemistryState.flameFlash > 0
        ? Math.sin(time * 0.041) * 0.12 + Math.sin(time * 0.083 + 1.4) * 0.08
        : 0;
      const flameIntensity = THREE.MathUtils.clamp(chemistryState.flameFlash + flameFlicker, 0, 1.25);

      chemistryLab.flameGroup.visible = flameIntensity > 0.015;
      chemistryLab.flameOuter.scale.set(
        0.85 + flameIntensity * 0.35,
        1.4 + flameIntensity * 1.8,
        0.85 + flameIntensity * 0.35
      );
      chemistryLab.flameInner.scale.set(
        0.6 + flameIntensity * 0.25,
        1.15 + flameIntensity * 1.25,
        0.6 + flameIntensity * 0.25
      );
      chemistryLab.flameOuter.material.opacity = THREE.MathUtils.clamp(0.25 + flameIntensity * 0.75, 0, 0.95);
      chemistryLab.flameInner.material.opacity = THREE.MathUtils.clamp(0.3 + flameIntensity * 0.85, 0, 0.98);
      if (chemistryLab.flameLight) {
        chemistryLab.flameLight.intensity = flameIntensity * 2.8;
      }

      const activeBubbleCount = Math.max(0, Math.round(chemistryState.reactionProgress * chemistryLab.bubbles.length));
      chemistryLab.bubbles.forEach((bubble, index) => {
        const active = chemistryState.acidAdded && activeBubbleCount > 0 && index < activeBubbleCount;
        bubble.mesh.visible = active;
        if (!active) return;
        const cycle = (time * 0.00022 * bubble.speed + bubble.phase) % 1;
        const rise = cycle * chemistryLab.bubbleHeight;
        bubble.mesh.position.set(
          chemistryLab.tubeCenter.x + bubble.offsetX,
          chemistryLab.bubbleBaseY + rise,
          chemistryLab.tubeCenter.z + bubble.offsetZ
        );
        const pulse = 0.75 + Math.sin(time * 0.0011 * bubble.speed + bubble.phase * 12) * 0.16;
        bubble.mesh.scale.setScalar((0.7 + index * 0.015) * pulse);
      });
    }

    function updateChemistryUi() {
      let statusKey = 'idle';
      let observationKey = 'idle';
      let resultKey = 'idle';

      if (chemistryState.tested) {
        statusKey = 'complete';
        observationKey = 'tested';
        resultKey = 'complete';
      } else if (chemistryState.acidAdded) {
        statusKey = chemistryState.reactionProgress >= 0.72 ? 'readyForTest' : 'reacting';
        observationKey = chemistryState.reactionProgress >= 0.72 ? 'gasReady' : 'reaction';
        resultKey = 'running';
      } else if (chemistryState.zincPlaced) {
        statusKey = 'needAcid';
        observationKey = 'zincOnly';
      }

      chemistryUi.status.textContent = t(`chemistry.status.${statusKey}`);
      chemistryUi.observation.textContent = t(`chemistry.observation.${observationKey}`);
      chemistryUi.result.textContent = t(`chemistry.result.${resultKey}`);
      chemistryUi.gasReadout.textContent = chemistryState.acidAdded
        ? (chemistryState.reactionProgress >= 0.72 ? t('chemistry.readouts.gasReady') : t('chemistry.readouts.gasEvolving'))
        : t('chemistry.readouts.gasNone');
      chemistryUi.flameReadout.textContent = chemistryState.tested
        ? t('chemistry.readouts.flameSuccess')
        : t('chemistry.readouts.flameWaiting');
      setImmersiveCardState(document.getElementById('chemistry-tool-zinc'), chemistryState.zincPlaced);
      setImmersiveCardState(document.getElementById('chemistry-tool-acid'), !chemistryState.zincPlaced || chemistryState.acidAdded);
      setImmersiveCardState(document.getElementById('chemistry-tool-flame'), chemistryState.tested);

      updateChemistryVisuals();
    }

    function resetChemistryLab() {
      chemistryState.zincPlaced = false;
      chemistryState.acidAdded = false;
      chemistryState.acidFill = 0;
      chemistryState.reactionProgress = 0;
      chemistryState.tested = false;
      chemistryState.flameFlash = 0;
      chemistryUi.stage.classList.remove('is-drag-target');

      if (chemistryLab) {
        gsap.killTweensOf(chemistryState);
        gsap.killTweensOf(chemistryLab.zincStrip.position);
        chemistryLab.zincStrip.position.copy(chemistryLab.dockPosition);
      }

      updateChemistryUi();
    }

    function addChemistryZinc() {
      if (chemistryState.zincPlaced || !chemistryLab) return;
      chemistryState.zincPlaced = true;
      gsap.to(chemistryLab.zincStrip.position, {
        x: chemistryLab.tubeCenter.x,
        y: chemistryLab.zincTargetY,
        z: chemistryLab.tubeCenter.z,
        duration: 1.05,
        ease: 'power2.out'
      });
      updateChemistryUi();
    }

    function activateChemistryObject(objectId) {
      if (objectId === 'chemistry-zinc') {
        addChemistryZinc();
        return;
      }
      if (objectId === 'chemistry-acid') {
        addChemistryAcid();
        return;
      }
      if (objectId === 'chemistry-flame') {
        testChemistryGas();
      }
    }

    function addChemistryAcid() {
      // Allow re-playing the bottle animation even if already added for fun interactions
      if (!chemistryState.zincPlaced) {
        updateChemistryUi();
        return;
      }

      chemistryState.acidAdded = true;
      updateChemistryUi();
      
      if (chemistryLab && chemistryLab.acidBottle) {
         // Animate bottle pour then return to table
         const bottleTween = gsap.timeline();
         bottleTween
            .to(chemistryLab.acidBottle.position, { x: chemistryLab.tubeCenter.x + 0.4, y: 3.2, z: chemistryLab.tubeCenter.z, duration: 0.5, ease: 'power2.out' })
            .to(chemistryLab.acidBottle.rotation, { z: -Math.PI / 2.5, duration: 0.4 })
            .to({}, { duration: 0.8 }) // wait while pouring
            .to(chemistryLab.acidBottle.rotation, { z: 0, duration: 0.4 })
            .to(chemistryLab.acidBottle.position, { x: 2.4, y: 0.2, z: 0.2, duration: 0.8, ease: 'back.out(1)' });
      }

      gsap.to(chemistryState, {
        acidFill: 1,
        reactionProgress: 1,
        duration: 6.2,
        ease: 'sine.inOut',
        onUpdate: updateChemistryUi,
        onComplete: updateChemistryUi
      });
    }

    function testChemistryGas() {
      if (!chemistryState.acidAdded || chemistryState.reactionProgress < 0.72) {
        updateChemistryUi();
        return;
      }

      chemistryState.tested = true;
      
      if (chemistryLab && chemistryLab.matchbox) {
         // Animate matchbox fly-in, test, then return
         const matchTween = gsap.timeline();
         matchTween
            .to(chemistryLab.matchbox.position, { x: chemistryLab.tubeCenter.x + 0.2, y: 4.12, z: chemistryLab.tubeCenter.z, duration: 0.6, ease: 'power2.out' })
            .to(chemistryLab.matchbox.rotation, { z: 0.4, y: 0.8, duration: 0.2 })
            .to({}, { duration: 0.2 }) // wait for spark
            .to(chemistryLab.matchbox.rotation, { z: 0, y: 0.2, duration: 0.4 })
            .to(chemistryLab.matchbox.position, { x: 2.4, y: 0.26, z: 0.9, duration: 0.8, ease: 'back.out(1)' });
      }

      const flameTween = gsap.timeline({ onComplete: updateChemistryUi, delay: 0.8 }); // Delay spark until match arrives
      flameTween
        .to(chemistryState, { flameFlash: 1, duration: 0.28, ease: 'power2.out', onUpdate: updateChemistryUi })
        .to(chemistryState, { flameFlash: 0.86, duration: 1.35, ease: 'sine.inOut', onUpdate: updateChemistryUi })
        .to(chemistryState, { flameFlash: 0.62, duration: 0.85, ease: 'sine.inOut', onUpdate: updateChemistryUi })
        .to(chemistryState, { flameFlash: 0, duration: 0.82, ease: 'power2.in', onUpdate: updateChemistryUi });
    }

    function resizeChemistryViewport() {
      if (!chemistryLab) return;
      const rect = chemistryUi.viewport.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      chemistryLab.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      chemistryLab.renderer.setSize(rect.width, rect.height, false);
      chemistryLab.camera.aspect = rect.width / rect.height;
      chemistryLab.camera.updateProjectionMatrix();
    }

    function initializeChemistryLab() {
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x101c28, 9, 24);

      const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
      camera.position.set(4.9, 3.2, 6.5);

      const renderer = createImmersiveRenderer(chemistryUi.viewport);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 4.8;
      controls.maxDistance = 9.6;
      controls.maxPolarAngle = Math.PI / 2.02;
      controls.target.set(0.45, 1.8, 0.14);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.22;

      scene.add(new THREE.AmbientLight(0xc9dbff, 1.08));

      const warmKey = new THREE.DirectionalLight(0xffd8a4, 1.08);
      warmKey.position.set(3.2, 5.6, 4.8);
      warmKey.castShadow = true;
      warmKey.shadow.mapSize.set(1024, 1024);
      scene.add(warmKey);

      const coolFill = new THREE.PointLight(0x6fb4ff, 1.0, 16, 2);
      coolFill.position.set(-2.8, 3.6, 3.4);
      scene.add(coolFill);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 18),
        new THREE.MeshStandardMaterial({ color: 0x233142, roughness: 0.94, metalness: 0.06 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.24;
      floor.receiveShadow = true;
      scene.add(floor);

      const backdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 10),
        new THREE.MeshBasicMaterial({ map: createChemistryBackdropTexture() })
      );
      backdrop.position.set(0, 3.6, -5.3);
      scene.add(backdrop);

      const table = createShowcaseTable(0x49566b, 0x2a3240);
      table.position.y = -0.12;
      scene.add(table);

      const safetyPad = new THREE.Mesh(
        new THREE.BoxGeometry(1.46, 0.04, 1.04),
        new THREE.MeshStandardMaterial({ color: 0x2d3f55, roughness: 0.82, metalness: 0.04 })
      );
      safetyPad.position.set(2.28, 0.21, 0.9);
      safetyPad.rotation.y = 0.18;
      safetyPad.receiveShadow = true;
      scene.add(safetyPad);

      const gogglesFrame = new THREE.Mesh(
        new THREE.TorusGeometry(0.26, 0.04, 12, 24),
        new THREE.MeshStandardMaterial({ color: 0x607086, roughness: 0.36, metalness: 0.44 })
      );
      gogglesFrame.position.set(2.16, 0.31, 0.84);
      gogglesFrame.rotation.x = Math.PI / 2;
      gogglesFrame.rotation.z = 0.16;
      scene.add(gogglesFrame);

      const gogglesFrame2 = gogglesFrame.clone();
      gogglesFrame2.position.x += 0.38;
      scene.add(gogglesFrame2);

      const burnerBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.32, 0.22, 28),
        new THREE.MeshStandardMaterial({ color: 0x4d5d71, roughness: 0.34, metalness: 0.68 })
      );
      burnerBase.position.set(2.95, 0.24, -0.34);
      burnerBase.castShadow = true;
      scene.add(burnerBase);

      const burnerTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.6, 18),
        new THREE.MeshStandardMaterial({ color: 0xc7d2dc, roughness: 0.22, metalness: 0.82 })
      );
      burnerTube.position.set(2.95, 0.62, -0.34);
      burnerTube.castShadow = true;
      scene.add(burnerTube);

      const shadowDisk = new THREE.Mesh(
        new THREE.CircleGeometry(1.16, 48),
        new THREE.MeshBasicMaterial({ color: 0x05070c, transparent: true, opacity: 0.18 })
      );
      shadowDisk.rotation.x = -Math.PI / 2;
      shadowDisk.position.set(0.55, 0.01, 0.12);
      scene.add(shadowDisk);

      const standBase = new THREE.Mesh(
        new THREE.BoxGeometry(2.9, 0.18, 1.44),
        new THREE.MeshStandardMaterial({ color: 0x1d2630, roughness: 0.68, metalness: 0.18 })
      );
      standBase.position.set(0.35, 0.18, 0.12);
      standBase.castShadow = true;
      standBase.receiveShadow = true;
      scene.add(standBase);

      const standRod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 3.6, 18),
        new THREE.MeshStandardMaterial({ color: 0xc9d2db, roughness: 0.28, metalness: 0.82 })
      );
      standRod.position.set(-0.55, 1.95, 0.12);
      standRod.castShadow = true;
      scene.add(standRod);

      const clampBar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.7, 12),
        new THREE.MeshStandardMaterial({ color: 0xd3dde6, roughness: 0.24, metalness: 0.82 })
      );
      clampBar.rotation.z = Math.PI / 2;
      clampBar.position.set(-0.04, 2.62, 0.12);
      scene.add(clampBar);

      const tubeCenter = new THREE.Vector3(0.56, 0, 0.12);
      const testTube = createGlassVessel({ radiusTop: 0.46, radiusBottom: 0.34, height: 4.02, opacity: 0.18, tint: 0xeaf6ff });
      testTube.position.set(tubeCenter.x, 0.18, tubeCenter.z);
      scene.add(testTube);

      const acidMaterial = new THREE.MeshStandardMaterial({
        color: 0xdcefff,
        roughness: 0.16,
        metalness: 0.06,
        transparent: true,
        opacity: 0.02
      });
      const acidHeight = 2.04;
      const acidBaseY = 0.26;
      const acidMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.28, acidHeight, 42), acidMaterial);
      acidMesh.scale.y = 0.001;
      acidMesh.position.set(tubeCenter.x, acidBaseY, tubeCenter.z);
      scene.add(acidMesh);

      const gasCloud = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xb4dfff, transparent: true, opacity: 0, roughness: 0.32 })
      );
      gasCloud.position.set(tubeCenter.x, 2.9, tubeCenter.z);
      scene.add(gasCloud);

      const prepTray = new THREE.Mesh(
        new THREE.CylinderGeometry(0.82, 0.9, 0.08, 48),
        new THREE.MeshStandardMaterial({ color: 0xd9d5ce, roughness: 0.42, metalness: 0.08 })
      );
      prepTray.position.set(-2.2, 0.2, 1.02);
      prepTray.castShadow = true;
      prepTray.receiveShadow = true;
      scene.add(prepTray);

      const zincMaterial = new THREE.MeshStandardMaterial({ color: 0xb8c4cf, roughness: 0.3, metalness: 0.92 });
      const zincStrip = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.78, 0.08), zincMaterial);
      const dockPosition = new THREE.Vector3(-2.2, 0.34, 1.02);
      zincStrip.position.copy(dockPosition);
      zincStrip.castShadow = true;
      scene.add(zincStrip);

      const acidBottle = new THREE.Group();
      const acidBottleGlass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.24, 0.72, 28),
        new THREE.MeshStandardMaterial({ color: 0xdcefff, transparent: true, opacity: 0.62, roughness: 0.12, metalness: 0.08 })
      );
      acidBottleGlass.position.y = 0.36;
      acidBottle.add(acidBottleGlass);
      const acidBottleCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.18, 24),
        new THREE.MeshStandardMaterial({ color: 0x3d4a58, roughness: 0.48, metalness: 0.14 })
      );
      acidBottleCap.position.y = 0.81;
      acidBottle.add(acidBottleCap);
      acidBottle.position.set(2.4, 0.2, 0.2);
      scene.add(acidBottle);

      const matchbox = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.12, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x38618c, roughness: 0.8, metalness: 0.1 })
      );
      matchbox.position.set(2.4, 0.26, 0.9);
      matchbox.rotation.y = 0.2;
      scene.add(matchbox);

      const flameOuter = new THREE.Mesh(
        new THREE.ConeGeometry(0.22, 0.68, 32),
        new THREE.MeshBasicMaterial({ color: 0xffaa44, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }) // Orange outer glow
      );
      const flameInner = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.42, 32),
        new THREE.MeshBasicMaterial({ color: 0x77ddff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }) // Vivid blue inner core for hydrogen
      );
      flameOuter.position.y = 0.32;
      flameInner.position.y = 0.25;
      
      const flameLight = new THREE.PointLight(0xffcc88, 0, 8, 2);
      flameLight.position.set(0, 0.3, 0);

      const flameGroup = new THREE.Group();
      flameGroup.visible = false;
      flameGroup.position.set(tubeCenter.x, 4.12, tubeCenter.z);
      flameGroup.add(flameOuter);
      flameGroup.add(flameInner);
      flameGroup.add(flameLight);
      scene.add(flameGroup);

      // Adding aesthetic Set Dressing to the background and side tables
      const bgFlask1 = createGlassVessel({ radiusTop: 0.1, radiusBottom: 0.6, height: 1.8, opacity: 0.18 });
      bgFlask1.position.set(2.8, 0.12, -2.2);
      scene.add(bgFlask1);
      const flask1Liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.6, 24), new THREE.MeshStandardMaterial({ color: 0xff55aa, transparent: true, opacity: 0.8, roughness: 0.1 }));
      flask1Liquid.position.set(2.8, 0.42, -2.2);
      scene.add(flask1Liquid);

      const bgFlask2 = createGlassVessel({ radiusTop: 0.12, radiusBottom: 0.45, height: 1.4, opacity: 0.16 });
      bgFlask2.position.set(-2.5, 0.12, -1.8);
      scene.add(bgFlask2);
      const flask2Liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.8, 24), new THREE.MeshStandardMaterial({ color: 0x44ffaa, transparent: true, opacity: 0.7, roughness: 0.1 }));
      flask2Liquid.position.set(-2.5, 0.52, -1.8);
      scene.add(flask2Liquid);

      const testTubeRack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.6), new THREE.MeshStandardMaterial({ color: 0x826442, roughness: 0.8 }));
      testTubeRack.position.set(-2.8, 0.4, 0.2);
      scene.add(testTubeRack);

      const bubbleBaseY = 0.46;
      const bubbleHeight = 2.1;
      const bubbles = Array.from({ length: 20 }, (_, index) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0xe3f8ff, transparent: true, opacity: 0.84 })
        );
        mesh.visible = false;
        scene.add(mesh);
        return {
          mesh,
          offsetX: Math.sin(index * 2.1) * 0.12,
          offsetZ: Math.cos(index * 1.7) * 0.11,
          speed: 0.84 + (index % 5) * 0.18,
          phase: index / 20
        };
      });

      const dropZoneRing = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 0.65, 32),
        new THREE.MeshBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      dropZoneRing.rotation.x = -Math.PI / 2;
      dropZoneRing.position.set(tubeCenter.x, 0.05, tubeCenter.z);
      scene.add(dropZoneRing);

      chemistryLab = {
        scene,
        camera,
        renderer,
        controls,
        tubeCenter,
        dropZoneRing,
        acidMaterial,
        acidMesh,
        acidHeight,
        acidBaseY,
        gasCloud,
        zincStrip,
        zincMaterial,
        dockPosition,
        zincTargetY: 0.78,
        flameGroup,
        flameOuter,
        flameInner,
        flameLight,
        bubbles,
        bubbleBaseY,
        bubbleHeight,
        palette: {
          acidBase: new THREE.Color(0xdcefff),
          acidTint: new THREE.Color(0x7ac1ff),
          zincBase: new THREE.Color(0xb8c4cf),
          zincTint: new THREE.Color(0xf1d48d)
        },
        raycaster: new THREE.Raycaster(),
        pointer: new THREE.Vector2(),
        acidBottle,
        matchbox
      };

      chemistryUi.viewport.style.touchAction = 'none';
      const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.7);

      chemistryUi.viewport.addEventListener('pointerdown', (event) => {
        if (!chemistryLab || activeLabMode !== 'chemistry') return;
        const rect = chemistryUi.viewport.getBoundingClientRect();
        chemistryLab.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        chemistryLab.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        chemistryLab.raycaster.setFromCamera(chemistryLab.pointer, chemistryLab.camera);

        let activeMesh = null;
        let dragId = null;

        if (chemistryLab.zincStrip && chemistryLab.zincStrip.visible && !chemistryState.zincPlaced) {
            if (chemistryLab.raycaster.intersectObject(chemistryLab.zincStrip).length > 0) {
                activeMesh = chemistryLab.zincStrip;
                dragId = 'chemistry-zinc';
            }
        }
        if (!activeMesh && chemistryLab.acidBottle && chemistryLab.acidBottle.visible && !chemistryState.acidAdded) {
            if (chemistryLab.raycaster.intersectObjects(chemistryLab.acidBottle.children, true).length > 0) {
                activeMesh = chemistryLab.acidBottle;
                dragId = 'chemistry-acid';
            }
        }
        if (!activeMesh && chemistryLab.matchbox && chemistryLab.matchbox.visible) {
            if (chemistryLab.raycaster.intersectObject(chemistryLab.matchbox).length > 0) {
                activeMesh = chemistryLab.matchbox;
                dragId = 'chemistry-flame';
            }
        }

        if (activeMesh) {
            chemistryLab.controls.enabled = false;
            document.body.style.cursor = 'grabbing';
            const intersect = new THREE.Vector3();
            chemistryLab.raycaster.ray.intersectPlane(dragPlane, intersect);
            chemistryState.dragState = {
                id: dragId,
                mesh: activeMesh,
                startY: activeMesh.position.y,
                offset: intersect ? activeMesh.position.clone().sub(intersect) : new THREE.Vector3()
            };
            
            // Subtle lift feedback
            gsap.killTweensOf(activeMesh.position);
            gsap.to(activeMesh.position, { y: activeMesh.position.y + 0.3, duration: 0.15, ease: 'power1.out' });
        }
      });

      chemistryUi.viewport.addEventListener('pointermove', (event) => {
        if (!chemistryLab || !chemistryState.dragState || activeLabMode !== 'chemistry') return;
        const rect = chemistryUi.viewport.getBoundingClientRect();
        chemistryLab.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        chemistryLab.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        chemistryLab.raycaster.setFromCamera(chemistryLab.pointer, chemistryLab.camera);
        
        const intersect = new THREE.Vector3();
        if (chemistryLab.raycaster.ray.intersectPlane(dragPlane, intersect)) {
            const newPos = intersect.add(chemistryState.dragState.offset);
            chemistryState.dragState.mesh.position.x = newPos.x;
            chemistryState.dragState.mesh.position.z = newPos.z;
        }

        const dist = Math.hypot(
            chemistryState.dragState.mesh.position.x - chemistryLab.tubeCenter.x,
            chemistryState.dragState.mesh.position.z - chemistryLab.tubeCenter.z
        );
        chemistryLab.dropZoneRing.material.opacity = dist < 1.4 ? 0.8 : 0.2;
        chemistryLab.dropZoneRing.scale.setScalar(dist < 1.4 ? 1.2 : 1.0);
      });

      chemistryUi.viewport.addEventListener('pointerup', (event) => {
        if (!chemistryState.dragState || !chemistryLab) return;
        chemistryLab.controls.enabled = true;
        document.body.style.cursor = 'default';
        chemistryLab.dropZoneRing.material.opacity = 0;
        
        const dist = Math.hypot(
            chemistryState.dragState.mesh.position.x - chemistryLab.tubeCenter.x,
            chemistryState.dragState.mesh.position.z - chemistryLab.tubeCenter.z
        );
        
        if (dist < 1.4) {
            // Drop successful! Let the activate function handle any bespoke animations to tube
            activateChemistryObject(chemistryState.dragState.id);
        } else {
            // Drop failed, snap back
            let originalDock = null;
            if (chemistryState.dragState.id === 'chemistry-zinc') originalDock = chemistryLab.dockPosition;
            if (chemistryState.dragState.id === 'chemistry-acid') originalDock = new THREE.Vector3(2.4, 0.2, 0.2);
            if (chemistryState.dragState.id === 'chemistry-flame') originalDock = new THREE.Vector3(2.4, 0.26, 0.9);
            
            if (originalDock) {
                gsap.to(chemistryState.dragState.mesh.position, {
                    x: originalDock.x, y: originalDock.y, z: originalDock.z, 
                    duration: 0.45, ease: 'back.out(1.2)'
                });
                gsap.to(chemistryState.dragState.mesh.rotation, { x: 0, y: chemistryState.dragState.id === 'chemistry-flame' ? 0.2 : 0, z: 0, duration: 0.45 });
            }
        }
        
        chemistryState.dragState = null;
      });

      bindImmersiveDragAndDrop(chemistryUi, 'chemistry', activateChemistryObject);
      chemistryUi.resetButton.addEventListener('click', resetChemistryLab);

      resetChemistryLab();
      resizeChemistryViewport();
    }

    function renderChemistryLab(time) {
      if (activeLabMode !== 'chemistry' || !chemistryLab) return;
      updateChemistryVisuals(time);
      chemistryLab.controls.update();
      chemistryLab.renderer.render(chemistryLab.scene, chemistryLab.camera);
    }

    function applyStaticTranslations() {
      document.title = t('page.title');
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
      document.body.classList.toggle('lang-ar', currentLanguage === 'ar');
      document.body.classList.toggle('lang-fr', currentLanguage === 'fr');
      circuitUi.shell.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
      biologyUi.shell.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
      chemistryUi.shell.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

      document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = t(element.dataset.i18n);
      });

      document.querySelectorAll('[data-i18n-html]').forEach((element) => {
        element.innerHTML = t(element.dataset.i18nHtml);
      });

      languageButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.lang === currentLanguage);
        if (button.dataset.lang === 'ar') button.textContent = 'العربية';
        if (button.dataset.lang === 'fr') button.textContent = 'Français';
      });
    }

    function renderFreeFallStatus() {
      if (freeFallData.active && !freeFallData.completed) {
        ui.freefallResult.innerHTML = `<strong>${t('physics.freefall.height')}:</strong> 1.50 ${t('physics.units.meter')}<br><strong>${t('physics.freefall.time')}:</strong> ${t('physics.freefall.waiting')}<br><strong>g:</strong> ${t('physics.freefall.impactWaiting')}`;
        return;
      }
      updateFreeFallUi(freeFallData.lastResult);
    }

    function renderCollisionStatus() {
      if (collisionData.active && !collisionData.reportDone) {
        ui.collisionResult.innerHTML = `<strong>${t('physics.collision.status')}:</strong> ${t('physics.collision.launching')}`;
        return;
      }

      if (collisionData.lastResult) {
        const { pBefore, pAfter, velocityA, velocityB } = collisionData.lastResult;
        ui.collisionResult.innerHTML = `<strong>${t('physics.collision.initialMomentum')}:</strong> ${pBefore.toFixed(3)} ${t('physics.units.momentum')}<br><strong>${t('physics.collision.finalMomentum')}:</strong> ${pAfter.toFixed(3)} ${t('physics.units.momentum')}<br><strong>${t('physics.collision.velocities')}:</strong> ${velocityA.toFixed(2)} ${t('physics.units.velocity')}, ${velocityB.toFixed(2)} ${t('physics.units.velocity')}`;
        return;
      }

      ui.collisionResult.innerHTML = `<strong>${t('physics.collision.status')}:</strong> ${t('physics.collision.ready')}`;
    }

    function refreshLocalizedUi() {
      applyStaticTranslations();
      renderFreeFallStatus();
      updateInclineUi();
      updatePendulumUi();
      renderCollisionStatus();
      updateCircuitStatus();
      updateCircuitDashboard();
      updateBiologyUi();
      updateChemistryUi();
    }

    function setLanguage(language) {
      if (!TRANSLATIONS[language]) return;
      currentLanguage = language;
      try {
        window.localStorage.setItem('lab-language', language);
      } catch (error) {
        console.warn('Unable to persist language preference', error);
      }
      refreshLocalizedUi();
    }

    function applySingleLabView() {
      if (!isSingleLabView) return;
      document.body.classList.add('single-lab');
      if (requestedSection) document.body.dataset.section = requestedSection;
      circuitUi.modeButtons.forEach((button) => {
        const isRequested = button.dataset.lab === requestedLabMode;
        button.classList.toggle('active', isRequested);
        button.hidden = !isRequested;
        button.disabled = true;
      });
      if (requestedLabMode === 'physics' && requestedSection) {
        const sectionSelectors = {
          freefall: '#freefall-result',
          incline: '#incline-result',
          scale: '#scale-reading',
          pendulum: '#pendulum-period',
          collision: '#collision-result'
        };
        const selector = sectionSelectors[requestedSection];
        document.querySelectorAll('#ui-panel .experiment-section').forEach((section) => {
          section.hidden = selector ? !section.querySelector(selector) : false;
        });
      }
    }

    function bindGlobalControls() {
      if (globalControlsInitialized) return;
      globalControlsInitialized = true;

      circuitUi.modeButtons.forEach((button) => {
        button.addEventListener('click', () => {
          if (isSingleLabView) return;
          setLabMode(button.dataset.lab);
        });
      });

      languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
          setLanguage(button.dataset.lang);
        });
      });
    }

    function ensureCircuitLabInitialized() {
      if (circuitInitialized) return;
      initializeCircuitLab();
      circuitInitialized = true;
    }

    function ensureBiologyLabInitialized() {
      if (biologyInitialized) return;
      initializeBiologyLab();
      biologyInitialized = true;
    }

    function ensureChemistryLabInitialized() {
      if (chemistryInitialized) return;
      initializeChemistryLab();
      chemistryInitialized = true;
    }

    async function ensurePhysicsLabInitialized() {
      if (physicsInitialized) return;
      if (!physicsInitPromise) {
        physicsInitPromise = buildLab()
          .then(() => {
            attachInput();
            resetLab();
            physicsInitialized = true;
          })
          .catch((error) => {
            physicsInitPromise = null;
            throw error;
          });
      }
      await physicsInitPromise;
    }

    function scheduleDeferredLabInitialization(initialMode) {
      if (isSingleLabView) return;
      const queue = ['physics', 'circuit', 'biology', 'chemistry'].filter((mode) => mode !== initialMode);

      const initializeMode = (mode) => {
        if (mode === 'physics') {
          void ensurePhysicsLabInitialized();
        } else if (mode === 'circuit') {
          ensureCircuitLabInitialized();
        } else if (mode === 'biology') {
          ensureBiologyLabInitialized();
        } else if (mode === 'chemistry') {
          ensureChemistryLabInitialized();
        }
      };

      const runNext = () => {
        const nextMode = queue.shift();
        if (!nextMode) return;
        initializeMode(nextMode);
        if (queue.length) {
          setTimeout(() => {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(runNext, { timeout: 1000 });
            } else {
              runNext();
            }
          }, 360);
        }
      };

      setTimeout(() => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(runNext, { timeout: 1200 });
        } else {
          runNext();
        }
      }, 420);
    }

    function ensureUnityLabLoaded(forceReload = false) {
      if (!hasUnityUi) return;
      if (forceReload || !unityUi.frame.dataset.loaded) {
        unityUi.loading.classList.remove('is-hidden');
        unityUi.frame.dataset.loaded = 'true';
        unityUi.frame.src = getUnityLabUrl(forceReload);
      }
    }

    function openUnityInSeparatePage() {
      if (!hasUnityUi) return;
      ensureUnityLabLoaded();
      const targetUrl = getUnityLabUrl(true);
      const popup = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.location.href = targetUrl;
      }
    }

    async function toggleUnityFullscreen() {
      if (!hasUnityUi) return;
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          return;
        }
        const target = unityUi.stage || unityUi.frame;
        if (target && target.requestFullscreen) {
          await target.requestFullscreen();
        }
      } catch (error) {
        console.warn('Unable to toggle Unity fullscreen', error);
      }
    }

    function createGradientTexture(topColor, bottomColor) {
      const canvas = document.createElement('canvas');
      canvas.width = 8;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, topColor);
      gradient.addColorStop(1, bottomColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function createWindowTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
      sky.addColorStop(0, '#8dc6ff');
      sky.addColorStop(0.55, '#d6efff');
      sky.addColorStop(1, '#eef0e2');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255, 238, 201, 0.9)';
      ctx.beginPath();
      ctx.arc(140, 102, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.65)';
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath();
        ctx.ellipse(120 + i * 110, 95 + (i % 3) * 14, 70, 24, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#87b081';
      for (let i = 0; i < 11; i += 1) {
        const x = i * 100;
        ctx.beginPath();
        ctx.moveTo(x, 330);
        ctx.lineTo(x + 70, 190 + (i % 2) * 20);
        ctx.lineTo(x + 150, 330);
        ctx.closePath();
        ctx.fill();
      }

      ctx.fillStyle = '#7ea0a1';
      for (let i = 0; i < 14; i += 1) {
        const width = 36 + (i % 4) * 10;
        const height = 110 + (i % 5) * 20;
        const x = 20 + i * 72;
        const y = 300 - height;
        ctx.fillRect(x, y, width, height);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.fillRect(0, 0, canvas.width, 46);

      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function createCanvasLabelTexture(label, base = '#c7d2dd', accent = '#6d7f91') {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, '#f2f6fa');
      gradient.addColorStop(1, base);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(53, 73, 92, 0.14)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= 256; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 256);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(256, i);
        ctx.stroke();
      }

      ctx.fillStyle = accent;
      ctx.font = '700 42px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function loadRepeatedTexture(url, repeatX, repeatY) {
      const texture = createCanvasLabelTexture('LAB');
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
      texture.encoding = THREE.sRGBEncoding;
      const loader = new THREE.ImageLoader();
      loader.load(
        url,
        (image) => {
          texture.image = image;
          texture.needsUpdate = true;
        },
        undefined,
        () => {}
      );
      return texture;
    }

    scene.background = createGradientTexture('#92c8f0', '#eef2eb');

    const woodTexture = createCanvasLabelTexture('WOOD', '#d6b487', '#7a5230');
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(4, 2);

    const floorTexture = createCanvasLabelTexture('FLOOR', '#d7dde2', '#6b7f8f');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 8);

    const metalTexture = createCanvasLabelTexture('METAL', '#c9d2db', '#516372');
    metalTexture.wrapS = THREE.RepeatWrapping;
    metalTexture.wrapT = THREE.RepeatWrapping;
    metalTexture.repeat.set(3, 2);
    const windowTexture = createWindowTexture();

    function applyShadow(object) {
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    function createLineFromPoints(points, color = 0x1f5c81) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.92 })
      );
    }

    function vector3ToCannon(vec) {
      return new CANNON.Vec3(vec.x, vec.y, vec.z);
    }

    function registerPhysicsObject({
      mesh,
      body,
      kind,
      dragMode = null,
      draggable = false,
      massKg = 0,
      experimentRole = '',
      syncRotation = true,
      resettable = true,
      onReset = null
    }) {
      if (body) {
        world.addBody(body);
      }

      if (mesh && body) {
        mesh.userData.body = body;
        mesh.userData.kind = kind;
        mesh.userData.massKg = massKg;
        mesh.userData.dragMode = dragMode;
        mesh.userData.experimentRole = experimentRole;
        mesh.userData.homeTransform = {
          position: mesh.position.clone(),
          quaternion: mesh.quaternion.clone()
        };
      }

      if (mesh && body) {
        physicsObjects.push({ mesh, body, syncRotation });
      }

      if (mesh && draggable) {
        draggableObjects.push(mesh);
      }

      if (mesh && massKg > 0 && (kind === 'mass-disc' || kind === 'brass-mass')) {
        weighableBodies.push({ mesh, body, massKg });
        interactiveMasses.push({ mesh, body, massKg });
      }

      if (body && resettable) {
        resettableStates.push({
          mesh,
          body,
          position: body.position.clone(),
          quaternion: body.quaternion.clone(),
          type: body.type,
          onReset
        });
      }
    }

    async function loadModelOrFallback(name, builder) {
      const url = MODEL_URLS[name];
      if (!url) return builder();
      try {
        const gltf = await gltfLoader.loadAsync(url);
        return gltf.scene;
      } catch (error) {
        console.warn(`Falling back to procedural ${name} model.`, error);
        return builder();
      }
    }

    function enableShadows(object3d) {
      object3d.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = true;
        child.receiveShadow = true;
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => {
            if (material) material.side = THREE.FrontSide;
          });
          return;
        }
        if (child.material) child.material.side = THREE.FrontSide;
      });
    }

    async function placeUnityDecoration({ url, targetHeight, position, rotationY = 0, targetWidth = 0 }) {
      try {
        const asset = await fbxLoader.loadAsync(url);
        enableShadows(asset);

        const sourceBox = new THREE.Box3().setFromObject(asset);
        const sourceSize = sourceBox.getSize(new THREE.Vector3());
        if (!sourceSize.y) return null;

        let scale = targetHeight / sourceSize.y;
        if (targetWidth && sourceSize.x) {
          scale = Math.min(scale, targetWidth / sourceSize.x);
        }
        asset.scale.setScalar(scale);

        const scaledBox = new THREE.Box3().setFromObject(asset);
        const baseOffsetY = scaledBox.min.y;
        const center = scaledBox.getCenter(new THREE.Vector3());
        asset.position.set(
          position.x - center.x,
          position.y - baseOffsetY,
          position.z - center.z
        );
        asset.rotation.y = rotationY;
        scene.add(asset);
        return asset;
      } catch (error) {
        console.warn(`Unable to load Unity asset: ${url}`, error);
        return null;
      }
    }

    async function decorateRoomWithUnityAssets() {
      await Promise.allSettled([
        placeUnityDecoration({
          url: './assets/unity-lab/environment/lab_cupboard.fbx',
          targetHeight: 2.3,
          targetWidth: 3.6,
          position: new THREE.Vector3(-10.2, 0, -3.85),
          rotationY: Math.PI / 2
        }),
        placeUnityDecoration({
          url: './assets/unity-lab/environment/lab_small_cupboard.fbx',
          targetHeight: 1.45,
          targetWidth: 1.8,
          position: new THREE.Vector3(10.15, 0, -3.7),
          rotationY: -Math.PI / 2
        }),
        placeUnityDecoration({
          url: './assets/unity-lab/environment/chair.fbx',
          targetHeight: 1.05,
          targetWidth: 1.1,
          position: new THREE.Vector3(-7.3, 0, 2.85),
          rotationY: Math.PI * 0.2
        }),
        placeUnityDecoration({
          url: './assets/unity-lab/environment/chair_2.fbx',
          targetHeight: 1.05,
          targetWidth: 1.1,
          position: new THREE.Vector3(7.15, 0, 2.7),
          rotationY: -Math.PI * 0.28
        }),
        placeUnityDecoration({
          url: './assets/unity-lab/classroom/Posters.FBX',
          targetHeight: 2.45,
          targetWidth: 2.1,
          position: new THREE.Vector3(0, 0.55, -5.76)
        })
      ]);
    }

    function addLights() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffe5b0, 1.2);
      directionalLight.position.set(5, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.set(2048, 2048);
      directionalLight.shadow.camera.left = -14;
      directionalLight.shadow.camera.right = 14;
      directionalLight.shadow.camera.top = 12;
      directionalLight.shadow.camera.bottom = -8;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 32;
      scene.add(directionalLight);

      const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.3);
      scene.add(hemisphereLight);

      const benchLight = new THREE.PointLight(0xffffff, 0.5, 20, 2);
      benchLight.position.set(0, BENCH_TOP_Y + 4.8, 1.2);
      benchLight.castShadow = true;
      benchLight.shadow.mapSize.set(1024, 1024);
      scene.add(benchLight);
    }

    function buildRoom() {
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshStandardMaterial({ color: 0xd8dad8, roughness: 0.95, metalness: 0.02 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      const groundBody = new CANNON.Body({ mass: 0, material: floorMaterial, type: CANNON.Body.STATIC });
      groundBody.addShape(new CANNON.Plane());
      groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      world.addBody(groundBody);

      const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf4efe7, roughness: 0.95 });
      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(28, 12), wallMaterial);
      backWall.position.set(0, 6, -8.8);
      backWall.receiveShadow = true;
      scene.add(backWall);

      const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_DEPTH, 12), wallMaterial);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(-13.5, 6, 0);
      scene.add(leftWall);

      const rightWall = leftWall.clone();
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(13.5, 6, 0);
      scene.add(rightWall);

      const windowFrame = new THREE.Group();
      const windowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(11.8, 4.8),
        new THREE.MeshBasicMaterial({ map: windowTexture })
      );
      windowPlane.position.set(0.2, 6.35, -8.72);
      windowFrame.add(windowPlane);

      const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xe7e1d8, roughness: 0.7, metalness: 0.08 });
      const verticalBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 5.1, 0.14), frameMaterial);
      verticalBar.position.set(0.2, 6.35, -8.66);
      const horizontalBar = new THREE.Mesh(new THREE.BoxGeometry(11.9, 0.12, 0.14), frameMaterial);
      horizontalBar.position.set(0.2, 6.35, -8.66);
      windowFrame.add(verticalBar, horizontalBar);
      applyShadow(windowFrame);
      scene.add(windowFrame);

      const bench = new THREE.Group();
      const benchTop = new THREE.Mesh(
        new THREE.BoxGeometry(BENCH_LENGTH, BENCH_THICKNESS, BENCH_DEPTH),
        new THREE.MeshStandardMaterial({ color: 0xf1ede5, roughness: 0.82, metalness: 0.04 })
      );
      benchTop.position.set(0, BENCH_TOP_Y - BENCH_THICKNESS / 2, 0.25);
      bench.add(benchTop);

      const benchApron = new THREE.Mesh(
        new THREE.BoxGeometry(BENCH_LENGTH - 0.5, 0.22, 0.28),
        new THREE.MeshStandardMaterial({ color: 0xe9e2d7, roughness: 0.8 })
      );
      benchApron.position.set(0, BENCH_TOP_Y - 0.22, -1.42);
      bench.add(benchApron);

      const legGeometry = new THREE.BoxGeometry(0.26, BENCH_TOP_Y, 0.26);
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0xcfc7bc, roughness: 0.88 });
      [
        [-7.8, BENCH_TOP_Y / 2, -1.28],
        [7.8, BENCH_TOP_Y / 2, -1.28],
        [-7.8, BENCH_TOP_Y / 2, 1.62],
        [7.8, BENCH_TOP_Y / 2, 1.62]
      ].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(x, y, z);
        bench.add(leg);
      });

      applyShadow(bench);
      scene.add(bench);

      const benchBody = new CANNON.Body({
        mass: 0,
        material: defaultMaterial,
        position: new CANNON.Vec3(0, BENCH_TOP_Y - BENCH_THICKNESS / 2, 0.25),
        shape: new CANNON.Box(new CANNON.Vec3(BENCH_LENGTH / 2, BENCH_THICKNESS / 2, BENCH_DEPTH / 2))
      });
      world.addBody(benchBody);
    }

    function buildAirTrack() {
      const group = new THREE.Group();
      const baseMaterial = new THREE.MeshStandardMaterial({ map: metalTexture, color: 0xcfd7e2, metalness: 0.6, roughness: 0.38 });
      const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x2b516a, roughness: 0.42, metalness: 0.35 });
      const xCenter = -5.95;
      const z = collisionData.railZ;
      const railBaseY = BENCH_TOP_Y + 0.07;

      const railBase = new THREE.Mesh(new THREE.BoxGeometry(4.95, 0.12, 0.52), baseMaterial);
      railBase.position.set(xCenter, railBaseY, z);
      group.add(railBase);

      const railLeft = new THREE.Mesh(new THREE.BoxGeometry(4.82, 0.06, 0.08), accentMaterial);
      railLeft.position.set(xCenter, collisionData.railY - 0.07, z - 0.12);
      const railRight = railLeft.clone();
      railRight.position.z = z + 0.12;
      group.add(railLeft, railRight);

      const photogateMaterial = new THREE.MeshStandardMaterial({ color: 0x30475a, roughness: 0.52 });
      const gateLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.32, 0.05), photogateMaterial);
      gateLeft.position.set(collisionData.maxX + 0.15, BENCH_TOP_Y + 0.24, z - 0.11);
      const gateRight = gateLeft.clone();
      gateRight.position.z = z + 0.11;
      const gateTop = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.27), photogateMaterial);
      gateTop.position.set(collisionData.maxX + 0.15, BENCH_TOP_Y + 0.39, z);
      group.add(gateLeft, gateRight, gateTop);

      const timerBox = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.2, 0.46), accentMaterial);
      timerBox.position.set(collisionData.maxX + 0.92, BENCH_TOP_Y + 0.12, z + 0.25);
      group.add(timerBox);

      const wirePoints = [
        new THREE.Vector3(collisionData.maxX + 0.16, BENCH_TOP_Y + 0.2, z + 0.12),
        new THREE.Vector3(collisionData.maxX + 0.46, BENCH_TOP_Y + 0.16, z + 0.24),
        new THREE.Vector3(collisionData.maxX + 0.82, BENCH_TOP_Y + 0.18, z + 0.25)
      ];
      group.add(createLineFromPoints(wirePoints, 0x222222));

      const stopperGeometry = new THREE.BoxGeometry(0.08, 0.26, 0.34);
      const stopperLeft = new THREE.Mesh(stopperGeometry, accentMaterial);
      stopperLeft.position.set(collisionData.minX, collisionData.railY - 0.01, z);
      const stopperRight = stopperLeft.clone();
      stopperRight.position.x = collisionData.maxX;
      group.add(stopperLeft, stopperRight);

      applyShadow(group);
      scene.add(group);

      const createCart = (x, color, name) => {
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.58, 0.24, 0.34),
          new THREE.MeshStandardMaterial({ color, metalness: 0.42, roughness: 0.28 })
        );
        mesh.position.set(x, collisionData.railY, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);

        const body = new CANNON.Body({
          mass: 0.32,
          material: cartMaterial,
          position: new CANNON.Vec3(x, collisionData.railY, z),
          shape: new CANNON.Box(new CANNON.Vec3(0.29, 0.12, 0.17)),
          linearDamping: 0.015
        });
        body.linearFactor = new CANNON.Vec3(1, 0, 0);
        body.angularFactor = new CANNON.Vec3(0, 0, 0);

        registerPhysicsObject({
          mesh,
          body,
          kind: 'cart',
          dragMode: 'rail',
          draggable: true,
          experimentRole: name
        });

        return { mesh, body };
      };

      collisionData.cartA = createCart(-7.28, 0x2b89b6, 'cartA');
      collisionData.cartB = createCart(-5.72, 0xcaa34e, 'cartB');

      const stopShape = new CANNON.Box(new CANNON.Vec3(0.04, 0.16, 0.18));
      const leftStopperBody = new CANNON.Body({ mass: 0, material: defaultMaterial });
      leftStopperBody.addShape(stopShape);
      leftStopperBody.position.set(collisionData.minX, collisionData.railY, z);
      world.addBody(leftStopperBody);
      const rightStopperBody = new CANNON.Body({ mass: 0, material: defaultMaterial });
      rightStopperBody.addShape(stopShape);
      rightStopperBody.position.set(collisionData.maxX, collisionData.railY, z);
      world.addBody(rightStopperBody);

      const collisionListener = (event) => {
        const other = event.body;
        if (
          collisionData.active &&
          ((event.target === collisionData.cartA.body && other === collisionData.cartB.body) ||
            (event.target === collisionData.cartB.body && other === collisionData.cartA.body))
        ) {
          collisionData.collisionRegistered = true;
          collisionData.collisionTime = performance.now();
        }
      };

      collisionData.cartA.body.addEventListener('collide', collisionListener);
      collisionData.cartB.body.addEventListener('collide', collisionListener);
    }

    function updateRampGeometry() {
      const tangent = new THREE.Vector3(Math.cos(rampData.angleRad), Math.sin(rampData.angleRad), 0);
      const normal = new THREE.Vector3(-Math.sin(rampData.angleRad), Math.cos(rampData.angleRad), 0);
      const center = rampData.foot.clone()
        .addScaledVector(tangent, rampData.length / 2)
        .addScaledVector(normal, rampData.thickness / 2);

      rampData.mesh.position.copy(center);
      rampData.mesh.rotation.set(0, 0, rampData.angleRad);

      rampData.body.position.set(center.x, center.y, center.z);
      rampData.body.quaternion.setFromEuler(0, 0, rampData.angleRad);
      rampData.body.aabbNeedsUpdate = true;
      rampData.body.updateBoundingRadius();

      const arcPoints = [];
      const start = 0;
      const end = rampData.angleRad;
      for (let i = 0; i <= 32; i += 1) {
        const t = start + (end - start) * (i / 32);
        arcPoints.push(new THREE.Vector3(
          rampData.foot.x + 0.55 * Math.cos(t),
          rampData.foot.y + 0.55 * Math.sin(t) + 0.01,
          rampData.foot.z - 0.64
        ));
      }
      rampData.arcLine.geometry.dispose();
      rampData.arcLine.geometry = new THREE.BufferGeometry().setFromPoints(arcPoints);

      const pointerPoints = [
        new THREE.Vector3(rampData.foot.x, rampData.foot.y + 0.01, rampData.foot.z - 0.64),
        new THREE.Vector3(
          rampData.foot.x + 0.62 * Math.cos(rampData.angleRad),
          rampData.foot.y + 0.62 * Math.sin(rampData.angleRad) + 0.01,
          rampData.foot.z - 0.64
        )
      ];
      rampData.pointerLine.geometry.dispose();
      rampData.pointerLine.geometry = new THREE.BufferGeometry().setFromPoints(pointerPoints);
    }

    function buildInclinedPlane() {
      const group = new THREE.Group();
      const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xe3d2ac, map: woodTexture, roughness: 0.78, metalness: 0.06 });
      const arcMaterial = new THREE.MeshStandardMaterial({ color: 0x2f3c46, roughness: 0.56, metalness: 0.22 });

      const supportBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.3), frameMaterial);
      supportBase.position.set(rampData.foot.x + 0.45, BENCH_TOP_Y + 0.06, rampData.foot.z);
      group.add(supportBase);

      const riser = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.02, 0.14), arcMaterial);
      riser.position.set(rampData.foot.x + 0.12, BENCH_TOP_Y + 0.5, rampData.foot.z - 0.62);
      group.add(riser);

      const arcBack = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.04, 10, 48, Math.PI / 2), arcMaterial);
      arcBack.rotation.set(Math.PI / 2, 0, 0);
      arcBack.position.set(rampData.foot.x, BENCH_TOP_Y + 0.02, rampData.foot.z - 0.64);
      group.add(arcBack);

      const rampMesh = new THREE.Mesh(
        new THREE.BoxGeometry(rampData.length, rampData.thickness, rampData.width),
        new THREE.MeshStandardMaterial({ map: woodTexture, color: 0xe2c79a, roughness: 0.72, metalness: 0.04 })
      );
      group.add(rampMesh);
      rampData.mesh = rampMesh;

      rampData.body = new CANNON.Body({
        mass: 0,
        material: rampMaterial,
        shape: new CANNON.Box(new CANNON.Vec3(rampData.length / 2, rampData.thickness / 2, rampData.width / 2))
      });
      world.addBody(rampData.body);

      const arcPoints = [
        new THREE.Vector3(rampData.foot.x, BENCH_TOP_Y, rampData.foot.z - 0.64),
        new THREE.Vector3(rampData.foot.x + 0.5, BENCH_TOP_Y + 0.22, rampData.foot.z - 0.64)
      ];
      rampData.arcLine = createLineFromPoints(arcPoints, 0x16364c);
      rampData.pointerLine = createLineFromPoints(arcPoints, 0xc97e1f);
      group.add(rampData.arcLine, rampData.pointerLine);

      applyShadow(group);
      scene.add(group);
      updateRampGeometry();
    }

    function createMassDisc(position, massKg, color = 0x2f3944) {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.08, 32),
        new THREE.MeshStandardMaterial({ color, metalness: 0.48, roughness: 0.36 })
      );
      mesh.position.copy(position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      const body = new CANNON.Body({
        mass: massKg,
        material: massMaterial,
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: new CANNON.Sphere(0.12),
        linearDamping: 0.18,
        angularDamping: 0.92
      });

      registerPhysicsObject({
        mesh,
        body,
        kind: 'mass-disc',
        dragMode: 'bench',
        draggable: true,
        massKg,
        syncRotation: false
      });
    }

    function buildMassSets() {
      const discPositions = [
        new THREE.Vector3(-3.75, BENCH_TOP_Y + 0.14, 1.2),
        new THREE.Vector3(-3.28, BENCH_TOP_Y + 0.14, 1.32),
        new THREE.Vector3(-2.82, BENCH_TOP_Y + 0.14, 1.12),
        new THREE.Vector3(-2.36, BENCH_TOP_Y + 0.14, 1.3),
        new THREE.Vector3(-1.94, BENCH_TOP_Y + 0.14, 1.08),
        new THREE.Vector3(-1.56, BENCH_TOP_Y + 0.14, 1.26)
      ];
      const masses = [0.05, 0.075, 0.1, 0.125, 0.15, 0.2];
      discPositions.forEach((position, index) => createMassDisc(position, masses[index]));

      const holder = new THREE.Group();
      const holderBase = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.12, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x8c6845, roughness: 0.82 })
      );
      holderBase.position.set(-0.7, BENCH_TOP_Y + 0.06, 1.15);
      holder.add(holderBase);

      [-1.07, -0.85, -0.63, -0.41, -0.19].forEach((x) => {
        const peg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 0.18, 18),
          new THREE.MeshStandardMaterial({ color: 0x6f5035, roughness: 0.82 })
        );
        peg.position.set(x, BENCH_TOP_Y + 0.15, 1.15);
        holder.add(peg);
      });

      applyShadow(holder);
      scene.add(holder);

      const brassPositions = [
        new THREE.Vector3(-1.07, BENCH_TOP_Y + 0.2, 1.15),
        new THREE.Vector3(-0.85, BENCH_TOP_Y + 0.2, 1.15),
        new THREE.Vector3(-0.63, BENCH_TOP_Y + 0.2, 1.15),
        new THREE.Vector3(-0.41, BENCH_TOP_Y + 0.2, 1.15),
        new THREE.Vector3(-0.19, BENCH_TOP_Y + 0.2, 1.15)
      ];
      const brassMasses = [0.12, 0.15, 0.2, 0.25, 0.3];
      brassPositions.forEach((position, index) => {
        const mesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.12, 0.18, 28),
          new THREE.MeshStandardMaterial({ color: 0xc4a24b, metalness: 0.72, roughness: 0.26 })
        );
        mesh.position.copy(position);
        scene.add(mesh);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const body = new CANNON.Body({
          mass: brassMasses[index],
          material: massMaterial,
          position: new CANNON.Vec3(position.x, position.y, position.z),
          shape: new CANNON.Sphere(0.1),
          linearDamping: 0.16,
          angularDamping: 0.9
        });

        registerPhysicsObject({
          mesh,
          body,
          kind: 'brass-mass',
          dragMode: 'bench',
          draggable: true,
          massKg: brassMasses[index],
          syncRotation: false
        });
      });
    }

    function buildFreeFallTower() {
      const group = new THREE.Group();
      const standMaterial = new THREE.MeshStandardMaterial({ color: 0xb8d15f, roughness: 0.55, metalness: 0.28 });
      const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x909dad, map: metalTexture, metalness: 0.6, roughness: 0.35 });
      const x = freeFallData.x;
      const z = freeFallData.z;

      const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.8), standMaterial);
      base.position.set(x, BENCH_TOP_Y + 0.06, z);
      const column = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.9, 0.18), standMaterial);
      column.position.set(x, BENCH_TOP_Y + 1.01, z);
      const rod = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.65, 0.05), poleMaterial);
      rod.position.set(x + 0.22, BENCH_TOP_Y + 1.06, z);
      const topClamp = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.18), poleMaterial);
      topClamp.position.set(x + 0.08, BENCH_TOP_Y + 1.82, z);
      const timerBox = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.22, 0.44), new THREE.MeshStandardMaterial({ color: 0x34495d, roughness: 0.52 }));
      timerBox.position.set(x - 0.32, BENCH_TOP_Y + 0.17, z + 0.36);
      group.add(base, column, rod, topClamp, timerBox);
      applyShadow(group);
      scene.add(group);

      const sensorBody = new CANNON.Body({
        mass: 0,
        material: defaultMaterial,
        position: new CANNON.Vec3(x + 0.22, freeFallData.baseTopY - 0.03, z),
        shape: new CANNON.Box(new CANNON.Vec3(0.18, 0.03, 0.18))
      });
      world.addBody(sensorBody);
      freeFallData.sensorBody = sensorBody;
      sensorZones.push({ type: 'free-fall-impact', body: sensorBody });

      const ballTopY = freeFallData.baseTopY + freeFallData.heightMeters;
      const ballMesh = new THREE.Mesh(
        new THREE.SphereGeometry(freeFallData.ballRadius, 28, 28),
        new THREE.MeshStandardMaterial({ color: 0xf59f3b, metalness: 0.35, roughness: 0.32 })
      );
      ballMesh.position.set(x + 0.22, ballTopY, z);
      scene.add(ballMesh);
      ballMesh.castShadow = true;
      ballMesh.receiveShadow = true;

      const ballBody = new CANNON.Body({
        mass: 0.08,
        type: CANNON.Body.KINEMATIC,
        material: massMaterial,
        position: new CANNON.Vec3(x + 0.22, ballTopY, z),
        shape: new CANNON.Sphere(freeFallData.ballRadius),
        linearDamping: 0.01
      });
      ballBody.updateMassProperties();

      registerPhysicsObject({
        mesh: ballMesh,
        body: ballBody,
        kind: 'freefall-ball',
        experimentRole: 'free-fall',
        onReset: () => {
          freeFallData.active = false;
          freeFallData.completed = false;
          updateFreeFallUi(null);
        }
      });

      freeFallData.ballMesh = ballMesh;
      freeFallData.ballBody = ballBody;

      ballBody.addEventListener('collide', (event) => {
        if (event.body === freeFallData.sensorBody && freeFallData.active && !freeFallData.completed) {
          freeFallData.completed = true;
          freeFallData.active = false;
          const elapsedSeconds = (performance.now() - freeFallData.startTimeMs) / 1000;
          const g = (2 * freeFallData.heightMeters) / (elapsedSeconds * elapsedSeconds);
          updateFreeFallUi({ time: elapsedSeconds, g });
        }
      });
    }

    function buildScale() {
      const group = new THREE.Group();
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xdfe7ef, metalness: 0.42, roughness: 0.36 });
      const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x384d5d, roughness: 0.45 });

      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.62, 0.24, 32), bodyMaterial);
      pedestal.position.copy(scaleData.center.clone().setY(BENCH_TOP_Y + 0.08));
      group.add(pedestal);

      const platform = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.06, 42), accentMaterial);
      platform.position.copy(scaleData.center);
      group.add(platform);
      scaleData.platform = platform;

      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.12), accentMaterial);
      screen.position.set(scaleData.center.x + 0.5, BENCH_TOP_Y + 0.18, scaleData.center.z);
      group.add(screen);

      const readout = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.11, 0.02), new THREE.MeshStandardMaterial({ color: 0x58d2a4, emissive: 0x0c3c2f, emissiveIntensity: 0.5 }));
      readout.position.set(scaleData.center.x + 0.5, BENCH_TOP_Y + 0.19, scaleData.center.z + 0.07);
      group.add(readout);

      applyShadow(group);
      scene.add(group);

      const platformBody = new CANNON.Body({
        mass: 0,
        material: scaleMaterial,
        position: new CANNON.Vec3(scaleData.center.x, BENCH_TOP_Y + 0.1, scaleData.center.z),
        shape: new CANNON.Box(new CANNON.Vec3(0.42, 0.05, 0.42))
      });
      world.addBody(platformBody);

      sensorZones.push({ type: 'scale', center: scaleData.center.clone(), radius: scaleData.radius, topY: scaleData.topY });
    }

    function buildPendulum() {
      const group = new THREE.Group();
      const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x816142, roughness: 0.74 });
      const arcMaterial = new THREE.MeshStandardMaterial({ color: 0x31424f, roughness: 0.48, metalness: 0.22 });

      const base = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.12, 0.8), supportMaterial);
      base.position.set(pendulumData.pivot.x, BENCH_TOP_Y + 0.06, pendulumData.pivot.z);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.45, 0.16), arcMaterial);
      post.position.set(pendulumData.pivot.x, BENCH_TOP_Y + 0.72, pendulumData.pivot.z);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.16), arcMaterial);
      arm.position.set(pendulumData.pivot.x, pendulumData.pivot.y, pendulumData.pivot.z);
      const backdrop = new THREE.Mesh(new THREE.BoxGeometry(1.42, 1.35, 0.06), new THREE.MeshStandardMaterial({ color: 0xe8dcc9, roughness: 0.88 }));
      backdrop.position.set(pendulumData.pivot.x, BENCH_TOP_Y + 0.9, pendulumData.pivot.z - 0.34);
      group.add(base, post, arm, backdrop);

      const arcPoints = [];
      for (let i = -24; i <= 24; i += 1) {
        const angle = (i / 24) * pendulumData.maxAngle;
        arcPoints.push(new THREE.Vector3(
          pendulumData.pivot.x + Math.sin(angle) * pendulumData.length,
          pendulumData.pivot.y - Math.cos(angle) * pendulumData.length,
          pendulumData.pivot.z - 0.3
        ));
      }
      group.add(createLineFromPoints(arcPoints, 0xc78d2e));
      applyShadow(group);
      scene.add(group);

      const pivotBody = new CANNON.Body({ mass: 0, type: CANNON.Body.STATIC });
      pivotBody.addShape(new CANNON.Sphere(0.02));
      pivotBody.position.copy(vector3ToCannon(pendulumData.pivot));
      world.addBody(pivotBody);
      pendulumData.pivotBody = pivotBody;

      const ballStart = new THREE.Vector3(pendulumData.pivot.x, pendulumData.pivot.y - pendulumData.length, pendulumData.pivot.z);
      const ballMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 28, 28),
        new THREE.MeshStandardMaterial({ color: 0xc7843a, metalness: 0.4, roughness: 0.28 })
      );
      ballMesh.position.copy(ballStart);
      ballMesh.castShadow = true;
      ballMesh.receiveShadow = true;
      scene.add(ballMesh);

      const ballBody = new CANNON.Body({
        mass: 0.12,
        material: defaultMaterial,
        position: new CANNON.Vec3(ballStart.x, ballStart.y, ballStart.z),
        shape: new CANNON.Sphere(0.14),
        linearDamping: 0.01,
        angularDamping: 0.8
      });
      ballBody.linearFactor = new CANNON.Vec3(1, 1, 0);
      ballBody.angularFactor = new CANNON.Vec3(0, 0, 0);

      const constraint = new CANNON.DistanceConstraint(pivotBody, ballBody, pendulumData.length, 1e6);
      world.addConstraint(constraint);

      registerPhysicsObject({
        mesh: ballMesh,
        body: ballBody,
        kind: 'pendulum-ball',
        dragMode: 'pendulum',
        draggable: true,
        experimentRole: 'pendulum',
        onReset: () => updatePendulumUi()
      });

      pendulumData.ballMesh = ballMesh;
      pendulumData.ballBody = ballBody;
      pendulumData.constraint = constraint;
      pendulumData.stringLine = createLineFromPoints([pendulumData.pivot, ballStart], 0x222222);
      scene.add(pendulumData.stringLine);
      updatePendulumUi();
    }

    function buildOpticalBench() {
      const group = new THREE.Group();
      const railMaterial = new THREE.MeshStandardMaterial({ map: metalTexture, color: 0xc6cfd9, metalness: 0.64, roughness: 0.36 });
      const postMaterial = new THREE.MeshStandardMaterial({ color: 0x394f5f, roughness: 0.44 });
      const xCenter = 7.0;
      const z = -0.52;

      const rail = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.12, 0.48), railMaterial);
      rail.position.set(xCenter, BENCH_TOP_Y + 0.07, z);
      group.add(rail);

      [-0.95, 0, 0.92].forEach((offset) => {
        const slider = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.34), postMaterial);
        slider.position.set(xCenter + offset, BENCH_TOP_Y + 0.24, z);
        group.add(slider);

        const optic = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 24), new THREE.MeshStandardMaterial({ color: 0x72c4d3, metalness: 0.4, roughness: 0.22 }));
        optic.rotation.x = Math.PI / 2;
        optic.position.set(xCenter + offset, BENCH_TOP_Y + 0.42, z);
        group.add(optic);
      });

      applyShadow(group);
      scene.add(group);
    }

    async function buildLab() {
      addLights();
      buildRoom();
      await loadModelOrFallback('airTrack', buildAirTrack);
      await loadModelOrFallback('incline', buildInclinedPlane);
      buildMassSets();
      await loadModelOrFallback('freeFallTower', buildFreeFallTower);
      await loadModelOrFallback('scale', buildScale);
      await loadModelOrFallback('pendulum', buildPendulum);
      await loadModelOrFallback('opticalBench', buildOpticalBench);
    }

    function updateFreeFallUi(result) {
      freeFallData.lastResult = result;
      if (!result) {
        ui.freefallResult.innerHTML = `<strong>${t('physics.freefall.height')}:</strong> 1.50 ${t('physics.units.meter')}<br><strong>${t('physics.freefall.time')}:</strong> —<br><strong>g:</strong> —`;
        return;
      }
      ui.freefallResult.innerHTML = `<strong>${t('physics.freefall.height')}:</strong> 1.50 ${t('physics.units.meter')}<br><strong>${t('physics.freefall.time')}:</strong> ${result.time.toFixed(3)} ${t('physics.units.second')}<br><strong>g:</strong> ${result.g.toFixed(2)} ${t('physics.units.acceleration')}`;
    }

    function updateInclineUi() {
      const acceleration = 9.82 * Math.sin(rampData.angleRad);
      ui.angleLabel.textContent = `${rampData.angleDeg}°`;
      ui.inclineResult.innerHTML = `<strong>${t('physics.incline.theory')}:</strong> a = g sin(${rampData.angleDeg}°) = ${acceleration.toFixed(2)} ${t('physics.units.acceleration')}`;
    }

    function updatePendulumUi() {
      if (!pendulumData.ballBody) return;
      const angle = Math.atan2(
        pendulumData.ballBody.position.x - pendulumData.pivot.x,
        pendulumData.pivot.y - pendulumData.ballBody.position.y
      );
      const period = 2 * Math.PI * Math.sqrt(pendulumData.length / 9.82);
      ui.pendulumPeriod.innerHTML = `<strong>${t('physics.pendulum.period')}:</strong> ${period.toFixed(2)} ${t('physics.units.second')}`;
      ui.pendulumAngle.innerHTML = `<strong>${t('physics.pendulum.angle')}:</strong> ${THREE.MathUtils.radToDeg(angle).toFixed(1)}°`;
    }

    function setPointerFromEvent(event) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
    }

    function beginDrag(mesh, hitPoint) {
      const body = mesh.userData.body;
      dragState.mesh = mesh;
      dragState.body = body;
      dragState.mode = mesh.userData.dragMode;
      dragState.offset.copy(mesh.position).sub(hitPoint);

      body.type = CANNON.Body.KINEMATIC;
      body.updateMassProperties();
      body.velocity.set(0, 0, 0);
      body.angularVelocity.set(0, 0, 0);
      body.wakeUp();
      controls.enabled = false;
      renderer.domElement.style.cursor = 'grabbing';

      if (dragState.mode === 'bench') {
        const planeHeight = Math.max(BENCH_TOP_Y + 0.14, mesh.position.y);
        dragState.plane.set(new THREE.Vector3(0, 1, 0), -planeHeight);
      } else if (dragState.mode === 'rail') {
        dragState.plane.set(new THREE.Vector3(0, 1, 0), -collisionData.railY);
      } else if (dragState.mode === 'pendulum') {
        dragState.plane.set(new THREE.Vector3(0, 0, 1), -pendulumData.pivot.z);
      }
    }

    function updateDragPosition(event) {
      if (!dragState.mesh) return;
      setPointerFromEvent(event);
      if (!raycaster.ray.intersectPlane(dragState.plane, dragState.planeHit)) return;

      const mesh = dragState.mesh;
      const body = dragState.body;

      if (dragState.mode === 'bench') {
        const target = dragState.planeHit.clone().add(dragState.offset);
        target.x = THREE.MathUtils.clamp(target.x, -11.2, 11.2);
        target.z = THREE.MathUtils.clamp(target.z, -4.8, 4.8);
        mesh.position.copy(target);
        body.position.set(target.x, target.y, target.z);
      } else if (dragState.mode === 'rail') {
        const targetX = THREE.MathUtils.clamp(dragState.planeHit.x + dragState.offset.x, collisionData.minX + 0.32, collisionData.maxX - 0.32);
        const targetY = collisionData.railY;
        const targetZ = collisionData.railZ;
        mesh.position.set(targetX, targetY, targetZ);
        body.position.set(targetX, targetY, targetZ);
      } else if (dragState.mode === 'pendulum') {
        const target = dragState.planeHit.clone();
        const vector = target.sub(pendulumData.pivot);
        let angle = Math.atan2(vector.x, -vector.y);
        angle = THREE.MathUtils.clamp(angle, -pendulumData.maxAngle, pendulumData.maxAngle);
        const x = pendulumData.pivot.x + Math.sin(angle) * pendulumData.length;
        const y = pendulumData.pivot.y - Math.cos(angle) * pendulumData.length;
        const z = pendulumData.pivot.z;
        mesh.position.set(x, y, z);
        body.position.set(x, y, z);
        body.velocity.set(0, 0, 0);
        body.angularVelocity.set(0, 0, 0);
      }
    }

    function endDrag() {
      if (!dragState.mesh || !dragState.body) return;
      const body = dragState.body;
      body.type = CANNON.Body.DYNAMIC;
      body.updateMassProperties();
      body.velocity.set(0, 0, 0);
      body.angularVelocity.set(0, 0, 0);
      body.wakeUp();
      controls.enabled = true;
      renderer.domElement.style.cursor = 'grab';
      dragState.mesh = null;
      dragState.body = null;
      dragState.mode = null;
    }

    function attachInput() {
      renderer.domElement.style.cursor = 'grab';
      renderer.domElement.addEventListener('contextmenu', (event) => event.preventDefault());

      window.addEventListener('pointerdown', (event) => {
        if (activeLabMode !== 'physics') return;
        if (event.button !== 0) return;
        if (event.target.closest('#ui-panel') || event.target.closest('#lab-switcher')) return;
        setPointerFromEvent(event);
        const hits = raycaster.intersectObjects(draggableObjects, false);
        if (hits.length > 0) {
          beginDrag(hits[0].object, hits[0].point);
        }
      });

      window.addEventListener('pointermove', (event) => {
        if (activeLabMode !== 'physics') return;
        if (!dragState.mesh) return;
        updateDragPosition(event);
      });

      window.addEventListener('pointerup', () => {
        endDrag();
      });
    }

    function clampTrackBodies() {
      [collisionData.cartA, collisionData.cartB].forEach((cart) => {
        if (!cart) return;
        const { body } = cart;
        body.position.y = collisionData.railY;
        body.position.z = collisionData.railZ;
        body.velocity.y = 0;
        body.velocity.z = 0;
        body.angularVelocity.set(0, 0, 0);
        if (body.position.x < collisionData.minX + 0.31) {
          body.position.x = collisionData.minX + 0.31;
          body.velocity.x = Math.max(0, body.velocity.x);
        }
        if (body.position.x > collisionData.maxX - 0.31) {
          body.position.x = collisionData.maxX - 0.31;
          body.velocity.x = Math.min(0, body.velocity.x);
        }
      });
    }

    function updateScaleReading() {
      let totalMassKg = 0;
      weighableBodies.forEach(({ body, massKg }) => {
        const dx = body.position.x - scaleData.center.x;
        const dz = body.position.z - scaleData.center.z;
        const withinRadius = Math.sqrt(dx * dx + dz * dz) <= scaleData.radius;
        const nearPlatform = body.position.y <= scaleData.topY + 0.28 && body.position.y >= scaleData.topY - 0.18;
        if (withinRadius && nearPlatform) {
          totalMassKg += massKg;
        }
      });

      if (Math.abs(totalMassKg - scaleData.readingMassKg) > 0.0001) {
        scaleData.readingMassKg = totalMassKg;
        gsap.to(scaleData.platform.position, {
          y: scaleData.basePlatformY - Math.min(0.05, totalMassKg * 0.09),
          duration: 0.25,
          ease: 'power2.out'
        });
        gsap.to(scaleData.readingTweenValue, {
          value: totalMassKg * 1000,
          duration: 0.28,
          ease: 'power2.out',
          onUpdate: () => {
            ui.scaleReading.textContent = `${scaleData.readingTweenValue.value.toFixed(2)} g`;
          }
        });
      }
    }

    function updatePendulumLine() {
      const points = [
        pendulumData.pivot.clone(),
        pendulumData.ballMesh.position.clone()
      ];
      pendulumData.stringLine.geometry.dispose();
      pendulumData.stringLine.geometry = new THREE.BufferGeometry().setFromPoints(points);
    }

    function updateCollisionUi() {
      if (!collisionData.active || collisionData.reportDone) return;
      if (!collisionData.collisionRegistered) return;
      if (performance.now() - collisionData.collisionTime < 500) return;

      const pBefore = collisionData.initialMomentum;
      const pAfter =
        collisionData.cartA.body.mass * collisionData.cartA.body.velocity.x +
        collisionData.cartB.body.mass * collisionData.cartB.body.velocity.x;
      collisionData.lastResult = {
        pBefore,
        pAfter,
        velocityA: collisionData.cartA.body.velocity.x,
        velocityB: collisionData.cartB.body.velocity.x
      };
      collisionData.reportDone = true;
      collisionData.active = false;
      renderCollisionStatus();
    }

    function syncPhysicsMeshes() {
      physicsObjects.forEach(({ mesh, body, syncRotation }) => {
        mesh.position.copy(body.position);
        if (syncRotation) {
          mesh.quaternion.copy(body.quaternion);
        }
      });
    }

    function resetBodyState(entry) {
      entry.body.type = entry.type;
      entry.body.updateMassProperties();
      entry.body.position.copy(entry.position);
      entry.body.quaternion.copy(entry.quaternion);
      entry.body.velocity.set(0, 0, 0);
      entry.body.angularVelocity.set(0, 0, 0);
      entry.body.force.set(0, 0, 0);
      entry.body.torque.set(0, 0, 0);
      entry.body.sleepState = 0;
      entry.body.wakeUp();
      if (entry.mesh) {
        entry.mesh.position.copy(entry.body.position);
        entry.mesh.quaternion.copy(entry.body.quaternion);
      }
      if (typeof entry.onReset === 'function') {
        entry.onReset();
      }
    }

    function startFreeFall() {
      const topY = freeFallData.baseTopY + freeFallData.heightMeters;
      freeFallData.ballBody.type = CANNON.Body.DYNAMIC;
      freeFallData.ballBody.updateMassProperties();
      freeFallData.ballBody.position.set(freeFallData.x + 0.22, topY, freeFallData.z);
      freeFallData.ballBody.velocity.set(0, 0, 0);
      freeFallData.ballBody.angularVelocity.set(0, 0, 0);
      freeFallData.ballBody.wakeUp();
      freeFallData.active = true;
      freeFallData.completed = false;
      freeFallData.lastResult = null;
      freeFallData.startTimeMs = performance.now();
      renderFreeFallStatus();
    }

    function setAngle(value) {
      rampData.angleDeg = Number(value);
      rampData.angleRad = THREE.MathUtils.degToRad(rampData.angleDeg);
      updateRampGeometry();
      updateInclineUi();
    }

    function resetPendulum() {
      const restY = pendulumData.pivot.y - pendulumData.length;
      pendulumData.ballBody.type = CANNON.Body.DYNAMIC;
      pendulumData.ballBody.updateMassProperties();
      pendulumData.ballBody.position.set(pendulumData.pivot.x, restY, pendulumData.pivot.z);
      pendulumData.ballBody.velocity.set(0, 0, 0);
      pendulumData.ballBody.angularVelocity.set(0, 0, 0);
      pendulumData.ballBody.wakeUp();
      updatePendulumUi();
    }

    function launchCollision() {
      collisionData.cartA.body.position.set(-7.28, collisionData.railY, collisionData.railZ);
      collisionData.cartB.body.position.set(-5.72, collisionData.railY, collisionData.railZ);
      collisionData.cartA.body.velocity.set(2.35, 0, 0);
      collisionData.cartB.body.velocity.set(0, 0, 0);
      collisionData.cartA.body.angularVelocity.set(0, 0, 0);
      collisionData.cartB.body.angularVelocity.set(0, 0, 0);
      collisionData.cartA.body.wakeUp();
      collisionData.cartB.body.wakeUp();
      collisionData.active = true;
      collisionData.collisionRegistered = false;
      collisionData.collisionTime = 0;
      collisionData.reportDone = false;
      collisionData.initialMomentum = collisionData.cartA.body.mass * 2.35;
      collisionData.lastResult = null;
      renderCollisionStatus();
    }

    function resetLab() {
      endDrag();
      resettableStates.forEach(resetBodyState);
      collisionData.active = false;
      collisionData.collisionRegistered = false;
      collisionData.reportDone = false;
      collisionData.initialMomentum = 0;
      collisionData.lastResult = null;
      scaleData.readingMassKg = -1;
      setAngle(ui.angleSlider.value);
      updateScaleReading();
      resetPendulum();
      renderFreeFallStatus();
      renderCollisionStatus();
    }

    function setLabMode(mode) {
      mode = normalizeLabMode(mode);
      if (isSingleLabView && mode !== requestedLabMode) return;

      if (mode === 'physics' && !physicsInitialized) {
        void ensurePhysicsLabInitialized();
      } else if (mode === 'circuit' && !circuitInitialized) {
        ensureCircuitLabInitialized();
      } else if (mode === 'biology' && !biologyInitialized) {
        ensureBiologyLabInitialized();
      } else if (mode === 'chemistry' && !chemistryInitialized) {
        ensureChemistryLabInitialized();
      }

      if (mode !== 'physics') {
        endDrag();
      }
      activeLabMode = mode;
      document.body.classList.toggle('mode-physics', mode === 'physics');
      document.body.classList.toggle('mode-circuit', mode === 'circuit');
      document.body.classList.toggle('mode-biology', mode === 'biology');
      document.body.classList.toggle('mode-chemistry', mode === 'chemistry');
      document.body.classList.toggle('mode-unity', hasUnityUi && mode === 'unity');
      circuitUi.shell.setAttribute('aria-hidden', String(mode !== 'circuit'));
      biologyUi.shell.setAttribute('aria-hidden', String(mode !== 'biology'));
      chemistryUi.shell.setAttribute('aria-hidden', String(mode !== 'chemistry'));
      if (hasUnityUi) unityUi.shell.setAttribute('aria-hidden', String(mode !== 'unity'));
      circuitUi.modeButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.lab === mode);
      });
      if (mode === 'circuit') {
        requestAnimationFrame(() => {
          resizeCircuitCanvas();
          updateCircuitCursor();
        });
      } else if (mode === 'biology') {
        requestAnimationFrame(() => {
          resizeBiologyViewport();
        });
      } else if (mode === 'chemistry') {
        requestAnimationFrame(() => {
          resizeChemistryViewport();
        });
      } else if (hasUnityUi && mode === 'unity') {
        ensureUnityLabLoaded();
      } else {
        renderer.domElement.style.cursor = dragState.mesh ? 'grabbing' : 'grab';
      }
      circuitControls.enabled = mode === 'circuit' && !circuitState.paletteDrag && !circuitInteraction.draggedComponentId;
      if (biologyLab) biologyLab.controls.enabled = mode === 'biology';
      if (chemistryLab) chemistryLab.controls.enabled = mode === 'chemistry';
      circuitState.needsRedraw = true;
    }

    function resizeCircuitCanvas() {
      const rect = circuitUi.viewport.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      circuitState.viewportRect = rect;
      circuitRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      circuitRenderer.setSize(rect.width, rect.height, false);
      circuitCamera.aspect = rect.width / rect.height;
      circuitCamera.updateProjectionMatrix();
      circuitState.needsRedraw = true;
    }

    function setCircuitRayFromClient(clientX, clientY) {
      const rect = circuitState.viewportRect || circuitUi.viewport.getBoundingClientRect();
      circuitState.viewportRect = rect;
      const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      circuitInteraction.pointerInside = inside;
      if (!inside) return false;
      circuitPointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      circuitPointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      circuitRaycaster.setFromCamera(circuitPointer, circuitCamera);
      return true;
    }

    function intersectCircuitBoard(clientX, clientY) {
      if (!setCircuitRayFromClient(clientX, clientY)) return null;
      const hit = new THREE.Vector3();
      return circuitRaycaster.ray.intersectPlane(circuitBoardPlane, hit) ? hit : null;
    }

    function clampCircuitPosition(component, x, z) {
      const minX = circuitWorld.boardMinX + component.width / 2 + 0.22;
      const maxX = circuitWorld.boardMaxX - component.width / 2 - 0.22;
      const minZ = circuitWorld.boardMinZ + component.depth / 2 + 0.22;
      const maxZ = circuitWorld.boardMaxZ - component.depth / 2 - 0.22;
      return {
        x: THREE.MathUtils.clamp(x, minX, maxX),
        z: THREE.MathUtils.clamp(z, minZ, maxZ)
      };
    }

    function getCircuitPortNodeId(component, side) {
      return `${component.id}:${side}`;
    }

    function getCircuitPortPosition(component, side) {
      if (component.portMeshes && component.portMeshes[side]) {
        const worldPosition = new THREE.Vector3();
        component.portMeshes[side].getWorldPosition(worldPosition);
        return {
          x: worldPosition.x,
          y: worldPosition.y,
          z: worldPosition.z,
          side,
          component,
          nodeId: getCircuitPortNodeId(component, side)
        };
      }

      const offsetX = side === 'left' ? -(component.width / 2 + 0.2) : (component.width / 2 + 0.2);
      return {
        x: component.x + offsetX,
        y: circuitWorld.boardY + 0.22,
        z: component.z,
        side,
        component,
        nodeId: getCircuitPortNodeId(component, side)
      };
    }

    function getCircuitComponentById(componentId) {
      return circuitState.components.find((component) => component.id === componentId) || null;
    }

    function disposeMaterial(material) {
      if (!material) return;
      if (Array.isArray(material)) {
        material.forEach(disposeMaterial);
        return;
      }
      if (material.map) material.map.dispose();
      material.dispose();
    }

    function disposeObject3D(object) {
      if (!object) return;
      object.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) disposeMaterial(child.material);
      });
    }

    function createCircuitBoardTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 640;
      const ctx = canvas.getContext('2d');
      const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
      base.addColorStop(0, '#f7f3ea');
      base.addColorStop(1, '#e9e3d7');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillRect(26, 24, canvas.width - 52, canvas.height - 48);

      ctx.fillStyle = 'rgba(210, 204, 190, 0.72)';
      ctx.fillRect(28, canvas.height / 2 - 24, canvas.width - 56, 48);

      ctx.fillStyle = 'rgba(196, 61, 61, 0.72)';
      ctx.fillRect(52, 86, canvas.width - 104, 4);
      ctx.fillRect(52, canvas.height - 118, canvas.width - 104, 4);

      ctx.fillStyle = 'rgba(54, 109, 170, 0.72)';
      ctx.fillRect(52, 102, canvas.width - 104, 4);
      ctx.fillRect(52, canvas.height - 102, canvas.width - 104, 4);

      ctx.fillStyle = 'rgba(151, 156, 162, 0.5)';
      const rows = [138, 176, 214, 252, 388, 426, 464, 502];
      rows.forEach((y) => {
        for (let x = 78; x < canvas.width - 70; x += 28) {
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const stations = [
        { x: 178, label: 'BATTERY', color: 'rgba(47, 141, 86, 0.18)' },
        { x: 512, label: 'SWITCH', color: 'rgba(29, 126, 168, 0.16)' },
        { x: 846, label: 'LAMP', color: 'rgba(216, 164, 68, 0.2)' }
      ];
      ctx.textAlign = 'center';
      stations.forEach(({ x, label, color }) => {
        ctx.fillStyle = color;
        ctx.fillRect(x - 96, 34, 192, 36);
        ctx.fillStyle = 'rgba(32, 51, 68, 0.74)';
        ctx.font = '700 20px Manrope, sans-serif';
        ctx.fillText(label, x, 58);
      });
      ctx.textAlign = 'start';

      const vignette = ctx.createLinearGradient(0, 0, 0, canvas.height);
      vignette.addColorStop(0, 'rgba(0,0,0,0.08)');
      vignette.addColorStop(0.18, 'rgba(0,0,0,0)');
      vignette.addColorStop(0.82, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.1)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(112, 120, 128, 0.18)';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 14, canvas.width - 32, canvas.height - 28);
      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function createCircuitPosterTexture(title, accent, lines) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');

      const background = ctx.createLinearGradient(0, 0, 0, canvas.height);
      background.addColorStop(0, '#fffdf8');
      background.addColorStop(1, '#eef3f7');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, canvas.width, 78);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 38px Manrope, sans-serif';
      ctx.fillText(title, 54, 50);

      ctx.fillStyle = 'rgba(31, 52, 70, 0.88)';
      ctx.font = '700 30px Manrope, sans-serif';
      lines.forEach((line, index) => {
        ctx.fillText(line, 64, 184 + index * 98);
      });

      ctx.strokeStyle = 'rgba(31, 52, 70, 0.16)';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      const texture = new THREE.CanvasTexture(canvas);
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }

    function createCircuitSideTable(woodMap, metalMap, width = 1.8, depth = 0.84, height = 0.92) {
      const group = new THREE.Group();
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.12, depth),
        new THREE.MeshStandardMaterial({ map: woodMap, color: 0xaa8762, roughness: 0.72, metalness: 0.04 })
      );
      top.position.y = height;
      group.add(top);

      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(width - 0.12, 0.08, depth - 0.14),
        new THREE.MeshStandardMaterial({ map: woodMap, color: 0x987554, roughness: 0.76, metalness: 0.03 })
      );
      shelf.position.y = height * 0.45;
      group.add(shelf);

      [
        [-width / 2 + 0.12, height / 2, -depth / 2 + 0.12],
        [width / 2 - 0.12, height / 2, -depth / 2 + 0.12],
        [-width / 2 + 0.12, height / 2, depth / 2 - 0.12],
        [width / 2 - 0.12, height / 2, depth / 2 - 0.12]
      ].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, height, 0.08),
          new THREE.MeshStandardMaterial({ map: metalMap, color: 0x6d7680, roughness: 0.5, metalness: 0.38 })
        );
        leg.position.set(x, y, z);
        group.add(leg);
      });

      applyShadow(group);
      return group;
    }

    function createCircuitChair(accentColor = 0x4d6d82) {
      const group = new THREE.Group();
      const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x66727e, roughness: 0.46, metalness: 0.34 });
      const seatMaterial = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.62, metalness: 0.08 });

      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.08, 0.64), seatMaterial);
      seat.position.y = 0.52;
      group.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.56, 0.08), seatMaterial);
      back.position.set(0, 0.86, -0.28);
      group.add(back);

      [
        [-0.24, 0.26, -0.24],
        [0.24, 0.26, -0.24],
        [-0.24, 0.26, 0.24],
        [0.24, 0.26, 0.24]
      ].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.52, 12), frameMaterial);
        leg.position.set(x, y, z);
        group.add(leg);
      });

      const backSupports = [-0.22, 0.22];
      backSupports.forEach((x) => {
        const support = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12), frameMaterial);
        support.position.set(x, 0.73, -0.24);
        group.add(support);
      });

      applyShadow(group);
      return group;
    }

    function buildCircuitScene() {
      circuitScene.background = createGradientTexture('#c7d5e2', '#eef2f5');
      circuitScene.fog.color.set(0xd7e2eb);

      const circuitWoodTexture = woodTexture.clone();
      circuitWoodTexture.wrapS = THREE.RepeatWrapping;
      circuitWoodTexture.wrapT = THREE.RepeatWrapping;
      circuitWoodTexture.repeat.set(3.2, 1.8);
      circuitWoodTexture.encoding = THREE.sRGBEncoding;

      const circuitMetalTexture = metalTexture.clone();
      circuitMetalTexture.wrapS = THREE.RepeatWrapping;
      circuitMetalTexture.wrapT = THREE.RepeatWrapping;
      circuitMetalTexture.repeat.set(3.4, 2.2);
      circuitMetalTexture.encoding = THREE.sRGBEncoding;

      const ambient = new THREE.AmbientLight(0xffffff, 0.28);
      circuitScene.add(ambient);

      const hemi = new THREE.HemisphereLight(0xd5e9ff, 0x8b7b65, 0.22);
      circuitScene.add(hemi);

      const sun = new THREE.DirectionalLight(0xffefce, 0.82);
      sun.position.set(4.6, 7.4, 4.8);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.camera.left = -8;
      sun.shadow.camera.right = 8;
      sun.shadow.camera.top = 8;
      sun.shadow.camera.bottom = -8;
      circuitScene.add(sun);

      const benchLight = new THREE.SpotLight(0xfffbef, 0.78, 18, Math.PI / 4.5, 0.34, 1.5);
      benchLight.position.set(0, 6.6, 2.8);
      benchLight.target.position.set(0, circuitWorld.boardY, 0.35);
      benchLight.castShadow = true;
      benchLight.shadow.mapSize.set(1024, 1024);
      circuitScene.add(benchLight, benchLight.target);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(24, 24),
        new THREE.MeshStandardMaterial({ color: 0xdbe1e5, roughness: 0.98 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      circuitScene.add(floor);

      const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 8),
        new THREE.MeshStandardMaterial({ color: 0xeee8df, roughness: 0.96 })
      );
      backWall.position.set(0, 4, -5.7);
      circuitScene.add(backWall);

      const windowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 2.8),
        new THREE.MeshBasicMaterial({ map: windowTexture })
      );
      windowPlane.position.set(0, 4.8, -5.65);
      circuitScene.add(windowPlane);

      [
        {
          x: -4.45,
          y: 3.65,
          accent: '#d8a444',
          title: 'SERIES CIRCUIT',
          lines: ['Battery +', 'Switch', 'Lamp', 'Return -']
        },
        {
          x: 4.45,
          y: 3.65,
          accent: '#1d7ea8',
          title: 'LAB CHECK',
          lines: ['Trace lead', 'Close switch', 'Observe lamp', 'Reset station']
        }
      ].forEach(({ x, y, accent, title, lines }) => {
        const frame = new THREE.Group();
        const backing = new THREE.Mesh(
          new THREE.BoxGeometry(1.95, 2.65, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x7f6950, roughness: 0.72, metalness: 0.08 })
        );
        const poster = new THREE.Mesh(
          new THREE.PlaneGeometry(1.68, 2.36),
          new THREE.MeshStandardMaterial({ map: createCircuitPosterTexture(title, accent, lines), roughness: 0.92 })
        );
        poster.position.z = 0.05;
        frame.add(backing, poster);
        frame.position.set(x, y, -5.58);
        circuitScene.add(frame);
      });

      const wallShelf = new THREE.Group();
      const shelfBoard = new THREE.Mesh(
        new THREE.BoxGeometry(4.9, 0.12, 0.42),
        new THREE.MeshStandardMaterial({
          map: circuitWoodTexture,
          color: 0x9e7d58,
          roughness: 0.76,
          metalness: 0.02
        })
      );
      shelfBoard.position.set(0, 2.08, -5.14);
      wallShelf.add(shelfBoard);
      [-1.55, 0.1, 1.6].forEach((x, index) => {
        const equipmentBox = new THREE.Mesh(
          new THREE.BoxGeometry(0.68, 0.42 + index * 0.06, 0.3),
          new THREE.MeshStandardMaterial({ color: index === 1 ? 0x416883 : 0x667784, roughness: 0.58, metalness: 0.12 })
        );
        equipmentBox.position.set(x, 2.35 + index * 0.03, -5.1);
        wallShelf.add(equipmentBox);
      });
      const cableCoil = new THREE.Mesh(
        new THREE.TorusGeometry(0.14, 0.045, 12, 24),
        new THREE.MeshStandardMaterial({ color: 0xc07a38, roughness: 0.4, metalness: 0.24 })
      );
      cableCoil.position.set(-0.72, 2.28, -4.96);
      cableCoil.rotation.x = Math.PI / 2;
      wallShelf.add(cableCoil);
      applyShadow(wallShelf);
      circuitScene.add(wallShelf);

      const backCounter = createCircuitSideTable(circuitWoodTexture, circuitMetalTexture, 5.2, 0.92, 0.98);
      backCounter.position.set(0, 0, -4.55);
      circuitScene.add(backCounter);

      [
        { x: -6.85, z: -1.75, rot: Math.PI / 2, color: 0x4f7288 },
        { x: -6.85, z: 1.85, rot: Math.PI / 2, color: 0x5e7f68 },
        { x: 6.85, z: -1.75, rot: -Math.PI / 2, color: 0x8a6a54 },
        { x: 6.85, z: 1.85, rot: -Math.PI / 2, color: 0x6f6b8f }
      ].forEach(({ x, z, rot, color }) => {
        const sideTable = createCircuitSideTable(circuitWoodTexture, circuitMetalTexture, 1.95, 0.9, 0.88);
        sideTable.position.set(x, 0, z);
        sideTable.rotation.y = rot;
        circuitScene.add(sideTable);

        const chair = createCircuitChair(color);
        chair.position.set(x + (x < 0 ? 0.95 : -0.95), 0, z);
        chair.rotation.y = x < 0 ? -Math.PI / 2 : Math.PI / 2;
        circuitScene.add(chair);
      });

      [
        { x: -4.2, z: -4.2, rot: 0.18, color: 0x57778b },
        { x: 4.15, z: -4.15, rot: -0.2, color: 0x7e6a58 }
      ].forEach(({ x, z, rot, color }) => {
        const chair = createCircuitChair(color);
        chair.position.set(x, 0, z);
        chair.rotation.y = rot;
        circuitScene.add(chair);
      });

      const bench = new THREE.Group();
      const benchTop = new THREE.Mesh(
        new THREE.BoxGeometry(12.8, 0.18, 7.2),
        new THREE.MeshStandardMaterial({
          map: circuitWoodTexture,
          color: 0xa68966,
          roughness: 0.7,
          metalness: 0.02
        })
      );
      benchTop.position.set(0, 1.02, circuitWorld.room.benchCenterZ);
      bench.add(benchTop);

      const apron = new THREE.Mesh(
        new THREE.BoxGeometry(12.4, 0.22, 0.28),
        new THREE.MeshStandardMaterial({
          map: circuitMetalTexture,
          color: 0x5d6670,
          roughness: 0.62,
          metalness: 0.38
        })
      );
      apron.position.set(0, 0.9, circuitWorld.room.benchCenterZ - 3.34);
      bench.add(apron);

      [
        [-5.8, 0.5, -2.5],
        [5.8, 0.5, -2.5],
        [-5.8, 0.5, 3.1],
        [5.8, 0.5, 3.1]
      ].forEach(([x, y, z]) => {
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 1, 0.22),
          new THREE.MeshStandardMaterial({
            map: circuitMetalTexture,
            color: 0x737b84,
            roughness: 0.54,
            metalness: 0.42
          })
        );
        leg.position.set(x, y, z);
        bench.add(leg);
      });

      applyShadow(bench);
      circuitScene.add(bench);

      const board = new THREE.Group();
      const boardBase = new THREE.Mesh(
        new THREE.BoxGeometry(circuitWorld.boardWidth, 0.18, circuitWorld.boardDepth),
        new THREE.MeshStandardMaterial({ color: 0x50606c, roughness: 0.62, metalness: 0.08 })
      );
      boardBase.position.set(0, circuitWorld.boardY - 0.09, 0);
      board.add(boardBase);

      const boardTop = new THREE.Mesh(
        new THREE.BoxGeometry(circuitWorld.boardWidth - 0.14, 0.02, circuitWorld.boardDepth - 0.14),
        new THREE.MeshStandardMaterial({
          map: createCircuitBoardTexture(),
          color: 0xf8f4eb,
          roughness: 0.84,
          metalness: 0.02
        })
      );
      boardTop.position.set(0, circuitWorld.boardY + 0.005, 0);
      board.add(boardTop);

      const boardFrame = new THREE.Mesh(
        new THREE.BoxGeometry(circuitWorld.boardWidth + 0.12, 0.08, circuitWorld.boardDepth + 0.12),
        new THREE.MeshStandardMaterial({ color: 0x8a949c, roughness: 0.56, metalness: 0.14 })
      );
      boardFrame.position.set(0, circuitWorld.boardY - 0.05, 0);
      board.add(boardFrame);

      circuitState.boardMesh = boardTop;
      applyShadow(board);
      circuitScene.add(board);

      const powerUnit = new THREE.Group();
      const powerBody = new THREE.Mesh(
        new THREE.BoxGeometry(1.72, 0.52, 0.94),
        new THREE.MeshStandardMaterial({ color: 0x2d3945, roughness: 0.42, metalness: 0.22 })
      );
      powerBody.position.set(-4.86, 1.29, 2.35);
      powerUnit.add(powerBody);

      const panelPlate = new THREE.Mesh(
        new THREE.BoxGeometry(1.54, 0.26, 0.06),
        new THREE.MeshStandardMaterial({ color: 0x445160, roughness: 0.34, metalness: 0.28 })
      );
      panelPlate.position.set(-4.86, 1.36, 2.77);
      powerUnit.add(panelPlate);

      const powerDisplayMaterial = new THREE.MeshStandardMaterial({
        color: 0x97d5ff,
        emissive: 0x1d5477,
        emissiveIntensity: 0.32,
        roughness: 0.22,
        metalness: 0.08
      });
      circuitState.powerUnitDisplayMaterial = powerDisplayMaterial;
      const powerDisplay = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.15, 0.02), powerDisplayMaterial);
      powerDisplay.position.set(-5.05, 1.38, 2.81);
      powerUnit.add(powerDisplay);

      [-5.4, -4.48].forEach((x, index) => {
        const terminal = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.045, 0.14, 18),
          new THREE.MeshStandardMaterial({ color: index === 0 ? 0x3a4a59 : 0xc75442, roughness: 0.28, metalness: 0.76 })
        );
        terminal.position.set(x, 1.45, 2.8);
        terminal.rotation.x = Math.PI / 2;
        powerUnit.add(terminal);
      });
      applyShadow(powerUnit);
      circuitScene.add(powerUnit);

      const taskLamp = new THREE.Group();
      const lampMaterial = new THREE.MeshStandardMaterial({
        map: circuitMetalTexture,
        color: 0x6f7982,
        roughness: 0.46,
        metalness: 0.4
      });
      const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.08, 24), lampMaterial);
      lampBase.position.set(4.88, 1.06, 2.38);
      const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.45, 18), lampMaterial);
      lampStem.position.set(4.88, 1.78, 2.38);
      const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.25, 14), lampMaterial);
      lampArm.position.set(4.38, 2.50, 1.98);
      lampArm.rotation.set(-0.35, 0.6, 1.1); // Angled properly to connect stem with head
      const lampHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.32, 0.42, 24), lampMaterial);
      lampHead.position.set(3.82, 2.22, 1.46);
      lampHead.rotation.set(0.4, -0.5, -0.7); // Tilted down towards table
      taskLamp.add(lampBase, lampStem, lampArm, lampHead);
      applyShadow(taskLamp);
      circuitScene.add(taskLamp);

      const taskLight = new THREE.PointLight(0xffe3b0, 0.66, 7.5, 2);
      taskLight.position.set(3.72, 2.05, 1.35);
      taskLight.castShadow = true;
      taskLight.shadow.mapSize.set(1024, 1024);
      circuitState.taskLight = taskLight;
      circuitScene.add(taskLight);

      const statusBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24),
        new THREE.MeshStandardMaterial({ color: 0x34495d, roughness: 0.4 })
      );
      statusBase.position.set(circuitWorld.boardMaxX - 0.55, circuitWorld.boardY + 0.05, circuitWorld.boardMaxZ - 0.45);
      const statusLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x94a3b3, emissive: 0x203040, emissiveIntensity: 0.2 })
      );
      statusLight.position.set(circuitWorld.boardMaxX - 0.55, circuitWorld.boardY + 0.18, circuitWorld.boardMaxZ - 0.45);
      circuitState.statusLight = statusLight;
      circuitScene.add(statusBase, statusLight);
      applyShadow(statusBase);
      applyShadow(statusLight);
    }

    function registerCircuitMesh(mesh, component, kind, side) {
      mesh.userData.circuitKind = kind;
      mesh.userData.componentId = component.id;
      mesh.userData.side = side || '';
      if (kind === 'port') {
        circuitState.portMeshes.push(mesh);
      } else {
        circuitState.componentMeshes.push(mesh);
      }
    }

    function getCircuitTerminalStyle(component, side) {
      if (component.type === 'battery') {
        return side === 'left'
          ? { color: 0x1d1f24, emissive: 0x101216, position: { x: -0.28, y: 0.48, z: 0 } }
          : { color: 0xc74a3a, emissive: 0x40140e, position: { x: 0.38, y: 0.48, z: 0 } };
      }
      if (component.type === 'switch') {
        return side === 'left'
          ? { color: 0xb88c52, emissive: 0x3c2810, position: { x: -0.36, y: 0.28, z: 0 } }
          : { color: 0xb88c52, emissive: 0x3c2810, position: { x: 0.42, y: 0.28, z: 0 } };
      }
      if (component.type === 'bulb') {
        return side === 'left'
          ? { color: 0xa47a46, emissive: 0x34200d, position: { x: -0.28, y: 0.16, z: 0 } }
          : { color: 0xa47a46, emissive: 0x34200d, position: { x: 0.28, y: 0.16, z: 0 } };
      }
      return {
        color: 0xd2b06e,
        emissive: 0x392300,
        position: { x: side === 'left' ? -(component.width / 2 + 0.2) : (component.width / 2 + 0.2), y: circuitWorld.wireY - circuitWorld.boardY, z: 0 }
      };
    }

    function createCircuitPortMesh(component, side, ghost = false) {
      const terminalStyle = getCircuitTerminalStyle(component, side);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.125, 20, 20),
        new THREE.MeshStandardMaterial({
          color: terminalStyle.color,
          emissive: terminalStyle.emissive,
          emissiveIntensity: 0.12,
          metalness: 0.62,
          roughness: 0.28,
          transparent: ghost,
          opacity: ghost ? 0.55 : 1
        })
      );
      mesh.position.set(terminalStyle.position.x, terminalStyle.position.y, terminalStyle.position.z);
      
      const hitArea = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 12, 12),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      mesh.add(hitArea);
      
      if (!ghost) {
        registerCircuitMesh(mesh, component, 'port', side);
        registerCircuitMesh(hitArea, component, 'port', side);
      }
      return mesh;
    }

    function buildBatteryVisual(component, ghost = false) {
      const group = new THREE.Group();
      const trayMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2d31,
        roughness: 0.56,
        metalness: 0.08,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      const shellMaterial = new THREE.MeshStandardMaterial({
        color: 0x45515b,
        roughness: 0.38,
        metalness: 0.18,
        emissive: 0x132126,
        emissiveIntensity: 0.08,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      component.shellMaterial = shellMaterial;

      const tray = new THREE.Mesh(new THREE.BoxGeometry(component.width, 0.2, component.depth), trayMaterial);
      tray.position.y = 0.1;
      group.add(tray);
      if (!ghost) registerCircuitMesh(tray, component, 'body');

      const shell = new THREE.Mesh(new THREE.BoxGeometry(component.width - 0.18, 0.28, component.depth - 0.18), shellMaterial);
      shell.position.y = 0.28;
      group.add(shell);
      if (!ghost) registerCircuitMesh(shell, component, 'body');

      const cellMaterial = new THREE.MeshStandardMaterial({
        color: 0xb8bec4,
        roughness: 0.24,
        metalness: 0.46,
        transparent: ghost,
        opacity: ghost ? 0.5 : 1
      });
      const smallCell = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.34, component.depth - 0.3), cellMaterial);
      smallCell.position.set(-0.18, 0.31, 0);
      const largeCell = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.46, component.depth - 0.22), cellMaterial);
      largeCell.position.set(0.22, 0.25, 0);
      const negativeCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, component.depth - 0.18, 18),
        new THREE.MeshStandardMaterial({ color: 0x17191d, roughness: 0.62, transparent: ghost, opacity: ghost ? 0.5 : 1 })
      );
      negativeCap.rotation.x = Math.PI / 2;
      negativeCap.position.set(-0.28, 0.48, 0);
      const positiveCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, component.depth - 0.18, 18),
        new THREE.MeshStandardMaterial({ color: 0xc74a3a, roughness: 0.46, metalness: 0.08, transparent: ghost, opacity: ghost ? 0.5 : 1 })
      );
      positiveCap.rotation.x = Math.PI / 2;
      positiveCap.position.set(0.38, 0.48, 0);
      const labelStrip = new THREE.Mesh(
        new THREE.BoxGeometry(component.width - 0.42, 0.04, 0.34),
        new THREE.MeshStandardMaterial({ color: 0x527d53, roughness: 0.7, transparent: ghost, opacity: ghost ? 0.4 : 0.95 })
      );
      labelStrip.position.set(0.05, 0.43, 0);
      group.add(smallCell, largeCell, negativeCap, positiveCap, labelStrip);

      const leftPort = createCircuitPortMesh(component, 'left', ghost);
      const rightPort = createCircuitPortMesh(component, 'right', ghost);
      group.add(leftPort, rightPort);
      component.portMeshes = { left: leftPort, right: rightPort };
      return group;
    }

    function buildBulbVisual(component, ghost = false) {
      const group = new THREE.Group();
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a424a,
        roughness: 0.54,
        metalness: 0.26,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0xa47a46,
        metalness: 0.82,
        roughness: 0.24,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0xfff2cd,
        roughness: 0.08,
        metalness: 0.05,
        transparent: true,
        opacity: ghost ? 0.16 : 0.34,
        emissive: 0x8f5a10,
        emissiveIntensity: 0.06
      });
      component.glassMaterial = glassMaterial;

      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.22, 24), baseMaterial);
      base.position.y = 0.11;
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.2, 20), stemMaterial);
      collar.position.y = 0.26;
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.18, 20), stemMaterial);
      screw.position.y = 0.38;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.34, 26, 26), glassMaterial);
      bulb.position.y = 0.66;
      const filament = new THREE.Mesh(
        new THREE.TorusGeometry(0.08, 0.018, 10, 24, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x92560e, emissive: 0x6b3800, emissiveIntensity: 0.2, transparent: ghost, opacity: ghost ? 0.45 : 1 })
      );
      filament.rotation.x = Math.PI / 2;
      filament.position.y = 0.55;
      group.add(base, collar, screw, bulb, filament);
      
      if (!ghost) {
        registerCircuitMesh(base, component, 'body');
        registerCircuitMesh(collar, component, 'body');
        registerCircuitMesh(screw, component, 'body');
        registerCircuitMesh(bulb, component, 'body');
      }

      const leftPort = createCircuitPortMesh(component, 'left', ghost);
      const rightPort = createCircuitPortMesh(component, 'right', ghost);
      group.add(leftPort, rightPort);
      component.portMeshes = { left: leftPort, right: rightPort };

      if (!ghost) {
        const pointLight = new THREE.PointLight(0xffc46a, 0, 4.6, 2);
        pointLight.position.set(0, 0.7, 0);
        group.add(pointLight);
        component.glowLight = pointLight;
      }
      return group;
    }

    function buildSwitchVisual(component, ghost = false) {
      const group = new THREE.Group();
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x6c5a45,
        roughness: 0.62,
        metalness: 0.08,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      const padMaterial = new THREE.MeshStandardMaterial({
        color: component.closed ? 0x497a55 : 0x7f4d47,
        roughness: 0.54,
        emissive: 0x1f120d,
        emissiveIntensity: 0.08,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      component.padMaterial = padMaterial;

      const base = new THREE.Mesh(new THREE.BoxGeometry(component.width, 0.16, component.depth), frameMaterial);
      base.position.y = 0.08;
      group.add(base);
      if (!ghost) registerCircuitMesh(base, component, 'body');

      const pad = new THREE.Mesh(new THREE.BoxGeometry(component.width - 0.18, 0.12, component.depth - 0.16), padMaterial);
      pad.position.y = 0.18;
      group.add(pad);
      if (!ghost) registerCircuitMesh(pad, component, 'body');

      const postMaterial = new THREE.MeshStandardMaterial({
        color: 0xb88c52,
        roughness: 0.26,
        metalness: 0.8,
        transparent: ghost,
        opacity: ghost ? 0.45 : 1
      });
      const leftPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.2, 18), postMaterial);
      leftPost.position.set(-0.36, 0.28, 0);
      const rightPost = leftPost.clone();
      rightPost.position.x = 0.42;
      group.add(leftPost, rightPost);

      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.86, 0.05, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xd8c9b4, roughness: 0.24, metalness: 0.32, transparent: ghost, opacity: ghost ? 0.45 : 1 })
      );
      arm.position.set(0.04, 0.32, 0);
      arm.rotation.z = component.closed ? 0 : -0.58;
      component.switchArm = arm;
      group.add(arm);
      if (!ghost) registerCircuitMesh(arm, component, 'body');

      const leftPort = createCircuitPortMesh(component, 'left', ghost);
      const rightPort = createCircuitPortMesh(component, 'right', ghost);
      group.add(leftPort, rightPort);
      component.portMeshes = { left: leftPort, right: rightPort };
      return group;
    }

    function buildCircuitComponentVisual(component, ghost = false) {
      let group;
      if (component.type === 'battery') group = buildBatteryVisual(component, ghost);
      if (component.type === 'bulb') group = buildBulbVisual(component, ghost);
      if (component.type === 'switch') group = buildSwitchVisual(component, ghost);
      group.position.set(component.x, circuitWorld.boardY, component.z);
      group.userData.componentId = component.id;
      component.group = group;
      circuitScene.add(group);
    }

    function createCircuitComponent(type, x, z, ghost = false) {
      const template = circuitPalette[type];
      const component = {
        id: ghost ? `ghost-${type}` : circuitState.nextComponentId++,
        type,
        x,
        z,
        width: template.width,
        depth: template.depth,
        height: template.height,
        closed: type === 'switch' ? false : undefined,
        wireGroups: []
      };
      const clamped = clampCircuitPosition(component, x, z);
      component.x = clamped.x;
      component.z = clamped.z;
      buildCircuitComponentVisual(component, ghost);
      return component;
    }

    function clearCircuitGhost() {
      if (!circuitState.ghostComponent) return;
      circuitScene.remove(circuitState.ghostComponent.group);
      disposeObject3D(circuitState.ghostComponent.group);
      circuitState.ghostComponent = null;
    }

    function refreshCircuitPortStyles() {
      circuitState.components.forEach((component) => {
        if (!component.portMeshes) return;
        ['left', 'right'].forEach((side) => {
          const mesh = component.portMeshes[side];
          const nodeId = getCircuitPortNodeId(component, side);
          const isSelected = circuitState.wiringStart && circuitState.wiringStart.nodeId === nodeId;
          const isHovered = circuitInteraction.hoveredPortId === nodeId;
          const isActive = circuitState.closedCircuit && circuitState.activeNodes.has(nodeId);
          if (isSelected) {
            mesh.material.color.set(0x2b82ff);
            mesh.material.emissive.setHex(0x0d377a);
            mesh.material.emissiveIntensity = 0.65;
          } else if (isHovered) {
            mesh.material.color.set(0x7fc2ff);
            mesh.material.emissive.setHex(0x1f4f84);
            mesh.material.emissiveIntensity = 0.4;
          } else if (isActive) {
            mesh.material.color.set(0xe0a54b);
            mesh.material.emissive.setHex(0x6d3b00);
            mesh.material.emissiveIntensity = 0.28;
          } else {
            mesh.material.color.set(0xd2b06e);
            mesh.material.emissive.setHex(0x392300);
            mesh.material.emissiveIntensity = 0.12;
          }
        });
      });
    }

    function isCircuitComponentActive(component) {
      if (!circuitState.closedCircuit) return false;
      return (
        circuitState.activeNodes.has(getCircuitPortNodeId(component, 'left')) &&
        circuitState.activeNodes.has(getCircuitPortNodeId(component, 'right'))
      );
    }

    function setCircuitReadoutActive(readoutElement, active) {
      if (!readoutElement) return;
      const card = readoutElement.closest('.circuit-readout');
      if (card) card.classList.toggle('active', active);
    }

    function updateCircuitDashboard() {
      const switchComponent = circuitState.components.find((component) => component.type === 'switch') || null;
      const bulbActive = circuitState.components.some((component) => component.type === 'bulb' && isCircuitComponentActive(component));

      if (circuitUi.lampReadout) {
        circuitUi.lampReadout.textContent = bulbActive ? t('circuit.readouts.lampOn') : t('circuit.readouts.lampOff');
        setCircuitReadoutActive(circuitUi.lampReadout, bulbActive);
      }

      if (circuitUi.switchReadout) {
        circuitUi.switchReadout.textContent = switchComponent
          ? t(switchComponent.closed ? 'circuit.readouts.switchClosed' : 'circuit.readouts.switchOpen')
          : '—';
        setCircuitReadoutActive(circuitUi.switchReadout, Boolean(switchComponent && switchComponent.closed));
      }

      if (circuitUi.wiresReadout) {
        circuitUi.wiresReadout.textContent = String(circuitState.wires.length);
        setCircuitReadoutActive(circuitUi.wiresReadout, circuitState.wires.length > 0);
      }

      if (circuitUi.componentsReadout) {
        circuitUi.componentsReadout.textContent = String(circuitState.components.length);
        setCircuitReadoutActive(circuitUi.componentsReadout, circuitState.components.length > 0);
      }
    }

    function refreshCircuitComponentAppearance(time = performance.now()) {
      const pulse = 0.7 + 0.3 * Math.sin(time / 240);
      circuitState.components.forEach((component) => {
        const active = isCircuitComponentActive(component);
        if (component.type === 'battery' && component.shellMaterial) {
          component.shellMaterial.emissiveIntensity = active ? 0.18 : 0.08;
        }
        if (component.type === 'bulb' && component.glassMaterial) {
          component.glassMaterial.emissiveIntensity = active ? 0.42 + pulse * 0.42 : 0.06;
          component.glassMaterial.opacity = active ? 0.58 : 0.34;
          if (component.glowLight) {
            component.glowLight.intensity = active ? 1.1 + pulse * 0.95 : 0;
          }
        }
        if (component.type === 'switch' && component.padMaterial && component.switchArm) {
          component.padMaterial.color.setHex(component.closed ? 0x497a55 : 0x7f4d47);
          component.padMaterial.emissiveIntensity = active ? 0.16 : 0.05;
          const targetRotation = component.closed ? 0 : -0.58;
          component.switchArm.rotation.z += (targetRotation - component.switchArm.rotation.z) * 0.22;
        }
      });

      if (circuitState.statusLight) {
        const lightColor = !circuitState.components.length && !circuitState.wires.length
          ? 0x94a3b3
          : circuitState.closedCircuit ? 0xf2b441 : 0xd96868;
        circuitState.statusLight.material.color.setHex(lightColor);
        circuitState.statusLight.material.emissive.setHex(lightColor);
        circuitState.statusLight.material.emissiveIntensity = circuitState.closedCircuit ? 0.65 : 0.28;
      }

      if (circuitState.powerUnitDisplayMaterial) {
        const powerColor = circuitState.closedCircuit ? 0x8ff6bf : circuitState.components.length ? 0x97d5ff : 0x9fb0ba;
        const emissiveColor = circuitState.closedCircuit ? 0x167248 : 0x1d5477;
        circuitState.powerUnitDisplayMaterial.color.setHex(powerColor);
        circuitState.powerUnitDisplayMaterial.emissive.setHex(emissiveColor);
        circuitState.powerUnitDisplayMaterial.emissiveIntensity = circuitState.closedCircuit ? 0.9 : circuitState.components.length ? 0.32 : 0.16;
      }

      if (circuitState.taskLight) {
        circuitState.taskLight.intensity = circuitState.closedCircuit ? 0.92 : 0.66;
      }

      refreshCircuitPortStyles();
    }

    function createCylinderBetween(start, end, radius, material) {
      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();
      if (length < 0.001) return null;
      const geometry = new THREE.CylinderGeometry(radius, radius, length, 12);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(start).add(end).multiplyScalar(0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    }

    function addDashedWireSegments(group, start, end, radius, color) {
      const direction = new THREE.Vector3().subVectors(end, start);
      const total = direction.length();
      if (total < 0.001) return;
      direction.normalize();
      const dash = 0.24;
      const gap = 0.14;
      const material = new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.18 });
      for (let distance = 0; distance < total; distance += dash + gap) {
        const dashEnd = Math.min(total, distance + dash);
        const dashStartPoint = start.clone().addScaledVector(direction, distance);
        const dashEndPoint = start.clone().addScaledVector(direction, dashEnd);
        const segment = createCylinderBetween(dashStartPoint, dashEndPoint, radius, material);
        if (segment) {
          segment.renderOrder = 4;
          group.add(segment);
        }
      }
    }

    function getWirePathPoints(fromPort, toPort, laneSeed = 0) {
      const lead = 0.2;
      const startLead = fromPort.side === 'left' ? -lead : lead;
      const endLead = toPort.side === 'left' ? -lead : lead;
      const laneIndex = Math.abs(laneSeed) % 4;
      
      const startX = fromPort.x + startLead;
      const endX = toPort.x + endLead;

      const p1X = startX + (endX - startX) * 0.2;
      const p2X = startX + (endX - startX) * 0.5;
      const p3X = startX + (endX - startX) * 0.8;
      
      const laneShift = (laneIndex - 1.5) * 0.12;
      const midZ = ((fromPort.z + toPort.z) / 2) + laneShift;

      const p1Z = THREE.MathUtils.lerp(fromPort.z, midZ, 0.5);
      const p2Z = midZ;
      const p3Z = THREE.MathUtils.lerp(midZ, toPort.z, 0.5);

      const dropY = circuitWorld.boardY + 0.03 + laneIndex * 0.01;

      return [
        new THREE.Vector3(fromPort.x, fromPort.y, fromPort.z),
        new THREE.Vector3(startX, fromPort.y + 0.02, fromPort.z),
        new THREE.Vector3(p1X, dropY, p1Z),
        new THREE.Vector3(p2X, dropY, p2Z),
        new THREE.Vector3(p3X, dropY, p3Z),
        new THREE.Vector3(endX, toPort.y + 0.02, toPort.z),
        new THREE.Vector3(toPort.x, toPort.y, toPort.z)
      ];
    }

    function buildWireGroup(points, mode, wireId = null, baseColor = null) {
      const group = new THREE.Group();
      const active = mode === 'active';
      const selected = mode === 'selected';
      const preview = mode === 'preview';
      const color = preview ? 0x2b82ff : selected ? 0xff5d47 : active ? (baseColor ?? 0xc9812c) : (baseColor ?? 0x5e6872);
      const radius = preview ? 0.038 : selected ? 0.048 : active ? 0.044 : 0.036;
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: selected ? 0x6b140b : active ? 0x4d2500 : preview ? 0x123c82 : 0x121921,
        emissiveIntensity: selected ? 0.34 : active ? 0.16 : preview ? 0.28 : 0.03,
        roughness: active || selected ? 0.44 : 0.56,
        metalness: active || selected ? 0.38 : 0.18,
        transparent: preview,
        opacity: preview ? 0.65 : 1
      });

      // Filter out points that are extremely close to prevent TubeGeometry twisting issues
      const cleanPoints = [points[0]];
      for (let i = 1; i < points.length; i++) {
        if (points[i].distanceTo(points[i-1]) > 0.001) cleanPoints.push(points[i]);
      }

      if (cleanPoints.length > 1) {
        // Use CatmullRomCurve3 to create a gorgeously smooth cable arc
        const curve = new THREE.CatmullRomCurve3(cleanPoints, false, 'chordal', 0.5);
        const geometry = new THREE.TubeGeometry(curve, 36, radius, 12, false);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (!preview && wireId !== null) {
          mesh.userData.circuitKind = 'wire';
          mesh.userData.wireId = wireId;
          circuitState.wireMeshes.push(mesh);
        }
        mesh.renderOrder = 4;
        group.add(mesh);
      }
      return group;
    }

    function rebuildWireVisual(wire) {
      if (wire.group) {
        circuitScene.remove(wire.group);
        disposeObject3D(wire.group);
      }
      const fromComponent = getCircuitComponentById(wire.from.componentId);
      const toComponent = getCircuitComponentById(wire.to.componentId);
      if (!fromComponent || !toComponent) return;
      const fromPort = getCircuitPortPosition(fromComponent, wire.from.side);
      const toPort = getCircuitPortPosition(toComponent, wire.to.side);
      const mode = circuitInteraction.selectedWireId === wire.id
        ? 'selected'
        : (circuitState.activeWireIds.has(wire.id) ? 'active' : 'inactive');
      wire.group = buildWireGroup(getWirePathPoints(fromPort, toPort, wire.id), mode, wire.id, wire.color);
      wire.group.userData.wireId = wire.id;
      circuitScene.add(wire.group);
    }

    function rebuildTemporaryWire() {
      if (circuitState.tempWire) {
        circuitScene.remove(circuitState.tempWire);
        disposeObject3D(circuitState.tempWire);
        circuitState.tempWire = null;
      }
      if (!circuitState.wiringStart || !circuitInteraction.pointerInside) return;
      const end = circuitInteraction.ghostWorld.clone();
      end.y = circuitWorld.boardY + 0.18;
      const from = {
        x: circuitState.wiringStart.x,
        y: circuitState.wiringStart.y,
        z: circuitState.wiringStart.z,
        side: circuitState.wiringStart.side
      };
      const previewPort = {
        x: end.x,
        y: end.y,
        z: end.z,
        side: end.x >= from.x ? 'right' : 'left'
      };
      circuitState.tempWire = buildWireGroup(getWirePathPoints(from, previewPort, circuitState.nextWireId), 'preview');
      circuitScene.add(circuitState.tempWire);
    }

    function rebuildAllCircuitWires() {
      circuitState.wireMeshes = [];
      circuitState.wires.forEach(rebuildWireVisual);
      rebuildTemporaryWire();
      circuitState.needsRedraw = true;
    }

    function updateCircuitStatus() {
      const hasComponents = circuitState.components.length > 0;
      const hasWires = circuitState.wires.length > 0;
      let text = circuitMessages.initial;
      let color = '#1f3446';
      let background = 'linear-gradient(180deg, rgba(248, 251, 253, 0.98) 0%, rgba(233, 241, 247, 0.92) 100%)';

      if (hasComponents && !hasWires) {
        text = circuitMessages.ready;
        color = '#155a79';
        background = 'linear-gradient(180deg, rgba(235, 247, 255, 0.98) 0%, rgba(217, 236, 247, 0.92) 100%)';
      } else if (circuitState.closedCircuit) {
        text = circuitMessages.closed;
        color = '#8a5300';
        background = 'linear-gradient(180deg, rgba(255, 247, 220, 0.98) 0%, rgba(255, 235, 188, 0.94) 100%)';
      } else if (hasComponents || hasWires) {
        text = circuitMessages.open;
        color = '#8a2d2d';
        background = 'linear-gradient(180deg, rgba(255, 239, 239, 0.98) 0%, rgba(248, 225, 225, 0.94) 100%)';
      }

      circuitUi.status.textContent = text;
      circuitUi.status.style.color = color;
      circuitUi.status.style.background = background;
      updateCircuitDashboard();
    }

    function buildCircuitAdjacency() {
      const adjacency = new Map();
      const ensureNode = (nodeId) => {
        if (!adjacency.has(nodeId)) adjacency.set(nodeId, new Set());
      };
      const connect = (a, b) => {
        ensureNode(a);
        ensureNode(b);
        adjacency.get(a).add(b);
        adjacency.get(b).add(a);
      };

      circuitState.components.forEach((component) => {
        const left = getCircuitPortNodeId(component, 'left');
        const right = getCircuitPortNodeId(component, 'right');
        ensureNode(left);
        ensureNode(right);
        if (component.type === 'bulb') connect(left, right);
        if (component.type === 'switch' && component.closed) connect(left, right);
      });

      circuitState.wires.forEach((wire) => {
        connect(wire.from.nodeId, wire.to.nodeId);
      });
      return adjacency;
    }

    function bfsCircuit(startNodeId, adjacency) {
      const visited = new Set([startNodeId]);
      const queue = [startNodeId];
      while (queue.length) {
        const current = queue.shift();
        const neighbors = adjacency.get(current);
        if (!neighbors) continue;
        neighbors.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        });
      }
      return visited;
    }

    function evaluateCircuitState() {
      const adjacency = buildCircuitAdjacency();
      let closedCircuit = false;
      let activeNodes = new Set();

      circuitState.components
        .filter((component) => component.type === 'battery')
        .some((battery) => {
          const positive = getCircuitPortNodeId(battery, 'right');
          const negative = getCircuitPortNodeId(battery, 'left');
          const fromPositive = bfsCircuit(positive, adjacency);
          if (!fromPositive.has(negative)) return false;
          const fromNegative = bfsCircuit(negative, adjacency);
          activeNodes = new Set([...fromPositive].filter((nodeId) => fromNegative.has(nodeId)));
          closedCircuit = true;
          return true;
        });

      const activeWireIds = new Set();
      if (closedCircuit) {
        circuitState.wires.forEach((wire) => {
          if (activeNodes.has(wire.from.nodeId) && activeNodes.has(wire.to.nodeId)) {
            activeWireIds.add(wire.id);
          }
        });
      }

      circuitState.closedCircuit = closedCircuit;
      circuitState.activeNodes = activeNodes;
      circuitState.activeWireIds = activeWireIds;
      updateCircuitStatus();
      refreshCircuitComponentAppearance();
      rebuildAllCircuitWires();
      circuitState.needsRedraw = true;
    }

    function circuitWireAlreadyExists(fromPort, toPort) {
      return circuitState.wires.some((wire) => (
        (wire.from.nodeId === fromPort.nodeId && wire.to.nodeId === toPort.nodeId) ||
        (wire.from.nodeId === toPort.nodeId && wire.to.nodeId === fromPort.nodeId)
      ));
    }

    function getCircuitWireCountForNode(nodeId) {
      return circuitState.wires.filter((wire) => wire.from.nodeId === nodeId || wire.to.nodeId === nodeId).length;
    }

    function isCircuitPortAvailable(port) {
      return getCircuitWireCountForNode(port.nodeId) < getCircuitWireLimitForPort(port);
    }

    function getCircuitWireLimitForPort(port) {
      if (!port || !port.component) return 2;
      if (port.component.type === 'battery') return 2;
      if (port.component.type === 'switch') return 2;
      if (port.component.type === 'bulb') return 2;
      return 2;
    }

    function getCircuitPortFromComponentSide(component, side) {
      if (!component) return null;
      return getCircuitPortPosition(component, side);
    }

    function getCircuitBodySideFromHit(component, hit) {
      if (!component || !component.group || !hit || !hit.point) return 'right';
      const localPoint = component.group.worldToLocal(hit.point.clone());
      return localPoint.x <= 0 ? 'left' : 'right';
    }

    function resolveCircuitBodyPort(component, preferredSide) {
      if (!component) return null;
      const orderedSides = preferredSide === 'left' ? ['left', 'right'] : ['right', 'left'];
      const candidates = orderedSides
        .map((side) => getCircuitPortFromComponentSide(component, side))
        .filter(Boolean);

      if (!circuitState.wiringStart) {
        return candidates.find(isCircuitPortAvailable) || candidates[0] || null;
      }

      return candidates.find((port) => canConnectCircuitPorts(circuitState.wiringStart, port))
        || candidates.find(isCircuitPortAvailable)
        || null;
    }

    function canConnectCircuitPorts(fromPort, toPort) {
      if (!fromPort || !toPort) return false;
      if (fromPort.component.id === toPort.component.id) return false;
      if (circuitWireAlreadyExists(fromPort, toPort)) return false;

      if (getCircuitWireCountForNode(fromPort.nodeId) >= getCircuitWireLimitForPort(fromPort)) return false;
      if (getCircuitWireCountForNode(toPort.nodeId) >= getCircuitWireLimitForPort(toPort)) return false;

      return true;
    }

    function getCircuitWireColor(fromPort, toPort) {
      const includesBatteryPositive =
        (fromPort.component.type === 'battery' && fromPort.side === 'right') ||
        (toPort.component.type === 'battery' && toPort.side === 'right');
      const includesBatteryNegative =
        (fromPort.component.type === 'battery' && fromPort.side === 'left') ||
        (toPort.component.type === 'battery' && toPort.side === 'left');

      if (includesBatteryPositive) return 0xc75442;
      if (includesBatteryNegative) return 0x23272d;

      const componentTypes = [fromPort.component.type, toPort.component.type].sort().join(':');
      if (componentTypes.includes('switch')) return 0xd09a2f;
      return 0x496b88;
    }

    function getCircuitWireHit(clientX, clientY) {
      if (!circuitState.wireMeshes.length) return null;
      if (!setCircuitRayFromClient(clientX, clientY)) return null;
      const hits = circuitRaycaster.intersectObjects(circuitState.wireMeshes, false);
      if (!hits.length) return null;
      const wireId = hits[0].object.userData.wireId;
      return circuitState.wires.find((wire) => wire.id === wireId) || null;
    }

    function removeCircuitWire(wireId) {
      const wire = circuitState.wires.find((entry) => entry.id === wireId);
      if (!wire) return false;
      if (wire.group) {
        circuitScene.remove(wire.group);
        disposeObject3D(wire.group);
      }
      circuitState.wires = circuitState.wires.filter((entry) => entry.id !== wireId);
      circuitInteraction.hoveredWireId = null;
      if (circuitInteraction.selectedWireId === wireId) {
        circuitInteraction.selectedWireId = null;
      }
      evaluateCircuitState();
      updateCircuitDeleteButton();
      updateCircuitCursor();
      return true;
    }

    function getCircuitDeleteCandidateId() {
      return circuitInteraction.selectedWireId ?? circuitInteraction.hoveredWireId ?? null;
    }

    function updateCircuitDeleteButton() {
      if (!circuitUi.deleteButton) return;
      circuitUi.deleteButton.disabled = !getCircuitDeleteCandidateId();
    }

    function updateCircuitCursor() {
      if (activeLabMode !== 'circuit') return;
      if (circuitState.paletteDrag || circuitInteraction.draggedComponentId) {
        circuitUi.viewport.style.cursor = 'grabbing';
      } else if (circuitInteraction.hoveredPortId || circuitState.wiringStart) {
        circuitUi.viewport.style.cursor = 'crosshair';
      } else if (circuitInteraction.hoveredWireId) {
        circuitUi.viewport.style.cursor = 'pointer';
      } else {
        circuitUi.viewport.style.cursor = 'grab';
      }
    }

    function completeCircuitWire(targetPort) {
      if (!circuitState.wiringStart) {
        circuitState.wiringStart = targetPort;
        rebuildTemporaryWire();
        refreshCircuitPortStyles();
        updateCircuitCursor();
        return;
      }
      if (circuitState.wiringStart.nodeId === targetPort.nodeId) {
        circuitState.wiringStart = null;
        rebuildTemporaryWire();
        refreshCircuitPortStyles();
        updateCircuitCursor();
        return;
      }
      if (canConnectCircuitPorts(circuitState.wiringStart, targetPort)) {
        circuitState.wires.push({
          id: circuitState.nextWireId++,
          color: getCircuitWireColor(circuitState.wiringStart, targetPort),
          from: {
            componentId: circuitState.wiringStart.component.id,
            side: circuitState.wiringStart.side,
            nodeId: circuitState.wiringStart.nodeId
          },
          to: {
            componentId: targetPort.component.id,
            side: targetPort.side,
            nodeId: targetPort.nodeId
          }
        });
      }
      circuitState.wiringStart = null;
      evaluateCircuitState();
      updateCircuitCursor();
    }

    function clearCircuitHover() {
      circuitInteraction.hoveredPortId = null;
      circuitInteraction.hoveredWireId = null;
      refreshCircuitPortStyles();
      updateCircuitDeleteButton();
      updateCircuitCursor();
    }

    function startCircuitPaletteDrag(type) {
      circuitState.paletteDrag = { type };
      circuitState.wiringStart = null;
      clearCircuitGhost();
      circuitState.ghostComponent = createCircuitComponent(type, 0, 0, true);
      circuitControls.enabled = false;
      updateCircuitCursor();
      circuitState.needsRedraw = true;
    }

    function updateGhostFromClient(clientX, clientY) {
      const hit = intersectCircuitBoard(clientX, clientY);
      if (!hit) {
        if (circuitState.ghostComponent) circuitState.ghostComponent.group.visible = false;
        circuitInteraction.pointerInside = false;
        rebuildTemporaryWire();
        return null;
      }
      circuitInteraction.pointerInside = true;
      circuitInteraction.ghostWorld.copy(hit);
      circuitInteraction.ghostWorld.y = circuitWorld.boardY;
      if (circuitState.ghostComponent) {
        const component = circuitState.ghostComponent;
        const clamped = clampCircuitPosition(component, hit.x, hit.z);
        component.x = clamped.x;
        component.z = clamped.z;
        component.group.visible = true;
        component.group.position.set(component.x, circuitWorld.boardY, component.z);
      }
      rebuildTemporaryWire();
      return hit;
    }

    function setCircuitComponentPosition(component, x, z) {
      const clamped = clampCircuitPosition(component, x, z);
      component.x = clamped.x;
      component.z = clamped.z;
      component.group.position.set(component.x, circuitWorld.boardY, component.z);
      rebuildAllCircuitWires();
      circuitState.needsRedraw = true;
    }

    function getCircuitPortHit(clientX, clientY) {
      if (!setCircuitRayFromClient(clientX, clientY)) return null;
      const hits = circuitRaycaster.intersectObjects(circuitState.portMeshes, false);
      if (!hits.length) return null;
      const { componentId, side } = hits[0].object.userData;
      const component = getCircuitComponentById(componentId);
      if (!component) return null;
      return getCircuitPortPosition(component, side);
    }

    function getCircuitComponentHit(clientX, clientY) {
      if (!setCircuitRayFromClient(clientX, clientY)) return null;
      const hits = circuitRaycaster.intersectObjects(circuitState.componentMeshes, false);
      if (!hits.length) return null;
      const component = getCircuitComponentById(hits[0].object.userData.componentId);
      if (!component) return null;
      return { component, hit: hits[0] };
    }

    function handleCircuitPointerMove(clientX, clientY) {
      const port = getCircuitPortHit(clientX, clientY);
      const wire = port ? null : getCircuitWireHit(clientX, clientY);
      circuitInteraction.hoveredPortId = port ? port.nodeId : null;
      circuitInteraction.hoveredWireId = wire ? wire.id : null;
      refreshCircuitPortStyles();
      updateCircuitDeleteButton();

      if (circuitState.paletteDrag) {
        updateGhostFromClient(clientX, clientY);
        updateCircuitCursor();
        return;
      }

      if (circuitInteraction.draggedComponentId) {
        const component = getCircuitComponentById(circuitInteraction.draggedComponentId);
        const hit = updateGhostFromClient(clientX, clientY);
        if (component && hit) {
          setCircuitComponentPosition(component, hit.x + circuitInteraction.dragOffset.x, hit.z + circuitInteraction.dragOffset.z);
        }
        updateCircuitCursor();
        return;
      }

      if (circuitInteraction.pressCandidate) {
        const dx = clientX - circuitInteraction.pressCandidate.clientX;
        const dy = clientY - circuitInteraction.pressCandidate.clientY;
        if (Math.hypot(dx, dy) > 6) {
          const component = getCircuitComponentById(circuitInteraction.pressCandidate.componentId);
          const hit = updateGhostFromClient(clientX, clientY);
          if (component && hit) {
            circuitInteraction.draggedComponentId = component.id;
            circuitInteraction.dragOffset.set(component.x - hit.x, 0, component.z - hit.z);
            circuitInteraction.pressCandidate = null;
            circuitControls.enabled = false;
          }
        }
      } else {
        updateGhostFromClient(clientX, clientY);
      }
      updateCircuitCursor();
    }

    function endCircuitPointer(clientX, clientY) {
      if (circuitState.paletteDrag) {
        const hit = typeof clientX === 'number' ? intersectCircuitBoard(clientX, clientY) : null;
        if (hit) {
          const component = createCircuitComponent(circuitState.paletteDrag.type, hit.x, hit.z);
          circuitState.components.push(component);
          evaluateCircuitState();
        }
        circuitState.paletteDrag = null;
        clearCircuitGhost();
        circuitControls.enabled = activeLabMode === 'circuit';
        updateCircuitCursor();
        return;
      }

      if (circuitInteraction.draggedComponentId) {
        circuitInteraction.draggedComponentId = null;
        circuitControls.enabled = activeLabMode === 'circuit';
        updateCircuitCursor();
        return;
      }

      if (circuitInteraction.pressCandidate) {
        const component = getCircuitComponentById(circuitInteraction.pressCandidate.componentId);
        // ALways allow switch toggle on click (most important interaction for students)
        if (component && component.type === 'switch') {
          component.closed = !component.closed;
          evaluateCircuitState();
          // Animate the switch arm snap
          if (component.switchArm) {
            gsap.to(component.switchArm.rotation, {
              z: component.closed ? 0 : -0.58,
              duration: 0.18,
              ease: 'back.out(2)'
            });
          }
        } else if (component && circuitInteraction.pressCandidate.bodyPortSide) {
          const targetPort = resolveCircuitBodyPort(component, circuitInteraction.pressCandidate.bodyPortSide);
          if (targetPort) {
            completeCircuitWire(targetPort);
          }
        }
        circuitInteraction.pressCandidate = null;
        updateCircuitCursor();
      }
    }

    function removeCircuitComponentVisual(component) {
      if (!component || !component.group) return;
      circuitScene.remove(component.group);
      disposeObject3D(component.group);
    }

    function focusCircuitStation() {
      circuitControls.target.set(0.05, 1.18, 0.15);
      circuitCamera.position.set(0.35, 6.85, 8.12);
      circuitCamera.lookAt(circuitControls.target);
      circuitCamera.updateProjectionMatrix();
      circuitControls.update();
    }

    function populateCircuitStarterComponents() {
      circuitStarterLayout.forEach((entry) => {
        const component = createCircuitComponent(entry.type, entry.x, entry.z);
        circuitState.components.push(component);
      });
    }

    function resetCircuitLab(seedStarter = true) {
      circuitState.wires.forEach((wire) => {
        if (wire.group) {
          circuitScene.remove(wire.group);
          disposeObject3D(wire.group);
        }
      });
      if (circuitState.tempWire) {
        circuitScene.remove(circuitState.tempWire);
        disposeObject3D(circuitState.tempWire);
      }
      circuitState.components.forEach(removeCircuitComponentVisual);
      clearCircuitGhost();

      circuitState.components = [];
      circuitState.wires = [];
      circuitState.nextComponentId = 1;
      circuitState.nextWireId = 1;
      circuitState.wiringStart = null;
      circuitState.activeNodes = new Set();
      circuitState.activeWireIds = new Set();
      circuitState.closedCircuit = false;
      circuitState.paletteDrag = null;
      circuitState.tempWire = null;
      circuitState.portMeshes = [];
      circuitState.wireMeshes = [];
      circuitState.componentMeshes = [];
      circuitInteraction.draggedComponentId = null;
      circuitInteraction.pressCandidate = null;
      circuitInteraction.hoveredPortId = null;
      circuitInteraction.hoveredWireId = null;
      circuitInteraction.selectedWireId = null;
      circuitInteraction.pointerInside = false;
      circuitControls.enabled = activeLabMode === 'circuit';

      focusCircuitStation();

      if (seedStarter) {
        populateCircuitStarterComponents();
        evaluateCircuitState();
      } else {
        updateCircuitStatus();
        refreshCircuitComponentAppearance();
      }

      updateCircuitDashboard();
      updateCircuitDeleteButton();
      updateCircuitCursor();
      circuitState.needsRedraw = true;
    }

    function renderCircuitLab(time) {
      if (activeLabMode !== 'circuit') return;
      if (!circuitState.viewportRect) resizeCircuitCanvas();
      refreshCircuitComponentAppearance(time);
      circuitControls.update();
      circuitRenderer.render(circuitScene, circuitCamera);
      circuitState.needsRedraw = circuitState.closedCircuit || Boolean(circuitInteraction.draggedComponentId) || Boolean(circuitState.paletteDrag);
    }

    function initializeCircuitLab() {
      buildCircuitScene();
      updateCircuitStatus();

      circuitUi.resetButton.addEventListener('click', () => {
        resetCircuitLab();
      });

      circuitUi.deleteButton.addEventListener('click', () => {
        const deletableWireId = getCircuitDeleteCandidateId();
        if (!deletableWireId) return;
        removeCircuitWire(deletableWireId);
      });

      if (hasUnityUi) {
        unityUi.reloadButton.addEventListener('click', () => {
          ensureUnityLabLoaded(true);
        });

        unityUi.openButton.addEventListener('click', (event) => {
          event.preventDefault();
          openUnityInSeparatePage();
        });

        unityUi.fullscreenButton.addEventListener('click', () => {
          ensureUnityLabLoaded();
          toggleUnityFullscreen();
        });

        unityUi.frame.addEventListener('load', () => {
          unityUi.loading.classList.add('is-hidden');
        });
      }

      circuitUi.paletteItems.forEach((item) => {
        item.addEventListener('pointerdown', (event) => {
          if (activeLabMode !== 'circuit') return;
          event.preventDefault();
          startCircuitPaletteDrag(item.dataset.componentType);
          handleCircuitPointerMove(event.clientX, event.clientY);
        });
      });

      circuitRenderer.domElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (activeLabMode !== 'circuit') return;
        const wire = getCircuitWireHit(event.clientX, event.clientY);
        if (wire) {
          removeCircuitWire(wire.id);
          clearCircuitHover();
          return;
        }
        if (circuitState.wiringStart) {
          circuitState.wiringStart = null;
          rebuildTemporaryWire();
          refreshCircuitPortStyles();
          updateCircuitCursor();
        }
      });

      circuitRenderer.domElement.addEventListener('pointerdown', (event) => {
        if (activeLabMode !== 'circuit') return;
        const port = getCircuitPortHit(event.clientX, event.clientY);
        if (port) {
          circuitInteraction.selectedWireId = null;
          updateCircuitDeleteButton();
          completeCircuitWire(port);
          return;
        }

        const wire = getCircuitWireHit(event.clientX, event.clientY);
        if (wire) {
          circuitInteraction.selectedWireId = circuitInteraction.selectedWireId === wire.id ? null : wire.id;
          rebuildAllCircuitWires();
          updateCircuitDeleteButton();
          updateCircuitCursor();
          return;
        }

        const hit = getCircuitComponentHit(event.clientX, event.clientY);
        if (hit) {
          circuitInteraction.selectedWireId = null;
          updateCircuitDeleteButton();
          const bodyPortSide = getCircuitBodySideFromHit(hit.component, hit.hit);
          circuitInteraction.pressCandidate = {
            componentId: hit.component.id,
            bodyPortSide,
            clientX: event.clientX,
            clientY: event.clientY
          };
          updateGhostFromClient(event.clientX, event.clientY);
          updateCircuitCursor();
          return;
        }

        if (circuitState.wiringStart) {
          circuitState.wiringStart = null;
          rebuildTemporaryWire();
          refreshCircuitPortStyles();
        }
        circuitInteraction.selectedWireId = null;
        clearCircuitHover();
        rebuildAllCircuitWires();
      });

      window.addEventListener('pointermove', (event) => {
        if (activeLabMode !== 'circuit') return;
        handleCircuitPointerMove(event.clientX, event.clientY);
      });

      window.addEventListener('pointerup', (event) => {
        if (activeLabMode !== 'circuit') return;
        endCircuitPointer(event.clientX, event.clientY);
      });

      window.addEventListener('pointercancel', () => {
        if (activeLabMode !== 'circuit') return;
        endCircuitPointer();
      });

      window.addEventListener('keydown', (event) => {
        if (activeLabMode !== 'circuit') return;
        if (event.key !== 'Delete' && event.key !== 'Backspace') return;
        const deletableWireId = getCircuitDeleteCandidateId();
        if (!deletableWireId) return;
        event.preventDefault();
        removeCircuitWire(deletableWireId);
      });

      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(() => {
          resizeCircuitCanvas();
        });
        observer.observe(circuitUi.viewport);
      }

      resetCircuitLab();
      resizeCircuitCanvas();
      updateCircuitDeleteButton();
      updateCircuitCursor();
    }

    function animate(time = 0) {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      if (activeLabMode === 'physics' && physicsInitialized) {
        world.step(1 / 60, delta, 3);
        clampTrackBodies();
        syncPhysicsMeshes();
        updateScaleReading();
        updatePendulumLine();
        updatePendulumUi();
        updateCollisionUi();
        controls.update();
        renderer.render(scene, camera);
      }
      renderCircuitLab(time);
      renderBiologyLab(time);
      renderChemistryLab(time);
    }

    window.startFreeFall = startFreeFall;
    window.setAngle = setAngle;
    window.resetPendulum = resetPendulum;
    window.launchCollision = launchCollision;
    window.resetLab = resetLab;
    window.MODEL_URLS = MODEL_URLS;
    window.loadModelOrFallback = loadModelOrFallback;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      resizeCircuitCanvas();
      resizeBiologyViewport();
      resizeChemistryViewport();
    });

    refreshLocalizedUi();

    bindGlobalControls();
    applySingleLabView();

    (async () => {
      try {
        if (requestedLabMode === 'physics') {
          await ensurePhysicsLabInitialized();
        } else if (requestedLabMode === 'circuit') {
          ensureCircuitLabInitialized();
        } else if (requestedLabMode === 'biology') {
          ensureBiologyLabInitialized();
        } else if (requestedLabMode === 'chemistry') {
          ensureChemistryLabInitialized();
        }

        setLabMode(requestedLabMode);
        setLanguage(currentLanguage);
        animate();
        scheduleDeferredLabInitialization(requestedLabMode);
      } catch (error) {
        console.error('Failed to initialize lab', error);
        ui.collisionResult.innerHTML = `<strong>${t('common.error')}:</strong> ${error.message}`;
      }
    })();
  


