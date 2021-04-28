const asyncHandler = require('express-async-handler');
const Order = require('../models/order');

module.exports.addOrderItems = asyncHandler(async (req,res,next) => {
    const { 
        orderItems, shippingAddress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice  
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        return next(new Error('No Order Items Found!'));
    }

    const order = new Order({
        user:req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
})

module.exports.getOrderById = asyncHandler(async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new Error("No order found with this ID"));
    }
    
    // if token provided is of different user and user id in order is different then don't return order
    // unauthorized request
    if(req.user._id.toString() != order.user._id.toString()){
        return next(new Error("No Order for user !!"));
    }
    res.json(order);
})
