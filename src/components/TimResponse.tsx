import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Heart, Coins, Thermometer, Book } from 'lucide-react';
import { FortuneCategory } from '@/types/fortune';
import BookRecommendations from '@/components/BookRecommendations';
import ShareableImageGenerator from '@/components/ShareableImageGenerator';

interface TimResponseProps {
  response: string;
  category: FortuneCategory;
  isNew?: boolean;
}

const TimResponse: React.FC<TimResponseProps> = ({ response, category, isNew = false }) => {
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
    // Split by asterisks to find the parts that should be in italics
    const parts = text.split(/(\*[^*]+\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        // Remove the asterisks and render as italic
        return <em key={index} className="text-wizard-purple opacity-80">{part.slice(1, -1)}</em>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleShareToX = () => {
    try {
      // Extract only the fortune quote (text in quotes)
      const quoteMatch = response.match(/"([^"]+)"/);
      if (!quoteMatch) {
        toast("No fortune quote found", {
          description: "Tim's wisdom seems to be missing quotes today...",
        });
        return;
      }
      
      const fortuneQuote = quoteMatch[1];
      
      // Updated promotional text
      const promoText = "🔮 Get your fortune read by The Wizard Tim! 🔗 in bio.";
      
      // Calculate available space for fortune text (280 - promo - buffer)
      const maxFortuneLength = 280 - promoText.length - 3; // 3 char buffer (reduced from 5)
      
      // Truncate fortune if needed
      let shareableFortune = fortuneQuote;
      if (fortuneQuote.length > maxFortuneLength) {
        shareableFortune = fortuneQuote.substring(0, maxFortuneLength - 3) + "...";
      }
      
      // Create final share text with quote formatting
      const shareText = `"${shareableFortune}"\n\n${promoText}`;
      
      // Share to Twitter
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        "_blank",
        "width=550,height=420"
      );
      
      toast("Fortune shared on X!", {
        description: "Tim has begrudgingly allowed you to share his wisdom.",
      });
    } catch (error) {
      console.error("Error sharing fortune:", error);
      toast("X sharing failed", {
        description: "Tim mutters something about 'unreliable magic networks'...",
      });
    }
  };

  const handleShareToThreads = () => {
    try {
      // Extract only the fortune quote (text in quotes)
      const quoteMatch = response.match(/"([^"]+)"/);
      if (!quoteMatch) {
        toast("No fortune quote found", {
          description: "Tim's wisdom seems to be missing quotes today...",
        });
        return;
      }
      
      const fortuneQuote = quoteMatch[1];
      
      // Updated promotional text
      const promoText = "🔮 Get your fortune read by The Wizard Tim! 🔗 in bio.";
      
      // Calculate available space for fortune text (500 - promo - buffer) for Threads
      const maxFortuneLength = 500 - promoText.length - 3; // 3 char buffer (reduced from 5)
      
      // Truncate fortune if needed
      let shareableFortune = fortuneQuote;
      if (fortuneQuote.length > maxFortuneLength) {
        shareableFortune = fortuneQuote.substring(0, maxFortuneLength - 3) + "...";
      }
      
      // Create final share text with quote formatting
      const shareText = `"${shareableFortune}"\n\n${promoText}`;
      
      // Share to Threads
      window.open(
        `https://threads.net/intent/post?text=${encodeURIComponent(shareText)}`,
        "_blank",
        "width=550,height=420"
      );
      
      toast("Fortune shared on Threads!", {
        description: "Tim sighs but admits 'more platforms means more nap interruptions'.",
      });
    } catch (error) {
      console.error("Error sharing fortune:", error);
      toast("Threads sharing failed", {
        description: "Tim grumbles about 'too many social networks to keep track of'...",
      });
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'love':
        return <Heart className="h-4 w-4 text-red-400" />;
      case 'career':
        return <Coins className="h-4 w-4 text-amber-400" />;
      case 'health':
        return <Thermometer className="h-4 w-4 text-green-400" />;
      case 'general':
      default:
        return <Book className="h-4 w-4 text-blue-400" />;
    }
  };

  const getBorderColor = () => {
    switch (category) {
      case 'love':
        return 'border-red-300/50';
      case 'career':
        return 'border-amber-300/50';
      case 'health':
        return 'border-green-300/50';
      case 'general':
      default:
        return 'border-wizard-gold/30';
    }
  };

  return (
    <div 
      ref={responseRef}
      className={cn(
        "bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg border shadow-md mb-4 transition-all",
        getBorderColor(),
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
            <span className="mr-2">Fortune Type:</span>
            <span className="flex items-center gap-1 bg-wizard-purple/10 px-2 py-0.5 rounded-full text-xs">
              {getCategoryIcon()}
              <span className="capitalize">{category}</span>
            </span>
          </div>
          <div className="text-sm text-gray-800 font-scroll break-words overflow-wrap-anywhere hyphens-auto leading-relaxed max-w-full">
            {processResponseText(response)}
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
            <ShareableImageGenerator
              type="fortune"
              data={{
                fortuneResponse: response,
                fortuneCategory: category,
                bookRecommendations: [] // Will be populated when available
              }}
            />
          </div>
          
          <BookRecommendations 
            reading={response}
            type="fortune"
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default TimResponse;
