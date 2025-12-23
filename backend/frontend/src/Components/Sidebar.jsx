import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">Blood Bank</h4>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/donors">
            Donors
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/inventory">
            Inventory
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/donations">
            Donations
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/requests">
            Requests
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/camps">
            Camps
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/transfers">
            Transfers
          </NavLink>
        </li>

        <li className="nav-item mt-3">
          <NavLink className="nav-link text-danger" to="/login">
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
