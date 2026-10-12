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

// Share Dialog DOM Elements
const shareModal = document.getElementById('share-modal');
const btnCloseShare = document.getElementById('btn-close-share');
const shareDialogEyebrow = document.getElementById('share-dialog-eyebrow');
const shareDialogTitle = document.getElementById('share-dialog-title');
const sharePreviewBadge = document.getElementById('share-preview-badge');
const sharePreviewPart = document.getElementById('share-preview-part');
const sharePreviewTitle = document.getElementById('share-preview-title');
const sharePreviewDesc = document.getElementById('share-preview-desc');
const shareLinkInput = document.getElementById('share-link-input');
const btnCopyShareLink = document.getElementById('btn-copy-share-link');
const btnCopyShareLinkText = document.getElementById('btn-copy-share-link-text');
const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
const btnShareX = document.getElementById('btn-share-x');
const btnShareTelegram = document.getElementById('btn-share-telegram');
const btnShareLinkedin = document.getElementById('btn-share-linkedin');
const shareSystemWrap = document.getElementById('share-system-wrap');
const btnShareSystem = document.getElementById('btn-share-system');
const btnCopyCitation = document.getElementById('btn-copy-citation');
const btnShareFilter = document.getElementById('btn-share-filter');
const btnSharePreamble = document.getElementById('btn-share-preamble');

// Constitutional Parts Map & Roman Lookup
const partsMap = new Map();
state.allArticles.forEach(a => {
  if (!partsMap.has(a.partId)) {
    partsMap.set(a.partId, a.partName);
  }
});

const romanToDigits = {
  'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'IVA': '4A', 'V': '5',
  'VI': '6', 'VII': '7', 'VIII': '8', 'IX': '9', 'IXA': '9A', 'IXB': '9B',
  'X': '10', 'XI': '11', 'XII': '12', 'XIII': '13', 'XIV': '14', 'XIVA': '14A',
  'XV': '15', 'XVI': '16', 'XVII': '17', 'XVIII': '18', 'XIX': '19', 'XX': '20',
  'XXI': '21', 'XXII': '22'
};

const digitsToRoman = {};
for (const [rom, dig] of Object.entries(romanToDigits)) {
  digitsToRoman[dig] = rom;
  digitsToRoman[dig.toLowerCase()] = rom;
}

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

  // Initial Deep Linking & URL Routing
  parseUrlAndNavigate(true);
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
  const partsInfoMap = new Map();
  state.allArticles.forEach(a => {
    if (!partsInfoMap.has(a.partId)) {
      partsInfoMap.set(a.partId, { name: a.partName, count: 0 });
    }
    partsInfoMap.get(a.partId).count++;
  });

  partDropdownSelect.innerHTML = '<option value="">-- All Constitutional Parts (Full Text) --</option>';
  partsInfoMap.forEach((info, partId) => {
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
  document.querySelectorAll('.chips-scroll-container .m3-filter-chip, .chips-scroll-container .filter-tab').forEach(chip => {
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
  syncUrlWithState(false);
  showToast('Filters reset: Showing all 465 articles');
}

function applyFilter(filterType) {
  state.activeFilterType = filterType;
  updateFilter();
  renderCurrentCard();
  syncUrlWithState(false);
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
      <div class="card-header-minimal" style="opacity: 0.5;">
        <div class="card-meta-bar">
          <div class="meta-pills">
            <span class="badge-article">${nextItem.article}</span>
            <span class="meta-sep">•</span>
            <span class="badge-part">${nextItem.partName}</span>
          </div>
        </div>
        <h3 class="card-title" style="font-size: 1.1rem; opacity: 0.7;">${nextItem.title}</h3>
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
    <div class="card-header-minimal">
      <div class="card-meta-bar">
        <div class="meta-pills">
          <span class="badge-article">${item.article}</span>
          <button class="btn-copy-art-link" data-article="${item.articleStr || item.articleNumber}" title="Copy direct link to ${item.article}" aria-label="Copy direct link to ${item.article}">
            <span class="material-symbols-outlined">link</span>
          </button>
          <span class="meta-sep">•</span>
          <span class="badge-part" data-part="${item.partId}" title="Filter section: ${item.partName}">${item.partName}</span>
          ${isLandmark ? '<span class="badge-landmark">★ Landmark</span>' : ''}
        </div>

        <!-- Modern Minimalist Segmented Tabs -->
        <div class="card-view-tabs" role="tablist">
          <button class="view-tab-btn ${mode === 'summary' ? 'active' : ''}" data-mode="summary" role="tab" title="Plain summary & precedents">
            <span class="material-symbols-outlined tab-icon">notes</span>
            <span>Summary</span>
          </button>
          <button class="view-tab-btn ${mode === 'legal' ? 'active' : ''}" data-mode="legal" role="tab" title="Full legal text">
            <span class="material-symbols-outlined tab-icon">article</span>
            <span>Legal Text</span>
          </button>
        </div>
      </div>

      <h2 class="card-title">${item.title}</h2>
    </div>

    <div class="card-body-scroll">
      ${mode === 'summary' ? renderSummaryBody(item) : renderLegalBody(item)}
    </div>

    <div class="card-footer-toolbar">
      <div class="footer-btn-group">
        <button id="btn-toggle-fav" class="card-btn ${isFav ? 'active' : ''}" title="Bookmark article (F)">
          <span class="material-symbols-outlined">${isFav ? 'bookmark' : 'bookmark_border'}</span>
          <span>${isFav ? 'Saved' : 'Bookmark'}</span>
        </button>
        <button id="btn-read-aloud" class="card-btn" title="Read Aloud (S)">
          <span class="material-symbols-outlined speech-icon">volume_up</span>
          <span class="speech-label">Listen</span>
        </button>
      </div>

      <div class="footer-btn-group">
        <button id="btn-copy-card" class="card-btn" title="Copy text & citation">
          <span class="material-symbols-outlined">content_copy</span>
          <span>Copy</span>
        </button>
        <button id="btn-share-card" class="card-btn" title="Share article">
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
        <div class="precedents-header">
          <span class="material-symbols-outlined" style="font-size: 15px;">gavel</span>
          <span>Landmark Supreme Court Precedents</span>
        </div>
        <div class="precedents-list">
          ${item.cases.map(c => {
            const parts = c.split(' - ');
            const caseTitle = parts[0];
            const caseDesc = parts.slice(1).join(' - ');
            return `
              <div class="precedent-item">
                <div class="precedent-title">${caseTitle}</div>
                ${caseDesc ? `<div class="precedent-desc">${caseDesc}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Curate keywords: filter out generic fillers and stop words, limit to 4
  const genericWords = new Set(['the', 'and', 'or', 'of', 'in', 'to', 'for', 'a', 'an', 'part', 'part i', 'part ii', 'part iii', 'part iv', 'part iva', 'part v', 'part vi', 'part xviii', 'article', 'articles', 'state', 'states', 'provisions', 'rules', 'shall', 'union & territory', 'union & parliament']);
  const curatedTags = (item.tags || [])
    .filter(t => !genericWords.has(t.toLowerCase().trim()) && t.trim().length > 2)
    .slice(0, 4);

  const tagsHtml = curatedTags.map(t => `
    <button class="tag-chip" data-tag="${t}">
      <span>#${t}</span>
    </button>
  `).join('');

  return `
    <div class="minimal-takeaway-card">
      <div class="takeaway-label">
        <span class="material-symbols-outlined label-icon">verified</span>
        <span>Constitutional Takeaway</span>
      </div>
      <p class="takeaway-text">${item.summary}</p>
    </div>

    ${casesHtml}

    ${curatedTags.length > 0 ? `
      <div class="card-keywords-row">
        <span class="keywords-label">Keywords:</span>
        <div class="keywords-list">
          ${tagsHtml}
        </div>
      </div>
    ` : ''}
  `;
}

function renderLegalBody(item) {
  const paragraphs = item.description.split('\n\n').filter(p => p.trim());
  const formatted = paragraphs.map(p => `<p class="clause-paragraph">${p.trim()}</p>`).join('');

  return `
    <div class="legal-text-view">
      <div class="legal-source-bar">
        <div class="source-info">
          <span class="material-symbols-outlined source-badge-icon">verified</span>
          <span>Official Text • Legislative Department, Ministry of Law and Justice</span>
        </div>
        <a href="https://www.legislative.gov.in/static/uploads/2025/07/ca7ce5c746fa7480804bbdeb6cb704f0.pdf" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="legal-official-link" 
           title="View original official Constitution PDF in a new tab">
          <span class="material-symbols-outlined">picture_as_pdf</span>
          <span>Original Official PDF</span>
          <span class="material-symbols-outlined ext-icon">open_in_new</span>
        </a>
      </div>
      ${formatted || '<p>No legal text clauses registered for this item.</p>'}
    </div>
  `;
}

function attachCardEvents(item) {
  // Segmented button mode switch
  cardFront.querySelectorAll('.view-tab-btn, .m3-segment-btn').forEach(btn => {
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

  // Quick copy link icon on card header
  const copyLinkBtn = cardFront.querySelector('.btn-copy-art-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const url = getArticleUrl(item);
      const success = await copyToClipboard(url, `Copied link: ${item.article}`);
      if (success) {
        copyLinkBtn.classList.add('copied');
        const icon = copyLinkBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'check';
        setTimeout(() => {
          copyLinkBtn.classList.remove('copied');
          if (icon) icon.textContent = 'link';
        }, 1800);
      }
    });
  }

  // Click on Part badge to filter to that section
  const partPill = cardFront.querySelector('.badge-part[data-part]');
  if (partPill) {
    partPill.addEventListener('click', (e) => {
      e.stopPropagation();
      const partId = partPill.dataset.part;
      if (partId && partsMap.has(partId)) {
        state.selectedPart = partId;
        partDropdownSelect.value = partId;
        updateFilter();
        renderCurrentCard();
        syncUrlWithState(false);
        showToast(`Filtered to ${partsMap.get(partId)}`);
      }
    });
  }

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
  syncUrlWithState(true);
}

function prevCard() {
  if (state.filteredArticles.length <= 1) return;
  state.currentIndex = (state.currentIndex - 1 + state.filteredArticles.length) % state.filteredArticles.length;
  resetCardTransforms();
  renderCurrentCard();
  syncUrlWithState(true);
}

function resetCardTransforms() {
  cardFront.style.transition = 'none';
  cardFront.style.transform = 'translateX(0) rotate(0)';
  cardFront.style.opacity = '1';
  cardBack.style.transform = 'scale(0.96)';
  cardBack.style.opacity = '0.5';
}

function jumpToArticle(artNumQuery) {
  const target = findArticle(artNumQuery);

  if (target) {
    if (state.activeFilterType !== 'all' || state.searchQuery || state.selectedPart) {
      state.activeFilterType = 'all';
      state.searchQuery = '';
      state.selectedPart = '';
      partDropdownSelect.value = '';
      updateFilter();
    }
    const idx = state.filteredArticles.findIndex(a => a.id === target.id);
    if (idx !== -1) {
      state.currentIndex = idx;
    }
    renderCurrentCard();
    syncUrlWithState(false);
    showToast(`Jumped to ${target.article}`);
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
  document.querySelectorAll('.card-btn.speaking, .m3-button.speaking').forEach(btn => {
    btn.classList.remove('speaking');
    const icon = btn.querySelector('.speech-icon');
    const label = btn.querySelector('.speech-label');
    if (icon) icon.textContent = 'volume_up';
    if (label) label.textContent = 'Listen';
  });
}

/* ==========================================================================
   DEEP LINKING, RESOLUTION & ROUTING ENGINE
   ========================================================================== */
function findArticle(query) {
  if (query === null || query === undefined || query === '') return null;
  const raw = String(query).trim().toLowerCase();
  const q = raw.replace(/^article[\s_-]*/i, '').replace(/^art[\s_-]*/i, '').trim();

  if (q === '0' || q === 'preamble') {
    return state.allArticles.find(a => a.articleNumber === 0) || null;
  }

  // 1. Direct match on articleStr or articleNumber
  let found = state.allArticles.find(a => String(a.articleStr || a.articleNumber).toLowerCase() === q);
  if (found) return found;

  // 2. Match on id e.g. "art-21", "art-21a"
  found = state.allArticles.find(a => a.id.toLowerCase() === `art-${q}` || a.id.toLowerCase() === raw);
  if (found) return found;

  // 3. Match on full article field e.g. "Article 21A"
  found = state.allArticles.find(a => a.article.toLowerCase() === `article ${q}` || a.article.toLowerCase() === raw);
  return found || null;
}

function findPartId(query) {
  if (!query) return null;
  const raw = String(query).trim();
  const lower = raw.toLowerCase().replace(/^part[\s_-]*/i, '').trim();

  // Direct match on partId (e.g. "Part III")
  for (const partId of partsMap.keys()) {
    if (partId.toLowerCase() === raw.toLowerCase()) return partId;
    if (partId.toLowerCase().replace(/^part\s+/i, '') === lower) return partId;
  }

  // Digits to Roman candidate (e.g. "3" -> "Part III", "4a" -> "Part IVA")
  if (digitsToRoman[lower]) {
    const candidate = `Part ${digitsToRoman[lower]}`;
    if (partsMap.has(candidate)) return candidate;
  }

  // Keyword match in partName
  for (const [partId, partName] of partsMap.entries()) {
    if (partName.toLowerCase().includes(raw.toLowerCase())) return partId;
  }

  return null;
}

function findSchedule(query) {
  if (!query) return null;
  const q = String(query).trim().toLowerCase().replace(/^schedule[\s_-]*/i, '').replace(/^sched[\s_-]*/i, '').trim();
  const num = parseInt(q, 10);
  if (!isNaN(num) && num >= 1 && num <= 12) {
    return schedulesData.find(s => s.scheduleNumber === num) || null;
  }
  return schedulesData.find(s => s.title.toLowerCase().includes(q)) || null;
}

function getArticleUrl(item, options = {}) {
  const url = new URL(window.location.origin + window.location.pathname);
  if (item.articleNumber === 0) {
    url.searchParams.set('article', '0');
  } else {
    url.searchParams.set('article', item.articleStr || String(item.articleNumber));
  }

  const mode = options.mode || (state.cardMode === 'legal' ? 'legal' : null);
  if (mode === 'legal') {
    url.searchParams.set('mode', 'legal');
  }

  if (state.selectedPart) {
    url.searchParams.set('part', state.selectedPart);
  }

  return url.toString();
}

function getSectionUrl(partId) {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('part', partId);
  return url.toString();
}

function getScheduleUrl(scheduleNum) {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('schedule', String(scheduleNum));
  return url.toString();
}

function getPreambleUrl() {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('view', 'preamble');
  return url.toString();
}

function getFilterUrl(filterType) {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('filter', filterType);
  return url.toString();
}

async function copyToClipboard(text, successToast = 'Copied to clipboard') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    showToast(successToast);
    return true;
  } catch (err) {
    showToast('Failed to copy to clipboard');
    return false;
  }
}

function updateMetaTags({ title, description, url }) {
  if (title) {
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
  }
  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);
  }
  if (url) {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);
  }
}

function syncUrlWithState(replace = true) {
  const currentItem = state.filteredArticles[state.currentIndex];
  if (!currentItem) return;

  const url = new URL(window.location.origin + window.location.pathname);

  if (state.selectedPart) {
    url.searchParams.set('part', state.selectedPart);
  } else if (state.activeFilterType && state.activeFilterType !== 'all') {
    url.searchParams.set('filter', state.activeFilterType);
  }

  if (currentItem.articleNumber === 0) {
    url.searchParams.set('article', '0');
  } else {
    url.searchParams.set('article', currentItem.articleStr || String(currentItem.articleNumber));
  }

  if (state.cardMode === 'legal') {
    url.searchParams.set('mode', 'legal');
  }

  const title = `${currentItem.article}: ${currentItem.title} — Constitution of India`;
  updateMetaTags({
    title,
    description: `${currentItem.article} (${currentItem.partName}): ${currentItem.summary}`,
    url: url.toString()
  });

  const newPath = url.pathname + url.search;
  const currentPath = window.location.pathname + window.location.search;

  if (newPath !== currentPath) {
    const historyState = {
      articleId: currentItem.id,
      partId: state.selectedPart,
      filter: state.activeFilterType,
      mode: state.cardMode
    };
    if (replace) {
      window.history.replaceState(historyState, '', newPath);
    } else {
      window.history.pushState(historyState, '', newPath);
    }
  }
}

function parseUrlAndNavigate(isInitial = false) {
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash ? window.location.hash.slice(1) : '';

  let articleQuery = searchParams.get('article') || searchParams.get('art');
  let partQuery = searchParams.get('part') || searchParams.get('section');
  let scheduleQuery = searchParams.get('schedule') || searchParams.get('sched');
  let viewQuery = searchParams.get('view');
  let filterQuery = searchParams.get('filter');
  let modeQuery = searchParams.get('mode');

  // Support hash routes like #/article/21, #art-21, #/part/Part%20III, #/schedule/1, #preamble
  if (hash) {
    const artMatch = hash.match(/^(?:\/)?(?:article\/|art-?)([0-9a-zA-Z]+)/i);
    if (artMatch && !articleQuery) {
      articleQuery = artMatch[1];
    }
    const partMatch = hash.match(/^(?:\/)?part\/(.+)/i);
    if (partMatch && !partQuery) {
      partQuery = decodeURIComponent(partMatch[1]);
    }
    const schedMatch = hash.match(/^(?:\/)?schedule\/([0-9]+)/i);
    if (schedMatch && !scheduleQuery) {
      scheduleQuery = schedMatch[1];
    }
    const filterMatch = hash.match(/^(?:\/)?filter\/(.+)/i);
    if (filterMatch && !filterQuery) {
      filterQuery = decodeURIComponent(filterMatch[1]);
    }
    if (hash === 'preamble' || hash === '/preamble') {
      viewQuery = 'preamble';
    }
  }

  // 1. Mode preference
  if (modeQuery === 'legal' || modeQuery === 'summary') {
    state.cardMode = modeQuery;
  }

  // 2. Schedules deep linking
  if (scheduleQuery) {
    const sched = findSchedule(scheduleQuery);
    if (sched) {
      openModal(schedulesModal);
      setTimeout(() => {
        const card = document.getElementById(`schedule-card-${sched.scheduleNumber}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('highlighted');
          setTimeout(() => card.classList.remove('highlighted'), 3000);
        }
      }, 150);
      showToast(`Schedule ${sched.scheduleNumber}: ${sched.title}`);
      return;
    }
  }

  // 3. Preamble deep linking
  if (viewQuery === 'preamble') {
    openModal(preambleModal);
    return;
  }

  // 4. Part / Section filtering
  if (partQuery) {
    const matchedPartId = findPartId(partQuery);
    if (matchedPartId) {
      state.activeFilterType = 'all';
      state.selectedPart = matchedPartId;
      partDropdownSelect.value = matchedPartId;
      updateFilter();
      if (!articleQuery) {
        state.currentIndex = 0;
        renderCurrentCard();
        syncUrlWithState(true);
        const partName = partsMap.get(matchedPartId) || matchedPartId;
        showToast(`Section: ${partName} (${state.filteredArticles.length} articles)`);
        return;
      }
    }
  } else if (filterQuery) {
    applyFilter(filterQuery);
    if (!articleQuery) {
      syncUrlWithState(true);
      return;
    }
  }

  // 5. Article deep linking
  if (articleQuery) {
    const targetArticle = findArticle(articleQuery);
    if (targetArticle) {
      let idxInFiltered = state.filteredArticles.findIndex(a => a.id === targetArticle.id);
      if (idxInFiltered === -1) {
        state.activeFilterType = 'all';
        state.selectedPart = '';
        state.searchQuery = '';
        partDropdownSelect.value = '';
        updateFilter();
        idxInFiltered = state.filteredArticles.findIndex(a => a.id === targetArticle.id);
      }
      if (idxInFiltered !== -1) {
        state.currentIndex = idxInFiltered;
      }
      renderCurrentCard();
      syncUrlWithState(true);
      if (!isInitial) {
        showToast(`Deep linked to ${targetArticle.article}`);
      }
      return;
    } else {
      showToast(`Article "${articleQuery}" not found. Showing ${state.filteredArticles[0]?.article || 'Article 1'}`);
    }
  }

  // Default initial sync
  syncUrlWithState(true);
}

/* ==========================================================================
   COPY & SHARE UTILITIES
   ========================================================================== */
async function copyArticleText(item) {
  const shareUrl = getArticleUrl(item);
  const textToCopy = `Constitution of India — ${item.article}: ${item.title}\n(${item.partName})\n\nTakeaway:\n${item.summary}\n\nFull Official Text:\n${item.description}\n\nDirect Link: ${shareUrl}\n\nShared via Samvidhan Constitution PWA`;
  await copyToClipboard(textToCopy, `Copied ${item.article} with citation & link`);
}

function shareArticle(item) {
  openShareModal({ type: 'article', item });
}

function openShareModal({ type = 'article', item = null, partId = null, schedule = null }) {
  if (!shareModal) return;

  let shareTitle = '';
  let shareEyebrow = 'CONSTITUTION DEEP LINK';
  let badgePrimary = '';
  let badgeSecondary = '';
  let previewTitle = '';
  let previewDesc = '';
  let shareUrl = '';
  let fullCitation = '';
  let shareText = '';

  if (type === 'article' && item) {
    shareEyebrow = 'SHARE CONSTITUTION ARTICLE';
    shareTitle = `Share ${item.article}`;
    badgePrimary = item.article;
    badgeSecondary = item.partName;
    previewTitle = item.title;
    previewDesc = item.summary;
    shareUrl = getArticleUrl(item);
    shareText = `${item.article} (${item.partName}): ${item.title}\n\n${item.summary}`;
    fullCitation = `Constitution of India — ${item.article}: ${item.title}\n(${item.partName})\n\nTakeaway:\n${item.summary}\n\nFull Official Text:\n${item.description}\n\nDirect Link: ${shareUrl}\n\nShared via Samvidhan Constitution PWA`;
  } else if (type === 'section' && partId) {
    const partName = partsMap.get(partId) || partId;
    const count = state.allArticles.filter(a => a.partId === partId).length;
    shareEyebrow = 'SHARE CONSTITUTIONAL SECTION';
    shareTitle = `Share ${partId}`;
    badgePrimary = partId;
    badgeSecondary = `${count} Articles`;
    previewTitle = partName;
    previewDesc = `Explore all constitutional provisions and articles under ${partName}.`;
    shareUrl = getSectionUrl(partId);
    shareText = `${partName} — Constitution of India (${count} articles)`;
    fullCitation = `${partName} — Constitution of India (${count} articles)\n\nExplore this section: ${shareUrl}\n\nShared via Samvidhan Constitution PWA`;
  } else if (type === 'schedule' && schedule) {
    shareEyebrow = 'SHARE SCHEDULE';
    shareTitle = `Share Schedule ${schedule.scheduleNumber}`;
    badgePrimary = `Schedule ${schedule.scheduleNumber}`;
    badgeSecondary = schedule.articles;
    previewTitle = schedule.title;
    previewDesc = schedule.description;
    shareUrl = getScheduleUrl(schedule.scheduleNumber);
    shareText = `Schedule ${schedule.scheduleNumber}: ${schedule.title} (${schedule.articles}) — Constitution of India`;
    fullCitation = `Constitution of India — Schedule ${schedule.scheduleNumber}: ${schedule.title}\n(${schedule.articles})\n\n${schedule.description}\n\nDirect Link: ${shareUrl}\n\nShared via Samvidhan Constitution PWA`;
  } else if (type === 'preamble') {
    const preambleItem = state.allArticles.find(a => a.articleNumber === 0);
    shareEyebrow = 'SHARE PREAMBLE';
    shareTitle = 'Share The Preamble';
    badgePrimary = 'Preamble';
    badgeSecondary = '1949';
    previewTitle = 'Preamble of the Constitution of India';
    previewDesc = preambleItem ? preambleItem.summary : 'The moral and philosophical foundation of the Indian Constitution.';
    shareUrl = getPreambleUrl();
    shareText = `Preamble of the Constitution of India: WE, THE PEOPLE OF INDIA...`;
    fullCitation = `Constitution of India — The Preamble\n\nWE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC...\n\nDirect Link: ${shareUrl}\n\nShared via Samvidhan Constitution PWA`;
  }

  state.currentShareData = {
    title: previewTitle,
    text: shareText,
    url: shareUrl,
    citation: fullCitation
  };

  if (shareDialogEyebrow) shareDialogEyebrow.textContent = shareEyebrow;
  if (shareDialogTitle) shareDialogTitle.textContent = shareTitle;
  if (sharePreviewBadge) sharePreviewBadge.textContent = badgePrimary;
  if (sharePreviewPart) sharePreviewPart.textContent = badgeSecondary;
  if (sharePreviewTitle) sharePreviewTitle.textContent = previewTitle;
  if (sharePreviewDesc) sharePreviewDesc.textContent = previewDesc;
  if (shareLinkInput) shareLinkInput.value = shareUrl;

  if (btnCopyShareLinkText) btnCopyShareLinkText.textContent = 'Copy Link';

  // Toggle system share button based on browser support
  if (shareSystemWrap) {
    if (navigator.share) {
      shareSystemWrap.style.display = 'block';
    } else {
      shareSystemWrap.style.display = 'none';
    }
  }

  openModal(shareModal);
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
        syncUrlWithState(false);
        closeModal(searchModal);
        showToast(`Jumped to ${state.allArticles[targetIndex].article}`);
      }
    });
  });
}

function renderSchedulesModal() {
  schedulesGrid.innerHTML = schedulesData.map(s => {
    return `
      <div class="m3-schedule-card" id="schedule-card-${s.scheduleNumber}">
        <div class="schedule-header">
          <div class="schedule-header-left">
            <span class="schedule-num">Schedule ${s.scheduleNumber}</span>
            <button class="btn-schedule-share" data-schedule="${s.scheduleNumber}" title="Share Schedule ${s.scheduleNumber} link" aria-label="Share Schedule ${s.scheduleNumber}">
              <span class="material-symbols-outlined">share</span>
            </button>
          </div>
          <span class="schedule-articles-meta">${s.articles}</span>
        </div>
        <h3 class="schedule-title">${s.title}</h3>
        <p class="schedule-desc">${s.description}</p>
      </div>
    `;
  }).join('');

  schedulesGrid.querySelectorAll('.btn-schedule-share').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const schedNum = parseInt(btn.dataset.schedule, 10);
      const sched = schedulesData.find(s => s.scheduleNumber === schedNum);
      if (sched) {
        openShareModal({ type: 'schedule', schedule: sched });
      }
    });
  });
}

/* ==========================================================================
   EVENT LISTENERS SETUP
   ========================================================================== */
function setupEventListeners() {
  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);

  btnClearFilter.addEventListener('click', clearFilter);

  // Filter chips in top toolbar
  document.querySelectorAll('.chips-scroll-container .m3-filter-chip, .chips-scroll-container .filter-tab').forEach(chip => {
    chip.addEventListener('click', () => {
      const filterType = chip.dataset.filter;
      state.activeFilterType = filterType;
      updateFilter();
      renderCurrentCard();
      const chipLabel = chip.querySelector('span:not(.chip-count):not(.tab-icon)')?.textContent || chip.textContent.trim();
      showToast(`Filter: ${chipLabel}`);
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

  // Section & Filter Share Button in Sub-toolbar
  if (btnShareFilter) {
    btnShareFilter.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentPart = state.selectedPart || (state.activeFilterType.startsWith('Part') ? state.activeFilterType : null);
      if (currentPart) {
        openShareModal({ type: 'section', partId: currentPart });
      } else {
        const currentItem = state.filteredArticles[state.currentIndex];
        if (currentItem) {
          openShareModal({ type: 'article', item: currentItem });
        }
      }
    });
  }

  // Preamble Share Button in Preamble Modal
  if (btnSharePreamble) {
    btnSharePreamble.addEventListener('click', () => {
      openShareModal({ type: 'preamble' });
    });
  }

  // Share Modal Actions
  if (btnCloseShare) {
    btnCloseShare.addEventListener('click', () => closeModal(shareModal));
  }

  if (btnCopyShareLink) {
    btnCopyShareLink.addEventListener('click', async () => {
      if (shareLinkInput) {
        const success = await copyToClipboard(shareLinkInput.value, 'Link copied to clipboard!');
        if (success && btnCopyShareLinkText) {
          btnCopyShareLinkText.textContent = 'Copied!';
          setTimeout(() => {
            btnCopyShareLinkText.textContent = 'Copy Link';
          }, 2000);
        }
      }
    });
  }

  if (btnShareWhatsapp) {
    btnShareWhatsapp.addEventListener('click', () => {
      if (!state.currentShareData) return;
      const text = `${state.currentShareData.text}\n\n${state.currentShareData.url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (btnShareX) {
    btnShareX.addEventListener('click', () => {
      if (!state.currentShareData) return;
      const text = `${state.currentShareData.title} — Constitution of India`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(state.currentShareData.url)}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (btnShareTelegram) {
    btnShareTelegram.addEventListener('click', () => {
      if (!state.currentShareData) return;
      window.open(`https://t.me/share/url?url=${encodeURIComponent(state.currentShareData.url)}&text=${encodeURIComponent(state.currentShareData.title)}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (btnShareLinkedin) {
    btnShareLinkedin.addEventListener('click', () => {
      if (!state.currentShareData) return;
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(state.currentShareData.url)}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (btnShareSystem) {
    btnShareSystem.addEventListener('click', async () => {
      if (!state.currentShareData) return;
      if (navigator.share) {
        try {
          await navigator.share({
            title: state.currentShareData.title,
            text: state.currentShareData.text,
            url: state.currentShareData.url
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(state.currentShareData.url, 'Link copied to clipboard');
          }
        }
      } else {
        copyToClipboard(state.currentShareData.url, 'Link copied to clipboard');
      }
    });
  }

  if (btnCopyCitation) {
    btnCopyCitation.addEventListener('click', async () => {
      if (state.currentShareData && state.currentShareData.citation) {
        await copyToClipboard(state.currentShareData.citation, 'Full text, citation & link copied!');
      }
    });
  }

  // Browser Forward / Back Navigation
  window.addEventListener('popstate', () => parseUrlAndNavigate(false));
  window.addEventListener('hashchange', () => parseUrlAndNavigate(false));

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
    } else if (e.key.toLowerCase() === 'o') {
      window.open('https://www.legislative.gov.in/static/uploads/2025/07/ca7ce5c746fa7480804bbdeb6cb704f0.pdf', '_blank', 'noopener,noreferrer');
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
      offlineStatusPill.className = 'status-indicator online';
      const label = offlineStatusPill.querySelector('.status-label');
      if (label) label.textContent = 'Offline Ready';
    } else {
      offlineStatusPill.className = 'status-indicator offline';
      const label = offlineStatusPill.querySelector('.status-label');
      if (label) label.textContent = 'Offline Mode Active';
      showToast('Offline Mode: All 465 articles available locally');
    }
  }

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      if ('caches' in window) {
        caches.keys().then(names => {
          for (let name of names) caches.delete(name);
        });
      }
    } else if (window.location.protocol.startsWith('http')) {
      const base = import.meta.env.BASE_URL || './';
      navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).catch(() => {});
    }
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
