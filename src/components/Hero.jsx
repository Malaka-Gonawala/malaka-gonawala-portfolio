import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { en } from "@/content/en";
import Signature from "@/components/Signature";

gsap.registerPlugin(CustomEase);
const ease = CustomEase.create("ui", ".22,1,.36,1");
const { name, line, cta, cmd } = en.hero;

// O2 two-sided button: on hover/focus the gold half takes the underside colours.
function HeroButton() {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const a = ref.current;
      const gold = a.firstChild;
      // Read the tokens at event time so a theme change is picked up.
      const to = (bg, fg, reset) => () => {
        const css = getComputedStyle(gold);
        gsap.to(gold, {
          backgroundColor: css.getPropertyValue(bg),
          color: css.getPropertyValue(fg),
          duration: 0.3,
          ease,
          overwrite: true,
          onComplete: () => reset && gold.removeAttribute("style"),
        });
      };
      const on = to("--color-underside", "--color-underside-fg");
      const off = to("--color-gold", "--color-on-gold", true);
      const events = [
        ["mouseenter", on],
        ["focus", on],
        ["mouseleave", off],
        ["blur", off],
      ];
      events.forEach(([e, f]) => a.addEventListener(e, f));
      return () => events.forEach(([e, f]) => a.removeEventListener(e, f));
    });
    return () => mm.revert();
  }, []);

  return (
    <a
      ref={ref}
      href="#work"
      className="group inline-flex w-full overflow-hidden rounded-md text-[17px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-fg sm:w-auto"
    >
      <span className="flex-1 bg-gold px-5 py-[15px] font-bold text-on-gold motion-reduce:group-hover:bg-underside motion-reduce:group-hover:text-underside-fg motion-reduce:group-focus:bg-underside motion-reduce:group-focus:text-underside-fg">
        {cta}
      </span>
      <span
        aria-hidden="true"
        className="flex items-center bg-underside px-4 font-mono text-[15px] font-bold text-signal"
      >
        {cmd}
      </span>
    </a>
  );
}

export default function Hero() {
  return (
    <section className="relative h-[calc(100svh-var(--hh))] min-h-[30rem] max-sm:max-h-[42rem] overflow-hidden leading-[1.55]">
      {/* B5b background: signature drawn behind a ForValue device; DOM order keeps the text on top. */}
      <Signature className="absolute top-[36%] left-[-4%] w-[140%] max-w-none text-forest opacity-45 sm:top-[10%] sm:left-[12%] sm:w-[125%]" />
      <div
        aria-hidden="true"
        className="absolute top-[54%] left-[46%] h-[100px] w-[62%] overflow-hidden rounded-[10px] border border-fg/25 bg-bg shadow-2xl sm:top-[54%] sm:left-[52%] sm:h-[200px] sm:w-[40%]"
      >
        <div className="h-3.5 bg-fg/12" />
        <img
          src="/img/projects/forvalue-hero.webp"
          alt=""
          width="1024"
          height="640"
          className="w-full"
        />
      </div>
      <h1 className="absolute inset-x-0 top-1/2 -translate-y-[110%] text-center font-heading text-[clamp(40px,12.5vw,220px)] leading-none font-medium tracking-[-0.02em]">
        {name}
      </h1>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 px-[max(16px,4vw)] pb-8">
        <p className="max-w-[32ch] text-[clamp(16px,1.8vw,22px)]">{line}</p>
        <HeroButton />
      </div>
    </section>
  );
}
