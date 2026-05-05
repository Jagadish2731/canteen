import { NavLink } from "react-router-dom";
import {
  FiClock,
  FiDollarSign,
  FiGrid,
  FiLogOut,
  FiPackage,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { LuChefHat } from "react-icons/lu";

const iconMap = {
  grid:     FiGrid,
  package:  FiPackage,
  bag:      FiShoppingBag,
  users:    FiUsers,
  star:     FiStar,
  dollar:   FiDollarSign,
  clock:    FiClock,
  settings: FiSettings,
};

export default function Sidebar({ menuOpen, navLinks = [], onLogout }) {
  return (
    <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

      <div className="sidebar-brand">
        <LuChefHat />
        <div>
          <h1>Campus Canteen</h1>
          <p>Admin Panel</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-avatar">A</div>
        <div>
          <h4>Admin</h4>
          <p>admin@gmail.com</p>
        </div>
      </div>

      <nav className="menu">
        {navLinks.map((item) => {
          const Icon = iconMap[item.icon];
          if (!Icon) return null;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `menu-item${isActive ? " active" : ""}`
              }
            >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ✅ Logout button now calls onLogout from App.jsx */}
      <button className="logout-btn" type="button" onClick={onLogout}>
        <FiLogOut />
        <span>Logout</span>
      </button>

    </aside>
  );
}
