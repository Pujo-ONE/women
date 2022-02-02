import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";

const MyROutea = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyROutea;
