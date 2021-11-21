const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const {
  register,
  refreshToken,
  login,
  logout,
  getUserInfor,
  getAllUserInfor,
  addCart,
  history,
} = require("../controllers/User");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", refreshToken);
router.get("/infor", auth, getUserInfor);
router.get("/all_infor", auth, authAdmin, getAllUserInfor);
router.patch("/addcart", auth, addCart);
router.get("/history", auth, history);

module.exports = router;
