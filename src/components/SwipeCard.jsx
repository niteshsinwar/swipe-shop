import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LikedProductsContext } from '../context/LikedProductsContext';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function SwipeCard({ product, onSwipe }) {
  const { addLikedProduct } = useContext(LikedProductsContext);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      addLikedProduct(product);
    }
    onSwipe();
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragTransition={{ power: 0.4, timeConstant: 150 }}
      onDragEnd={(_, { velocity, offset }) => {
        if (Math.abs(velocity.x) > 500) {
          handleSwipe(velocity.x > 0 ? 'right' : 'left');
        } else if (Math.abs(offset.x) > 150) {
          handleSwipe(offset.x > 0 ? 'right' : 'left');
        }
      }}
      className="absolute w-full max-w-[400px] h-[75vh] bg-white rounded-[2rem] shadow-xl overflow-hidden touch-none"
      style={{ 
        cursor: 'grab',
        WebkitTapHighlightColor: 'transparent',
      }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.02 }}
    >
      {/* Swipe Direction Hints */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-between px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-24 h-24 rounded-full bg-red-50/80 flex items-center justify-center backdrop-blur-sm">
          <XMarkIcon className="w-12 h-12 text-red-500" />
        </div>
        <div className="w-24 h-24 rounded-full bg-green-50/80 flex items-center justify-center backdrop-blur-sm">
          <HeartIcon className="w-12 h-12 text-green-500" />
        </div>
      </motion.div>

      {/* Product Image with Gradient Overlay */}
      <motion.div 
        className="relative h-[65%] bg-gray-100"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Product Details */}
      <motion.div 
        className="p-6"
        initial={{ y: 0 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">
              {product.title}
            </h3>
            <p className="text-base font-medium text-gray-500">
              {product.category}
            </p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${product.price}
          </p>
        </div>
        
        <p className="text-gray-600 text-base leading-5 line-clamp-2">
          {product.description}
        </p>
      </motion.div>

      {/* Swipe Feedback Layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          backgroundColor: '#00C853',
          opacity: 0,
        }}
        animate={{
          opacity: 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </motion.div>
  );
}