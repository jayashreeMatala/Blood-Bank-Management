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
import Appointments from "./pages/Appointments";
import Analytics from "./pages/Analytics";
import HealthScreening from "./pages/HealthScreening";
import Achievements from "./pages/Achievements";
import BloodCompatibility from "./pages/BloodCompatibility";



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
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* DASHBOARD */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* DONORS */}
          <Route
            path="/donors"
            element={
              <ProtectedRoute>
                <Layout>
                  <Donors />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* INVENTORY */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Layout>
                  <Inventory />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* DONATIONS */}
          <Route
            path="/donations"
            element={
              <ProtectedRoute>
                <Layout>
                  <Donations />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ✅ APPOINTMENTS */}
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Layout>
                  <Appointments />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Layout>
                  <Requests />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/camps"
            element={
              <ProtectedRoute>
                <Layout>
                  <Camps />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/transfers"
            element={
              <ProtectedRoute>
                <Layout>
                  <Transfers />
                </Layout>
              </ProtectedRoute>
            }
          />
         <Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Layout>
        <Analytics />
      </Layout>
    </ProtectedRoute>
  }
/>

          <Route
            path="/screening"
            element={
              <ProtectedRoute>
                <Layout>
                  <HealthScreening />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <Layout>
                  <Achievements />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/compatibility"
            element={
              <ProtectedRoute>
                <Layout>
                  <BloodCompatibility />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}




export default App;
