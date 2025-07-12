import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TarotCard from '@/components/TarotCard';
import { TarotReading as TarotReadingType, TarotSpread } from '@/types/tarot';
import { Shuffle, Sparkles, Calendar, Clock, Zap } from 'lucide-react';

interface TarotReadingProps {
  onDrawCard: (question?: string, spread?: TarotSpread) => void;
  isDrawing: boolean;
  currentReading?: TarotReadingType;
}

const TarotReading: React.FC<TarotReadingProps> = ({
  onDrawCard,
  isDrawing,
  currentReading
}) => {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread>('single');
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setIsRevealed(false);
    
    setTimeout(() => {
      setIsShuffling(false);
      onDrawCard(question.trim() || undefined, selectedSpread);
    }, 2000);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNewReading = () => {
    setQuestion('');
    setIsRevealed(false);
  };

  const spreads = [
    { 
      id: 'single' as TarotSpread, 
      name: 'Single Card', 
      description: 'Quick guidance for any question',
      icon: Zap
    },
    { 
      id: 'three-card' as TarotSpread, 
      name: 'Past • Present • Future', 
      description: 'See the full timeline of your situation',
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      {/* Spread Selection */}
      <div className="space-y-3">
        <Label className="font-wizard text-wizard-cream">Choose Your Reading</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <div>
                    <h3 className="font-wizard font-medium">{spread.name}</h3>
                    <p className="text-sm font-scroll opacity-80">{spread.description}</p>
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
          {currentReading.spread === 'single' ? (
            // Single Card Layout
            <TarotCard
              drawnCard={currentReading.cards[0]}
              isRevealed={isRevealed}
              onReveal={handleReveal}
              className="mx-auto"
            />
          ) : (
            // Three Card Layout
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {currentReading.cards.map((drawnCard, index) => (
                <div key={index} className="text-center space-y-3">
                  <p className="font-wizard text-wizard-gold text-sm">
                    {drawnCard.position}
                  </p>
                  <TarotCard
                    drawnCard={drawnCard}
                    isRevealed={isRevealed}
                    onReveal={index === 0 ? handleReveal : undefined}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Interpretation */}
          {isRevealed && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="bg-card/90 backdrop-blur-sm p-6 rounded-lg border border-wizard-gold/30 shadow-lg">
                {currentReading.spread === 'single' ? (
                  // Single Card Interpretation
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
                ) : (
                  // Three Card Interpretation Header
                  <div className="text-center mb-6">
                    <h3 className="font-wizard text-xl text-wizard-cream mb-2">
                      Your Past • Present • Future Reading
                    </h3>
                    {currentReading.question && (
                      <p className="text-sm text-wizard-cream/70 font-scroll italic mb-3">
                        "{currentReading.question}"
                      </p>
                    )}
                    <div className="flex justify-center gap-6 text-sm">
                      {currentReading.cards.map((card, index) => (
                        <div key={index} className="text-center">
                          <p className="font-wizard text-wizard-gold">{card.position}</p>
                          <p className="text-wizard-cream/80">
                            {card.card.name}
                            {card.isReversed && <span className="text-wizard-purple ml-1">(R)</span>}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="font-scroll text-card-foreground leading-relaxed whitespace-pre-line">
                    {currentReading.interpretation}
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleNewReading}
                    variant="outline"
                    className="border-wizard-gold/30 text-wizard-purple font-wizard hover:bg-wizard-purple/10"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    New Reading
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