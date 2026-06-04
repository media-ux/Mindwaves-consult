// systems.jsx — product cards with mini-stat grids + Services/Industries

const SYSTEMS = [
  {
    num: '01', icon: 'box', title: 'Digital Twin', tag: 'Virtual Replicas', feat: true,
    desc: 'High-fidelity virtual replicas of physical assets — calibrated by live sensor streams and accelerated by Physics-Informed Neural Networks. Predict failures before they happen.',
    stats: [['PINNs', 'Engine'], ['Real-time', 'Sync'], ['Sim→Real', 'Loop']],
  },
  {
    num: '02', icon: 'flask-conical', title: 'Autonomous Lab', tag: '24/7 Research',
    desc: 'Self-operating research environments. Automated experimentation, real-time acquisition, and intelligent analysis running around the clock — compressing months of research into days.',
    stats: [['24/7', 'Uptime'], ['Closed', 'Loop'], ['Months→Days', 'Speed']],
  },
  {
    num: '03', icon: 'cpu', title: 'On-Site / Edge AI', tag: 'Air-Gapped Intelligence',
    desc: 'AI inference where your data lives — on-premise, air-gapped, sovereignty-compliant. Computer vision and anomaly detection deployed directly to the operational floor.',
    stats: [['<100ms', 'Latency'], ['Hailo·Coral', 'NPU'], ['YOLOv8', 'Vision']],
  },
  {
    num: '04', icon: 'network', title: 'Visual Agentic Memory', tag: 'Cognitive Layer',
    desc: 'Structured visual memory architectures that give autonomous agents persistent context, spatial reasoning, and long-term recall — turning stateless models into systems that learn.',
    stats: [['Persistent', 'Context'], ['Spatial', 'Reasoning'], ['Graph', 'Memory']],
  },
];

function SysCard({ s }) {
  return (
    <article className={`sys-card ${s.feat ? 'sys-card--feat' : ''}`}>
      <div className="sys-card__top">
        <span className="sys-card__icon"><i data-lucide={s.icon}></i></span>
        <span className="sys-card__num">{s.num} / SYSTEM</span>
      </div>
      <div>
        <h3 className="sys-card__title">{s.title}</h3>
        <span className="sys-card__tag">{s.tag}</span>
      </div>
      <p className="sys-card__desc">{s.desc}</p>
      <div className="sys-card__stats">
        {s.stats.map(([v, l], i) => (
          <div className="sys-stat" key={i}>
            <span className="sys-stat__v">{v}</span>
            <span className="sys-stat__l">{l}</span>
          </div>
        ))}
      </div>
      <a href="#contact" data-action="contact" className="sys-card__cta">
        Learn more <i data-lucide="arrow-right"></i>
      </a>
    </article>
  );
}

function Systems() {
  return (
    <section id="systems" className="section-pad">
      <div className="glow-blob" style={{ width: 520, height: 520, right: '-180px', top: '10%' }} />
      <div className="container">
        <div className="systems__head">
          <div>
            <span className="pill-kicker"><span className="dot" /> What we build</span>
            <h2>A holistic <span className="it">AI systems</span> stack.</h2>
          </div>
          <div className="right">
            <p>Four operational systems Mindwaves engineers end-to-end — from sensor integration through edge deployment to closed-loop control. Each is a building block in the same industrial-AI architecture.</p>
            <a href="#advantages" className="btn btn--ghost">Why edge deployment <i data-lucide="arrow-down"></i></a>
          </div>
        </div>

        <div className="systems__grid">
          {SYSTEMS.map((s) => <SysCard key={s.num} s={s} />)}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Systems, SysCard });
