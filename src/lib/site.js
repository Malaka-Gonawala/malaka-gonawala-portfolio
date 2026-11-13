// The site engine, ported from the approved Prototype A v27 (plan/phase4/prototype/src.html) with its timings and eases.
// React renders the markup (src/components); this wires the scroll scenes, Flip menu, loader and routing to it.
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { work } from "@/content/en";

const IMG = import.meta.env.BASE_URL + "img/projects/";
const PITCH = Object.fromEntries(
  [...work.leads, ...work.others].map((p) => [p.slug, p.pitch]),
);
let started = false;

export default function initSite() {
  if (started) return;
  started = true;
  // every ease is a cubic bezier: out (settle), io (cover), pop (overshoot), in (strike)
  gsap.registerPlugin(CustomEase);
  Object.entries({
    out: ".22,1,.36,1",
    io: ".7,0,.2,1",
    pop: ".34,1.56,.64,1",
    in: ".9,0,1,1",
    soft: ".45,0,.15,1",
  }).forEach(([n, v]) => CustomEase.create(n, v));
  const G = gsap,
    $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)],
    root = document.documentElement,
    live = G && !matchMedia("(prefers-reduced-motion: reduce)").matches,
    wide = () => innerWidth > 700,
    seen = (el, fn, t = 0.2) => {
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            o.disconnect();
            fn();
          }
        },
        { threshold: t },
      );
      o.observe(el);
    },
    // name, stage colour, address bar, desktop shot, phone shot (real screenshots where a live site exists)
    PSL = IMG + "prettysrilanka-d.webp",
    X = {
      forvalue: [
        "ForValue",
        "#2E6B40",
        "malaka-gonawala.github.io/forvalue",
        IMG + "forvalue-login-d.webp",
        PITCH.forvalue,
      ],
      fortheroot: [
        "ForTheRoot",
        "#1F2421",
        "h9go.github.io/ForTheRoot",
        IMG + "fortheroot-d.webp",
        PITCH.fortheroot,
      ],
      holoservice: [
        "Holo Service",
        "",
        "holoservice.it",
        IMG + "holoservice-d.webp",
        PITCH.holoservice,
      ],
      "shitos-barber": [
        "Shitos Barber",
        "",
        "shitosbarber.netlify.app",
        IMG + "shitosbarber-d.webp",
        PITCH.shitosbarber,
      ],
      "antigravity-bike": [
        "Antigravity Bikes",
        "#161616",
        "malaka-gonawala.github.io/Antigravity-bike-web",
        IMG + "antigravity-d.webp",
        PITCH.antigravity,
      ],
    },
    P = Object.fromEntries(Object.entries(X).map(([k, v]) => [k, v[0]])),
    shot = (b, alt) =>
      b
        ? `<img src="${b}" alt="${alt}" onload="this.naturalWidth/this.naturalHeight>1.65&&(this.parentNode.style.aspectRatio=this.naturalWidth+'/'+this.naturalHeight)">`
        : `<div class="ph">[${alt}]</div>`,
    img = (s) =>
      `<figure style="margin:0" class="stage"><div class="vp" style="inset:0">${shot(X[s][3], P[s] + " screenshot")}</div></figure>`;

  // pages (placeholders until Phase 5)
  const pages = {
    lab: [
      "Lab",
      `<p>Experiments that open in place: ${["Cavalleria su due ruote", "russian_roulette", "LeetSpeak", "Manuale_html", "traduttore_morse", "Random-Color", "Random_Massage_Generator", "v1, hand-coded"].join(" · ")}.</p><p class="note">[summary + images per experiment, Phase 5]</p>`,
    ],
    about: [
      "About",
      `<h2 class="d">Where it all started</h2><p>It started around the end of 2020 with <a href="https://prettysrilanka.netlify.app/">Pretty Sri Lanka</a>, a course exercise and the first website I ever put online. (Photos supplied by the course instructor.)</p><h2 class="d">Now</h2><p>Today I'm in my fifth year at Istituto Tecnico e Liceo "Enrico Mattei", studying computer science. Alongside school I've built websites for clients, including a cleaning and reception company and a barber shop in Milan.</p><p>Bad UX irritates me, so I build websites that are easy for everyone to use. That's why I'm focusing on accessibility.</p><h2 class="d">Where I'm heading (plans, not done yet)</h2><ul><li>Study security and AI at UNIMI.</li><li>Earn the Cisco CCNA certification.</li><li>Become a full-stack developer who specialises in web security and accessibility, and an agentic engineer (building with AI agents).</li></ul><figure style="margin:0;overflow:hidden"><img class="ph" src="${PSL}" alt="Pretty Sri Lanka home page"></figure><div class="ph" style="aspect-ratio:4/5;max-width:360px">[portrait]</div>`,
    ],
    resume: [
      "Resume",
      `<p class="note">[Web version of the resume, matching the PDF. PDF in EN + IT.]</p>`,
    ],
    contact: [
      "Contact",
      `<form id="f"><label for="t">Dear Malaka,</label><textarea id="t" rows="5" placeholder="Tell me about your project"></textarea><label for="n">Yours,</label><input id="n" placeholder="Your name"><input id="e" type="email" placeholder="Your email" aria-label="Your email"><select id="k" aria-label="Project type"><option>Project type</option><option>Website</option><option>Something else</option></select><p><button class="btn">Send the letter</button></p><p class="note" id="fo" aria-live="polite"></p></form><p>Or write to <span class="mono">malaka@malakagonawala.dev</span></p>`,
    ],
  };
  Object.keys(P).forEach(
    (s, i, a) =>
      (pages["p-" + s] = [
        P[s],
        `${img(s)}<p>${X[s][4]}</p><p class="note">[Role · stack · problem and solution · accessibility note · gallery · phone + desktop shots · live + code links: Phase 5]</p><p><a href="#p-${a[(i + 1) % a.length]}">Next project: ${P[a[(i + 1) % a.length]]} →</a></p>`,
        "Work",
      ]),
  );

  let onPage = false,
    ld = false;
  const sec = $("#sec"),
    menu = $("#menu"),
    tabs = $("#tabs"),
    here_ = $("#here"),
    hd = $(".hd"),
    flip = $("#flip"),
    menuOpen = () => !menu.hidden || !tabs.hidden,
    cl = (v) => Math.min(1, Math.max(0, v)),
    mix = (a, b, t) => a + (b - a) * t,
    io = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
    sp = (el, k, v) => el.style.setProperty(k, v);

  /* ---------- Opening: the name is the domain ----------
 Each letter of the name drops into an address bar and flips like a split-flap from the display face to mono; the
 address finishes typing, Enter, and the bar rises into a window where forvalue loads, blurred first, then sharp. */
  const abs = $("#abs"),
    win = $("#win"),
    urlEl = $("#url"),
    nm = $("#name"),
    NAME = "Malaka Gonawala",
    URL = "malakagonawala.dev/work/forvalue",
    NL = 14,
    PRE = 24;
  urlEl.innerHTML =
    [...URL].map((c) => `<span>${c}</span>`).join("") +
    '<b id="sl" style="font-weight:400"></b>';
  const U = [...urlEl.querySelectorAll("span")],
    SL = $("#sl");
  nm.innerHTML = [...NAME]
    .map(
      (c) =>
        `<span class="lt"><i class="a">${c}</i><i class="b">${c.toLowerCase()}</i></span>`,
    )
    .join("");
  const Ls = [...nm.children];
  let A = [],
    B = {};
  const bar = (e) => {
    const { w, h, Wc, FW, fx, fy, fuC, fuF, bhC, bhF } = B;
    Object.assign(win.style, {
      width: mix(Wc, FW, e) + "px",
      left: mix((w - Wc) / 2, fx, e) + "px",
      top: mix(h / 2 - bhC / 2, fy, e) + "px",
    });
    sp(win, "--bh", mix(bhC, bhF, e) + "px");
    sp(win, "--fu", mix(fuC, fuF, e) + "px");
    const r = $("#rr"),
      pr = $(".pill").getBoundingClientRect();
    r.setAttribute("width", pr.width - 1.2);
    r.setAttribute("height", pr.height - 1.2);
    r.setAttribute("rx", (pr.height - 1.2) / 2);
  };
  const abSize = () => {
    const w = abs.clientWidth,
      h = abs.clientHeight,
      hh = $(".hd").offsetHeight,
      bhF = w < 700 ? 40 : 48,
      FW = Math.min(1000, w - 32, (h - hh - bhF - 90) * 1.6),
      Wc = Math.min(860, w - 32),
      fuF = Math.min(17, (FW - 80) / (URL.length * 0.62)),
      fuC = Math.min(36, (Wc - 80) / (URL.length * 0.62)),
      fs = Math.min(Math.max(40, w * 0.125), 220);
    B = {
      w,
      h,
      Wc,
      FW,
      fx: (w - FW) / 2,
      fy: hh + Math.max(0, (h - hh - bhF - FW / 1.6 - 70) / 2),
      fuC,
      fuF,
      bhC: Math.max(bhF, fuC * 2.2),
      bhF,
    };
    sp(abs, "--fs", fs + "px");
    $(".xr .d").dataset.tag = `<h1 class="name">  Melodrama 500 · ${fs | 0}px`;
    bar(0);
    const ws = Ls.map((l) => l.firstChild.getBoundingClientRect().width),
      tw = ws.reduce((a, b) => a + b, 0),
      sr = abs.getBoundingClientRect();
    let x = (w - tw) / 2,
      j = 0;
    A = Ls.map((l, i) => {
      const o = { x, y: h / 2 - fs * 1.1, sp: NAME[i] == " " };
      x += ws[i];
      if (!o.sp) {
        const t = U[j++].getBoundingClientRect();
        Object.assign(o, {
          tx: t.left - sr.left,
          ty: t.top - sr.top,
          ts: fuC / fs,
        });
      }
      return o;
    });
  };
  const ab = (p) => {
    $("#intro").style.opacity = 1 - cl(p / 0.04);
    const ring = io(cl(p / 0.3));
    $("#rr").style.strokeDasharray = `${ring} 1`;
    $("#rr").style.opacity = ring > 0 ? 1 : 0;
    let j = 0;
    Ls.forEach((l, i) => {
      const o = A[i];
      if (o.sp) {
        l.style.transform = `translate(${o.x}px,${o.y}px)`;
        l.style.opacity = 1 - cl((p - 0.06) / 0.08);
        return;
      }
      const m = io(cl((p - 0.01 - j * 0.013) / 0.2)),
        f = cl((m - 0.3) / 0.4),
        x = mix(o.x, o.tx, m),
        y = mix(o.y, o.ty, m) - Math.sin(m * Math.PI) * 60,
        s = mix(1, o.ts, m);
      l.style.transform = `translate(${x}px,${y}px) scale(${s},${s * Math.max(0.02, Math.abs(Math.cos(f * Math.PI)))})`;
      l.firstChild.style.visibility = f < 0.5 ? "visible" : "hidden";
      l.lastChild.style.visibility = f < 0.5 ? "hidden" : "visible";
      l.style.opacity = m >= 1 ? 0 : 1;
      U[j].style.visibility = m >= 1 ? "visible" : "hidden";
      j++;
    });
    const typed = Math.round(cl((p - 0.34) / 0.13) * (URL.length - NL));
    for (let k = NL; k < URL.length; k++)
      U[k].style.visibility = k < NL + typed ? "visible" : "hidden";
    sp(win, "--en", Math.sin(Math.PI * cl((p - 0.48) / 0.07)));
    bar(io(cl((p - 0.52) / 0.14)));
    const pr = $(".pill").getBoundingClientRect(),
      lr = U[NL - 1 + typed].getBoundingClientRect(),
      car = $("#car");
    car.style.left = lr.right - pr.left + 2 + "px";
    car.style.opacity = p > 0.2 && p < 0.5 ? 1 : 0;
    sp(win, "--u", io(cl((p - 0.6) / 0.14)));
    sp(win, "--bo", cl((p - 0.58) / 0.06));
    $("#load").style.width = io(cl((p - 0.5) / 0.3)) * 100 + "%";
    $("#load").style.opacity = p > 0.5 ? 1 - cl((p - 0.8) / 0.04) : 0;
    sp(win, "--sh", 100 - cl((p - 0.6) / 0.2) * 200 + "%");
    const ld = cl((p - 0.66) / 0.18);
    sp(win, "--io", cl(ld * 3));
    sp(win, "--bl", (1 - io(ld)) * 16);
    const mt = io(cl((p - 0.84) / 0.08));
    $("#meta").style.opacity = mt;
    $("#meta").style.transform = `translateY(${(1 - mt) * 20}px)`;
    // the header name arrives as the big one leaves; "/ Work" once the page has loaded
    sp(root, "--nmo", cl((p - 0.3) / 0.1));
    sp(root, "--so", cl((p - 0.8) / 0.1));
  };

  /* ---------- Work: two featured projects, then the rest as one list ----------
 The window stays pinned. For ForTheRoot the caret deletes the address back and types the next one, Enter, the old
 page blurs out and the next sharpens in. After it the address becomes /work/other-projects and the rest load as a
 list, one row at a time; hovering a row floats that project beside the cursor. Scrolling up retypes the address. */
  const im = (k) => (X[k] && X[k][3]) || "",
    PR = [
      { s: "forvalue", k: "forvalue" },
      { s: "fortheroot", k: "fortheroot" },
      { s: "other-projects", t: "Other projects", op: 1 },
    ],
    H0 = 0.45,
    STEP = 0.27,
    OP = [
      ...["holoservice", "shitos-barber", "antigravity-bike"].map((k) => [
        k,
        X[k][4],
        "#p-" + k,
      ]),
      ["psl", PITCH.prettysrilanka, "#about"],
      ["lab", "8 small builds →", "#lab"],
    ];
  $("#ol").insertAdjacentHTML(
    "beforeend",
    OP.map(
      ([k, d, h]) =>
        `<a href="${h}" data-s="${k}" data-p="${h.startsWith("#p-") ? "work/" + h.slice(3) : h.slice(1)}" tabindex="-1"><b>${P[k] || { psl: "Pretty Sri Lanka", lab: "Experiments" }[k]}</b><span>${d}</span></a>`,
    ).join(""),
  );
  const OPR = $$("#op a");
  /* other projects: the list on the left, one fixed preview window on the right. The name colour follows the cursor at
 once, but the preview only changes after the cursor has rested on a row for .25s (a fast sweep changes nothing); then
 the window's address types the path, a thin line runs under it and the shot fades in sharp over the old one. Keyboard
 focus changes it at once. Leaving the list keeps the last preview. Narrow windows (phones) show the list only. */
  const pimg = (k) => {
      const b = X[k] && X[k][3],
        n = P[k] || { psl: "Pretty Sri Lanka", lab: "Experiments" }[k];
      return b
        ? `<img src="${b}" alt="">`
        : `<span class="ph">[${n} screenshot]</span>`;
    },
    pu = $("#purl"),
    psh = $("#pshot"),
    pld = $("#pld"),
    pmark = (i) => OPR.forEach((a, k) => a.classList.toggle("on", k == i));
  let pcur = -1,
    pwait;
  const pset = (i) => {
    if (i == pcur) return;
    pcur = i;
    pmark(i);
    const a = OPR[i],
      path = "/" + a.dataset.p,
      n = document.createElement("div");
    n.innerHTML = pimg(a.dataset.s);
    const e = n.firstChild;
    pu.textContent = path;
    if (!live) return psh.replaceChildren(e);
    const t = Math.min(0.6, path.length * 0.025);
    G.fromTo(
      pu,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: t,
        ease: `steps(${path.length})`,
      },
    );
    G.fromTo(
      pld,
      { scaleX: 0 },
      { scaleX: 1, opacity: 1, duration: t + 0.3, ease: "out" },
    );
    G.to(pld, { opacity: 0, delay: t + 0.3, duration: 0.3 });
    psh.append(e);
    G.fromTo(
      e,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        delay: t * 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          while (e.parentNode && psh.firstChild != e) psh.firstChild.remove();
        },
      },
    );
  };
  OPR.forEach((a, i) => {
    a.addEventListener("pointerenter", () => {
      pmark(i);
      pwait && pwait.kill();
      live ? (pwait = G.delayedCall(0.25, () => pset(i))) : pset(i);
    });
    a.addEventListener("focus", () => pset(i));
  });
  if (!live) {
    $("#work").insertAdjacentHTML(
      "afterend",
      `<section class="rmw g" aria-label="More work"><a href="#p-fortheroot">${img("fortheroot")}<h2 class="d">ForTheRoot</h2></a><div class="op"><p class="note">~/work/other-projects</p></div></section>`,
    );
    $(".rmw .op").append(
      ...OPR.map((a) => {
        a = a.cloneNode(1);
        a.removeAttribute("tabindex");
        return a;
      }),
    );
  }
  $("#op").addEventListener("pointerleave", () => {
    pwait && pwait.kill();
    pmark(pcur);
  });
  pset(0);
  const work = (P0) => {
    const sh = $("#shot"),
      s2 = $("#shot2"),
      ttl = $("#ttl"),
      go = $("#go"),
      body = $("#abody");
    const show = (pr, el) => {
      const src = pr.k ? im(pr.k) : "";
      if (el.getAttribute("src") !== src) {
        src ? (el.src = src) : el.removeAttribute("src");
      }
      el.alt = pr.k ? P[pr.k] + " screenshot" : "";
    };
    const link = (pr) => {
      const h = pr.op ? "#work" : "#p-" + pr.k;
      body.setAttribute("href", h);
      go.setAttribute("href", pr.op ? "#p-holoservice" : h);
      ttl.textContent = pr.t || P[pr.k];
      go.textContent = pr.op ? "See all →" : "Open project →";
      sp(win, "--io3", pr.op ? 1 : 0);
      $("#op").style.pointerEvents = pr.op ? "auto" : "none";
      OPR.forEach((a) => (a.tabIndex = pr.op ? 0 : -1));
    };
    if (P0 < H0) {
      ab(P0 / H0);
      SL.textContent = "";
      U.slice(PRE).forEach((u) => u.style.removeProperty("display"));
      show(PR[0], sh);
      sp(win, "--io2", 0);
      link(PR[0]);
      $("#cnt").textContent = "1 / 2";
      OPR.forEach((r) => (r.style.opacity = 0));
      return;
    }
    ab(1);
    const i = Math.min(PR.length - 1, 1 + Math.floor((P0 - H0) / STEP)),
      q = cl((P0 - H0 - (i - 1) * STEP) / STEP),
      a = PR[i - 1],
      b = PR[i];
    U.slice(PRE).forEach((u) => (u.style.display = "none"));
    const del = cl(q / 0.22),
      typ = cl((q - 0.25) / 0.22);
    SL.textContent =
      q < 0.25
        ? a.s.slice(0, Math.round(a.s.length * (1 - del)))
        : b.s.slice(0, Math.round(b.s.length * typ));
    const pr = $(".pill").getBoundingClientRect(),
      lr = (SL.textContent ? SL : U[PRE - 1]).getBoundingClientRect(),
      car = $("#car");
    car.style.left = lr.right - pr.left + 2 + "px";
    car.style.opacity = q > 0.02 && q < 0.52 ? 1 : 0;
    sp(win, "--en", Math.sin(Math.PI * cl((q - 0.5) / 0.08)));
    const ld = cl((q - 0.55) / 0.3);
    $("#load").style.width = io(ld) * 100 + "%";
    $("#load").style.opacity = ld > 0 && ld < 1 ? 1 : 0;
    show(a, sh);
    b.k && show(b, s2);
    const out = cl((q - 0.55) / 0.15),
      inn = cl((q - 0.66) / 0.2);
    sp(win, "--io", 1 - out);
    sp(win, "--bl", out * 16);
    sp(win, "--io2", b.k ? cl(inn * 3) : 0);
    sp(win, "--bl2", (1 - io(inn)) * 16);
    const sw = q > 0.62;
    link(sw ? b : a);
    if (b.op) sp(win, "--io3", cl(inn * 3));
    OPR.forEach((r, k) => {
      const t = b.op ? io(cl((inn - 0.15 - k * 0.12) / 0.35)) : 0;
      r.style.opacity = t;
      r.style.transform = `translateY(${(1 - t) * 10}px)`;
    });
    const n = sw ? i + 1 : i;
    $("#cnt").textContent = n > 2 ? "+ 5 more" : `${n} / 2`;
    const mo = sw ? io(cl((q - 0.62) / 0.1)) : 1 - io(cl((q - 0.52) / 0.08));
    $("#meta").style.opacity = mo;
    $("#meta").style.transform = `translateY(${(1 - mo) * 12}px)`;
  };

  /* ---------- Underneath: hex dump ----------
 The front end is drawn as a page; a read head passes down it and every cell becomes the byte of the pixel that
 stands out most, printed in that pixel's colour, so the page is still there, made of hex. The bytes cool to the
 underside's colours, the dump scrolls up like xxd output, and the underside settles with its terminal. */
  const hxs = $("#hxs"),
    cv = $("#hxc"),
    cx = cv.getContext("2d"),
    HEX = "0123456789abcdef";
  let W = 0,
    H = 0,
    ch = 12,
    page = null,
    hot = null,
    cold = null,
    C = {};
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)),
    dark = () =>
      root.dataset.theme
        ? root.dataset.theme == "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
  const hxSize = () => {
    const d = dark();
    C = d
      ? {
          bg: "#161514",
          fg: "#F4F1EA",
          mut: "#B5B9B3",
          gold: "#D9B45A",
          on: "#0D0C0B",
          ubg: "#23502F",
          sig: "#F2C14E",
        }
      : {
          bg: "#F2F0EB",
          fg: "#1A1D1B",
          mut: "#4B504C",
          gold: "#C9A24A",
          on: "#1A1D1B",
          ubg: "#12291E",
          sig: "#E07A5F",
        };
    W = hxs.clientWidth;
    H = hxs.clientHeight;
    const r = Math.min(devicePixelRatio, 2);
    cv.width = W * r;
    cv.height = H * r;
    cx.setTransform(r, 0, 0, r, 0, 0);
    const one = W < 700,
      cw = one ? 5 : 8;
    ch = one ? 8 : 12;
    const bw = cw * (one ? 1.4 : 2.5),
      ox = one ? 0 : cw * 10,
      cols = Math.ceil(W / bw),
      rows = Math.ceil(H / ch),
      pad = Math.max(16, W * 0.04),
      fs = Math.min(160, Math.max(56, W * 0.11));
    page = document.createElement("canvas");
    page.width = W;
    page.height = H;
    const g = page.getContext("2d", { willReadFrequently: true });
    g.textBaseline = "top";
    const iw = Math.min(W - 2 * pad, W * 0.5, H * 0.42 * 1.6),
      y0 = Math.max(
        H * 0.14,
        (H - fs * 0.95 - 40 - iw / 1.6 - (one ? 70 : 0)) / 2,
      );
    g.fillStyle = C.bg;
    g.fillRect(0, 0, W, H);
    g.fillStyle = C.fg;
    g.font = `500 ${fs}px Melodrama`;
    g.fillText("The front end", pad, y0, W - 2 * pad);
    g.font = `400 ${one ? 15 : 17}px Satoshi`;
    g.fillStyle = C.mut;
    g.fillText(
      "Front-end developer. Accessible sites, from the first sketch to the live link.",
      pad,
      y0 + fs * 0.95,
      W - 2 * pad,
    );
    const iy = y0 + fs * 0.95 + 40,
      shot = $("#shot");
    shot.complete &&
      shot.naturalWidth &&
      g.drawImage(
        shot,
        0,
        0,
        shot.naturalWidth,
        shot.naturalWidth / 1.6,
        pad,
        iy,
        iw,
        iw / 1.6,
      );
    const bx = one ? pad : pad + iw + 28,
      by = one ? iy + iw / 1.6 + 24 : iy + iw / 1.6 - 48;
    g.fillStyle = C.gold;
    g.beginPath();
    g.roundRect(bx, by, 150, 46, 23);
    g.fill();
    g.fillStyle = C.on;
    g.font = "700 16px Satoshi";
    g.fillText("See the work", bx + 28, by + 15);
    const px = g.getImageData(0, 0, W, H).data,
      [br, bg_, bb] = rgb(C.bg),
      [ur, ug, ub] = rgb(C.ubg),
      [sr, sg, sb] = rgb(C.sig);
    const mk = (hh) => {
      const c = document.createElement("canvas");
      c.width = W * r;
      c.height = hh * r;
      const k = c.getContext("2d");
      k.setTransform(r, 0, 0, r, 0, 0);
      k.font = `${ch - 2}px "JetBrains Mono",monospace`;
      k.textBaseline = "top";
      return [c, k];
    };
    const [hc, hk] = mk(H),
      [cc, ck] = mk(H * 2);
    hot = hc;
    cold = cc;
    for (let y = 0; y < rows * 2; y++) {
      for (let c = 0; c < cols; c++) {
        const X0 = c * bw;
        let v,
          R0 = 0,
          G0 = 0,
          B0 = 0,
          l = 0;
        if (y < rows) {
          for (let yy = y * ch; yy < Math.min(H, y * ch + ch); yy += 2)
            for (let xx = Math.floor(X0); xx < Math.min(W, X0 + bw); xx += 2) {
              const k = (yy * W + xx) * 4,
                L =
                  Math.abs(px[k] - br) +
                  Math.abs(px[k + 1] - bg_) +
                  Math.abs(px[k + 2] - bb);
              if (L > l) {
                l = L;
                R0 = px[k];
                G0 = px[k + 1];
                B0 = px[k + 2];
              }
            }
          l /= 500;
          v = ((R0 + G0 + B0) / 3) | 0;
        } else {
          v =
            ((Math.abs(Math.sin(y * 91.3 + c * 17.7) * 43758.5) % 1) * 255) | 0;
          l = 0.05;
        }
        const t = one ? HEX[v >> 4] : HEX[v >> 4] + HEX[v & 15];
        if (y < rows && l >= 0.1) {
          hk.fillStyle = `rgb(${R0},${G0},${B0})`;
          hk.fillText(t, X0, y * ch);
        }
        ck.fillStyle =
          l < 0.1
            ? "rgba(244,241,234,.16)"
            : `rgb(${mix(244, sr, cl(l)) | 0},${mix(241, sg, cl(l)) | 0},${mix(234, sb, cl(l)) | 0})`;
        ck.fillText(t, X0, y * ch);
      }
      if (ox) {
        ck.fillStyle = C.ubg;
        ck.fillRect(0, y * ch, ox, ch);
        ck.fillStyle = `rgba(${sr},${sg},${sb},.55)`;
        ck.fillText((y * 16).toString(16).padStart(8, "0") + ":", 4, y * ch);
      }
    }
    C.b0 = [br, bg_, bb];
    C.u0 = [ur, ug, ub];
  };
  const hx = (p) => {
    if (!page) return;
    const scan = io(cl(p / 0.32)) * (H + ch),
      cool = io(cl((p - 0.3) / 0.16)),
      lift = io(cl((p - 0.38) / 0.26)),
      fade = io(cl((p - 0.5) / 0.16));
    cx.drawImage(page, 0, 0, W, H);
    if (scan > 0) {
      cx.fillStyle = `rgb(${C.b0.map((b, i) => mix(b, C.u0[i], cool) | 0)})`;
      cx.fillRect(0, 0, W, Math.min(H, scan));
      const off = lift * H;
      cx.save();
      cx.beginPath();
      cx.rect(0, 0, W, scan);
      cx.clip();
      if (cool < 1) {
        cx.globalAlpha = 1 - cool;
        cx.drawImage(hot, 0, -off, W, H);
      }
      cx.globalAlpha = cool * (1 - fade * 0.97);
      cx.drawImage(cold, 0, -off, W, H * 2);
      cx.restore();
      cx.globalAlpha = 1;
    }
    if (scan > 0 && scan < H) {
      cx.fillStyle = C.sig;
      cx.shadowColor = C.sig;
      cx.shadowBlur = 14;
      cx.fillRect(0, scan - 1, W, 2);
      cx.shadowBlur = 0;
    }
    sp($(".under"), "--ho", io(cl((p - 0.6) / 0.1)));
    $$("#term span").forEach(
      (l, i) => (l.style.opacity = +(p > 0.66 + i * 0.04)),
    );
    return cool;
  };

  /* ---------- Work with me: odometer ----------
 A big counter rolls 1, 2, 3 (each roll starts just before the next offer lights up); the offer it points at is lit and
 open, earlier ones stay open but dimmer; at the end every offer is lit and the quote button fades in. Offer copy is
 placeholder until Phase 5. */
  const sg6 = (i) => 0.1 + i * 0.26,
    out = (t) => 1 - (1 - t) ** 3,
    OF = [1, 2, 3].map((n) => [
      `[Offer ${n}]`,
      "[What you get, how long it takes, from what price: Phase 5]",
    ]);
  $("#rows6").innerHTML = OF.map(
    ([a, b], i) =>
      `<li class="r2"><span class="n">${i + 1}/3</span><span class="big">${a}</span><span class="more"><span>${b}</span></span></li>`,
  ).join("");
  const R2 = $$("#rows6 .r2"),
    R2M = $$("#rows6 .more");
  const odo = (p) => {
    let pos = 0;
    for (let i = 1; i < 3; i++) pos += io(cl((p - sg6(i) + 0.08) / 0.1));
    const a = Math.round(pos),
      fin = io(cl((p - 0.86) / 0.08));
    $("#strip").style.transform = `translateY(${-pos}em)`;
    R2.forEach((r, i) => {
      r.style.opacity = mix(i <= a ? (i == a ? 1 : 0.35) : 0.15, 1, fin);
      const t = out(cl((p - sg6(i) + 0.1) / 0.08));
      R2M[i].style.maxHeight = t * 5 + "em";
      R2M[i].style.opacity = t;
    });
    Object.assign($("#q4").style, {
      opacity: fin,
      visibility: fin ? "visible" : "hidden",
      transform: `translateY(${(1 - fin) * 16}px)`,
    });
  };

  /* ---------- Contact: decoded from hex ----------
 The same way as Underneath: the real footer is drawn to pixels and every hex cell shows the byte of the pixel under it
 that stands out most, in that pixel's colour, so the name, links and row are there as shapes made of hex. A read head
 climbs from the bottom; below it the real footer shows, exactly where its hex was. */
  const fts = $("#fts"),
    fc = $("#fc"),
    fcv = $("#hx"),
    fcx = fcv.getContext("2d");
  let F = null;
  const ftBuild = () => {
    const W = fts.clientWidth,
      H = fts.clientHeight,
      s = fts.getBoundingClientRect(),
      cs = getComputedStyle(root),
      c = (k) => cs.getPropertyValue(k).trim(),
      dpr = Math.min(devicePixelRatio || 1, 2),
      one = W < 700,
      cw = one ? 5 : 8,
      ch = one ? 8 : 12,
      bw = cw * (one ? 1.4 : 2.5),
      ox = one ? 0 : cw * 10,
      cols = Math.ceil(W / bw),
      rows = Math.ceil(H / ch);
    const pg = document.createElement("canvas");
    pg.width = W;
    pg.height = H;
    const g = pg.getContext("2d", { willReadFrequently: true }),
      rg = document.createRange(),
      tw = document.createTreeWalker(fc, NodeFilter.SHOW_TEXT);
    g.fillStyle = c("--sf");
    g.fillRect(0, 0, W, H);
    for (let t; (t = tw.nextNode()); ) {
      const st = getComputedStyle(t.parentElement);
      g.font = `${st.fontStyle} ${st.fontWeight} ${st.fontSize} ${st.fontFamily}`;
      g.fillStyle = st.color;
      let i = 0;
      for (const k of t.data) {
        rg.setStart(t, i);
        rg.setEnd(t, (i += k.length));
        const r = rg.getBoundingClientRect();
        if (!r.width) continue;
        const x = r.left - s.left,
          y = r.top - s.top + g.measureText(k).fontBoundingBoxAscent;
        g.fillText(k, x, y);
        st.textDecorationLine.includes("underline") &&
          g.fillRect(x, y + 2, r.width, 1);
      }
    }
    const px = g.getImageData(0, 0, W, H).data,
      b0 = [px[0], px[1], px[2]],
      d = document.createElement("canvas"),
      k = d.getContext("2d");
    d.width = W * dpr;
    d.height = H * dpr;
    k.setTransform(dpr, 0, 0, dpr, 0, 0);
    k.fillStyle = c("--sf");
    k.fillRect(0, 0, W, H);
    k.font = `${ch - 2}px ${c("--m")}`;
    k.textBaseline = "top";
    for (let y = 0; y < rows; y++) {
      let edge = 0;
      for (let x = 0; x < cols; x++) {
        const X0 = x * bw;
        let l = 0,
          R = b0[0],
          G_ = b0[1],
          B = b0[2];
        for (let yy = y * ch; yy < Math.min(H, y * ch + ch); yy += 2)
          for (let xx = Math.floor(X0); xx < Math.min(W, X0 + bw); xx += 2) {
            const i = (yy * W + xx) * 4,
              L =
                Math.abs(px[i] - b0[0]) +
                Math.abs(px[i + 1] - b0[1]) +
                Math.abs(px[i + 2] - b0[2]);
            if (L > l) {
              l = L;
              R = px[i];
              G_ = px[i + 1];
              B = px[i + 2];
            }
          }
        const hot = l / 500 >= 0.1,
          v = hot
            ? ((R + G_ + B) / 3) | 0
            : ((Math.abs(Math.sin(y * 91.3 + x * 17.7) * 43758.5) % 1) * 255) |
              0;
        if (X0 < ox && !hot) continue;
        edge ||= X0 < ox;
        k.globalAlpha = hot ? 1 : 0.18;
        k.fillStyle = hot ? `rgb(${R},${G_},${B})` : c("--mut");
        k.fillText(one ? HEX[v >> 4] : HEX[v >> 4] + HEX[v & 15], X0, y * ch);
      }
      // the offset column holds only footer bytes; its label shows on rows where nothing of the footer reaches it
      if (ox && !edge) {
        k.globalAlpha = 0.45;
        k.fillStyle = c("--mut");
        k.fillText((y * 16).toString(16).padStart(8, "0") + ":", 4, y * ch);
      }
    }
    k.globalAlpha = 1;
    fcv.width = W * dpr;
    fcv.height = H * dpr;
    F = { W, H, dpr, d, sig: c("--sig"), sf: c("--sf"), m: c("--m") };
  };
  const ftDraw = (p) => {
    if (!F) return;
    const { W, H, dpr } = F,
      t = cl((p - 0.05) / 0.8) ** 2,
      hy = H * (1 - t);
    fcx.setTransform(1, 0, 0, 1, 0, 0);
    fcx.clearRect(0, 0, fcv.width, fcv.height);
    if (hy <= 0) return;
    fcx.drawImage(F.d, 0, 0, W * dpr, hy * dpr, 0, 0, W * dpr, hy * dpr);
    if (hy >= H) return;
    fcx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fcx.fillStyle = F.sig;
    fcx.shadowColor = F.sig;
    fcx.shadowBlur = 14;
    fcx.fillRect(0, hy - 1, W, 2);
    fcx.shadowBlur = 0;
    fcx.font = `12px ${F.m}`;
    fcx.textAlign = "right";
    const tx = `decoded ${Math.round(t * 100)}%`,
      tw = fcx.measureText(tx).width,
      bg = fcx.createLinearGradient(W - 48 - tw, 0, W - 24 - tw, 0);
    bg.addColorStop(0, F.sf + "00");
    bg.addColorStop(1, F.sf);
    fcx.fillStyle = bg;
    fcx.fillRect(W - 48 - tw, hy - 26, tw + 40, 18);
    fcx.fillStyle = F.sig;
    fcx.fillText(tx, W - 16, hy - 12);
  };
  // keyboard: tabbing into the footer before it has decoded jumps to the end, so focus never lands under the hex
  fc.addEventListener("focusin", () => {
    if (live && S.ft < 1) {
      const e = $("#ft");
      scrollTo(0, e.offsetTop + e.offsetHeight - innerHeight);
      S.ft = 1;
      ftDraw(1);
    }
  });

  // where you are, and the smoothed scroll that drives both scenes
  const S = { ab: 0, hx: 0, of: 0, ft: 0 },
    prog = (el) => {
      const r = el.getBoundingClientRect();
      return cl(-r.top / (r.height - innerHeight));
    };
  const where = () => {
    if (menuOpen() || onPage || ld) return;
    const el = $$("[data-sec]").find((e) => {
        const r = e.getBoundingClientRect();
        return r.top <= innerHeight / 2 && r.bottom > innerHeight / 2;
      }),
      s = el ? el.dataset.sec : "Home";
    const ui = s == "Underneath",
      cool = io(cl((S.hx - 0.3) / 0.16));
    sec.textContent =
      "/ " +
      (s == "Home"
        ? S.ab < 0.3
          ? "Home"
          : "Work"
        : ui
          ? cool > 0.5
            ? "Underneath"
            : "Front end"
          : s);
    root.classList.toggle("u", ui && cool > 0.5);
    root.classList.toggle("scene", s == "Home" && S.ab < 0.3);
  };
  const sizeAll = () => {
    abSize();
    hxSize();
    ftBuild();
    work(S.ab);
    hx(S.hx);
    odo(S.of);
    ftDraw(S.ft);
    where();
  };
  const tick = () => {
    const t = {
        ab: live ? prog($("#ab")) : H0,
        hx: live ? prog($("#under")) : 1,
        of: live ? prog($("#hire")) : 1,
        ft: live ? prog($("#ft")) : 1,
      },
      c = {};
    for (const k in S) {
      const d = t[k] - S[k];
      if (d) {
        c[k] = 1;
        S[k] = Math.abs(d) < 0.0005 ? t[k] : S[k] + d * 0.12;
      }
    }
    if (!onPage && Object.keys(c).length) {
      c.ab && work(S.ab);
      c.hx && hx(S.hx);
      c.of && odo(S.of);
      c.ft && ftDraw(S.ft);
      where();
    }
    live && requestAnimationFrame(tick);
  };
  const frame = where;
  addEventListener("scroll", frame, { passive: true });
  addEventListener("resize", sizeAll);

  // reveals: one rhythm (same ease, mask from the baseline)
  const reveal = () => {
    if (!live) return;
    $$(".page h1").forEach((h) =>
      seen(h, () =>
        G.fromTo(
          h,
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: "out" },
        ),
      ),
    );
  };

  // cursor: a gold "Open" disc over project cards (mouse only)
  if (live && matchMedia("(pointer:fine)").matches) {
    const c = $("#cur");
    G.set(c, { scale: 0, opacity: 1 });
    const qx = G.quickTo(c, "x", { duration: 0.35, ease: "out" }),
      qy = G.quickTo(c, "y", { duration: 0.35, ease: "out" });
    addEventListener("pointermove", (e) => {
      qx(e.clientX);
      qy(e.clientY);
    });
    document.addEventListener("pointerover", (e) =>
      G.to(c, {
        scale: e.target.closest('#abody:not([href="#work"])') ? 1 : 0,
        duration: 0.4,
        ease: "out",
        overwrite: "auto",
      }),
    );
  }

  /* ---------- Page loader: the address bar ----------
 Every page change, and the first load, goes through the address bar: the "/ Section" word lifts out of the header into
 a URL bar in the middle, the old path is selected and retyped, Enter, a gold line loads along the bar, then the word
 flies back and melts into the new "/ Section". Only then does the page blur-load in. */
  const PAGES = [
      ["Work", "work"],
      ["Lab", "lab"],
      ["About", "about"],
      ["Resume", "resume"],
      ["Contact", "contact"],
    ],
    curEl = () => (onPage ? $("#pageView") : $("#homeView")),
    type = (el, s, d) => {
      const o = { n: 0 };
      return G.to(o, {
        n: s.length,
        duration: live ? d : 0,
        ease: "none",
        onUpdate: () => (el.textContent = s.slice(0, Math.round(o.n))),
      });
    },
    slug = (h) => {
      const k = h.slice(1);
      return k.startsWith("p-")
        ? "work/" + k.slice(2)
        : k == "top"
          ? "home"
          : k || "home";
    },
    titleOf = (h) => {
      const pg = pages[h.slice(1)];
      return "/ " + (pg ? pg[2] || pg[0] : h == "#work" ? "Work" : "Home");
    },
    tgt = () => $$(onPage ? "#pageView" : "#homeView .stick"),
    cs = (e) => getComputedStyle(e),
    ub = $("#ub"),
    up = $("#ubp"),
    ent = $("#ent"),
    ubl = $("#ubl"),
    fw = $("#ubf"),
    fa = fw.firstChild,
    fb = fw.lastChild;
  const load = async (hash, first, fr, tail) => {
    if (ld) return;
    ld = true;
    const old = here,
      oldTitle = sec.textContent,
      mains = $$("#homeView,#pageView"),
      T0 = tgt(),
      // fw is the moving word: the mono path (fa) and the header title (fb) stacked; it melts from one into the other while it travels
      place = (h, t) => {
        fa.textContent = slug(h);
        fb.textContent = t;
        fw.style.font = cs(up).font;
        fb.style.fontSize = cs(up).fontSize;
        const r = up.getBoundingClientRect();
        G.set(fw, {
          left: r.left,
          top: r.top,
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
        });
        up.style.visibility = "hidden";
        return r;
      },
      head = (r) => {
        const s = sec.getBoundingClientRect();
        return {
          x: s.left - r.left,
          y: s.top - r.top,
          scale: parseFloat(cs(sec).fontSize) / parseFloat(cs(up).fontSize),
        };
      },
      barIn = { autoAlpha: 0, scale: 0.94, filter: "blur(8px)" };
    let T = T0;
    mains.forEach((e) => (e.ariaBusy = "true"));
    if (first)
      fr
        ? G.to([T0, sec], { opacity: 0, duration: 0.3 })
        : G.set([T0, sec], { opacity: 0 });
    G.set(ub, { clearProps: "transform,filter", autoAlpha: 1 });
    G.set(ubl, { scaleX: 0 });
    G.set(fw, { autoAlpha: 0, transformOrigin: "0 0" });
    up.style.visibility = "";
    up.textContent = first ? "" : slug(old);
    const tl = G.timeline({ defaults: { ease: "soft" } });
    if (first)
      tl.from(
        ub,
        fr
          ? {
              ...fr(ub.getBoundingClientRect()),
              duration: 1,
              delay: 0.25,
              ease: "soft",
              clearProps: "transform",
            }
          : { ...barIn, duration: 0.5 },
      );
    else {
      const r = place(old, oldTitle);
      tl.set(sec, { opacity: 0 })
        .from(fw, { ...head(r), duration: 0.7 }, 0)
        .fromTo(fb, { opacity: 1 }, { opacity: 0, duration: 0.35 }, 0.1)
        .fromTo(fa, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.15)
        .from(ub, { ...barIn, duration: 0.55 }, 0.1)
        .to(T0, { opacity: 0, filter: "blur(10px)", duration: 0.5 }, 0)
        .call(() => {
          up.style.visibility = "";
          G.set(fw, { autoAlpha: 0 });
        })
        .call(() => up.classList.add("sel"))
        .to({}, { duration: 0.18 })
        .call(() => {
          up.classList.remove("sel");
          up.textContent = "";
        });
    }
    tl.add(type(up, slug(hash), 0.5))
      .to(ubl, { scaleX: 0.7, duration: 0.5, ease: "out" }, "<")
      .call(() => ent.classList.add("hit"))
      .to(ent, {
        scale: 0.85,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "out",
      })
      .call(() => ent.classList.remove("hit"))
      .call(() => {
        tail && tail();
        show(hash, 1);
        sec.textContent = titleOf(hash);
        G.set([".stick", "#pageView"], { clearProps: "opacity,filter" });
        T = tgt();
        G.set([T, sec], { opacity: 0 });
      })
      .to(ubl, { scaleX: 1, duration: 0.3, ease: "out" }, "<")
      .add(() => {
        const r = place(hash, titleOf(hash)),
          t = tl.time();
        tl.to(
          ub,
          { autoAlpha: 0, scale: 0.96, filter: "blur(8px)", duration: 0.45 },
          t,
        )
          .to(fw, { ...head(r), duration: 0.75 }, t)
          .fromTo(fa, { opacity: 1 }, { opacity: 0, duration: 0.35 }, t + 0.2)
          .fromTo(fb, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t + 0.15)
          .to(sec, { opacity: 1, duration: 0.2 }, t + 0.6)
          .to(fw, { autoAlpha: 0, duration: 0.2 }, t + 0.65);
      }, "+=.05");
    await tl.then();
    up.style.visibility = "";
    G.set([fa, fb], { clearProps: "opacity" });
    const hm = slug(hash) == "home",
      hn = $(".hd .nm");
    hm
      ? G.to([hn, sec], { opacity: 0, duration: 0.5, ease: "soft" })
      : G.set(sec, { clearProps: "opacity" });
    // the page loads only once the word has merged into the header
    await G.fromTo(
      T,
      { opacity: 0, filter: "blur(14px)", y: 16 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "soft",
        clearProps: "transform,filter,opacity",
      },
    ).then();
    hm && G.set([hn, sec], { clearProps: "opacity" });
    ld = false;
    mains.forEach((e) => (e.ariaBusy = "false"));
    where();
    if (!first) {
      const h = curEl().querySelector("h1");
      h && h.focus({ preventScroll: true });
    }
  };

  /* ---------- Flip menu ----------
 Wide screens: Flip shrinks the page you are on into one tile of a tab overview ("you are here"); the other pages drop out
 of the header as small tab chips and open into the tiles beside it, each with its own address. Picking one grows it to
 fill the screen and the loader runs. Phones: a PowerShell pane fills one terminal line at a time, types `cd site`, and
 every line of the listing flaps over into a big link. Closing types `cd ..`. Flip back (or Esc) undoes either. */
  $("#ls").innerHTML =
    `<p class="lh"></p>` +
    PAGES.map(
      ([t, u]) =>
        `<a href="#${u}"><span class="mo" aria-hidden="true">d-----  <span class="lw"></span>${u}</span><span class="bg d"><span class="cr">&gt;</span>${t}</span></a>`,
    ).join("");
  tabs.insertAdjacentHTML(
    "beforeend",
    PAGES.map(
      ([t, u]) =>
        `<a class="tab" href="#${u}"><span class="tb"><span>malakagonawala.dev/${u}</span></span><span class="d">${t}</span></a>`,
    ).join(""),
  );
  const LS = $$("#ls a"),
    TB = $$(".tab");
  let mtl,
    y0 = 0,
    wideMenu = false;
  // six tiles, your page first: 3 x 2 on wide screens, 2 x 3 below, each the shape of the screen
  const cells = () => {
    const W = innerWidth,
      H = innerHeight,
      c = W < 900 ? 2 : 3,
      r = 6 / c,
      gap = W < 900 ? 12 : 24,
      top = hd.offsetHeight + 12,
      side = W < 900 ? 16 : 48;
    const w = Math.min(
        (W - 2 * side - (c - 1) * gap) / c,
        (((H - top - 64 - (r - 1) * gap) / r) * W) / H,
      ),
      h = (w * H) / W,
      x0 = (W - c * w - (c - 1) * gap) / 2;
    return Array.from({ length: 6 }, (_, i) => ({
      x: x0 + (i % c) * (w + gap),
      y: top + Math.floor(i / c) * (h + gap),
      w,
      h,
    }));
  };
  // the site is inert while a menu is open, so focus and clicks stay in the menu
  const css = (n) => getComputedStyle(root).getPropertyValue(n).trim(),
    HT = ".hd .nm,.hd .sec,.flip",
    // the header changes colour on the menu's own clock: wide = same duration and ease as the backdrop, phone = the step where the clip line passes it
    hdWide = (tl) =>
      tl
        .fromTo(
          hd,
          { backgroundColor: css("--bg") },
          { backgroundColor: css("--ubg"), duration: 1, ease: "sine.inOut" },
          0,
        )
        .fromTo(
          HT,
          { color: css("--fg") },
          { color: css("--ufg"), duration: 0.2, ease: "none" },
          0.4,
        ),
    hdStep = (tl, t, o) =>
      tl
        .set(hd, { backgroundColor: css(o ? "--ubg" : "--bg") }, t)
        .set(HT, { color: css(o ? "--ufg" : "--fg") }, t);
  const swapSec = (t) =>
    !live
      ? (sec.textContent = t)
      : G.timeline()
          .to(sec, { opacity: 0, duration: 0.2 })
          .add(() => (sec.textContent = t))
          .to(sec, { opacity: 1, duration: 0.4 });
  const label = (o) => {
    flip.setAttribute("aria-expanded", o);
    $$(".flip span").forEach((x) => (x.textContent = o ? "Flip back" : "Flip"));
    hd.classList.toggle("mo", o);
    $$("#homeView,#pageView").forEach((e) => (e.inert = o));
  };
  const reset = () => {
    mtl && mtl.kill();
    menu.hidden = tabs.hidden = true;
    tabs.classList.remove("on");
    label(false);
    root.style.overflow = "";
    $("#p2").hidden = true;
    $("#cmd").textContent = $("#cmd2").textContent = "";
    G.set([hd, HT], { clearProps: "backgroundColor,color,opacity" });
    G.set(
      [
        "#homeView",
        "#pageView",
        menu,
        tabs,
        here_,
        ".bk",
        "#ls>*",
        "#ls .mo",
        "#ls .bg",
        ...TB,
      ],
      { clearProps: "all" },
    );
  };
  // deal: the other tabs are dealt out from behind the page once it has shrunk enough to uncover them: the nearest tab first and on top,
  // each one travelling a distance-based time; closing runs the same motion backwards from where the tabs are still moving (no dead tail)
  const tilesIn = (V, C) => {
    const near = (i) =>
        Math.hypot(C[i + 1].x - C[0].x, C[i + 1].y - C[0].y) / C[0].w,
      tl = G.timeline({ defaults: { ease: "power3.out" } }).set(
        V,
        {
          left: (i) => C[i + 1].x,
          top: (i) => C[i + 1].y,
          width: (i) => C[i + 1].w,
          height: (i) => C[i + 1].h,
          borderRadius: 14,
          zIndex: (i) =>
            9 -
            V.map((_, k) => k)
              .sort((a, b) => near(a) - near(b))
              .indexOf(i),
        },
        0,
      );
    V.forEach((t, i) =>
      tl.fromTo(
        t,
        { x: C[0].x - C[i + 1].x, y: C[0].y - C[i + 1].y, opacity: 1 },
        { x: 0, y: 0, duration: 0.4 + 0.2 * near(i), immediateRender: true },
        0.3 + 0.06 * near(i),
      ),
    );
    return tl;
  };
  const openTabs = () => {
    const el = curEl(),
      T = el.getBoundingClientRect().top + scrollY,
      o = y0 - T,
      V = TB.filter((t) => !t.hidden),
      C = cells(),
      s = C[0].w / innerWidth;
    tabs.hidden = false;
    tabs.classList.add("on");
    Object.assign(el.style, {
      position: "relative",
      zIndex: 16,
      transformOrigin: `0 ${o}px`,
      background: "var(--bg)",
    });
    const clip = (r) =>
      `inset(${o}px 0 ${el.offsetHeight - o - innerHeight}px 0 round ${r}px)`;
    G.set(here_, { left: C[0].x + 10, top: C[0].y + C[0].h - 34 });
    mtl = G.timeline({ defaults: { ease: "io" } })
      .fromTo(
        ".bk",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "sine.inOut" },
        0,
      )
      .fromTo(
        el,
        { x: 0, y: 0, scale: 1, clipPath: clip(0) },
        {
          x: C[0].x,
          y: C[0].y,
          scale: s,
          clipPath: clip(14 / s),
          duration: 0.8,
        },
        0,
      )
      // the tabs drop out of the header as small chips, then open into their tiles
      .add(tilesIn(V, C), 0.1)
      .fromTo(
        here_,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.3 },
        0.85,
      );
    hdWide(mtl);
    if (!live) mtl.progress(1);
    V[0] && V[0].focus({ preventScroll: true });
  };
  // LastWriteTime is the visitor's own date and time, read when the listing is printed
  const stamp = () => {
    const d = new Date(),
      t =
        d.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
      w = Math.max(t.length, 13) + 3;
    $("#ls .lh").textContent =
      `\n    Directory: C:\\Users\\Malaka\\site\n\nMode    ${"LastWriteTime".padEnd(w)}Name\n----    ${"-------------".padEnd(w)}----`;
    $$(".lw").forEach((e) => (e.textContent = t.padEnd(w)));
  };
  const openPS = () => {
    stamp();
    menu.hidden = false;
    const H = $("#ls .bg").offsetHeight * 1.08,
      rows = Math.ceil(
        innerHeight / parseFloat(getComputedStyle(menu).lineHeight),
      );
    mtl = G.timeline({ defaults: { ease: "io" } })
      .fromTo(
        menu,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: `steps(${rows})` },
      )
      .add(type($("#cmd"), "cd site", 0.3))
      .from("#ls>*", { opacity: 0, duration: 0.01, stagger: 0.05 })
      .addLabel("printed", "+=.1")
      .call(() => LS[0].focus({ preventScroll: true }), null, "printed");
    hdStep(
      mtl,
      (0.5 * Math.ceil((rows * hd.offsetHeight) / innerHeight)) / rows,
      true,
    );
    LS.forEach((a, i) => {
      const t = `printed+=${i * 0.08}`;
      mtl
        .to(a.firstChild, { scaleY: 0, duration: 0.16, ease: "power2.in" }, t)
        .to(a, { height: H, duration: 0.34 }, t)
        .to(
          a.lastChild,
          { scaleY: 1, duration: 0.24, ease: "out" },
          `${t}+=.16`,
        );
    });
    if (!live) mtl.progress(1);
  };
  // the phone menu closes by typing `cd ..`, then the lines clear upward
  const closePS = () =>
    new Promise((fin) => {
      const rows = Math.ceil(
        innerHeight / parseFloat(getComputedStyle(menu).lineHeight),
      );
      mtl.kill();
      mtl = G.timeline({ defaults: { ease: "io" }, onComplete: fin });
      mtl
        .set("#p2", { hidden: false })
        .add(type($("#cmd2"), "cd ..", 0.25))
        .to({}, { duration: 0.12 })
        .to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.45,
          ease: `steps(${rows})`,
        });
      hdStep(
        mtl,
        0.37 +
          (0.45 * Math.ceil(rows * (1 - hd.offsetHeight / innerHeight))) / rows,
        false,
      );
    });
  const setMenu = async (o) => {
    if (ld) return;
    if (o) {
      mtl && mtl.kill();
      y0 = scrollY;
      wideMenu = wide();
      label(true);
      root.classList.remove("scene");
      swapSec("/ Underneath");
      root.style.overflow = "hidden";
      const cur = onPage ? here : "#work",
        cu = (a) =>
          a.hash == cur || (a.hash == "#work" && cur.startsWith("#p-"));
      LS.forEach((a) => a.toggleAttribute("aria-current", cu(a)));
      TB.forEach((t) => (t.hidden = cu(t)));
      return wideMenu ? openTabs() : openPS();
    }
    const fin = () => {
      reset();
      if (onPage) {
        const pg = pages[here.slice(1)];
        sec.textContent = "/ " + (pg[2] || pg[0]);
      } else where();
    };
    if (!live || !mtl) return fin();
    if (onPage) {
      const pg = pages[here.slice(1)];
      G.delayedCall(live ? 0.3 : 0, () => swapSec("/ " + (pg[2] || pg[0])));
    } // the label changes while the colour does, not after it
    ld = true;
    if (wideMenu)
      await new Promise(
        (r) => (
          mtl.time(Math.min(mtl.time(), mtl.duration() * 0.8)).timeScale(1.3),
          mtl.eventCallback("onReverseComplete", r).reverse()
        ),
      );
    else await closePS();
    ld = false;
    fin();
  };
  // a tab grows to fill the screen, and then the loader runs as a first load
  TB.forEach(
    (t) =>
      (t.onclick = (e) => {
        e.preventDefault();
        if (!wideMenu || !menuOpen() || ld) return;
        if (!live) {
          reset();
          return load(t.hash, 1);
        }
        return hv(t, t.hash);
      }),
  );
  // the picked tile's address chip becomes the loader bar (desktop); phones use ph above
  // phone: the page loads behind the menu; an angle pushes the tapped word right, `cd ..` is typed, then the menu rolls back up
  const ph = (a, hash) => {
    const cr = a.querySelector(".cr"),
      rows = Math.ceil(
        innerHeight / parseFloat(getComputedStyle(menu).lineHeight),
      ),
      hdr = () => {
        G.to(hd, { backgroundColor: css("--bg"), duration: 0.5 });
        G.to(HT, { color: css("--fg"), duration: 0.1, delay: 0.2 });
      };
    mtl.kill();
    ld = true;
    $("#p2").hidden = false;
    cr.style.transition = "none";
    show(hash, 1);
    sec.textContent = titleOf(hash);
    G.timeline({
      defaults: { ease: "io" },
      onComplete: () => {
        reset();
        ld = false;
        const h = curEl().querySelector("h1");
        h && h.focus({ preventScroll: true });
        where();
      },
    })
      .fromTo(
        cr,
        { maxWidth: 0, opacity: 0 },
        { maxWidth: "1.6em", opacity: 1, duration: 0.3, ease: "pop" },
      )
      .add(type($("#cmd2"), "cd ..", 0.3), 0.2)
      .to({}, { duration: 0.15 })
      .to(menu, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: `steps(${rows})`,
      })
      .call(hdr, null, "<.35");
  };
  const hv = (el, hash) => {
    if (!wideMenu) return ph(el, hash);
    const q = document.createRange();
    q.selectNodeContents(el.querySelector(".tb span"));
    const r = q.getBoundingClientRect(),
      fr = (b) => ({
        x: r.left + r.width / 2 - b.left - b.width / 2,
        y: r.top + r.height / 2 - b.top - b.height / 2,
        scale: r.width / b.width,
      });
    document.body.classList.add("hph");
    mtl.kill();
    ld = true;
    G.to(hd, { backgroundColor: css("--bg"), duration: 0.75 });
    G.to(HT, { color: css("--fg"), duration: 0.1, delay: 0.33 });
    G.to([curEl(), here_, ...TB.filter((x) => x != el)], {
      opacity: 0,
      duration: 0.9,
      ease: "io",
    });
    G.to(el, { opacity: 0, duration: 0.2 });
    G.to(tabs, { opacity: 0, duration: 0.8, delay: 0.2, ease: "io" });
    ld = false;
    load(hash, true, fr, () => {
      y0 = 0;
      reset();
    });
    G.from(ub, { opacity: 0, duration: 0.25 });
  };
  flip.onclick = () =>
    setMenu(!menuOpen()).then(() => menuOpen() || flip.focus());
  addEventListener("keydown", (e) => {
    if (e.key == "Escape" && menuOpen()) {
      setMenu(false).then(() => flip.focus());
    }
    if (e.key == "u" && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))
      setMenu(!menuOpen());
  });
  $$(".th").forEach(
    (b) =>
      (b.onclick = () => {
        root.dataset.theme = dark() ? "light" : "dark";
        hxSize();
        hx(S.hx);
        ftBuild();
        ftDraw(S.ft);
      }),
  );

  // routing: home sections stay in place; every page change goes through the address-bar loader
  let here = location.hash;
  const show = (hash, keep) => {
    here = hash;
    const h = hash.slice(1),
      pg = pages[h];
    onPage = !!pg;
    keep || reset();
    flip.setAttribute("aria-expanded", false);
    $$(".flip span").forEach((x) => (x.textContent = "Flip"));
    $("#homeView").hidden = onPage;
    live && G.set("main", { clearProps: "opacity,visibility" });
    $("#pageView").hidden = !onPage;
    root.classList.remove("u", "scene");
    if (pg) {
      $("#pageView").innerHTML =
        `<article class="page"><h1 class="d" tabindex="-1">${pg[0]}</h1>${pg[1]}</article>`;
      sec.textContent = "/ " + (pg[2] || pg[0]);
      scrollTo(0, 0);
      const f = $("#f");
      f &&
        (f.onsubmit = (e) => {
          e.preventDefault();
          $("#fo").textContent =
            "Prototype: nothing is sent. The real form uses Web3Forms.";
        });
      reveal();
    } else {
      const el = h && document.getElementById(h),
        a = $("#ab");
      h == "work" && live
        ? scrollTo(0, a.offsetTop + (a.offsetHeight - innerHeight) * H0)
        : el
          ? el.scrollIntoView()
          : scrollTo(0, 0);
      sizeAll();
      where();
    }
  };
  const route = async (hash) => {
    const was = menuOpen();
    if (was) await setMenu(false);
    if (!live) return show(hash);
    if (hash == here && was) {
      const h = curEl().querySelector("h1");
      h && h.focus({ preventScroll: true });
      return;
    }
    if (!pages[hash.slice(1)] && !onPage) return show(hash);
    await load(hash, false);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (live && a && menuOpen() && !wideMenu && a.closest("#ls")) {
      e.preventDefault();
      return hv(a, a.hash);
    }
    if (a && !a.classList.contains("tab")) {
      e.preventDefault();
      route(a.hash);
    }
  });

  // x-ray: under the name is the code and the wireframe that build it
  $("#code").textContent = Array(6)
    .fill(
      `<header class="hd">\n  <a class="nm">Malaka Gonawala</a><span class="sec">/ Home</span>\n  <button class="flip" aria-expanded="false">Flip</button>\n</header>\n<section id="home" data-sec="Home">\n  <h1 class="name">Malaka Gonawala</h1>\n</section>\n.name { font: 500 clamp(40px, 12.5vw, 220px) Melodrama; }\n.slash { transform: rotate(var(--a)) scaleX(var(--s)); }\nPS C:\\Users\\Malaka> npm run build\n`,
    )
    .join("");
  // x-ray: a circle over the name shows the underside (mouse, or touch on phone); it peeks once after the name lands
  let lensR = 0;
  const xr = $("#xr"),
    lensTo = (r) => {
      lensR = r;
      live && G.to(xr, { "--r": r + "px", duration: 0.5, ease: "out" });
    };
  live && G.set(xr, { "--r": "0px" });
  ["pointermove", "pointerdown"].forEach((t) =>
    document.addEventListener(t, (e) => {
      const r = $("#ab").getBoundingClientRect();
      if (
        onPage ||
        S.ab > 0.01 ||
        menuOpen() ||
        e.clientY > r.bottom ||
        e.clientY < r.top
      )
        return lensR && lensTo(0);
      xr.style.setProperty("--x", e.clientX + "px");
      xr.style.setProperty("--y", e.clientY + "px");
      lensR || lensTo(wide() ? 150 : 100);
    }),
  );
  root.addEventListener("pointerleave", () => lensTo(0));

  // first load: no animation, the hero is simply there
  Promise.all([
    document.fonts.ready,
    document.fonts.load('12px "JetBrains Mono"'),
    $("#shot").decode &&
      new Promise((r) => {
        $("#shot").src = im("forvalue");
        $("#shot").decode().then(r, r);
      }),
  ]).then(async () => {
    sizeAll();
    live && requestAnimationFrame(tick);
  });
  if (!live) ((S.of = S.ft = 1), (S.ab = H0));
  show(here);
  reveal();
}
