import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "220px", minHeight: "100vh" }} className="bg-dark text-white p-3">
      <h4 className="mb-4">BloodBank</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/donors">Donors</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/inventory">Inventory</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/donations">Donations</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/requests">Requests</Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/camps">Camps</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/transfers">Transfers</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
