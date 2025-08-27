import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  isHash?: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    if (path === '/tours') {
      breadcrumbs.push({ label: 'All Tours', path: '/tours' });
    } else if (path.startsWith('/tours/')) {
      breadcrumbs.push({ label: 'All Tours', path: '/tours' });
      // You can enhance this to show actual trek name by fetching trek data
      breadcrumbs.push({ label: `Trek Details`, path: path });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-slate-50 border-b border-slate-200 py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
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
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-600 font-medium">
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.path}
                  className="text-slate-500 hover:text-sky-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
