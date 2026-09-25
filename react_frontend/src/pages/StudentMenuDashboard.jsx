import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function StudentMenuDashboard() {
  const { cart, addToCart, getCartTotal, logout, user } = useContext(CartContext);
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="bg-primary text-on-primary py-1 px-4 text-center font-label-sm text-label-sm tracking-widest uppercase">FRESH BATCH SERVED TILL 4 PM — BU CAMPUS</div><div className="h-20 bg-surface/90 backdrop-blur-md px-margin-mobile md:px-margin flex items-center justify-between gap-4"><div className="flex items-center gap-3 shrink-0"><img alt="dhaba * brand logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALSr0DMzBwAgfaXcib1b34FfF8_3-E4J6C_cOSYciJdyadj5Cqi-fBH5ZQ-59iMwjIb4yhe8erCiJ7vpMP6FJofWkNTlTIuyxGnWpsn2Rtuw6k7THKJQdG0Qf41sRKx2t2K8qq0GvzQf5F6FruMRAywBN2Ev17zzVGRU7D0P7MHoPmENRVW7BKRXKB3VjnfuJgRUNXV_pWE0mQ8K7PHT7kT-1s4rPHRsmh0ZbHAsJ6rFJFpueZLx4j"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm text-on-surface leading-none">dhaba *</span><span className="font-label-sm text-label-sm text-primary tracking-wider uppercase mt-0.5">CAMPUS CANTEEN</span></div></div><nav className="hidden lg:flex items-center gap-1 shrink-0" data-active-classes="bg-surface-container-high text-primary font-semibold"><button onClick={() => setFilter("all")} className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide">ALL 5</button><button onClick={() => setFilter("snacks")} className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide">CHAATS 1</button><button onClick={() => setFilter("rice")} className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide">MAINS 1</button><button onClick={() => setFilter("rolls")} className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide">ROLLS 1</button><a className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide" data-path="menu" href="#">CHAI & DRINKS 1</a><Link to="/tracking" className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide">ORDERS</Link></nav><div className="flex items-center gap-4 shrink-0"><Link to="/payment" className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full hover:bg-surface-container transition-colors">
    <span className="font-label-md text-label-md text-on-surface">Tray ({cart.reduce((a,b)=>a+b.qty,0)})</span>
    <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Rs. {getCartTotal()}</span>
  </Link><div className="flex items-center gap-2.5 pl-2"><div className="hidden sm:flex flex-col text-right"><span className="font-body-sm text-body-sm font-medium text-on-surface leading-snug">{user?.name || "Omer S."}</span><button onClick={() => logout()} className="font-label-sm text-label-sm text-primary hover:underline leading-none cursor-pointer text-right uppercase">Logout</button></div><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcMCbdvl7cClX_4aGkS7t6xvnZ-tmpTx3tJslK5jKqzDXfxROWxaveSEZ5nOOQRpH8b1rGENXT9lUwAYEmnD5n31PfxbJyn9ehcAK7OvZCgeVu3rU6YQkYpiW2rmiJtmxvXdW1jvsD-BGKofvu4LHqGdtfS7bBQnqszITDaGyfxkQBiH23w_jTyb9dAWex-PNC-0EV8eY4kbqrZ_vZA9zEGc9I7L-MJB0GVtvvokdq8rOqHboxMqvm"/></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">

<section className="w-full px-margin-mobile md:px-margin pt-space-lg pb-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end pb-space-lg">

<div className="lg:col-span-8 flex flex-col space-y-space-sm">
<div className="flex items-center gap-3">
<span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">[ KITCHEN DISPATCH NO. 14 / LIVE SERVICE ]</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight lowercase">
          fresh, daily, campus fuel.
        </h1>
<p className="font-body-lg text-body-lg text-secondary max-w-2xl">
          Handcrafted authentic desi staples prepared fresh in batches every hour for university students, faculty, and research fellows. Grounded in whole spices and locally milled grains.
        </p>
</div>

<div className="lg:col-span-4 bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
<div className="flex justify-between items-center pb-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
<span>SERVICE STATUS</span>
<span className="text-primary font-semibold">● ACTIVE BATCH</span>
</div>
<div className="space-y-1.5 font-label-md text-label-md text-on-surface">
<div className="flex justify-between">
<span className="text-secondary">OPERATING:</span>
<span>08:30 AM — 06:30 PM</span>
</div>
<div className="flex justify-between">
<span className="text-secondary">LOCATION:</span>
<span>CONCOURSE LEVEL 1</span>
</div>
<div className="flex justify-between">
<span className="text-secondary">AVG WAIT:</span>
<span className="text-primary font-bold">6 — 8 MINS</span>
</div>
</div>
<div className="pt-2 text-right">
<span className="font-label-sm text-label-sm text-secondary tracking-widest">[ PICKUP BAY 1-4 ]</span>
</div>
</div>
</div>

<div className="w-full flex flex-wrap items-center justify-between gap-4 pt-space-md">
<div className="flex flex-wrap items-center gap-2" id="filter-container">
<button onClick={() => setFilter("all")} className={`category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all ${filter === "all" ? "bg-primary text-on-primary" : "bg-surface-container text-secondary hover:text-on-surface"}`}>
          [ All Items (5) ]
        </button>
<button className="category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all bg-surface-container text-secondary hover:text-on-surface" >
          [ Mains &amp; Biryani ]
        </button>
<button className="category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all bg-surface-container text-secondary hover:text-on-surface" >
          [ Paratha Rolls ]
        </button>
<button className="category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all bg-surface-container text-secondary hover:text-on-surface" >
          [ Quick Bites ]
        </button>
<button className="category-btn px-4 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider transition-all bg-surface-container text-secondary hover:text-on-surface" >
          [ Chai &amp; Cold ]
        </button>
</div>

<div className="relative flex items-center min-w-[260px] bg-surface-container-low rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-secondary text-lg mr-2">search</span>
<input className="bg-transparent border-0 outline-none w-full font-headline-sm italic text-body-md text-on-surface placeholder:text-secondary/70 placeholder:italic" id="item-search"  placeholder="search grain, spice, or dish..." type="text"/>
<span className="font-label-sm text-label-sm text-secondary/50 tracking-tighter">ESC</span>
</div>
</div>
</section>

<section className="w-full px-margin-mobile md:px-margin pb-space-xl">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="menu-grid">

<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="rice") && "chicken dum biryani".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="rice">

<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
<span className="bg-surface px-3 py-0.5 rounded-full font-label-sm text-label-sm text-primary tracking-widest uppercase shadow-sm">
            [ BIRYANI ]
          </span>
</div>
<div className="w-full">

<div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative mb-space-md">
<img alt="Chicken Dum Biryani in artisanal ceramic plate with fragrant basmati and raita" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFGpMDcemq-BivVXev2BdRS3J1IWIJPMXX7zJYPIv5NYLaLePD7p1QlNH2MPZpC3il70CajwRmDoCREwU2pLSilkx4tOc2nWEQl5it5CQLaA9hkoi0oq87JDtvI8TDnqMz1mK25TiCd1X4gJFJcTB9EIvpxOLuWmBR9fGeuAbIJe04nHh0Xs1UTWxfyXC1D54gJ8mlV4CzGMliKb8T7aIgzGcGy2j46GotBBcH8-6K6ItG5inl_gTU"/>
<div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-primary font-medium tracking-wide">
              BATCH #04 • WARM
            </div>
</div>

<div className="flex flex-col space-y-1">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">DESI MAINS • POT DUM</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-normal group-hover:text-primary transition-colors">
              chicken dum biryani
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Long-grain aged basmati rice layered with succulent marinated chicken leg, spiced baby potato, mint raita, and golden fried onions.
            </p>
</div>
</div>

<div className="w-full pt-space-md mt-space-md bg-transparent">
<div className="flex items-center justify-between font-label-sm text-label-sm text-secondary mb-2 tracking-wider">
<span>PORTION: 420G</span>
<span>680 KCAL</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase">PRICE</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rs. 320</span>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors" onClick={() => addToCart({id:1, name:"chicken dum biryani", price:320, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFGpMDcemq-BivVXev2BdRS3J1IWIJPMXX7zJYPIv5NYLaLePD7p1QlNH2MPZpC3il70CajwRmDoCREwU2pLSilkx4tOc2nWEQl5it5CQLaA9hkoi0oq87JDtvI8TDnqMz1mK25TiCd1X4gJFJcTB9EIvpxOLuWmBR9fGeuAbIJe04nHh0Xs1UTWxfyXC1D54gJ8mlV4CzGMliKb8T7aIgzGcGy2j46GotBBcH8-6K6ItG5inl_gTU"})}>
<span className="material-symbols-outlined text-sm">add</span>
<span>[ Add to Tray ]</span>
</button>
</div>
</div>
</article>

<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="rolls") && "chicken chutney roll".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="rolls">

<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
<span className="bg-surface px-3 py-0.5 rounded-full font-label-sm text-label-sm text-primary tracking-widest uppercase shadow-sm">
            [ KARACHI STREET ]
          </span>
</div>
<div className="w-full">

<div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative mb-space-md">
<img alt="Chicken Chutney Roll wrapped neatly in brown culinary paper" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuHem-5T5MV3puFsh4bSVuaArKyywrxJf55bG1U3Lz3uDhYIKoTlFis0jJ_Nk0_OWAg0Kv0B8v_L1DZM7rEi0xGZDpa7CHA29g0SMX3Dsrd0nXifssR0B3EbfaUv5Li8sNy6YtQpPa7V5EHQoGOGfurEdqmqpthyaEvXcbYZ8JQnj8V2yM1NInBt5VNjABNPpluZZqhXac7bAmd27s3c8o8ZIQiKY3_sWC-h-Ya9kdeA6kzZZEuwi4"/>
<div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-secondary tracking-wide">
              SKILLET TO ORDER
            </div>
</div>

<div className="flex flex-col space-y-1">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">TAWA FLAKY ROLL</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-normal group-hover:text-primary transition-colors">
              chicken chutney roll
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Charcoal-grilled boti cubes tossed in garlic vinegar onions, smothered in spicy mint coriander chutney, and wrapped in a crisp pan-crisped paratha.
            </p>
</div>
</div>

<div className="w-full pt-space-md mt-space-md bg-transparent">
<div className="flex items-center justify-between font-label-sm text-label-sm text-secondary mb-2 tracking-wider">
<span>PORTION: 1 ROLL</span>
<span>410 KCAL</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase">PRICE</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rs. 240</span>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors" onClick={() => addToCart({id:2, name:"chicken chutney roll", price:240, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuHem-5T5MV3puFsh4bSVuaArKyywrxJf55bG1U3Lz3uDhYIKoTlFis0jJ_Nk0_OWAg0Kv0B8v_L1DZM7rEi0xGZDpa7CHA29g0SMX3Dsrd0nXifssR0B3EbfaUv5Li8sNy6YtQpPa7V5EHQoGOGfurEdqmqpthyaEvXcbYZ8JQnj8V2yM1NInBt5VNjABNPpluZZqhXac7bAmd27s3c8o8ZIQiKY3_sWC-h-Ya9kdeA6kzZZEuwi4"})}>
<span className="material-symbols-outlined text-sm">add</span>
<span>[ Add to Tray ]</span>
</button>
</div>
</div>
</article>

<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="snacks") && "aloo samosa duo".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="snacks">

<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
<span className="bg-surface px-3 py-0.5 rounded-full font-label-sm text-label-sm text-primary tracking-widest uppercase shadow-sm">
            [ SNACK ]
          </span>
</div>
<div className="w-full">

<div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative mb-space-md">
<img alt="Golden crispy triangular samosa duo with earthen pot of tamarind dip" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHHFHGahAbTNa3i6Am15CDTlbiB7JrbiapGfj1C2YXbGGWfU5oUH5IxlGAi6kJC1SPwz2a6ExgUQcFMWW57tE7kStCGxgm4uo9Ft-7LTtZT-INSWyzq9WMYFxpduTzxubigI7ydkzLKkrd4DtrskE83re1wQVU0WQk-1J0i9HXLfgXnVKqrsj1xc8L8AVZ_RrpFufQ8xYFUlAVyO7G7Ziz2sgVyBZVuUPyS5XSsqBdpEdhbWC9r1pI"/>
<div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-secondary tracking-wide">
              100% VEG
            </div>
</div>

<div className="flex flex-col space-y-1">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">CRISP PASTRY • FRESH OIL</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-normal group-hover:text-primary transition-colors">
              aloo samosa duo
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Flaky pastry crust stuffed with cumin-tempered crushed potatoes, coriander seeds, and garden peas. Served with tangy hand-pulped tamarind imli dip.
            </p>
</div>
</div>

<div className="w-full pt-space-md mt-space-md bg-transparent">
<div className="flex items-center justify-between font-label-sm text-label-sm text-secondary mb-2 tracking-wider">
<span>PORTION: 2 PIECES</span>
<span>290 KCAL</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase">PRICE</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rs. 80</span>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors" onClick={() => addToCart({id:3, name:"aloo samosa duo", price:80, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHHFHGahAbTNa3i6Am15CDTlbiB7JrbiapGfj1C2YXbGGWfU5oUH5IxlGAi6kJC1SPwz2a6ExgUQcFMWW57tE7kStCGxgm4uo9Ft-7LTtZT-INSWyzq9WMYFxpduTzxubigI7ydkzLKkrd4DtrskE83re1wQVU0WQk-1J0i9HXLfgXnVKqrsj1xc8L8AVZ_RrpFufQ8xYFUlAVyO7G7Ziz2sgVyBZVuUPyS5XSsqBdpEdhbWC9r1pI"})}>
<span className="material-symbols-outlined text-sm">add</span>
<span>[ Add to Tray ]</span>
</button>
</div>
</div>
</article>

<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="brews") && "karak kadak chai".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="brews">

<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
<span className="bg-surface px-3 py-0.5 rounded-full font-label-sm text-label-sm text-primary tracking-widest uppercase shadow-sm">
            [ DESI BREW ]
          </span>
</div>
<div className="w-full">

<div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative mb-space-md">
<img alt="Steaming hot kadak chai served in unglazed earthen matka clay cup" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWiSlHcTe738wLlNN85-T3SooFNrsCBhXWMUbbfjrJ1-fbdOgUEq7ugcdj5zwyKeh753eW7XeRfCflM9eIIdznFDbyCYWaqcmlL30SAdSV0WDIqjFYHPj43596pTtn7vBYHdzQCdN3yAg0FKOwz6C2q13iHrbiTsEH_HU6GvsYzEFYTrHpePRFCbnCgmKziH5UCXGXfSzOo2CUMkNJJhF48dW8JpHNiXg_FrqaHLjQwmhBIf606bG"/>
<div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-primary font-medium tracking-wide">
              SLOW SIMMERED
            </div>
</div>

<div className="flex flex-col space-y-1">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">KULHAD CLAY CUP • EVER-BOILING</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-normal group-hover:text-primary transition-colors">
              karak kadak chai
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Strong Kenya CTC blend boiled with green cardamom pods and thick whole milk, poured high from copper kettles into unglazed terracotta cups.
            </p>
</div>
</div>

<div className="w-full pt-space-md mt-space-md bg-transparent">
<div className="flex items-center justify-between font-label-sm text-label-sm text-secondary mb-2 tracking-wider">
<span>CUP: 180 ML</span>
<span>CARDAMOM SPICED</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase">PRICE</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rs. 70</span>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors" onClick={() => addToCart({id:4, name:"karak kadak chai", price:70, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBWiSlHcTe738wLlNN85-T3SooFNrsCBhXWMUbbfjrJ1-fbdOgUEq7ugcdj5zwyKeh753eW7XeRfCflM9eIIdznFDbyCYWaqcmlL30SAdSV0WDIqjFYHPj43596pTtn7vBYHdzQCdN3yAg0FKOwz6C2q13iHrbiTsEH_HU6GvsYzEFYTrHpePRFCbnCgmKziH5UCXGXfSzOo2CUMkNJJhF48dW8JpHNiXg_FrqaHLjQwmhBIf606bG"})}>
<span className="material-symbols-outlined text-sm">add</span>
<span>[ Add to Tray ]</span>
</button>
</div>
</div>
</article>

<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="snacks") && "daal anda bun kabab".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="snacks">

<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
<span className="bg-surface px-3 py-0.5 rounded-full font-label-sm text-label-sm text-primary tracking-widest uppercase shadow-sm">
            [ QUICK MEAL ]
          </span>
</div>
<div className="w-full">

<div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative mb-space-md">
<img alt="Juicy cross-section of Daal Anda Bun Kabab with whipped egg and onion salad" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsl60KmOed7MrOSc5jLmWCp9tpToIrXUP8qgXi07AYWALQ5M1yPCstSBUCE6cuTbSupEpEMs2dE-AsFZWkZRJ1jteU-f_uCxIWEg8TmnOJsG1XdE_L9xMM0sVzSYVGfPiYZz_VORclXIfcMByJgLJ_r7p7OOODo-OdZgdRYTW14aC_GWJgW7xKqd7mKiT-g53VQnAq6oar-9CY1izi733isSPdKfhzdYC4CagbFvncjqIPtfELe8V0"/>
<div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-secondary tracking-wide">
              CAMPUS CLASSIC
            </div>
</div>

<div className="flex flex-col space-y-1">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">TOASTED SWEET BUN</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-normal group-hover:text-primary transition-colors">
              daal anda bun kabab
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Spiced chana daal patty dipped in whipped fluffy egg, seared on buttered iron flat-top with red onion rings and zesty zeera-mint chutney.
            </p>
</div>
</div>

<div className="w-full pt-space-md mt-space-md bg-transparent">
<div className="flex items-center justify-between font-label-sm text-label-sm text-secondary mb-2 tracking-wider">
<span>PORTION: 1 BURGER</span>
<span>340 KCAL</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase">PRICE</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rs. 160</span>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors" onClick={() => addToCart({id:5, name:"daal anda bun kabab", price:160, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsl60KmOed7MrOSc5jLmWCp9tpToIrXUP8qgXi07AYWALQ5M1yPCstSBUCE6cuTbSupEpEMs2dE-AsFZWkZRJ1jteU-f_uCxIWEg8TmnOJsG1XdE_L9xMM0sVzSYVGfPiYZz_VORclXIfcMByJgLJ_r7p7OOODo-OdZgdRYTW14aC_GWJgW7xKqd7mKiT-g53VQnAq6oar-9CY1izi733isSPdKfhzdYC4CagbFvncjqIPtfELe8V0"})}>
<span className="material-symbols-outlined text-sm">add</span>
<span>[ Add to Tray ]</span>
</button>
</div>
</div>
</article>

<article className={"menu-card group relative flex-col justify-between bg-surface-container-low rounded-xl p-space-md hover:bg-secondary-container/40 transition-colors " + ((filter==="all" || filter==="brews") && "karak kadak chai".includes(search.toLowerCase()) ? "flex" : "hidden")} data-category="brews">

<div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
<span className="bg-surface px-3 py-0.5 rounded-full font-label-sm text-label-sm text-primary tracking-widest uppercase shadow-sm">
            [ REFRESH ]
          </span>
</div>
<div className="w-full">

<div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container relative mb-space-md">
<img alt="Tall glass of fizzy green Mint Margarita soda with lemon wheel and mint leaves" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-s0MplNby9k7hb0GIrY59c5Y-N1HjZ6Gvrqz-7_daW2lc3LWG6wH8XYRbyA3IiLbpp12TFnIExMKIlPdgbMtdip8CZBy33hQ8egoIzfCBzlMhS0iZm3cV-0bfoPhKnsi6oRIGqDwZvC96IyJY6rKhzarJq1cUgBApZOKz_eOLPxf_SDpGAaw6K7-PF-Qm0QKquckVR7EdzLHOudi713_FnA-g-cp0a9ro3DdYuwYf6QARP6NmhRMR"/>
<div className="absolute bottom-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-secondary tracking-wide">
              ICE COLD
            </div>
</div>

<div className="flex flex-col space-y-1">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">CRUSHED MINT • KALA NAMAK</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-normal group-hover:text-primary transition-colors">
              mint margarita soda
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Field-harvested garden mint leaves crushed with lime juice, raw cane syrup, and Himalayan black salt, charged with sparkling club soda.
            </p>
</div>
</div>

<div className="w-full pt-space-md mt-space-md bg-transparent">
<div className="flex items-center justify-between font-label-sm text-label-sm text-secondary mb-2 tracking-wider">
<span>POUR: 330 ML</span>
<span>RESTORE SODIUM</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase">PRICE</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Rs. 180</span>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md tracking-wider uppercase transition-colors" >
<span className="material-symbols-outlined text-sm">add</span>
<span>[ Add to Tray ]</span>
</button>
</div>
</div>
</article>
</div>
</section>

<section className="w-full px-margin-mobile md:px-margin pb-space-lg">
<div className="bg-surface-container rounded-xl p-space-lg grid grid-cols-1 md:grid-cols-3 gap-gutter items-center">
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary text-3xl shrink-0">verified</span>
<div className="flex flex-col">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Whole Grain Rotis</h3>
<p className="font-body-sm text-body-sm text-secondary mt-1">Ground stone-milled atta, never refined maida or hydrogenated fats.</p>
</div>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary text-3xl shrink-0">hourglass_top</span>
<div className="flex flex-col">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Hourly Fresh Batches</h3>
<p className="font-body-sm text-body-sm text-secondary mt-1">Biryani cauldrons cracked open on the hour every hour between 12-4 PM.</p>
</div>
</div>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-primary text-3xl shrink-0">account_balance_wallet</span>
<div className="flex flex-col">
<h3 className="font-headline-sm text-headline-sm text-on-surface">One-Tap Campus NFC</h3>
<p className="font-body-sm text-body-sm text-secondary mt-1">Tap your student RFID badge at pickup counter 1-4 for contactless deduction.</p>
</div>
</div>
</div>
</section>


</div></main><footer className="w-full bg-surface-container-low mt-space-xl py-space-xl"><div className="w-full px-margin-mobile md:px-margin"><div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-lg pb-space-lg"><div className="space-y-1"><p className="font-headline-sm text-headline-sm text-on-surface">dhaba * canteen</p><p className="font-body-sm text-body-sm text-on-surface-variant">Freshly sourced, restorative university canteen kitchen.</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">OPERATING HOURS</p><p className="font-body-sm text-body-sm text-on-surface-variant">Mon - Sat: 08:30 - 18:30</p><p className="font-body-sm text-body-sm text-secondary">Sunday: Closed for deep prep</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">PICKUP POINTS</p><p className="font-body-sm text-body-sm text-on-surface-variant">Counters 1-4 • Main Concourse</p><p className="font-body-sm text-body-sm text-secondary">Express Chai Bar: Bay 2</p></div><div className="space-y-1"><p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">CAMPUS WALLET</p><p className="font-label-md text-label-md text-on-surface font-bold">Wallet: Rs. 2,450</p><p className="font-body-sm text-body-sm text-on-surface-variant">Auto-reload active (Campus ID)</p></div></div><div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-space-md"><p className="font-label-sm text-label-sm text-secondary tracking-wider">[ 100% LOCALLY MILLED GRAINS • COLD-PRESSED MUSTARD OIL • HALAL &amp; JAIN PROTOCOLS ]</p><p className="font-label-sm text-label-sm text-secondary">© 2024 BU CAMPUS SERVICES • DHABA RECORD NO. 448</p></div></div></footer>
    </div>
  );
}