import React from "react";
import { useGlobalContext } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notfound from "./components/Notfound";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Product from "./pages/Product";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import CreateProduct from "./pages/CreateProduct";
import Categories from "./pages/Categories";

function App() {
  const value = useGlobalContext();
  const [isLogged] = value.UserAPI.isLogged;
  const [isAdmin] = value.UserAPI.isAdmin;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/register"
          element={isLogged ? <Notfound /> : <Register />}
        />
        <Route path="/login" element={isLogged ? <Notfound /> : <Login />} />
        <Route
          path="/category"
          element={isAdmin ? <Categories /> : <Notfound />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:product_id" element={<Product />} />
        <Route
          path="/history"
          element={isLogged ? <OrderHistory /> : <Notfound />}
        />
        <Route
          path="/history/:payment_id"
          element={isLogged ? <OrderDetail /> : <Notfound />}
        />
        <Route
          path="/create_product"
          element={isAdmin ? <CreateProduct /> : <Notfound />}
        />
        <Route
          path="/edit_product/:id"
          element={isAdmin ? <CreateProduct /> : <Notfound />}
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
