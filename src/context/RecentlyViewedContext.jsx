import { createContext, useContext, useEffect, useState } from "react";

const RecentlyViewedContext = createContext();

export function RecentlyViewedProvider({ children }) {
  const [recentProducts, setRecentProducts] = useState(() => {
    const saved = localStorage.getItem("recentProducts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "recentProducts",
      JSON.stringify(recentProducts)
    );
  }, [recentProducts]);

  const addRecentlyViewed = (product) => {
    setRecentProducts((prev) => {
      // Remove duplicate if already exists
      const filtered = prev.filter(
        (item) => item.id !== product.id
      );

      // Add newest product to the beginning
      const updated = [product, ...filtered];

      // Keep only the latest 6 products
      return updated.slice(0, 6);
    });
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentProducts,
        addRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}