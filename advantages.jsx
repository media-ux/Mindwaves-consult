// advantages.jsx — edge-deployment advantages with isometric renders

/* Isometric scattered-cubes render (tall card) */
function RenderCubes() {
  const cube = (x, y, s, o = 1) => (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <polygon points={`0,0 ${s},${s*0.58} 0,${s*1.16} ${-s},${s*0.58}`} fill="url(#advTop)" />
      <polygon points={`${-s},${s*0.58} 0,${s*1.16} 0,${s*2.0} ${-s},${s*1.42}`} fill="url(#advLeft)" />
      <polygon points={`${s},${s*0.58} 0,${s*1.16} 0,${s*2.0} ${s},${s*1.42}`} fill="url(#advRight)" />
    </g>
  );
  return (
    <div className="adv-card__render">
      <svg viewBox="0 0 460 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="advTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF2EE8"/><stop offset="100%" stopColor="#A41AE1"/></linearGradient>
          <linearGradient id="advLeft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7A1AE1"/><stop offset="100%" stopColor="#3E0C9E"/></linearGradient>
          <linearGradient id="advRight" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5615C7"/><stop offset="100%" stopColor="#2A0875"/></linearGradient>
          <radialGradient id="advGlow" cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#F51EE1" stopOpacity="0.4"/><stop offset="100%" stopColor="#F51EE1" stopOpacity="0"/></radialGradient>
        </defs>
        <ellipse cx="250" cy="150" rx="200" ry="160" fill="url(#advGlow)" />
        {cube(250, 70, 34, 0.55)}
        {cube(160, 130, 30, 0.8)}
        {cube(330, 140, 26, 0.7)}
        {cube(240, 150, 44, 1)}
        {cube(150, 240, 22, 0.6)}
        {cube(340, 250, 30, 0.85)}
      </svg>
    </div>
  );
}

/* Shield render */
function RenderShield() {
  return (
    <div className="adv-card__render">
      <svg viewBox="0 0 460 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="shTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF2EE8"/><stop offset="100%" stopColor="#6419E1"/></linearGradient>
          <radialGradient id="shGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#F51EE1" stopOpacity="0.35"/><stop offset="100%" stopColor="#F51EE1" stopOpacity="0"/></radialGradient>
        </defs>
        <ellipse cx="340" cy="120" rx="150" ry="130" fill="url(#shGlow)" />
        <g transform="translate(300 50)" opacity="0.9">
          <path d="M60 0 L120 26 L120 90 Q120 150 60 180 Q0 150 0 90 L0 26 Z" fill="url(#shTop)" opacity="0.18" stroke="#F51EE1" strokeWidth="1.5"/>
          <path d="M38 90 L54 110 L86 66" fill="none" stroke="#F51EE1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {/* hairline grid */}
        <g stroke="rgba(180,160,220,0.1)" strokeWidth="1">
          {Array.from({length:6}).map((_,i)=><line key={i} x1={i*92} y1="0" x2={i*92} y2="300"/>)}
        </g>
      </svg>
    </div>
  );
}

/* Node-cluster render */
function RenderNodes() {
  const nodes = [[230,90],[150,60],[320,70],[120,150],[350,150],[200,180],[290,180]];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[2,4]];
  return (
    <div className="adv-card__render">
      <svg viewBox="0 0 460 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="ndGlow" cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#F51EE1" stopOpacity="0.35"/><stop offset="100%" stopColor="#F51EE1" stopOpacity="0"/></radialGradient>
        </defs>
        <ellipse cx="230" cy="110" rx="190" ry="120" fill="url(#ndGlow)" />
        {edges.map((e,i)=>(<line key={i} x1={nodes[e[0]][0]} y1={nodes[e[0]][1]} x2={nodes[e[1]][0]} y2={nodes[e[1]][1]} stroke="rgba(245,30,225,0.35)" strokeWidth="1"/>))}
        {nodes.map((n,i)=>(
          <circle key={i} cx={n[0]} cy={n[1]} r={i===0?8:4.5} fill={i===0?'#F51EE1':'#6419E1'}>
            {i!==0 && <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>}
          </circle>
        ))}
      </svg>
    </div>
  );
}

function Advantages() {
  return (
    <section id="advantages" className="section-pad">
      <div className="container">
        <div className="sec-head-c">
          <span className="pill-kicker"><span className="dot" /> Why on-site</span>
          <h2>The advantage of <span className="it">edge deployment.</span></h2>
          <p>Running AI where your data lives — not in someone else's cloud — changes what's possible. Lower latency, full sovereignty, and closed feedback loops that purely cloud-bound systems can't match.</p>
        </div>

        <div className="adv__grid">
          <article className="adv-card adv-card--tall">
            <RenderCubes />
            <span className="adv-card__icon"><i data-lucide="zap"></i></span>
            <div className="adv-card__body">
              <h3 className="adv-card__title">Sub-100ms inference</h3>
              <p className="adv-card__desc">Real-time decisions on-device — YOLOv8 and DINOv2 vision pipelines running on Raspberry Pi 5 + Hailo-8L NPU, fast enough to drive autonomous robotics control on the floor.</p>
              <a href="#contact" data-action="contact" className="adv-card__link">Deployment specs <i data-lucide="arrow-right"></i></a>
            </div>
          </article>

          <article className="adv-card">
            <RenderShield />
            <span className="adv-card__icon"><i data-lucide="shield-check"></i></span>
            <div className="adv-card__body">
              <h3 className="adv-card__title">Data sovereignty, built in</h3>
              <p className="adv-card__desc">Air-gapped and on-premise by default. Your data never leaves the site — compliant with German and EU data-sovereignty requirements without compromise.</p>
              <a href="#contact" data-action="contact" className="adv-card__link">Compliance <i data-lucide="arrow-right"></i></a>
            </div>
          </article>

          <article className="adv-card">
            <RenderNodes />
            <span className="adv-card__icon"><i data-lucide="repeat"></i></span>
            <div className="adv-card__body">
              <h3 className="adv-card__title">Closed-loop control</h3>
              <p className="adv-card__desc">Physics-Informed Neural Networks continuously calibrate against live sensor data — enabling predictive optimisation that data-only models can't achieve.</p>
              <a href="#research" className="adv-card__link">The Sim-to-Real Loop <i data-lucide="arrow-right"></i></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Advantages });
