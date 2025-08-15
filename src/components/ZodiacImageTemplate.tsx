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
        <div className="absolute top-12 left-12 text-indigo-400 text-2xl opacity-60">⭐</div>
        <div className="absolute bottom-16 right-16 text-blue-400 text-2xl opacity-60">🌟</div>
        <div className="absolute top-20 right-20 text-purple-400 text-xl opacity-60">✨</div>
        <div className="absolute bottom-12 left-16 text-indigo-300 text-3xl opacity-60">🌙</div>

        {/* Two Column Layout */}
        <div className="absolute inset-0 p-6 grid grid-cols-[1fr_2fr] gap-6">
          {/* Left Column - Header & Books */}
          <div className="flex flex-col">
            {/* Header with Zodiac Info */}
            <div className="bg-white/90 p-5 rounded-lg border-2 border-indigo-300 shadow-lg mb-4">
              <h1 className="text-2xl font-bold text-indigo-900 text-center mb-3">
                The Wizard Tim's Daily Horoscope
              </h1>
              <div className="flex flex-col items-center gap-3">
                <span className="text-8xl">{signInfo?.symbol}</span>
                <div className="text-indigo-700 text-center">
                  <div className="text-2xl font-bold">{signInfo?.name}</div>
                  <div className="text-base">{signInfo?.dates}</div>
                </div>
              </div>
            </div>

            {/* Book Recommendations */}
            {bookRecommendations && bookRecommendations.length > 0 && (
              <div className="bg-amber-50/95 p-4 rounded-lg border-2 border-amber-400 shadow-lg flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📚</span>
                  <h3 className="text-amber-800 font-bold text-base">Tim's Stellar Reads</h3>
                </div>
                <div className="space-y-3">
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

          {/* Right Column - Horoscope Content */}
          <div className="flex flex-col">
            <div className="bg-white/90 p-6 rounded-lg border-2 border-indigo-300 shadow-lg flex-1">
              <div className="flex gap-4 h-full">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                    T
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-indigo-800 font-bold text-2xl mb-4">Your Cosmic Forecast</h3>
                  <div className="text-gray-800 text-lg leading-relaxed overflow-hidden">
                    {processResponseText(reading)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="absolute bottom-3 right-4 text-indigo-700 opacity-80 flex items-center gap-1 text-sm font-medium">
          <span className="font-bold">Tim's Crystal Crumbles</span>
          <span>•</span>
          <span>wizardtim.com</span>
        </div>
      </div>
    );
  }
);

ZodiacImageTemplate.displayName = "ZodiacImageTemplate";

export default ZodiacImageTemplate;