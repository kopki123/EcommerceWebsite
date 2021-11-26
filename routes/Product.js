const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/Product");

router.route("/products").get(getProducts).post(auth, authAdmin, createProduct);

router
  .route("/products/:id")
  .delete(auth, authAdmin, deleteProduct)
  .put(auth, authAdmin, updateProduct);

module.exports = router;
