import React, { useState } from 'react';
import { DrawnCard } from '@/types/tarot';
import { Card } from '@/components/ui/card';

interface TarotCardProps {
  drawnCard?: DrawnCard;
  isRevealed: boolean;
  onReveal?: () => void;
  className?: string;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  drawnCard, 
  isRevealed, 
  onReveal,
  className = "" 
}) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    if (!isRevealed && onReveal && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        onReveal();
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className={`relative w-40 h-60 ${onReveal && !isRevealed ? 'cursor-pointer' : ''} ${className}`} onClick={handleClick}>
      <div className={`
        relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
        ${isRevealed ? 'rotate-y-180' : ''}
        ${isFlipping ? 'animate-pulse' : ''}
      `}>
        {/* Card Back */}
        <Card className={`
          absolute inset-0 w-full h-full backface-hidden
          border-2 border-wizard-gold/50 bg-gradient-to-br from-wizard-purple to-wizard-dark
          flex items-center justify-center hover:border-wizard-gold hover:shadow-lg
          hover:shadow-wizard-gold/20 transition-all
        `}>
          <div className="text-center text-wizard-cream p-4">
            <div className="text-4xl mb-2">🔮</div>
            <div className="font-wizard text-sm">Tim's Stolen Deck</div>
            <div className="text-xs opacity-70 mt-1">Click to reveal</div>
          </div>
        </Card>

        {/* Card Front */}
        <Card className={`
          absolute inset-0 w-full h-full backface-hidden rotate-y-180
          border-2 border-wizard-gold/50 bg-gradient-to-br from-wizard-cream to-wizard-peach
          ${drawnCard?.isReversed ? 'rotate-180' : ''}
          hover:shadow-lg hover:shadow-wizard-gold/20 transition-all
        `}>
          {drawnCard && (
            <div className="p-4 h-full flex flex-col">
              {/* Card header */}
              <div className="text-center mb-3">
                <h3 className="font-wizard text-lg text-wizard-dark">
                  {drawnCard.card.name}
                </h3>
                {drawnCard.isReversed && (
                  <span className="text-xs text-wizard-purple font-scroll">
                    Reversed
                  </span>
                )}
              </div>
              
              {/* Card image placeholder */}
              <div className="flex-1 bg-wizard-dark/10 rounded border border-wizard-gold/30 flex items-center justify-center mb-3">
                <div className="text-6xl opacity-50">🎴</div>
              </div>
              
              {/* Keywords */}
              <div className="text-center">
                <div className="text-xs text-wizard-purple font-scroll">
                  {drawnCard.card.keywords.join(' • ')}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TarotCard;