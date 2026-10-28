/* =========================================================
   script.js — toute l'interactivité du site
   Les TEXTES sont dans data.js et memories.js.
   ========================================================= */

// Petit raccourci pour sélectionner un élément
const $ = (selector) => document.querySelector(selector);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------
   1. MOT DE PASSE
   On garde seulement les chiffres de ce qu'il tape,
   donc "21/07/25" et "21-07-2025" marchent tous les deux.
   ⚠️ Un mot de passe en JavaScript n'est PAS une vraie
   sécurité : quelqu'un qui lit le code peut le trouver.
   --------------------------------------------------------- */
const lockScreen = $("#lock-screen");
const lockForm = $("#lock-form");
const passwordInput = $("#password");
const lockError = $("#lock-error");

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

lockForm.addEventListener("submit", (event) => {
  event.preventDefault(); // empêche la page de se recharger

  if (CONFIG.passwords.includes(onlyDigits(passwordInput.value))) {
    hideScreen(lockScreen, () => {
      envelopeScreen.classList.remove("hidden");
      envelope.focus();
    });
  } else {
    lockError.textContent = "Mmm… ghalat 🙈 try again";
    lockForm.classList.remove("shake");
    void lockForm.offsetWidth; // relance l'animation
    lockForm.classList.add("shake");
    passwordInput.select();
  }
});

// Fait disparaître un écran en fondu, puis appelle "then"
function hideScreen(screen, then) {
  screen.classList.add("fade-out");
  setTimeout(() => {
    screen.classList.add("hidden");
    if (then) then();
  }, 500);
}

/* ---------------------------------------------------------
   2. ENVELOPPE
   --------------------------------------------------------- */
const envelopeScreen = $("#envelope-screen");
const envelope = $("#envelope");
const main = $("#main");
let envelopeOpened = false;

envelope.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;

  envelope.classList.add("open");
  playMusic(); // le clic autorise le son sur mobile
  burstHearts(20, "up");

  setTimeout(() => {
    hideScreen(envelopeScreen, () => {
      main.classList.remove("hidden");
      window.scrollTo(0, 0);
      $("#hero-title").focus();
      startFloatingHearts();
    });
  }, 1500);
});

/* ---------------------------------------------------------
   3. MUSIQUE
   Deux possibilités (choisies dans data.js → CONFIG.music) :
   - CONFIG.music = ""  → une petite boîte à musique ORIGINALE,
     jouée en direct par le navigateur (Web Audio API).
     Aucun fichier, aucun droit d'auteur.
   - CONFIG.music = "assets/music/xxx.mp3" → ton fichier audio.
   --------------------------------------------------------- */
const musicBtn = $("#music-btn");

/* ---- A. Boîte à musique générée ---- */
function createMusicBox() {
  let ctx = null;        // le "studio" audio du navigateur
  let master, delay;     // volume général + petit écho doux
  let timer = null;
  let nextTime = 0;      // moment où jouer la prochaine note
  let step = 0;          // position dans la mélodie (en croches)

  const BEAT = 60 / 66;  // tempo lent : 66 battements par minute
  const EIGHTH = BEAT / 2;

  // 8 mesures : Do – Lam – Fa – Sol (x2). Notes en numéros MIDI (60 = Do)
  const CHORDS = [
    [60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62],
    [60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]
  ];
  // Mélodie : une note par temps (4 par mesure)
  const MELODY = [
    76, 79, 76, 74,   72, 76, 74, 72,   69, 72, 77, 76,   74, 71, 74, 79,
    76, 79, 81, 79,   76, 72, 76, 74,   72, 77, 76, 72,   74, 79, 74, 71
  ];
  const ARP = [0, 1, 2, 1, 0, 1, 2, 1]; // ordre des notes de l'arpège

  const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  // Une note "boîte à musique" : son pur qui s'éteint doucement
  function pluck(midi, time, volume, length) {
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.exponentialRampToValueAtTime(volume, time + 0.01);
    env.gain.exponentialRampToValueAtTime(0.0001, time + length);
    env.connect(master);
    env.connect(delay);

    [[1, 1], [2.003, 0.25], [3.01, 0.06]].forEach(([ratio, gain]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq(midi) * ratio;
      g.gain.value = gain;
      osc.connect(g).connect(env);
      osc.start(time);
      osc.stop(time + length + 0.05);
    });
  }

  // Programme les notes un peu à l'avance pour un rythme parfait
  function schedule() {
    while (nextTime < ctx.currentTime + 0.25) {
      const bar = Math.floor(step / 8) % CHORDS.length;
      const inBar = step % 8;
      const chord = CHORDS[bar];

      pluck(chord[ARP[inBar]], nextTime, 0.05, 1.6);            // arpège
      if (inBar === 0) pluck(chord[0] - 12, nextTime, 0.07, 2.6); // basse
      if (inBar % 2 === 0) {                                      // mélodie
        pluck(MELODY[(bar * 4 + inBar / 2) % MELODY.length], nextTime, 0.09, 2.2);
      }
      nextTime += EIGHTH;
      step++;
    }
  }

  function setup() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    ctx = new AudioCtx();

    master = ctx.createGain();
    master.gain.value = 0.8;
    const soft = ctx.createBiquadFilter(); // adoucit les aigus
    soft.type = "lowpass";
    soft.frequency.value = 3200;
    master.connect(soft).connect(ctx.destination);

    delay = ctx.createDelay();
    delay.delayTime.value = EIGHTH * 1.5;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(soft);
    return true;
  }

  return {
    play() {
      if (!ctx && !setup()) return Promise.reject();
      return ctx.resume().then(() => {
        if (!timer) {
          nextTime = ctx.currentTime + 0.1;
          timer = setInterval(schedule, 50);
        }
      });
    },
    pause() {
      return ctx ? ctx.suspend() : Promise.resolve();
    },
    isPlaying() {
      return !!ctx && ctx.state === "running";
    }
  };
}

/* ---- B. Fichier audio (mp3 / m4a) ---- */
function createFilePlayer(src) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.6;
  audio.addEventListener("error", () => musicBtn.classList.add("hidden"));
  return {
    play: () => audio.play(),
    pause: () => audio.pause(),
    isPlaying: () => !audio.paused
  };
}

const player = CONFIG.music ? createFilePlayer(CONFIG.music) : createMusicBox();

function updateMusicButton() {
  const playing = player.isPlaying();
  musicBtn.textContent = playing ? "🔊" : "🔇";
  musicBtn.setAttribute("aria-label", playing ? "Mute music" : "Play music");
}

function playMusic() {
  musicBtn.classList.remove("hidden");
  player.play().then(updateMusicButton).catch(updateMusicButton);
}

musicBtn.addEventListener("click", () => {
  if (player.isPlaying()) {
    Promise.resolve(player.pause()).then(updateMusicButton);
  } else {
    playMusic();
  }
});

/* ---------------------------------------------------------
   4. TIMELINE (Our Story) — construite depuis MEMORIES
   --------------------------------------------------------- */
function renderTimeline() {
  const list = $("#timeline");
  MEMORIES.forEach((memory) => {
    const item = document.createElement("li");
    item.className = "tl-item";
    const photos = memory.photos || [];
    const photosHtml = photos
      .map((src) => `<img src="${src}" alt="${memory.title}" loading="lazy">`)
      .join("");
    // vidéo : muette au départ, il peut activer le son avec les contrôles
    const videoHtml = memory.video
      ? `<video src="${memory.video}" controls muted playsinline loop preload="metadata"></video>`
      : "";
    const media = photosHtml || videoHtml
      ? `<div class="tl-media">${photosHtml}${videoHtml}</div>`
      : "";

    item.innerHTML = `
      <span class="tl-date">${memory.date}</span>
      <h3>${memory.emoji} ${memory.title}</h3>
      ${memory.text}
      ${media}
    `;
    list.appendChild(item);
  });
}

/* ---------------------------------------------------------
   5. REASONS — chaque tap affiche la raison suivante
   --------------------------------------------------------- */
const reasonCard = $("#reason-card");
let reasonIndex = 0;

function showReason() {
  const reason = REASONS[reasonIndex];
  reasonCard.querySelector(".reason-emoji").textContent = reason.emoji;
  reasonCard.querySelector(".reason-darija").textContent = reason.darija;
  reasonCard.querySelector(".reason-english").textContent = reason.english;
  $("#reason-count").textContent = `${reasonIndex + 1} / ${REASONS.length}`;
}

reasonCard.addEventListener("click", () => {
  reasonCard.classList.remove("flip");
  void reasonCard.offsetWidth;
  reasonCard.classList.add("flip");
  // on change le texte au milieu de l'animation (carte "de profil")
  setTimeout(() => {
    reasonIndex = (reasonIndex + 1) % REASONS.length; // revient au début après la dernière
    showReason();
  }, reducedMotion ? 0 : 250);
});

/* ---------------------------------------------------------
   6. OPEN WHEN… — une carte par lettre
   --------------------------------------------------------- */
function renderOpenWhen() {
  const grid = $("#ow-grid");
  OPEN_WHEN.forEach((letter) => {
    const card = document.createElement("button");
    card.className = "ow-card";
    card.innerHTML = `
      <span class="ow-emoji" aria-hidden="true">${letter.emoji}</span>
      <span class="ow-small">Open when…</span>
      <span class="ow-label">${letter.label}</span>
    `;
    card.addEventListener("click", () => {
      openModal(`
        <p class="modal-kicker">Open when…</p>
        <h3>${letter.label} ${letter.emoji}</h3>
        <div class="letter">${letter.body}</div>
        ${letter.showCall ? callButton() : ""}
      `);
    });
    grid.appendChild(card);
  });
}

/* ---------------------------------------------------------
   7. PHOTOS (polaroids)
   --------------------------------------------------------- */
function renderPhotos() {
  const wrap = $("#polaroids");
  PHOTOS.forEach((photo) => {
    const figure = document.createElement("figure");
    figure.className = "polaroid";

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = "lazy";
    // Si l'image n'existe pas encore : cadre rose à la place
    img.addEventListener("error", () => {
      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder";
      placeholder.textContent = "📸";
      img.replaceWith(placeholder);
    });

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;

    figure.append(img, caption);
    wrap.appendChild(figure);
  });
}

/* ---------------------------------------------------------
   7 bis. WHAT I MISS ABOUT YOU — captures d'appels façon écran de téléphone
   --------------------------------------------------------- */
function renderMiss() {
  const calls = $("#miss-calls");
  MISS_PHOTOS.forEach((src) => {
    const phone = document.createElement("div");
    phone.className = "call-phone";
    phone.innerHTML = `
      <img src="${src}" alt="Our video call" loading="lazy">
      <span class="call-badge">📞 calling…</span>
    `;
    calls.appendChild(phone);
  });
  $("#miss-text").innerHTML = MISS;
}

/* ---------------------------------------------------------
   8. MOTO, DEBT, LETTRE FINALE
   --------------------------------------------------------- */
$("#moto-card").innerHTML = MOTO;

$("#debt-btn").addEventListener("click", () => {
  openModal(DEBT);
  burstHearts(30, "down");
});

$("#final-envelope").addEventListener("click", () => {
  openModal(`
    <p class="modal-kicker">One last thing…</p>
    <h3>For you 🤍</h3>
    <div class="letter">${FINAL_LETTER}</div>
    ${callButton()}
  `);
  burstHearts(16, "up");
});

/* ---------------------------------------------------------
   9. BOUTON "CALL ME"
   --------------------------------------------------------- */
function callButton() {
  // le numéro est aussi affiché en texte, au cas où le lien ne s'ouvre pas
  return `
    <a class="btn btn-call" href="tel:${CONFIG.phone}" data-call>📞 Call me</a>
    <p class="call-number">${CONFIG.phoneDisplay}</p>`;
}

// Si le numéro n'a pas encore été rempli dans data.js
document.addEventListener("click", (event) => {
  if (event.target.closest("[data-call]") && CONFIG.phone.includes("X")) {
    event.preventDefault();
    showToast("Ajoute ton numéro dans data.js 📞");
  }
});

/* ---------------------------------------------------------
   10. FENÊTRE MODALE (pour toutes les lettres)
   --------------------------------------------------------- */
const backdrop = $("#modal-backdrop");
const modalBody = $("#modal-body");
const modalClose = $("#modal-close");
let lastFocused = null;

function openModal(html) {
  lastFocused = document.activeElement;
  modalBody.innerHTML = html;
  backdrop.classList.remove("hidden");
  backdrop.querySelector(".modal").scrollTop = 0;
  document.body.style.overflow = "hidden"; // bloque le scroll derrière
  modalClose.focus();
}

function closeModal() {
  backdrop.classList.add("hidden");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

modalClose.addEventListener("click", closeModal);
// clic en dehors de la fenêtre = fermer
backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) closeModal();
});
// touche Échap = fermer
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !backdrop.classList.contains("hidden")) closeModal();
});

/* ---------------------------------------------------------
   11. PETIT MESSAGE (toast)
   --------------------------------------------------------- */
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ---------------------------------------------------------
   12. CŒURS
   --------------------------------------------------------- */
const HEART_ICONS = ["💗", "🤍", "🎀", "💕", "✨"];

// front = true => le cœur passe devant tout (pour les "explosions")
function spawnHeart(direction, front = false) {
  const heart = document.createElement("span");
  heart.className = `heart ${direction}${front ? " front" : ""}`;
  heart.textContent = HEART_ICONS[Math.floor(Math.random() * HEART_ICONS.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 18 + "px";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  heart.style.setProperty("--sway", (Math.random() * 80 - 40) + "px");
  // on supprime le cœur quand son animation est finie
  heart.addEventListener("animationend", () => heart.remove());
  document.body.appendChild(heart);
}

function burstHearts(count, direction) {
  if (reducedMotion) return;
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnHeart(direction, true), i * 80);
  }
}

function startFloatingHearts() {
  if (reducedMotion) return;
  setInterval(() => spawnHeart("up"), 1600);
}

/* ---------------------------------------------------------
   DÉMARRAGE
   --------------------------------------------------------- */
renderTimeline();
showReason();
renderOpenWhen();
renderPhotos();
renderMiss();
passwordInput.focus();
