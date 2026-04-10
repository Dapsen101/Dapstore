const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// CREATE ORDER (checkout)
router.post('/', async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const order = new Order({
      userId,
      items,
      total
    });

    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error('ORDER ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET USER ORDERS
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error('FETCH ORDERS ERROR:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;