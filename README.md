# AP Tours & Travels - React Application

A modern, responsive React application for AP Tours & Travels, featuring trek listings, detailed itineraries, and contact information.

## 🚀 Features

- **Multi-page React Application** with React Router
- **Responsive Design** with Tailwind CSS
- **Trek Listings** with filtering capabilities
- **Detailed Trek Pages** with tabbed information
- **Contact Forms** and business information
- **Parallax Effects** and smooth animations
- **Mobile-friendly** navigation and layouts

## 🌐 Live Demo

The application is deployed on GitHub Pages: [https://ashvinkasture.github.io/aptours](https://ashvinkasture.github.io/aptours)

## 🛠️ Local Development

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AshvinKasture/aptours.git
   cd aptours/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## 📱 Network Access

The development server is configured to be accessible from other devices on your network:
- **Local**: `http://localhost:3000`
- **Network**: `http://[your-ip]:3000`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 📦 Deployment

### GitHub Pages (Automatic)

The application automatically deploys to GitHub Pages when you push to the `main` or `react-app` branch. The GitHub Actions workflow handles the build and deployment process.

### Manual Deployment

To manually deploy to GitHub Pages:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 🗺️ Routing Structure

- **`/`** - Home page with all sections
- **`/treks`** - Trek listings with filtering
- **`/treks/:id`** - Individual trek details
- **`/contact`** - Contact page

## 🎨 Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing (HashRouter for GitHub Pages)
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **Font Awesome** - Icons

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── styles/        # Custom CSS
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── dist/             # Production build (generated)
```

## 🔄 Routing Configuration

The application uses `HashRouter` for compatibility with GitHub Pages static hosting. This means URLs will include a hash symbol (`#`) but ensures proper routing without server-side configuration.

## 📧 Contact Information

- **Phone**: +91 92702 48887
- **Email**: info@aptours.in
- **Location**: Pune, Maharashtra, India

## 📄 License

This project is proprietary to AP Tours & Travels.
