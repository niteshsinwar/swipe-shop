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

   {/* Swipe Hint Buttons */}
<div className="absolute bottom-8 w-full px-6">
  <div className="flex justify-center gap-12">
    {/* Reject Hint */}
    <div className="flex flex-col items-center gap-2">
      <div className="p-4 bg-white rounded-full shadow-lg shadow-red-100/30 opacity-60">
        <XMarkIcon className="w-8 h-8 text-red-400" />
      </div>
      <span className="text-sm font-medium text-red-400">Swipe left</span>
    </div>

    {/* Like Hint */}
    <div className="flex flex-col items-center gap-2">
      <div className="p-4 bg-white rounded-full shadow-lg shadow-green-100/30 opacity-60">
        <HeartIcon className="w-8 h-8 text-green-400" />
      </div>
      <span className="text-sm font-medium text-green-400">Swipe right</span>
    </div>
  </div>
</div>
    </div>
  );
}