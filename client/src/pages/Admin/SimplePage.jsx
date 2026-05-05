export default function SimplePage({ title }) {
  return (
    <section className="single-grid">
      <article className="panel">
        <div className="panel-head">
          <h4>{title}</h4>
        </div>
        <p className="muted">This page is ready. You can add table/form data now.</p>
      </article>
    </section>
  );
}