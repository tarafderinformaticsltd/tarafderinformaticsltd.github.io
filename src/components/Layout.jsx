import { useEffect, useState } from "react";
import site from "../data/site.json";
import { Button, Icon } from "./ui";
import "../styles.css";

const logoSrc = `/${site.logo}`;

function Brand() {
  return (
    <a href="/" className="brand">
      <img src={logoSrc} alt={`${site.name} logo`} />
      <span>
        <b>{site.brand.accent}</b> {site.brand.rest}
        <small>{site.brand.tagline}</small>
      </span>
    </a>
  );
}

function Header({ page }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <nav className="nav">
        <Brand />
        <div className="nav-links">
          {site.nav.map((n) => (
            <a key={n.key} href={n.href} className={n.key === page ? "active" : ""}>{n.label}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
          <Button href={site.cta.href} size="sm" className="nav-cta">
            {site.cta.label}
            <Icon name="arrowUpRight" />
          </Button>
          <button className="menu-btn" aria-label={site.menuLabel} onClick={() => setOpen(!open)}>
            <Icon name="menu" size={18} />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {site.nav.map((n) => (
          <a key={n.key} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
      </div>
    </header>
  );
}

function Footer() {
  const f = site.footer;
  return (
    <footer className="footer">
      <div className="container">
        <div className="f-grid">
          <div>
            <Brand />
            <p className="about">{f.about}</p>
          </div>
          {f.columns.map((c) => (
            <div key={c.title}>
              <h5>{c.title}</h5>
              <ul>
                {c.links
                  ? c.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)
                  : c.text.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="f-bottom">
          <span>© {new Date().getFullYear()} {f.copyright}</span>
          <a href="#top">{f.backToTop}</a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ page, children }) {
  return (
    <>
      <Header page={page} />
      <main id="top">{children}</main>
      <Footer />
    </>
  );
}
