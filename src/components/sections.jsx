import { BG, Button, Heading, Icon, Reveal, SecHead } from "./ui";
import site from "../data/site.json";

export function Hero({ data }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <Reveal as="span" className="eyebrow">{data.eyebrow}</Reveal>
          <Reveal as="h1" delay={1}><Heading parts={data.headline} /></Reveal>
          <Reveal as="p" delay={2} className="lead">{data.lead}</Reveal>
          <Reveal delay={3} className="hero-cta">
            {data.ctas.map((c) => (
              <Button key={c.label} href={c.href} variant={c.variant} arrow={c.arrow}>{c.label}</Button>
            ))}
          </Reveal>
          <Reveal delay={3} className="stats">
            {data.stats.map((s) => (
              <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={2} className="visual" aria-hidden="true">
          <div className="glow" />
          <div className="ring r1" /><div className="ring r2" />
          <div className="orbit"><i /></div><div className="orbit o2"><i /></div>
          <div className="logo-mark"><img src={`/${site.logo}`} alt="" /></div>
          {data.chips.map((c) => (
            <div key={c.label} className={`float-chip ${c.pos}`}>
              <span className={`ic ${c.tone}`}><Icon name={c.icon} /></span>{c.label}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Marquee({ data }) {
  // list is rendered twice for a seamless loop
  const items = [...data.items, ...data.items];
  return (
    <section className="strip">
      <p>{data.title}</p>
      <div className="marquee">
        {items.map((t, i) => <span key={i} aria-hidden={i >= data.items.length}>{t}</span>)}
      </div>
    </section>
  );
}

export function Focus({ data }) {
  return (
    <section className="section">
      <div className="container">
        <SecHead eyebrow={data.eyebrow} heading={data.heading} text={data.text} />
        <div className="grid3">
          {data.cards.map((c, i) => (
            <Reveal as="article" delay={i} className="card" key={c.title}>
              <div className={`blob ${c.blob}`} />
              <div className="icon-box" style={{ background: BG[c.bg] }}><Icon name={c.icon} /></div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <div className="tags">{c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              <a href={c.link.href} className="link">{c.link.label} <Icon name="arrowRight" /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Band({ data }) {
  return (
    <section style={{ padding: "0 0 6rem" }}>
      <div className="container">
        <Reveal className="band">
          <h2>{data.title}</h2>
          <p>{data.text}</p>
          <Button href={data.cta.href} variant="white" arrow>{data.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Process({ data, first }) {
  return (
    <section className={`section alt${first ? " first" : ""}`} id="process">
      <div className="container">
        <SecHead eyebrow={data.eyebrow} heading={data.heading} text={data.text} />
        <div className="steps">
          {data.steps.map((s, i) => (
            <Reveal className="step" delay={i} key={s.n}>
              <div className="num">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why({ data }) {
  return (
    <section className="section" id="why">
      <div className="container why">
        <Reveal className="sticky">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2><Heading parts={data.heading} /></h2>
          <p>{data.text}</p>
          <Button href={data.cta.href} arrow>{data.cta.label}</Button>
        </Reveal>
        <div className="why-grid">
          {data.items.map((it, i) => (
            <Reveal className="why-item" delay={i % 2} key={it.title}>
              <div className="icon-box" style={{ background: BG[it.bg] }}><Icon name={it.icon} /></div>
              <div><h4>{it.title}</h4><p>{it.text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
