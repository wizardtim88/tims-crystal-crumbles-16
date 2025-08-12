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
        <div className="absolute top-1/3 left-1/4 text-amber-600 text-4xl">✨</div>
        <div className="absolute bottom-1/3 right-1/4 text-amber-600 text-5xl">✨</div>
        <div className="absolute top-2/3 right-1/3 text-amber-500 text-3xl">✨</div>
        <div className="absolute top-1/6 right-1/6 text-amber-400 text-3xl">🔮</div>

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-3">
              The Wizard Tim's Fortune
            </h1>
            <div className="flex items-center justify-center gap-3 text-xl text-amber-700">
              <span className="flex items-center gap-2 bg-purple-200 px-4 py-2 rounded-full">
                {getCategoryIcon()}
                <span className="capitalize font-semibold">{category} Fortune</span>
              </span>
            </div>
          </div>

          {/* Fortune Content */}
          <div className={`bg-white/95 p-8 rounded-lg border-2 shadow-lg flex-1 mb-6 ${getBorderColor()}`}>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                  T
                </div>
              </div>
              <div className="flex-1">
                <div className="text-gray-800 text-xl leading-relaxed">
                  {processResponseText(response)}
                </div>
              </div>
            </div>
          </div>

          {/* Book Recommendations */}
          {bookRecommendations && bookRecommendations.length > 0 && (
            <div className="bg-amber-50/90 p-4 rounded-lg border border-amber-300 mb-4">
              <div className="text-amber-800 font-semibold text-base mb-3">
                📚 Tim's Mystic Book Recommendations:
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
          <div className="absolute bottom-6 right-6 text-amber-700 opacity-70 flex items-center gap-2">
            <span className="font-bold text-lg">Tim's Crystal Crumbles</span>
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