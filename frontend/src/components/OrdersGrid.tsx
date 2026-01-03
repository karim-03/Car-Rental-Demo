import React from "react";
import type { Order } from "../types/types";

interface Props {
  orders: Order[];
  onDelete: (id: number) => void;
  onEdit: (order: Order) => void;
}


const OrdersGrid: React.FC<Props> = ({ orders, onDelete, onEdit }) => {
  return (
    <table className="orders-table">
      <thead>
        <tr> 
          <th>Car</th>
          <th>From</th>
          <th>To</th>
          <th>Duration</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.carType.name}</td>
            <td>{o.fromDate}</td>
            <td>{o.toDate}</td>
            <td>
              // Calculate duration in days, not the most optimized but works, simple and clear, and no extra libs needed!
              {(() => {
                const days = Math.ceil(
                  (new Date(o.toDate).getTime() - new Date(o.fromDate).getTime()) /
                    (1000 * 60 * 60 * 24) + 1
                );
                return `${days} ${days === 1 ? "day" : "days"}`;
              })()}
            </td>
            <td>{o.username}</td>
            <td>
              <button onClick={() => onEdit(o)}>Edit</button>
              <button onClick={() => onDelete(o.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersGrid;