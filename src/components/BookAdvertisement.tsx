import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import wizardTimBookCover from '@/assets/wizard-tim-book-cover.png';
const BookAdvertisement: React.FC = () => {
  const handleBookClick = () => {
    window.open('https://wizardtim.com', '_blank', 'noopener,noreferrer');
  };
  return <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className={cn("relative bg-gradient-to-br from-wizard-purple/20 via-wizard-gold/10 to-wizard-cream/20", "backdrop-blur-sm border border-wizard-gold/30 rounded-lg shadow-lg", "p-4 sm:p-6 overflow-hidden group hover:shadow-xl transition-all duration-300")}>
        {/* Magical sparkles */}
        <div className="absolute top-2 left-4 text-wizard-gold text-lg animate-float opacity-60">✨</div>
        <div className="absolute bottom-3 right-6 text-wizard-gold text-sm animate-float delay-1000 opacity-50">✨</div>
        <div className="absolute top-1/2 right-4 text-wizard-cream text-xs animate-float delay-500 opacity-40">✨</div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          {/* Book cover section */}
          <div className="flex-shrink-0">
            <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden", "border border-wizard-purple/30 shadow-lg", "group-hover:scale-105 transition-transform duration-300")}>
              <img 
                src={wizardTimBookCover} 
                alt="Wizard Tim Book Cover" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-wizard text-wizard-purple mb-2">
              Discover Tim's Adventures!
            </h3>
            <p className="text-sm sm:text-base font-scroll leading-relaxed mb-3 text-slate-50">
              Follow the laziest, most food-obsessed wizard in all of Halfass through his hilarious adventures. 
              From magical mishaps to epic nap sessions!
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-600">
              <Sparkles className="w-3 h-3 text-wizard-gold" />
              <span className="font-scroll italic text-slate-50">By Joseph Eleam and Tim Canada</span>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="flex-shrink-0">
            <Button onClick={handleBookClick} className={cn("bg-wizard-purple hover:bg-wizard-purple/80 text-white font-wizard", "px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base", "shadow-lg hover:shadow-xl transition-all duration-300", "flex items-center gap-2 group-hover:scale-105")} size="lg">
              <span>Read the Book</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Magical gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-wizard-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>;
};
export default BookAdvertisement;