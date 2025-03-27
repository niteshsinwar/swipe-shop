import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import SwipeCard from '../components/SwipeCard';
import { useState } from 'react';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedCategory = searchParams.get('category') || 'all';

  const filteredProducts = products.filter(p => 
    selectedCategory === 'all' || p.category === selectedCategory
  );

  const handleSwipe = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="h-screen relative bg-gray-50">
      {/* Card Stack Container */}
      <div className="flex justify-center items-center h-full relative">
        {filteredProducts
          .slice(currentIndex, currentIndex + 3)
          .map((product, index) => (
            <SwipeCard
              key={product.id}
              product={product}
              onSwipe={handleSwipe}
              style={{ 
                zIndex: 3 - index,
                transform: `translateY(${index * 12}px) scale(${1 - index * 0.04})`
              }}
              className={`absolute transition-transform duration-300 ease-in-out`}
            />
          ))}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 w-full px-6">
        <div className="flex justify-center gap-8">
          <button
            onClick={handleSwipe}
            className="p-4 bg-white rounded-full shadow-lg shadow-red-100/50 active:scale-95 transition-transform"
            aria-label="Reject"
          >
            <XMarkIcon className="w-8 h-8 text-red-500" />
          </button>
          
          <button
            onClick={handleSwipe}
            className="p-4 bg-white rounded-full shadow-lg shadow-green-100/50 active:scale-95 transition-transform"
            aria-label="Like"
          >
            <HeartIcon className="w-8 h-8 text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
}