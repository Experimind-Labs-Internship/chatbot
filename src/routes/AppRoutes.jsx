import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// Customer pages
import Home from "../pages/customer/Home";
import Shop from "../pages/customer/Shop";
import ProductDetails from "../pages/customer/ProductDetails";
import Login from "../pages/customer/Login";
import Signup from "../pages/customer/Signup";
import Contact from "../pages/customer/Contact";
import Wishlist from "../pages/customer/Wishlist";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import OrderConfirmation from "../pages/customer/OrderConfirmation";

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/ProductList";
import ProductForm from "../pages/admin/ProductForm";
import Inventory from "../pages/admin/Inventory";
import OrderList from "../pages/admin/OrderList";
import OrderDetail from "../pages/admin/OrderDetail";
import CustomerList from "../pages/admin/CustomerList";
import CustomerDetail from "../pages/admin/CustomerDetail";
import GuestOrders from "../pages/admin/GuestOrders";
import ReviewList from "../pages/admin/ReviewList";

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Customer-facing ---------- */}
        <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
        <Route path="/shop" element={<CustomerLayout><Shop /></CustomerLayout>} />
        <Route path="/product/:id" element={<CustomerLayout><ProductDetails /></CustomerLayout>} />
        <Route path="/login" element={<CustomerLayout><Login /></CustomerLayout>} />
        <Route path="/signup" element={<CustomerLayout><Signup /></CustomerLayout>} />
        <Route path="/contact" element={<CustomerLayout><Contact /></CustomerLayout>} />
        <Route path="/wishlist" element={<CustomerLayout><Wishlist /></CustomerLayout>} />
        <Route path="/cart" element={<CustomerLayout><Cart /></CustomerLayout>} />
        <Route path="/checkout" element={<CustomerLayout><Checkout /></CustomerLayout>} />
        <Route
          path="/order-confirmation/:orderId"
          element={<CustomerLayout><OrderConfirmation /></CustomerLayout>}
        />

        {/* ---------- Admin ---------- */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />

          <Route path="inventory" element={<Inventory />} />

          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />

          {/* IMPORTANT: "customers/guests" must stay above
              "customers/:customerId" or the router will treat
              "guests" as a customerId param */}
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/guests" element={<GuestOrders />} />
          <Route path="customers/:customerId" element={<CustomerDetail />} />

          <Route path="reviews" element={<ReviewList />} />

          {/* Coupons, Newsletter, Reports
              routes will be added here as we build each module */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}