import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NewProducts from "../pages/NewProducts";
import BestSellers from "../pages/BestSellers";
import ProductDetail from "../pages/ProductDetail";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewProducts />} />
      <Route path="/bestsellers" element={<BestSellers />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRouter;
