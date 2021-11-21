import { useState, useEffect } from "react";
import axios from "axios";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const response = await axios.get("/user/infor", {
            headers: { authorization: token },
          });

          setIsLogged(true);
          if (response.data.role === 1) {
            setIsAdmin(true);
          }

          setCart(response.data.cart);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const response = await axios.get("/api/payment", {
            headers: { authorization: token },
          });
          setHistory(response.data);
        } else {
          const response = await axios.get("/user/history", {
            headers: { authorization: token },
          });
          setHistory(response.data);
        }
      };
      getHistory();
    }
  }, [token, callback, isAdmin]);

  const addCart = async (product) => {
    if (!isLogged) {
      return alert("請先登入帳號");
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { authorization: token } }
      );
    } else {
      alert("此商品已加入購物車");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
  };
};

export default UserAPI;
