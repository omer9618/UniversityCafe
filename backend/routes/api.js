const express = require('express');
const router = express.Router();

// For demonstration purposes, we'll use an in-memory array 
// until we connect the official MongoDB Atlas URI
let orders = [];

// [GET] Fetch all orders (For the Vendor Dashboard)
router.get('/orders', (req, res) => {
  res.json(orders);
});

// [POST] Place a new order (For the Student Dashboard)
router.post('/orders', (req, res) => {
  const newOrder = {
    _id: Math.random().toString(36).substr(2, 9),
    user: req.body.user || req.body.studentName || 'Student',
    items: req.body.items || [],
    totalAmount: req.body.totalAmount || 0,
    status: 'queued',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  
  // Real-time Magic: Broadcast the new order to the Vendor instantly!
  req.io.emit('new_order', newOrder);
  
  res.status(201).json(newOrder);
});

// [PUT] Update order status (Vendor moving order to Preparing/Ready)
router.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const orderIndex = orders.findIndex(o => o._id === id);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    
    // Broadcast status change so Student Tracking screen updates instantly
    req.io.emit('order_updated', orders[orderIndex]);
    
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Sample User Database
const users = [
  {
    id: '02-134211-042',
    email: 'student@bahria.edu.pk',
    password: 'password123',
    role: 'student',
    name: 'Omer S.'
  },
  {
    id: 'V-001',
    email: 'vendor@bahria.edu.pk',
    password: 'password123',
    role: 'vendor',
    name: 'Dhaba Kitchen'
  }
];

// [POST] Login Authentication
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
