import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// User Pages
import Landing        from "./pages/Landing";
import Home           from "./pages/Home";
import Favorite       from "./pages/User/Favorite";
import Order          from "./pages/User/Order";
import Cart           from "./pages/User/Cart";
import Profile        from "./pages/User/Profile";
import Payment        from "./pages/User/Payment";
import HelpSupport    from "./pages/User/HelpSupport";
import Contact        from "./pages/User/Contact";
import TermsCondition from "./pages/User/TermsCondition";
import About          from "./pages/User/About";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import Notification   from "./pages/User/Notification";
 
// Admin Components
import Sidebar        from "./components/Sidebar";
import Topbar         from "./components/Topbar";
import ProtectedRoute from "./components/ProtectedRoute";
 
// Admin Pages
import DashboardPage from "./pages/Admin/DashboardPage";
import Menu          from "./pages/Admin/Menu";
import Orders        from "./pages/Admin/Orders";
import User          from "./pages/Admin/User";
import Review        from "./pages/Admin/Review";
import Payments      from "./pages/Admin/Payments";
import Analytics     from "./pages/Admin/Analytics";
import Setting       from "./pages/Admin/Setting";
 
import { getDashboardData } from "./services/api";
 
// Styles
import "./style/AdminCSS/sidebar.css";
import "./style/AdminCSS/topbar.css";
import "./style/AdminCSS/dashboard.css";
 
/* ─────────────────────────────────────────────────────────────
   ✅ UserRoute — blocks unauthenticated users & admins from
   accessing user pages. Safe JSON.parse with try/catch.
───────────────────────────────────────────────────────────── */
function UserRoute({ children }) {
  const token = localStorage.getItem("token");
 
  // ✅ Safe parse — prevents crash if stored value is malformed
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }
 
  // Not logged in at all → go to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
 
  // Admin trying to access user pages → clear session → go to login
  if (user.role === "admin") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
 
  // Regular user → allow through
  return children;
}
 
/* ─────────────────────────────────────────────────────────────
   Admin nav links
───────────────────────────────────────────────────────────── */
const navLinks = [
  { to: "/admin",           label: "Dashboard", icon: "grid"     },
  { to: "/admin/products",  label: "Menu",      icon: "package"  },
  { to: "/admin/orders",    label: "Order",     icon: "bag"      },
  { to: "/admin/customers", label: "Customer",  icon: "users"    },
  { to: "/admin/reviews",   label: "Review",    icon: "star"     },
  { to: "/admin/payments",  label: "Payment",   icon: "dollar"   },
  { to: "/admin/analytics", label: "Analytics", icon: "clock"    },
  { to: "/admin/settings",  label: "Setting",   icon: "settings" },
];
 
function getPageTitle(pathname) {
  const current = navLinks.find((item) => item.to === pathname);
  return current?.label || "Dashboard";
}
 
const MOBILE_BREAKPOINT = 960;
 
/* ─────────────────────────────────────────────────────────────
   Admin Layout
───────────────────────────────────────────────────────────── */
function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(window.innerWidth > MOBILE_BREAKPOINT);
  const [data, setData]         = useState(null);
  const [error, setError]       = useState("");
  const location                = useLocation();
 
  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch(() => setError("Could not load dashboard data"));
  }, []);
 
  useEffect(() => {
    const handleResize = () => {
      setMenuOpen(window.innerWidth > MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  useEffect(() => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setMenuOpen(false);
    }
  }, [location.pathname]);
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // back to Landing
  };
 
  return (
    <div className="app-shell">
      <Sidebar menuOpen={menuOpen} navLinks={navLinks} onLogout={handleLogout} />
 
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
 
      <main className="main-content">
        <Topbar
          title={getPageTitle(location.pathname)}
          onMenuToggle={() => setMenuOpen((v) => !v)}
        />
 
        {error && <div className="panel error">{error}</div>}
 
        <Routes>
          <Route index            element={<DashboardPage data={data} />} />
          <Route path="products"  element={<Menu />}      />
          <Route path="orders"    element={<Orders />}    />
          <Route path="customers" element={<User />}      />
          <Route path="reviews"   element={<Review />}    />
          <Route path="payments"  element={<Payments />}  />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings"  element={<Setting />}   />
        </Routes>
      </main>
    </div>
  );
}
 
/* ─────────────────────────────────────────────────────────────
   Root App
───────────────────────────────────────────────────────────── */
function App() {
  return (
    <Routes>
 
      {/* Public — Landing */}
      <Route path="/"         element={<Landing />}  />
 
      {/* Public — Auth */}
      <Route path="/login"    element={<Login />}    />
      <Route path="/register" element={<Register />} />
 
      {/* ✅ User Routes — protected by UserRoute */}
      <Route path="/home"          element={<UserRoute><Home /></UserRoute>}           />
      <Route path="/favorites"     element={<UserRoute><Favorite /></UserRoute>}       />
      <Route path="/orders"        element={<UserRoute><Order /></UserRoute>}          />
      <Route path="/cart"          element={<UserRoute><Cart /></UserRoute>}           />
      <Route path="/profile"       element={<UserRoute><Profile /></UserRoute>}        />
      <Route path="/payment"       element={<UserRoute><Payment /></UserRoute>}        />
      <Route path="/help"          element={<UserRoute><HelpSupport /></UserRoute>}    />
      <Route path="/contact"       element={<UserRoute><Contact /></UserRoute>}        />
      <Route path="/terms"         element={<UserRoute><TermsCondition /></UserRoute>} />
      <Route path="/about"         element={<UserRoute><About /></UserRoute>}          />
      <Route path="/notifications" element={<UserRoute><Notification /></UserRoute>}   />
 
      {/* Admin Routes — protected by ProtectedRoute */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      />
 
      {/* Wildcard → Landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
 
    </Routes>
  );
}
 
export default App;
