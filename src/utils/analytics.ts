// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 Measurement ID

// Initialize analytics if gtag is available
export const initAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('Google Analytics initialized');
  }
};

// Track page views
export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title,
      page_location,
    });
  }
};

// Track custom events
export const trackEvent = (
  event_name: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event_name, {
      custom_parameter_1: parameters,
      ...parameters,
    });
  }
};

// Specific tracking functions for app events
export const analytics = {
  // Fortune generation tracking
  trackFortuneGeneration: (category: string, hasQuestion: boolean) => {
    trackEvent('fortune_generated', {
      fortune_category: category,
      has_custom_question: hasQuestion,
    });
  },

  // Crystal ball interactions
  trackCrystalBallClick: () => {
    trackEvent('crystal_ball_clicked');
  },

  // Zodiac readings
  trackZodiacReading: (zodiacSign: string) => {
    trackEvent('zodiac_reading_requested', {
      zodiac_sign: zodiacSign,
    });
  },

  // Tarot card draws
  trackTarotDraw: (spreadType: 'single' | 'three-card') => {
    trackEvent('tarot_cards_drawn', {
      spread_type: spreadType,
    });
  },

  // Theme toggle
  trackThemeToggle: (newTheme: 'light' | 'dark') => {
    trackEvent('theme_changed', {
      new_theme: newTheme,
    });
  },

  // Book advertisement clicks (conversion goal)
  trackBookClick: () => {
    trackEvent('book_ad_clicked', {
      conversion_goal: true,
    });
  },

  // Question suggestions
  trackQuestionSuggestion: (questionType: string, category?: string) => {
    trackEvent('question_suggestion_used', {
      question_type: questionType,
      question_category: category,
    });
  },

  // Onboarding completion
  trackOnboardingComplete: () => {
    trackEvent('onboarding_completed');
  },

  // Tab navigation
  trackTabChange: (tabName: string) => {
    trackEvent('tab_changed', {
      tab_name: tabName,
    });
  },

  // Clear all actions
  trackClearAll: () => {
    trackEvent('clear_all_clicked');
  },

  // User engagement timing
  trackTimeOnTab: (tabName: string, timeSpent: number) => {
    trackEvent('time_on_tab', {
      tab_name: tabName,
      time_spent_seconds: timeSpent,
    });
  },
};

export default analytics;