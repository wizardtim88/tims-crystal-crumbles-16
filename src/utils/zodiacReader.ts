
import { ZodiacSign } from "@/types/zodiac";

// Tim's zodiac-specific actions and grumbles
const timZodiacActions = [
  "*Yawns and squints at the crystal ball with obvious skepticism.*",
  "*Rolls his eyes while reluctantly consulting his star charts.*",
  "*Brushes cookie crumbs off an ancient astrology book.*",
  "*Grumbles about 'cosmic nonsense' while gazing at the stars.*",
  "*Sighs dramatically and adjusts his wizard hat skeptically.*",
  "*Mutters about preferring food horoscopes while reading the stars.*",
  "*Reluctantly waves his hands over the crystal ball with astrological symbols.*",
  "*Takes a bite of pie while consulting planetary alignments.*",
  "*Scratches his belly and peers at constellation charts.*",
  "*Nearly dozes off while waiting for cosmic inspiration.*"
];

const timZodiacGrumbles = [
  "The stars are being particularly chatty today, though I'd rather they talk about lunch:",
  "Against my better judgment, the cosmic forces reveal:",
  "The universe insists on sharing this stellar gossip:",
  "My crystal ball is picking up celestial chatter - apparently:",
  "The planets have aligned to disturb my nap with this message:",
  "Cosmic energies are as persistent as my hunger pangs, saying:",
  "The stars are gossiping louder than my stomach rumbling:",
  "Astral forces interrupt my snack time to announce:",
  "The zodiac spirits won't let me eat in peace until I tell you:",
  "Stellar influences are more demanding than my dinner bell:"
];

// Real horoscope data - basic daily themes
const horoscopeThemes = {
  aries: [
    "Your fiery energy drives new beginnings and bold decisions today.",
    "Leadership opportunities present themselves - seize them with confidence.",
    "Your competitive spirit serves you well in current challenges.",
    "Mars energizes your ambitions - channel that drive constructively."
  ],
  taurus: [
    "Steady progress and practical decisions bring lasting rewards.",
    "Your natural patience helps you weather today's storms gracefully.",
    "Material security and comfort take priority in your choices.",
    "Venus blesses your relationships with harmony and understanding."
  ],
  gemini: [
    "Communication flows freely - share your ideas with confidence.",
    "Curiosity leads you to discover something unexpectedly valuable.",
    "Your adaptability helps you navigate changing circumstances.",
    "Mercury enhances your wit and social connections today."
  ],
  cancer: [
    "Emotional intuition guides you toward the right decisions.",
    "Home and family matters require your nurturing attention.",
    "Your caring nature draws others seeking comfort and advice.",
    "The moon illuminates hidden feelings that need acknowledgment."
  ],
  leo: [
    "Your natural charisma attracts positive attention and opportunities.",
    "Creative expression brings joy and recognition from others.",
    "Generosity and warmth strengthen your important relationships.",
    "The sun spotlights your talents - let them shine brightly."
  ],
  virgo: [
    "Attention to detail and organization solve persistent problems.",
    "Your practical wisdom helps others find order in chaos.",
    "Health and daily routines benefit from your careful attention.",
    "Mercury rewards your methodical approach with clear insights."
  ],
  libra: [
    "Balance and harmony guide your interactions with others.",
    "Artistic pursuits and beauty bring unexpected inspiration.",
    "Diplomatic skills help resolve conflicts with grace.",
    "Venus encourages cooperation and mutual understanding."
  ],
  scorpio: [
    "Deep insights and transformation emerge from current challenges.",
    "Your intensity and focus pierce through surface distractions.",
    "Hidden truths reveal themselves when you trust your instincts.",
    "Pluto empowers you to release what no longer serves you."
  ],
  sagittarius: [
    "Adventure and learning expand your horizons in meaningful ways.",
    "Your optimism and enthusiasm inspire others to dream bigger.",
    "Travel or higher education brings valuable new perspectives.",
    "Jupiter blesses your quest for wisdom and truth."
  ],
  capricorn: [
    "Discipline and persistence move you closer to long-term goals.",
    "Your reliability and competence earn recognition from authority.",
    "Structure and planning create the foundation for future success.",
    "Saturn rewards your patience with tangible achievements."
  ],
  aquarius: [
    "Innovation and original thinking set you apart from the crowd.",
    "Friendship and community connections provide unexpected support.",
    "Your humanitarian instincts guide you toward meaningful service.",
    "Uranus sparks revolutionary ideas that could change everything."
  ],
  pisces: [
    "Intuition and compassion open doors to deeper understanding.",
    "Creative imagination flows freely - capture those inspired ideas.",
    "Your empathy helps heal old wounds in yourself and others.",
    "Neptune enhances your spiritual connection and psychic abilities."
  ]
};

// Generate today's date string
const getTodayDateString = (): string => {
  return new Date().toDateString();
};

// Check if we have a cached reading for today
const getCachedReading = (sign: ZodiacSign): string | null => {
  const cached = localStorage.getItem(`zodiac_${sign}_${getTodayDateString()}`);
  return cached;
};

// Cache today's reading
const cacheReading = (sign: ZodiacSign, reading: string): void => {
  localStorage.setItem(`zodiac_${sign}_${getTodayDateString()}`, reading);
};

export const generateZodiacReading = (sign: ZodiacSign): string => {
  // Check for cached reading first
  const cached = getCachedReading(sign);
  if (cached) {
    return cached;
  }

  // Generate new reading
  const action = timZodiacActions[Math.floor(Math.random() * timZodiacActions.length)];
  const grumble = timZodiacGrumbles[Math.floor(Math.random() * timZodiacGrumbles.length)];
  const themes = horoscopeThemes[sign];
  const horoscope = themes[Math.floor(Math.random() * themes.length)];

  // Tim's post-zodiac comments (30% chance)
  const postComments = [
    "*Shrugs and reaches for a snack* The stars said it, not me.",
    "Take that with a grain of salt - preferably on a pretzel.",
    "The cosmos works in mysterious ways, unlike my appetite which is predictable.",
    "That's what the celestial bodies are saying. Mine says it needs lunch.",
    "Don't blame me if Mercury is in microwave or whatever."
  ];

  const shouldAddPostComment = Math.random() < 0.3;
  const postComment = shouldAddPostComment 
    ? " " + postComments[Math.floor(Math.random() * postComments.length)]
    : "";

  // Construct the full reading
  const reading = `${action}\n\n${grumble} "${horoscope}"${postComment}`;
  
  // Cache the reading
  cacheReading(sign, reading);
  
  return reading;
};
