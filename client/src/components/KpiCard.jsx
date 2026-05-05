export default function KpiCard({ title, value, change, icon, iconClass }) {
  return (
    <article className="kpi-card">
      <div className="kpi-main">
        <div>
          <p>{title}</p>
          <h3>{value}</h3>
          <small>^ {change}</small>
        </div>
        <div className={`kpi-icon ${iconClass}`}>{icon}</div>
      </div>
    </article>
  );
}