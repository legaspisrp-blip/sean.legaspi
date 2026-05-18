// components.jsx - shared bits used across pages

function Nav({ route, setRoute, dark, setDark }) {
  const items = [
    { id: "home", label: "Index" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "writing", label: "Journal" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="brand" onClick={() => setRoute({ name: "home" })}>
          <div className="brand-mark">S</div>
          <div className="brand-text">
            <span className="brand-name">Sean R. Legaspi</span>
            <span className="brand-role mono">OPS · ADMIN · RESEARCH</span>
          </div>
        </div>
        <nav className="nav-links">
          {items.map((it) => (
            <span
              key={it.id}
              className={"nav-link" + (route.name === it.id || (route.name === "case" && it.id === "work") || (route.name === "article" && it.id === "writing") ? " active" : "")}
              onClick={() => setRoute({ name: it.id })}
            >
              {it.label}
            </span>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="theme-btn"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            onClick={() => setDark(!dark)}
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button className="nav-cta" onClick={() => setRoute({ name: "contact" })}>
            <span className="dot"></span>
            Available · Hire me
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ setRoute, onLoginClick, authed }) {
  const [time, setTime] = React.useState(getManilaTime());
  React.useEffect(() => {
    const t = setInterval(() => setTime(getManilaTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-big">Let's build it.</div>
        <hr className="hairline" style={{ marginTop: 24, marginBottom: 24 }} />
        <div className="footer-inner">
          <div>
            © 2026 · Sean Rovick P. Legaspi
            {/* tiny owner dot — clicking opens login. Looks like a decorative bullet to visitors. */}
            <span
              className="owner-dot"
              role="button"
              aria-label="Owner login"
              title="Owner login"
              onClick={onLoginClick}
            >·</span>
            {authed && <span className="mono owner-tag" style={{ marginLeft: 8 }}>OWNER</span>}
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span><span className="live-dot" style={{ marginRight: 8 }}></span>Manila · {time}</span>
            <span onClick={() => setRoute({ name: "contact" })} style={{ cursor: "pointer" }}>↳ legaspi.srp@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function getManilaTime() {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const ph = new Date(utc + 8 * 3600000);
  return ph.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

function Marquee() {
  const words = window.SKILL_KEYWORDS;
  const phrases = words.concat(words);
  return (
    <div className="marquee">
      <div className="marquee-track">
        {phrases.concat(phrases).map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ title, desc, eyebrow }) {
  return (
    <div className="section-head">
      <div>
        <div className="section-num mono">{eyebrow}</div>
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div style={{ alignSelf: "end" }}>
        <p className="section-desc">{desc}</p>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Footer, Marquee, SectionHead, getManilaTime });
