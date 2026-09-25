import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

import { CartContext } from '../context/CartContext';
export default function VendorOrderPipeline() {
  const { logout } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data));
    socket.on('new_order', (o) => setOrders(prev => [...prev, o]));
    socket.on('order_updated', (o) => setOrders(prev => prev.map(p => p._id === o._id ? o : p)));
    return () => { socket.off('new_order'); socket.off('order_updated'); };
  }, []);

  const updateStatus = async (id, nextStatus) => {
    try { await axios.put('http://localhost:5000/api/orders/' + id, { status: nextStatus }); } catch (err) { console.error(err); }
  };

  const queued = orders.filter(o => o.status === 'queued');
  const preparing = orders.filter(o => o.status === 'preparing');
  const ready = orders.filter(o => o.status === 'ready');

  const renderCard = (order, buttonText, nextStatus, icon) => (
    <div key={order._id} className="station-card flex flex-col justify-between bg-surface-container-low rounded-lg p-space-md shadow-md hover:shadow-xl transition-shadow relative overflow-hidden mb-4 border border-surface-container-high/50">
      <div>
        <div className="flex items-start justify-between gap-2 pb-3 bg-surface-container-high/60 -mx-4 -mt-4 px-4 py-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md font-bold text-primary">#{order._id.substring(order._id.length-4).toUpperCase()}</span>
              <span className="font-label-sm text-label-sm text-secondary">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">Student: <span className="text-secondary font-label-sm">{typeof order.user === 'string' ? order.user.substring(0,8) : (order.user?.name || order.user?._id?.substring(0,8) || 'Walk-in')}</span></p>
          </div>
        </div>
        <div className="space-y-2.5 my-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2 rounded bg-surface-container-lowest">
              <input className="mt-1 accent-primary w-4 h-4 rounded cursor-pointer" type="checkbox"/>
              <label className="font-body-md text-body-md text-on-surface leading-tight cursor-pointer">
                <span className="font-bold text-primary font-label-md">{item.qty}x</span> {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-3 mt-2 bg-surface-container/60 -mx-4 -mb-4 px-4 py-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between font-label-sm text-label-sm text-secondary">
          <span>Ledger</span>
          <span className="font-bold text-on-surface">Rs. {order.totalAmount}</span>
        </div>
        <button onClick={() => updateStatus(order._id, nextStatus)} className="w-full py-2.5 px-4 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
          {buttonText}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="space-y-6"><div className="flex items-center gap-3 px-2"><img alt="dhaba * brand logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALSr0DMzBwAgfaXcib1b34FfF8_3-E4J6C_cOSYciJdyadj5Cqi-fBH5ZQ-59iMwjIb4yhe8erCiJ7vpMP6FJofWkNTlTIuyxGnWpsn2Rtuw6k7THKJQdG0Qf41sRKx2t2K8qq0GvzQf5F6FruMRAywBN2Ev17zzVGRU7D0P7MHoPmENRVW7BKRXKB3VjnfuJgRUNXV_pWE0mQ8K7PHT7kT-1s4rPHRsmh0ZbHAsJ6rFJFpueZLx4j"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-none">dhaba *</span><span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mt-0.5">KITCHEN KDS</span></div></div><nav className="space-y-1" data-active-classes="bg-surface-container-high text-primary font-medium"><a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md" data-path="kitchen" href="#!"><span className="material-symbols-outlined text-[20px]">skillet</span>Live Queue</a><a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md" data-path="tracker" href="#!" onClick={() => alert('Token Callout screen is under development')}><span className="material-symbols-outlined text-[20px]">confirmation_number</span>Token Callout</a><a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md" data-path="menu" href="#!" onClick={() => alert('Stock Control screen is under development')}><span className="material-symbols-outlined text-[20px]">menu_book</span>Stock Control</a></nav></div><div className="p-3 bg-surface rounded-lg space-y-2"><p className="font-label-sm text-label-sm text-secondary uppercase">KITCHEN STATUS</p><div className="flex items-center justify-between"><span className="font-body-sm text-body-sm text-on-surface font-medium">Station 1-A Active</span><span className="w-2 h-2 rounded-full bg-primary"></span></div><p className="font-label-sm text-label-sm text-secondary">Batch: #B-204</p></div></aside><div className="pl-64"><header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-md z-40 px-gutter flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="flex items-center gap-3"><span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded font-bold text-primary">SERVICE MODE</span><span className="font-body-sm text-body-sm text-on-surface-variant">BU Concourse Line 01</span></div><div className="flex items-center gap-4"><span className="font-label-sm text-label-sm text-secondary">Lead Chef: S. Rao</span><button onClick={() => logout()} className="font-label-sm text-label-sm text-primary hover:underline uppercase tracking-wider font-bold ml-2 mr-2">LOGOUT</button><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcMCbdvl7cClX_4aGkS7t6xvnZ-tmpTx3tJslK5jKqzDXfxROWxaveSEZ5nOOQRpH8b1rGENXT9lUwAYEmnD5n31PfxbJyn9ehcAK7OvZCgeVu3rU6YQkYpiW2rmiJtmxvXdW1jvsD-BGKofvu4LHqGdtfS7bBQnqszITDaGyfxkQBiH23w_jTyb9dAWex-PNC-0EV8eY4kbqrZ_vZA9zEGc9I7L-MJB0GVtvvokdq8rOqHboxMqvm"/></div></header><main className="relative pt-16 bg-surface min-h-screen px-gutter py-space-lg"><div className="flex flex-col w-full">

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-space-md bg-surface-container rounded-lg shadow-sm">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">STALL 01 &amp; 02</span>
</div>
<h1 className="font-headline-md text-headline-md text-on-surface">Kitchen Order Pipeline</h1>
</div>

<div className="flex items-center gap-3 px-space-md py-space-sm bg-surface-container-lowest rounded-lg shadow-sm font-label-sm text-label-sm text-secondary">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-primary">local_fire_department</span>
<span className="font-bold text-on-surface">12</span> Active
      </div>
<span className="text-outline-variant">•</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">timer</span>
<span>Avg Ticket <span className="font-bold text-on-surface">5.2m</span></span>
</div>
<span className="text-outline-variant">•</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
<span className="text-primary font-medium">Lunch Rush (12-3 PM)</span>
</div>
</div>

<div className="flex flex-wrap items-center gap-2">
<div className="flex items-center p-1 bg-surface-container-high rounded-lg gap-1" id="station-tabs">
<button className="px-3 py-1.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-sm transition-all" >All (12)</button>
<button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all" >Handi (4)</button>
<button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all" >Tawa (5)</button>
<button className="px-3 py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all" >Chai (3)</button>
</div>
<button className="flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface-variant rounded-lg shadow-sm transition-colors font-label-sm text-label-sm" id="bell-toggle"  title="Toggle Sound Alarms">
<span className="material-symbols-outlined text-[18px] text-primary">notifications_active</span>
<span className="hidden sm:inline">Chime: ON</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-space-md">
<div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex items-center justify-between">
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase">Stove Utilization</p>
<p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">88% Load</p>
</div>
<div className="w-16 h-8 text-primary">
<svg className="w-full h-full stroke-current fill-none stroke-2" viewbox="0 0 60 28">
<polyline points="0,24 10,18 20,22 30,10 40,14 50,4 60,8"></polyline>
</svg>
</div>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex items-center justify-between">
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase">Average Cook</p>
<p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">4m 42s</p>
</div>
<div className="w-16 h-8 text-secondary">
<svg className="w-full h-full stroke-current fill-none stroke-2" viewbox="0 0 60 28">
<polyline points="0,12 12,14 24,8 36,10 48,16 60,11"></polyline>
</svg>
</div>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex items-center justify-between">
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase">Delayed Tickets</p>
<p className="font-headline-sm text-headline-sm text-primary mt-0.5">0 Tokens</p>
</div>
<span className="material-symbols-outlined text-[28px] text-primary/70">verified</span>
</div>
<div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm flex items-center justify-between">
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase">Next Slot Wait</p>
<p className="font-headline-sm text-headline-sm text-on-surface mt-0.5">~6 Mins</p>
</div>
<span className="material-symbols-outlined text-[28px] text-secondary">pace</span>
</div>
</div>


<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-space-lg">
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between pb-2 bg-surface-container-low px-4 py-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 bg-surface-container-lowest rounded font-label-sm text-label-sm font-bold text-secondary tracking-widest">[ QUEUED ]</span>
        <span className="font-headline-sm text-headline-sm text-on-surface">Tokens</span>
      </div>
      <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">{queued.length}</span>
    </div>
    {queued.map(order => renderCard(order, "Start Preparing", "preparing", "skillet"))}
    {queued.length === 0 && <div className="text-secondary text-center py-8 font-label-md">No queued orders.</div>}
  </div>

  <div className="flex flex-col gap-4" id="kadhaicol">
    <div className="flex items-center justify-between pb-2 bg-primary/10 px-4 py-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 bg-primary text-on-primary rounded font-label-sm text-label-sm font-bold tracking-widest">[ IN KADHAI ]</span>
        <span className="font-headline-sm text-headline-sm text-on-surface">On Stove</span>
      </div>
      <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">{preparing.length}</span>
    </div>
    {preparing.map(order => renderCard(order, "Ready for Window", "ready", "countertops"))}
    {preparing.length === 0 && <div className="text-secondary text-center py-8 font-label-md">No orders in preparation.</div>}
  </div>

  <div className="flex flex-col gap-4" id="windowcol">
    <div className="flex items-center justify-between pb-2 bg-surface-container-low px-4 py-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 bg-surface-container-lowest text-on-surface rounded font-label-sm text-label-sm font-bold tracking-widest">[ FOR PICKUP ]</span>
        <span className="font-headline-sm text-headline-sm text-on-surface">Window Shelf</span>
      </div>
      <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-on-surface">{ready.length}</span>
    </div>
    {ready.map(order => renderCard(order, "Token Picked Up", "completed", "done_all"))}
    {ready.length === 0 && <div className="text-secondary text-center py-8 font-label-md">No tokens ready for pickup.</div>}
  </div>
</div>
<div className="mt-space-xl p-space-md bg-surface-container-low rounded-lg shadow-sm">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="p-2 bg-primary/10 rounded text-primary">
<span className="material-symbols-outlined text-[22px]">inventory_2</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Active Stock Ledger</span>
<p className="font-headline-sm text-headline-sm text-on-surface">Mid-Shift Prep Reserve</p>
</div>
</div>

<div className="flex flex-wrap items-center gap-6 font-label-md text-label-md">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
<span className="text-on-surface font-semibold">Biryani:</span>
<span className="text-secondary">14 plates remaining</span>
</div>
<span className="text-outline-variant hidden sm:inline">•</span>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="text-on-surface font-semibold">Parathas:</span>
<span className="text-secondary">28 rolled dough balls</span>
</div>
<span className="text-outline-variant hidden sm:inline">•</span>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
<span className="text-on-surface font-semibold">Milk Tea:</span>
<span className="text-secondary">12L in primary samovar</span>
</div>
</div>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 bg-surface-container-lowest hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm transition-colors shadow-sm">
          + Request Stock Refill
        </button>
</div>
</div>
</div>
</div>
</main></div>
    </div>
  );
}