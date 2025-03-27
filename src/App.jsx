import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LikedProductsProvider } from './context/LikedProductsContext';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <LikedProductsProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </LikedProductsProvider>
  );
}

export default App;