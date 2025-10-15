import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Links from './pages/Links';
import Cart from './pages/Cart';
import { ProductType } from './types';
import Shop from './pages/Shop';




const App: React.FC = () => {
  const [cart, setCart] = useState<ProductType[]>([]);

  const addToCart = (product: ProductType) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center">
        <Navbar cartItemCount={totalQuantity} />
        <div className="container mx-auto p-4 flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Links />} />
            <Route path="/links" element={<Links />} />
            <Route
              path="/shop"
              element={
                <Shop
                  cart={cart}
                  addToCart={addToCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
