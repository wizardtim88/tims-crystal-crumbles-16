import React from 'react';
import { Card } from '@/components/ui/card';
import { TarotReading } from '@/types/tarot';
import BookRecommendations from '@/components/BookRecommendations';

interface TarotResponseProps {
  reading: TarotReading;
  isNew?: boolean;
}

const TarotResponse: React.FC<TarotResponseProps> = ({ reading, isNew = false }) => {
  const card = reading.cards[0];
  
  return (
    <Card className={`
      p-4 border border-wizard-gold/30 backdrop-blur-sm
      ${isNew ? 'animate-scale-in bg-wizard-purple/20' : 'bg-card/90'}
      hover:bg-card/95 transition-all
    `}>
      <div className="flex flex-col space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎴</span>
            <div>
              <h3 className="font-wizard text-lg text-card-foreground">
                {card.card.name}
                {card.isReversed && (
                  <span className="text-sm text-wizard-purple ml-2">(Reversed)</span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                Tarot Reading • {reading.date}
              </p>
            </div>
          </div>
        </div>

        {/* Question if provided */}
        {reading.question && (
          <div className="bg-wizard-dark/20 p-3 rounded border-l-2 border-wizard-gold/50">
            <p className="text-sm font-scroll italic text-card-foreground">
              <span className="text-wizard-gold">Question:</span> "{reading.question}"
            </p>
          </div>
        )}

        {/* Interpretation */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-wizard-gold text-sm font-wizard">Tim's Interpretation:</span>
          </div>
          <p className="font-scroll text-card-foreground leading-relaxed">
            {reading.interpretation}
          </p>
        </div>

        {/* Keywords */}
        <div className="text-xs text-muted-foreground">
          <span className="font-wizard">Keywords:</span> {card.card.keywords.join(' • ')}
        </div>
        
        <BookRecommendations 
          reading={reading.interpretation}
          type="tarot"
          question={reading.question}
        />
      </div>
    </Card>
  );
};

export default TarotResponse;