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
  // Consolidated state management
  const [revealState, setRevealState] = useState({
    isShuffling: false,
    isDealing: false,
    dealingCardIndex: -1,
    cardReveals: [] as boolean[],
    allRevealed: false
  });

  const handleShuffle = () => {
    // Reset all state
    setRevealState({
      isShuffling: true,
      isDealing: false,
      dealingCardIndex: -1,
      cardReveals: [],
      allRevealed: false
    });
    
    setTimeout(() => {
      setRevealState(prev => ({ ...prev, isShuffling: false }));
      onDrawCard(question.trim() || undefined, selectedSpread);
    }, 2000);
  };

  const handleReveal = () => {
    if (selectedSpread === 'single') {
      setRevealState(prev => ({ ...prev, allRevealed: true }));
    } else {
      // For three-card spread, reveal all remaining cards
      const newReveals = new Array(3).fill(true);
      setRevealState(prev => ({ 
        ...prev, 
        cardReveals: newReveals,
        allRevealed: true 
      }));
    }
  };

  const handleCardReveal = (index: number) => {
    if (selectedSpread === 'three-card' && !revealState.isDealing) {
      setRevealState(prev => {
        const newReveals = [...prev.cardReveals];
        newReveals[index] = true;
        
        // Check if all cards are revealed
        const allRevealed = newReveals.every(state => state);
        
        return {
          ...prev,
          cardReveals: newReveals,
          allRevealed
        };
      });
    }
  };

  const handleNewReading = () => {
    setQuestion('');
    setRevealState({
      isShuffling: false,
      isDealing: false,
      dealingCardIndex: -1,
      cardReveals: [],
      allRevealed: false
    });
  };

  // Initialize card states and handle dealing animation
  React.useEffect(() => {
    if (currentReading) {
      if (selectedSpread === 'three-card') {
        setRevealState(prev => ({
          ...prev,
          cardReveals: new Array(currentReading.cards.length).fill(false),
          isDealing: true,
          dealingCardIndex: 0,
          allRevealed: false
        }));
        
        // Stagger card dealing animation
        const cardCount = currentReading.cards.length;
        let currentIndex = 0;
        
        const dealInterval = setInterval(() => {
          currentIndex++;
          setRevealState(prev => ({ ...prev, dealingCardIndex: currentIndex }));
          
          if (currentIndex >= cardCount) {
            clearInterval(dealInterval);
            setTimeout(() => {
              setRevealState(prev => ({ 
                ...prev, 
                isDealing: false,
                dealingCardIndex: -1 
              }));
            }, 300);
          }
        }, 400);
        
        return () => clearInterval(dealInterval);
      } else {
        setRevealState(prev => ({ 
          ...prev, 
          cardReveals: [false],
          allRevealed: false 
        }));
      }
    }
  }, [currentReading, selectedSpread]);

  // Helper to get reveal state for individual cards
  const getCardRevealState = (index: number) => {
    if (selectedSpread === 'single') return revealState.allRevealed;
    return revealState.cardReveals[index] || false;
  };

  // Helper to determine if card should be clickable
  const isCardClickable = (index: number) => {
    if (selectedSpread === 'single') return !revealState.allRevealed && !revealState.isDealing;
    if (selectedSpread === 'three-card') {
      return !revealState.cardReveals[index] && 
             !revealState.isDealing && 
             index <= revealState.dealingCardIndex;
    }
    return false;
  };

  // Helper to determine if card should be visible
  const isCardVisible = (index: number) => {
    if (selectedSpread === 'single') return true;
    return index <= revealState.dealingCardIndex || !revealState.isDealing;
  };

  // Count revealed cards for progress
  const revealedCount = selectedSpread === 'three-card' 
    ? revealState.cardReveals.filter(Boolean).length 
    : (revealState.allRevealed ? 1 : 0);
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
                disabled={isDrawing || revealState.isShuffling}
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
          disabled={isDrawing || revealState.isShuffling}
        />
      </div>

      {/* Shuffle Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleShuffle}
          disabled={isDrawing || revealState.isShuffling}
          className={`
            bg-wizard-purple hover:bg-wizard-purple/80 text-white 
            font-wizard px-6 py-6 text-lg flex items-center gap-2 
            transition-all hover:shadow-lg relative overflow-hidden
            ${revealState.isShuffling ? 'animate-pulse' : ''}
          `}
          size="lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-wizard-gold/10 to-transparent opacity-50"></div>
          <Shuffle className={`w-5 h-5 ${revealState.isShuffling ? 'animate-spin' : ''}`} />
          {revealState.isShuffling ? "Tim is shuffling..." : "Shuffle the Deck"}
          
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
              isRevealed={revealState.allRevealed}
              onReveal={isCardClickable(0) ? handleReveal : undefined}
              className="mx-auto"
            />
          ) : (
            // Three Card Layout
            <div className="space-y-4">
              {/* Progress Indicator */}
              {!revealState.allRevealed && (
                <div className="text-center">
                  <p className="font-wizard text-wizard-cream/70 text-sm mb-2">
                    {revealState.isDealing 
                      ? "Tim is dealing your cards..." 
                      : revealedCount === 0 
                        ? "Click the first card to begin"
                        : `Click cards to reveal (${revealedCount}/${totalCards})`
                    }
                  </p>
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: totalCards }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i < revealedCount ? 'bg-wizard-gold' : 
                          i <= revealState.dealingCardIndex ? 'bg-wizard-gold/50' : 'bg-wizard-gold/30'
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
                    className={`text-center space-y-3 transition-all duration-700 ${
                      !isCardVisible(index) ? 'opacity-0 scale-95 translate-y-8' : 'opacity-100 scale-100 translate-y-0'
                    }`}
                    style={{
                      transitionDelay: revealState.isDealing ? `${index * 400}ms` : '0ms'
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
                        isCardClickable(index) 
                          ? 'hover:scale-105 cursor-pointer ring-2 ring-wizard-gold/20 hover:ring-wizard-gold/40' 
                          : getCardRevealState(index) 
                            ? 'ring-2 ring-wizard-gold/50' 
                            : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
              
              {/* Reveal All Button */}
              {!revealState.allRevealed && revealedCount > 0 && revealedCount < totalCards && !revealState.isDealing && (
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
          {revealState.allRevealed && (
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