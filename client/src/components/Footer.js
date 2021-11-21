import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div>
          <h1>Kopki</h1>
          <p>Copyright &copy; {new Date().getFullYear()}</p>
        </div>

        <div>
          <ul className="page-link">
            <li>
              <Link to="/">商品</Link>
            </li>
            <li>
              <Link to="/login">登錄/註冊</Link>
            </li>
            <li>
              <Link to="/cart">購物車</Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <Link to="/">
                <i className="fab fa-github fa-2x"></i>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fab fa-facebook fa-2x"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>TEL： 09-12365487</p>
          <p>Email： kopki684@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
