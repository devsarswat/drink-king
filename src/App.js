import React, { createContext, useState, useEffect, useContext } from "react";
import Navbar from "./Component/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Component/Login";
import Signin from "./Component/Signin";
import GetData from "./Component/GetData";
import Product from "./Component/Product";
import Data from "./Component/Data";
import Cart from "./Component/Cart";
import Profile from "./Component/Profile";
import ProductDetail from "./Component/ProductDetail";
export const Acontext = createContext();

const App = () => {
  const [search, setSearch] = useState('');
  const[product,setproduct]=useState();
  const [isLogin, setisLogin] = useState(false);
  const [data, setdata] = useState(() => {
    const storedData = localStorage.getItem("productData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cartItems, setCartItems] = useState([]);
  const [user, setuser] = useState([]);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(data));
  }, [data]);

  return (
    <Acontext.Provider value={{ product,setproduct,search, setSearch, data, setdata, cartItems, setCartItems, isLogin, setisLogin, user, setuser }}>
      <Navbar />
      <Routes>
        <Route path="/alldata" element={<GetData />} />
        <Route path="/" element={<Product />} />
        <Route path="/data" element={<Data />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/productdetail" element={<ProductDetail />} />
      </Routes>
    </Acontext.Provider>
  );
};

const PrivateRoute = ({ element }) => {
  const { isLogin } = useContext(Acontext);
  return isLogin ? element : <Navigate to="/login" />;
};

export default App;
