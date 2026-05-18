// pages/about.jsx
function AboutPage({ setRoute }) {
  return (
    <div className="page-enter">
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="§ ABOUT"
            title="A short <em>story</em> about how I work."
            desc="Bachelor of Science in Accountancy from Sorsogon State University. Six years of operations work across many industries, all remote."
          />

          <div className="about-grid">
            <div className="about-portrait">
              <div className="portrait-stage">
                <img src={window.PROFILE.photo} alt={window.PROFILE.name} className="portrait-img" />
                <div className="portrait-tag mono">SEAN · 2026</div>
              </div>
              <div className="portrait-meta mono">
                <div><span>Name</span>Sean Rovick P.</div>
                <div><span>Based</span>Metro Manila, PH</div>
                <div><span>Languages</span>EN · TL</div>
                <div><span>Education</span>BS Accountancy</div>
                <div><span>Working since</span>2019</div>
                <div><span>Status</span>Open</div>
              </div>
            </div>

            <div className="about-text">
              <p className="lead">
                I'm <em>Sean Rovick</em>. Drawn to structure. Not for its own sake, because well-designed structure is what lets a small team punch above its weight.
              </p>
              <p>
                I started out doing freelance writing and research while I finished my accountancy degree at Sorsogon State University. From there I moved through data entry at a real-estate firm, inventory auditing across retail stores, and the back office of a B2B e-commerce business, where I learned that documentation, AR follow-up, and FBA replenishment all live or die on the same skill: keeping clean systems running quietly.
              </p>
              <p>
                Since then I've added crypto KOL research, Amazon procurement, healthcare operations, accounting support, sales database hygiene, and visa processing. Currently I'm running four parallel engagements that span all of those disciplines. The thread connecting them is the same: find the bottleneck, write down the process, and put the right person on the right task with the right tool.
              </p>
              <p>
                Outside of work I read about the workflows of other operators. Notion templates, ops blogs, healthcare RCM, FBA threads. I write up what I learn in the Journal section of this site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="§ TIMELINE"
            title="Where I've <em>been.</em>"
            desc="The full list of roles, listed in order of relevance. Current engagements first, then past, then the first one."
          />
          <div className="timeline">
            {window.TIMELINE.map((t, i) => (
              <React.Fragment key={i}>
                <div className="tl-year mono">{t.year}</div>
                <div className="tl-main">
                  <div className="tl-role">{t.role}</div>
                  <div className="tl-co mono">{t.co}</div>
                </div>
                <div className="tl-side">{t.note}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="§ CAPABILITIES"
            title="A toolkit, <em>compounded</em>."
            desc="Skills built on real work, not certifications-as-decoration."
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
            eyebrow="§ TOOLS"
            title="What I use, <em>every day</em>."
            desc="Tools earned through real reps across operations, accounting, sales, e-commerce, marketing, and AI."
          />
          <ToolsGrid />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead
            eyebrow="§ CERTS"
            title="Stamped & <em>verified</em>."
            desc="Continuing education in bookkeeping, healthcare compliance, and accounting practice management."
          />
          <div className="cert-grid">
            {window.CERTS.map((c, i) => (
              <div className="cert" key={i}>
                <div className="cert-mark mono">{c.mark}</div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">{c.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { AboutPage });
