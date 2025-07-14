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
  const [cardRevealStates, setCardRevealStates] = useState<boolean[]>([]);
  const [isDealing, setIsDealing] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    setIsRevealed(false);
    setCardRevealStates([]);
    setIsDealing(false);
    
    setTimeout(() => {
      setIsShuffling(false);
      onDrawCard(question.trim() || undefined, selectedSpread);
    }, 2000);
  };

  const handleReveal = () => {
    if (selectedSpread === 'single') {
      setIsRevealed(true);
    } else {
      // For three-card spread, reveal all cards at once
      const newStates = new Array(3).fill(true);
      setCardRevealStates(newStates);
      setIsRevealed(true);
    }
  };

  const handleCardReveal = (index: number) => {
    if (selectedSpread === 'three-card') {
      const newStates = [...cardRevealStates];
      newStates[index] = true;
      setCardRevealStates(newStates);
      
      // Check if all cards are revealed
      if (newStates.every(state => state)) {
        setIsRevealed(true);
      }
    }
  };

  const handleNewReading = () => {
    setQuestion('');
    setIsRevealed(false);
    setCardRevealStates([]);
    setIsDealing(false);
  };

  // Initialize card reveal states when reading changes
  React.useEffect(() => {
    if (currentReading && selectedSpread === 'three-card') {
      setCardRevealStates(new Array(currentReading.cards.length).fill(false));
      setIsDealing(true);
      
      // Stagger card dealing animation
      setTimeout(() => setIsDealing(false), 1000);
    }
  }, [currentReading, selectedSpread]);

  // Helper to get reveal state for individual cards
  const getCardRevealState = (index: number) => {
    if (selectedSpread === 'single') return isRevealed;
    return cardRevealStates[index] || false;
  };

  // Helper to determine if card should be clickable
  const isCardClickable = (index: number) => {
    if (selectedSpread === 'single') return !isRevealed;
    if (selectedSpread === 'three-card') {
      return !cardRevealStates[index] && !isDealing;
    }
    return false;
  };

  // Count revealed cards for progress
  const revealedCount = selectedSpread === 'three-card' 
    ? cardRevealStates.filter(Boolean).length 
    : (isRevealed ? 1 : 0);
  const totalCards = selectedSpread === 'three-card' ? 3 : 1;

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
            <div className="space-y-4">
              {/* Progress Indicator */}
              {!isRevealed && (
                <div className="text-center">
                  <p className="font-wizard text-wizard-cream/70 text-sm mb-2">
                    {isDealing ? "Tim is dealing your cards..." : `Click cards to reveal (${revealedCount}/${totalCards})`}
                  </p>
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: totalCards }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i < revealedCount ? 'bg-wizard-gold' : 'bg-wizard-gold/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {currentReading.cards.map((drawnCard, index) => (
                  <div 
                    key={index} 
                    className={`text-center space-y-3 transition-all duration-500 ${
                      isDealing ? `opacity-0 translate-y-4` : 'opacity-100 translate-y-0'
                    }`}
                    style={{
                      animationDelay: isDealing ? `${index * 200}ms` : '0ms',
                      animation: isDealing ? 'none' : 'fade-in 0.6s ease-out forwards'
                    }}
                  >
                    <p className="font-wizard text-wizard-gold text-sm">
                      {drawnCard.position}
                    </p>
                    <TarotCard
                      drawnCard={drawnCard}
                      isRevealed={getCardRevealState(index)}
                      onReveal={isCardClickable(index) ? () => handleCardReveal(index) : undefined}
                      className={`mx-auto transition-all duration-300 ${
                        isCardClickable(index) ? 'hover:scale-105 cursor-pointer' : ''
                      } ${getCardRevealState(index) ? 'ring-2 ring-wizard-gold/30' : ''}`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Reveal All Button */}
              {!isRevealed && revealedCount > 0 && revealedCount < totalCards && (
                <div className="text-center">
                  <Button
                    onClick={handleReveal}
                    variant="outline"
                    size="sm"
                    className="border-wizard-gold/30 text-wizard-gold font-wizard hover:bg-wizard-gold/10"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Reveal All Cards
                  </Button>
                </div>
              )}
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