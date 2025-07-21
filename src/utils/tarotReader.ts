import { TarotCard, DrawnCard, TarotReading } from '@/types/tarot';

// Major Arcana deck with Tim's snarky interpretations
export const majorArcana: TarotCard[] = [
  {
    id: "fool",
    name: "The Fool",
    major: true,
    keywords: ["new beginnings", "innocence", "adventure"],
    uprightMeaning: "New beginnings, innocence, spontaneity, free spirit",
    reversedMeaning: "Holding back, recklessness, risk-taking",
    imageUrl: "https://i.imgur.com/Lus4nEi.png",
    imageAlt: "The Fool tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "You're about to embark on a new adventure! Pack snacks. Seriously, you'll get hungry and make poor decisions on an empty stomach.",
      reversed: "Someone's being a bit too cautious. Life's too short to overthink everything—sometimes you just gotta trip into destiny!"
    }
  },
  {
    id: "magician",
    name: "The Magician",
    major: true,
    keywords: ["manifestation", "resourcefulness", "power"],
    uprightMeaning: "Manifestation, resourcefulness, power, inspired action",
    reversedMeaning: "Manipulation, poor planning, untapped talents",
    imageUrl: "https://i.imgur.com/3S8ZmqW.png",
    imageAlt: "The Magician tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "You've got all the tools you need! Now stop hoarding them like I hoard cheese wheels and actually USE them.",
      reversed: "All that potential and you're just... sitting there? Even I get off the couch sometimes. Mostly for food, but still."
    }
  },
  {
    id: "high-priestess",
    name: "The High Priestess",
    major: true,
    keywords: ["intuition", "sacred knowledge", "subconscious"],
    uprightMeaning: "Intuition, sacred knowledge, divine feminine, subconscious mind",
    reversedMeaning: "Secrets, disconnected from intuition, withdrawal",
    imageUrl: "https://i.imgur.com/WqUYQox.png",
    imageAlt: "The High Priestess tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Trust your gut! It's rarely wrong. Unlike my digestive system after too much pizza, but that's different.",
      reversed: "You're overthinking everything. Sometimes the answer is as simple as 'yes, you should order extra toppings.'"
    }
  },
  {
    id: "empress",
    name: "The Empress",
    major: true,
    keywords: ["femininity", "beauty", "nature", "abundance"],
    uprightMeaning: "Femininity, beauty, nature, abundance, nurturing",
    reversedMeaning: "Creative block, dependence on others",
    imageUrl: "https://i.imgur.com/DA0ehGN.png",
    imageAlt: "The Empress tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Time to nurture something! Maybe start with yourself—when's the last time you had a proper meal?",
      reversed: "You're being too hard on yourself. Even I occasionally think I'm magnificent, and I live in a hole."
    }
  },
  {
    id: "emperor",
    name: "The Emperor",
    major: true,
    keywords: ["authority", "structure", "control", "father-figure"],
    uprightMeaning: "Authority, structure, control, father-figure",
    reversedMeaning: "Tyranny, rigidity, coldness",
    imageUrl: "https://i.imgur.com/xUmrJrR.png",
    imageAlt: "The Emperor tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Time to take charge! But maybe start small—like organizing your snack cabinet. Work your way up to world domination.",
      reversed: "Someone's being a bit bossy. Power corrupts, absolute power corrupts absolutely, and hangry power is just annoying."
    }
  },
  {
    id: "hierophant",
    name: "The Hierophant",
    major: true,
    keywords: ["spiritual wisdom", "religious beliefs", "conformity"],
    uprightMeaning: "Spiritual wisdom, religious beliefs, conformity, tradition",
    reversedMeaning: "Personal beliefs, freedom, challenging the status quo",
    imageUrl: "https://i.imgur.com/iAh32hF.png",
    imageAlt: "The Hierophant tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Sometimes you need to follow the rules. But make sure they're good rules, not 'no eating in the library' nonsense.",
      reversed: "Question everything! Except gravity. I learned that lesson the hard way during my flying carpet incident."
    }
  },
  {
    id: "lovers",
    name: "The Lovers",
    major: true,
    keywords: ["love", "harmony", "relationships", "values alignment"],
    uprightMeaning: "Love, harmony, relationships, values alignment",
    reversedMeaning: "Self-love, disharmony, imbalance, misalignment of values",
    imageUrl: "https://i.imgur.com/BwVwvcb.png",
    imageAlt: "The Lovers tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Love is in the air! Or maybe that's just the smell of my famous chili. Either way, good things are coming.",
      reversed: "Time for some self-love. Treat yourself like you'd treat a favorite pet—with snacks and afternoon naps."
    }
  },
  {
    id: "chariot",
    name: "The Chariot",
    major: true,
    keywords: ["control", "willpower", "success", "determination"],
    uprightMeaning: "Control, willpower, success, determination",
    reversedMeaning: "Self-discipline, inner guidance, lack of control",
    imageUrl: "https://i.imgur.com/9G2nmY6.png",
    imageAlt: "The Chariot tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "You're in control and moving forward! Just remember to steer—I once rode a runaway shopping cart for three blocks.",
      reversed: "Feeling out of control? Take a deep breath, have a snack, and remember: even I eventually figured out how to use a map."
    }
  },
  {
    id: "strength",
    name: "Strength",
    major: true,
    keywords: ["strength", "courage", "persuasion", "influence"],
    uprightMeaning: "Strength, courage, persuasion, influence, compassion",
    reversedMeaning: "Self doubt, low energy, raw emotion",
    imageUrl: "https://i.imgur.com/bJSQ20w.png",
    imageAlt: "Strength tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "You're stronger than you think! I once arm-wrestled a troll for the last donut. Spoiler: the donut was worth it.",
      reversed: "Everyone has off days. Even dragons need mental health breaks. Be kind to yourself."
    }
  },
  {
    id: "hermit",
    name: "The Hermit",
    major: true,
    keywords: ["soul searching", "seeking inner guidance", "introspection"],
    uprightMeaning: "Soul searching, seeking inner guidance, introspection",
    reversedMeaning: "Isolation, loneliness, withdrawal",
    imageUrl: "https://i.imgur.com/CF5f2EE.png",
    imageAlt: "The Hermit tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Time for some soul searching. Find a comfy spot, bring snacks, and think deep thoughts. Works for me!",
      reversed: "Enough hermiting! Even I occasionally talk to people who aren't my refrigerator. Time to socialize."
    }
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    major: true,
    keywords: ["good luck", "karma", "life cycles", "destiny"],
    uprightMeaning: "Good luck, karma, life cycles, destiny, turning point",
    reversedMeaning: "Bad luck, lack of control, clinging to control",
    imageUrl: "https://i.imgur.com/idRzv55.png",
    imageAlt: "Wheel of Fortune tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "The universe is spinning in your favor! Like when the pizza delivery arrives early—pure magic!",
      reversed: "Sometimes the wheel gets stuck. Give it a good kick and see what happens. Worked for my washing machine."
    }
  },
  {
    id: "justice",
    name: "Justice",
    major: true,
    keywords: ["justice", "fairness", "truth", "cause and effect"],
    uprightMeaning: "Justice, fairness, truth, cause and effect, law",
    reversedMeaning: "Unfairness, lack of accountability, dishonesty",
    imageUrl: "https://i.imgur.com/pxb9VUh.png",
    imageAlt: "Justice tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Truth and fairness will prevail! Like when someone finally admits pineapple belongs on pizza. Justice served!",
      reversed: "Something's not quite fair. Stand up for what's right, but maybe finish your sandwich first. You'll need the energy."
    }
  },
  {
    id: "hanged-man",
    name: "The Hanged Man",
    major: true,
    keywords: ["suspension", "restriction", "letting go"],
    uprightMeaning: "Suspension, restriction, letting go, sacrifice",
    reversedMeaning: "Delays, resistance, stalling",
    imageUrl: "https://i.imgur.com/PF1f1Ud.png",
    imageAlt: "The Hanged Man tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Sometimes you need to hang upside down to see things clearly. I do my best thinking while napping anyway.",
      reversed: "Stop stalling! I once put off doing laundry for three months. It wasn't pretty. Learn from my mistakes."
    }
  },
  {
    id: "death",
    name: "Death",
    major: true,
    keywords: ["endings", "transformation", "transition"],
    uprightMeaning: "Endings, transformation, transition, new beginnings",
    reversedMeaning: "Resistance to change, personal transformation, inner purging",
    imageUrl: "https://i.imgur.com/UzSQ9Jy.png",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    imageAlt: "Death tarot card",
    timInterpretation: {
      upright: "Big changes ahead! Don't worry, it's like cleaning out your fridge—scary at first, but ultimately necessary.",
      reversed: "You're resisting change like I resist morning exercises. Sometimes you just gotta embrace the inevitable."
    }
  },
  {
    id: "temperance",
    name: "Temperance",
    major: true,
    keywords: ["balance", "moderation", "patience", "purpose"],
    uprightMeaning: "Balance, moderation, patience, purpose",
    reversedMeaning: "Imbalance, excess, self-healing, re-alignment",
    imageUrl: "https://i.imgur.com/HTQxYtx.png",
    imageAlt: "Temperance tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Balance is key! Like the perfect ratio of cheese to crackers. Too much of either ruins the harmony.",
      reversed: "Things are a bit out of whack. Time to recalibrate. Start with your sleep schedule and work from there."
    }
  },
  {
    id: "devil",
    name: "The Devil",
    major: true,
    keywords: ["shadow self", "attachment", "addiction", "restriction"],
    uprightMeaning: "Shadow self, attachment, addiction, restriction, sexuality",
    reversedMeaning: "Releasing limiting beliefs, exploring dark thoughts, detachment",
    imageUrl: "https://i.imgur.com/KpaPN1T.png",
    imageAlt: "The Devil tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "We all have our vices. Mine happens to be hoarding magical cookbooks. What's yours? (No judgment here.)",
      reversed: "Breaking free from bad habits! I once gave up midnight snacking for... well, it lasted about six hours."
    }
  },
  {
    id: "tower",
    name: "The Tower",
    major: true,
    keywords: ["sudden change", "upheaval", "chaos", "revelation"],
    uprightMeaning: "Sudden change, upheaval, chaos, revelation, awakening",
    reversedMeaning: "Personal transformation, fear of change, averting disaster",
    imageUrl: "https://i.imgur.com/OU1zd2P.png",
    imageAlt: "The Tower tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Uh oh, someone's tower is about to tumble! Don't panic—sometimes you need to knock things down to build better.",
      reversed: "Crisis averted! Like when I remembered to turn off the cauldron before it exploded. Close calls build character."
    }
  },
  {
    id: "star",
    name: "The Star",
    major: true,
    keywords: ["hope", "faith", "purpose", "renewal"],
    uprightMeaning: "Hope, faith, purpose, renewal, spirituality",
    reversedMeaning: "Lack of faith, despair, self-trust, disconnection",
    imageUrl: "https://i.imgur.com/h9v5lAt.png",
    imageAlt: "The Star tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Hope shines bright! Like finding the last slice of cake in the fridge when you thought it was gone forever.",
      reversed: "Feeling a bit dim? Everyone's light flickers sometimes. Mine went out completely during the Great Cookie Shortage of '97."
    }
  },
  {
    id: "moon",
    name: "The Moon",
    major: true,
    keywords: ["illusion", "fear", "anxiety", "subconscious"],
    uprightMeaning: "Illusion, fear, anxiety, subconscious, intuition",
    reversedMeaning: "Release of fear, repressed emotion, inner confusion",
    imageUrl: "https://i.imgur.com/sJV2jav.png",
    imageAlt: "The Moon tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Things aren't quite as they seem. Like when I thought I invented a new spell but it was just really strong coffee.",
      reversed: "The fog is lifting! You're starting to see things clearly. Unlike me without my reading glasses."
    }
  },
  {
    id: "sun",
    name: "The Sun",
    major: true,
    keywords: ["positivity", "fun", "warmth", "success"],
    uprightMeaning: "Positivity, fun, warmth, success, vitality",
    reversedMeaning: "Inner child, feeling down, overly optimistic",
    imageUrl: "https://i.imgur.com/Ugb08Qc.png",
    imageAlt: "The Sun tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Pure sunshine and happiness! Like finding out there's a surprise nap scheduled in your day. Perfection!",
      reversed: "Your inner sunshine is a bit cloudy. Try some comfort food and a good book—works every time."
    }
  },
  {
    id: "judgement",
    name: "Judgement",
    major: true,
    keywords: ["judgement", "rebirth", "inner calling", "absolution"],
    uprightMeaning: "Judgement, rebirth, inner calling, absolution",
    reversedMeaning: "Self-doubt, inner critic, ignoring the call",
    imageUrl: "https://i.imgur.com/sfnfy9f.png",
    imageAlt: "Judgement tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "Time for a fresh start! Like when I finally organized my spell components. Okay, I hired someone, but still counts!",
      reversed: "Stop being so hard on yourself! I judge people who put pineapple on pizza, but that's different. Be kinder."
    }
  },
  {
    id: "world",
    name: "The World",
    major: true,
    keywords: ["completion", "accomplishment", "travel", "fulfillment"],
    uprightMeaning: "Completion, accomplishment, travel, fulfillment",
    reversedMeaning: "Seeking personal closure, short-cut to success, stagnation",
    imageUrl: "https://i.imgur.com/xQK5Inu.png",
    imageAlt: "The World tarot card",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Sample video URL
    timInterpretation: {
      upright: "You've reached the end goal! Time to celebrate with something delicious. I recommend pie. Always recommend pie.",
      reversed: "Almost there! Don't take shortcuts now—you've come too far to cut corners. Unless it's a literal corner on a sandwich."
    }
  }
];

// Shuffle deck function
export const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Draw single card
export const drawSingleCard = (question?: string): TarotReading => {
  const shuffled = shuffleDeck(majorArcana);
  const drawnCard = shuffled[0];
  const isReversed = Math.random() < 0.5;
  
  const card: DrawnCard = {
    card: drawnCard,
    isReversed
  };
  
  const interpretation = isReversed 
    ? drawnCard.timInterpretation.reversed 
    : drawnCard.timInterpretation.upright;
  
  return {
    id: Date.now(),
    question,
    cards: [card],
    spread: "single",
    interpretation,
    date: new Date().toDateString()
  };
};

// Draw three cards for Past/Present/Future spread
export const drawThreeCards = (question?: string): TarotReading => {
  const shuffled = shuffleDeck(majorArcana);
  const positions = ["Past", "Present", "Future"];
  
  const cards: DrawnCard[] = shuffled.slice(0, 3).map((card, index) => ({
    card,
    isReversed: Math.random() < 0.5,
    position: positions[index]
  }));
  
  // Create combined interpretation
  const pastCard = cards[0];
  const presentCard = cards[1];
  const futureCard = cards[2];
  
  const pastInterpretation = pastCard.isReversed 
    ? pastCard.card.timInterpretation.reversed 
    : pastCard.card.timInterpretation.upright;
    
  const presentInterpretation = presentCard.isReversed 
    ? presentCard.card.timInterpretation.reversed 
    : presentCard.card.timInterpretation.upright;
    
  const futureInterpretation = futureCard.isReversed 
    ? futureCard.card.timInterpretation.reversed 
    : futureCard.card.timInterpretation.upright;
  
  const interpretation = `Past: ${pastInterpretation}

Present: ${presentInterpretation}

Future: ${futureInterpretation}

Overall: The cards suggest a journey from where you've been to where you're headed. Pay attention to how these energies connect—sometimes the past gives context to the future!`;
  
  return {
    id: Date.now(),
    question,
    cards,
    spread: "three-card",
    interpretation,
    date: new Date().toDateString()
  };
};
