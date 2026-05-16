// pages/work.jsx — flat list, no current/past banding
function WorkPage({ setRoute }) {
  const cases = window.CASES;

  return (
    <div className="page-enter">
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={`§ WORK · ${String(cases.length).padStart(2, "0")} ROLES`}
            title="Selected engagements, <em>2019 to now</em>."
            desc="Each role below has a deep-dive with the problem, the approach, and the outcome. Click a row."
          />

          <div className="work-grid">
            {cases.map((c, i) => (
              <div className="work-row" key={c.id} onClick={() => setRoute({ name: "case", id: c.id })}>
                <div className="work-num mono">{String(i + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}</div>
                <div>
                  <div className="work-company">{c.company}</div>
                  <div className="work-role">{c.role}</div>
                </div>
                <div className="work-meta">{c.tagline.split(/[.:]/)[0]}.</div>
                <div className="work-meta">{c.industry}</div>
                <div className="work-cta">
                  Open <span>↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { WorkPage });
