// auth.jsx — secret owner login

// CHANGE YOUR PASSWORD:
// 1. Pick a new password.
// 2. Open the browser console on your live site and run:
//      await sha256("your-new-password")
// 3. Replace the hash below with what it prints.
// Default password is: sean2026
const OWNER_PASSWORD_HASH = "a212eac8a074be0065789162a1b6746133899ae629df246afc26cc069535e49c";

const AUTH_KEY = "sean_owner_auth_v1";

async function sha256(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function isAuthed() {
  try { return sessionStorage.getItem(AUTH_KEY) === "yes"; } catch (e) { return false; }
}
function setAuthed(v) {
  try {
    if (v) sessionStorage.setItem(AUTH_KEY, "yes");
    else sessionStorage.removeItem(AUTH_KEY);
  } catch (e) {}
}

function useAuth() {
  const [authed, setLocal] = React.useState(isAuthed);
  const [open, setOpen] = React.useState(false);

  // Keyboard shortcut + URL trigger
  React.useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin" || window.location.hash === "#login") {
        setOpen(true);
        window.history.replaceState({}, "", window.location.pathname + window.location.search);
      }
    };
    const onKey = (e) => {
      // Ctrl/Cmd + Shift + L
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const login = async (pw) => {
    const h = await sha256(pw);
    if (h === OWNER_PASSWORD_HASH) {
      setAuthed(true);
      setLocal(true);
      setOpen(false);
      return true;
    }
    return false;
  };
  const logout = () => { setAuthed(false); setLocal(false); };

  return { authed, open, setOpen, login, logout };
}

function LoginModal({ open, onClose, onLogin }) {
  const [pw, setPw] = React.useState("");
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setPw(""); setError(""); setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const ok = await onLogin(pw);
    setBusy(false);
    if (!ok) setError("Wrong password.");
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <form className="login-card" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className="login-mark serif">S</div>
        <div className="eyebrow mono" style={{ marginBottom: 12, justifyContent: "center", display: "flex" }}>OWNER LOGIN</div>
        <h2 className="login-h serif">Welcome back, <em>Sean</em>.</h2>
        <p className="login-sub">Enter your password to unlock posting & editing on this device.</p>

        <input
          ref={inputRef}
          type="password"
          className="login-input"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="current-password"
        />

        {error && <div className="login-error mono">{error}</div>}

        <div className="login-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy || !pw}>
            {busy ? "Checking…" : "Unlock"} <span className="arrow">→</span>
          </button>
        </div>

        <div className="login-hint mono">
          TIP · ALSO TRIGGERED BY CTRL+SHIFT+L OR ADDING #ADMIN TO THE URL
        </div>
      </form>
    </div>
  );
}

Object.assign(window, { useAuth, LoginModal, sha256 });
