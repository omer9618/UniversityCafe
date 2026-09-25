import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampusAuthentication from './pages/CampusAuthentication';
import StudentMenuDashboard from './pages/StudentMenuDashboard';
import VendorOrderPipeline from './pages/VendorOrderPipeline';
import LiveTokenTracker from './pages/LiveTokenTracker';
import TokenPaymentTrayDrawer from './pages/TokenPaymentTrayDrawer';

import { CartProvider, CartContext } from './context/CartContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(CartContext);
  if (!user) return <CampusAuthentication />;
  if (role && user.role !== role) return <CampusAuthentication />;
  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CampusAuthentication />} />
          <Route path="/menu" element={<ProtectedRoute><StudentMenuDashboard /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><TokenPaymentTrayDrawer /></ProtectedRoute>} />
          <Route path="/tracking" element={<ProtectedRoute><LiveTokenTracker /></ProtectedRoute>} />
          <Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorOrderPipeline /></ProtectedRoute>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
