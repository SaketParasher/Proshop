const router = require("express").Router();
const { getAllProducts, getProductById } = require('../controllers/product');

/**
 * @description get all products
 * @route /api/product
 * @access public
 */
router.get("/",getAllProducts);

/**
 * @description get product by id
 * @route /api/product/:id
 * @access public
 */
router.get("/:id",getProductById);


module.exports = router;