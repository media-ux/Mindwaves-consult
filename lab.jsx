// lab.jsx — community/lab photos (blob-masked) + trusted-by + award

const LAB_PHOTOS = [
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop',
];

const AVATARS = [
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=120&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=120&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80&auto=format&fit=crop',
];

function Lab() {
  return (
    <section id="lab" className="lab section-pad">
      <div className="glow-blob" style={{ width: 560, height: 560, left: '50%', top: '0', transform: 'translateX(-50%)' }} />
      <div className="container">
        <div className="sec-head-c">
          <span className="pill-kicker"><span className="dot" /> Inside the build</span>
          <h2>Work happening inside the <span className="it">Mindwaves lab.</span></h2>
          <p>A research-led team working across edge hardware, computer vision, and autonomous control — translating cutting-edge AI into systems that run on the operational floor.</p>
        </div>

        <div className="lab__photos">
          {LAB_PHOTOS.map((src, i) => (
            <div className="lab__photo" key={i}>
              <img src={src} alt="Mindwaves lab and edge AI hardware" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="lab__cta">
          <a href="#contact" data-action="contact" className="btn btn--primary btn--lg">
            Work with the team <i data-lucide="arrow-up-right"></i>
          </a>
        </div>

        <div className="lab__foot">
          <div className="trusted">
            <span className="trusted__lbl">Research network</span>
            <div className="trusted__row">
              {AVATARS.map((a, i) => (
                <span className="av" key={i}><img src={a} alt="" loading="lazy" /></span>
              ))}
              <span className="av" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mw-font-mono)', fontSize: 11, color: 'var(--mw-fg-2)', background: 'var(--mw-surface-2)' }}>+4</span>
            </div>
          </div>
          <div className="award">
            <span className="award__badge"><i data-lucide="award"></i></span>
            <span className="award__txt">
              <b>BMBF Research Partner</b>
              <span>Zukunft der Wertschöpfung · 2026</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Lab });
