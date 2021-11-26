const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/Category");

router
  .route("/category")
  .get(getCategories)
  .post(auth, authAdmin, createCategory);

router
  .route("/category/:id")
  .delete(auth, authAdmin, deleteCategory)
  .put(auth, authAdmin, updateCategory);

module.exports = router;
