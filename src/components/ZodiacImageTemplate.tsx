import React from "react";
import { ZodiacSign, ZODIAC_SIGNS } from "@/types/zodiac";

interface BookRecommendation {
  bookId: number;
  title: string;
  subtitle?: string;
  creators?: string;
  description?: string;
  url?: string;
  reason: string;
}

interface ZodiacImageTemplateProps {
  reading: string;
  sign: ZodiacSign;
  bookRecommendations?: BookRecommendation[];
}

const ZodiacImageTemplate = React.forwardRef<HTMLDivElement, ZodiacImageTemplateProps>(
  ({ reading, sign, bookRecommendations }, ref) => {
    const processResponseText = (text: string) => {
      const parts = text.split(/(\*[^*]+\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={index} className="text-indigo-600 opacity-80">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={index}>{part}</span>;
      });
    };

    const signInfo = ZODIAC_SIGNS.find(z => z.sign === sign);

    return (
      <div
        ref={ref}
        className="relative w-[1200px] h-[675px] overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100"
      >
        {/* Celestial background elements */}
        <div className="absolute top-16 left-20 text-indigo-400 text-3xl">⭐</div>
        <div className="absolute bottom-24 right-24 text-blue-400 text-2xl">🌟</div>
        <div className="absolute top-32 right-32 text-purple-400 text-2xl">✨</div>
        <div className="absolute top-40 left-16 text-indigo-300 text-4xl">🌙</div>
        <div className="absolute bottom-16 left-28 text-blue-300 text-xl">⭐</div>

        {/* Content Container - Fixed height sections */}
        <div className="absolute inset-0 p-8 flex flex-col">
          {/* Header - Fixed height */}
          <div className="h-28 flex flex-col justify-center text-center mb-4">
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">
              The Wizard Tim's Daily Horoscope
            </h1>
            <div className="flex items-center justify-center gap-3 text-xl">
              <span className="text-4xl">{signInfo?.symbol}</span>
              <div className="text-indigo-700">
                <div className="text-xl font-bold">{signInfo?.name}</div>
                <div className="text-sm">{signInfo?.dates}</div>
              </div>
            </div>
          </div>

          {/* Main Content Area - Remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Horoscope Content */}
            <div className="bg-white/95 p-4 rounded-lg border-2 border-indigo-300 shadow-lg flex-1 mb-3">
              <div className="flex gap-3 h-full">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    T
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-gray-800 text-sm leading-relaxed line-clamp-[12]">
                    {processResponseText(reading)}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Recommendations - Fixed bottom section */}
            {bookRecommendations && bookRecommendations.length > 0 && (
              <div className="bg-amber-50/90 p-3 rounded-lg border border-amber-300 flex-shrink-0">
                <div className="text-amber-800 font-semibold text-xs mb-2">
                  📚 Tim's Stellar Book Recommendations:
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
          <div className="absolute bottom-2 right-3 text-indigo-700 opacity-70 flex items-center gap-1 text-xs">
            <span className="font-bold">Tim's Crystal Crumbles</span>
            <span>•</span>
            <span>wizardtim.com</span>
          </div>
        </div>
      </div>
    );
  }
);

ZodiacImageTemplate.displayName = "ZodiacImageTemplate";

export default ZodiacImageTemplate;