import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Gallery from './pages/Gallery';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const noNavbarFooterPaths = ['/auth']; 
    
    return (
        <div style={{ paddingTop: '50px' }}>
            <Navbar />
            {children}
            {!noNavbarFooterPaths.includes(location.pathname) && <Footer />}
        </div>
    );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Layout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/shop" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
