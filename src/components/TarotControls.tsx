import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TarotSpread } from '@/types/tarot';
import { Shuffle, Calendar, Zap, HelpCircle } from 'lucide-react';

interface TarotControlsProps {
  onDrawCard: (question?: string, spread?: TarotSpread) => void;
  isDrawing: boolean;
  isShuffling: boolean;
  setIsShuffling: (value: boolean) => void;
}

const TarotControls: React.FC<TarotControlsProps> = ({
  onDrawCard,
  isDrawing,
  isShuffling,
  setIsShuffling
}) => {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread>('single');
  const [showTips, setShowTips] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
      onDrawCard(question.trim() || undefined, selectedSpread);
    }, 2000);
  };

  const spreads = [
    {
      id: 'single' as TarotSpread,
      name: 'Single Card',
      description: 'Quick guidance for any question',
      icon: Zap,
      bestFor: 'Daily guidance, yes/no questions, immediate clarity'
    },
    {
      id: 'three-card' as TarotSpread,
      name: 'Past • Present • Future',
      description: 'See the full timeline of your situation',
      icon: Calendar,
      bestFor: 'Understanding patterns, relationship evolution, career trajectory'
    }
  ];

  const tips = [
    "Be specific with your questions for clearer guidance",
    "Focus on 'how' and 'what' rather than 'when' questions",
    "Trust your intuition when interpreting the cards",
    "Remember, tarot shows possibilities, not fixed outcomes"
  ];

  return (
    <div className="space-y-6">
      {/* Spread Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-wizard text-wizard-cream">Choose Your Reading</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTips(!showTips)}
            className="text-wizard-cream/70 hover:text-wizard-cream"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Tips
          </Button>
        </div>
        
        {showTips && (
          <div className="bg-wizard-dark/30 border border-wizard-gold/30 rounded-lg p-3 space-y-2">
            <h4 className="font-wizard text-sm text-wizard-gold">Reading Tips:</h4>
            <ul className="space-y-1">
              {tips.map((tip, index) => (
                <li key={index} className="text-xs text-wizard-cream/80 flex items-start gap-2">
                  <span className="text-wizard-gold mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-3">
          {spreads.map((spread) => {
            const Icon = spread.icon;
            return (
              <button
                key={spread.id}
                onClick={() => setSelectedSpread(spread.id)}
                className={`
                  p-4 rounded-lg border text-left transition-all
                  ${selectedSpread === spread.id 
                    ? 'border-wizard-gold bg-wizard-gold/10 text-wizard-cream' 
                    : 'border-wizard-gold/30 bg-wizard-dark/20 text-wizard-cream/70 hover:bg-wizard-dark/40'
                  }
                `}
                disabled={isDrawing || isShuffling}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${selectedSpread === spread.id ? 'text-wizard-gold' : 'text-wizard-cream/50'}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-wizard font-medium">{spread.name}</h3>
                    <p className="text-sm font-scroll opacity-80 mb-2 break-words">{spread.description}</p>
                    <p className="text-xs opacity-60 break-words">Best for: {spread.bestFor}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Input */}
      <div className="space-y-2">
        <Label htmlFor="tarot-question" className="font-wizard text-wizard-cream">
          Ask Tim's Crystal Ball (Optional)
        </Label>
        <Input
          id="tarot-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={selectedSpread === 'single' ? "What guidance do you seek?" : "What situation would you like clarity on?"}
          className="bg-wizard-dark/40 border-wizard-gold/30 text-wizard-cream placeholder:text-wizard-cream/50"
          disabled={isDrawing || isShuffling}
        />
        <p className="text-xs text-wizard-cream/60 font-scroll">
          {selectedSpread === 'single' 
            ? "Ask about immediate guidance, decisions, or daily focus" 
            : "Ask about situations that have developed over time"
          }
        </p>
      </div>

      {/* Shuffle Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleShuffle}
          disabled={isDrawing || isShuffling}
          className={`
            bg-wizard-purple hover:bg-wizard-purple/80 text-white 
            font-wizard px-6 py-6 text-lg flex items-center gap-2 
            transition-all hover:shadow-lg relative overflow-hidden
            ${isShuffling ? 'animate-pulse' : ''}
          `}
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-wizard-gold/10 to-transparent opacity-50"></div>
          <Shuffle className={`w-5 h-5 ${isShuffling ? 'animate-spin' : ''}`} />
          {isShuffling ? "Tim is shuffling..." : "Shuffle the Deck"}
          
          <span className="absolute -top-1 left-1/4 text-wizard-gold text-xs">✨</span>
          <span className="absolute -bottom-1 right-1/4 text-wizard-gold text-xs">✨</span>
        </Button>
      </div>
    </div>
  );
};

export default TarotControls;