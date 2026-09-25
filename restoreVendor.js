const fs = require('fs');
const html = fs.readFileSync('stitch_university_food_court_system/vendor_order_pipeline/code.html', 'utf8');

// Extract the body content
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

// Convert HTML to JSX (class -> className, for -> htmlFor)
bodyContent = bodyContent.replace(/class=/g, 'className=');
bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, ''); // strip comments
// Remove the script block at the end of the body
bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '');

// Clean invalid JSX
bodyContent = bodyContent.replace(/onclick="[^"]*"/g, '');
bodyContent = bodyContent.replace(/checked=""/g, 'defaultChecked');

// Make sure img, input, polyline are self closing if they aren't
// Simple naive fix for the stitch output which usually just has <img ...> 
// Actually stitch uses <img .../> sometimes, let's fix standard HTML tags.
bodyContent = bodyContent.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
bodyContent = bodyContent.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');

const finalJSX = `import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function VendorOrderPipeline() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data));
    socket.on('new_order', (o) => setOrders(prev => [...prev, o]));
    socket.on('order_updated', (o) => setOrders(prev => prev.map(p => p.id === o.id ? o : p)));
    return () => { socket.off('new_order'); socket.off('order_updated'); };
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-surface-container-lowest">
      ${bodyContent}
    </div>
  );
}`;

fs.writeFileSync('react_frontend/src/pages/VendorOrderPipeline.jsx', finalJSX);
console.log('Restored VendorOrderPipeline with exact Stitch UI');
