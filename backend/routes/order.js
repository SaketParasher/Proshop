const router = require('express').Router();
const { addOrderItems, getOrderById } = require('../controllers/order');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, addOrderItems);
router.get('/:id', verifyToken, getOrderById);

module.exports = router;

