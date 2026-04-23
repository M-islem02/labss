# Explication du code

Ce document explique la logique du projet `venerable-sprite-294b65-local`.

## 1) Vue d’ensemble

Le site est une application web de laboratoire virtuel avec plusieurs modes:

- Physique
- Électrique (circuits)
- Science CEM (biologie)
- Chimie lycée
- Unity WebGL

L’entrée principale est `index.html`, qui charge:

- `assets/css/lab-app.css` pour le style
- `assets/js/lab-data.js` pour les données statiques (traductions, modes)
- `assets/js/app.js` pour toute la logique interactive

## 2) Architecture des fichiers source

### `assets/js/lab-data.js`

Contient les données globales:

- `LAB_MODES`: liste des modes disponibles
- `LAB_QUERY_ALIASES`: alias d’URL (`?lab=...`) vers un mode interne
- `TRANSLATIONS`: dictionnaire de traduction (ar/fr)

Ce fichier ne contient pas de logique 3D, seulement des constantes.

### `assets/js/app.js`

Fichier principal de l’application (bootstrap + comportement des labs).

Grandes responsabilités:

1. Initialisation de l’UI (sélection des éléments DOM)
2. Gestion de la langue (lecture URL + localStorage + fallback)
3. Choix du mode labo actif via la query string
4. Gestion du mode Circuit (rendu Three.js + interactions)
5. Gestion des scènes immersives (Biologie, Chimie)
6. Chargement du mode Unity WebGL (`assets/unity-webgl/index.html`)

Librairies utilisées:

- `three` (rendu 3D)
- `cannon-es` (physique)
- `gsap` (animations)

### `assets/css/lab-app.css`

Contient:

- structure visuelle de la page
- styles des panneaux et boutons
- états d’interaction (hover, actif, drag/drop)

## 3) Pages HTML

- `index.html`: page principale complète.
- `lab-physique.html`: redirige vers `index.html?lab=physics`.
- `lab-electrique.html`: redirige vers `index.html?lab=circuit`.
- `lab-science-cem.html`: redirige vers `index.html?lab=biology`.
- `lab-chimie-lycee.html`: redirige vers `index.html?lab=chemistry`.
- `lab-unity.html`: redirige vers `index.html?lab=unity`.

## 4) Serveur local

### `serve-local.py`

Petit serveur HTTP Python compatible Unity WebGL:

- ajoute les bons types MIME (`.wasm`, `.js`, `.data`)
- gère les fichiers compressés `.gz` avec l’en-tête `Content-Encoding: gzip`
- force un cache désactivé en local pour voir les changements rapidement

### `start-local.ps1`

Script de lancement rapide du serveur:

- se place dans le dossier du projet
- lance `serve-local.py` sur le port `4173`

## 5) Build Unity

Le dossier `assets/unity-webgl/` contient le build WebGL exporté:

- `Build/`: bundles Unity (`.data.gz`, `.wasm.gz`, loader JS)
- `TemplateData/`: ressources UI du template Unity
- `StreamingAssets/`: configuration runtime

## 6) Organisation recommandée

Règles suivies dans ce projet:

1. Les données statiques restent dans `lab-data.js`.
2. La logique dynamique reste dans `app.js`.
3. Les logs locaux ne sont pas du code source et restent ignorés par Git.
4. Les assets Unity restent séparés du code front principal.

## 7) Où modifier selon le besoin

- Ajouter un texte traduit: `assets/js/lab-data.js`
- Modifier un comportement de labo: `assets/js/app.js`
- Changer le style global: `assets/css/lab-app.css`
- Modifier le démarrage local: `start-local.ps1` et `serve-local.py`
