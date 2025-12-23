import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./Components/ProtectedRoute";
import Sidebar from "./Components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Inventory from "./pages/Inventory";
import Donations from "./pages/Donations";
import Requests from "./pages/Requests";
import Camps from "./pages/Camps";
import Transfers from "./pages/Transfers";

function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/donors" element={<ProtectedRoute><Layout><Donors /></Layout></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Layout><Inventory /></Layout></ProtectedRoute>} />
          <Route path="/donations" element={<ProtectedRoute><Layout><Donations /></Layout></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Layout><Requests /></Layout></ProtectedRoute>} />
          <Route path="/camps" element={<ProtectedRoute><Layout><Camps /></Layout></ProtectedRoute>} />
          <Route path="/transfers" element={<ProtectedRoute><Layout><Transfers /></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
