import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}