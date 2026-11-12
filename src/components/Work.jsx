import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { work } from "@/content/en";

gsap.registerPlugin(CustomEase, ScrollTrigger);
const ui = CustomEase.create("ui", ".22,1,.36,1");
// Panels are stacked and pinned only on wide screens with motion allowed; everywhere else they flow.
const stacked = "wide:motion-safe:absolute wide:motion-safe:inset-0";

const link =
  "font-bold text-forest underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg";

// S2-A lead slide: whole desktop screenshot (5% bleed right), phone mock over its bottom-left corner.
function Lead({ slug, name, pitch, alt }) {
  return (
    <section
      aria-label={name}
      className={`flex min-h-[calc(100svh-var(--hh))] flex-col justify-center gap-8 overflow-hidden py-10 wide:flex-row wide:items-center wide:gap-[4vw] ${stacked}`}
    >
      <div className="relative w-full wide:order-2 wide:w-[62%]">
        <img
          src={`/img/projects/${slug}-d.webp`}
          alt={alt}
          width="1440"
          height="820"
          loading="lazy"
          className="w-[105%] max-w-none rounded-lg shadow-2xl"
        />
        <img
          src={`/img/projects/${slug}-p.webp`}
          alt=""
          width="390"
          height="823"
          loading="lazy"
          className="absolute -bottom-6 left-3 w-[26%] rounded-xl border border-fg/25 shadow-2xl wide:-bottom-8 wide:left-[3%] wide:w-[24%]"
        />
      </div>
      <div className="px-[max(16px,4vw)] wide:order-1 wide:flex-1 wide:pr-0">
        <h2 className="font-heading text-[clamp(40px,6vw,96px)] leading-none">
          {name}
        </h2>
        <p className="mt-4 max-w-[34ch] text-[clamp(16px,1.6vw,20px)]">
          {pitch}
        </p>
        <a href={`/work/${slug}/`} className={`${link} mt-5 inline-block`}>
          {work.open}
        </a>
      </div>
    </section>
  );
}

// E1 list (P2): pitch only on the active row; the preview window follows the active row (desktop only).
function Others() {
  const [active, setActive] = useState(0);
  const shots = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const to = (duration) => () =>
      gsap.to(shots.current, {
        opacity: (i) => (i === active ? 1 : 0),
        duration,
      });
    mm.add("(prefers-reduced-motion: no-preference)", to(0.4));
    mm.add("(prefers-reduced-motion: reduce)", to(0));
    return () => mm.revert();
  }, [active]);

  return (
    <section
      aria-label="More projects"
      className={`grid min-h-[calc(100svh-var(--hh))] content-center gap-8 px-[max(16px,4vw)] py-10 wide:grid-cols-[1fr_1.3fr] wide:items-center wide:gap-[4vw] ${stacked}`}
    >
      <ul>
        {work.others.map((p, i) => (
          <li key={p.slug} className="border-t border-fg/20 last:border-b">
            <a
              href={`/work/${p.slug}/`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="block py-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-fg"
            >
              <span
                className={`font-heading text-[clamp(28px,3.4vw,52px)] leading-tight transition-colors ${i === active ? "text-forest" : ""}`}
              >
                {p.name}
              </span>
              <span
                className={`mt-2 max-w-[44ch] text-[16px] ${i === active ? "block" : "hidden"}`}
              >
                {p.pitch}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="relative hidden aspect-[16/10] overflow-hidden rounded-lg border border-fg/20 wide:block"
      >
        {work.others.map((p, i) => (
          <img
            key={p.slug}
            ref={(el) => (shots.current[i] = el)}
            src={`/img/projects/${p.slug}-d.webp`}
            alt=""
            width="1000"
            height="625"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
    </section>
  );
}

const [first, second] = work.leads.map((l) => l.slug);

// Wide + motion: the stage pins; an address bar types the next project, the old page blurs out, the new one sharpens in,
// then the list appears. Phone and reduced motion: plain stacked sections, no pin.
export default function Work({ onSection }) {
  const stage = useRef(null);
  const url = useRef(null);
  const cnt = useRef(null);
  const load = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: stage.current,
      start: "top 60%",
      onEnter: () => onSection("Work"),
      onLeaveBack: () => onSection("Home"),
    });
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 701px) and (prefers-reduced-motion: no-preference)",
      () => {
        const panels = stage.current.querySelectorAll(":scope > section");
        const [a, b, c] = panels;
        const rows = c.querySelectorAll("li");
        const txt = { n: 0 };
        const type = (from, to) => ({
          n: 1,
          duration: 0.5,
          ease: "none",
          onUpdate: () => {
            // n 0..1: delete `from`, then type `to` (steps of one character)
            const n = txt.n;
            url.current.textContent =
              n < 0.5
                ? from.slice(0, Math.round(from.length * (1 - n * 2)))
                : to.slice(0, Math.round(to.length * (n - 0.5) * 2));
          },
        });
        gsap.set([b, c], { autoAlpha: 0 });
        gsap.set(rows, { autoAlpha: 0, y: 10 });
        const hold = { duration: 0.6 };
        const tl = gsap
          .timeline({
            defaults: { ease: ui },
            scrollTrigger: {
              trigger: stage.current,
              start: () =>
                `top ${parseFloat(getComputedStyle(stage.current).top)}`,
              end: "+=250%",
              pin: true,
              scrub: 0.6,
            },
          })
          .to({}, hold)
          .fromTo(txt, { n: 0 }, type(first, second), "<")
          .to(
            a,
            { filter: "blur(16px)", autoAlpha: 0, duration: 0.4 },
            ">-0.15",
          )
          .fromTo(
            load.current,
            { scaleX: 0, autoAlpha: 1 },
            { scaleX: 1, duration: 0.4 },
            "<",
          )
          .to(load.current, { autoAlpha: 0, duration: 0.15 })
          .fromTo(
            b,
            { filter: "blur(16px)" },
            { filter: "blur(0px)", autoAlpha: 1, duration: 0.4 },
            "<-0.4",
          )
          .call(() => (cnt.current.textContent = "2 / 2"), null, "<")
          .to({}, hold)
          .fromTo(txt, { n: 0 }, type(second, ""), ">")
          .to(
            b,
            { filter: "blur(16px)", autoAlpha: 0, duration: 0.4 },
            ">-0.15",
          )
          .to(c, { autoAlpha: 1, duration: 0.3 }, "<")
          .to(
            rows,
            { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.3 },
            ">-0.1",
          )
          .to({}, hold);
        url.current.textContent = first;
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.set([...panels, ...rows, load.current], {
            clearProps: "all",
          });
        };
      },
    );
    return () => {
      st.kill();
      mm.revert();
    };
  }, [onSection]);

  return (
    <div id="work">
      <div
        ref={stage}
        className="wide:motion-safe:relative wide:motion-safe:top-(--hh) wide:motion-safe:h-[calc(100svh-var(--hh))]"
      >
        <div
          aria-hidden="true"
          className="relative z-10 hidden items-center gap-2 px-[max(16px,4vw)] pt-2 font-mono text-[13px] text-muted wide:motion-safe:flex"
        >
          <span>malakagonawala.dev/work/</span>
          <span ref={url}>{first}</span>
          <span className="ml-auto" ref={cnt}>
            1 / 2
          </span>
          <span
            ref={load}
            className="absolute bottom-[-2px] left-0 h-0.5 w-full origin-left bg-signal opacity-0"
          />
        </div>
        {work.leads.map((l) => (
          <Lead key={l.slug} {...l} />
        ))}
        <Others />
      </div>
    </div>
  );
}
