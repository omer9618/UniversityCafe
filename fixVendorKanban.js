const fs = require('fs');
let code = fs.readFileSync('react_frontend/src/pages/VendorOrderPipeline.jsx', 'utf8');

let splitPoint = code.indexOf('<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-space-lg">');
let layoutTop = code.substring(0, splitPoint);

let bottomSplitPoint = code.indexOf('<div className="mt-space-xl p-space-md bg-surface-container-low rounded-lg shadow-sm">');
let layoutBottom = code.substring(bottomSplitPoint);

layoutTop = layoutTop.replace(
  'return (',
  `const queued = orders.filter(o => o.status === 'queued');
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
            <p className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">Student ID: <span className="text-secondary font-label-sm">{order.user ? order.user.substring(0,8) : 'Walk-in'}</span></p>
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

  return (`
);

let newGrid = `
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
`;

fs.writeFileSync('react_frontend/src/pages/VendorOrderPipeline.jsx', layoutTop + newGrid + layoutBottom);
console.log('Vendor Kanban fully integrated!');
