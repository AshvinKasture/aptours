export interface Trek {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  price: string;
  highlights: string[];
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
