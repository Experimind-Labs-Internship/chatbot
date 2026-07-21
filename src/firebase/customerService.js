import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { getAllOrders } from "./orderService";

const usersRef = collection(db, "users");

export async function getAllCustomers() {
  const snapshot = await getDocs(query(usersRef, where("role", "==", "customer")));
  const customers = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Attach order stats per customer
  const allOrders = await getAllOrders();

  return customers.map((customer) => {
    const customerOrders = allOrders.filter((o) => o.userId === customer.id);
    const totalSpent = customerOrders
      .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      ...customer,
      orderCount: customerOrders.length,
      totalSpent,
    };
  });
}

export async function getCustomerOrders(userId) {
  const allOrders = await getAllOrders();
  return allOrders.filter((o) => o.userId === userId);
}

export async function getGuestOrders() {
  const allOrders = await getAllOrders();
  return allOrders.filter((o) => !o.userId && o.guestEmail);
}