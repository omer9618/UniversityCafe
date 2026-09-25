const fs = require('fs');
let code = fs.readFileSync('react_frontend/src/pages/LiveTokenTracker.jsx', 'utf8');

code = code.replace("import { Link } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';");

let splitPointTop = code.indexOf('<div className="w-full px-margin-mobile md:px-margin py-space-lg md:py-space-xl flex flex-col items-center">');
let splitPointBottom = code.indexOf('</main><footer');

let layoutTop = code.substring(0, splitPointTop);
let layoutBottom = code.substring(splitPointBottom);

let dynamicMain = `
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
`;

fs.writeFileSync('react_frontend/src/pages/LiveTokenTracker.jsx', layoutTop + dynamicMain + layoutBottom);
console.log('Live Tracker made dynamic!');
