// app.jsx — root + router

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#c2502a", "#1a1815", "#ebe7df"],
  "density": "regular",
  "dark": false,
  "fontMode": "editorial"
}/*EDITMODE-END*/;

const FONT_MODES = {
  editorial: {
    serif: '"Newsreader", "Cormorant Garamond", Georgia, serif',
    sans: '"Geist", ui-sans-serif, system-ui, sans-serif',
    label: "Editorial",
  },
  technical: {
    serif: '"Instrument Serif", Georgia, serif',
    sans: '"Geist Mono", "JetBrains Mono", monospace',
    label: "Technical",
  },
  classic: {
    serif: '"Cormorant Garamond", Georgia, serif',
    sans: '"Inter Tight", "Helvetica Neue", system-ui, sans-serif',
    label: "Classic",
  },
};

const PALETTES = [
  ["#c2502a", "#1a1815", "#ebe7df"],
  ["#3a5a40", "#1a1815", "#ebe7df"],
  ["#2b4eff", "#0d1117", "#eef0f4"],
  ["#d4b04a", "#1a1815", "#ebe7df"],
  ["#b04a52", "#1f1a1a", "#f0e9e1"],
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState({ name: "home" });
  const auth = useAuth();

  React.useEffect(() => {
    const root = document.documentElement;
    const [accent] = t.palette || PALETTES[0];
    root.style.setProperty("--accent", accent);
    root.dataset.theme = t.dark ? "dark" : "light";
    root.dataset.density = t.density;
    const fm = FONT_MODES[t.fontMode] || FONT_MODES.editorial;
    root.style.setProperty("--serif", fm.serif);
    root.style.setProperty("--sans", fm.sans);
  }, [t]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  const setDark = (v) => setTweak("dark", v);

  return (
    <>
      <Nav route={route} setRoute={setRoute} dark={!!t.dark} setDark={setDark} />
      <main>
        {route.name === "home" && <HomePage setRoute={setRoute} tweaks={t} />}
        {route.name === "work" && <WorkPage setRoute={setRoute} />}
        {route.name === "case" && <CasePage id={route.id} setRoute={setRoute} />}
        {route.name === "about" && <AboutPage setRoute={setRoute} />}
        {route.name === "writing" && (
          <WritingPage
            setRoute={setRoute}
            ownerMode={auth.authed}
            onLogout={auth.logout}
            onLogin={() => auth.setOpen(true)}
          />
        )}
        {route.name === "contact" && <ContactPage setRoute={setRoute} />}
      </main>
      <Footer setRoute={setRoute} onLoginClick={() => auth.setOpen(true)} authed={auth.authed} />

      <LoginModal open={auth.open} onClose={() => auth.setOpen(false)} onLogin={auth.login} />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakColor
          label="Theme"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakToggle label="Dark mode" value={!!t.dark} onChange={(v) => setTweak("dark", v)} />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Font pairing"
          value={t.fontMode}
          options={Object.keys(FONT_MODES)}
          onChange={(v) => setTweak("fontMode", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Navigate" />
        <TweakButton label="Home" onClick={() => setRoute({ name: "home" })} />
        <TweakButton label="Work" onClick={() => setRoute({ name: "work" })} />
        <TweakButton label="About" onClick={() => setRoute({ name: "about" })} />
        <TweakButton label="Journal" onClick={() => setRoute({ name: "writing" })} />
        <TweakButton label="Contact" onClick={() => setRoute({ name: "contact" })} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
