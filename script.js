const QUESTIONS_PER_GAME = 20;
const APP_NAME = "Tricky Python Quiz";
const APP_NAME_UPPER = "TRICKY PYTHON QUIZ";
const APP_URL = "https://trickypython.adarshd.dev";
const WTFPYTHON_BASE_URL = "https://github.com/satwikkansal/wtfpython";
const SOURCE_ANCHORS = {
  "First things first!": "-first-things-first-",
  "Strings can be tricky sometimes": "-strings-can-be-tricky-sometimes",
  "Be careful with chained operations": "-be-careful-with-chained-operations",
  "How not to use `is` operator": "-how-not-to-use-is-operator",
  "Hash brownies": "-hash-brownies",
  "Deep down, we're all the same.": "-deep-down-were-all-the-same",
  "Disorder within order": "-disorder-within-order-",
  "Keep trying...": "-keep-trying-",
  "For what?": "-for-what",
  "Evaluation time discrepancy": "-evaluation-time-discrepancy",
  "`is not ...` is not `is (not ...)`": "-is-not--is-not-is-not-",
  "A tic-tac-toe where X wins in the first attempt!": "-a-tic-tac-toe-where-x-wins-in-the-first-attempt",
  "Schrödinger's variable": "-schrödingers-variable-",
  "Subclass relationships": "-subclass-relationships",
  "Methods equality and identity": "-methods-equality-and-identity",
  "All-true-ation": "-all-true-ation-",
  "Strings and the backslashes": "-strings-and-the-backslashes",
  "not knot!": "-not-knot",
  "What's wrong with booleans?": "-whats-wrong-with-booleans",
  "Class attributes and instance attributes": "-class-attributes-and-instance-attributes",
  "Nan-reflexivity": "-nan-reflexivity-",
  "Mutating the immutable!": "-mutating-the-immutable",
  "Let's see if you can guess this?": "-lets-see-if-you-can-guess-this",
  "Exceeds the limit for integer string conversion": "-exceeds-the-limit-for-integer-string-conversion",
  "Modifying a dictionary while iterating over it": "-modifying-a-dictionary-while-iterating-over-it",
  "Stubborn `del` operation": "-stubborn-del-operation",
  "The out of scope variable": "-the-out-of-scope-variable",
  "Deleting a list item while iterating": "-deleting-a-list-item-while-iterating",
  "Lossy zip of iterators": "-lossy-zip-of-iterators-",
  "Loop variables leaking out!": "-loop-variables-leaking-out",
  "Beware of default mutable arguments!": "-beware-of-default-mutable-arguments",
  "Catching the Exceptions": "-catching-the-exceptions",
  "Same operands, different story!": "-same-operands-different-story",
  "Name resolution ignoring class scope": "-name-resolution-ignoring-class-scope",
  "Rounding like a banker": "-rounding-like-a-banker-",
  "Needles in a Haystack": "-needles-in-a-haystack-",
  "Splitsies": "-splitsies-",
  "Wild imports": "-wild-imports-",
  "All sorted?": "-all-sorted-",
  "Midnight time doesn't exist?": "-midnight-time-doesnt-exist",
  "Okay Python, Can you make me fly?": "-okay-python-can-you-make-me-fly",
  "Brace yourself!": "-brace-yourself",
  "Let's meet Friendly Language Uncle For Life": "-lets-meet-friendly-language-uncle-for-life",
  "Yes, it exists!": "-yes-it-exists",
  "Ellipsis": "-ellipsis-",
  "Inpinity": "-inpinity",
  "Let's mangle": "-lets-mangle",
  "Skipping lines?": "-skipping-lines",
  "Teleportation": "-teleportation",
  "Well, something is fishy...": "-well-something-is-fishy",
  "`+=` is faster": "--is-faster",
  "Let's make a giant string!": "-lets-make-a-giant-string",
  "Slowing down `dict` lookups": "-slowing-down-dict-lookups-",
  "Bloating instance `dict`s": "-bloating-instance-dicts-",
  "Minor Ones": "-minor-ones-"
};

const screens = {
  start: document.querySelector("#startScreen"),
  game: document.querySelector("#gameScreen"),
  result: document.querySelector("#resultScreen"),
  review: document.querySelector("#reviewScreen")
};

const els = {
  startForm: document.querySelector("#startForm"),
  playerName: document.querySelector("#playerName"),
  playerAvatar: document.querySelector("#playerAvatar"),
  hudName: document.querySelector("#hudName"),
  hudMood: document.querySelector("#hudMood"),
  scoreText: document.querySelector("#scoreText"),
  streakText: document.querySelector("#streakText"),
  questionCount: document.querySelector("#questionCount"),
  progressFill: document.querySelector("#progressFill"),
  difficultyChip: document.querySelector("#difficultyChip"),
  tagChip: document.querySelector("#tagChip"),
  questionPanel: document.querySelector(".question-panel"),
  questionTitle: document.querySelector("#questionTitle"),
  codeBlock: document.querySelector("#codeBlock"),
  optionsGrid: document.querySelector("#optionsGrid"),
  feedback: document.querySelector("#feedback"),
  resultName: document.querySelector("#resultName"),
  resultTitle: document.querySelector("#resultTitle"),
  resultPercent: document.querySelector("#resultPercent"),
  resultRank: document.querySelector("#resultRank"),
  shareFooter: document.querySelector("#shareFooter"),
  resultHeading: document.querySelector("#resultHeading"),
  resultSummary: document.querySelector("#resultSummary"),
  shareDate: document.querySelector("#shareDate"),
  shareCard: document.querySelector("#shareCard"),
  nativeShare: document.querySelector("#nativeShare"),
  downloadCard: document.querySelector("#downloadCard"),
  copyText: document.querySelector("#copyText"),
  imageShareMode: document.querySelector("#imageShareMode"),
  textShareMode: document.querySelector("#textShareMode"),
  shareX: document.querySelector("#shareX"),
  shareLinkedIn: document.querySelector("#shareLinkedIn"),
  shareWhatsApp: document.querySelector("#shareWhatsApp"),
  shareFacebook: document.querySelector("#shareFacebook"),
  reviewAnswers: document.querySelector("#reviewAnswers"),
  playAgain: document.querySelector("#playAgain"),
  reviewList: document.querySelector("#reviewList"),
  backToResults: document.querySelector("#backToResults"),
  themeToggle: document.querySelector("#themeToggle"),
  toast: document.querySelector("#toast")
};

const state = {
  bank: [],
  currentGame: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  playerName: "",
  answers: [],
  currentOptions: [],
  locked: false,
  shareMode: "image"
};

const moods = [
  "debug stance: suspicious",
  "trust level: absolutely not",
  "syntax radar: twitching",
  "scope confidence: fragile",
  "identity crisis: active"
];

const rankCopy = [
  {
    min: 18,
    title: "Elite"
  },
  {
    min: 15,
    title: "Seasoned Pro"
  },
  {
    min: 11,
    title: "Pro"
  },
  {
    min: 7,
    title: "Rising Pro"
  },
  {
    min: 0,
    title: "Beginner"
  }
];

const iconClasses = {
  next: "fa-solid fa-arrow-right",
  source: "fa-solid fa-up-right-from-square",
  share: "fa-solid fa-share-nodes",
  sun: "fa-solid fa-sun",
  moon: "fa-solid fa-moon"
};

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sanitizeName(name) {
  const trimmed = name.trim().replace(/\s+/g, " ");
  return trimmed || "Anonymous debugger";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getRank(score) {
  return rankCopy.find((rank) => score >= rank.min);
}

function iconSvg(name) {
  return `<i class="${iconClasses[name] ?? "fa-solid fa-circle"} icon" aria-hidden="true"></i>`;
}

function getWtfPythonSectionUrl(section) {
  return `${WTFPYTHON_BASE_URL}#${SOURCE_ANCHORS[section] ?? makeGithubAnchor(section)}`;
}

function makeGithubAnchor(section) {
  return `-${section
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\u00c0-\uffff]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function startGame(name) {
  state.playerName = sanitizeName(name);
  state.currentGame = shuffle(state.bank).slice(0, QUESTIONS_PER_GAME);
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.answers = [];
  state.locked = false;

  els.playerAvatar.textContent = state.playerName.charAt(0).toUpperCase();
  els.hudName.textContent = state.playerName;
  showScreen("game");
  renderQuestion();
}

function renderQuestion() {
  const question = state.currentGame[state.currentIndex];
  state.locked = false;
  els.questionPanel.classList.remove("is-answered");
  els.feedback.innerHTML = "";
  els.optionsGrid.innerHTML = "";
  els.hudMood.textContent = moods[state.currentIndex % moods.length];
  els.scoreText.textContent = state.score;
  els.streakText.textContent = state.streak;
  els.questionCount.textContent = `${state.currentIndex + 1}/${QUESTIONS_PER_GAME}`;
  els.progressFill.style.width = `${(state.currentIndex / QUESTIONS_PER_GAME) * 100}%`;
  els.difficultyChip.textContent = question.difficulty;
  els.tagChip.textContent = question.tag;
  els.questionTitle.textContent = question.question;
  els.codeBlock.hidden = !question.code;
  els.codeBlock.querySelector("code").textContent = question.code || "";

  state.currentOptions = shuffle(
    question.options.map((option, index) => ({
      option,
      originalIndex: index
    }))
  );

  state.currentOptions.forEach(({ option }, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.innerHTML = `<span>${escapeHtml(option)}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    els.optionsGrid.append(button);
  });
}

function selectAnswer(selectedIndex) {
  if (state.locked) return;
  state.locked = true;
  els.questionPanel.classList.add("is-answered");

  const question = state.currentGame[state.currentIndex];
  const selectedOption = state.currentOptions[selectedIndex];
  const isCorrect = selectedOption.originalIndex === question.answerIndex;
  const buttons = [...els.optionsGrid.querySelectorAll("button")];

  buttons.forEach((button, index) => {
    const optionMeta = state.currentOptions[index];
    button.disabled = true;
    if (optionMeta.originalIndex === question.answerIndex) button.classList.add("correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("wrong");
    if (optionMeta.originalIndex !== question.answerIndex && index !== selectedIndex) {
      button.classList.add("muted");
    }
  });

  if (isCorrect) {
    state.score += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    popConfetti(14);
  } else {
    state.streak = 0;
  }

  state.answers.push({
    question,
    selectedIndex: selectedOption.originalIndex,
    selectedText: selectedOption.option,
    correctText: question.options[question.answerIndex],
    isCorrect
  });

  els.scoreText.textContent = state.score;
  els.streakText.textContent = state.streak;
  els.feedback.innerHTML = `
    <div class="feedback-card">
      <div>
        <strong>${isCorrect ? "Correct. The trapdoor missed." : "Oof. Python kept receipts."}</strong>
        <p>${escapeHtml(question.explanation)}</p>
      </div>
      <button class="primary-button next-button" id="nextQuestion" type="button">
        ${iconSvg("next")}
        ${state.currentIndex + 1 >= QUESTIONS_PER_GAME ? "See score" : "Next"}
      </button>
    </div>
  `;

  document.querySelector("#nextQuestion").addEventListener("click", goNextQuestion);
}

function goNextQuestion() {
  state.currentIndex += 1;
  if (state.currentIndex >= QUESTIONS_PER_GAME) {
    finishGame();
  } else {
    renderQuestion();
  }
}

function finishGame() {
  els.progressFill.style.width = "100%";
  const rank = getRank(state.score);
  const percent = Math.round((state.score / QUESTIONS_PER_GAME) * 100);
  const today = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date());

  els.resultName.textContent = state.playerName;
  els.resultTitle.textContent = `escaped ${state.score}/${QUESTIONS_PER_GAME} traps`;
  els.resultPercent.textContent = `${percent}%`;
  els.resultHeading.textContent = rank.title;
  els.resultRank.textContent = rank.title;
  els.resultSummary.textContent = `${state.playerName}, you scored ${state.score}/${QUESTIONS_PER_GAME} with a best streak of ${state.bestStreak}. Review answers when you are ready.`;
  els.shareDate.textContent = today;
  els.shareFooter.textContent = `Play it: ${getShortAppUrl()}`;

  updateShareLinks();
  showScreen("result");
}

function getShareText() {
  const rank = getRank(state.score);
  return `I scored ${state.score}/${QUESTIONS_PER_GAME} in ${APP_NAME} and earned "${rank.title}". Can you survive Python's weirdest traps? ${getAppUrl()}`;
}

function updateShareLinks() {
  const text = encodeURIComponent(getShareText());
  const url = encodeURIComponent(getAppUrl());
  els.shareX.href = `https://twitter.com/intent/tweet?text=${text}`;
  els.shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  els.shareWhatsApp.href = `https://wa.me/?text=${text}`;
  els.shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
}

function getAppUrl() {
  return APP_URL;
}

function getShortAppUrl() {
  return getAppUrl().replace(/^https?:\/\//, "").replace(/\/$/, "");
}

async function createShareImage() {
  await document.fonts?.ready;
  const width = 1080;
  const height = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const rank = getRank(state.score);
  const percent = Math.round((state.score / QUESTIONS_PER_GAME) * 100);

  ctx.fillStyle = "#fff7db";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(16, 18, 25, 0.1)";
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 54) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#101219";
  ctx.lineWidth = 12;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  pill(ctx, 78, 82, 390, 68, "#ffd166", "#101219");
  ctx.fillStyle = "#101219";
  ctx.font = "700 31px 'DM Mono', monospace";
  ctx.fillText(APP_NAME_UPPER, 104, 126);
  ctx.font = "700 28px 'DM Mono', monospace";
  ctx.textAlign = "right";
  ctx.fillText(els.shareDate.textContent || "TODAY", width - 78, 126);
  ctx.textAlign = "left";

  const nameSize = fitText(ctx, state.playerName.toUpperCase(), 900, 96, "'Bungee', cursive");
  ctx.font = `${nameSize}px 'Bungee', cursive`;
  drawWrappedText(ctx, state.playerName.toUpperCase(), 78, 282, 900, nameSize * 1.04, 2);

  ctx.font = "800 62px 'Plus Jakarta Sans', sans-serif";
  drawWrappedText(ctx, `escaped ${state.score}/${QUESTIONS_PER_GAME} traps`, 78, 438, 900, 72, 2);

  ctx.fillStyle = "#fff7db";
  ctx.strokeStyle = "#101219";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(282, 642, 148, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#101219";
  ctx.font = "96px 'Bungee', cursive";
  ctx.textAlign = "center";
  ctx.fillText(`${percent}%`, 282, 677);
  ctx.textAlign = "left";

  const rankText = rank.title.toUpperCase();
  const rankPill = { x: 500, y: 575, width: 390, height: 72 };
  const rankFontSize = fitText(
    ctx,
    rankText,
    rankPill.width - 56,
    40,
    "'Plus Jakarta Sans', sans-serif",
    28
  );
  pill(ctx, rankPill.x, rankPill.y, rankPill.width, rankPill.height, "#34d399", "#101219");
  ctx.fillStyle = "#101219";
  ctx.font = `800 ${rankFontSize}px 'Plus Jakarta Sans', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(rankText, rankPill.x + rankPill.width / 2, rankPill.y + rankPill.height / 2 + 1);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.font = "700 30px 'DM Mono', monospace";
  ctx.fillStyle = "#101219";
  drawWrappedText(ctx, `Play it: ${getShortAppUrl()}`, 78, 928, 910, 38, 2);
  return canvas;
}

function pill(ctx, x, y, width, height, fill, stroke) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, 8);
  } else {
    ctx.moveTo(x + 8, y);
    ctx.lineTo(x + width - 8, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + 8);
    ctx.lineTo(x + width, y + height - 8);
    ctx.quadraticCurveTo(x + width, y + height, x + width - 8, y + height);
    ctx.lineTo(x + 8, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - 8);
    ctx.lineTo(x, y + 8);
    ctx.quadraticCurveTo(x, y, x + 8, y);
  }
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.stroke();
}

function fitText(ctx, text, maxWidth, startSize, fontFamily, minSize = 44) {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${size}px ${fontFamily}`;
    if (ctx.measureText(text).width <= maxWidth) return size;
    size -= 3;
  }
  return size;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((lineText, index) => {
    const finalLine =
      index === maxLines - 1 && lines.length > maxLines ? `${lineText.replace(/\s+\S+$/, "")}...` : lineText;
    ctx.fillStyle = "#101219";
    ctx.fillText(finalLine, x, y + index * lineHeight);
  });
}

async function shareResult() {
  const text = getShareText();

  if (state.shareMode === "text") {
    if (navigator.share) {
      await navigator.share({ title: APP_NAME, text, url: getAppUrl() });
    } else {
      await navigator.clipboard.writeText(text);
      toast("Score text copied.");
    }
    return;
  }

  try {
    const canvas = await createShareImage();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
    const file = new File([blob], "tricky-python-quiz-score.png", { type: "image/png" });
    if (navigator.canShare?.({ files: [file] }) && navigator.share) {
      await navigator.share({
        title: APP_NAME,
        text,
        files: [file]
      });
    } else {
      downloadCanvas(canvas);
      toast("PNG downloaded. Social buttons share the text link.");
    }
  } catch (error) {
    console.error(error);
    await navigator.clipboard.writeText(text);
    toast("Image share failed, so I copied the text score.");
  }
}

async function downloadScoreCard() {
  try {
    const canvas = await createShareImage();
    downloadCanvas(canvas);
    toast("Score card downloaded.");
  } catch (error) {
    console.error(error);
    toast("Could not render the score card.");
  }
}

function downloadCanvas(canvas) {
  const link = document.createElement("a");
  link.download = "tricky-python-quiz-score.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function copyScoreText() {
  await navigator.clipboard.writeText(getShareText());
  toast("Score text copied.");
}

function renderReview() {
  els.reviewList.innerHTML = state.answers
    .map(({ question, selectedText, correctText, isCorrect }, index) => {
      const selected = selectedText ?? "No answer";
      const correct = correctText ?? question.options[question.answerIndex];
      const sourceUrl = getWtfPythonSectionUrl(question.sourceSection);
      return `
        <article>
          <div class="review-topline">
            <span class="chip">${index + 1}. ${escapeHtml(question.tag)}</span>
            <span class="status-pill ${isCorrect ? "ok" : "no"}">${isCorrect ? "correct" : "missed"}</span>
          </div>
          <h3>${escapeHtml(question.question)}</h3>
          ${
            question.code
              ? `<pre class="code-block"><code>${escapeHtml(question.code)}</code></pre>`
              : ""
          }
          <div class="answer-line">
            <span>Your answer: <strong>${escapeHtml(selected)}</strong></span>
            <span>Correct answer: <strong>${escapeHtml(correct)}</strong></span>
            <span>${escapeHtml(question.explanation)}</span>
            <span>Source section: <strong>${escapeHtml(question.sourceSection)}</strong></span>
            <a class="source-link" href="${sourceUrl}" target="_blank" rel="noreferrer">
              More explanation on WTFPython
              ${iconSvg("source")}
            </a>
          </div>
        </article>
      `;
    })
    .join("");
  showScreen("review");
}

function setShareMode(mode) {
  state.shareMode = mode;
  els.imageShareMode.classList.toggle("active", mode === "image");
  els.textShareMode.classList.toggle("active", mode === "text");
  els.nativeShare.innerHTML =
    mode === "image"
      ? `${iconSvg("share")} Share result`
      : `${iconSvg("share")} Share text`;
}

function popConfetti(amount = 18) {
  const colors = ["#ff4b5f", "#ffd166", "#34d399", "#59d7ff", "#f8f4e9"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 160}ms`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.append(piece);
    window.setTimeout(() => piece.remove(), 1200);
  }
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
}

function bindEvents() {
  els.startForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startGame(els.playerName.value);
  });

  els.playAgain.addEventListener("click", () => startGame(state.playerName));
  els.reviewAnswers.addEventListener("click", renderReview);
  els.backToResults.addEventListener("click", () => showScreen("result"));
  els.nativeShare.addEventListener("click", () => {
    shareResult().catch(() => toast("Share canceled or unavailable."));
  });
  els.downloadCard.addEventListener("click", () => {
    downloadScoreCard().catch(() => toast("Could not download the score card."));
  });
  els.copyText.addEventListener("click", () => {
    copyScoreText().catch(() => toast("Clipboard unavailable."));
  });
  els.imageShareMode.addEventListener("click", () => setShareMode("image"));
  els.textShareMode.addEventListener("click", () => setShareMode("text"));
  els.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    els.themeToggle.innerHTML = isLight
      ? iconSvg("sun")
      : iconSvg("moon");
  });
}

async function init() {
  bindEvents();
  try {
    const response = await fetch("questions.json");
    const payload = await response.json();
    state.bank = shuffle(payload.questions);
    if (state.bank.length < QUESTIONS_PER_GAME) {
      throw new Error("Question bank is too small.");
    }
    toast(`${state.bank.length} WTFPython traps loaded.`);
  } catch (error) {
    console.error(error);
    toast("Question bank failed to load. Run through a local server.");
  }
}

init();
