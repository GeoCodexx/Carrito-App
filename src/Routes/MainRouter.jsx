import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NewProducts from "../pages/NewProducts";
import BestSellers from "../pages/BestSellers";
import ProductDetail from "../pages/ProductDetail";
import FilteredProducts from "../pages/FilteredProducts";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<NewProducts />} />
      <Route path="/bestsellers" element={<BestSellers />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/filteredproducts" element={<FilteredProducts />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRouter;
