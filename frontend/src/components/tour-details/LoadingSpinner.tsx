import Header from '../Header';
import Footer from '../Footer';

const LoadingSpinner = () => {
  return (
    <div className="antialiased text-slate-50">
      <Header />
      <main className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            <p className="mt-4 text-slate-600">Loading trek details...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingSpinner;
