import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ZodiacSign, ZODIAC_SIGNS } from '@/types/zodiac';
import BookRecommendations from '@/components/BookRecommendations';

interface ZodiacResponseProps {
  reading: string;
  sign: ZodiacSign;
  isNew?: boolean;
}

const ZodiacResponse: React.FC<ZodiacResponseProps> = ({ reading, sign, isNew = false }) => {
  const responseRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the newest response
  useEffect(() => {
    if (isNew && responseRef.current) {
      const headerHeight = 80; // Account for sticky header
      const elementTop = responseRef.current.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }, [isNew]);
  
  // Process the response text to handle Tim's actions in italics
  const processResponseText = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="text-wizard-purple opacity-80">{part.slice(1, -1)}</em>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleShareToX = () => {
    try {
      // Extract only the horoscope quote (text in quotes)
      const quoteMatch = reading.match(/"([^"]+)"/);
      if (!quoteMatch) {
        toast("No horoscope quote found", {
          description: "Tim's stellar wisdom seems to be missing quotes today...",
        });
        return;
      }
      
      const horoscopeQuote = quoteMatch[1];
      const signInfo = ZODIAC_SIGNS.find(z => z.sign === sign);
      
      // Updated promotional text
      const promoText = "🔮 Get your zodiac read by The Wizard Tim! 🔗 in bio.";
      
      // Calculate available space (280 - promo - zodiac info - buffer)
      const zodiacPrefix = `${signInfo?.symbol} ${signInfo?.name}: `;
      const maxHoroscopeLength = 280 - promoText.length - zodiacPrefix.length - 5; // 5 char buffer (reduced from 8)
      
      // Truncate horoscope if needed
      let shareableHoroscope = horoscopeQuote;
      if (horoscopeQuote.length > maxHoroscopeLength) {
        shareableHoroscope = horoscopeQuote.substring(0, maxHoroscopeLength - 3) + "...";
      }
      
      // Create final share text
      const shareText = `${zodiacPrefix}"${shareableHoroscope}"\n\n${promoText}`;
      
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        "_blank",
        "width=550,height=420"
      );
      
      toast("Horoscope shared on X!", {
        description: "Tim grudgingly allowed you to share his stellar wisdom.",
      });
    } catch (error) {
      console.error("Error sharing horoscope:", error);
      toast("X sharing failed", {
        description: "Tim mutters something about 'cosmic interference'...",
      });
    }
  };

  const handleShareToThreads = () => {
    try {
      // Extract only the horoscope quote (text in quotes)
      const quoteMatch = reading.match(/"([^"]+)"/);
      if (!quoteMatch) {
        toast("No horoscope quote found", {
          description: "Tim's stellar wisdom seems to be missing quotes today...",
        });
        return;
      }
      
      const horoscopeQuote = quoteMatch[1];
      const signInfo = ZODIAC_SIGNS.find(z => z.sign === sign);
      
      // Updated promotional text
      const promoText = "🔮 Get your zodiac read by The Wizard Tim! 🔗 in bio.";
      
      // Calculate available space for Threads (500 - promo - zodiac info - buffer)
      const zodiacPrefix = `${signInfo?.symbol} ${signInfo?.name}: `;
      const maxHoroscopeLength = 500 - promoText.length - zodiacPrefix.length - 5; // 5 char buffer (reduced from 8)
      
      // Truncate horoscope if needed
      let shareableHoroscope = horoscopeQuote;
      if (horoscopeQuote.length > maxHoroscopeLength) {
        shareableHoroscope = horoscopeQuote.substring(0, maxHoroscopeLength - 3) + "...";
      }
      
      // Create final share text
      const shareText = `${zodiacPrefix}"${shareableHoroscope}"\n\n${promoText}`;
      
      // Threads sharing URL (using web intent)
      window.open(
        `https://threads.net/intent/post?text=${encodeURIComponent(shareText)}`,
        "_blank",
        "width=550,height=420"
      );
      
      toast("Horoscope shared on Threads!", {
        description: "Tim sighs dramatically but allows the cosmic wisdom to spread.",
      });
    } catch (error) {
      console.error("Error sharing horoscope:", error);
      toast("Threads sharing failed", {
        description: "Tim grumbles about 'newfangled social networks'...",
      });
    }
  };

  const getSignInfo = () => {
    return ZODIAC_SIGNS.find(z => z.sign === sign);
  };

  const signInfo = getSignInfo();

  return (
    <div 
      ref={responseRef}
      className={cn(
        "bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg border shadow-md mb-4 transition-all",
        "border-wizard-purple/30",
        isNew ? "animate-in fade-in-50 slide-in-from-bottom-8" : "",
        "hover:border-wizard-gold/50"
      )}
    >
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-wizard-purple flex items-center justify-center text-white font-wizard text-xs sm:text-sm">
            T
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-2 text-xs sm:text-sm text-gray-500">
            <span className="mr-2">Daily Horoscope:</span>
            <span className="flex items-center gap-1 bg-wizard-purple/10 px-2 py-0.5 rounded-full text-xs">
              <span className="text-base sm:text-lg">{signInfo?.symbol}</span>
              <span className="capitalize">{signInfo?.name}</span>
            </span>
          </div>
          <div className="text-sm sm:text-base text-gray-800 font-scroll break-words overflow-wrap-anywhere hyphens-auto leading-relaxed">
            {processResponseText(reading)}
          </div>
          <div className="mt-3 flex justify-end gap-1 sm:gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-wizard-purple hover:bg-wizard-purple/10 text-xs sm:text-sm px-2 sm:px-3"
              onClick={handleShareToX}
            >
              <Twitter className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden xs:inline">Share on </span>X
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-wizard-purple hover:bg-wizard-purple/10 text-xs sm:text-sm px-2 sm:px-3"
              onClick={handleShareToThreads}
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden xs:inline">Share on </span>Threads
            </Button>
          </div>
          
          <BookRecommendations 
            reading={reading}
            type="zodiac"
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ZodiacResponse;
