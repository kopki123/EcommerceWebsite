import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import ProductItem from "../components/ProductItem";

const Product = () => {
  const { product_id } = useParams();
  const value = useGlobalContext();
  const [isAdmin] = value.UserAPI.isAdmin;
  const [products] = value.ProductsAPI.products;
  const addCart = value.UserAPI.addCart;
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [product_id]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.product_id === product_id) {
        setProduct(product);
        setImage(product.images.url);
      }
    });
  }, [products, product_id]);

  const { title, price, description, content, sold } = product;

  if (!product) {
    return null;
  }

  return (
    <div className="product-page">
      <main>
        <img src={image} alt={title} />
        <div className="product-detail">
          <h1>{title}</h1>
          <span>NT.{price}</span>
          <p>商品描述 : {description}</p>
          <p>商品內容 : {content}</p>
          <p>已售出 : {sold}</p>
          <button onClick={() => addCart(product)} className="btn-buy">
            立即購買
          </button>
        </div>
      </main>

      <div className="related-section">
        <h2>相關商品</h2>
        <div className="related-products">
          {products.map((related_product) => {
            return related_product.category === product.category ? (
              <ProductItem
                key={related_product.product_id}
                product={related_product}
                isAdmin={isAdmin}
              />
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
