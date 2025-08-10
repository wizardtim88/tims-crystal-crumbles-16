import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, ExternalLink, BookOpen, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/utils/analytics';

interface BookRecommendation {
  bookId: number;
  title: string;
  subtitle?: string;
  creators?: string;
  description?: string;
  url?: string;
  reason: string;
}

interface BookRecommendationsProps {
  reading: string;
  type: 'fortune' | 'tarot' | 'zodiac';
  question?: string;
  className?: string;
}

const BookRecommendations: React.FC<BookRecommendationsProps> = ({ 
  reading, 
  type, 
  question, 
  className = '' 
}) => {
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('recommend-books', {
        body: {
          reading,
          type,
          question
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to get recommendations');
      }

      if (!data.success) {
        throw new Error(data.error || 'Recommendation generation failed');
      }

      setRecommendations(data.recommendations || []);
      setHasGenerated(true);

      // Track analytics
      trackEvent('book_recommendations_generated', {
        reading_type: type,
        recommendations_count: data.recommendations?.length || 0
      });

      toast('📚 Tim has found some books for you!', {
        description: `${data.recommendations?.length || 0} mystical recommendations based on your ${type}.`,
      });

    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast('Failed to get book recommendations', {
        description: "Tim grumbles about 'mystical interference' with the book selection...",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = (book: BookRecommendation) => {
    if (book.url) {
      trackEvent('book_recommendation_clicked', {
        book_id: book.bookId,
        book_title: book.title,
        reading_type: type
      });
      window.open(book.url, '_blank');
    }
  };

  if (!hasGenerated) {
    return (
      <div className={`mt-4 ${className}`}>
        <Button
          onClick={generateRecommendations}
          disabled={isLoading}
          variant="outline"
          className="w-full border-wizard-gold/30 text-wizard-purple hover:bg-wizard-purple/10 hover:border-wizard-gold/50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Tim is consulting his mystical library...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Get Book Recommendations from Tim
            </>
          )}
        </Button>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className={`mt-4 ${className}`}>
        <Card className="p-4 bg-muted/50">
          <div className="text-center text-muted-foreground">
            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Tim couldn't find any suitable books this time...</p>
            <p className="text-xs mt-1">*mutters about "limited library selections"*</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={`mt-4 space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-wizard-purple font-medium">
        <Sparkles className="h-4 w-4" />
        <span>Tim's Mystical Book Recommendations</span>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((book, index) => (
          <Card 
            key={book.bookId} 
            className="p-4 bg-card/90 border-wizard-gold/20 hover:border-wizard-gold/40 transition-all cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-card-foreground line-clamp-2 text-sm">
                    {book.title}
                    {book.subtitle && (
                      <span className="text-muted-foreground text-xs block">
                        {book.subtitle}
                      </span>
                    )}
                  </h4>
                  {book.creators && (
                    <p className="text-xs text-muted-foreground mt-1">
                      by {book.creators}
                    </p>
                  )}
                </div>
                {book.url && (
                  <ExternalLink className="h-4 w-4 text-wizard-purple flex-shrink-0 mt-1" />
                )}
              </div>
              
              <div className="bg-wizard-purple/5 p-3 rounded border-l-2 border-wizard-purple/30">
                <p className="text-xs text-card-foreground font-scroll italic">
                  <span className="text-wizard-purple font-medium">Tim's wisdom:</span> {book.reason}
                </p>
              </div>
              
              {book.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button
          onClick={generateRecommendations}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="text-wizard-purple hover:bg-wizard-purple/10 text-xs"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          ) : (
            <Sparkles className="h-3 w-3 mr-1" />
          )}
          Get New Recommendations
        </Button>
      </div>
    </div>
  );
};

export default BookRecommendations;