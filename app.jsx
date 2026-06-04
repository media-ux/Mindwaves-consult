// app.jsx — Main App, Tweaks, scroll reveals
const { useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#F51EE1",
  "accent2": "#6419E1",
  "density": "regular",
  "motion": true
}/*EDITMODE-END*/;

// Curated accent palettes: [magenta, purple]
const ACCENT_PALETTES = [
  ['#F51EE1', '#6419E1'],  // brand magenta → purple
  ['#B66BFF', '#6419E1'],  // soft violet
  ['#4AC9FF', '#6419E1'],  // info cyan → purple
  ['#34E0A1', '#1AB36C'],  // industrial green
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffectApp(() => {
    const root = document.documentElement;
    const accent = Array.isArray(t.accent) ? t.accent[0] : t.accent;
    const accent2 = Array.isArray(t.accent) ? t.accent[1] : t.accent2;
    root.style.setProperty('--mw-magenta', accent);
    root.style.setProperty('--mw-magenta-hot', accent);
    root.style.setProperty('--mw-purple', accent2);
    root.style.setProperty('--mw-accent', accent);
    root.style.setProperty('--mw-accent-2', accent2);
    root.style.setProperty('--mw-accent-border', accent + '66');
    root.style.setProperty('--mw-gradient', `linear-gradient(90deg, ${accent} 0%, ${accent2} 100%)`);
    root.style.setProperty('--mw-glow', `0 0 32px ${accent}59`);
  }, [t.accent, t.accent2]);

  useEffectApp(() => {
    document.documentElement.setAttribute('data-density', t.density);
    document.documentElement.setAttribute('data-motion', t.motion ? 'on' : 'off');
  }, [t.density, t.motion]);

  // Reveal-on-scroll + Lucide refresh (re-runs each render so dynamic icons get drawn)
  useEffectApp(() => {
    if (window.lucide) window.lucide.createIcons();
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <React.Fragment>
      <ContactProvider>
        <Nav />
        <main>
          <Hero tweaks={t} />
          <Readiness />
          <Systems />
          <Advantages />
          <Lab />
          <Research />
          <CTA />
        </main>
        <Footer />
      </ContactProvider>

      <TweaksPanel>
        <TweakSection label="Brand accent" />
        <TweakColor
          label="Wave gradient"
          value={Array.isArray(t.accent) ? t.accent : [t.accent, t.accent2]}
          options={ACCENT_PALETTES}
          onChange={(v) => setTweak({ accent: v[0], accent2: v[1] })}
        />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={['compact', 'regular', 'spacious']} onChange={(v) => setTweak('density', v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Animations" value={t.motion} onChange={(v) => setTweak('motion', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
