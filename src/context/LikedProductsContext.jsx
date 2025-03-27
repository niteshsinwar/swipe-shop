import { createContext, useState } from 'react';

export const LikedProductsContext = createContext();

export const LikedProductsProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  const addLikedProduct = (product) => {
    setLikedProducts(prev => {
      // Create a Set of existing product IDs for quick lookup
      const productIds = new Set(prev.map(p => p.id));
      
      // Check if product already exists
      if (!productIds.has(product.id)) {
        return [...prev, product];
      }
      
      // Return previous state if product exists
      return prev;
    });
  };

  return (
    <LikedProductsContext.Provider value={{ likedProducts, addLikedProduct }}>
      {children}
    </LikedProductsContext.Provider>
  );
};