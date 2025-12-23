import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Inventory from "./pages/Inventory";
import Donations from "./pages/Donations";
import Requests from "./pages/Requests";
import Camps from "./pages/Camps";
import Transfers from "./pages/Transfers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/donors"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Donors />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Inventory />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Donations />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Requests />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/camps"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Camps />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transfers"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-4">
                  <Transfers />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
