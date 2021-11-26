const Payment = require("../models/Payment");
const User = require("../models/User");
const Product = require("../models/Product");

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist." });
    }

    const { cart, PaymentID, address } = req.body;
    const { _id, name, email } = user;

    await Payment.create({
      user_id: _id,
      name,
      email,
      cart,
      PaymentID,
      address,
    });

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.sold);
    });

    res.json({ msg: "Payment Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const sold = async (id, quantity, oldSold) => {
  await Product.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold });
};

module.exports = { getPayments, createPayment };
