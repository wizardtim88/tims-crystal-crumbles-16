export interface TarotCard {
  id: string;
  name: string;
  major: boolean;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  timInterpretation: {
    upright: string;
    reversed: string;
  };
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position?: string;
}

export interface TarotReading {
  id: number;
  question?: string;
  cards: DrawnCard[];
  spread: string;
  interpretation: string;
  date: string;
}

export type TarotSpread = "single" | "three-card" | "celtic-cross";