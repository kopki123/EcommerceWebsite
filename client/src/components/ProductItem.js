import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import axios from "axios";
import BtnRender from "./BtnRender";

const ProductItem = ({ product, isAdmin }) => {
  let navigate = useNavigate();
  const value = useGlobalContext();
  const [products, setProducts] = value.ProductsAPI.products;
  const [token] = value.token;

  const deleteProduct = async () => {
    try {
      await axios.post(
        "/api/destroy",
        { public_id: product.images.public_id },
        {
          headers: { authorization: token },
        }
      );

      await axios.delete(`/api/products/${product._id}`, {
        headers: { authorization: token },
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {}
  };

  const handleCheck = () => {
    let newProduct = products.map((item) => {
      if (item._id === product._id) {
        return { ...item, checked: !item.checked };
      }

      return item;
    });

    setProducts(newProduct);
  };

  return (
    <div key={product.product_id} className="product-item">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={handleCheck}
        />
      )}

      <img
        src={product.images.url}
        alt=""
        onClick={() => navigate(`/product/${product.product_id}`)}
      />
      <div className="product_info">
        <h3>
          <Link to={`/product/${product.product_id}`}>{product.title}</Link>
        </h3>
        <span>NT.{product.price}</span>
        <BtnRender product={product} deleteProduct={deleteProduct} />
      </div>
    </div>
  );
};

export default ProductItem;
