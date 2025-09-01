import { ZodiacSign } from "@/types/zodiac";

// Enhanced zodiac reading system with tracking and variety
interface ZodiacHistory {
  readings: string[];
  actions: string[];
  grumbles: string[];
  themes: string[];
  postComments: string[];
  lastCleared: string;
}

interface ZodiacPreferences {
  favoriteSign?: ZodiacSign;
  readingFrequency: number;
  preferredTone: 'mystical' | 'humorous' | 'balanced';
}

// Vastly expanded Tim's zodiac-specific actions (3x larger)
const enhancedZodiacActions = [
  "*Yawns and squints at the crystal ball with obvious skepticism.*",
  "*Rolls his eyes while reluctantly consulting his star charts.*",
  "*Brushes cookie crumbs off an ancient astrology book.*",
  "*Grumbles about 'cosmic nonsense' while gazing at the stars.*",
  "*Sighs dramatically and adjusts his wizard hat skeptically.*",
  "*Mutters about preferring food horoscopes while reading the stars.*",
  "*Reluctantly waves his hands over the crystal ball with astrological symbols.*",
  "*Takes a bite of pie while consulting planetary alignments.*",
  "*Scratches his belly and peers at constellation charts.*",
  "*Nearly dozes off while waiting for cosmic inspiration.*",
  "*Squints through his reading glasses at ancient star maps.*",
  "*Pauses to wipe celestial dust from his crystal ball.*",
  "*Checks his pocket watch, hoping this cosmic consultation won't take long.*",
  "*Adjusts his robes around his comfortable belly before reading the stars.*",
  "*Yawns wide enough to catch flies while studying astrological symbols.*",
  "*Fumbles with his star charts like they're particularly confusing menus.*",
  "*Peers at the constellations with the enthusiasm of someone reading tax forms.*",
  "*Stretches lazily before consulting the cosmic forces with obvious reluctance.*",
  "*Blinks slowly at the zodiac wheel like it personally offended him.*",
  "*Mutters about the inconvenient timing of planetary alignments.*",
  "*Glances wistfully at his empty snack bowl before focusing on the stars.*",
  "*Rubs his temples as if astrology gives him headaches worse than math.*",
  "*Shifts his weight in his astronomical observation chair with a theatrical sigh.*",
  "*Brushes more cookie fragments from his astrological calculation sheets.*",
  "*Peers over his glasses at the celestial charts with barely concealed annoyance.*",
  "*Clears his throat importantly, then immediately yawns mid-gesture.*",
  "*Taps his wand impatiently on the zodiac calendar like waiting for service.*",
  "*Leans back dangerously far in his chair while contemplating cosmic mysteries.*",
  "*Drums his fingers in a rhythm that suspiciously matches 'dinner time'.*",
  "*Stares at the star charts with the intensity of someone reading lunch specials.*"
];

// Enhanced grumbles with more personality and variety (3x larger)
const enhancedZodiacGrumbles = [
  "The stars are being particularly chatty today, though I'd rather they talk about lunch:",
  "Against my better judgment, the cosmic forces reveal:",
  "The universe insists on sharing this stellar gossip:",
  "My crystal ball is picking up celestial chatter - apparently:",
  "The planets have aligned to disturb my nap with this message:",
  "Cosmic energies are as persistent as my hunger pangs, saying:",
  "The stars are gossiping louder than my stomach rumbling:",
  "Astral forces interrupt my snack time to announce:",
  "The zodiac spirits won't let me eat in peace until I tell you:",
  "Stellar influences are more demanding than my dinner bell:",
  "The cosmic winds carry news more persistent than the smell of baking bread:",
  "Celestial bodies are being more talkative than usual, declaring:",
  "The universe whispers secrets louder than my afternoon snores:",
  "Planetary alignments are more insistent than my craving for second helpings:",
  "The astral realm interrupts my peaceful contemplation to reveal:",
  "Zodiac energies buzz with more activity than my kitchen during meal prep:",
  "The cosmic forces are as chatty as neighbors discussing dinner plans:",
  "Stellar vibrations reach me despite my preference for terrestrial concerns:",
  "The celestial spheres are more active than I am after a large meal:",
  "Universal messages arrive with the persistence of food delivery notifications:",
  "The stars align their gossip more precisely than my meal timing:",
  "Cosmic revelations flow faster than gravy over mashed potatoes:",
  "The zodiac wheel spins with news more urgent than my hunger pangs:",
  "Astral communications reach me clearer than my motivation for exercise:",
  "The celestial orchestra plays a message louder than my digestive symphony:",
  "Planetary wisdom arrives more reliably than my willpower around desserts:",
  "The universal forces coordinate better than my attempts at healthy eating:",
  "Cosmic energies align with more precision than my fork to mouth accuracy:",
  "The stellar network delivers messages faster than pizza on a good night:",
  "Zodiacal influences penetrate my consciousness deeper than afternoon naps:"
];

// Massively expanded horoscope themes (8 per sign instead of 4)
const enhancedHoroscopeThemes = {
  aries: [
    "Your fiery energy drives new beginnings and bold decisions today.",
    "Leadership opportunities present themselves - seize them with confidence.",
    "Your competitive spirit serves you well in current challenges.",
    "Mars energizes your ambitions - channel that drive constructively.",
    "Initiative and courage open doors others fear to approach.",
    "Your natural pioneering spirit discovers uncharted opportunities.",
    "Passionate pursuits lead to breakthrough moments of clarity.",
    "Dynamic energy propels you toward long-awaited goals.",
    "Bold actions today plant seeds for tomorrow's victories.",
    "Your enthusiasm ignites inspiration in others around you.",
    "Fearless exploration of new territories brings unexpected rewards.",
    "Warrior energy within you conquers obstacles with determination.",
    "Fresh starts align with your natural desire for adventure.",
    "Your direct approach cuts through confusion like a sword through silk.",
    "Impulsive decisions made today prove surprisingly wise in hindsight.",
    "Leadership calls to you with opportunities for meaningful impact.",
    "Your pioneering nature blazes trails others will follow with gratitude.",
    "Competitive advantages emerge from your willingness to take calculated risks.",
    "Mars blesses your endeavors with unstoppable momentum and fierce determination.",
    "Revolutionary ideas spark from your innovative approach to old problems."
  ],
  taurus: [
    "Steady progress and practical decisions bring lasting rewards.",
    "Your natural patience helps you weather today's storms gracefully.",
    "Material security and comfort take priority in your choices.",
    "Venus blesses your relationships with harmony and understanding.",
    "Persistence and determination overcome seemingly immovable obstacles.",
    "Your grounded nature provides stability others desperately need.",
    "Sensual pleasures and earthly delights enhance your well-being.",
    "Practical wisdom guides you toward sustainable long-term solutions.",
    "Your reliability becomes a cornerstone others build their plans upon.",
    "Patient cultivation of goals yields fruits sweeter than expected.",
    "Material investments made today appreciate beyond initial projections.",
    "Your steady rhythm creates harmony in chaotic environments.",
    "Comfort and security expand through methodical, consistent efforts.",
    "Natural beauty and artistic expression flow through your endeavors.",
    "Your stubborn streak serves you well in maintaining important boundaries.",
    "Luxurious experiences remind you of life's abundant pleasures.",
    "Grounded decisions prove their worth through practical applications.",
    "Your endurance outlasts temporary setbacks and fleeting difficulties.",
    "Venus enhances your appreciation for quality over quantity in all things.",
    "Slow and steady approaches triumph over hasty, reckless alternatives."
  ],
  gemini: [
    "Communication flows freely - share your ideas with confidence.",
    "Curiosity leads you to discover something unexpectedly valuable.",
    "Your adaptability helps you navigate changing circumstances.",
    "Mercury enhances your wit and social connections today.",
    "Multiple perspectives converge to create innovative solutions.",
    "Your quick thinking turns challenges into intellectual adventures.",
    "Networking and social connections open surprising new pathways.",
    "Versatility becomes your greatest asset in complex situations.",
    "Information gathering reveals patterns others have missed completely.",
    "Your natural curiosity uncovers hidden gems in ordinary places.",
    "Clever wordplay and humor smooth over potential conflicts.",
    "Dual interests combine in unexpected and profitable ways.",
    "Your mental agility outmaneuvers slower, more rigid approaches.",
    "Communication skills bridge gaps between seemingly incompatible groups.",
    "Intellectual stimulation energizes your spirit more than rest.",
    "Quick exchanges of ideas generate momentum for collaborative projects.",
    "Your gift for seeing both sides creates diplomatic solutions.",
    "Mercury's influence sharpens your already considerable wit and wisdom.",
    "Flexible thinking adapts ancient wisdom to modern circumstances.",
    "Learning opportunities multiply through casual conversations and chance encounters."
  ],
  cancer: [
    "Emotional intuition guides you toward the right decisions.",
    "Home and family matters require your nurturing attention.",
    "Your caring nature draws others seeking comfort and advice.",
    "The moon illuminates hidden feelings that need acknowledgment.",
    "Protective instincts help you safeguard what matters most.",
    "Your empathy creates healing spaces for wounded hearts.",
    "Domestic harmony becomes a source of strength and renewal.",
    "Emotional depth enriches your understanding of complex situations.",
    "Nurturing others brings unexpected personal satisfaction and growth.",
    "Your intuitive abilities pierce through deception to truth.",
    "Maternal/paternal energy guides you toward supportive actions.",
    "Memories and traditions provide wisdom for current challenges.",
    "Your sensitive nature detects subtle changes others miss entirely.",
    "Emotional security becomes the foundation for ambitious ventures.",
    "Caring gestures create ripple effects of positive change.",
    "Your protective nature shields the vulnerable from harm.",
    "Lunar cycles align with your natural rhythms for optimal timing.",
    "Home-based activities generate unexpected opportunities and connections.",
    "Your compassionate heart opens doors that logic cannot unlock.",
    "Emotional intelligence navigates complex interpersonal dynamics with grace."
  ],
  leo: [
    "Your natural charisma attracts positive attention and opportunities.",
    "Creative expression brings joy and recognition from others.",
    "Generosity and warmth strengthen your important relationships.",
    "The sun spotlights your talents - let them shine brightly.",
    "Dramatic flair and bold gestures capture imaginations and hearts.",
    "Your confident presence inspires others to reach their potential.",
    "Leadership roles highlight your natural ability to motivate teams.",
    "Creative projects receive enthusiastic support from unexpected sources.",
    "Your generous spirit creates abundance that returns multiplied.",
    "Pride in achievements motivates you toward even greater accomplishments.",
    "Theatrical skills help you communicate complex ideas with clarity.",
    "Your sunny disposition brightens dark moments for everyone around.",
    "Regal bearing and natural dignity command respect without effort.",
    "Creative self-expression unlocks hidden talents and capabilities.",
    "Your loyalty and devotion strengthen bonds with chosen companions.",
    "Spotlight moments allow you to showcase years of hidden preparation.",
    "Solar energy amplifies your natural magnetism and personal appeal.",
    "Your entertainment value brings lightness to heavy situations.",
    "Pride and confidence overcome self-doubt that has held you back.",
    "Creative collaborations combine your vision with others' complementary skills."
  ],
  virgo: [
    "Attention to detail and organization solve persistent problems.",
    "Your practical wisdom helps others find order in chaos.",
    "Health and daily routines benefit from your careful attention.",
    "Mercury rewards your methodical approach with clear insights.",
    "Analytical skills reveal solutions hiding in plain sight.",
    "Your service-oriented nature creates meaningful positive impact.",
    "Perfectionist tendencies ensure quality that stands the test of time.",
    "Systematic approaches yield results superior to improvised efforts.",
    "Your discerning eye distinguishes between valuable and worthless options.",
    "Modest achievements accumulate into impressive overall accomplishments.",
    "Health-conscious choices today prevent bigger problems tomorrow.",
    "Your practical nature finds efficient solutions to wasteful practices.",
    "Critical thinking skills help others avoid costly mistakes.",
    "Humble service creates ripple effects of gratitude and appreciation.",
    "Your meticulous preparation ensures success where others fail.",
    "Organizational skills transform chaotic situations into smoothly running systems.",
    "Mercury enhances your already considerable analytical and communication abilities.",
    "Daily routines become rituals that ground and center your energy.",
    "Your helpful nature positions you as an indispensable team member.",
    "Attention to small details prevents large problems from developing later."
  ],
  libra: [
    "Balance and harmony guide your interactions with others.",
    "Artistic pursuits and beauty bring unexpected inspiration.",
    "Diplomatic skills help resolve conflicts with grace.",
    "Venus encourages cooperation and mutual understanding.",
    "Aesthetic sensibilities create environments that inspire and heal.",
    "Your natural mediation abilities restore peace to troubled situations.",
    "Partnership opportunities align with your collaborative nature.",
    "Justice and fairness become guiding principles in important decisions.",
    "Your charm and social grace open doors to exclusive opportunities.",
    "Beautiful surroundings and artistic expression feed your soul deeply.",
    "Balanced perspectives help others see all sides of complex issues.",
    "Your diplomatic nature bridges differences between opposing factions.",
    "Relationship dynamics improve through your patient, fair-minded approach.",
    "Artistic collaborations combine your vision with others' technical skills.",
    "Your sense of justice motivates action to correct imbalances and inequities.",
    "Social connections provide access to resources and opportunities.",
    "Venus enhances your natural appreciation for beauty, art, and relationships.",
    "Peaceful environments become sanctuaries that restore your energy.",
    "Your cooperative spirit creates win-win solutions from seemingly impossible conflicts.",
    "Harmony and balance in all areas of life create sustainable long-term success."
  ],
  scorpio: [
    "Deep insights and transformation emerge from current challenges.",
    "Your intensity and focus pierce through surface distractions.",
    "Hidden truths reveal themselves when you trust your instincts.",
    "Pluto empowers you to release what no longer serves you.",
    "Investigative abilities uncover secrets others have worked to hide.",
    "Your passionate nature transforms ordinary experiences into profound ones.",
    "Psychological insights help you understand motivations behind behaviors.",
    "Regenerative powers help you bounce back stronger from setbacks.",
    "Your magnetic presence draws others who need your transformative energy.",
    "Deep emotional healing occurs through confronting difficult truths.",
    "Mysterious circumstances reveal themselves through patient observation.",
    "Your penetrating perception sees through facades to underlying reality.",
    "Transformational experiences reshape your understanding of life's meaning.",
    "Hidden resources and secret advantages become available for your use.",
    "Your intensity either attracts or repels - there's no middle ground today.",
    "Psychological depths provide insights that surface knowledge cannot match.",
    "Pluto's influence empowers you to destroy old patterns and create new ones.",
    "Your investigative instincts lead you to discover valuable hidden information.",
    "Passionate pursuits consume your attention and energy completely.",
    "Transformative relationships challenge you to grow beyond current limitations."
  ],
  sagittarius: [
    "Adventure and learning expand your horizons in meaningful ways.",
    "Your optimism and enthusiasm inspire others to dream bigger.",
    "Travel or higher education brings valuable new perspectives.",
    "Jupiter blesses your quest for wisdom and truth.",
    "Philosophical discussions open your mind to revolutionary concepts.",
    "Your adventurous spirit discovers opportunities others consider too risky.",
    "International connections provide access to global opportunities.",
    "Higher learning and spiritual studies reveal profound truths.",
    "Your honesty and directness clear the air of accumulated tensions.",
    "Wanderlust and exploration lead to discoveries that change everything.",
    "Teaching and sharing knowledge becomes a source of personal fulfillment.",
    "Your optimistic outlook transforms challenges into exciting adventures.",
    "Foreign cultures and distant places call to your restless spirit.",
    "Philosophical wisdom guides you through complex moral and ethical dilemmas.",
    "Your freedom-loving nature resists restrictions that limit personal growth.",
    "Jupiter's expansive energy amplifies your natural enthusiasm and curiosity.",
    "Adventure travel combines pleasure with profound personal development.",
    "Your quest for truth leads you to question assumptions others accept blindly.",
    "Cultural exchanges broaden your perspective and understanding of human nature.",
    "Spiritual journeys provide answers to questions you didn't know you had."
  ],
  capricorn: [
    "Discipline and persistence move you closer to long-term goals.",
    "Your reliability and competence earn recognition from authority.",
    "Structure and planning create the foundation for future success.",
    "Saturn rewards your patience with tangible achievements.",
    "Ambitious projects require your steady, methodical approach.",
    "Your practical nature finds realistic solutions to complex problems.",
    "Status and reputation improve through consistent professional excellence.",
    "Long-term investments mature into significant returns on your patience.",
    "Your leadership abilities guide others toward shared objectives.",
    "Traditional approaches prove their worth against trendy alternatives.",
    "Responsibility and duty become sources of personal pride and satisfaction.",
    "Your climbing determination overcomes obstacles that stop others cold.",
    "Material success follows years of careful planning and hard work.",
    "Authority figures recognize your competence and reliability as valuable assets.",
    "Your strategic thinking positions you advantageously for future opportunities.",
    "Mountain-climbing mentality helps you reach previously impossible heights.",
    "Saturn's lessons in patience and persistence finally pay substantial dividends.",
    "Your practical wisdom creates lasting solutions rather than temporary fixes.",
    "Professional recognition acknowledges your years of dedicated service and growth.",
    "Structured approaches to life create stability that supports bigger dreams."
  ],
  aquarius: [
    "Innovation and original thinking set you apart from the crowd.",
    "Friendship and community connections provide unexpected support.",
    "Your humanitarian instincts guide you toward meaningful service.",
    "Uranus sparks revolutionary ideas that could change everything.",
    "Technological solutions emerge from your forward-thinking perspective.",
    "Your unconventional approach discovers alternatives others never consider.",
    "Group activities and collective efforts amplify your individual contributions.",
    "Futuristic visions inspire you to work toward progressive social change.",
    "Your independence and originality attract like-minded innovative spirits.",
    "Humanitarian causes provide outlets for your desire to improve society.",
    "Scientific discoveries and breakthrough innovations capture your imagination.",
    "Your unique perspective offers solutions to problems others find impossible.",
    "Community involvement connects you with people who share your values.",
    "Uranus disrupts old patterns to make space for revolutionary new approaches.",
    "Your eccentric nature becomes an asset in creative and intellectual pursuits.",
    "Friendship networks provide support systems stronger than family ties.",
    "Innovative technology enhances your ability to communicate and create.",
    "Your visionary nature sees possibilities others dismiss as impossible dreams.",
    "Collective consciousness and group wisdom guide your individual choices.",
    "Progressive ideals motivate you to challenge outdated systems and traditions."
  ],
  pisces: [
    "Intuition and compassion open doors to deeper understanding.",
    "Creative imagination flows freely - capture those inspired ideas.",
    "Your empathy helps heal old wounds in yourself and others.",
    "Neptune enhances your spiritual connection and psychic abilities.",
    "Artistic expression channels divine inspiration through your creative gifts.",
    "Your sensitive nature detects subtle energies others cannot perceive.",
    "Compassionate service becomes a pathway to spiritual fulfillment.",
    "Mystical experiences deepen your connection to universal consciousness.",
    "Your emotional depth creates profound connections with kindred spirits.",
    "Psychic impressions provide guidance that logic cannot offer.",
    "Artistic pursuits become vehicles for expressing ineffable spiritual truths.",
    "Your sacrificial nature inspires others to greater generosity and compassion.",
    "Dreams and visions reveal information unavailable through ordinary consciousness.",
    "Healing abilities emerge through your natural empathy and intuitive wisdom.",
    "Your fluid nature adapts to circumstances with graceful acceptance.",
    "Spiritual practices deepen your understanding of life's sacred mysteries.",
    "Neptune dissolves boundaries between self and universal consciousness.",
    "Your imaginative gifts transform ordinary experiences into magical adventures.",
    "Compassionate understanding helps others feel seen, heard, and valued.",
    "Intuitive wisdom guides you through complex emotional and spiritual terrain."
  ]
};

// Enhanced post-comments with more personality
const enhancedPostComments = [
  "*Shrugs and reaches for a snack* The stars said it, not me.",
  "Take that with a grain of salt - preferably on a pretzel.",
  "The cosmos works in mysterious ways, unlike my appetite which is predictable.",
  "That's what the celestial bodies are saying. Mine says it needs lunch.",
  "Don't blame me if Mercury is in microwave or whatever.",
  "*Dusts cosmic debris from his robe* Astrology is hungry work.",
  "The universe has spoken. Now if you'll excuse me, I hear snacks calling.",
  "*Yawns* Even stellar wisdom can't keep me awake past nap time.",
  "That's the cosmic truth, served with a side of skepticism.",
  "*Glances at kitchen* The stars never predict what's for dinner though.",
  "The celestial forces have had their say. Time for mine to have some food.",
  "*Stretches* Reading the cosmos is almost as exhausting as staying awake.",
  "Prophecy delivered! Now someone deliver me a sandwich.",
  "The universe rarely lies, unlike my promises to count calories.",
  "*Adjusts hat* That's what happens when you consult the stars on an empty stomach.",
  "Take it or leave it - the zodiac doesn't offer refunds or exchanges.",
  "*Mutters* Next time ask the stars to include meal recommendations too.",
  "That's your stellar forecast. Mine says it's almost time for pie.",
  "The cosmic realm has spoken. It's surprisingly chatty when I'm sleepy.",
  "*Sighs* Being an astral interpreter is harder work than it looks.",
  "The stars align about as often as my motivation for exercise. Rarely.",
  "*Pats belly* Celestial wisdom flows better through a well-fed vessel.",
  "That's what the planetary positions indicate. Now they indicate I need a break.",
  "The zodiac has delivered its message. Message received, snack time initiated.",
  "*Rubs eyes* Late-night star readings are as tiring as they are mystical."
];

// Enhanced user tracking and preferences
const getZodiacHistory = (): ZodiacHistory => {
  const stored = localStorage.getItem('zodiac_reading_history');
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  
  if (!stored) {
    return {
      readings: [],
      actions: [],
      grumbles: [],
      themes: [],
      postComments: [],
      lastCleared: oneWeekAgo
    };
  }
  
  const history = JSON.parse(stored) as ZodiacHistory;
  
  // Clear history weekly to allow fresh content
  if (new Date(history.lastCleared) < new Date(oneWeekAgo)) {
    return {
      readings: [],
      actions: [],
      grumbles: [],
      themes: [],
      postComments: [],
      lastCleared: new Date().toISOString()
    };
  }
  
  return history;
};

const updateZodiacHistory = (history: ZodiacHistory): void => {
  localStorage.setItem('zodiac_reading_history', JSON.stringify(history));
};

const getZodiacPreferences = (): ZodiacPreferences => {
  const stored = localStorage.getItem('zodiac_user_preferences');
  if (!stored) {
    return {
      readingFrequency: 1,
      preferredTone: 'balanced'
    };
  }
  return JSON.parse(stored) as ZodiacPreferences;
};

const updateZodiacPreferences = (preferences: ZodiacPreferences): void => {
  localStorage.setItem('zodiac_user_preferences', JSON.stringify(preferences));
};

// Smart content selection with history avoidance
const selectUniqueZodiacContent = <T>(pool: T[], history: T[], maxHistory = 8): T => {
  const available = pool.filter(item => !history.includes(item));
  
  if (available.length === 0) {
    // Reset half the history if we've exhausted all options
    history.splice(0, Math.floor(history.length / 2));
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  const selected = available[Math.floor(Math.random() * available.length)];
  
  // Add to history and maintain max size
  history.push(selected);
  if (history.length > maxHistory) {
    history.shift();
  }
  
  return selected;
};

// Daily caching with enhanced tracking
const getTodayDateString = (): string => {
  return new Date().toDateString();
};

const getCachedReading = (sign: ZodiacSign): { reading: string; cached: boolean } | null => {
  const cached = localStorage.getItem(`zodiac_${sign}_${getTodayDateString()}`);
  if (cached) {
    return { reading: cached, cached: true };
  }
  return null;
};

const cacheReading = (sign: ZodiacSign, reading: string): void => {
  localStorage.setItem(`zodiac_${sign}_${getTodayDateString()}`, reading);
};

// Time-based enhancements
const getTimeOfDayModifier = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 6) return " *Rubs sleepy eyes* The pre-dawn stars whisper with unusual clarity.";
  if (hour < 9) return " *Yawns* Morning cosmic energy is... challenging to interpret.";
  if (hour < 12) return " *Stretches* The pre-lunch universe speaks with wisdom.";
  if (hour < 15) return " *Pats satisfied belly* Post-meal astrology is surprisingly accurate.";
  if (hour < 18) return " *Glances toward kitchen* Afternoon stellar activity increases dinner anticipation.";
  if (hour < 21) return " *Settles comfortably* Evening readings have cozy reliability.";
  return " *Blinks drowsily* Night-time cosmic forces are mysteriously chatty.";
};

// Enhanced main function with full tracking and personalization
export const generateEnhancedZodiacReading = (sign: ZodiacSign): string => {
  // Check for today's cached reading first
  const cachedResult = getCachedReading(sign);
  if (cachedResult) {
    return cachedResult.reading;
  }

  // Get user data and preferences
  const history = getZodiacHistory();
  const preferences = getZodiacPreferences();
  
  // Update user preferences
  preferences.readingFrequency += 1;
  if (preferences.favoriteSign !== sign) {
    preferences.favoriteSign = sign;
  }
  updateZodiacPreferences(preferences);

  // Select unique content components
  const action = selectUniqueZodiacContent(enhancedZodiacActions, history.actions);
  const grumble = selectUniqueZodiacContent(enhancedZodiacGrumbles, history.grumbles);
  const themes = enhancedHoroscopeThemes[sign];
  const horoscope = selectUniqueZodiacContent(themes, history.themes, 12);

  // Add post comment with varying probability based on user reading frequency
  const baseCommentChance = 0.3;
  const frequencyBonus = Math.min(preferences.readingFrequency * 0.05, 0.3);
  const totalChance = baseCommentChance + frequencyBonus;
  
  let postComment = "";
  if (Math.random() < totalChance) {
    postComment = " " + selectUniqueZodiacContent(enhancedPostComments, history.postComments);
  }

  // Add occasional time-based modifier (25% chance)
  const timeModifier = Math.random() < 0.25 ? getTimeOfDayModifier() : "";

  // Construct the enhanced reading
  const reading = `${action}\n\n${grumble} "${horoscope}"${postComment}${timeModifier}`;
  
  // Update history and cache the reading
  updateZodiacHistory(history);
  cacheReading(sign, reading);
  
  return reading;
};

// Enhanced function that can be used as drop-in replacement
export const generateZodiacReading = (sign: ZodiacSign): string => {
  return generateEnhancedZodiacReading(sign);
};