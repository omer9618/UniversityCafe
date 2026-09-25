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
  // DONT remove onclicks globally yet!
  content = content.replace(/onkeyup="[^"]*"/g, '');
  content = content.replace(/checked=""/g, 'defaultChecked');
  content = content.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  content = content.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  return content;
}

let html = fs.readFileSync('stitch_university_food_court_system/student_menu_dashboard/code.html', 'utf8');
let body = getBody(html);

// Replace cart buttons exactly
body = body.replace(/onclick="addToTray\('Chicken Dum Biryani', 320, this\)"/g, 'onClick={() => addToCart({id:1, name:"chicken dum biryani", price:320, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFGpMDcemq-BivVXev2BdRS3J1IWIJPMXX7zJYPIv5NYLaLePD7p1QlNH2MPZpC3il70CajwRmDoCREwU2pLSilkx4tOc2nWEQl5it5CQLaA9hkoi0oq87JDtvI8TDnqMz1mK25TiCd1X4gJFJcTB9EIvpxOLuWmBR9fGeuAbIJe04nHh0Xs1UTWxfyXC1D54gJ8mlV4CzGMliKb8T7aIgzGcGy2j46GotBBcH8-6K6ItG5inl_gTU"})}');
body = body.replace(/onclick="addToTray\('Chicken Chutney Roll', 240, this\)"/g, 'onClick={() => addToCart({id:2, name:"chicken chutney roll", price:240, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuHem-5T5MV3puFsh4bSVuaArKyywrxJf55bG1U3Lz3uDhYIKoTlFis0jJ_Nk0_OWAg0Kv0B8v_L1DZM7rEi0xGZDpa7CHA29g0SMX3Dsrd0nXifssR0B3EbfaUv5Li8sNy6YtQpPa7V5EHQoGOGfurEdqmqpthyaEvXcbYZ8JQnj8V2yM1NInBt5VNjABNPpluZZqhXac7bAmd27s3c8o8ZIQiKY3_sWC-h-Ya9kdeA6kzZZEuwi4"})}');
body = body.replace(/onclick="addToTray\('Aloo Samosa Duo', 80, this\)"/g, 'onClick={() => addToCart({id:3, name:"aloo samosa duo", price:80, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHHFHGahAbTNa3i6Am15CDTlbiB7JrbiapGfj1C2YXbGGWfU5oUH5IxlGAi6kJC1SPwz2a6ExgUQcFMWW57tE7kStCGxgm4uo9Ft-7LTtZT-INSWyzq9WMYFxpduTzxubigI7ydkzLKkrd4DtrskE83re1wQVU0WQk-1J0i9HXLfgXnVKqrsj1xc8L8AVZ_RrpFufQ8xYFUlAVyO7G7Ziz2sgVyBZVuUPyS5XSsqBdpEdhbWC9r1pI"})}');
body = body.replace(/onclick="addToTray\('Karak Kadak Chai', 70, this\)"/g, 'onClick={() => addToCart({id:4, name:"karak kadak chai", price:70, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWiSlHcTe738wLlNN85-T3SooFNrsCBhXWMUbbfjrJ1-fbdOgUEq7ugcdj5zwyKeh753eW7XeRfCflM9eIIdznFDbyCYWaqcmlL30SAdSV0WDIqjFYHPj43596pTtn7vBYHdzQCdN3yAg0FKOwz6C2q13iHrbiTsEH_HU6GvsYzEFYTrHpePRFCbnCgmKziH5UCXGXfSzOo2CUMkNJJhF48dW8JpHNiXg_FrqaHLjQwmhBIf606bG"})}');
body = body.replace(/onclick="addToTray\('Daal Anda Bun Kabab', 160, this\)"/g, 'onClick={() => addToCart({id:5, name:"daal anda bun kabab", price:160, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsl60KmOed7MrOSc5jLmWCp9tpToIrXUP8qgXi07AYWALQ5M1yPCstSBUCE6cuTbSupEpEMs2dE-AsFZWkZRJ1jteU-f_uCxIWEg8TmnOJsG1XdE_L9xMM0sVzSYVGfPiYZz_VORclXIfcMByJgLJ_r7p7OOODo-OdZgdRYTW14aC_GWJgW7xKqd7mKiT-g53VQnAq6oar-9CY1izi733isSPdKfhzdYC4CagbFvncjqIPtfELe8V0"})}');

// Remove remaining generic onclicks from category buttons etc.
body = body.replace(/onclick="[^"]*"/g, '');

// Fix numbers in UI
body = body.replace(/ALL 18/, 'ALL 5');
body = body.replace(/CHAATS 4/, 'CHAATS 1');
body = body.replace(/MAINS 6/, 'MAINS 1');
body = body.replace(/ROLLS 5/, 'ROLLS 1');
body = body.replace(/CHAI &amp; DRINKS 3/, 'CHAI & DRINKS 1');
body = body.replace(/\[ All Items \(6\) \]/, '[ All Items (5) ]');

// Fix Tray Link
body = body.replace(
  /<a className="flex items-center gap-2 bg-surface-container-low px-3 py-1\.5 rounded-full hover:bg-surface-container transition-colors" data-path="tray" href="#">([\s\S]*?)<\/a>/,
  `<Link to="/payment" className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors">\n    <span className="font-label-md text-label-md text-on-surface">Tray ({cart.reduce((a,b)=>a+b.qty,0)})</span>\n    <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Rs. {getCartTotal()}</span>\n  </Link>`
);

let finalCode = `import React, { useContext } from 'react';\nimport { Link } from 'react-router-dom';\nimport { CartContext } from '../context/CartContext';\n\nexport default function StudentMenuDashboard() {\n  const { cart, addToCart, getCartTotal } = useContext(CartContext);\n  return (\n    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">\n      ${body}\n    </div>\n  );\n}`;

fs.writeFileSync('react_frontend/src/pages/StudentMenuDashboard.jsx', finalCode);
console.log('Restored original menu layout exactly!');
