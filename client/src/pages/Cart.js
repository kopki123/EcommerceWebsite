import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const Cart = () => {
  let navigate = useNavigate();
  const value = useGlobalContext();
  const [cart, setCart] = value.UserAPI.cart;
  const [token] = value.token;
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const newTotal = cart.reduce((acc, product) => {
      return (acc += product.price * product.quantity);
    }, 0);
    setTotal(newTotal);
  }, [cart, total]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      { headers: { authorization: token } }
    );
  };

  const decrement = (id) => {
    const newCart = cart.map((product) => {
      if (product._id === id) {
        product.quantity -= 1;
        return {
          ...product,
          quantity: product.quantity === 0 ? 1 : product.quantity,
        };
      }
      return product;
    });

    setCart(newCart);
    addToCart();
  };

  const increment = (id) => {
    const newCart = cart.map((product) => {
      if (product._id === id) {
        return { ...product, quantity: (product.quantity += 1) };
      }
      return product;
    });
    setCart(newCart);
    addToCart();
  };

  const removeProduct = (id) => {
    const newCart = cart.filter((product) => {
      return product._id !== id;
    });
    setCart(newCart);
    addToCart(newCart);
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>空的購物車...</h2>
      </div>
    );
  }

  const style = {
    display: "none",
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="cart-page">
      <div className="step" style={step !== 1 ? style : {}}>
        <p>STEP</p>
        <h3>01</h3>
        <p>確認購物清單</p>
      </div>

      <div className="step" style={step !== 2 ? style : {}}>
        <p>STEP</p>
        <h3>02</h3>
        <p>填寫訂購資料</p>
      </div>

      <div className="step" style={step !== 3 ? style : {}}>
        <p>STEP</p>
        <h3>03</h3>
        <p>付款/完成訂單</p>
      </div>

      {step === 1
        ? cart.map((product) => {
            return (
              <div key={product.product_id} className="cart-product">
                <img
                  src={product.images.url}
                  alt=""
                  onClick={() => navigate(`/product/${product.product_id}`)}
                />
                <div className="cart-product_info">
                  <h2>
                    <Link to={`/product/${product.product_id}`}>
                      {product.title}
                    </Link>
                  </h2>
                  <p>NT.{product.price * product.quantity}</p>

                  <div className="amount">
                    <button onClick={() => decrement(product._id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increment(product._id)}>+</button>
                  </div>

                  <div
                    className="delete"
                    onClick={() => removeProduct(product._id)}
                  >
                    X
                  </div>
                </div>
              </div>
            );
          })
        : null}

      {step === 2 ? (
        <form onSubmit={handleSubmit}>
          <h2>訂購資料</h2>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChangeInput}
            />
          </div>

          <div className="field">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChangeInput}
            />
          </div>

          <div className="field">
            <label htmlFor="phone">電話</label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              onChange={handleChangeInput}
            />
          </div>

          <div className="field">
            <label htmlFor="address">地址</label>
            <input
              type="text"
              name="address"
              id="address"
              required
              onChange={handleChangeInput}
            />
          </div>

          <div className="total" style={{ alignSelf: "flex-end" }}>
            <button type="submit">
              確認付款 <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 ? (
        <>
          <div className="confirm-cart">
            <h2>訂單資料</h2>
            <table>
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>數量</th>
                  <th>總數</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h3>
              總計: $ <span>{total}</span>
            </h3>
          </div>

          <div className="confirm-user">
            <h2>訂購人資料</h2>
            <h3>姓名 : {user.name}</h3>
            <h3>Email : {user.email}</h3>
            <h3>電話 : {user.phone}</h3>
            <h3>地址 : {user.address}</h3>
          </div>
        </>
      ) : null}

      {step === 1 && (
        <div className="total">
          <h3>
            總計: NT.<span>{total}</span>
          </h3>
          <button onClick={() => setStep(2)}>
            填寫訂購資料 <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="total">
          <button onClick={() => window.location.replace("/")}>完成訂單</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
