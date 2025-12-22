import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Donors from "./pages/Donors.jsx";
import Inventory from "./pages/Inventory.jsx";
import Donations from "./pages/Donations.jsx";
import Requests from "./pages/Requests.jsx";
import Camps from "./pages/Camps.jsx";
import Transfers from "./pages/Transfers.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ADMIN ROUTES */}
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
