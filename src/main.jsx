import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecentlyViewedProvider>
          <App />
        </RecentlyViewedProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);