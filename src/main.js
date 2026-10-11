import constitutionData from './data/constitution.json';
import schedulesData from './data/schedules.json';

/* ==========================================================================
   APP STATE
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
  theme: localStorage.getItem('coi_theme') || 'midnight',
  favorites: new Set(JSON.parse(localStorage.getItem('coi_favorites') || '[]')),
  isSpeaking: false,
  deferredPrompt: null
};

// Preamble Explainer Dictionary
const preambleDictionary = {
  SOVEREIGN: {
    title: "SOVEREIGN",
    tag: "External Independence & Internal Supremacy",
    desc: "India is an independent state, supreme internally and completely free from any external foreign control or dominion. Parliament and its institutions have absolute legislative sovereignty within constitutional limits."
  },
  SOCIALIST: {
    title: "SOCIALIST",
    tag: "Democratic Socialism",
    desc: "Added by the 42nd Amendment (1976). Indian socialism is a 'democratic socialism' aiming to end poverty, ignorance, disease, and inequality of opportunity through a mixed economy, distinct from communistic state socialism."
  },
  SECULAR: {
    title: "SECULAR",
    tag: "Sarva Dharma Sambhava",
    desc: "Added by the 42nd Amendment (1976). Declared basic structure in S.R. Bommai (1994). The State has no official religion and treats all religions equally with equal respect, freedom, and protection."
  },
  DEMOCRATIC: {
    title: "DEMOCRATIC",
    tag: "Rule by the People",
    desc: "Power emanates from the people. Ensured through universal adult suffrage (Article 326), periodic free and fair elections, rule of law, and accountability of the executive to the elected legislature."
  },
  REPUBLIC: {
    title: "REPUBLIC",
    tag: "Elected Head of State",
    desc: "The head of state (the President of India) is elected by the people indirectly, rather than inheriting hereditary office as in a monarchy. Public offices are open to every citizen without discrimination."
  },
  JUSTICE: {
    title: "JUSTICE (Social, Economic & Political)",
    tag: "Triple Dimension of Justice",
    desc: "Social justice eliminates discrimination based on caste, religion, or gender. Economic justice seeks to bridge gaps in wealth and income. Political justice ensures equal political rights and access to governance."
  },
  LIBERTY: {
    title: "LIBERTY (Thought, Expression, Belief, Faith & Worship)",
    tag: "Individual Freedom",
    desc: "Absence of arbitrary restraints on the activities of individuals, combined with opportunities for the development of individual personalities, protected under Articles 19 and 25-28."
  },
  EQUALITY: {
    title: "EQUALITY (Status & Opportunity)",
    tag: "Equal Protection of the Law",
    desc: "Absence of special privileges for any section of society, guaranteeing equal opportunities in public employment, civic standing, and human dignity under Articles 14-18."
  },
  FRATERNITY: {
    title: "FRATERNITY (Dignity & Unity)",
    tag: "Sense of Brotherhood",
    desc: "A common feeling of brotherhood and unity among all Indians, transcending regional, linguistic, or religious diversities, safeguarding individual dignity and the nation's integrity."
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
const btnQuickFavorites = document.getElementById('btn-quick-favorites');
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
const btnOpenPreamble = document.getElementById('btn-open-preamble');
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

  // Check URL params for deep linking
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('view') === 'preamble') {
    openModal(preambleModal);
  } else if (urlParams.get('filter')) {
    applyFilter(urlParams.get('filter'));
  }
}

/* ==========================================================================
   THEME & ACCESSIBILITY
   ========================================================================== */
function applyTheme(themeName) {
  state.theme = themeName;
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('coi_theme', themeName);
}

function toggleTheme() {
  const nextTheme = state.theme === 'midnight' ? 'parchment' : 'midnight';
  applyTheme(nextTheme);
  showToast(`Switched to ${nextTheme === 'midnight' ? 'Imperial Midnight' : 'Heritage Parchment'} theme`);
}

function adjustFontSize(delta) {
  state.fontSizeLevel = Math.max(0, Math.min(2, state.fontSizeLevel + delta));
  const sizes = ['0.95rem', '1.05rem', '1.2rem'];
  const lineHeights = ['1.6', '1.75', '1.85'];
  document.documentElement.style.setProperty('--content-font-size', sizes[state.fontSizeLevel]);
  document.documentElement.style.setProperty('--content-line-height', lineHeights[state.fontSizeLevel]);
  showToast(`Font size: ${state.fontSizeLevel === 0 ? 'Compact' : state.fontSizeLevel === 1 ? 'Standard' : 'Enlarged'}`);
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

  // Filter type
  if (state.activeFilterType === 'landmark') {
    list = list.filter(a => a.importance === 'landmark');
  } else if (state.activeFilterType === 'favorites') {
    list = list.filter(a => state.favorites.has(a.id));
  } else if (state.activeFilterType === 'judiciary') {
    list = list.filter(a => a.category.toLowerCase().includes('judiciary') || a.category.toLowerCase().includes('court') || [124, 129, 131, 136, 141, 142, 143, 214, 226].includes(parseInt(a.articleNumber)));
  } else if (state.activeFilterType !== 'all') {
    list = list.filter(a => a.partId === state.activeFilterType);
  }

  // Selected Part dropdown
  if (state.selectedPart) {
    list = list.filter(a => a.partId === state.selectedPart);
  }

  // Search Query
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
  state.currentIndex = 0; // reset to first card in filtered collection

  // Update Toolbar UI
  updateToolbar();
}

function updateToolbar() {
  const total = state.filteredArticles.length;
  const curr = total > 0 ? state.currentIndex + 1 : 0;
  
  if (total === 0) {
    articleCounter.textContent = '0 articles found';
    articlePartMini.textContent = 'Try adjusting your search or filter';
    deckProgressBar.style.width = '0%';
  } else {
    const activeArt = state.filteredArticles[state.currentIndex];
    articleCounter.textContent = `Article ${curr} of ${total}`;
    articlePartMini.textContent = activeArt.partName;
    deckProgressBar.style.width = `${Math.round((curr / total) * 100)}%`;
  }

  // Filter Badge
  const isFiltered = state.activeFilterType !== 'all' || state.selectedPart !== '' || state.searchQuery !== '';
  if (isFiltered) {
    activeFilterBadge.style.display = 'inline-flex';
    let label = 'Filtered: ';
    if (state.activeFilterType === 'favorites') label += 'Bookmarked';
    else if (state.activeFilterType === 'landmark') label += 'Landmark Cases';
    else if (state.selectedPart) label += state.selectedPart;
    else if (state.activeFilterType !== 'all') label += state.activeFilterType;
    else if (state.searchQuery) label += `"${state.searchQuery}"`;
    activeFilterText.textContent = `${label} (${total})`;
  } else {
    activeFilterBadge.style.display = 'none';
  }
}

function clearFilter() {
  state.activeFilterType = 'all';
  state.selectedPart = '';
  state.searchQuery = '';
  searchInput.value = '';
  partDropdownSelect.value = '';
  btnSearchClear.style.display = 'none';
  
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.filterType === 'all');
  });

  updateFilter();
  renderCurrentCard();
  showToast('Filters cleared. Showing all 465 articles');
}

function applyFilter(filterType) {
  state.activeFilterType = filterType;
  updateFilter();
  renderCurrentCard();
}

/* ==========================================================================
   CARD RENDERING & ANIMATION
   ========================================================================== */
function renderCurrentCard() {
  stopSpeech();

  if (state.filteredArticles.length === 0) {
    cardFront.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">No Articles Found</h2>
      </div>
      <div class="card-body">
        <div class="summary-card-callout">
          No articles match your current query or bookmark filter. Click <strong>"Clear Filters"</strong> above to explore all 465 articles of the Constitution of India.
        </div>
      </div>
      <div class="card-footer">
        <button id="btn-empty-clear" class="primary-action-btn">Clear All Filters</button>
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

  // Render Front Card
  cardFront.innerHTML = createCardHTML(item, isFav, state.cardMode);

  // Render Back Card Depth Preview
  if (nextItem && state.filteredArticles.length > 1) {
    cardBack.innerHTML = `
      <div class="card-header" style="opacity: 0.7;">
        <div class="card-pills-row">
          <span class="pill pill-article">${nextItem.article}</span>
          <span class="pill pill-part">${nextItem.partId}</span>
        </div>
        <h3 class="card-title" style="font-size: 1.25rem;">${nextItem.title}</h3>
      </div>
    `;
  } else {
    cardBack.innerHTML = '';
  }

  // Attach card event listeners
  attachCardEvents(item);
  updateToolbar();
}

function createCardHTML(item, isFav, mode) {
  const isLandmark = item.importance === 'landmark';
  
  return `
    <div class="card-header">
      <div class="card-pills-row">
        <span class="pill pill-article">${item.article}</span>
        <span class="pill pill-part">${item.partId}</span>
        <span class="pill pill-category">${item.category}</span>
        ${isLandmark ? '<span class="pill pill-landmark">⭐ Landmark Article</span>' : ''}
      </div>
      
      <div class="card-title-row">
        <h2 class="card-title">${item.title}</h2>
      </div>

      <div class="card-mode-tabs" role="tablist">
        <button class="mode-tab-btn ${mode === 'summary' ? 'active' : ''}" data-mode="summary" role="tab" aria-selected="${mode === 'summary'}">
          💡 Plain Summary & Precedents
        </button>
        <button class="mode-tab-btn ${mode === 'legal' ? 'active' : ''}" data-mode="legal" role="tab" aria-selected="${mode === 'legal'}">
          📜 Full Constitutional Legal Text
        </button>
      </div>
    </div>

    <div class="card-body">
      ${mode === 'summary' ? renderSummaryBody(item) : renderLegalBody(item)}
    </div>

    <div class="card-footer">
      <div class="footer-actions-left">
        <button id="btn-toggle-fav" class="card-action-btn ${isFav ? 'active-favorite' : ''}" title="Bookmark this article">
          <span>${isFav ? '★ Saved' : '☆ Bookmark'}</span>
        </button>
        <button id="btn-read-aloud" class="card-action-btn" title="Listen to this article (Web Speech)">
          <span class="speech-btn-icon">🔊</span>
          <span class="speech-btn-label">Listen</span>
        </button>
      </div>

      <div class="footer-actions-right">
        <button id="btn-copy-card" class="card-action-btn" title="Copy article text & citation">
          <span>📋 Copy</span>
        </button>
        <button id="btn-share-card" class="card-action-btn" title="Share article">
          <span>↗ Share</span>
        </button>
      </div>
    </div>
  `;
}

function renderSummaryBody(item) {
  let casesHtml = '';
  if (item.cases && item.cases.length > 0) {
    casesHtml = `
      <div class="landmark-cases-section">
        <div class="section-label">
          <span>⚖️ Landmark Supreme Court Precedents</span>
        </div>
        <div class="cases-list">
          ${item.cases.map(c => {
            const parts = c.split(' - ');
            const caseTitle = parts[0];
            const caseDesc = parts.slice(1).join(' - ');
            return `
              <div class="case-card">
                <strong>${caseTitle}</strong>
                ${caseDesc ? `<span>${caseDesc}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  const tagsHtml = (item.tags || []).map(t => `<button class="tag-chip" data-tag="${t}">#${t}</button>`).join('');

  return `
    <div class="summary-container">
      <div class="summary-card-callout">
        <strong>Constitutional Core:</strong> ${item.summary}
      </div>

      ${casesHtml}

      <div class="card-tags-cloud">
        ${tagsHtml}
      </div>
    </div>
  `;
}

function renderLegalBody(item) {
  // Format clauses cleanly
  const paragraphs = item.description.split('\n\n').filter(p => p.trim());
  const formatted = paragraphs.map(p => `<p class="clause-paragraph">${p.trim()}</p>`).join('');

  return `
    <div class="legal-text-view">
      ${formatted || '<p>No legal text description available for this provision.</p>'}
    </div>
  `;
}

function attachCardEvents(item) {
  // Mode switcher tabs
  const tabBtns = cardFront.querySelectorAll('.mode-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedMode = btn.dataset.mode;
      if (selectedMode !== state.cardMode) {
        state.cardMode = selectedMode;
        renderCurrentCard();
      }
    });
  });

  // Favorite button
  const favBtn = document.getElementById('btn-toggle-fav');
  if (favBtn) {
    favBtn.addEventListener('click', () => toggleFavorite(item));
  }

  // Read Aloud button
  const speechBtn = document.getElementById('btn-read-aloud');
  if (speechBtn) {
    speechBtn.addEventListener('click', () => toggleSpeech(item, speechBtn));
  }

  // Copy button
  const copyBtn = document.getElementById('btn-copy-card');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyArticleText(item));
  }

  // Share button
  const shareBtn = document.getElementById('btn-share-card');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => shareArticle(item));
  }

  // Tag chips
  const tagChips = cardFront.querySelectorAll('.tag-chip');
  tagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag;
      state.searchQuery = tag;
      searchInput.value = tag;
      btnSearchClear.style.display = 'block';
      updateFilter();
      renderCurrentCard();
      showToast(`Filtering by tag: #${tag}`);
    });
  });
}

/* ==========================================================================
   TOUCH & MOUSE SWIPING ENGINE (Card Stack Physics)
   ========================================================================== */
function setupTouchAndMouseSwipe() {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  const swipeThreshold = 75; // px

  function onDragStart(e) {
    // Ignore interactive element clicks
    if (e.target.closest('button, input, select, dialog, a, .card-mode-tabs')) return;

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

    // Only swipe horizontally if dx > dy
    if (Math.abs(dx) > Math.abs(dy)) {
      if (e.cancelable && e.type.startsWith('touch')) {
        e.preventDefault();
      }

      const rotate = dx * 0.04;
      const opacity = Math.max(0.65, 1 - Math.abs(dx) / 1000);
      cardFront.style.transform = `translateX(${dx}px) rotate(${rotate}deg)`;
      cardFront.style.opacity = opacity;

      // Card back layer scales up proportionally
      const progress = Math.min(1, Math.abs(dx) / 300);
      const backScale = 0.96 + progress * 0.04;
      cardBack.style.transform = `scale(${backScale})`;
      cardBack.style.opacity = `${0.55 + progress * 0.3}`;
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    const dx = currentX - startX;
    const dy = currentY - startY;

    cardFront.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';
    cardBack.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease';

    if (Math.abs(dx) > swipeThreshold && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        // Swiped Left -> Next Card
        cardFront.style.transform = 'translateX(-120%) rotate(-12deg)';
        cardFront.style.opacity = '0';
        setTimeout(() => {
          nextCard();
        }, 180);
      } else {
        // Swiped Right -> Previous Card
        cardFront.style.transform = 'translateX(120%) rotate(12deg)';
        cardFront.style.opacity = '0';
        setTimeout(() => {
          prevCard();
        }, 180);
      }
    } else {
      // Snap Back
      cardFront.style.transform = 'translateX(0) rotate(0)';
      cardFront.style.opacity = '1';
      cardBack.style.transform = 'scale(0.96)';
      cardBack.style.opacity = '0.55';
    }
  }

  // Touch Events
  cardStage.addEventListener('touchstart', onDragStart, { passive: true });
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
  window.addEventListener('touchcancel', onDragEnd);

  // Mouse / Pointer Events
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
  cardBack.style.opacity = '0.55';
}

function jumpToArticle(artNumQuery) {
  const query = String(artNumQuery).trim().toLowerCase();
  const index = state.allArticles.findIndex(a => {
    return String(a.articleNumber).toLowerCase() === query || 
           a.article.toLowerCase() === `article ${query}` ||
           (query === 'preamble' && a.articleNumber === 0);
  });

  if (index !== -1) {
    // If filtered, reset filter so article is shown
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
   FAVORITES / BOOKMARKS SYSTEM (Offline localStorage)
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

  // If in bookmarks view, re-filter
  if (state.activeFilterType === 'favorites') {
    updateFilter();
  }
  renderCurrentCard();
}

function updateFavoritesCount() {
  favQuickCount.textContent = state.favorites.size;
}

/* ==========================================================================
   AUDIO TEXT-TO-SPEECH READER (Native Web Speech API)
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

  // Try to find English-Indian voice if available
  const voices = window.speechSynthesis.getVoices();
  const inVoice = voices.find(v => v.lang === 'en-IN');
  if (inVoice) utterance.voice = inVoice;

  utterance.onstart = () => {
    state.isSpeaking = true;
    if (buttonEl) {
      buttonEl.classList.add('speaking');
      buttonEl.querySelector('.speech-btn-label').textContent = 'Pause';
    }
  };

  utterance.onend = () => {
    stopSpeech();
  };

  utterance.onerror = () => {
    stopSpeech();
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  state.isSpeaking = false;
  const speechBtns = document.querySelectorAll('.card-action-btn.speaking');
  speechBtns.forEach(btn => {
    btn.classList.remove('speaking');
    const label = btn.querySelector('.speech-btn-label');
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
    showToast(`Copied ${item.article} to clipboard!`);
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
    } catch (err) {
      // User cancelled share
    }
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

  // Filter category
  if (state.activeFilterType === 'landmark') {
    results = results.filter(a => a.importance === 'landmark');
  } else if (state.activeFilterType === 'favorites') {
    results = results.filter(a => state.favorites.has(a.id));
  } else if (state.activeFilterType === 'judiciary') {
    results = results.filter(a => a.category.toLowerCase().includes('judiciary') || a.category.toLowerCase().includes('court') || [124, 129, 131, 136, 141, 142, 143, 214, 226].includes(parseInt(a.articleNumber)));
  } else if (state.activeFilterType !== 'all') {
    results = results.filter(a => a.partId === state.activeFilterType);
  }

  // Dropdown Part
  if (partDropdownSelect.value) {
    results = results.filter(a => a.partId === partDropdownSelect.value);
  }

  // Text Query
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
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        No articles match your search criteria.
      </div>
    `;
    return;
  }

  // Render top 100 results for speed
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

  // Item click handlers
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
      <div class="schedule-card">
        <span class="schedule-num-badge">Schedule ${s.scheduleNumber}</span>
        <h3 class="schedule-title">${s.title}</h3>
        <p class="schedule-desc">${s.description}</p>
        <span class="schedule-articles-meta">Related: ${s.articles}</span>
        <ul class="schedule-highlights-list">
          ${s.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   EVENT LISTENERS SETUP
   ========================================================================== */
function setupEventListeners() {
  // Navigation Arrows
  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);

  // Clear Filter
  btnClearFilter.addEventListener('click', clearFilter);

  // Random Article
  btnRandomArticle.addEventListener('click', () => {
    if (state.filteredArticles.length > 0) {
      const rand = Math.floor(Math.random() * state.filteredArticles.length);
      state.currentIndex = rand;
      renderCurrentCard();
      showToast(`Discovering ${state.filteredArticles[rand].article}`);
    }
  });

  // Quick Bookmarks Filter
  btnQuickFavorites.addEventListener('click', () => {
    if (state.activeFilterType === 'favorites') {
      state.activeFilterType = 'all';
      showToast('Showing all articles');
    } else {
      state.activeFilterType = 'favorites';
      showToast(`Showing ${state.favorites.size} saved bookmarks`);
    }
    updateFilter();
    renderCurrentCard();
  });

  // Font Size
  btnFontDecrease.addEventListener('click', () => adjustFontSize(-1));
  btnFontIncrease.addEventListener('click', () => adjustFontSize(1));

  // Theme Toggle
  btnThemeToggle.addEventListener('click', toggleTheme);

  // Search Dialog Triggers
  btnOpenSearch.addEventListener('click', () => {
    openModal(searchModal);
    searchInput.focus();
    renderSearchResults();
  });
  btnCloseSearch.addEventListener('click', () => closeModal(searchModal));

  searchInput.addEventListener('input', () => {
    btnSearchClear.style.display = searchInput.value ? 'block' : 'none';
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

  // Search Modal Filter Pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilterType = pill.dataset.filterType;
      renderSearchResults();
    });
  });

  partDropdownSelect.addEventListener('change', () => {
    state.selectedPart = partDropdownSelect.value;
    renderSearchResults();
  });

  // Preamble Modal Triggers
  const openPreambleHandler = () => {
    openModal(preambleModal);
  };
  btnOpenPreamble.addEventListener('click', openPreambleHandler);
  btnPreambleDirect.addEventListener('click', openPreambleHandler);
  btnClosePreamble.addEventListener('click', () => closeModal(preambleModal));

  // Preamble Keyword Explainer Pills
  document.querySelectorAll('.preamble-word-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const word = pill.dataset.word;
      if (preambleDictionary[word]) {
        explainerWordTitle.textContent = preambleDictionary[word].title;
        explainerWordDesc.textContent = preambleDictionary[word].desc;
        preambleWordExplainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Preamble Speech
  btnPreambleSpeech.addEventListener('click', () => {
    const preambleItem = state.allArticles.find(a => a.articleNumber === 0);
    if (preambleItem) {
      toggleSpeech(preambleItem, btnPreambleSpeech);
    }
  });

  btnJumpToPreambleCard.addEventListener('click', () => {
    closeModal(preambleModal);
    jumpToArticle(0);
  });

  // Schedules Modal Triggers
  btnOpenSchedules.addEventListener('click', () => openModal(schedulesModal));
  btnCloseSchedules.addEventListener('click', () => closeModal(schedulesModal));

  // Jump Modal Triggers
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

  document.querySelectorAll('.quick-jump-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      jumpToArticle(chip.dataset.jump);
      closeModal(jumpModal);
    });
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If inside an input or form, don't trigger global shortcuts
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

  // PWA Install Prompt Handler
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
        showToast('Thank you for installing Samvidhan!');
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
      offlineStatusPill.className = 'status-pill online';
      offlineStatusPill.querySelector('.status-text').textContent = 'Offline Ready';
    } else {
      offlineStatusPill.className = 'status-pill offline';
      offlineStatusPill.querySelector('.status-text').textContent = 'Offline Mode Active';
      showToast('You are offline. Full Constitution remains 100% accessible locally.');
    }
  }

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Samvidhan PWA Service Worker Registered:', reg.scope);
    }).catch((err) => {
      console.warn('Service worker registration error:', err);
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚖️</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

// Start application
init();
