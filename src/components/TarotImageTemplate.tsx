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
        <div className="absolute top-1/4 left-1/6 text-purple-400 text-3xl">✨</div>
        <div className="absolute bottom-1/4 right-1/6 text-indigo-400 text-4xl">✨</div>
        <div className="absolute top-3/4 right-1/3 text-purple-500 text-2xl">✨</div>
        <div className="absolute top-1/2 left-1/12 text-indigo-300 text-3xl">🌙</div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-12">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-purple-900 mb-2">
              The Wizard Tim's Tarot Reading
            </h1>
            <div className="text-lg text-purple-700 mb-2">
              {reading.spread === "single" ? "Single Card Reading" : "Past • Present • Future"}
            </div>
            {reading.question && (
              <div className="text-purple-600 italic text-base">
                "{reading.question}"
              </div>
            )}
          </div>

          {/* Cards Section */}
          <div className="flex justify-center mb-6">
            {reading.spread === "single" ? (
              <div className="text-center">
                <div className="w-32 h-48 bg-purple-800 rounded-lg shadow-xl mb-3 flex items-center justify-center border-2 border-purple-600">
                  <img 
                    src={reading.cards[0].card.imageUrl} 
                    alt={reading.cards[0].card.imageAlt}
                    className="w-full h-full object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="text-purple-800 font-bold text-lg">
                  {reading.cards[0].card.name}
                  {reading.cards[0].isReversed && " (Reversed)"}
                </div>
              </div>
            ) : (
              <div className="flex gap-6">
                {reading.cards.map((drawnCard, index) => (
                  <div key={index} className="text-center">
                    <div className="text-purple-700 font-semibold text-sm mb-2">
                      {drawnCard.position}
                    </div>
                    <div className="w-24 h-36 bg-purple-800 rounded-lg shadow-lg mb-2 flex items-center justify-center border border-purple-600">
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

          {/* Reading Content */}
          <div className="bg-white/95 p-6 rounded-lg border-2 border-purple-300 shadow-lg flex-1 mb-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  T
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-800 text-lg leading-relaxed">
                  {processResponseText(reading.interpretation)}
                </div>
              </div>
            </div>
          </div>

          {/* Book Recommendations */}
          {bookRecommendations && bookRecommendations.length > 0 && (
            <div className="bg-amber-50/90 p-4 rounded-lg border border-amber-300">
              <div className="text-amber-800 font-semibold text-sm mb-2">
                📚 Tim's Book Recommendations:
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {bookRecommendations.slice(0, 3).map((book, index) => (
                  <div key={index} className="text-amber-700">
                    <div className="font-medium">{book.title}</div>
                    <div className="text-amber-600 italic truncate">{book.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branding */}
          <div className="absolute bottom-4 right-6 text-purple-700 opacity-70 flex items-center gap-2 text-sm">
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