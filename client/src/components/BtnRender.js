import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const BtnRender = ({ product, deleteProduct }) => {
  let navigate = useNavigate();
  const value = useGlobalContext();
  const [isAdmin] = value.UserAPI.isAdmin;
  const addCart = value.UserAPI.addCart;

  return (
    <div className="row-btn">
      {isAdmin ? (
        <>
          <Link to="#" onClick={deleteProduct} className="first-btn">
            刪除
          </Link>
          <Link to={`/edit_product/${product._id}`}>編輯</Link>
        </>
      ) : (
        <>
          <button className="first-btn" onClick={() => addCart(product)}>
            購買
          </button>
          <button onClick={() => navigate(`/product/${product.product_id}`)}>
            查看更多
          </button>
        </>
      )}
    </div>
  );
};

export default BtnRender;
