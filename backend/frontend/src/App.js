import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Donors from "./pages/Donors.jsx";
import Inventory from "./pages/Inventory.jsx";
import Donations from "./pages/Donations.jsx";
import Requests from "./pages/Requests.jsx";
import Camps from "./pages/Camps.jsx";
import Transfers from "./pages/Transfers.jsx";
import Appointments from "./pages/Appointments.jsx";
import Analytics from "./pages/Analytics.jsx";
import HealthScreening from "./pages/HealthScreening.jsx";
import Achievements from "./pages/Achievements.jsx";
import BloodCompatibility from "./pages/BloodCompatibility.jsx";



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
   
       <InventoryProvider>
      <BrowserRouter>
        <Routes>
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
      </InventoryProvider>
    
  );
}




export default App;
