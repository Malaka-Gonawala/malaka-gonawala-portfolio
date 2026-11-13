import { en } from "@/content/en";

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
        <div className="intro g" id="intro">
          <p>{en.hero.line}</p>
          <a className="btn" href="#work">
            {en.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

// Underneath: the page turns into its own hex dump and cools into the underside.
function Underneath() {
  return (
    <section id="under" data-sec="Underneath">
      <div className="stick" id="hxs">
        <canvas id="hxc" aria-hidden="true"></canvas>
        <div className="under g">
          <h2 className="d">Underneath</h2>
          <p className="term mono" id="term">
            <Term now={en.now} />
          </p>
        </div>
      </div>
    </section>
  );
}

// Work with me: an odometer rolls 1, 2, 3 over the offers (copy still to come, S9).
function Hire() {
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
            <ul id="rows6"></ul>
            <a className="btn" id="q4" href="#contact">
              Ask for a quote
            </a>
          </div>
        </div>
      </div>
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
