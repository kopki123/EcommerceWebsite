const Product = require("../models/Product");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "price", "gte", "lte"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  price() {
    const gte = this.queryString.gte;
    const lte = this.queryString.lte;

    this.query = this.query.find({
      price: { $gte: gte || 0, $lte: lte || 999999999999999 },
    });

    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Product.find(), req.query)
      .filtering()
      .sorting()
      .paginating()
      .price();
    const products = await features.query;

    res.json({
      status: "success",
      result: products.length,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_id, title, price, description, content, images, category } =
      req.body;

    if (!images) {
      return res.status(400).json({ msg: "No Image Selected" });
    }

    const product = await Product.findOne({ product_id });
    if (product) {
      return res.status(400).json({ msg: "This product already exists." });
    }

    await Product.create({
      product_id,
      title,
      price,
      description,
      content,
      images,
      category,
    });

    res.json({ msg: "Create a product" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a product" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, price, description, content, images, category } = req.body;

    if (!images) {
      return res.status(400).json({ msg: "No Image Upload" });
    }

    await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        price,
        description,
        content,
        images,
        category,
      }
    );

    res.json({ msg: "Update a product" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { getProducts, createProduct, deleteProduct, updateProduct };
