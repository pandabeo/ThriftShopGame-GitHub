const ASSET = (path) => `./Assets/${path}`;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const screens = {
  title: $("#titleScreen"),
  character: $("#characterScreen"),
  shop: $("#shopScreen"),
  photo: $("#photoScreen"),
};

// Same item counts as the Unity scenes. The excluded Mouse cursor object is
// intentionally not shown as a clothing choice.
const stages = [
  {
    slot: "top",
    eyebrow: "LOOK 1 / 3 · PICK TOP",
    title: "Pick a top",
    copy: "Kéo một chiếc áo vào model bên trái để mặc ngay. Click item chỉ phát âm thanh.",
    items: [
      { id: "top-check", name: "Top 1", tag: "TOP / 01", image: "Clothes Model/Clothes Material/20231205_Ucs1K6DbF5.jpeg" },
      { id: "top-racing", name: "Top 2", tag: "TOP / 02", image: "Clothes Model/Bơ Bơ Rỳ - Trước.png" },
      { id: "top-plaid", name: "Top 3", tag: "TOP / 03", image: "Clothes Model/Clothes Material/O1CN014NIiF02Bx5MgFBylZ_134348404-2.jpg" },
      { id: "top-black", name: "Top 6", tag: "TOP / 05", image: "Clothes Model/Clothes Material/shopee-2000-x-2500-px-33.jpg" },
      { id: "top-print", name: "Top 7", tag: "TOP / 06", image: "Clothes Model/Clothes Material/ao-bodysuit-khong-tay-co-lo-hong-u2l76_3df2aabedada4268a7330f7a7465df84_master.png" },
      { id: "top-cobalt", name: "Top 8", tag: "TOP / 07", image: "Clothes Model/Clothes Material/Thiết-kế-và-in-áo-lớp-Galaxy-1.jpg", femaleImage: "Clothes Model/Clothes Material/vn-11134207-7qukw-lk8aghei0xbo2b.jpg" },
      { id: "top-ivory", name: "Top 9", tag: "TOP / 08", image: "Clothes Model/Clothes Material/6148O7PbJWL._UY1100_.jpg" },
    ],
  },
  {
    slot: "bottom",
    eyebrow: "LOOK 2 / 3 · PICK BOTTOM",
    title: "Pick a bottom",
    copy: "Kéo một chiếc quần vào model bên trái để mặc ngay. Một lượt chỉ giữ một món.",
    items: [
      { id: "bottom-banana", name: "Bottom 1", tag: "BOTTOM / 01", image: "Clothes Model/Quần Chuối - Trước.png" },
      { id: "bottom-banana-2", name: "Bottom 2", tag: "BOTTOM / 02", image: "MainCharacterModel/Quần Chuối - Trước.png" },
      { id: "bottom-cargo", name: "Bottom 3", tag: "BOTTOM / 03", image: "MainCharacterModel/Quần Bơ Bơ Rỳ - Trước.png" },
      { id: "bottom-floral", name: "Bottom 4", tag: "BOTTOM / 04", image: "Clothes Model/Clothes Material/chan-vay-xoe-dang-midi-mau-trang-cv07-31.png" },
      { id: "bottom-pants", name: "Bottom 5", tag: "BOTTOM / 05", image: "Clothes Model/Clothes Material/chan_vay_nhung_2_18c352c1d5284bde91f8cc79769a76dd_7c583d18761b44c39198f5af65774c7e.jpg" },
      { id: "bottom-mix", name: "Bottom 6", tag: "BOTTOM / 06", image: "Clothes Model/Clothes Material/8936053054290.jpg.png" },
      { id: "bottom-army", name: "Bottom 7", tag: "BOTTOM / 07", image: "Clothes Model/Clothes Material/c52edfc33f24d6d372b5fd592f0a9abb.jpg" },
      { id: "bottom-cream", name: "Bottom 8", tag: "BOTTOM / 08", image: "MainCharacterModel/Quần Bơ Bơ Rỳ - Sau.png" },
    ],
  },
  {
    slot: "shoes",
    eyebrow: "LOOK 3 / 3 · PICK SHOES",
    title: "Pick top + shoes",
    copy: "Kéo một đôi giày vào model bên trái. Đây là lượt 3/3 trước khi chụp ảnh.",
    items: [
      { id: "shoe-camel", name: "Shoes 1", tag: "SHOES / 01", image: "Clothes Model/Clothes Material/images.jpg" },
      { id: "shoe-mix", name: "Shoes 2", tag: "SHOES / 02", image: "Clothes Model/Clothes Material/IMG_1150-scaled.jpg" },
      { id: "shoe-flats", name: "Shoes 3", tag: "SHOES / 03", image: "Clothes Model/Clothes Material/Pfhytec-LU-Bowknot-Ballet-Flats-Womens-Pointy-Toe-Flat-Shoes-Suede-Dress-Shoes-Wear-to-Work-Slip-On-.png" },
      { id: "shoe-boots", name: "Shoes 4", tag: "SHOES / 04", image: "Clothes Model/Clothes Material/pngtree-pair-of-vintage-brown-cowboy-boots-with-a-worn-look-png-image_14813052.png" },
      { id: "shoe-color", name: "Shoes 5", tag: "SHOES / 05", image: "Clothes Model/Clothes Material/6640f7c3679b6e584f7ee914-yezmo-toe-shoe-charms-3d-big-toe-shoe.jpg" },
      { id: "shoe-vintage", name: "Shoes 7", tag: "SHOES / 06", image: "Clothes Model/Clothes Material/top-down-view-of-a-pair-of-meindl-lace-up-fabric-and-leather-walking-shoes-isolated-on-a-white-background-from-above-german-manufacturer-2C8FH43.jpg" },
      { id: "shoe-high", name: "Shoes 8", tag: "SHOES / 07", image: "Clothes Model/Clothes Material/S3d97033a71a24d61b30794a62239b266d.png" },
    ],
  },
];

const chosen = { top: null, bottom: null, shoes: null };
let currentStage = 0;
let selectedCharacter = "PANDA";
let toastTimer = null;
let photoReturnTimer = null;
let paused = false;
let dragState = null;
let threeReady = false;
let threeUiReady = false;
let characterLoading = false;
let workspaceOpen = false;

const sounds = {
  menu: "SFX (1)/Menu BGM.mp3",
  game: "SFX (1)/Ingame BGM.mp3",
  click: "SFX (1)/Click.mp3",
  hover: "SFX (1)/Hover.mp3",
  start: "SFX (1)/Start Game.mp3",
  switch: "SFX (1)/Switch Scene.mp3",
  camera: "SFX (1)/Camera.mp3",
  final: "SFX (1)/Drum Roll Final.mp3",
};

const audioState = { enabled: true, currentMusic: null };

function syncThreeScene() {
  const kind = selectedCharacter === "PANDA" ? "male" : "female";
  window.dispatchEvent(new CustomEvent("three-game-state", {
    detail: {
      kind,
      stage: currentStage,
      outfit: [chosen.top, chosen.bottom, chosen.shoes].filter(Boolean),
      photo: screens.photo.classList.contains("active"),
    },
  }));
}

function updatePreloadStatus(detail = {}) {
  if (detail.phase && detail.phase !== "critical") return;
  const loaded = Number(detail.loaded) || 0;
  const total = Number(detail.total) || 0;
  const status = $("#preloadStatus");
  if (!status || !total) return;
  status.textContent = `Đang tải model 3D · ${loaded}/${total}`;
}

window.addEventListener("three-preload-progress", (event) => updatePreloadStatus(event.detail));
function enableStartButtons() {
  threeUiReady = true;
  const startButton = $("#startButton");
  const modalStartButton = $("#modalStartButton");
  if (startButton) {
    startButton.disabled = false;
    startButton.innerHTML = "Bắt đầu đi thrift <span>→</span>";
  }
  if (modalStartButton) modalStartButton.disabled = false;
  const status = $("#preloadStatus");
  if (status) status.textContent = "MENU READY · CHỌN NHÂN VẬT";
}

window.addEventListener("three-ui-ready", enableStartButtons);
window.addEventListener("three-ready", () => {
  threeReady = true;
});
window.addEventListener("three-ready", syncThreeScene);

function moveThreeViewportFor(screen) {
  const viewport = $("#threeViewport");
  const destination = screen === screens.photo ? $("#photoThreeSlot") : $("#threeViewportSlot");
  if (viewport && destination && viewport.parentElement !== destination) destination.appendChild(viewport);
}

function setScreen(screen) {
  Object.values(screens).forEach((element) => element.classList.remove("active"));
  screen.classList.add("active");
  if (screen === screens.shop || screen === screens.photo) moveThreeViewportFor(screen);
}

function playSfx(name) {
  if (!audioState.enabled || !sounds[name]) return;
  const audio = new Audio(ASSET(sounds[name]));
  audio.volume = 0.32;
  audio.play().catch(() => {});
}

function playMusic(type) {
  if (!audioState.enabled) return;
  const path = sounds[type];
  if (!path) return;
  if (audioState.currentMusic && audioState.currentMusic.src.endsWith(encodeURI(path))) return;
  if (audioState.currentMusic) audioState.currentMusic.pause();
  const audio = new Audio(ASSET(path));
  audio.loop = true;
  audio.volume = 0.15;
  audioState.currentMusic = audio;
  audio.play().catch(() => {});
}

function updateAudioButton() {
  $("#audioButton").textContent = audioState.enabled ? "♪" : "×";
  $("#audioButton").setAttribute("aria-label", audioState.enabled ? "Tắt âm thanh" : "Bật âm thanh");
}

function toggleAudio() {
  audioState.enabled = !audioState.enabled;
  if (!audioState.enabled && audioState.currentMusic) audioState.currentMusic.pause();
  if (audioState.enabled) playMusic(screens.title.classList.contains("active") ? "menu" : "game");
  updateAudioButton();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

function openHelp() { $("#helpModal").hidden = false; }
function closeHelp() { $("#helpModal").hidden = true; }

function clearBasketForStage() {
  const basket = $("#basketItem");
  const card = basket?.querySelector(".item-card");
  if (card) card.remove();
  if (basket) basket.innerHTML = `<span class="basket-placeholder">Chưa chọn item</span>`;
}

function resetRun(returnToTitle = true) {
  clearTimeout(photoReturnTimer);
  chosen.top = null;
  chosen.bottom = null;
  chosen.shoes = null;
  currentStage = 0;
  selectedCharacter = "PANDA";
  paused = false;
  $("#pauseModal").hidden = true;
  clearBasketForStage();
  $("#photoWall")?.classList.remove("is-hidden");
  $("#ratingText")?.classList.remove("is-hidden");
  playMusic(returnToTitle ? "menu" : "game");
  setScreen(returnToTitle ? screens.title : screens.character);
  syncThreeScene();
}

function resetGame() { resetRun(true); }
function returnToCharacterSelection() { resetRun(false); }

function setCharacterCardsLoading(active, gender = "") {
  $$(".character-card").forEach((card) => {
    card.disabled = active;
    card.classList.toggle("is-loading", active && card.dataset.gender === gender);
    const caption = card.querySelector(".character-info small");
    if (!caption) return;
    if (active && card.dataset.gender === gender) {
      caption.dataset.previousLabel = caption.textContent;
      caption.textContent = "LOADING WARDROBE...";
    } else if (!active && caption.dataset.previousLabel) {
      caption.textContent = caption.dataset.previousLabel;
      delete caption.dataset.previousLabel;
    }
  });
}

async function selectCharacter(gender) {
  if (!threeUiReady || characterLoading) return;
  characterLoading = true;
  setCharacterCardsLoading(true, gender);
  selectedCharacter = gender === "male" ? "PANDA" : "CVRIX";
  currentStage = 0;
  chosen.top = null;
  chosen.bottom = null;
  chosen.shoes = null;
  await window.threeShop?.prepareForGame(gender);
  characterLoading = false;
  setCharacterCardsLoading(false);
  playSfx("start");
  playMusic("game");
  renderShop();
  setScreen(screens.shop);
  syncThreeScene();
}

function currentItems() { return stages[currentStage].items; }
function currentSlot() { return stages[currentStage].slot; }
function itemImage(item) {
  return selectedCharacter === "CVRIX" && item.femaleImage ? item.femaleImage : item.image;
}

function renderBasket() {
  const item = chosen[currentSlot()];
  const basket = $("#basketItem");
  const card = basket?.querySelector(".item-card");
  $("#basketCount").textContent = item ? "1 ITEM" : "EMPTY";
  $("#continueButton").disabled = !item;
  $("#continueButton").hidden = !item;
  if (!item && !card) basket.innerHTML = `<span class="basket-placeholder">Chưa chọn item</span>`;
}

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function restoreCardToGrid(card, nearBasket = false) {
  const grid = $("#itemGrid");
  if (!card || !grid) return;
  if (card.parentElement !== grid) grid.appendChild(card);
  card.classList.remove("is-in-basket", "is-dragging");
  card.style.position = "absolute";
  card.style.zIndex = "3";
  const gridRect = grid.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const maxX = Math.max(0, gridRect.width - cardRect.width);
  const maxY = Math.max(0, gridRect.height - cardRect.height);
  const source = nearBasket ? { x: maxX * 0.72, y: maxY * 0.72 } : { x: Math.random() * maxX, y: Math.random() * maxY };
  card.style.left = `${clamp(source.x, 0, maxX)}px`;
  card.style.top = `${clamp(source.y, 0, maxY)}px`;
  card.style.transform = `rotate(${card.dataset.rotation || 0}deg)`;
}

function detachBasketCard() {
  const card = $("#basketItem").querySelector(".item-card");
  if (!card) return null;
  chosen[currentSlot()] = null;
  restoreCardToGrid(card, true);
  renderBasket();
  syncThreeScene();
  return card;
}

function placeCardInBasket(card) {
  if (!card) return;
  const item = currentItems().find((candidate) => candidate.id === card.dataset.itemId);
  if (!item) return;
  const basket = $("#basketItem");
  const oldCard = basket.querySelector(".item-card");
  if (oldCard && oldCard !== card) restoreCardToGrid(oldCard, true);
  basket.innerHTML = "";
  basket.appendChild(card);
  card.classList.remove("is-dragging");
  card.classList.add("is-in-basket");
  card.style.position = "relative";
  card.style.left = "";
  card.style.top = "";
  card.style.zIndex = "2";
  card.style.transform = "rotate(0deg)";
  chosen[currentSlot()] = item;
  renderBasket();
  syncThreeScene();
  playSfx("click");
  showToast(`${item.name} đã được mặc lên model.`);
}

function isInside(rect, x, y) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function startCardDrag(event) {
  if (event.button !== 0 || paused) return;
  const card = event.currentTarget;
  event.preventDefault();
  if (card.classList.contains("is-in-basket")) detachBasketCard();
  const rect = card.getBoundingClientRect();
  dragState = {
    card,
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  };
  card.setPointerCapture?.(event.pointerId);
  card.style.position = "fixed";
  card.style.left = `${rect.left}px`;
  card.style.top = `${rect.top}px`;
  card.classList.add("is-dragging");
  card.style.zIndex = "9999";
  document.body.appendChild(card);
}

function moveCardDrag(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  const { card } = dragState;
  card.style.left = `${event.clientX - dragState.offsetX}px`;
  card.style.top = `${event.clientY - dragState.offsetY}px`;
  card.style.transform = "rotate(0deg)";
  dragState.moved = dragState.moved || Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY) > 6;
  $("#basketDropzone").classList.toggle("is-over", isInside($("#basketDropzone").getBoundingClientRect(), event.clientX, event.clientY));
}

function endCardDrag(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  const { card, moved } = dragState;
  const overBasket = isInside($("#basketDropzone").getBoundingClientRect(), event.clientX, event.clientY);
  $("#basketDropzone").classList.remove("is-over");
  card.releasePointerCapture?.(event.pointerId);
  dragState = null;
  if (overBasket) {
    placeCardInBasket(card);
  } else {
    restoreCardToGrid(card, false);
    if (!moved) playSfx("click");
  }
}

function bindCard(card) {
  card.addEventListener("pointerdown", startCardDrag);
  card.addEventListener("pointerenter", () => playSfx("hover"));
}

function layoutItemCards() {
  const grid = $("#itemGrid");
  const gridRect = grid.getBoundingClientRect();
  const cards = $$("#itemGrid .item-card");
  if (!cards.length) return;
  const columns = gridRect.width >= 720 ? 4 : gridRect.width >= 480 ? 3 : 2;
  const cardWidth = cards[0].offsetWidth;
  const cardHeight = cards[0].offsetHeight;
  const horizontalGap = columns > 1 ? Math.max(12, (gridRect.width - columns * cardWidth) / (columns - 1)) : 0;
  const verticalGap = Math.min(24, Math.max(12, (gridRect.height - Math.ceil(cards.length / columns) * cardHeight) / Math.max(1, Math.ceil(cards.length / columns) - 1)));
  cards.forEach((card, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const maxX = Math.max(0, gridRect.width - card.offsetWidth);
    const maxY = Math.max(0, gridRect.height - card.offsetHeight);
    const rotation = Math.round(-6 + Math.random() * 12);
    card.dataset.rotation = rotation;
    card.style.left = `${clamp(column * (cardWidth + horizontalGap), 0, maxX)}px`;
    card.style.top = `${clamp(row * (cardHeight + verticalGap), 0, maxY)}px`;
    card.style.transform = `rotate(${rotation}deg)`;
  });
}

function renderShop() {
  const stage = stages[currentStage];
  $("#stageEyebrow").textContent = stage.eyebrow;
  $("#shopHeading").textContent = stage.title;
  $("#stageCopy").textContent = stage.copy;
  $("#lookProgress").textContent = `${currentStage + 1} / 3`;
  $("#continueButton").innerHTML = `${["Qua lượt quần", "Qua lượt giày", "Xem ending"][currentStage]} <span>→</span>`;
  $$("#stageSteps [data-stage-step]").forEach((step) => {
    const stepIndex = Number(step.dataset.stageStep);
    step.classList.toggle("is-active", stepIndex === currentStage);
    step.classList.toggle("is-done", stepIndex < currentStage);
  });
  const grid = $("#itemGrid");
  clearBasketForStage();
  grid.innerHTML = currentItems().map((item) => `
    <article class="item-card" data-item-id="${item.id}" aria-label="${item.name}">
      <img src="${ASSET(itemImage(item))}" alt="${item.name}" loading="lazy" draggable="false" />
      <div class="item-label"><span>${item.name}</span><span>${item.tag}</span></div>
    </article>
  `).join("");
  $$(".item-card").forEach(bindCard);
  renderBasket();
  syncThreeScene();
  requestAnimationFrame(layoutItemCards);
}

function goNextStage() {
  if (!chosen[stages[currentStage].slot]) return;
  playSfx("switch");
  if (currentStage < stages.length - 1) {
    currentStage += 1;
    renderShop();
  } else {
    showPhotoSession();
  }
}

function showPhotoSession() {
  setScreen(screens.photo);
  syncThreeScene();
  const rank = ["SSS", "B", "S", "F", "A"][Math.floor(Math.random() * 5)];
  $("#ratingText").textContent = rank;
  $("#photoTitle").textContent = `${selectedCharacter} walks out in full look.`;
  $("#photoCopy").textContent = "Ba camera chụp liên tiếp, hiện rating rồi tự quay lại màn chọn nhân vật như scene ShowChac.";
  const look = [chosen.top, chosen.bottom, chosen.shoes].filter(Boolean);
  $("#lookStack").innerHTML = look.map((item) => `<span class="look-chip"><img src="${ASSET(itemImage(item))}" alt="${item.name}" /></span>`).join("");
  $("#photoWall").innerHTML = look.map((item, index) => `
    <figure class="polaroid">
      <img src="${ASSET(itemImage(item))}" alt="${item.name}" />
      <figcaption>${item.name}</figcaption>
      <small>FRAME 0${index + 1} · ${item.tag}</small>
    </figure>
  `).join("");
  const flash = $("#photoFlash");
  [1000, 1800, 2600].forEach((delay) => {
    setTimeout(() => {
      if (!screens.photo.classList.contains("active")) return;
      flash.classList.remove("flash");
      void flash.offsetWidth;
      flash.classList.add("flash");
      playSfx("camera");
    }, delay);
  });
  setTimeout(() => {
    if (screens.photo.classList.contains("active")) playSfx("final");
  }, 3900);
  // ShowChac: hide photos after 5 seconds, then auto-transition after 10 more.
  setTimeout(() => {
    if (!screens.photo.classList.contains("active")) return;
    $("#photoWall").classList.add("is-hidden");
    $("#ratingText").classList.add("is-hidden");
    photoReturnTimer = setTimeout(returnToCharacterSelection, 10000);
  }, 8900);
}

function togglePause(force) {
  if (!screens.shop.classList.contains("active")) return;
  paused = typeof force === "boolean" ? force : !paused;
  $("#pauseModal").hidden = !paused;
}

function initializeFitWorkspace() {
  const overlay = $("#fitWorkspace");
  const viewport = $("#threeViewport");
  const originalSlot = $("#threeViewportSlot");
  const preview = $("#workspacePreview");
  const characterSelect = $("#workspaceCharacter");
  const itemSelect = $("#workspaceItem");
  const status = $("#workspaceStatus");
  const components = ["position", "scale", "rotation"];
  const currentTransform = () => Object.fromEntries(components.map((part) => [part, Object.fromEntries(
    [...document.querySelectorAll(`[data-axis="${part}"] input`)].map((input) => [input.dataset.component, Number(input.value)]),
  )]));
  const setControls = (transform) => {
    if (!transform) return;
    for (const part of components) for (const axis of ["x", "y", "z"]) {
      const input = $(`[data-axis="${part}"] [data-component="${axis}"]`);
      input.value = Number(transform[part][axis].toFixed(part === "rotation" ? 1 : 3));
    }
  };
  const renderItem = async () => {
    const id = itemSelect.value;
    await window.threeShop.setCalibrationItem(id);
    const transform = window.threeShop.calibrationTransform(id);
    if (transform) setControls(transform);
    status.textContent = `${id} · ${characterSelect.value === "male" ? "Panda" : "Cvrix"}`;
  };
  const populateItems = () => {
    const previous = itemSelect.value;
    itemSelect.replaceChildren(...window.threeShop.clothingIds().map((id) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = id.replace(/^(top|bottom|shoe)-/, "$1 · ").replaceAll("-", " ").toUpperCase();
      return option;
    }));
    if ([...itemSelect.options].some((option) => option.value === previous)) itemSelect.value = previous;
  };
  const open = async () => {
    if (!window.threeShop || !threeUiReady) return;
    workspaceOpen = true;
    overlay.hidden = false;
    characterSelect.value = selectedCharacter === "PANDA" ? "male" : "female";
    paused = true;
    $("#pauseModal").hidden = true;
    preview.appendChild(viewport);
    await window.threeShop.setCharacter(characterSelect.value);
    window.threeShop.setStage(currentStage);
    populateItems();
    await renderItem();
    requestAnimationFrame(() => window.threeShop.resize());
  };
  const close = () => {
    if (!workspaceOpen) return;
    workspaceOpen = false;
    overlay.hidden = true;
    originalSlot.appendChild(viewport);
    const gender = selectedCharacter === "PANDA" ? "male" : "female";
    window.threeShop.setCharacter(gender);
    window.threeShop.setStage(currentStage);
    window.threeShop.setOutfit([chosen.top, chosen.bottom, chosen.shoes].filter(Boolean));
    paused = false;
    requestAnimationFrame(() => window.threeShop.resize());
  };
  $("#openWorkspaceButton").addEventListener("click", open);
  $("#closeWorkspaceButton").addEventListener("click", close);
  overlay.addEventListener("click", (event) => { if (event.target === overlay) close(); });
  characterSelect.addEventListener("change", async () => {
    await window.threeShop.setCharacter(characterSelect.value);
    await renderItem();
  });
  itemSelect.addEventListener("change", renderItem);
  for (const input of document.querySelectorAll(".axis-grid input")) input.addEventListener("input", () => {
    window.threeShop.updateCalibrationTransform(itemSelect.value, currentTransform());
  });
  let axisScrub = null;
  for (const label of document.querySelectorAll(".axis-grid label")) {
    label.title = "Giữ chuột và kéo trái/phải để chỉnh nhanh";
    label.addEventListener("pointerdown", (event) => {
      if (event.target.closest("input")) return;
      const input = label.querySelector("input");
      if (!input) return;
      const axisGroup = label.closest(".axis-grid")?.dataset.axis;
      axisScrub = {
        input,
        startX: event.clientX,
        startValue: Number(input.value) || 0,
        step: axisGroup === "scale" ? 0.1 : 1.1,
        min: input.min === "" ? Number.NEGATIVE_INFINITY : Number(input.min),
        max: input.max === "" ? Number.POSITIVE_INFINITY : Number(input.max),
        decimals: axisGroup === "scale" ? 2 : 1,
      };
      label.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
  }
  document.addEventListener("pointermove", (event) => {
    if (!axisScrub) return;
    const steps = Math.round((event.clientX - axisScrub.startX) / 4);
    const nextValue = Math.max(axisScrub.min, Math.min(axisScrub.max, axisScrub.startValue + steps * axisScrub.step));
    axisScrub.input.value = nextValue.toFixed(axisScrub.decimals);
    axisScrub.input.dispatchEvent(new Event("input", { bubbles: true }));
    event.preventDefault();
  });
  const stopAxisScrub = () => { axisScrub = null; };
  document.addEventListener("pointerup", stopAxisScrub);
  document.addEventListener("pointercancel", stopAxisScrub);
  $("#applyWorkspaceButton").addEventListener("click", () => {
    if (window.threeShop.applyCalibration(itemSelect.value)) status.textContent = `Đã lưu ${itemSelect.value} cho ${characterSelect.value} trên trình duyệt này. Dùng Download preset để chuyển sang nơi khác.`;
  });
  $("#downloadPresetButton").addEventListener("click", () => {
    const data = new Blob([JSON.stringify(window.threeShop.calibrationPresetFile(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(data);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "thrifting101-fit-preset.json";
    anchor.click();
    URL.revokeObjectURL(url);
  });
  $("#uploadPresetInput").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      window.threeShop.importCalibrationPresets(JSON.parse(await file.text()));
      await renderItem();
      status.textContent = `Đã nhập preset ${file.name}.`;
    } catch (error) { status.textContent = error.message || "Không đọc được preset."; }
    event.target.value = "";
  });
  return close;
}

const closeFitWorkspace = initializeFitWorkspace();

function bindEvents() {
  const enterCharacterSelection = () => {
    if (!threeUiReady) return;
    playSfx("click");
    playMusic("menu");
    setScreen(screens.character);
  };
  $("#startButton").addEventListener("click", enterCharacterSelection);
  $("#titleHelpButton").addEventListener("click", openHelp);
  $("#helpButton").addEventListener("click", openHelp);
  $("#closeHelpButton").addEventListener("click", closeHelp);
  $("#modalStartButton").addEventListener("click", () => { closeHelp(); enterCharacterSelection(); });
  $("#audioButton").addEventListener("click", toggleAudio);
  $("#continueButton").addEventListener("click", goNextStage);
  $("#pauseButton").addEventListener("click", () => togglePause(true));
  $("#resumeButton").addEventListener("click", () => togglePause(false));
  $("#restartButton").addEventListener("click", resetGame);
  $("#againButton")?.addEventListener("click", resetGame);
  $$(".character-card").forEach((card) => {
    card.addEventListener("click", () => selectCharacter(card.dataset.gender));
    card.addEventListener("mouseenter", () => playSfx("hover"));
  });
  document.addEventListener("pointermove", moveCardDrag);
  document.addEventListener("pointerup", endCardDrag);
  document.addEventListener("pointercancel", endCardDrag);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && workspaceOpen) { closeFitWorkspace(); return; }
    if (event.key === "Escape" || event.key.toLowerCase() === "p") togglePause();
    if (event.key === "Escape" && !$("#helpModal").hidden) closeHelp();
  });
}

bindEvents();
updateAudioButton();
