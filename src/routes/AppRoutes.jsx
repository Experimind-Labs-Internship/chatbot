import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import Home from "../pages/customer/Home";
import Shop from "../pages/customer/Shop";
import ProductDetails from "../pages/customer/ProductDetails";
import Login from "../pages/customer/Login";
import Signup from "../pages/customer/Signup";
import OurStory from "../components/customer/OurStory";
import Contact from "../pages/customer/Contact";
import Wishlist from "../pages/customer/Wishlist";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/wishlist" element={<Wishlist />} />
</Routes>

      <Footer />
    </BrowserRouter>
  );
}