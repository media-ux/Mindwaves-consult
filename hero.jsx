// hero.jsx — Hero: wireframe mesh + email capture + icon stats
const { useEffect, useRef, useState } = React;

/* ============================================================
   Wireframe topographic mesh (top-right hero visual)
   A perspective landscape of rippled profile lines + connectors.
   ============================================================ */
function MeshVisual({ motion = true }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const ROWS = 18, COLS = 26;
  // build a height field: a ridge/peak
  const height = (c, r, t = 0) => {
    const nx = (c / (COLS - 1)) * 2 - 1;
    const ny = (r / (ROWS - 1)) * 2 - 1;
    const d = Math.sqrt(nx * nx + ny * ny);
    const ripple = Math.sin(d * 6 - t) * Math.exp(-d * 1.6) * 70;
    const ridge = Math.cos(nx * 2.2 + t * 0.4) * 14;
    return ripple + ridge;
  };

  // project grid point to 2D with simple iso perspective
  const project = (c, r, t = 0) => {
    const cellW = 30, cellH = 16;
    const x0 = c * cellW;
    const y0 = r * cellH;
    const h = height(c, r, t);
    // iso skew
    const x = x0 + r * 8;
    const y = y0 - h + (r * 4);
    return [x, y];
  };

  const buildPaths = (t = 0) => {
    const rows = [];
    for (let r = 0; r < ROWS; r++) {
      let d = '';
      for (let c = 0; c < COLS; c++) {
        const [x, y] = project(c, r, t);
        d += (c === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
      }
      rows.push(d);
    }
    return rows;
  };

  const [paths, setPaths] = useState(() => buildPaths(0));

  useEffect(() => {
    if (!motion) { setPaths(buildPaths(0)); return; }
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      setPaths(buildPaths(t * 0.8));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [motion]);

  return (
    <svg ref={ref} viewBox="-20 -40 880 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="meshStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F51EE1" stopOpacity="0.0" />
          <stop offset="30%" stopColor="#F51EE1" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#A41AE1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6419E1" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="meshFade" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="meshMask"><rect x="-40" y="-60" width="940" height="600" fill="url(#meshFade)" /></mask>
      </defs>
      <g mask="url(#meshMask)" fill="none" stroke="url(#meshStroke)" strokeWidth="1" strokeLinecap="round">
        {paths.map((d, i) => (
          <path key={i} d={d} strokeOpacity={0.25 + (1 - Math.abs(i - ROWS / 2) / (ROWS / 2)) * 0.55} />
        ))}
      </g>
    </svg>
  );
}

/* ============================================================
   Animated counter
   ============================================================ */
function Count({ to, suffix = '', prefix = '', duration = 1600, motion = true }) {
  const [val, setVal] = useState(motion ? 0 : to);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!motion) { setVal(to); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, motion]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

function Hero({ tweaks }) {
  const { motion = true } = tweaks || {};
  const [time, setTime] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      setTime(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  const startWithEmail = (e) => {
    e.preventDefault();
    if (window.openContactModal) window.openContactModal(email);
  };

  const STATS = [
    { icon: 'box', num: <span className="grad"><Count to={9} motion={motion} /></span>, lbl: 'Operational AI systems engineered end-to-end' },
    { icon: 'layers', num: <><Count to={9} suffix="+" motion={motion} /></>, lbl: 'Industry verticals deployed across' },
    { icon: 'zap', num: <><Count to={100} prefix="<" suffix="ms" motion={motion} /></>, lbl: 'Edge inference latency on-device' },
    { icon: 'shield-check', num: 'BAFA', lbl: 'Federally accredited AI advisor' },
  ];

  return (
    <section className="hero" id="top">
      <div className="hero__bg" />
      <div className="hero__grid" />
      <div className="hero__mesh"><MeshVisual motion={motion} /></div>

      <div className="hero__ticker">
        <div className="row"><span className="dot" /> SYSTEM ONLINE</div>
        <div className="row">MÖNCHENGLADBACH · DE</div>
        <div className="row">51.18°N · 6.43°E</div>
        <div className="row">{time}</div>
      </div>

      <div className="container hero__inner">
        <div className="hero__eyebrow eyebrow">
          SIMULATE <span className="sep">·</span> LEARN <span className="sep">·</span> DEPLOY
        </div>

        <h1 className="hero__title">
          <span className="line1">Building AI systems,</span>
          <span className="line2 it">powering reality.</span>
        </h1>

        <p className="hero__sub">
          Mindwaves builds Digital Twins, Autonomous Laboratories, and Edge AI — operational infrastructure for industrial, biological, and physical systems. Not dashboards. Decision infrastructure.
        </p>

        <form className="email-capture" onSubmit={startWithEmail}>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Your email"
          />
          <button type="submit" className="btn btn--primary">
            Start building
            <i data-lucide="arrow-right"></i>
          </button>
        </form>

        <div className="hero__stats">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat__num">{s.num}</div>
              <div className="stat__row">
                <span className="stat__icon"><i data-lucide={s.icon}></i></span>
                <span className="stat__lbl">{s.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Count, MeshVisual });
