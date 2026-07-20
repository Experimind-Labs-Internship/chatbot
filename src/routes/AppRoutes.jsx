import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Home from "../pages/customer/Home";
import Login from "../pages/customer/Login";
import Signup from "../pages/customer/Signup";


export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}