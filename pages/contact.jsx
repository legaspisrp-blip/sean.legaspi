// pages/contact.jsx
function ContactPage({ setRoute }) {
  const [form, setForm] = React.useState({ name: "", email: "", company: "", topic: "Operations / SOPs", message: "" });
  const [status, setStatus] = React.useState({ state: "idle", msg: "" });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", msg: "Sending…" });

    try {
      const res = await fetch("https://formsubmit.co/ajax/legaspi.srp@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          topic: form.topic,
          message: form.message,
          _subject: `Portfolio message · ${form.topic} · from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === "true" || data.success === true || res.status === 200)) {
        setStatus({ state: "sent", msg: "Sent. Sean will reply within a working day, Manila time." });
        setForm({ name: "", email: "", company: "", topic: "Operations / SOPs", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setStatus({
        state: "error",
        msg: "Couldn't send through the form. Please email legaspi.srp@gmail.com directly.",
      });
    }
  };

  const onField = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const mailtoLink = () => {
    const subj = `Portfolio message · ${form.topic || "General"}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Topic: ${form.topic}`,
      "",
      form.message,
    ].join("\n");
    return `mailto:legaspi.srp@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="page-enter">
      <section className="contact container">
        <div className="contact-grid">
          <div>
            <div className="eyebrow mono" style={{ marginBottom: 24 }}>§ CONTACT</div>
            <h1 className="contact-h">
              Tell me what's <em>broken.</em>
            </h1>
            <p className="contact-blurb">
              Inbox overflowing, SOPs missing, FBA inventory misbehaving, or you need someone to screen a list of KOLs by Friday? Send a note - I usually reply within a working day, Manila time.
            </p>

            <div className="contact-channels">
              <a className="contact-ch" href="mailto:legaspi.srp@gmail.com">
                <div className="contact-ch-l">
                  <span className="contact-ch-k mono">EMAIL</span>
                  <span className="contact-ch-v">legaspi.srp@gmail.com</span>
                </div>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>↗</span>
              </a>
              <a className="contact-ch" href="https://www.linkedin.com/in/sean-legaspi-543a7b355" target="_blank" rel="noopener noreferrer">
                <div className="contact-ch-l">
                  <span className="contact-ch-k mono">LINKEDIN</span>
                  <span className="contact-ch-v">/in/sean-legaspi-543a7b355</span>
                </div>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>↗</span>
              </a>
              <a className="contact-ch" href="tel:+639506170178">
                <div className="contact-ch-l">
                  <span className="contact-ch-k mono">PHONE / WHATSAPP</span>
                  <span className="contact-ch-v">+63 950 617 0178</span>
                </div>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>↗</span>
              </a>
              <button
                className="contact-ch"
                style={{ border: "1px solid var(--ink)", background: "var(--ink)", color: "var(--bg)", cursor: "pointer" }}
                onClick={downloadResume}
              >
                <div className="contact-ch-l">
                  <span className="contact-ch-k mono" style={{ color: "color-mix(in oklab, var(--bg) 60%, transparent)" }}>RESUME · PDF</span>
                  <span className="contact-ch-v">Generate CV from this site → print to PDF</span>
                </div>
                <span className="mono" style={{ fontSize: 11 }}>↓</span>
              </button>
            </div>
          </div>

          <form className="form" onSubmit={submit}>
            <div className="form-row row-two">
              <div className="form-row">
                <label>Name</label>
                <input required value={form.name} onChange={onField("name")} placeholder="Your name" />
              </div>
              <div className="form-row">
                <label>Email</label>
                <input required type="email" value={form.email} onChange={onField("email")} placeholder="you@company.com" />
              </div>
            </div>
            <div className="form-row">
              <label>Company / org (optional)</label>
              <input value={form.company} onChange={onField("company")} placeholder="Where you're writing from" />
            </div>
            <div className="form-row">
              <label>Topic</label>
              <select value={form.topic} onChange={onField("topic")}>
                <option>Operations / SOPs</option>
                <option>E-commerce / Amazon</option>
                <option>Web3 / KOL research</option>
                <option>Healthcare admin</option>
                <option>Bookkeeping / data ops</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="form-row">
              <label>What's the project</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={onField("message")}
                placeholder="A short description of what you're trying to ship or fix."
              />
            </div>
            {status.state === "sent" ? (
              <div className="form-success">
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }}></span>
                <span>{status.msg}</span>
              </div>
            ) : status.state === "error" ? (
              <>
                <div className="form-success" style={{ borderColor: "#b04a52", background: "color-mix(in oklab, #b04a52 8%, transparent)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#b04a52" }}></span>
                  <span>{status.msg}</span>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <a className="btn btn-primary" href={mailtoLink()} style={{ alignSelf: "flex-start" }}>
                    Open email instead <span className="arrow">→</span>
                  </a>
                  <button className="btn btn-ghost" type="button" onClick={() => setStatus({ state: "idle", msg: "" })}>
                    Try again
                  </button>
                </div>
              </>
            ) : (
              <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }} disabled={status.state === "sending"}>
                {status.state === "sending" ? "Sending…" : "Send message"} <span className="arrow">→</span>
              </button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

function downloadResume() {
  const P = window.PROFILE;
  const css = `
    @page { size: A4; margin: 18mm 14mm; }
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: "Geist", "Helvetica Neue", system-ui, sans-serif; color: #1a1815; background: #f3f0e9; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { max-width: 820px; margin: 0 auto; padding: 36px 40px; background: #f3f0e9; }
    .head { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1.5px solid #1a1815; padding-bottom: 14px; margin-bottom: 18px; }
    .head h1 { font-family: "Newsreader", Georgia, serif; font-weight: 400; font-size: 38px; line-height: 1; letter-spacing: -0.02em; margin: 0; }
    .head h1 em { font-style: italic; color: #c2502a; }
    .head .role { font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #6b6660; margin-top: 6px; }
    .head .meta { text-align: right; font-family: "JetBrains Mono", monospace; font-size: 10px; line-height: 1.6; color: #2a2723; }
    .head .meta a { color: #2a2723; text-decoration: none; }
    .section { margin-top: 22px; }
    .section-h { font-family: "JetBrains Mono", monospace; font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #c2502a; margin: 0 0 12px; display: flex; align-items: center; gap: 8px; }
    .section-h::after { content: ""; flex: 1; height: 1px; background: rgba(26,24,21,.15); }
    .summary { font-size: 12px; line-height: 1.55; color: #2a2723; max-width: 95%; }
    .role-row { display: grid; grid-template-columns: 80px 1fr 110px; gap: 16px; margin-bottom: 12px; page-break-inside: avoid; }
    .role-row .yr { font-family: "JetBrains Mono", monospace; font-size: 10px; color: #6b6660; padding-top: 2px; }
    .role-row .body .title { font-family: "Newsreader", Georgia, serif; font-size: 15px; font-weight: 500; line-height: 1.2; }
    .role-row .body .co { font-family: "JetBrains Mono", monospace; font-size: 10px; color: #6b6660; margin-top: 2px; letter-spacing: 0.02em; }
    .role-row .body .note { font-size: 11.5px; color: #2a2723; margin-top: 6px; line-height: 1.5; }
    .role-row .loc { font-family: "JetBrains Mono", monospace; font-size: 10px; color: #6b6660; text-align: right; padding-top: 2px; }
    .skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .skills .col h4 { font-family: "JetBrains Mono", monospace; font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #2a2723; margin: 0 0 6px; }
    .skills .col ul { padding-left: 0; list-style: none; margin: 0; }
    .skills .col li { font-size: 11px; line-height: 1.5; color: #2a2723; }
    .certs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; }
    .cert-line { font-size: 11px; }
    .cert-line .nm { font-weight: 500; }
    .cert-line .iss { color: #6b6660; font-family: "JetBrains Mono", monospace; font-size: 9.5px; margin-left: 6px; }
    .footnote { border-top: 1px solid rgba(26,24,21,.15); margin-top: 28px; padding-top: 10px; font-family: "JetBrains Mono", monospace; font-size: 9px; color: #6b6660; letter-spacing: 0.08em; text-transform: uppercase; display: flex; justify-content: space-between; }
    .print-bar { position: sticky; top: 0; background: #1a1815; color: #f3f0e9; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.08em; }
    .print-bar button { background: #c2502a; color: #fff; border: 0; padding: 8px 14px; border-radius: 4px; font: inherit; cursor: pointer; }
    @media print { .print-bar { display: none; } body { background: #fff; } .page { background: #fff; padding: 0; } }
  `;

  const split = P.name.split(" ");
  const first = split[0];
  const last = split.slice(1).join(" ");

  const expRows = window.CASES.map((c) => `
    <div class="role-row">
      <div class="yr">${escapeHtml(c.period)}</div>
      <div class="body">
        <div class="title">${escapeHtml(c.role)}</div>
        <div class="co">${escapeHtml(c.company)} - ${escapeHtml(c.industry)}</div>
        <div class="note">${escapeHtml(c.overview)}</div>
      </div>
      <div class="loc">${escapeHtml(c.location)}</div>
    </div>`).join("");

  const olderRows = window.TIMELINE.filter(t => !window.CASES.find(c => c.company.toLowerCase().includes((t.co.split(" ")[0] || "").toLowerCase()))).map((t) => `
    <div class="role-row">
      <div class="yr">${escapeHtml(t.year)}</div>
      <div class="body">
        <div class="title">${escapeHtml(t.role)}</div>
        <div class="co">${escapeHtml(t.co)}</div>
        <div class="note">${escapeHtml(t.note)}</div>
      </div>
      <div class="loc"></div>
    </div>`).join("");

  const skillsHtml = window.SKILLS.map((s) => `
    <div class="col">
      <h4>${escapeHtml(s.h)}</h4>
      <ul>${s.items.map(it => `<li>${escapeHtml(it)}</li>`).join("")}</ul>
    </div>`).join("");

  const certsHtml = window.CERTS.map((c) => `
    <div class="cert-line"><span class="nm">${escapeHtml(c.name)}</span><span class="iss">${escapeHtml(c.issuer)}</span></div>
  `).join("");

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /><title>${escapeHtml(P.name)} - Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&family=Geist:wght@300..600&family=JetBrains+Mono:wght@300..600&display=swap" />
<style>${css}</style></head>
<body>
<div class="print-bar"><span>RESUME · ${escapeHtml(P.name.toUpperCase())} · GENERATED ${new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase()}</span><button onclick="window.print()">Save as PDF / Print</button></div>
<div class="page">
  <div class="head">
    <div>
      <h1>${escapeHtml(first)} <em>${escapeHtml(last)}</em></h1>
      <div class="role">${escapeHtml(P.role)} · ${escapeHtml(P.tagline)}</div>
    </div>
    <div class="meta">
      ${escapeHtml(P.location)}<br/>
      <a href="mailto:${escapeHtml(P.email)}">${escapeHtml(P.email)}</a><br/>
      ${escapeHtml(P.phone)}<br/>
      ${escapeHtml(P.linkedin)}
    </div>
  </div>

  <div class="section">
    <h2 class="section-h">Summary</h2>
    <p class="summary">Operations and administrative professional with six years of experience supporting healthcare practices, e-commerce businesses, Web3 research teams, and digital companies. I specialize in organizing complex workflows, improving operational efficiency, and supporting leadership teams with research, documentation, and data-driven insights. Bachelor of Science in Accountancy from Sorsogon State University.</p>
  </div>

  <div class="section">
    <h2 class="section-h">Selected Experience</h2>
    ${expRows}
  </div>

  <div class="section">
    <h2 class="section-h">Additional Experience</h2>
    ${olderRows}
  </div>

  <div class="section">
    <h2 class="section-h">Capabilities</h2>
    <div class="skills">${skillsHtml}</div>
  </div>

  <div class="section">
    <h2 class="section-h">Certifications</h2>
    <div class="certs">${certsHtml}</div>
  </div>

  <div class="section">
    <h2 class="section-h">Education</h2>
    <div class="role-row">
      <div class="yr">2019 - 23</div>
      <div class="body">
        <div class="title">Bachelor of Science in Accountancy</div>
        <div class="co">Sorsogon State University</div>
      </div>
      <div class="loc">Philippines</div>
    </div>
  </div>

  <div class="footnote"><span>Generated from seanlegaspi.com - ${new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</span><span>Page 1 / 1</span></div>
</div>
</body></html>`;

  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) { alert("Pop-up blocked. Please allow pop-ups to download the resume."); return; }
  w.document.open();
  w.document.write(html);
  w.document.close();
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

Object.assign(window, { ContactPage });
