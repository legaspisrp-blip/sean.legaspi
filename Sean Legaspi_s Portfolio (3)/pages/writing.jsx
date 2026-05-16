// pages/writing.jsx - articles powered by SEED_ARTICLES, with owner-mode gated editing
const ARTICLES_OVERRIDE_KEY = "sean_articles_overrides_v1";

// Load articles: SEED_ARTICLES + overrides (edits / deletes / additions) from localStorage
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

function readTimeFromBlocks(blocks) {
  const words = (blocks || []).map(b => (b.t || "").split(/\s+/).filter(Boolean).length).reduce((a,b)=>a+b, 0);
  return Math.max(1, Math.round(words / 220)) + " min read";
}

const CATEGORIES = ["All", "Operations", "Marketing", "Productivity", "Personal Brand", "Strategy", "Sales", "Notes"];

function WritingPage({ setRoute, ownerMode }) {
  const [articles, setArticles] = React.useState(loadArticles);
  const [view, setView] = React.useState({ mode: "list" });
  const [category, setCategory] = React.useState("All");
  const [showFeatured, setShowFeatured] = React.useState(true);

  const persist = (next) => {
    setArticles(next);
  };

  // Owner actions
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
      // Editing existing
      const isUser = articles.find(a => a.id === draft.id)?.userAdded;
      if (isUser) {
        overrides.added = overrides.added.map(a => a.id === draft.id ? { ...a, ...draft } : a);
      } else {
        overrides.edits[draft.id] = {
          title: draft.title, subtitle: draft.subtitle, category: draft.category,
          date: draft.date, featured: draft.featured, blocks: draft.blocks,
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
    const editing = view.mode === "edit" ? articles.find(a => a.id === view.id) : null;
    return <ArticleComposer initial={editing} onCancel={() => setView(editing ? { mode: "read", id: editing.id } : { mode: "list" })} onSave={onSave} />;
  }
  if (view.mode === "read") {
    const a = articles.find(x => x.id === view.id);
    if (!a) return null;
    return <ArticleReader article={a}
      ownerMode={ownerMode}
      onBack={() => setView({ mode: "list" })}
      onEdit={() => setView({ mode: "edit", id: a.id })}
      onDelete={() => onDelete(a.id)}
      onToggleFeatured={() => onToggleFeatured(a.id)} />;
  }

  const filtered = articles.filter(a => category === "All" || a.category === category);
  const featured = articles.filter(a => a.featured);

  return (
    <div className="page-enter">
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={`§ JOURNAL · ${articles.length} ARTICLES`}
            title="What I've been <em>thinking about</em>."
            desc="Practical operations notes: SOPs, inbox routines, sourcing scorecards, KOL screening, sales conversations. Click an article to read."
          />

          {/* Owner-only actions row */}
          {ownerMode && (
            <div className="journal-bar owner-bar">
              <button className="btn btn-primary" onClick={() => setView({ mode: "compose" })}>
                + Write a new article
              </button>
              <button className="btn btn-ghost" onClick={onResetAll}>
                Reset all to defaults
              </button>
              <span className="mono owner-tag">OWNER MODE · changes are visible only on this device</span>
            </div>
          )}

          {/* Featured */}
          {featured.length > 0 && category === "All" && showFeatured && (
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

          {/* Filter bar */}
          <div className="cat-bar">
            <div className="cat-pills">
              {CATEGORIES.map(c => {
                const count = c === "All" ? articles.length : articles.filter(a => a.category === c).length;
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

          {/* Article grid */}
          <div className="articles-grid">
            {filtered.map(a => (
              <article key={a.id} className="art-card" onClick={() => setView({ mode: "read", id: a.id })}>
                <div className="art-cover" style={{ backgroundImage: `url(${a.cover})` }}>
                  {a.featured && <span className="art-flag mono">★ Featured</span>}
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
            ))}
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

Object.assign(window, { WritingPage, loadArticles, getOverrides, saveOverrides, todayLabel, readTimeFromBlocks, CATEGORIES });
