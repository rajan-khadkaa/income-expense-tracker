import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Income from "./components/income/Income.jsx";
import Expense from "./components/expense/Expense.jsx";
import Bin from "./components/bin/Bin.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Login from "./components/verification/Login.jsx";
import Register from "./components/verification/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import axios from "axios";
import Start from "./components/verification/Start.jsx";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Start />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/income"
          element={
            <PrivateRoute>
              <Income />
            </PrivateRoute>
          }
        />
        <Route
          path="/expense"
          element={
            <PrivateRoute>
              <Expense />
            </PrivateRoute>
          }
        />
        <Route
          path="/bin"
          element={
            <PrivateRoute>
              <Bin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
