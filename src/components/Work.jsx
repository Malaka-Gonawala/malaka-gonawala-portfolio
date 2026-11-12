import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { work } from "@/content/en";

const link =
  "font-bold text-forest underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg";

// S2-A lead slide: whole desktop screenshot (5% bleed right), phone mock over its bottom-left corner.
function Lead({ slug, name, pitch, alt }) {
  return (
    <section
      aria-label={name}
      className="flex min-h-[calc(100svh-var(--hh))] flex-col justify-center gap-8 overflow-hidden py-10 wide:flex-row wide:items-center wide:gap-[4vw]"
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
      className="grid min-h-[calc(100svh-var(--hh))] content-center gap-8 px-[max(16px,4vw)] py-10 wide:grid-cols-[1fr_1.3fr] wide:items-center wide:gap-[4vw]"
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

export default function Work() {
  return (
    <div id="work">
      {work.leads.map((l) => (
        <Lead key={l.slug} {...l} />
      ))}
      <Others />
    </div>
  );
}
