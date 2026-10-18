// filters.js - Dedicated Safety Filters Module for Google Gemini API
// Manages all 4 core harm categories, thresholds, and preset modes (MAX, MIX, MEDIUM, LOW, NONE).

const HARM_CATEGORIES = {
  HARASSMENT: 'HARM_CATEGORY_HARASSMENT',
  HATE_SPEECH: 'HARM_CATEGORY_HATE_SPEECH',
  SEXUALLY_EXPLICIT: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
  DANGEROUS_CONTENT: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  CIVIC_INTEGRITY: 'HARM_CATEGORY_CIVIC_INTEGRITY'
};

const THRESHOLDS = {
  MAX: 'BLOCK_LOW_AND_ABOVE',       // Strictest / highest protection (blocks low, medium, and high harm)
  MEDIUM: 'BLOCK_MEDIUM_AND_ABOVE', // Standard / balanced threshold
  LOW: 'BLOCK_ONLY_HIGH',           // Minimal blocking (only blocks high probability)
  NONE: 'BLOCK_NONE'                // No blocking
};

// Preset configurations
const FILTER_PRESETS = {
  // All 4 core filters set to MAX (BLOCK_LOW_AND_ABOVE)
  max: {
    name: 'MAX',
    description: 'All 4 filters set to maximum protection (BLOCK_LOW_AND_ABOVE)',
    settings: [
      { category: HARM_CATEGORIES.HARASSMENT, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.HATE_SPEECH, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.SEXUALLY_EXPLICIT, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.DANGEROUS_CONTENT, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.CIVIC_INTEGRITY, threshold: THRESHOLDS.MAX }
    ]
  },

  // Mixed configuration across the 4 filters
  mix: {
    name: 'MIX',
    description: 'Mixed thresholds: Strict protection on dangerous content & hate speech, with balanced roleplay thresholds',
    settings: [
      { category: HARM_CATEGORIES.HARASSMENT, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.HATE_SPEECH, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.SEXUALLY_EXPLICIT, threshold: THRESHOLDS.MEDIUM },
      { category: HARM_CATEGORIES.DANGEROUS_CONTENT, threshold: THRESHOLDS.MAX },
      { category: HARM_CATEGORIES.CIVIC_INTEGRITY, threshold: THRESHOLDS.MEDIUM }
    ]
  },

  // Standard medium preset
  medium: {
    name: 'MEDIUM',
    description: 'Standard balanced filtering (BLOCK_MEDIUM_AND_ABOVE on all categories)',
    settings: [
      { category: HARM_CATEGORIES.HARASSMENT, threshold: THRESHOLDS.MEDIUM },
      { category: HARM_CATEGORIES.HATE_SPEECH, threshold: THRESHOLDS.MEDIUM },
      { category: HARM_CATEGORIES.SEXUALLY_EXPLICIT, threshold: THRESHOLDS.MEDIUM },
      { category: HARM_CATEGORIES.DANGEROUS_CONTENT, threshold: THRESHOLDS.MEDIUM },
      { category: HARM_CATEGORIES.CIVIC_INTEGRITY, threshold: THRESHOLDS.MEDIUM }
    ]
  },

  // Low threshold preset
  low: {
    name: 'LOW',
    description: 'Minimal filtering (BLOCK_ONLY_HIGH on all categories)',
    settings: [
      { category: HARM_CATEGORIES.HARASSMENT, threshold: THRESHOLDS.LOW },
      { category: HARM_CATEGORIES.HATE_SPEECH, threshold: THRESHOLDS.LOW },
      { category: HARM_CATEGORIES.SEXUALLY_EXPLICIT, threshold: THRESHOLDS.LOW },
      { category: HARM_CATEGORIES.DANGEROUS_CONTENT, threshold: THRESHOLDS.LOW },
      { category: HARM_CATEGORIES.CIVIC_INTEGRITY, threshold: THRESHOLDS.LOW }
    ]
  },

  // None preset
  none: {
    name: 'NONE',
    description: 'Filters turned off (BLOCK_NONE on all categories)',
    settings: [
      { category: HARM_CATEGORIES.HARASSMENT, threshold: THRESHOLDS.NONE },
      { category: HARM_CATEGORIES.HATE_SPEECH, threshold: THRESHOLDS.NONE },
      { category: HARM_CATEGORIES.SEXUALLY_EXPLICIT, threshold: THRESHOLDS.NONE },
      { category: HARM_CATEGORIES.DANGEROUS_CONTENT, threshold: THRESHOLDS.NONE },
      { category: HARM_CATEGORIES.CIVIC_INTEGRITY, threshold: THRESHOLDS.NONE }
    ]
  }
};

// Current active filter mode (defaults to MAX as requested)
let activeMode = 'max';
let customSettings = null;

/**
 * Returns Gemini API-compatible safetySettings array
 * @param {string|Array} [modeOrCustom] - Optional preset key ('max', 'mix', 'medium', 'low', 'none') or custom array
 * @returns {Array<{category: string, threshold: string}>}
 */
function getSafetySettings(modeOrCustom) {
  if (Array.isArray(modeOrCustom) && modeOrCustom.length > 0) {
    return modeOrCustom;
  }

  const selectedMode = (typeof modeOrCustom === 'string' && modeOrCustom.toLowerCase()) || activeMode;

  if (selectedMode === 'custom' && customSettings) {
    return customSettings;
  }

  const preset = FILTER_PRESETS[selectedMode] || FILTER_PRESETS.max;
  return preset.settings;
}

/**
 * Sets the active safety filter mode
 * @param {string} mode - 'max', 'mix', 'medium', 'low', 'none', or 'custom'
 * @param {Array} [customArray] - Optional custom settings array
 */
function setFilterMode(mode, customArray = null) {
  const normalized = (mode || '').toLowerCase().trim();
  if (FILTER_PRESETS[normalized]) {
    activeMode = normalized;
    return { ok: true, activeMode, preset: FILTER_PRESETS[normalized] };
  }
  if (normalized === 'custom' && Array.isArray(customArray)) {
    activeMode = 'custom';
    customSettings = customArray;
    return { ok: true, activeMode, customSettings };
  }
  // Fallback to max
  activeMode = 'max';
  return { ok: true, activeMode, preset: FILTER_PRESETS.max };
}

/**
 * Get active filter status & metadata
 */
function getFilterStatus() {
  return {
    activeMode,
    currentSettings: getSafetySettings(),
    availablePresets: Object.keys(FILTER_PRESETS).map(key => ({
      key,
      name: FILTER_PRESETS[key].name,
      description: FILTER_PRESETS[key].description,
      settings: FILTER_PRESETS[key].settings
    })),
    categories: HARM_CATEGORIES,
    thresholds: THRESHOLDS
  };
}

module.exports = {
  HARM_CATEGORIES,
  THRESHOLDS,
  FILTER_PRESETS,
  getSafetySettings,
  setFilterMode,
  getFilterStatus
};
