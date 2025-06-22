# DeFi RPG Onboarding

An old-school RPG-style webapp teaching DeFi concepts through 12 quests, badges, and map navigation.

## Folder Layout
```
Public/
├ index.html
├ character-select.html
├ map.html
├ quest.html
├ badges.html
├ reset.html
├ styles.css
├ script.js
└ README.md
```

## Local Testing
1. Copy entire `Public/` folder.
2. In terminal, run:
   ```bash
   cd Public
   python -m http.server 8000
   ```
3. Open `http://localhost:8000/index.html`.

## Deployment (GitHub Pages)
1. `cd Public && git init`
2. `git add . && git commit -m "Initial"`
3. Push to GitHub on `main`.
4. In repo **Settings → Pages**, select **main** branch, **/ (root)**.
5. Visit `https://<username>.github.io/<repo>/index.html`.
