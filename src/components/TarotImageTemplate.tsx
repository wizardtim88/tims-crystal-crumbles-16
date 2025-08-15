import React from "react";
import { TarotReading } from "@/types/tarot";

interface BookRecommendation {
  bookId: number;
  title: string;
  subtitle?: string;
  creators?: string;
  description?: string;
  url?: string;
  reason: string;
}

interface TarotImageTemplateProps {
  reading: TarotReading;
  bookRecommendations?: BookRecommendation[];
}

const TarotImageTemplate = React.forwardRef<HTMLDivElement, TarotImageTemplateProps>(
  ({ reading, bookRecommendations }, ref) => {
    const processResponseText = (text: string) => {
      const parts = text.split(/(\*[^*]+\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="text-purple-600 opacity-80">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={index}>{part}</span>;
      });
    };

    return (
      <div
        ref={ref}
        className="relative w-[1200px] h-[675px] overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100"
      >
        {/* Magical stars background */}
        <div className="absolute top-16 left-20 text-purple-400 text-2xl">✨</div>
        <div className="absolute bottom-20 right-20 text-indigo-400 text-3xl">✨</div>
        <div className="absolute top-32 right-24 text-purple-500 text-xl">✨</div>
        <div className="absolute top-40 left-16 text-indigo-300 text-2xl">🌙</div>

        {/* Content Container - Fixed height sections */}
        <div className="absolute inset-0 p-8 flex flex-col">
          {/* Header - Fixed height */}
          <div className="h-24 flex flex-col justify-center text-center mb-4">
            <h1 className="text-3xl font-bold text-purple-900 mb-1">
              The Wizard Tim's Tarot Reading
            </h1>
            <div className="text-base text-purple-700 mb-1">
              {reading.spread === "single" ? "Single Card Reading" : "Past • Present • Future"}
            </div>
            {reading.question && (
              <div className="text-purple-600 italic text-sm truncate px-4">
                "{reading.question}"
              </div>
            )}
          </div>

          {/* Cards Section - Adaptive height */}
          <div className={`flex justify-center ${reading.spread === "single" ? "mb-6" : "mb-4"}`}>
            {reading.spread === "single" ? (
              <div className="text-center">
                <div className="w-28 h-42 bg-purple-800 rounded-lg shadow-xl mb-2 flex items-center justify-center border-2 border-purple-600">
                  <img 
                    src={reading.cards[0].card.imageUrl} 
                    alt={reading.cards[0].card.imageAlt}
                    className="w-full h-full object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="text-purple-800 font-bold text-base">
                  {reading.cards[0].card.name}
                  {reading.cards[0].isReversed && " (Reversed)"}
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                {reading.cards.map((drawnCard, index) => (
                  <div key={index} className="text-center">
                    <div className="text-purple-700 font-semibold text-xs mb-1">
                      {drawnCard.position}
                    </div>
                    <div className="w-20 h-30 bg-purple-800 rounded-lg shadow-lg mb-1 flex items-center justify-center border border-purple-600">
                      <img 
                        src={drawnCard.card.imageUrl} 
                        alt={drawnCard.card.imageAlt}
                        className="w-full h-full object-cover rounded-lg"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="text-purple-800 font-medium text-xs">
                      {drawnCard.card.name}
                      {drawnCard.isReversed && " (R)"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content Area - Remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Reading Content */}
            <div className="bg-white/95 p-4 rounded-lg border-2 border-purple-300 shadow-lg flex-1 mb-3">
              <div className="flex gap-3 h-full">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    T
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-gray-800 text-sm leading-relaxed line-clamp-[12]">
                    {processResponseText(reading.interpretation)}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Recommendations - Fixed bottom section */}
            {bookRecommendations && bookRecommendations.length > 0 && (
              <div className="bg-amber-50/90 p-3 rounded-lg border border-amber-300 flex-shrink-0">
                <div className="text-amber-800 font-semibold text-xs mb-2">
                  📚 Tim's Book Recommendations:
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {bookRecommendations.slice(0, 3).map((book, index) => (
                    <div key={index} className="text-amber-700">
                      <div className="font-medium line-clamp-1">{book.title}</div>
                      <div className="text-amber-600 italic line-clamp-1">{book.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Branding - Fixed position */}
          <div className="absolute bottom-2 right-3 text-purple-700 opacity-70 flex items-center gap-1 text-xs">
            <span className="font-bold">Tim's Crystal Crumbles</span>
            <span>•</span>
            <span>wizardtim.com</span>
          </div>
        </div>
      </div>
    );
  }
);

TarotImageTemplate.displayName = "TarotImageTemplate";

export default TarotImageTemplate;