import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LikedProductsContext } from '../context/LikedProductsContext';
import { products } from '../data/products';
import CategorySelector from './CategorySelector';
import { ChevronLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { likedProducts } = useContext(LikedProductsContext);
  const isProductPage = location.pathname.startsWith('/product/');

  // Get categories based on current page
  const getCategories = () => {
    if (location.pathname === '/') {
      return ['all', ...new Set(products.map(p => p.category))];
    }
    if (location.pathname === '/store') {
      const storeCategories = likedProducts.map(p => p.category);
      return ['all', ...new Set(storeCategories)];
    }
    return [];
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    const searchParams = new URLSearchParams(location.search);
    const paramName = location.pathname === '/' ? 'category' : 'storeCategory';
    searchParams.set(paramName, category);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  // Get current category from URL
  const getCurrentCategory = () => {
    const searchParams = new URLSearchParams(location.search);
    const paramName = location.pathname === '/' ? 'category' : 'storeCategory';
    return searchParams.get(paramName) || 'all';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Nav Container */}
        <div className="h-16 flex items-center justify-between">
          
          {/* Left Section */}
          <div className="flex-shrink-0 flex items-center">
            {isProductPage ? (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 group"
              >
                <ChevronLeftIcon className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="ml-1 text-[15px] font-medium hidden xs:inline">Back</span>
              </button>
            ) : (
              <Link 
                to="/" 
                className="flex items-center space-x-2"
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <ShoppingBagIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900 hidden sm:inline">ShopSwipe</span>
              </Link>
            )}
          </div>

          {/* Center Section (Conditional) */}
          {(location.pathname === '/' || location.pathname === '/store') && (
            <div className="flex-1 min-w-0 mx-2 hidden sm:flex sm:justify-center">
              <CategorySelector
                categories={getCategories()}
                selectedCategory={getCurrentCategory()}
                onSelect={handleCategorySelect}
                className="max-w-[480px] w-full"
              />
            </div>
          )}

          {/* Right Section */}
          <div className="flex-shrink-0 flex items-center">
            {(location.pathname === '/' || location.pathname === '/store') && (
              <Link
                to={location.pathname === '/' ? "/store" : "/"}
                className="flex items-center space-x-2 p-2 -m-2 rounded-lg hover:bg-gray-50/50 active:bg-gray-100 transition-colors"
              >
                {location.pathname === '/' ? (
                  <>
                    <span className="text-[15px] font-medium text-gray-600  sm:inline">Favorites</span>
                    {likedProducts.length > 0 && (
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {likedProducts.length}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[15px] font-medium text-gray-600  sm:inline">Discover</span>
                )}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Category Selector */}
        {(location.pathname === '/' || location.pathname === '/store') && (
          <div className="pb-2 sm:hidden">
            <CategorySelector
              categories={getCategories()}
              selectedCategory={getCurrentCategory()}
              onSelect={handleCategorySelect}
              className="w-full"
            />
          </div>
        )}
      </div>
    </nav>
  );
}