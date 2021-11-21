import React, { useState } from "react";
import { useGlobalContext } from "../context";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import LoadMore from "../components/LoadMore";
import axios from "axios";

const Products = () => {
  const value = useGlobalContext();
  const [products, setProducts] = value.ProductsAPI.products;
  const [category, setCategory] = value.ProductsAPI.category;
  const [search, setSearch] = value.ProductsAPI.search;
  const [categories] = value.CategoryAPI.categories;
  const [isAdmin] = value.UserAPI.isAdmin;
  const [token] = value.token;
  const [isCheck, setIsCheck] = useState(false);

  const checkAll = () => {
    let newProducts = products.map((product) => {
      return { ...product, checked: !isCheck };
    });
    setIsCheck(!isCheck);
    setProducts(newProducts);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      await axios.post(
        "/api/destroy",
        { public_id: public_id },
        {
          headers: { authorization: token },
        }
      );

      await axios.delete(`/api/products/${id}`, {
        headers: { authorization: token },
      });

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {}
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  const handleCategory = (id) => {
    if (!id) {
      setCategory("");
      setSearch("");
      return;
    }
    setCategory("category=" + id);
  };

  return (
    <>
      <Slider />
      <div className="products-page">
        {isAdmin && (
          <div className="delete-all">
            <h3>全部選擇</h3>
            <input type="checkbox" checked={isCheck} onChange={checkAll} />
            <button onClick={deleteAll}>刪除已選</button>
          </div>
        )}
        <div className="show-categories">
          <button onClick={() => handleCategory("")}>所有商品</button>

          {categories.map((category) => {
            return (
              <button
                onClick={() => handleCategory(category._id)}
                key={category._id}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <main>
          <SearchBar />
          <div className="products">
            {products.map((product) => {
              return (
                <ProductItem
                  key={product.product_id}
                  product={product}
                  isAdmin={isAdmin}
                />
              );
            })}
          </div>
          <LoadMore />
        </main>
      </div>
    </>
  );
};

export default Products;
