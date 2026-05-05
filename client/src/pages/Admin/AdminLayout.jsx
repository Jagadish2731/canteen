import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// ✅ go up 2 levels to reach src/components/
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

// ✅ same folder - use ./ not ../Admin/
import DashboardPage from "./DashboardPage.jsx";
import Menu         from "./Menu.jsx";
import Order        from "./Orders.jsx";
import User         from "./User.jsx";
import Review       from "./Review.jsx";
import Payment      from "./Payments.jsx";
import Analytics    from "./Analytics.jsx";
import Setting      from "./Setting.jsx";

// ✅ go up 2 levels to reach src/services/
import { getDashboardData } from "../../services/api.js";

// ✅ go up 2 levels to reach src/style/
import "../../style/AdminCSS/sidebar.css";
import "../../style/AdminCSS/topbar.css";
import "../../style/AdminCSS/dashboard.css";

export const navLinks = [
  { to: "/",          label: "DashboardPage",       icon: "grid"     },
  { to: "/products",  label: "Menu",           icon: "package"  },
  { to: "/orders",    label: "Order",          icon: "bag"      },
  { to: "/customers", label: "Customer",       icon: "users"    },
  { to: "/reviews",   label: "Review",         icon: "star"     },
  { to: "/payments",  label: "Payment",        icon: "dollar"   },
  { to: "/analytics", label: "Analytics",       icon: "clock"    },
  { to: "/settings",  label: "Setting",        icon: "settings" },
];

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData]         = useState(null);
  const [error, setError]       = useState("");
  const location                = useLocation();

  // fetch dashboard data
  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => setError("Could not load dashboard data"));
  }, []);

  // close sidebar on mobile route change
  useEffect(() => {
    if (window.innerWidth < 992) setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <Sidebar menuOpen={menuOpen} navLinks={navLinks} />

      {/* OVERLAY */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MAIN CONTENT */}
      <main className="main-content">

        <Topbar
          title={getPageTitle(location.pathname)}
          onMenuToggle={() => setMenuOpen((v) => !v)}
        />

        {error && (
          <div className="panel error">{error}</div>
        )}

        <Routes>
          <Route path="/"          element={<DashboardPage data={data} />} />
          <Route path="/products"  element={<Menu />}      />
          <Route path="/orders"    element={<Orders />}     />
          <Route path="/customers" element={<User />}      />
          <Route path="/reviews"   element={<Review />}    />
          <Route path="/payments"  element={<Payments />}   />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings"  element={<Setting />}   />
        </Routes>

      </main>
    </div>
  );
}

// ================= PAGE TITLE =================
function getPageTitle(pathname) {
  const current = navLinks.find((item) => item.to === pathname);
  return current?.label || "DashboardPage";
}