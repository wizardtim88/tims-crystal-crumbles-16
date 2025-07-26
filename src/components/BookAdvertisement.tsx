import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import wizardTimBookCover from '@/assets/wizard-tim-book-cover.png';

const BookAdvertisement: React.FC = () => {
  const handleBookClick = () => {
    window.open('https://wizardtim.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className={cn(
        "relative bg-gradient-to-br from-wizard-purple/30 via-wizard-gold/20 to-wizard-cream/30",
        "backdrop-blur-sm border border-wizard-gold/40 rounded-2xl shadow-2xl",
        "p-6 sm:p-8 overflow-hidden group hover:shadow-wizard-gold/20 hover:shadow-2xl",
        "transition-all duration-500 hover:scale-[1.02]"
      )}>
        {/* Enhanced magical sparkles */}
        <div className="absolute top-4 left-6 text-wizard-gold text-2xl animate-float opacity-70">✨</div>
        <div className="absolute bottom-4 right-8 text-wizard-gold text-lg animate-float delay-1000 opacity-60">✨</div>
        <div className="absolute top-1/3 right-6 text-wizard-cream text-base animate-float delay-500 opacity-50">✨</div>
        <div className="absolute bottom-1/3 left-8 text-wizard-purple text-sm animate-float delay-700 opacity-40">✨</div>
        
        {/* Hero layout */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Enhanced book cover section */}
          <div className="flex-shrink-0 order-1 lg:order-1">
            <div className={cn(
              "w-20 h-30 sm:w-24 sm:h-36 lg:w-32 lg:h-48 rounded-xl overflow-hidden",
              "border-2 border-wizard-purple/40 shadow-2xl",
              "group-hover:scale-110 group-hover:shadow-wizard-purple/30",
              "transition-all duration-500 hover:rotate-1",
              "relative"
            )}>
              <img 
                src={wizardTimBookCover} 
                alt="Wizard Tim Book Cover" 
                className="w-full h-full object-cover"
              />
              {/* Book glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-wizard-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          
          {/* Enhanced content section */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-2 space-y-4">
            {/* Compelling hook */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <Star className="w-4 h-4 text-wizard-gold fill-wizard-gold" />
                <span className="text-sm font-scroll text-wizard-gold uppercase tracking-wider">Fantasy Comedy</span>
                <Star className="w-4 h-4 text-wizard-gold fill-wizard-gold" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-wizard text-wizard-purple mb-3 leading-tight">
                Meet the Laziest Wizard in Halfass
              </h2>
              
              <p className="text-lg sm:text-xl font-scroll text-wizard-gold mb-4 italic">
                "Hilarious magical mishaps await!"
              </p>
            </div>
            
            {/* Enhanced description */}
            <p className="text-base sm:text-lg font-scroll leading-relaxed text-slate-50 max-w-2xl">
              Join Wizard Tim on his side-splitting adventures through the realm of Halfass. 
              From epic food quests to magical disasters, this comedy fantasy will have you 
              laughing until your sides hurt. Perfect for fans of humorous fantasy!
            </p>
            
            {/* Social proof */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-wizard-gold" />
                <span className="font-scroll text-wizard-cream">By Joseph Eleam & Tim Canada</span>
              </div>
            </div>
          </div>
          
          {/* Conversion-optimized CTA */}
          <div className="flex-shrink-0 order-3 lg:order-3">
            <div className="flex flex-col items-center gap-3">
              <Button 
                onClick={handleBookClick} 
                className={cn(
                  "bg-gradient-to-r from-wizard-purple to-wizard-purple/80",
                  "hover:from-wizard-purple/90 hover:to-wizard-purple/70",
                  "text-white font-wizard text-lg px-8 py-4",
                  "shadow-2xl hover:shadow-wizard-purple/40",
                  "transition-all duration-300 hover:scale-105",
                  "border border-wizard-gold/30 hover:border-wizard-gold/50",
                  "group-hover:animate-pulse"
                )} 
                size="lg"
              >
                <span className="mr-2">Start Reading Now</span>
                <ExternalLink className="w-5 h-5" />
              </Button>
              
              <span className="text-xs text-wizard-cream/80 font-scroll italic">
                Free preview available
              </span>
            </div>
          </div>
        </div>
        
        {/* Enhanced magical gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-wizard-purple/10 via-wizard-gold/10 to-wizard-cream/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Additional glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-wizard-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

export default BookAdvertisement;