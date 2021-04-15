const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

module.exports.getAllProducts = asyncHandler(async (req,res,next) => {
    const allProducts = await Product.find({});
    res.json(allProducts);
});

module.exports.getProductById = asyncHandler(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404);
        return next(new Error('Product with ID not found!'))
    }
});