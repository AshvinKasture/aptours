# AP Tours & Travels - React Frontend

This is the React frontend for AP Tours & Travels website, converted from the original static HTML to a modern React application with TypeScript and Tailwind CSS.

## Features

- ✅ Fully responsive design
- ✅ Modern React components with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Custom parallax effects and animations
- ✅ Mobile-optimized navigation
- ✅ Contact form with validation
- ✅ SEO-friendly structure
- ✅ Smooth scrolling navigation

## Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── HeroSection.tsx  # Main hero section
│   ├── ServicesSection.tsx
│   ├── ParallaxSection.tsx  # Reusable parallax component
│   ├── ToursSection.tsx
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── index.ts         # Component exports
├── hooks/               # Custom React hooks
│   ├── useMobileMenu.ts # Mobile menu state
│   ├── useParallax.ts   # Parallax effects
│   └── index.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── styles/              # Custom CSS
│   └── custom.css       # Animations and effects
├── App.tsx              # Main app component
└── main.tsx             # App entry point
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Font Awesome** - Icons

## Conversion Notes

This React app maintains all the visual design and functionality of the original static HTML while adding:

- Component-based architecture
- Type safety with TypeScript
- Better state management
- Improved maintainability
- Enhanced developer experience
