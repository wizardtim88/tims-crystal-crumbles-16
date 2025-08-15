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
        <div className="absolute top-20 left-24 text-amber-600 text-3xl">✨</div>
        <div className="absolute bottom-24 right-24 text-amber-600 text-4xl">✨</div>
        <div className="absolute top-32 right-28 text-amber-500 text-2xl">✨</div>
        <div className="absolute top-16 right-16 text-amber-400 text-2xl">🔮</div>

        {/* Content Container - Fixed height sections */}
        <div className="absolute inset-0 p-8 flex flex-col">
          {/* Header - Fixed height */}
          <div className="h-28 flex flex-col justify-center text-center mb-4">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">
              The Wizard Tim's Fortune
            </h1>
            <div className="flex items-center justify-center gap-2 text-lg text-amber-700">
              <span className="flex items-center gap-2 bg-purple-200 px-3 py-1 rounded-full">
                {getCategoryIcon()}
                <span className="capitalize font-semibold">{category} Fortune</span>
              </span>
            </div>
          </div>

          {/* Main Content Area - Remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Fortune Content */}
            <div className={`bg-white/95 p-4 rounded-lg border-2 shadow-lg flex-1 mb-3 ${getBorderColor()}`}>
              <div className="flex gap-3 h-full">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    T
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-gray-800 text-sm leading-relaxed line-clamp-[12]">
                    {processResponseText(response)}
                  </div>
                </div>
              </div>
            </div>

            {/* Book Recommendations - Fixed bottom section */}
            {bookRecommendations && bookRecommendations.length > 0 && (
              <div className="bg-amber-50/90 p-3 rounded-lg border border-amber-300 flex-shrink-0">
                <div className="text-amber-800 font-semibold text-xs mb-2">
                  📚 Tim's Mystic Book Recommendations:
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
          <div className="absolute bottom-2 right-3 text-amber-700 opacity-70 flex items-center gap-1 text-xs">
            <span className="font-bold">Tim's Crystal Crumbles</span>
            <span>•</span>
            <span>wizardtim.com</span>
          </div>
        </div>
      </div>
    );
  }
);

ComprehensiveFortuneImageTemplate.displayName = "ComprehensiveFortuneImageTemplate";

export default ComprehensiveFortuneImageTemplate;