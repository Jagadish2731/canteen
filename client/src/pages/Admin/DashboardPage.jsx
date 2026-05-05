import {
  FiActivity,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import KpiCard from "../../components/KpiCard";

export default function DashboardPage({ data }) {
  const totalOrders = data?.stats?.totalOrders ?? 0;

  return (
    <div className="dashboard-page">

      {/* ── Header (mirrors .menu-header) ── */}
      <div className="dashboard-header">
        <h1>🍽️ Canteen Dashboard</h1>
        <p>Welcome back! Here's your daily overview.</p>
      </div>

      {/* ── KPI Cards ── */}
      <section className="kpi-grid">
        <KpiCard
          title="Total Revenue"
          value="Rs 0"
          change="+12.5%"
          icon={<FiDollarSign />}
          iconClass="green"
        />
        <KpiCard
          title="Total Orders"
          value={totalOrders}
          change="+8.2%"
          icon={<FiShoppingBag />}
          iconClass="blue"
        />
        <KpiCard
          title="Pending Orders"
          value={Math.max(totalOrders, 0)}
          change="0 active"
          icon={<FiClock />}
          iconClass="orange"
        />
        <KpiCard
          title="Completed Today"
          value="0"
          change="Today"
          icon={<FiActivity />}
          iconClass="teal"
        />
      </section>

      {/* ── Content Grid ── */}
      <section className="dash-content-grid">

        {/* Mini Stats panel */}
        <article className="dash-panel">
          <div className="dash-panel-head">
            <h3>Overview</h3>
          </div>
          <div className="mini-stat">
            <div className="mini-icon purple-icon">
              <FiPackage />
            </div>
            <div>
              <p className="mini-label">Avg Order Value</p>
              <h4 className="mini-value">Rs 0</h4>
            </div>
          </div>
          <div className="mini-stat">
            <div className="mini-icon orange-icon">
              <FiUsers />
            </div>
            <div>
              <p className="mini-label">Total Customers</p>
              <h4 className="mini-value">0</h4>
            </div>
          </div>
        </article>

        {/* Quick Stats panel */}
        <article className="dash-panel">
          <div className="dash-panel-head">
            <h3>Quick Stats</h3>
          </div>
          <div className="quick-stats-grid">
            <div className="quick-stat qs-green">
              <p>Completion Rate</p>
              <h3>0%</h3>
            </div>
            <div className="quick-stat qs-blue">
              <p>Today's Revenue</p>
              <h3>Rs 0</h3>
            </div>
            <div className="quick-stat qs-pink">
              <p>Customer Satisfaction</p>
              <h3>⭐ 0</h3>
            </div>
            <div className="quick-stat qs-purple">
              <p>Popular Item</p>
              <h3>🍕 Pizza</h3>
            </div>
          </div>
        </article>

      </section>
    </div>
  );
}
