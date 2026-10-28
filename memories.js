/* =========================================================
   memories.js — LA TIMELINE + LES PHOTOS
   ========================================================= */

/* ---------- 📖 Our Story ----------
   Ordre = ordre d'affichage (ordre chronologique).
   photos : liste d'images dans assets/photos/ (peut être vide [])
   video  : (optionnel) une vidéo dans assets/video/

   👉 POUR AJOUTER UN SOUVENIR : copie ce bloc, colle-le à la bonne
   place dans la liste (n'oublie pas la virgule entre deux blocs) :

   {
     date: "JJ/MM/AAAA",
     emoji: "💕",
     title: "Titre du souvenir",
     text: `<p>Ce qui s'est passé…</p>`,
     photos: ["assets/photos/mon-image.jpg"]
   },
*/
const MEMORIES = [
  {
    date: "21/07/2025",
    emoji: "📱",
    title: "The follow",
    text: `<p>Followitini f Instagram… w bdina nhdro 3la l'études, 3la lmotorat, w 3la lkhedma dialek. Ma3reftch b9it chhal ghadi tweli mohim f hyati. 🤍</p>`,
    photos: []
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
    photos: []
  },
  {
    date: "Ramadan 2026",
    emoji: "🌙",
    title: "The beach at night",
    text: `
      <p>Kna bjouj 9bala l b7ar blil, f Ramadan. B9ina bjouj, hdrna… <em>we kissed and hugged each other.</em></p>
      <p>Dik sa3a kna mfahmin w frhanin bzaf. 🌊</p>`,
    photos: ["assets/photos/ramadan-beach.jpg"]
  },
  {
    date: "02/03/2026",
    emoji: "🌧️",
    title: "Rain night",
    text: `<p>Wa7d nhar zwin… khrejna blil w ta7t 3lina chta. B9ina kandhko, kna frhanin bzaaf.</p>`,
    photos: ["assets/photos/rain-night.jpg"]
  },
  {
    date: "26/03/2026",
    emoji: "🏍️",
    title: "Quad day",
    text: `<p>Activité de quad drnaha ensemble.</p>`,
    photos: ["assets/photos/quad.jpg"]
  },
  {
    date: "10/04/2026",
    emoji: "🎯",
    title: "Paintball day",
    text: `<p>Activité drnaha m3a 2 amis dialna. Daz nhar zwin bzaf, dhekna fih… w kont frhana w ana m3ak.</p>`,
    photos: ["assets/photos/paintball.jpg"]
  },
  {
    date: "02/05/2026",
    emoji: "🧸",
    title: "Game center night",
    text: `
      <p>Kna f wa7d centre de jeux blil. Dhekna, l3bna, w daz w9t zwin bzaf.</p>
      <p>3jbni dak l moment fach kont kathawl takhd lia chi haja… wakha failed 😅 walakin fre7t. <strong>Kay3jbni nchoufek katdir chi haja 3la 9bli.</strong></p>`,
    photos: ["assets/photos/game-center.jpg"],
    video: "assets/video/game-center.mp4"
  },
  {
    date: "28/08/2026",
    emoji: "📸",
    title: "Photobooth day",
    text: ``,
    photos: ["assets/photos/photobooth.jpg"]
  },
  {
    date: "17/10/2026",
    emoji: "🤍",
    title: "The day you stayed",
    text: `
      <p>Kont 3yana w 3ndi machakil… w nta dwezti m3aya nhar kaml bach nrta7.</p>
      <p>Dak nhar fhemt chno hiya l'amour : you were there when I needed you most.</p>`,
    photos: []
  }
];

/* ---------- 📸 Us (polaroids) ---------- */
const PHOTOS = [
  { src: "assets/photos/quad-selfie.jpg", caption: "Quad day 🏍️" },
  { src: "assets/photos/paintball-selfie.jpg", caption: "Paintball day 🎯" },
  { src: "assets/photos/photobooth-day.jpg", caption: "28/08 📸" },
  { src: "assets/photos/bracelets.jpg", caption: "Our bracelets, mazal 3ndna 🤍" }
];

/* ---------- 🥺 What I miss about you ----------
   Les captures de vos appels vidéo */
const MISS_PHOTOS = [
  "assets/photos/call-1.jpg",
  "assets/photos/call-2.jpg",
  "assets/photos/call-3.jpg",
  "assets/photos/call-4.jpg"
];
