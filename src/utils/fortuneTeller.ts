
import { FortuneCategory } from "@/types/fortune";

// Lazy, food-obsessed wizard Tim's fortune telling responses
export const generateTimResponse = (category: FortuneCategory = "general", userQuestion?: string): string => {
  // Tim's actions (always in asterisks to be rendered in italics) - now with proper capitalization and punctuation
  const timActions = [
    "*Yawns loudly and brushes crumbs from his beard.*",
    "*Reluctantly peers into the crystal ball while munching on a cookie.*",
    "*Sighs dramatically and adjusts his crooked wizard hat.*",
    "*Wipes a greasy hand on his robe before touching the crystal ball.*",
    "*Glances longingly at a half-eaten sandwich before focusing.*",
    "*Scratches his belly and mumbles something about needing a snack break.*",
    "*Nearly falls asleep, then jolts awake with a snort.*",
    "*Fumbles with a chocolate wrapper while gazing into the crystal ball.*",
    "*Takes a swig from a flask labeled 'definitely not milkshake'.*",
    "*Struggles to focus as his stomach growls audibly.*"
  ];
  
  // Tim's grumbling prefaces - now with tone-specific variants
  const positiveGrumbles = [
    "Fine, fine, I'll tell you what I see. Though I could be napping right now...",
    "If you insist on interrupting my snack time, here's what the ball shows:",
    "Let's make this quick. My dinner isn't going to eat itself:",
    "The cosmos reveals... oh wait, that's just a smudge on the ball. Anyway,",
    "I suppose this is more important than my fourth breakfast...",
    "*sigh* The spirits are particularly chatty today. They say:",
    "Against my better judgment, and at great personal sacrifice to my snack schedule,",
    "The crystal ball never shows anything during meal times, but I'll try anyway."
  ];
  
  const negativeGrumbles = [
    "Oh dear... the crystal ball is showing me something unpleasant. I'm almost sorry to tell you:",
    "The mystical energies are particularly taxing today, and they're not bringing good news:",
    "Disturbing a wizard during his rest is bad luck, you know. Speaking of bad luck:",
    "Well, this is awkward. The universe has some... challenging news for you:",
    "I'd rather be eating pie than delivering this message, but here goes:",
    "The spirits are being quite pessimistic today. They reluctantly reveal:",
    "Even my crystal ball seems hesitant to show me this. Unfortunately:",
    "I was hoping for better news, but the cosmos has other plans:"
  ];
  
  // Define fortunes with positive and negative arrays for each category
  const fortuneData = {
    love: {
      positive: [
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
        "Love will bloom like my appetite after a good nap - suddenly and powerfully.",
        "Your soulmate shares your appreciation for the finer things: comfort and good food.",
        "Romance enters through the stomach, as I always say. Cook together, stay together.",
        "Venus aligns with my dinner schedule - meaning romance is perfectly timed for you.",
        "A chance encounter over food will spark something magical. Bring napkins.",
        "Your dating life improves once you stop trying so hard and start being yourself.",
        "Someone will appreciate your quirks as much as I appreciate a well-timed snack.",
        "Love finds you when you're busy doing what you love. Like eating pie.",
        "Your heart opens to new possibilities, wider than my mouth at buffet time.",
        "The universe conspires to bring you love. Unlike how it conspires against my diet.",
        "Romance blossoms when you least expect it, like finding chocolate in forgotten pockets.",
        "Your charm works best when you're relaxed and well-fed. Take notes from my lifestyle.",
        "Love letters will be sweeter than my favorite desserts. And that's quite sweet.",
        "Moonlit dinners are in your future. I recommend bringing extra portions.",
        "Passion ignites like my enthusiasm for surprise snacks. Suddenly and intensely.",
        "Your romantic aura strengthens with each act of kindness. And each shared meal.",
        "Cupid aims true when you're at your most comfortable. Sweatpants-level comfortable.",
        "A text message will change everything. Hopefully it's dinner plans.",
        "Love multiplies when shared, like how pizza slices mysteriously disappear around me.",
        "Your future partner will understand your need for alone time. And snack time."
      ],
      negative: [
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
        "Love will dodge you like I dodge vegetables at dinner. Expertly and consistently.",
        "Your romantic life will be as exciting as watching paint dry on wet toast.",
        "Cupid took the day off and forgot to tell anyone. Permanently.",
        "Romance will be as rare as my urge to exercise after a meal. Nonexistent.",
        "Your love life mirrors my relationship with salad - reluctant and short-lived.",
        "Dating will feel like eating without seasoning. Bland and disappointing.",
        "Your heart will be as closed as my mind to morning workouts. Completely.",
        "Romance will slip through your fingers like crumbs through mine. Constantly.",
        "Love will be as elusive as the last slice of cake when I'm nearby. Gone instantly.",
        "Your dating profile gets as much attention as my exercise equipment. None.",
        "Romance will ghost you faster than I disappear when chores are mentioned.",
        "Love interests will fade like my willpower at dessert time. Quickly and completely.",
        "Your pickup lines work as well as my diet attempts. Spoiler: they don't.",
        "Dating will drain your energy like climbing stairs drains mine. Thoroughly.",
        "Your romantic timing is as bad as mine with portion control. Consistently off.",
        "Love will be as confusing as instructions on healthy eating. Utterly baffling.",
        "Your heart breaks as easily as my promises to eat vegetables. Frequently.",
        "Romance will be as reliable as my commitment to morning jogs. Not at all.",
        "Dating costs will exceed your budget like my food costs exceed mine. Significantly.",
        "Your love life will have more plot holes than my excuses for avoiding exercise."
      ]
    },
    career: {
      positive: [
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
        "Professional success comes to those who balance work and rest. I've mastered the rest part.",
        "Your career path brightens like my mood when I smell fresh bread baking.",
        "A lucrative opportunity appears, possibly involving food. The best kind of opportunity.",
        "Your work ethic impresses superiors as much as pie impresses me. Considerably.",
        "Networking events will actually be useful, especially if they serve good appetizers.",
        "Your creativity flows like my enthusiasm for second helpings. Abundantly.",
        "Leadership qualities emerge when you're well-fed and well-rested. Take note.",
        "A windfall arrives just when you need it most, like finding cookies in your pocket.",
        "Your professional reputation grows like my appreciation for comfortable chairs. Steadily.",
        "Career doors open as easily as I open snack containers. Effortlessly.",
        "Success tastes as sweet as my favorite dessert. Which is saying something.",
        "Your value at work becomes as obvious as my need for afternoon naps. Very obvious.",
        "Professional achievements stack up like pancakes on my plate. Impressively high.",
        "Your resume will shine brighter than the grease stains on my robe. Impressively bright.",
        "Promotions come to those who persevere, like how I persevere through buffet lines.",
        "Your expertise will be sought after like my secret to finding the best naps spots.",
        "Work-life balance improves when you prioritize rest. I'm basically a productivity guru.",
        "Your salary increases as steadily as my appreciation for afternoon tea breaks.",
        "Team projects succeed when everyone contributes. I contribute snack recommendations.",
        "Professional growth accelerates like my walk to the kitchen when dinner's ready.",
        "Your skills develop naturally, like my talent for avoiding physical labor.",
        "Career momentum builds like my excitement when someone mentions free food.",
        "Your workplace influence expands like my waistline. Gradually but noticeably.",
        "Success multiplies when you help others, especially if they bring cookies.",
        "Your professional network grows stronger than my coffee preferences. Very strong."
      ],
      negative: [
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
        "Your performance reviews will be as pleasant as my morning alarm. Not pleasant at all.",
        "Career goals will be as achievable as my fitness resolutions. Laughably optimistic.",
        "Your workload increases faster than my appetite after smelling fresh bread. Exponentially.",
        "Office meetings will multiply like my excuses for avoiding responsibilities. Endlessly.",
        "Your productivity will match my enthusiasm for early mornings. Practically nonexistent.",
        "Deadlines will chase you like the aroma of bacon chases me. Relentlessly.",
        "Your stress levels will rise like my blood pressure when the kitchen is closed.",
        "Professional setbacks accumulate like dirty dishes in my sink. Alarmingly fast.",
        "Your job satisfaction will be as low as my motivation before coffee. Rock bottom.",
        "Career opportunities will vanish like donuts at a police convention. Instantly and completely.",
        "Your salary will grow as slowly as my desire to exercise. Glacially.",
        "Work emails will haunt you like the memory of vegetables on my plate. Persistently.",
        "Your career trajectory will flatline like my activity tracker during nap time.",
        "Professional respect will be as rare as my vegetable consumption. Extremely scarce.",
        "Your resume will gather dust like my gym membership. Extensively and sadly."
      ]
    },
    health: {
      positive: [
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
        "Hydration improves everything. I recommend flavored water. Coffee is flavored water.",
        "Your immune system strengthens like my resolve around dessert. Significantly.",
        "Wellness comes from within, specifically from the stomach region. Keep it happy.",
        "Your flexibility improves, both physical and mental. I'm flexible about meal times.",
        "Health goals become achievable when broken into small steps. Like steps to the fridge.",
        "Your mood lifts like my spirits when I smell fresh cookies baking. Noticeably.",
        "Better sleep patterns emerge naturally, like my talent for finding comfortable spots.",
        "Your skin glows with health, unlike my complexion after too much cheese.",
        "Digestive health improves when you eat mindfully. I'm very mindful of flavor.",
        "Your posture improves from awareness, unlike mine which suffers from comfortable chairs.",
        "Mental health benefits from self-care rituals. Mine involve strategic napping.",
        "Your breathing deepens like my sighs when faced with exercise equipment.",
        "Circulation improves with gentle movement. Reaching for snacks counts as movement.",
        "Your appetite regulates naturally, unlike mine which operates on 'see food' diet principles.",
        "Health momentum builds like my excitement for meal announcements. Steadily and surely."
      ],
      negative: [
        "Your energy levels will match mine after lunch - basically nonexistent.",
        "That diet plan will last about as long as my New Year's resolutions. Three days, tops.",
        "Your sleep schedule will be as consistent as my eating schedule. Chaotic and snack-focused.",
        "Exercise motivation will be as rare as me turning down seconds. Very rare indeed.",
        "Your metabolism will slow down to match my afternoon pace. Glacially slow.",
        "Health kicks will bounce off you like vegetables bounce off my plate.",
        "That fitness goal is as achievable as me climbing stairs without getting winded.",
        "Your body will protest movement as much as I protest early mornings. Loudly.",
        "Wellness trends will confuse you as much as salad menus confuse me. Thoroughly.",
        "Your stamina will be as reliable as my willpower around desserts. Not at all.",
        "Medical checkups will be as pleasant as my morning weigh-ins. Deeply uncomfortable.",
        "Your joints will creak like my chair when I sit down after meals. Audibly.",
        "Health apps will judge you as harshly as my bathroom scale judges me. Mercilessly.",
        "Your flexibility will be as limited as my tolerance for vegetables. Severely restricted.",
        "Gym memberships will mock you like mine mocks me. Silently but persistently.",
        "Your water intake will be as sporadic as my attempts at portion control. Inconsistent.",
        "Sleep quality will deteriorate like my posture during extended eating sessions.",
        "Your stress levels will spike like my heart rate when climbing stairs. Dramatically.",
        "Health goals will be as elusive as my motivation before noon. Completely absent.",
        "Your immune system will be as weak as my excuses for avoiding exercise. Pretty weak.",
        "Wellness routines will fail like my diet plans. Spectacularly and repeatedly.",
        "Your endurance will be as short-lived as my interest in fitness videos. Very brief.",
        "Health supplements will disappoint you like vegetables disappoint me. Consistently.",
        "Your recovery time will be as long as my afternoon naps. Impressively extended.",
        "Medical advice will be as ignored as my nutrition recommendations. Completely disregarded."
      ]
    },
    general: {
      positive: [
        "The future is hazy, but one thing is clear: always save room for dessert.",
        "Good fortune follows those who are kind to lazy wizards. Just saying.",
        "A surprise awaits you soon. I hope it's edible, those are the best surprises.",
        "The path ahead has many twists and turns, like the perfect cinnamon roll.",
        "Wisdom comes to those who wait, and snack while waiting.",
        "Your luck improves when you embrace spontaneity, like ordering the special without asking.",
        "A small act of kindness will return to you threefold. Does letting me nap count?",
        "The answer you seek is right in front of you. So is my lunch, please don't block it.",
        "Patience brings rewards. I've been patient for seconds at dinner for years.",
        "Your greatest strength is also your greatest weakness. For me, it's cheese appreciation.",
        "Today brings unexpected joy, like finding forgotten cookies in your coat pocket.",
        "Your intuition strengthens like my ability to detect fresh bread from three rooms away.",
        "Life's rhythm improves when you stop rushing, like how I've perfected leisurely eating.",
        "Small changes lead to big results, much like how small snacks lead to big satisfaction.",
        "Your perspective shifts favorably, unlike my perspective on morning exercise.",
        "Abundance flows toward you like gravy flows toward my plate. Naturally and generously.",
        "Inner peace arrives when you accept yourself, flaws and all. I've mastered this.",
        "Your path becomes clearer, like my view of the dessert menu. Crystal clear.",
        "Harmony enters your life like the perfect blend of flavors in a good meal.",
        "Positive energy surrounds you, similar to how the aroma of fresh bread surrounds me.",
        "Your confidence grows like my appreciation for comfortable furniture. Steadily.",
        "Life's pleasures multiply when shared, much like how meals taste better with company.",
        "Your purpose reveals itself gradually, like the layers of a perfectly made lasagna.",
        "Serendipity works in your favor, bringing exactly what you need when you need it.",
        "Your spirit lightens like my mood when someone mentions unexpected snack deliveries."
      ],
      negative: [
        "Fortune favors the bold, but today it's taking a nap. Come back tomorrow.",
        "Luck will avoid you like I avoid morning responsibilities. Consistently and skillfully.",
        "The universe has about as much concern for your plans as I have for calorie counting.",
        "Obstacles ahead will multiply like crumbs in my beard. Numerous and persistent.",
        "Your day will go as smoothly as my attempts at healthy eating. Not smoothly.",
        "Expect setbacks as frequent as my snack breaks. Every hour or so.",
        "The cosmos is as indifferent to your troubles as I am to vegetables. Completely.",
        "Your luck will be as consistent as my sleep schedule. Wildly unpredictable.",
        "Murphy's Law will follow you like the scent of fresh bread follows me. Relentlessly.",
        "Chaos will reign in your life like it does in my kitchen. Absolutely and completely.",
        "Your plans will crumble faster than cookies in my eager hands. Disappointingly fast.",
        "Life will test your patience like waiting for a slow oven tests mine. Extensively.",
        "Your expectations will be dashed like my hopes for an early dinner. Repeatedly.",
        "Mishaps will accumulate like the dishes in my sink. Alarmingly and consistently.",
        "Your motivation will waver like my commitment to morning exercise. Constantly.",
        "Problems will pile up like my excuses for avoiding housework. Impressively high.",
        "Your resolve will weaken like mine around a fresh pie. Quickly and completely.",
        "Difficulties will persist like my inability to resist second helpings. Stubbornly.",
        "Your optimism will fade like my energy after a large meal. Gradually then suddenly.",
        "Complications will arise like my hunger between scheduled meals. Predictably and frequently.",
        "Your composure will crack like my discipline around dessert displays. Easily and often.",
        "Misfortune will cling to you like flour clings to my apron. Persistently and visibly.",
        "Your momentum will stall like my productivity after lunch. Completely and thoroughly.",
        "Frustrations will mount like my reluctance to climb stairs. Steadily and obviously.",
        "Your spirits will droop like my posture in comfortable chairs. Noticeably and naturally."
      ]
    }
  };
  
  // 50/50 chance to determine if fortune should be positive or negative
  const isPositive = Math.random() < 0.5;
  
  // Select appropriate arrays based on category and tone
  const categoryFortunes = fortuneData[category];
  const selectedFortunes = isPositive ? categoryFortunes.positive : categoryFortunes.negative;
  const selectedGrumbles = isPositive ? positiveGrumbles : negativeGrumbles;
  
  // Select random components
  const action = timActions[Math.floor(Math.random() * timActions.length)];
  const grumble = selectedGrumbles[Math.floor(Math.random() * selectedGrumbles.length)];
  const fortune = selectedFortunes[Math.floor(Math.random() * selectedFortunes.length)];
  
  // Post-fortune comments - now tone-aware
  const positivePostComments = [
    "*Stifles a yawn* That's all I've got. Now, about that nap...",
    "That'll be five gold coins. I accept payment in cookies as well.",
    "Don't shoot the messenger if that doesn't pan out. Prophecy is hungry work.",
    "If you want more details, come back after I've had lunch. And dinner. And second dinner.",
    "The crystal ball is getting foggy. Must be time for my scheduled snack break."
  ];
  
  const negativePostComments = [
    "*Winces slightly* Sorry about that. Even I feel bad delivering news this grim.",
    "Don't blame me, I just read what the crystal ball shows. Maybe try again after I've eaten?",
    "Well, that was depressing. I need a comfort snack now. And maybe a nap.",
    "The universe can be harsh sometimes. At least there's still pie in the world.",
    "*Shrugs apologetically* Sometimes the cosmos has a twisted sense of humor."
  ];
  
  const selectedPostComments = isPositive ? positivePostComments : negativePostComments;
  
  // 30% chance to add a post-fortune comment
  const shouldAddPostComment = Math.random() < 0.3;
  const postComment = shouldAddPostComment 
    ? " " + selectedPostComments[Math.floor(Math.random() * selectedPostComments.length)]
    : "";
  
  // Add user question context if provided
  const questionContext = userQuestion 
    ? `\n\n*Tim squints at the crystal ball, clearly annoyed at having to focus on something specific.*\n\nSo you asked: "${userQuestion}" Well, let me see what the mystical forces have to say about that...\n\n`
    : "\n\n";

  // Construct the full response with better spacing
  return `${action}${questionContext}${grumble} "${fortune}"${postComment}`;
};
