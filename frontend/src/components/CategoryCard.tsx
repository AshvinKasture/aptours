import { Link } from 'react-router-dom';
import type { TourCategory } from '../types';

interface CategoryCardProps {
  category: TourCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <article className="category-card group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img 
            src={category.image}
            alt={category.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-indigo-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
              <i className="fas fa-layer-group"></i>
              Category • {category.tours.length} Tours
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <i className="fas fa-th-large text-indigo-600"></i>
              <span className="text-sm text-slate-600 font-medium">Category Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-route text-blue-600 text-sm"></i>
              <span className="text-sm font-semibold text-slate-700">{category.tours.length} Tours</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
            {category.title}
          </h3>
          
          <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
            {category.shortDescription || category.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <div className="text-xs text-slate-500 mb-1">Explore Collection</div>
              <div className="text-2xl font-bold text-indigo-600">{category.tours.length}</div>
              <div className="text-xs text-slate-500">tours</div>
            </div>
            <Link 
              to={`/tours/category/${category.slug}`}
              className="cta-button px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex-shrink-0"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;