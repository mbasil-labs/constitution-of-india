import constitutionData from './data/constitution.json';
import schedulesData from './data/schedules.json';

/* ==========================================================================
   APP STATE (Material Design 3 Architecture)
   ========================================================================== */
const state = {
  allArticles: constitutionData,
  filteredArticles: constitutionData,
  currentIndex: 0,
  activeFilterType: 'all',
  selectedPart: '',
  searchQuery: '',
  cardMode: 'summary', // 'summary' | 'legal'
  fontSizeLevel: 1, // 0: small, 1: normal, 2: large
  theme: localStorage.getItem('coi_theme') || 'dark',
  favorites: new Set(JSON.parse(localStorage.getItem('coi_favorites') || '[]')),
  isSpeaking: false,
  deferredPrompt: null
};

// Preamble Explainer Dictionary
const preambleDictionary = {
  SOVEREIGN: {
    title: "SOVEREIGN",
    tag: "Constitutional Philosophy",
    desc: "India is an independent state, supreme internally and completely free from any external foreign control or dominion. Parliament and its institutions possess sovereign constituent authority within constitutional bounds."
  },
  SOCIALIST: {
    title: "SOCIALIST",
    tag: "Democratic Socialism",
    desc: "Added by the 42nd Amendment (1976). Indian socialism is democratic socialism aimed at ending poverty, ignorance, disease, and inequality of opportunity through a mixed welfare economy."
  },
  SECULAR: {
    title: "SECULAR",
    tag: "Sarva Dharma Sambhava",
    desc: "Added by the 42nd Amendment (1976). Declared basic structure in S.R. Bommai (1994). The State maintains no official religion and treats all faiths with equal dignity, freedom, and protection."
  },
  DEMOCRATIC: {
    title: "DEMOCRATIC",
    tag: "Rule by the People",
    desc: "Sovereign power emanates from the citizens, exercised through universal adult suffrage (Article 326), periodic free and fair elections, rule of law, and an executive accountable to Parliament."
  },
  REPUBLIC: {
    title: "REPUBLIC",
    tag: "Elected Head of State",
    desc: "The head of state (the President of India) is an elected representative rather than a hereditary monarch. All public offices are accessible to every citizen without discrimination."
  },
  JUSTICE: {
    title: "JUSTICE",
    tag: "Triple Dimension",
    desc: "Social justice eliminates unjust discrimination based on birth or caste; Economic justice curbs non-equitable concentration of wealth; Political justice guarantees equal access to political processes."
  },
  LIBERTY: {
    title: "LIBERTY",
    tag: "Fundamental Freedom",
    desc: "Absence of arbitrary executive restraints on personal liberty, thoughts, conscience, faith, and profession, as constitutionally safeguarded under Articles 19 and 25-28."
  },
  EQUALITY: {
    title: "EQUALITY",
    tag: "Equal Opportunity",
    desc: "Abolition of arbitrary privileges, guaranteeing equal protection of the laws, civic non-discrimination, and equality of opportunity in public appointments under Articles 14-18."
  },
  FRATERNITY: {
    title: "FRATERNITY",
    tag: "Dignity & Integrity",
    desc: "A spirit of common brotherhood among all citizens across diverse linguistic, regional, and religious lines, assuring the sacred dignity of every individual and national unity."
  }
};

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
const cardStage = document.getElementById('card-stage');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const prevBtn = document.getElementById('btn-prev-card');
const nextBtn = document.getElementById('btn-next-card');
const articleCounter = document.getElementById('article-counter');
const articlePartMini = document.getElementById('article-part-mini');
const deckProgressBar = document.getElementById('deck-progress-bar');
const activeFilterBadge = document.getElementById('active-filter-badge');
const activeFilterText = document.getElementById('active-filter-text');
const btnClearFilter = document.getElementById('btn-clear-filter');
const btnRandomArticle = document.getElementById('btn-random-article');
const favQuickCount = document.getElementById('fav-quick-count');
const btnFontDecrease = document.getElementById('btn-font-decrease');
const btnFontIncrease = document.getElementById('btn-font-increase');
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const btnInstallPwa = document.getElementById('btn-install-pwa');
const offlineStatusPill = document.getElementById('offline-status-pill');

// Dialogs
const searchModal = document.getElementById('search-modal');
const btnOpenSearch = document.getElementById('btn-open-search');
const btnCloseSearch = document.getElementById('btn-close-search');
const searchInput = document.getElementById('search-input');
const btnSearchClear = document.getElementById('btn-search-clear');
const searchResultsList = document.getElementById('search-results-list');
const searchCountLabel = document.getElementById('search-count-label');
const partDropdownSelect = document.getElementById('part-dropdown-select');

const preambleModal = document.getElementById('preamble-modal');
const btnPreambleDirect = document.getElementById('btn-preamble-direct');
const btnClosePreamble = document.getElementById('btn-close-preamble');
const btnPreambleSpeech = document.getElementById('btn-preamble-speech');
const btnJumpToPreambleCard = document.getElementById('btn-jump-to-preamble-card');
const preambleWordExplainer = document.getElementById('preamble-word-explainer');
const explainerWordTitle = document.getElementById('explainer-word-title');
const explainerWordDesc = document.getElementById('explainer-word-desc');

const schedulesModal = document.getElementById('schedules-modal');
const btnOpenSchedules = document.getElementById('btn-open-schedules');
const btnCloseSchedules = document.getElementById('btn-close-schedules');
const schedulesGrid = document.getElementById('schedules-grid');

const jumpModal = document.getElementById('jump-modal');
const btnOpenJump = document.getElementById('btn-open-jump');
const btnCloseJump = document.getElementById('btn-close-jump');
const jumpForm = document.getElementById('jump-form');
const jumpArticleInput = document.getElementById('jump-article-input');

const toastContainer = document.getElementById('toast-container');

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
function init() {
  applyTheme(state.theme);
  populatePartsDropdown();
  updateFavoritesCount();
  updateFilter();
  renderCurrentCard();
  setupTouchAndMouseSwipe();
  setupEventListeners();
  setupServiceWorker();
  renderSchedulesModal();
  checkNetworkStatus();

  // Deep linking
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'preamble') {
    openModal(preambleModal);
  } else if (urlParams.get('filter')) {
    applyFilter(urlParams.get('filter'));
  }
}

/* ==========================================================================
   THEME & ACCESSIBILITY (M3 Dynamic Color Switching)
   ========================================================================== */
function applyTheme(themeName) {
  state.theme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('coi_theme', themeName);
}

function toggleTheme() {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  showToast(`Theme: ${nextTheme === 'dark' ? 'Material Dark' : 'Material Light'}`);
}

function adjustFontSize(delta) {
  state.fontSizeLevel = Math.max(0, Math.min(2, state.fontSizeLevel + delta));
  const sizes = ['0.92rem', '1rem', '1.15rem'];
  const lineHeights = ['1.5', '1.65', '1.75'];
  document.documentElement.style.setProperty('--content-font-size', sizes[state.fontSizeLevel]);
  document.documentElement.style.setProperty('--content-line-height', lineHeights[state.fontSizeLevel]);
  showToast(`Type scale: ${state.fontSizeLevel === 0 ? 'Compact' : state.fontSizeLevel === 1 ? 'Standard' : 'Enlarged'}`);
}

/* ==========================================================================
   FILTER & SEARCH ENGINE
   ========================================================================== */
function populatePartsDropdown() {
  const partsMap = new Map();
  state.allArticles.forEach(a => {
    if (!partsMap.has(a.partId)) {
      partsMap.set(a.partId, { name: a.partName, count: 0 });
    }
    partsMap.get(a.partId).count++;
  });

  partDropdownSelect.innerHTML = '<option value="">-- All Constitutional Parts (Full Text) --</option>';
  partsMap.forEach((info, partId) => {
    const opt = document.createElement('option');
    opt.value = partId;
    opt.textContent = `${info.name} (${info.count} articles)`;
    partDropdownSelect.appendChild(opt);
  });
}

function updateFilter() {
  let list = state.allArticles;

  if (state.activeFilterType === 'landmark') {
    list = list.filter(a => a.importance === 'landmark');
  } else if (state.activeFilterType === 'favorites') {
    list = list.filter(a => state.favorites.has(a.id));
  } else if (state.activeFilterType === 'judiciary') {
    list = list.filter(a => a.category.toLowerCase().includes('judiciary') || a.category.toLowerCase().includes('court') || [124, 129, 131, 136, 141, 142, 143, 214, 226].includes(parseInt(a.articleNumber)));
  } else if (state.activeFilterType !== 'all') {
    list = list.filter(a => a.partId === state.activeFilterType);
  }

  if (state.selectedPart) {
    list = list.filter(a => a.partId === state.selectedPart);
  }

  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(a => {
      const artNum = String(a.articleNumber).toLowerCase();
      const title = a.title.toLowerCase();
      const desc = a.description.toLowerCase();
      const summary = a.summary.toLowerCase();
      const tags = (a.tags || []).join(' ').toLowerCase();
      return artNum === q || artNum.includes(q) || title.includes(q) || summary.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }

  state.filteredArticles = list;
  state.currentIndex = 0;
  updateToolbar();
}

function updateToolbar() {
  const total = state.filteredArticles.length;
  const curr = total > 0 ? state.currentIndex + 1 : 0;
  
  if (total === 0) {
    articleCounter.textContent = '0 articles found';
    articlePartMini.textContent = 'Adjust search or filters';
    deckProgressBar.style.width = '0%';
  } else {
    const activeArt = state.filteredArticles[state.currentIndex];
    articleCounter.textContent = `Article ${curr} of ${total}`;
    articlePartMini.textContent = activeArt.partName;
    deckProgressBar.style.width = `${Math.round((curr / total) * 100)}%`;
  }

  const isFiltered = state.activeFilterType !== 'all' || state.selectedPart !== '' || state.searchQuery !== '';
  if (isFiltered) {
    activeFilterBadge.style.display = 'inline-flex';
    let label = '';
    if (state.activeFilterType === 'favorites') label = 'Bookmarks';
    else if (state.activeFilterType === 'landmark') label = 'Landmark Cases';
    else if (state.selectedPart) label = state.selectedPart;
    else if (state.activeFilterType !== 'all') label = state.activeFilterType;
    else if (state.searchQuery) label = `"${state.searchQuery}"`;
    activeFilterText.textContent = `${label} (${total})`;
  } else {
    activeFilterBadge.style.display = 'none';
  }

  // Update top filter chips active class
  document.querySelectorAll('.m3-chips-toolbar .m3-filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === state.activeFilterType);
  });
}

function clearFilter() {
  state.activeFilterType = 'all';
  state.selectedPart = '';
  state.searchQuery = '';
  searchInput.value = '';
  partDropdownSelect.value = '';
  btnSearchClear.style.display = 'none';

  updateFilter();
  renderCurrentCard();
  showToast('Filters reset: Showing all 465 articles');
}

function applyFilter(filterType) {
  state.activeFilterType = filterType;
  updateFilter();
  renderCurrentCard();
}

/* ==========================================================================
   CARD RENDERING (M3 Components)
   ========================================================================== */
function renderCurrentCard() {
  stopSpeech();

  if (state.filteredArticles.length === 0) {
    cardFront.innerHTML = `
      <div class="m3-card-header">
        <h2 class="m3-card-title">No Articles Found</h2>
      </div>
      <div class="m3-card-body">
        <div class="m3-callout-card">
          No constitutional articles match your query or filters. Click <strong>"Clear Filters"</strong> to return to all 465 articles.
        </div>
      </div>
      <div class="m3-card-footer">
        <button id="btn-empty-clear" class="m3-button filled">Clear All Filters</button>
      </div>
    `;
    const emptyClear = document.getElementById('btn-empty-clear');
    if (emptyClear) emptyClear.addEventListener('click', clearFilter);
    cardBack.style.display = 'none';
    return;
  }

  cardBack.style.display = 'flex';
  const item = state.filteredArticles[state.currentIndex];
  const nextItem = state.filteredArticles[(state.currentIndex + 1) % state.filteredArticles.length];
  const isFav = state.favorites.has(item.id);

  // Render Active Front Card
  cardFront.innerHTML = createCardHTML(item, isFav, state.cardMode);

  // Render Underneath Card Depth Preview
  if (nextItem && state.filteredArticles.length > 1) {
    cardBack.innerHTML = `
      <div class="m3-card-header" style="opacity: 0.65;">
        <div class="m3-card-pills-row">
          <span class="m3-badge-tonal badge-primary">${nextItem.article}</span>
          <span class="m3-badge-tonal badge-secondary">${nextItem.partId}</span>
        </div>
        <h3 class="m3-card-title" style="font-size: 1.15rem;">${nextItem.title}</h3>
      </div>
    `;
  } else {
    cardBack.innerHTML = '';
  }

  attachCardEvents(item);
  updateToolbar();
}

function createCardHTML(item, isFav, mode) {
  const isLandmark = item.importance === 'landmark';

  return `
    <div class="m3-card-header">
      <div class="m3-card-pills-row">
        <span class="m3-badge-tonal badge-primary">${item.article}</span>
        <span class="m3-badge-tonal badge-secondary">${item.partId}</span>
        <span class="m3-badge-tonal badge-outline">${item.category}</span>
        ${isLandmark ? '<span class="m3-badge-tonal badge-landmark">★ Landmark Case</span>' : ''}
      </div>

      <h2 class="m3-card-title">${item.title}</h2>

      <!-- M3 Segmented Button -->
      <div class="m3-segmented-button-container" role="tablist">
        <button class="m3-segment-btn ${mode === 'summary' ? 'active' : ''}" data-mode="summary" role="tab">
          <span class="material-symbols-outlined">${mode === 'summary' ? 'check' : 'lightbulb'}</span>
          <span>Plain Summary & Precedents</span>
        </button>
        <button class="m3-segment-btn ${mode === 'legal' ? 'active' : ''}" data-mode="legal" role="tab">
          <span class="material-symbols-outlined">${mode === 'legal' ? 'check' : 'menu_book'}</span>
          <span>Legal Text</span>
        </button>
      </div>
    </div>

    <div class="m3-card-body">
      ${mode === 'summary' ? renderSummaryBody(item) : renderLegalBody(item)}
    </div>

    <div class="m3-card-footer">
      <div class="footer-actions-left">
        <button id="btn-toggle-fav" class="m3-button ${isFav ? 'tonal' : 'outlined'}" title="Bookmark article">
          <span class="material-symbols-outlined">${isFav ? 'bookmark' : 'bookmark_border'}</span>
          <span>${isFav ? 'Saved' : 'Bookmark'}</span>
        </button>
        <button id="btn-read-aloud" class="m3-button outlined" title="Read Aloud (TTS)">
          <span class="material-symbols-outlined speech-icon">volume_up</span>
          <span class="speech-label">Listen</span>
        </button>
      </div>

      <div class="footer-actions-right">
        <button id="btn-copy-card" class="m3-button outlined" title="Copy text & citation">
          <span class="material-symbols-outlined">content_copy</span>
          <span>Copy</span>
        </button>
        <button id="btn-share-card" class="m3-button outlined" title="Share article">
          <span class="material-symbols-outlined">share</span>
          <span>Share</span>
        </button>
      </div>
    </div>
  `;
}

function renderSummaryBody(item) {
  let casesHtml = '';
  if (item.cases && item.cases.length > 0) {
    casesHtml = `
      <div class="precedents-section">
        <div class="section-title">
          <span class="material-symbols-outlined" style="font-size: 16px;">gavel</span>
          <span>Landmark Supreme Court Precedents</span>
        </div>
        ${item.cases.map(c => {
          const parts = c.split(' - ');
          const caseTitle = parts[0];
          const caseDesc = parts.slice(1).join(' - ');
          return `
            <div class="m3-precedent-card">
              <div class="precedent-title">${caseTitle}</div>
              ${caseDesc ? `<div class="precedent-desc">${caseDesc}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  const tagsHtml = (item.tags || []).map(t => `
    <button class="m3-assist-chip tag-chip" data-tag="${t}">
      <span>#${t}</span>
    </button>
  `).join('');

  return `
    <div class="m3-callout-card">
      <strong>Constitutional Takeaway:</strong> ${item.summary}
    </div>

    ${casesHtml}

    <div class="m3-card-tags">
      ${tagsHtml}
    </div>
  `;
}

function renderLegalBody(item) {
  const paragraphs = item.description.split('\n\n').filter(p => p.trim());
  const formatted = paragraphs.map(p => `<p class="clause-paragraph">${p.trim()}</p>`).join('');

  return `
    <div class="legal-text-view">
      ${formatted || '<p>No legal text clauses registered for this item.</p>'}
    </div>
  `;
}

function attachCardEvents(item) {
  // Segmented button mode switch
  cardFront.querySelectorAll('.m3-segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode !== state.cardMode) {
        state.cardMode = mode;
        renderCurrentCard();
      }
    });
  });

  // Favorite button
  const favBtn = document.getElementById('btn-toggle-fav');
  if (favBtn) favBtn.addEventListener('click', () => toggleFavorite(item));

  // Speech button
  const speechBtn = document.getElementById('btn-read-aloud');
  if (speechBtn) speechBtn.addEventListener('click', () => toggleSpeech(item, speechBtn));

  // Copy button
  const copyBtn = document.getElementById('btn-copy-card');
  if (copyBtn) copyBtn.addEventListener('click', () => copyArticleText(item));

  // Share button
  const shareBtn = document.getElementById('btn-share-card');
  if (shareBtn) shareBtn.addEventListener('click', () => shareArticle(item));

  // Tags click
  cardFront.querySelectorAll('.tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag;
      state.searchQuery = tag;
      searchInput.value = tag;
      btnSearchClear.style.display = 'block';
      updateFilter();
      renderCurrentCard();
      showToast(`Filter: #${tag}`);
    });
  });
}

/* ==========================================================================
   TOUCH & MOUSE SWIPING ENGINE
   ========================================================================== */
function setupTouchAndMouseSwipe() {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  const swipeThreshold = 75;

  function onDragStart(e) {
    if (e.target.closest('button, input, select, dialog, a, .m3-segmented-button-container')) return;

    isDragging = true;
    startX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    startY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
    currentX = startX;
    currentY = startY;

    cardFront.style.transition = 'none';
  }

  function onDragMove(e) {
    if (!isDragging) return;

    currentX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    currentY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const dx = currentX - startX;
    const dy = currentY - startY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (e.cancelable && e.type.startsWith('touch')) {
        e.preventDefault();
      }

      const rotate = dx * 0.035;
      const opacity = Math.max(0.65, 1 - Math.abs(dx) / 1000);
      cardFront.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
      cardFront.style.opacity = opacity;

      const progress = Math.min(1, Math.abs(dx) / 280);
      const backScale = 0.96 + progress * 0.04;
      cardBack.style.transform = `scale(${backScale})`;
      cardBack.style.opacity = `${0.5 + progress * 0.3}`;
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    const dx = currentX - startX;
    const dy = currentY - startY;

    cardFront.style.transition = 'transform 0.3s var(--md-motion-easing-standard), opacity 0.25s ease';
    cardBack.style.transition = 'transform 0.3s var(--md-motion-easing-standard), opacity 0.25s ease';

    if (Math.abs(dx) > swipeThreshold && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        cardFront.style.transform = 'translateX(-120%) rotate(-10deg)';
        cardFront.style.opacity = '0';
        setTimeout(() => nextCard(), 180);
      } else {
        cardFront.style.transform = 'translateX(120%) rotate(10deg)';
        cardFront.style.opacity = '0';
        setTimeout(() => prevCard(), 180);
      }
    } else {
      cardFront.style.transform = 'translateX(0) rotate(0)';
      cardFront.style.opacity = '1';
      cardBack.style.transform = 'scale(0.96)';
      cardBack.style.opacity = '0.5';
    }
  }

  cardStage.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('touchcancel', onDragEnd);

  cardStage.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
}

function nextCard() {
  if (state.filteredArticles.length <= 1) return;
  state.currentIndex = (state.currentIndex + 1) % state.filteredArticles.length;
  resetCardTransforms();
  renderCurrentCard();
}

function prevCard() {
  if (state.filteredArticles.length <= 1) return;
  state.currentIndex = (state.currentIndex - 1 + state.filteredArticles.length) % state.filteredArticles.length;
  resetCardTransforms();
  renderCurrentCard();
}

function resetCardTransforms() {
  cardFront.style.transition = 'none';
  cardFront.style.transform = 'translateX(0) rotate(0)';
  cardFront.style.opacity = '1';
  cardBack.style.transform = 'scale(0.96)';
  cardBack.style.opacity = '0.5';
}

function jumpToArticle(artNumQuery) {
  const query = String(artNumQuery).trim().toLowerCase();
  const index = state.allArticles.findIndex(a => {
    return String(a.articleNumber).toLowerCase() === query || 
           a.article.toLowerCase() === `article ${query}` ||
           (query === 'preamble' && a.articleNumber === 0);
  });

  if (index !== -1) {
    if (state.activeFilterType !== 'all' || state.searchQuery || state.selectedPart) {
      state.activeFilterType = 'all';
      state.searchQuery = '';
      state.selectedPart = '';
      updateFilter();
    }
    state.currentIndex = index;
    renderCurrentCard();
    showToast(`Jumped to ${state.allArticles[index].article}`);
    return true;
  } else {
    showToast(`Article "${artNumQuery}" not found`);
    return false;
  }
}

/* ==========================================================================
   FAVORITES SYSTEM (localStorage)
   ========================================================================== */
function toggleFavorite(item) {
  if (state.favorites.has(item.id)) {
    state.favorites.delete(item.id);
    showToast(`Removed ${item.article} from bookmarks`);
  } else {
    state.favorites.add(item.id);
    showToast(`Saved ${item.article} to bookmarks`);
  }
  
  localStorage.setItem('coi_favorites', JSON.stringify(Array.from(state.favorites)));
  updateFavoritesCount();

  if (state.activeFilterType === 'favorites') {
    updateFilter();
  }
  renderCurrentCard();
}

function updateFavoritesCount() {
  favQuickCount.textContent = state.favorites.size;
}

/* ==========================================================================
   AUDIO TEXT-TO-SPEECH READER (Web Speech API)
   ========================================================================== */
function toggleSpeech(item, buttonEl) {
  if (!('speechSynthesis' in window)) {
    showToast('Speech synthesis not supported in this browser');
    return;
  }

  if (state.isSpeaking) {
    stopSpeech();
    return;
  }

  window.speechSynthesis.cancel();
  const textToRead = `${item.article}. ${item.title}. ${state.cardMode === 'summary' ? item.summary : item.description.slice(0, 1000)}`;
  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const inVoice = voices.find(v => v.lang === 'en-IN');
  if (inVoice) utterance.voice = inVoice;

  utterance.onstart = () => {
    state.isSpeaking = true;
    if (buttonEl) {
      buttonEl.classList.add('speaking');
      const icon = buttonEl.querySelector('.speech-icon');
      const label = buttonEl.querySelector('.speech-label');
      if (icon) icon.textContent = 'pause';
      if (label) label.textContent = 'Pause';
    }
  };

  utterance.onend = () => stopSpeech();
  utterance.onerror = () => stopSpeech();

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  state.isSpeaking = false;
  document.querySelectorAll('.m3-button.speaking').forEach(btn => {
    btn.classList.remove('speaking');
    const icon = btn.querySelector('.speech-icon');
    const label = btn.querySelector('.speech-label');
    if (icon) icon.textContent = 'volume_up';
    if (label) label.textContent = 'Listen';
  });
}

/* ==========================================================================
   COPY & SHARE UTILITIES
   ========================================================================== */
async function copyArticleText(item) {
  const textToCopy = `Constitution of India — ${item.article}: ${item.title}\n(${item.partName})\n\n${item.summary}\n\nFull Official Text:\n${item.description}\n\nShared via Samvidhan Constitution PWA`;
  try {
    await navigator.clipboard.writeText(textToCopy);
    showToast(`Copied ${item.article} to clipboard`);
  } catch (err) {
    showToast('Failed to copy to clipboard');
  }
}

async function shareArticle(item) {
  const shareData = {
    title: `${item.article}: ${item.title} — Constitution of India`,
    text: `${item.article} of the Indian Constitution: ${item.title}. ${item.summary}`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {}
  } else {
    copyArticleText(item);
  }
}

/* ==========================================================================
   SEARCH & MODAL UI
   ========================================================================== */
function openModal(dialogEl) {
  if (dialogEl && typeof dialogEl.showModal === 'function') {
    dialogEl.showModal();
  }
}

function closeModal(dialogEl) {
  if (dialogEl && typeof dialogEl.close === 'function') {
    dialogEl.close();
  }
}

function renderSearchResults() {
  const query = searchInput.value.trim().toLowerCase();
  let results = state.allArticles;

  if (state.activeFilterType === 'landmark') {
    results = results.filter(a => a.importance === 'landmark');
  } else if (state.activeFilterType === 'favorites') {
    results = results.filter(a => state.favorites.has(a.id));
  } else if (state.activeFilterType === 'judiciary') {
    results = results.filter(a => a.category.toLowerCase().includes('judiciary') || a.category.toLowerCase().includes('court') || [124, 129, 131, 136, 141, 142, 143, 214, 226].includes(parseInt(a.articleNumber)));
  } else if (state.activeFilterType !== 'all') {
    results = results.filter(a => a.partId === state.activeFilterType);
  }

  if (partDropdownSelect.value) {
    results = results.filter(a => a.partId === partDropdownSelect.value);
  }

  if (query) {
    results = results.filter(a => {
      const artNum = String(a.articleNumber).toLowerCase();
      const title = a.title.toLowerCase();
      const summary = a.summary.toLowerCase();
      const desc = a.description.toLowerCase();
      const tags = (a.tags || []).join(' ').toLowerCase();
      return artNum === query || artNum.includes(query) || title.includes(query) || summary.includes(query) || desc.includes(query) || tags.includes(query);
    });
  }

  searchCountLabel.textContent = `Showing ${results.length} article${results.length === 1 ? '' : 's'}`;

  if (results.length === 0) {
    searchResultsList.innerHTML = `
      <div style="text-align: center; padding: 32px; color: var(--md-sys-color-on-surface-variant);">
        No articles match your search criteria.
      </div>
    `;
    return;
  }

  const displayResults = results.slice(0, 80);
  searchResultsList.innerHTML = displayResults.map(item => {
    let highlightedTitle = item.title;
    let snippet = item.summary;
    if (query) {
      const regex = new RegExp(`(${query})`, 'gi');
      highlightedTitle = item.title.replace(regex, '<mark>$1</mark>');
      snippet = snippet.replace(regex, '<mark>$1</mark>');
    }

    return `
      <div class="search-result-item" data-id="${item.id}">
        <div class="result-item-top">
          <span class="result-art-badge">${item.article}</span>
          <span class="result-part-name">${item.partName}</span>
        </div>
        <div class="result-title">${highlightedTitle}</div>
        <div class="result-snippet">${snippet}</div>
      </div>
    `;
  }).join('');

  searchResultsList.querySelectorAll('.search-result-item').forEach(itemEl => {
    itemEl.addEventListener('click', () => {
      const artId = itemEl.dataset.id;
      const targetIndex = state.allArticles.findIndex(a => a.id === artId);
      if (targetIndex !== -1) {
        state.activeFilterType = 'all';
        state.selectedPart = '';
        state.searchQuery = '';
        updateFilter();
        state.currentIndex = targetIndex;
        renderCurrentCard();
        closeModal(searchModal);
        showToast(`Jumped to ${state.allArticles[targetIndex].article}`);
      }
    });
  });
}

function renderSchedulesModal() {
  schedulesGrid.innerHTML = schedulesData.map(s => {
    return `
      <div class="m3-schedule-card">
        <div class="schedule-header">
          <span class="schedule-num">Schedule ${s.scheduleNumber}</span>
          <span class="schedule-articles-meta">${s.articles}</span>
        </div>
        <h3 class="schedule-title">${s.title}</h3>
        <p class="schedule-desc">${s.description}</p>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   EVENT LISTENERS SETUP
   ========================================================================== */
function setupEventListeners() {
  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);

  btnClearFilter.addEventListener('click', clearFilter);

  // Filter chips in top toolbar
  document.querySelectorAll('.m3-chips-toolbar .m3-filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filterType = chip.dataset.filter;
      state.activeFilterType = filterType;
      updateFilter();
      renderCurrentCard();
      showToast(`Filter: ${chip.querySelector('span:nth-child(2)').textContent}`);
    });
  });

  // Random article
  btnRandomArticle.addEventListener('click', () => {
    if (state.filteredArticles.length > 0) {
      const rand = Math.floor(Math.random() * state.filteredArticles.length);
      state.currentIndex = rand;
      renderCurrentCard();
      showToast(`Discovered ${state.filteredArticles[rand].article}`);
    }
  });

  btnFontDecrease.addEventListener('click', () => adjustFontSize(-1));
  btnFontIncrease.addEventListener('click', () => adjustFontSize(1));
  btnThemeToggle.addEventListener('click', toggleTheme);

  // Search dialog
  btnOpenSearch.addEventListener('click', () => {
    openModal(searchModal);
    searchInput.focus();
    renderSearchResults();
  });
  btnCloseSearch.addEventListener('click', () => closeModal(searchModal));

  searchInput.addEventListener('input', () => {
    btnSearchClear.style.display = searchInput.value ? 'inline-flex' : 'none';
    state.searchQuery = searchInput.value;
    renderSearchResults();
  });

  btnSearchClear.addEventListener('click', () => {
    searchInput.value = '';
    btnSearchClear.style.display = 'none';
    state.searchQuery = '';
    renderSearchResults();
    searchInput.focus();
  });

  // Search Modal Filter Chips
  document.querySelectorAll('.dialog-filter-chips .m3-filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.dialog-filter-chips .m3-filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeFilterType = chip.dataset.filterType;
      renderSearchResults();
    });
  });

  partDropdownSelect.addEventListener('change', () => {
    state.selectedPart = partDropdownSelect.value;
    renderSearchResults();
  });

  // Preamble Modal
  btnPreambleDirect.addEventListener('click', () => openModal(preambleModal));
  btnClosePreamble.addEventListener('click', () => closeModal(preambleModal));

  document.querySelectorAll('.m3-preamble-pillars .m3-filter-chip, .m3-preamble-objectives .m3-filter-chip').forEach(pill => {
    pill.addEventListener('click', () => {
      const word = pill.dataset.word;
      if (preambleDictionary[word]) {
        explainerWordTitle.textContent = preambleDictionary[word].title;
        explainerWordDesc.textContent = preambleDictionary[word].desc;
      }
    });
  });

  btnPreambleSpeech.addEventListener('click', () => {
    const preambleItem = state.allArticles.find(a => a.articleNumber === 0);
    if (preambleItem) toggleSpeech(preambleItem, btnPreambleSpeech);
  });

  btnJumpToPreambleCard.addEventListener('click', () => {
    closeModal(preambleModal);
    jumpToArticle(0);
  });

  // Schedules Modal
  btnOpenSchedules.addEventListener('click', () => openModal(schedulesModal));
  btnCloseSchedules.addEventListener('click', () => closeModal(schedulesModal));

  // Jump Modal
  btnOpenJump.addEventListener('click', () => {
    openModal(jumpModal);
    jumpArticleInput.value = '';
    jumpArticleInput.focus();
  });
  btnCloseJump.addEventListener('click', () => closeModal(jumpModal));

  jumpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = jumpArticleInput.value.trim();
    if (val) {
      const found = jumpToArticle(val);
      if (found) closeModal(jumpModal);
    }
  });

  document.querySelectorAll('.jump-quick-chips .m3-assist-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      jumpToArticle(chip.dataset.jump);
      closeModal(jumpModal);
    });
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, select, textarea')) return;

    if (e.key === 'ArrowLeft') {
      prevCard();
    } else if (e.key === 'ArrowRight') {
      nextCard();
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal(searchModal);
      searchInput.focus();
    } else if (e.key === '/') {
      e.preventDefault();
      openModal(searchModal);
      searchInput.focus();
    } else if (e.key.toLowerCase() === 'f') {
      const item = state.filteredArticles[state.currentIndex];
      if (item) toggleFavorite(item);
    } else if (e.key.toLowerCase() === 's') {
      const item = state.filteredArticles[state.currentIndex];
      if (item) toggleSpeech(item);
    } else if (e.key.toLowerCase() === 'm' || e.code === 'Space') {
      if (e.code === 'Space') e.preventDefault();
      state.cardMode = state.cardMode === 'summary' ? 'legal' : 'summary';
      renderCurrentCard();
    }
  });

  // PWA Prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredPrompt = e;
    btnInstallPwa.style.display = 'inline-flex';
  });

  btnInstallPwa.addEventListener('click', async () => {
    if (state.deferredPrompt) {
      state.deferredPrompt.prompt();
      const { outcome } = await state.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('Thank you for installing Samvidhan PWA!');
      }
      state.deferredPrompt = null;
      btnInstallPwa.style.display = 'none';
    }
  });
}

/* ==========================================================================
   NETWORK & SERVICE WORKER STATUS
   ========================================================================== */
function checkNetworkStatus() {
  function update() {
    if (navigator.onLine) {
      offlineStatusPill.className = 'm3-status-badge online';
      offlineStatusPill.querySelector('.status-label').textContent = 'Offline Ready';
    } else {
      offlineStatusPill.className = 'm3-status-badge offline';
      offlineStatusPill.querySelector('.status-label').textContent = 'Offline Mode Active';
      showToast('Offline Mode: All 465 articles available locally');
    }
  }

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

/* ==========================================================================
   M3 SNACKBAR NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  const snackbar = document.createElement('div');
  snackbar.className = 'm3-snackbar';
  snackbar.innerHTML = `
    <span class="material-symbols-outlined" style="font-size: 18px;">info</span>
    <span>${message}</span>
  `;
  toastContainer.appendChild(snackbar);

  setTimeout(() => {
    if (snackbar.parentNode) {
      snackbar.parentNode.removeChild(snackbar);
    }
  }, 3000);
}

// Start
init();
