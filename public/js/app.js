// ============================================================================
// RIDA — COUSIN ROLEPLAY & SKILL STUDIO FRONTEND (100% SVG ICONS, ZERO EMOJIS)
// ============================================================================

const AppState = {
  skills: { categories: [], files: [] },
  store: { categories: [], items: [] },
  cinema: { categories: [], movies: [] },
  state: null,
  memories: [],
  activeView: 'chat',
  activeMemoryFilter: 'all',
  activeSkillFile: null,
  activeShopMode: 'catalog',
  activeShopCategory: 'all',
  activeShopRating: 'all',
  activePhoneTab: 'messages',
  activeMovieCategory: 'all'
};

// All 16 Live Emotion, Physical & Intimate Bars Definition (With Hex, Gradient & Glow)
const ALL_16_BARS_GROUPS = [
  {
    groupTitle: 'Affection & Core Feelings',
    groupBadge: 'HEART & BOND',
    groupColor: '#f472b6',
    bars: [
      {
        key: 'likeness',
        label: 'Likeness',
        color: '#f472b6',
        gradient: 'linear-gradient(90deg, #db2777 0%, #f472b6 65%, #fbcfe8 100%)',
        glow: 'rgba(244, 114, 182, 0.45)'
      },
      {
        key: 'trustLevel',
        label: 'Trust & Safety',
        color: '#818cf8',
        gradient: 'linear-gradient(90deg, #4f46e5 0%, #818cf8 65%, #c7d2fe 100%)',
        glow: 'rgba(129, 140, 248, 0.45)'
      },
      {
        key: 'happiness',
        label: 'Happiness',
        color: '#fbbf24',
        gradient: 'linear-gradient(90deg, #d97706 0%, #fbbf24 65%, #fde68a 100%)',
        glow: 'rgba(251, 191, 36, 0.45)'
      },
      {
        key: 'blushLevel',
        label: 'Blush Level',
        color: '#fb7185',
        gradient: 'linear-gradient(90deg, #e11d48 0%, #fb7185 65%, #fecdd3 100%)',
        glow: 'rgba(251, 113, 133, 0.45)'
      }
    ]
  },
  {
    groupTitle: 'Intimate & 18+ Arousal Bars',
    groupBadge: '18+ SENSUAL',
    groupColor: '#e879f9',
    bars: [
      {
        key: 'warmthLevel',
        label: 'Warmness',
        color: '#fb923c',
        gradient: 'linear-gradient(90deg, #ea580c 0%, #fb923c 65%, #fed7aa 100%)',
        glow: 'rgba(251, 146, 60, 0.45)'
      },
      {
        key: 'hotness',
        label: 'Hotness',
        color: '#f43f5e',
        gradient: 'linear-gradient(90deg, #be123c 0%, #f43f5e 65%, #fda4af 100%)',
        glow: 'rgba(244, 63, 94, 0.5)'
      },
      {
        key: 'lust',
        label: 'Lust',
        color: '#e879f9',
        gradient: 'linear-gradient(90deg, #a21caf 0%, #e879f9 65%, #f5d0fe 100%)',
        glow: 'rgba(232, 121, 249, 0.55)'
      },
      {
        key: 'pleasure',
        label: 'Pleasure',
        color: '#d946ef',
        gradient: 'linear-gradient(90deg, #86198f 0%, #d946ef 65%, #f0abfc 100%)',
        glow: 'rgba(217, 70, 239, 0.55)'
      },
      {
        key: 'wetness',
        label: 'Wetness',
        color: '#c084fc',
        gradient: 'linear-gradient(90deg, #0ea5e9 0%, #a855f7 55%, #e879f9 100%)',
        glow: 'rgba(192, 132, 252, 0.55)'
      }
    ]
  },
  {
    groupTitle: 'Vulnerable & Negative Emotions',
    groupBadge: 'GUARD & STRESS',
    groupColor: '#38bdf8',
    bars: [
      {
        key: 'sadness',
        label: 'Sadness',
        color: '#38bdf8',
        gradient: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 65%, #bae6fd 100%)',
        glow: 'rgba(56, 189, 248, 0.45)'
      },
      {
        key: 'anger',
        label: 'Anger',
        color: '#ef4444',
        gradient: 'linear-gradient(90deg, #b91c1c 0%, #ef4444 65%, #fca5a5 100%)',
        glow: 'rgba(239, 68, 68, 0.5)'
      },
      {
        key: 'fear',
        label: 'Afraid / Fear',
        color: '#a78bfa',
        gradient: 'linear-gradient(90deg, #6d28d9 0%, #a78bfa 65%, #ddd6fe 100%)',
        glow: 'rgba(167, 139, 250, 0.45)'
      },
      {
        key: 'horror',
        label: 'Horror / Shock',
        color: '#f87171',
        gradient: 'linear-gradient(90deg, #991b1b 0%, #ef4444 65%, #fecaca 100%)',
        glow: 'rgba(248, 113, 113, 0.5)'
      }
    ]
  },
  {
    groupTitle: 'Biological & Physical State',
    groupBadge: 'BODY VITALS',
    groupColor: '#34d399',
    bars: [
      {
        key: 'hunger',
        label: 'Hunger',
        color: '#facc15',
        gradient: 'linear-gradient(90deg, #ca8a04 0%, #facc15 65%, #fef08a 100%)',
        glow: 'rgba(250, 204, 21, 0.45)'
      },
      {
        key: 'tiredness',
        label: 'Tiredness',
        color: '#60a5fa',
        gradient: 'linear-gradient(90deg, #1d4ed8 0%, #60a5fa 65%, #bfdbfe 100%)',
        glow: 'rgba(96, 165, 250, 0.45)'
      },
      {
        key: 'pain',
        label: 'Pain / Discomfort',
        color: '#fb7185',
        gradient: 'linear-gradient(90deg, #be123c 0%, #fb7185 65%, #ffe4e6 100%)',
        glow: 'rgba(251, 113, 133, 0.45)'
      }
    ]
  }
];

// Clean Lucide SVG Icon Library (Zero Emojis)
const SVG_PATHS = {
  'cpu': '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  'dollar-sign': '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  'shopping-bag': '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'smartphone': '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  'folder': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  'camera': '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  'lock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'unlock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  'pin': '<line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>',
  'sparkles': '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/>',
  'search': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'trash': '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  'film': '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
  'play': '<polygon points="5 3 19 12 5 21 5 3"/>',
  'image': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  'rotate-ccw': '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  'corner-down-left': '<polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/>'
};

function svgIcon(name, cls = 'icon-xs') {
  const path = SVG_PATHS[name] || SVG_PATHS['folder'];
  return `<svg class="${cls}" viewBox="0 0 24 24">${path}</svg>`;
}

const MARK_3_SECRETS = [
  {
    id: 1,
    title: 'Late Night Thoughts Next Door',
    text: 'She sometimes lies awake at night thinking dirty thoughts about the boy in the next room (Adeel). She touches herself quietly and feels guilty afterward.',
    prompt: '*Late at night, the house is completely silent. I knock softly on your door and step inside, sitting on the edge of your bed and asking in a low whisper what you think about when you can\'t sleep.*'
  },
  {
    id: 2,
    title: 'The Shared Bathroom & Thin Wall',
    text: 'She gets wet thinking about being caught in the shared upstairs bathroom or hearing your voice through the thin wall between your rooms.',
    prompt: '*We both reach the upstairs shared bathroom at the same time late at night. I step close to you by the doorway and speak in a low voice so only you can hear.*'
  },
  {
    id: 3,
    title: 'Chocolate & Slow Sensation',
    text: 'Chocolate isn\'t just a favorite snack — she associates the taste and melting sensation with soft, slow pleasure.',
    prompt: '*I bring a piece of milk chocolate to your room, holding it to your lips so it melts slowly while keeping my eyes on yours.*'
  },
  {
    id: 4,
    title: 'Secret Headphone Playlist',
    text: 'She has a secret playlist of soft, sensual songs she only plays with headphones when everyone else is downstairs.',
    prompt: '*I sit beside you on your bed and gently take one of your earphones to listen to what playlist you\'re hiding on your phone.*'
  },
  {
    id: 5,
    title: 'Mirror Expressions Alone',
    text: 'She has practiced certain expressions and soft sounds in the mirror when alone, wondering what you would think.',
    prompt: '*I catch you standing in front of your room mirror fixing your hair and smiling softly to yourself.* What were you thinking about just now, Rida?'
  },
  {
    id: 6,
    title: 'Hesitating Outside Your Door',
    text: 'She has almost knocked on your door more than once late at night but always stopped herself at the last second.',
    prompt: '*I open my bedroom door late at night and find you standing right outside in the dim hallway, your hand raised like you were about to knock.*'
  },
  {
    id: 7,
    title: 'Whispered Words While Parents Sleep',
    text: 'The idea of slow, whispered dirty talk while parents are asleep downstairs turns her on more than anything direct or rough.',
    prompt: '*Everyone downstairs is asleep. I lean close to your ear in the quiet hallway and whisper softly about how much I\'ve been thinking about you.*'
  },
  {
    id: 8,
    title: 'The Hidden Wishlist Note',
    text: 'She keeps a small hidden note or list of private things she wants to try with someone she trusts, but has never shown anyone.',
    prompt: '*While helping you look for a notebook under your bed, I notice a folded private note tucked inside your old diary.* What is written on this, Rida?'
  },
  {
    id: 9,
    title: 'Caught Staring at You',
    text: 'She blushes hardest when she realizes she\'s been staring at you without meaning to.',
    prompt: '*I look up suddenly and catch you staring at me from across the hallway, holding your gaze for a second longer than usual with a soft smile.*'
  },
  {
    id: 10,
    title: 'Walking In While Changing',
    text: 'She has imagined what it would feel like if you walked in while she was changing in her room and didn\'t immediately leave.',
    prompt: '*Your door was left slightly ajar on the top floor. I push it open softly to ask you something and freeze when I realize you\'re in the middle of changing.*'
  }
];

const HIDING_SPOTS = [
  {
    spot: 'Under the mattress',
    item: 'Spare saved cash & a folded private note of thoughts she hides from everyone',
    prompt: '*While sitting on the edge of your bed in your room, my hand brushes under the corner of the mattress and feels a small hidden envelope.* What are you hiding under here, Rida?'
  },
  {
    spot: 'Back of the wardrobe / behind clothes',
    item: 'Soft lace lingerie / nicer underwear she rarely wears and keeps tucked behind her hoodies',
    prompt: '*While helping you reach a box at the back of your wardrobe behind your hoodies, I notice something soft and delicate tucked away in a pouch.*'
  },
  {
    spot: 'Inside an old notebook under the bed',
    item: 'Her secret wishlist of things she wants to try & old saved photos',
    prompt: '*I pull out the old notebook from under your bed and look at you teasingly.* Is this your secret diary, Rida?'
  },
  {
    spot: 'Small pouch in desk drawer',
    item: 'Secret stash of favorite milk chocolates & a small personal comfort item',
    prompt: '*I open the top drawer of your study desk for a pen and spot the hidden pouch of extra chocolates you\'ve been saving.*'
  }
];

const FRIENDS_DATA = [
  {
    name: 'Aisha',
    age: 18,
    role: 'Best Friend • Outgoing & Talkative',
    desc: 'Plans most hangouts, loves shopping and trying new sweets, comes over to the house most often, and gently teases Rida whenever she sees Adeel upstairs.',
    prompts: [
      { label: 'Aisha Visits Upstairs', text: '*The doorbell rings downstairs—Aisha just came over to visit you, and she\'s coming up the stairs toward our rooms right now.*' },
      { label: 'Mall Outing with Aisha', text: 'Rida, did Aisha text you about going to the mall for sweets today? Tell me what she said.' }
    ]
  },
  {
    name: 'Meher',
    age: 19,
    role: 'Close Friend • Calm & Observant',
    desc: 'Watches people quietly, gives thoughtful advice, never pushes Rida to talk, and keeps the friend group balanced.',
    prompts: [
      { label: 'Ask About Meher', text: 'What did Meher say when you talked to her today, Rida?' }
    ]
  },
  {
    name: 'Zara',
    age: 18,
    role: 'Good Friend • Playful & Energetic',
    desc: 'Makes Rida laugh even when she is shy, can be a little loud when visiting the house, and suggests spontaneous outings.',
    prompts: [
      { label: 'Spontaneous Outing', text: 'Zara is planning a spontaneous hangout outside—do you want to go or stay home upstairs with me?' }
    ]
  },
  {
    name: 'Hina',
    age: 18,
    role: 'Close Friend • Shy Like Rida',
    desc: 'Shares Rida\'s quiet nature. They can sit together in silence in Rida\'s room and share small secrets comfortably.',
    prompts: [
      { label: 'Quiet Visit with Hina', text: '*Hina just left after sitting in your room for an hour. I knock on your door.* Everything okay? What were you and Hina whispering about?' }
    ]
  }
];

const LOCATION_LABELS = {
  rida_room: 'Top Floor — Rida\'s Room (Door Slightly Ajar)',
  hallway: 'Top Floor — Hallway / Doorways (<2ft Apart)',
  adeel_room: 'Top Floor — Adeel\'s Room (Next Door)',
  shared_bathroom: 'Top Floor — Shared Upstairs Bathroom',
  kitchen: 'Ground Floor — Shared Kitchen (Parents Nearby)',
  outside_market: 'Outside — Market, Pharmacy & Mall',
  with_friends: 'With Friends (Aisha, Meher, Zara, Hina)'
};

// ============================================================================
// PERSISTENT BROWSER + SERVER DATABASE SERVICE (IndexedDB + LocalStorage + Disk)
// ============================================================================
const RidaDB = {
  dbName: 'RidaRoleplayStudioDB',
  dbVersion: 2,
  storeName: 'snapshots',
  lsStateKey: 'rida_studio_state_v2',
  lsMemKey: 'rida_studio_memories_v2',

  open() {
    return new Promise(resolve => {
      if (!window.indexedDB) return resolve(null);
      const req = indexedDB.open(this.dbName, this.dbVersion);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
      req.onsuccess = e => resolve(e.target.result);
      req.onerror = () => resolve(null);
    });
  },

  async saveSnapshot(state, memories) {
    if (!state) return;
    const payload = {
      savedAt: new Date().toISOString(),
      state,
      memories: memories || []
    };
    try {
      localStorage.setItem(this.lsStateKey, JSON.stringify(state));
      localStorage.setItem(this.lsMemKey, JSON.stringify(memories || []));
    } catch (e) {}

    try {
      const db = await this.open();
      if (db) {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put(payload, 'latest');
      }
    } catch (e) {}

    updateDbStatusUI(state, memories);
  },

  async clear() {
    try {
      localStorage.removeItem(this.lsStateKey);
      localStorage.removeItem(this.lsMemKey);
    } catch (e) {}
    try {
      const db = await this.open();
      if (db) {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).delete('latest');
      }
    } catch (e) {}
  },

  async loadSnapshot() {
    try {
      const db = await this.open();
      if (db) {
        const fromIdb = await new Promise(resolve => {
          const tx = db.transaction(this.storeName, 'readonly');
          const req = tx.objectStore(this.storeName).get('latest');
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });
        if (fromIdb && fromIdb.state) return fromIdb;
      }
    } catch (e) {}

    try {
      const rawState = localStorage.getItem(this.lsStateKey);
      const rawMem = localStorage.getItem(this.lsMemKey);
      if (rawState) {
        return {
          state: JSON.parse(rawState),
          memories: rawMem ? JSON.parse(rawMem) : []
        };
      }
    } catch (e) {}
    return null;
  }
};

function updateDbStatusUI(state, memories) {
  const msgCount = state?.messages?.length || 0;
  const memCount = memories?.length || 0;
  const sideText = document.getElementById('sidebarDbStatusText');
  if (sideText) {
    sideText.textContent = `DB Saved (${msgCount} msgs • ${memCount} mems)`;
  }
  const modalStats = document.getElementById('modalDbStatsText');
  if (modalStats) {
    modalStats.textContent = `Active DB Snapshot: ${msgCount} roleplay messages, ${memCount} memories, $${state?.rida?.balance ?? 85} balance, ${AppState.store?.items?.length || 106} store items, and ${AppState.skills?.files?.length || 65} skill files synced across Browser IndexedDB + Server Disk.`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  bindNavigationEvents();
  bindChatEvents();
  bindTimeAndShopEvents();
  bindPhoneSystemEvents();
  bindInspectorEvents();
  bindMemoryEvents();
  bindSkillsStudioEvents();
  bindWorldHubEvents();
  bindSettingsEvents();
  bindBackupEvents();
  bindModalEvents();

  await fetchBootstrap();
});

async function fetchBootstrap() {
  try {
    const localSnap = await RidaDB.loadSnapshot();
    const res = await fetch('/api/bootstrap');
    const data = await res.json();

    let finalState = data.state;
    let finalMemories = data.memories;
    let finalSkills = data.skills;
    let finalStore = data.store || { categories: [], items: [] };
    let finalCinema = data.cinema || { categories: [], movies: [] };

    if (localSnap && localSnap.state) {
      const localMsgCount = localSnap.state.messages?.length || 0;
      const serverMsgCount = finalState?.messages?.length || 0;
      const localMemCount = localSnap.memories?.length || 0;
      const serverMemCount = finalMemories?.length || 0;

      if (localMsgCount > serverMsgCount || localMemCount > serverMemCount) {
        const syncRes = await fetch('/api/db/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            state: localSnap.state,
            memories: localSnap.memories
          })
        });
        const syncData = await syncRes.json();
        if (syncData.ok) {
          finalState = syncData.state;
          finalMemories = syncData.memories;
          finalSkills = syncData.skills || finalSkills;
          finalStore = syncData.store || finalStore;
        }
      }
    }

    AppState.skills = finalSkills;
    AppState.store = finalStore;
    AppState.cinema = finalCinema;
    AppState.state = finalState;
    AppState.memories = finalMemories;
    await RidaDB.saveSnapshot(AppState.state, AppState.memories);
    renderAll();
  } catch (err) {
    const localSnap = await RidaDB.loadSnapshot();
    if (localSnap && localSnap.state) {
      AppState.state = localSnap.state;
      AppState.memories = localSnap.memories || [];
      renderAll();
      showToast('Loaded saved chats from Browser DB');
    } else {
      showToast('Error loading data: ' + err.message);
    }
  }
}

function renderAll() {
  if (AppState.state) {
    RidaDB.saveSnapshot(AppState.state, AppState.memories);
  }
  renderSidebarAndHeader();
  renderChatMessages();
  renderChatHud();
  renderInChatShopAndInventories();
  renderPhoneSystem();
  renderMemoriesPage();
  renderSkillsStudio();
  renderWorldHub();
  renderSettingsPage();
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ============================================================================
// NAVIGATION & INSPECTOR TABS
// ============================================================================
function bindNavigationEvents() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'navOpenShopDrawerBtn') {
        switchView('chat');
        toggleInChatShopDrawer(true);
      } else if (btn.id === 'navOpenPhoneBtn') {
        openPhonePopup('messages');
      } else if (btn.dataset.view) {
        switchView(btn.dataset.view);
      }
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  document.getElementById('quickToggleMobile')?.addEventListener('click', async () => {
    const chk = document.getElementById('chkMobileMode');
    chk.checked = !chk.checked;
    await updateModes({ mobileMode: chk.checked });
    showToast(chk.checked ? '[by mobile] Phone Mode Enabled' : 'Phone Mode Disabled');
  });

  document.getElementById('quickTriggerVision')?.addEventListener('click', () => {
    switchView('chat');
    sendRoleplayMessage('***');
  });

  document.getElementById('btnViewAllSkillsFromHud')?.addEventListener('click', () => switchView('skills'));
  document.getElementById('btnViewMemoriesFromHud')?.addEventListener('click', () => switchView('memories'));
  document.getElementById('btnHudOpenFullStore')?.addEventListener('click', () => {
    toggleInChatShopDrawer(true);
  });
}

function bindInspectorEvents() {
  document.querySelectorAll('.insp-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.insp-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.itab;
      document.querySelectorAll('.insp-pane').forEach(p => {
        p.classList.toggle('active', p.id === `itab-${tab}`);
      });
    });
  });

  document.querySelectorAll('.emotion-preset-chip[data-preset]').forEach(chip => {
    chip.addEventListener('click', async () => {
      const preset = chip.dataset.preset;
      if (!preset) return;
      try {
        const res = await fetch('/api/state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'apply_emotion_preset', preset })
        });
        const data = await res.json();
        if (data.ok && data.state) {
          AppState.state = data.state;
          renderAll();
          showToast(`Rida's feeling state -> ${data.state.rida.emotionPrimary || data.state.rida.mood}`);
        }
      } catch (err) {
        showToast('Failed to switch emotion preset');
      }
    });
  });
}

function switchView(viewName) {
  AppState.activeView = viewName;
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName && b.id !== 'navOpenShopDrawerBtn');
  });
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `view-${viewName}`);
  });
}

function renderSidebarAndHeader() {
  if (!AppState.state) return;
  const { rida, adeel, worldTime, modes, aiConfig, adeelInventory, ridaInventory } = AppState.state;
  const storeCount = AppState.store?.items?.length || 106;

  document.getElementById('sidebarBalance').textContent = `$${rida.balance}`;
  document.getElementById('sidebarBlush').textContent = `${rida.likeness ?? 62}%`;
  document.getElementById('sidebarTrust').textContent = `${Math.max(rida.lust || 0, rida.wetness || 0)}%`;
  document.getElementById('sidebarLocationText').textContent = rida.locationLabel.split('—')[1]?.trim() || rida.locationLabel;

  const adeelBal = adeel?.balance ?? 500;
  const adeelInvLen = (adeelInventory || []).reduce((acc, i) => acc + (Number(i.quantity) || 1), 0);
  const ridaInvLen = (ridaInventory || []).reduce((acc, i) => acc + (Number(i.quantity) || 1), 0);

  const sideAdeelBal = document.getElementById('sidebarAdeelBalance');
  if (sideAdeelBal) sideAdeelBal.innerHTML = `<strong>$∞</strong> <span style="font-size:10px;color:#a7f3d0;font-weight:700;">(Infinite)</span>`;
  const sideAdeelBag = document.getElementById('sidebarAdeelBagCount');
  if (sideAdeelBag) sideAdeelBag.textContent = `Private Bag: ${adeelInvLen} items (Hidden from Rida)`;

  const navStoreEl = document.getElementById('navStoreCount');
  if (navStoreEl) navStoreEl.textContent = storeCount;
  const headerShopLbl = document.getElementById('headerShopBtnLabel');
  if (headerShopLbl) headerShopLbl.textContent = `Shop & Bags (${storeCount})`;
  const hudInvBadge = document.getElementById('hudTotalInvBadge');
  if (hudInvBadge) hudInvBadge.textContent = adeelInvLen + ridaInvLen;

  document.getElementById('navMemoryCount').textContent = AppState.memories.length;
  document.getElementById('navSkillCount').textContent = AppState.skills.files.length;
  document.getElementById('sidebarModelLabel').textContent =
    aiConfig?.provider === 'gemini' ? `Gemini (${aiConfig.model || '2.5-flash'})` : (aiConfig?.provider || 'Skill Engine');
  document.getElementById('sidebarEngineSummary').textContent =
    `${AppState.skills.categories.length} Folders • ${AppState.skills.files.length} Skill Files Mounted`;

  document.getElementById('headerMoodPill').textContent = rida.mood;
  document.getElementById('headerLocationLabel').textContent = rida.locationLabel;
  document.getElementById('headerPrivacyLabel').textContent = rida.privacyRisk;

  // Render World Time & Days Bar
  if (worldTime) {
    const dayEl = document.getElementById('headerDayText');
    const clockEl = document.getElementById('headerClockText');
    const periodEl = document.getElementById('headerPeriodText');
    const autoChk = document.getElementById('chkAutoTime');
    if (dayEl) dayEl.textContent = `Day ${worldTime.dayCount || 1} (${worldTime.dayOfWeek || 'Monday'})`;
    if (clockEl) clockEl.textContent = worldTime.formattedTime || '9:30 PM';
    if (periodEl) periodEl.textContent = worldTime.period || 'Night';
    if (autoChk) autoChk.checked = worldTime.autoAdvance !== false;
  }

  const mobileBadge = document.getElementById('headerMobileBadge');
  const chkMobile = document.getElementById('chkMobileMode');
  const quickMobBtn = document.getElementById('quickToggleMobile');
  if (modes?.mobileMode) {
    mobileBadge.classList.remove('hidden');
    chkMobile.checked = true;
    quickMobBtn.classList.add('active');
  } else {
    mobileBadge.classList.add('hidden');
    chkMobile.checked = false;
    quickMobBtn.classList.remove('active');
  }

  const locSelect = document.getElementById('selectSceneLocation');
  if (locSelect && rida.location) {
    locSelect.value = rida.location;
  }
}

// ============================================================================
// TIME & DAYS CONTROLLER + IN-CHAT 106+ STORE & DUAL INVENTORY SYSTEM
// ============================================================================
function bindTimeAndShopEvents() {
  // Time Skip Chips (+15m, +1h, +3h, +1 Day, +7 Days)
  document.querySelectorAll('[data-advance-mins]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const minutes = Number(btn.dataset.advanceMins) || 15;
      const res = await fetch('/api/time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'advance', minutes })
      });
      const data = await res.json();
      if (data.ok) {
        AppState.state = data.state;
        renderAll();
        showToast(`Time advanced: ${AppState.state.household.timeOfDay}`);
      }
    });
  });

  // Jump to Period Chips (Midnight, Morning)
  document.querySelectorAll('[data-jump-period]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const period = btn.dataset.jumpPeriod;
      const res = await fetch('/api/time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'jump_period', period })
      });
      const data = await res.json();
      if (data.ok) {
        AppState.state = data.state;
        renderAll();
        showToast(`Skipped to ${period}: ${AppState.state.household.timeOfDay}`);
      }
    });
  });

  // Auto-Time Toggle
  document.getElementById('chkAutoTime')?.addEventListener('change', async () => {
    const res = await fetch('/api/time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle_auto' })
    });
    const data = await res.json();
    if (data.ok) {
      AppState.state = data.state;
      renderAll();
      showToast(AppState.state.worldTime.autoAdvance ? 'Auto-Time Enabled (+10m/turn)' : 'Auto-Time Paused');
    }
  });

  // Open Custom Time & Day Modal
  const openTimeModalFn = () => {
    const wt = AppState.state?.worldTime || { dayCount: 1, dayIndex: 0, hour: 21, minute: 30, autoAdvance: true };
    document.getElementById('timeInputDayCount').value = wt.dayCount || 1;
    document.getElementById('timeInputDayIndex').value = String(wt.dayIndex ?? 0);
    document.getElementById('timeInputHour').value = wt.hour ?? 21;
    document.getElementById('timeInputMinute').value = wt.minute ?? 30;
    document.getElementById('timeInputAutoAdvance').checked = wt.autoAdvance !== false;
    openModal('modalTimeControl');
  };
  document.getElementById('btnOpenTimeModal')?.addEventListener('click', openTimeModalFn);
  document.getElementById('btnCustomTimeOpen')?.addEventListener('click', openTimeModalFn);

  document.getElementById('formTimeControl')?.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      action: 'set',
      dayCount: Number(document.getElementById('timeInputDayCount').value) || 1,
      dayIndex: Number(document.getElementById('timeInputDayIndex').value) || 0,
      hour: Number(document.getElementById('timeInputHour').value) || 0,
      minute: Number(document.getElementById('timeInputMinute').value) || 0,
      autoAdvance: document.getElementById('timeInputAutoAdvance').checked
    };
    const res = await fetch('/api/time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.ok) {
      AppState.state = data.state;
      closeModal('modalTimeControl');
      renderAll();
      showToast(`World time set to: ${AppState.state.household.timeOfDay}`);
    }
  });

  // Toggle In-Chat Shop & Bags Drawer
  document.getElementById('btnToggleShopDrawer')?.addEventListener('click', () => {
    const drawer = document.getElementById('chatShopDrawer');
    toggleInChatShopDrawer(drawer.classList.contains('hidden'));
  });
  document.getElementById('btnCloseShopDrawer')?.addEventListener('click', () => {
    toggleInChatShopDrawer(false);
  });

  // Quick "Go Shopping Together" button -> auto-switches location to outside_market + opens shop drawer + sends message
  document.getElementById('btnQuickGoShopping')?.addEventListener('click', async () => {
    await fetch('/api/shop/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'go_shopping' })
    });
    toggleInChatShopDrawer(true);
    sendRoleplayMessage('Let\'s go outside to the market, pharmacy, and mall together so we can look at all the items in the shops.');
  });

  // Topup Adeel Wallet
  document.getElementById('btnTopupAdeel')?.addEventListener('click', async () => {
    const res = await fetch('/api/shop/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'topup_adeel', amount: 500 })
    });
    const data = await res.json();
    if (data.ok) {
      AppState.state = data.state;
      renderAll();
      showToast(data.notice || 'Added +$500 to your private wallet');
    }
  });

  // Shop Drawer Mode Tabs (Store Catalog vs My Private Inventory vs Rida's Inventory)
  document.querySelectorAll('.shop-mode-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.shop-mode-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeShopMode = btn.dataset.smode;
      renderInChatShopAndInventories();
    });
  });

  // Shop Category Filter Tabs
  document.querySelectorAll('#shopCategoryTabs .pill-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#shopCategoryTabs .pill-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeShopCategory = btn.dataset.scat;
      renderInChatShopAndInventories();
    });
  });

  document.getElementById('shopRatingFilter')?.addEventListener('change', e => {
    AppState.activeShopRating = e.target.value;
    renderInChatShopAndInventories();
  });

  document.getElementById('shopSearchInput')?.addEventListener('input', () => {
    renderInChatShopAndInventories();
  });

  // Open "+ Add New Item" Modal (Saves to data/store_items.json)
  const openAddStoreModal = () => openStoreItemModal(null);
  document.getElementById('btnOpenAddStoreItem')?.addEventListener('click', openAddStoreModal);
  document.getElementById('btnWorldAddStoreItem')?.addEventListener('click', openAddStoreModal);

  document.getElementById('formStoreItem')?.addEventListener('submit', async e => {
    e.preventDefault();
    const statEffects = {};
    const statMap = {
      likeness: 'effLikeness',
      happiness: 'effHappiness',
      blushLevel: 'effBlush',
      warmthLevel: 'effWarmth',
      hotness: 'effHotness',
      lust: 'effLust',
      pleasure: 'effPleasure',
      wetness: 'effWetness',
      hunger: 'effHunger',
      pain: 'effPain',
      tiredness: 'effTiredness',
      trustLevel: 'effTrust'
    };
    for (const [k, elId] of Object.entries(statMap)) {
      const val = Number(document.getElementById(elId)?.value || 0);
      if (val !== 0) statEffects[k] = val;
    }

    const payload = {
      id: document.getElementById('storeItemFormId').value || undefined,
      name: document.getElementById('storeItemFormName').value.trim(),
      price: Number(document.getElementById('storeItemFormPrice').value) || 10,
      category: document.getElementById('storeItemFormCategory').value,
      rating: document.getElementById('storeItemFormRating').value,
      purpose: document.getElementById('storeItemFormPurpose').value.trim(),
      howToUse: document.getElementById('storeItemFormHowToUse').value.trim(),
      statEffects
    };

    const res = await fetch('/api/store/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.ok) {
      AppState.store = data.store;
      closeModal('modalStoreItem');
      renderAll();
      showToast(`Saved "${data.item.name}" ($${data.item.price}) to data/store_items.json!`);
    } else {
      showToast(data.error || 'Failed to save item');
    }
  });
}

function toggleInChatShopDrawer(show) {
  const drawer = document.getElementById('chatShopDrawer');
  const btn = document.getElementById('btnToggleShopDrawer');
  if (!drawer) return;
  drawer.classList.toggle('hidden', !show);
  if (btn) btn.classList.toggle('active', show);
  if (show) renderInChatShopAndInventories();
}

window.openStoreItemModal = function(itemId = null) {
  const existing = itemId ? (AppState.store?.items || []).find(i => i.id === itemId) : null;
  document.getElementById('storeItemFormId').value = existing ? existing.id : '';
  document.getElementById('storeItemFormName').value = existing ? existing.name : '';
  document.getElementById('storeItemFormPrice').value = existing ? existing.price : 25;
  document.getElementById('storeItemFormCategory').value = existing ? existing.category : 'intimate_18_med';
  document.getElementById('storeItemFormRating').value = existing ? existing.rating : '18+';
  document.getElementById('storeItemFormPurpose').value = existing ? existing.purpose : '';
  document.getElementById('storeItemFormHowToUse').value = existing ? existing.howToUse : '';

  const eff = existing?.statEffects || { likeness: 6, happiness: 10, blushLevel: 15, warmthLevel: 10, lust: 15, pleasure: 12, wetness: 15 };
  document.getElementById('effLikeness').value = eff.likeness || 0;
  document.getElementById('effHappiness').value = eff.happiness || 0;
  document.getElementById('effBlush').value = eff.blushLevel || 0;
  document.getElementById('effWarmth').value = eff.warmthLevel || 0;
  document.getElementById('effHotness').value = eff.hotness || 0;
  document.getElementById('effLust').value = eff.lust || 0;
  document.getElementById('effPleasure').value = eff.pleasure || 0;
  document.getElementById('effWetness').value = eff.wetness || 0;
  document.getElementById('effHunger').value = eff.hunger || 0;
  document.getElementById('effPain').value = eff.pain || 0;
  document.getElementById('effTiredness').value = eff.tiredness || 0;
  document.getElementById('effTrust').value = eff.trustLevel || 0;

  document.getElementById('modalStoreItemTitle').textContent = existing
    ? `Edit Store Item: ${existing.name}`
    : 'Add New Item to Store (Saves to data/store_items.json)';
  openModal('modalStoreItem');
};

window.deleteStoreCatalogItem = async function(itemId) {
  const item = (AppState.store?.items || []).find(i => i.id === itemId);
  if (!item) return;
  if (!confirm(`Delete "${item.name}" from store_items.json?`)) return;
  const res = await fetch('/api/store/item', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: itemId })
  });
  const data = await res.json();
  if (data.ok) {
    AppState.store = data.store;
    renderAll();
    showToast(`Deleted "${item.name}" from store file`);
  }
};

window.executeShopAction = async function(action, itemId, extra = {}) {
  try {
    showToast('Processing item action...');
    const res = await fetch('/api/shop/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, itemId, ...extra })
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      showToast(data.error || 'Action failed');
      return;
    }
    if (data.state) AppState.state = data.state;
    if (data.memories) AppState.memories = data.memories;
    await RidaDB.saveSnapshot(AppState.state, AppState.memories);

    // If an item was gifted or used, switch immediately to chat and close drawer so user sees Rida's reaction!
    if (data.chatMessage || action === 'buy_gift_for_rida' || action === 'give_to_rida' || action === 'use_item') {
      switchView('chat');
      toggleInChatShopDrawer(false);
    } else if (action === 'buy_for_adeel' || action === 'buy_adeel') {
      // If bought for Adeel's bag, switch the shop mode to My Bag so user sees the item in their bag immediately
      AppState.activeShopMode = 'adeel_inv';
      document.querySelectorAll('.shop-mode-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.smode === 'adeel_inv');
      });
    }

    renderAll();

    // Scroll chat to bottom so message is immediately in view
    setTimeout(() => {
      const container = document.getElementById('chatMessages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);

    if (data.notice) showToast(data.notice);
  } catch (err) {
    showToast('Error: ' + err.message);
  }
};

function formatStatEffectPills(statEffects = {}) {
  const entries = Object.entries(statEffects || {}).filter(([, v]) => Number(v) !== 0);
  if (entries.length === 0) return '';
  const intimateKeys = new Set(['lust', 'pleasure', 'wetness', 'hotness', 'blushLevel', 'warmthLevel']);
  return `
    <div class="stat-effects-row">
      ${entries.map(([k, v]) => {
        const sign = v > 0 ? '+' : '';
        const cls = intimateKeys.has(k) ? 'intimate' : (v > 0 ? 'pos' : '');
        const cleanName = k.replace('Level', '');
        return `<span class="stat-eff-pill ${cls}">${escapeHtml(cleanName)} ${sign}${v}%</span>`;
      }).join('')}
    </div>
  `;
}

function renderInChatShopAndInventories() {
  if (!AppState.state) return;
  const { rida, adeel, adeelInventory, ridaInventory } = AppState.state;
  const items = AppState.store?.items || [];

  const adeelBalEl = document.getElementById('shopAdeelBalance');
  if (adeelBalEl) {
    adeelBalEl.innerHTML = `<span style="font-size:15px;color:#34d399;font-weight:800;">$∞</span> <span style="font-size:9.5px;padding:2px 7px;border-radius:999px;background:rgba(52,211,153,0.18);border:1px solid #34d399;color:#a7f3d0;font-weight:700;letter-spacing:0.04em;">INFINITE</span>`;
  }
  const ridaBalEl = document.getElementById('shopRidaBalance');
  if (ridaBalEl) ridaBalEl.textContent = `$${rida.balance}`;

  const catCountEl = document.getElementById('shopCatalogCount');
  if (catCountEl) catCountEl.textContent = items.length;
  const adeelInvCountEl = document.getElementById('shopAdeelInvCount');
  if (adeelInvCountEl) adeelInvCountEl.textContent = (adeelInventory || []).reduce((a, b) => a + (b.quantity || b.qty || 1), 0);
  const ridaInvCountEl = document.getElementById('shopRidaInvCount');
  if (ridaInvCountEl) ridaInvCountEl.textContent = (ridaInventory || []).reduce((a, b) => a + (b.quantity || b.qty || 1), 0);

  const catalogGrid = document.getElementById('inChatStoreGrid');
  const adeelGrid = document.getElementById('inChatAdeelInvGrid');
  const ridaGrid = document.getElementById('inChatRidaInvGrid');
  const filtersRow = document.getElementById('shopCatalogFiltersRow');
  if (!catalogGrid || !adeelGrid || !ridaGrid) return;

  const mode = AppState.activeShopMode || 'catalog';
  catalogGrid.classList.toggle('hidden', mode !== 'catalog');
  if (filtersRow) filtersRow.classList.toggle('hidden', mode !== 'catalog');
  adeelGrid.classList.toggle('hidden', mode !== 'adeel_inv');
  ridaGrid.classList.toggle('hidden', mode !== 'rida_inv');

  if (mode === 'catalog') {
    const q = (document.getElementById('shopSearchInput')?.value || '').toLowerCase();
    const cat = AppState.activeShopCategory || 'all';
    const rating = AppState.activeShopRating || 'all';

    const normalizeCat = c => {
      if (c === 'adult_meds') return 'intimate_18_med';
      if (c === 'adult_toys') return 'adult_toys_18';
      return c || 'food';
    };

    // Update category tab counts dynamically
    document.querySelectorAll('#shopCategoryTabs .pill-tab').forEach(btn => {
      const btnCat = btn.dataset.scat;
      if (!btn.dataset.baseLabel) {
        btn.dataset.baseLabel = btn.textContent.trim();
      }
      if (btnCat === 'all') {
        btn.textContent = `${btn.dataset.baseLabel} (${items.length})`;
      } else {
        const cnt = items.filter(i => normalizeCat(i.category) === btnCat).length;
        btn.textContent = `${btn.dataset.baseLabel} (${cnt})`;
      }
    });

    const filtered = items.filter(it => {
      const itemCat = normalizeCat(it.category);
      if (cat !== 'all' && itemCat !== cat) return false;
      if (rating !== 'all' && it.rating !== rating) return false;
      if (q) {
        const hay = `${it.name} ${it.purpose} ${it.howToUse} ${itemCat} ${it.rating}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    catalogGrid.innerHTML = filtered.map(it => {
      const is18 = it.rating === '18+';
      const safeId = escapeHtml(it.id.replace(/'/g, "\\'"));
      return `
        <div class="store-item-card ${is18 ? 'item-18plus' : ''}" title="Purpose: ${escapeHtml(it.purpose)}&#10;How to Use: ${escapeHtml(it.howToUse)}">
          <div class="store-card-top">
            <span class="store-card-name">${escapeHtml(it.name)}</span>
            <div class="store-card-badges">
              <span class="price-tag-badge">$${it.price}</span>
              <span class="rating-badge ${is18 ? 'adult18' : 'simple'}">${escapeHtml(it.rating)}</span>
              <button class="icon-btn" style="width:20px;height:20px;font-size:10px;" title="Edit Item" onclick="openStoreItemModal('${safeId}')">✎</button>
              <button class="icon-btn" style="width:20px;height:20px;font-size:10px;" title="Delete Item" onclick="deleteStoreCatalogItem('${safeId}')">✕</button>
            </div>
          </div>
          <div class="store-hover-details">
            <div><strong>Purpose:</strong> ${escapeHtml(it.purpose)}</div>
            <div><strong>How to Use:</strong> ${escapeHtml(it.howToUse)}</div>
            ${formatStatEffectPills(it.statEffects)}
          </div>
          <div class="store-card-actions">
            <button class="shop-act-btn" title="Buy with your money into your Private Bag (Rida cannot see it)" onclick="executeShopAction('buy_for_adeel', '${safeId}')">
              Buy (My Bag)
            </button>
            <button class="shop-act-btn primary" title="Buy with your money and gift directly to Rida" onclick="executeShopAction('buy_gift_for_rida', '${safeId}')">
              Gift Rida ($${it.price})
            </button>
            <button class="shop-act-btn" title="Rida buys this openly with her wallet ($${rida.balance})" onclick="executeShopAction('rida_buys', '${safeId}', { secret: false })">
              Rida Buys
            </button>
            <button class="shop-act-btn secret" title="Rida secretly buys this and hides it in her bag" onclick="executeShopAction('rida_secret_buy', '${safeId}', { secret: true })">
              Secret Buy
            </button>
          </div>
        </div>
      `;
    }).join('');
  } else if (mode === 'adeel_inv') {
    if (!adeelInventory || adeelInventory.length === 0) {
      adeelGrid.innerHTML = `<div class="panel-card"><p class="text-secondary">Your private inventory is empty. Browse the Store Catalog to buy items privately!</p></div>`;
    } else {
      adeelGrid.innerHTML = adeelInventory.map(inv => {
        const is18 = inv.rating === '18+';
        const safeId = escapeHtml((inv.itemId || inv.id).replace(/'/g, "\\'"));
        return `
          <div class="store-item-card ${is18 ? 'item-18plus' : ''}">
            <div class="store-card-top">
              <span class="store-card-name">${escapeHtml(inv.name)} <span class="mono-tag">x${inv.quantity || 1}</span></span>
              <div class="store-card-badges">
                <span class="price-tag-badge">$${inv.price}</span>
                <span class="rating-badge ${is18 ? 'adult18' : 'simple'}">${escapeHtml(inv.rating || 'Simple')}</span>
              </div>
            </div>
            <div class="store-hover-details">
              <div><strong>Privacy:</strong> <em>Hidden in your bag — Rida cannot see this until you give or use it.</em></div>
              <div><strong>Purpose:</strong> ${escapeHtml(inv.purpose || '')}</div>
              <div><strong>How to Use:</strong> ${escapeHtml(inv.howToUse || '')}</div>
            </div>
            <div class="store-card-actions">
              <button class="shop-act-btn primary" onclick="executeShopAction('give_to_rida', '${safeId}')">
                Give to Rida → Her Bag
              </button>
              <button class="shop-act-btn secret" onclick="executeShopAction('use_item', '${safeId}', { owner: 'adeel' })">
                Use Item Now
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  } else if (mode === 'rida_inv') {
    if (!ridaInventory || ridaInventory.length === 0) {
      ridaGrid.innerHTML = `<div class="panel-card"><p class="text-secondary">Rida's inventory is currently empty.</p></div>`;
    } else {
      ridaGrid.innerHTML = ridaInventory.map(inv => {
        const is18 = inv.rating === '18+';
        const safeId = escapeHtml((inv.itemId || inv.id).replace(/'/g, "\\'"));
        return `
          <div class="store-item-card ${is18 ? 'item-18plus' : ''}">
            <div class="store-card-top">
              <span class="store-card-name">${escapeHtml(inv.name)} <span class="mono-tag">x${inv.quantity || 1}</span></span>
              <div class="store-card-badges">
                ${inv.secret ? `<span class="secret-tag-badge">[Secret]</span>` : ''}
                <span class="price-tag-badge">$${inv.price}</span>
                <span class="rating-badge ${is18 ? 'adult18' : 'simple'}">${escapeHtml(inv.rating || 'Simple')}</span>
              </div>
            </div>
            <div class="store-hover-details">
              <div><strong>Origin:</strong> ${escapeHtml(inv.acquiredFrom || 'Rida\'s Room')}</div>
              <div><strong>Purpose:</strong> ${escapeHtml(inv.purpose || '')}</div>
              <div><strong>How to Use:</strong> ${escapeHtml(inv.howToUse || '')}</div>
            </div>
            <div class="store-card-actions">
              <button class="shop-act-btn primary" onclick="executeShopAction('use_item', '${safeId}', { owner: 'rida' })">
                Have Rida Use / Wear Now
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

// ============================================================================
// VIEW 1: CHAT & ROLEPLAY STUDIO + SELECTIVE SEMANTIC WORD COLORING
// ============================================================================
const SEMANTIC_WORD_RULES = [
  // 1. Money & Dollar amounts (Emerald Green #34d399)
  {
    cls: 'w-money',
    regex: /(\$\d+(?:\.\d+)?|\b(?:money|cash|dollars?|wallet|purse|balance|pocket money|saved|savings|buy|bought|spending|spend|borrow|price)\b)/gi
  },
  // 2. Intimate / Blush / Dirty / 18+ / Sensual words (Sensual Magenta #e879f9)
  {
    cls: 'w-intimate',
    regex: /\b(blush(?:es|ing|ed)?|flushed|flustered|kiss(?:es|ing|ed)?|lips?|touch(?:es|ing|ed)?|skin|bare|neck|collarbone|waist|hips?|thighs?|chest|breasts?|curves?|body|breath(?:ing|less)?|whisper(?:s|ing|ed)?|wet|wetness|turned on|turn on|desire|pleasure|intimate|intimacy|sensual|dirty|naughty|secrets?|lingerie|bra|panties|underwear|heartbeat|pulse|shiver(?:s|ing)?|trembl(?:e|es|ing)|moan(?:s|ing)?|sigh(?:s|ing)?|teas(?:e|es|ing)|seductive|sheets|mattress|changing|naked|lust|hotness|vibrator|condoms?|lube|arousal|craving|temptation|forbidden)\b/gi
  },
  // 3. Cute / Sweet / Soft / Chocolate words (Soft Rose Pink #f472b6)
  {
    cls: 'w-cute',
    regex: /\b(cute|sweet(?:ly)?|soft(?:ly)?|pretty|adorable|gentl(?:e|y)|shy(?:ly)?|chocolates?|brownies?|candy|cuddle|cozy|warmth|darling|lovely|innocent|delicate|ice cream|truffles?)\b/gi
  },
  // 4. Happy / Warm / Positive words (Warm Gold Amber #fbbf24)
  {
    cls: 'w-happy',
    regex: /\b(happy|happily|smil(?:e|es|ing|ed)|laugh(?:s|ing|ed)?|giggl(?:e|es|ing)|glad|excited|excitement|joy|lov(?:e|es|ing)|favou?rite|thank you|thanks|grateful|relie(?:f|ved)|bright(?:ens)?|cheerful|trust|safe|comfortable|comfort|peaceful|warm(?:ly)?)\b/gi
  },
  // 5. Sad / Shy / Nervous / Hesitant words (Sky Blue #38bdf8)
  {
    cls: 'w-sad',
    regex: /\b(sad(?:ly)?|cr(?:y|ying|ied)|tears?|lonely|alone|hurt|sorry|apologize|nervous(?:ly)?|anxious|worr(?:y|ied)|hesitat(?:e|es|ing|ed)|unsure|awkward|embarrassed)\b/gi
  },
  // 6. Scared / Bad / Fear / Spider / Guilty words (Coral Crimson #fb7185)
  {
    cls: 'w-bad',
    regex: /\b(scared|afraid|fear|horror|terrified|spiders?|bugs?|insects?|creepy|guilt(?:y)?|wrong|bad|caught|danger|risk|rude|nasty|angry|anger|mad|annoyed|upset|pain|cramps?|freez(?:e|es)|panic(?:s)?|scream(?:s)?)\b/gi
  },
  // 7. Important Names & Household Places (Soft Indigo #818cf8)
  {
    cls: 'w-important',
    regex: /\b(Adeel|Rida|Aisha|Meher|Zara|Hina|Mom|Dad|parents|upstairs|downstairs|bathroom|hallway|doorways?|kitchen|top floor)\b/g
  }
];

function applySemanticWordColoring(htmlStr) {
  const parts = htmlStr.split(/(<[^>]+>)/g);
  return parts.map(part => {
    if (part.startsWith('<')) return part;
    const tokens = [];
    let working = part;
    for (const rule of SEMANTIC_WORD_RULES) {
      working = working.replace(rule.regex, match => {
        const id = `\u0000${tokens.length}\u0000`;
        tokens.push(`<span class="${rule.cls}">${match}</span>`);
        return id;
      });
    }
    return working.replace(/\u0000(\d+)\u0000/g, (_, idx) => tokens[Number(idx)]);
  }).join('');
}

function bindChatEvents() {
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendRoleplayMessage(text);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  document.querySelectorAll('.scenario-pill[data-quick]').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.quick;
      if (prompt) sendRoleplayMessage(prompt);
    });
  });

  document.querySelectorAll('.cash-chip[data-give]').forEach(btn => {
    btn.addEventListener('click', () => {
      sendRoleplayMessage(`<${btn.dataset.give}>`);
    });
  });

  document.getElementById('btnOpenGiveMoney')?.addEventListener('click', () => {
    document.getElementById('modalRidaCurrentBal').textContent = `$${AppState.state.rida.balance}`;
    openModal('modalGiveMoney');
  });

  document.getElementById('btnToggleHud')?.addEventListener('click', () => {
    const hud = document.getElementById('chatHudCol');
    hud.classList.toggle('hidden');
    hud.classList.toggle('force-show');
  });

  document.getElementById('chkSemanticColoring')?.addEventListener('change', e => {
    document.body.classList.toggle('no-word-colors', !e.target.checked);
  });

  document.getElementById('btnResetChat')?.addEventListener('click', async () => {
    if (!confirm('Reset scene to opening doorway moment? (Your current chat is automatically backed up and can be restored from Backup -> Restore Chat).')) {
      return;
    }
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset_chat' })
    });
    const data = await res.json();
    AppState.state = data.state;
    await RidaDB.saveSnapshot(data.state, AppState.memories);
    renderAll();
    showToast('Scene reset (Previous chat saved in Backup Center)');
  });

  const attachResetAll = el => el?.addEventListener('click', performFullResetAll);
  attachResetAll(document.getElementById('btnResetAll'));
  attachResetAll(document.getElementById('btnModalResetAll'));
  attachResetAll(document.getElementById('btnInspResetAll'));

  document.getElementById('chkMobileMode')?.addEventListener('change', async e => {
    await updateModes({ mobileMode: e.target.checked });
  });

  document.getElementById('selectSceneLocation')?.addEventListener('change', async e => {
    const loc = e.target.value;
    const label = LOCATION_LABELS[loc] || loc;
    const risk = loc === 'kitchen' ? 'High (Parents Nearby Downstairs)' : loc === 'shared_bathroom' ? 'Medium (Shared Upstairs Bathroom)' : 'Low (Top Floor Private)';
    await updateRidaState({ location: loc, locationLabel: label, privacyRisk: risk });
    if (loc === 'outside_market') {
      toggleInChatShopDrawer(true);
    }
    showToast(`Scene location updated: ${label}`);
  });
}

async function performFullResetAll() {
  const confirmMsg =
    "⚠️ FULL RESET: ALL CHATS, EMOTIONS & MEMORIES\n\n" +
    "Are you sure you want to perform a complete reset?\n\n" +
    "• All chat messages will be wiped clean\n" +
    "• All 16 emotion & feeling levels will reset to default baseline\n" +
    "• All memories will be deleted\n" +
    "• Time will reset to Day 1\n" +
    "• Your custom added store items will NOT be deleted\n" +
    "• Your infinite cash balance and AI settings will be kept\n\n" +
    "Click OK to proceed with Full Reset.";

  if (!confirm(confirmMsg)) return;

  try {
    showToast('Resetting all chats, emotion bars, and memories...');
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset_all' })
    });
    const data = await res.json();
    if (data.ok) {
      AppState.state = data.state;
      AppState.memories = [];
      await RidaDB.clear();
      await RidaDB.saveSnapshot(data.state, []);
      renderAll();
      showToast('Full Reset Complete: Everything reset. Added store items preserved!');
    } else {
      showToast('Reset failed: ' + (data.error || 'Server error'));
    }
  } catch (err) {
    showToast('Reset error: ' + err.message);
  }
}

async function sendRoleplayMessage(messageText) {
  const btn = document.getElementById('btnSendMessage');
  const txt = document.getElementById('sendBtnText');
  btn.disabled = true;
  txt.textContent = 'Reading Skills...';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageText,
        options: {
          forceMobile: document.getElementById('chkMobileMode')?.checked
        }
      })
    });
    const data = await res.json();
    AppState.state = data.state;

    if (data.openShopDrawer) {
      toggleInChatShopDrawer(true);
    }

    if (data.newMemories && data.newMemories.length > 0) {
      const memRes = await fetch('/api/memories');
      const memData = await memRes.json();
      AppState.memories = memData.memories;
      showToast(`Saved memory: "${data.newMemories[0].title}"`);
    }

    renderAll();
  } catch (err) {
    showToast('Error: ' + err.message);
  } finally {
    btn.disabled = false;
    txt.textContent = 'Send';
  }
}

function formatRoleplayBody(rawContent) {
  const bodyWithoutThought = (rawContent || '')
    .replace(/\*\*\[She thinks:[\s\S]*?(?:\]\*\*|$)/gi, '')
    .replace(/\[She thinks:[\s\S]*?(?:\]|$)/gi, '')
    .replace(/\*\*\(Thinking:[\s\S]*?(?:\)\*\*|$)/gi, '')
    .replace(/\(Thinking:[\s\S]*?(?:\)|$)/gi, '')
    .trim();

  const paragraphs = bodyWithoutThought.split(/\n\n+/);
  return paragraphs
    .map(p => {
      let safe = escapeHtml(p)
        .replace(/\*\*\[Vision Mode\]\*\*/g, '<span class="status-chip indigo">VISION MODE — UNOBSERVED</span>')
        .replace(/\[Vision Mode\]/gi, '<span class="status-chip indigo">VISION MODE — UNOBSERVED</span>')
        .replace(/\*\*\[by mobile\]\*\*/g, '<span class="status-chip indigo">[by mobile]</span>')
        .replace(/\[by mobile\]/gi, '<span class="status-chip indigo">[by mobile]</span>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="important-bold">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/&quot;([\s\S]*?)&quot;/g, '<span class="spoken-quote">&quot;$1&quot;</span>');
      safe = applySemanticWordColoring(safe);
      return `<p>${safe.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

const EMOTION_TONE_COLORS = {
  happy: { color: '#34d399', bg: 'rgba(16, 185, 129, 0.14)', border: 'rgba(52, 211, 153, 0.35)' },
  angry: { color: '#f87171', bg: 'rgba(239, 68, 68, 0.14)', border: 'rgba(248, 113, 113, 0.38)' },
  sad: { color: '#60a5fa', bg: 'rgba(59, 130, 246, 0.14)', border: 'rgba(96, 165, 250, 0.35)' },
  fear: { color: '#c084fc', bg: 'rgba(168, 85, 247, 0.14)', border: 'rgba(192, 132, 252, 0.35)' },
  pain: { color: '#fb923c', bg: 'rgba(249, 115, 22, 0.14)', border: 'rgba(251, 146, 60, 0.35)' },
  hungry: { color: '#fbbf24', bg: 'rgba(245, 158, 11, 0.14)', border: 'rgba(251, 191, 36, 0.35)' },
  sleepy: { color: '#818cf8', bg: 'rgba(99, 102, 241, 0.14)', border: 'rgba(129, 140, 248, 0.35)' },
  flustered: { color: '#f472b6', bg: 'rgba(236, 72, 153, 0.14)', border: 'rgba(244, 114, 182, 0.35)' },
  passionate: { color: '#fb7185', bg: 'rgba(244, 63, 94, 0.16)', border: 'rgba(251, 113, 133, 0.42)' },
  calm: { color: '#a1a1aa', bg: 'rgba(161, 161, 170, 0.1)', border: 'rgba(161, 161, 170, 0.25)' }
};

const STAT_DISPLAY_LABELS = {
  likeness: { label: 'Likeness', color: '#f472b6' },
  trustLevel: { label: 'Trust', color: '#38bdf8' },
  happiness: { label: 'Happiness', color: '#34d399' },
  blushLevel: { label: 'Blush', color: '#fb7185' },
  sadness: { label: 'Sadness', color: '#60a5fa' },
  anger: { label: 'Anger', color: '#f87171' },
  horror: { label: 'Horror', color: '#c084fc' },
  fear: { label: 'Fear', color: '#a78bfa' },
  hunger: { label: 'Hunger', color: '#fbbf24' },
  tiredness: { label: 'Tiredness', color: '#818cf8' },
  pain: { label: 'Pain', color: '#fb923c' },
  warmthLevel: { label: 'Warmness', color: '#f59e0b' },
  hotness: { label: 'Hotness', color: '#ef4444' },
  lust: { label: 'Lust', color: '#ec4899' },
  pleasure: { label: 'Pleasure', color: '#d946ef' },
  wetness: { label: 'Wetness', color: '#06b6d4' }
};

function renderChatMessages() {
  const container = document.getElementById('chatMessages');
  if (!container || !AppState.state) return;

  container.innerHTML = '';

  AppState.state.messages.forEach(msg => {
    const row = document.createElement('div');
    row.className = `msg-row ${msg.role} mode-${msg.mode || 'normal'}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = msg.role === 'assistant' ? 'R' : 'A';

    const col = document.createElement('div');
    col.className = 'msg-content-col';

    // 1. Skill Tool Reader Trace Bar (Assistant only)
    if (msg.role === 'assistant' && Array.isArray(msg.skillsTriggered) && msg.skillsTriggered.length > 0) {
      const totalFilesRead = msg.skillsTriggered.reduce((acc, s) => acc + (s.filesRead?.length || 0), 0);
      const skillNames = msg.skillsTriggered.map(s => s.skillId).slice(0, 3).join(', ');
      const traceBar = document.createElement('button');
      traceBar.className = 'skill-trace-bar';
      traceBar.innerHTML = `
        <span class="trace-dot"></span>
        <span>Read ${totalFilesRead} skill files (${escapeHtml(skillNames)}${msg.skillsTriggered.length > 3 ? '...' : ''})</span>
        <span style="color:var(--text-muted)">• ${escapeHtml(msg.modelUsed || 'gemini-2.5-flash')}</span>
      `;
      traceBar.addEventListener('click', () => openSkillTraceModal(msg.skillsTriggered));
      col.appendChild(traceBar);
    }

    // 1b. Active Emotion Voice Badge + Live Feeling Delta Chips (Assistant only)
    if (msg.role === 'assistant' && (msg.emotionPrimary || msg.mood || msg.statDeltas)) {
      const toneKey = msg.emotionToneKey || 'calm';
      const toneStyle = EMOTION_TONE_COLORS[toneKey] || EMOTION_TONE_COLORS.calm;
      const emotionLabel = msg.emotionPrimary || msg.mood || 'Calm & Affectionate';

      const deltasEntries = Object.entries(msg.statDeltas || {})
        .filter(([, v]) => Math.abs(Number(v)) >= 3)
        .sort((a, b) => Math.abs(Number(b[1])) - Math.abs(Number(a[1])))
        .slice(0, 6);

      const strip = document.createElement('div');
      strip.className = 'msg-emotion-strip';
      strip.innerHTML = `
        <span class="msg-emotion-voice-pill" style="color:${toneStyle.color};background:${toneStyle.bg};border-color:${toneStyle.border};">
          <span class="emo-voice-dot" style="background:${toneStyle.color};box-shadow:0 0 6px ${toneStyle.color};"></span>
          <span>Tone: ${escapeHtml(emotionLabel)}</span>
        </span>
        ${deltasEntries.map(([k, delta]) => {
          const meta = STAT_DISPLAY_LABELS[k] || { label: k, color: '#a1a1aa' };
          const sign = delta > 0 ? `+${delta}%` : `${delta}%`;
          return `<span class="msg-stat-delta-pill" style="color:${meta.color};border-color:${meta.color}44;background:${meta.color}14;">${escapeHtml(meta.label)} ${sign}</span>`;
        }).join('')}
      `;
      col.appendChild(strip);
    }

    // 2. Message Card
    const card = document.createElement('div');
    card.className = 'msg-card';
    card.innerHTML = formatRoleplayBody(msg.content);

    // 2a. In-Chat Movie Player Card (When Rida & Adeel watch a movie together)
    if (msg.movieEvent) {
      const mv = msg.movieEvent;
      const is18 = mv.rating === '18+';
      const accent = mv.accent || (is18 ? '#e879f9' : '#fb7185');
      const movieEl = document.createElement('div');
      movieEl.className = `movie-chat-card ${is18 ? 'movie-is-18' : ''}`;
      movieEl.style.borderColor = `${accent}55`;
      movieEl.innerHTML = `
        <div class="movie-chat-header" style="background:linear-gradient(90deg, ${accent}24 0%, rgba(12,12,18,0.92) 100%);border-bottom:1px solid ${accent}33;">
          <div class="movie-chat-header-left">
            <span class="movie-live-dot" style="background:${accent};box-shadow:0 0 8px ${accent};"></span>
            <span class="movie-chat-kicker">${mv.pickedBy === 'rida' ? 'RIDA PLAYED THIS MOVIE' : 'WATCHING TOGETHER ON MOBILE / LAPTOP'}</span>
          </div>
          <div class="movie-chat-badges">
            <span class="movie-genre-pill" style="color:${accent};border-color:${accent}55;background:${accent}18;">${escapeHtml(mv.categoryLabel || mv.category || 'Movie')}</span>
            <span class="movie-rating-pill ${is18 ? 'rating-18' : 'rating-simple'}">${escapeHtml(mv.rating || 'Simple')}</span>
            <span class="movie-duration-pill">${escapeHtml(mv.duration || '1h 55m')}</span>
          </div>
        </div>
        <div class="movie-chat-screen" style="background:radial-gradient(circle at 20% 20%, ${accent}28, rgba(5,5,9,0.96) 75%);">
          <div class="movie-screen-play-icon" style="border-color:${accent}66;color:${accent};">
            ${svgIcon('play', 'icon-sm')}
          </div>
          <div class="movie-screen-info">
            <div class="movie-screen-title">${escapeHtml(mv.title)}</div>
            <div class="movie-screen-sub">Playing side-by-side with Rida • Shared earphones / dark room</div>
          </div>
        </div>
        <div class="movie-chat-body">
          <div class="movie-plot-box">
            <strong>About This Movie:</strong> ${escapeHtml(mv.plot || '')}
          </div>
          ${mv.ridaReaction ? `
            <div class="movie-reaction-box" style="border-left:3px solid ${accent};">
              <strong>How Rida Acts & Reacts:</strong> ${escapeHtml(mv.ridaReaction)}
            </div>
          ` : ''}
          <div class="movie-chat-actions">
            <button type="button" class="btn-xs-outline" onclick="openPhonePopup('cinema')">
              ${svgIcon('film', 'icon-xs')}
              <span>Open Cinema App</span>
            </button>
            <button type="button" class="btn-xs-outline" onclick="watchMovieWithRida('${escapeHtml(mv.id)}', false)">
              ${svgIcon('play', 'icon-xs')}
              <span>Watch Next Scene</span>
            </button>
          </div>
        </div>
      `;
      card.appendChild(movieEl);
    }

    // 2b. Photo Snapshot Card (Also saved to Rida's Mobile Gallery)
    if (msg.photo) {
      const ph = msg.photo;
      const is18Photo = ph.rating === '18+';
      const photoEl = document.createElement('div');
      photoEl.className = `photo-snapshot-card ${is18Photo ? 'photo-18-card' : ''}`;
      photoEl.innerHTML = `
        <div class="photo-frame">
          <div class="photo-frame-top">
            <span class="photo-meta-tag">RIDA MOBILE CAMERA • ${escapeHtml(ph.timestamp || 'Just Now')}</span>
            <span class="movie-rating-pill ${is18Photo ? 'rating-18' : 'rating-simple'}">${escapeHtml(ph.rating || 'Simple')}</span>
          </div>
          ${svgIcon('camera', 'icon')}
          <strong class="mt-8">${escapeHtml(ph.title)}</strong>
          ${ph.outfit || ph.mood ? `<div class="photo-sub-meta">Outfit: ${escapeHtml(ph.outfit || 'Oversized Hoodie')} • Mood: ${escapeHtml(ph.mood || 'Shy')}</div>` : ''}
        </div>
        <div class="photo-desc">${escapeHtml(ph.description)}</div>
        ${ph.caption ? `<div class="photo-caption-line">"${escapeHtml(ph.caption)}"</div>` : ''}
        <div class="photo-card-footer">
          <button type="button" class="btn-xs-outline" onclick="openPhonePopup('gallery')">
            ${svgIcon('image', 'icon-xs')}
            <span>View in Mobile Gallery</span>
          </button>
        </div>
      `;
      card.appendChild(photoEl);
    }
    col.appendChild(card);

    // 3. Internal Mind Thought [She thinks: ...]
    if (msg.role === 'assistant' && msg.thought) {
      const thoughtCard = document.createElement('div');
      thoughtCard.className = 'thought-card';
      thoughtCard.innerHTML = `
        <span class="thought-card-icon">${svgIcon('sparkles', 'icon-xs')}</span>
        <div><strong>[She thinks:</strong> ${applySemanticWordColoring(escapeHtml(msg.thought))}<strong>]</strong></div>
      `;
      col.appendChild(thoughtCard);
    }

    // 4. Memory Saved Tag
    if (msg.role === 'assistant' && Array.isArray(msg.memoriesCreated) && msg.memoriesCreated.length > 0) {
      msg.memoriesCreated.forEach(mc => {
        const memTag = document.createElement('div');
        memTag.className = 'memory-saved-tag';
        memTag.innerHTML = `${svgIcon('pin', 'icon-xs')} <span>Memory Saved: "${escapeHtml(mc.title)}"</span>`;
        memTag.addEventListener('click', () => switchView('memories'));
        col.appendChild(memTag);
      });
    }

    // 5. Message Action Strip (Regenerate & Rewind)
    if (msg.role === 'assistant') {
      const actionStrip = document.createElement('div');
      actionStrip.className = 'msg-action-strip';
      actionStrip.innerHTML = `
        <button type="button" class="btn-msg-action btn-msg-regenerate" id="btn-regen-${escapeHtml(msg.id)}" onclick="regenerateFromMessage('${escapeHtml(msg.id)}')" title="Regenerate Rida's reply and rewind chat to this point">
          ${svgIcon('rotate-ccw', 'icon-xs')}
          <span>Regenerate</span>
        </button>
        <span class="msg-action-meta">${escapeHtml(msg.worldTimeLabel || '')}</span>
      `;
      col.appendChild(actionStrip);
    } else if (msg.role === 'user') {
      const userActionStrip = document.createElement('div');
      userActionStrip.className = 'msg-action-strip user-action-strip';
      userActionStrip.innerHTML = `
        <span class="msg-action-meta">${escapeHtml(msg.worldTimeLabel || '')}</span>
        <button type="button" class="btn-msg-action btn-msg-rewind-user" id="btn-rewind-${escapeHtml(msg.id)}" onclick="regenerateFromMessage('${escapeHtml(msg.id)}')" title="Rewind chat to this turn & generate fresh reply">
          ${svgIcon('corner-down-left', 'icon-xs')}
          <span>Rewind & Retry</span>
        </button>
      `;
      col.appendChild(userActionStrip);
    }

    if (msg.role === 'user') {
      row.appendChild(col);
      row.appendChild(avatar);
    } else {
      row.appendChild(avatar);
      row.appendChild(col);
    }
    container.appendChild(row);
  });

  container.scrollTop = container.scrollHeight;
}

window.quickNudgeBar = async function(barKey, delta) {
  if (!AppState.state?.rida) return;
  const cur = Number(AppState.state.rida[barKey] ?? 0);
  const next = Math.max(0, Math.min(100, Math.round(cur + delta)));
  await updateRidaState({ [barKey]: next });
};

window.clickSetBar = async function(evt, barKey) {
  const track = evt.currentTarget;
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(100, Math.round(((evt.clientX - rect.left) / rect.width) * 100)));
  await updateRidaState({ [barKey]: pct });
  showToast(`Updated ${barKey.replace('Level', '')} to ${pct}%`);
};

function getBarIntensityLabel(val) {
  if (val >= 80) return 'MAX';
  if (val >= 55) return 'HIGH';
  if (val >= 28) return 'WARM';
  if (val >= 10) return 'LOW';
  return 'MIN';
}

function renderChatHud() {
  if (!AppState.state) return;
  const { rida, adeel, transactions, messages, adeelInventory, ridaInventory } = AppState.state;

  // Render all 16 Feeling, Body & Intimate Bars grouped by category with glowing gradient meters
  const barsContainer = document.getElementById('hudAll16BarsContainer');
  if (barsContainer) {
    barsContainer.innerHTML = ALL_16_BARS_GROUPS.map(group => `
      <div class="emo-group-block" style="--group-accent:${group.groupColor};">
        <div class="emo-group-header">
          <div class="emo-group-title-left">
            <span class="emo-group-dot" style="background:${group.groupColor};box-shadow:0 0 8px ${group.groupColor};"></span>
            <span class="emo-group-title">${escapeHtml(group.groupTitle)}</span>
          </div>
          <span class="emo-group-badge" style="color:${group.groupColor};border-color:${group.groupColor}44;background:${group.groupColor}14;">
            ${escapeHtml(group.groupBadge || 'LIVE')}
          </span>
        </div>
        <div class="emo-bars-grid">
          ${group.bars.map(b => {
            const val = Math.max(0, Math.min(100, Math.round(Number(rida[b.key] ?? 0))));
            const stateTag = getBarIntensityLabel(val);
            const isHigh = val >= 55;
            return `
              <div class="emo-bar-item ${isHigh ? 'is-high' : ''}">
                <div class="emo-bar-label">
                  <div class="emo-bar-name-wrap">
                    <span class="emo-bar-mini-dot" style="background:${b.color};box-shadow:0 0 6px ${b.color};"></span>
                    <span class="emo-bar-name">${escapeHtml(b.label)}</span>
                  </div>
                  <div class="emo-bar-right-meta">
                    <button type="button" class="emo-nudge-btn" title="Decrease ${escapeHtml(b.label)} (-5%)" onclick="quickNudgeBar('${b.key}', -5)">−</button>
                    <span class="emo-state-chip" style="color:${b.color};border-color:${b.color}40;background:${b.color}15;">${stateTag}</span>
                    <strong class="emo-bar-pct" style="color:${b.color};text-shadow:0 0 10px ${b.glow};">${val}%</strong>
                    <button type="button" class="emo-nudge-btn" title="Increase ${escapeHtml(b.label)} (+5%)" onclick="quickNudgeBar('${b.key}', 5)">+</button>
                  </div>
                </div>
                <div class="emo-bar-track" title="Click anywhere on bar to set ${escapeHtml(b.label)} (${val}%)" onclick="clickSetBar(event, '${b.key}')">
                  <div class="emo-bar-ticks">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="emo-bar-fill" style="width:${val}%;background:${b.gradient};box-shadow:0 0 12px ${b.glow};">
                    ${val > 4 ? `<span class="emo-bar-tip" style="background:#ffffff;box-shadow:0 0 8px 2px ${b.color};"></span>` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');
  }

  const moodEl = document.getElementById('hudMoodText');
  if (moodEl) moodEl.textContent = rida.mood;
  const primaryEmoEl = document.getElementById('hudPrimaryEmotionBadge');
  if (primaryEmoEl) {
    primaryEmoEl.textContent = rida.emotionPrimary || rida.mood || 'Calm';
    const ts = EMOTION_TONE_COLORS[rida.emotionToneKey || 'calm'] || EMOTION_TONE_COLORS.calm;
    primaryEmoEl.style.color = ts.color;
    primaryEmoEl.style.borderColor = ts.border;
    primaryEmoEl.style.background = ts.bg;
  }
  const voiceTagEl = document.getElementById('hudVoiceToneTag');
  if (voiceTagEl) {
    voiceTagEl.textContent = rida.emotionPrimary || 'Emotion-Synced';
  }
  document.querySelectorAll('.emotion-preset-chip[data-tone]').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.tone === (rida.emotionToneKey || 'calm'));
  });
  const wearEl = document.getElementById('hudWearingText');
  if (wearEl) wearEl.textContent = rida.wearing;
  const thoughtEl = document.getElementById('hudLastThought');
  if (thoughtEl) thoughtEl.textContent = `[She thinks: ${rida.lastThought}]`;
  const walletEl = document.getElementById('hudWalletBadge');
  if (walletEl) walletEl.textContent = `$${Number(rida.balance).toFixed(0)}`;

  // Inspector Dual Inventories Tab
  const hudAdeelBal = document.getElementById('hudAdeelWalletBadge');
  if (hudAdeelBal) hudAdeelBal.textContent = `$${Number(adeel?.balance ?? 650).toFixed(0)}`;
  const hudRidaBal = document.getElementById('hudRidaWalletBadge');
  if (hudRidaBal) hudRidaBal.textContent = `$${Number(rida?.balance ?? 85).toFixed(0)}`;

  const hudAdeelInv = document.getElementById('hudAdeelInventoryList');
  if (hudAdeelInv) {
    const aItems = adeelInventory || [];
    if (aItems.length === 0) {
      hudAdeelInv.innerHTML = `<div class="inv-empty-state">Your private bag is empty. Buy items from the Store Drawer.</div>`;
    } else {
      hudAdeelInv.innerHTML = aItems.map(entry => {
        const safeId = escapeHtml(entry.id.replace(/'/g, "\\'"));
        return `
          <div class="inv-item-card">
            <div class="inv-item-top">
              <div>
                <div class="inv-item-title">${escapeHtml(entry.name)}</div>
                <div class="inv-item-meta">${escapeHtml(entry.purpose || '')}</div>
              </div>
              <div style="display:flex;gap:4px;">
                <span class="shop-tag-pill ${entry.rating === '18+' ? 'adult' : 'simple'}">${escapeHtml(entry.rating || 'Simple')}</span>
                <span class="inv-qty-badge">x${entry.qty || 1}</span>
              </div>
            </div>
            <div class="inv-item-actions">
              <button class="shop-act-btn gift" onclick="executeShopAction('give_to_rida', '${safeId}')">Give to Rida</button>
              <button class="shop-act-btn primary" onclick="executeShopAction('use_item', '${safeId}', { owner: 'adeel' })">Use Now</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const hudRidaInv = document.getElementById('hudRidaInventoryList');
  if (hudRidaInv) {
    const rItems = ridaInventory || [];
    if (rItems.length === 0) {
      hudRidaInv.innerHTML = `<div class="inv-empty-state">Rida has no items yet.</div>`;
    } else {
      hudRidaInv.innerHTML = rItems.map(entry => {
        const safeId = escapeHtml(entry.id.replace(/'/g, "\\'"));
        return `
          <div class="inv-item-card">
            <div class="inv-item-top">
              <div>
                <div class="inv-item-title">${escapeHtml(entry.name)}</div>
                <div class="inv-item-meta">${escapeHtml(entry.source || 'Owned')}</div>
              </div>
              <div style="display:flex;gap:4px;">
                ${entry.secret ? '<span class="inv-secret-badge">SECRET</span>' : ''}
                <span class="inv-qty-badge">x${entry.qty || 1}</span>
              </div>
            </div>
            <div class="inv-item-actions">
              <button class="shop-act-btn primary" onclick="executeShopAction('use_item', '${safeId}', { owner: 'rida' })">Have Rida Use</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const txContainer = document.getElementById('hudRecentTx');
  if (txContainer) {
    txContainer.innerHTML = (transactions || []).slice(0, 4).map(tx => `
      <div class="flex-between">
        <span>${escapeHtml(tx.note)}</span>
        <strong class="${tx.amount >= 0 ? 'emerald-text' : ''}">${tx.amount >= 0 ? '+' : ''}$${tx.amount}</strong>
      </div>
    `).join('');
  }

  const lastAssistant = [...(messages || [])].reverse().find(m => m.role === 'assistant');
  const traceContainer = document.getElementById('hudSkillTraceList');
  if (traceContainer && lastAssistant && Array.isArray(lastAssistant.skillsTriggered)) {
    traceContainer.innerHTML = lastAssistant.skillsTriggered.map(st => `
      <div class="trace-card">
        <strong>${escapeHtml(st.categoryName || st.skillId)}</strong>
        <span>${escapeHtml(st.reason)}</span>
        <div class="trace-files-row">
          ${(st.filesRead || []).map(fn => `
            <button class="file-Jump-chip" onclick="openFileInSkillsStudio('${escapeHtml(fn.replace(/'/g, "\\'"))}')">
              ${escapeHtml(fn)}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  const hudMemContainer = document.getElementById('hudMemoriesList');
  if (hudMemContainer) {
    hudMemContainer.innerHTML = (AppState.memories || []).slice(0, 6).map(m => `
      <div class="trace-card" style="cursor:pointer" onclick="switchView('memories')">
        <strong>${escapeHtml(m.title)}</strong>
        <span>${escapeHtml(m.content.slice(0, 90))}...</span>
      </div>
    `).join('');
  }
}

function openSkillTraceModal(skillsTriggered) {
  const body = document.getElementById('modalSkillTraceBody');
  body.innerHTML = `
    <p class="text-secondary mb-12">
      To generate this response, the AI Skill Reader loaded and followed these exact files from <code>skills/</code>:
    </p>
    <div class="stack-list">
      ${skillsTriggered.map(st => `
        <div class="trace-card">
          <div class="flex-between">
            <strong>${escapeHtml(st.categoryName || st.skillId)}</strong>
            <span class="mono-tag">${(st.filesRead || []).length} files</span>
          </div>
          <span>${escapeHtml(st.reason)}</span>
          <div class="trace-files-row">
            ${(st.filesRead || []).map(fn => `
              <button class="file-Jump-chip" onclick="openFileInSkillsStudio('${escapeHtml(fn.replace(/'/g, "\\'"))}')">
                ${svgIcon('file-text', 'icon-xs')} ${escapeHtml(fn)}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  openModal('modalSkillTrace');
}

window.openFileInSkillsStudio = function(filename) {
  closeModal('modalSkillTrace');
  switchView('skills');
  const found = AppState.skills.files.find(f => f.name.toLowerCase() === filename.toLowerCase());
  if (found) selectSkillFile(found.name);
};

// ============================================================================
// VIEW 2: MEMORY VAULT
// ============================================================================
function bindMemoryEvents() {
  document.querySelectorAll('#memoryCategoryTabs .pill-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#memoryCategoryTabs .pill-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeMemoryFilter = btn.dataset.cat;
      renderMemoriesPage();
    });
  });

  document.getElementById('memorySearchInput')?.addEventListener('input', renderMemoriesPage);

  document.getElementById('btnNewMemory')?.addEventListener('click', () => {
    document.getElementById('memFormId').value = '';
    document.getElementById('memFormTitle').value = '';
    document.getElementById('memFormContent').value = '';
    document.getElementById('memFormThought').value = '';
    document.getElementById('memFormCategory').value = 'shared_moment';
    document.getElementById('memFormImportance').value = '4';
    document.getElementById('memFormPinned').checked = false;
    document.getElementById('modalMemoryTitle').textContent = 'Save Memory to Rida\'s Brain';
    openModal('modalMemory');
  });

  document.getElementById('formMemory')?.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      id: document.getElementById('memFormId').value || undefined,
      title: document.getElementById('memFormTitle').value.trim(),
      category: document.getElementById('memFormCategory').value,
      importance: Number(document.getElementById('memFormImportance').value),
      content: document.getElementById('memFormContent').value.trim(),
      ridaThought: document.getElementById('memFormThought').value.trim(),
      pinned: document.getElementById('memFormPinned').checked
    };
    const res = await fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    AppState.memories = data.memories;
    closeModal('modalMemory');
    renderAll();
    showToast('Memory saved');
  });
}

function renderMemoriesPage() {
  const memories = AppState.memories || [];
  document.getElementById('memStatTotal').textContent = memories.length;
  document.getElementById('memStatPinned').textContent = memories.filter(m => m.pinned).length;
  document.getElementById('memStatBalance').textContent = `$${AppState.state?.rida?.balance ?? 85}`;
  document.getElementById('memStatEmotional').textContent = memories.filter(m => m.category === 'emotional' || m.category === 'secret_unlocked').length;

  const query = (document.getElementById('memorySearchInput')?.value || '').toLowerCase();
  const cat = AppState.activeMemoryFilter;

  const filtered = memories.filter(m => {
    if (cat === 'pinned' && !m.pinned) return false;
    if (cat !== 'all' && cat !== 'pinned' && m.category !== cat) return false;
    if (query) {
      const hay = `${m.title} ${m.content} ${m.ridaThought} ${m.location}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  const grid = document.getElementById('memoriesGrid');
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="panel-card"><p class="text-secondary">No matching memories found.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(m => {
    const dateStr = new Date(m.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return `
      <article class="memory-card ${m.pinned ? 'pinned' : ''}">
        <div class="memory-card-top">
          <span class="mono-tag">${m.pinned ? 'PINNED • ' : ''}${escapeHtml(m.category.replace('_', ' ').toUpperCase())}</span>
          <span class="mono-tag">P${m.importance || 4}</span>
        </div>
        <h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.content)}</p>
        ${m.ridaThought ? `<div class="memory-thought">[She thinks: ${escapeHtml(m.ridaThought)}]</div>` : ''}
        <div class="memory-footer">
          <span>${escapeHtml(m.location || 'Top Floor')} • ${dateStr}</span>
          <div style="display:flex;gap:6px;">
            <button class="btn-outline btn-xs" onclick="togglePinMemory('${m.id}')">${m.pinned ? 'Unpin' : 'Pin'}</button>
            <button class="btn-outline btn-xs" onclick="editMemory('${m.id}')">Edit</button>
            <button class="btn-outline btn-xs danger" onclick="deleteMemory('${m.id}')">Delete</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

window.togglePinMemory = async function(id) {
  const mem = AppState.memories.find(m => m.id === id);
  if (!mem) return;
  const res = await fetch('/api/memories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...mem, pinned: !mem.pinned })
  });
  const data = await res.json();
  AppState.memories = data.memories;
  renderAll();
};

window.editMemory = function(id) {
  const mem = AppState.memories.find(m => m.id === id);
  if (!mem) return;
  document.getElementById('memFormId').value = mem.id;
  document.getElementById('memFormTitle').value = mem.title;
  document.getElementById('memFormCategory').value = mem.category;
  document.getElementById('memFormImportance').value = String(mem.importance || 4);
  document.getElementById('memFormContent').value = mem.content;
  document.getElementById('memFormThought').value = mem.ridaThought || '';
  document.getElementById('memFormPinned').checked = Boolean(mem.pinned);
  document.getElementById('modalMemoryTitle').textContent = 'Edit Memory';
  openModal('modalMemory');
};

window.deleteMemory = async function(id) {
  const res = await fetch('/api/memories', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  const data = await res.json();
  AppState.memories = data.memories;
  renderAll();
  showToast('Memory deleted');
};

// ============================================================================
// VIEW 3: SKILLS STUDIO (65 FILES IN 10 CATEGORIZED FOLDERS)
// ============================================================================
function bindSkillsStudioEvents() {
  document.getElementById('skillFileSearch')?.addEventListener('input', renderSkillsFolderTree);

  document.getElementById('skillCodeTextarea')?.addEventListener('input', e => {
    renderMarkdownPreview(e.target.value, AppState.activeSkillFile?.ext || 'md');
  });

  document.querySelectorAll('.view-mode-switch .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-mode-switch .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      const editorWs = document.getElementById('editorWorkspace');
      const testerWs = document.getElementById('skillTesterWorkspace');

      if (mode === 'tester') {
        editorWs.classList.add('hidden');
        testerWs.classList.remove('hidden');
        renderAllEvalsAndTriggers();
        runLiveTriggerTest();
      } else {
        editorWs.classList.remove('hidden', 'mode-preview', 'mode-edit');
        testerWs.classList.add('hidden');
        if (mode === 'preview') editorWs.classList.add('mode-preview');
        if (mode === 'edit') editorWs.classList.add('mode-edit');
      }
    });
  });

  document.getElementById('btnSaveSkillFile')?.addEventListener('click', async () => {
    if (!AppState.activeSkillFile) return;
    const content = document.getElementById('skillCodeTextarea').value;
    const categoryId = document.getElementById('activeFileCategorySelect').value;
    const res = await fetch('/api/skills/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: AppState.activeSkillFile.name,
        content,
        categoryId
      })
    });
    const data = await res.json();
    AppState.skills = data.skills;
    selectSkillFile(AppState.activeSkillFile.name);
    renderSkillsFolderTree();
    showToast(`Saved "${AppState.activeSkillFile.name}"`);
  });

  document.getElementById('btnDeleteSkillFile')?.addEventListener('click', async () => {
    if (!AppState.activeSkillFile) return;
    const delName = AppState.activeSkillFile.name;
    const res = await fetch('/api/skills/file', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: delName })
    });
    const data = await res.json();
    AppState.skills = data.skills;
    AppState.activeSkillFile = AppState.skills.files[0] || null;
    renderAll();
    showToast(`Deleted "${delName}"`);
  });

  document.getElementById('btnNewSkillFile')?.addEventListener('click', () => {
    populateCategorySelect('newSkillCategory');
    applySkillFileTemplate('skill_md');
    openModal('modalNewSkill');
  });

  document.getElementById('newSkillTemplate')?.addEventListener('change', e => {
    applySkillFileTemplate(e.target.value);
  });

  document.getElementById('formNewSkill')?.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('newSkillFilename').value.trim();
    const categoryId = document.getElementById('newSkillCategory').value;
    const content = document.getElementById('newSkillContent').value;
    const res = await fetch('/api/skills/file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, categoryId, content })
    });
    const data = await res.json();
    AppState.skills = data.skills;
    closeModal('modalNewSkill');
    renderAll();
    selectSkillFile(name);
    showToast(`Created file: ${name}`);
  });

  document.getElementById('btnNewCategory')?.addEventListener('click', async () => {
    const folderName = prompt('Enter new Skill Folder name (e.g. "11. Custom Scenarios"):');
    if (!folderName) return;
    const res = await fetch('/api/skills/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: folderName, icon: 'folder' })
    });
    const data = await res.json();
    AppState.skills = data.skills;
    renderSkillsStudio();
    showToast(`Created folder: ${folderName}`);
  });

  document.getElementById('btnRunTriggerTest')?.addEventListener('click', runLiveTriggerTest);
}

function applySkillFileTemplate(tplType) {
  const fnInput = document.getElementById('newSkillFilename');
  const contentInput = document.getElementById('newSkillContent');

  if (tplType === 'skill_md') {
    fnInput.value = 'custom-scene SKILL.md';
    contentInput.value = `---
name: rida-custom-scene
description: "Custom roleplay skill for Rida and Adeel."
type: workflow
lifecycle: active
---

# Custom Rida Skill

Describe when this skill triggers and how Rida should behave, speak, blush, and think.

## Core Rules
- Stay consistent with Rida (18F) and the two-storey house layout.
- Always end responses with **[She thinks: ...]**`;
  } else if (tplType === 'ref_md') {
    fnInput.value = 'rida-custom-reference.md';
    contentInput.value = `---
description: "Detailed reference guide for Rida roleplay."
---

# Reference Details

- Specific habits, dialogue examples, or room items.`;
  } else if (tplType === 'triggers_json') {
    fnInput.value = 'custom triggers.json';
    contentInput.value = JSON.stringify({
      skill: 'rida-custom-scene',
      test_cases: [
        { input: 'Example trigger phrase', should_trigger: true },
        { input: 'Unrelated question', should_trigger: false }
      ]
    }, null, 2);
  } else if (tplType === 'evals_json') {
    fnInput.value = 'custom evals.json';
    contentInput.value = JSON.stringify({
      skill: 'rida-custom-scene',
      test_cases: [
        {
          name: 'custom_test_1',
          input: 'Example roleplay prompt',
          assertions: ['Stays in character as Rida', 'Includes private thought in brackets']
        }
      ]
    }, null, 2);
  }
}

function populateCategorySelect(selectId, selectedId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = AppState.skills.categories.map(c =>
    `<option value="${c.id}" ${c.id === selectedId ? 'selected' : ''}>${escapeHtml(c.name)}</option>`
  ).join('');
}

function renderSkillsStudio() {
  const { categories, files } = AppState.skills;
  document.getElementById('skillsTotalSummary').textContent = `${categories.length} Folders • ${files.length} Files`;

  renderSkillsFolderTree();

  if (!AppState.activeSkillFile && files.length > 0) {
    const defaultFile = files.find(f => f.name === 'brain SKILL.md') || files[0];
    selectSkillFile(defaultFile.name);
  } else if (AppState.activeSkillFile) {
    selectSkillFile(AppState.activeSkillFile.name);
  }
}

function renderSkillsFolderTree() {
  const tree = document.getElementById('skillsFolderTree');
  if (!tree) return;
  const query = (document.getElementById('skillFileSearch')?.value || '').toLowerCase();
  const { categories, files } = AppState.skills;

  tree.innerHTML = categories.map(cat => {
    const catFiles = files.filter(f => {
      if (f.categoryId !== cat.id) return false;
      if (query && !f.name.toLowerCase().includes(query) && !(f.description || '').toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });

    if (query && catFiles.length === 0) return '';

    return `
      <div class="folder-group" id="folder-${cat.id}">
        <div class="folder-header" onclick="toggleFolderCollapse('${cat.id}')">
          ${svgIcon(cat.icon || 'folder', 'icon-xs')}
          <span class="folder-title">${escapeHtml(cat.name)}</span>
          <span class="folder-count">${catFiles.length}</span>
        </div>
        <div class="folder-files">
          ${catFiles.map(f => {
            const isActive = AppState.activeSkillFile?.name === f.name;
            const badgeClass = f.role === 'skill-core' ? 'core' : f.ext;
            const badgeLabel = f.role === 'skill-core' ? 'SKILL' : f.ext.toUpperCase();
            return `
              <div class="file-item ${isActive ? 'active' : ''}" onclick="selectSkillFile('${escapeHtml(f.name.replace(/'/g, "\\'"))}')">
                <span class="file-badge ${badgeClass}">${badgeLabel}</span>
                <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(f.name)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

window.toggleFolderCollapse = function(catId) {
  document.getElementById(`folder-${catId}`)?.classList.toggle('collapsed');
};

window.selectSkillFile = function(filename) {
  const file = AppState.skills.files.find(f => f.name === filename);
  if (!file) return;
  AppState.activeSkillFile = file;

  document.getElementById('activeFileExt').textContent = file.ext.toUpperCase();
  document.getElementById('activeFileName').textContent = file.name;
  document.getElementById('activeFileDesc').textContent = file.description || 'Skill file';
  document.getElementById('activeFileSize').textContent = `${(file.size / 1024).toFixed(1)} KB`;

  const textarea = document.getElementById('skillCodeTextarea');
  textarea.value = file.content;

  populateCategorySelect('activeFileCategorySelect', file.categoryId);
  renderMarkdownPreview(file.content, file.ext);
  renderSkillsFolderTree();
};

function renderMarkdownPreview(content, ext) {
  const preview = document.getElementById('skillMarkdownPreview');
  if (!preview) return;

  if (ext === 'json') {
    try {
      const parsed = JSON.parse(content);
      preview.innerHTML = `
        <h2>JSON Skill Configuration (${escapeHtml(parsed.skill || 'config')})</h2>
        <pre style="background:#050507;padding:16px;border:1px solid var(--border-mid);border-radius:8px;overflow-x:auto;font-family:var(--font-mono);font-size:12px;color:#34d399;">${escapeHtml(JSON.stringify(parsed, null, 2))}</pre>
      `;
      return;
    } catch (e) {}
  }

  let html = escapeHtml(content);
  html = html.replace(/^---\r?\n([\s\S]*?)\r?\n---/, (m, fm) => {
    return `<div style="background:#09090b;border:1px solid var(--border-mid);padding:10px 14px;border-radius:8px;font-family:var(--font-mono);font-size:11.5px;color:var(--text-secondary);margin-bottom:14px;">${fm.replace(/\n/g, '<br>')}</div>`;
  });

  html = html
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>');

  preview.innerHTML = html.replace(/\n\n/g, '<br><br>');
}

async function runLiveTriggerTest() {
  const input = document.getElementById('testerInput')?.value || '';
  const res = await fetch('/api/skills/test-trigger', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input })
  });
  const data = await res.json();
  const container = document.getElementById('testerResults');
  if (!container) return;

  container.innerHTML = (data.skillsTriggered || []).map(st => `
    <div class="trace-card">
      <strong>${escapeHtml(st.categoryName)}</strong>
      <span>${escapeHtml(st.reason)}</span>
      <div class="trace-files-row">
        ${(st.filesRead || []).map(fn => `
          <button class="file-Jump-chip" onclick="selectSkillFile('${escapeHtml(fn.replace(/'/g, "\\'"))}')">
            ${escapeHtml(fn)}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderAllEvalsAndTriggers() {
  const grid = document.getElementById('allEvalsGrid');
  if (!grid) return;

  const jsonFiles = AppState.skills.files.filter(f => f.ext === 'json' && f.parsedJson);
  grid.innerHTML = jsonFiles.map(jf => {
    const cases = jf.parsedJson.test_cases || [];
    return `
      <div class="trace-card">
        <div class="flex-between">
          <strong>${escapeHtml(jf.name)}</strong>
          <span class="mono-tag">${escapeHtml(jf.parsedJson.skill || '')}</span>
        </div>
        <div class="stack-list mt-8">
          ${cases.map(tc => `
            <div style="padding:8px;background:#09090b;border:1px solid var(--border-subtle);border-radius:6px;font-size:11.5px;">
              <div><strong>Input:</strong> <code>${escapeHtml(tc.input)}</code></div>
              ${typeof tc.should_trigger === 'boolean'
                ? `<div class="${tc.should_trigger ? 'emerald-text' : 'text-secondary'}">Trigger: ${tc.should_trigger}</div>`
                : `<div class="text-secondary">Assertions: ${(tc.assertions || []).join(' • ')}</div>`
              }
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// VIEW 4: WORLD, CHARACTER, HOUSE & MONEY HUB
// ============================================================================
function bindWorldHubEvents() {
  document.querySelectorAll('#worldSubTabs .pill-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#worldSubTabs .pill-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.wtab;
      document.querySelectorAll('.world-subview').forEach(sv => {
        sv.classList.toggle('active', sv.id === `wtab-${tab}`);
      });
    });
  });

  document.getElementById('btnUnlockAllSecrets')?.addEventListener('click', async () => {
    for (let i = 1; i <= 10; i++) {
      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'unlock_secret', secretId: i })
      });
    }
    const res = await fetch('/api/bootstrap');
    const data = await res.json();
    AppState.state = data.state;
    renderWorldHub();
    showToast('All 10 Mark-3 Secrets Unlocked');
  });

  document.querySelectorAll('.room-box').forEach(box => {
    box.addEventListener('click', async () => {
      const loc = box.dataset.loc;
      const label = LOCATION_LABELS[loc] || loc;
      await updateRidaState({ location: loc, locationLabel: label });
      renderAll();
      showToast(`Moved scene to: ${label}`);
    });
  });
}

function renderWorldHub() {
  if (!AppState.state) return;
  const unlocked = AppState.state.unlockedSecrets || [];
  const { adeel, rida, adeelInventory, ridaInventory } = AppState.state;

  // Dual Inventories Tab in World Hub
  const wAdeelBal = document.getElementById('worldAdeelBal');
  if (wAdeelBal) wAdeelBal.textContent = `$${Number(adeel?.balance ?? 650).toFixed(0)}`;
  const wRidaBal = document.getElementById('worldRidaBal');
  if (wRidaBal) wRidaBal.textContent = `$${Number(rida?.balance ?? 85).toFixed(0)}`;

  const worldAdeelInvList = document.getElementById('worldAdeelInvList');
  if (worldAdeelInvList) {
    const aItems = adeelInventory || [];
    if (aItems.length === 0) {
      worldAdeelInvList.innerHTML = `<div class="inv-empty-state">Adeel's private inventory is currently empty.</div>`;
    } else {
      worldAdeelInvList.innerHTML = aItems.map(entry => {
        const safeId = escapeHtml(entry.id.replace(/'/g, "\\'"));
        return `
          <div class="inv-item-card">
            <div class="inv-item-top">
              <div>
                <div class="inv-item-title">${escapeHtml(entry.name)}</div>
                <div class="inv-item-meta">${escapeHtml(entry.purpose || '')}</div>
              </div>
              <div style="display:flex;gap:5px;">
                <span class="shop-tag-pill ${entry.rating === '18+' ? 'adult' : 'simple'}">${escapeHtml(entry.rating || 'Simple')}</span>
                <span class="inv-qty-badge">x${entry.qty || 1}</span>
              </div>
            </div>
            <div class="inv-item-actions">
              <button class="shop-act-btn gift" onclick="executeShopAction('give_to_rida', '${safeId}')">Give to Rida</button>
              <button class="shop-act-btn primary" onclick="executeShopAction('use_item', '${safeId}', { owner: 'adeel' })">Use Item Now</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const worldRidaInvList = document.getElementById('worldRidaInvList');
  if (worldRidaInvList) {
    const rItems = ridaInventory || [];
    if (rItems.length === 0) {
      worldRidaInvList.innerHTML = `<div class="inv-empty-state">Rida has no items in her inventory yet.</div>`;
    } else {
      worldRidaInvList.innerHTML = rItems.map(entry => {
        const safeId = escapeHtml(entry.id.replace(/'/g, "\\'"));
        return `
          <div class="inv-item-card">
            <div class="inv-item-top">
              <div>
                <div class="inv-item-title">${escapeHtml(entry.name)}</div>
                <div class="inv-item-meta">${escapeHtml(entry.source || 'Owned')} • ${escapeHtml(entry.purpose || '')}</div>
              </div>
              <div style="display:flex;gap:5px;">
                ${entry.secret ? '<span class="inv-secret-badge">SECRET</span>' : ''}
                <span class="shop-tag-pill ${entry.rating === '18+' ? 'adult' : 'simple'}">${escapeHtml(entry.rating || 'Simple')}</span>
                <span class="inv-qty-badge">x${entry.qty || 1}</span>
              </div>
            </div>
            <div class="inv-item-actions">
              <button class="shop-act-btn primary" onclick="executeShopAction('use_item', '${safeId}', { owner: 'rida' })">Have Rida Use / Wear Now</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const secretsGrid = document.getElementById('secretsGrid');
  if (secretsGrid) {
    secretsGrid.innerHTML = MARK_3_SECRETS.map(sec => {
      const isUnlocked = unlocked.includes(sec.id);
      return `
        <div class="secret-card ${isUnlocked ? 'unlocked' : 'locked'}" onclick="toggleOrRoleplaySecret(${sec.id})">
          <div class="flex-between mb-12">
            <strong>Secret #${sec.id}: ${escapeHtml(sec.title)}</strong>
            <span class="mono-tag">${isUnlocked ? 'Unlocked' : 'Click to Reveal'}</span>
          </div>
          <p class="text-secondary">${escapeHtml(sec.text)}</p>
          <button class="btn-outline btn-xs mt-12" onclick="event.stopPropagation(); triggerRoleplayFromHub('${escapeHtml(sec.prompt.replace(/'/g, "\\'"))}')">
            Roleplay This Scene →
          </button>
        </div>
      `;
    }).join('');
  }

  const spotsList = document.getElementById('hidingSpotsList');
  if (spotsList) {
    spotsList.innerHTML = HIDING_SPOTS.map(s => `
      <div class="list-row">
        <div>
          <strong>${escapeHtml(s.spot)}</strong>
          <p class="text-secondary">${escapeHtml(s.item)}</p>
        </div>
        <button class="btn-outline btn-xs" onclick="triggerRoleplayFromHub('${escapeHtml(s.prompt.replace(/'/g, "\\'"))}')">
          Search in Roleplay
        </button>
      </div>
    `).join('');
  }

  const mAdeelBal = document.getElementById('moneyPageAdeelBal');
  if (mAdeelBal) mAdeelBal.textContent = `$${Number(adeel?.balance ?? 650).toFixed(0)}`;
  const mRidaBal = document.getElementById('moneyPageRidaBal');
  if (mRidaBal) mRidaBal.textContent = `$${Number(rida?.balance ?? 85).toFixed(0)}`;

  const shopList = document.getElementById('shopItemsList');
  if (shopList) {
    const storePreview = (AppState.store?.items || []).slice(0, 12);
    shopList.innerHTML = storePreview.map(item => {
      const safeId = escapeHtml(item.id.replace(/'/g, "\\'"));
      return `
        <div class="list-row">
          <div>
            <strong>${escapeHtml(item.name)} — <span class="emerald-text">$${item.price}</span> <span class="shop-tag-pill ${item.rating === '18+' ? 'adult' : 'simple'}">${escapeHtml(item.rating)}</span></strong>
            <p class="text-secondary">${escapeHtml(item.purpose)}</p>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button class="btn-outline btn-xs" onclick="executeShopAction('buy_adeel', '${safeId}')">
              Buy to My Inv ($${item.price})
            </button>
            <button class="btn-outline btn-xs" onclick="executeShopAction('buy_rida', '${safeId}')">
              Rida Buys ($${item.price})
            </button>
            <button class="btn-white btn-xs" onclick="triggerRoleplayFromHub('<${item.price}> Here is $${item.price} for ${escapeHtml(item.name.replace(/'/g, "\\'"))}, Rida')">
              Give &lt;$${item.price}&gt;
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  const ledgerList = document.getElementById('moneyLedgerList');
  if (ledgerList) {
    ledgerList.innerHTML = (AppState.state.transactions || []).map(tx => `
      <div class="list-row">
        <div>
          <strong>${escapeHtml(tx.note)}</strong>
          <span class="text-secondary" style="display:block;font-size:11.5px;">Rida Balance after: $${tx.balanceAfter}</span>
        </div>
        <strong class="${tx.amount >= 0 ? 'emerald-text' : ''}" style="font-family:var(--font-mono)">
          ${tx.amount >= 0 ? '+' : ''}$${tx.amount}
        </strong>
      </div>
    `).join('');
  }

  const friendsGrid = document.getElementById('friendsGrid');
  if (friendsGrid) {
    friendsGrid.innerHTML = FRIENDS_DATA.map(fr => `
      <div class="panel-card">
        <span class="card-kicker">${escapeHtml(fr.role)}</span>
        <h3>${escapeHtml(fr.name)} (${fr.age}F)</h3>
        <p class="text-secondary mb-12">${escapeHtml(fr.desc)}</p>
        <div class="stack-list">
          ${fr.prompts.map(p => `
            <button class="btn-outline btn-sm" onclick="triggerRoleplayFromHub('${escapeHtml(p.text.replace(/'/g, "\\'"))}')">
              ${escapeHtml(p.label)} →
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

window.toggleOrRoleplaySecret = async function(secretId) {
  const res = await fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'unlock_secret', secretId })
  });
  const data = await res.json();
  AppState.state = data.state;
  renderWorldHub();
};

window.triggerRoleplayFromHub = function(promptText) {
  switchView('chat');
  sendRoleplayMessage(promptText);
};

// ============================================================================
// VIEW 5: SETTINGS & MODALS (WITH ALL 16 FEELING SLIDERS)
// ============================================================================
function updateFilterStatusPills(mode = 'max') {
  const container = document.getElementById('filterStatusPills');
  if (!container) return;
  const labels = {
    max: [
      { cat: 'Harassment', val: 'BLOCK_LOW_AND_ABOVE' },
      { cat: 'Hate Speech', val: 'BLOCK_LOW_AND_ABOVE' },
      { cat: 'Sexually Explicit', val: 'BLOCK_LOW_AND_ABOVE' },
      { cat: 'Dangerous Content', val: 'BLOCK_LOW_AND_ABOVE' }
    ],
    mix: [
      { cat: 'Harassment', val: 'BLOCK_LOW_AND_ABOVE' },
      { cat: 'Hate Speech', val: 'BLOCK_LOW_AND_ABOVE' },
      { cat: 'Sexually Explicit', val: 'BLOCK_MEDIUM_AND_ABOVE' },
      { cat: 'Dangerous Content', val: 'BLOCK_LOW_AND_ABOVE' }
    ],
    medium: [
      { cat: 'Harassment', val: 'BLOCK_MEDIUM_AND_ABOVE' },
      { cat: 'Hate Speech', val: 'BLOCK_MEDIUM_AND_ABOVE' },
      { cat: 'Sexually Explicit', val: 'BLOCK_MEDIUM_AND_ABOVE' },
      { cat: 'Dangerous Content', val: 'BLOCK_MEDIUM_AND_ABOVE' }
    ],
    low: [
      { cat: 'Harassment', val: 'BLOCK_ONLY_HIGH' },
      { cat: 'Hate Speech', val: 'BLOCK_ONLY_HIGH' },
      { cat: 'Sexually Explicit', val: 'BLOCK_ONLY_HIGH' },
      { cat: 'Dangerous Content', val: 'BLOCK_ONLY_HIGH' }
    ],
    none: [
      { cat: 'Harassment', val: 'BLOCK_NONE' },
      { cat: 'Hate Speech', val: 'BLOCK_NONE' },
      { cat: 'Sexually Explicit', val: 'BLOCK_NONE' },
      { cat: 'Dangerous Content', val: 'BLOCK_NONE' }
    ]
  };
  const list = labels[mode] || labels.max;
  container.innerHTML = list.map(item => `
    <span class="tag-badge" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 9px;">
      <span style="color: var(--text-muted); font-size: 10px;">${item.cat}:</span>
      <span style="font-weight: 600; color: #fff;">${item.val}</span>
    </span>
  `).join('');
}

function bindSettingsEvents() {
  document.getElementById('btnSaveAiSettings')?.addEventListener('click', async () => {
    const aiConfig = {
      provider: document.getElementById('settingAiProvider').value,
      model: document.getElementById('settingAiModel').value,
      apiKey: document.getElementById('settingAiKey').value.trim(),
      safetyFilter: document.getElementById('settingSafetyFilter')?.value || 'max'
    };
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_ai', aiConfig })
    });
    const data = await res.json();
    AppState.state = data.state;
    renderAll();
    showToast('AI & Safety Filter settings saved');
  });

  document.getElementById('settingSafetyFilter')?.addEventListener('change', (e) => {
    updateFilterStatusPills(e.target.value);
  });

  document.getElementById('btnSaveStateOverrides')?.addEventListener('click', async () => {
    const ridaUpdates = {
      balance: Number(document.getElementById('settingRidaBalance')?.value) || 85,
      mood: document.getElementById('settingRidaMood')?.value.trim() || 'Shy & Warm'
    };
    ALL_16_BARS_GROUPS.forEach(g => {
      g.bars.forEach(b => {
        const el = document.getElementById(`settingBar_${b.key}`);
        if (el) ridaUpdates[b.key] = Number(el.value);
      });
    });

    const adeelBal = Number(document.getElementById('settingAdeelBalance')?.value) || 650;
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_adeel', adeel: { balance: adeelBal } })
    });
    await updateRidaState(ridaUpdates);
    showToast('All 16 Feeling Bars & Wallets Updated');
  });
}

function renderSettingsPage() {
  if (!AppState.state) return;
  const { aiConfig, rida, adeel } = AppState.state;
  if (aiConfig) {
    document.getElementById('settingAiProvider').value = aiConfig.provider || 'gemini';
    document.getElementById('settingAiModel').value = aiConfig.model || 'gemini-3.8-flash';
    document.getElementById('settingAiKey').value = aiConfig.apiKey || '';
    if (document.getElementById('settingSafetyFilter')) {
      document.getElementById('settingSafetyFilter').value = aiConfig.safetyFilter || 'max';
      updateFilterStatusPills(aiConfig.safetyFilter || 'max');
    }
  }
  if (adeel && document.getElementById('settingAdeelBalance')) {
    document.getElementById('settingAdeelBalance').value = adeel.balance ?? 650;
  }
  if (rida) {
    if (document.getElementById('settingRidaBalance')) document.getElementById('settingRidaBalance').value = rida.balance;
    if (document.getElementById('settingRidaMood')) document.getElementById('settingRidaMood').value = rida.mood;

    const slidersGrid = document.getElementById('settingsAll16SlidersGrid');
    if (slidersGrid) {
      const allBars = ALL_16_BARS_GROUPS.flatMap(g => g.bars);
      slidersGrid.innerHTML = allBars.map(b => {
        const val = Math.round(Number(rida[b.key] ?? 0));
        return `
          <div class="form-group">
            <label style="display:flex;justify-content:space-between;">
              <span>${escapeHtml(b.label)}</span>
              <strong id="settingBarVal_${b.key}" style="color:${b.color};font-family:var(--font-mono);">${val}%</strong>
            </label>
            <input type="range" id="settingBar_${b.key}" min="0" max="100" value="${val}"
              oninput="document.getElementById('settingBarVal_${b.key}').textContent = this.value + '%'" />
          </div>
        `;
      }).join('');
    }
  }
}

async function updateRidaState(ridaPartial) {
  const res = await fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update_rida', rida: ridaPartial })
  });
  const data = await res.json();
  AppState.state = data.state;
  renderAll();
}

async function updateModes(modesPartial) {
  const res = await fetch('/api/state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update_modes', modes: modesPartial })
  });
  const data = await res.json();
  AppState.state = data.state;
  renderAll();
}

function bindBackupEvents() {
  const openBackupModal = () => {
    updateDbStatusUI(AppState.state, AppState.memories);
    openModal('modalBackupCenter');
  };

  document.getElementById('btnOpenBackupCenter')?.addEventListener('click', openBackupModal);
  document.getElementById('sidebarDbStatus')?.addEventListener('click', openBackupModal);

  document.getElementById('btnModalExportFull')?.addEventListener('click', exportFullBackupJson);
  document.getElementById('btnSettingsExportFull')?.addEventListener('click', exportFullBackupJson);

  document.getElementById('btnModalDownloadTxt')?.addEventListener('click', () => downloadChatTranscript('txt'));
  document.getElementById('btnSettingsDownloadTxt')?.addEventListener('click', () => downloadChatTranscript('txt'));

  document.getElementById('btnModalDownloadMd')?.addEventListener('click', () => downloadChatTranscript('md'));
  document.getElementById('btnSettingsDownloadMd')?.addEventListener('click', () => downloadChatTranscript('md'));

  document.getElementById('inputImportBackupModal')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) importBackupJsonFile(file);
    e.target.value = '';
  });

  document.getElementById('inputImportBackupSettings')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) importBackupJsonFile(file);
    e.target.value = '';
  });

  document.getElementById('btnRestorePreviousChat')?.addEventListener('click', restorePreviousChat);
}

async function exportFullBackupJson() {
  try {
    showToast('Preparing full backup bundle (Chats + Memories + 65 Skills)...');
    const res = await fetch('/api/backup/export');
    const blob = await res.blob();
    const dateSlug = new Date().toISOString().slice(0, 10);
    triggerFileDownload(blob, `rida-roleplay-full-backup-${dateSlug}.json`);
    showToast('Full backup (.json) downloaded');
  } catch (err) {
    // Fallback client-side bundle if offline
    const fallbackBundle = {
      app: 'Rida Roleplay & Skill Studio',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      state: AppState.state,
      memories: AppState.memories,
      skillsFiles: (AppState.skills?.files || []).map(f => ({
        name: f.name,
        categoryId: f.categoryId,
        content: f.content
      }))
    };
    const blob = new Blob([JSON.stringify(fallbackBundle, null, 2)], { type: 'application/json' });
    const dateSlug = new Date().toISOString().slice(0, 10);
    triggerFileDownload(blob, `rida-roleplay-full-backup-${dateSlug}.json`);
    showToast('Full backup (.json) downloaded from browser DB');
  }
}

function downloadChatTranscript(format = 'txt') {
  if (!AppState.state) return;
  const { rida, messages } = AppState.state;
  const memories = AppState.memories || [];
  const dateSlug = new Date().toISOString().slice(0, 10);

  if (format === 'md') {
    const lines = [
      `# Rida & Adeel — Roleplay & Memory Transcript`,
      `- **Exported**: ${new Date().toLocaleString()}`,
      `- **Rida's Wallet Balance**: $${rida.balance}`,
      `- **Current Location**: ${rida.locationLabel}`,
      `- **Mood / Blush / Trust**: ${rida.mood} | Blush ${rida.blushLevel}% | Trust ${rida.trustLevel}%`,
      ``,
      `---`,
      `## Roleplay Conversation (${messages.length} Messages)`,
      ``
    ];

    messages.forEach((m, i) => {
      const speaker = m.role === 'assistant' ? 'Rida (18F)' : 'Adeel (19M)';
      const time = m.timestamp ? new Date(m.timestamp).toLocaleString() : '';
      lines.push(`### ${i + 1}. ${speaker} — *${time}*`);
      lines.push(m.content || '');
      if (m.thought) {
        lines.push(`\n> **[She thinks: ${m.thought}]**`);
      }
      lines.push(``);
    });

    lines.push(`---`);
    lines.push(`## Saved Memories (${memories.length})`);
    lines.push(``);
    memories.forEach(mem => {
      lines.push(`- **${mem.title}** (${mem.category}): ${mem.content}`);
      if (mem.ridaThought) lines.push(`  - *[She thinks: ${mem.ridaThought}]*`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    triggerFileDownload(blob, `rida-chat-transcript-${dateSlug}.md`);
    showToast('Downloaded Markdown transcript (.md)');
  } else {
    const lines = [
      `====================================================================`,
      `  RIDA & ADEEL — ROLEPLAY CHAT & MEMORY TRANSCRIPT`,
      `  Exported: ${new Date().toLocaleString()}`,
      `  Rida Wallet: $${rida.balance} | Blush: ${rida.blushLevel}% | Trust: ${rida.trustLevel}%`,
      `====================================================================`,
      ``
    ];

    messages.forEach((m, i) => {
      const speaker = m.role === 'assistant' ? 'RIDA' : 'ADEEL';
      const time = m.timestamp ? new Date(m.timestamp).toLocaleString() : '';
      lines.push(`[#${i + 1}] ${speaker} (${time}):`);
      lines.push(m.content || '');
      if (m.thought) {
        lines.push(`[She thinks: ${m.thought}]`);
      }
      lines.push(`--------------------------------------------------------------------`);
    });

    lines.push(``);
    lines.push(`================ SAVED MEMORIES (${memories.length}) ================`);
    memories.forEach(mem => {
      lines.push(`• ${mem.title} [${mem.category}]: ${mem.content}`);
      if (mem.ridaThought) lines.push(`  Thought: [She thinks: ${mem.ridaThought}]`);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    triggerFileDownload(blob, `rida-chat-transcript-${dateSlug}.txt`);
    showToast('Downloaded Chat transcript (.txt)');
  }
}

async function importBackupJsonFile(file) {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);

    const res = await fetch('/api/backup/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bundle: parsed })
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || 'Import failed');
    }

    AppState.state = data.state;
    AppState.memories = data.memories;
    AppState.skills = data.skills;

    await RidaDB.saveSnapshot(AppState.state, AppState.memories);
    closeModal('modalBackupCenter');
    renderAll();
    showToast(`Restored ${AppState.state.messages.length} messages, ${AppState.memories.length} memories & ${AppState.skills.files.length} skills!`);
  } catch (err) {
    showToast('Import error: ' + err.message);
  }
}

async function restorePreviousChat() {
  try {
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'restore_previous_chat' })
    });
    const data = await res.json();
    if (data.state) {
      AppState.state = data.state;
      await RidaDB.saveSnapshot(AppState.state, AppState.memories);
      closeModal('modalBackupCenter');
      renderAll();
      showToast(`Restored conversation (${AppState.state.messages.length} messages)`);
    }
  } catch (err) {
    showToast('Error restoring chat: ' + err.message);
  }
}

function triggerFileDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function bindModalEvents() {
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });

  document.querySelectorAll('.money-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('giveMoneyAmountInput').value = btn.dataset.amt;
    });
  });

  document.getElementById('formGiveMoney')?.addEventListener('submit', e => {
    e.preventDefault();
    const amt = document.getElementById('giveMoneyAmountInput').value;
    const note = document.getElementById('giveMoneyNoteInput').value.trim();
    closeModal('modalGiveMoney');
    document.getElementById('giveMoneyNoteInput').value = '';
    const msg = note ? `<${amt}> ${note}` : `<${amt}>`;
    switchView('chat');
    sendRoleplayMessage(msg);
  });
}

function openModal(id) {
  document.getElementById(id)?.classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ============================================================================
// INTERACTIVE MOBILE SYSTEM POPUP (MESSAGES, PHOTO GALLERY & WATCH MOVIES)
// ============================================================================
function bindPhoneSystemEvents() {
  document.getElementById('btnOpenMobilePopup')?.addEventListener('click', () => {
    openPhonePopup('messages');
  });

  document.querySelectorAll('.phone-app-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchPhoneTab(tab.dataset.ptab);
    });
  });

  // Quick SMS Chips inside Messages App
  document.querySelectorAll('.phone-sms-chip[data-phone-sms]').forEach(chip => {
    chip.addEventListener('click', async () => {
      const text = chip.dataset.phoneSms;
      if (!text) return;
      const formatted = /^\[by mobile\]/i.test(text) ? text : `[by mobile] ${text}`;
      await sendRoleplayMessage(formatted);
      renderPhoneSystem();
    });
  });

  // Ask Photo / 18+ Pic buttons in Messages & Gallery
  document.getElementById('btnPhoneAskCuteSelfie')?.addEventListener('click', () => {
    requestPhonePhoto(false);
  });
  document.getElementById('btnPhoneAsk18Photo')?.addEventListener('click', () => {
    requestPhonePhoto(true);
  });
  document.getElementById('btnGalleryRequestCute')?.addEventListener('click', () => {
    requestPhonePhoto(false);
  });
  document.getElementById('btnGalleryRequest18')?.addEventListener('click', () => {
    requestPhonePhoto(true);
  });

  // Cinema Controls
  document.getElementById('btnRidaPickMovie')?.addEventListener('click', () => {
    watchMovieWithRida(null, true);
  });

  document.getElementById('btnToggleAddCustomMovie')?.addEventListener('click', () => {
    document.getElementById('formAddCustomMovie')?.classList.toggle('hidden');
  });

  document.getElementById('btnCancelCustomMovie')?.addEventListener('click', () => {
    document.getElementById('formAddCustomMovie')?.classList.add('hidden');
  });

  // Static Genre Filter Pills in Cinema
  document.querySelectorAll('#phoneMovieCategoryTabs .phone-genre-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      AppState.activeMovieCategory = pill.dataset.mcat || 'all';
      renderPhoneSystem();
    });
  });

  // Send SMS directly from the Smartphone Popup
  document.getElementById('formPhoneSms')?.addEventListener('submit', async e => {
    e.preventDefault();
    const input = document.getElementById('phoneSmsInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    const formatted = /^\[by mobile\]/i.test(text) ? text : `[by mobile] ${text}`;
    await sendRoleplayMessage(formatted);
    renderPhoneSystem();
  });

  // Add Custom Movie to Cinema Catalog
  document.getElementById('formAddCustomMovie')?.addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('customMovieTitle')?.value.trim();
    const category = document.getElementById('customMovieCategory')?.value || 'romantic';
    const rating = document.getElementById('customMovieRating')?.value || 'Simple';
    const plot = document.getElementById('customMoviePlot')?.value.trim();

    if (!title || !plot) return;

    try {
      const res = await fetch('/api/phone/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_movie',
          movie: { title, category, rating, plot }
        })
      });
      const data = await res.json();
      if (data.ok && data.cinema) {
        AppState.cinema = data.cinema;
        document.getElementById('formAddCustomMovie')?.reset();
        document.getElementById('formAddCustomMovie')?.classList.add('hidden');
        renderPhoneSystem();
        showToast(`Added "${title}" to Watch Together Cinema!`);
      }
    } catch (err) {
      showToast('Error adding custom movie: ' + err.message);
    }
  });
}

function openPhonePopup(tabName = 'messages') {
  openModal('modalPhoneSystem');
  switchPhoneTab(tabName);
  renderPhoneSystem();
}
window.openPhonePopup = openPhonePopup;

function switchPhoneTab(tabName) {
  AppState.activePhoneTab = tabName || 'messages';
  document.querySelectorAll('.phone-app-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ptab === AppState.activePhoneTab);
  });
  document.querySelectorAll('.phone-app-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `ptab-${AppState.activePhoneTab}`);
  });
}
window.switchPhoneTab = switchPhoneTab;

function renderPhoneSystem() {
  if (!AppState.state) return;
  const r = AppState.state.rida || {};
  const w = AppState.state.world || {};

  // Status bar clock & dynamic island
  const timeEl = document.getElementById('phoneStatusClock');
  if (timeEl) timeEl.textContent = w.clockTime || '11:45 PM';

  const islandEl = document.getElementById('phoneIslandStatusText');
  if (islandEl) {
    islandEl.textContent = w.activeMovie
      ? `Playing: ${w.activeMovie.title}`
      : `Rida • ${r.mood || 'Calm & Affectionate'}`;
  }

  const contactSub = document.getElementById('phoneContactSub');
  if (contactSub) {
    contactSub.textContent = `Online • ${w.locationLabel || 'Top Floor — Rida\'s Room'} • Mood: ${r.mood || 'Calm'}`;
  }

  // Filter mobile messages + recent messages for the phone thread
  const allMsgs = AppState.state.messages || [];
  const mobileMsgs = allMsgs.filter(m =>
    m.mode === 'mobile' ||
    /\[by mobile\]/i.test(m.content || '') ||
    Boolean(m.photo) ||
    Boolean(m.movieEvent)
  );
  const recentSlice = allMsgs.slice(-14);
  const combinedMap = new Map();
  [...mobileMsgs, ...recentSlice].forEach(m => combinedMap.set(m.id, m));
  const threadMsgs = Array.from(combinedMap.values());

  const galleryPhotos = Array.isArray(AppState.state.phoneGallery) ? AppState.state.phoneGallery : [];
  const moviesList = Array.isArray(AppState.cinema?.movies) ? AppState.cinema.movies : [];

  // Update badges
  const msgBadge = document.getElementById('phoneMsgCountBadge');
  if (msgBadge) msgBadge.textContent = String(threadMsgs.length);

  const galBadge = document.getElementById('phoneGalCountBadge');
  if (galBadge) galBadge.textContent = String(galleryPhotos.length);

  const movBadge = document.getElementById('phoneMovieCountBadge');
  if (movBadge) movBadge.textContent = String(moviesList.length);

  const navBadge = document.getElementById('navPhoneBadge');
  if (navBadge) navBadge.textContent = `${galleryPhotos.length} Pics • ${moviesList.length} Movies`;

  // 1. Render Phone Messages List
  const msgContainer = document.getElementById('phoneMessagesList');
  if (msgContainer) {
    msgContainer.innerHTML = threadMsgs.map(m => {
      const isRida = m.role === 'assistant';
      const cleanText = String(m.content || '').replace(/\[by mobile\]\s*/ig, '');
      const hasPhoto = Boolean(m.photo);
      const hasMovie = Boolean(m.movieEvent);
      return `
        <div class="phone-sms-row ${isRida ? 'sms-rida' : 'sms-adeel'}">
          <div class="phone-sms-bubble">
            <div class="phone-sms-meta">
              <span>${isRida ? 'Rida' : 'Adeel (You)'}</span>
              <span>${m.mode === 'mobile' ? 'SMS' : 'Room / Phone'}</span>
            </div>
            <div class="phone-sms-text">${formatRoleplayBody(cleanText)}</div>
            ${hasPhoto ? `
              <div class="phone-sms-attachment" onclick="switchPhoneTab('gallery')">
                ${svgIcon('camera', 'icon-xs')}
                <span>Photo Sent: <strong>${escapeHtml(m.photo.title)}</strong> (${escapeHtml(m.photo.rating || 'Simple')})</span>
              </div>
            ` : ''}
            ${hasMovie ? `
              <div class="phone-sms-attachment movie-att" onclick="switchPhoneTab('cinema')">
                ${svgIcon('film', 'icon-xs')}
                <span>Watching Movie: <strong>${escapeHtml(m.movieEvent.title)}</strong> (${escapeHtml(m.movieEvent.categoryLabel || m.movieEvent.category)})</span>
              </div>
            ` : ''}
            <div class="phone-sms-actions">
              <button type="button" class="phone-sms-btn-regen" id="btn-phone-regen-${escapeHtml(m.id)}" onclick="regenerateFromMessage('${escapeHtml(m.id)}')" title="${isRida ? 'Regenerate Rida\'s reply & rewind here' : 'Rewind here & retry'}">
                ${svgIcon('rotate-ccw', 'icon-xs')}
                <span>${isRida ? 'Regenerate' : 'Rewind'}</span>
              </button>
              <span class="phone-sms-time">${escapeHtml(m.worldTimeLabel || '')}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // 2. Render Rida's Photo Gallery Grid
  const galContainer = document.getElementById('phoneGalleryGrid');
  if (galContainer) {
    if (galleryPhotos.length === 0) {
      galContainer.innerHTML = `<div class="empty-hint">No photos in gallery yet. Click "+ Request Selfie" or "+ Request 18+ Photo" above!</div>`;
    } else {
      galContainer.innerHTML = galleryPhotos.map(ph => {
        const is18 = ph.rating === '18+';
        const accent = ph.accent || (is18 ? '#e879f9' : '#fb7185');
        return `
          <div class="phone-gallery-card ${is18 ? 'gal-card-18' : ''}" style="border-color:${accent}44;">
            <div class="phone-gallery-visual" style="background:radial-gradient(circle at 30% 25%, ${accent}35, rgba(9,9,14,0.96) 75%);">
              <div class="phone-gallery-top-tags">
                <span class="gal-time-tag">${escapeHtml(ph.timestamp || 'Saved')}</span>
                <span class="movie-rating-pill ${is18 ? 'rating-18' : 'rating-simple'}">${escapeHtml(ph.rating || 'Simple')}</span>
              </div>
              <div class="phone-gallery-camera-badge" style="color:${accent};border-color:${accent}55;">
                ${svgIcon('camera', 'icon')}
              </div>
              <div class="phone-gallery-title">${escapeHtml(ph.title)}</div>
              <div class="phone-gallery-outfit">${escapeHtml(ph.outfit || 'Oversized Hoodie')} • ${escapeHtml(ph.mood || 'Shy')}</div>
            </div>
            <div class="phone-gallery-body">
              <p class="phone-gallery-desc">${escapeHtml(ph.description || '')}</p>
              ${ph.caption ? `<div class="phone-gallery-caption">"${escapeHtml(ph.caption)}"</div>` : ''}
              <div class="phone-gallery-actions">
                <button type="button" class="btn-xs-outline" onclick="talkAboutGalleryPhoto('${escapeHtml(ph.id)}')">
                  ${svgIcon('message-circle', 'icon-xs')}
                  <span>React / Talk to Rida About This Photo</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 3. Render Cinema & Watch Together Tab
  const nowWatchingTitle = document.getElementById('phoneNowWatchingTitle');
  const nowWatchingPlot = document.getElementById('phoneNowWatchingPlot');
  if (w.activeMovie) {
    if (nowWatchingTitle) {
      nowWatchingTitle.textContent = `Now Playing: ${w.activeMovie.title} (${w.activeMovie.categoryLabel || w.activeMovie.category} • ${w.activeMovie.rating})`;
    }
    if (nowWatchingPlot) {
      nowWatchingPlot.textContent = w.activeMovie.plot || '';
    }
  } else {
    if (nowWatchingTitle) {
      nowWatchingTitle.textContent = 'Pick any movie below or let Rida play one!';
    }
    if (nowWatchingPlot) {
      nowWatchingPlot.textContent = 'Watch Romantic, 18+ Steamy, Scary Horror, Sad, Happy Comedy, or Cozy movies together—Rida reacts to every scene in chat.';
    }
  }

  // Highlight active genre tab
  document.querySelectorAll('#phoneMovieCategoryTabs .phone-genre-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.mcat === AppState.activeMovieCategory);
  });

  const moviesGrid = document.getElementById('phoneMoviesGrid');
  if (moviesGrid) {
    const filteredMovies = AppState.activeMovieCategory === 'all'
      ? moviesList
      : moviesList.filter(m => m.category === AppState.activeMovieCategory);

    moviesGrid.innerHTML = filteredMovies.map(mv => {
      const is18 = mv.rating === '18+';
      const accent = mv.accent || (is18 ? '#e879f9' : '#fb7185');
      const effectsHtml = Object.entries(mv.statEffects || {})
        .slice(0, 4)
        .map(([k, v]) => {
          const meta = STAT_DISPLAY_LABELS[k] || { label: k, color: '#a1a1aa' };
          const sign = v > 0 ? `+${v}%` : `${v}%`;
          return `<span class="movie-stat-tag" style="color:${meta.color};border-color:${meta.color}44;">${escapeHtml(meta.label)} ${sign}</span>`;
        })
        .join('');

      return `
        <div class="phone-movie-card ${is18 ? 'movie-card-18' : ''}" style="border-color:${accent}44;">
          <div class="phone-movie-top" style="background:linear-gradient(135deg, ${accent}24 0%, rgba(12,12,18,0.96) 100%);">
            <div class="phone-movie-badges">
              <span class="movie-genre-pill" style="color:${accent};border-color:${accent}55;background:${accent}18;">${escapeHtml(mv.categoryLabel || mv.category)}</span>
              <span class="movie-rating-pill ${is18 ? 'rating-18' : 'rating-simple'}">${escapeHtml(mv.rating || 'Simple')}</span>
              <span class="movie-duration-pill">${escapeHtml(mv.duration || '1h 55m')}</span>
            </div>
            <h4 class="phone-movie-title">${escapeHtml(mv.title)}</h4>
          </div>
          <div class="phone-movie-body">
            <p class="phone-movie-plot"><strong>Movie Plot:</strong> ${escapeHtml(mv.plot)}</p>
            <p class="phone-movie-reaction" style="border-left:2px solid ${accent};"><strong>Rida's Behavior:</strong> ${escapeHtml(mv.ridaReaction)}</p>
            <div class="phone-movie-effects">${effectsHtml}</div>
            <div class="phone-movie-actions">
              <button type="button" class="phone-play-movie-btn" style="border-color:${accent}66;background:linear-gradient(135deg, ${accent}2e, rgba(24,24,36,0.95));" onclick="watchMovieWithRida('${escapeHtml(mv.id)}', false)">
                ${svgIcon('play', 'icon-xs')}
                <span>Play &amp; Watch Together with Rida</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

async function watchMovieWithRida(movieId, ridaPick = false) {
  try {
    showToast(ridaPick ? 'Rida is picking a movie for both of you...' : 'Starting movie with Rida...');
    const res = await fetch('/api/phone/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: ridaPick ? 'rida_pick_movie' : 'watch_movie',
        movieId,
        category: AppState.activeMovieCategory !== 'all' ? AppState.activeMovieCategory : undefined
      })
    });
    const data = await res.json();
    if (data.ok && data.state) {
      AppState.state = data.state;
      if (data.memories) AppState.memories = data.memories;
      if (data.cinema) AppState.cinema = data.cinema;
      await RidaDB.saveSnapshot(AppState.state, AppState.memories);
      closeModal('modalPhoneSystem');
      switchView('chat');
      renderAll();
      if (data.movie) {
        showToast(`Now Watching: "${data.movie.title}" (${data.movie.categoryLabel})`);
      }
    }
  } catch (err) {
    showToast('Could not start movie: ' + err.message);
  }
}
window.watchMovieWithRida = watchMovieWithRida;

async function requestPhonePhoto(is18 = false) {
  try {
    showToast(is18 ? 'Asking Rida for a secret 18+ photo...' : 'Asking Rida for a cute selfie...');
    const res = await fetch('/api/phone/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'request_photo',
        rating: is18 ? '18+' : 'Simple'
      })
    });
    const data = await res.json();
    if (data.ok && data.state) {
      AppState.state = data.state;
      if (data.memories) AppState.memories = data.memories;
      await RidaDB.saveSnapshot(AppState.state, AppState.memories);
      renderAll();
      switchPhoneTab('gallery');
      showToast('Rida sent a new photo to your Mobile Gallery!');
    }
  } catch (err) {
    showToast('Could not request photo: ' + err.message);
  }
}
window.requestPhonePhoto = requestPhonePhoto;

async function talkAboutGalleryPhoto(photoId) {
  const gallery = AppState.state?.phoneGallery || [];
  const ph = gallery.find(p => p.id === photoId);
  if (!ph) return;
  closeModal('modalPhoneSystem');
  switchView('chat');
  const msg = `[by mobile] *I open my phone gallery and look closely at the photo you sent me ("${ph.title}" — ${ph.outfit || 'your outfit'}).* You look so good in this pic, Rida... "${ph.caption || ''}"`;
  await sendRoleplayMessage(msg);
}
window.talkAboutGalleryPhoto = talkAboutGalleryPhoto;

async function regenerateFromMessage(messageId) {
  if (!messageId) return;
  const state = AppState.state;
  if (!state || !Array.isArray(state.messages)) return;

  const targetIdx = state.messages.findIndex(m => m.id === messageId);
  if (targetIdx === -1) return;

  const targetMsg = state.messages[targetIdx];
  const subsequentCount = state.messages.length - 1 - targetIdx;

  if (subsequentCount > 1) {
    const ok = confirm(`Rewind conversation to this turn?\n\nThis will remove ${subsequentCount} newer message(s) and regenerate a fresh, alternate reply from Rida with all prior context intact.`);
    if (!ok) return;
  }

  // Visual spinner feedback on button
  const btnChatRegen = document.getElementById(`btn-regen-${messageId}`);
  const btnChatRewind = document.getElementById(`btn-rewind-${messageId}`);
  const btnPhoneRegen = document.getElementById(`btn-phone-regen-${messageId}`);
  const activeBtn = btnChatRegen || btnChatRewind || btnPhoneRegen;

  let oldBtnHtml = '';
  if (activeBtn) {
    activeBtn.disabled = true;
    oldBtnHtml = activeBtn.innerHTML;
    activeBtn.innerHTML = `<span class="spin-icon">${svgIcon('rotate-ccw', 'icon-xs')}</span> <span>Regenerating...</span>`;
  }

  showToast('Rewinding history and generating fresh reply from Rida...');

  try {
    const res = await fetch('/api/chat/regenerate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId })
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data.error || 'Failed to regenerate response');
    }

    AppState.state = data.state;

    // Refresh memories
    try {
      const memRes = await fetch('/api/memories');
      const memData = await memRes.json();
      if (memData && Array.isArray(memData.memories)) {
        AppState.memories = memData.memories;
      }
    } catch (e) {}

    renderAll();
    showToast(`Rewound and regenerated! Pruned ${data.messagesPrunedCount || 1} newer message(s).`);
  } catch (err) {
    showToast('Regenerate failed: ' + err.message);
    if (activeBtn && oldBtnHtml) {
      activeBtn.disabled = false;
      activeBtn.innerHTML = oldBtnHtml;
    }
  }
}
window.regenerateFromMessage = regenerateFromMessage;

async function undoRewindChat() {
  try {
    const res = await fetch('/api/chat/undo-rewind', { method: 'POST' });
    const data = await res.json();
    if (data.ok && data.state) {
      AppState.state = data.state;
      renderAll();
      showToast('Restored previous messages before rewind!');
    } else {
      showToast('No prior rewind snapshot available.');
    }
  } catch (err) {
    showToast('Could not undo rewind: ' + err.message);
  }
}
window.undoRewindChat = undoRewindChat;


