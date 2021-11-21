import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShowErrMsg, ShowSuccessMsg } from "../components/Notification";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("firstLogin", true);
      setUser({ ...user, success: response.data.msg });
      setTimeout(() => window.location.replace("/"), 500);
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, err: error.response.data.msg });
    }
  };

  const style = {
    height: "325px",
  };

  useEffect(() => {
    if (err || success) {
      setTimeout(() => setUser({ ...user, err: "", success: "" }), 1500);
    }
  }, [user, err, success]);

  return (
    <div className="login-page">
      <div className="login-section" style={err || success ? style : {}}>
        <form>
          <h2>登錄</h2>

          <input
            type="text"
            id="email"
            name="email"
            placeholder="電子郵箱"
            onChange={(e) => handleChangeInput(e)}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="密碼"
            onChange={(e) => handleChangeInput(e)}
          />

          <div className="row">
            <button className="submit-btn" onClick={(e) => handleSubmit(e)}>
              登錄
            </button>
            <Link to="/register" className="register">
              註冊
            </Link>
          </div>

          {err && <ShowErrMsg msg={err} />}
          {success && <ShowSuccessMsg msg={success} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
