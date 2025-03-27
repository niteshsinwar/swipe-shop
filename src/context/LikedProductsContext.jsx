import { createContext, useState } from 'react';

export const LikedProductsContext = createContext();

export const LikedProductsProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  const addLikedProduct = (product) => {
    setLikedProducts(prev => [...prev, product]);
  };

  return (
    <LikedProductsContext.Provider value={{ likedProducts, addLikedProduct }}>
      {children}
    </LikedProductsContext.Provider>
  );
};