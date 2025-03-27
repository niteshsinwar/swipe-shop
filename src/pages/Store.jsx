import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LikedProductsContext } from '../context/LikedProductsContext';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Store() {
  const [searchParams] = useSearchParams();
  const { likedProducts } = useContext(LikedProductsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const selectedCategory = searchParams.get('storeCategory') || 'all';

  const filteredProducts = likedProducts
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            className="flex flex-col items-center justify-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 text-center">
              {searchQuery ? 'Try adjusting your search' : 'Start adding favorites from the home screen'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}