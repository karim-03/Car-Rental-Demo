import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { CarType, Order } from "../types/types";

interface Props {
  onOrderSaved: () => void;
  editingOrder?: Order | null;
  onCancelEdit?: () => void;
}

const AddOrderForm = ({ onOrderSaved, editingOrder, onCancelEdit }: Props) => {
  const [carTypes, setCarTypes] = useState<CarType[]>([]);

  const [form, setForm] = useState(() => ({
    carTypeId: editingOrder?.carType.id.toString() ?? "",
    fromDate: editingOrder?.fromDate.split("T")[0] ?? "", // .split("T")[0] to get YYYY-MM-DD (extra precaution)
    toDate: editingOrder?.toDate.split("T")[0] ?? "",
    username: editingOrder?.username ?? "",
    mobileNumber: editingOrder?.mobileNumber ?? "",
    comments: editingOrder?.comments ?? ""
  }));


  const [error, setError] = useState("");

  // Load Car Types for dropdown
  useEffect(() => {
    api.get<CarType[]>("/cartypes")
      .then(res => setCarTypes(res.data))
      .catch(() => setError("Failed to load car types"));
  }, []);


  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !form.carTypeId ||
      !form.fromDate ||
      !form.toDate ||
      !form.username ||
      !form.mobileNumber
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      if (editingOrder) {    
        // Edit existing order                   
        await api.put(`/orders/${editingOrder.id}`, {
          carTypeId: Number(form.carTypeId),
          fromDate: form.fromDate,
          toDate: form.toDate,
          username: form.username,
          mobileNumber: form.mobileNumber,
          comments: form.comments || null
        });
      } else {
        // Add new order
        await api.post("/orders", {
          carTypeId: Number(form.carTypeId),
          fromDate: form.fromDate,
          toDate: form.toDate,
          username: form.username,
          mobileNumber: form.mobileNumber,
          comments: form.comments || null
        });
      }

      onOrderSaved();

      // Clear form after submission
      setForm({
        carTypeId: "",
        fromDate: "",
        toDate: "",
        username: "",
        mobileNumber: "",
        comments: ""
      });

    } catch {
      setError("Failed to save order");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Add New Order</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <select
        name="carTypeId"
        value={form.carTypeId}
        onChange={handleChange}
      >
        <option value="">Select Car Type</option>
        {carTypes.map(ct => (
          <option key={ct.id} value={ct.id}>
            {ct.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="fromDate"
        value={form.fromDate}
        onChange={handleChange}
      />

      <input
        type="date"
        name="toDate"
        value={form.toDate}
        onChange={handleChange}
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        type="text"
        name="mobileNumber"
        placeholder="Mobile Number"
        value={form.mobileNumber}
        onChange={handleChange}
      />

      <input
        type="text"
        name="comments"
        placeholder="Comments (optional)"
        value={form.comments}
        onChange={handleChange}
      />

      {editingOrder && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}

      <button type="submit">
        {editingOrder ? "Update Order" : "Add Order"}
      </button>
    </form>
  );
};

export default AddOrderForm;
