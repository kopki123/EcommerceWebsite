import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

const CreateProduct = () => {
  const { id } = useParams();
  const value = useGlobalContext();
  const [categories] = value.CategoryAPI.categories;
  const [products] = value.ProductsAPI.products;
  const [isAdmin] = value.UserAPI.isAdmin;
  const [token] = value.token;
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value, err: "", success: "" });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("You are not an admin");
      }
      const file = e.target.files[0];
      if (!file) {
        return alert("File not exist.");
      }

      if (file.size > 1024 * 1024) {
        return alert("Size too large");
      }

      if (file.type !== "image/jpeg" && file.typed !== "image/png") {
        return alert("File format is incorrect");
      }

      let data = new FormData();
      data.append("file", file);
      const response = await axios.post("/api/upload", data, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: token,
        },
      });
      setImages(response.data);
    } catch (error) {
      // alert(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) {
        return alert("You are not an admin");
      }

      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        { headers: { authorization: token } }
      );

      setImages(false);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("You are not an admin");
      }

      if (!images) {
        return alert("No Image Upload");
      }

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images: images },
          { headers: { authorization: token } }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images: images },
          { headers: { authorization: token } }
        );
      }

      setImages(false);
      setProduct(initialState);
      window.location.replace("/");
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [id, products]);

  const styleUpload = { display: images ? "block" : "none" };

  return (
    <div className="createproduct-page">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        <div id="file_img" style={styleUpload}>
          <img src={images ? images.url : ""} alt="" />
          <span onClick={handleDestroy}>X</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            rows="5"
            name="description"
            id="description"
            required
            value={product.description}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            rows="5"
            name="content"
            id="content"
            required
            value={product.content}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories</label>
          <select name="category" onChange={handleChangeInput}>
            <option>Please select a category</option>
            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
