// pages/home.jsx
function HomePage({ setRoute, tweaks }) {
  const featured = window.CASES.slice(0, 4);
  return (
    <div className="page-enter">
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="container" style={{ position: "relative" }}>
          <div className="hero-meta mono">
            <span>SEAN R. LEGASPI · PORTFOLIO 2026</span>
            <div className="hero-r" style={{ display: "flex", gap: 24 }}>
              <span><span className="live-dot" style={{ marginRight: 8 }}></span>Available · Remote</span>
            </div>
          </div>

          <h1 className="hero-title">
            Building <em>structure</em> where there is <span className="strike">chaos</span>.
          </h1>

          <div className="hero-row">
            <p className="hero-blurb">
              I'm <b>Sean Rovick P. Legaspi</b>, an operations and administrative specialist with six years of work across healthcare, Web3 research, Amazon, immigration services, and B2B e-commerce. My job is to organize complex workflows, ship documentation, and make the back office of a business run quietly in the background.
            </p>
            <div className="hero-side mono">
              <div className="hero-side-row"><span>Based in</span><b>Metro Manila, PH</b></div>
              <div className="hero-side-row"><span>Status</span><b>Open to remote</b></div>
              <div className="hero-side-row"><span>Stack</span><b>Ops · Data · Administrative</b></div>
              <div className="hero-side-row"><span>Since</span><b>2019</b></div>
            </div>
          </div>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => setRoute({ name: "work" })}>
              See selected work <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => setRoute({ name: "contact" })}>
              Get in touch
            </button>
          </div>

          <div className="metrics-strip">
            {window.METRICS.map((m, i) => (
              <div className="metric" key={i}>
                <div className="metric-tick mono">{String(i + 1).padStart(2, "0")} / 04</div>
                <div className="metric-num">
                  {m.num}<sup>{m.sup}</sup>
                </div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="§ SELECTED WORK"
            title="A working <em>portfolio</em> of operations roles."
            desc="A cross-section of healthcare ops, Web3 research, Amazon procurement, executive support, and accounting. Click any card for the deep-dive."
          />

          <div className="feat-grid">
            {featured.map((c) => (
              <article key={c.id} className="feat-card" onClick={() => setRoute({ name: "case", id: c.id })}>
                <div className="feat-card-head">
                  <div>
                    <h3 className="feat-card-name">{c.company}</h3>
                    <div className="feat-card-role">{c.role}</div>
                  </div>
                  <span className="tag mono">{c.industry}</span>
                </div>
                <p className="feat-card-blurb">{c.tagline}</p>
                <div className="feat-card-stats">
                  {c.outcomes.map((o, i) => (
                    <div className="feat-stat" key={i}>
                      <div className="n">{o.n}</div>
                      <div className="l">{o.l}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={() => setRoute({ name: "work" })}>
              View all 11 roles <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="§ WHAT I DO"
            title="The work behind the <em>work.</em>"
            desc="Three buckets of capability that compound. Most engagements use all three."
          />
          <div className="skills-grid">
            {window.SKILLS.map((s, i) => (
              <div className="skill-col" key={i}>
                <h4>{s.h}</h4>
                <ul>
                  {s.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="§ TOOLS & STACK"
            title="The toolkit, <em>day to day</em>."
            desc="Tools I've earned my reps on across roles, grouped by what they're for."
          />
          <ToolsGrid />
        </div>
      </section>
    </div>
  );
}

function ToolsGrid() {
  const groups = window.TOOLS.reduce((acc, t) => {
    (acc[t.group] = acc[t.group] || []).push(t);
    return acc;
  }, {});
  const order = ["Productivity", "Workspace", "Finance", "Sales", "E-commerce", "Marketing", "AI"];
  return (
    <div className="tools-stack">
      {order.map((g) => groups[g] ? (
        <div className="tools-group" key={g}>
          <h4 className="tools-group-h mono">{g}</h4>
          <div className="tools-row">
            {groups[g].map((t) => (
              <div className="tool-chip" key={t.name} title={t.name}>
                <img
                  className="tool-logo"
                  src={`https://cdn.simpleicons.org/${t.slug}/${t.color.replace("#", "")}`}
                  alt={t.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="tool-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null)}
    </div>
  );
}

Object.assign(window, { HomePage, ToolsGrid });
