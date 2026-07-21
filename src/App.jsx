import AppRoutes from "./routes/AppRoutes";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartProvider } from "./context/CartContext";

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