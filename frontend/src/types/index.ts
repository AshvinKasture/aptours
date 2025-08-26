export interface Trek {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  type: 'Himalayan Trek' | 'Sacred Pilgrimage' | 'Nepal Family Package' | 'Bike Rides';
  price: string;
  highlights: string[];
  maxAltitude?: string;
  category?: string; // For filtering in ToursPage
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
