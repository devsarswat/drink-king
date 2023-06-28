import React, { createContext,  useState,useContext } from "react";
import Navbar from "./Component/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Navigate} from "react-router-dom";
import Login from "./Component/Login";
import Signin from "./Component/Signin";
import GetData from "./Component/GetData";
import coffee from './Data/CoffeeData.json'
import Product from "./Component/Product";
import Data from "./Component/Data";
import Cart from "./Component/Cart";
export const Acontext = createContext();

const App=()=> {
  const [search, setSearch] = useState('');
  const[isLogin,setisLogin]=useState(false);
  const [data, setdata] = useState([...coffee.Teadata, ...coffee.varieties]);
  const [cartItems, setCartItems] = useState([]);

  // const handleLogout = () => {
  //   setSearch('');
  // };

  return (
    <Acontext.Provider value={{ search, setSearch,data,setdata,cartItems, setCartItems,isLogin,setisLogin}}>
      <Navbar  />
      <Routes>
        <Route path="/" element={<GetData />} />
        <Route path="/product" element={<Product />} />
        <Route path="/data" element={<Data />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart/>}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Acontext.Provider>
  );
}
const PrivateRoute=({element})=>{
  const{isLogin}=useContext(Acontext);
  return (isLogin)?element:<Navigate to="/login"/>;
};

export default App;
