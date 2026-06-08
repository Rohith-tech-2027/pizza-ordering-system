import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/all-orders"
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/update-status/${id}`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/orders/delete-order/${id}`
      );

      alert("Order Deleted Successfully");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Order");
    }
  };

  // Statistics
  const totalOrders = orders.length;

  const inKitchen = orders.filter(
    (order) => order.status === "In Kitchen"
  ).length;

  const outForDelivery = orders.filter(
    (order) => order.status === "Out for Delivery"
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // Search Filter
  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>🍕 Pizza App</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/pizza-builder">Build Pizza</a>
          <a href="/admin">Dashboard</a>
        </div>
      </nav>

      <h1 className="dashboard-title">
        👨‍💼 Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>📦 Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="stat-card">
          <h3>🍳 In Kitchen</h3>
          <h2>{inKitchen}</h2>
        </div>

        <div className="stat-card">
          <h3>🚚 Out for Delivery</h3>
          <h2>{outForDelivery}</h2>
        </div>

        <div className="stat-card">
          <h3>✅ Delivered</h3>
          <h2>{delivered}</h2>
        </div>
      </div>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search Customer..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Orders Table */}
      <div className="card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Base</th>
              <th>Sauce</th>
              <th>Cheese</th>
              <th>Veggies</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.base}</td>
                <td>{order.sauce}</td>
                <td>{order.cheese}</td>
                <td>{order.veggies.join(", ")}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option>Order Received</option>
                    <option>In Kitchen</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </select>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;