import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TarotCard from '@/components/TarotCard';
import ShareButton from '@/components/ShareButton';
import { TarotReading as TarotReadingType } from '@/types/tarot';
import { Sparkles } from 'lucide-react';

interface TarotCardDisplayProps {
  currentReading?: TarotReadingType;
  onNewReading: () => void;
}

const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({
  currentReading,
  onNewReading
}) => {
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [isDealing, setIsDealing] = useState(false);

  const handleReveal = () => {
    if (currentReading?.spread === 'single') {
      setAllRevealed(true);
    } else {
      // For three-card spread, reveal all remaining cards
      setRevealedCards(new Array(3).fill(true));
      setAllRevealed(true);
    }
  };

  const handleCardReveal = (index: number) => {
    if (currentReading?.spread === 'three-card' && !isDealing) {
      setRevealedCards(prev => {
        const newReveals = [...prev];
        newReveals[index] = true;

        // Check if all cards are revealed
        const allCardsRevealed = newReveals.every(state => state);
        if (allCardsRevealed) {
          setAllRevealed(true);
        }
        return newReveals;
      });
    }
  };

  // Initialize card states and handle dealing animation
  useEffect(() => {
    if (currentReading) {
      if (currentReading.spread === 'three-card') {
        setRevealedCards(new Array(currentReading.cards.length).fill(false));
        setAllRevealed(false);
        setIsDealing(true);

        // Brief dealing animation, then make cards clickable
        const dealTimeout = setTimeout(() => {
          setIsDealing(false);
        }, 1200);

        return () => clearTimeout(dealTimeout);
      } else {
        setRevealedCards([false]);
        setAllRevealed(false);
        setIsDealing(false);
      }
    }
  }, [currentReading]);

  // Helper to get reveal state for individual cards
  const getCardRevealState = (index: number) => {
    if (currentReading?.spread === 'single') return allRevealed;
    return revealedCards[index] || false;
  };

  // Helper to determine if card should be clickable
  const isCardClickable = (index: number) => {
    if (currentReading?.spread === 'single') return !allRevealed && !isDealing;
    if (currentReading?.spread === 'three-card') {
      return !revealedCards[index] && !isDealing;
    }
    return false;
  };

  // Count revealed cards for progress
  const revealedCount = currentReading?.spread === 'three-card' ? revealedCards.filter(Boolean).length : allRevealed ? 1 : 0;
  const totalCards = currentReading?.spread === 'three-card' ? 3 : 1;

  if (!currentReading) {
    return (
      <div className="flex items-center justify-center h-64 text-wizard-cream/60 font-wizard">
        Click "Shuffle the Deck" to begin your reading
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        {currentReading.spread === 'single' ? (
          // Single Card Layout
          <div className="flex justify-center">
            <TarotCard
              drawnCard={currentReading.cards[0]}
              isRevealed={allRevealed}
              onReveal={isCardClickable(0) ? handleReveal : undefined}
              className="mx-auto"
            />
          </div>
        ) : (
          // Three Card Layout
          <div className="space-y-4">
            {/* Progress Indicator */}
            {!allRevealed && (
              <div className="text-center">
                <p className="font-wizard text-wizard-cream/70 text-sm mb-2">
                  {isDealing 
                    ? "Tim is dealing your cards..." 
                    : revealedCount === 0 
                      ? "Click any card to begin" 
                      : `Click cards to reveal (${revealedCount}/${totalCards})`
                  }
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentReading.cards.map((drawnCard, index) => (
                <div
                  key={index}
                  className="text-center space-y-3 transition-all duration-700 opacity-100 scale-100 translate-y-0"
                  style={{
                    transitionDelay: isDealing ? `${index * 400}ms` : '0ms'
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
            {!allRevealed && revealedCount > 0 && revealedCount < totalCards && !isDealing && (
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
        {allRevealed && (
          <div className="animate-fade-in">
            <div className="backdrop-blur-sm p-4 rounded-lg border border-wizard-gold/30 shadow-lg bg-violet-500 max-w-full overflow-hidden">
              {currentReading.spread === 'single' ? (
                // Single Card Interpretation
                <div className="text-center mb-4">
                  <h3 className="font-wizard text-lg text-wizard-cream mb-2 break-words">
                    {currentReading.cards[0].card.name}
                    {currentReading.cards[0].isReversed && (
                      <span className="text-sm text-wizard-purple ml-2">(Reversed)</span>
                    )}
                  </h3>
                  {currentReading.question && (
                    <p className="text-sm text-wizard-cream/70 font-scroll italic mb-3 break-words">
                      "{currentReading.question}"
                    </p>
                  )}
                </div>
              ) : (
                // Three Card Interpretation Header
                <div className="text-center mb-4">
                  <h3 className="font-wizard text-lg mb-2 text-slate-900">
                    Your Past • Present • Future Reading
                  </h3>
                  {currentReading.question && (
                    <p className="text-sm text-wizard-cream/70 font-scroll italic mb-3 break-words">
                      "{currentReading.question}"
                    </p>
                  )}
                  <div className="flex justify-center gap-4 text-sm flex-wrap">
                    {currentReading.cards.map((card, index) => (
                      <div key={index} className="text-center min-w-0">
                        <p className="font-wizard text-violet-950">{card.position}</p>
                        <p className="text-gray-800 break-words">
                          {card.card.name}
                          {card.isReversed && <span className="text-wizard-purple ml-1">(R)</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <div className="font-scroll text-card-foreground leading-relaxed whitespace-pre-line break-words overflow-wrap-anywhere max-w-full">
                  {currentReading.interpretation}
                </div>
              </div>

              {/* Share Buttons */}
              <ShareButton reading={currentReading} />
              
              <div className="mt-4 text-center">
                <Button
                  onClick={onNewReading}
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
    </div>
  );
};

export default TarotCardDisplay;