const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct
} = require("../controllers/productController");

// const {
//   verifyToken,
//   verifyAdmin
// } = require("../middleware/authMiddleware");

// 🔓 PUBLIC
router.get("/", getProducts);
router.get("/:id", getProduct);

// 🔒 ADMIN ONLY
router.post('/', verifyToken, verifyAdmin, createProduct);

router.put('/:id', verifyToken, verifyAdmin, updateProduct);

router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;