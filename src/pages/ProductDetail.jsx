// ProductDetail.jsx
import { useParams} from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h1>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto bg-white"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 p-4 lg:p-8">
        {/* Image Gallery */}
        <div className=" top-4 h-[90vh]">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-2xl bg-gray-50 shadow-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-3xl font-medium text-gray-900">${product.price}</p>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-gray-900 text-white py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="font-medium">Add to Bag</span>
              </button>
              <button className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <HeartIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}