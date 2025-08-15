import React from "react";
import { FortuneCategory } from "@/types/fortune";
import { Heart, Coins, Thermometer, Book } from "lucide-react";

interface BookRecommendation {
  bookId: number;
  title: string;
  subtitle?: string;
  creators?: string;
  description?: string;
  url?: string;
  reason: string;
}

interface ComprehensiveFortuneImageTemplateProps {
  response: string;
  category: FortuneCategory;
  bookRecommendations?: BookRecommendation[];
}

const ComprehensiveFortuneImageTemplate = React.forwardRef<HTMLDivElement, ComprehensiveFortuneImageTemplateProps>(
  ({ response, category, bookRecommendations }, ref) => {
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

    const getCategoryIcon = () => {
      switch (category) {
        case "love":
          return <Heart className="h-8 w-8 text-red-400" />;
        case "career":
          return <Coins className="h-8 w-8 text-amber-400" />;
        case "health":
          return <Thermometer className="h-8 w-8 text-green-400" />;
        case "general":
        default:
          return <Book className="h-8 w-8 text-blue-400" />;
      }
    };

    const getBorderColor = () => {
      switch (category) {
        case "love":
          return "border-red-300";
        case "career":
          return "border-amber-300";
        case "health":
          return "border-green-300";
        case "general":
        default:
          return "border-amber-400";
      }
    };

    const getBackgroundGradient = () => {
      switch (category) {
        case "love":
          return "from-rose-100 via-pink-50 to-red-100";
        case "career":
          return "from-amber-100 via-yellow-50 to-orange-100";
        case "health":
          return "from-green-100 via-emerald-50 to-teal-100";
        case "general":
        default:
          return "from-amber-100 via-yellow-50 to-amber-200";
      }
    };

    return (
      <div
        ref={ref}
        className={`relative w-[1200px] h-[675px] overflow-hidden bg-gradient-to-br ${getBackgroundGradient()}`}
      >
        {/* Magical elements */}
        <div className="absolute top-12 left-12 text-amber-600 text-2xl opacity-60">✨</div>
        <div className="absolute bottom-16 right-16 text-amber-600 text-3xl opacity-60">✨</div>
        <div className="absolute top-20 right-20 text-amber-500 text-xl opacity-60">✨</div>
        <div className="absolute bottom-12 left-16 text-amber-400 text-2xl opacity-60">🔮</div>

        {/* Two Column Layout */}
        <div className="absolute inset-0 p-6 grid grid-cols-[1fr_2fr] gap-6">
          {/* Left Column - Header & Books */}
          <div className="flex flex-col">
            {/* Header with Category */}
            <div className="bg-white/90 p-5 rounded-lg border-2 border-amber-400 shadow-lg mb-4">
              <h1 className="text-2xl font-bold text-amber-800 text-center mb-3">
                The Wizard Tim's Fortune
              </h1>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-20 h-20 bg-purple-200 rounded-full">
                  {getCategoryIcon()}
                </div>
                <span className="capitalize font-bold text-xl text-amber-700">{category} Fortune</span>
              </div>
            </div>

            {/* Book Recommendations */}
            {bookRecommendations && bookRecommendations.length > 0 && (
              <div className="bg-amber-50/95 p-4 rounded-lg border-2 border-amber-400 shadow-lg flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📚</span>
                  <h3 className="text-amber-800 font-bold text-base">Tim's Mystic Reads</h3>
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

          {/* Right Column - Fortune Content */}
          <div className="flex flex-col">
            <div className={`bg-white/90 p-6 rounded-lg border-2 shadow-lg flex-1 ${getBorderColor()}`}>
              <div className="flex gap-4 h-full">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    T
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-amber-800 font-bold text-2xl mb-4">Your Mystical Guidance</h3>
                  <div className="text-gray-800 text-lg leading-relaxed overflow-hidden">
                    {processResponseText(response)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="absolute bottom-3 right-4 text-amber-700 opacity-80 flex items-center gap-1 text-sm font-medium">
          <span className="font-bold">Tim's Crystal Crumbles</span>
          <span>•</span>
          <span>wizardtim.com</span>
        </div>
      </div>
    );
  }
);

ComprehensiveFortuneImageTemplate.displayName = "ComprehensiveFortuneImageTemplate";

export default ComprehensiveFortuneImageTemplate;