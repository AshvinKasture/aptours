import { HashLink } from 'react-router-hash-link';
import Header from '../Header';
import Footer from '../Footer';

const NotFoundTrek = () => {
  return (
    <div className="antialiased text-slate-50">
      <Header />
      <main className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl text-slate-300 mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-600 mb-2">Trek Not Found</h2>
            <p className="text-slate-500 mb-6">The trek you're looking for doesn't exist or has been removed.</p>
            <HashLink 
              to="/tours" 
              className="inline-block px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Back to All Treks
            </HashLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundTrek;
