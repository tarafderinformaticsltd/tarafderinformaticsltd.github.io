import { useState } from "react";
import { Reveal, SecHead } from "./ui";

export default function Cep({ data, first }) {
  const [i, setI] = useState(0);
  const cur = data.items[i];
  return (
    <section className={`section alt${first ? " first" : ""}`}>
      <div className="container">
        <SecHead eyebrow={data.eyebrow} heading={data.heading} text={data.text} />
        <Reveal className="cep">
          <div className="cep-list">
            {data.items.map((c, k) => (
              <button key={c.code} type="button" className={`cep-btn${k === i ? " on" : ""}`} onClick={() => setI(k)}>
                <span className="n">{c.code}</span>{c.title}
              </button>
            ))}
          </div>
          <div className="cep-panel" aria-live="polite">
            <div className="code">{cur.code}</div>
            <h3>{cur.title}</h3>
            <p>{cur.text}</p>
            <div className="ex"><b>{data.exampleLabel}</b> {cur.example}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
