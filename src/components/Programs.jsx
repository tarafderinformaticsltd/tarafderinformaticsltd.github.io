import { Button, Reveal, SecHead } from "./ui";

function Tree({ labels }) {
  const [root, l, r, lb, rb] = labels;
  return (
    <svg className="flow" viewBox="0 0 400 320" aria-hidden="true">
      <path className="edge" d="M200 70 L90 160M200 70 L310 160M90 160 L90 250M310 160 L310 250M90 160 L310 160" />
      <g className="pulse"><rect className="node-o" x="140" y="40" width="120" height="60" rx="16" /><text x="200" y="76">{root}</text></g>
      <rect className="node" x="30" y="130" width="120" height="60" rx="16" /><text x="90" y="166">{l}</text>
      <rect className="node" x="250" y="130" width="120" height="60" rx="16" /><text x="310" y="166">{r}</text>
      <rect className="node-o" x="30" y="220" width="120" height="60" rx="16" /><text x="90" y="256">{lb}</text>
      <rect className="node-o" x="250" y="220" width="120" height="60" rx="16" /><text x="310" y="256">{rb}</text>
    </svg>
  );
}

function Journey({ labels }) {
  const pts = [[60, 250], [140, 200], [220, 205], [300, 120]];
  const end = [350, 60];
  const path = [...pts, end].map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  return (
    <svg className="flow" viewBox="0 0 400 320" aria-hidden="true">
      <path className="edge" d={path} />
      {pts.map(([x, y], i) => (
        <g key={labels[i]}>
          <circle className={i % 2 ? "node" : "node-o"} cx={x} cy={y} r="18" />
          <text x={x} y={y + 40}>{labels[i]}</text>
        </g>
      ))}
      <g className="pulse"><circle cx={end[0]} cy={end[1]} r="26" fill="#e25913" /><text x={end[0]} y={end[1] + 5} style={{ fill: "#fff" }}>{labels[4]}</text></g>
    </svg>
  );
}

function Dashboard({ bars }) {
  return (
    <div className="mock" aria-hidden="true">
      <div className="bar"><i /><i /><i /></div>
      <div className="body">
        <div className="row g" /><div className="row" style={{ width: "80%" }} /><div className="row" style={{ width: "62%" }} />
        <div className="bars">
          {bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.4}s` }} />)}
        </div>
      </div>
    </div>
  );
}

function Visual({ v }) {
  return (
    <div className={`f-vis vis-${v.bg}`}>
      {v.type === "tree" && <Tree labels={v.labels} />}
      {v.type === "journey" && <Journey labels={v.labels} />}
      {v.type === "dashboard" && <Dashboard bars={v.bars} />}
    </div>
  );
}

export default function Programs({ data, first }) {
  return (
    <section className={`section${first ? " first" : ""}`}>
      <div className="container">
        <SecHead eyebrow={data.eyebrow} heading={data.heading} text={data.text} />
        {data.items.map((p, i) => (
          <Reveal as="article" className={`feature${i % 2 ? " flip" : ""}`} key={p.title}>
            <Visual v={p.visual} />
            <div className="f-body">
              <span className="kicker">{p.kicker}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              <Button href={p.cta.href} size="sm">{p.cta.label}</Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
