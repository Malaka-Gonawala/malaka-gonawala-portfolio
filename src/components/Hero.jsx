import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { en } from "@/content/en";

gsap.registerPlugin(CustomEase, ScrollTrigger);
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

// P1-1 split hero: stone front on the left ~60%, forest underside on the right ~40% (phone: below the seam between the two name lines).
// The name crosses the seam: a second copy in the underside ink is clipped to the panel. The panel carries no text (S9, copy pending).
export default function Hero() {
  // P7-1: the header wordmark stays hidden on Home; as the hero scrolls out the big name folds into it.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const nav = document.getElementById("nav-name");
      const big = document.getElementById("hero-name");
      const hero = big.closest("section");
      const from = () => {
        gsap.set(nav, { clearProps: "transform" });
        const a = big.getBoundingClientRect();
        const b = nav.getBoundingClientRect();
        const k =
          parseFloat(getComputedStyle(big).fontSize) /
          parseFloat(getComputedStyle(nav).fontSize);
        return { x: a.left - b.left, y: a.top - b.top, scale: k };
      };
      const tween = gsap.fromTo(
        nav,
        {
          x: () => from().x,
          y: () => from().y,
          scale: () => from().scale,
          opacity: 0,
          transformOrigin: "0 0",
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: () => `top ${hero.offsetTop}`,
            end: () => `bottom ${hero.offsetTop}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
      return () => {
        tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(nav, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const root = document.documentElement;
    const flag = (self) =>
      root.classList.toggle("on-hero", self.scroll() < hero.offsetTop);
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: flag,
      onRefresh: flag,
    });
    return () => {
      st.kill();
      root.classList.remove("on-hero");
    };
  }, []);

  const nameCls =
    "font-heading text-[clamp(56px,20.5vw,100px)] leading-[.95] font-medium tracking-[-0.02em] wide:text-[clamp(40px,12.9vw,260px)] wide:leading-none";
  return (
    <section
      id="hero"
      className="relative h-[calc(100svh-var(--hh))] min-h-[30rem] [clip-path:inset(calc(-1*var(--hh))_0_0_0)] leading-[1.55]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-(--hh) right-0 bottom-0 hidden w-[34%] bg-underside wide:block"
      />
      <div className="absolute inset-x-0 top-[25%] wide:top-[24%]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[.95em] h-[100svh] bg-underside text-[clamp(56px,20.5vw,100px)] wide:hidden"
        />
        <h1
          id="hero-name"
          className={`relative px-[max(16px,4vw)] wide:px-[6vw] wide:[clip-path:inset(0_34%_0_0)] ${nameCls}`}
        >
          <span className="block wide:inline">Malaka</span>{" "}
          <span className="block text-underside-fg wide:inline wide:text-fg">
            Gonawala
          </span>
        </h1>
        <p
          aria-hidden="true"
          className={`absolute inset-0 hidden px-[6vw] text-underside-fg wide:block [clip-path:inset(0_0_0_66%)] ${nameCls}`}
        >
          {name}
        </p>
      </div>
      <p className="absolute top-[11%] left-[max(16px,4vw)] wide:left-[6vw] max-w-[32ch] text-[clamp(16px,1.5vw,22px)] wide:top-[59%] wide:max-w-[47%]">
        {line}
      </p>
      <div className="absolute inset-x-0 bottom-0 px-[max(16px,4vw)] pb-6 wide:inset-x-auto wide:top-[78%] wide:bottom-auto wide:left-[calc(66%-11.4rem)] wide:px-0 wide:pb-0">
        <HeroButton />
      </div>
    </section>
  );
}
