import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { en } from "@/content/en";
import log from "virtual:buildlog";

const Term = ({ now }) => (
  <>
    <span>
      <b>PS C:\Users\Malaka&gt;</b> whoami
    </span>
    <span>front-end developer</span>
    <span>
      <b>PS C:\Users\Malaka&gt;</b> dir .\next
    </span>
    <span>ccna unimi-security-ai (planned)</span>
    {now && (
      <>
        <span>
          <b>PS C:\Users\Malaka&gt;</b> type .\now.txt
        </span>
        <span>{now}</span>
      </>
    )}
  </>
);

// The name folds into an address bar; the featured projects and the list load in the window under it.
function AddressBar() {
  return (
    <section id="ab" data-sec="Home">
      <div className="stick" id="abs">
        <h1 className="sr" tabIndex="-1">
          Malaka Gonawala
        </h1>
        {/* first in the Tab order: the hero line and its button show before the window does */}
        <div className="intro g" id="intro">
          <p>{en.hero.line}</p>
          <a className="btn" href="#work">
            {en.hero.cta}
          </a>
        </div>
        <div className="aw" id="win">
          <div className="abar">
            <div className="pill">
              <svg aria-hidden="true">
                <rect id="rr" x=".6" y=".6" pathLength="1" />
              </svg>
              <div className="url" id="url" aria-hidden="true"></div>
              <span className="caret" id="car"></span>
            </div>
            <span className="cnt" id="cnt" aria-hidden="true">
              1 / 2
            </span>
            <span className="load" id="load"></span>
          </div>
          <a className="abody" id="abody" href="#p-forvalue">
            <span className="skel"></span>
            <img id="shot" alt="" />
            <img className="b" id="shot2" alt="" />
            <span className="op" id="op">
              <span className="ol" id="ol">
                <p>~/work/other-projects</p>
              </span>
              <span className="pane" aria-hidden="true">
                <span className="pbar">
                  <span id="purl"></span>
                  <i id="pld"></i>
                </span>
                <span className="sh" id="pshot"></span>
              </span>
            </span>
          </a>
          <div className="ameta" id="meta">
            <h2 className="d" id="ttl">
              ForValue
            </h2>
            <a className="go" id="go" href="#p-forvalue">
              Open project →
            </a>
          </div>
        </div>
        <div className="name" id="name" aria-hidden="true"></div>
        <div className="xr" id="xr" aria-hidden="true">
          <pre id="code"></pre>
          <p className="d">Malaka Gonawala</p>
          <p className="term mono">
            <Term />
          </p>
        </div>
      </div>
    </section>
  );
}

// A01: the site as five layers; every layer names a real file or tag, with the same facts as a table.
const LAYERS = [
  ["content", "src/content/en.js"],
  ["styles", "src/site.css, Tailwind v4"],
  ["scripts", "src/lib/site.js, GSAP"],
  ["meta tags", "index.html: charset, viewport, lang"],
  ["host", "CNAME: malakagonawala.dev"],
];
// Option F: when the stack's beat arrives the layers lift one by one with their rows lit (B); afterwards hovering or
// focusing a row lifts its layer (D). Lifts need a fine pointer and motion; under Calm, reduced motion and touch the
// stack rests and a focused row is only lit.
const moving = () =>
  !document.documentElement.classList.contains("rm") &&
  matchMedia("(hover: hover) and (pointer: fine)").matches;
function Layers() {
  const ref = useRef(null),
    [on, setOn] = useState(-1),
    lit = (i) => (i == on ? "on" : undefined);
  // the plate of the lit row lifts, the others go back down (time-based, so it never rests part-way)
  useEffect(() => {
    moving() &&
      gsap.to(ref.current.querySelectorAll(".stack i"), {
        "--lift": (k) => (k == on ? 28 : 0),
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
  }, [on]);
  // the beat starts (and stops) the one-by-one lift; leaving the beat resets it
  useEffect(() => {
    const el = ref.current;
    let tl;
    const beat = (e) => {
      tl?.kill();
      setOn(-1);
      if (!e.detail || !moving()) return;
      tl = gsap.timeline();
      LAYERS.forEach((_, i) => tl.call(setOn, [i], 0.15 + i * 0.35));
      tl.call(setOn, [-1], 0.15 + LAYERS.length * 0.35);
    };
    el.addEventListener("beat", beat);
    return () => {
      tl?.kill();
      el.removeEventListener("beat", beat);
    };
  }, []);
  return (
    <div className="a01" id="a01" ref={ref}>
      <div className="stack" aria-hidden="true">
        {LAYERS.map(([n], i) => (
          <i key={n} className={lit(i)} style={{ "--i": i }}>
            {n}
          </i>
        ))}
      </div>
      <table>
        <caption>The same thing as text</caption>
        <thead>
          <tr>
            <th>What you see</th>
            <th>Real file or tag</th>
            <th>What protects it</th>
          </tr>
        </thead>
        <tbody onMouseLeave={() => setOn(-1)}>
          {LAYERS.map(([n, f], i) => (
            <tr
              key={n}
              className={lit(i)}
              tabIndex="0"
              onFocus={() => setOn(i)}
              onBlur={() => setOn(-1)}
              onMouseEnter={() => setOn(i)}
            >
              <td>{n}</td>
              <td>{f}</td>
              <td>[Malaka to word]</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// The build log as one command line: Enter or a click runs `git log --merges` and folds it away again (challenge 3, Malaka).
function GitLog({ rows }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="term mono" id="log">
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <b>PS C:\Users\Malaka\site&gt;</b> git log --merges
        <kbd aria-hidden="true">↵</kbd>
      </button>
      {open && (
        <ul>
          {rows.map(([sha, date, title]) => (
            <li key={sha}>
              <b>{sha}</b> {date} <em>{title}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Underneath: the page turns into its own hex dump and cools into the underside.
function Underneath() {
  return (
    <section id="under" data-sec="Underneath">
      <div className="stick" id="hxs">
        <canvas id="hxc" aria-hidden="true"></canvas>
        <div className="under g">
          <h2 className="d shut" aria-label="Underneath">
            <span aria-hidden="true">Underneath</span>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} aria-hidden="true" style={{ "--i": i }}>
                Underneath
              </span>
            ))}
          </h2>
          <div className="u2">
            <p className="term mono" id="term">
              <Term now={en.now} />
            </p>
            <Layers />
            {log.length > 0 && <GitLog rows={log} />}
          </div>
        </div>
      </div>
    </section>
  );
}

// Work with me: an odometer rolls 1, 2, 3 over the offers, printed as tear-off tickets (R19); "Pick this offer"
// opens a three-step questionnaire (S03) in a modal dialog (Escape closes, focus stays inside). Copy still to come (S9);
// the answers are not sent anywhere yet.
const OPTS = ["[Option A]", "[Option B]", "[Option C]", "[Not sure yet]"];
function Hire() {
  const dlg = useRef(null),
    [offer, setOffer] = useState(1),
    [step, setStep] = useState(0),
    pick = (n) => {
      setOffer(n);
      setStep(0);
      dlg.current.showModal();
    },
    next = () => {
      if (step < 2) return setStep(step + 1);
      dlg.current.close();
      document.getElementById("q4").click();
    };
  return (
    <section id="hire" data-sec="Work with me" aria-label="Work with me">
      <div className="stick g">
        <div className="o4">
          <div className="od" aria-hidden="true">
            <div className="dw">
              <div id="strip">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
            </div>
            <span className="of">/3</span>
          </div>
          <div>
            <h2 className="lbl">Work with me</h2>
            <ul id="rows6">
              {[1, 2, 3].map((n) => (
                <li className="r2" key={n}>
                  <span className="n">No. 0{n}</span>
                  <span className="big">[Offer {n}]</span>
                  <span className="more">
                    <span>
                      [What you get, how long it takes, from what price: Phase
                      5]
                    </span>
                  </span>
                  <button className="pick" onClick={() => pick(n)}>
                    Pick this offer
                  </button>
                  <span className="stub" aria-hidden="true">
                    TEAR HERE
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn" id="q4" href="#contact">
              Ask for a quote
            </a>
          </div>
        </div>
      </div>
      <dialog
        className="quiz"
        ref={dlg}
        aria-label={`[Offer ${offer}]`}
        onKeyDown={(e) => {
          // keep Tab inside the dialog: wrap from the last control to the first and back
          const f = [...dlg.current.querySelectorAll("input, button")].filter(
              (el) => el.offsetParent,
            ),
            [a, z] = e.shiftKey ? [f[0], f.at(-1)] : [f.at(-1), f[0]];
          if (e.key == "Tab" && document.activeElement == a) {
            e.preventDefault();
            z.focus();
          }
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
        >
          <p className="qp">
            Offer: <b>[Offer {offer}]</b> · Question {step + 1} of 3 · every
            step can be skipped
          </p>
          <span className="qbar" style={{ "--s": step + 1 }}></span>
          {[0, 1, 2].map((q) => (
            <fieldset key={q} hidden={q != step}>
              <legend className="d">
                [Question {q + 1}, Malaka writes it]
              </legend>
              {OPTS.map((t) => (
                <label key={t}>
                  <input type="radio" name={"q" + q} value={t} /> {t}
                </label>
              ))}
            </fieldset>
          ))}
          <p className="qa">
            <button type="button" className="skip" onClick={next}>
              Skip
            </button>
            <button className="btn">Next ↵</button>
          </p>
        </form>
      </dialog>
    </section>
  );
}

// Contact: the footer decodes from hex as a read head climbs.
function Contact() {
  return (
    <section id="ft" data-sec="Contact" aria-label="Contact">
      <div id="fts">
        <footer className="g" id="fc">
          <a href="#contact" style={{ fontSize: 22 }}>
            Write me a letter →
          </a>
          <p className="d big">Malaka Gonawala</p>
          <div className="row">
            <a href="https://github.com/Malaka-Gonawala">GitHub</a>
            <a href="https://www.linkedin.com/in/malaka-gonawala-a923813a6/">
              LinkedIn
            </a>
            <a href="#resume">Resume</a>
            <span>EN · IT</span>
            <span>© 2026</span>
          </div>
        </footer>
        <canvas id="hx" aria-hidden="true"></canvas>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="homeView">
      <AddressBar />
      <span id="work"></span>
      <Underneath />
      <Hire />
      <Contact />
    </main>
  );
}
