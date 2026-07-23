import AppRoutes from "./routes/AppRoutes";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";
import Coupons from "./pages/admin/Coupons";
import CouponForm from "./pages/admin/CouponForm";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <AuthProvider>
  <AdminAuthProvider>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </AdminAuthProvider>
</AuthProvider>
  );
}


export default App;