
import React from 'react';
import { Button } from '@/components/ui/button';
import { FortuneCategory } from '@/types/fortune';
import { ZodiacSign } from '@/types/zodiac';
import { TarotSpread } from '@/types/tarot';
import { Heart, Coins, Thermometer, Book, Stars, Calendar, Zap } from 'lucide-react';

interface QuestionSuggestionsProps {
  type: 'fortune' | 'horoscope' | 'tarot';
  category?: FortuneCategory;
  zodiacSign?: ZodiacSign;
  tarotSpread?: TarotSpread;
  onSelectQuestion: (question: string) => void;
}

const QuestionSuggestions: React.FC<QuestionSuggestionsProps> = ({
  type,
  category,
  zodiacSign,
  tarotSpread,
  onSelectQuestion
}) => {
  const fortuneQuestions = {
    general: [
      "What should I focus on this week?",
      "What opportunity is coming my way?",
      "What do I need to let go of?",
      "What wisdom do you have for me today?"
    ],
    love: [
      "What does my love life look like?",
      "How can I improve my relationship?",
      "Will I find love soon?",
      "What should I know about my romantic future?"
    ],
    career: [
      "What career path should I pursue?",
      "Will I get the promotion I want?",
      "Should I change jobs?",
      "What skills should I develop?"
    ],
    health: [
      "How can I improve my wellbeing?",
      "What should I focus on for better health?",
      "What habits should I change?",
      "How can I reduce stress in my life?"
    ]
  };

  const horoscopeQuestions = [
    "What energy surrounds me today?",
    "What should I be aware of this week?",
    "How can I make the most of my sign's strengths?",
    "What challenges might I face?"
  ];

  const tarotQuestions = {
    single: [
      "What do I need to know right now?",
      "What guidance do you have for me?",
      "What's blocking my progress?",
      "What should I focus on today?"
    ],
    'three-card': [
      "How can I learn from my past to improve my future?",
      "What's the timeline for my current situation?",
      "How will my decision affect my future?",
      "What's my journey from where I was to where I'm going?"
    ]
  };

  const getQuestions = () => {
    if (type === 'fortune' && category) {
      return fortuneQuestions[category];
    }
    if (type === 'horoscope') {
      return horoscopeQuestions;
    }
    if (type === 'tarot' && tarotSpread) {
      return tarotQuestions[tarotSpread];
    }
    return [];
  };

  const questions = getQuestions();

  if (questions.length === 0) return null;

  const getCategoryIcon = () => {
    if (type === 'fortune') {
      switch (category) {
        case 'love': return Heart;
        case 'career': return Coins;
        case 'health': return Thermometer;
        default: return Book;
      }
    }
    if (type === 'horoscope') return Stars;
    if (type === 'tarot') {
      return tarotSpread === 'three-card' ? Calendar : Zap;
    }
    return Book;
  };

  const Icon = getCategoryIcon();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-wizard-gold" />
        <h3 className="font-wizard text-sm text-wizard-cream">
          Suggested Questions:
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-6">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelectQuestion(question)}
            className="text-left justify-start h-auto p-3 border-wizard-gold/30 bg-wizard-dark/20 text-wizard-cream/80 hover:bg-wizard-gold/10 hover:text-wizard-cream transition-all text-xs leading-relaxed whitespace-normal break-words hyphens-auto overflow-hidden"
          >
            <span className="break-words overflow-wrap-anywhere">"{question}"</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSuggestions;
