# 🎀 Lfnikicha's Little World

Site romantique pour Souliiiiii. HTML + CSS + JavaScript vanilla, zéro framework.

## 📁 Structure

```
lfnikicha/
├── index.html      → la structure (les écrans et les sections)
├── style.css       → le design (couleurs dans :root en haut)
├── script.js       → l'interactivité (mot de passe, enveloppe, cartes…)
├── data.js         → ✏️ TOUS LES TEXTES + numéro + mot de passe
├── memories.js     → ✏️ la timeline + les photos
└── assets/
    ├── photos/     → tes photos (photo1.jpg … photo6.jpg)
    └── music/      → saison.mp3
```

Tu modifies surtout **data.js** et **memories.js**. Pas besoin de toucher au reste.

## ▶️ Tester sur ton PC

**Option simple :** double-clique sur `index.html`.

**Option recommandée :** dans VS Code, installe l'extension **Live Server**, fais un clic droit sur `index.html` → *Open with Live Server*. La page se recharge toute seule à chaque modification.

**Tester comme sur un téléphone :** dans Chrome, F12 → icône 📱 (Toggle device toolbar) → choisis « iPhone 12 Pro ».

Mot de passe : `21/07/25` (marche aussi avec `21/07/2025`, `21072025`…).

## ✅ À faire avant de lui envoyer

1. **Ton numéro** : dans `data.js`, remplace `"+2126XXXXXXXX"` par ton numéro (ex. `"+212612345678"`).
2. **La chanson** : mets le fichier dans `assets/music/` et nomme-le exactement `saison.mp3`.
3. **Les photos** : mets 6 images dans `assets/photos/` et nomme-les `photo1.jpg` … `photo6.jpg`. Ensuite, change les légendes dans `memories.js`.
   *Astuce : compresse-les avant (ex. squoosh.app), sinon le site sera lent sur mobile.*
4. **Les souvenirs** : ajoute-les dans `memories.js` (le modèle est en haut du fichier).

Tant qu'une photo ou la musique manque, le site ne casse pas : un cadre rose 📸 s'affiche à la place, et le bouton musique est simplement caché.

## ⚠️ À savoir : mot de passe et confidentialité

Le mot de passe est vérifié **en JavaScript, dans le navigateur**. C'est un verrou *symbolique* : quelqu'un qui ouvre le code (F12) peut le trouver, et il peut aussi voir les photos. Le site sera public pour toute personne qui a le lien.
→ Ne mets rien que tu ne voudrais pas voir circuler.

## 🌐 Publier gratuitement (GitHub Pages)

1. Crée un compte sur github.com, puis un **nouveau repository** (ex. `for-you`).
2. *Add file → Upload files* : glisse **le contenu** du dossier (index.html à la racine, pas dans un sous-dossier).
3. *Settings → Pages → Branch : main / (root) → Save*.
4. Attends 1 à 2 minutes. Ton lien sera : `https://TON-PSEUDO.github.io/for-you/`

## 🧠 Comment ça marche (en bref)

- Les 3 écrans (mot de passe → enveloppe → site) sont dans le même `index.html`. JS ajoute ou enlève la classe `.hidden` pour passer de l'un à l'autre.
- Les sections (timeline, raisons, lettres, photos) sont **générées depuis les tableaux** de `data.js` et `memories.js` avec `forEach`. Pour ajouter une carte, tu ajoutes simplement un élément au tableau.
- Une seule fenêtre `modal` sert à toutes les lettres : `openModal(html)` change son contenu.
- La musique démarre au clic sur l'enveloppe, parce que les téléphones bloquent le son tant que l'utilisateur n'a pas touché l'écran.
