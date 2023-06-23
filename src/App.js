import React, { createContext, useState } from "react";
import Navbar from "./Component/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import GetData from "./Component/GetData";

export const Acontext = createContext();

const App=()=> {
  const [search, setSearch] = useState('');

  // const handleLogout = () => {
  //   setSearch('');
  // };

  return (
    <Acontext.Provider value={{ search, setSearch }}>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coffee" element={<GetData />} />
      </Routes>
    </Acontext.Provider>
  );
}

export default App;
