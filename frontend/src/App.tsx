import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import CategoryToursPage from './pages/CategoryToursPage';
import TourDetailsPage from './pages/TourDetailsPage';
import { TourProvider } from './contexts/TourContext';
import './styles/custom.css';

function App() {
  return (
    <TourProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/category/:categorySlug" element={<CategoryToursPage />} />
          <Route path="/tours/:slug" element={<TourDetailsPage />} />
        </Routes>
      </Router>
    </TourProvider>
  );
}

export default App;