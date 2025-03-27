// CategorySelector.jsx
import { motion } from 'framer-motion';

export default function CategorySelector({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-2 px-4">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === category 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:bg-gray-100/50'
              }`}
            whileHover={{ scale: 1.05 }}
          >
            {category}
            {selectedCategory === category && (
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full"
                layoutId="categoryHighlight"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}