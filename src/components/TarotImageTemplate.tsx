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
        <div className="absolute top-12 left-12 text-purple-400 text-2xl opacity-60">✨</div>
        <div className="absolute bottom-16 right-16 text-indigo-400 text-3xl opacity-60">✨</div>
        <div className="absolute top-20 right-20 text-purple-500 text-xl opacity-60">✨</div>
        <div className="absolute bottom-12 left-16 text-indigo-300 text-2xl opacity-60">🌙</div>

        {/* Two Column Layout */}
        <div className="absolute inset-0 p-6 grid grid-cols-2 gap-6">
          {/* Left Column - Cards & Header */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-white/90 p-4 rounded-lg border-2 border-purple-300 shadow-lg mb-4">
              <h1 className="text-2xl font-bold text-purple-900 text-center mb-2">
                The Wizard Tim's Tarot Reading
              </h1>
              <div className="text-center text-purple-700 mb-2">
                {reading.spread === "single" ? "Single Card Reading" : "Past • Present • Future"}
              </div>
              {reading.question && (
                <div className="text-purple-600 italic text-sm text-center px-2">
                  "{reading.question}"
                </div>
              )}
            </div>

            {/* Cards Display */}
            <div className="bg-white/90 p-4 rounded-lg border-2 border-purple-300 shadow-lg flex-1 flex items-center justify-center">
              {reading.spread === "single" ? (
                <div className="text-center">
                  <div className="w-40 h-60 bg-purple-800 rounded-lg shadow-xl mb-3 flex items-center justify-center border-2 border-purple-600 mx-auto">
                    <img 
                      src={reading.cards[0].card.imageUrl} 
                      alt={reading.cards[0].card.imageAlt}
                      className="w-full h-full object-cover rounded-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="text-purple-800 font-bold text-lg">
                    {reading.cards[0].card.name}
                  </div>
                  {reading.cards[0].isReversed && (
                    <div className="text-purple-600 text-sm font-medium">(Reversed)</div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full">
                  {reading.cards.map((drawnCard, index) => (
                    <div key={index} className="flex items-center gap-4 bg-purple-50/80 p-3 rounded-lg">
                      <div className="w-16 h-24 bg-purple-800 rounded-lg shadow-lg flex items-center justify-center border border-purple-600 flex-shrink-0">
                        <img 
                          src={drawnCard.card.imageUrl} 
                          alt={drawnCard.card.imageAlt}
                          className="w-full h-full object-cover rounded-lg"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-purple-700 font-semibold text-sm mb-1">
                          {drawnCard.position}
                        </div>
                        <div className="text-purple-800 font-medium text-sm">
                          {drawnCard.card.name}
                          {drawnCard.isReversed && " (Reversed)"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Reading & Books */}
          <div className="flex flex-col">
            {/* Reading Content */}
            <div className="bg-white/90 p-5 rounded-lg border-2 border-purple-300 shadow-lg flex-1 mb-4">
              <div className="flex gap-4 h-full">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-purple-800 font-bold text-lg mb-3">Tim's Mystical Insight</h3>
                  <div className="text-gray-800 text-base leading-relaxed overflow-hidden">
                    {processResponseText(reading.interpretation)}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Recommendations */}
            {bookRecommendations && bookRecommendations.length > 0 && (
              <div className="bg-amber-50/95 p-4 rounded-lg border-2 border-amber-400 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📚</span>
                  <h3 className="text-amber-800 font-bold text-base">Tim's Recommended Reads</h3>
                </div>
                <div className="space-y-2">
                  {bookRecommendations.slice(0, 3).map((book, index) => (
                    <div key={index} className="bg-white/80 p-3 rounded border border-amber-300">
                      <div className="font-semibold text-amber-800 text-sm mb-1">{book.title}</div>
                      <div className="text-amber-700 text-xs italic">{book.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Branding */}
        <div className="absolute bottom-3 right-4 text-purple-700 opacity-80 flex items-center gap-1 text-sm font-medium">
          <span className="font-bold">Tim's Crystal Crumbles</span>
          <span>•</span>
          <span>wizardtim.com</span>
        </div>
      </div>
    );
  }
);

TarotImageTemplate.displayName = "TarotImageTemplate";

export default TarotImageTemplate;