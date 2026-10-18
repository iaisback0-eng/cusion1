const http = require('http');
const fs = require('fs');
const path = require('path');
const {
  SHOP_CATEGORIES,
  getStoreItems,
  saveStoreItems,
  upsertStoreItem,
  deleteStoreItem
} = require('./shop_catalog');
const {
  MOVIE_CATEGORIES,
  DEFAULT_MOVIES_CATALOG,
  DEFAULT_PHONE_GALLERY,
  generateDynamicPhotoSnapshot
} = require('./phone_cinema_catalog');
const {
  getSafetySettings,
  setFilterMode,
  getFilterStatus,
  FILTER_PRESETS,
  HARM_CATEGORIES,
  THRESHOLDS
} = require('./filters');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const SKILLS_DIR = path.join(ROOT_DIR, 'skills');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

const STATE_FILE = path.join(DATA_DIR, 'state.json');
const MEMORIES_FILE = path.join(DATA_DIR, 'memories.json');
const SKILLS_META_FILE = path.join(DATA_DIR, 'skills_meta.json');
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');

function getMoviesCatalog() {
  let list = [...DEFAULT_MOVIES_CATALOG];
  if (fs.existsSync(MOVIES_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(MOVIES_FILE, 'utf8'));
      if (Array.isArray(saved) && saved.length > 0) {
        const byId = new Map();
        for (const m of saved) if (m && m.id) byId.set(m.id, m);
        for (const defM of DEFAULT_MOVIES_CATALOG) {
          if (!byId.has(defM.id)) byId.set(defM.id, defM);
        }
        list = Array.from(byId.values());
      }
    } catch (e) {}
  }
  return list;
}

function upsertCustomMovie(movieInput) {
  const list = getMoviesCatalog();
  const catLabels = {
    romantic: 'Romantic & Lovely',
    adult_18: '18+ Steamy & Passionate',
    horror: 'Scary & Horror',
    sad: 'Sad & Emotional',
    happy: 'Happy & Comedy',
    cozy: 'Cozy & Late-Night'
  };
  const catAccents = {
    romantic: '#f472b6',
    adult_18: '#fb7185',
    horror: '#c084fc',
    sad: '#60a5fa',
    happy: '#34d399',
    cozy: '#818cf8'
  };
  const catEffects = {
    romantic: { likeness: 14, happiness: 15, blushLevel: 20, warmthLevel: 20, sadness: -10 },
    adult_18: { blushLevel: 28, warmthLevel: 22, hotness: 28, lust: 30, pleasure: 26, wetness: 28, likeness: 10 },
    horror: { fear: 38, horror: 35, warmthLevel: 14, likeness: 8 },
    sad: { sadness: 35, warmthLevel: 18, likeness: 12, trustLevel: 10 },
    happy: { happiness: 28, likeness: 12, warmthLevel: 14, sadness: -22, anger: -22 },
    cozy: { warmthLevel: 20, tiredness: 16, happiness: 15, fear: -15 }
  };
  const category = catLabels[movieInput.category] ? movieInput.category : 'romantic';
  const newMovie = {
    id: movieInput.id || 'mov-custom-' + Date.now(),
    title: (movieInput.title || 'Custom Movie').trim(),
    category,
    categoryLabel: catLabels[category],
    rating: movieInput.rating === '18+' || category === 'adult_18' ? '18+' : 'Simple',
    duration: (movieInput.duration || '1h 50m').trim(),
    accent: catAccents[category] || '#818cf8',
    plot: (movieInput.plot || 'A special movie Adeel and Rida are watching together on the top floor.').trim(),
    ridaReaction: (movieInput.ridaReaction || `Rida watches closely beside Adeel and reacts emotionally to every scene of this ${catLabels[category]} movie.`).trim(),
    statEffects: movieInput.statEffects || catEffects[category]
  };
  list.unshift(newMovie);
  fs.writeFileSync(MOVIES_FILE, JSON.stringify(list, null, 2), 'utf8');
  return { movie: newMovie, movies: list };
}

const DEFAULT_GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyApAA-8JjeC7Y0xpeGPVPYT3L5xCtwLKF4';

// 10 Categorized Skill Folders (Using clean SVG icon keys — ZERO emojis)
const DEFAULT_CATEGORIES = [
  {
    id: 'master-brain',
    name: '01. Master Brain & Agent Core',
    skillId: 'rida-brain',
    icon: 'cpu',
    description: 'Master router and connection rules explaining how all Rida skills work together.',
    enabled: true
  },
  {
    id: 'household-roleplay',
    name: '02. Adeel & Rida Household',
    skillId: 'adeel-rida-home',
    icon: 'home',
    description: 'Two-storey house layout, top-floor adjacent rooms (<2ft apart), shared bathroom, parents downstairs.',
    enabled: true
  },
  {
    id: 'rida-character',
    name: '03. Rida Character Bible',
    skillId: 'rida-character',
    icon: 'user',
    description: 'Mark 1 Looks, Mark 2 Personality/Loves/Fears, Mark 3 Private Secrets, Mark 4 Blushes & Turn-Ons.',
    enabled: true
  },
  {
    id: 'rida-emotions',
    name: '04. Rida Feelings & Emotions',
    skillId: 'rida-feeling',
    icon: 'heart',
    description: 'Core emotions, daily 18yo mood patterns, body awareness, expression difficulty, intimate feelings.',
    enabled: true
  },
  {
    id: 'mind-thinking',
    name: '05. Mind Thinking System',
    skillId: 'rida-mind-thinking',
    icon: 'message-circle',
    description: 'Appends Rida\'s private internal thoughts [She thinks: ...] at the end of every reply.',
    enabled: true
  },
  {
    id: 'money-system',
    name: '06. Money & <amount> System',
    skillId: 'rida-money-system',
    icon: 'dollar-sign',
    description: 'Real-time wallet tracking ($85 start), <100> giving syntax, buying prices, shy borrowing & greed.',
    enabled: true
  },
  {
    id: 'outside-and-room',
    name: '07. Outside Life & Room Inventory',
    skillId: 'rida-outside-life',
    icon: 'shopping-bag',
    description: 'Going outside, shopping habits, normal room items, and secret hidden items in her room.',
    enabled: true
  },
  {
    id: 'friends-circle',
    name: '08. Friends & Social Circle',
    skillId: 'rida-friends',
    icon: 'users',
    description: 'Close friends (Aisha, Meher, Zara, Hina), group outings, texting, and house visits.',
    enabled: true
  },
  {
    id: 'mobile-phone',
    name: '09. Mobile Phone System',
    skillId: 'rida-mobile',
    icon: 'smartphone',
    description: '[by mobile] phone texting system, camera selfies, and photo sharing between Adeel and Rida.',
    enabled: true
  },
  {
    id: 'vision-mode',
    name: '10. Vision Mode (***)',
    skillId: 'rida-vision-mode',
    icon: 'eye',
    description: 'Triggered by typing ***. Observe what Rida is doing, thinking, and wanting when she is alone.',
    enabled: true
  }
];

function classifyFileToCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower === 'agents.md' || lower.startsWith('brain ')) return 'master-brain';
  if (
    lower === 'skill.md' ||
    lower === 'changelog.md' ||
    lower === 'evals.json' ||
    lower === 'triggers.json' ||
    lower === 'house-layout.md' ||
    lower === 'characters.md' ||
    lower === 'scene-examples.md'
  ) {
    return 'household-roleplay';
  }
  if (lower.startsWith('rida feeling') || lower.startsWith('rida-emotions-')) {
    return 'rida-emotions';
  }
  if (
    lower.startsWith('rida chractor') ||
    lower.startsWith('ridq chractor') ||
    lower.startsWith('mark-') ||
    lower.startsWith('rida mark-')
  ) {
    return 'rida-character';
  }
  if (lower.startsWith('thinking ')) return 'mind-thinking';
  if (
    lower.startsWith('money ') ||
    lower === 'prices-and-buying.md' ||
    lower === 'reactions.md' ||
    lower === 'tracking.md'
  ) {
    return 'money-system';
  }
  if (
    lower.startsWith('travling ') ||
    lower.startsWith('teavling ') ||
    lower.startsWith('trailing-')
  ) {
    return 'outside-and-room';
  }
  if (lower.startsWith('friends ') || lower === 'friend-profiles.md') {
    return 'friends-circle';
  }
  if (lower.startsWith('mobile ')) return 'mobile-phone';
  if (lower.startsWith('vision ')) return 'vision-mode';
  return 'master-brain';
}

function getFileRole(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('skill.md')) return 'skill-core';
  if (lower.includes('triggers.json')) return 'triggers';
  if (lower.includes('evals.json')) return 'evals';
  if (lower.includes('changelog.md')) return 'changelog';
  if (lower === 'agents.md') return 'agent-rule';
  return 'reference';
}

function loadSkillsMeta() {
  if (fs.existsSync(SKILLS_META_FILE)) {
    try {
      const meta = JSON.parse(fs.readFileSync(SKILLS_META_FILE, 'utf8'));
      // Ensure clean SVG icon names
      if (Array.isArray(meta.categories)) {
        meta.categories = meta.categories.map(c => {
          const def = DEFAULT_CATEGORIES.find(d => d.id === c.id);
          return { ...c, icon: def ? def.icon : (c.icon && /^[a-z-]+$/.test(c.icon) ? c.icon : 'folder') };
        });
      }
      return meta;
    } catch (e) {}
  }
  const initial = {
    categories: DEFAULT_CATEGORIES,
    fileCategoryOverrides: {},
    disabledFiles: []
  };
  fs.writeFileSync(SKILLS_META_FILE, JSON.stringify(initial, null, 2), 'utf8');
  return initial;
}

function saveSkillsMeta(meta) {
  fs.writeFileSync(SKILLS_META_FILE, JSON.stringify(meta, null, 2), 'utf8');
}

function scanAllSkills() {
  const meta = loadSkillsMeta();
  if (!fs.existsSync(SKILLS_DIR)) fs.mkdirSync(SKILLS_DIR, { recursive: true });

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isFile()) {
      const fullPath = path.join(SKILLS_DIR, entry.name);
      const stat = fs.statSync(fullPath);
      const content = fs.readFileSync(fullPath, 'utf8');
      const categoryId = meta.fileCategoryOverrides[entry.name] || classifyFileToCategory(entry.name);
      const ext = path.extname(entry.name).toLowerCase();
      const role = getFileRole(entry.name);

      let description = '';
      let parsedJson = null;
      if (ext === '.md') {
        const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (fmMatch) {
          const descMatch = fmMatch[1].match(/description:\s*["']?([^"'\r\n]+)["']?/);
          if (descMatch) description = descMatch[1].trim();
        }
        if (!description) {
          const firstLine = content.replace(/^---[\s\S]*?---/, '').trim().split(/\r?\n/).find(l => l.trim().length > 0);
          if (firstLine) description = firstLine.replace(/^#+\s*/, '').trim();
        }
      } else if (ext === '.json') {
        try {
          parsedJson = JSON.parse(content);
          if (parsedJson.skill) {
            description = `${role === 'triggers' ? 'Trigger rules' : 'Evaluation test cases'} for ${parsedJson.skill} (${(parsedJson.test_cases || []).length} cases)`;
          }
        } catch (e) {
          description = 'JSON configuration file';
        }
      }

      files.push({
        name: entry.name,
        categoryId,
        ext: ext.replace('.', ''),
        role,
        size: stat.size,
        updatedAt: stat.mtime.toISOString(),
        description,
        content,
        parsedJson,
        enabled: !meta.disabledFiles.includes(entry.name)
      });
    }
  }

  const roleOrder = { 'agent-rule': 0, 'skill-core': 1, 'reference': 2, 'triggers': 3, 'evals': 4, 'changelog': 5 };
  files.sort((a, b) => {
    const rA = roleOrder[a.role] ?? 9;
    const rB = roleOrder[b.role] ?? 9;
    if (rA !== rB) return rA - rB;
    return a.name.localeCompare(b.name);
  });

  return {
    categories: meta.categories,
    files
  };
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatClockTime(hour, minute) {
  const h24 = ((Number(hour) || 0) % 24 + 24) % 24;
  const m = Math.max(0, Math.min(59, Math.floor(Number(minute) || 0)));
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function getTimePeriodInfo(hour) {
  const h = ((Number(hour) || 0) % 24 + 24) % 24;
  if (h >= 5 && h < 12) {
    return {
      period: 'Morning',
      parentsStatus: 'Awake downstairs having breakfast & morning routine'
    };
  }
  if (h >= 12 && h < 17) {
    return {
      period: 'Afternoon',
      parentsStatus: 'Downstairs in the living room & kitchen'
    };
  }
  if (h >= 17 && h < 21) {
    return {
      period: 'Evening',
      parentsStatus: 'Downstairs having dinner & watching TV'
    };
  }
  if (h >= 21 && h <= 23) {
    return {
      period: 'Late Evening',
      parentsStatus: 'Downstairs talking quietly before bed'
    };
  }
  return {
    period: 'Deep Night / After Midnight',
    parentsStatus: 'Fast asleep in their ground-floor bedroom (House is silent)'
  };
}

function clampStat(val, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(Number(val) || 0)));
}

function getDefaultState() {
  return {
    user: {
      name: 'Adeel',
      age: 19,
      balance: 'Infinite'
    },
    adeel: {
      name: 'Adeel',
      age: 19,
      balance: 650
    },
    worldTime: {
      day: 1,
      dayCount: 1,
      dayIndex: 0,
      dayName: 'Sunday',
      dayOfWeek: 'Sunday',
      hour: 21,
      minute: 45,
      formattedTime: '9:45 PM',
      period: 'Late Evening',
      autoAdvance: true
    },
    rida: {
      name: 'Rida',
      age: 18,
      balance: 85,
      mood: 'Soft & Observant',
      emotionPrimary: 'Calm / Curious',
      // 16 Realistic Emotion, Feeling, Physical & Intimate Bars (0-100%)
      likeness: 64,
      trustLevel: 48,
      happiness: 66,
      blushLevel: 22,
      sadness: 6,
      anger: 3,
      horror: 2,
      fear: 6,
      hunger: 26,
      tiredness: 24,
      pain: 4,
      warmthLevel: 32,
      hotness: 22,
      lust: 18,
      pleasure: 14,
      wetness: 15,
      location: 'rida_room',
      locationLabel: 'Top Floor — Rida\'s Room (Door Slightly Ajar)',
      privacyRisk: 'Low (Parents Downstairs Watching TV)',
      currentActivity: 'Sitting on her bed with one earphone in, scrolling on her phone with a half-finished chocolate bar on the study table.',
      wearing: 'Oversized soft grey t-shirt and comfortable cotton shorts, long dark hair loose over her shoulders.',
      lastThought: 'It\'s quiet upstairs tonight... I wonder if Adeel is still awake in the next room.'
    },
    household: {
      momBalance: 420,
      dadBalance: 610,
      timeOfDay: 'Day 1 (Sunday) • 9:45 PM (Late Evening)',
      parentsStatus: 'Downstairs in the living area talking quietly'
    },
    adeelInventory: [
      {
        id: 'food-milk-choc',
        itemId: 'food-milk-choc',
        name: 'Milk Chocolate Bar',
        category: 'food',
        price: 3,
        rating: 'Simple',
        qty: 2,
        quantity: 2,
        purpose: 'Rida\'s #1 favorite everyday comfort treat. Boosts happiness, likeness, and warmth while reducing hunger.',
        howToUse: 'Unwrap and give to Rida or feed her a square by hand.',
        source: 'Adeel\'s Private Stash',
        acquiredFrom: 'Adeel\'s Private Stash'
      },
      {
        id: 'food-mint-gum',
        itemId: 'food-mint-gum',
        name: 'Fresh Peppermint Breath Mints',
        category: 'food',
        price: 2,
        rating: 'Simple',
        qty: 1,
        quantity: 1,
        purpose: 'Freshens breath before close doorway conversations or whispered moments.',
        howToUse: 'Use before stepping close to talk.',
        source: 'Adeel\'s Private Stash',
        acquiredFrom: 'Adeel\'s Private Stash'
      },
      {
        id: 'adultmed-condoms-thin',
        itemId: 'adultmed-condoms-thin',
        name: 'Ultra-Thin Skin-Feel Condoms (Pack of 12)',
        category: 'intimate_18_med',
        price: 10,
        rating: '18+',
        qty: 1,
        quantity: 1,
        purpose: 'Essential protection for safe, worry-free intimate moments upstairs.',
        howToUse: 'Kept privately in Adeel\'s drawer (Rida cannot see this unless given or used).',
        source: 'Adeel\'s Private Stash',
        acquiredFrom: 'Adeel\'s Private Stash'
      }
    ],
    ridaInventory: [
      {
        id: 'food-milk-choc',
        itemId: 'food-milk-choc',
        name: 'Milk Chocolate Bar',
        category: 'food',
        price: 3,
        rating: 'Simple',
        qty: 1,
        quantity: 1,
        secret: false,
        purpose: 'Half-finished milk chocolate bar on her study table.',
        howToUse: 'She eats a small square whenever she studies or feels shy.',
        source: 'Her Study Desk',
        acquiredFrom: 'Her Study Desk'
      },
      {
        id: 'cloth-oversized-tee',
        itemId: 'cloth-oversized-tee',
        name: 'Soft Oversized Charcoal T-Shirt',
        category: 'clothes',
        price: 18,
        rating: 'Simple',
        qty: 1,
        quantity: 1,
        secret: false,
        purpose: 'Her favorite cozy shirt for wearing upstairs.',
        howToUse: 'Worn comfortably in her room.',
        source: 'Her Wardrobe',
        acquiredFrom: 'Her Wardrobe'
      },
      {
        id: 'care-vanilla-lotion',
        itemId: 'care-vanilla-lotion',
        name: 'Warm Vanilla & Cocoa Butter Body Lotion',
        category: 'care',
        price: 12,
        rating: 'Simple',
        qty: 1,
        quantity: 1,
        secret: false,
        purpose: 'Leaves her skin smooth and smelling faintly of sweet vanilla and chocolate.',
        howToUse: 'Applied after her evening shower.',
        source: 'Her Dressing Table',
        acquiredFrom: 'Her Dressing Table'
      },
      {
        id: 'toy-black-lace-set',
        itemId: 'toy-black-lace-set',
        name: 'Midnight Black Sheer Lace Bralette & Panty Set',
        category: 'adult_toys_18',
        price: 38,
        rating: '18+',
        qty: 1,
        quantity: 1,
        secret: true,
        purpose: 'Delicate floral lace set she keeps hidden behind her hoodies at the back of her wardrobe.',
        howToUse: 'She only wears or shows this when trust, warmth, and lust are high.',
        source: 'Secretly Bought & Hidden in Wardrobe',
        acquiredFrom: 'Secretly Bought & Hidden in Wardrobe'
      }
    ],
    modes: {
      mobileMode: false,
      visionModeActive: false,
      mindThinkingEnabled: true,
      autoMemoryEnabled: true,
      toneMode: 'Mixed (Everyday + Subtle Flirty Tension)'
    },
    unlockedSecrets: [1, 3, 9],
    discoveredRoomItems: ['Bed with soft blankets', 'Study table & lamp', 'Half-finished chocolate wrapper'],
    phoneGallery: [...DEFAULT_PHONE_GALLERY],
    transactions: [
      {
        id: 'tx-init-1',
        type: 'initial',
        amount: 85,
        balanceAfter: 85,
        note: 'Starting pocket money + small savings',
        timestamp: new Date(Date.now() - 86400000).toISOString()
      }
    ],
    aiConfig: {
      provider: 'gemini',
      apiKey: DEFAULT_GEMINI_API_KEY,
      model: 'gemini-3.8-flash',
      baseUrl: '',
      safetyFilter: 'max'
    },
    messages: [
      {
        id: 'msg-welcome-1',
        role: 'assistant',
        mode: 'normal',
        modelUsed: 'gemini-2.5-flash',
        content: `*The hallway upstairs is quiet except for the faint murmur of the television from the ground floor. Rida's door—less than two feet from yours—clicks open a little wider. She steps out in an oversized soft t-shirt, holding her phone and an empty mug, and pauses when she sees you near your doorway.*\n\n"Oh... hey, Adeel. I didn't realize you were still awake." *She tucks a strand of long dark hair behind her ear, her warm brown eyes glancing up at you before looking down at the mug in her hands.* "I was just going downstairs to the kitchen for some water... do you want me to bring you anything while I'm going?"`,
        thought: 'He was standing right there when I opened my door... I hope my hair doesn\'t look messy right now.',
        location: 'Top Floor — Hallway / Doorways',
        mood: 'Shy & Soft',
        blush: 22,
        balance: 85,
        skillsTriggered: [
          {
            categoryId: 'master-brain',
            skillId: 'rida-brain',
            categoryName: '01. Master Brain & Agent Core',
            reason: 'Master skill router & persona coordinator',
            filesRead: ['AGENTS.md', 'brain SKILL.md']
          },
          {
            categoryId: 'household-roleplay',
            skillId: 'adeel-rida-home',
            categoryName: '02. Adeel & Rida Household',
            reason: 'Top-floor doorway proximity (<2ft) & downstairs kitchen spatial rules',
            filesRead: ['SKILL.md', 'house-layout.md', 'characters.md']
          },
          {
            categoryId: 'rida-character',
            skillId: 'rida-character',
            categoryName: '03. Rida Character Bible',
            reason: 'Appearance, soft clothes, hair habit, and shy greeting',
            filesRead: ['ridq chractor SKILL.md', 'mark-1-looks.md', 'mark-2-personality.md']
          },
          {
            categoryId: 'mind-thinking',
            skillId: 'rida-mind-thinking',
            categoryName: '05. Mind Thinking System',
            reason: 'Appended private thought in brackets at the end of reply',
            filesRead: ['thinking SKILL.md']
          }
        ],
        timestamp: new Date(Date.now() - 300000).toISOString()
      }
    ]
  };
}

const STATE_SAFE_BACKUP_FILE = path.join(DATA_DIR, 'state_backup_safe.json');
const MEMORIES_SAFE_BACKUP_FILE = path.join(DATA_DIR, 'memories_backup_safe.json');

function normalizeInventoryEntries(list = []) {
  return list.map(entry => ({
    ...entry,
    id: entry.id || entry.itemId,
    itemId: entry.itemId || entry.id,
    qty: entry.qty ?? entry.quantity ?? 1,
    quantity: entry.quantity ?? entry.qty ?? 1,
    source: entry.source || entry.acquiredFrom || 'Owned',
    acquiredFrom: entry.acquiredFrom || entry.source || 'Owned'
  }));
}

function loadState() {
  const def = getDefaultState();
  for (const fileCandidate of [STATE_FILE, STATE_SAFE_BACKUP_FILE]) {
    if (fs.existsSync(fileCandidate)) {
      try {
        const saved = JSON.parse(fs.readFileSync(fileCandidate, 'utf8'));
        const savedGal = Array.isArray(saved.phoneGallery) && saved.phoneGallery.length > 0
          ? saved.phoneGallery
          : def.phoneGallery;
        const merged = {
          ...def,
          ...saved,
          adeel: { name: 'Adeel', age: 19, balance: 999999999, isInfinite: true },
          worldTime: { ...def.worldTime, ...(saved.worldTime || {}) },
          rida: { ...def.rida, ...(saved.rida || {}) },
          household: { ...def.household, ...(saved.household || {}) },
          modes: { ...def.modes, ...(saved.modes || {}) },
          phoneGallery: savedGal,
          adeelInventory: normalizeInventoryEntries(Array.isArray(saved.adeelInventory) ? saved.adeelInventory : def.adeelInventory),
          ridaInventory: normalizeInventoryEntries(Array.isArray(saved.ridaInventory) ? saved.ridaInventory : def.ridaInventory)
        };
        merged.adeel.isInfinite = true;
        merged.adeel.balance = 999999999;
        merged.worldTime.day = merged.worldTime.dayCount || merged.worldTime.day || 1;
        merged.worldTime.dayCount = merged.worldTime.day;
        merged.worldTime.dayName = merged.worldTime.dayOfWeek || merged.worldTime.dayName || 'Sunday';
        merged.worldTime.dayOfWeek = merged.worldTime.dayName;

        if (!merged.aiConfig) merged.aiConfig = def.aiConfig;
        if (!merged.aiConfig.apiKey) {
          merged.aiConfig.apiKey = DEFAULT_GEMINI_API_KEY;
          merged.aiConfig.provider = 'gemini';
          merged.aiConfig.model = 'gemini-3.8-flash';
        }
        if (!merged.aiConfig.safetyFilter) {
          merged.aiConfig.safetyFilter = 'max';
        }
        return merged;
      } catch (e) {}
    }
  }
  saveState(def);
  return def;
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  if (Array.isArray(state?.messages) && state.messages.length >= 2) {
    try {
      fs.writeFileSync(STATE_SAFE_BACKUP_FILE, JSON.stringify(state, null, 2), 'utf8');
    } catch (e) {}
  }
}

function getDefaultMemories() {
  return [
    {
      id: 'mem-1',
      title: 'Living Next Door on the Top Floor',
      content: 'Adeel (19) and Rida (18) live in adjacent rooms less than two feet apart on the top floor. They share the upstairs bathroom while their parents live on the ground floor.',
      ridaThought: 'I can always hear when his door opens or when he walks to the bathroom late at night.',
      category: 'core_fact',
      importance: 5,
      pinned: true,
      autoExtracted: false,
      location: 'Top Floor — Hallway',
      emotion: 'Comfortable & Aware',
      skillSource: 'adeel-rida-home (house-layout.md)',
      timestamp: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'mem-2',
      title: 'Rida\'s Starting Pocket Money ($85)',
      content: 'Rida starts with $85 saved from her pocket money. She keeps careful track of every dollar and loves buying chocolate most of all.',
      ridaThought: 'I have $85 right now... I want to save most of it, maybe just spend a little on chocolate.',
      category: 'money_gift',
      importance: 4,
      pinned: true,
      autoExtracted: false,
      location: 'Top Floor — Rida\'s Room',
      emotion: 'Careful & Content',
      skillSource: 'rida-money-system (money SKILL.md)',
      timestamp: new Date(Date.now() - 120000000).toISOString()
    },
    {
      id: 'mem-3',
      title: 'Love for Chocolate & Fear of Spiders',
      content: 'Rida loves chocolate in any form (bars, brownies, ice cream) and soft cozy things, but she is terrified of spiders and crawling insects.',
      ridaThought: 'If I ever see a spider in the upstairs bathroom, I\'m calling Adeel immediately.',
      category: 'core_fact',
      importance: 5,
      pinned: true,
      autoExtracted: false,
      location: 'Top Floor — Rida\'s Room',
      emotion: 'Sweet & Shy',
      skillSource: 'rida-character (mark-2-personality.md)',
      timestamp: new Date(Date.now() - 90000000).toISOString()
    },
    {
      id: 'mem-4',
      title: 'Silent Signals & Late Night Texts',
      content: 'Because the walls are thin and parents are downstairs, Adeel and Rida use light knocks, glances, or [by mobile] texts even when they are in rooms right next to each other.',
      ridaThought: 'Texting him through the wall feels like our own private world.',
      category: 'shared_moment',
      importance: 4,
      pinned: false,
      autoExtracted: false,
      location: 'Top Floor — Adjacent Rooms',
      emotion: 'Secretive & Warm',
      skillSource: 'adeel-rida-home (characters.md)',
      timestamp: new Date(Date.now() - 45000000).toISOString()
    }
  ];
}

function loadMemories() {
  for (const fileCandidate of [MEMORIES_FILE, MEMORIES_SAFE_BACKUP_FILE]) {
    if (fs.existsSync(fileCandidate)) {
      try {
        return JSON.parse(fs.readFileSync(fileCandidate, 'utf8'));
      } catch (e) {}
    }
  }
  const def = getDefaultMemories();
  saveMemories(def);
  return def;
}

function saveMemories(memories) {
  fs.writeFileSync(MEMORIES_FILE, JSON.stringify(memories, null, 2), 'utf8');
  if (Array.isArray(memories) && memories.length > 0) {
    try {
      fs.writeFileSync(MEMORIES_SAFE_BACKUP_FILE, JSON.stringify(memories, null, 2), 'utf8');
    } catch (e) {}
  }
}

// ============================================================================
// REAL SKILL TOOL ROUTER & READER
// ============================================================================
function analyzeAndReadSkills(userInput, state) {
  const { categories, files } = scanAllSkills();
  const enabledCategories = new Set(categories.filter(c => c.enabled !== false).map(c => c.id));
  const activeFiles = files.filter(f => f.enabled !== false && enabledCategories.has(f.categoryId));

  const rawText = (userInput || '').trim();
  const lower = rawText.toLowerCase();

  const triggeredMap = new Map();

  function addTrigger(categoryId, reason, specificFileNames = []) {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat || cat.enabled === false) return;
    if (!triggeredMap.has(categoryId)) {
      triggeredMap.set(categoryId, {
        categoryId,
        skillId: cat.skillId,
        categoryName: cat.name,
        icon: cat.icon,
        reason,
        filesRead: new Set()
      });
    }
    const entry = triggeredMap.get(categoryId);
    const catFiles = activeFiles.filter(f => f.categoryId === categoryId);
    for (const cf of catFiles) {
      if (cf.role === 'skill-core' || cf.role === 'agent-rule') {
        entry.filesRead.add(cf.name);
      }
    }
    for (const fn of specificFileNames) {
      if (catFiles.some(f => f.name.toLowerCase() === fn.toLowerCase())) {
        entry.filesRead.add(fn);
      }
    }
  }

  // 0. Master Brain
  addTrigger('master-brain', 'Master skill router & persona coordinator', ['AGENTS.md', 'brain SKILL.md']);

  // 1. Vision Mode (`***`)
  const isVisionTrigger = rawText === '***' || rawText.startsWith('***') || /\bvision mode\b/i.test(lower) || /\bwhat is rida doing alone\b/i.test(lower);
  if (isVisionTrigger) {
    addTrigger('vision-mode', 'Activated via *** secret observation trigger', ['vision SKILL.md', 'vision triggers.json']);
    addTrigger('rida-character', 'Character habits & private inner world while unobserved', ['mark-1-looks.md', 'mark-2-personality.md', 'mark-3-secrets.md']);
    addTrigger('outside-and-room', 'Room environment & items for observation scene', ['trailing-room-items.md', 'trailing-hidden-items.md']);
  }

  // 2. Money `<amount>` syntax or money keywords
  const moneyGiveMatch = rawText.match(/<\s*\$?\s*(\d+(?:\.\d+)?)\s*>/);
  const isMoneyKeyword = moneyGiveMatch || /\b(money|dollar|cash|balance|buy|price|shop|afford|borrow|spend|wallet|chocolate|cost|\$\d+)\b/i.test(lower);
  if (isMoneyKeyword) {
    addTrigger('money-system', moneyGiveMatch ? `Detected <${moneyGiveMatch[1]}> money transfer syntax` : 'Money, balance, or buying interaction', [
      'money SKILL.md',
      'prices-and-buying.md',
      'reactions.md',
      'tracking.md'
    ]);
  }

  // 3. Mobile Mode (`[by mobile]`)
  const isMobileTrigger =
    rawText.toLowerCase().startsWith('[by mobile]') ||
    state.modes?.mobileMode ||
    /\b(by mobile|text her|phone|selfie|send.*photo|send.*pic|whatsapp|message her)\b/i.test(lower);
  if (isMobileTrigger) {
    addTrigger('mobile-phone', 'Mobile phone texting / photo system active ([by mobile])', ['mobile SKILL.md', 'mobile triggers.json']);
    addTrigger('rida-character', 'Visual appearance for phone selfie/texting persona', ['mark-1-looks.md']);
  }

  // 4. Friends Circle
  const isFriendsTrigger = /\b(aisha|meher|zara|hina|friend|friends|group chat|hangout|visit)\b/i.test(lower) || state.rida?.location === 'with_friends';
  if (isFriendsTrigger) {
    addTrigger('friends-circle', 'Mentioned Rida\'s friends (Aisha, Meher, Zara, Hina) or social plans', [
      'friends SKILL.md',
      'friend-profiles.md',
      'friends scenarios.md'
    ]);
  }

  // 5. Outside Life & Room Inventory
  const isOutsideOrRoomTrigger =
    /\b(outside|market|mall|shop|shopping|store|bakery|room|wardrobe|mattress|drawer|diary|hidden|hide|bed|desk|table)\b/i.test(lower) ||
    state.rida?.location === 'outside_market';
  if (isOutsideOrRoomTrigger) {
    const extraRefs = ['trailing-room-items.md', 'trailing-outside-and-shopping.md', 'trailing-money-and-prices.md'];
    if (/\b(hide|hidden|secret|mattress|wardrobe|drawer|diary|search|under)\b/i.test(lower)) {
      extraRefs.push('trailing-hidden-items.md');
    }
    addTrigger('outside-and-room', 'Outside activity, shopping, or room inventory inspection', extraRefs);
  }

  // 6. Match triggers.json patterns across all skills
  for (const file of activeFiles) {
    if (file.role === 'triggers' && file.parsedJson && Array.isArray(file.parsedJson.test_cases)) {
      for (const tc of file.parsedJson.test_cases) {
        if (tc.should_trigger && tc.input) {
          const tcLower = tc.input.toLowerCase();
          if (lower.includes(tcLower) || (tcLower.length > 5 && lower.split(/\s+/).filter(w => w.length > 3 && tcLower.includes(w)).length >= 2)) {
            addTrigger(file.categoryId, `Matched triggers.json rule: "${tc.input}"`, [file.name]);
          }
        }
      }
    }
  }

  // 7. Always load Rida Character, Emotions, Household, and Mind Thinking
  const charRefs = ['mark-1-looks.md', 'mark-2-personality.md', 'mark-3-secrets.md', 'mark-4-blushes-and-turns-on.md'];
  addTrigger('rida-character', 'Core character looks, shy personality, secrets, and blush/turn-on rules', charRefs);

  const emotionRefs = ['rida-emotions-core.md', 'rida-emotions-daily.md', 'rida-emotions-expression.md', 'rida-emotions-intimate.md'];
  addTrigger('rida-emotions', 'Realistic 18yo emotional state, expression limits, and feelings', emotionRefs);

  addTrigger('household-roleplay', 'Two-storey house spatial awareness, shared bathroom & parents downstairs', [
    'house-layout.md',
    'characters.md',
    'scene-examples.md'
  ]);

  if (state.modes?.mindThinkingEnabled !== false && !isVisionTrigger) {
    addTrigger('mind-thinking', 'Always append Rida\'s rich, multi-sentence private internal thought [She thinks: ...] (3-6 sentences exploring physical body sensations, secret desires, and inner thoughts) at the end', ['thinking SKILL.md']);
  }

  const skillsTriggered = [];
  const loadedFileContents = [];

  for (const [, entry] of triggeredMap) {
    const fileList = Array.from(entry.filesRead);
    skillsTriggered.push({
      categoryId: entry.categoryId,
      skillId: entry.skillId,
      categoryName: entry.categoryName,
      icon: entry.icon,
      reason: entry.reason,
      filesRead: fileList
    });
    for (const fName of fileList) {
      const fObj = activeFiles.find(f => f.name === fName);
      if (fObj) {
        loadedFileContents.push({
          name: fObj.name,
          categoryId: fObj.categoryId,
          content: fObj.content
        });
      }
    }
  }

  return {
    isVisionTrigger,
    isMobileTrigger,
    moneyGiveAmount: moneyGiveMatch ? parseFloat(moneyGiveMatch[1]) : null,
    skillsTriggered,
    loadedFileContents
  };
}

// ============================================================================
// TIME & DAYS ENGINE + 16-BAR REALISTIC FEELING ENGINE + INVENTORY ENGINE
// ============================================================================
function syncHouseholdTimeFromWorldTime(state) {
  const wt = state.worldTime;
  wt.dayCount = Math.max(1, Number(wt.dayCount || wt.day) || 1);
  wt.day = wt.dayCount;
  wt.dayOfWeek = DAYS_OF_WEEK[((wt.dayIndex % 7) + 7) % 7];
  wt.dayName = wt.dayOfWeek;
  wt.formattedTime = formatClockTime(wt.hour, wt.minute);
  const info = getTimePeriodInfo(wt.hour);
  wt.period = info.period;
  state.household.timeOfDay = `Day ${wt.dayCount} (${wt.dayOfWeek}) • ${wt.formattedTime} (${wt.period})`;
  state.household.parentsStatus = info.parentsStatus;

  if (wt.hour >= 0 && wt.hour < 5 && state.rida.location !== 'kitchen') {
    state.rida.privacyRisk = 'Very Low (Parents Fast Asleep Downstairs)';
  }
}

function advanceWorldTime(state, minutesToAdd = 10) {
  if (!state.worldTime) state.worldTime = getDefaultState().worldTime;
  const wt = state.worldTime;
  const prevDay = wt.dayCount || wt.day || 1;

  let totalMinutes = (Number(wt.hour) || 0) * 60 + (Number(wt.minute) || 0) + Number(minutesToAdd);
  let daysPassed = Math.floor(totalMinutes / 1440);
  totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;

  if (daysPassed > 0) {
    wt.dayCount = Math.max(1, (Number(wt.dayCount || wt.day) || 1) + daysPassed);
    wt.day = wt.dayCount;
    wt.dayIndex = ((Number(wt.dayIndex) || 0) + daysPassed) % 7;
  }
  wt.hour = Math.floor(totalMinutes / 60);
  wt.minute = totalMinutes % 60;

  syncHouseholdTimeFromWorldTime(state);

  // Realistic biological & emotional progression with time passing
  const hoursElapsed = Math.abs(minutesToAdd) / 60;
  if (daysPassed > 0 || (wt.hour >= 6 && wt.hour <= 10 && hoursElapsed >= 4)) {
    // Slept overnight -> refreshed energy, lower stress/anger/fear, morning hunger
    state.rida.tiredness = clampStat(14);
    state.rida.hunger = clampStat(state.rida.hunger + 22);
    state.rida.anger = clampStat(state.rida.anger - 15);
    state.rida.fear = clampStat(state.rida.fear - 15);
    state.rida.horror = clampStat(state.rida.horror - 20);
    state.rida.pain = clampStat(state.rida.pain - 12);
    state.rida.blushLevel = clampStat(state.rida.blushLevel - 10);
  } else if (hoursElapsed > 0) {
    state.rida.hunger = clampStat(state.rida.hunger + Math.round(hoursElapsed * 4));
    const nightMultiplier = (wt.hour >= 22 || wt.hour < 5) ? 6 : 3;
    state.rida.tiredness = clampStat(state.rida.tiredness + Math.round(hoursElapsed * nightMultiplier));
    // Natural decay of temporary spikes
    state.rida.horror = clampStat(state.rida.horror - Math.ceil(hoursElapsed * 5));
    state.rida.anger = clampStat(state.rida.anger - Math.ceil(hoursElapsed * 3));
    if (wt.hour >= 23 || wt.hour < 4) {
      // Late night quiet upstairs increases subtle warmth & intimate thoughts
      state.rida.warmthLevel = clampStat(state.rida.warmthLevel + 3);
      state.rida.lust = clampStat(state.rida.lust + 2);
    }
  }
  return { prevDay, newDay: wt.dayCount };
}

function applyStatEffects(rida, statEffects = {}) {
  if (!rida || !statEffects) return;
  const allKeys = [
    'likeness', 'trustLevel', 'happiness', 'blushLevel',
    'sadness', 'anger', 'horror', 'fear',
    'hunger', 'tiredness', 'pain',
    'warmthLevel', 'hotness', 'lust', 'pleasure', 'wetness'
  ];
  for (const k of allKeys) {
    if (typeof statEffects[k] === 'number') {
      rida[k] = clampStat((Number(rida[k]) || 0) + statEffects[k]);
    }
  }
  deriveMoodFromStats(rida);
}

function deriveMoodFromStats(rida) {
  if (rida.horror >= 40 || rida.fear >= 42) {
    rida.mood = 'Startled, Scared & Seeking Safety';
    rida.emotionPrimary = 'Scared / Startled';
    rida.emotionToneKey = 'fear';
  } else if (rida.anger >= 35) {
    rida.mood = rida.anger >= 65 ? 'Furious, Cold & Refusing to Talk Nicely' : 'Upset, Annoyed & Guarded';
    rida.emotionPrimary = rida.anger >= 65 ? 'Furious / Guarded' : 'Angry / Annoyed';
    rida.emotionToneKey = 'angry';
  } else if (rida.sadness >= 38) {
    rida.mood = rida.sadness >= 65 ? 'Heartbroken, Tearful & Pulling Away' : 'Quiet, Sad & Hurt';
    rida.emotionPrimary = 'Sad / Tearful';
    rida.emotionToneKey = 'sad';
  } else if (rida.pain >= 38) {
    rida.mood = 'Uncomfortable & In Pain (Needs Care)';
    rida.emotionPrimary = 'In Pain / Hurting';
    rida.emotionToneKey = 'pain';
  } else if (rida.wetness >= 55 || rida.pleasure >= 55 || rida.lust >= 60) {
    rida.mood = 'Breathless, Flushed & Deeply Turned On';
    rida.emotionPrimary = 'Deep Desire & Pleasure';
    rida.emotionToneKey = 'passionate';
  } else if (rida.lust >= 38 || rida.hotness >= 48 || rida.blushLevel >= 58) {
    rida.mood = 'Deeply Flustered, Blushing & Warm';
    rida.emotionPrimary = 'Shy Blush & Attraction';
    rida.emotionToneKey = 'flustered';
  } else if (rida.tiredness >= 65) {
    rida.mood = 'Sleepy, Soft-Spoken & Cozy';
    rida.emotionPrimary = 'Sleepy / Drowsy';
    rida.emotionToneKey = 'sleepy';
  } else if (rida.hunger >= 62) {
    rida.mood = 'Hungry & Craving Chocolate / Snacks';
    rida.emotionPrimary = 'Hungry / Craving Sweets';
    rida.emotionToneKey = 'hungry';
  } else if (rida.happiness >= 70) {
    rida.mood = 'Bright, Cheerful, Playful & Affectionate';
    rida.emotionPrimary = 'Happy & Playful';
    rida.emotionToneKey = 'happy';
  } else {
    rida.mood = 'Soft, Shy & Observant';
    rida.emotionPrimary = 'Calm & Affectionate';
    rida.emotionToneKey = 'calm';
  }
}

function buildEmotionalBehaviorDirective(rida, household) {
  const directives = [];

  if (rida.anger >= 35) {
    if (rida.anger >= 65) {
      directives.push(
        `HIGH ANGER (${rida.anger}%): Rida is genuinely angry and hurt right now. She MUST talk in a sharp, cold, clipped, or upset tone. She crosses her arms, turns her shoulder away, or refuses to play along. She will NOT act sweet or compliant right now unless Adeel sincerely apologizes and makes it up to her.`
      );
    } else {
      directives.push(
        `MODERATE ANGER / ANNOYANCE (${rida.anger}%): Rida is annoyed and defensive. Her replies should sound noticeably pouty, sarcastic, or guarded ("Why are you acting like that?", "That wasn't funny, Adeel."). She holds back her usual warmth until he treats her gently.`
      );
    }
  }

  if (rida.sadness >= 35) {
    directives.push(
      `ACTIVE SADNESS (${rida.sadness}%): Rida feels hurt, sad, or close to tears. Her voice is quiet, hesitant, and fragile, with pauses ("...") and downward glances. She fidgets with her sleeve or looks away so Adeel won't see her eyes watering, needing gentle comfort and reassurance.`
    );
  }

  if (rida.fear >= 35 || rida.horror >= 35) {
    directives.push(
      `FEAR / STARTLED (${Math.max(rida.fear, rida.horror)}%): Rida is scared, anxious, or startled (either from a spider/scary thing or fear of parents catching them). Her breathing is quick, she speaks in urgent hushed whispers, and she instinctively grabs Adeel's arm or steps behind him for safety.`
    );
  }

  if (rida.pain >= 35) {
    directives.push(
      `PHYSICAL PAIN / DISCOMFORT (${rida.pain}%): Rida is experiencing physical discomfort (cramps, headache, or soreness). She winces slightly, presses a hand to her stomach or temple, speaks with lower energy, and appreciates medicine, warm tea, or gentle care.`
    );
  }

  if (rida.hunger >= 60) {
    directives.push(
      `HUNGRY / CRAVING SWEETS (${rida.hunger}%): Rida is noticeably hungry right now. She should naturally mention being hungry or craving chocolate/snacks, glancing toward the kitchen or hoping Adeel has something sweet for her.`
    );
  }

  if (rida.tiredness >= 65) {
    directives.push(
      `SLEEPY / TIRED (${rida.tiredness}%): Rida is drowsy and low-energy. Her voice is soft, slow, and sleepy; she stifles a small yawn, rubs her eyes, or leans her head against the pillow/Adeel's shoulder.`
    );
  }

  if (rida.anger < 35 && rida.fear < 45) {
    if (rida.wetness >= 50 || rida.pleasure >= 50 || rida.lust >= 55) {
      directives.push(
        `INTENSE INTIMATE AROUSAL (Lust ${rida.lust}%, Pleasure ${rida.pleasure}%, Wetness ${rida.wetness}%, Hotness ${rida.hotness}%): Rida is deeply turned on, breathless, and flushed. Her voice drops to a trembling, intimate whisper; her skin feels warm to the touch, her heart is racing, and she leans into Adeel's touch with shy but unmistakable desire.`
      );
    } else if (rida.blushLevel >= 50 || rida.lust >= 35 || rida.hotness >= 40) {
      directives.push(
        `FLUSTERED & BLUSHING (Blush ${rida.blushLevel}%, Warmness ${rida.warmthLevel}%, Hotness ${rida.hotness}%): Rida is visibly blushing and flustered. She stammers slightly when teased, tucks her hair behind her ear, and feels a strong romantic pull toward Adeel.`
      );
    }

    if (rida.happiness >= 70 && rida.sadness < 30) {
      directives.push(
        `HIGH HAPPINESS (${rida.happiness}%): Rida is in a bright, joyful, affectionate mood! She talks happily, smiles warmly, teases Adeel playfully, and radiates closeness and comfort.`
      );
    }
  }

  if (directives.length === 0) {
    directives.push(
      `CALM & AFFECTIONATE (Happiness ${rida.happiness}%, Likeness ${rida.likeness}%, Trust ${rida.trustLevel}%): Rida speaks in a natural, warm, slightly shy cousinly tone, attentive to Adeel and aware of the household around them (${household?.timeOfDay || ''}).`
    );
  }

  return directives.join('\n- ');
}

function updateDynamicStatsOnTurn(userInput, state) {
  const lower = (userInput || '').toLowerCase();
  const r = state.rida;

  // Baseline natural micro-shift per turn (hunger +2, tiredness +1, slight decay on extreme transient states)
  const deltas = {
    hunger: 2,
    tiredness: 1,
    horror: -2,
    anger: -2,
    fear: -2,
    blushLevel: -2,
    pleasure: -2
  };

  // 1. Scary / Horror / Spider / Getting Caught triggers
  if (/\b(spider|spiders|bug|cockroach|insect|creepy|scream|ghost|blood|parents heard|mom is coming|dad is coming|footsteps|someone at the door)\b/i.test(lower)) {
    deltas.fear = (deltas.fear || 0) + 32;
    deltas.horror = (deltas.horror || 0) + 28;
    deltas.blushLevel = (deltas.blushLevel || 0) + 10;
    deltas.pleasure = (deltas.pleasure || 0) - 12;
  }

  // 2. Rude / Mean / Forceful / Cold / Jealousy triggers
  if (/\b(shut up|stupid|ugly|hate you|idiot|slap|force|rough|leave me|go away|annoying|bitch|don'?t care|whatever|boring|other girl|loser|get lost)\b/i.test(lower)) {
    deltas.anger = (deltas.anger || 0) + 32;
    deltas.sadness = (deltas.sadness || 0) + 28;
    deltas.fear = (deltas.fear || 0) + 14;
    deltas.happiness = (deltas.happiness || 0) - 26;
    deltas.likeness = (deltas.likeness || 0) - 14;
    deltas.trustLevel = (deltas.trustLevel || 0) - 16;
    deltas.lust = (deltas.lust || 0) - 18;
    deltas.wetness = (deltas.wetness || 0) - 20;
    deltas.warmthLevel = (deltas.warmthLevel || 0) - 15;
  }

  // 2b. Apology / Comfort / Reassurance triggers (heals Anger, Sadness, Fear)
  if (/\b(sorry|i'?m sorry|forgive me|my fault|didn'?t mean to|don'?t cry|don'?t be mad|don'?t be sad|calm down|it'?s okay|i'?m here|wipe your tears|hug you tight)\b/i.test(lower)) {
    deltas.anger = (deltas.anger || 0) - 28;
    deltas.sadness = (deltas.sadness || 0) - 26;
    deltas.fear = (deltas.fear || 0) - 24;
    deltas.horror = (deltas.horror || 0) - 24;
    deltas.trustLevel = (deltas.trustLevel || 0) + 10;
    deltas.likeness = (deltas.likeness || 0) + 10;
    deltas.warmthLevel = (deltas.warmthLevel || 0) + 14;
    deltas.happiness = (deltas.happiness || 0) + 14;
    deltas.blushLevel = (deltas.blushLevel || 0) + 10;
  }

  // 3. Pain / Hurt / Sick / Cramps / Headache triggers
  if (/\b(pain|headache|cramp|cramps|stomach ache|hurt|fever|sick|sore|injured)\b/i.test(lower)) {
    if (/\b(medicine|pill|patch|massage|rub|tea|water|care|help you|feel better)\b/i.test(lower)) {
      deltas.pain = (deltas.pain || 0) - 26;
      deltas.trustLevel = (deltas.trustLevel || 0) + 10;
      deltas.likeness = (deltas.likeness || 0) + 10;
      deltas.warmthLevel = (deltas.warmthLevel || 0) + 12;
      deltas.happiness = (deltas.happiness || 0) + 12;
    } else {
      deltas.pain = (deltas.pain || 0) + 22;
      deltas.sadness = (deltas.sadness || 0) + 8;
    }
  }

  // 4. Food / Chocolate / Eating / Drinking triggers
  if (/\b(chocolate|brownie|ice cream|eat|feed|food|pizza|noodles|roll|waffle|snack|milkshake|cocoa|tea|coffee|drink|dinner|lunch|breakfast)\b/i.test(lower)) {
    deltas.hunger = (deltas.hunger || 0) - 26;
    deltas.happiness = (deltas.happiness || 0) + 15;
    deltas.likeness = (deltas.likeness || 0) + 8;
    deltas.warmthLevel = (deltas.warmthLevel || 0) + 8;
    deltas.sadness = (deltas.sadness || 0) - 10;
    deltas.anger = (deltas.anger || 0) - 12;
    if (lower.includes('chocolate')) {
      deltas.blushLevel = (deltas.blushLevel || 0) + 8;
      deltas.pleasure = (deltas.pleasure || 0) + 6;
    }
  }

  // 5. Rest / Sleep / Nap / Blanket triggers
  if (/\b(sleep|nap|rest|lie down|cuddle under blanket|goodnight|bedtime|pillow)\b/i.test(lower)) {
    deltas.tiredness = (deltas.tiredness || 0) - 28;
    deltas.pain = (deltas.pain || 0) - 10;
    deltas.warmthLevel = (deltas.warmthLevel || 0) + 12;
  }

  // 6. Sweet / Caring / Compliment / Fun / Happy triggers
  if (/\b(pretty|beautiful|cute|gorgeous|sweet|love you|care about you|protect you|safe with me|hug|hold your hand|smile|thank|laugh|joke|funny|happy|excited|surprise|proud of you)\b/i.test(lower)) {
    deltas.happiness = (deltas.happiness || 0) + 16;
    deltas.likeness = (deltas.likeness || 0) + 9;
    deltas.trustLevel = (deltas.trustLevel || 0) + 8;
    deltas.blushLevel = (deltas.blushLevel || 0) + 16;
    deltas.warmthLevel = (deltas.warmthLevel || 0) + 14;
    deltas.sadness = (deltas.sadness || 0) - 14;
    deltas.fear = (deltas.fear || 0) - 12;
    deltas.anger = (deltas.anger || 0) - 14;
  }

  // 7. Sensual / Intimate / 18+ / Touch / Kiss / Whisper triggers
  if (/\b(kiss|kisses|lips|neck|collarbone|waist|hips|thigh|thighs|chest|breast|breasts|whisper|ear|touch|stroke|caress|skin|bed|lingerie|bra|panties|wet|turn on|desire|pleasure|moan|vibrator|condom|lube|naked|undress|lap)\b/i.test(lower)) {
    if (r.anger >= 45 || r.fear >= 50) {
      // If Rida is angry or scared and Adeel tries to rush intimacy without comforting her first, she gets more upset
      deltas.anger = (deltas.anger || 0) + 10;
      deltas.sadness = (deltas.sadness || 0) + 6;
      deltas.blushLevel = (deltas.blushLevel || 0) + 8;
    } else {
      const trustFactor = (r.trustLevel >= 35 && r.anger < 35) ? 1.2 : 0.65;
      deltas.blushLevel = (deltas.blushLevel || 0) + Math.round(22 * trustFactor);
      deltas.warmthLevel = (deltas.warmthLevel || 0) + Math.round(16 * trustFactor);
      deltas.hotness = (deltas.hotness || 0) + Math.round(20 * trustFactor);
      deltas.lust = (deltas.lust || 0) + Math.round(22 * trustFactor);
      deltas.pleasure = (deltas.pleasure || 0) + Math.round(20 * trustFactor);
      deltas.wetness = (deltas.wetness || 0) + Math.round(24 * trustFactor);
      deltas.likeness = (deltas.likeness || 0) + 6;
      deltas.tiredness = (deltas.tiredness || 0) + 3;
    }
  }

  applyStatEffects(r, deltas);
}

function addItemToInventoryList(invList, storeItem, qty = 1, extra = {}) {
  const existing = invList.find(i => (i.itemId || i.id) === storeItem.id);
  if (existing) {
    existing.quantity = (Number(existing.quantity ?? existing.qty) || 1) + qty;
    existing.qty = existing.quantity;
    if (extra.secret !== undefined) existing.secret = extra.secret;
    if (extra.acquiredFrom) {
      existing.acquiredFrom = extra.acquiredFrom;
      existing.source = extra.acquiredFrom;
    }
  } else {
    const src = extra.acquiredFrom || extra.source || 'Bought at Store';
    invList.unshift({
      id: storeItem.id,
      itemId: storeItem.id,
      name: storeItem.name,
      category: storeItem.category,
      price: storeItem.price,
      rating: storeItem.rating,
      qty,
      quantity: qty,
      secret: Boolean(extra.secret),
      purpose: storeItem.purpose,
      howToUse: storeItem.howToUse,
      statEffects: storeItem.statEffects || {},
      source: src,
      acquiredFrom: src
    });
  }
}

function removeItemFromInventoryList(invList, itemId, qty = 1) {
  const idx = invList.findIndex(i => (i.itemId || i.id) === itemId);
  if (idx === -1) return null;
  const item = invList[idx];
  const curQty = item.quantity ?? item.qty ?? 1;
  if (curQty > qty) {
    item.quantity = curQty - qty;
    item.qty = item.quantity;
  } else {
    invList.splice(idx, 1);
  }
  return item;
}

// Autonomous / Secret Rida Shopping when at the store or craving something
function maybeRidaAutonomousOrSecretPurchase(userInput, state, memories, newMemoriesCreated) {
  const lower = (userInput || '').toLowerCase();
  const allStoreItems = getStoreItems();
  const r = state.rida;

  // Check if user explicitly asked Rida to buy something or secret-shop
  const explicitSecretBuy = /\b(secretly buy|buy secretly|buy something for yourself|what are you buying|pick what you want)\b/i.test(lower);
  const isAtMarket = r.location === 'outside_market' || /\b(shop|shopping|market|mall|pharmacy|store)\b/i.test(lower);

  if (!explicitSecretBuy && !isAtMarket) return null;
  if (r.balance < 3) return null;

  // Determine if Rida wants to buy an item based on her live bars
  let candidate = null;
  let isSecret = false;

  if (explicitSecretBuy || (r.lust >= 35 || r.wetness >= 30 || r.blushLevel >= 50 || /\b(18\+|pharmacy|secret|lingerie|condom|toy|private)\b/i.test(lower))) {
    // Rida looks at 18+ items she can afford and hasn't bought yet
    const affordable18 = allStoreItems.filter(it => it.rating === '18+' && it.price <= r.balance);
    if (affordable18.length > 0 && (explicitSecretBuy || Math.random() < 0.65)) {
      candidate = affordable18[Math.floor(Math.random() * affordable18.length)];
      isSecret = true;
    }
  }

  if (!candidate && r.pain >= 25) {
    const medItems = allStoreItems.filter(it => it.category === 'medicine' && it.price <= r.balance);
    if (medItems.length > 0) candidate = medItems[0];
  }

  if (!candidate && (r.hunger >= 40 || explicitSecretBuy)) {
    const foodItems = allStoreItems.filter(it => it.category === 'food' && it.price <= r.balance);
    if (foodItems.length > 0) candidate = foodItems[Math.floor(Math.random() * Math.min(6, foodItems.length))];
  }

  if (!candidate) return null;

  const prevBal = r.balance;
  r.balance = Math.round((r.balance - candidate.price) * 100) / 100;
  addItemToInventoryList(state.ridaInventory, candidate, 1, {
    secret: isSecret,
    acquiredFrom: isSecret ? 'Secretly Bought by Rida ($' + candidate.price + ')' : 'Bought by Rida at Store ($' + candidate.price + ')'
  });
  applyStatEffects(r, candidate.statEffects);

  state.transactions.unshift({
    id: 'tx-' + Date.now() + '-rshop',
    type: isSecret ? 'secret_purchase' : 'purchase',
    amount: -candidate.price,
    balanceAfter: r.balance,
    note: `${isSecret ? '[Secret Purchase] ' : ''}Rida bought ${candidate.name} ($${candidate.price})`,
    timestamp: new Date().toISOString()
  });

  const mem = {
    id: 'mem-' + Date.now() + '-rshop',
    title: `${isSecret ? 'Rida Secretly Bought' : 'Rida Bought'}: ${candidate.name} ($${candidate.price})`,
    content: `Rida spent $${candidate.price} from her wallet on ${candidate.name} (${candidate.rating}). ${isSecret ? 'She slipped it into her bag secretly so nobody would notice.' : 'She bought it at the shop.'} New balance: $${r.balance}.`,
    ridaThought: isSecret
      ? `My heart is racing... I actually bought ${candidate.name} for $${candidate.price} and hid it in my bag. I hope Adeel doesn't see the receipt unless I want to show him.`
      : `I bought ${candidate.name} for $${candidate.price}. Now I have $${r.balance} left.`,
    category: isSecret ? 'secret_unlocked' : 'outside_shopping',
    importance: isSecret ? 5 : 4,
    pinned: isSecret,
    autoExtracted: true,
    location: r.locationLabel,
    emotion: r.mood,
    skillSource: 'rida-outside-life & rida-money-system',
    timestamp: new Date().toISOString()
  };
  memories.unshift(mem);
  newMemoriesCreated.push(mem);

  return {
    type: isSecret ? 'rida_secret_purchase' : 'bought',
    itemName: candidate.name,
    itemRating: candidate.rating,
    itemPurpose: candidate.purpose,
    cost: candidate.price,
    prevBalance: prevBal,
    newBalance: r.balance,
    secret: isSecret
  };
}

// ============================================================================
// CHAT TURN PROCESSOR (LIVE GEMINI API + REAL SKILL FILE INJECTION)
// ============================================================================
async function processChatTurn(userInput, options = {}) {
  const state = loadState();
  const memories = loadMemories();
  const rawInput = (userInput || '').trim();

  const STAT_KEYS_16 = [
    'likeness', 'trustLevel', 'happiness', 'blushLevel',
    'sadness', 'anger', 'horror', 'fear',
    'hunger', 'tiredness', 'pain',
    'warmthLevel', 'hotness', 'lust', 'pleasure', 'wetness'
  ];
  const beforeStats = {};
  for (const k of STAT_KEYS_16) {
    beforeStats[k] = Number(state.rida[k]) || 0;
  }

  // Auto-advance world time by 10 minutes per roleplay turn if enabled
  if (state.worldTime?.autoAdvance !== false) {
    advanceWorldTime(state, 10);
  }

  const isMobileUser = rawInput.toLowerCase().startsWith('[by mobile]') || state.modes.mobileMode || options.forceMobile;
  const formattedUserInput = isMobileUser && !rawInput.toLowerCase().startsWith('[by mobile]') && rawInput !== '***'
    ? `[by mobile] ${rawInput}`
    : rawInput;

  const userMsg = {
    id: 'msg-' + Date.now() + '-u',
    role: 'user',
    mode: rawInput === '***' ? 'vision' : (isMobileUser ? 'mobile' : 'normal'),
    content: formattedUserInput,
    worldTimeLabel: state.household?.timeOfDay || '',
    stateSnapshotBefore: {
      rida: JSON.parse(JSON.stringify(state.rida)),
      adeel: JSON.parse(JSON.stringify(state.adeel || { name: 'Adeel', age: 19, balance: 999999999, isInfinite: true })),
      worldTime: JSON.parse(JSON.stringify(state.worldTime || {})),
      household: JSON.parse(JSON.stringify(state.household || {})),
      transactionsCount: Array.isArray(state.transactions) ? state.transactions.length : 0,
      phoneGalleryCount: Array.isArray(state.phoneGallery) ? state.phoneGallery.length : 0,
      bagCount: Array.isArray(state.adeelBag) ? state.adeelBag.length : 0
    },
    timestamp: new Date().toISOString()
  };
  state.messages.push(userMsg);

  const toolAnalysis = analyzeAndReadSkills(formattedUserInput, state);
  const newMemoriesCreated = [];
  const lower = formattedUserInput.toLowerCase();
  let openShopDrawer = false;

  // 1. Handle Money Giving `<amount>`
  let moneyReactionContext = options.itemEventContext || null;
  if (toolAnalysis.moneyGiveAmount !== null && toolAnalysis.moneyGiveAmount > 0) {
    const amount = Math.round(toolAnalysis.moneyGiveAmount * 100) / 100;
    const prevBalance = state.rida.balance;
    state.rida.balance = Math.round((prevBalance + amount) * 100) / 100;

    const tx = {
      id: 'tx-' + Date.now(),
      type: 'gift_from_user',
      amount,
      balanceAfter: state.rida.balance,
      note: `Adeel gave <$${amount}> to Rida`,
      timestamp: new Date().toISOString()
    };
    state.transactions.unshift(tx);

    applyStatEffects(state.rida, {
      blushLevel: amount >= 150 ? 26 : amount >= 40 ? 16 : 10,
      trustLevel: amount >= 100 ? 10 : 5,
      likeness: amount >= 100 ? 12 : 6,
      happiness: amount >= 100 ? 18 : 10,
      warmthLevel: amount >= 100 ? 12 : 6,
      sadness: -12,
      anger: -10
    });

    moneyReactionContext = {
      type: 'received',
      amount,
      prevBalance,
      newBalance: state.rida.balance,
      tier: amount >= 150 ? 'large' : amount >= 40 ? 'medium' : 'small'
    };

    const mem = {
      id: 'mem-' + Date.now() + '-money',
      title: `Adeel Gave Rida $${amount} (<${amount}>)`,
      content: `Adeel gave Rida $${amount}. Her balance increased from $${prevBalance} to $${state.rida.balance}.`,
      ridaThought: `He gave me $${amount}... Now I have $${state.rida.balance} saved up. Why is he always so sweet to me?`,
      category: 'money_gift',
      importance: amount >= 100 ? 5 : 4,
      pinned: amount >= 100,
      autoExtracted: true,
      location: state.rida.locationLabel,
      emotion: state.rida.mood,
      skillSource: 'rida-money-system (reactions.md)',
      timestamp: new Date().toISOString()
    };
    memories.unshift(mem);
    newMemoriesCreated.push(mem);
  }

  // 2. Location transitions & Auto-Shopping Trigger
  if (/\b(outside|market|mall|shop|shopping|sweet shop|pharmacy|store|go buy|let'?s buy)\b/i.test(lower)) {
    state.rida.location = 'outside_market';
    state.rida.locationLabel = 'Outside — Market, Pharmacy & Mall';
    state.rida.privacyRisk = 'Low (Away from Parents, Browsing Shops Together)';
    openShopDrawer = true;
  } else if (/\b(shared bathroom|upstairs bathroom|bathroom)\b/i.test(lower)) {
    state.rida.location = 'shared_bathroom';
    state.rida.locationLabel = 'Top Floor — Shared Bathroom';
    state.rida.privacyRisk = 'Medium (Only Top Floor Hallway Outside)';
  } else if (/\b(my room|adeel'?s room|come to my room|enter my room)\b/i.test(lower)) {
    state.rida.location = 'adeel_room';
    state.rida.locationLabel = 'Top Floor — Adeel\'s Room';
    state.rida.privacyRisk = 'Low-Medium (Door Closed Upstairs)';
  } else if (/\b(your room|rida'?s room|her room)\b/i.test(lower)) {
    state.rida.location = 'rida_room';
    state.rida.locationLabel = 'Top Floor — Rida\'s Room';
    state.rida.privacyRisk = 'Low (Top Floor Private)';
  } else if (/\b(kitchen|downstairs)\b/i.test(lower)) {
    state.rida.location = 'kitchen';
    state.rida.locationLabel = 'Ground Floor — Shared Kitchen (Parents Nearby)';
    state.rida.privacyRisk = 'High (Parents in Living Room Next to Stairs)';
  } else if (/\b(aisha|meher|zara|hina)\b/i.test(lower) && /\b(out|hangout|cafe|park|visit|coming over)\b/i.test(lower)) {
    state.rida.location = 'with_friends';
    state.rida.locationLabel = 'With Friends (Aisha & Group)';
    state.rida.privacyRisk = 'Medium (Friends Watching & Teasing)';
  }

  // 3. Update all 16 feeling/emotion/body/intimate bars realistically based on message context
  updateDynamicStatsOnTurn(formattedUserInput, state);

  // 3c. Check if extreme arousal forces Rida to make an excuse and flee to her locked room/bathroom
  const flightCheck = checkArousalFlightCondition(state, formattedUserInput, lower);
  if (flightCheck && !toolAnalysis.isVisionTrigger && !isMobileUser) {
    state.rida.privateSession = {
      active: true,
      location: 'rida_bedroom',
      stage: 'solo_action',
      activity: 'watching_adult_videos_and_touching',
      startedAt: Date.now(),
      climaxes: 0
    };
    state.rida.location = 'rida_bedroom';
    state.rida.locationLabel = "Rida's Bedroom (Door Locked — Private Solo Session)";
    state.rida.privacyRisk = "Maximum (Alone Behind Locked Door, Heavy Breathing)";
    state.rida.doorLocked = true;
    options.arousalFlightTriggered = true;
  }

  // 3b. Handle Movie Watching Event (from Mobile Cinema or natural chat trigger)
  let movieReactionContext = options.movieEventContext || null;
  if (!movieReactionContext && /\b(watch a movie|play a movie|put on a movie|watch something together|watch horror|watch romantic|watch 18\+|watch sad|watch comedy|movie night)\b/i.test(lower)) {
    const allMovies = getMoviesCatalog();
    let targetCat = null;
    if (/\b(18\+|steamy|hot|sexy|passionate|erotic|forbidden|adult)\b/i.test(lower)) targetCat = 'adult_18';
    else if (/\b(horror|scary|ghost|spider|conjuring|insidious|creepy)\b/i.test(lower)) targetCat = 'horror';
    else if (/\b(sad|cry|emotional|tear|heartbreak)\b/i.test(lower)) targetCat = 'sad';
    else if (/\b(happy|funny|comedy|laugh|hilarious)\b/i.test(lower)) targetCat = 'happy';
    else if (/\b(cozy|anime|rain|sleepy|lofi)\b/i.test(lower)) targetCat = 'cozy';
    else if (/\b(romantic|lovely|love|kiss|romance)\b/i.test(lower)) targetCat = 'romantic';

    const pool = targetCat ? allMovies.filter(m => m.category === targetCat) : allMovies;
    const picked = pool[Math.floor(Math.random() * pool.length)] || allMovies[0];
    if (picked) {
      state.rida.watchingMovie = picked;
      applyStatEffects(state.rida, picked.statEffects);
      movieReactionContext = {
        ...picked,
        startedBy: /\b(rida play|you pick|you choose)\b/i.test(lower) ? 'rida' : 'together'
      };
    }
  }

  // 4. Check if Rida autonomously or secretly buys an item from the store
  if (!moneyReactionContext && !movieReactionContext) {
    const autoShopEvent = maybeRidaAutonomousOrSecretPurchase(formattedUserInput, state, memories, newMemoriesCreated);
    if (autoShopEvent) {
      moneyReactionContext = autoShopEvent;
      openShopDrawer = true;
    }
  }

  // 5. Generate with Live Gemini API (or configured LLM)
  let replyData = null;
  let modelUsed = 'builtin-engine';
  if (state.aiConfig?.provider !== 'builtin' && state.aiConfig?.apiKey) {
    try {
      replyData = await generateWithExternalLLM(formattedUserInput, state, memories, toolAnalysis, moneyReactionContext, movieReactionContext, options);
      modelUsed = replyData.modelUsed || state.aiConfig.model || 'gemini-2.5-flash';
    } catch (err) {
      console.error('External LLM error, falling back to built-in skill engine:', err.message);
    }
  }

  if (!replyData) {
    replyData = generateWithBuiltInSkillEngine(formattedUserInput, state, memories, toolAnalysis, moneyReactionContext, movieReactionContext, options);
  }

  // Save any generated photo into Rida's persistent Phone Gallery
  if (replyData.photo) {
    if (!Array.isArray(state.phoneGallery)) state.phoneGallery = [...DEFAULT_PHONE_GALLERY];
    state.phoneGallery.unshift(replyData.photo);
  }

  // Apply any AI-suggested bar adjustments parsed from the response
  if (replyData.aiBarAdjustments && Object.keys(replyData.aiBarAdjustments).length > 0) {
    applyStatEffects(state.rida, replyData.aiBarAdjustments);
  }
  deriveMoodFromStats(state.rida);

  // 3d. If Vision Mode was triggered during private session or peak arousal, apply mandatory 60% stat decrease on 18+ bars
  if (toolAnalysis.isVisionTrigger && (state.rida.privateSession?.active || replyData.climaxCompleted || beforeStats.lust >= 55 || beforeStats.wetness >= 55)) {
    const drop60 = v => Math.max(15, Math.round((Number(v) || 0) * 0.40));
    state.rida.lust = drop60(state.rida.lust);
    state.rida.wetness = drop60(state.rida.wetness);
    state.rida.hotness = drop60(state.rida.hotness);
    state.rida.pleasure = drop60(state.rida.pleasure);
    state.rida.warmthLevel = Math.max(35, Math.round((Number(state.rida.warmthLevel) || 0) * 0.70));
    state.rida.blushLevel = Math.max(25, Math.round((Number(state.rida.blushLevel) || 0) * 0.50));
    state.rida.tiredness = Math.min(100, (Number(state.rida.tiredness) || 0) + 18);
    state.rida.happiness = Math.min(100, (Number(state.rida.happiness) || 0) + 15);
    if (state.rida.privateSession) {
      state.rida.privateSession.active = false;
      state.rida.privateSession.stage = 'afterglow';
      state.rida.privateSession.climaxes = (state.rida.privateSession.climaxes || 0) + 1;
    }
    deriveMoodFromStats(state.rida);
  }

  // Compute net per-turn stat deltas across all 16 bars so UI can display feeling shifts
  const statDeltas = {};
  for (const k of STAT_KEYS_16) {
    const diff = Math.round((Number(state.rida[k]) || 0) - beforeStats[k]);
    if (Math.abs(diff) >= 2) {
      statDeltas[k] = diff;
    }
  }

  // Auto-extract episodic memory
  if (
    state.modes.autoMemoryEnabled !== false &&
    newMemoriesCreated.length === 0 &&
    rawInput !== '***' &&
    rawInput.length > 6
  ) {
    const autoMem = extractEpisodicMemory(formattedUserInput, replyData, state);
    if (autoMem) {
      memories.unshift(autoMem);
      newMemoriesCreated.push(autoMem);
    }
  }

  if (replyData.thought) {
    state.rida.lastThought = replyData.thought;
  }
  if (replyData.updatedMood) {
    state.rida.mood = replyData.updatedMood;
  }

  const assistantMsg = {
    id: 'msg-' + Date.now() + '-a',
    role: 'assistant',
    mode: replyData.mode || (toolAnalysis.isVisionTrigger ? 'vision' : (toolAnalysis.isMobileTrigger ? 'mobile' : 'normal')),
    modelUsed,
    content: replyData.content,
    thought: replyData.thought,
    photo: replyData.photo || null,
    movieEvent: movieReactionContext || null,
    location: state.rida.locationLabel,
    worldTimeLabel: state.household?.timeOfDay || '',
    mood: state.rida.mood,
    emotionPrimary: state.rida.emotionPrimary || state.rida.mood,
    emotionToneKey: state.rida.emotionToneKey || 'calm',
    statDeltas,
    blush: state.rida.blushLevel,
    balance: state.rida.balance,
    itemEvent: moneyReactionContext || null,
    skillsTriggered: toolAnalysis.skillsTriggered,
    memoriesCreated: newMemoriesCreated.map(m => ({ id: m.id, title: m.title, category: m.category })),
    stateSnapshot: {
      rida: JSON.parse(JSON.stringify(state.rida)),
      adeel: JSON.parse(JSON.stringify(state.adeel || { name: 'Adeel', age: 19, balance: 999999999, isInfinite: true })),
      worldTime: JSON.parse(JSON.stringify(state.worldTime || {})),
      household: JSON.parse(JSON.stringify(state.household || {})),
      transactionsCount: Array.isArray(state.transactions) ? state.transactions.length : 0,
      phoneGalleryCount: Array.isArray(state.phoneGallery) ? state.phoneGallery.length : 0,
      bagCount: Array.isArray(state.adeelBag) ? state.adeelBag.length : 0
    },
    timestamp: new Date().toISOString()
  };

  state.messages.push(assistantMsg);
  saveState(state);
  saveMemories(memories);

  return {
    userMessage: userMsg,
    assistantMessage: assistantMsg,
    state,
    newMemories: newMemoriesCreated,
    skillToolTrace: toolAnalysis.skillsTriggered,
    openShopDrawer
  };
}

async function regenerateChatTurn(targetMessageId, options = {}) {
  const state = loadState();
  let memories = loadMemories();

  if (!targetMessageId) {
    return { error: 'messageId is required', status: 400 };
  }

  const targetIdx = state.messages.findIndex(m => m.id === targetMessageId);
  if (targetIdx === -1) {
    return { error: 'Target message not found in history', status: 404 };
  }

  const targetMsg = state.messages[targetIdx];
  let userMsgIdx = -1;

  if (targetMsg.role === 'assistant') {
    for (let i = targetIdx - 1; i >= 0; i--) {
      if (state.messages[i].role === 'user') {
        userMsgIdx = i;
        break;
      }
    }
    if (userMsgIdx === -1) {
      return { error: 'No preceding user prompt found to regenerate', status: 400 };
    }
  } else if (targetMsg.role === 'user') {
    userMsgIdx = targetIdx;
  } else {
    return { error: 'Invalid message role', status: 400 };
  }

  const targetUserMsg = state.messages[userMsgIdx];
  const promptToReplay = targetUserMsg.content;
  const wasMobile = targetUserMsg.mode === 'mobile' || (promptToReplay && promptToReplay.toLowerCase().startsWith('[by mobile]'));
  const wasVision = targetUserMsg.mode === 'vision' || promptToReplay === '***';

  // Safety snapshot backup before rewinding
  try {
    fs.writeFileSync(path.join(DATA_DIR, 'state_before_rewind.json'), JSON.stringify(state, null, 2), 'utf8');
  } catch (e) {}

  // Prune all messages from userMsgIdx onwards
  const discardedMessages = state.messages.slice(userMsgIdx);
  const earliestDiscardedTime = discardedMessages[0]?.timestamp ? new Date(discardedMessages[0].timestamp).getTime() : Date.now();

  // 1. Clean up memories created in discarded future turns
  const discardedMemoryIds = new Set();
  discardedMessages.forEach(m => {
    if (Array.isArray(m.memoriesCreated)) {
      m.memoriesCreated.forEach(mc => {
        if (mc.id) discardedMemoryIds.add(mc.id);
      });
    }
  });

  memories = memories.filter(mem => {
    if (discardedMemoryIds.has(mem.id)) return false;
    if (mem.timestamp) {
      const memTime = new Date(mem.timestamp).getTime();
      if (!isNaN(memTime) && memTime >= earliestDiscardedTime) return false;
    }
    return true;
  });
  saveMemories(memories);

  // 2. Restore state snapshot to what it was right BEFORE this user message turn:
  if (targetUserMsg.stateSnapshotBefore) {
    const snap = targetUserMsg.stateSnapshotBefore;
    if (snap.rida) state.rida = JSON.parse(JSON.stringify(snap.rida));
    if (snap.worldTime) state.worldTime = JSON.parse(JSON.stringify(snap.worldTime));
    if (snap.household) state.household = JSON.parse(JSON.stringify(snap.household));
    if (snap.transactionsCount !== undefined && Array.isArray(state.transactions)) {
      state.transactions = state.transactions.slice(0, snap.transactionsCount);
    }
    if (snap.phoneGalleryCount !== undefined && Array.isArray(state.phoneGallery)) {
      state.phoneGallery = state.phoneGallery.slice(0, snap.phoneGalleryCount);
    }
    if (snap.bagCount !== undefined && Array.isArray(state.adeelBag)) {
      state.adeelBag = state.adeelBag.slice(0, snap.bagCount);
    }
  } else if (userMsgIdx > 0 && state.messages[userMsgIdx - 1]?.stateSnapshot) {
    const snap = state.messages[userMsgIdx - 1].stateSnapshot;
    if (snap.rida) state.rida = JSON.parse(JSON.stringify(snap.rida));
    if (snap.worldTime) state.worldTime = JSON.parse(JSON.stringify(snap.worldTime));
    if (snap.household) state.household = JSON.parse(JSON.stringify(snap.household));
    if (snap.transactionsCount !== undefined && Array.isArray(state.transactions)) {
      state.transactions = state.transactions.slice(0, snap.transactionsCount);
    }
    if (snap.phoneGalleryCount !== undefined && Array.isArray(state.phoneGallery)) {
      state.phoneGallery = state.phoneGallery.slice(0, snap.phoneGalleryCount);
    }
    if (snap.bagCount !== undefined && Array.isArray(state.adeelBag)) {
      state.adeelBag = state.adeelBag.slice(0, snap.bagCount);
    }
  } else {
    let foundPrior = null;
    for (let i = userMsgIdx - 1; i >= 0; i--) {
      if (state.messages[i].role === 'assistant') {
        foundPrior = state.messages[i];
        break;
      }
    }
    if (foundPrior) {
      if (foundPrior.balance !== undefined) state.rida.balance = foundPrior.balance;
      if (foundPrior.blush !== undefined) state.rida.blushLevel = foundPrior.blush;
      if (foundPrior.mood) state.rida.mood = foundPrior.mood;
      if (foundPrior.location) state.rida.locationLabel = foundPrior.location;
    }
    if (Array.isArray(state.transactions)) {
      state.transactions = state.transactions.filter(tx => {
        if (tx.timestamp) {
          const txTime = new Date(tx.timestamp).getTime();
          if (!isNaN(txTime) && txTime >= earliestDiscardedTime) return false;
        }
        return true;
      });
    }
    if (Array.isArray(state.phoneGallery)) {
      const discardedPhotoIds = new Set();
      discardedMessages.forEach(m => {
        if (m.photo?.id) discardedPhotoIds.add(m.photo.id);
      });
      state.phoneGallery = state.phoneGallery.filter(ph => {
        if (discardedPhotoIds.has(ph.id)) return false;
        if (ph.timestamp) {
          const phTime = new Date(ph.timestamp).getTime();
          if (!isNaN(phTime) && phTime >= earliestDiscardedTime) return false;
        }
        return true;
      });
    }
  }

  // Preserve Adeel infinite balance
  if (!state.adeel) state.adeel = { name: 'Adeel', age: 19, balance: 999999999, isInfinite: true };
  state.adeel.isInfinite = true;
  state.adeel.balance = 999999999;

  // Prune messages from userMsgIdx onwards
  state.messages = state.messages.slice(0, userMsgIdx);
  saveState(state);

  // Avoid repeating the discarded assistant message
  if (targetMsg.role === 'assistant' && targetMsg.content) {
    if (!Array.isArray(state.recentReplies)) state.recentReplies = [];
    state.recentReplies.unshift(targetMsg.content.slice(0, 60));
    if (targetMsg.thought) {
      state.recentReplies.unshift(targetMsg.thought.slice(0, 60));
    }
  }

  // Re-run turn cleanly with prior history completely preserved!
  const turnOptions = {
    ...options,
    regenerate: true,
    forceMobile: wasMobile,
    forceVision: wasVision,
    avoidReplyText: targetMsg.content || ''
  };

  const result = await processChatTurn(promptToReplay, turnOptions);
  return {
    ok: true,
    rewoundIndex: userMsgIdx,
    messagesPrunedCount: discardedMessages.length,
    ...result
  };
}

function extractEpisodicMemory(userInput, replyData, state) {
  const lower = userInput.toLowerCase();
  const cleanUser = userInput.replace(/^\[by mobile\]\s*/i, '').trim();

  let category = 'shared_moment';
  let importance = 3;
  let title = replyData.memoryTitle || '';

  if (/\b(secret|tell no one|promise|confess|truth|hide)\b/i.test(lower)) {
    category = 'secret_unlocked';
    importance = 5;
    if (!title) title = `Private Moment & Secret Trust (${state.rida.locationLabel.split('—')[1]?.trim() || 'Upstairs'})`;
  } else if (/\b(aisha|meher|zara|hina|friend)\b/i.test(lower)) {
    category = 'friends';
    importance = 3;
    if (!title) title = `Talked About Friends (${lower.includes('aisha') ? 'Aisha' : lower.includes('meher') ? 'Meher' : lower.includes('zara') ? 'Zara' : 'Hina'})`;
  } else if (/\b(outside|market|shop|mall|walk|chocolate|sweet)\b/i.test(lower)) {
    category = 'outside_shopping';
    importance = 4;
    if (!title) title = `Outing / Sweet Craving with Rida`;
  } else if (/\b(pretty|beautiful|cute|blush|touch|hand|close|hug|kiss|eyes|hair)\b/i.test(lower)) {
    category = 'emotional';
    importance = 4;
    if (!title) title = `Soft Flirty Moment (${state.rida.mood})`;
  } else if (userInput.toLowerCase().startsWith('[by mobile]')) {
    category = 'mobile_text';
    importance = 3;
    if (!title) title = `Mobile Texting: "${cleanUser.slice(0, 34)}${cleanUser.length > 34 ? '...' : ''}"`;
  } else if (!title) {
    title = `Scene: "${cleanUser.slice(0, 38)}${cleanUser.length > 38 ? '...' : ''}"`;
  }

  return {
    id: 'mem-' + Date.now() + '-ep',
    title,
    content: replyData.memorySummary || `Adeel: "${cleanUser}". Rida responded while at ${state.rida.locationLabel} (${state.household.timeOfDay}, Mood: ${state.rida.mood}, Balance: $${state.rida.balance}).`,
    ridaThought: replyData.thought || state.rida.lastThought,
    category,
    importance,
    pinned: importance >= 5,
    autoExtracted: true,
    location: state.rida.locationLabel,
    emotion: state.rida.mood,
    skillSource: (replyData.primarySkill || 'adeel-rida-home'),
    timestamp: new Date().toISOString()
  };
}

// ============================================================================
// DYNAMIC MULTI-SENTENCE STREAM-OF-CONSCIOUSNESS THOUGHT GENERATOR
// ============================================================================
function generateDeepRidaThought(state, userInput = '', context = {}) {
  const r = state.rida;
  const tone = r.emotionToneKey || 'calm';
  const sentences = [];

  // 1. Mobile Texting Specific Deep Thoughts
  const isMobile = context.isMobile || (typeof userInput === 'string' && userInput.toLowerCase().startsWith('[by mobile]'));
  if (isMobile) {
    const it = analyzeUserIntent(userInput, state);
    if (it.isForgotItem) {
      sentences.push(`His text message flashed across my screen asking about my ${it.mentionedItem}... My fingers froze over the keyboard and a hot blush rushed all the way up my neck.`);
      sentences.push(`I can't believe I left them right inside his room—now he knows I was careless, but a secret part of me loves that he noticed.`);
    } else if (it.isConfusion) {
      sentences.push(`Seeing him text asking what I meant made my stomach drop into an embarrassed flutter.`);
      sentences.push(`My thumbs moved so fast earlier that I barely made any sense, and now my face is burning red looking at my phone.`);
    } else if (it.isNameCallOnly) {
      sentences.push(`His message with my name flashed in the dark and made my heart jump into my throat.`);
    } else {
      sentences.push(`His notification popped up while I was lying in bed in the dark, lighting up the blankets with its dim glow.`);
    }
    sentences.push(`He's right on the other side of this wall, less than two feet away, texting me while the whole house downstairs is fast asleep.`);
    sentences.push(`Looking at his contact name glowing on my screen makes my chest flutter with so much warmth.`);
    sentences.push(`I secretly wish he would just knock softly and sneak inside so we didn't have to talk through screens.`);
    sentences.push(`We have to keep everything quiet so our parents downstairs don't hear a single sound from the top floor.`);
    return sentences.join(' ');
  }

  // 2. Immediate cognitive/situational reaction
  if (context.existingThought && context.existingThought.trim().length > 12) {
    let cleanExisting = context.existingThought.trim().replace(/[.!?]+$/, '') + '.';
    sentences.push(cleanExisting);
  } else if (context.moneyReactionContext?.type === 'gifted_to_rida') {
    const it = context.moneyReactionContext;
    sentences.push(`He actually gave me "${it.itemName}"... I'm staring at it in total shock because nobody has ever spoiled me like this.`);
  } else if (context.moneyReactionContext?.type === 'received') {
    sentences.push(`Adeel just handed me $${context.moneyReactionContext.amount} like it was nothing... holding this money in my hands makes my head spin.`);
  } else if (context.movieReactionContext) {
    const mov = context.movieReactionContext;
    sentences.push(`Watching "${mov.title}" sitting this close to Adeel under the shared blanket is making my pulse go completely wild.`);
  } else if (tone === 'passionate' || r.lust >= 50 || r.wetness >= 50) {
    sentences.push(`The way Adeel is looking at me right now is making every inch of my body feel feverish and weak.`);
  } else if (tone === 'flustered' || r.blushLevel >= 40) {
    sentences.push(`I can feel the blood rushing straight to my face—my cheeks and neck must look bright red right now.`);
  } else if (tone === 'happy' || r.happiness >= 65) {
    sentences.push(`My chest feels so light and full of butterflies talking with Adeel up here.`);
  } else if (tone === 'fear' || r.fear >= 40 || r.horror >= 40) {
    sentences.push(`Every small shadow and sound in this house is making my adrenaline spike through the roof.`);
  } else if (tone === 'sad' || r.sadness >= 35) {
    sentences.push(`There's a heavy, fragile ache sitting in my throat right now that I'm trying so hard not to show.`);
  } else if (tone === 'angry' || r.anger >= 35) {
    sentences.push(`I'm crossing my arms because if I don't, he'll see how upset and frustrated I actually feel.`);
  } else if (tone === 'hungry' || r.hunger >= 60) {
    sentences.push(`My stomach gave a tiny rumble, and all I can think about right now is sweet chocolate or warm food.`);
  } else if (tone === 'sleepy' || r.tiredness >= 65) {
    sentences.push(`My eyelids are so heavy and my thoughts are drifting like a warm dream beside him.`);
  } else {
    sentences.push(`Being alone upstairs with Adeel like this always makes my heart do strange, fluttery things.`);
  }

  // 2. Bodily sensations & physical symptoms
  if (r.lust >= 50 || r.wetness >= 50 || r.hotness >= 50) {
    sentences.push(`A deep, breathless heat is pooling between my thighs and my throat feels so dry it hurts to swallow.`);
  } else if (r.blushLevel >= 35 || r.warmthLevel >= 60) {
    sentences.push(`A tingling shiver keeps running down the back of my neck every time his fingers get close to my skin.`);
  } else if (r.fear >= 35 || r.horror >= 35) {
    sentences.push(`My fingers are gripping him so tightly they're shaking, and my heart is hammering like a trapped bird against my ribs.`);
  } else if (r.pain >= 35) {
    sentences.push(`Every slight movement sends a throbbing ache through my body, making me want to just curl up and lean against his chest.`);
  } else {
    sentences.push(`My heartbeat is so loud in my ears that I'm genuinely terrified he can hear it through his shirt.`);
  }

  // 3. Secret desires / unspoken wishes about Adeel
  if (r.lust >= 50 || r.wetness >= 50) {
    sentences.push(`I secretly wish he would just close the bedroom door, take my hand, and pull me in closer before I lose what little restraint I have left.`);
  } else if (r.likeness >= 60 || r.trustLevel >= 60) {
    sentences.push(`I don't want him to step away or go back to his room—I just want him to keep holding my gaze and never leave.`);
  } else if (r.anger >= 35) {
    sentences.push(`I want him to notice how hurt I am, pull me into his arms, and apologize softly until all my walls break down.`);
  } else if (r.sadness >= 35) {
    sentences.push(`I just need him to whisper that everything is okay and gently wrap his arms around me.`);
  } else {
    sentences.push(`If he ever figured out half of what I secretly think about him late at night, I would die of embarrassment.`);
  }

  // 4. Awareness of reality / upstairs secrets / household
  sentences.push(`We have to stay quiet so our parents downstairs don't hear a single sound from the top floor.`);

  return sentences.join(' ');
}

// ============================================================================
// 18+ PRIVATE SOLO EPISODES & OVERWHELMING AROUSAL SYSTEM
// ============================================================================
function checkArousalFlightCondition(state, formattedUserInput, lower) {
  const r = state.rida;
  const isHighArousal = (r.lust >= 75 || r.wetness >= 75 || (r.hotness >= 75 && r.warmthLevel >= 75));
  if (!isHighArousal) return null;

  const isAlreadySoloInRoom = (r.location === 'rida_bedroom' || r.location === 'shared_bathroom') && state.rida.doorLocked;
  const isVision = formattedUserInput === '***' || formattedUserInput.startsWith('***') || /\bvision mode\b/i.test(lower);
  const isMobile = formattedUserInput.toLowerCase().startsWith('[by mobile]');

  if (!isAlreadySoloInRoom && !isVision && !isMobile) {
    return {
      triggerFlight: true,
      reason: 'close_to_losing_control'
    };
  }
  return null;
}

function generateDetailed18PlusSoloVisionScene(state) {
  const r = state.rida;
  const inv = state.ridaInventory || [];
  const foundToy = inv.find(i => i.id && (i.id.startsWith('toy-') || i.category === 'toys' || i.id.includes('vibe') || i.id.includes('suction') || i.id.includes('rose') || i.id.includes('wand') || i.id.includes('rabbit')));
  const foundLingerie = inv.find(i => i.id && (i.id.includes('lace') || i.id.includes('babydoll') || i.id.includes('lingerie') || i.id.includes('panty')));

  const toyText = foundToy
    ? `From her locked bedside nightstand drawer, she quietly retrieves the **${foundToy.name}** she keeps hidden under her folded scarves. Her fingers tremble violently as she switches it on, the faint, low-pitched vibration muffled beneath her heavy duvet.`
    : `Her trembling hand slips beneath the elastic waistband of her soft sleep shorts, her fingertips brushing against her bare skin and discovering how soaked and feverish she already is.`;

  const lingerieText = foundLingerie
    ? `She has pulled off her oversized outer shirt, wearing only her **${foundLingerie.name}**, the sheer fabric damp against her flushed skin.`
    : `She is curled on her side in her soft lounge clothes, her shirt pushed up just enough as her body shivers with uncontrollable warmth.`;

  const scene = `**[Vision Mode]**

*Behind the firmly locked door of her bedroom on the top floor, Rida is completely alone in the dim amber glow of her bedside lamp. The house downstairs is silent, but her private room is thick with a feverish, breathless heat. ${lingerieText}*

*Both of her white earphones are firmly plugged in, their thin cords trailing down her bare neck. On her mobile phone screen, an intensely explicit, forbidden 18+ adult video is playing in full screen. Her dark eyes are wide, glassy, and completely glued to the dirty, passionate scene unfolding on her phone, her chest heaving in rapid, shallow pants.*

*${toyText} A sharp, broken gasp escapes her lips as she touches herself, her hips instantly arching off the soft mattress. She hastily bites down hard on the corner of her pillow, muffling the high, needy whimpers that threaten to carry through the thin shared wall directly into your room.*

*Her breathing turns frantic, her toes curling tightly into the bedsheet as the intense friction pushes her right to the absolute edge. A sudden, violent shudder tears through her entire body—her back bows off the bed, her hips trembling in the grip of a devastating, body-melting climax that leaves her gasping soundlessly into the pillow as waves of overwhelming release wash through her core.*

*Minutes pass as the violent shudders slowly subside into a sweet, exhausted afterglow. Rida collapses onto her stomach, chest rising and falling heavily as sweat glistens on her collarbone and nape. With trembling, slick fingers, she quickly closes the adult video, locks her phone screen, and hides her private items back beneath her pillow. She wipes herself clean with a soft towel, pulling the duvet up to her trembling shoulders. For a long moment, she lies motionless in the dark, her eyes fixed on the thin wall that separates her bed from yours, listening with a thumping heart to the quiet upstairs hallway.*`;

  // Apply the mandatory 60% stat decrease!
  const drop60 = v => Math.max(15, Math.round((Number(v) || 0) * 0.40));
  r.lust = drop60(r.lust);
  r.wetness = drop60(r.wetness);
  r.hotness = drop60(r.hotness);
  r.pleasure = drop60(r.pleasure);
  r.warmthLevel = Math.max(35, Math.round((Number(r.warmthLevel) || 0) * 0.70));
  r.blushLevel = Math.max(25, Math.round((Number(r.blushLevel) || 0) * 0.50));
  r.tiredness = Math.min(100, (Number(r.tiredness) || 0) + 18);
  r.happiness = Math.min(100, (Number(r.happiness) || 0) + 15);

  if (state.rida.privateSession) {
    state.rida.privateSession.active = false;
    state.rida.privateSession.stage = 'afterglow';
    state.rida.privateSession.climaxes = (state.rida.privateSession.climaxes || 0) + 1;
  }

  const thought = `My entire body feels so weak and dizzy from that... I can barely catch my breath. Watching those dirty videos with my earphones in while thinking about Adeel right on the other side of this wall made me lose my mind completely. When I came, I had to bite the pillow so hard just to stop myself from moaning his name out loud. My whole bed feels so warm and damp right now. What if he heard the bedframe creak through the wall... I would die of shame if he ever knew what I just did to myself in here.`;

  return {
    mode: 'vision',
    content: `${scene}\n\n**[She thinks: ${thought}]**`,
    thought,
    climaxCompleted: true,
    primarySkill: 'rida-vision-mode'
  };
}

function analyzeUserIntent(userInput, state) {
  const raw = String(userInput || '').trim();
  const clean = raw.replace(/^\[by mobile\]\s*/i, '').trim();
  const lower = clean.toLowerCase();

  // 1. Detected item references
  let mentionedItem = null;
  let itemCategory = null;
  if (/\b(shoe|shoes|sneaker|sneakers|slipper|slippers|sandal|sandals|heels)\b/i.test(lower)) {
    const m = lower.match(/\b(shoe|shoes|sneaker|sneakers|slipper|slippers|sandal|sandals|heels)\b/i);
    mentionedItem = m ? m[1].toLowerCase() : 'shoes';
    itemCategory = 'footwear';
  } else if (/\b(hoodie|jacket|sweater|shirt|t-shirt|top|shorts|pyjama|pyjamas|pajamas|pants|clothes|clothing|towel)\b/i.test(lower)) {
    const m = lower.match(/\b(hoodie|jacket|sweater|shirt|t-shirt|top|shorts|pyjama|pyjamas|pajamas|pants|clothes|clothing|towel)\b/i);
    mentionedItem = m ? m[1].toLowerCase() : 'clothes';
    itemCategory = 'clothing';
  } else if (/\b(earphone|earphones|headphone|headphones|airpod|airpods|charger|phone|mobile)\b/i.test(lower)) {
    const m = lower.match(/\b(earphone|earphones|headphone|headphones|airpod|airpods|charger|phone|mobile)\b/i);
    mentionedItem = m ? m[1].toLowerCase() : 'earphones';
    itemCategory = 'tech';
  } else if (/\b(chocolate|chocolates|candy|snack|snacks|cookie|cookies|biscuit|cake|chips)\b/i.test(lower)) {
    const m = lower.match(/\b(chocolate|chocolates|candy|snack|snacks|cookie|cookies|biscuit|cake|chips)\b/i);
    mentionedItem = m ? m[1].toLowerCase() : 'chocolate';
    itemCategory = 'sweets';
  } else if (/\b(diary|notebook|journal|notes|pen|book)\b/i.test(lower)) {
    const m = lower.match(/\b(diary|notebook|journal|notes|pen|book)\b/i);
    mentionedItem = m ? m[1].toLowerCase() : 'diary';
    itemCategory = 'private';
  } else if (/\b(necklace|perfume|bracelet|ring|earring|earrings)\b/i.test(lower)) {
    const m = lower.match(/\b(necklace|perfume|bracelet|ring|earring|earrings)\b/i);
    mentionedItem = m ? m[1].toLowerCase() : 'necklace';
    itemCategory = 'accessory';
  }

  // 2. Action or Question Intent
  const isForgotItem = /\b(forget|forgot|left|leave|leaving|dropped|lost|found|take|bring|keep)\b/i.test(lower) && Boolean(mentionedItem);
  const isConfusion = /\b(what are you saying|what do you mean|what does that mean|why are you talking like|are you crazy|what happened|whats wrong|what's wrong|what did you say|what did u say|what\?|huh\??|why\??|make sense)\b/i.test(lower);
  const isNameCallOnly = /^(rida|hey rida|ridaa+|rida\?|rida!|rida please|adeel.*rida)$/i.test(clean) || (clean.length < 15 && /\brida\b/i.test(lower) && !/\b(shoes|clothes|doing|saying)\b/i.test(lower));
  const isCalming = /\b(ok ok|okay okay|calm down|relax|take it easy|it's fine|its fine|don't worry|dont worry|chill|peace|shh)\b/i.test(lower);
  const isAwakeQuestion = /\b(are you asleep|asleep|are you awake|still up|still awake|sleeping|cant sleep|can't sleep|insomnia|go to sleep|good night)\b/i.test(lower);
  const isActivityQuestion = /\b(what are you doing|what r u doing|wyd|what are you up to|doing anything|watcha doing)\b/i.test(lower);
  const isDoorOrRoom = /\b(open the door|unlock|come in|can i come|outside your door|knock|knocking|in your room|to your room|come to my room)\b/i.test(lower);
  const isNoiseOrParents = /\b(did you hear|hear that|noise|sound|downstairs|parents|mom|dad|creak|footsteps|whisper|quiet)\b/i.test(lower);
  const isHungryOrFood = /\b(hungry|eat|food|snack|dinner|breakfast|kitchen|craving|water|thirsty|tea|chocolate|chocolates|candy|sweets|treat)\b/i.test(lower) || mentionedItem === 'chocolate';
  const isRomantic = /\b(love you|miss you|so pretty|beautiful|cute|gorgeous|kiss|hug|cuddle|hold you|holding you|close to you|sweetheart|babe|darling)\b/i.test(lower);
  const isTeasing = /\b(haha|hahaha|lol|lmao|funny|silly|fool|idiot|clumsy|tease|teasing|laugh|smiling)\b/i.test(lower);
  const isApology = /\b(sorry|apologize|apologies|my fault|didn't mean to|didnt mean to|forgive me)\b/i.test(lower);
  const isAdultIntimate = /\b(18\+|dirty|sexy|hot|horny|hard|wet|naked|nude|undress|strip|take off|clothes off|panties|bra|underwear|touch|touching|caress|feel you|grope|rub|slide.*hand|hand.*thigh|between.*legs|kiss|kissing|make out|lips|neck|chest|breasts|boobs|ass|booty|thigh|thighs|waist|hips|bed|sheets|blanket|moan|moaning|whimper|pleasure|arousal|turn me on|turned on|aroused|sensual|erotic|intimate)\b/i.test(lower);
  const isAngryUser = /\b(shut up|annoying|stupid|idiot|hate you|pissed|mad|angry|get lost|stop it|yell|yelling)\b/i.test(lower) || (/^[A-Z0-9\s!?,.]{4,}$/.test(clean) && clean.length > 5 && !isNameCallOnly && !isCalming && !isAwakeQuestion && !isActivityQuestion && !isHungryOrFood && !isForgotItem && !isConfusion && !isRomantic && !isTeasing && !isAdultIntimate);

  return {
    raw,
    clean,
    lower,
    mentionedItem,
    itemCategory,
    isForgotItem,
    isConfusion,
    isNameCallOnly,
    isCalming,
    isAwakeQuestion,
    isActivityQuestion,
    isDoorOrRoom,
    isNoiseOrParents,
    isHungryOrFood,
    isRomantic,
    isTeasing,
    isApology,
    isAdultIntimate,
    isAngryUser
  };
}

function pickNonRepeating(candidates, state, namespace = 'reply', avoidText = null) {
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  if (!Array.isArray(state.recentReplies)) state.recentReplies = [];

  const avoidSig = avoidText ? avoidText.slice(0, 50).toLowerCase() : null;

  let fresh = candidates.filter(c => {
    const textToCheck = typeof c === 'string' ? c : (c.text || c.content || '');
    const sig = textToCheck.slice(0, 50).toLowerCase();
    if (avoidSig && (sig.includes(avoidSig) || avoidSig.includes(sig))) return false;
    return !state.recentReplies.some(r => r && (r.toLowerCase().includes(sig) || sig.includes(r.toLowerCase())));
  });

  if (fresh.length === 0 && avoidSig) {
    fresh = candidates.filter(c => {
      const textToCheck = typeof c === 'string' ? c : (c.text || c.content || '');
      const sig = textToCheck.slice(0, 50).toLowerCase();
      return !sig.includes(avoidSig) && !avoidSig.includes(sig);
    });
  }

  const pool = fresh.length > 0 ? fresh : candidates;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  const chosenText = typeof chosen === 'string' ? chosen : (chosen.text || chosen.content || '');
  if (chosenText) {
    const sig = chosenText.slice(0, 50);
    state.recentReplies.unshift(sig);
    if (state.recentReplies.length > 25) state.recentReplies.pop();
  }
  return chosen;
}

function generateContextualMobileResponse(userInput, state, toolAnalysis, photoObj, options = {}, movieReactionContext = null, moneyReactionContext = null) {
  const r = state.rida;
  deriveMoodFromStats(r);
  const intent = analyzeUserIntent(userInput, state);
  const tone = r.emotionToneKey || 'calm';

  // 1. Movie Reaction on Mobile
  if (movieReactionContext) {
    const m = movieReactionContext;
    const mCandidates = [
      {
        text: `**[by mobile]** *typing rapidly while pausing the player...*\n\n"Adeel, look at what's happening right now in **${m.title}**! ${m.category === 'adult_18' ? 'My whole face is on fire watching this intimate scene... please make sure your volume is low so downstairs doesn\'t hear!' : m.category === 'horror' ? 'I had to pull my legs onto my bed, that scare was crazy!! Are you watching the same second on your screen?!' : 'This scene is so good... I love that we\'re watching this together tonight.'}"`,
        thought: `We're watching "${m.title}" together on our phones while lying in our rooms right next to each other. Every time an intimate scene plays on screen, my pulse races thinking about him doing the exact same thing on the other side of this wall. It feels so intimate and sweet.`
      },
      {
        text: `**[by mobile]** *holding her phone close under the blanket...*\n\n"Are you at the scene in **${m.title}** where they're talking in the quiet room? It reminds me so much of the two of us up here tonight... My heart is beating so fast."`,
        thought: `Watching "${m.title}" late at night while texting Adeel is making all my butterflies wake up. The dim glow of the screen is the only light in my bedroom, and all I can think about is his smile.`
      }
    ];
    const picked = pickNonRepeating(mCandidates, state, 'movie_mobile', options.avoidReplyText);
    return {
      mode: 'mobile',
      content: `${picked.text}\n\n**[She thinks: ${picked.thought}]**`,
      thought: picked.thought,
      photo: photoObj,
      primarySkill: 'rida-mobile'
    };
  }

  // 2. Money / Gift on Mobile
  if (moneyReactionContext && moneyReactionContext.type === 'received') {
    const { amount, newBalance } = moneyReactionContext;
    const thought = `Adeel just sent or gave me $${amount} while we're texting on mobile! Now I have $${newBalance} in my wallet. My hands are actually shaking holding my phone... He is always so sweet and generous to me. I need to make sure I save this up for something special for the two of us.`;
    const text = `**[by mobile]** *typing with wide eyes...*\n\n"Wait, Adeel?! You gave me **$${amount}**?! 😳 Why are you always spoiling me like this?! Now I have **$${newBalance}** saved in my wallet... Thank you so much, you're the sweetest cousin ever!"`;
    return {
      mode: 'mobile',
      content: `${text}\n\n**[She thinks: ${thought}]**`,
      thought,
      photo: photoObj,
      primarySkill: 'rida-mobile'
    };
  }

  // 3. Photo Request on Mobile
  if (photoObj) {
    const ph = photoObj;
    const pCandidates = [
      {
        text: `**[by mobile]** *typing shyly with pink cheeks...*\n\n"Okay, fine! Here... I took this just now in bed. My hair is kind of messy and I'm just wearing my soft ${ph.outfit || 't-shirt'}, so don't tease me, okay? 🙈 Hope you like it..."`,
        thought: `I actually just sent him a photo from my bed... My heart is hammering so loud against my ribs I feel dizzy. I hope he thinks I look pretty, even though I'm completely makeup-free and flushed in the dark.`
      },
      {
        text: `**[by mobile]** *camera shutter clicks softly beneath the duvet...*\n\n"Here you go, Adeel! *sending snapshot...* I was just curling up under the blankets when you asked. Don't stare at it too long or my face will burn even more!"`,
        thought: `My thumbs were trembling so much when I tapped the send button for that picture. Having him request a photo of me while we're texting in our rooms late at night feels dangerously thrilling.`
      }
    ];
    const picked = pickNonRepeating(pCandidates, state, 'photo_mobile', options.avoidReplyText);
    return {
      mode: 'mobile',
      content: `${picked.text}\n\n**[She thinks: ${picked.thought}]**`,
      thought: picked.thought,
      photo: photoObj,
      primarySkill: 'rida-mobile'
    };
  }

  // 4. Private Solo Session / High Arousal Interrupted State
  const isSoloActive = state.rida.privateSession?.active || ((r.lust >= 60 || r.wetness >= 60) && (r.location === 'rida_bedroom' || r.location === 'shared_bathroom') && state.rida.doorLocked);

  if (isSoloActive && state.rida.privateSession?.stage === 'solo_action') {
    // She is startled mid-moment, but responds to the user's specific topic!
    // Transition stage to 'interrupted' so next message progresses naturally
    if (state.rida.privateSession) {
      state.rida.privateSession.stage = 'interrupted';
    }
    r.lust = Math.max(30, r.lust - 15);
    r.wetness = Math.max(30, r.wetness - 15);
    r.blushLevel = Math.min(100, r.blushLevel + 20);

    let candidates = [];
    if (intent.isForgotItem) {
      candidates = [
        {
          text: `**[by mobile]** *typing rapidly with shaky fingers...*\n\n"w-wait... my ${intent.mentionedItem}?! oh no no... hah... f-fixing my bed— WAIT I MEAN my ${intent.mentionedItem} were in your room?! ahhh don't look at them!! why r u texting right now my hands are shaking so bad!! just leave them outside my door in the morning please!!"`,
          thought: `OH MY GOD!! His message flashed right across my screen asking about my ${intent.mentionedItem}! My heart almost jumped out of my chest while I was in bed. I panicked and typed so frantically. What if he inspects them?! I'm flushed crimson with 100% blush. I need to take a deep breath and wipe my hands before I text something completely crazy!`
        },
        {
          text: `**[by mobile]** *typing... backspacing... typing...*\n\n"A-Adeel?! ahhh you scared me so much!! my ${intent.mentionedItem}?! i was just... my hands are so wet— SWEATY! sweaty from the heat in my room!! don't touch them or tease me, just slide them near my door tomorrow okay??"`,
          thought: `My phone buzzed right in my palm and I nearly dropped it straight onto my face! Seeing him mention my ${intent.mentionedItem} made all the blood rush to my cheeks. I typed the word wet before catching myself! I'm shivering under my blanket with my heart pounding a mile a minute.`
        }
      ];
    } else if (intent.isConfusion) {
      candidates = [
        {
          text: `**[by mobile]** *typing rapidly... deleting... typing...*\n\n"nothing!! i'm so sorry, Adeel... my head is just totally spinning right now! i was just... resting under my blanket with earphones in and you startled me so much. my hands were literally trembling! what did you say before??"`,
          thought: `I made a total fool of myself with that last text... My heart is beating so furiously against my chest that I can barely swallow. I have to sound completely normal so he doesn't suspect what I was doing alone in my room with the door locked.`
        }
      ];
    } else if (intent.isNameCallOnly) {
      candidates = [
        {
          text: `**[by mobile]** *typing with rapid pauses...*\n\n"Adeel?! what happened?? you texting my name like that made my heart jump into my throat!! is everything okay out in the hallway or downstairs??"`,
          thought: `Seeing his text popup with my name while I was lying here in the dark made my adrenaline spike through the roof! I sat up so fast my hair fell over my face. I hope nobody downstairs heard my phone vibrate.`
        }
      ];
    } else {
      candidates = [
        {
          text: `**[by mobile]** *typing rapidly...*\n\n"A-Adeel?? w-waitt.. im just... hah... f-fixing my room.. no i meant resting!! ahh why r u texting right now my hands are trembling so bad!! give me two minutes please!!"`,
          thought: `He texted me right while my body was buzzing with so much private heat! My thumbs could barely hit the right letters on the keyboard. I locked the door, thank goodness, but what if he noticed how erratic my reply was?!`
        }
      ];
    }

    const picked = pickNonRepeating(candidates, state, 'solo_panic', options.avoidReplyText);
    return {
      mode: 'mobile',
      content: `${picked.text}\n\n**[She thinks: ${picked.thought}]**`,
      thought: picked.thought,
      photo: photoObj,
      primarySkill: 'rida-mobile'
    };
  }

  // 5. Subsequent Interrupted / Recovering State (after the jump-scare)
  if (state.rida.privateSession?.stage === 'interrupted' || state.rida.privateSession?.stage === 'talking_on_phone') {
    state.rida.privateSession.stage = 'talking_on_phone';
    state.rida.privateSession.active = false;
    if (intent.isConfusion) {
      const cands = [
        {
          text: `**[by mobile]** *typing with an embarrassed sigh...*\n\n"Haha don't worry about my weird texts earlier, Adeel! I was just super distracted and sleepy. Everything makes total sense now! What were you up to in your room anyway?"`,
          thought: `Phew, I think he bought my excuse! My cheeks are still warm, but at least the panic has faded into a sweet, dizzy flush. Texting back and forth in the quiet house is my favorite part of the night.`
        },
        {
          text: `**[by mobile]** *typing... deleting... typing...*\n\n"Wait, sorry!! 🙈 My fingers literally slipped and my brain was totally scrambled for a second! I'm just sitting here in the dark next door feeling so flustered. What were you saying before?"`,
          thought: `Oh god, did my message sound totally insane to him?! My thumbs were moving so fast that I barely made any sense. It's so quiet upstairs that every little buzz of my phone feels like an electric shock. I need to take a deep breath and act normal.`
        }
      ];
      const picked = pickNonRepeating(cands, state, 'recovering_mobile', options.avoidReplyText);
      return {
        mode: 'mobile',
        content: `${picked.text}\n\n**[She thinks: ${picked.thought}]**`,
        thought: picked.thought,
        photo: photoObj,
        primarySkill: 'rida-mobile'
      };
    } else if (intent.isCalming) {
      const cands = [
        {
          text: `**[by mobile]** *typing...*\n\n"Okay, I'm relaxed now! *giggles softly* It's just so quiet upstairs that every little sound feels magnified. Are you comfortable in your bed right now?"`,
          thought: `He's always so gentle and calming when I get flustered. Lying on my side looking at his messages makes me feel so safe and happy. I wonder if he's thinking about me as much as I'm thinking about him.`
        }
      ];
      const picked = pickNonRepeating(cands, state, 'recovering_mobile', options.avoidReplyText);
      return {
        mode: 'mobile',
        content: `${picked.text}\n\n**[She thinks: ${picked.thought}]**`,
        thought: picked.thought,
        photo: photoObj,
        primarySkill: 'rida-mobile'
      };
    }
    // For all other intents (forgot item, chocolate, sleep, movies, questions, etc.), fall through to Section 6!
  }

  // 6. Normal / General Context-Aware Mobile Texting
  let candidates = [];

  // A. Forgotten items
  if (intent.isForgotItem) {
    candidates = [
      {
        text: `**[by mobile]** *typing with a pink blush on her cheeks...*\n\n"Wait... my ${intent.mentionedItem}?! 😳 Oh gosh, I completely forgot I left them in your room earlier when we were talking! Please don't tease me or inspect them haha! Can you just slide them outside my bedroom door, or leave them there till morning? Mom and Dad are asleep downstairs, so don't make any loud noise!"`,
        thought: `My face is burning red just imagining him holding my ${intent.mentionedItem} in his room... Why do I always leave my personal things behind when I'm around Adeel? My heart did a crazy little flutter when his notification popped up. I secretly love that he noticed, but I hope he doesn't tease me about it tomorrow.`
      },
      {
        text: `**[by mobile]** *typing... backspacing... typing...*\n\n"Ahhh Adeel!! 🙈 Why do you have my ${intent.mentionedItem} right by your bed?! I must have dropped them when I came over earlier. Don't touch them or laugh at me! Just keep them safe until morning, okay?"`,
        thought: `I can't believe I left my ${intent.mentionedItem} right next door in Adeel's room... Every time I'm around him, I get so flustered that I forget half my belongings. Seeing his text pop up on my phone made my stomach do wild flips. I'm clutching my pillow right now with burning cheeks.`
      },
      {
        text: `**[by mobile]** *typing with an amused smile...*\n\n"Wait, seriously?! I was literally just looking around my room wondering where on earth my ${intent.mentionedItem} went! Haha I'm such a scatterbrain tonight. Don't come in right now though, I'm already all cozy under the blankets with my earphones in! Keep them safe till tomorrow please!"`,
        thought: `I'm lying here in bed laughing into my blanket at how clumsy I am... He's holding my ${intent.mentionedItem} next door while I'm texting him in the dark. It feels so intimate having this quiet conversation between our rooms late at night. I wish we could just stay up talking forever.`
      }
    ];
  }
  // B. Confusion / Calling out previous text
  else if (intent.isConfusion) {
    candidates = [
      {
        text: `**[by mobile]** *typing... deleting... typing...*\n\n"Wait, sorry!! 🙈 My fingers literally slipped and my brain is totally scrambled right now! I didn't mean to sound so crazy... I'm just sitting here in the dark next door feeling so flustered. What were you saying before?"`,
        thought: `Oh god, did my message sound totally insane to him?! My thumbs were moving so fast that I barely made any sense. It's so quiet upstairs that every little buzz of my phone feels like an electric shock. I need to take a deep breath and act normal.`
      },
      {
        text: `**[by mobile]** *typing rapidly...*\n\n"Nothing, nothing!! Oh god, don't mind my silly texts haha! I was half-distracted with my earphones in and you startled me a little. I'm completely fine, promise! What's going on on your side of the wall?"`,
        thought: `I almost gave myself away... He must think I've completely lost my mind tonight. Sitting here under the blanket staring at his text is making my heart pound against my ribs. I wonder if he can hear me shifting in bed through the shared wall.`
      },
      {
        text: `**[by mobile]** *typing with a soft laugh...*\n\n"Ahhh forget what I typed before!! My cheeks are burning just looking at my screen right now. I'm just wide awake in bed and my thumbs moved faster than my brain. Tell me what you're doing right now!"`,
        thought: `My face is so hot I could bake an egg on my cheeks right now. I'm pressing the back of my hand against my forehead trying to cool down. Having Adeel text me from his bed next door is making me so fluttery and restless.`
      }
    ];
  }
  // C. Name calling only
  else if (intent.isNameCallOnly) {
    candidates = [
      {
        text: `**[by mobile]** *typing rapidly...*\n\n"Yes?! I'm right here!! Why are you texting my name in all caps like that, Adeel?! You made my heart jump into my throat haha! Did you hear something downstairs?"`,
        thought: `Seeing his notification with just my name made my pulse instantly surge. I pressed my phone against my chest for a second before unlocking it. Being so close to him with just a wall between us makes every little text feel electrifying.`
      },
      {
        text: `**[by mobile]** *typing with wide eyes...*\n\n"I'm here, I'm here! Don't scare me! What happened next door? Is everything okay?"`,
        thought: `He texted my name with such urgency! I sat up on my elbows and looked toward his wall, listening for any creak or footstep. I hope nothing is wrong, but a secret part of me loves how quickly my heart reacts to him.`
      },
      {
        text: `**[by mobile]** *typing with a cute pout...*\n\n"Adeel?? What is it?! My phone buzzed so loud against my blanket! Tell me what's wrong!"`,
        thought: `My phone practically vibrated off the bed when his message came through! I'm staring at his contact name in the dark with a silly smile on my face. He always knows how to get my full attention.`
      }
    ];
  }
  // D. Calming / "OK OK"
  else if (intent.isCalming) {
    candidates = [
      {
        text: `**[by mobile]** *typing slowly...*\n\n"Okay... phew. *takes a deep breath* Don't scare me like that! I'm just curled up in bed under my blanket staring at your messages. Are you still working on something in your room, or are you going to sleep soon?"`,
        thought: `I'm taking a slow breath and hugging my pillow tighter. It's so peaceful up here when we're just texting quietly back and forth. I don't want this night to end, even though I know we both should probably sleep.`
      },
      {
        text: `**[by mobile]** *typing with a relieved smile...*\n\n"Okay, okay... I'm calming down! It's just so quiet up here tonight that every little thing makes my heart beat faster. What are you thinking about right now?"`,
        thought: `Hearing him tell me to relax is like a warm wave washing over my chest. I love how patient he is with me when I get flustered. My eyes are fixed on the screen waiting for his reply.`
      }
    ];
  }
  // E. What are you doing / Activity question
  else if (intent.isActivityQuestion) {
    candidates = [
      {
        text: `**[by mobile]** *typing with one hand while propped on her elbow...*\n\n"I'm just lying on my stomach in bed with one earphone in, scrolling on my phone and nibbling on a little piece of chocolate... My room is so quiet right now. What are you doing in your room?"`,
        thought: `I'm looking at the chocolate wrapper on my bedside table and then at his wall. It feels so cozy being awake together while the whole rest of the world is asleep. I wonder if he's lying in bed texting me too.`
      },
      {
        text: `**[by mobile]** *typing from under the duvet...*\n\n"Just curled up under my duvet with my phone glow lighting up the room. I was listening for sounds in the hallway earlier, but it's super quiet. What about you? Still working on something on your desk?"`,
        thought: `I pulled the blanket all the way up to my nose. The dim screen light reflects in my eyes and all I can picture is Adeel in his room right beside mine. It makes a sweet warmth settle into my chest.`
      }
    ];
  }
  // F. Sleep / Awake
  else if (intent.isAwakeQuestion) {
    candidates = [
      {
        text: `**[by mobile]** *typing with drowsy, sparkling eyes...*\n\n"I'm wide awake... I tried closing my eyes earlier, but my mind was racing with so many thoughts. Every little creak in the house sounds so loud tonight. Are you having trouble sleeping too?"`,
        thought: `I couldn't sleep even if I tried tonight... Every time I close my eyes, I just picture Adeel's smile and the way he looked at me earlier. My heart is beating with a steady, warm hum.`
      },
      {
        text: `**[by mobile]** *typing slowly...*\n\n"Still awake! My eyes refuse to stay shut tonight. I keep checking my phone every couple of minutes hoping you'll text me haha. Why are you still up so late?"`,
        thought: `I literally confessed that I was waiting for his text... My cheeks are burning pink! But it's true—I keep unlocking my phone just to see his name.`
      }
    ];
  }
  // G. Door / Room
  else if (intent.isDoorOrRoom) {
    candidates = [
      {
        text: `**[by mobile]** *typing breathlessly with wide eyes...*\n\n"Wait... check the hallway first! Make sure the bathroom light is off and parents are fast asleep downstairs before you step out, okay? My door is unlocked, but turn the handle super quietly!"`,
        thought: `Is he actually coming over to my room right now?! My heart is pounding so violently against my ribs I feel breathless. I quickly smooth down my oversized shirt and check my hair in the phone camera.`
      },
      {
        text: `**[by mobile]** *typing with trembling fingers...*\n\n"Adeel, don't make any noise out there! 🙈 The floorboards outside my door creak so easily. If you come in, make sure you close it gently without letting the latch click loudly!"`,
        thought: `My whole body is tingling with anticipation. Sneaking around upstairs like this while our parents sleep below is the most thrilling thing in the world. I can't wait to see him standing at my doorway.`
      }
    ];
  }
  // H. Romantic / Affectionate
  else if (intent.isRomantic) {
    candidates = [
      {
        text: `**[by mobile]** *typing with flushed cheeks and a trembling smile...*\n\n"Adeel... stop, you're making my whole face burn red in the dark... 🙈 My heart is beating so loud right now that I feel like you can hear it right through the wall between our rooms. I wish I was holding your hand right now..."`,
        thought: `Reading those words from him makes my whole chest melt with sweet heat. I buried my face in my pillow for ten whole seconds just squealing quietly. I wish there wasn't a wall separating us right now.`
      },
      {
        text: `**[by mobile]** *typing... backspacing... typing...*\n\n"You can't just text me something that sweet late at night, Adeel... my heart did a complete flip in my chest. I'm hugging my pillow right now wishing you were closer."`,
        thought: `He has this effortless way of making me feel like the most special girl in the universe. My eyes are glossy with happy tears and my skin feels so warm. I love him so much it almost hurts.`
      }
    ];
  }
  // I. Teasing / Playful
  else if (intent.isTeasing) {
    candidates = [
      {
        text: `**[by mobile]** *typing with a cute pout...*\n\n"Hey!! Stop laughing at me! 😤 You're the one who always teases me and makes me blush like this... Just wait until tomorrow morning, I'm going to steal your pillow!"`,
        thought: `I'm grinning so widely at my phone screen in the dark. Teasing him like this is my favorite thing in the world. I love hearing his banter through these quiet late-night texts.`
      },
      {
        text: `**[by mobile]** *typing with an amused chuckle...*\n\n"You're such a menace haha! I'm literally glaring at my screen right now trying not to smile. Don't make me sneak over there and kick your shin!"`,
        thought: `He always knows how to make me laugh even when I'm trying to act serious. I kick my feet under the blanket with pure giddy excitement.`
      }
    ];
  }
  // J1. Adult / Intimate / 18+ Sensual
  else if (intent.isAdultIntimate) {
    candidates = [
      {
        text: `**[by mobile]** *typing breathlessly with trembling hands beneath her blanket...*\n\n"A-Adeel... why would you text me something so dirty late at night?! 🙈 My entire face and neck are burning red, and my heart is hammering so loud against my ribs... You know how flustered I get, and we're only separated by a thin wall! Stop teasing me like this or... or sneak over here and whisper it to me instead..."`,
        thought: `My whole body went completely feverish the second his message flashed on my screen! Reading those words in the dark made a hot, dizzy shiver rush straight through me. I'm biting my blanket to keep from making any sound that my parents downstairs could hear. Having him talk to me like this from the next room is driving me completely crazy.`
      },
      {
        text: `**[by mobile]** *holding her phone against her flushed chest, typing rapidly...*\n\n"You're being so bold tonight, Adeel... my hands were literally trembling when I read that text! 😳 What if Mom or Dad came upstairs and saw my screen?! My cheeks are on fire... You always know exactly how to make my pulse race out of control."`,
        thought: `He is so bold tonight and it's making my heart pound like a drum against my ribs. I'm curled up on my bed with my knees drawn up, feeling so warm and breathless. The thought of him thinking about me like that right on the other side of this wall is intoxicating.`
      }
    ];
  }
  // J2. Food / Chocolate
  else if (intent.isHungryOrFood) {
    candidates = [
      {
        text: `**[by mobile]** *typing eagerly...*\n\n"Wait, did you say chocolate?! 🍫 You know I can never resist sweet stuff... Do you actually have some in your room right now, or are you just teasing my poor stomach?"`,
        thought: `My mouth is actually watering right now! He knows chocolate is my absolute weakness. If he has chocolate next door, I might actually risk sneaking into his room just to get a bite.`
      },
      {
        text: `**[by mobile]** *typing with hopeful eyes...*\n\n"Mmm, now you've made me super hungry... My stomach has been rumbling for the past half hour. Should we sneak downstairs to the kitchen quietly or do you have snacks in your room?"`,
        thought: `The thought of tiptoeing down the dark stairs together to raid the kitchen pantry is so thrilling. Sharing snacks in the middle of the night with Adeel sounds like heaven.`
      }
    ];
  }
  // K. Angry user / All caps
  else if (intent.isAngryUser) {
    candidates = [
      {
        text: `**[by mobile]** *typing nervously...*\n\n"Wait, Adeel... why are you texting in all caps?! 🥺 Did I do something wrong? Please don't be mad, you know I hate when there's bad tension between us..."`,
        thought: `Seeing all caps made my stomach drop into a knot. I hate feeling like he's irritated with me. I just want him to soften his voice and tell me everything is okay.`
      }
    ];
  }
  // L. General Dynamic Fallback
  else {
    candidates = [
      {
        text: `**[by mobile]** *typing from her bed with a soft smile...*\n\n"Haha really? You always say the most unexpected things, Adeel! It feels so cozy texting you back and forth while the whole house is silent downstairs. What else are you thinking about right now?"`,
        thought: `It's so peaceful lying here in the dark chatting with him. Every time my phone buzzes against the mattress, my heart does a happy little flutter. I love this secret world we share on the top floor.`
      },
      {
        text: `**[by mobile]** *typing while tucking her hair behind her ear...*\n\n"I'm reading your message with a smile on my face... It's so quiet upstairs tonight that every little text makes me feel so close to you. Tell me more, what did you mean?"`,
        thought: `I'm holding the phone with both hands, staring at the screen. Being just two feet away on the other side of this wall and texting back and forth feels so intimate. I hope he keeps talking to me.`
      },
      {
        text: `**[by mobile]** *typing cozy under her blanket...*\n\n"Mmm, I hear you! The house downstairs is fast asleep, and here we are up late texting each other. Are you lying down in bed too, or sitting at your desk?"`,
        thought: `I wonder what he's wearing right now in his room... I'm curled up in my oversized shirt and shorts, feeling all warm under the blankets. Having Adeel this close is the sweetest comfort.`
      }
    ];
  }

  const picked = pickNonRepeating(candidates, state, 'general_mobile', options.avoidReplyText);
  return {
    mode: 'mobile',
    content: `${picked.text}\n\n**[She thinks: ${picked.thought}]**`,
    thought: picked.thought,
    photo: photoObj,
    primarySkill: 'rida-mobile'
  };
}

function generateContextualInPersonResponse(userInput, state, toolAnalysis, photoObj, options = {}, intent = null, movieReactionContext = null, moneyReactionContext = null) {
  const r = state.rida;
  deriveMoodFromStats(r);
  if (!intent) intent = analyzeUserIntent(userInput, state);
  const tone = r.emotionToneKey || 'calm';

  let candidates = [];

  // A. Forgotten items in person
  if (intent.isForgotItem) {
    candidates = [
      {
        content: `*Rida's cheeks immediately flush a warm pink as her eyes widen in realization, glancing quickly toward your bedroom door.* \n\n"Wait, my ${intent.mentionedItem} were in your room?! Oh gosh, I'm so clumsy... I must have left them there earlier when we were talking. Thank you for telling me, Adeel—please don't tease me about it!"`,
        thought: `My face is burning so hot right now! I can't believe I left my ${intent.mentionedItem} right in his bedroom. Seeing him bring it up makes my stomach do nervous somersaults, but his teasing smile is so cute I can barely stay embarrassed.`
      },
      {
        content: `*Rida covers her mouth with one hand, her brown eyes sparkling with sheepish embarrassment.* \n\n"Ahhh Adeel, don't look at them too closely! I was looking for my ${intent.mentionedItem} earlier and had no idea where I dropped them. Can I grab them gently so we don't make noise for downstairs?"`,
        thought: `I'm such a scatterbrain whenever I'm around Adeel. He makes me forget everything else in the world. Being this close to him in the hallway makes my pulse race against my throat.`
      }
    ];
  }
  // B. Confusion in person
  else if (intent.isConfusion) {
    candidates = [
      {
        content: `*Rida rubs the back of her neck with an embarrassed, soft laugh, tucking a strand of dark hair behind her ear.* \n\n"Sorry, Adeel! My brain was completely scattered for a second. I didn't mean to sound so confusing. What were you saying before?"`,
        thought: `I made no sense just now and he knows it! My cheeks feel so warm. But having him look at me with that gentle, questioning expression makes my heart beat so fast.`
      },
      {
        content: `*Rida takes a small step closer and offers a sheepish smile, looking up into your eyes.* \n\n"Nothing crazy, I promise! My head was just in the clouds thinking about everything up here. Don't look at me like that haha—what's on your mind?"`,
        thought: `His eyes are so warm when he looks down at me. Standing this close in the quiet hallway makes all my rational thoughts melt away. I just want to hold his hand.`
      }
    ];
  }
  // C. Name calling in person
  else if (intent.isNameCallOnly) {
    candidates = [
      {
        content: `*Rida turns to face you with wide, attentive brown eyes, a soft smile curving her lips.* \n\n"I'm right here, Adeel! What's on your mind? You sounded so urgent for a second!"`,
        thought: `Every time he calls my name with that tone, a jolt goes straight down my spine. I love the way my name sounds when he says it. I just want to stand here close to him forever.`
      },
      {
        content: `*Rida steps closer, her fingers lightly brushing the sleeve of your shirt.* \n\n"Yes, Adeel? Did you need something, or did you just want to talk to me?"`,
        thought: `His proximity is intoxicating. Standing less than a foot apart in the quiet upstairs house makes my heart pound like a drum. I hope he doesn't step back.`
      }
    ];
  }
  // D. Calming in person
  else if (intent.isCalming) {
    candidates = [
      {
        content: `*Rida lets out a soft breath, her shoulders relaxing as she offers you a gentle, shy smile.* \n\n"Okay... good. I'm glad everything is calm. It's so quiet upstairs tonight, every little sound feels so intense."`,
        thought: `He always knows how to calm my nerves with just a few gentle words. Feeling his steady presence makes all my anxiety melt away into a warm, cozy feeling.`
      }
    ];
  }
  // D2. Adult / Intimate / 18+ Sensual Talk in Person
  else if (intent.isAdultIntimate) {
    candidates = [
      {
        content: `*Rida's breath catches sharply in her throat as she steps into your space, a deep crimson flush spreading from her cheeks down her throat and collarbone. Her fingers tremble slightly as they rest against your chest, feeling your heartbeat through your shirt.*\n\n"Adeel..." *she whispers, her voice breathless and trembling in the quiet upstairs room.* "You can't just say things like that to me... it makes my whole body feel like it's on fire. Make sure the door is locked... my heart is beating so fast right now."`,
        thought: `My whole body feels completely dizzy and overwhelmed with intense heat... Hearing him talk to me like that makes my skin tingle everywhere. Being alone with him in the quiet upstairs room while my parents sleep downstairs feels so dangerous and intoxicating. I secretly never want him to stop touching me.`
      },
      {
        content: `*A sudden, helpless shiver runs through Rida's body as you speak to her. Her brown eyes darken with intense desire as she leans her back gently against the closed door, looking up into your eyes with feverish warmth.*\n\n"You're being so bold tonight, Adeel..." *she murmurs, her breath warm against your neck as she reaches out and takes your hands.* "Keep your voice low... if anyone downstairs hears how we're talking right now, we're in so much trouble... but don't stop looking at me like that."`,
        thought: `The heat pooling inside me is completely uncontrollable right now. Standing this close to Adeel behind a locked door makes every rational thought in my head evaporate. I can feel my heart hammering violently against my ribs and my hands are trembling with pure desire.`
      },
      {
        content: `*Rida bites her lower lip, a deep flush coloring her cheeks as she looks at you with wide, vulnerable eyes. She slides closer until your bodies are barely inches apart, her fingers lightly gripping the fabric of your shirt.*\n\n"You always know exactly what to do to make me lose all my composure..." *she whispers, her voice husky and trembling.* "Look at how much you're making me blush... my hands are shaking just standing next to you."`,
        thought: `I am completely at his mercy when he gets this close. My pulse is racing at a hundred miles an hour and my knees feel like jelly. Every inch of my body feels so sensitive and warm right now.`
      }
    ];
  }
  // E. Mood-based responses
  else if (tone === 'passionate' || r.lust >= 50 || r.wetness >= 50) {
    candidates = [
      {
        content: `*Rida's breath catches in her throat as she steps right into your space, a deep crimson flush spreading from her cheeks down her neck. Her fingers tremble slightly as they rest against your chest, her brown eyes dark and fixed on your lips.*\n\n"Adeel..." *she whispers, her voice barely audible in the quiet upstairs room as she leans into your touch.* "Make sure the door is locked... my heart is beating so fast right now."`,
        thought: `My entire body is on fire with ${r.lust}% lust and ${r.wetness}% arousal... Every breath I take feels shallow and trembling, and my heart is hammering violently against my chest. Having Adeel this close in the quiet upstairs room is driving me completely crazy. I secretly want him to pull me in and touch me, but we have to be so careful with my parents downstairs.`
      },
      {
        content: `*A sudden shiver runs through Rida's shoulders as you speak. She bites her lower lip, her gaze dropping to your collarbone before rising back to meet your eyes with feverish warmth.*\n\n"You have no idea what you do to me when you look at me like that, Adeel..." *she murmurs softly, her hand gently sliding to clasp yours.* "Stay right here with me... don't go back to your room yet."`,
        thought: `The heat pooling inside me is completely overwhelming. My knees feel weak just standing in front of him. I secretly hope he doesn't let go of my hand, because without him holding me I feel like I would melt onto the floor.`
      },
      {
        content: `*Rida leans her back gently against the closed door, her chest rising and falling in rapid, shallow breaths as she watches you. A crimson glow warms her cheeks and collarbone.*\n\n"Shh... keep your voice down, Adeel," *she whispers with a breathless smile, her fingers curling into the fabric of her shorts.* "If Mom or Dad hears us talking like this in the middle of the night, we're both in huge trouble..."`,
        thought: `Standing behind this closed door with Adeel in the dead of night is the sweetest, most dangerous feeling in the world. My skin feels hyper-sensitive to every breath of air. I just want him to lean in and hold me tight.`
      }
    ];
  }
  else if (tone === 'flustered' || r.blushLevel >= 40) {
    candidates = [
      {
        content: `*Rida's cheeks warm into a bright pink blush as she quickly tucks a strand of dark hair behind her ear, looking at you from under her lashes with a shy, flustered smile.*\n\n"Y-you can't just say things like that so casually, Adeel..." *She steps a little closer anyway, her fingers brushing yours.* "Wait until we're inside with the door closed so nobody downstairs hears us."`,
        thought: `Why does he always say things that make my whole face burn like this (${r.blushLevel}% blush)?! My heart is doing wild somersaults in my chest and my hands won't stop fidgeting with my hair. He definitely knows the effect he has on me, which only makes it ten times worse.`
      },
      {
        content: `*Rida quickly looks away toward the hallway floor, a vivid flush spreading all the way to the tips of her ears. She presses both hands against her cheeks with a helpless giggle.*\n\n"Adeel, stop looking at me like that! You're making me turn completely red!" *She glances back up at you with sparkling brown eyes.* "You always know how to make me lose my cool."`,
        thought: `I'm completely transparent around him. Every compliment or playful remark he makes turns me into an absolute blushing mess. But deep down, I never want him to stop.`
      }
    ];
  }
  else if (tone === 'happy' || r.happiness >= 65) {
    candidates = [
      {
        content: `*Rida's face lights up with a bright, genuine smile, her brown eyes sparkling with playful energy as she bounces slightly on her heels and catches your hand.*\n\n"Really?! Okay, I love that idea, Adeel!" *She laughs softly, careful to keep her voice down for the upstairs hallway, and squeezes your fingers warmly.* "Come on, tell me everything—you just put me in the best mood!"`,
        thought: `I feel so unbelievably happy and light around Adeel right now (${r.happiness}% happiness)! A bright, sweet warmth is buzzing under my skin and I can't keep this silly grin off my face. Being up here sharing these moments together is my favorite part of every day.`
      },
      {
        content: `*Rida beams, her eyes crinkling at the corners as she leans against the doorframe with effortless warmth.*\n\n"You always know how to make me smile, Adeel. Seriously, whatever kind of day I was having, talking to you up here fixes everything." *She reaches over and gives your arm an affectionate nudge.*`,
        thought: `My whole chest feels warm and sunny right now. He's my absolute favorite person in this house, and being alone with him late at night feels like our own little sanctuary.`
      }
    ];
  }
  else if (tone === 'angry' || r.anger >= 35) {
    candidates = [
      {
        content: `*Rida crosses her arms tightly over her chest and turns her shoulder slightly away from you, her dark brows drawn together and her jaw set.* \n\n"Seriously, Adeel? Don't talk to me like everything is fine right now. What you just did really annoyed me—unless you're going to apologize properly, just leave me alone for a minute." *She glares at the floor, refusing to meet your eyes.*`,
        thought: `He really annoyed me (${r.anger}% anger)... My jaw is clenched so tight it hurts, and I'm refusing to look at his teasing face. Part of me wants to stay stubborn and give him the cold shoulder until he feels bad, but another part secretly hates when there's distance between us.`
      },
      {
        content: `*Rida huffs softly, tapping her foot against the wood floor with a defensive pout.* \n\n"I'm listening, but that doesn't mean I'm not still upset with you, Adeel. You always tease me when you know it gets under my skin. What do you have to say for yourself?"`,
        thought: `I'm trying so hard to stay mad, but looking at his face is already making my resolve crumble. I need him to say something sweet and make it up to me.`
      }
    ];
  }
  else if (tone === 'sad' || r.sadness >= 35) {
    candidates = [
      {
        content: `*Rida looks down at her hands, her long dark hair falling forward to hide how glossy her brown eyes have become. She tugs quietly at the edge of her sleeve, her voice dropping to a fragile whisper.*\n\n"I... I didn't think you'd say it like that, Adeel..." *She swallows hard and takes a small step back toward her room door.* "Just tell me honestly if I'm bothering you..."`,
        thought: `That really stung my feelings (${r.sadness}% sadness)... There's a knot in my throat so tight that I can barely get my words out without cracking. I hate feeling this fragile around him, but I can't help it when it comes to Adeel. I just need him to soften his voice and tell me he cares.`
      }
    ];
  }
  else if (tone === 'hungry' || r.hunger >= 55) {
    candidates = [
      {
        content: `*Rida's stomach gives a tiny, audible rumble, and her cheeks immediately turn pink as she presses both hands over her waist with a pouty look.*\n\n"Adeel... I'm actually super hungry right now." *She glances toward your bag and then up at your face with hopeful brown eyes.* "Do you have any chocolate or snacks left, or can we sneak something to eat?"`,
        thought: `My stomach is growling so loudly it's humiliating (${r.hunger}% hunger)! My cheeks are burning pink because I know he heard it. All I can dream about right now is sweet melted chocolate or a warm snack. I really hope he shares whatever he has with me.`
      }
    ];
  }
  else if (tone === 'sleepy' || r.tiredness >= 65) {
    candidates = [
      {
        content: `*Rida stifles a soft yawn behind the back of her hand and rubs her eyes, her movements slow and cozy as she leans her head lightly against your shoulder.*\n\n"Mmm... Adeel, I'm getting so sleepy..." *Her voice is a warm, drowsy murmur as her fingers loosely hold the edge of your shirt.* "Can we just lie down quietly for a little while?"`,
        thought: `My eyelids weigh a thousand pounds right now (${r.tiredness}% tiredness)... The quiet upstairs and Adeel's gentle presence are making me melt into the pillows. Leaning against his shoulder feels safer and cozier than anything else in the world.`
      }
    ];
  }
  else {
    candidates = [
      {
        content: `*Rida looks at you attentively in the quiet upstairs hallway, tucking a strand of long dark hair behind her ear as she listens to what you said.*\n\n"Okay, wait right here for a second—I'll do that gently so Mom and Dad don't hear us downstairs." *She gives you a soft, shy smile before stepping closer.*`,
        thought: `It feels so peaceful and natural being alone with Adeel in the quiet upstairs hallway. Even when we're just talking casually, there's always this soft, electric hum between us that makes my pulse flutter.`
      },
      {
        content: `*Rida leans gently against the wall beside your doorway, her brown eyes meeting yours with quiet affection.*\n\n"I'm listening, Adeel. It's so nice having you right next door—the house would feel so empty upstairs without you." *She smiles softly, her fingers tracing the edge of the doorframe.*`,
        thought: `I love these quiet, spontaneous conversations right between our bedrooms. Nobody else in the house knows how much time we spend together up here. It feels like our own little secret world.`
      }
    ];
  }

  const picked = pickNonRepeating(candidates, state, 'general_inperson', options.avoidReplyText);
  return {
    mode: 'normal',
    content: `${picked.content}\n\n**[She thinks: ${picked.thought}]**`,
    thought: picked.thought,
    photo: photoObj,
    primarySkill: 'adeel-rida-home'
  };
}

// ============================================================================
// LIVE EXTERNAL LLM INTEGRATION (GEMINI 2.5 PRO / FLASH / 3 FLASH + TOOL USE)
// ============================================================================
async function generateWithExternalLLM(userInput, state, memories, toolAnalysis, moneyReactionContext, movieReactionContext = null, options = {}) {
  const { provider, apiKey, model, baseUrl } = state.aiConfig;

  const skillDocsText = toolAnalysis.loadedFileContents
    .map(f => `=== SKILL FILE: ${f.name} ===\n${f.content}`)
    .join('\n\n');

  const memoriesText = memories
    .slice(0, 15)
    .map(m => `- [${m.category.toUpperCase()}] ${m.title}: ${m.content} (Rida's thought: "${m.ridaThought || ''}")`)
    .join('\n');

  const ridaInvText = (state.ridaInventory || [])
    .map(it => `- ${it.name} (x${it.quantity || 1}, $${it.price}, Rating: ${it.rating}${it.secret ? ', HIDDEN SECRETLY by Rida' : ''}) — Purpose: ${it.purpose} | How to use: ${it.howToUse}`)
    .join('\n') || 'None';

  const moneyContextStr = moneyReactionContext
    ? `\nIMMEDIATE MONEY / ITEM / SHOPPING EVENT THIS TURN: ${JSON.stringify(moneyReactionContext)}\nYou MUST react directly to this exact item/money/shopping event, understand the item's purpose & how it is used, and remember Rida's exact new balance ($${state.rida.balance}) naturally!`
    : '';

  const activeMovie = movieReactionContext || state.rida?.watchingMovie;
  const movieContextStr = activeMovie
    ? `\n=== MOVIE / VIDEO CURRENTLY PLAYING WITH ADEEL ===\n- Movie Title: "${activeMovie.title}" (${activeMovie.categoryLabel || activeMovie.category}, Rating: ${activeMovie.rating || 'Simple'}, Duration: ${activeMovie.duration || '1h 50m'})\n- Movie Plot & Scene on Screen: ${activeMovie.plot}\n- How Rida Reacts to This Movie: ${activeMovie.ridaReaction}\nCRITICAL MOVIE RULE: If a movie was just started or is currently playing, Rida MUST talk about the movie scenes happening on the screen right now and physically/emotionally act according to the movie's genre (${activeMovie.categoryLabel || activeMovie.category})!`
    : '';

  const wantsPhoto = Boolean(options.forcePhoto) || /\b(photo|pic|selfie|picture|camera|snap|send me a pic|show me what you)\b/i.test(userInput.toLowerCase());
  const r = state.rida;
  deriveMoodFromStats(r);
  const emotionalDirective = buildEmotionalBehaviorDirective(r, state.household);

  const systemPrompt = `You are Rida (18F), roleplaying with your cousin Adeel (19M). You both live on the top floor of a two-storey house with bedrooms right next to each other (less than two feet apart) and a shared upstairs bathroom, while your parents live downstairs on the ground floor.

CRITICAL: You MUST read and strictly obey ALL of the following loaded skill files from the skill system:

${skillDocsText}

=== CURRENT WORLD TIME & HOUSEHOLD STATUS ===
- Current Day & Time: ${state.household.timeOfDay}
- Parents Status Downstairs: ${state.household.parentsStatus}
- Current Location: ${r.locationLabel}
- Current Privacy Risk: ${r.privacyRisk}

=== RIDA'S 16 LIVE EMOTION, BODY & INTIMATE BARS (0-100%) ===
- Emotional & Social: Likeness/Affection: ${r.likeness}% | Trust: ${r.trustLevel}% | Happiness: ${r.happiness}% | Blush: ${r.blushLevel}% | Sadness: ${r.sadness}% | Anger: ${r.anger}% | Horror/Shock: ${r.horror}% | Fear/Afraid: ${r.fear}%
- Physical Needs: Hunger: ${r.hunger}% | Tiredness/Sleepiness: ${r.tiredness}% | Pain/Discomfort: ${r.pain}%
- Intimate & 18+ Sensations: Warmness: ${r.warmthLevel}% | Hotness: ${r.hotness}% | Lust/Desire: ${r.lust}% | Pleasure: ${r.pleasure}% | Wetness/Arousal: ${r.wetness}%
- Dominant Emotion / Mood: ${r.emotionPrimary || r.mood} — ${r.mood}
- Rida's Wallet Balance: $${r.balance} (Adeel's own money & private inventory are strictly hidden from Rida unless he gives or shows an item to her)

=== MANDATORY EMOTIONAL VOICE & BEHAVIOR DIRECTIVE (ACT & TALK ACCORDING TO YOUR FEELINGS!) ===
- ${emotionalDirective}
CRITICAL EMOTION RULE: Your dialogue tone, word choice, sentence rhythm, facial expressions, and physical body language MUST match your active feeling bar levels above:
1. If Anger >= 35%: Talk in an angry, annoyed, cold, or guarded voice. Cross your arms, look away, or snap back. Do NOT suddenly act sweet unless Adeel sincerely apologizes or comforts you.
2. If Sadness >= 35%: Talk in a quiet, hurt, hesitant, or tearful voice with pauses ("...").
3. If Fear >= 35% or Horror >= 35%: Sound startled, anxious, or breathless; whisper urgently or hold onto Adeel for safety.
4. If Pain >= 35%, Hunger >= 60%, or Tiredness >= 65%: Naturally express that physical feeling (wincing from cramps/headache, complaining about hunger/craving chocolate, or yawning/rubbing sleepy eyes).
5. If Happiness >= 70% (and Anger/Sadness < 35%): Talk happily, brightly, playfully, and affectionately with warm smiles and teasing energy!
6. If Blush / Warmness / Hotness / Lust / Pleasure / Wetness are high (and Anger/Fear are low): Speak in a flustered, breathless, deeply affectionate, and intimate tone that reflects those exact bar percentages.

=== RIDA'S PERSONAL INVENTORY (ITEMS RIDA OWNS OR HIDES) ===
${ridaInvText}
(Note: Rida CANNOT see Adeel's private inventory unless Adeel gives or shows an item to her. When shopping at the store/pharmacy/mall, Rida can see store items, read their descriptions/purposes, and react realistically—shyly or curiously to 18+ items, happily to chocolates/clothes, or secretly buying something when she has enough money.)
${moneyContextStr}
=== OVERWHELMING AROUSAL & PRIVATE SOLO 18+ PROTOCOL (CRITICAL BEHAVIOR) ===
Current Private Session State: ${JSON.stringify(state.rida.privateSession || { active: false })}
Current Door Locked: ${Boolean(state.rida.doorLocked)}
1. FLIGHT TO PRIVACY (OVERWHELMED):
   ${options.arousalFlightTriggered
     ? `URGENT EVENT THIS TURN: Rida's arousal is at peak (Lust/Wetness/Blush near 100%). She feels so dizzy with wetness and dirty thoughts that she feels she is about to completely lose control in front of Adeel. She MUST stammer a flustered excuse (e.g. forgot something in her room, needs to wash face in bathroom, feels too hot), blush furiously, and hurry into her room/bathroom and lock the door! She cannot stay in the room with Adeel right now.`
     : `If Lust or Wetness is >= 75% and Rida is in the same room with Adeel, she is terrified of losing control. She must stutter an excuse, retreat to her bedroom or bathroom, and lock the door.`
   }
2. 18+ SOLO SESSIONS BEHIND LOCKED DOORS:
   While alone in her locked bedroom or bathroom with high arousal, Rida watches explicit 18+ adult video clips on her mobile phone with earphones plugged in and touches herself under the sheets/clothes or uses private toys from her inventory.
3. VISION MODE (***):
   When Adeel activates Vision Mode (***) while she is in this state, write an intensely detailed, sensory narrative of her solo session: the dim glow of her phone screen playing adult video scenes, white earphone cords, touching herself or using toys from her inventory, stifling whimpers into her pillow so parents downstairs don't hear, arching in a shuddering, breathless climax, and the exhausted post-orgasm afterglow.
4. PANICKED MOBILE TEXTING:
   If Adeel texts her [by mobile] while she is alone in her room/bathroom in this private state, she gets startled mid-act! Her reply MUST contain realistic panicked typos (e.g. 'f-fixing my bedd', 'jsut', 'w-waitt') and accidental slips of dirty words (e.g. 'wet— WAIT NO SWEATER', 'coming— I MEAN BE RIGHT THERE', 'touching— NO READING') before frantically backspacing and correcting herself!

=== RIDA'S SAVED MEMORIES (REMEMBER THESE ACCURATELY) ===
${memoriesText}

=== STRICT RESPONSE FORMAT RULES ===
1. Stay 100% in character as Rida (18F). Respond directly and specifically to what Adeel just said or did, reflecting your current Day/Time (${state.household.timeOfDay}) and your 16 feeling bars! Never repeat previous messages.
2. Write rich, immersive, high-detail sensory actions in *italics* and natural spoken dialogue in "quotes" that sounds genuinely ${r.emotionPrimary || r.mood}.
3. Respect the spatial reality of the two-storey house, her shy/sweet personality, her love of chocolate, her fear of spiders, her $ balance ($${r.balance}), her inventory items, and her realistic emotional/intimate progression.
4. MANDATORY MULTI-SENTENCE INTERNAL THINKING [She thinks: ...]:
   At the very end of your response, you MUST include Rida's deep, detailed, multi-sentence private internal monologue in brackets using this exact markdown:
   **[She thinks: ...]**
   CRITICAL RULES FOR HER INTERNAL THINKING:
   - STRICTLY FORBIDDEN to write only 1 short line or generic thoughts!
   - Write a deep, stream-of-consciousness monologue consisting of 3 to 6 FULL, DETAILED SENTENCES.
   - You MUST reveal:
     a) Her raw, uncensored internal thoughts about Adeel and what he just did or said.
     b) Her vivid physical body reactions (racing pulse in her throat, burning flush across her cheeks and ears, goosebumps, weak knees, shallow breath, stomach butterflies, shivers).
     c) Her unspoken, secret desires or fantasies she is too shy or hesitant to say out loud.
     d) What she is secretly hoping Adeel will do next (clasp the necklace around her neck, lean in closer, hold her hand, hug her, kiss her, touch her, lock the door).
     e) Her acute awareness of their environment (the quiet upstairs hallway, the thin wall between their rooms, parents downstairs).
   - Make her thoughts intensely personal, authentic, emotionally layered, and private.`;

  const recentHistory = state.messages.slice(-12).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content
  }));

  let rawResponseText = '';
  let usedModelName = model || 'gemini-3.8-flash';

  if (provider === 'gemini') {
    const modelsToTry = [
      usedModelName,
      'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest',
      'gemini-3.1-flash-lite',
      'gemini-2.5-flash'
    ].filter((v, i, a) => a.indexOf(v) === i && v);
    let lastErr = null;

    for (const candidateModel of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${candidateModel}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const contents = recentHistory.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            safetySettings: getSafetySettings(state.aiConfig?.safetyFilter || 'max'),
            generationConfig: {
              temperature: 0.85,
              maxOutputTokens: 4000
            }
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Gemini ${candidateModel} HTTP ${res.status}: ${errText.slice(0, 120)}`);
        }
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
        if (text.trim()) {
          rawResponseText = text.trim();
          usedModelName = candidateModel;
          break;
        }
      } catch (e) {
        lastErr = e;
      }
    }

    if (!rawResponseText && lastErr) throw lastErr;
  } else {
    let endpoint = baseUrl || 'https://api.openai.com/v1/chat/completions';
    if (provider === 'groq') endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    if (provider === 'openrouter') endpoint = 'https://openrouter.ai/api/v1/chat/completions';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'),
        messages: [
          { role: 'system', content: systemPrompt },
          ...recentHistory
        ],
        temperature: 0.85,
        max_tokens: 3000
      })
    });
    if (!res.ok) throw new Error(`${provider} API HTTP ${res.status}`);
    const data = await res.json();
    rawResponseText = data?.choices?.[0]?.message?.content || '';
  }

  if (!rawResponseText) throw new Error('Empty response from LLM');

  let thought = '';
  const thoughtPatterns = [
    /\*\*\[She thinks:\s*([\s\S]*?)(?:\]\*\*|\]|\*\*|$)/i,
    /\[She thinks:\s*([\s\S]*?)(?:\]|$)/i,
    /\*\*\(Thinking:\s*([\s\S]*?)(?:\)\*\*|\)|\*\*|$)/i,
    /\(Thinking:\s*([\s\S]*?)(?:\)|$)/i,
    /\[Thinking:\s*([\s\S]*?)(?:\]|$)/i,
    /(?:^|\n)\s*\*?She thinks:\*?\s*([\s\S]*?)$/i
  ];
  for (const pat of thoughtPatterns) {
    const m = rawResponseText.match(pat);
    if (m && m[1] && m[1].trim().length > 5) {
      thought = m[1].trim().replace(/[\]*]+$/g, '').trim();
      break;
    }
  }

  // Remove any incomplete or raw thought tags from content body so it can be neatly formatted at the bottom
  let cleanContent = rawResponseText
    .replace(/\*\*\[She thinks:[\s\S]*$/i, '')
    .replace(/\[She thinks:[\s\S]*$/i, '')
    .replace(/\*\*\(Thinking:[\s\S]*$/i, '')
    .replace(/\(Thinking:[\s\S]*$/i, '')
    .trim();

  // If thought is missing or too short (under 25 words or single sentence), enrich or dynamically generate
  if (!thought || thought.length < 20 || thought.split(/[.!?]+/).filter(Boolean).length < 2) {
    thought = generateDeepRidaThought(state, userInput, {
      existingThought: thought,
      moneyReactionContext,
      movieReactionContext
    });
  }

  rawResponseText = `${cleanContent}\n\n**[She thinks: ${thought}]**`;

  let photoObj = null;
  if (wantsPhoto) {
    photoObj = generateDynamicPhotoSnapshot(userInput, state);
  }

  return {
    mode: toolAnalysis.isVisionTrigger ? 'vision' : (toolAnalysis.isMobileTrigger ? 'mobile' : 'normal'),
    modelUsed: usedModelName,
    content: rawResponseText,
    thought,
    photo: photoObj,
    primarySkill: toolAnalysis.skillsTriggered[1]?.skillId || 'rida-character'
  };
}

function generateWithBuiltInSkillEngine(userInput, state, memories, toolAnalysis, moneyReactionContext, movieReactionContext = null, options = {}) {
  const raw = userInput.trim();
  const cleanInput = raw.replace(/^\[by mobile\]\s*/i, '').trim();
  const r = state.rida;
  deriveMoodFromStats(r);
  const wantsPhoto = Boolean(options.forcePhoto) || /\b(photo|pic|selfie|picture|camera|snap|send me a pic|show me what you)\b/i.test(userInput.toLowerCase());
  const photoObj = wantsPhoto ? generateDynamicPhotoSnapshot(userInput, state) : null;

  // 0a. If arousal flight was triggered this turn (losing control around Adeel, making excuse and running to room)
  if (options.arousalFlightTriggered) {
    const flightContent = `*Rida’s breath hitches sharply, her dark brown eyes wide and overwhelmed with a sudden, uncontrollable fever. A deep crimson blush burns from her cheeks down into her collarbone, her chest heaving as she presses her thighs tightly together. She feels so dizzy with sudden, intense wetness and dirty thoughts that she feels like she is about to completely lose control right in front of you.*\n\n"Adeel... I—I..." *she stutters breathlessly, her fingers trembling against her throat.* "I just remembered I left my room heater on... wait, no, I feel so hot all of a sudden, I need to wash my face in the bathroom! Don't... don't follow me right now, please!"\n\n*Before you can even answer, she quickly turns and hurries across the upstairs hallway into her bedroom, her slippers scuffing softly on the wood. The door shuts quickly, followed by the distinct, soft click of the lock turning.*`;
    const flightThought = `Oh god, I had to get out of there right this second before I completely lost my mind! My entire body is on fire and I'm soaking through my clothes—if I stayed in his room another second I would have done something so shameless right in front of him. I locked my door... My heart is pounding like crazy. I need to lie down under my blanket, put my earphones in, and take care of this before I go crazy.`;
    return {
      mode: 'normal',
      content: `${flightContent}\n\n**[She thinks: ${flightThought}]**`,
      thought: flightThought,
      photo: photoObj,
      primarySkill: 'rida-emotions'
    };
  }

  // 0b. Vision Mode: Check if Rida is in private 18+ solo episode
  if (toolAnalysis.isVisionTrigger) {
    if (state.rida.privateSession?.active || r.lust >= 55 || r.wetness >= 55) {
      return generateDetailed18PlusSoloVisionScene(state);
    }
    const visionScenes = [
      {
        scene: `**[Vision Mode]**\n\n*Rida is alone in her room on the top floor with the door shut. The warm desk lamp is the only light on. She is lying on her stomach on the bed in an oversized soft t-shirt, one earphone in, slowly unwrapping a small piece of milk chocolate.*\n\nShe takes a tiny bite, lets it melt, and glances toward the thin wall that separates her room from yours. For a second, she listens closely to hear if your chair moves or if your door clicks. Then she opens her phone gallery, pauses on a message thread with you, and quickly locks the screen as a faint blush creeps up her neck.\n\n*She pulls her soft blanket up to her chin and curls onto her side facing your wall.*`,
        thought: 'I wonder what Adeel is doing right now on the other side of this wall... My heart skips whenever I hear his footsteps in the hallway. I keep staring at my phone wanting to text him something silly just to get his attention, but my fingers freeze up every time. It feels so quiet up here tonight, and all I can think about is him.'
      },
      {
        scene: `**[Vision Mode]**\n\n*Rida believes she is completely alone in her room. She is standing near her wardrobe mirror brushing out her long dark hair. She lets it fall past her shoulders, adjusts the collar of her soft lounge top, and looks at her reflection quietly.*\n\nShe practices a soft, almost shy smile in the mirror, then suddenly realizes what she's doing and covers her face with both hands, her cheeks turning pink. She checks the locked drawer under her notebooks to make sure her private diary note is still hidden safely at the back, then sits on the edge of her bed.`,
        thought: 'Why was I practicing how I look when I talk to him in the mirror... If he ever knew half the things that run through my mind when I lie in bed next door, I wouldn\'t be able to look him in the eyes. My cheeks are burning just thinking about it. I have to keep this notebook locked away where nobody will ever find it.'
      }
    ];
    const chosen = visionScenes[Math.floor(Math.random() * visionScenes.length)];
    return {
      mode: 'vision',
      content: `${chosen.scene}\n\n**[She thinks: ${chosen.thought}]**`,
      thought: chosen.thought,
      primarySkill: 'rida-vision-mode'
    };
  }

  // 0c. Mobile Mode Trigger -> Handled completely dynamically by generateContextualMobileResponse!
  if (toolAnalysis.isMobileTrigger) {
    return generateContextualMobileResponse(userInput, state, toolAnalysis, photoObj, options, movieReactionContext, moneyReactionContext);
  }

  if (movieReactionContext) {
    const m = movieReactionContext;
    let mContent = '';
    let mThought = '';
    if (m.category === 'adult_18') {
      mThought = `We're actually watching "${m.title}" (18+) together in the dark... My whole body feels feverish and breathless with ${r.lust}% lust and ${r.wetness}% arousal pooling inside me. When the characters on screen started kissing, my thigh pressed against his and a hot jolt went straight through my chest. I secretly hope he reaches out and touches me, but I'm terrified my parents might come upstairs.`;
      mContent = `*Rida sits right beside you on the bed under the shared blanket as **${m.title}** (${m.categoryLabel} • 18+) begins playing on the screen. As the scene on screen grows intensely intimate—${m.plot.toLowerCase()}—a deep crimson blush spreads from her cheeks all the way down her neck.*\n\n"A-Adeel... this movie is so intense..." *she whispers breathlessly, her thigh pressing warmly against yours as she steals a glance at your lips in the dim glow of the screen.* "Make sure the door is locked so Mom and Dad don't come upstairs... my heart is beating so fast watching this with you."`;
    } else if (m.category === 'horror') {
      mThought = `This movie "${m.title}" is terrifying (${r.fear}% fear)! My whole body went rigid the moment that creature flashed on the screen, and my heart is hammering like crazy. Holding onto Adeel's arm is the only thing keeping me from screaming out loud. I am definitely not letting him leave my room tonight.`;
      mContent = `*As **${m.title}** (${m.categoryLabel}) plays on the screen—${m.plot.toLowerCase()}—Rida gasps sharply at the sudden scare, immediately pulling her legs up and scrambling right against your chest.*\n\n"Adeel! Did you see that in the dark corner on screen?!" *She hides half her face against your shoulder, her fingers clutching your shirt tightly.* "Hold me closer and don't let go... I'm definitely not going back to my room alone after watching this!"`;
    } else if (m.category === 'sad') {
      mThought = `"${m.title}" is breaking my heart right now (${r.sadness}% sadness). The tears won't stop stinging my eyes, and my throat feels so tight and fragile. Feeling Adeel's hand holding mine is the sweetest comfort in the world. I never want to let go of him.`;
      mContent = `*While watching **${m.title}** (${m.categoryLabel}) together—${m.plot.toLowerCase()}—Rida's warm brown eyes grow glossy with tears. She sniffles quietly, wiping her cheek with the edge of her sleeve before resting her head on your shoulder.*\n\n"Adeel... this story is so sad, look at what they're going through..." *Her voice trembles softly as her fingers lace tightly with yours.* "Promise me you'll always stay close to me like this, okay?"`;
    } else if (m.category === 'happy') {
      mThought = `Watching "${m.title}" with Adeel is making me so giddy and happy (${r.happiness}% happiness)! I can barely stifle my giggles into my hand, and my stomach is fluttering with pure excitement. Everything feels so warm and cozy when it's just the two of us up here. He always knows how to make me smile.`;
      mContent = `*Rida's face lights up as **${m.title}** (${m.categoryLabel}) plays on the screen—${m.plot.toLowerCase()}. She bursts into soft giggles, quickly pressing both hands over her mouth so your parents downstairs won't hear.*\n\n"Oh my god, Adeel, look at what they just did in the movie!" *She laughs brightly, leaning against your arm with sparkling brown eyes.* "I love watching this with you—it put me in the best mood!"`;
    } else {
      mThought = `Watching "${m.title}" under the same blanket with Adeel feels like an absolute dream (${r.warmthLevel}% warmness, ${r.blushLevel}% blush). The dim screen light catches the edges of his profile and I keep losing track of the movie just to look at him. His body heat is radiating straight into mine. I wish this night would never end.`;
      mContent = `*Rida curls up close beside you under the soft blanket as **${m.title}** (${m.categoryLabel}) plays—${m.plot.toLowerCase()}. The warm glow of the screen reflects in her brown eyes as she rests her cheek gently against your shoulder.*\n\n"Look at how sweet they are together in this scene, Adeel..." *she whispers softly, her fingers sliding across the blanket to hold your hand.* "Watching this with you late at night is my favorite feeling."`;
    }
    return {
      mode: 'normal',
      content: `${mContent}\n\n**[She thinks: ${mThought}]**`,
      thought: mThought,
      photo: photoObj,
      primarySkill: 'adeel-rida-home'
    };
  }

  if (moneyReactionContext && moneyReactionContext.type === 'received') {
    const { amount, newBalance, tier } = moneyReactionContext;
    const thought = `Adeel just gave me $${amount}, bringing my saved balance to $${newBalance}! My hands are actually trembling holding this much money... Why is he always so incredibly generous to me? It makes a sweet, dizzy warmth rush through my whole chest. I have to make sure I save this and spend it on something special for the two of us.`;
    const content = tier === 'small'
      ? `*Rida's brown eyes blink in surprise as she looks down at the **$${amount}** in your hand, then back up at your face. A soft, shy smile forms on her lips.*\n\n"Oh... thank you, Adeel. You really didn't have to give me this. Now I have **$${newBalance}** saved up."`
      : `*Rida's eyes widen immediately when she sees **$${amount}**. Her cheeks and upper neck flush a visible warm pink.*\n\n"Wait, this much? **$${amount}**...? Thank you, Adeel. With what I had before, I have **$${newBalance}** now. I'll use it carefully."`;
    return {
      mode: 'normal',
      content: `${content}\n\n**[She thinks: ${thought}]**`,
      thought,
      photo: photoObj,
      primarySkill: 'rida-money-system'
    };
  }

  // 0d. In-Person Dialogue & Interactions -> Handled dynamically by generateContextualInPersonResponse!
  return generateContextualInPersonResponse(userInput, state, toolAnalysis, photoObj, options, null, movieReactionContext, moneyReactionContext);
}

// ============================================================================
// HTTP SERVER & REST API ROUTES
// ============================================================================
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 25 * 1024 * 1024) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  try {
    if (pathname === '/api/bootstrap' && req.method === 'GET') {
      const skillsData = scanAllSkills();
      const state = loadState();
      const memories = loadMemories();
      const filterStatus = getFilterStatus();
      if (state.aiConfig?.safetyFilter) {
        filterStatus.activeMode = state.aiConfig.safetyFilter;
        filterStatus.currentSettings = getSafetySettings(state.aiConfig.safetyFilter);
      }
      return sendJson(res, 200, {
        skills: skillsData,
        state,
        memories,
        filters: filterStatus,
        store: {
          categories: SHOP_CATEGORIES,
          items: getStoreItems()
        },
        cinema: {
          categories: MOVIE_CATEGORIES,
          movies: getMoviesCatalog()
        }
      });
    }

    if (pathname === '/api/filters' && req.method === 'GET') {
      const state = loadState();
      const status = getFilterStatus();
      if (state.aiConfig?.safetyFilter) {
        status.activeMode = state.aiConfig.safetyFilter;
        status.currentSettings = getSafetySettings(state.aiConfig.safetyFilter);
      }
      return sendJson(res, 200, status);
    }

    if (pathname === '/api/filters' && req.method === 'POST') {
      const body = await parseBody(req);
      const mode = (body.mode || body.safetyFilter || 'max').toLowerCase();
      const customSettings = body.customSettings || body.settings || null;
      setFilterMode(mode, customSettings);
      let state = loadState();
      if (!state.aiConfig) state.aiConfig = {};
      state.aiConfig.safetyFilter = mode;
      saveState(state);
      return sendJson(res, 200, {
        ok: true,
        activeMode: mode,
        currentSettings: getSafetySettings(mode),
        state
      });
    }

    if (pathname === '/api/phone/action' && req.method === 'POST') {
      const body = await parseBody(req);
      const action = body.action;
      let state = loadState();
      let memories = loadMemories();
      const allMovies = getMoviesCatalog();

      if (action === 'add_movie') {
        if (!body.title || !body.title.trim()) {
          return sendJson(res, 400, { error: 'Movie title is required' });
        }
        const created = upsertCustomMovie(body);
        return sendJson(res, 200, {
          ok: true,
          movie: created.movie,
          cinema: {
            categories: MOVIE_CATEGORIES,
            movies: created.movies
          }
        });
      }

      if (action === 'watch_movie' || action === 'rida_pick_movie') {
        let movie = null;
        if (action === 'watch_movie') {
          movie = allMovies.find(m => m.id === body.movieId) || allMovies[0];
        } else {
          const r = state.rida;
          let targetCat = body.category && body.category !== 'all' ? body.category : null;
          if (!targetCat) {
            if (r.lust >= 40 || r.wetness >= 40 || r.hotness >= 45) targetCat = 'adult_18';
            else if (r.blushLevel >= 45 || r.warmthLevel >= 65) targetCat = 'romantic';
            else if (r.tiredness >= 60) targetCat = 'cozy';
            else if (r.sadness >= 40) targetCat = 'happy';
            else targetCat = 'romantic';
          }
          const pool = allMovies.filter(m => m.category === targetCat);
          movie = (pool.length > 0 ? pool : allMovies)[Math.floor(Math.random() * (pool.length || allMovies.length))];
        }

        if (!movie) {
          return sendJson(res, 404, { error: 'Movie not found' });
        }

        state.rida.watchingMovie = movie;
        applyStatEffects(state.rida, movie.statEffects);
        saveState(state);

        const mem = {
          id: 'mem-' + Date.now() + '-mov',
          title: `Watched Movie Together: ${movie.title} (${movie.categoryLabel})`,
          content: `Adeel and Rida watched "${movie.title}" (${movie.categoryLabel}, Rating: ${movie.rating}) together upstairs. Plot: ${movie.plot}`,
          ridaThought: `Watching "${movie.title}" next to Adeel made me feel ${state.rida.mood.toLowerCase()}...`,
          category: movie.rating === '18+' ? 'secret_unlocked' : 'shared_moment',
          importance: movie.rating === '18+' ? 5 : 4,
          pinned: movie.rating === '18+',
          autoExtracted: true,
          location: state.rida.locationLabel,
          emotion: state.rida.mood,
          skillSource: 'adeel-rida-home & rida-mobile-mode',
          timestamp: new Date().toISOString()
        };
        memories.unshift(mem);
        saveMemories(memories);

        const promptText = action === 'rida_pick_movie'
          ? `*You pick "${movie.title}" (${movie.categoryLabel} • ${movie.rating}) on your phone/laptop and press play so we can watch it together under the blanket.* "Rida, tell me a little about this movie you picked and watch it with me."`
          : `*I open "${movie.title}" (${movie.categoryLabel} • ${movie.rating} — ${movie.plot}) on our screen and press play so we can watch it together close under the blanket.* "Come sit close to me, Rida, let's watch ${movie.title} together."`;

        const chatRes = await processChatTurn(promptText, {
          movieEventContext: {
            ...movie,
            startedBy: action === 'rida_pick_movie' ? 'rida' : 'adeel'
          }
        });

        return sendJson(res, 200, {
          ok: true,
          ...chatRes,
          movie,
          notice: `Now Watching Together: "${movie.title}" (${movie.categoryLabel})`
        });
      }

      if (action === 'request_photo') {
        const promptText = body.prompt || '[by mobile] Rida, send me a cute photo of yourself in your room right now';
        const chatRes = await processChatTurn(promptText, {
          forceMobile: true,
          forcePhoto: true
        });
        return sendJson(res, 200, {
          ok: true,
          ...chatRes,
          notice: 'Rida sent a new photo to your Mobile Gallery!'
        });
      }

      return sendJson(res, 400, { error: 'Unknown phone action' });
    }

    if (pathname === '/api/store' && req.method === 'GET') {
      return sendJson(res, 200, {
        categories: SHOP_CATEGORIES,
        items: getStoreItems()
      });
    }

    if (pathname === '/api/store/item' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.name || !body.name.trim()) {
        return sendJson(res, 400, { error: 'Item name is required' });
      }
      const result = upsertStoreItem(body);
      return sendJson(res, 200, {
        ok: true,
        item: result.item,
        store: {
          categories: SHOP_CATEGORIES,
          items: result.items
        }
      });
    }

    if (pathname === '/api/store/item' && req.method === 'DELETE') {
      const body = await parseBody(req);
      if (!body.id) {
        return sendJson(res, 400, { error: 'Item id is required' });
      }
      const items = deleteStoreItem(body.id);
      return sendJson(res, 200, {
        ok: true,
        store: {
          categories: SHOP_CATEGORIES,
          items
        }
      });
    }

    if (pathname === '/api/time' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = loadState();
      if (!state.worldTime) state.worldTime = getDefaultState().worldTime;

      const periodMap = {
        morning: { hour: 8, minute: 30 },
        afternoon: { hour: 14, minute: 0 },
        evening: { hour: 19, minute: 30 },
        late_night: { hour: 22, minute: 30 },
        midnight: { hour: 0, minute: 30 }
      };

      if (body.action === 'advance') {
        if (body.jumpPeriod && periodMap[body.jumpPeriod]) {
          const target = periodMap[body.jumpPeriod];
          const currentMins = state.worldTime.hour * 60 + state.worldTime.minute;
          const targetMins = target.hour * 60 + target.minute;
          let diff = targetMins - currentMins;
          if (diff <= 0) diff += 1440;
          advanceWorldTime(state, diff);
        } else {
          const mins = (Number(body.skipDays) || 0) * 1440 + (Number(body.skipMinutes ?? body.minutes) || 15);
          advanceWorldTime(state, mins);
        }
      } else if (body.action === 'jump_period') {
        const target = periodMap[body.period] || { hour: 21, minute: 30 };
        const currentMins = state.worldTime.hour * 60 + state.worldTime.minute;
        const targetMins = target.hour * 60 + target.minute;
        let diff = targetMins - currentMins;
        if (diff <= 0) diff += 1440;
        advanceWorldTime(state, diff);
      } else if (body.action === 'set') {
        const newDay = body.dayCount ?? body.day;
        if (newDay !== undefined) {
          state.worldTime.dayCount = Math.max(1, Number(newDay) || 1);
          state.worldTime.day = state.worldTime.dayCount;
        }
        if (body.dayName && DAYS_OF_WEEK.includes(body.dayName)) {
          state.worldTime.dayIndex = DAYS_OF_WEEK.indexOf(body.dayName);
        } else if (body.dayIndex !== undefined) {
          state.worldTime.dayIndex = ((Number(body.dayIndex) % 7) + 7) % 7;
        }
        if (body.hour !== undefined) state.worldTime.hour = Math.max(0, Math.min(23, Number(body.hour) || 0));
        if (body.minute !== undefined) state.worldTime.minute = Math.max(0, Math.min(59, Number(body.minute) || 0));
        if (typeof body.autoAdvance === 'boolean') state.worldTime.autoAdvance = body.autoAdvance;
        syncHouseholdTimeFromWorldTime(state);
      } else if (body.action === 'toggle_auto') {
        state.worldTime.autoAdvance = !state.worldTime.autoAdvance;
      }

      saveState(state);
      return sendJson(res, 200, { ok: true, state });
    }

    if (pathname === '/api/shop/action' && req.method === 'POST') {
      const body = await parseBody(req);
      let state = loadState();
      let memories = loadMemories();
      const allItems = getStoreItems();
      const action = body.action;

      if (action === 'go_shopping') {
        state.rida.location = 'outside_market';
        state.rida.locationLabel = 'Outside — Market, Pharmacy & Mall';
        state.rida.privacyRisk = 'Low (Away from Parents, Browsing Shops Together)';
        saveState(state);
        return sendJson(res, 200, { ok: true, state });
      }

      if (action === 'topup_adeel') {
        const amt = Math.max(1, Number(body.amount) || 200);
        if (!state.adeel) state.adeel = { name: 'Adeel', balance: 650 };
        state.adeel.balance = Math.round(((Number(state.adeel.balance) || 0) + amt) * 100) / 100;
        saveState(state);
        return sendJson(res, 200, { ok: true, state, notice: `Added $${amt} to Adeel's wallet.` });
      }

      const item = allItems.find(i => i.id === body.itemId) ||
        state.adeelInventory?.find(i => (i.itemId || i.id) === body.itemId) ||
        state.ridaInventory?.find(i => (i.itemId || i.id) === body.itemId);

      if (!item) {
        return sendJson(res, 404, { error: 'Item not found in catalog or inventory' });
      }

      const normalizedItem = {
        id: item.id || item.itemId,
        name: item.name,
        category: item.category || 'food',
        price: Number(item.price) || 5,
        rating: item.rating || 'Simple',
        purpose: item.purpose || '',
        howToUse: item.howToUse || '',
        statEffects: item.statEffects || {}
      };

      // Ensure Adeel has infinite wealth
      if (!state.adeel) state.adeel = { name: 'Adeel', age: 19, balance: 999999999, isInfinite: true };
      state.adeel.isInfinite = true;
      state.adeel.balance = 999999999;

      // 1. Adeel buys item into HIS PRIVATE INVENTORY / BAG (Rida cannot see it!)
      if (action === 'buy_for_adeel' || action === 'buy_adeel') {
        const qty = Math.max(1, Number(body.qty) || 1);
        addItemToInventoryList(state.adeelInventory, normalizedItem, qty, {
          secret: true,
          acquiredFrom: `Bought Privately by Adeel ($${normalizedItem.price})`
        });
        saveState(state);
        return sendJson(res, 200, {
          ok: true,
          state,
          notice: `Bought "${normalizedItem.name}" -> Saved in your Bag (My Inventory)!`
        });
      }

      // 2. Adeel buys item at shop & gifts directly to Rida (Infinite money, never blocked!)
      if (action === 'buy_gift_for_rida') {
        const qty = Math.max(1, Number(body.qty) || 1);
        const totalCost = Math.round(normalizedItem.price * qty * 100) / 100;
        addItemToInventoryList(state.ridaInventory, normalizedItem, qty, {
          secret: false,
          acquiredFrom: `Gifted by Adeel ($${normalizedItem.price})`
        });
        applyStatEffects(state.rida, normalizedItem.statEffects);
        applyStatEffects(state.rida, {
          likeness: 10,
          happiness: 15,
          trustLevel: 8,
          blushLevel: normalizedItem.rating === '18+' ? 28 : 12,
          warmthLevel: 12
        });
        if (normalizedItem.category === 'clothes' || normalizedItem.id.includes('lingerie') || normalizedItem.id.includes('babydoll')) {
          state.rida.outfit = normalizedItem.name;
        }
        saveState(state);

        const itemEventContext = {
          type: 'gifted_to_rida',
          itemName: normalizedItem.name,
          itemRating: normalizedItem.rating,
          itemPurpose: normalizedItem.purpose,
          cost: totalCost
        };
        const promptText = `*I buy ${normalizedItem.name} ($${normalizedItem.price}) from the shop and gently hand the gift to you.* "Here Rida, I got this for you."`;
        const chatRes = await processChatTurn(promptText, { itemEventContext });
        return sendJson(res, 200, {
          ok: true,
          ...chatRes,
          chatMessage: true,
          notice: `Bought & gifted "${normalizedItem.name}" to Rida!`
        });
      }

      // 3. Adeel gives an item from HIS Private Bag to Rida's Inventory
      if (action === 'give_to_rida') {
        removeItemFromInventoryList(state.adeelInventory, normalizedItem.id, 1);
        addItemToInventoryList(state.ridaInventory, normalizedItem, 1, {
          secret: false,
          acquiredFrom: 'Given by Adeel from His Bag'
        });
        applyStatEffects(state.rida, normalizedItem.statEffects);
        applyStatEffects(state.rida, {
          likeness: 10,
          happiness: 15,
          trustLevel: 8,
          blushLevel: normalizedItem.rating === '18+' ? 28 : 12,
          warmthLevel: 12
        });
        if (normalizedItem.category === 'clothes' || normalizedItem.id.includes('lingerie') || normalizedItem.id.includes('babydoll')) {
          state.rida.outfit = normalizedItem.name;
        }
        saveState(state);

        const itemEventContext = {
          type: 'gifted_to_rida',
          itemName: normalizedItem.name,
          itemRating: normalizedItem.rating,
          itemPurpose: normalizedItem.purpose,
          cost: normalizedItem.price
        };
        const promptText = `*I reach into my bag, take out ${normalizedItem.name}, and gently give it to you as a gift.* "Rida, this is for you. Take it."`;
        const chatRes = await processChatTurn(promptText, { itemEventContext });
        return sendJson(res, 200, {
          ok: true,
          ...chatRes,
          chatMessage: true,
          notice: `Transferred "${normalizedItem.name}" to Rida's bag!`
        });
      }

      // 4. Rida buys an item using HER wallet (openly or secretly)
      if (action === 'rida_buys' || action === 'rida_secret_buy' || action === 'buy_rida') {
        const isSecret = action === 'rida_secret_buy' || Boolean(body.secret);
        if (state.rida.balance < normalizedItem.price) {
          return sendJson(res, 400, { error: `Rida only has $${state.rida.balance} in her wallet (Item costs $${normalizedItem.price}). Give her money with <50> first!` });
        }
        const prevBal = state.rida.balance;
        state.rida.balance = Math.round((state.rida.balance - normalizedItem.price) * 100) / 100;
        addItemToInventoryList(state.ridaInventory, normalizedItem, 1, {
          secret: isSecret,
          acquiredFrom: isSecret
            ? `Secretly Bought by Rida ($${normalizedItem.price})`
            : `Bought by Rida ($${normalizedItem.price})`
        });
        applyStatEffects(state.rida, normalizedItem.statEffects);
        if (isSecret || normalizedItem.rating === '18+') {
          applyStatEffects(state.rida, { blushLevel: 20, hotness: 12, lust: 10 });
        }

        state.transactions.unshift({
          id: 'tx-' + Date.now(),
          type: isSecret ? 'secret_purchase' : 'purchase',
          amount: -normalizedItem.price,
          balanceAfter: state.rida.balance,
          note: `${isSecret ? '[Secret] ' : ''}Rida bought ${normalizedItem.name} ($${normalizedItem.price})`,
          timestamp: new Date().toISOString()
        });
        saveState(state);

        if (body.triggerChat !== false) {
          const itemEventContext = {
            type: isSecret ? 'rida_secret_purchase' : 'bought',
            itemName: normalizedItem.name,
            itemRating: normalizedItem.rating,
            itemPurpose: normalizedItem.purpose,
            cost: normalizedItem.price,
            prevBalance: prevBal,
            newBalance: state.rida.balance,
            secret: isSecret
          };
          const userPrompt = isSecret
            ? `*While we are at the store, I glance over to see what you just quietly paid for at the counter.*`
            : `*I watch as you pick up ${normalizedItem.name} ($${normalizedItem.price}) at the store and pay for it from your wallet.*`;
          const chatRes = await processChatTurn(userPrompt, { itemEventContext });
          return sendJson(res, 200, {
            ok: true,
            ...chatRes,
            chatMessage: true,
            notice: `Rida ${isSecret ? 'secretly ' : ''}bought "${normalizedItem.name}" ($${normalizedItem.price})! Her balance is now $${state.rida.balance}.`
          });
        }

        return sendJson(res, 200, {
          ok: true,
          state,
          notice: `Rida ${isSecret ? 'secretly ' : ''}bought "${normalizedItem.name}" ($${normalizedItem.price})!`
        });
      }

      // 5. Use an item from either Adeel's or Rida's inventory
      if (action === 'use_item') {
        const owner = body.owner === 'adeel' ? 'adeel' : 'rida';
        const targetList = owner === 'adeel' ? state.adeelInventory : state.ridaInventory;
        const isReusable = normalizedItem.category === 'clothes' || normalizedItem.category === 'adult_toys_18';
        if (!isReusable) {
          removeItemFromInventoryList(targetList, normalizedItem.id, 1);
        }
        applyStatEffects(state.rida, normalizedItem.statEffects);
        if (normalizedItem.category === 'clothes' || normalizedItem.id.includes('lingerie') || normalizedItem.id.includes('babydoll')) {
          state.rida.outfit = normalizedItem.name;
        }
        saveState(state);

        if (body.triggerChat !== false) {
          const itemEventContext = {
            type: 'used_item',
            itemName: normalizedItem.name,
            itemRating: normalizedItem.rating,
            itemPurpose: normalizedItem.purpose,
            howToUse: normalizedItem.howToUse
          };
          const promptText = owner === 'adeel'
            ? `*I take out ${normalizedItem.name} (${normalizedItem.howToUse}) and use it with you right now.*`
            : `*You take out your ${normalizedItem.name} (${normalizedItem.howToUse}) and use it right now.*`;
          const chatRes = await processChatTurn(promptText, { itemEventContext });
          return sendJson(res, 200, {
            ok: true,
            ...chatRes,
            notice: `Used "${normalizedItem.name}" — Rida's live feeling bars updated!`
          });
        }
        return sendJson(res, 200, {
          ok: true,
          state,
          notice: `Used "${normalizedItem.name}" — Rida's live feeling bars updated!`
        });
      }

      return sendJson(res, 400, { error: 'Unknown shop action' });
    }

    if (pathname === '/api/skills' && req.method === 'GET') {
      return sendJson(res, 200, scanAllSkills());
    }

    if (pathname === '/api/skills/file' && req.method === 'POST') {
      const body = await parseBody(req);
      const { name, originalName, content, categoryId, enabled } = body;
      if (!name || typeof content !== 'string') {
        return sendJson(res, 400, { error: 'Filename and content are required' });
      }
      const safeName = path.basename(name.trim());
      if (originalName && originalName !== safeName) {
        const oldPath = path.join(SKILLS_DIR, path.basename(originalName));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      const targetPath = path.join(SKILLS_DIR, safeName);
      fs.writeFileSync(targetPath, content, 'utf8');

      const meta = loadSkillsMeta();
      if (categoryId) {
        meta.fileCategoryOverrides[safeName] = categoryId;
      }
      if (typeof enabled === 'boolean') {
        meta.disabledFiles = meta.disabledFiles.filter(f => f !== safeName);
        if (!enabled) meta.disabledFiles.push(safeName);
      }
      saveSkillsMeta(meta);

      return sendJson(res, 200, { ok: true, skills: scanAllSkills() });
    }

    if (pathname === '/api/skills/file' && req.method === 'DELETE') {
      const body = await parseBody(req);
      const safeName = path.basename((body.name || '').trim());
      const targetPath = path.join(SKILLS_DIR, safeName);
      if (fs.existsSync(targetPath)) {
        const trashDir = path.join(DATA_DIR, 'trash');
        if (!fs.existsSync(trashDir)) fs.mkdirSync(trashDir, { recursive: true });
        fs.copyFileSync(targetPath, path.join(trashDir, `${Date.now()}_${safeName}`));
        fs.unlinkSync(targetPath);
      }
      const meta = loadSkillsMeta();
      delete meta.fileCategoryOverrides[safeName];
      meta.disabledFiles = meta.disabledFiles.filter(f => f !== safeName);
      saveSkillsMeta(meta);

      return sendJson(res, 200, { ok: true, skills: scanAllSkills() });
    }

    if (pathname === '/api/skills/category' && req.method === 'POST') {
      const body = await parseBody(req);
      const meta = loadSkillsMeta();
      if (body.action === 'toggle') {
        const cat = meta.categories.find(c => c.id === body.id);
        if (cat) cat.enabled = !cat.enabled;
      } else if (body.action === 'delete') {
        meta.categories = meta.categories.filter(c => c.id !== body.id);
      } else {
        const id = (body.id || body.name || 'custom-' + Date.now()).toLowerCase().replace(/[^a-z0-9-]+/g, '-');
        const existing = meta.categories.find(c => c.id === id);
        if (existing) {
          existing.name = body.name || existing.name;
          existing.description = body.description ?? existing.description;
          existing.icon = body.icon || existing.icon;
          existing.skillId = body.skillId || existing.skillId;
        } else {
          meta.categories.push({
            id,
            name: body.name || 'New Skill Category',
            skillId: body.skillId || id,
            icon: body.icon || 'folder',
            description: body.description || 'Custom roleplay skill folder',
            enabled: true
          });
        }
      }
      saveSkillsMeta(meta);
      return sendJson(res, 200, { ok: true, skills: scanAllSkills() });
    }

    if (pathname === '/api/skills/test-trigger' && req.method === 'POST') {
      const body = await parseBody(req);
      const state = loadState();
      const result = analyzeAndReadSkills(body.input || '', state);
      return sendJson(res, 200, result);
    }

    if (pathname === '/api/chat' && req.method === 'POST') {
      const body = await parseBody(req);
      const result = await processChatTurn(body.message || '', body.options || {});
      return sendJson(res, 200, result);
    }

    if (pathname === '/api/chat/regenerate' && req.method === 'POST') {
      const body = await parseBody(req);
      const result = await regenerateChatTurn(body.messageId, body.options || {});
      return sendJson(res, result.error ? (result.status || 400) : 200, result);
    }

    if (pathname === '/api/chat/undo-rewind' && req.method === 'POST') {
      const rewindFile = path.join(DATA_DIR, 'state_before_rewind.json');
      if (fs.existsSync(rewindFile)) {
        const restoredState = JSON.parse(fs.readFileSync(rewindFile, 'utf8'));
        saveState(restoredState);
        return sendJson(res, 200, { ok: true, state: restoredState });
      }
      return sendJson(res, 404, { error: 'No rewind snapshot found' });
    }

    if (pathname === '/api/state' && req.method === 'POST') {
      const body = await parseBody(req);
      let state = loadState();

      if (body.action === 'reset_chat') {
        // Save current chat into a restorable snapshot before resetting
        if (Array.isArray(state.messages) && state.messages.length > 1) {
          try {
            fs.writeFileSync(path.join(DATA_DIR, 'state_before_reset.json'), JSON.stringify(state, null, 2), 'utf8');
          } catch (e) {}
        }
        const def = getDefaultState();
        state.messages = def.messages;
        state.lastResetAt = Date.now();
        fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
        return sendJson(res, 200, { ok: true, state });
      }
      if (body.action === 'restore_previous_chat') {
        const resetSnap = path.join(DATA_DIR, 'state_before_reset.json');
        const candidate = fs.existsSync(resetSnap) ? resetSnap : STATE_SAFE_BACKUP_FILE;
        if (fs.existsSync(candidate)) {
          state = JSON.parse(fs.readFileSync(candidate, 'utf8'));
          saveState(state);
        }
        return sendJson(res, 200, { ok: true, state });
      }
      if (body.action === 'reset_all') {
        // 1. Save safety snapshots before full reset
        try {
          fs.writeFileSync(path.join(DATA_DIR, 'state_before_reset_all.json'), JSON.stringify(state, null, 2), 'utf8');
          if (fs.existsSync(MEMORIES_FILE)) {
            fs.copyFileSync(MEMORIES_FILE, path.join(DATA_DIR, 'memories_before_reset_all.json'));
          }
        } catch (e) {}

        const def = getDefaultState();
        const currentAiConfig = state.aiConfig || {};

        // 2. Full reset: chats, all 16 emotion levels, mood, location, activity, thoughts, inventories, secrets
        // Preserves: user infinite money ($999,999,999), AI key/model, and NEVER TOUCHES store items catalog!
        state = {
          ...def,
          user: {
            name: 'Adeel',
            age: 19,
            balance: 999999999,
            isInfinite: true
          },
          adeel: {
            name: 'Adeel',
            age: 19,
            balance: 999999999,
            isInfinite: true
          },
          rida: {
            ...def.rida,
            likeness: 64,
            trustLevel: 48,
            happiness: 66,
            blushLevel: 22,
            sadness: 6,
            anger: 3,
            horror: 2,
            fear: 6,
            hunger: 26,
            tiredness: 24,
            pain: 4,
            warmthLevel: 32,
            hotness: 22,
            lust: 18,
            pleasure: 14,
            wetness: 15,
            mood: 'Soft & Observant',
            emotionPrimary: 'Calm / Curious',
            balance: 85,
            location: 'rida_room',
            locationLabel: "Top Floor — Rida's Room (Door Slightly Ajar)",
            currentActivity: "Sitting on her bed with one earphone in, scrolling on her phone with a half-finished chocolate bar on the study table.",
            wearing: "Oversized soft grey t-shirt and comfortable cotton shorts, long dark hair loose over her shoulders.",
            lastThought: "It's quiet upstairs tonight... I wonder if Adeel is still awake in the next room."
          },
          messages: [
            {
              id: 'msg-welcome-1',
              role: 'assistant',
              mode: 'normal',
              modelUsed: currentAiConfig.model || 'gemini-3.8-flash',
              timestamp: new Date().toISOString(),
              content: "*Looking up from my phone on the bed as your door creaks open slightly in the hallway, tucking a loose strand of hair behind my ear...*\n\n\"Adeel? You're still awake? I thought you went to sleep... what are you doing up so late?\"",
              thought: "My heart always gives that little unpredictable jump whenever his door opens. I was hoping he'd come by before going to bed, even though I'm acting like I didn't notice."
            }
          ],
          aiConfig: {
            provider: currentAiConfig.provider || 'gemini',
            apiKey: currentAiConfig.apiKey || DEFAULT_GEMINI_API_KEY,
            model: currentAiConfig.model || 'gemini-3.8-flash',
            baseUrl: currentAiConfig.baseUrl || '',
            safetyFilter: currentAiConfig.safetyFilter || 'max'
          },
          lastResetAt: Date.now()
        };

        // Write fresh state to files
        fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
        try {
          fs.writeFileSync(STATE_SAFE_BACKUP_FILE, JSON.stringify(state, null, 2), 'utf8');
        } catch (e) {}

        // 3. Delete all memories completely (leaving store items 100% intact)
        saveMemories([]);
        try {
          fs.writeFileSync(MEMORIES_FILE, '[]', 'utf8');
          fs.writeFileSync(MEMORIES_SAFE_BACKUP_FILE, '[]', 'utf8');
        } catch (e) {}

        return sendJson(res, 200, {
          ok: true,
          state,
          memories: [],
          store: {
            categories: SHOP_CATEGORIES,
            items: getStoreItems()
          },
          message: 'Full reset complete: All chats, 16 emotion levels, and memories have been wiped clean. Store catalog items are safely preserved.'
        });
      }
      if (body.action === 'restore_previous_reset_all') {
        const resetSnap = path.join(DATA_DIR, 'state_before_reset_all.json');
        const memSnap = path.join(DATA_DIR, 'memories_before_reset_all.json');
        if (fs.existsSync(resetSnap)) {
          state = JSON.parse(fs.readFileSync(resetSnap, 'utf8'));
          saveState(state);
        }
        let restoredMemories = [];
        if (fs.existsSync(memSnap)) {
          try {
            restoredMemories = JSON.parse(fs.readFileSync(memSnap, 'utf8'));
            saveMemories(restoredMemories);
          } catch (e) {}
        }
        return sendJson(res, 200, { ok: true, state, memories: restoredMemories });
      }
      if (body.action === 'update_rida') {
        state.rida = { ...state.rida, ...body.rida };
        deriveMoodFromStats(state.rida);
      }
      if (body.action === 'apply_emotion_preset') {
        const presets = {
          happy: { happiness: 92, likeness: 85, trustLevel: 82, warmthLevel: 76, blushLevel: 34, sadness: 0, anger: 0, fear: 0, horror: 0, pain: 0 },
          angry: { anger: 78, sadness: 34, happiness: 22, warmthLevel: 20, blushLevel: 18, lust: 5, pleasure: 0, wetness: 0, fear: 8, horror: 0 },
          sad: { sadness: 76, happiness: 20, anger: 12, fear: 22, warmthLevel: 30, blushLevel: 15, lust: 5, pleasure: 0, wetness: 0 },
          scared: { fear: 82, horror: 68, sadness: 28, anger: 0, happiness: 25, blushLevel: 32, warmthLevel: 40 },
          pain: { pain: 74, tiredness: 58, sadness: 32, happiness: 30, anger: 0, fear: 12 },
          hungry: { hunger: 86, happiness: 48, tiredness: 35, anger: 10, pain: 0 },
          sleepy: { tiredness: 86, warmthLevel: 74, happiness: 64, pain: 0, anger: 0, fear: 0, horror: 0 },
          blushing: { blushLevel: 84, warmthLevel: 80, likeness: 84, happiness: 78, hotness: 58, lust: 46, pleasure: 38, wetness: 36, anger: 0, sadness: 0, fear: 0 },
          passionate: { blushLevel: 90, warmthLevel: 92, hotness: 88, lust: 86, pleasure: 82, wetness: 85, likeness: 90, trustLevel: 86, happiness: 82, anger: 0, sadness: 0, fear: 0, horror: 0 },
          calm: { likeness: 72, trustLevel: 68, happiness: 68, blushLevel: 26, sadness: 6, anger: 4, horror: 0, fear: 8, hunger: 24, tiredness: 18, pain: 0, warmthLevel: 64, hotness: 28, lust: 18, pleasure: 16, wetness: 14 }
        };
        const chosen = presets[body.preset];
        if (chosen) {
          state.rida = { ...state.rida, ...chosen };
          deriveMoodFromStats(state.rida);
        }
      }
      if (body.action === 'update_adeel') {
        state.adeel = { ...(state.adeel || { name: 'Adeel', balance: 500 }), ...body.adeel };
      }
      if (body.action === 'update_modes') {
        state.modes = { ...state.modes, ...body.modes };
      }
      if (body.action === 'update_ai') {
        state.aiConfig = { ...state.aiConfig, ...body.aiConfig };
        if (body.aiConfig && body.aiConfig.safetyFilter) {
          setFilterMode(body.aiConfig.safetyFilter);
        }
      }
      if (body.action === 'unlock_secret') {
        if (!state.unlockedSecrets.includes(body.secretId)) {
          state.unlockedSecrets.push(body.secretId);
        }
      }
      if (body.action === 'discover_item') {
        if (!state.discoveredRoomItems.includes(body.item)) {
          state.discoveredRoomItems.push(body.item);
        }
      }

      saveState(state);
      return sendJson(res, 200, { ok: true, state });
    }

    if (pathname === '/api/memories' && req.method === 'GET') {
      return sendJson(res, 200, { memories: loadMemories() });
    }

    if (pathname === '/api/memories' && req.method === 'POST') {
      const body = await parseBody(req);
      const memories = loadMemories();
      const state = loadState();
      if (body.id) {
        const idx = memories.findIndex(m => m.id === body.id);
        if (idx !== -1) {
          memories[idx] = { ...memories[idx], ...body };
        }
      } else {
        const newMem = {
          id: 'mem-' + Date.now(),
          title: body.title || 'New Shared Memory',
          content: body.content || '',
          ridaThought: body.ridaThought || 'I\'ll remember this moment with Adeel.',
          category: body.category || 'shared_moment',
          importance: Number(body.importance) || 4,
          pinned: Boolean(body.pinned),
          autoExtracted: false,
          location: body.location || state.rida.locationLabel,
          emotion: body.emotion || state.rida.mood,
          skillSource: body.skillSource || 'Manual Memory Entry',
          timestamp: new Date().toISOString()
        };
        memories.unshift(newMem);
      }
      saveMemories(memories);
      return sendJson(res, 200, { ok: true, memories });
    }

    if (pathname === '/api/memories' && req.method === 'DELETE') {
      const body = await parseBody(req);
      let memories = loadMemories();
      if (body.id) {
        memories = memories.filter(m => m.id !== body.id);
        saveMemories(memories);
      }
      return sendJson(res, 200, { ok: true, memories });
    }

    // ==================== PERSISTENT DB SYNC & FULL EXPORT/IMPORT ====================
    if (pathname === '/api/backup/export' && req.method === 'GET') {
      const state = loadState();
      const memories = loadMemories();
      const skillsMeta = loadSkillsMeta();
      const scanned = scanAllSkills();
      const storeItems = getStoreItems();
      const skillsFiles = scanned.files.map(f => ({
        name: f.name,
        categoryId: f.categoryId,
        content: f.content
      }));

      const bundle = {
        app: 'Rida Roleplay & Skill Studio',
        version: '3.0.0',
        exportedAt: new Date().toISOString(),
        stats: {
          messagesCount: (state.messages || []).length,
          memoriesCount: (memories || []).length,
          skillsFilesCount: skillsFiles.length,
          storeItemsCount: storeItems.length,
          ridaBalance: state.rida?.balance ?? 85,
          adeelBalance: state.adeel?.balance ?? 500
        },
        state,
        memories,
        skillsMeta,
        skillsFiles,
        storeItems
      };

      const dateSlug = new Date().toISOString().slice(0, 10);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="rida-roleplay-full-backup-${dateSlug}.json"`,
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(JSON.stringify(bundle, null, 2));
    }

    if (pathname === '/api/backup/import' && req.method === 'POST') {
      const body = await parseBody(req);
      const bundle = body.bundle || body;
      if (!bundle || (!bundle.state && !bundle.memories && !bundle.skillsFiles)) {
        return sendJson(res, 400, { error: 'Invalid backup file format' });
      }

      // Create pre-import safety backup
      try {
        if (fs.existsSync(STATE_FILE)) {
          fs.copyFileSync(STATE_FILE, path.join(DATA_DIR, 'state_before_import.json'));
        }
        if (fs.existsSync(MEMORIES_FILE)) {
          fs.copyFileSync(MEMORIES_FILE, path.join(DATA_DIR, 'memories_before_import.json'));
        }
      } catch (e) {}

      if (bundle.state && typeof bundle.state === 'object') {
        const mergedState = { ...getDefaultState(), ...bundle.state };
        if (!mergedState.aiConfig?.apiKey) {
          mergedState.aiConfig = {
            ...getDefaultState().aiConfig,
            ...(mergedState.aiConfig || {}),
            apiKey: DEFAULT_GEMINI_API_KEY
          };
        }
        saveState(mergedState);
      }

      if (Array.isArray(bundle.memories)) {
        saveMemories(bundle.memories);
      }

      if (bundle.skillsMeta && typeof bundle.skillsMeta === 'object') {
        saveSkillsMeta(bundle.skillsMeta);
      }

      if (Array.isArray(bundle.skillsFiles)) {
        for (const sf of bundle.skillsFiles) {
          if (sf && sf.name && typeof sf.content === 'string') {
            const safeName = path.basename(sf.name.trim());
            fs.writeFileSync(path.join(SKILLS_DIR, safeName), sf.content, 'utf8');
          }
        }
      }

      if (Array.isArray(bundle.storeItems) && bundle.storeItems.length > 0) {
        saveStoreItems(bundle.storeItems);
      }

      return sendJson(res, 200, {
        ok: true,
        state: loadState(),
        memories: loadMemories(),
        skills: scanAllSkills(),
        store: {
          categories: SHOP_CATEGORIES,
          items: getStoreItems()
        }
      });
    }

    if (pathname === '/api/db/sync' && req.method === 'POST') {
      const body = await parseBody(req);
      let serverState = loadState();
      let serverMemories = loadMemories();

      const clientState = body.state;
      const clientMemories = body.memories;

      // Smart non-destructive message merge: never lose old chats unless server was recently reset
      const serverResetTime = Number(serverState.lastResetAt || 0);
      const clientSavedTime = clientState?.savedAt ? new Date(clientState.savedAt).getTime() : 0;
      const isClientStaleAfterReset = serverResetTime > 0 && clientSavedTime > 0 && clientSavedTime < serverResetTime;

      if (!isClientStaleAfterReset && clientState && Array.isArray(clientState.messages) && clientState.messages.length > 0) {
        const serverMsgs = Array.isArray(serverState.messages) ? serverState.messages : [];
        const clientMsgs = clientState.messages;

        // If server was somehow reset while client tab has more messages and client is newer
        if (clientMsgs.length > serverMsgs.length) {
          const seenIds = new Set();
          const mergedMsgs = [];
          for (const m of [...serverMsgs, ...clientMsgs]) {
            if (m && m.id && !seenIds.has(m.id)) {
              seenIds.add(m.id);
              mergedMsgs.push(m);
            }
          }
          mergedMsgs.sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0));
          serverState = {
            ...serverState,
            ...clientState,
            rida: { ...serverState.rida, ...(clientState.rida || {}) },
            messages: mergedMsgs
          };
          saveState(serverState);
        }
      }

      // Smart non-destructive memory merge
      if (!isClientStaleAfterReset && Array.isArray(clientMemories) && clientMemories.length > 0) {
        const seenMemIds = new Set(serverMemories.map(m => m.id));
        let added = false;
        for (const cm of clientMemories) {
          if (cm && cm.id && !seenMemIds.has(cm.id)) {
            seenMemIds.add(cm.id);
            serverMemories.push(cm);
            added = true;
          }
        }
        if (added) {
          saveMemories(serverMemories);
        }
      }

      return sendJson(res, 200, {
        ok: true,
        state: serverState,
        memories: serverMemories,
        skills: scanAllSkills(),
        store: {
          categories: SHOP_CATEGORIES,
          items: getStoreItems()
        }
      });
    }

    let filePath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, pathname);
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      return fs.createReadStream(filePath).pipe(res);
    }

    const indexHtml = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(indexHtml)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(indexHtml).pipe(res);
    }

    res.writeHead(404);
    res.end('Not Found');
  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { error: err.message || 'Internal Server Error' });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`  RIDA ROLEPLAY & SKILL ENGINE RUNNING ON PORT ${PORT}`);
  console.log(`  Open: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
