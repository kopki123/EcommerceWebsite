const User = require("../models/User");
const Payment = require("../models/Payment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "The email already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: passwordHash });

    const accesstoken = createAccessToken({ id: newUser._id });
    const refreshtoken = createRefreshToken({ id: newUser._id });

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.json({ msg: "註冊成功", accesstoken: `Bearer ${accesstoken}` });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "用戶不存在" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "密碼錯誤" });
    }

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.json({ msg: "登入成功", accesstoken: `Bearer ${accesstoken}` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/user/refresh_token" });
    res.json({ msg: "Logged out" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res.status(400).json({ msg: "Please Login or Register" });
    }
    jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Please Login or Register" });
      }
      const accesstoken = createAccessToken({ id: user.id });
      res.json({ accesstoken: `Bearer ${accesstoken}` });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUserInfor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist." });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllUserInfor = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const addCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist." });
    }

    await User.findOneAndUpdate({ _id: req.user.id }, { cart: req.body.cart });
    res.json({ msg: "Update success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const history = async (req, res) => {
  try {
    const history = await Payment.find({ _id: req.user.id });
    res.json(history);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  register,
  refreshToken,
  login,
  logout,
  getUserInfor,
  getAllUserInfor,
  addCart,
  history,
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
