import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [showLink, setShowLink] = useState(false);
  const linksContainerRef = useRef();
  const linksRef = useRef();
  const value = useGlobalContext();
  const [isLogged, setIsLogged] = value.UserAPI.isLogged;
  const [isAdmin, setIsAdmin] = value.UserAPI.isAdmin;
  const [cart] = value.UserAPI.cart;

  useEffect(() => {
    const Height = linksRef.current.getBoundingClientRect().height;
    if (showLink) {
      linksContainerRef.current.style.height = `${Height}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showLink]);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    setIsLogged(false);
    setIsAdmin(false);
    window.location.reload("/");
  };

  const AdminRouter = () => {
    return (
      <>
        <li className="link" onClick={() => setShowLink(false)}>
          <Link to="/create_product">創建商品</Link>
        </li>
        <li className="link" onClick={() => setShowLink(false)}>
          <Link to="/category">分類</Link>
        </li>
      </>
    );
  };

  const LoggedRouter = () => {
    return (
      <>
        <li className="link" onClick={() => setShowLink(false)}>
          <Link to="/history">訂單紀錄</Link>
        </li>
        <li className="link" onClick={() => logoutUser()}>
          <Link to="/">登出</Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <div>
              <h2>
                <Link to="/">KOPKI STORE</Link>
              </h2>
            </div>

            <button
              className="nav-toggle"
              onClick={() => setShowLink(!showLink)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className="links-container" ref={linksContainerRef}>
            <ul className="links" ref={linksRef}>
              {isAdmin && <AdminRouter />}
              <li className="link" onClick={() => setShowLink(false)}>
                <Link to="/">商品</Link>
              </li>
              {isLogged && <LoggedRouter />}
              {!isLogged && (
                <li className="link" onClick={() => setShowLink(false)}>
                  <Link to="/login">登錄/註冊</Link>
                </li>
              )}
              <li className="link" onClick={() => setShowLink(false)}>
                <Link to="/cart" className="cart">
                  <span className="cart-count">{cart.length}</span>
                  <i className="fas fa-shopping-cart"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
