const fs = require('fs');

// 1. Cart Context
let ctx = fs.readFileSync('react_frontend/src/context/CartContext.jsx', 'utf8');
if (!ctx.includes('removeFromCart')) {
  ctx = ctx.replace('const clearCart = () => setCart([]);', 'const clearCart = () => setCart([]);\n  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));');
  ctx = ctx.replace('getCartTotal, clearCart, submitOrder', 'getCartTotal, clearCart, removeFromCart, submitOrder');
  fs.writeFileSync('react_frontend/src/context/CartContext.jsx', ctx);
}

// 2. Token Payment Tray Drawer
let tray = fs.readFileSync('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx', 'utf8');
tray = tray.replace(
  'const { cart, getCartTotal, submitOrder } = useContext(CartContext);',
  'const { cart, getCartTotal, submitOrder, removeFromCart } = useContext(CartContext);'
);

let trayListMatch = tray.match(/<div className="flex flex-col divide-y divide-surface-container-high bg-surface-container-low rounded-xl p-space-md shadow-sm">([\s\S]*?)<\/div>\s*<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2">/);
if (trayListMatch) {
  let listContent = trayListMatch[1];
  let itemMatch = listContent.match(/<div className="py-space-md[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (itemMatch) {
    let tpl = itemMatch[0];
    tpl = tpl.replace(/Chicken Dum Biryani/g, '{item.name}');
    tpl = tpl.replace(/src="[^"]*"/, 'src={item.image || ""}');
    tpl = tpl.replace(/>MAIN</, '>{item.category?.replace(/[^a-zA-Z]/g,"") || "ITEM"}<');
    tpl = tpl.replace(/>Single plate • with mint raita</, '>{item.desc?.substring(0,30)+"..."}<');
    tpl = tpl.replace(/>Rs\. 320</, '>Rs. {item.price}<');
    tpl = tpl.replace(/<span className="w-8 text-center font-label-sm text-label-sm font-semibold text-on-surface">1<\/span>/, '<span className="w-8 text-center font-label-sm text-label-sm font-semibold text-on-surface">{item.qty}</span>');
    tpl = tpl.replace(/<button aria-label="Remove \{item.name\}" className="text-secondary hover:text-error transition-colors p-1 rounded" type="button">/g, '<button onClick={() => removeFromCart(item.name)} aria-label="Remove {item.name}" className="text-secondary hover:text-error transition-colors p-1 rounded" type="button">');
    let mapping = `\n{cart.map((item, idx) => (\n  <div key={idx}>\n${tpl}\n</div>\n))}\n`;
    tray = tray.replace(listContent, mapping);
  }
}

tray = tray.replace(/>Rs\. 870</g, '>Rs. {getCartTotal()}<');
tray = tray.replace(/Subtotal \(3 items\)/, 'Subtotal ({cart.reduce((a,b)=>a+b.qty,0)} items)');
tray = tray.replace(
  /<button className="w-full bg-primary hover:bg-primary-container active:scale-\[0\.99\] text-on-primary py-4 px-6 rounded-full font-label-md text-label-md tracking-wider uppercase font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-sm" id="issue-token-btn" type="button">([\s\S]*?)<\/button>/,
  `<button onClick={handlePayment} className="w-full bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary py-4 px-6 rounded-full font-label-md text-label-md tracking-wider uppercase font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-sm" id="issue-token-btn" type="button">\n<span>[ Pay Rs. {getCartTotal()} & Issue Token ]</span>\n<span className="material-symbols-outlined text-base">arrow_forward</span>\n</button>`
);
fs.writeFileSync('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx', tray);

// 3. Ghost Buttons in StudentMenuDashboard
let menu = fs.readFileSync('react_frontend/src/pages/StudentMenuDashboard.jsx', 'utf8');
if(!menu.includes('const [filter, setFilter] = React.useState')) {
  menu = menu.replace(
    'const { cart, addToCart, getCartTotal } = useContext(CartContext);',
    `const { cart, addToCart, getCartTotal } = useContext(CartContext);\n  const [filter, setFilter] = React.useState('all');\n  const [search, setSearch] = React.useState('');`
  );
  menu = menu.replace(/<button className="category-btn active([^"]*?)"\s*>/g, '<button onClick={() => setFilter("all")} className={`category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all ${filter === "all" ? "bg-primary text-on-primary" : "bg-surface-container text-secondary hover:text-on-surface"}`}>');
  menu = menu.replace(/<button className="category-btn px-4([^"]*?)"\s*>\s*\[ MAINS &amp; BIRYANI \]\s*<\/button>/g, '<button onClick={() => setFilter("rice")} className={`category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all ${filter === "rice" ? "bg-primary text-on-primary" : "bg-surface-container text-secondary hover:text-on-surface"}`}>[ MAINS & BIRYANI ]</button>');
  menu = menu.replace(/<button className="category-btn px-4([^"]*?)"\s*>\s*\[ PARATHA ROLLS \]\s*<\/button>/g, '<button onClick={() => setFilter("rolls")} className={`category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all ${filter === "rolls" ? "bg-primary text-on-primary" : "bg-surface-container text-secondary hover:text-on-surface"}`}>[ PARATHA ROLLS ]</button>');
  menu = menu.replace(/<button className="category-btn px-4([^"]*?)"\s*>\s*\[ QUICK BITES \]\s*<\/button>/g, '<button onClick={() => setFilter("snacks")} className={`category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all ${filter === "snacks" ? "bg-primary text-on-primary" : "bg-surface-container text-secondary hover:text-on-surface"}`}>[ QUICK BITES ]</button>');
  menu = menu.replace(/<button className="category-btn px-4([^"]*?)"\s*>\s*\[ CHAI &amp; COLD \]\s*<\/button>/g, '<button onClick={() => setFilter("brews")} className={`category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all ${filter === "brews" ? "bg-primary text-on-primary" : "bg-surface-container text-secondary hover:text-on-surface"}`}>[ CHAI & COLD ]</button>');
  menu = menu.replace(/<input className="([^"]*?)" id="item-search" placeholder="search grain, spice, or dish\.\.\." type="text"\/>/, `<input value={search} onChange={(e) => setSearch(e.target.value)} className="$1" id="item-search" placeholder="search grain, spice, or dish..." type="text"/>`);

  let snacksCount = 0;
  menu = menu.replace(/<article className="menu-card group relative flex flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container\/40 transition-colors" data-category="([^"]+)">/g, (match, cat) => {
    let nameFilter = "";
    if(cat === "rice") nameFilter = "chicken dum biryani";
    else if(cat === "rolls") nameFilter = "chicken chutney roll";
    else if(cat === "brews") nameFilter = "karak kadak chai";
    else if(cat === "snacks") {
      snacksCount++;
      nameFilter = snacksCount === 1 ? "aloo samosa duo" : "daal anda bun kabab";
    }
    return `<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="${cat}") && "${nameFilter}".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="${cat}">`;
  });

  menu = menu.replace(/<a className="px-3 py-1\.5 rounded text-on-surface-variant([^"]*?)" data-path="menu" href="#">ALL 5<\/a>/, `<button onClick={() => setFilter("all")} className="px-3 py-1.5 rounded text-on-surface-variant$1">ALL 5</button>`);
  menu = menu.replace(/<a className="px-3 py-1\.5 rounded text-on-surface-variant([^"]*?)" data-path="menu" href="#">CHAATS 1<\/a>/, `<button onClick={() => setFilter("snacks")} className="px-3 py-1.5 rounded text-on-surface-variant$1">CHAATS 1</button>`);
  menu = menu.replace(/<a className="px-3 py-1\.5 rounded text-on-surface-variant([^"]*?)" data-path="menu" href="#">MAINS 1<\/a>/, `<button onClick={() => setFilter("rice")} className="px-3 py-1.5 rounded text-on-surface-variant$1">MAINS 1</button>`);
  menu = menu.replace(/<a className="px-3 py-1\.5 rounded text-on-surface-variant([^"]*?)" data-path="menu" href="#">ROLLS 1<\/a>/, `<button onClick={() => setFilter("rolls")} className="px-3 py-1.5 rounded text-on-surface-variant$1">ROLLS 1</button>`);
  menu = menu.replace(/<a className="px-3 py-1\.5 rounded text-on-surface-variant([^"]*?)" data-path="menu" href="#">CHAI &amp; DRINKS 1<\/a>/, `<button onClick={() => setFilter("brews")} className="px-3 py-1.5 rounded text-on-surface-variant$1">CHAI & DRINKS 1</button>`);
  menu = menu.replace(/<a className="px-3 py-1\.5 rounded text-on-surface-variant([^"]*?)" data-path="tracker" href="#">ORDERS<\/a>/, `<Link to="/tracking" className="px-3 py-1.5 rounded text-on-surface-variant$1">ORDERS</Link>`);

  fs.writeFileSync('react_frontend/src/pages/StudentMenuDashboard.jsx', menu);
}
console.log('Fixed Ghost Buttons and Delete Buttons!');
