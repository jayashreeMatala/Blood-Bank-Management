import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiHeart,
  FiCalendar,
  FiTruck,
  FiActivity,
  FiAward,
  FiGitBranch,
  FiBarChart,
  FiFileText
} from "react-icons/fi";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🩸</div>
        <span>Blood Bank</span>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">

        {/* 1️⃣ Dashboard */}
        <MenuItem to="/" icon={<FiHome />} text="Dashboard" />

        {/* 2️⃣ Donors */}
        <MenuItem to="/donors" icon={<FiUsers />} text="Donors" />

        {/* 3️⃣ Appointment */}
        <MenuItem to="/appointments" icon={<FiCalendar />} text="Appointments" />

        {/* 4️⃣ Screening */}
        <MenuItem to="/screening" icon={<FiActivity />} text="Screening" />

        {/* 5️⃣ Donations */}
        <MenuItem to="/donations" icon={<FiHeart />} text="Donations" />

        {/* 6️⃣ Inventory */}
        <MenuItem to="/inventory" icon={<FiBox />} text="Inventory" />

        {/* 7️⃣ Transfers */}
        <MenuItem to="/transfers" icon={<FiTruck />} text="Transfers" />

        {/* 8️⃣ Requests */}
        <MenuItem to="/requests" icon={<FiFileText />} text="Requests" />

        {/* 9️⃣ Blood Compatibility */}
        <MenuItem
          to="/compatibility"
          icon={<FiGitBranch />}
          text="Blood Compatibility"
        />

        {/* 🔟 Camps */}
        <MenuItem to="/camps" icon={<FiCalendar />} text="Camps" />

        {/* 1️⃣1️⃣ Analytics */}
        <MenuItem to="/analytics" icon={<FiBarChart />} text="Analytics" />

        {/* 1️⃣2️⃣ Achievement */}
        <MenuItem to="/achievements" icon={<FiAward />} text="Achievement" />

      </nav>

      {/* Logout Button */}
      <button className="logout-btn">Logout</button>
    </div>
  );
}

function MenuItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "menu-item active" : "menu-item"
      }
    >
      <span className="menu-icon">{icon}</span>
      <span>{text}</span>
    </NavLink>
  );
}

export default Sidebar;
