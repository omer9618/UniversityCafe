import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
export default function LiveTokenTracker() {
  const { activeOrder, setActiveOrder, logout, user } = useContext(CartContext);
  useEffect(() => {
    socket.on('order_updated', (o) => { if(activeOrder && activeOrder._id === o._id) setActiveOrder(o); });
    return () => socket.off('order_updated');
  }, [activeOrder]);
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="bg-primary text-on-primary py-1 px-4 text-center font-label-sm text-label-sm tracking-widest uppercase">FRESH BATCH SERVED TILL 4 PM — BU CAMPUS</div><div className="h-20 bg-surface/90 backdrop-blur-md px-margin-mobile md:px-margin flex items-center justify-between gap-4"><div className="flex items-center gap-3 shrink-0"><img alt="dhaba * brand logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALSr0DMzBwAgfaXcib1b34FfF8_3-E4J6C_cOSYciJdyadj5Cqi-fBH5ZQ-59iMwjIb4yhe8erCiJ7vpMP6FJofWkNTlTIuyxGnWpsn2Rtuw6k7THKJQdG0Qf41sRKx2t2K8qq0GvzQf5F6FruMRAywBN2Ev17zzVGRU7D0P7MHoPmENRVW7BKRXKB3VjnfuJgRUNXV_pWE0mQ8K7PHT7kT-1s4rPHRsmh0ZbHAsJ6rFJFpueZLx4j"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-none">dhaba *</span><span className="font-label-sm text-label-sm text-primary tracking-wider uppercase mt-0.5">CAMPUS CANTEEN</span></div></div><nav className="hidden lg:flex items-center gap-1 shrink-0" data-active-classes="bg-surface-container-high text-primary font-semibold"><a className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide" data-path="menu" href="#">ALL 18</a><a className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide" data-path="menu" href="#">CHAATS 4</a><a className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide" data-path="menu" href="#">MAINS 6</a><a className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide" data-path="menu" href="#">ROLLS 5</a><a className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide" data-path="menu" href="#">CHAI &amp; DRINKS 3</a><Link to="/tracking" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide"  href="#">ORDERS</Link></nav><div className="flex items-center gap-4 shrink-0"><Link to="/payment" className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors"  href="#"><span className="font-label-md text-label-md text-on-surface">Tray (3)</span><span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Rs. 870</span></Link><div className="flex items-center gap-2.5 pl-2"><div className="hidden sm:flex flex-col text-right"><span className="font-body-sm text-body-sm font-medium text-on-surface leading-snug">{user?.name || "Omer S."}</span><button onClick={() => logout()} className="font-label-sm text-label-sm text-primary hover:underline leading-none cursor-pointer text-right uppercase">Logout</button></div><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcMCbdvl7cClX_4aGkS7t6xvnZ-tmpTx3tJslK5jKqzDXfxROWxaveSEZ5nOOQRpH8b1rGENXT9lUwAYEmnD5n31PfxbJyn9ehcAK7OvZCgeVu3rU6YQkYpiW2rmiJtmxvXdW1jvsD-BGKofvu4LHqGdtfS7bBQnqszITDaGyfxkQBiH23w_jTyb9dAWex-PNC-0EV8eY4kbqrZ_vZA9zEGc9I7L-MJB0GVtvvokdq8rOqHboxMqvm"/></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">

<div className="w-full px-margin-mobile md:px-margin py-space-lg md:py-space-xl flex flex-col items-center">
  {!activeOrder ? (
    <div className="py-20 text-center flex flex-col items-center">
      <span className="material-symbols-outlined text-[64px] text-surface-container-high mb-4">receipt_long</span>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-2">No Active Order</h2>
      <p className="font-body-md text-body-md text-secondary mb-6">You haven't placed an order yet.</p>
      <Link to="/menu" className="px-6 py-3 bg-primary text-on-primary font-label-md tracking-wider uppercase rounded-full shadow-sm hover:bg-primary-container transition-colors">Go to Menu</Link>
    </div>
  ) : (
    <>
      <div className="w-full max-w-2xl flex items-center justify-between gap-4 mb-space-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">[ LIVE CAMPUS ORDER ]</span>
        </div>
        <div className="flex items-center gap-2 font-label-sm text-label-sm text-secondary">
          <span>STATION: BAY-02</span>
          <span>•</span>
          <span id="live-clock">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="w-full max-w-2xl bg-surface-container-low rounded-xl shadow-xl overflow-hidden relative mb-space-lg">
        <div className="h-1.5 w-full bg-primary"></div>
        <div className="p-space-md md:p-space-xl flex flex-col">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-space-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[14px]">restaurant</span>
                <span>Kitchen Bay 02 • Concourse L1</span>
              </div>
              <p className="font-label-md text-label-md text-secondary tracking-widest uppercase">Order Identifier</p>
              <h1 className="font-headline-xl text-headline-xl text-primary font-normal leading-none tracking-tight mt-1">
                TOKEN #{activeOrder._id ? activeOrder._id.substring(activeOrder._id.length-4).toUpperCase() : '0000'}
              </h1>
            </div>
            <div className="bg-surface-container px-4 py-3 rounded-lg flex flex-col items-start md:items-end">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">STATUS</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-md text-headline-md text-on-surface font-medium uppercase">{activeOrder.status}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-lg mb-space-lg flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-primary text-xl shrink-0">lunch_dining</span>
              <p className="font-body-sm text-body-sm text-on-surface truncate">
                {activeOrder.items && activeOrder.items.map(i => i.qty + 'x ' + i.name).join(', ')}
              </p>
            </div>
            <span className="font-label-sm text-label-sm text-secondary shrink-0 font-medium">[ {activeOrder.items ? activeOrder.items.reduce((a,b)=>a+b.qty,0) : 0} ITEMS ]</span>
          </div>

          <div className="mb-space-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">ORDER LIFECYCLE</span>
            </div>
            <div className="space-y-4">
              
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={"w-7 h-7 rounded-full flex items-center justify-center shrink-0 " + (['queued', 'preparing', 'ready', 'completed'].includes(activeOrder.status) ? "bg-primary text-on-primary" : "bg-surface-container-high text-secondary")}>
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className={"w-0.5 h-10 mt-1 " + (['preparing', 'ready', 'completed'].includes(activeOrder.status) ? "bg-primary" : "bg-surface-container-high")}></div>
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Order Accepted & Queued</h3>
                  <p className="font-body-sm text-body-sm text-secondary mt-0.5">Sent to Kitchen.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={"w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative " + (['preparing', 'ready', 'completed'].includes(activeOrder.status) ? "bg-primary text-on-primary" : "bg-surface-container-high text-secondary")}>
                    {activeOrder.status === 'preparing' && <span className="w-2.5 h-2.5 rounded-full bg-on-primary animate-ping absolute"></span>}
                    <span className="material-symbols-outlined text-[16px]">skillet</span>
                  </div>
                  <div className={"w-0.5 h-10 mt-1 " + (['ready', 'completed'].includes(activeOrder.status) ? "bg-primary" : "bg-surface-container-high")}></div>
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">In Preparation</h3>
                  {activeOrder.status === 'preparing' && (
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: '68%' }}></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={"w-7 h-7 rounded-full flex items-center justify-center shrink-0 " + (['ready', 'completed'].includes(activeOrder.status) ? "bg-primary text-on-primary" : "bg-surface-container-high text-secondary")}>
                    <span className="material-symbols-outlined text-[16px]">countertops</span>
                  </div>
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Ready for Pickup</h3>
                  <p className="font-body-sm text-body-sm text-secondary mt-0.5">Present your token pass at the counter.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-surface-container rounded-lg p-space-md mb-space-lg">
            <div className="flex items-center justify-between pb-2 mb-3">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">ITEMIZED LEDGER</span>
            </div>
            <div className="space-y-2 font-body-sm text-body-sm">
              {activeOrder.items && activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline py-1">
                  <span className="text-on-surface">{item.qty} × {item.name}</span>
                  <span className="font-label-md text-label-md text-on-surface">Rs. {item.price * item.qty}</span>
                </div>
              ))}
              <div className="pt-3 mt-2 flex justify-between items-baseline bg-surface-container-high p-2 rounded">
                <div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">TOTAL CHARGED</span>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-primary font-medium">Rs. {activeOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )}
</div>
</div></main><footer className="w-full bg-surface-container-low mt-space-xl py-space-xl"><div className="w-full px-margin-mobile md:px-margin"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-lg pb-space-lg"><div className="space-y-1"><p className="font-headline-sm text-headline-sm text-on-surface">dhaba * canteen</p><p className="font-body-sm text-body-sm text-on-surface-variant">Freshly sourced, restorative university canteen kitchen.</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">OPERATING HOURS</p><p className="font-body-sm text-body-sm text-on-surface-variant">Mon - Sat: 08:30 - 18:30</p><p className="font-body-sm text-body-sm text-secondary">Sunday: Closed for deep prep</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">PICKUP POINTS</p><p className="font-body-sm text-body-sm text-on-surface-variant">Counters 1-4 • Main Concourse</p><p className="font-body-sm text-body-sm text-secondary">Express Chai Bar: Bay 2</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">CAMPUS WALLET</p><p className="font-label-md text-label-md text-on-surface font-bold">Wallet: Rs. 2,450</p><p className="font-body-sm text-body-sm text-on-surface-variant">Auto-reload active (Campus ID)</p></div></div><div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-space-md"><p className="font-label-sm text-label-sm text-secondary tracking-wider">[ 100% LOCALLY MILLED GRAINS • COLD-PRESSED MUSTARD OIL • HALAL &amp; JAIN PROTOCOLS ]</p><p className="font-label-sm text-label-sm text-secondary">© 2024 BU CAMPUS SERVICES • DHABA RECORD NO. 448</p></div></div></footer>
    </div>
  );
}