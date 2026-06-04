// contact-footer.jsx — CTA + reference-style footer

function CTA() {
  const startWithEmail = (e) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (window.openContactModal) window.openContactModal(input ? input.value : '');
  };
  return (
    <section id="contact" className="section-pad">
      <div className="container">
        <div className="cta-wrap">
          <span className="pill-kicker"><span className="dot" /> Start a conversation</span>
          <h2 className="cta-wrap__title">
            Turn AI into <span className="it">operational infrastructure.</span>
          </h2>
          <p className="cta-wrap__sub">
            Ready to move AI from a software experiment to systems that run where your data lives? Tell us what you're operating — we'll scope it.
          </p>
          <form className="email-capture" style={{ margin: '0 auto' }} onSubmit={startWithEmail}>
            <input type="email" placeholder="you@company.com" aria-label="Your email" />
            <button type="submit" className="btn btn--primary">Start building <i data-lucide="arrow-right"></i></button>
          </form>
          <div className="cta-wrap__actions" style={{ marginTop: 28 }}>
            <a href="tel:+4921619499043" className="btn btn--ghost"><i data-lucide="phone"></i> +49 2161 9499043</a>
            <a href="mailto:consulting@mindwaves-consult.com" className="btn btn--ghost"><i data-lucide="mail"></i> consulting@mindwaves-consult.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const startWithEmail = (e) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    if (window.openContactModal) window.openContactModal(input ? input.value : '');
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="logo">
              <img src="assets/mindwaves-icon-gradient-circle.png" alt="" />
              <span>Mindwaves</span>
            </a>
            <h4>From simulation to <span className="it">deployment</span>, on real infrastructure.</h4>
            <form className="email-capture" onSubmit={startWithEmail}>
              <input type="email" placeholder="you@company.com" aria-label="Your email" />
              <button type="submit" className="btn btn--primary">Start <i data-lucide="arrow-right"></i></button>
            </form>
            <p style={{ fontFamily: 'var(--mw-font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mw-fg-3)', margin: 0, lineHeight: 1.6 }}>
              MindWaves AI Solutions GmbH<br />
              Hocksteiner Weg 33 · 41189 Mönchengladbach · DE
            </p>
          </div>

          <div className="footer__col">
            <h5>Systems</h5>
            <ul>
              <li><a href="#systems">Digital Twin</a></li>
              <li><a href="#systems">Autonomous Lab</a></li>
              <li><a href="#systems">On-Site / Edge AI</a></li>
              <li><a href="#systems">Visual Agentic Memory</a></li>
              <li><a href="#advantages">Edge deployment</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Research</h5>
            <ul>
              <li><a href="#research">AUTOBIO-KI</a></li>
              <li><a href="#research">VisInspect.AI</a></li>
              <li><a href="#lab">Inside the lab</a></li>
              <li><a href="#readiness">Systems assessment</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h5>Company</h5>
            <ul>
              <li><a href="#contact" data-action="contact">Contact</a></li>
              <li><a href="messages.html">Inbox</a></li>
              <li><a href="mailto:consulting@mindwaves-consult.com">Email us</a></li>
              <li><a href="#">Imprint / Datenschutz</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <span>© 2026 MindWaves AI Solutions GmbH</span>
          <span className="legal">
            <span>BAFA · go-inno · WIPANO · BMBF</span>
            <span>v.26.06 // BUILD STABLE</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CTA, Footer });
