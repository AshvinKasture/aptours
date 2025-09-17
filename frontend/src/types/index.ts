export interface ItineraryDay {
  day: number;
  title: string;
  subtitle?: string;
  description: string;
}

export interface Trek {
  slug: string; // URL-friendly slug generated from title
  title: string;
  description: string;
  shortDescription?: string; // Optional shorter description for tour cards
  image: string; // Cover image for tour cards and main display
  slideshowImages: string[]; // Array of images for slideshow in details page
  duration: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  type: 'Himalayan Trek' | 'Sacred Pilgrimage' | 'Nepal Family Package' | 'Bike Rides';
  price: string;
  maxAltitude?: string;
  category?: string; // For filtering in ToursPage
  itinerary?: ItineraryDay[]; // Added itinerary property
}

export interface TourCategory {
  slug: string; // URL-friendly slug for category
  title: string;
  description: string;
  shortDescription?: string;
  image: string; // Cover image for category card
  tours: Trek[]; // Array of tours in this category
  type: 'category'; // Identifier for category type
}

export interface TourItem {
  type: 'tour' | 'category';
  tour?: Trek; // Present if type is 'tour'
  category?: TourCategory; // Present if type is 'category'
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDates: string;
  groupSize: string;
  message: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  delay?: string;
}

export interface FeaturedTour {
  title: string;
  image: string;
  slug: string; // Link/slug to navigate to the full tour details
}

export interface ParallaxSectionProps {
  backgroundImage: string; // Laptop/desktop image (landscape)
  mobileBackgroundImage?: string; // Mobile image (portrait) - optional, defaults to backgroundImage
  className?: string;
  children: React.ReactNode;
}
