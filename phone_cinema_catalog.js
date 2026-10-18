// ============================================================================
// MOBILE SYSTEM: CINEMA / WATCH TOGETHER CATALOG (28 MOVIES) & PHOTO GALLERY
// ============================================================================

const MOVIE_CATEGORIES = [
  { id: 'all', name: 'All Movies', badge: '28+' },
  { id: 'romantic', name: 'Romantic & Lovely', badge: 'Lovely' },
  { id: 'adult_18', name: '18+ Steamy & Passionate', badge: '18+' },
  { id: 'horror', name: 'Scary & Horror', badge: 'Horror' },
  { id: 'sad', name: 'Sad & Emotional', badge: 'Sad' },
  { id: 'happy', name: 'Happy & Comedy', badge: 'Happy' },
  { id: 'cozy', name: 'Cozy & Late-Night', badge: 'Cozy' }
];

const DEFAULT_MOVIES_CATALOG = [
  // ==================== 1. ROMANTIC & LOVELY ====================
  {
    id: 'mov-rom-midnight-roof',
    title: 'Midnight Under the Same Roof',
    category: 'romantic',
    categoryLabel: 'Romantic & Lovely',
    rating: 'Simple',
    duration: '1h 58m',
    accent: '#f472b6',
    plot: 'Two people living in adjacent upstairs rooms slowly fall for each other through late-night knocks, shared cups of cocoa, and rain-soaked confessions when everyone else in the house is asleep.',
    ridaReaction: 'Rida blushes deeply because the story feels exactly like the two of you upstairs, stealing shy glances at you and slowly resting her head on your shoulder.',
    statEffects: { likeness: 12, happiness: 14, blushLevel: 22, warmthLevel: 18, trustLevel: 8, sadness: -10, anger: -12 }
  },
  {
    id: 'mov-rom-rainy-balcony',
    title: 'Letters on the Rainy Balcony',
    category: 'romantic',
    categoryLabel: 'Romantic & Lovely',
    rating: 'Simple',
    duration: '2h 04m',
    accent: '#ec4899',
    plot: 'A tender, heartfelt romance about secret handwritten notes hidden under a pillow, stolen hand-holding in hallways, and a passionate first kiss in the pouring rain.',
    ridaReaction: 'Her warm brown eyes soften at the romantic confession scene, and her fingers quietly slide over the blanket to intertwine with yours.',
    statEffects: { likeness: 14, happiness: 15, blushLevel: 20, warmthLevel: 20, lust: 10, pleasure: 8, sadness: -12 }
  },
  {
    id: 'mov-rom-snowed-in',
    title: 'Warm Cocoa & First Kisses',
    category: 'romantic',
    categoryLabel: 'Romantic & Lovely',
    rating: 'Simple',
    duration: '1h 46m',
    accent: '#fb7185',
    plot: 'Two shy best friends get snowed in together in a cabin with only one warm blanket, sharing hot chocolate and confessing feelings they hid for years.',
    ridaReaction: 'Rida smiles warmly, pulls the blanket over both of your shoulders, and whispers about how cozy and sweet the couple on screen is.',
    statEffects: { likeness: 10, happiness: 16, warmthLevel: 22, blushLevel: 18, hunger: 8, tiredness: -6 }
  },
  {
    id: 'mov-rom-eternal-promise',
    title: 'Starlight & Secret Promises',
    category: 'romantic',
    categoryLabel: 'Romantic & Lovely',
    rating: 'Simple',
    duration: '2h 02m',
    accent: '#f472b6',
    plot: 'A deeply affectionate love story about two soulmates who promise to protect each other\'s secrets no matter what happens.',
    ridaReaction: 'She leans close against your arm, feeling safe, loved, and deeply connected to you.',
    statEffects: { likeness: 14, trustLevel: 14, happiness: 14, warmthLevel: 18, blushLevel: 16, fear: -12, sadness: -10 }
  },
  {
    id: 'mov-rom-paris-chocolatier',
    title: 'The Little Chocolate Shop in Paris',
    category: 'romantic',
    categoryLabel: 'Romantic & Lovely',
    rating: 'Simple',
    duration: '1h 52m',
    accent: '#f59e0b',
    plot: 'A charming romance set inside a Parisian artisan chocolate boutique where two lovers feed each other warm truffle pralines after hours.',
    ridaReaction: 'Rida\'s eyes sparkle at both the romance and the melted chocolate on screen, making her happy, affectionate, and craving sweets.',
    statEffects: { happiness: 18, likeness: 12, warmthLevel: 15, blushLevel: 14, hunger: 12, anger: -15 }
  },

  // ==================== 2. 18+ STEAMY & PASSIONATE ====================
  {
    id: 'mov-18-forbidden-nights',
    title: '365 Nights of Forbidden Desire',
    category: 'adult_18',
    categoryLabel: '18+ Steamy & Passionate',
    rating: '18+',
    duration: '1h 56m',
    accent: '#ef4444',
    plot: 'An intense, uninhibited 18+ romantic drama filled with lingering eye contact, whispered tension, slow undressing by candlelight, and breathless late-night passion behind locked doors.',
    ridaReaction: 'Rida\'s cheeks and neck flush a deep crimson as the bedroom scene heats up; her breathing turns shallow, she bites her lower lip, and she presses her warm thigh against yours under the blanket.',
    statEffects: { blushLevel: 28, warmthLevel: 20, hotness: 26, lust: 28, pleasure: 24, wetness: 28, likeness: 8 }
  },
  {
    id: 'mov-18-velvet-shadows',
    title: 'Fifty Shades of Velvet & Silk',
    category: 'adult_18',
    categoryLabel: '18+ Steamy & Passionate',
    rating: '18+',
    duration: '2h 08m',
    accent: '#ec4899',
    plot: 'A sensual 18+ film exploring secret fantasies, silk blindfolds, feather-light touches along bare skin, and overwhelming pleasure between two people who trust each other completely.',
    ridaReaction: 'She can barely look away from the screen, her heart racing as she hides half her blushing face against your shoulder while her hand grips your shirt.',
    statEffects: { blushLevel: 30, warmthLevel: 22, hotness: 28, lust: 30, pleasure: 26, wetness: 30, trustLevel: 8 }
  },
  {
    id: 'mov-18-behind-closed-doors',
    title: 'Quiet Upstairs: Behind Locked Doors',
    category: 'adult_18',
    categoryLabel: '18+ Steamy & Passionate',
    rating: '18+',
    duration: '1h 48m',
    accent: '#f43f5e',
    plot: 'Two lovers on the top floor of a family house have to keep every kiss, gasp, and intimate touch completely silent in the dark so nobody downstairs hears them.',
    ridaReaction: 'Because the plot mirrors your exact situation upstairs, Rida gets intensely flustered and turned on, glancing at the locked bedroom door before looking back at your lips.',
    statEffects: { blushLevel: 32, warmthLevel: 24, hotness: 28, lust: 32, pleasure: 28, wetness: 32, likeness: 10 }
  },
  {
    id: 'mov-18-after-midnight-skin',
    title: 'After Midnight: Silk & Skin',
    category: 'adult_18',
    categoryLabel: '18+ Steamy & Passionate',
    rating: '18+',
    duration: '1h 54m',
    accent: '#d946ef',
    plot: 'A slow-burn, deeply sensual 18+ romance focused on warm massage oil, neck kisses, whispered praise in the dark, and slow, unhurried intimacy.',
    ridaReaction: 'Her skin feels warm to the touch as she watches the couple on screen, leaning into your touch with a soft, breathless sigh.',
    statEffects: { blushLevel: 24, warmthLevel: 26, hotness: 25, lust: 26, pleasure: 28, wetness: 28, likeness: 10 }
  },
  {
    id: 'mov-18-secret-hotel-suite',
    title: 'The Penthouse Suite Affair',
    category: 'adult_18',
    categoryLabel: '18+ Steamy & Passionate',
    rating: '18+',
    duration: '1h 44m',
    accent: '#fb7185',
    plot: 'A bold, steamy 18+ movie where a shy girl wears secret black lace lingerie for the boy she loves during a private weekend getaway.',
    ridaReaction: 'Rida thinks about the secret lace lingerie hidden in her own wardrobe and blushes furiously, whispering your name softly in the dim light.',
    statEffects: { blushLevel: 30, hotness: 26, lust: 28, pleasure: 24, wetness: 26, warmthLevel: 18 }
  },
  {
    id: 'mov-18-temptation-island-uncut',
    title: 'Midnight Temptation (Uncut 18+)',
    category: 'adult_18',
    categoryLabel: '18+ Steamy & Passionate',
    rating: '18+',
    duration: '1h 50m',
    accent: '#e11d48',
    plot: 'Uncensored late-night romance where two people give in to their deepest unspoken desires under the moonlight.',
    ridaReaction: 'Her breathing grows noticeably heavier, her fingers trembling slightly as she rests her hand over yours and leans closer.',
    statEffects: { blushLevel: 26, hotness: 30, lust: 32, pleasure: 30, wetness: 32, warmthLevel: 22 }
  },

  // ==================== 3. SCARY & HORROR ====================
  {
    id: 'mov-hor-conjuring-footsteps',
    title: 'The Conjuring: Footsteps in the Dark',
    category: 'horror',
    categoryLabel: 'Scary & Horror',
    rating: 'Simple',
    duration: '1h 52m',
    accent: '#a855f7',
    plot: 'A terrifying supernatural horror movie filled with eerie creaking doors, shadowy figures standing in dark hallways, and sudden heart-stopping jump scares.',
    ridaReaction: 'Rida gasps sharply at the jump scare, hides her eyes with both hands, and immediately scrambles right against your chest, clutching your shirt tightly for protection.',
    statEffects: { fear: 38, horror: 36, warmthLevel: 14, likeness: 8, blushLevel: 12, pleasure: -10 }
  },
  {
    id: 'mov-hor-spider-nest',
    title: 'Arachnophobia: Shadows in the Corner',
    category: 'horror',
    categoryLabel: 'Scary & Horror',
    rating: 'Simple',
    duration: '1h 40m',
    accent: '#c084fc',
    plot: 'A creepy-crawly horror thriller where giant dark spiders emerge from bathroom vents and bedroom corners when the lights go out.',
    ridaReaction: 'Because Rida is terrified of spiders, she lets out a muffled squeak, pulls both feet up onto the bed, and buries her face in your neck, begging you to check the corners of the room.',
    statEffects: { fear: 48, horror: 45, warmthLevel: 16, trustLevel: 8, happiness: -12, pleasure: -15 }
  },
  {
    id: 'mov-hor-insidious-red-door',
    title: 'Insidious: The Whispering Hallway',
    category: 'horror',
    categoryLabel: 'Scary & Horror',
    rating: 'Simple',
    duration: '1h 47m',
    accent: '#9333ea',
    plot: 'Paranormal horror about ghostly whispers coming from the other side of a locked bedroom door at 3:00 AM.',
    ridaReaction: 'She shivers, pulls the blanket all the way up to her chin, and refuses to go back to her room alone unless you hold her.',
    statEffects: { fear: 36, horror: 34, warmthLevel: 15, likeness: 10, tiredness: -10 }
  },
  {
    id: 'mov-hor-midnight-mirror',
    title: 'The Mirror at 2:15 AM',
    category: 'horror',
    categoryLabel: 'Scary & Horror',
    rating: 'Simple',
    duration: '1h 38m',
    accent: '#7e22ce',
    plot: 'A tense psychological horror film where reflections in bedroom mirrors start moving on their own late at night.',
    ridaReaction: 'Rida glances nervously toward her wardrobe mirror and presses her side tightly against yours so she doesn\'t feel alone.',
    statEffects: { fear: 34, horror: 30, warmthLevel: 12, trustLevel: 6 }
  },
  {
    id: 'mov-hor-silent-stairs',
    title: 'Don\'t Breathe Upstairs',
    category: 'horror',
    categoryLabel: 'Scary & Horror',
    rating: 'Simple',
    duration: '1h 44m',
    accent: '#a855f7',
    plot: 'A nail-biting thriller where characters hiding on the top floor must stay dead silent in the dark to survive.',
    ridaReaction: 'Her heart races so fast you can feel it against your arm as she holds her breath during the tense scenes.',
    statEffects: { fear: 32, horror: 28, blushLevel: 10, warmthLevel: 14 }
  },

  // ==================== 4. SAD & EMOTIONAL ====================
  {
    id: 'mov-sad-silent-voice',
    title: 'A Silent Voice: Until We Meet Again',
    category: 'sad',
    categoryLabel: 'Sad & Emotional',
    rating: 'Simple',
    duration: '2h 10m',
    accent: '#60a5fa',
    plot: 'A deeply moving, heartbreaking story about loneliness, unspoken pain, forgiveness, and holding someone as they cry until their heart heals.',
    ridaReaction: 'Rida\'s brown eyes fill with tears during the emotional climax; she sniffles softly, tries to wipe her cheek with her sleeve, and leans into your chest needing a gentle hug.',
    statEffects: { sadness: 36, warmthLevel: 18, likeness: 12, trustLevel: 10, anger: -16, happiness: -10 }
  },
  {
    id: 'mov-sad-five-feet-apart',
    title: 'Five Feet Apart',
    category: 'sad',
    categoryLabel: 'Sad & Emotional',
    rating: 'Simple',
    duration: '1h 56m',
    accent: '#3b82f6',
    plot: 'A tearjerker romance about two young lovers who would give anything just to touch and hold each other without fear.',
    ridaReaction: 'A quiet tear rolls down Rida\'s cheek; she holds onto your hand tightly, grateful that she can actually touch and be close to you.',
    statEffects: { sadness: 34, likeness: 15, warmthLevel: 20, trustLevel: 10, blushLevel: 12, happiness: -8 }
  },
  {
    id: 'mov-sad-miracle-cell',
    title: 'Miracle in Cell No. 7',
    category: 'sad',
    categoryLabel: 'Sad & Emotional',
    rating: 'Simple',
    duration: '2h 07m',
    accent: '#2563eb',
    plot: 'An emotional family drama about unconditional love and a heartbreaking farewell that leaves everyone in tears.',
    ridaReaction: 'She buries her face in your shoulder crying quietly, asking you to hold her until the sad part is over.',
    statEffects: { sadness: 40, warmthLevel: 18, trustLevel: 12, likeness: 10, anger: -18, happiness: -14 }
  },
  {
    id: 'mov-sad-last-train',
    title: 'Last Train in the Winter Rain',
    category: 'sad',
    categoryLabel: 'Sad & Emotional',
    rating: 'Simple',
    duration: '1h 50m',
    accent: '#60a5fa',
    plot: 'A bittersweet story about two cousins who grew up together and the painful night one of them almost had to move far away.',
    ridaReaction: 'Rida looks up at you with glossy, vulnerable eyes and whispers that she never wants you to go far away from her.',
    statEffects: { sadness: 32, likeness: 16, trustLevel: 14, warmthLevel: 20, blushLevel: 14 }
  },

  // ==================== 5. HAPPY & COMEDY ====================
  {
    id: 'mov-hap-crazy-weekend',
    title: 'Crazy Rich Weekend Escape',
    category: 'happy',
    categoryLabel: 'Happy & Comedy',
    rating: 'Simple',
    duration: '2h 00m',
    accent: '#34d399',
    plot: 'A bright, hilarious romantic comedy packed with funny misunderstandings, luxury dessert buffets, playful banter, and feel-good energy.',
    ridaReaction: 'Rida laughs brightly, covering her mouth with both hands so your parents downstairs don\'t hear her giggling, her eyes shining with pure happiness.',
    statEffects: { happiness: 28, likeness: 12, warmthLevel: 14, sadness: -24, anger: -22, fear: -18 }
  },
  {
    id: 'mov-hap-midnight-pranks',
    title: 'Game Night: Midnight Chaos',
    category: 'happy',
    categoryLabel: 'Happy & Comedy',
    rating: 'Simple',
    duration: '1h 42m',
    accent: '#10b981',
    plot: 'A non-stop comedy about a group of friends whose simple game night turns into a ridiculously funny series of bloopers and dares.',
    ridaReaction: 'She giggles uncontrollably against your shoulder, playfully nudging your arm and teasing you about the funny scenes.',
    statEffects: { happiness: 30, likeness: 10, trustLevel: 8, sadness: -26, anger: -24, fear: -20 }
  },
  {
    id: 'mov-hap-sweet-bakeoff',
    title: 'The Grand Chocolate Bake-Off',
    category: 'happy',
    categoryLabel: 'Happy & Comedy',
    rating: 'Simple',
    duration: '1h 36m',
    accent: '#fbbf24',
    plot: 'A cheerful, lighthearted comedy competition where bakers try to build giant chocolate fountains with hilarious kitchen fails.',
    ridaReaction: 'Rida is beaming with a huge smile, laughing at the chocolate disasters and playfully asking if you\'ll share snacks with her.',
    statEffects: { happiness: 26, likeness: 12, hunger: 14, sadness: -20, anger: -20 }
  },
  {
    id: 'mov-hap-campus-vacation',
    title: 'Summer Roadtrip Bloopers',
    category: 'happy',
    categoryLabel: 'Happy & Comedy',
    rating: 'Simple',
    duration: '1h 48m',
    accent: '#34d399',
    plot: 'An upbeat, sunny comedy full of witty jokes, music, and carefree fun that instantly lifts anyone\'s mood.',
    ridaReaction: 'Her whole mood brightens up immediately; she smiles warmly, talks playfully, and forgets any annoyance or sadness.',
    statEffects: { happiness: 28, likeness: 10, warmthLevel: 12, sadness: -25, anger: -25 }
  },

  // ==================== 6. COZY & LATE-NIGHT VIBES ====================
  {
    id: 'mov-coz-your-name',
    title: 'Your Name (Starlit Sky)',
    category: 'cozy',
    categoryLabel: 'Cozy & Late-Night',
    rating: 'Simple',
    duration: '1h 46m',
    accent: '#818cf8',
    plot: 'A breathtaking animated romance with glowing comets across the night sky, soft piano music, and two connected hearts searching for each other.',
    ridaReaction: 'Rida watches the glowing sky reflected in her brown eyes, resting her cheek comfortably on your shoulder in quiet awe.',
    statEffects: { happiness: 18, likeness: 14, warmthLevel: 20, blushLevel: 14, tiredness: 8, sadness: -12, anger: -14 }
  },
  {
    id: 'mov-coz-rainy-tokyo',
    title: 'Rainy Midnight Lo-Fi Cinema',
    category: 'cozy',
    categoryLabel: 'Cozy & Late-Night',
    rating: 'Simple',
    duration: '1h 25m',
    accent: '#6366f1',
    plot: 'A soothing late-night atmospheric film with gentle rain on windowpanes, warm amber streetlamps, and soft acoustic melodies.',
    ridaReaction: 'The cozy atmosphere makes Rida feel deeply relaxed, warm, and slightly sleepy as she curls up close under the blanket with you.',
    statEffects: { warmthLevel: 22, tiredness: 18, happiness: 14, pain: -12, anger: -18, fear: -18 }
  },
  {
    id: 'mov-coz-spirited-night',
    title: 'Spirited Away: Lanterns at Dusk',
    category: 'cozy',
    categoryLabel: 'Cozy & Late-Night',
    rating: 'Simple',
    duration: '2h 05m',
    accent: '#a78bfa',
    plot: 'An enchanting fantasy adventure filled with glowing red lanterns, magical train rides over water, and comforting midnight feasts.',
    ridaReaction: 'She curls her legs up on the bed beside you, sharing one earphone and whispering happily about her favorite scenes.',
    statEffects: { happiness: 20, likeness: 12, warmthLevel: 18, trustLevel: 10, sadness: -15 }
  },
  {
    id: 'mov-coz-starlight-planetarium',
    title: 'Private Bedroom Planetarium',
    category: 'cozy',
    categoryLabel: 'Cozy & Late-Night',
    rating: 'Simple',
    duration: '1h 15m',
    accent: '#38bdf8',
    plot: 'A calm, dreamy visual projection of constellations and nebulae accompanied by soft whispered narration for late-night cuddling.',
    ridaReaction: 'Rida\'s eyelids grow heavy in the soft blue glow as she nestles into your side and holds your hand.',
    statEffects: { warmthLevel: 20, tiredness: 20, happiness: 14, likeness: 12, pain: -10, fear: -15 }
  }
];

const DEFAULT_PHONE_GALLERY = [
  {
    id: 'gal-init-1',
    title: 'Late-Night Bedroom Mirror Selfie',
    caption: 'Couldn\'t sleep so I took this quietly... are you still awake next door?',
    description: 'Soft mirror snapshot in Rida\'s top-floor bedroom: warm amber desk lamp glow, her long dark hair falling loose past her shoulders, wearing her oversized soft grey t-shirt and cotton shorts with a shy smile.',
    location: 'Top Floor — Rida\'s Room',
    outfit: 'Oversized soft grey t-shirt & cotton shorts',
    mood: 'Shy & Affectionate',
    rating: 'Simple',
    accent: '#818cf8',
    timestamp: '10:45 PM'
  },
  {
    id: 'gal-init-2',
    title: 'Secret Chocolate Stash Candid',
    caption: 'Look what I was saving in my desk drawer... don\'t steal all of it!',
    description: 'Close-up selfie at her study desk: Rida holding a square of milk chocolate near her lips, her warm brown eyes crinkling playfully with a soft pink blush on her cheeks.',
    location: 'Top Floor — Rida\'s Study Desk',
    outfit: 'Pastel pink knit hoodie',
    mood: 'Happy & Playful',
    rating: 'Simple',
    accent: '#34d399',
    timestamp: '6:20 PM'
  },
  {
    id: 'gal-init-3',
    title: 'Fresh After-Shower Mirror Snapshot',
    caption: 'Just finished my shower upstairs... my hair is still super wet.',
    description: 'Steamy bathroom mirror snapshot: damp dark strands clinging softly to her neck and collarbone, cheeks flushed warm pink from the hot water, wrapped in a cozy lounge top.',
    location: 'Top Floor — Shared Bathroom',
    outfit: 'Damp hair & soft off-shoulder lounge top',
    mood: 'Flustered & Warm',
    rating: 'Flirty',
    accent: '#f472b6',
    timestamp: '9:15 PM'
  },
  {
    id: 'gal-init-4',
    title: 'Sweet Shop & Mall Outing Selfie',
    caption: 'Best iced chocolate at the mall cafe with you today.',
    description: 'Bright candid snapshot at the cafe table: Rida holding her iced chocolate drink with both hands, sunlight catching her dark hair and warm smile.',
    location: 'Outside — Market & Mall Cafe',
    outfit: 'Cream pleated skirt & fitted cardigan',
    mood: 'Bright & Cheerful',
    rating: 'Simple',
    accent: '#fbbf24',
    timestamp: '4:10 PM'
  },
  {
    id: 'gal-init-5',
    title: 'Cozy Under-the-Blanket Late Night Pic',
    caption: 'It\'s getting chilly in my room... wish you were here talking to me.',
    description: 'Dimly lit pillow selfie: Rida lying on her side with her soft blanket pulled up to her chin, looking directly into the camera lens with sleepy, affectionate brown eyes.',
    location: 'Top Floor — Rida\'s Bed',
    outfit: 'Soft cotton sleep shirt',
    mood: 'Sleepy & Cozy',
    rating: 'Simple',
    accent: '#60a5fa',
    timestamp: '11:50 PM'
  },
  {
    id: 'gal-init-6',
    title: 'Private Locked-Door Silk & Lace Snapshot',
    caption: 'Delete this after you look... I only took this for you, Adeel.',
    description: 'Private late-night snapshot taken with her bedroom door locked: Rida sitting on the edge of her bed in her hidden midnight-black sheer lace bralette, a deep crimson blush across her cheeks and chest as she bites her lower lip shyly.',
    location: 'Top Floor — Rida\'s Locked Room',
    outfit: 'Midnight Black Sheer Lace Bralette Set',
    mood: 'Deeply Flustered & Turned On',
    rating: '18+',
    accent: '#fb7185',
    timestamp: '12:30 AM'
  }
];

function generateDynamicPhotoSnapshot(userInput, state) {
  const lower = (userInput || '').toLowerCase();
  const r = state.rida || {};
  const timeStr = state.worldTime?.formattedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const outfit = r.outfit || r.wearing || 'Oversized soft grey t-shirt and cotton shorts';
  const loc = r.locationLabel || 'Top Floor — Rida\'s Room';

  const is18Request = /\b(18\+|lingerie|bra|panties|lace|hot|sexy|private|secret|body|bed|naked|undress|cleavage|thighs|wet|naughty)\b/i.test(lower) || r.lust >= 50 || r.wetness >= 50;

  if (r.anger >= 40) {
    return {
      id: 'gal-' + Date.now(),
      title: 'Pouty & Annoyed Selfie',
      caption: 'You asked for a photo while I\'m still mad at you... hmph.',
      description: `Snapshot in ${loc}: Rida looking away from the camera with her arms crossed in her ${outfit}, a cute stubborn pout on her lips and a faint flush on her cheeks.`,
      location: loc,
      outfit,
      mood: r.mood || 'Annoyed & Guarded',
      rating: 'Simple',
      accent: '#f87171',
      timestamp: timeStr
    };
  }

  if (r.fear >= 40 || r.horror >= 40) {
    return {
      id: 'gal-' + Date.now(),
      title: 'Startled Late-Night Snapshot',
      caption: 'Adeel look—my room is so dark right now, come here fast!',
      description: `Dimly lit snapshot in ${loc}: Rida holding the phone close with wide, startled brown eyes, clutching her blanket around her shoulders in her ${outfit}.`,
      location: loc,
      outfit,
      mood: r.mood || 'Scared & Seeking Safety',
      rating: 'Simple',
      accent: '#c084fc',
      timestamp: timeStr
    };
  }

  if (is18Request) {
    return {
      id: 'gal-' + Date.now(),
      title: 'Private Flushed Bedroom Snapshot (18+)',
      caption: 'My heart was beating so fast taking this for you... keep it private, okay?',
      description: `Intimate close-up mirror snapshot in ${loc}: Rida in ${outfit}, the collar slipped off one warm shoulder, her skin flushed a deep rose pink with breathless, dark brown eyes looking straight at you through the lens.`,
      location: loc,
      outfit,
      mood: r.mood || 'Breathless & Deeply Flustered',
      rating: '18+',
      accent: '#fb7185',
      timestamp: timeStr
    };
  }

  if (r.happiness >= 70) {
    return {
      id: 'gal-' + Date.now(),
      title: 'Bright Smiling Selfie for Adeel',
      caption: 'Took this right now just to make you smile!',
      description: `Warm, sunlit/lamp-lit selfie in ${loc}: Rida wearing ${outfit}, her long dark hair tucked behind one ear and a bright, affectionate smile lighting up her face.`,
      location: loc,
      outfit,
      mood: r.mood || 'Happy & Playful',
      rating: 'Simple',
      accent: '#34d399',
      timestamp: timeStr
    };
  }

  return {
    id: 'gal-' + Date.now(),
    title: 'Shy Upstairs Mirror Snapshot',
    caption: 'Here... I took this right now in my room for you.',
    description: `Soft mirror snapshot in ${loc}: Rida in her ${outfit}, long dark hair loose over her shoulders, warm brown eyes meeting the lens with a shy pink blush (${r.blushLevel || 28}% blush).`,
    location: loc,
    outfit,
    mood: r.mood || 'Soft & Shy',
    rating: r.blushLevel >= 50 ? 'Flirty' : 'Simple',
    accent: '#f472b6',
    timestamp: timeStr
  };
}

module.exports = {
  MOVIE_CATEGORIES,
  DEFAULT_MOVIES_CATALOG,
  DEFAULT_PHONE_GALLERY,
  generateDynamicPhotoSnapshot
};
