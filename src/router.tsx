import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/coin";
import Coins from "./routes/coins";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
