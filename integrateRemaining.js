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
  content = content.replace(/checked=""/g, 'defaultChecked');
  content = content.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  content = content.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  return content;
}

// 1. TokenPaymentTrayDrawer
let trayHtml = fs.readFileSync('stitch_university_food_court_system/token_payment_tray_drawer/code.html', 'utf8');
let trayBody = getBody(trayHtml);

// Replace the items list with dynamic cart mapping
let listMatch = trayBody.match(/<ul className="divide-y divide-surface-variant">([\s\S]*?)<\/ul>/);
if(listMatch) {
  let listItemMatch = listMatch[1].match(/<li[\s\S]*?<\/li>/);
  if(listItemMatch) {
    let liTpl = listItemMatch[0];
    liTpl = liTpl.replace(/>\s*chicken dum biryani\s*</, '>{item.name}<');
    liTpl = liTpl.replace(/>\s*1\s*</, '>{item.qty}<');
    liTpl = liTpl.replace(/>\s*Rs\. 320\s*</, '>Rs. {item.price * item.qty}<');
    let mapping = `\n    {cart.map((item, idx) => (\n      ${liTpl}\n    ))}\n    `;
    trayBody = trayBody.replace(listMatch[1], mapping);
  }
}
trayBody = trayBody.replace(/>\s*Rs\. 870\s*</g, '>Rs. {getCartTotal()}<');
trayBody = trayBody.replace(/<button[^>]*>([\s\S]*?)\[ PROCESS PAYMENT \]([\s\S]*?)<\/button>/, '<button onClick={handlePayment} className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 px-6 rounded-xl font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm active:scale-[0.99] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mt-space-md">$1[ PROCESS PAYMENT ]$2</button>');
// Add Link to go back
trayBody = trayBody.replace(/<button className="flex items-center gap-2 text-secondary hover:text-on-surface transition-colors focus:outline-none" aria-label="Close drawer"  type="button">([\s\S]*?)<\/button>/, `<Link to="/menu" className="flex items-center gap-2 text-secondary hover:text-on-surface transition-colors focus:outline-none" aria-label="Close drawer">$1</Link>`);

let trayFinal = `import React, { useContext } from 'react';\nimport { Link, useNavigate } from 'react-router-dom';\nimport { CartContext } from '../context/CartContext';\nexport default function TokenPaymentTrayDrawer() {\n  const { cart, getCartTotal, submitOrder } = useContext(CartContext);\n  const navigate = useNavigate();\n  const handlePayment = async () => { if(await submitOrder()) navigate('/tracking'); };\n  return (\n    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">\n      ${trayBody}\n    </div>\n  );\n}`;
fs.writeFileSync('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx', trayFinal);

// 2. VendorOrderPipeline
let vendorHtml = fs.readFileSync('stitch_university_food_court_system/vendor_order_pipeline/code.html', 'utf8');
let vendorBody = getBody(vendorHtml);

// We need to find the three columns and make them dynamic
// Col 1: Queued (Incoming)
let col1Match = vendorBody.match(/<div className="flex flex-col gap-4">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- ==================== COLUMN 2/);
if(col1Match) {
  let cardMatch = col1Match[1].match(/<article[\s\S]*?<\/article>/);
  if(cardMatch) {
    let c = cardMatch[0];
    c = c.replace(/#114/g, '#{order.id.slice(-4)}');
    c = c.replace(/Omer S\./, '{order.studentName}');
    c = c.replace(/Rs\. 870/, 'Rs. {order.totalAmount}');
    c = c.replace(/<ul[\s\S]*?<\/ul>/, '<ul>{order.items.map(i => <li className="flex justify-between" key={i.id}><span>{i.qty}x {i.name}</span></li>)}</ul>');
    c = c.replace(/<button[^>]*>([\s\S]*?)\[ START PREPARING \]([\s\S]*?)<\/button>/, '<button onClick={() => updateStatus(order._id, "Preparing")} className="w-full bg-primary hover:bg-primary-container text-on-primary py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-3">$1[ START PREPARING ]$2</button>');
    let mapping = `\n    {orders.filter(o => o.status === 'Incoming').map(order => (\n      ${c}\n    ))}\n    `;
    vendorBody = vendorBody.replace(col1Match[1], mapping);
  }
}

// Col 2: Kadhai (Preparing)
let col2Match = vendorBody.match(/<div className="flex flex-col gap-4" id="kadhaicol">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- ==================== COLUMN 3/);
if(col2Match) {
  let cardMatch = col2Match[1].match(/<article[\s\S]*?<\/article>/);
  if(cardMatch) {
    let c = cardMatch[0];
    c = c.replace(/#112/g, '#{order.id.slice(-4)}');
    c = c.replace(/Aisha M\./, '{order.studentName}');
    c = c.replace(/Rs\. 1450/, 'Rs. {order.totalAmount}');
    c = c.replace(/<ul[\s\S]*?<\/ul>/, '<ul>{order.items.map(i => <li className="flex justify-between text-secondary" key={i.id}><span>{i.qty}x {i.name}</span></li>)}</ul>');
    c = c.replace(/<button[^>]*>([\s\S]*?)\[ READY FOR WINDOW \]([\s\S]*?)<\/button>/, '<button onClick={() => updateStatus(order._id, "Ready")} className="w-full bg-surface-variant hover:bg-outline-variant text-on-surface py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-3">$1[ READY FOR WINDOW ]$2</button>');
    let mapping = `\n    {orders.filter(o => o.status === 'Preparing').map(order => (\n      ${c}\n    ))}\n    `;
    vendorBody = vendorBody.replace(col2Match[1], mapping);
  }
}

// Col 3: Ready
let col3Match = vendorBody.match(/<div className="flex flex-col gap-4" id="windowcol">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
if(col3Match) {
  let cardMatch = col3Match[1].match(/<article[\s\S]*?<\/article>/);
  if(cardMatch) {
    let c = cardMatch[0];
    c = c.replace(/#109/g, '#{order.id.slice(-4)}');
    c = c.replace(/Ali R\./, '{order.studentName}');
    c = c.replace(/Rs\. 320/, 'Rs. {order.totalAmount}');
    c = c.replace(/<ul[\s\S]*?<\/ul>/, '<ul>{order.items.map(i => <li className="flex justify-between" key={i.id}><span>{i.qty}x {i.name}</span></li>)}</ul>');
    let mapping = `\n    {orders.filter(o => o.status === 'Ready').map(order => (\n      ${c}\n    ))}\n    `;
    vendorBody = vendorBody.replace(col3Match[1], mapping);
  }
}

let vendorFinal = `import React, { useState, useEffect } from 'react';\nimport axios from 'axios';\nimport io from 'socket.io-client';\nconst socket = io('http://localhost:5000');\n\nexport default function VendorOrderPipeline() {\n  const [orders, setOrders] = useState([]);\n\n  useEffect(() => {\n    axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data));\n    socket.on('new_order', (o) => setOrders(prev => [...prev, o]));\n    socket.on('order_updated', (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));\n    return () => { socket.off('new_order'); socket.off('order_updated'); };\n  }, []);\n\n  const updateStatus = async (id, nextStatus) => {\n    try { await axios.put('http://localhost:5000/api/orders/' + id, { status: nextStatus }); } catch (err) { console.error(err); }\n  };\n\n  return (\n    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">\n      ${vendorBody}\n    </div>\n  );\n}`;
fs.writeFileSync('react_frontend/src/pages/VendorOrderPipeline.jsx', vendorFinal);

console.log('Successfully completed full App Integration!');
