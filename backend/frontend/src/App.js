import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports (explicit .jsx extensions)
import Dashboard from "./pages/Dashboard.jsx";
import Donors from "./pages/Donors.jsx";
import Inventory from "./pages/Inventory.jsx";
import Donations from "./pages/Donations.jsx";
import Requests from "./pages/Requests.jsx";
import Camps from "./pages/Camps.jsx";
import Transfers from "./pages/Transfers.jsx";
import Sidebar from "./Components/Sidebar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/camps" element={<Camps />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
