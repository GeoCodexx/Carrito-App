import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./contexts/ProductProvider.jsx";
import SidebarProvider from "./contexts/SidebarProvider.jsx";
import CartProvider from "./contexts/CartProvider.jsx";
import FilterProvider from "./contexts/FilterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SidebarProvider>
    <FilterProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </ProductProvider>
    </CartProvider></FilterProvider>
  </SidebarProvider>
);
