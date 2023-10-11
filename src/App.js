import React from "react";
import HomePage from "./Component/HomePage";
import Cart from "./Component/Cart";
import ProductDetails from "./Component/ProductDetail";
import { GlobalStateProvider } from "./Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/store" element={<HomePage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/ProductDetails" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
