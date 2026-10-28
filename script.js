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
   --------------------------------------------------------- */
const musicBtn = $("#music-btn");
const audio = new Audio(CONFIG.music);
audio.loop = true;
audio.volume = 0.6;
let musicAvailable = true;

// Si le fichier mp3 n'existe pas, on cache le bouton
audio.addEventListener("error", () => {
  musicAvailable = false;
  musicBtn.classList.add("hidden");
});

function playMusic() {
  if (!musicAvailable) return;
  audio.play()
    .then(() => updateMusicButton())
    .catch(() => updateMusicButton());
  musicBtn.classList.remove("hidden");
}

function updateMusicButton() {
  const playing = !audio.paused;
  musicBtn.textContent = playing ? "🔊" : "🔇";
  musicBtn.setAttribute("aria-label", playing ? "Mute music" : "Play music");
}

musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(updateMusicButton).catch(updateMusicButton);
  } else {
    audio.pause();
    updateMusicButton();
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
    item.innerHTML = `
      <span class="tl-date">${memory.date}</span>
      <h3>${memory.emoji} ${memory.title}</h3>
      ${memory.text}
      ${memory.photo ? `<img src="${memory.photo}" alt="${memory.title}" loading="lazy">` : ""}
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
  return `<a class="btn btn-call" href="tel:${CONFIG.phone}" data-call>📞 Call me</a>`;
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
passwordInput.focus();
