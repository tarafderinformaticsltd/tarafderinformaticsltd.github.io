import { useState } from "react";
import site from "../data/site.json";
import { Icon, Reveal, SecHead } from "./ui";

export default function Contact({ data, first }) {
  const { info, form } = data;
  const fromQuery = new URLSearchParams(window.location.search).get("interest");
  const [interest, setInterest] = useState(form.interests.includes(fromQuery) ? fromQuery : form.interests[0]);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");

  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const { name, email, message } = values;
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email.trim()) || !message.trim()) return setMsg(form.messages.invalid);
    if (!site.email) return setMsg(form.messages.noEmail);
    const body = `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(form.subjectPrefix + interest)}&body=${encodeURIComponent(body)}`;
    setMsg(form.messages.opening);
  };

  const rows = [
    { icon: "mail", label: info.emailLabel, value: site.email || info.emailFallback },
    { icon: "pin", label: info.locationLabel, value: site.location },
    { icon: "users", label: info.audienceLabel, value: info.audience },
  ];

  return (
    <section className={`section alt${first ? " first" : ""}`}>
      <div className="container">
        <SecHead eyebrow={data.eyebrow} heading={data.heading} text={data.text} />
        <div className="contact">
          <Reveal as="aside" className="info-card">
            <h3>{info.title}</h3>
            <p>{info.text}</p>
            {rows.map((r) => (
              <div className="info-row" key={r.label}>
                <span className="ic"><Icon name={r.icon} /></span>
                <div><small>{r.label}</small>{r.value}</div>
              </div>
            ))}
            <span className="avail"><i />{info.availability}</span>
          </Reveal>

          <Reveal as="form" delay={1} className="form" onSubmit={submit} noValidate>
            <h4>{form.interestLabel}</h4>
            <div className="chips">
              {form.interests.map((t) => (
                <button type="button" key={t} className={`chip${t === interest ? " on" : ""}`} onClick={() => setInterest(t)}>{t}</button>
              ))}
            </div>
            <div className="field">
              <label htmlFor="name">{form.fields.name.label}</label>
              <input id="name" value={values.name} onChange={set("name")} placeholder={form.fields.name.placeholder} />
            </div>
            <div className="field">
              <label htmlFor="email">{form.fields.email.label}</label>
              <input id="email" type="email" value={values.email} onChange={set("email")} placeholder={form.fields.email.placeholder} />
            </div>
            <div className="field">
              <label htmlFor="message">{form.fields.message.label}</label>
              <textarea id="message" value={values.message} onChange={set("message")} placeholder={form.fields.message.placeholder} />
            </div>
            <button className="btn btn-brand" style={{ width: "100%" }} type="submit">
              {form.submit} <Icon name="send" />
            </button>
            {msg && <div className="form-msg show">{msg}</div>}
            <p className="note">{form.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
