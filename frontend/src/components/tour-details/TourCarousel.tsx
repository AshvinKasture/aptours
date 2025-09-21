import { useState, useEffect } from 'react';

interface TourCarouselProps {
  images: string[];
  title: string;
}

const TourCarousel = ({ images, title }: TourCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current => current === totalSlides - 1 ? 0 : current + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-6">
      <div className="relative h-96 overflow-hidden">
        {/* Carousel Container */}
        <div className="relative w-full h-full">
          {/* Carousel Images */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`${title} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/logo.png';
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white/90 scale-120'
                    : 'bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCarousel;
