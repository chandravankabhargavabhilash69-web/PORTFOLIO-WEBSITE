// ============================================================
//  ALEX MORGAN — Portfolio Script (React + Vanilla JS Hooks)
// ============================================================

const { useState, useEffect, useRef } = React;

// ─── DATA ────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About",     href: "#about",           num: "01." },
  { label: "Skills",    href: "#skills",           num: "02." },
  { label: "Education", href: "#education",        num: "03." },
  { label: "Projects",  href: "#projects",         num: "04." },
  { label: "Activities",href: "#extracurricular",  num: "05." },
  { label: "Contact",   href: "#contact",          num: "06." },
];

const SKILLS = [
  {
    category: "Frontend",
    icon: "layout",
    items: [
      { name: "React / Next.js", pct: 90 },
      { name: "TypeScript",      pct: 85 },
      { name: "CSS / Tailwind",  pct: 88 },
    ],
  },
  {
    category: "Backend",
    icon: "server",
    items: [
      { name: "Node.js / Express", pct: 82 },
      { name: "Python / Django",   pct: 75 },
      { name: "REST & GraphQL",    pct: 80 },
    ],
  },
  {
    category: "Database",
    icon: "database",
    items: [
      { name: "PostgreSQL",   pct: 78 },
      { name: "MongoDB",      pct: 72 },
      { name: "Redis",        pct: 65 },
    ],
  },
  {
    category: "DevOps",
    icon: "cloud",
    items: [
      { name: "Docker / K8s", pct: 70 },
      { name: "AWS / GCP",    pct: 68 },
      { name: "CI/CD",        pct: 74 },
    ],
  },
];

const TECH_TAGS = [
  "JavaScript","TypeScript","React","Next.js","Node.js","Python",
  "PostgreSQL","MongoDB","GraphQL","Docker","AWS","Git","Figma",
  "TailwindCSS","Redux","Prisma",
];

const EDUCATION = [
  {
    date: "2021 – 2025",
    degree: "B.Tech in Computer Science & Engineering",
    school: "JNTUK University, Vizag",
    desc: "Specialized in software engineering, data structures, and distributed systems. Active member of the college coding club and open-source society.",
    gpa: "8.9 / 10",
  },
  {
    date: "2019 – 2021",
    degree: "Class XII — Science (MPC)",
    school: "Narayana Junior College, Vizag",
    desc: "Focused on Mathematics, Physics, and Computer Science. Secured rank in state-level olympiad.",
    gpa: "95.4%",
  },
  {
    date: "2017 – 2019",
    degree: "Class X — SSC",
    school: "Delhi Public School, Vizag",
    desc: "Developed strong foundations in mathematics and science. School topper in computer applications.",
    gpa: "98.2%",
  },
];

const PROJECTS = [
  {
    num: "01",
    icon: "zap",
    title: "DevFlow — Real-time Collaboration Suite",
    desc: "A VS Code-like collaborative code editor with live cursors, comments, voice rooms, and integrated GitHub PR reviews. Handles 10k+ concurrent connections using WebSockets and Redis pub/sub.",
    stack: ["Next.js","TypeScript","Socket.io","Redis","PostgreSQL","Liveblocks"],
    live: "#",
    github: "#",
    featured: true,
  },
  {
    num: "02",
    icon: "shopping-bag",
    title: "Kart — E-commerce Platform",
    desc: "Full-stack e-commerce solution with Stripe payments, inventory management, and an admin analytics dashboard.",
    stack: ["React","Node.js","Stripe","MongoDB"],
    live: "#",
    github: "#",
    featured: false,
  },
  {
    num: "03",
    icon: "activity",
    title: "PulseAI — Health Dashboard",
    desc: "AI-powered health tracker that analyzes wearable data and generates personalised fitness and nutrition reports.",
    stack: ["Python","FastAPI","React","TensorFlow"],
    live: "#",
    github: "#",
    featured: false,
  },
  {
    num: "04",
    icon: "bar-chart-2",
    title: "DataLens — Analytics SaaS",
    desc: "No-code data visualisation tool that connects to 20+ data sources and auto-generates executive dashboards.",
    stack: ["Vue.js","D3.js","PostgreSQL","Go"],
    live: "#",
    github: "#",
    featured: false,
  },
];

const EXTRAS = [
  {
    icon: "code-2",
    title: "Open Source Contributor",
    org: "Various GitHub projects",
    desc: "Active contributor to React ecosystem libraries; 200+ merged PRs across projects including Radix UI and TanStack.",
  },
  {
    icon: "award",
    title: "Hackathon Winner",
    org: "Smart India Hackathon 2024",
    desc: "Led a 6-member team to build a disaster-response coordination platform. Won ₹1L prize among 3,000+ teams.",
  },
  {
    icon: "users",
    title: "Technical Lead",
    org: "GDSC JNTUK Chapter",
    desc: "Organised weekly workshops, study jams, and speaker sessions for 400+ student developers across the campus.",
  },
  {
    icon: "pen-tool",
    title: "Tech Blogger",
    org: "Medium & Dev.to",
    desc: "Publish deep-dives on React internals, system design, and career advice. 15k+ monthly readers.",
  },
  {
    icon: "mic",
    title: "Conference Speaker",
    org: "ReactConf India 2024",
    desc: "Spoke on 'Micro-Frontends in Production' to an audience of 600+ engineers. Rated 4.8/5 by attendees.",
  },
  {
    icon: "heart",
    title: "NGO Volunteer",
    org: "Teach For India",
    desc: "Weekend coding instructor for underprivileged students in Vizag; helped 30+ kids build their first websites.",
  },
];

// ─── UTILITY HOOKS ───────────────────────────────────────────

function useScrollSpy() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll(".skill-bar-fill");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const pct = e.target.getAttribute("data-pct");
            e.target.style.width = pct + "%";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach(b => io.observe(b));
    return () => io.disconnect();
  }, []);
}

// ─── NAV ─────────────────────────────────────────────────────

function Nav({ theme, toggleTheme }) {
  const scrolled = useScrollSpy();
  const [menuOpen, setMenuOpen] = useState(false);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a className="nav-logo" href="#home" onClick={e => smoothScroll(e, "#home")}>
          alex<span>.</span>dev
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} data-num={l.num} onClick={e => smoothScroll(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            <i data-lucide={theme === "dark" ? "sun" : "moon"} style={{width:16,height:16}} />
          </button>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={e => smoothScroll(e, l.href)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home">
      <div className="hero-grid-bg" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-eyebrow">Available for opportunities</div>
          <h1 className="hero-name">
            Alex<br />
            <span className="last">Morgan</span>
          </h1>
          <p className="hero-role">Full-Stack Engineer &amp; Open-Source Enthusiast</p>
          <p className="hero-desc">
            I build <strong>fast, accessible, beautiful</strong> web experiences — from thoughtful UI
            to scalable distributed systems. Based in Visakhapatnam 🌊
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              <i data-lucide="folder-open" style={{width:16,height:16}} />
              View Projects
            </a>
            <a className="btn btn-ghost" href="#contact">
              <i data-lucide="send" style={{width:16,height:16}} />
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-photo-wrapper">
          <div className="hero-photo-frame">
            <div className="photo-placeholder">
              <i data-lucide="user" style={{width:64,height:64}} />
              <span>Your photo here</span>
            </div>
            <div className="hero-badges">
              <div className="badge">
                <span className="badge-dot" />
                Open to work
              </div>
              <div className="badge">
                <i data-lucide="map-pin" style={{width:11,height:11}} />
                Vizag, India
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────

function About() {
  return (
    <section id="about">
      <div className="section-wrapper">
        <div className="section-label reveal">about me</div>
        <h2 className="section-title reveal">
          Passionate about <span>craft</span> &amp; impact
        </h2>

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              Hey! I'm <strong>Alex Morgan</strong>, a full-stack developer who loves turning complex
              problems into elegant, user-friendly solutions. I started coding at 14 tinkering with
              HTML & CSS, and I haven't stopped since.
            </p>
            <p>
              Currently pursuing my B.Tech in Computer Science at JNTUK, I've had the chance to work
              on projects spanning real-time collaboration tools, AI dashboards, and e-commerce platforms.
              I thrive at the <strong>intersection of design and engineering</strong>.
            </p>
            <p>
              When I'm not coding, you'll find me writing tech articles, contributing to open-source,
              speaking at developer meetups, or exploring the coastal ghats around Vizag 🌄.
            </p>

            <div className="about-stats">
              {[
                { num: "3+", label: "Years Coding" },
                { num: "20+", label: "Projects Built" },
                { num: "200+", label: "OSS Contributions" },
                { num: "15k", label: "Blog Readers/mo" },
              ].map(s => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image-side reveal">
            <div className="about-terminal">
              <div className="terminal-bar">
                <div className="terminal-dot"/><div className="terminal-dot"/><div className="terminal-dot"/>
                <div className="terminal-title">alex@portfolio: ~/whoami</div>
              </div>
              <div className="terminal-body">
                <div className="t-comment">// about.json</div>
                <br/>
                <span className="t-key">name</span>: <span className="t-str">"Alex Morgan"</span>,<br/>
                <span className="t-key">role</span>: <span className="t-str">"Full-Stack Engineer"</span>,<br/>
                <span className="t-key">location</span>: <span className="t-str">"Vizag, India"</span>,<br/>
                <span className="t-key">education</span>: <span className="t-str">"B.Tech CSE"</span>,<br/>
                <span className="t-key">passions</span>: [<br/>
                &nbsp;&nbsp;<span className="t-str">"Open Source"</span>,<br/>
                &nbsp;&nbsp;<span className="t-str">"System Design"</span>,<br/>
                &nbsp;&nbsp;<span className="t-str">"Teaching"</span>,<br/>
                ],<br/>
                <span className="t-key">available</span>: <span className="t-val">true</span>,<br/>
                <span className="t-key">coffee</span>: <span className="t-str">"always ☕"</span><br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────

function Skills() {
  useSkillBars();
  return (
    <section id="skills">
      <div className="section-wrapper">
        <div className="section-label reveal">expertise</div>
        <h2 className="section-title reveal">Skills &amp; <span>Technologies</span></h2>

        <div className="skills-grid">
          {SKILLS.map((cat, i) => (
            <div className="skill-category reveal" key={cat.category} style={{transitionDelay: `${i*0.08}s`}}>
              <div className="skill-cat-title">
                <span className="skill-cat-icon">
                  <i data-lucide={cat.icon} style={{width:14,height:14}} />
                </span>
                {cat.category}
              </div>
              {cat.items.map(skill => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-meta">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-pct={skill.pct} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="tech-tags reveal">
          {TECH_TAGS.map(t => (
            <span className="tech-tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────

function Education() {
  return (
    <section id="education">
      <div className="section-wrapper">
        <div className="section-label reveal">background</div>
        <h2 className="section-title reveal">
          My <span>Education</span> Journey
        </h2>
        <div className="timeline">
          {EDUCATION.map((ed, i) => (
            <div className="timeline-item reveal" key={i} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="timeline-dot" />
              <div className="timeline-date">{ed.date}</div>
              <div className="timeline-card">
                <div className="timeline-degree">{ed.degree}</div>
                <div className="timeline-school">{ed.school}</div>
                <div className="timeline-desc">{ed.desc}</div>
                <div className="timeline-gpa">
                  <i data-lucide="star" style={{width:11,height:11}} />
                  GPA / Score: {ed.gpa}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects">
      <div className="section-wrapper">
        <div className="section-label reveal">work</div>
        <h2 className="section-title reveal">Featured <span>Projects</span></h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              className={`project-card reveal ${p.featured ? "featured" : ""}`}
              key={p.num}
              style={{transitionDelay:`${i*0.08}s`}}
            >
              <div className="project-num">Project {p.num}</div>
              <div className="project-icon">
                <i data-lucide={p.icon} style={{width:20,height:20}} />
              </div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-stack">
                {p.stack.map(t => <span className="stack-tag" key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                <a href={p.live} className="project-link" target="_blank" rel="noreferrer">
                  <i data-lucide="external-link" style={{width:13,height:13}} /> Live demo
                </a>
                <a href={p.github} className="project-link" target="_blank" rel="noreferrer">
                  <i data-lucide="github" style={{width:13,height:13}} /> Source
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXTRACURRICULAR ─────────────────────────────────────────

function Extracurricular() {
  return (
    <section id="extracurricular">
      <div className="section-wrapper">
        <div className="section-label reveal">beyond code</div>
        <h2 className="section-title reveal">
          Extracurricular <span>Activities</span>
        </h2>

        <div className="extra-grid">
          {EXTRAS.map((ex, i) => (
            <div className="extra-card reveal" key={i} style={{transitionDelay:`${i*0.07}s`}}>
              <div className="extra-icon-wrap">
                <i data-lucide={ex.icon} style={{width:20,height:20}} />
              </div>
              <div className="extra-content">
                <div className="extra-title">{ex.title}</div>
                <div className="extra-org">{ex.org}</div>
                <div className="extra-desc">{ex.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Simulate send
      setTimeout(() => setSent(true), 400);
    }
  };

  return (
    <section id="contact">
      <div className="section-wrapper">
        <div className="section-label reveal">get in touch</div>
        <h2 className="section-title reveal">Let's <span>Work Together</span></h2>

        <div className="contact-wrapper">
          <div className="contact-info reveal">
            <p>
              I'm always open to interesting projects, collaborations, or just a good conversation
              about technology. Whether you have a freelance project, an internship opportunity, or
              want to say hi — my inbox is open!
            </p>

            <div className="contact-items">
              <a href="mailto:alex@example.com" className="contact-item">
                <span className="contact-item-icon">
                  <i data-lucide="mail" style={{width:16,height:16}} />
                </span>
                alex@example.com
              </a>
              <a href="tel:+919876543210" className="contact-item">
                <span className="contact-item-icon">
                  <i data-lucide="phone" style={{width:16,height:16}} />
                </span>
                +91 98765 43210
              </a>
              <div className="contact-item">
                <span className="contact-item-icon">
                  <i data-lucide="map-pin" style={{width:16,height:16}} />
                </span>
                Visakhapatnam, Andhra Pradesh, India
              </div>
            </div>

            <div className="social-row">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn">
                <i data-lucide="github" style={{width:15,height:15}} />
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
                <i data-lucide="linkedin" style={{width:15,height:15}} />
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn">
                <i data-lucide="twitter" style={{width:15,height:15}} />
                Twitter
              </a>
            </div>
          </div>

          <div className="contact-form reveal" style={{transitionDelay:"0.15s"}}>
            {!sent ? (
              <form onSubmit={handleSubmit} noValidate>
                {[
                  { id: "name",    label: "Your Name",    type: "text",  placeholder: "Alex Morgan"      },
                  { id: "email",   label: "Email Address",type: "email", placeholder: "alex@example.com" },
                  { id: "subject", label: "Subject",      type: "text",  placeholder: "Project Inquiry"  },
                ].map(f => (
                  <div className="form-group" key={f.id}>
                    <label className="form-label" htmlFor={f.id}>{f.label}</label>
                    <input
                      id={f.id}
                      className={`form-input ${errors[f.id] ? "error" : ""}`}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id]}
                      onChange={e => setForm(p => ({...p, [f.id]: e.target.value}))}
                    />
                    <div className={`form-error ${errors[f.id] ? "show" : ""}`}>{errors[f.id]}</div>
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className={`form-textarea ${errors.message ? "error" : ""}`}
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  />
                  <div className={`form-error ${errors.message ? "show" : ""}`}>{errors.message}</div>
                </div>
                <button type="submit" className="form-submit">
                  <i data-lucide="send" style={{width:16,height:16}} />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="form-success show">
                <i data-lucide="check-circle" style={{width:48,height:48,color:"var(--green)"}} />
                <strong style={{fontSize:"1.1rem",color:"var(--text)"}}>Message sent! 🎉</strong>
                <span style={{color:"var(--text2)",fontSize:"0.9rem"}}>
                  I'll get back to you within 24 hours.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────

function Footer() {
  return (
    <footer>
      <span>Designed &amp; Built by <strong style={{color:"var(--accent2)"}}>Alex Morgan</strong></span>
      <span style={{display:"flex",gap:"1rem"}}>
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{color:"inherit",display:"flex",alignItems:"center",gap:"0.4rem"}}>
          <i data-lucide="github" style={{width:14,height:14}} />
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{color:"inherit",display:"flex",alignItems:"center",gap:"0.4rem"}}>
          <i data-lucide="linkedin" style={{width:14,height:14}} />
          LinkedIn
        </a>
      </span>
    </footer>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // Init Lucide icons after every render
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  // Scroll reveal
  useReveal();

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Extracurricular />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
