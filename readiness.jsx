// readiness.jsx — interactive assessment + glowing isometric cube
const { useState: useStateR } = React;

/* Glowing isometric cube visual */
function CubeVisual() {
  return (
    <div className="cube-stage">
      <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF2EE8" /><stop offset="100%" stopColor="#A41AE1" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A1AE1" /><stop offset="100%" stopColor="#4A0FB8" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6419E1" /><stop offset="100%" stopColor="#33098F" />
          </linearGradient>
          <radialGradient id="cubeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F51EE1" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F51EE1" stopOpacity="0" />
          </radialGradient>
          <filter id="cubeBlur"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        {/* glow */}
        <ellipse cx="200" cy="170" rx="150" ry="120" fill="url(#cubeGlow)" />

        {/* floor grid */}
        <g stroke="rgba(180,160,220,0.18)" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={'a'+i} x1={60 + i*40} y1={250} x2={200 + i*22} y2={300} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={'b'+i} x1={60 + i*0} y1={250} x2={200} y2={300} opacity="0" />
          ))}
        </g>

        {/* cube — isometric */}
        <g transform="translate(200 60)">
          {/* top face */}
          <polygon points="0,0 96,56 0,112 -96,56" fill="url(#cubeTop)" />
          {/* left face */}
          <polygon points="-96,56 0,112 0,224 -96,168" fill="url(#cubeLeft)" />
          {/* right face */}
          <polygon points="96,56 0,112 0,224 96,168" fill="url(#cubeRight)" />
          {/* edge highlights */}
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none">
            <polygon points="0,0 96,56 0,112 -96,56" />
            <line x1="0" y1="112" x2="0" y2="224" />
          </g>
          {/* top sheen */}
          <polygon points="0,0 96,56 0,112 -96,56" fill="url(#cubeGlow)" opacity="0.4" filter="url(#cubeBlur)" />
        </g>

        {/* orbiting nodes */}
        {[{x:90,y:90},{x:320,y:130},{x:300,y:240},{x:70,y:220}].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#F51EE1">
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.2 + i*0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

const STEPS = [
  {
    q: 'What are you operating right now?',
    opts: ['Industrial / physical plant', 'Research or production lab', 'Biological / bioproduction system', 'Software-only — exploring AI'],
  },
  {
    q: 'Where do most of your decisions happen today?',
    opts: ['Reactive — after something fails', 'Manual analysis & dashboards', 'Some automation in place', 'Closed-loop / autonomous'],
  },
  {
    q: 'What would move the needle most?',
    opts: ['Predict failures before they happen', 'Run experiments 24/7 autonomously', 'AI inference on-site / air-gapped', 'Persistent memory for AI agents'],
  },
];

function Readiness() {
  const [step, setStep] = useStateR(0);
  const [answers, setAnswers] = useStateR({});
  const [done, setDone] = useStateR(false);

  const pick = (i) => setAnswers((a) => ({ ...a, [step]: i }));
  const next = () => {
    if (answers[step] == null) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  };
  const restart = () => { setStep(0); setAnswers({}); setDone(false); };

  return (
    <section className="readiness section-pad" id="readiness">
      <div className="glow-blob" style={{ width: 480, height: 480, left: '-160px', top: '20%' }} />
      <div className="container">
        <div className="readiness__grid">
          <div className="readiness__intro">
            <span className="pill-kicker"><span className="dot" /> Systems assessment</span>
            <h2>Discover your <span className="it">systems readiness.</span></h2>
            <p>Answer three quick questions. We'll map where you are on the path from reactive operations to autonomous, closed-loop infrastructure — and where Mindwaves plugs in.</p>
            <CubeVisual />
          </div>

          <div className="assess">
            <div className="assess__head">Let's map your starting point</div>

            {done ? (
              <div className="assess__result">
                <div className="assess__result-icon"><i data-lucide="check"></i></div>
                <h4>You're ready to scope a system.</h4>
                <p>Based on your answers, there's a clear path from your current operations to closed-loop AI infrastructure. Let's talk specifics — we'll come prepared.</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button className="btn btn--primary" data-action="contact">Book a scoping call <i data-lucide="arrow-up-right"></i></button>
                  <button className="btn btn--ghost" onClick={restart}>Restart <i data-lucide="rotate-cw"></i></button>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <p className="assess__q">{STEPS[step].q}</p>
                <div className="assess__opts">
                  {STEPS[step].opts.map((o, i) => (
                    <button key={i} className={`assess__opt ${answers[step] === i ? 'sel' : ''}`} onClick={() => pick(i)}>
                      <span className="assess__check"><i data-lucide="check"></i></span>
                      {o}
                    </button>
                  ))}
                </div>
                <div className="assess__foot">
                  <div className="assess__progress">
                    {STEPS.map((_, i) => <span key={i} className={i <= step ? 'on' : ''} />)}
                  </div>
                  <button className="assess__next" onClick={next}>
                    {step < STEPS.length - 1 ? 'Next' : 'See result'}
                    <i data-lucide="arrow-right"></i>
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Readiness, CubeVisual });
