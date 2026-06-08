import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import PizzaBuilder from "./Pages/PizzaBuilder";
import AdminDashboard from "./Pages/AdminDashboard";

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pizza-builder" element={<PizzaBuilder />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;