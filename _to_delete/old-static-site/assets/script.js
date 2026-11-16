// Tarafder Informatics Ltd. — site behaviour
const CONFIG = {
  // Set this to the organization's contact email. The form opens the visitor's mail app addressed here.
  email: ""
};

// Sticky pill nav
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const menu = document.getElementById("mobileMenu");
document.getElementById("menuBtn").addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Scroll-spy for nav
const links = [...document.querySelectorAll("#navLinks a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) spy.observe(s); });

// Reveal on scroll
const rev = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => rev.observe(el));

// Marquee: duplicate content for seamless loop
const marq = document.getElementById("marquee");
marq.innerHTML += marq.innerHTML;

// CEP attributes (Washington Accord complex problem attributes P1–P7)
const CEP = [
  { code: "P1", title: "Depth of knowledge required", text: "Solving the problem needs in-depth engineering knowledge — fundamentals plus specialist, research-based understanding — rather than routine application of standard methods.", ex: "Designing a low-cost water-quality monitor needs sensing, signal processing, power and data-communication knowledge together." },
  { code: "P2", title: "Range of conflicting requirements", text: "Technical, engineering and other issues pull in different directions — cost versus performance, speed versus safety — and must be balanced.", ex: "A rural health-record app must be secure, work offline, stay cheap and be simple for first-time users." },
  { code: "P3", title: "Depth of analysis required", text: "There are no obvious solutions. Abstract thinking, originality and first-principles analysis are needed to build suitable models.", ex: "Predicting traffic flow across a city needs custom models, not a textbook formula." },
  { code: "P4", title: "Familiarity of issues", text: "The problem involves infrequently encountered issues, so familiar patterns and past solutions do not simply transfer.", ex: "Adapting a known IoT design to extreme flood conditions raises issues the standard design never faced." },
  { code: "P5", title: "Extent of applicable codes", text: "The problem lies outside what standards and codes of practice explicitly cover, so judgement is needed where the rules run out.", ex: "Deploying a new energy-storage method where no safety standard exists yet." },
  { code: "P6", title: "Extent of stakeholder involvement", text: "Many groups with widely differing needs are involved — users, regulators, communities, funders — and their needs must be reconciled.", ex: "A new riverside market affects traders, residents, city authorities and the environment." },
  { code: "P7", title: "Interdependence", text: "The problem is made of many parts or sub-problems that depend on each other, so a change in one ripples through the rest.", ex: "A smart-grid project where generation, storage, billing and user apps constantly influence each other." }
];
const list = document.getElementById("cepList"), panel = document.getElementById("cepPanel");
function showCEP(i) {
  const c = CEP[i];
  [...list.children].forEach((b, k) => b.classList.toggle("on", k === i));
  panel.innerHTML = `<div class="code">${c.code}</div><h3>${c.title}</h3><p>${c.text}</p><div class="ex"><b>Example:</b> ${c.ex}</div>`;
}
CEP.forEach((c, i) => {
  const b = document.createElement("button");
  b.className = "cep-btn"; b.type = "button";
  b.innerHTML = `<span class="n">${c.code}</span>${c.title}`;
  b.addEventListener("click", () => showCEP(i));
  list.appendChild(b);
});
showCEP(0);

// Contact form chips
const chips = [...document.querySelectorAll("#chips .chip")];
chips.forEach(c => c.addEventListener("click", () => { chips.forEach(x => x.classList.remove("on")); c.classList.add("on"); }));

// Contact form -> mailto
const emailText = document.getElementById("emailText");
if (CONFIG.email) emailText.textContent = CONFIG.email;
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg").value.trim();
  const out = document.getElementById("formMsg");
  out.classList.add("show");
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) { out.textContent = "Please fill in your name, a valid email and a message."; return; }
  const topic = document.querySelector("#chips .chip.on").textContent;
  if (!CONFIG.email) { out.textContent = "Thanks, " + name + "! The contact email has not been set up yet — please add it in assets/script.js (CONFIG.email)."; return; }
  const body = `Name: ${name}\nEmail: ${email}\nInterest: ${topic}\n\n${msg}`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Tarafder Informatics — " + topic)}&body=${encodeURIComponent(body)}`;
  out.textContent = "Opening your email app… thank you for reaching out!";
});

document.getElementById("year").textContent = new Date().getFullYear();
