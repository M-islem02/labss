# venerable-sprite-294b65-local

Copie locale du site de laboratoire virtuel.

## Lancer le projet en local

Depuis ce dossier:

```powershell
.\start-local.ps1
```

Puis ouvrir:

`http://localhost:4173`

## Accès direct aux labs

- Physique: `http://localhost:4173/lab-physique.html`
- Électrique: `http://localhost:4173/lab-electrique.html`
- Sciences CEM: `http://localhost:4173/lab-science-cem.html`
- Chimie lycée: `http://localhost:4173/lab-chimie-lycee.html`

## Structure du code

- `index.html` : page principale et conteneur des sections.
- `assets/css/lab-app.css` : styles globaux de l’application.
- `assets/js/app.js` : logique interactive et 3D (Three.js/Cannon).
- `assets/js/lab-data.js` : traductions et constantes de configuration.
- `serve-local.py` : serveur local.
- `start-local.ps1` : script de démarrage rapide local.
- `netlify.toml` : configuration de déploiement Netlify.

## Documentation détaillée

Voir :

- `CODE_EXPLANATION.md` : explication technique du code.
- `FILE_INDEX.md` : inventaire organisé des fichiers et dossiers.

## Rangement du projet

- Les logs de serveur (`server*.log`, `*-error.log`) sont exclus via `.gitignore`.
- Le code source applicatif reste dans `assets/css` et `assets/js`.
- Les pages `lab-*.html` servent de redirections vers des modes du labo.
