const Category = require("../models/Category");
const Product = require("../models/Product");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({ msg: "The category already exist." });
    }

    await Category.create({ name });
    res.json({ msg: "create a new category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const products = await Product.findOne({ category: req.params.id });
    if (products) {
      return res
        .status(400)
        .json({ msg: "Please delete all products with a relationship." });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await Category.findOneAndUpdate({ _id: req.params.id }, { name });
    res.json({ msg: "Updated a category" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
