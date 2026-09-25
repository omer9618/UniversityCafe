import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
export default function TokenPaymentTrayDrawer() {
  const { cart, getCartTotal, submitOrder, removeFromCart, logout, user } = useContext(CartContext);
  const navigate = useNavigate();
  const handlePayment = async () => { if(await submitOrder()) navigate('/tracking'); };
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="bg-primary text-on-primary py-1 px-4 text-center font-label-sm text-label-sm tracking-widest uppercase">FRESH BATCH SERVED TILL 4 PM — BU CAMPUS</div><div className="h-20 bg-surface/90 backdrop-blur-md px-margin-mobile md:px-margin flex items-center justify-between gap-4"><div className="flex items-center gap-3 shrink-0"><img alt="dhaba * brand logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALSr0DMzBwAgfaXcib1b34FfF8_3-E4J6C_cOSYciJdyadj5Cqi-fBH5ZQ-59iMwjIb4yhe8erCiJ7vpMP6FJofWkNTlTIuyxGnWpsn2Rtuw6k7THKJQdG0Qf41sRKx2t2K8qq0GvzQf5F6FruMRAywBN2Ev17zzVGRU7D0P7MHoPmENRVW7BKRXKB3VjnfuJgRUNXV_pWE0mQ8K7PHT7kT-1s4rPHRsmh0ZbHAsJ6rFJFpueZLx4j"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-none">dhaba *</span><span className="font-label-sm text-label-sm text-primary tracking-wider uppercase mt-0.5">CAMPUS CANTEEN</span></div></div><nav className="hidden lg:flex items-center gap-1 shrink-0" data-active-classes="bg-surface-container-high text-primary font-semibold"><Link to="/menu" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">ALL 5</Link><Link to="/menu" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">CHAATS 1</Link><Link to="/menu" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">MAINS 1</Link><Link to="/menu" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">ROLLS 1</Link><Link to="/menu" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">CHAI & DRINKS 1</Link><Link to="/tracking" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">ORDERS</Link></nav><div className="flex items-center gap-4 shrink-0"><Link to="/payment" className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors"  href="#"><span className="font-label-md text-label-md text-on-surface">Tray ({cart.reduce((a,b)=>a+b.qty,0)})</span><span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Rs. {getCartTotal()}</span></Link><div className="flex items-center gap-2.5 pl-2"><div className="hidden sm:flex flex-col text-right"><span className="font-body-sm text-body-sm font-medium text-on-surface leading-snug">{user?.name || "Omer S."}</span><button onClick={() => logout()} className="font-label-sm text-label-sm text-primary hover:underline leading-none cursor-pointer text-right uppercase">Logout</button></div><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcMCbdvl7cClX_4aGkS7t6xvnZ-tmpTx3tJslK5jKqzDXfxROWxaveSEZ5nOOQRpH8b1rGENXT9lUwAYEmnD5n31PfxbJyn9ehcAK7OvZCgeVu3rU6YQkYpiW2rmiJtmxvXdW1jvsD-BGKofvu4LHqGdtfS7bBQnqszITDaGyfxkQBiH23w_jTyb9dAWex-PNC-0EV8eY4kbqrZ_vZA9zEGc9I7L-MJB0GVtvvokdq8rOqHboxMqvm"/></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">
<div className="w-full px-margin-mobile md:px-margin py-space-lg">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-space-md mb-space-lg border-b border-surface-container-high">
<div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary">
<a className="hover:text-primary transition-colors uppercase tracking-wider" href="#">CANTEEN</a>
<span>/</span>
<a className="hover:text-primary transition-colors uppercase tracking-wider" href="#">CURRENT SELECTION</a>
<span>/</span>
<span className="text-primary font-medium uppercase tracking-wider">[ TRAY &amp; TOKEN LEDGER ]</span>
</div>
<div className="flex items-center gap-3">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          KITCHEN QUEUE: 4 MIN EST.
        </span>
<span className="font-label-sm text-label-sm text-secondary uppercase">TERMINAL: BU-NORTH-04</span>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<section className="lg:col-span-7 flex flex-col gap-space-lg">
<div className="flex items-baseline justify-between">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">tray items</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">3 curated fresh selections ready for kitchen transmission.</p>
</div>
<button className="font-label-sm text-label-sm text-secondary hover:text-primary underline tracking-wider uppercase transition-colors" type="button">
            CLEAR TRAY
          </button>
</div>

<div className="flex flex-col divide-y divide-surface-container-high bg-surface-container-low rounded-xl p-space-md shadow-sm">
{cart.length === 0 ? <div className="py-8 text-center text-secondary font-label-md">Tray is empty. Go back to Menu to add items.</div> : cart.map((item, idx) => (<div key={idx}>
<div className="py-space-md first:pt-2 last:pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
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
</div>
</div>))}
</div>

<div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-2">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary flex items-center justify-between" htmlFor="kitchen-notes">
<span>[ SPECIAL KITCHEN INSTRUCTIONS ]</span>
<span className="text-tertiary">MAX 80 CHARACTERS</span>
</label>
<div className="relative">
<input className="w-full bg-surface-container px-3.5 py-2.5 rounded-lg text-body-md text-on-surface placeholder:italic placeholder:font-headline-md placeholder:text-secondary focus:outline-none focus:bg-surface-container-high transition-colors" id="kitchen-notes" maxlength="80" placeholder="e.g. less spice in roll, separate raita..." type="text"/>
<span className="absolute right-3 top-3 text-secondary material-symbols-outlined text-base">edit_note</span>
</div>
</div>

<div className="grid grid-cols-3 gap-2 bg-surface-container-low p-space-sm rounded-lg text-center">
<div className="p-2">
<span className="font-label-sm text-label-sm block text-primary font-bold">100% FRESH</span>
<span className="font-body-sm text-body-sm text-secondary">Zero reheated rice</span>
</div>
<div className="p-2">
<span className="font-label-sm text-label-sm block text-primary font-bold">HALAL PROTOCOL</span>
<span className="font-body-sm text-body-sm text-secondary">Audited butcher batch</span>
</div>
<div className="p-2">
<span className="font-label-sm text-label-sm block text-primary font-bold">KULHAD CLAY</span>
<span className="font-body-sm text-body-sm text-secondary">Biodegradable ware</span>
</div>
</div>
</section>

<section className="lg:col-span-5 flex flex-col gap-space-md">
<div className="bg-surface-container-low rounded-xl p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">

<div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full pointer-events-none blur-2xl"></div>

<div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-medium">[ ORDER RECEIPT ]</span>
<h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">token order summary</h2>
</div>
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-lg">receipt_long</span>
</div>
</div>

<div className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex justify-between items-center">
<span>Subtotal ({cart.reduce((a,b)=>a+b.qty,0)} items)</span>
<span className="font-label-md text-label-md text-on-surface font-medium">Rs. {getCartTotal()}</span>
</div>
<div className="flex justify-between items-center">
<span className="flex items-center gap-1.5">
                Campus Student Subsidy
                <span className="material-symbols-outlined text-sm text-secondary" title="Applies to registered meal plans">info</span>
</span>
<span className="font-label-md text-label-md text-secondary">- Rs. 0 <span className="text-xs">(0%)</span></span>
</div>
<div className="flex justify-between items-center">
<span>Food Court Token Fee</span>
<span className="font-label-md text-label-md text-primary uppercase text-xs font-semibold">Rs. 0 (Waived)</span>
</div>
<div className="pt-3 mt-1 border-t border-surface-container-high flex justify-between items-baseline">
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Total Token Amount</span>
<span className="font-headline-md text-headline-md text-primary font-bold">Rs. {getCartTotal()}</span>
</div>
</div>

<div className="bg-surface-container p-3 rounded-lg flex flex-col gap-1.5">
<div className="flex justify-between items-center">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">COLLECTION BAY</span>
<span className="font-label-sm text-label-sm text-primary font-semibold">FAST TRACK</span>
</div>
<div className="flex items-center gap-2 text-on-surface">
<span className="material-symbols-outlined text-primary text-xl">location_on</span>
<span className="font-body-md text-body-md font-semibold">Pickup at: Counter 02 (Mains &amp; Grills)</span>
</div>
<span className="font-body-sm text-body-sm text-secondary pl-7">Chai ready concurrently at Express Bay 2</span>
</div>

<div className="flex flex-col gap-2.5">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
              SELECT PAYMENT CHANNEL
            </label>
<div className="flex flex-col gap-2">

<label className="relative flex items-start gap-3 p-3 rounded-lg bg-surface cursor-pointer shadow-sm hover:bg-surface-container-lowest transition-colors">
<input defaultChecked className="mt-1 text-primary focus:ring-primary h-4 w-4 accent-primary" name="payment-method" type="radio"/>
<div className="flex flex-col flex-1">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md font-semibold text-on-surface">University Student Card</span>
<span className="font-label-sm text-label-sm bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">RECOMMENDED</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Campus Wallet (Balance: <span className="font-semibold text-on-surface">Rs. 2,450</span>)</span>
</div>
</label>

<label className="relative flex items-start gap-3 p-3 rounded-lg bg-surface-container cursor-pointer hover:bg-surface transition-colors">
<input className="mt-1 text-primary focus:ring-primary h-4 w-4 accent-primary" name="payment-method" type="radio"/>
<div className="flex flex-col flex-1">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md font-semibold text-on-surface">Mock Card / Raast Instant ID</span>
<span className="font-label-sm text-label-sm text-secondary">ZERO SURCHARGE</span>
</div>
<span className="font-body-sm text-body-sm text-secondary mt-0.5">Pay via central university banking gateway</span>
</div>
</label>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div className="sm:col-span-2 flex flex-col gap-1">
<label className="font-label-sm text-label-sm uppercase text-secondary" htmlFor="campus-id">Campus Card / Account</label>
<input className="w-full bg-surface px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface focus:outline-none cursor-not-allowed select-all" id="campus-id" readonly="" type="text" value="BU-2022-88194-SE"/>
</div>
<div className="flex flex-col gap-1">
<label className="font-label-sm text-label-sm uppercase text-secondary" htmlFor="student-pin">Quick PIN / CVV</label>
<input className="w-full bg-surface px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface tracking-widest text-center focus:outline-none focus:bg-surface-container-highest transition-colors" id="student-pin" maxlength="4" placeholder="••••" type="password" value="4892"/>
</div>
</div>

<button onClick={handlePayment} className="w-full bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary py-4 px-6 rounded-full font-label-md text-label-md tracking-wider uppercase font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-sm" id="issue-token-btn" type="button">
<span>[ Pay Rs. {getCartTotal()} & Issue Token ]</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</button>

<div className="flex items-start gap-2 pt-1 text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm mt-0.5 text-primary">verified_user</span>
<span>Encrypted campus transaction. Instant digital kitchen token will be generated on confirmation.</span>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-space-md flex items-center justify-between text-secondary">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-base">touch_app</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase">CONTACTLESS PICKUP</span>
<span className="font-body-sm text-body-sm text-secondary">Show barcode at Counter 02 screen</span>
</div>
</div>
<span className="font-label-sm text-label-sm text-primary tracking-wider">[ READY ~12:45 ]</span>
</div>
</section>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-low mt-space-xl py-space-xl"><div className="w-full px-margin-mobile md:px-margin"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-lg pb-space-lg"><div className="space-y-1"><p className="font-headline-sm text-headline-sm text-on-surface">dhaba * canteen</p><p className="font-body-sm text-body-sm text-on-surface-variant">Freshly sourced, restorative university canteen kitchen.</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">OPERATING HOURS</p><p className="font-body-sm text-body-sm text-on-surface-variant">Mon - Sat: 08:30 - 18:30</p><p className="font-body-sm text-body-sm text-secondary">Sunday: Closed for deep prep</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">PICKUP POINTS</p><p className="font-body-sm text-body-sm text-on-surface-variant">Counters 1-4 • Main Concourse</p><p className="font-body-sm text-body-sm text-secondary">Express Chai Bar: Bay 2</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">CAMPUS WALLET</p><p className="font-label-md text-label-md text-on-surface font-bold">Wallet: Rs. 2,450</p><p className="font-body-sm text-body-sm text-on-surface-variant">Auto-reload active (Campus ID)</p></div></div><div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-space-md"><p className="font-label-sm text-label-sm text-secondary tracking-wider">[ 100% LOCALLY MILLED GRAINS • COLD-PRESSED MUSTARD OIL • HALAL &amp; JAIN PROTOCOLS ]</p><p className="font-label-sm text-label-sm text-secondary">© 2024 BU CAMPUS SERVICES • DHABA RECORD NO. 448</p></div></div></footer>
    </div>
  );
}