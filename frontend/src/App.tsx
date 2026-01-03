import { useEffect, useState } from "react";
import { api } from "./api/api";
import type { Order } from "./types/types";
import OrdersGrid from "./components/OrdersGrid";
import AddOrderForm from "./components/AddOrderForm";

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);


  // Load orders (with fromDate filter option) ((bonus point!))
  useEffect(() => {
    const fetchOrders = async () => {
      const url = fromDateFilter
        ? `/orders?fromDate=${fromDateFilter}`
        : "/orders";

      const res = await api.get<Order[]>(url);
      setOrders(res.data);
    };

    fetchOrders();
  }, [fromDateFilter, refreshKey]);



  // Delete order
  const deleteOrder = async (id: number) => {
    await api.delete(`/orders/${id}`);
    setOrders(prev => prev.filter(o => o.id !== id));
  };


  // Called after add or edit
  const handleOrderSaved = () => {
    setEditingOrder(null);
    setRefreshKey(prev => prev + 1); // triggers refetch safely (bonus point!)
  };

  // Main render, the entire app
  return (
    <div className="app-container">
      <h1>Car Rental Orders</h1>
      <div className="section">
        <label>
          Filter From Date:
          <input
            type="date"
            value={fromDateFilter}
            onChange={e => setFromDateFilter(e.target.value)}
          />
        </label>

        <OrdersGrid
          orders={orders}
          onDelete={deleteOrder}
          onEdit={order => setEditingOrder(order)}
        />
      </div>

      <div className="section">
        <AddOrderForm
          key={editingOrder?.id ?? "new"}
          editingOrder={editingOrder}
          onOrderSaved={handleOrderSaved}
          onCancelEdit={() => setEditingOrder(null)}
        />
      </div>
    </div>
  );
}

export default App;