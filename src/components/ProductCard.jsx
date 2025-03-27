// ProductCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link
        to={`/product/${product.id}`}
        className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="aspect-square bg-gray-50 rounded-t-2xl overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain p-6 transition-transform group-hover:scale-105"
          />
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
          <p className="text-lg font-semibold text-gray-900">${product.price}</p>
        </div>
      </Link>
      
      <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
        <HeartIcon className="w-5 h-5 text-gray-600" />
      </button>
    </motion.div>
  );
}