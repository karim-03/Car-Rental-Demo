import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { CarType, Order } from "../types/types";

interface Props {
  onOrderAdded: (order: Order) => void;
}

const AddOrderForm = ({ onOrderAdded }: Props) => {
  const [carTypes, setCarTypes] = useState<CarType[]>([]);

  const [form, setForm] = useState({
    carTypeId: "",
    fromDate: "",
    toDate: "",
    username: "",
    mobileNumber: "",
    comments: ""
  });

  const [error, setError] = useState("");

  // 🔹 Load Car Types for dropdown
  useEffect(() => {
    api.get<CarType[]>("/cartypes")
      .then(res => setCarTypes(res.data))
      .catch(() => setError("Failed to load car types"));
  }, []);

  // 🔹 Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit form
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
      const response = await api.post<Order>("/orders", {
        carTypeId: Number(form.carTypeId),
        fromDate: form.fromDate,
        toDate: form.toDate,
        username: form.username,
        mobileNumber: form.mobileNumber,
        comments: form.comments || null
      });

      // 🔹 Notify parent (bonus requirement)
      onOrderAdded(response.data);

      // 🔹 Clear form (bonus requirement)
      setForm({
        carTypeId: "",
        fromDate: "",
        toDate: "",
        username: "",
        mobileNumber: "",
        comments: ""
      });

      setError("");
    } catch {
      setError("Failed to create order");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Add Order</button>
    </form>
  );
};

export default AddOrderForm;
