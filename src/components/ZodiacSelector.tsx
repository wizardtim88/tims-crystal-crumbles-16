
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZodiacSign, ZODIAC_SIGNS } from '@/types/zodiac';

interface ZodiacSelectorProps {
  selectedSign: ZodiacSign;
  onSignSelect: (sign: ZodiacSign) => void;
}

const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ selectedSign, onSignSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <h3 className="text-lg font-wizard text-wizard-gold mb-3 text-center">
        Choose Your Zodiac Sign
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {ZODIAC_SIGNS.map(({ sign, name, symbol }) => (
          <Button
            key={sign}
            variant={selectedSign === sign ? "default" : "outline"}
            className={`flex flex-col items-center p-3 h-auto border-wizard-gold/30 font-wizard text-xs ${
              selectedSign === sign 
                ? "bg-wizard-purple text-white" 
                : "bg-wizard-dark/40 text-wizard-cream hover:bg-wizard-purple/40"
            }`}
            onClick={() => onSignSelect(sign)}
          >
            <span className="text-lg mb-1">{symbol}</span>
            <span className="capitalize">{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ZodiacSelector;
