// pages/case.jsx - case study detail (no employment dates)
function CasePage({ id, setRoute }) {
  const c = window.CASES.find((x) => x.id === id) || window.CASES[0];
  const idx = window.CASES.findIndex((x) => x.id === c.id);
  const next = window.CASES[(idx + 1) % window.CASES.length];

  const titleParts = c.company.split(" ");
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(" ");

  return (
    <div className="page-enter case container">
      <span className="case-back mono" onClick={() => setRoute({ name: "work" })}>
        ← Back to work
      </span>

      <div className="eyebrow mono" style={{ marginBottom: 18 }}>{c.industry}</div>
      <h1 className="case-title">
        {titleFirst} {titleRest && <em>{titleRest}</em>}
      </h1>
      <p className="case-sub">{c.tagline}</p>

      <div className="case-meta-row">
        <div><div className="k mono">Role</div><div className="v">{c.role}</div></div>
        <div><div className="k mono">Industry</div><div className="v">{c.industry}</div></div>
        <div><div className="k mono">Stack</div><div className="v">{c.stack.slice(0, 3).join(" · ")}</div></div>
        <div><div className="k mono">Engagement</div><div className="v">Remote</div></div>
      </div>

      <div className="case-body">
        <aside className="case-side">
          <div>
            <h4>Stack</h4>
            <ul>
              {c.stack.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h4>Outcome</h4>
            <ul>
              {c.outcomes.map((o, i) => <li key={i}>{o.n} - {o.l}</li>)}
            </ul>
          </div>
        </aside>

        <div>
          <div className="case-block">
            <h3>Overview</h3>
            <p>{c.overview}</p>
          </div>

          <div className="case-block">
            <h3>The problem</h3>
            <ul>
              {c.problem.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="case-block">
            <h3>What I did</h3>
            <ul>
              {c.approach.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>

          <div className="case-block">
            <h3>Outcomes</h3>
            <div className="outcome-grid">
              {c.outcomes.map((o, i) => (
                <div className="outcome-cell" key={i}>
                  <div className="n">{o.n}</div>
                  <div className="l">{o.l}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 24, fontStyle: "italic", fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.45, color: "var(--ink)" }}>
              "{c.quote}"
            </p>
          </div>

          <hr className="hairline" style={{ margin: "40px 0 28px" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Next case</div>
              <div className="serif" style={{ fontSize: 28, lineHeight: 1.1 }}>{next.company}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{next.role}</div>
            </div>
            <button className="btn btn-primary" onClick={() => setRoute({ name: "case", id: next.id })}>
              Next <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { CasePage });
