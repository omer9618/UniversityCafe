const fs = require('fs');

// 1. Add Auth to CartContext
let ctx = fs.readFileSync('react_frontend/src/context/CartContext.jsx', 'utf8');
if (!ctx.includes('const [user, setUser]')) {
  ctx = ctx.replace(
    'const [cart, setCart] = useState([]);',
    `const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dhaba_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('dhaba_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('dhaba_user');
  };`
  );
  ctx = ctx.replace(
    'submitOrder, activeOrder, setActiveOrder',
    'submitOrder, activeOrder, setActiveOrder, user, login, logout'
  );
  fs.writeFileSync('react_frontend/src/context/CartContext.jsx', ctx);
}

// 2. Fix CampusAuthentication.jsx
let auth = fs.readFileSync('react_frontend/src/pages/CampusAuthentication.jsx', 'utf8');
if (!auth.includes('const { login, user }')) {
  // Inject context and useEffect
  auth = auth.replace(
    `import React from 'react';\nimport { useNavigate } from 'react-router-dom';\nimport axios from 'axios';`,
    `import React, { useContext, useEffect } from 'react';\nimport { useNavigate } from 'react-router-dom';\nimport axios from 'axios';\nimport { CartContext } from '../context/CartContext';`
  );
  auth = auth.replace(
    `export default function CampusAuthentication() {\n  const navigate = useNavigate();`,
    `export default function CampusAuthentication() {\n  const navigate = useNavigate();\n  const { login, user } = useContext(CartContext);\n  useEffect(() => {\n    if (user) {\n      if (user.role === 'vendor') navigate('/vendor');\n      else navigate('/menu');\n    }\n  }, [user, navigate]);`
  );
  // Update handleLogin to call login()
  auth = auth.replace(
    `if(data.user.role === 'vendor') { navigate('/vendor'); } else { navigate('/menu'); }`,
    `login(data.user);\n      if(data.user.role === 'vendor') { navigate('/vendor'); } else { navigate('/menu'); }`
  );
  
  // Wire up Register button
  auth = auth.replace(
    `<button className="flex-1 py-1.5 text-center font-label-sm text-label-sm uppercase rounded text-secondary hover:text-on-surface transition-all" id="tab-register"  type="button">`,
    `<button onClick={() => alert("Registration is currently managed via the University Central Portal.")} className="flex-1 py-1.5 text-center font-label-sm text-label-sm uppercase rounded text-secondary hover:text-on-surface transition-all" id="tab-register" type="button">`
  );
  fs.writeFileSync('react_frontend/src/pages/CampusAuthentication.jsx', auth);
}

// 3. Add Protected Routes to App.jsx
let app = fs.readFileSync('react_frontend/src/App.jsx', 'utf8');
if (!app.includes('ProtectedRoute')) {
  app = app.replace(
    `import { CartProvider } from './context/CartContext';`,
    `import { CartProvider, CartContext } from './context/CartContext';\nimport { useContext } from 'react';\n\nconst ProtectedRoute = ({ children, role }) => {\n  const { user } = useContext(CartContext);\n  if (!user) return <CampusAuthentication />;\n  if (role && user.role !== role) return <CampusAuthentication />;\n  return children;\n};`
  );
  app = app.replace(
    `<Route path="/menu" element={<StudentMenuDashboard />} />`,
    `<Route path="/menu" element={<ProtectedRoute><StudentMenuDashboard /></ProtectedRoute>} />`
  );
  app = app.replace(
    `<Route path="/payment" element={<TokenPaymentTrayDrawer />} />`,
    `<Route path="/payment" element={<ProtectedRoute><TokenPaymentTrayDrawer /></ProtectedRoute>} />`
  );
  app = app.replace(
    `<Route path="/tracking" element={<LiveTokenTracker />} />`,
    `<Route path="/tracking" element={<ProtectedRoute><LiveTokenTracker /></ProtectedRoute>} />`
  );
  app = app.replace(
    `<Route path="/vendor" element={<VendorOrderPipeline />} />`,
    `<Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorOrderPipeline /></ProtectedRoute>} />`
  );
  fs.writeFileSync('react_frontend/src/App.jsx', app);
}

// 4. Add Logout button to Navbars
function addLogout(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if(!content.includes('logout()')) {
    // Inject CartContext if missing
    if(!content.includes('const {')) {
       // Only if context is not used at all
       content = content.replace(
         `export default function VendorOrderPipeline() {\n  const [orders, setOrders] = useState([]);`,
         `import { CartContext } from '../context/CartContext';\nexport default function VendorOrderPipeline() {\n  const { logout } = useContext(CartContext);\n  const [orders, setOrders] = useState([]);`
       );
    } else {
      // Inject logout into context destructuring
      if(content.includes('const { ') && !content.includes('logout')) {
        content = content.replace(/const { ([^}]*) } = useContext\(CartContext\);/, 'const { $1, logout, user } = useContext(CartContext);');
      }
    }
    
    // Add logout button near the profile picture.
    content = content.replace(
      /<div className="hidden sm:flex flex-col text-right">([\s\S]*?)<\/div><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="([^"]*)"\/>/,
      `<div className="hidden sm:flex flex-col text-right"><span className="font-body-sm text-body-sm font-medium text-on-surface leading-snug">{user?.name || "Omer S."}</span><button onClick={() => logout()} className="font-label-sm text-label-sm text-primary hover:underline leading-none cursor-pointer text-right uppercase">Logout</button></div><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="$2"/>`
    );
    
    // For VendorOrderPipeline (which doesn't have the same profile block)
    if(filePath.includes('VendorOrderPipeline')) {
      content = content.replace(
        /<span className="font-label-sm text-label-sm bg-primary\/10 text-primary px-2 py-0.5 rounded font-medium">LIVE<\/span><\/div>/,
        `<span className="font-label-sm text-label-sm bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">LIVE</span></div><button onClick={() => logout()} className="ml-4 font-label-sm text-label-sm text-primary hover:underline uppercase tracking-wider">Logout</button>`
      );
    }
    
    fs.writeFileSync(filePath, content);
  }
}

addLogout('react_frontend/src/pages/StudentMenuDashboard.jsx');
addLogout('react_frontend/src/pages/TokenPaymentTrayDrawer.jsx');
addLogout('react_frontend/src/pages/LiveTokenTracker.jsx');
addLogout('react_frontend/src/pages/VendorOrderPipeline.jsx');

console.log('Fixed Routing, added Protected Routes, and injected Logout buttons!');
