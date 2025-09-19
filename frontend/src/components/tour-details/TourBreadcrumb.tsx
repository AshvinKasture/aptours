import { HashLink } from 'react-router-hash-link';
import type { TourCategory } from '../../types';

interface TourBreadcrumbProps {
  trekTitle?: string;
  category?: TourCategory;
}

const TourBreadcrumb = ({ trekTitle, category }: TourBreadcrumbProps) => {
  return (
    <section className="py-4 px-4 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Back Icon Button */}
          <HashLink 
            to={category ? `/tours/category/${category.slug}` : "/tours"}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200"
            title={category ? `Back to ${category.title}` : "Back to All Tours"}
          >
            <i className="fas fa-arrow-left text-sm"></i>
          </HashLink>
          
          {/* Breadcrumb */}
          <nav className="flex-1 min-w-0">
            <ol className="flex items-center space-x-2 text-sm">
              <li className="flex items-center">
                <HashLink 
                  to="/"
                  className="text-slate-500 hover:text-sky-600 transition-colors"
                >
                  Home
                </HashLink>
              </li>
              <li className="flex items-center">
                <svg 
                  className="w-4 h-4 text-slate-400 mx-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <HashLink 
                  to="/tours"
                  className="text-slate-500 hover:text-sky-600 transition-colors"
                >
                  Tours
                </HashLink>
              </li>
              {category && (
                <li className="flex items-center">
                  <svg 
                    className="w-4 h-4 text-slate-400 mx-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <HashLink 
                    to={`/tours/category/${category.slug}`}
                    className="text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    {category.title}
                  </HashLink>
                </li>
              )}
              <li className="flex items-center">
                <svg 
                  className="w-4 h-4 text-slate-400 mx-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-slate-600 font-medium truncate">
                  {trekTitle || "Tour Details"}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default TourBreadcrumb;
