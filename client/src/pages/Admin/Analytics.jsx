import React from "react";
import KpiCard from "../../components/KpiCard.jsx";
import { FiTrendingUp, FiUsers, FiShoppingCart, FiDollarSign, FiBarChart2, FiPieChart } from "react-icons/fi";
import "../../style/AdminCSS/analytics.css";

const Analytics = () => {
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "12.5%",
      icon: <FiDollarSign />,
      iconClass: "green"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "8.2%",
      icon: <FiShoppingCart />,
      iconClass: "blue"
    },
    {
      title: "Active Customers",
      value: "567",
      change: "15.3%",
      icon: <FiUsers />,
      iconClass: "orange"
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "5.7%",
      icon: <FiTrendingUp />,
      iconClass: "teal"
    }
  ];

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Track your canteen's performance and insights</p>
      </div>

      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            iconClass={kpi.iconClass}
          />
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-panel">
          <div className="panel-head">
            <FiBarChart2 />
            <h4>Sales Trend</h4>
          </div>
          <div className="chart-placeholder">
            <FiBarChart2 size={48} />
            <p>Chart visualization coming soon</p>
          </div>
        </div>

        <div className="chart-panel">
          <div className="panel-head">
            <FiPieChart />
            <h4>Order Distribution</h4>
          </div>
          <div className="chart-placeholder">
            <FiPieChart size={48} />
            <p>Chart visualization coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;