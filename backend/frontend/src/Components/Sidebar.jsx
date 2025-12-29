import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-dark text-white p-3" style={{ width: "230px" }}>
      <h5 className="mb-4">🩸 Blood Bank</h5>

      <NavLink to="/" className="d-block mb-2">
        Dashboard
      </NavLink>

      <NavLink to="/donors" className="d-block mb-2">
        Donors
      </NavLink>

      <NavLink to="/inventory" className="d-block mb-2">
        Inventory
      </NavLink>

      <NavLink to="/donations" className="d-block mb-2">
        Donations
      </NavLink>

      {/* ✅ NEW: APPOINTMENTS (visible to all logged users) */}
      <NavLink to="/appointments" className="d-block mb-2">
        Appointments
      </NavLink>

      {/* 🔥 ADMIN ONLY */}
      {user?.role === "admin" && (
        <>
          <NavLink to="/requests" className="d-block mb-2">
            Requests
          </NavLink>

          <NavLink to="/camps" className="d-block mb-2">
            Camps
          </NavLink>

          <NavLink to="/transfers" className="d-block mb-4">
            Transfers
          </NavLink>
        </>
      )}
      <NavLink to="/reports" className="d-block mb-2">
  Reports
</NavLink>


      <button
        className="btn btn-outline-danger w-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
