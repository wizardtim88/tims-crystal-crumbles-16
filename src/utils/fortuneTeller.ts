
import { FortuneCategory } from "@/types/fortune";

// Lazy, food-obsessed wizard Tim's fortune telling responses
export const generateTimResponse = (category: FortuneCategory = "general"): string => {
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
        "The crystal ball shows two figures sharing a feast. Romance and food - perfect!"
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
        "Your romantic prospects are dimmer than my motivation before breakfast."
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
        "New skills you develop now will pay off later. Master one-handed snacking while working."
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
        "Professional growth will stagnate like my exercise routine. Completely motionless."
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
        "Your vitality increases with the right balance of rest and activity. I prefer 80/20."
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
        "Your stamina will be as reliable as my willpower around desserts. Not at all."
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
        "Your greatest strength is also your greatest weakness. For me, it's cheese appreciation."
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
        "Chaos will reign in your life like it does in my kitchen. Absolutely and completely."
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
  
  // Construct the full response with better spacing
  return `${action}\n\n${grumble} "${fortune}"${postComment}`;
};
