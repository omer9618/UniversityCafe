const fs = require('fs');
let tray = fs.readFileSync('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx', 'utf8');

// 1. Navbar numbers and links
tray = tray.replace(/ALL 18/g, 'ALL 5');
tray = tray.replace(/CHAATS 4/g, 'CHAATS 1');
tray = tray.replace(/MAINS 6/g, 'MAINS 1');
tray = tray.replace(/ROLLS 5/g, 'ROLLS 1');
tray = tray.replace(/CHAI &amp; DRINKS 3/g, 'CHAI & DRINKS 1');
tray = tray.replace(/Tray \(3\)/g, 'Tray ({cart.reduce((a,b)=>a+b.qty,0)})');

// Make the nav items link properly
tray = tray.replace(/<a ([^>]*)data-path="menu"([^>]*)>([^<]*)<\/a>/g, '<Link to="/menu" $1$2>$3</Link>');
tray = tray.replace(/<a ([^>]*)data-path="tracker"([^>]*)>([^<]*)<\/a>/g, '<Link to="/tracking" $1$2>$3</Link>');
tray = tray.replace(/<a ([^>]*)data-path="tray"([^>]*)>([\s\S]*?)<\/a>/g, '<Link to="/payment" $1$2>$3</Link>');

// 2. Remove hardcoded list and insert {cart.map}
let listRegex = /<div className="flex flex-col divide-y divide-surface-container-high bg-surface-container-low rounded-xl p-space-md shadow-sm">([\s\S]*?)<\/div>\s*<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2">/;

let listMatch = tray.match(listRegex);
if(listMatch) {
  let template = `<div className="py-space-md first:pt-2 last:pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
<div className="flex items-center gap-4 min-w-0">
<div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0 shadow-sm">
<img alt="{item.name}" className="w-full h-full object-cover" src={item.image || ""}/>
<span className="absolute bottom-1 right-1 font-label-sm text-[0.625rem] bg-surface/90 px-1 py-0.5 rounded text-on-surface font-semibold tracking-tighter">{item.category ? item.category.replace(/[^a-zA-Z]/g,"") : "ITEM"}</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-2">
<span className="font-headline-sm text-headline-sm text-on-surface truncate">{item.name}</span>
</div>
<span className="font-body-sm text-body-sm text-secondary truncate">Rs. {item.price} each</span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-medium mt-1">Rs. {item.price * item.qty}</span>
</div>
</div>
<div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0">
<div className="inline-flex items-center bg-surface-container-highest rounded-lg p-0.5">
<button aria-label="Decrease quantity" className="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:bg-surface hover:text-on-surface transition-colors font-label-md" type="button">
<span className="material-symbols-outlined text-sm">remove</span>
</button>
<span className="w-8 text-center font-label-sm text-label-sm font-semibold text-on-surface">{item.qty}</span>
<button aria-label="Increase quantity" className="w-7 h-7 flex items-center justify-center rounded text-on-surface-variant hover:bg-surface hover:text-on-surface transition-colors font-label-md" type="button">
<span className="material-symbols-outlined text-sm">add</span>
</button>
</div>
<button onClick={() => removeFromCart(item.name)} aria-label="Remove item" className="text-secondary hover:text-error transition-colors p-1 rounded" type="button">
<span className="material-symbols-outlined text-lg">delete_outline</span>
</button>
</div>
</div>`;
  
  let mapping = `\n{cart.length === 0 ? <div className="py-8 text-center text-secondary font-label-md">Tray is empty. Go back to Menu to add items.</div> : cart.map((item, idx) => (<div key={idx}>\n${template}\n</div>))}\n`;
  tray = tray.replace(listMatch[1], mapping);
}

fs.writeFileSync('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx', tray);
console.log('Fixed Tray fully!');
