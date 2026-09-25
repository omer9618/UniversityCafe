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
let trackHtml = fs.readFileSync('stitch_university_food_court_system/live_token_tracker/code.html', 'utf8');
let trackBody = getBody(trackHtml);
trackBody = trackBody.replace(/>\s*T-402\s*</, '>{activeOrder ? "T-"+activeOrder._id.slice(-3) : "T-XXX"}<');
trackBody = trackBody.replace(/>\s*Omer S\.\s*</, '>{activeOrder ? activeOrder.studentName : "No Order"}<');
trackBody = trackBody.replace(/<div className="flex items-center justify-between text-secondary font-label-md text-label-md">([\s\S]*?)<\/div>/, '<div className="flex items-center justify-between text-secondary font-label-md text-label-md"><span>{activeOrder ? activeOrder.items.length + " items" : "0 items"}</span><span>Rs. {activeOrder ? activeOrder.totalAmount : 0}</span></div>');
trackBody = trackBody.replace(/>\s*KADHAI PREP\s*</, '>{activeOrder ? activeOrder.status.toUpperCase() : "AWAITING"}<');

let trackFinal = `import React, { useContext, useEffect } from 'react';\nimport { Link } from 'react-router-dom';\nimport { CartContext } from '../context/CartContext';\nimport io from 'socket.io-client';\nconst socket = io('http://localhost:5000');\nexport default function LiveTokenTracker() {\n  const { activeOrder, setActiveOrder } = useContext(CartContext);\n  useEffect(() => {\n    socket.on('order_updated', (o) => { if(activeOrder && activeOrder._id === o._id) setActiveOrder(o); });\n    return () => socket.off('order_updated');\n  }, [activeOrder]);\n  return (\n    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">\n      ${trackBody}\n    </div>\n  );\n}`;
fs.writeFileSync('react_frontend/src/pages/LiveTokenTracker.jsx', trackFinal);
console.log('Successfully completed Tracker Integration!');
