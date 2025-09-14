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

export interface ParallaxSectionProps {
  backgroundImage: string;
  className?: string;
  children: React.ReactNode;
}
