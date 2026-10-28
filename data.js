/* =========================================================
   data.js — TOUS LES TEXTES DU SITE
   Pour changer un texte : modifie-le ici, enregistre,
   puis recharge la page. Pas besoin de toucher script.js.
   ========================================================= */

const CONFIG = {
  // Mot de passe : seulement les CHIFFRES de la date.
  // "21/07/25", "21-07-2025", "21072025"… sont tous acceptés.
  passwords: ["210725", "21072025"],

  // 👉 À REMPLACER par ton numéro (format international, sans espaces)
  phone: "+2126XXXXXXXX",

  // 👉 Mets le fichier de la chanson ici (voir README)
  music: "assets/music/saison.mp3"
};

/* ---------- 💗 Reasons I love you ---------- */
const REASONS = [
  { emoji: "🎀", darija: "Hit kat3aml m3aya zwin", english: "Because you treat me so gently." },
  { emoji: "🤍", darija: "Hit katrd lia lbal", english: "Because you take care of me." },
  { emoji: "💍", darija: "Hit kanchouf fik rajli dial lmosta9bal", english: "Because I see my future husband in you." },
  { emoji: "✨", darija: "Hit nta capable, responsable w ambitieux", english: "Because you're strong, responsible and you know where you're going." },
  { emoji: "🏍️", darija: "Hit 3ndek goals w baghi twsl lihom", english: "Because you chase your dreams, and I'm proud of you." },
  { emoji: "🥹", darija: "Hit dima katgoul lia \"I want to make it so I can marry you as soon as possible\"", english: "Because you're building our future." },
  { emoji: "☁️", darija: "Hit m3ak kanhes b le confort", english: "Because with you, I feel at home." },
  { emoji: "🫶", darija: "Hit n9dr n3awd lik kolchi w ana mrtaha", english: "Because I can tell you everything and feel at peace." }
];

/* ---------- 💌 Open when… ----------
   showCall: true => ajoute le bouton 📞 Call me sous la lettre */
const OPEN_WHEN = [
  {
    emoji: "😮‍💨",
    label: "you're stressed",
    showCall: false,
    body: `
      <p><strong>Souliiiiii,</strong></p>
      <p>Ila kont 3yan wla 3ndek chi mochkil, 3erf belli ana hna. Kanbghik, w ghadi nkoun dima m3ak w9tma htajitini.</p>
      <p>Ji 3ndi, 3awd lia. Ana ghadi nsm3 lik w nhess bik.</p>
      <p>Please, 3mrek ma thrab mni f lw9t li 3ndek fih lmachakil. Bl3eks, hadak howa lw9t li bghit nkoun fih 9rib lik.</p>
      <p><strong>I want to be your safe place, your coin de confort.</strong> 🤍</p>
      <p class="sign">— Lfnikicha dialek</p>`
  },
  {
    emoji: "🥺",
    label: "you miss me",
    showCall: true,
    body: `
      <p><strong>Souliiiiii,</strong></p>
      <p>Hta ana twehechtek… w dima kantwehchek. 🥺</p>
      <p>Makrehtch nkoun dima m3ak, hdak. Ila kont frhan wla m9l9, 3ndek l'énergie wla 3yan, khdam wla free… makrehtch nkoun m3ak f ga3 l aw9at, w nb9a ghir m3n9ak.</p>
      <p>Nhar kaml kanb9a nfkr fik. <strong>My mind is always with you.</strong> 🤍</p>
      <p class="sign">— Lfnikicha dialek</p>`
  },
  {
    emoji: "🌙",
    label: "you can't sleep",
    showCall: true,
    body: `
      <p><strong>Souliiiiii,</strong></p>
      <p>3la mafikch n3as ? 3ndek chi mochkil, wla chi haja m9l9ak ?</p>
      <p>Ila bghiti thdr m3aya wla t3awd lia chi haja, ana hna, kansm3 lik. 🤍</p>
      <p>Bghiti nhdro, nl3bo, wla ntfrjo f chi haja hta yjik n3as ? <strong>Call me, I'm here.</strong> 📞</p>
      <p>W matnsach : w9tma htajitini, ana dima ghadi nkoun m3ak.</p>
      <p><strong>Sweet dreams, Souliiiiii.</strong> 💤</p>
      <p class="sign">— Lfnikicha dialek</p>`
  },
  {
    emoji: "😤",
    label: "you're angry",
    showCall: true,
    body: `
      <p><strong>Alkbida diali,</strong></p>
      <p>Achno 3sbek ? Wach chi haja chftiha mni ? Wla 3ndek chi mochkil m3a la famille wla f lkhedma ?</p>
      <p>Madirch f balek. Chno ma kan lmochkil, ghadi ykoun 3ndo lhel. <strong>Lmohim nta tkoun bikhir.</strong> 🤍</p>
      <p>Ila kant chi haja n9dr n3awnk fiha, golha lia.</p>
      <p>W ila kant chi haja drtha ana w 3sbatk… <strong>smhli.</strong> W dir f balek : chno ma w9e3, ghanb9a dima kanbghik.</p>
      <p>Aji nhdro w nhllo had lmochkil. Golia chno 9l9ek, w ana ghadi nchre7 lik, w nhawl ntfada dakchi li 3sbek… <strong>so we can always stay happy together.</strong> 💕</p>
      <p class="sign">— Lfnikicha dialek</p>`
  }
];

/* ---------- 🏍️ Moto corner ---------- */
const MOTO = `
  <p class="moto-name">🏍️ Docker R 200</p>
  <p class="moto-big">Ride safe, Souliiiiii. 🤍</p>
  <p>Rd lbal l rask f tri9.</p>
  <p>W dir f balek belli kayna wa7d lbent katsnak… hit katbghik bzaaaf, w mabghatch tw9e3 lik chi haja khayba. 🥺</p>
  <p><em>So come back to me in one piece, okay ?</em> 🎀</p>`;

/* ---------- 😏 Bouton secret ---------- */
const DEBT = `<p class="debt-msg">baby debt 😏</p>`;

/* ---------- ✉️ Lettre finale ---------- */
const FINAL_LETTER = `
  <p><strong>Souliiiiii,</strong></p>
  <p>Ila wselti lhna, ya3ni chfti kolchi… w daba bghit nhdr m3ak mn 9elbi. 🤍</p>
  <p>Rah kanbghik bzaf. W matkhayelch ch7al kantwehchek.</p>
  <p>Kanfhem belli 3ndek maydar, belli katkoun khdam w mchghoul. Walakin <strong>ghay3jbni lhal bzaf ila hessit belli katkheli wa7d lw9ita f nharek lia.</strong> Ghir chwiya. Ghir bach n3ref belli ana f balek.</p>
  <p>W ila kont ghadi tt3tl, wla kont 3yan… golha lia. <em>« I'm tired, I'll talk to you tomorrow »</em> hiya ahsen mn sket. Hit fach katghber bla ma ngoul walo, kanb9a kantsnak w kankhaf 3lik.</p>
  <p>Kayb9a fia lhal fach kanchoufek saken 9rib lia… w makanchoufekch 3la ch7al.</p>
  <p>Bghit ngolik belli <strong>makayhemch fin ghanmchiw wla chno ghandiro.</strong> Ah, kay3jbni lhal ila mchina ndiro chi activité ensemble, walakin kaynin aw9at kanbghi ghir nkoun 7dak, n3n9ek, w ngles m3ak. <strong>Ghir lgelsa 7dak kafyani.</strong> 🫶</p>
  <p>W ila kan chi sabab li kaykhelik tghber 3lia… aji golo lia. Hit 9olt lik bach nbdaw <strong>sef7a jdida</strong>, w f sef7a jdida mkhasnach nkhebiw 3la b3diyatna.</p>
  <p>Ila bghiti nhdro f had sujet bach nhllo had lmochkil, golha lia. Ma3mrna ma ghadi ntkhasmo 3la hadchi.</p>
  <p><strong>I'm not going anywhere. I just want us back.</strong> 💕</p>
  <p class="sign">— Lfnikicha dialek</p>`;
