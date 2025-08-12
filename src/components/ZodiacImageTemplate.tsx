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
        <div className="absolute top-1/4 left-1/6 text-indigo-400 text-4xl">⭐</div>
        <div className="absolute bottom-1/3 right-1/4 text-blue-400 text-3xl">🌟</div>
        <div className="absolute top-2/3 right-1/6 text-purple-400 text-3xl">✨</div>
        <div className="absolute top-1/2 left-1/12 text-indigo-300 text-5xl">🌙</div>
        <div className="absolute bottom-1/6 left-1/3 text-blue-300 text-2xl">⭐</div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-3">
              The Wizard Tim's Daily Horoscope
            </h1>
            <div className="flex items-center justify-center gap-4 text-2xl">
              <span className="text-6xl">{signInfo?.symbol}</span>
              <div className="text-indigo-700">
                <div className="text-2xl font-bold">{signInfo?.name}</div>
                <div className="text-lg">{signInfo?.dates}</div>
              </div>
            </div>
          </div>

          {/* Horoscope Content */}
          <div className="bg-white/95 p-8 rounded-lg border-2 border-indigo-300 shadow-lg flex-1 mb-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                  T
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-800 text-xl leading-relaxed">
                  {processResponseText(reading)}
                </div>
              </div>
            </div>
          </div>

          {/* Book Recommendations */}
          {bookRecommendations && bookRecommendations.length > 0 && (
            <div className="bg-amber-50/90 p-4 rounded-lg border border-amber-300 mb-4">
              <div className="text-amber-800 font-semibold text-base mb-3">
                📚 Tim's Stellar Book Recommendations:
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {bookRecommendations.slice(0, 3).map((book, index) => (
                  <div key={index} className="text-amber-700">
                    <div className="font-medium">{book.title}</div>
                    <div className="text-amber-600 italic line-clamp-2">{book.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branding */}
          <div className="absolute bottom-6 right-6 text-indigo-700 opacity-70 flex items-center gap-2">
            <span className="font-bold text-lg">Tim's Crystal Crumbles</span>
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