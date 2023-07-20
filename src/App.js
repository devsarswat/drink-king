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
import OrderHistory from "./Component/OrderHistory";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./Component/Action/Loading";
export const Acontext = createContext();

const App = () => {
  const udata = (() => {
    const storedUser = JSON.parse(localStorage.getItem("userid"));
    return storedUser ? storedUser : null;
  });
  const [search, setSearch] = useState('');
  const[product,setproduct]=useState();
  const [isLogin, setisLogin] = useState(udata);
  const [data, setdata] = useState(() => {
    const storedData = localStorage.getItem("productData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cartItems, setCartItems] = useState([]);
  const [user, setuser] = useState(udata);
  console.log("user",user)
  console.log("islogin",isLogin)
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(data));
    setTimeout(() => {
      setIsLoading(false);
    },500);
  }, [data]);

  
  return (
    <>
    {isLoading ? (
        <Loading />
      ) : (
    <Acontext.Provider value={{ product,setproduct,search, setSearch, data, setdata, cartItems, setCartItems, isLogin, setisLogin, user, setuser}}>
      <Navbar />
      <ToastContainer position="top-center" autoClose={2000}/>
      <Routes>
        <Route path="/alldata" element={<GetData />} />
        <Route path="/drink-king" element={<Product />} />
        <Route path="/data" element={<Data />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/order" element={<PrivateRoute element={<OrderHistory />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/productdetail" element={<ProductDetail />} />
      </Routes>
    </Acontext.Provider>
      )}
  </>
  );
};

const PrivateRoute = ({ element }) => {
  const { isLogin } = useContext(Acontext);
  return isLogin ? element : <Navigate to="/login" />;
};

export default App;
