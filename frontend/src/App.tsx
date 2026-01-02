import React, { useEffect, useState } from "react";
import { api } from "./api/api";
import type { Order } from "./types/types";
import OrdersGrid from "./components/OrdersGrid";
import AddOrderForm from "./components/AddOrderForm";

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);


  // 🔹 Load orders (with optional filter)
  


  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      const url = fromDateFilter
        ? `/orders?fromDate=${fromDateFilter}`
        : "/orders";

      const response = await api.get<Order[]>(url);

      if (isMounted) {
        setOrders(response.data);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [fromDateFilter, refreshKey]);




  // 🔹 Delete order
  const deleteOrder = async (id: number) => {
    await api.delete(`/orders/${id}`);
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // 🔹 Add order without reload (BONUS)
   const addOrder = () => {
    setRefreshKey(prev => prev + 1);
  };



  return (
    <div>
      <h1>Car Rental Orders</h1>

      <label>
        Filter From Date:
        <input
          type="date"
          value={fromDateFilter}
          onChange={e => setFromDateFilter(e.target.value)}
        />
      </label>

      <OrdersGrid orders={orders} onDelete={deleteOrder} />

      <hr />

      <AddOrderForm onOrderAdded={addOrder} />
    </div>
  );

}

export default App;