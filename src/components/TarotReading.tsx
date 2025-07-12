import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TarotCard from '@/components/TarotCard';
import { TarotReading as TarotReadingType } from '@/types/tarot';
import { Shuffle, Sparkles } from 'lucide-react';

interface TarotReadingProps {
  onDrawCard: (question?: string) => void;
  isDrawing: boolean;
  currentReading?: TarotReadingType;
}

const TarotReading: React.FC<TarotReadingProps> = ({
  onDrawCard,
  isDrawing,
  currentReading
}) => {
  const [question, setQuestion] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setIsRevealed(false);
    
    setTimeout(() => {
      setIsShuffling(false);
      onDrawCard(question.trim() || undefined);
    }, 2000);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNewReading = () => {
    setQuestion('');
    setIsRevealed(false);
  };

  return (
    <div className="space-y-6">
      {/* Question Input */}
      <div className="space-y-2">
        <Label htmlFor="tarot-question" className="font-wizard text-wizard-cream">
          Ask Tim's Crystal Ball (Optional)
        </Label>
        <Input
          id="tarot-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What guidance do you seek?"
          className="bg-wizard-dark/40 border-wizard-gold/30 text-wizard-cream placeholder:text-wizard-cream/50"
          disabled={isDrawing || isShuffling}
        />
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

      {/* Card Display */}
      {currentReading && (
        <div className="flex flex-col items-center space-y-6">
          <TarotCard
            drawnCard={currentReading.cards[0]}
            isRevealed={isRevealed}
            onReveal={handleReveal}
            className="mx-auto"
          />

          {/* Card Interpretation */}
          {isRevealed && (
            <div className="max-w-md mx-auto animate-fade-in">
              <div className="bg-card/90 backdrop-blur-sm p-6 rounded-lg border border-wizard-gold/30 shadow-lg">
                <div className="text-center mb-4">
                  <h3 className="font-wizard text-xl text-wizard-cream mb-2">
                    {currentReading.cards[0].card.name}
                    {currentReading.cards[0].isReversed && (
                      <span className="text-sm text-wizard-purple ml-2">(Reversed)</span>
                    )}
                  </h3>
                  {currentReading.question && (
                    <p className="text-sm text-wizard-cream/70 font-scroll italic mb-3">
                      "{currentReading.question}"
                    </p>
                  )}
                </div>
                
                <div className="text-center">
                  <p className="font-scroll text-card-foreground leading-relaxed">
                    {currentReading.interpretation}
                  </p>
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    onClick={handleNewReading}
                    variant="outline"
                    className="border-wizard-gold/30 text-wizard-purple font-wizard hover:bg-wizard-purple/10"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Draw Another Card
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TarotReading;