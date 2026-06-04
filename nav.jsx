// nav.jsx — sticky nav with centered pill links
const { useEffect: useEffectNav, useState: useStateNav } = React;

function Nav() {
  const [scrolled, setScrolled] = useStateNav(false);
  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#top', label: 'Home', active: true },
    { href: '#systems', label: 'Systems' },
    { href: '#advantages', label: 'Edge' },
    { href: '#lab', label: 'Lab' },
    { href: '#research', label: 'Research' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__row">
        <a href="#top" className="nav__logo">
          <img src="assets/mindwaves-icon-gradient-circle.png" alt="" />
          <span>Mindwaves</span>
        </a>

        <div className="nav__center">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={`nav__link ${l.active ? 'nav__link--active' : ''}`}>{l.label}</a>
          ))}
        </div>

        <div className="nav__right">
          <a href="messages.html" className="nav__signin">Inbox</a>
          <a href="#contact" data-action="contact" className="btn btn--primary">
            Start a conversation
            <i data-lucide="arrow-up-right"></i>
          </a>
          <button className="nav__burger" aria-label="Menu" onClick={() => { const c = document.querySelector('.nav__center'); if (c) c.style.display = c.style.display === 'flex' ? '' : 'flex'; }}>
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });
