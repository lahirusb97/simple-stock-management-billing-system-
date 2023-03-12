import React from "react";

import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>

      <Route path="/" element={<LogIn />}></Route>
    </Routes>
  );
}
