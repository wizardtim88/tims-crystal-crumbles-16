import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Heart, Coins, Thermometer, Book } from 'lucide-react';
import { FortuneCategory } from '@/types/fortune';
import BookRecommendations from '@/components/BookRecommendations';
import ShareableImageGenerator from '@/components/ShareableImageGenerator';
import EnhancedShareButton from '@/components/EnhancedShareButton';

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

  // Remove old sharing functions - now handled by EnhancedShareButton

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
          {/* Enhanced Social Sharing */}
          <EnhancedShareButton 
            response={response} 
            category={category} 
            className="mt-3"
          />
          
          <BookRecommendations 
            reading={response}
            type="fortune"
            className="mt-3"
            renderShareButtons={(bookRecommendations) => (
              <div className="flex flex-wrap justify-center gap-2 mt-2 mb-2">
                <ShareableImageGenerator
                  type="fortune"
                  data={{
                    fortuneResponse: response,
                    fortuneCategory: category,
                    bookRecommendations
                  }}
                  className="text-xs"
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TimResponse;
