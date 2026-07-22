import AppRoutes from "./routes/AppRoutes";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";
import Coupons from "./pages/admin/Coupons";
import CouponForm from "./pages/admin/CouponForm";

function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AdminAuthProvider>
  );
}


export default App;