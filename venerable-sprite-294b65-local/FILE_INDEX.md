# File Index (inventaire des fichiers)

Ce document liste les fichiers du projet et leur rôle.

## Racine

- `.gitignore` — Exclusion des logs et fichiers temporaires.
- `circuit-check.png` — Image statique utilisée dans l’interface.
- `CODE_EXPLANATION.md` — Explication technique du code.
- `FILE_INDEX.md` — Inventaire des fichiers (ce document).
- `index.html` — Point d’entrée principal de l’application.
- `lab-chimie-lycee.html` — Redirection vers le mode chimie.
- `lab-electrique.html` — Redirection vers le mode circuit.
- `lab-physique.html` — Redirection vers le mode physique.
- `lab-science-cem.html` — Redirection vers le mode biologie.
- `lab-unity.html` — Redirection vers le mode Unity.
- `netlify.toml` — Configuration Netlify (headers et publication).
- `README.md` — Guide de démarrage du projet.
- `serve-local.py` — Serveur Python local compatible Unity WebGL.
- `start-local.ps1` — Script PowerShell pour lancer le serveur local.

## Dossier `.netlify/`

- `.netlify/netlify.toml` — Configuration locale Netlify CLI.
- `.netlify/state.json` — État local Netlify (généré automatiquement).

## Dossier `assets/css/`

- `assets/css/lab-app.css` — Styles globaux de l’application.

## Dossier `assets/js/`

- `assets/js/app.js` — Logique principale (UI, modes de labo, 3D, interactions).
- `assets/js/lab-data.js` — Données statiques (modes, alias, traductions).

## Dossier `assets/unity-webgl/`

- `assets/unity-webgl/index.html` — Conteneur HTML du build Unity.
- `assets/unity-webgl/Build/index.html.data.gz` — Données build Unity compressées.
- `assets/unity-webgl/Build/index.html.framework.js.gz` — Framework JS Unity compressé.
- `assets/unity-webgl/Build/index.html.loader.js` — Loader Unity WebGL.
- `assets/unity-webgl/Build/index.html.wasm.gz` — Runtime WebAssembly compressé.
- `assets/unity-webgl/StreamingAssets/UnityServicesProjectConfiguration.json` — Config services Unity.
- `assets/unity-webgl/TemplateData/favicon.ico` — Icône du template.
- `assets/unity-webgl/TemplateData/fullscreen-button.png` — Bouton plein écran.
- `assets/unity-webgl/TemplateData/MemoryProfiler.png` — Ressource template Unity.
- `assets/unity-webgl/TemplateData/progress-bar-empty-dark.png` — Barre progression vide (dark).
- `assets/unity-webgl/TemplateData/progress-bar-empty-light.png` — Barre progression vide (light).
- `assets/unity-webgl/TemplateData/progress-bar-full-dark.png` — Barre progression remplie (dark).
- `assets/unity-webgl/TemplateData/progress-bar-full-light.png` — Barre progression remplie (light).
- `assets/unity-webgl/TemplateData/style.css` — Style du template Unity.
- `assets/unity-webgl/TemplateData/unity-logo-dark.png` — Logo Unity (dark).
- `assets/unity-webgl/TemplateData/unity-logo-light.png` — Logo Unity (light).
- `assets/unity-webgl/TemplateData/unity-logo-title-footer.png` — Logo footer.
- `assets/unity-webgl/TemplateData/webmemd-icon.png` — Icône Web memory.

## Dossier `assets/unity-lab/`

- `assets/unity-lab/manifest.json` — Manifeste des assets Unity-lab.
- `assets/unity-lab/README.md` — Documentation de ce pack d’assets.

### Audio

- `assets/unity-lab/audio/Egg Drop Inertia.mp3`
- `assets/unity-lab/audio/Oxygen and Candles.mp3`
- `assets/unity-lab/audio/Ring pull intertia.mp3`

### Classroom (modèles 3D)

- `assets/unity-lab/classroom/Chair.FBX`
- `assets/unity-lab/classroom/Electricity_Box.FBX`
- `assets/unity-lab/classroom/Posters.FBX`
- `assets/unity-lab/classroom/Projector.FBX`
- `assets/unity-lab/classroom/Projector_Screen.FBX`
- `assets/unity-lab/classroom/Tables_Few.FBX`
- `assets/unity-lab/classroom/Table_Big.FBX`
- `assets/unity-lab/classroom/Teachers_Board.FBX`
- `assets/unity-lab/classroom/Window.FBX`

### Environment (modèles 3D)

- `assets/unity-lab/environment/baseboard.fbx`
- `assets/unity-lab/environment/ceiling.fbx`
- `assets/unity-lab/environment/chair.fbx`
- `assets/unity-lab/environment/chair_2.fbx`
- `assets/unity-lab/environment/door.fbx`
- `assets/unity-lab/environment/lab_cupboard.fbx`
- `assets/unity-lab/environment/lab_small_cupboard.fbx`
- `assets/unity-lab/environment/lab_table.fbx`
- `assets/unity-lab/environment/lab_table_2.fbx`
- `assets/unity-lab/environment/socket.fbx`
- `assets/unity-lab/environment/wall.fbx`
- `assets/unity-lab/environment/window.fbx`
- `assets/unity-lab/environment/wire.fbx`

### Items

- `assets/unity-lab/items/items.fbx`
- `assets/unity-lab/items/Items2.fbx`
- `assets/unity-lab/items/Items3.fbx`
- `assets/unity-lab/items/measurement.png`
- `assets/unity-lab/items/metal screen.png`

## Fichiers de logs locaux

Ces fichiers sont générés au lancement local, ne font pas partie du code source:

- `server.log`
- `server2.log`
- `server3.log`
- `server-error.log`
- `server2-error.log`
- `server3-error.log`

Ils peuvent être supprimés sans impact et sont ignorés par Git.
