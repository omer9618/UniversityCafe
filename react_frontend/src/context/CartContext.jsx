import React, { createContext, useState } from 'react';
import axios from 'axios';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dhaba_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('dhaba_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('dhaba_user');
  };
  const [activeOrder, setActiveOrder] = useState(null);

  const addToCart = (item) => setCart(prev => {
    const existing = prev.find(i => i.name === item.name);
    if(existing) return prev.map(i => i.name === item.name ? {...i, qty: i.qty+1} : i);
    return [...prev, {...item, qty: 1}];
  });

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const clearCart = () => setCart([]);
  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));
  
  const submitOrder = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        user: user ? user.name : 'Walk-in',
        items: cart,
        totalAmount: getCartTotal()
      });
      setActiveOrder(res.data);
      clearCart();
      return true;
    } catch(err) { console.error(err); return false; }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartTotal, clearCart, removeFromCart, submitOrder, activeOrder, setActiveOrder, user, login, logout }}>
      {children}
    </CartContext.Provider>
  );
};
