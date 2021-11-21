const router = require("express").Router();
const { getPayments, createPayment } = require("../controllers/Payment");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, getPayments)
  .post(auth, authAdmin, createPayment);

module.exports = router;
