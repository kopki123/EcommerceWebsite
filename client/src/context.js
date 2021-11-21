import React, { useContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoryAPI from "./api/CategoryAPI";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const state = {
    token: [token, setToken],
    ProductsAPI: ProductsAPI(),
    UserAPI: UserAPI(token),
    CategoryAPI: CategoryAPI(token),
  };

  const refreshToken = async () => {
    const response = await axios.get("/user/refresh_token");
    setToken(response.data.accesstoken);
    setTimeout(() => {
      refreshToken();
    }, 10 * 60 * 1000);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, []);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
