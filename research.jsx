// research.jsx — AUTOBIO-KI success testimonial + map pin

/* Stylised abstract map (contour + grid) */
function MapVisual() {
  return (
    <svg viewBox="0 0 480 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="44%" r="45%">
          <stop offset="0%" stopColor="#6419E1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6419E1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="400" fill="#120726" />
      <ellipse cx="240" cy="176" rx="170" ry="150" fill="url(#mapGlow)" />
      {/* grid */}
      <g stroke="rgba(180,160,220,0.08)" strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => <line key={'v'+i} x1={i*40} y1="0" x2={i*40} y2="400" />)}
        {Array.from({ length: 11 }).map((_, i) => <line key={'h'+i} x1="0" y1={i*40} x2="480" y2={i*40} />)}
      </g>
      {/* contour rings around the pin */}
      <g fill="none" stroke="rgba(245,30,225,0.22)" strokeWidth="1">
        <circle cx="240" cy="176" r="50" />
        <circle cx="240" cy="176" r="92" />
        <circle cx="240" cy="176" r="138" strokeDasharray="3 5" />
      </g>
      {/* abstract roads */}
      <g stroke="rgba(180,160,220,0.16)" strokeWidth="1.5" fill="none">
        <path d="M0 120 Q160 160 240 176 T480 230" />
        <path d="M120 0 Q200 140 240 176 T300 400" />
      </g>
    </svg>
  );
}

function Research() {
  return (
    <section id="research" className="section-pad">
      <div className="container">
        <div className="sec-head-c">
          <span className="pill-kicker"><span className="dot" /> Research that shipped</span>
          <h2>Research that saw beyond <span className="it">ordinary limits.</span></h2>
          <p>From collaborative academic partnerships to deployed systems — Mindwaves bridges the gap between paper and production line. Here's the flagship.</p>
        </div>

        <article className="success__panel">
          <div className="success__grid">
            <div className="success__left">
              <div className="success__profile">
                <span className="av"><i data-lucide="leaf"></i></span>
                <span className="meta">
                  <b>AUTOBIO-KI</b>
                  <span>Autonomous bioproduction · Lead AI partner</span>
                </span>
              </div>

              <span className="success__badge"><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mw-status-online)', display: 'inline-block' }} /> Active · BMBF funded · 2026</span>

              <p className="success__quote">
                A closed <span className="grad">"Sim-to-Real Loop"</span> where Physics-Informed Neural Networks continuously calibrate against real sensor data — predictive optimisation that data-only models can't reach.
              </p>

              <p className="success__body">
                Mindwaves leads the Edge-AI vision pipeline (YOLOv8 / DINOv2) and autonomous control logic deployed directly on edge hardware (Raspberry Pi 5 + Hailo-8L NPU), alongside Energaia Labs, Gemino, Epic Technologies, and the Robert Boyle Institut.
              </p>

              <div className="success__stats">
                <div className="success__stat"><b>&gt;30%</b><span>Biomass productivity vs. non-AI baseline</span></div>
                <div className="success__stat"><b>&gt;25%</b><span>Less water &amp; nutrient consumption</span></div>
                <div className="success__stat"><b>&lt;100ms</b><span>Edge inference for robot commands</span></div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                <a href="#contact" data-action="contact" className="btn btn--primary">Collaborate on research <i data-lucide="arrow-up-right"></i></a>
                <a href="#contact" data-action="contact" className="btn btn--ghost">VisInspect.AI pathway <i data-lucide="scan-search"></i></a>
              </div>
            </div>

            <div className="success__map">
              <MapVisual />
              <div className="success__pin">
                <span className="ring"><i data-lucide="map-pin"></i></span>
                <span className="lbl">Mönchengladbach · DE</span>
              </div>
              <div className="success__map-meta">
                <span>STATUS · <b>OPERATIONAL</b></span>
                <span>51.18°N · 6.43°E</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

Object.assign(window, { Research, MapVisual });
