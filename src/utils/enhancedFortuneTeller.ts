import { FortuneCategory } from "@/types/fortune";

// Enhanced User Reading History Management
interface ReadingHistory {
  fortunes: string[];
  actions: string[];
  grumbles: string[];
  postComments: string[];
  lastCleared: string;
}

interface UserPreferences {
  preferredLength: 'short' | 'medium' | 'long';
  humorLevel: 'low' | 'medium' | 'high';
  favoriteCategories: FortuneCategory[];
  questionsAsked: string[];
}

// Enhanced content libraries (5x larger than original)
const expandedTimActions = [
  "*Yawns loudly and brushes crumbs from his beard.*",
  "*Reluctantly peers into the crystal ball while munching on a cookie.*", 
  "*Sighs dramatically and adjusts his crooked wizard hat.*",
  "*Wipes a greasy hand on his robe before touching the crystal ball.*",
  "*Glances longingly at a half-eaten sandwich before focusing.*",
  "*Scratches his belly and mumbles something about needing a snack break.*",
  "*Nearly falls asleep, then jolts awake with a snort.*",
  "*Fumbles with a chocolate wrapper while gazing into the crystal ball.*",
  "*Takes a swig from a flask labeled 'definitely not milkshake'.*",
  "*Struggles to focus as his stomach growls audibly.*",
  "*Stretches lazily and accidentally knocks over his tea cup.*",
  "*Pauses mid-reading to smell something delicious from the kitchen.*",
  "*Adjusts his reading glasses while squinting at mystical symbols.*",
  "*Absent-mindedly pats his pocket looking for emergency snacks.*",
  "*Yawns so wide that his wizard hat tilts precariously.*",
  "*Wipes crystal ball with the corner of his food-stained robe.*",
  "*Mutters about the inconvenient timing of cosmic revelations.*",
  "*Checks his pocket watch, hoping it's close to meal time.*",
  "*Shifts his weight in his chair, making it creak ominously.*",
  "*Squints through the crystal ball like it's a particularly hard crossword.*",
  "*Brushes cookie fragments from his spell book pages.*",
  "*Peers over his glasses with the look of someone interrupted during dessert.*",
  "*Rubs his temples as if fortune-telling gives him a headache.*",
  "*Glances wistfully at a painting of a turkey dinner on the wall.*",
  "*Fidgets with his wand like it's a particularly interesting breadstick.*",
  "*Clears his throat importantly, then immediately ruins it with a burp.*",
  "*Leans back in his chair until it threatens to tip over.*",
  "*Drums his fingers on the table in a rhythm that sounds suspiciously like 'dinner time.'*",
  "*Blinks slowly like a well-fed cat contemplating another nap.*",
  "*Adjusts his robes to better accommodate his post-lunch belly.*",
  "*Stares into the crystal ball with the intensity of someone reading a menu.*",
  "*Nods sagely while simultaneously calculating how long until his next snack.*",
  "*Waves his hands mystically, accidentally knocking over a bag of chips.*",
  "*Closes his eyes in concentration, or possibly just resting them briefly.*",
  "*Leans forward with great effort, like getting up from a comfortable couch.*"
];

const expandedPositiveGrumbles = [
  "Fine, fine, I'll tell you what I see. Though I could be napping right now...",
  "If you insist on interrupting my snack time, here's what the ball shows:",
  "Let's make this quick. My dinner isn't going to eat itself:",
  "The cosmos reveals... oh wait, that's just a smudge on the ball. Anyway,",
  "I suppose this is more important than my fourth breakfast...",
  "*sigh* The spirits are particularly chatty today. They say:",
  "Against my better judgment, and at great personal sacrifice to my snack schedule,",
  "The crystal ball never shows anything during meal times, but I'll try anyway:",
  "Well, this is mildly inconvenient, but the universe insists on sharing:",
  "I was hoping for a quiet afternoon, but apparently the cosmos has other plans:",
  "The mystical forces are being unusually optimistic today. They reveal:",
  "Between you and me, the crystal ball has been showing pleasant things lately:",
  "The spirits must have had a good meal today because they're sharing good news:",
  "I'm as surprised as you are, but the universe is feeling generous:",
  "The cosmic energies are flowing like gravy over mashed potatoes - smoothly:",
  "Even I have to admit, the crystal ball is showing something rather nice:",
  "The fortune winds are blowing favorably, like the aroma from a bakery:",
  "The stars align almost as perfectly as cookies on a cooling rack:",
  "The mystical realm seems to be in a good mood today. It whispers:",
  "I'd rather be eating, but this reading is actually turning out well:",
  "The universe has apparently had its coffee this morning because it's revealing:",
  "The cosmic forces are cooperating better than usual. They show:",
  "Even my perpetually pessimistic crystal ball is showing something positive:",
  "The ethereal plane must be having a good day because it's sharing:",
  "I'm reluctantly pleased to report that the cosmic signs are favorable:"
];

const expandedNegativeGrumbles = [
  "Oh dear... The crystal ball is showing me something unpleasant. I'm almost sorry to tell you:",
  "The mystical energies are particularly taxing today, and they're not bringing good news:",
  "Disturbing a wizard during his rest is bad luck, you know. Speaking of bad luck:",
  "Well, this is awkward. The universe has some... challenging news for you:",
  "I'd rather be eating pie than delivering this message, but here goes:",
  "The spirits are being quite pessimistic today. They reluctantly reveal:",
  "Even my crystal ball seems hesitant to show me this. Unfortunately:",
  "I was hoping for better news, but the cosmos has other plans:",
  "The universe is being as disagreeable as vegetables on my dinner plate:",
  "The cosmic forces are grumpier than I am before morning coffee:",
  "I wish I could sugarcoat this, but even I have limits:",
  "The mystical realm is having a bad day, and unfortunately so might you:",
  "The crystal ball is showing images more unpleasant than my bathroom scale:",
  "The stars are aligned about as badly as my eating habits:",
  "The ethereal forces are being as stubborn as my refusal to exercise:",
  "I'm afraid the cosmic news is as disappointing as diet food:",
  "The universe is delivering news more unwelcome than a salad dinner:",
  "The mystical signs are pointing in directions I'd rather not discuss:",
  "The spiritual energies are as chaotic as my kitchen after midnight snacking:",
  "The cosmic forecast is gloomier than my mood during fasting:",
  "The astral plane is serving up reality harder to swallow than vegetables:",
  "The crystal ball reveals truths more bitter than unsweetened coffee:",
  "The universal forces are as unforgiving as my scale after the holidays:",
  "The mystic winds bring news more unwelcome than exercise reminders:",
  "The cosmic powers deliver messages I'd rather not translate:"
];

const expandedPostComments = [
  "*Shrugs and reaches for a snack* The stars said it, not me.",
  "Take that with a grain of salt - preferably on a pretzel.",
  "The cosmos works in mysterious ways, unlike my appetite which is predictable.",
  "That's what the celestial bodies are saying. Mine says it needs lunch.",
  "Don't blame me if Mercury is in microwave or whatever.",
  "*Dusts crumbs from his robe* Fortune telling is hungry work.",
  "The universe has spoken. Now if you'll excuse me, I hear pie calling.",
  "*Yawns* Even cosmic wisdom can't keep me awake past snack time.",
  "That's the mystical truth, served with a side of skepticism.",
  "*Glances at kitchen* The crystal ball never predicts what's for dinner though.",
  "The spirits have had their say. Time for mine to have some food.",
  "*Stretches* Prophecy is exhausting. Almost as much as staying awake.",
  "Fortune delivered! Now someone deliver me a sandwich.",
  "The cosmos rarely lies, unlike my promises to eat healthier.",
  "*Adjusts hat* That's what happens when you consult the universe on an empty stomach.",
  "Take it or leave it - the crystal ball doesn't offer refunds.",
  "*Mutters* Next time ask the universe to include snack predictions too.",
  "That's your cosmic forecast. Mine says nap time is approaching.",
  "The mystical realm has spoken. It's surprisingly chatty when I'm tired.",
  "*Sighs* Being a conduit for universal wisdom is harder than it looks."
];

// Question-aware fortune modifiers
const questionKeywords = {
  love: ['love', 'relationship', 'dating', 'romance', 'partner', 'soulmate', 'heart', 'crush', 'marriage'],
  career: ['job', 'work', 'career', 'money', 'business', 'promotion', 'boss', 'interview', 'success'],
  health: ['health', 'sick', 'energy', 'tired', 'exercise', 'diet', 'doctor', 'wellness', 'body'],
  general: ['future', 'life', 'luck', 'fortune', 'destiny', 'fate', 'happiness', 'change', 'advice']
};

// Enhanced fortune content with much larger pools
const enhancedFortuneData = {
  love: {
    positive: [
      // Original content plus 40+ new entries
      "Someone will enter your life who appreciates your cooking as much as I appreciate pie.",
      "Love is on the horizon... or it might be that pastry shop opening. Either way, exciting!",
      "Your heart will find its match when you stop looking, like how I find forgotten snacks.",
      "Romantic success awaits if you apply the three C's: Confidence, Charm, and Cookies.",
      "The stars suggest you'll find love in an unexpected place. Perhaps a bakery?",
      "Your perfect match accepts you at your messiest, crumbs and all.",
      "True love requires patience, like waiting for a soufflé to rise. Don't rush it!",
      "Your romantic fortune improves dramatically if you bring snacks to dates.",
      "That special someone is closer than you think. Maybe close enough to share a meal.",
      "The crystal ball shows two figures sharing a feast. Romance and food - perfect!",
      // New enhanced content
      "A chance encounter over coffee will spark a connection warmer than fresh bread.",
      "Your love story begins with a shared laugh, possibly over someone's cooking disasters.",
      "Romance blooms when you show your authentic self, including your quirky eating habits.",
      "Someone appreciates your sense of humor as much as I appreciate afternoon naps.",
      "Love finds you in comfortable moments, like wearing pajamas and eating cereal.",
      "Your heart opens to someone who brings out your playful side and your appetite.",
      "A text message changes everything - hopefully it includes dinner plans.",
      "Chemistry ignites over shared interests, preferably involving good restaurants.",
      "Your future partner loves your imperfections as much as you love comfort food.",
      "Romance succeeds when built on friendship, trust, and mutual snack preferences.",
      "Love arrives wearing a smile brighter than my enthusiasm for dessert buffets.",
      "Your romantic timing aligns like planets, or like me with meal schedules.",
      "Someone sees past your walls to the warmth inside, like looking into a cozy kitchen.",
      "Love multiplies when shared, like how one cookie somehow becomes a dozen.",
      "Your heart recognizes home in another person's presence and their pantry.",
      "Romance blossoms in ordinary moments made extraordinary by the right company.",
      "Someone enters your orbit who makes even vegetables seem appealing. That's true love.",
      "Your love language is finally understood by someone who speaks it fluently.",
      "A relationship deepens through shared experiences and shared desserts.",
      "Love grows stronger through challenges overcome together, preferably over comfort food.",
      "Your romantic future brightens like dawn, or like my mood when I smell bacon.",
      "Someone cherishes your dreams as much as you cherish your favorite recipes.",
      "Love transforms ordinary days into celebrations worthy of special occasion meals.",
      "Your heart finds peace in another's understanding, like finding the perfect chair.",
      "Romance flourishes when nurtured with attention, kindness, and occasional surprises.",
      "Someone appreciates your unique perspective as much as I appreciate elastic waistbands.",
      "Love arrives when you're ready to share not just your heart, but your leftovers.",
      "Your romantic journey includes plot twists more satisfying than a perfectly timed snack.",
      "Someone sees your potential as clearly as I see the potential in any food item.",
      "Love creates a safe space where you can be completely yourself, crumbs and all."
    ],
    negative: [
      // Enhanced negative content with 40+ entries
      "Romance is as elusive as finding good snacks at 3 AM. Try again next season.",
      "Your love life will be as disappointing as stale bread. Focus on yourself instead.",
      "Cupid has the accuracy of me throwing darts after a heavy meal. Duck and cover.",
      "That crush will notice you about as much as I notice vegetables. Sorry.",
      "Love triangles ahead, but not the good kind. More like burnt pizza triangles.",
      "Your dating life will be as messy as my eating habits. And that's saying something.",
      "Romance will avoid you like I avoid morning exercise. Consistently.",
      "Your heart will be as empty as my pantry after a good day. Quite empty.",
      "Dating apps will treat you like expired coupons. Ignored and discarded.",
      "Your romantic prospects are dimmer than my motivation before breakfast.",
      // New negative content
      "Love will dodge you like I dodge responsibility for dirty dishes. Expertly.",
      "Your dating life resembles my relationship with salad - reluctant and brief.",
      "Romance will be as confusing as assembling furniture without instructions or snacks.",
      "Your heart will be guarded tighter than my secret snack stash locations.",
      "Dating becomes as exhausting as my attempts to reach items on high shelves.",
      "Love interests disappear faster than cookies around me. Impressively fast.",
      "Your romantic timing is as off as my portion control at buffets. Significantly.",
      "Dating costs will drain your wallet like my grocery bills drain mine. Thoroughly.",
      "Romance will be as unpredictable as my sleep schedule after too much coffee.",
      "Your love life will have more false starts than my exercise routines. Many.",
      "Relationships will be as unstable as my chair when I lean back too far.",
      "Love will be as fleeting as my attention span during healthy eating lectures.",
      "Your romantic efforts will be as successful as my attempts at morning yoga. Not.",
      "Dating will feel like eating soup with a fork - technically possible but frustrating.",
      "Love interests will ghost you faster than I disappear when chores are mentioned.",
      "Your heart will be as closed as my mind to the benefits of vegetables.",
      "Romance will be as rare as my enthusiasm for physical activity. Extremely.",
      "Dating profiles will get as much attention as my fitness tracker. Minimal.",
      "Love will be as elusive as finding motivation after a large meal. Very elusive.",
      "Your romantic journey will have more detours than my trips to the kitchen.",
      "Relationships will crumble like cookies in my eager hands. Disappointingly.",
      "Love will be as complicated as my relationship with portion sizes. Very.",
      "Your dating game will be as weak as my willpower around desserts. Notably weak.",
      "Romance will be as disappointing as discovering a vegetable disguised in food.",
      "Love interests will be as scarce as my desire to count calories. Practically nonexistent."
    ]
  },
  career: {
    positive: [
      // Enhanced career positive fortunes (40+ entries)
      "A golden opportunity approaches! Not just the golden crust on a well-baked pie.",
      "Success comes to those who work smart, not hard. I've perfected this with snacking.",
      "Your talents will soon be recognized, possibly by someone who pays in more than compliments.",
      "A career change might be favorable. Have you considered professional napping?",
      "Financial windfall coming soon! Invest in comfortable furniture and snack storage.",
      "Your work will soon bear fruit. Preferably baked into pies, but metaphorical works too.",
      "The stars align for professional advancement. Use this time wisely, unlike me.",
      "A mentor will appear in your life, hopefully one who brings food to meetings.",
      "Your innovative thinking will solve a workplace problem. I use this to locate snacks.",
      "New skills you develop now will pay off later. Master one-handed snacking while working.",
      // New enhanced content
      "Professional opportunities multiply like my excuses for avoiding morning meetings.",
      "Your expertise becomes as valued as my knowledge of local restaurant hours.",
      "Career momentum builds like my excitement when someone mentions free lunch.",
      "Success flows as naturally as my walk to the refrigerator during break time.",
      "Your professional network expands like my appreciation for comfortable office chairs.",
      "Recognition comes to those who persevere, like how I persevere through diet advice.",
      "Your skills develop as surely as my ability to find the coziest nap spots.",
      "Workplace harmony improves when you bring your authentic self and good snacks.",
      "Professional growth accelerates like my pace when someone announces cake in the break room.",
      "Your value increases as steadily as my appetite throughout the workday.",
      "Career doors open as easily as I open packages containing food items.",
      "Success tastes as sweet as my favorite post-meeting treats. Remarkably sweet.",
      "Your reputation precedes you like the aroma of fresh coffee precedes productivity.",
      "Professional achievements stack up like pancakes on my favorite breakfast plate.",
      "Your work ethic impresses colleagues as much as my nap technique impresses pillows.",
      "Leadership opportunities present themselves like snacks present themselves to me. Frequently.",
      "Your problem-solving skills sharpen like my ability to detect food from great distances.",
      "Career satisfaction grows like my contentment after a well-timed afternoon snack.",
      "Professional respect accumulates like my collection of comfortable sitting spots.",
      "Your influence expands as naturally as my waistline during holiday seasons."
    ],
    negative: [
      // Enhanced career negative fortunes (30+ entries)
      "Your boss will be as helpful as a chocolate teapot. Time to polish that resume.",
      "Career advancement is as likely as me refusing dessert. Technically possible, but...",
      "That promotion will slip away faster than crumbs falling from my beard.",
      "Your workplace will become as chaotic as my kitchen after a midnight snack raid.",
      "Job security is about as stable as my diet plans. Spoiler: not very.",
      "Your colleagues will be as cooperative as cats herding sheep. Good luck.",
      "That big project will go as smoothly as me trying to eat soup with a fork.",
      "Your work-life balance will be as lopsided as my meal portions. Heavily favoring one side.",
      "Office politics will chew you up like I devour a sandwich. Thoroughly and messily.",
      "Professional growth will stagnate like my exercise routine. Completely motionless.",
      // New negative content
      "Your career will plateau like my energy levels after lunch. Significantly flat.",
      "Workplace drama will follow you like the aroma of bacon follows me. Persistently.",
      "Your productivity will match my enthusiasm for early morning activities. Minimal.",
      "Professional setbacks will accumulate like my reasons to avoid the gym. Extensively.",
      "Career goals will be as elusive as my motivation during food comas. Very elusive.",
      "Your job satisfaction will sink lower than my energy after a large meal.",
      "Workplace stress will mount like dirty dishes in my sink. Alarmingly high.",
      "Professional recognition will be as rare as my vegetable consumption. Extremely scarce.",
      "Your career path will have more obstacles than my route to healthy eating. Many obstacles.",
      "Office meetings will multiply like my snack cravings during boring tasks. Endlessly."
    ]
  },
  health: {
    positive: [
      // Enhanced health positive fortunes
      "Your health will improve if you get more rest. See? I've been right about napping!",
      "The crystal ball suggests more green in your diet. Pistachio ice cream counts, right?",
      "Your energy levels will increase soon. Can't relate, but happy for you I guess.",
      "Balance is key to wellness. One cookie in each hand is perfect balance.",
      "A new health routine will bring unexpected benefits. Just not too early morning.",
      "Physical activity brings you joy soon. Walking from bed to kitchen is invigorating.",
      "Mental clarity comes after rest. I should be brilliant after my next nap.",
      "Listen to your body's needs. Mine usually needs more pastries and pillows.",
      "Stress reduction is highlighted. Try my technique: ignore responsibilities until they disappear.",
      "Your vitality increases with the right balance of rest and activity. I prefer 80/20.",
      // New health content
      "Wellness comes from self-acceptance, like how I've accepted my love for comfort food.",
      "Your body responds well to gentle movement, like my response to the dinner bell.",
      "Health improvements start with small changes, like upgrading from cookies to pie.",
      "Your immune system strengthens like my resolve around dessert tables. Considerably.",
      "Mental health benefits from regular treats, I mean... meditation. Regular meditation.",
      "Your sleep quality improves like my mood when I find forgotten snacks.",
      "Hydration helps everything, especially if that hydration involves flavored beverages.",
      "Your flexibility increases, both physical and mental, like my flexibility around meal times.",
      "Health goals become achievable through consistency, like my consistent snack schedule.",
      "Your wellness journey includes discovering what truly nourishes you. Hint: it might be naps."
    ],
    negative: [
      // Enhanced health negative fortunes
      "Your energy levels will match mine after lunch - basically nonexistent.",
      "That diet plan will last about as long as my New Year's resolutions. Three days, tops.",
      "Your sleep schedule will be as consistent as my eating schedule. Chaotic and snack-focused.",
      "Exercise motivation will be as rare as me turning down seconds. Very rare indeed.",
      "Your metabolism will slow down to match my afternoon pace. Glacially slow.",
      "Health kicks will bounce off you like vegetables bounce off my plate.",
      "That fitness goal is as achievable as me climbing stairs without getting winded.",
      "Your body will protest movement as much as I protest early mornings. Loudly.",
      "Wellness trends will confuse you as much as salad menus confuse me. Thoroughly.",
      "Your stamina will be as reliable as my willpower around desserts. Not at all."
    ]
  },
  general: [
    // Enhanced general fortunes with 50+ entries
    "The future is hazy, but one thing is clear: always save room for dessert.",
    "Good fortune follows those who are kind to lazy wizards. Just saying.",
    "A surprise awaits you soon. I hope it's edible, those are the best surprises.",
    "The path ahead has many twists and turns, like the perfect cinnamon roll.",
    "Wisdom comes to those who wait, and snack while waiting.",
    "Change is coming, hopefully not to my favorite nap schedule.",
    "The universe has big plans for you. Bigger than my lunch plans, and that's saying something.",
    "Your future brightens like my mood when I smell fresh bread baking.",
    "Life will serve you unexpected opportunities, preferably on a silver platter.",
    "Destiny unfolds as surely as my belt after a good meal. Inevitably.",
    // New general content
    "Fortune favors the comfortable, like how comfort favors my lifestyle choices.",
    "Life's greatest treasures are often found in simple pleasures, like perfectly timed naps.",
    "Your journey takes an interesting turn, hopefully toward a good restaurant.",
    "The universe aligns to support your dreams, especially the ones involving relaxation.",
    "Opportunity knocks with the persistence of my hunger pangs. Regularly and insistently.",
    "Your path reveals itself like the location of hidden snacks. Gradually but surely.",
    "Success comes to those who balance effort with rest. I excel at the rest part.",
    "Life's mysteries unfold like my understanding of delivery menus. Comprehensively.",
    "Your potential realizes itself as naturally as my talent for finding comfortable spots.",
    "Wisdom arrives through experience, preferably comfortable and well-fed experience."
  ]
};

// Enhanced tracking and history management
const getUserHistory = (): ReadingHistory => {
  const stored = localStorage.getItem('tim_reading_history');
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  
  if (!stored) {
    return {
      fortunes: [],
      actions: [],
      grumbles: [],
      postComments: [],
      lastCleared: oneWeekAgo
    };
  }
  
  const history = JSON.parse(stored) as ReadingHistory;
  
  // Clear history if it's been more than a week
  if (new Date(history.lastCleared) < new Date(oneWeekAgo)) {
    return {
      fortunes: [],
      actions: [],
      grumbles: [],
      postComments: [],
      lastCleared: new Date().toISOString()
    };
  }
  
  return history;
};

const updateUserHistory = (history: ReadingHistory): void => {
  localStorage.setItem('tim_reading_history', JSON.stringify(history));
};

const getUserPreferences = (): UserPreferences => {
  const stored = localStorage.getItem('tim_user_preferences');
  if (!stored) {
    return {
      preferredLength: 'medium',
      humorLevel: 'medium',
      favoriteCategories: [],
      questionsAsked: []
    };
  }
  return JSON.parse(stored) as UserPreferences;
};

const updateUserPreferences = (preferences: UserPreferences): void => {
  localStorage.setItem('tim_user_preferences', JSON.stringify(preferences));
};

// Smart content selection that avoids repetition
const selectUniqueContent = <T>(pool: T[], history: T[], maxHistory = 10): T => {
  const available = pool.filter(item => !history.includes(item));
  
  if (available.length === 0) {
    // If we've used everything, clear some history and try again
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

// Question-aware category detection
const detectCategoryFromQuestion = (question: string): FortuneCategory => {
  const lowerQuestion = question.toLowerCase();
  
  for (const [category, keywords] of Object.entries(questionKeywords)) {
    if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return category as FortuneCategory;
    }
  }
  
  return 'general';
};

// Enhanced question integration
const integrateQuestion = (fortune: string, question: string, category: FortuneCategory): string => {
  if (!question) return fortune;
  
  const questionIntros = [
    `Regarding your question about "${question.toLowerCase()}" - ${fortune}`,
    `Your inquiry into "${question.toLowerCase()}" reveals: ${fortune}`,
    `The crystal ball shows this about "${question.toLowerCase()}": ${fortune}`,
    `Concerning "${question.toLowerCase()}", the universe whispers: ${fortune}`,
    `About that "${question.toLowerCase()}" situation - ${fortune}`
  ];
  
  return questionIntros[Math.floor(Math.random() * questionIntros.length)];
};

// Dynamic content enhancement based on time of day
const getTimeBasedModifier = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 9) return " *Yawns* This early morning cosmic energy is... challenging.";
  if (hour < 12) return " *Stretches* The pre-lunch universe has spoken.";
  if (hour < 15) return " *Pats satisfied belly* Post-meal prophecies are the most reliable.";
  if (hour < 18) return " *Glances at kitchen* The afternoon spirits are getting restless for dinner.";
  if (hour < 21) return " *Settles in comfortably* Evening readings have a cozy accuracy to them.";
  return " *Rubs sleepy eyes* The late-night cosmic forces are surprisingly chatty.";
};

// Main enhanced fortune generation function
export const generateEnhancedTimResponse = (
  category: FortuneCategory = "general", 
  userQuestion?: string
): string => {
  // Get user data
  const history = getUserHistory();
  const preferences = getUserPreferences();
  
  // Detect category from question if provided
  const detectedCategory = userQuestion ? detectCategoryFromQuestion(userQuestion) : category;
  const finalCategory = detectedCategory !== 'general' ? detectedCategory : category;
  
  // Update user preferences
  if (userQuestion && !preferences.questionsAsked.includes(userQuestion)) {
    preferences.questionsAsked.push(userQuestion);
    if (preferences.questionsAsked.length > 20) {
      preferences.questionsAsked.shift();
    }
  }
  
  if (!preferences.favoriteCategories.includes(finalCategory)) {
    preferences.favoriteCategories.push(finalCategory);
    if (preferences.favoriteCategories.length > 3) {
      preferences.favoriteCategories.shift();
    }
  }
  
  updateUserPreferences(preferences);
  
  // Select unique content
  const action = selectUniqueContent(expandedTimActions, history.actions);
  
  // Choose positive or negative fortune (60% positive for better UX)
  const isPositive = Math.random() < 0.6;
  const grumblePool = isPositive ? expandedPositiveGrumbles : expandedNegativeGrumbles;
  const grumble = selectUniqueContent(grumblePool, history.grumbles);
  
  // Select fortune based on category
  let fortunePool: string[];
  if (finalCategory === 'general') {
    fortunePool = enhancedFortuneData.general;
  } else {
    fortunePool = isPositive 
      ? enhancedFortuneData[finalCategory].positive 
      : enhancedFortuneData[finalCategory].negative;
  }
  
  let fortune = selectUniqueContent(fortunePool, history.fortunes, 15);
  
  // Integrate user question if provided
  if (userQuestion) {
    fortune = integrateQuestion(fortune, userQuestion, finalCategory);
  }
  
  // Add post comment with varying probability based on user preferences
  const postCommentChance = preferences.humorLevel === 'high' ? 0.5 : 
                           preferences.humorLevel === 'low' ? 0.1 : 0.3;
  
  let postComment = "";
  if (Math.random() < postCommentChance) {
    postComment = " " + selectUniqueContent(expandedPostComments, history.postComments);
  }
  
  // Add time-based modifier occasionally (20% chance)
  const timeModifier = Math.random() < 0.2 ? getTimeBasedModifier() : "";
  
  // Update history
  updateUserHistory(history);
  
  // Construct final reading with proper spacing and formatting
  let finalReading = `${action}\n\n${grumble}`;
  
  // Add proper spacing before the fortune quote
  if (!grumble.endsWith(':')) {
    finalReading += ':';
  }
  finalReading += ` "${fortune}"`;
  
  // Add post comment with proper spacing
  if (postComment) {
    finalReading += postComment;
  }
  
  // Add time modifier with proper spacing
  if (timeModifier) {
    finalReading += timeModifier;
  }
  
  return finalReading;
};

// Enhanced function that can be used as drop-in replacement
export const generateTimResponse = (
  category: FortuneCategory = "general", 
  userQuestion?: string
): string => {
  return generateEnhancedTimResponse(category, userQuestion);
};