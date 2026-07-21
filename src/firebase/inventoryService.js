import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getAllProducts, SIZE_OPTIONS } from "./productService";

export const LOW_STOCK_THRESHOLD = 5;

export async function getInventoryData() {
  const products = await getAllProducts();

  return products.map((product) => {
    const sizes = product.sizes || {};
    const totalStock = SIZE_OPTIONS.reduce(
      (sum, size) => sum + (sizes[size]?.stock || 0),
      0
    );
    const isLowStock = SIZE_OPTIONS.some(
      (size) => (sizes[size]?.stock ?? 0) <= LOW_STOCK_THRESHOLD
    );

    return { ...product, sizes, totalStock, isLowStock };
  });
}

export async function restockSize(productId, currentSizes, size, addQuantity) {
  const updatedSizes = {
    ...currentSizes,
    [size]: {
      stock: (currentSizes[size]?.stock || 0) + Number(addQuantity),
    },
  };

  await updateDoc(doc(db, "products", productId), {
    sizes: updatedSizes,
  });

  return updatedSizes;
}

export async function setStockDirectly(productId, currentSizes, size, newStock) {
  const updatedSizes = {
    ...currentSizes,
    [size]: { stock: Number(newStock) },
  };

  await updateDoc(doc(db, "products", productId), {
    sizes: updatedSizes,
  });

  return updatedSizes;
}