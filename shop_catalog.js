// ============================================================================
// RIDA & ADEEL — 134-ITEM REALISTIC SHOP & INVENTORY CATALOG
// Categories: food, clothes, medicine, care, intimate_18_med (18+), adult_toys_18 (18+)
// ============================================================================

const SHOP_CATEGORIES = [
  { id: 'all', name: 'All Items (134)', rating: 'mix' },
  { id: 'food', name: 'Food, Chocolates & Drinks', rating: 'Simple' },
  { id: 'clothes', name: 'Clothes, Sleepwear & Style', rating: 'Simple' },
  { id: 'medicine', name: 'Medicines & Health Pharmacy', rating: 'Simple' },
  { id: 'care', name: 'Skincare, Perfume & Care', rating: 'Simple' },
  { id: 'intimate_18_med', name: '18+ Condoms, Drugs & Enhancers', rating: '18+' },
  { id: 'adult_toys_18', name: '18+ Toys, Lingerie & Bedroom', rating: '18+' }
];

const SHOP_CATALOG = [
  // ==================== 1. FOOD, CHOCOLATES & DRINKS (22 ITEMS) ====================
  {
    id: 'food-milk-choc',
    name: 'Milk Chocolate Bar',
    category: 'food',
    price: 3,
    rating: 'Simple',
    purpose: 'Rida\'s #1 favorite everyday comfort treat. Melts softly and instantly boosts her happiness, likeness, and warmth while reducing hunger.',
    howToUse: 'Unwrap and eat directly, or break off a square to feed Rida by hand in her room.',
    statEffects: { hunger: -18, happiness: 14, likeness: 8, warmthLevel: 8, sadness: -10 }
  },
  {
    id: 'food-truffle-box',
    name: 'Luxury Dark & Milk Truffle Box',
    category: 'food',
    price: 12,
    rating: 'Simple',
    purpose: 'Rich box of 12 melting chocolate truffles. Makes Rida blush with appreciation and associate the slow melting taste with soft pleasure.',
    howToUse: 'Open the ribbon box together on her bed and share piece by piece late at night.',
    statEffects: { hunger: -22, happiness: 20, likeness: 14, blushLevel: 10, warmthLevel: 12, pleasure: 6 }
  },
  {
    id: 'food-fudge-brownie',
    name: 'Warm Chocolate Fudge Brownie',
    category: 'food',
    price: 5,
    rating: 'Simple',
    purpose: 'Soft bakery brownie with melted chocolate center that satisfies sweet cravings and lifts mood after studying.',
    howToUse: 'Warm slightly in the kitchen or eat straight from the bakery box with a fork.',
    statEffects: { hunger: -25, happiness: 15, likeness: 7, warmthLevel: 9 }
  },
  {
    id: 'food-choc-icecream',
    name: 'Belgian Chocolate Ice Cream Tub',
    category: 'food',
    price: 6,
    rating: 'Simple',
    purpose: 'Cold, creamy chocolate dessert for late-night sharing upstairs or cooling down on a warm afternoon.',
    howToUse: 'Eat with two spoons straight from the tub before it melts.',
    statEffects: { hunger: -20, happiness: 16, likeness: 8, hotness: -5, pleasure: 5 }
  },
  {
    id: 'food-strawberry-shake',
    name: 'Chilled Strawberry Milkshake',
    category: 'food',
    price: 4,
    rating: 'Simple',
    purpose: 'Sweet pink milkshake topped with whipped cream. Refreshing and cute treat during market outings.',
    howToUse: 'Sip through the straw while walking outside or share a sip with Rida.',
    statEffects: { hunger: -16, happiness: 12, likeness: 6 }
  },
  {
    id: 'food-caramel-latte',
    name: 'Iced Caramel Macchiato',
    category: 'food',
    price: 5,
    rating: 'Simple',
    purpose: 'Sweet espresso drink with caramel drizzle that reduces tiredness and keeps Rida awake during late-night talks.',
    howToUse: 'Stir the caramel layer and drink chilled to boost energy and lower sleepiness.',
    statEffects: { hunger: -10, tiredness: -22, happiness: 10 }
  },
  {
    id: 'food-spicy-noodles',
    name: 'Late-Night Spicy Ramen Cup',
    category: 'food',
    price: 3,
    rating: 'Simple',
    purpose: 'Hot, savory noodle cup ideal for quiet midnight kitchen trips when everyone else is asleep.',
    howToUse: 'Add hot water in the ground-floor kitchen, wait 3 minutes, and bring upstairs quietly.',
    statEffects: { hunger: -35, happiness: 10, warmthLevel: 10 }
  },
  {
    id: 'food-chips-dip',
    name: 'Crispy Potato Chips & Cream Dip',
    category: 'food',
    price: 4,
    rating: 'Simple',
    purpose: 'Crunchy salty snack for movie nights or sitting together on the floor in Adeel\'s room.',
    howToUse: 'Open the bag and share while watching videos on one phone.',
    statEffects: { hunger: -20, happiness: 8 }
  },
  {
    id: 'food-pizza-slice',
    name: 'Hot Cheesy Pizza Box (Medium)',
    category: 'food',
    price: 11,
    rating: 'Simple',
    purpose: 'Full meal that completely satisfies hunger and turns an evening in her room into a private hangout.',
    howToUse: 'Share slices hot from the box upstairs.',
    statEffects: { hunger: -55, happiness: 16, likeness: 9, tiredness: -5 }
  },
  {
    id: 'food-chicken-roll',
    name: 'Crispy Mayo Chicken Paratha Roll',
    category: 'food',
    price: 4,
    rating: 'Simple',
    purpose: 'Popular street-food wrap from the local market that fills the stomach quickly.',
    howToUse: 'Unwrap the foil paper and eat warm while fresh.',
    statEffects: { hunger: -40, happiness: 11 }
  },
  {
    id: 'food-fruit-bowl',
    name: 'Fresh Sliced Strawberries & Mango Bowl',
    category: 'food',
    price: 6,
    rating: 'Simple',
    purpose: 'Sweet, healthy fruit bowl that refreshes energy and pairs perfectly with melted chocolate.',
    howToUse: 'Eat chilled with a fork or feed a strawberry to Rida.',
    statEffects: { hunger: -22, happiness: 12, tiredness: -8, likeness: 6 }
  },
  {
    id: 'food-energy-drink',
    name: 'Berry Spark Energy Drink',
    category: 'food',
    price: 3,
    rating: 'Simple',
    purpose: 'Quickly clears fatigue and sleepiness when staying awake past midnight.',
    howToUse: 'Pop the cold can tab and drink to cut tiredness.',
    statEffects: { tiredness: -30, hunger: -5, happiness: 6 }
  },
  {
    id: 'food-sweet-lassi',
    name: 'Chilled Sweet Rose Lassi',
    category: 'food',
    price: 3,
    rating: 'Simple',
    purpose: 'Traditional soothing yogurt drink that calms the stomach and cools body heat.',
    howToUse: 'Drink cold with a straw.',
    statEffects: { hunger: -18, happiness: 9, anger: -8 }
  },
  {
    id: 'food-red-velvet',
    name: 'Red Velvet Cream Cheese Cupcake',
    category: 'food',
    price: 4,
    rating: 'Simple',
    purpose: 'Soft, romantic bakery cupcake that Rida loves getting as a surprise gift.',
    howToUse: 'Peel the wrapper and take a soft bite—often leaves a tiny bit of frosting on the lips.',
    statEffects: { hunger: -16, happiness: 15, likeness: 9, blushLevel: 6 }
  },
  {
    id: 'food-white-choc-almonds',
    name: 'White Chocolate Coated Almonds',
    category: 'food',
    price: 7,
    rating: 'Simple',
    purpose: 'Crunchy roasted almonds dipped in creamy white chocolate; easy to stash in her desk drawer.',
    howToUse: 'Keep in the resealable pouch for study breaks.',
    statEffects: { hunger: -18, happiness: 13, likeness: 7 }
  },
  {
    id: 'food-boba-tea',
    name: 'Brown Sugar Pearl Boba Milk Tea',
    category: 'food',
    price: 5,
    rating: 'Simple',
    purpose: 'Trendy sweet milk tea with chewy tapioca pearls that Rida and her friend Aisha love ordering.',
    howToUse: 'Poke the wide straw through the sealed lid and shake well before sipping.',
    statEffects: { hunger: -20, happiness: 15, likeness: 8 }
  },
  {
    id: 'food-popcorn',
    name: 'Caramel & Butter Movie Popcorn',
    category: 'food',
    price: 3,
    rating: 'Simple',
    purpose: 'Light snack for late-night movies where hands accidentally brush inside the bowl.',
    howToUse: 'Place the bowl between you two on the bed while watching a show.',
    statEffects: { hunger: -15, happiness: 10, warmthLevel: 6 }
  },
  {
    id: 'food-honey-lozenges',
    name: 'Honey & Lemon Soothing Lozenges',
    category: 'food',
    price: 3,
    rating: 'Simple',
    purpose: 'Soothes dry throat and mild discomfort.',
    howToUse: 'Dissolve one lozenge slowly in the mouth.',
    statEffects: { pain: -8, hunger: -4, happiness: 4 }
  },
  {
    id: 'food-belgian-waffle',
    name: 'Nutella & Strawberry Belgian Waffle',
    category: 'food',
    price: 6,
    rating: 'Simple',
    purpose: 'Warm crispy waffle drizzled with hazelnut chocolate spread—one of Rida\'s favorite sweet-shop treats.',
    howToUse: 'Cut into bite-sized pieces and eat warm.',
    statEffects: { hunger: -30, happiness: 18, likeness: 10, warmthLevel: 8 }
  },
  {
    id: 'food-mint-gum',
    name: 'Fresh Peppermint Breath Mints',
    category: 'food',
    price: 2,
    rating: 'Simple',
    purpose: 'Freshens breath before close doorway conversations or whispered moments.',
    howToUse: 'Take a mint before stepping close to talk.',
    statEffects: { happiness: 5, blushLevel: 4 }
  },
  {
    id: 'food-hot-cocoa',
    name: 'Rich Swiss Hot Chocolate Mug Mix',
    category: 'food',
    price: 5,
    rating: 'Simple',
    purpose: 'Creates a steaming mug of creamy hot cocoa that warms Rida up and makes her feel safe and cared for.',
    howToUse: 'Stir into warm milk in the kitchen and bring two mugs upstairs.',
    statEffects: { hunger: -16, warmthLevel: 18, happiness: 14, trustLevel: 8, sadness: -12 }
  },
  {
    id: 'food-macarons',
    name: 'Pastel Gift Box of French Macarons',
    category: 'food',
    price: 10,
    rating: 'Simple',
    purpose: 'Delicate, pretty almond-meringue cookies in rose, vanilla, and chocolate flavors.',
    howToUse: 'Present as a sweet gift to make Rida smile and feel special.',
    statEffects: { hunger: -15, happiness: 17, likeness: 12, blushLevel: 8 }
  },

  // ==================== 2. CLOTHES, SLEEPWEAR & ACCESSORIES (20 ITEMS) ====================
  {
    id: 'cloth-oversized-tee',
    name: 'Soft Oversized Charcoal T-Shirt',
    category: 'clothes',
    price: 18,
    rating: 'Simple',
    purpose: 'Rida\'s signature comfortable upstairs top—hangs loosely off one shoulder and feels extra cozy.',
    howToUse: 'Wear around the top floor or for sleeping comfortably.',
    statEffects: { warmthLevel: 12, happiness: 10, tiredness: -5, blushLevel: 6 }
  },
  {
    id: 'cloth-cotton-shorts',
    name: 'Soft Lounge Cotton Shorts',
    category: 'clothes',
    price: 14,
    rating: 'Simple',
    purpose: 'Short, breathable cotton loungewear she wears in her bedroom when relaxing alone.',
    howToUse: 'Pair with an oversized t-shirt upstairs; makes her slightly shy when seen in the hallway.',
    statEffects: { happiness: 9, blushLevel: 10, hotness: 8, warmthLevel: 8 }
  },
  {
    id: 'cloth-pastel-hoodie',
    name: 'Cozy Lavender Oversized Hoodie',
    category: 'clothes',
    price: 28,
    rating: 'Simple',
    purpose: 'Warm, plush hoodie she loves wrapping herself in when chilly or shy.',
    howToUse: 'Pull on over a t-shirt and tuck hands into the front pocket.',
    statEffects: { warmthLevel: 18, happiness: 14, likeness: 9, fear: -8 }
  },
  {
    id: 'cloth-silk-nightgown',
    name: 'Blush Pink Satin Slip Nightgown',
    category: 'clothes',
    price: 35,
    rating: 'Simple',
    purpose: 'Smooth, figure-skimming satin nightdress that feels cool against her skin and looks effortlessly pretty.',
    howToUse: 'Put on in her bedroom late at night after a shower.',
    statEffects: { blushLevel: 16, hotness: 16, lust: 10, pleasure: 8, happiness: 12 }
  },
  {
    id: 'cloth-pleated-skirt',
    name: 'High-Waist Pleated Mini Skirt',
    category: 'clothes',
    price: 24,
    rating: 'Simple',
    purpose: 'Cute, flattering skirt that highlights her narrow waist and shapely legs.',
    howToUse: 'Try on in front of her bedroom mirror or wear for a special outing.',
    statEffects: { happiness: 12, blushLevel: 12, hotness: 14, likeness: 8 }
  },
  {
    id: 'cloth-offshoulder-top',
    name: 'Soft Off-Shoulder Ribbed Knit Top',
    category: 'clothes',
    price: 26,
    rating: 'Simple',
    purpose: 'Shows her collarbones and neck subtly—makes her self-conscious in a cute way when Adeel notices.',
    howToUse: 'Wear for an afternoon outing or upstairs hangout.',
    statEffects: { happiness: 12, blushLevel: 14, hotness: 12, likeness: 9 }
  },
  {
    id: 'cloth-silver-anklet',
    name: 'Delicate Silver Bell Anklet',
    category: 'clothes',
    price: 22,
    rating: 'Simple',
    purpose: 'Fine silver chain that rests around her ankle and gives a faint, soft chime when she walks barefoot upstairs.',
    howToUse: 'Clasp gently around her ankle as a personal gift.',
    statEffects: { happiness: 16, likeness: 15, blushLevel: 14, warmthLevel: 12 }
  },
  {
    id: 'cloth-phone-case',
    name: 'Pastel Lilac Clear Phone Case',
    category: 'clothes',
    price: 10,
    rating: 'Simple',
    purpose: 'Protects her phone and has a snug back pocket where Rida likes tucking her spare cash bills.',
    howToUse: 'Snap onto her phone and slip spare $ bills inside the back cover.',
    statEffects: { happiness: 10, likeness: 6 }
  },
  {
    id: 'cloth-hair-ribbons',
    name: 'Satin Hair Ribbons & Pearl Clips',
    category: 'clothes',
    price: 7,
    rating: 'Simple',
    purpose: 'Keeps her long dark hair styled neatly or tied back softly past her shoulders.',
    howToUse: 'Clip into her hair or let Adeel help fasten it behind her ear.',
    statEffects: { happiness: 10, likeness: 8, blushLevel: 8 }
  },
  {
    id: 'cloth-ribbed-tank',
    name: 'Fitted White Ribbed Tank Top',
    category: 'clothes',
    price: 16,
    rating: 'Simple',
    purpose: 'Snug cotton tank top that hugs her natural hourglass figure under a cardigan or alone in her room.',
    howToUse: 'Wear in her private room on warm evenings.',
    statEffects: { hotness: 14, blushLevel: 12, happiness: 8 }
  },
  {
    id: 'cloth-sheer-kimono',
    name: 'Sheer Chiffon Lounge Robe',
    category: 'clothes',
    price: 32,
    rating: '18+',
    purpose: 'Light, semi-sheer bedroom robe worn over sleepwear or lingerie when alone late at night.',
    howToUse: 'Tie loosely around the waist after stepping out of the shared upstairs bathroom.',
    statEffects: { blushLevel: 18, hotness: 18, lust: 12, warmthLevel: 10 }
  },
  {
    id: 'cloth-cropped-pajamas',
    name: 'Soft Baby-Blue Cropped Pajama Set',
    category: 'clothes',
    price: 22,
    rating: 'Simple',
    purpose: 'Cute two-piece sleepwear set that shows a hint of her toned stomach when she stretches.',
    howToUse: 'Change into before bed.',
    statEffects: { happiness: 12, warmthLevel: 12, hotness: 10, blushLevel: 10 }
  },
  {
    id: 'cloth-knee-socks',
    name: 'Soft Cream Knee-High Socks',
    category: 'clothes',
    price: 9,
    rating: 'Simple',
    purpose: 'Cozy long socks that keep her feet warm and look adorable with oversized shirts.',
    howToUse: 'Pull up to the knees while lounging on the bed.',
    statEffects: { warmthLevel: 14, happiness: 9, blushLevel: 6 }
  },
  {
    id: 'cloth-pendant-necklace',
    name: 'Rose Gold Heart Pendant Necklace',
    category: 'clothes',
    price: 30,
    rating: 'Simple',
    purpose: 'Meaningful jewelry piece that rests right above her collarbone; she touches it whenever she thinks of the giver.',
    howToUse: 'Stand behind her and fasten the clasp around her neck.',
    statEffects: { likeness: 20, trustLevel: 14, happiness: 18, blushLevel: 16, warmthLevel: 15 }
  },
  {
    id: 'cloth-floral-sundress',
    name: 'Soft Cream Floral Sundress',
    category: 'clothes',
    price: 34,
    rating: 'Simple',
    purpose: 'Pretty, feminine dress for going out to the mall or sweet shop together.',
    howToUse: 'Wear on a sunny afternoon outing.',
    statEffects: { happiness: 16, likeness: 12, hotness: 12, blushLevel: 10 }
  },
  {
    id: 'cloth-yoga-leggings',
    name: 'High-Waist Sculpt Lounge Leggings',
    category: 'clothes',
    price: 25,
    rating: 'Simple',
    purpose: 'Stretchy, form-fitting leggings that accentuate her rounded hips and thighs.',
    howToUse: 'Wear for stretching in her room or casual walks.',
    statEffects: { hotness: 15, blushLevel: 11, happiness: 9 }
  },
  {
    id: 'cloth-lace-camisole',
    name: 'Delicate Lace-Trim Silk Camisole',
    category: 'clothes',
    price: 20,
    rating: 'Simple',
    purpose: 'Soft camisole top with floral lace along the neckline.',
    howToUse: 'Wear as a bedroom top or layered under a jacket.',
    statEffects: { hotness: 12, blushLevel: 11, happiness: 10 }
  },
  {
    id: 'cloth-cashmere-scarf',
    name: 'Plush Cashmere Wrap Shawl',
    category: 'clothes',
    price: 24,
    rating: 'Simple',
    purpose: 'Ultra-soft wrap that keeps her shoulders warm and modest when going downstairs.',
    howToUse: 'Drape over shoulders.',
    statEffects: { warmthLevel: 16, happiness: 10, trustLevel: 6 }
  },
  {
    id: 'cloth-fluffy-slippers',
    name: 'Silent Plush Bunny House Slippers',
    category: 'clothes',
    price: 15,
    rating: 'Simple',
    purpose: 'Cushioned slippers that make footsteps in the upstairs hallway completely silent late at night.',
    howToUse: 'Slip on when walking between rooms so nobody downstairs hears footsteps.',
    statEffects: { happiness: 11, warmthLevel: 10, fear: -6 }
  },
  {
    id: 'cloth-mini-purse',
    name: 'Quilted Crossbody Mini Purse',
    category: 'clothes',
    price: 45,
    rating: 'Simple',
    purpose: 'Stylish small purse where Rida keeps her main wallet, lip balm, and phone when going out.',
    howToUse: 'Carry over the shoulder during shopping trips.',
    statEffects: { happiness: 18, likeness: 14 }
  },

  // ==================== 3. MEDICINES & HEALTH PHARMACY (16 ITEMS) ====================
  {
    id: 'med-paracetamol',
    name: 'Paracetamol Rapid Pain Relief (10 Tabs)',
    category: 'medicine',
    price: 4,
    rating: 'Simple',
    purpose: 'Relieves headaches, mild fever, and general body ache quickly.',
    howToUse: 'Take 1–2 tablets with a glass of water.',
    statEffects: { pain: -35, tiredness: -8, happiness: 6, trustLevel: 6 }
  },
  {
    id: 'med-ibuprofen',
    name: 'Ibuprofen Cramp & Migraine Relief',
    category: 'medicine',
    price: 6,
    rating: 'Simple',
    purpose: 'Stronger anti-inflammatory relief for menstrual cramps, backache, or throbbing headaches.',
    howToUse: 'Take 1 tablet after a snack with water.',
    statEffects: { pain: -45, sadness: -10, happiness: 8, trustLevel: 8 }
  },
  {
    id: 'med-heating-patch',
    name: 'Self-Warming Period Cramp Comfort Patch',
    category: 'medicine',
    price: 8,
    rating: 'Simple',
    purpose: 'Provides 8 hours of gentle soothing heat on the lower stomach to melt away cramps and tension.',
    howToUse: 'Peel backing and adhere over lower stomach or undershirt while resting under a blanket.',
    statEffects: { pain: -40, warmthLevel: 20, happiness: 14, likeness: 12, trustLevel: 12 }
  },
  {
    id: 'med-melatonin',
    name: 'Berry Melatonin Sleep Gummies',
    category: 'medicine',
    price: 12,
    rating: 'Simple',
    purpose: 'Helps Rida fall into a deep, peaceful sleep when she\'s been lying awake overthinking late at night.',
    howToUse: 'Chew 1 gummy 30 minutes before bedtime.',
    statEffects: { tiredness: 25, fear: -15, sadness: -12, pain: -10, warmthLevel: 10 }
  },
  {
    id: 'med-vitamin-c',
    name: 'Vitamin C & Skin Glow Chewables',
    category: 'medicine',
    price: 10,
    rating: 'Simple',
    purpose: 'Daily immunity and skin-brightening supplement.',
    howToUse: 'Chew 1 orange-flavored tablet daily.',
    statEffects: { tiredness: -10, happiness: 8, pain: -5 }
  },
  {
    id: 'med-allergy-pills',
    name: 'Non-Drowsy Allergy & Sinus Relief',
    category: 'medicine',
    price: 7,
    rating: 'Simple',
    purpose: 'Clears sneezing, dust allergies, or watery eyes.',
    howToUse: 'Take 1 small tablet with water.',
    statEffects: { pain: -20, happiness: 6 }
  },
  {
    id: 'med-muscle-gel',
    name: 'Soothing Menthol & Arnica Muscle Rub',
    category: 'medicine',
    price: 9,
    rating: 'Simple',
    purpose: 'Relieves sore shoulders, neck stiffness, or tired legs—often requires someone to help rub it into the shoulders.',
    howToUse: 'Massage gently into sore neck, shoulders, or lower back.',
    statEffects: { pain: -35, tiredness: -15, warmthLevel: 14, blushLevel: 12, pleasure: 8 }
  },
  {
    id: 'med-first-aid',
    name: 'Compact First-Aid & Antiseptic Kit',
    category: 'medicine',
    price: 5,
    rating: 'Simple',
    purpose: 'Treats small cuts, scrapes, or blisters from walking outside.',
    howToUse: 'Clean with antiseptic wipe and apply a soft bandage.',
    statEffects: { pain: -25, trustLevel: 10, likeness: 8 }
  },
  {
    id: 'med-electrolytes',
    name: 'Peach Electrolyte Hydration Sachets',
    category: 'medicine',
    price: 4,
    rating: 'Simple',
    purpose: 'Restores hydration, energy, and recovers from dizziness or exhaustion.',
    howToUse: 'Mix 1 packet into a glass of cold water and sip slowly.',
    statEffects: { tiredness: -25, pain: -12, happiness: 7 }
  },
  {
    id: 'med-chamomile-tea',
    name: 'Calming Chamomile & Lavender Tea',
    category: 'medicine',
    price: 6,
    rating: 'Simple',
    purpose: 'Naturally calms nervousness, anxiety, fear, and racing thoughts.',
    howToUse: 'Steep in hot water for 4 minutes and sip warm.',
    statEffects: { fear: -22, horror: -20, anger: -18, sadness: -14, warmthLevel: 14 }
  },
  {
    id: 'med-focus-tabs',
    name: 'Green Tea & L-Theanine Study Focus Tabs',
    category: 'medicine',
    price: 8,
    rating: 'Simple',
    purpose: 'Clears brain fog and fatigue without jitters during study sessions.',
    howToUse: 'Take 1 capsule with water before studying.',
    statEffects: { tiredness: -28, happiness: 6 }
  },
  {
    id: 'med-antacid',
    name: 'Mint Chewable Stomach Soother',
    category: 'medicine',
    price: 5,
    rating: 'Simple',
    purpose: 'Relieves stomach upset or indigestion after spicy food.',
    howToUse: 'Chew 1–2 tablets as needed.',
    statEffects: { pain: -25, happiness: 5 }
  },
  {
    id: 'med-eye-drops',
    name: 'Cooling Refreshing Eye Drops',
    category: 'medicine',
    price: 6,
    rating: 'Simple',
    purpose: 'Soothes tired, dry eyes from late-night phone scrolling or crying.',
    howToUse: 'Tilt head back and place 1 drop in each eye.',
    statEffects: { tiredness: -12, sadness: -10, pain: -10 }
  },
  {
    id: 'med-cough-syrup',
    name: 'Honey Herbal Throat & Cough Syrup',
    category: 'medicine',
    price: 7,
    rating: 'Simple',
    purpose: 'Calms sore throat and nighttime cough.',
    howToUse: 'Take 1 spoonful before bed.',
    statEffects: { pain: -22, tiredness: -6 }
  },
  {
    id: 'med-iron-energy',
    name: 'Gentle Iron & B12 Energy Supplement',
    category: 'medicine',
    price: 11,
    rating: 'Simple',
    purpose: 'Prevents weakness, dizziness, and low energy.',
    howToUse: 'Take 1 capsule daily with water.',
    statEffects: { tiredness: -20, pain: -10, happiness: 6 }
  },
  {
    id: 'med-ashwagandha',
    name: 'Calm Mind Stress Relief Capsules',
    category: 'medicine',
    price: 14,
    rating: 'Simple',
    purpose: 'Reduces stress, fear, and emotional overwhelm while improving comfort.',
    howToUse: 'Take 1 capsule in the evening.',
    statEffects: { fear: -25, horror: -20, sadness: -15, anger: -15, trustLevel: 8 }
  },

  // ==================== 4. PERSONAL CARE, BEAUTY & SKINCARE (16 ITEMS) ====================
  {
    id: 'care-vanilla-lotion',
    name: 'Warm Vanilla & Cocoa Butter Body Lotion',
    category: 'care',
    price: 12,
    rating: 'Simple',
    purpose: 'Rida\'s signature bedroom scent. Leaves her skin silky-smooth and smelling faintly of sweet vanilla and chocolate.',
    howToUse: 'Smooth onto arms, legs, neck, and shoulders after a shower.',
    statEffects: { happiness: 12, hotness: 12, warmthLevel: 12, pleasure: 8, blushLevel: 8 }
  },
  {
    id: 'care-rosewater-mist',
    name: 'Chilled Rosewater Hydrating Face Mist',
    category: 'care',
    price: 10,
    rating: 'Simple',
    purpose: 'Cools warm, blushing cheeks and leaves a dewy glow on her skin.',
    howToUse: 'Close eyes and spritz lightly across the face and neck.',
    statEffects: { happiness: 10, tiredness: -8, hotness: 6 }
  },
  {
    id: 'care-berry-lipbalm',
    name: 'Tinted Strawberry Kiss Lip Balm',
    category: 'care',
    price: 6,
    rating: 'Simple',
    purpose: 'Keeps her full natural lips soft, glossy, and subtly tinted with a sweet berry scent.',
    howToUse: 'Glide across lips anytime—makes her notice Adeel looking at her lips.',
    statEffects: { happiness: 9, blushLevel: 10, hotness: 10, lust: 6 }
  },
  {
    id: 'care-jasmine-perfume',
    name: 'Midnight Jasmine & White Musk Eau de Parfum',
    category: 'care',
    price: 38,
    rating: 'Simple',
    purpose: 'Intoxicating, soft floral perfume that lingers on her neck and pulse points when you stand close to her.',
    howToUse: 'Dab onto wrists, collarbone, and behind the ears.',
    statEffects: { happiness: 18, likeness: 15, hotness: 18, lust: 12, blushLevel: 12 }
  },
  {
    id: 'care-body-mist',
    name: 'Sweet Peach & Cashmere Body Mist',
    category: 'care',
    price: 18,
    rating: 'Simple',
    purpose: 'Light everyday fragrance she sprays before stepping out of her room.',
    howToUse: 'Mist over hair and clothes.',
    statEffects: { happiness: 12, hotness: 10, likeness: 8 }
  },
  {
    id: 'care-hair-serum',
    name: 'Argan Silk Hair Shine Serum',
    category: 'care',
    price: 15,
    rating: 'Simple',
    purpose: 'Keeps her long dark hair silky, tangle-free, and fragrant.',
    howToUse: 'Work a few drops through damp or dry hair ends.',
    statEffects: { happiness: 11, hotness: 9 }
  },
  {
    id: 'care-sheet-mask',
    name: 'Honey & Aloe Glow Sheet Mask Pack',
    category: 'care',
    price: 8,
    rating: 'Simple',
    purpose: 'Relaxing evening skincare ritual in her room.',
    howToUse: 'Apply to clean face for 15 minutes while lying on the bed.',
    statEffects: { happiness: 10, tiredness: -10, warmthLevel: 8 }
  },
  {
    id: 'care-foam-cleanser',
    name: 'Cloud Soft Foaming Face Wash',
    category: 'care',
    price: 11,
    rating: 'Simple',
    purpose: 'Used in the shared upstairs bathroom every morning and night.',
    howToUse: 'Wash face at the upstairs bathroom sink.',
    statEffects: { tiredness: -10, happiness: 8 }
  },
  {
    id: 'care-bath-bomb',
    name: 'Lavender & Rose Petal Bath Soak',
    category: 'care',
    price: 7,
    rating: 'Simple',
    purpose: 'Turns a warm bath in the shared upstairs bathroom into a fragrant, relaxing escape.',
    howToUse: 'Drop into warm water in the upstairs bathroom.',
    statEffects: { tiredness: -20, pain: -15, warmthLevel: 16, hotness: 12, pleasure: 10 }
  },
  {
    id: 'care-hand-cream',
    name: 'Shea Butter & Almond Hand Cream',
    category: 'care',
    price: 6,
    rating: 'Simple',
    purpose: 'Keeps her delicate hands soft and warm.',
    howToUse: 'Massage into hands and fingers.',
    statEffects: { happiness: 8, warmthLevel: 8 }
  },
  {
    id: 'care-sleep-mask',
    name: 'Mulberry Silk Padded Sleep Eye Mask',
    category: 'care',
    price: 9,
    rating: 'Simple',
    purpose: 'Blocks out hallway light for deep sleep—or can be used playfully during trust games.',
    howToUse: 'Slip over eyes when resting on the bed.',
    statEffects: { tiredness: -18, happiness: 8, trustLevel: 6 }
  },
  {
    id: 'care-massage-oil',
    name: 'Warm Sweet Almond & Ylang-Ylang Massage Oil',
    category: 'care',
    price: 16,
    rating: 'Simple',
    purpose: 'Glides smoothly over skin to melt away back/shoulder tension while building intense skin-to-skin warmth.',
    howToUse: 'Warm a few drops between palms and massage slowly onto shoulders, back, or legs.',
    statEffects: { pain: -25, tiredness: -15, warmthLevel: 20, blushLevel: 18, hotness: 18, lust: 15, pleasure: 16 }
  },
  {
    id: 'care-body-scrub',
    name: 'Brown Sugar & Coconut Body Polish',
    category: 'care',
    price: 14,
    rating: 'Simple',
    purpose: 'Exfoliates skin in the shower so it feels extra soft to the touch.',
    howToUse: 'Use in the upstairs shower and rinse with warm water.',
    statEffects: { happiness: 11, hotness: 12, pleasure: 6 }
  },
  {
    id: 'care-mascara',
    name: 'Velvet Lash Lengthening Mascara',
    category: 'care',
    price: 12,
    rating: 'Simple',
    purpose: 'Frames her expressive dark brown eyes so they look even deeper when she glances up.',
    howToUse: 'Apply in front of her bedroom mirror.',
    statEffects: { happiness: 10, hotness: 11 }
  },
  {
    id: 'care-blush-compact',
    name: 'Soft Rose Cream Blush Compact',
    category: 'care',
    price: 15,
    rating: 'Simple',
    purpose: 'Adds a soft rosy tint to her cheeks, though Adeel easily makes her blush naturally without it.',
    howToUse: 'Tap gently onto cheekbones.',
    statEffects: { happiness: 11, blushLevel: 8, hotness: 9 }
  },
  {
    id: 'care-nail-kit',
    name: 'Pastel Nude Nail Polish & Care Kit',
    category: 'care',
    price: 13,
    rating: 'Simple',
    purpose: 'For painting her fingernails and toenails neatly in her bedroom.',
    howToUse: 'Brush onto nails and let dry for 10 minutes.',
    statEffects: { happiness: 10, likeness: 6 }
  },

  // ==================== 5. 18+ CONDOMS, DRUGS & INTIMATE ENHANCERS (30 ITEMS) ====================
  {
    id: 'adultmed-condoms-thin',
    name: 'Ultra-Thin Skin-Feel Condoms (Pack of 12)',
    category: 'intimate_18_med',
    price: 10,
    rating: '18+',
    purpose: 'Feather-thin skin-to-skin protection for safe, worry-free intimate moments upstairs without fear of unwanted consequences.',
    howToUse: 'Keep discreetly in drawer or pocket; use during private 18+ intimacy to keep Rida feeling safe, relaxed, and protected.',
    statEffects: { trustLevel: 15, fear: -20, blushLevel: 22, lust: 16, hotness: 14, wetness: 14 }
  },
  {
    id: 'adultmed-condoms-ribbed',
    name: 'Ribbed & Dotted Climax Condoms (Pack of 10)',
    category: 'intimate_18_med',
    price: 12,
    rating: '18+',
    purpose: 'Textured protection with raised ribs and micro-dots engineered to heighten internal sensation, pleasure, and wetness for her.',
    howToUse: 'Use during intimate bedroom scenes to significantly boost Rida\'s physical pleasure and arousal.',
    statEffects: { trustLevel: 12, fear: -18, blushLevel: 24, lust: 20, pleasure: 28, wetness: 24 }
  },
  {
    id: 'adultmed-condoms-warming',
    name: 'Warming & Tingling Pleasure Condoms (Pack of 12)',
    category: 'intimate_18_med',
    price: 14,
    rating: '18+',
    purpose: 'Coated in a heat-activated warming lubricant that creates a deep, pulsing warmth on contact with her body.',
    howToUse: 'Unwrap and use during slow late-night intimacy; the natural friction activates a warm tingling rush.',
    statEffects: { trustLevel: 12, fear: -18, warmthLevel: 24, hotness: 24, pleasure: 26, wetness: 25, blushLevel: 22 }
  },
  {
    id: 'adultmed-condoms-flavored',
    name: 'Strawberry & Dark Chocolate Flavored Condoms (Pack of 12)',
    category: 'intimate_18_med',
    price: 11,
    rating: '18+',
    purpose: 'Sweet-scented and sugar-free flavored protection (including Rida\'s favorite chocolate and strawberry scents) for playful foreplay.',
    howToUse: 'Keep in the bedside drawer for sweet-tasting oral foreplay or full protection.',
    statEffects: { happiness: 14, blushLevel: 24, lust: 20, pleasure: 22, wetness: 20 }
  },
  {
    id: 'adultmed-condoms-delay',
    name: 'Extended Stamina & Climax-Control Condoms (Pack of 10)',
    category: 'intimate_18_med',
    price: 15,
    rating: '18+',
    purpose: 'Contains a mild inner desensitizing essence for Adeel to prolong intimacy and build Rida\'s pleasure to multiple peaks.',
    howToUse: 'Wear during long, unhurried late-night sessions when everyone downstairs is asleep.',
    statEffects: { pleasure: 30, wetness: 28, lust: 24, hotness: 22, trustLevel: 12 }
  },
  {
    id: 'adultmed-condoms-glow',
    name: 'Glow-in-the-Dark Late-Night Condoms (Pack of 6)',
    category: 'intimate_18_med',
    price: 13,
    rating: '18+',
    purpose: 'Playful, body-safe glowing protection that makes Rida giggle and blush in the pitch-black upstairs bedroom.',
    howToUse: 'Expose to desk lamp light for 30 seconds before turning off all the lights.',
    statEffects: { happiness: 16, blushLevel: 26, lust: 18, pleasure: 20, wetness: 18 }
  },
  {
    id: 'adultmed-condoms-internal',
    name: 'Soft Nitrile Internal Female Condoms (Pack of 6)',
    category: 'intimate_18_med',
    price: 16,
    rating: '18+',
    purpose: 'Worn internally by Rida ahead of time so there is zero interruption when a moment heats up.',
    howToUse: 'Rida can insert it privately in the upstairs bathroom before coming into your room.',
    statEffects: { trustLevel: 16, fear: -22, lust: 20, wetness: 18, blushLevel: 22 }
  },
  {
    id: 'adultmed-plan-b',
    name: 'Emergency Contraceptive Pill (Plan-B Morning-After)',
    category: 'intimate_18_med',
    price: 25,
    rating: '18+',
    purpose: 'Single-dose emergency backup pill that eliminates panic and pregnancy worry after an unplanned, heat-of-the-moment night.',
    howToUse: 'Take 1 tablet orally with water within 72 hours for complete peace of mind.',
    statEffects: { fear: -40, horror: -35, trustLevel: 18, blushLevel: 16, sadness: -15 }
  },
  {
    id: 'adultmed-birth-control',
    name: 'Monthly Oral Contraceptive Cycle Pack (28 Pills)',
    category: 'intimate_18_med',
    price: 18,
    rating: '18+',
    purpose: 'Ongoing daily protection and cycle regulation so Rida feels completely safe during raw, close intimacy.',
    howToUse: 'Take 1 small pill daily at the same time; kept hidden in her private pouch.',
    statEffects: { trustLevel: 20, fear: -25, blushLevel: 15, lust: 14 }
  },
  {
    id: 'adultmed-arousal-drops',
    name: 'Velvet Bloom Female Arousal & Sensitivity Drops',
    category: 'intimate_18_med',
    price: 28,
    rating: '18+',
    purpose: 'Fast-acting liquid arousal drops that send a warm flush through her chest and thighs, heightening her skin sensitivity, lust, and natural wetness.',
    howToUse: 'Mix 5–8 drops into juice, water, or hot chocolate 15 minutes before a private late-night moment.',
    statEffects: { lust: 32, wetness: 34, hotness: 28, pleasure: 22, blushLevel: 25, warmthLevel: 20 }
  },
  {
    id: 'adultmed-desire-gummies',
    name: 'Ruby Peach Intimate Desire & Mood Gummies',
    category: 'intimate_18_med',
    price: 32,
    rating: '18+',
    purpose: 'Sweet peach-flavored 18+ gummies formulated with maca, L-arginine, and damiana to melt away shyness and build intense romantic craving.',
    howToUse: 'Eat 1–2 gummies together in the bedroom when the house is quiet.',
    statEffects: { lust: 30, wetness: 28, hotness: 24, pleasure: 20, blushLevel: 20, fear: -15, happiness: 14 }
  },
  {
    id: 'adultmed-pink-pill',
    name: 'Crimson Rush Female Libido & Climax Pink Pill (4-Pack)',
    category: 'intimate_18_med',
    price: 38,
    rating: '18+',
    purpose: 'Potent 18+ female enhancement tablet that dramatically increases blood flow, internal warmth, intense wetness, and deep craving for touch.',
    howToUse: 'Take 1 pink tablet with water 20–30 minutes before bedroom intimacy.',
    statEffects: { lust: 38, wetness: 38, hotness: 32, pleasure: 30, blushLevel: 28, warmthLevel: 24 }
  },
  {
    id: 'adultmed-desire-strips',
    name: 'Midnight Ecstasy Sublingual Dissolving Desire Strips (10-Pack)',
    category: 'intimate_18_med',
    price: 29,
    rating: '18+',
    purpose: 'Mint-berry film strip that dissolves instantly on the tongue—freshens breath while triggering a fast wave of bodily warmth and arousal.',
    howToUse: 'Place 1 thin strip on Rida\'s tongue before kissing her.',
    statEffects: { lust: 28, wetness: 26, hotness: 25, pleasure: 22, blushLevel: 22 }
  },
  {
    id: 'adultmed-royal-honey',
    name: 'Royal Honey VIP Intimate Vitality & Arousal Sachets (6-Pack)',
    category: 'intimate_18_med',
    price: 34,
    rating: '18+',
    purpose: 'Rich herbal honey nectar infused with ginseng and royal jelly that boosts stamina, warmth, and sensual appetite for hours.',
    howToUse: 'Drizzle a sachet onto a spoon or into warm milk/tea and share it late at night.',
    statEffects: { tiredness: -20, lust: 30, wetness: 28, hotness: 26, pleasure: 24, warmthLevel: 22 }
  },
  {
    id: 'adultmed-stamina-caps',
    name: 'Endurance & Stamina Male Performance Capsules',
    category: 'intimate_18_med',
    price: 26,
    rating: '18+',
    purpose: 'Boosts male stamina, hardness, energy, and lasting power for long, slow late-night sessions.',
    howToUse: 'Adeel takes 1 capsule with water 30 minutes before intimacy.',
    statEffects: { lust: 22, pleasure: 26, wetness: 22, hotness: 20 }
  },
  {
    id: 'adultmed-delay-spray',
    name: 'Last-Longer Climax Control Male Mist Spray',
    category: 'intimate_18_med',
    price: 24,
    rating: '18+',
    purpose: 'Odorless lidocaine-free botanical mist for Adeel that extends bedroom endurance without numbing sensation.',
    howToUse: 'Apply 2 sprays 10 minutes before intimacy so the session lasts as long as Rida wants.',
    statEffects: { pleasure: 28, wetness: 25, lust: 22, hotness: 20 }
  },
  {
    id: 'adultmed-silk-lube',
    name: 'Pure Silk Water-Based Intimate Lubricant',
    category: 'intimate_18_med',
    price: 16,
    rating: '18+',
    purpose: 'Odorless, silky-smooth intimate glide that prevents any friction or discomfort and makes every touch effortless and wet.',
    howToUse: 'Apply a few warm drops to skin, fingers, or toys during intimate moments.',
    statEffects: { wetness: 35, pleasure: 24, pain: -30, lust: 18, blushLevel: 20 }
  },
  {
    id: 'adultmed-silicone-lube',
    name: 'Velvet Infinity Waterproof Silicone Bedroom & Shower Lube',
    category: 'intimate_18_med',
    price: 22,
    rating: '18+',
    purpose: 'Ultra-plush, never-drying silicone lubricant that stays slick even in the shared upstairs shower.',
    howToUse: 'Use a small drop for long-lasting bedroom intimacy or secret upstairs shower scenes.',
    statEffects: { wetness: 40, pleasure: 28, pain: -30, lust: 22, hotness: 20 }
  },
  {
    id: 'adultmed-strawberry-gel',
    name: 'Edible Strawberry Kisses Warming Intimate Gel',
    category: 'intimate_18_med',
    price: 18,
    rating: '18+',
    purpose: 'Tastes like sweet strawberries and creates a gentle warming sensation whenever kissed or breathed on.',
    howToUse: 'Dab onto neck, collarbone, inner thighs, or intimate areas and blow softly to activate the warmth.',
    statEffects: { pleasure: 28, wetness: 26, lust: 24, hotness: 22, blushLevel: 24, happiness: 12 }
  },
  {
    id: 'adultmed-caramel-glaze',
    name: 'Salted Caramel & Dark Chocolate Edible Body Glaze',
    category: 'intimate_18_med',
    price: 20,
    rating: '18+',
    purpose: 'Warm, lickable chocolate-caramel body glaze tailored to Rida\'s #1 secret fantasy of chocolate and slow physical pleasure.',
    howToUse: 'Drizzle a drop onto her collarbone, lips, chest, or stomach and kiss/lick it off slowly.',
    statEffects: { pleasure: 34, wetness: 30, lust: 30, hotness: 26, blushLevel: 28, happiness: 18 }
  },
  {
    id: 'adultmed-warming-gel',
    name: 'Sensual Touch Tingling & Warming Arousal Gel',
    category: 'intimate_18_med',
    price: 22,
    rating: '18+',
    purpose: 'Concentrated topical sensitivity serum that amplifies every brush of fingers and makes her shiver with pleasure.',
    howToUse: 'Massage a tiny drop onto sensitive skin and wait 60 seconds for the warm pulse to build.',
    statEffects: { pleasure: 32, wetness: 30, lust: 26, hotness: 25, blushLevel: 24 }
  },
  {
    id: 'adultmed-ice-fire-gel',
    name: 'Ice & Fire Dual-Sensation Cooling/Warming Gel Duo',
    category: 'intimate_18_med',
    price: 27,
    rating: '18+',
    purpose: 'Two-tube set: Tube 1 sends a cool, goosebump-inducing minty shiver; Tube 2 follows with deep, burning warmth.',
    howToUse: 'Apply the cooling gel first, then layer the warming gel for an overwhelming sensory rush.',
    statEffects: { pleasure: 36, wetness: 34, lust: 28, hotness: 28, blushLevel: 26 }
  },
  {
    id: 'adultmed-tingle-balm',
    name: 'Electric Kiss Plumping & Tingling Lip & Peak Balm',
    category: 'intimate_18_med',
    price: 19,
    rating: '18+',
    purpose: 'Creates a warm, buzzing tingle on the lips, neck, and sensitive peaks wherever applied.',
    howToUse: 'Apply to lips or sensitive spots before slow, deep kissing.',
    statEffects: { pleasure: 24, lust: 22, blushLevel: 22, hotness: 20, wetness: 18 }
  },
  {
    id: 'adultmed-rose-serum',
    name: 'Rose Petal Tightening & Sensitivity Intimate Serum',
    category: 'intimate_18_med',
    price: 30,
    rating: '18+',
    purpose: 'Botanical intimate gel that heightens grip, warmth, and internal nerve sensitivity for both partners.',
    howToUse: 'Apply a small drop 5 minutes before intimacy.',
    statEffects: { pleasure: 32, wetness: 28, lust: 26, hotness: 24, blushLevel: 25 }
  },
  {
    id: 'adultmed-aphrodisiac-choc',
    name: 'Midnight Velvet Aphrodisiac Dark Chocolates',
    category: 'intimate_18_med',
    price: 24,
    rating: '18+',
    purpose: 'Combines Rida\'s love of melting chocolate with natural mood-enhancing aphrodisiac extracts.',
    howToUse: 'Let a square melt slowly on her tongue in the dim bedroom.',
    statEffects: { hunger: -12, lust: 28, wetness: 25, pleasure: 22, blushLevel: 20, likeness: 14, warmthLevel: 18 }
  },
  {
    id: 'adultmed-pheromone-oil',
    name: 'Skin-to-Skin Pheromone Attraction Pulse Oil',
    category: 'intimate_18_med',
    price: 35,
    rating: '18+',
    purpose: 'Subtle, skin-warmed scent designed to trigger instinctive closeness, lingering eye contact, and desire.',
    howToUse: 'Apply to neck and wrists before sitting close together.',
    statEffects: { likeness: 16, lust: 24, hotness: 22, wetness: 18, blushLevel: 18, warmthLevel: 16 }
  },
  {
    id: 'adultmed-spanish-fly',
    name: 'Forbidden Whisper Liquid Desire Elixir (Spanish Fly)',
    category: 'intimate_18_med',
    price: 36,
    rating: '18+',
    purpose: 'Classic colorless, tasteless 18+ desire drops that dissolve inhibitions and awaken intense, flushed craving.',
    howToUse: 'Add 6 drops to any evening drink before spending time together upstairs.',
    statEffects: { lust: 36, wetness: 36, hotness: 30, pleasure: 26, blushLevel: 28, fear: -18 }
  },
  {
    id: 'adultmed-aftercare-wipes',
    name: 'pH-Balanced Soothing Intimate Aftercare Wipes',
    category: 'intimate_18_med',
    price: 9,
    rating: '18+',
    purpose: 'Allows quick, quiet cleanup right in the bedroom without having to walk to the shared hallway bathroom immediately.',
    howToUse: 'Use gently after intimate moments to stay fresh and comfortable in bed.',
    statEffects: { trustLevel: 12, warmthLevel: 12, pain: -10, fear: -12, happiness: 10 }
  },
  {
    id: 'adultmed-pregnancy-test',
    name: 'Digital Early-Result Private Test Kit (2-Pack)',
    category: 'intimate_18_med',
    price: 14,
    rating: '18+',
    purpose: 'Used in the shared upstairs bathroom for reassurance and clarity.',
    howToUse: 'Use privately in the upstairs bathroom and wait 3 minutes for the digital display.',
    statEffects: { fear: -20, trustLevel: 10, blushLevel: 18 }
  },
  {
    id: 'adultmed-night-elixir',
    name: 'Velvet Dusk Relaxation & Unwind Nectar',
    category: 'intimate_18_med',
    price: 30,
    rating: '18+',
    purpose: 'Calms overthinking and guilt while leaving the body warm, relaxed, and receptive to gentle touch.',
    howToUse: 'Pour a small capful into a warm drink late at night.',
    statEffects: { fear: -22, sadness: -15, warmthLevel: 24, lust: 22, wetness: 20, pleasure: 18, blushLevel: 16 }
  },

  // ==================== 6. 18+ TOYS, LINGERIE & SECRET BEDROOM ITEMS (30 ITEMS) ====================
  {
    id: 'toy-black-lace-set',
    name: 'Midnight Black Sheer Lace Bralette & Panty Set',
    category: 'adult_toys_18',
    price: 38,
    rating: '18+',
    purpose: 'Delicate floral lace two-piece set like the one Rida hides at the back of her wardrobe—makes her feel breathtakingly desirable and shy.',
    howToUse: 'Rida wears it secretly under her oversized shirt or reveals it in her private room when trust and warmth are high.',
    statEffects: { blushLevel: 28, hotness: 30, lust: 25, wetness: 22, pleasure: 18, likeness: 12 }
  },
  {
    id: 'toy-crimson-babydoll',
    name: 'Crimson Satin & Lace Babydoll Chemise',
    category: 'adult_toys_18',
    price: 42,
    rating: '18+',
    purpose: 'Short, flowing crimson satin nightdress with matching thong that clings to her curves.',
    howToUse: 'Slip on in the bedroom with the door locked late at night.',
    statEffects: { blushLevel: 30, hotness: 32, lust: 28, wetness: 24, pleasure: 20 }
  },
  {
    id: 'toy-emerald-teddy',
    name: 'Emerald Silk Strappy Open-Back Teddy Bodysuit',
    category: 'adult_toys_18',
    price: 46,
    rating: '18+',
    purpose: 'High-cut emerald satin and sheer mesh one-piece teddy that accentuates her waist and hips.',
    howToUse: 'Wear under a long cardigan or reveal privately in the dim bedroom light.',
    statEffects: { blushLevel: 30, hotness: 34, lust: 30, wetness: 26, pleasure: 22 }
  },
  {
    id: 'toy-blush-corset',
    name: 'Blush Pink Sheer Mesh Corset & Garter Belt Set',
    category: 'adult_toys_18',
    price: 52,
    rating: '18+',
    purpose: 'Romantic ribbon-laced bustier corset with garter straps that combines sweet blush pink with intense 18+ allure.',
    howToUse: 'Lace up the satin ribbon at the back and clip the garter straps to thigh-high stockings.',
    statEffects: { blushLevel: 32, hotness: 36, lust: 32, wetness: 28, pleasure: 24, likeness: 14 }
  },
  {
    id: 'toy-crotchless-bodysuit',
    name: 'Forbidden Noir Open-Lace Cupless & Crotchless Teddy',
    category: 'adult_toys_18',
    price: 48,
    rating: '18+',
    purpose: 'Ultra-daring French lace bodysuit designed to stay on during full intimacy without needing to be removed.',
    howToUse: 'Worn for late-night bedroom encounters when lust and trust are at their peak.',
    statEffects: { blushLevel: 38, hotness: 38, lust: 36, wetness: 34, pleasure: 30 }
  },
  {
    id: 'toy-pearl-thong',
    name: 'Sensual Pearl-String Open Micro G-String Panties',
    category: 'adult_toys_18',
    price: 22,
    rating: '18+',
    purpose: 'Lace thong with a strand of smooth pearls positioned to rub against her most sensitive spot with every step she takes.',
    howToUse: 'Rida wears it under her skirt or shorts, blushing every time she moves or sits down.',
    statEffects: { pleasure: 30, wetness: 32, lust: 30, blushLevel: 34, hotness: 28 }
  },
  {
    id: 'toy-thigh-stockings',
    name: 'Sheer Lace-Top Thigh-High Stockings',
    category: 'adult_toys_18',
    price: 18,
    rating: '18+',
    purpose: 'Silky stockings with silicone lace stay-up bands that hug her shapely thighs.',
    howToUse: 'Roll slowly up each leg to the upper thigh.',
    statEffects: { blushLevel: 22, hotness: 25, lust: 20, wetness: 16, pleasure: 14 }
  },
  {
    id: 'toy-fishnet-bodystocking',
    name: 'Seamless Micro-Fishnet Full Bodystocking',
    category: 'adult_toys_18',
    price: 28,
    rating: '18+',
    purpose: 'Hugs every curve from collarbone to ankles in soft, stretchy mesh with open intimate access.',
    howToUse: 'Slip on in the bedroom for an unforgettable late-night surprise.',
    statEffects: { blushLevel: 32, hotness: 35, lust: 32, wetness: 28, pleasure: 24 }
  },
  {
    id: 'toy-roleplay-skirt-set',
    name: 'Playful Pleated Mini-Skirt & Cropped Tie-Top Outfit',
    category: 'adult_toys_18',
    price: 44,
    rating: '18+',
    purpose: 'Flirty private roleplay outfit with a very short pleated skirt and cropped tie-front blouse.',
    howToUse: 'Try on in front of the bedroom mirror with the door locked.',
    statEffects: { blushLevel: 30, hotness: 32, lust: 28, wetness: 24, happiness: 14 }
  },
  {
    id: 'toy-sheer-robe',
    name: 'Sheer Chiffon & Eyelash-Lace Bedroom Robe',
    category: 'adult_toys_18',
    price: 39,
    rating: '18+',
    purpose: 'See-through floor-length chiffon robe with a satin waist tie that reveals everything underneath in dim light.',
    howToUse: 'Wear over lingerie or bare skin when opening the bedroom door late at night.',
    statEffects: { blushLevel: 28, hotness: 32, lust: 28, wetness: 24, warmthLevel: 18 }
  },
  {
    id: 'toy-mini-bullet',
    name: 'Whisper-Quiet Rose Gold Mini Bullet Vibrator',
    category: 'adult_toys_18',
    price: 35,
    rating: '18+',
    purpose: 'Ultra-quiet, lipstick-sized vibrator that cannot be heard through the thin bedroom wall. Easy to hide in her desk pouch or under the mattress.',
    howToUse: 'Press the button to cycle through 5 soft vibration speeds against sensitive skin.',
    statEffects: { pleasure: 35, wetness: 32, lust: 28, hotness: 24, blushLevel: 26 }
  },
  {
    id: 'toy-rose-suction',
    name: 'Soft Silicone Rose Air-Pulse Pleasure Toy',
    category: 'adult_toys_18',
    price: 48,
    rating: '18+',
    purpose: 'Trending, whisper-silent rose-shaped toy that uses gentle air-pulse suction waves for intense, fast-building pleasure.',
    howToUse: 'Use alone under the blanket late at night or let Adeel hold and control it during a slow, intimate scene.',
    statEffects: { pleasure: 42, wetness: 38, lust: 32, hotness: 28, blushLevel: 30 }
  },
  {
    id: 'toy-remote-panty',
    name: 'App & Remote-Controlled Wearable Panty Vibrator',
    category: 'adult_toys_18',
    price: 65,
    rating: '18+',
    purpose: 'Silky ergonomic vibrator that slips discreetly inside panties while the wireless remote controls the vibrations from across the hallway or downstairs!',
    howToUse: 'Rida wears it hidden under her clothes while Adeel holds the silent remote control.',
    statEffects: { pleasure: 40, wetness: 40, lust: 35, hotness: 32, blushLevel: 35 }
  },
  {
    id: 'toy-wand-massager',
    name: 'Rechargeable Deep-Touch Silicone Wand Massager',
    category: 'adult_toys_18',
    price: 55,
    rating: '18+',
    purpose: 'Works both as a soothing shoulder/back massager AND a powerful multi-speed intimate pleasure wand.',
    howToUse: 'Start by massaging her tense shoulders, then slowly lower the warm silicone head as she relaxes.',
    statEffects: { pain: -20, tiredness: -10, pleasure: 40, wetness: 36, lust: 30, blushLevel: 28 }
  },
  {
    id: 'toy-dual-rabbit',
    name: 'Dual-Motor Velvet Silicone Rabbit Vibrator',
    category: 'adult_toys_18',
    price: 68,
    rating: '18+',
    purpose: 'Combines deep internal G-spot curves with external flickering stimulation for overwhelming dual-climax pleasure.',
    howToUse: 'Use with water-based lubricant in the quiet bedroom late at night.',
    statEffects: { pleasure: 45, wetness: 42, lust: 36, hotness: 32, blushLevel: 34 }
  },
  {
    id: 'toy-glass-wand',
    name: 'Hand-Blown Borosilicate Glass Temperature-Play Wand',
    category: 'adult_toys_18',
    price: 36,
    rating: '18+',
    purpose: 'Smooth, sculpted crystal wand that can be warmed in warm water or cooled with ice for breathtaking temperature sensation.',
    howToUse: 'Warm in water in the upstairs bathroom, dry off, and glide slowly over skin.',
    statEffects: { pleasure: 34, wetness: 32, lust: 28, hotness: 26, blushLevel: 26 }
  },
  {
    id: 'toy-jeweled-plug',
    name: 'Rose-Quartz Heart Jeweled Beginner Silicone Plug',
    category: 'adult_toys_18',
    price: 29,
    rating: '18+',
    purpose: 'Tapered, ultra-soft slim silicone plug with a sparkling rose-gold heart base for taboo late-night exploration.',
    howToUse: 'Use generously with Pure Silk lubricant only when Rida\'s trust and arousal are very high.',
    statEffects: { pleasure: 32, wetness: 30, lust: 32, blushLevel: 38, hotness: 30, trustLevel: 12 }
  },
  {
    id: 'toy-couples-ring',
    name: 'Soft Silicone Vibrating Couples Ring',
    category: 'adult_toys_18',
    price: 22,
    rating: '18+',
    purpose: 'Adds shared vibration and extended stamina during close intimacy.',
    howToUse: 'Switch on the silent micro-motor during intimate connection.',
    statEffects: { pleasure: 34, wetness: 30, lust: 26, hotness: 24 }
  },
  {
    id: 'toy-velvet-choker',
    name: 'Black Velvet & Lace Choker Collar with Satin Ribbon Lead',
    category: 'adult_toys_18',
    price: 26,
    rating: '18+',
    purpose: 'Looks like a cute everyday velvet choker necklace, but has a hidden D-ring for attaching a soft satin ribbon in private.',
    howToUse: 'Fasten gently around her neck and tug the satin ribbon softly to pull her in for a kiss.',
    statEffects: { blushLevel: 30, lust: 30, wetness: 28, hotness: 28, pleasure: 24, trustLevel: 10 }
  },
  {
    id: 'toy-satin-ties',
    name: 'Plush Black Satin Wrist Ties (Soft Restraints)',
    category: 'adult_toys_18',
    price: 24,
    rating: '18+',
    purpose: 'Soft, non-rough satin ribbons for gentle, consensual teasing and trust play on the bed.',
    howToUse: 'Tie loosely around wrists to the bedpost only when Rida\'s trust and warmth are high.',
    statEffects: { lust: 26, wetness: 25, pleasure: 24, blushLevel: 28, trustLevel: 10 }
  },
  {
    id: 'toy-under-bed-straps',
    name: 'Under-Mattress Hidden Velvet Cuff Strap Kit',
    category: 'adult_toys_18',
    price: 40,
    rating: '18+',
    purpose: 'Tucks completely out of sight beneath the mattress when not in use, with plush velvet cuffs for wrists or ankles.',
    howToUse: 'Pull the soft straps out from under the mattress edges during private late-night trust scenes.',
    statEffects: { lust: 32, wetness: 30, pleasure: 30, blushLevel: 34, hotness: 28, trustLevel: 12 }
  },
  {
    id: 'toy-silk-blindfold',
    name: 'Sensory Deprivation Velvet & Silk Blindfold',
    category: 'adult_toys_18',
    price: 15,
    rating: '18+',
    purpose: 'Heightens every whisper, breath, and light touch when she can\'t see where your hands or lips will land next.',
    howToUse: 'Place gently over her eyes and whisper softly near her ear.',
    statEffects: { pleasure: 24, wetness: 22, lust: 22, blushLevel: 24, warmthLevel: 15 }
  },
  {
    id: 'toy-suction-cups',
    name: 'Soft Silicone Gentle Sensitivity Suction Teasers (Pair)',
    category: 'adult_toys_18',
    price: 24,
    rating: '18+',
    purpose: 'Creates gentle vacuum suction that draws blood flow to sensitive peaks, making them ultra-responsive to kisses and touch.',
    howToUse: 'Press lightly to create soft suction for a few minutes before removing and kissing.',
    statEffects: { pleasure: 30, wetness: 28, lust: 28, hotness: 26, blushLevel: 30 }
  },
  {
    id: 'toy-body-chain',
    name: 'Rose-Gold Delicate Waist & Chest Body Chain',
    category: 'adult_toys_18',
    price: 27,
    rating: '18+',
    purpose: 'Drapes shimmering rose-gold chains around her collarbones, chest, and bare waist.',
    howToUse: 'Clasp around her neck and waist over bare skin or lingerie.',
    statEffects: { hotness: 28, blushLevel: 24, lust: 22, pleasure: 18, likeness: 12 }
  },
  {
    id: 'toy-feather-wand',
    name: 'Soft Ostrich Feather Tease Tickler',
    category: 'adult_toys_18',
    price: 16,
    rating: '18+',
    purpose: 'Traces light, goosebump-inducing strokes along her neck, stomach, and inner thighs.',
    howToUse: 'Brush slowly across bare skin to build anticipation and shivers.',
    statEffects: { pleasure: 22, wetness: 20, lust: 20, blushLevel: 20, happiness: 10 }
  },
  {
    id: 'toy-open-lace-panties',
    name: 'Pearl-Detail Open-Back Lace Cheeky Panties',
    category: 'adult_toys_18',
    price: 20,
    rating: '18+',
    purpose: 'Secretive, ultra-flirty lace underwear designed to stay on even during intimate moments.',
    howToUse: 'Hidden in her secret wardrobe pouch for special late-night surprises.',
    statEffects: { blushLevel: 26, hotness: 26, lust: 24, wetness: 22, pleasure: 18 }
  },
  {
    id: 'toy-massage-candle',
    name: 'Warm Vanilla & Sandalwood Melt-to-Oil Candle',
    category: 'adult_toys_18',
    price: 26,
    rating: '18+',
    purpose: 'Burns with a dim romantic glow and melts into skin-safe warm massage oil.',
    howToUse: 'Light in the bedroom for 10 minutes, blow out the flame, and drizzle the warm melted oil onto her skin.',
    statEffects: { warmthLevel: 26, hotness: 24, pleasure: 26, wetness: 22, lust: 22, blushLevel: 20 }
  },
  {
    id: 'toy-bedroom-dice',
    name: 'Glow-in-the-Dark Intimate Kiss & Touch Dice',
    category: 'adult_toys_18',
    price: 14,
    rating: '18+',
    purpose: 'Playful bedroom game where one die names an action (Kiss, Whisper, Lick, Massage, Touch) and the other names a body spot (Lips, Neck, Ears, Waist, Thighs, Chest).',
    howToUse: 'Roll both dice on the bed so Rida can follow the dare without having to say it out loud first.',
    statEffects: { blushLevel: 24, lust: 24, wetness: 22, pleasure: 22, happiness: 16, likeness: 12 }
  },
  {
    id: 'toy-desire-cards',
    name: '52-Card Late-Night Forbidden Desires & Intimate Prompts Deck',
    category: 'adult_toys_18',
    price: 18,
    rating: '18+',
    purpose: 'A velvet deck of 52 escalating confessions, dares, and intimate positions that helps shy Rida express what she secretly wants.',
    howToUse: 'Draw cards one by one on her bed after midnight.',
    statEffects: { blushLevel: 26, lust: 28, wetness: 26, pleasure: 24, trustLevel: 14, happiness: 14 }
  },
  {
    id: 'toy-lock-pouch',
    name: 'Discreet Combination-Lock Velvet Storage Bag',
    category: 'adult_toys_18',
    price: 19,
    rating: '18+',
    purpose: 'Lets Rida safely hide her 18+ items, secret notes, and spare cash under her bed without parents ever finding out.',
    howToUse: 'Set a private 3-digit code that only Rida (and Adeel) know.',
    statEffects: { fear: -25, trustLevel: 15, happiness: 12 }
  }
];

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const STORE_ITEMS_FILE = path.join(DATA_DIR, 'store_items.json');

function normalizeStoreCategory(cat) {
  if (cat === 'adult_meds') return 'intimate_18_med';
  if (cat === 'adult_toys') return 'adult_toys_18';
  return cat || 'food';
}

function getStoreItems() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(STORE_ITEMS_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(STORE_ITEMS_FILE, 'utf8'));
      if (Array.isArray(saved) && saved.length > 0) {
        let changed = false;
        const normalizedSaved = saved.map(it => {
          const normCat = normalizeStoreCategory(it.category);
          if (normCat !== it.category) changed = true;
          return { ...it, category: normCat };
        });

        // Also ensure all built-in SHOP_CATALOG items exist (merging any newly added built-in 18+ items)
        const existingIds = new Set(normalizedSaved.map(i => i.id));
        for (const builtin of SHOP_CATALOG) {
          if (!existingIds.has(builtin.id)) {
            normalizedSaved.push(builtin);
            changed = true;
          }
        }

        if (changed) {
          saveStoreItems(normalizedSaved);
        }
        return normalizedSaved;
      }
    } catch (e) {}
  }
  saveStoreItems(SHOP_CATALOG);
  return [...SHOP_CATALOG];
}

function saveStoreItems(items) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
}

function upsertStoreItem(itemData) {
  const items = getStoreItems();
  const id = (itemData.id || ('custom-' + Date.now())).trim();
  const cleanItem = {
    id,
    name: (itemData.name || 'Custom Store Item').trim(),
    category: normalizeStoreCategory(itemData.category),
    price: Math.max(0, Number(itemData.price) || 10),
    rating: itemData.rating === '18+' ? '18+' : 'Simple',
    purpose: (itemData.purpose || 'Custom item added to the store catalog.').trim(),
    howToUse: (itemData.howToUse || 'Use or gift to Rida during roleplay.').trim(),
    statEffects: itemData.statEffects && typeof itemData.statEffects === 'object'
      ? itemData.statEffects
      : (itemData.rating === '18+'
          ? { blushLevel: 18, lust: 20, wetness: 18, pleasure: 18, hotness: 15 }
          : { happiness: 14, likeness: 10, warmthLevel: 8 })
  };

  const existingIdx = items.findIndex(i => i.id === id);
  if (existingIdx !== -1) {
    items[existingIdx] = cleanItem;
  } else {
    items.unshift(cleanItem);
  }
  saveStoreItems(items);
  return { item: cleanItem, items };
}

function deleteStoreItem(itemId) {
  let items = getStoreItems();
  items = items.filter(i => i.id !== itemId);
  saveStoreItems(items);
  return items;
}

module.exports = {
  SHOP_CATEGORIES,
  SHOP_CATALOG,
  STORE_ITEMS_FILE,
  getStoreItems,
  saveStoreItems,
  upsertStoreItem,
  deleteStoreItem
};
