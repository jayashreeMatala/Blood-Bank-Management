import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBox,
  FiHeart,
  FiCalendar,
  FiTruck,
  FiFileText,
  FiActivity,
  FiAward,
  FiGitBranch,
  FiBarChart

} from "react-icons/fi";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">🩸</div>
        <span>Blood Bank</span>
      </div>

      <nav className="sidebar-menu">
        <MenuItem to="/" icon={<FiHome />} text="Dashboard" />
        <MenuItem to="/donors" icon={<FiUsers />} text="Donors" />
        <MenuItem to="/inventory" icon={<FiBox />} text="Inventory" />
        <MenuItem to="/donations" icon={<FiHeart />} text="Donations" />
        <MenuItem to="/appointments" icon={<FiCalendar />} text="Appointments" />
        <MenuItem to="/requests" icon={<FiHeart />} text="Requests" />
        <MenuItem to="/camps" icon={<FiCalendar />} text="Camps" />
        <MenuItem to="/transfers" icon={<FiTruck />} text="Transfers" />
        <MenuItem to="/analytics" icon={<FiBarChart />} text="Analytics" />
        <MenuItem to="/screening" icon={<FiActivity />} text="Screening" />
        <MenuItem to="/achievements" icon={<FiAward />} text="Achievements" />
        <MenuItem to="/compatibility"icon={<FiGitBranch />}text="Blood Compatibility"/>

      </nav>

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
