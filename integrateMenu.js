const fs = require('fs');
const path = require('path');

function getBody(html) {
  let match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if(!match) return '';
  let content = match[1];
  content = content.replace(/class=/g, 'className=');
  content = content.replace(/for=/g, 'htmlFor=');
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  content = content.replace(/<script>[\s\S]*?<\/script>/g, '');
  content = content.replace(/onclick="[^"]*"/g, '');
  content = content.replace(/onkeyup="[^"]*"/g, '');
  content = content.replace(/checked=""/g, 'defaultChecked');
  content = content.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  content = content.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  return content;
}

// 1. Context API
const cartContext = `import React, { createContext, useState } from 'react';
import axios from 'axios';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const addToCart = (item) => setCart(prev => {
    const existing = prev.find(i => i.name === item.name);
    if(existing) return prev.map(i => i.name === item.name ? {...i, qty: i.qty+1} : i);
    return [...prev, {...item, qty: 1}];
  });

  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const clearCart = () => setCart([]);
  
  const submitOrder = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        studentName: 'Omer S.',
        items: cart,
        totalAmount: getCartTotal()
      });
      setActiveOrder(res.data.order);
      clearCart();
      return true;
    } catch(err) { console.error(err); return false; }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartTotal, clearCart, submitOrder, activeOrder, setActiveOrder }}>
      {children}
    </CartContext.Provider>
  );
};
`;
fs.writeFileSync('react_frontend/src/context/CartContext.jsx', cartContext);

// 2. StudentMenuDashboard.jsx
let menuHtml = fs.readFileSync('stitch_university_food_court_system/student_menu_dashboard/code.html', 'utf8');
let menuBody = getBody(menuHtml);
let gridMatch = menuBody.match(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="menu-grid">([\s\S]*?)<\/section>/);
if(gridMatch) {
  let gridContent = gridMatch[1];
  let cardMatch = gridContent.match(/<article[\s\S]*?<\/article>/);
  if(cardMatch) {
    let cardTpl = cardMatch[0];
    cardTpl = cardTpl.replace(/>\s*\[ BIRYANI \]\s*</, '>{item.category}<');
    cardTpl = cardTpl.replace(/src="[^"]*"/, 'src={item.image}');
    cardTpl = cardTpl.replace(/>\s*BATCH #04 • WARM\s*</, '>{item.tag}<');
    cardTpl = cardTpl.replace(/>\s*DESI MAINS • POT DUM\s*</, '>{item.sub}<');
    cardTpl = cardTpl.replace(/>\s*chicken dum biryani\s*</, '>{item.name}<');
    cardTpl = cardTpl.replace(/>\s*Long-grain aged basmati[^<]*</, '>{item.desc}<');
    cardTpl = cardTpl.replace(/>\s*PORTION: 420G\s*</, '>{item.portion}<');
    cardTpl = cardTpl.replace(/>\s*680 KCAL\s*</, '>{item.kcal}<');
    cardTpl = cardTpl.replace(/>\s*Rs\. 320\s*</, '>Rs. {item.price}<');
    cardTpl = cardTpl.replace(/<button[^>]*>/, '<button onClick={() => addToCart(item)} className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors">');
    let mapping = `\n    {menuItems.map((item, idx) => (\n      ${cardTpl}\n    ))}\n    </div>`;
    menuBody = menuBody.replace(gridContent, mapping);
  }
}
menuBody = menuBody.replace(/<a className="flex items-center gap-2 bg-surface-container-low px-3 py-1\.5 rounded-full hover:bg-surface-container transition-colors" data-path="tray" href="#">([\s\S]*?)<\/a>/,
  `<Link to="/payment" className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors">\n    <span className="font-label-md text-label-md text-on-surface">Tray ({cart.reduce((a,b)=>a+b.qty,0)})</span>\n    <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Rs. {getCartTotal()}</span>\n  </Link>`
);
let menuFinal = `import React, { useContext } from 'react';\nimport { Link } from 'react-router-dom';\nimport { CartContext } from '../context/CartContext';\nconst menuItems = [{ id: 1, name: 'chicken dum biryani', category: '[ BIRYANI ]', tag: 'BATCH #04 • WARM', sub: 'DESI MAINS • POT DUM', desc: 'Long-grain aged basmati rice layered with succulent marinated chicken leg.', portion: 'PORTION: 420G', kcal: '680 KCAL', price: 320, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFGpMDcemq-BivVXev2BdRS3J1IWIJPMXX7zJYPIv5NYLaLePD7p1QlNH2MPZpC3il70CajwRmDoCREwU2pLSilkx4tOc2nWEQl5it5CQLaA9hkoi0oq87JDtvI8TDnqMz1mK25TiCd1X4gJFJcTB9EIvpxOLuWmBR9fGeuAbIJe04nHh0Xs1UTWxfyXC1D54gJ8mlV4CzGMliKb8T7aIgzGcGy2j46GotBBcH8-6K6ItG5inl_gTU' },{ id: 2, name: 'aloo samosa duo', category: '[ SNACK ]', tag: '100% VEG', sub: 'CRISP PASTRY', desc: 'Flaky pastry crust stuffed with cumin-tempered crushed potatoes.', portion: 'PORTION: 2 PCS', kcal: '290 KCAL', price: 80, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHHFHGahAbTNa3i6Am15CDTlbiB7JrbiapGfj1C2YXbGGWfU5oUH5IxlGAi6kJC1SPwz2a6ExgUQcFMWW57tE7kStCGxgm4uo9Ft-7LTtZT-INSWyzq9WMYFxpduTzxubigI7ydkzLKkrd4DtrskE83re1wQVU0WQk-1J0i9HXLfgXnVKqrsj1xc8L8AVZ_RrpFufQ8xYFUlAVyO7G7Ziz2sgVyBZVuUPyS5XSsqBdpEdhbWC9r1pI' }];\nexport default function StudentMenuDashboard() {\n  const { cart, addToCart, getCartTotal } = useContext(CartContext);\n  return (\n    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">\n      ${menuBody}\n    </div>\n  );\n}`;
fs.writeFileSync('react_frontend/src/pages/StudentMenuDashboard.jsx', menuFinal);

console.log('Successfully completed Student Menu Integration!');
