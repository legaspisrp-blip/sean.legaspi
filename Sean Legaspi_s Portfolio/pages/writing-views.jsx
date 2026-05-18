// pages/writing-views.jsx - Reader and Composer for articles

function ArticleReader({ article, ownerMode, scheduled, onBack, onEdit, onDelete, onToggleFeatured }) {
  return (
    <div className="page-enter container article-reader">
      <span className="case-back mono" onClick={onBack}>← Back to Journal</span>

      <div className="article-head">
        <div className="article-meta mono">
          <span className="article-cat">{article.category}</span>
          <span className="article-dot">·</span>
          <span>{article.date}</span>
          <span className="article-dot">·</span>
          <span>{window.readTimeFromBlocks(article.blocks)}</span>
          {scheduled && <span className="article-feat mono" style={{ color: "#8a6500" }}>◴ SCHEDULED — PREVIEW ONLY</span>}
          {!scheduled && article.featured && <span className="article-feat mono">★ FEATURED</span>}
        </div>
        <h1 className="article-title">{article.title}</h1>
        {article.subtitle && <p className="article-sub serif">{article.subtitle}</p>}
      </div>

      <figure className="article-cover">
        <img src={article.cover} alt={article.title} />
      </figure>

      <article className="article-body">
        {(article.blocks || []).map((b, i) => {
          if (b.s === "h") return <h3 key={i} className="article-h">{b.t}</h3>;
          return <p key={i}>{b.t}</p>;
        })}
      </article>

      {ownerMode && (
        <div className="article-actions owner-actions">
          <button className="btn btn-ghost" onClick={onEdit}>Edit article</button>
          <button className="btn btn-ghost" onClick={onToggleFeatured}>
            {article.featured ? "★ Unfeature" : "☆ Feature"}
          </button>
          <button className="btn btn-ghost article-delete" onClick={onDelete}>Delete</button>
          <span className="mono owner-tag">OWNER MODE</span>
        </div>
      )}

      <div className="article-foot">
        <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
          Written by
        </div>
        <div className="serif" style={{ fontSize: 24 }}>Sean Rovick P. Legaspi</div>
        <p style={{ marginTop: 8, color: "var(--muted)", fontSize: 14 }}>
          Operations & Administrative Specialist · Metro Manila, PH
        </p>
      </div>
    </div>
  );
}

function isoToHuman(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function humanToIso(human) {
  const d = new Date(human);
  if (isNaN(d)) return "";
  return d.toISOString().slice(0, 10);
}

function ArticleComposer({ initial, onCancel, onSave }) {
  const initialIso = initial?.date ? humanToIso(initial.date) || window.todayIso() : window.todayIso();

  const [draft, setDraft] = React.useState({
    id: initial?.id || "",
    isNew: !initial,
    cover: initial?.cover || "",
    title: initial?.title || "",
    subtitle: initial?.subtitle || "",
    category: initial?.category || "Operations",
    dateIso: initialIso,
    featured: !!initial?.featured,
    blocks: initial?.blocks || [],
  });

  const blocksToText = (blocks) => (blocks || []).map(b => b.s === "h" ? "§ " + b.t : b.t).join("\n\n");
  const textToBlocks = (text) => text.split(/\n\n+/).map(seg => {
    const t = seg.trim();
    if (!t) return null;
    if (t.startsWith("§")) return { s: "h", t: t.replace(/^§\s*/, "") };
    return { s: "p", t };
  }).filter(Boolean);

  const [bodyText, setBodyText] = React.useState(blocksToText(draft.blocks));
  const onField = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  const wordCount = (bodyText || "").split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 220)) + " min";

  // Is this scheduled?
  const d = new Date(draft.dateIso + "T00:00:00");
  const isScheduled = d && !isNaN(d) && d.getTime() > Date.now() + 12 * 3600 * 1000; // grace period

  const save = (overrides = {}) => {
    const date = isoToHuman(draft.dateIso) || window.todayLabel();
    onSave({ ...draft, ...overrides, date, blocks: textToBlocks(bodyText) });
  };

  const publishNow = () => {
    const today = window.todayIso();
    setDraft({ ...draft, dateIso: today });
    setTimeout(() => save({ dateIso: today, date: isoToHuman(today) }), 50);
  };

  return (
    <div className="page-enter container composer">
      <span className="case-back mono" onClick={onCancel}>← {draft.isNew ? "Cancel" : "Cancel edit"}</span>

      <div className="composer-head">
        <div className="eyebrow mono">{draft.isNew ? "NEW ARTICLE" : "EDITING ARTICLE"} {isScheduled && <span style={{ color: "#8a6500", marginLeft: 8 }}>· SCHEDULED FOR {isoToHuman(draft.dateIso).toUpperCase()}</span>}</div>
        <h1 className="composer-h">{draft.isNew ? "New post." : "Edit."}</h1>
      </div>

      <div className="composer-grid">
        <div className="composer-main">
          <input
            className="composer-title"
            placeholder="Article title…"
            value={draft.title}
            onChange={onField("title")}
          />
          <input
            className="composer-subtitle"
            placeholder="One-line subtitle / hook…"
            value={draft.subtitle}
            onChange={onField("subtitle")}
          />
          <textarea
            className="composer-body"
            placeholder={`Write your article…\n\nTips:\n• Lines starting with § become section headings.\n• Blank lines separate paragraphs.`}
            rows={22}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        </div>

        <aside className="composer-side">
          <div className="composer-side-card">
            <h4 className="mono">PUBLISH</h4>
            <div className="form-row">
              <label>Publish date</label>
              <input
                type="date"
                value={draft.dateIso}
                onChange={onField("dateIso")}
              />
              <span className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                {isScheduled
                  ? `◴ Scheduled — goes live on ${isoToHuman(draft.dateIso)}`
                  : `✓ Will publish immediately on save`}
              </span>
            </div>
          </div>

          <div className="composer-side-card">
            <h4 className="mono">META</h4>
            <div className="form-row">
              <label>Category</label>
              <select value={draft.category} onChange={onField("category")}>
                {window.CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label>Cover image path</label>
              <input value={draft.cover} onChange={onField("cover")} placeholder="assets/articles/image1.jpg" />
            </div>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--ink-2)" }}>
              <input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
              Featured (show on top of journal)
            </label>
            <div className="composer-stats mono">
              <div><span>Words</span><b>{wordCount}</b></div>
              <div><span>Read</span><b>{readTime}</b></div>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => save()}
          >
            {isScheduled ? "Schedule" : (draft.isNew ? "Publish now" : "Save changes")} <span className="arrow">→</span>
          </button>

          {isScheduled && (
            <button
              className="btn btn-ghost"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={publishNow}
            >
              or publish now
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { ArticleReader, ArticleComposer, isoToHuman, humanToIso });
