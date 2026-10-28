/* =========================================================
   memories.js — LA TIMELINE + LES PHOTOS
   ========================================================= */

/* ---------- 📖 Our Story ----------
   Ordre = ordre d'affichage (mets-les dans l'ordre chronologique).
   photo : chemin vers une image dans assets/photos/ (ou "" si pas de photo)

   👉 POUR AJOUTER UN SOUVENIR : copie ce bloc, colle-le à la bonne
   place dans la liste (n'oublie pas la virgule entre deux blocs) :

   {
     date: "JJ/MM/AAAA",
     emoji: "💕",
     title: "Titre du souvenir",
     text: `<p>Ce qui s'est passé…</p>`,
     photo: ""
   },
*/
const MEMORIES = [
  {
    date: "21/07/2025",
    emoji: "📱",
    title: "The follow",
    text: `<p>Followitini f Instagram… w bdina nhdro 3la l'études, 3la lmotorat, w 3la lkhedma dialek. Ma3reftch b9it chhal ghadi tweli mohim f hyati. 🤍</p>`,
    photo: ""
  },
  {
    date: "17/11/2025",
    emoji: "☕",
    title: "Café Boréal",
    text: `
      <p>Awal mera tla9ina. Ba9i kan3a9l mzyan 3la dak nhar…</p>
      <p>3a9la 3la l parfum li kont dayr, 3la lboussat li 3titini, w 3la t3ni9a lkbira li 3n9tek.</p>
      <p>W 3a9la 3la anani ma9dertch nkhelik tmchi, hit ma chb3tch bik. 🥹</p>
      <p>Dak l café ghayb9a dima 3ziz 3lia. Kolla mra kandouz mn 7dah, kantfkr l ayam lwla li 3reftek fihom.</p>
      <p><strong>Nta 3a9el 3la dak nhar ?</strong> 💭</p>`,
    photo: ""
  },

  /* 👉 Les autres souvenirs viendront ici */

  {
    date: "17/10/2026",
    emoji: "🤍",
    title: "The day you stayed",
    text: `
      <p>Kont 3yana w 3ndi machakil… w nta dwezti m3aya nhar kaml bach nrta7.</p>
      <p>Dak nhar fhemt chno hiya l'amour : you were there when I needed you most.</p>`,
    photo: ""
  }
];

/* ---------- 📸 Photos ----------
   Mets tes images dans assets/photos/ avec ces noms
   (ou change les noms ici). Si une image manque,
   un cadre rose s'affiche à la place. */
const PHOTOS = [
  { src: "assets/photos/photo1.jpg", caption: "Légende 1 ✏️" },
  { src: "assets/photos/photo2.jpg", caption: "Légende 2 ✏️" },
  { src: "assets/photos/photo3.jpg", caption: "Légende 3 ✏️" },
  { src: "assets/photos/photo4.jpg", caption: "Légende 4 ✏️" },
  { src: "assets/photos/photo5.jpg", caption: "Légende 5 ✏️" },
  { src: "assets/photos/photo6.jpg", caption: "Légende 6 ✏️" }
];
