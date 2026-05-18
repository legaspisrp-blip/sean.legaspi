// pages/writing.jsx - articles with scheduling + owner-gated editing

const ARTICLES_OVERRIDE_KEY = "sean_articles_overrides_v1";

function parseDate(s) {
  if (!s) return null;
  // Accept "May 17, 2026" or "2026-05-17" or anything Date parses
  const d = new Date(s);
  if (!isNaN(d)) return d;
  return null;
}

function loadArticles() {
  const seed = window.SEED_ARTICLES || [];
  let overrides = { edits: {}, deleted: [], added: [] };
  try {
    const raw = localStorage.getItem(ARTICLES_OVERRIDE_KEY);
    if (raw) overrides = { ...overrides, ...JSON.parse(raw) };
  } catch (e) {}
  const merged = seed
    .filter(a => !overrides.deleted.includes(a.id))
    .map(a => ({ ...a, ...(overrides.edits[a.id] || {}) }));
  return [...overrides.added, ...merged];
}

function saveOverrides(overrides) {
  try { localStorage.setItem(ARTICLES_OVERRIDE_KEY, JSON.stringify(overrides)); } catch (e) {}
}

function getOverrides() {
  try {
    const raw = localStorage.getItem(ARTICLES_OVERRIDE_KEY);
    if (raw) return { edits: {}, deleted: [], added: [], ...JSON.parse(raw) };
  } catch (e) {}
  return { edits: {}, deleted: [], added: [] };
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function todayIso() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function isScheduled(a) {
  const d = parseDate(a.date);
  return d && d.getTime() > Date.now();
}

function readTimeFromBlocks(blocks) {
  const words = (blocks || []).map(b => (b.t || "").split(/\s+/).filter(Boolean).length).reduce((a,b)=>a+b, 0);
  return Math.max(1, Math.round(words / 220)) + " min read";
}

const CATEGORIES = ["All", "Operations", "Marketing", "Productivity", "Personal Brand", "Strategy", "Sales", "Notes"];

function WritingPage({ setRoute, ownerMode, onLogout, onLogin }) {
  const [articles, setArticles] = React.useState(loadArticles);
  const [view, setView] = React.useState({ mode: "list" });
  const [category, setCategory] = React.useState("All");
  const [showScheduled, setShowScheduled] = React.useState(false);

  const onSave = (draft) => {
    const overrides = getOverrides();
    if (draft.isNew) {
      const id = "user-" + Date.now();
      const newArt = {
        id,
        cover: draft.cover || (window.SEED_ARTICLES[0]?.cover || ""),
        title: draft.title || "Untitled",
        date: draft.date || todayLabel(),
        subtitle: draft.subtitle || "",
        category: draft.category || "Notes",
        featured: !!draft.featured,
        blocks: draft.blocks || [],
        userAdded: true,
      };
      overrides.added = [newArt, ...overrides.added];
      saveOverrides(overrides);
      setArticles(loadArticles());
      setView({ mode: "read", id });
    } else {
      const isUser = articles.find(a => a.id === draft.id)?.userAdded;
      if (isUser) {
        overrides.added = overrides.added.map(a => a.id === draft.id ? { ...a, ...draft } : a);
      } else {
        overrides.edits[draft.id] = {
          title: draft.title, subtitle: draft.subtitle, category: draft.category,
          date: draft.date, featured: draft.featured, blocks: draft.blocks, cover: draft.cover,
        };
      }
      saveOverrides(overrides);
      setArticles(loadArticles());
      setView({ mode: "read", id: draft.id });
    }
  };

  const onDelete = (id) => {
    if (!confirm("Delete this article?")) return;
    const overrides = getOverrides();
    if (overrides.added.find(a => a.id === id)) {
      overrides.added = overrides.added.filter(a => a.id !== id);
    } else {
      overrides.deleted = [...new Set([...overrides.deleted, id])];
      delete overrides.edits[id];
    }
    saveOverrides(overrides);
    setArticles(loadArticles());
    setView({ mode: "list" });
  };

  const onResetAll = () => {
    if (!confirm("Reset all article edits, deletions, and additions to defaults?")) return;
    localStorage.removeItem(ARTICLES_OVERRIDE_KEY);
    setArticles(loadArticles());
  };

  const onToggleFeatured = (id) => {
    const a = articles.find(x => x.id === id);
    if (!a) return;
    onSave({ ...a, featured: !a.featured });
  };

  if (view.mode === "compose" || view.mode === "edit") {
    if (!ownerMode) return null; // safety
    const editing = view.mode === "edit" ? articles.find(a => a.id === view.id) : null;
    return <ArticleComposer initial={editing} onCancel={() => setView(editing ? { mode: "read", id: editing.id } : { mode: "list" })} onSave={onSave} />;
  }
  if (view.mode === "read") {
    const a = articles.find(x => x.id === view.id);
    if (!a) return null;
    // Hide scheduled articles from non-owners
    if (!ownerMode && isScheduled(a)) {
      return (
        <div className="page-enter container" style={{ padding: "80px 0", textAlign: "center" }}>
          <div className="eyebrow mono" style={{ justifyContent: "center", display: "flex", marginBottom: 18 }}>ARTICLE NOT YET PUBLISHED</div>
          <h1 className="serif" style={{ fontSize: 36 }}>Coming soon.</h1>
          <p style={{ color: "var(--muted)", marginTop: 12 }}>This article goes live on {a.date}.</p>
          <button className="btn btn-ghost" style={{ marginTop: 24 }} onClick={() => setView({ mode: "list" })}>← Back to Journal</button>
        </div>
      );
    }
    return <ArticleReader article={a}
      ownerMode={ownerMode}
      scheduled={isScheduled(a)}
      onBack={() => setView({ mode: "list" })}
      onEdit={() => setView({ mode: "edit", id: a.id })}
      onDelete={() => onDelete(a.id)}
      onToggleFeatured={() => onToggleFeatured(a.id)} />;
  }

  // List view
  // Visitors see only published. Owner sees everything, with optional toggle to focus on scheduled.
  const visible = ownerMode
    ? (showScheduled ? articles.filter(isScheduled) : articles)
    : articles.filter(a => !isScheduled(a));

  const filtered = visible.filter(a => category === "All" || a.category === category);
  const featured = visible.filter(a => a.featured);

  const scheduledCount = articles.filter(isScheduled).length;

  return (
    <div className="page-enter">
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={`§ JOURNAL · ${visible.length} ARTICLES${ownerMode ? ` · ${scheduledCount} SCHEDULED` : ""}`}
            title="What I've been <em>thinking about</em>."
            desc="Practical operations notes: SOPs, inbox routines, sourcing scorecards, KOL screening, sales conversations. Click an article to read."
          />

          {ownerMode && (
            <div className="journal-bar owner-bar">
              <button className="btn btn-primary" onClick={() => setView({ mode: "compose" })}>
                + Write a new article
              </button>
              <button
                className={"btn btn-ghost" + (showScheduled ? " active-tone" : "")}
                onClick={() => setShowScheduled(!showScheduled)}
                title="Show only articles scheduled for the future"
              >
                {showScheduled ? "Showing scheduled only" : `Scheduled (${scheduledCount})`}
              </button>
              <button className="btn btn-ghost" onClick={onResetAll}>Reset to defaults</button>
              <span className="mono owner-tag">OWNER · </span>
              <button className="mono owner-tag-link" onClick={onLogout}>LOG OUT</button>
            </div>
          )}

          {!ownerMode && featured.length > 0 && category === "All" && (
            <div className="featured-block">
              <div className="featured-head">
                <h3 className="featured-h serif">Featured</h3>
                <span className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {featured.length} hand-picked
                </span>
              </div>
              <div className="featured-grid">
                {featured.slice(0, 3).map((a, i) => (
                  <article key={a.id} className={"feat-article " + (i === 0 ? "feat-hero" : "")} onClick={() => setView({ mode: "read", id: a.id })}>
                    <div className="feat-cover" style={{ backgroundImage: `url(${a.cover})` }}>
                      <span className="feat-cat mono">{a.category}</span>
                    </div>
                    <div className="feat-body">
                      <div className="feat-date mono">{a.date}</div>
                      <h4 className="feat-title">{a.title}</h4>
                      <p className="feat-sub">{a.subtitle}</p>
                      <span className="feat-read mono">Read article →</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          <div className="cat-bar">
            <div className="cat-pills">
              {CATEGORIES.map(c => {
                const count = c === "All" ? visible.length : visible.filter(a => a.category === c).length;
                if (c !== "All" && count === 0) return null;
                return (
                  <button
                    key={c}
                    className={"cat-pill" + (category === c ? " active" : "")}
                    onClick={() => setCategory(c)}
                  >
                    {c} <span className="mono">{String(count).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="articles-grid">
            {filtered.map(a => {
              const sched = isScheduled(a);
              return (
                <article key={a.id} className={"art-card" + (sched ? " art-scheduled" : "")} onClick={() => setView({ mode: "read", id: a.id })}>
                  <div className="art-cover" style={{ backgroundImage: `url(${a.cover})` }}>
                    {sched && <span className="art-flag art-flag-sched mono">◴ SCHEDULED</span>}
                    {!sched && a.featured && <span className="art-flag mono">★ Featured</span>}
                  </div>
                  <div className="art-body">
                    <div className="art-meta mono">
                      <span>{a.category}</span>
                      <span>{a.date}</span>
                    </div>
                    <h4 className="art-title">{a.title}</h4>
                    <p className="art-sub">{a.subtitle}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state mono">No articles in <b>{category}</b> yet.</div>
          )}

          <div className="journal-card">
            <div>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Find me on</div>
              <div className="serif" style={{ fontSize: 22 }}>{window.PROFILE.linkedin}</div>
            </div>
            <button className="btn btn-ghost" onClick={() => window.open(window.PROFILE.linkedinUrl, "_blank")}>
              Visit LinkedIn <span className="arrow">↗</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { WritingPage, loadArticles, getOverrides, saveOverrides, todayLabel, todayIso, readTimeFromBlocks, CATEGORIES, isScheduled, parseDate });
