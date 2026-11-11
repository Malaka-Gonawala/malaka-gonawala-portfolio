import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import NavLabel from "@/components/NavLabel";
import { en } from "@/content/en";

gsap.registerPlugin(CustomEase);
// out = settle, io = cover, soft = gentle in-out, in = strike (prototype eases)
const [out, io, soft, strike] = [
  ".22,1,.36,1",
  ".7,0,.2,1",
  ".45,0,.15,1",
  ".9,0,1,1",
].map((v, i) => CustomEase.create(`nav${i}`, v));
const t = en.nav;
const gutter = "px-[max(16px,4vw)]";

const type = (el, s, duration) => {
  const o = { n: 0 };
  return gsap.to(o, {
    n: s.length,
    duration,
    ease: "none",
    onUpdate: () => (el.textContent = s.slice(0, Math.round(o.n))),
  });
};

// Six tiles, the current page first: 3 x 2 on wide screens, 2 x 3 below, each the shape of the screen.
const cells = (top) => {
  const W = innerWidth,
    H = innerHeight,
    n = W < 900,
    c = n ? 2 : 3,
    r = 6 / c,
    gap = n ? 12 : 24,
    w = Math.min(
      (W - 2 * (n ? 16 : 48) - (c - 1) * gap) / c,
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

function toggleTheme() {
  const r = document.documentElement;
  const dark = r.dataset.theme
    ? r.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
  try {
    localStorage.setItem("theme", r.dataset.theme);
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
}

const Row = ({ className = "" }) => (
  <div className={`flex flex-wrap gap-x-7 gap-y-5 text-[15px] ${className}`}>
    <span>
      <a href="/" aria-current="true">
        EN
      </a>
      {" · "}
      <a href="/it/" hrefLang="it" lang="it">
        IT
      </a>
    </span>
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer underline"
    >
      {t.theme}
    </button>
    <span className="font-mono text-signal">{t.cert}</span>
  </div>
);

/* Flip menu (prototype v27). Wide screens (D2): the page shrinks into one tile of a tab overview ("you are here")
   and the other pages are dealt out beside it. Phones (M2): a PowerShell pane fills line by line, types `cd site`
   and each listing line flaps over into a big link; closing types `cd ..`. Flip back or Escape closes either. */
export default function Nav({ section }) {
  // On home the menu marks Work; while the menu is open the header names the same section as the marker.
  const here = section === "Home" ? "Work" : section;
  const [menu, setMenu] = useState(null); // null | { wide, stamp }
  const api = useRef(null);
  const hd = useRef(null);
  const flip = useRef(null);
  const box = useRef(null);
  const chip = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        wide: "(width >= 43.8125rem)",
        narrow: "(width < 43.8125rem)", // so one condition always matches
      },
      (ctx) => {
        const { reduce, wide } = ctx.conditions;
        let tls = [],
          busy = false;
        const done = (focus) => {
          tls.forEach((tl) => tl.revert());
          document.querySelector("main").style.transform = ""; // revert leaves translate(0, 0)
          tls = [];
          busy = false;
          setMenu(null);
          focus && flip.current.focus();
        };
        const lineRows = (m) =>
          Math.ceil(innerHeight / parseFloat(getComputedStyle(m).lineHeight));

        ctx.add("open", () => {
          const m = box.current,
            h = hd.current,
            main = document.querySelector("main"),
            tl = gsap.timeline({ defaults: { ease: io } });
          tls = [tl];
          tl.set(document.documentElement, { overflow: "hidden" }, 0);
          if (wide) {
            const tabs = [...m.querySelectorAll("[data-tab]")],
              C = cells(h.offsetHeight + 12),
              s = C[0].w / innerWidth,
              o = -main.getBoundingClientRect().top,
              clip = (r) =>
                `inset(${o}px 0 ${main.offsetHeight - o - innerHeight}px 0 round ${r}px)`,
              near = (i) =>
                Math.hypot(C[i + 1].x - C[0].x, C[i + 1].y - C[0].y) / C[0].w,
              order = tabs.map((_, i) => i).sort((a, b) => near(a) - near(b));
            tl.set(
              main,
              { position: "relative", zIndex: 16, transformOrigin: `0 ${o}px` },
              0,
            )
              .set(
                chip.current,
                { left: C[0].x + 10, top: C[0].y + C[0].h - 34 },
                0,
              )
              .fromTo(
                m.firstChild,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: soft },
                0,
              )
              .fromTo(
                main,
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
              // the other tabs are dealt out from behind the page, nearest first and on top
              .set(
                tabs,
                {
                  left: (i) => C[i + 1].x,
                  top: (i) => C[i + 1].y,
                  width: C[0].w,
                  height: C[0].h,
                  zIndex: (i) => 9 - order.indexOf(i),
                },
                0.1,
              )
              .fromTo(
                chip.current,
                { opacity: 0, y: -6 },
                { opacity: 1, y: 0, duration: 0.3 },
                0.85,
              )
              .fromTo(
                h,
                { "--hb": 0 },
                { "--hb": 1, duration: 1, ease: soft },
                0,
              )
              .fromTo(
                h,
                { "--ht": 0 },
                { "--ht": 1, duration: 0.2, ease: "none" },
                0.4,
              );
            tabs.forEach((el, i) =>
              tl.fromTo(
                el,
                { x: C[0].x - C[i + 1].x, y: C[0].y - C[i + 1].y, opacity: 1 },
                {
                  x: 0,
                  y: 0,
                  duration: 0.4 + 0.2 * near(i),
                  ease: out,
                  immediateRender: true,
                },
                0.4 + 0.06 * near(i),
              ),
            );
            tabs[0].focus({ preventScroll: true });
          } else {
            const links = [...m.querySelectorAll("nav a")],
              rows = lineRows(m),
              H = m.querySelector("[data-big]").offsetHeight * 1.08;
            tl.fromTo(
              m,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.5,
                ease: `steps(${rows})`,
              },
            )
              .set(
                h,
                { "--hb": 1, "--ht": 1 },
                (0.5 * Math.ceil((rows * h.offsetHeight) / innerHeight)) / rows,
              )
              .add(type(m.querySelector("[data-cmd]"), t.cd, 0.3))
              .from(m.querySelectorAll("nav > *"), {
                opacity: 0,
                duration: 0.01,
                stagger: 0.05,
              })
              .addLabel("printed", "+=.1")
              .call(
                () => links[0].focus({ preventScroll: true }),
                null,
                "printed",
              );
            links.forEach((a, i) => {
              const at = `printed+=${i * 0.08}`;
              tl.to(
                a.firstChild,
                { scaleY: 0, duration: 0.16, ease: strike },
                at,
              )
                .to(a, { height: H, duration: 0.34 }, at)
                .to(
                  a.lastChild,
                  { scaleY: 1, duration: 0.24, ease: out },
                  `${at}+=.16`,
                );
            });
          }
          if (reduce) tl.progress(1);
        });

        ctx.add("close", () => {
          if (busy || !tls.length) return;
          busy = true;
          const [tl] = tls,
            m = box.current;
          if (reduce) return done(true);
          if (wide) {
            tl.time(Math.min(tl.time(), tl.duration() * 0.8))
              .timeScale(1.3)
              .eventCallback("onReverseComplete", () => done(true))
              .reverse();
            return;
          }
          tl.pause();
          const rows = lineRows(m),
            p2 = m.querySelector("[data-p2]");
          p2.hidden = false;
          tls.push(
            gsap
              .timeline({
                defaults: { ease: io },
                onComplete: () => done(true),
              })
              .to(
                p2.lastChild,
                {
                  opacity: 0,
                  duration: 0.4,
                  repeat: 1,
                  yoyo: true,
                  ease: "steps(1)",
                },
                0,
              )
              .add(type(p2.children[1], t.up, 0.25), 0)
              .to({}, { duration: 0.12 })
              .to(m, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.45,
                ease: `steps(${rows})`,
              })
              .set(
                hd.current,
                { "--hb": 0, "--ht": 0 },
                0.37 +
                  (0.45 *
                    Math.ceil(
                      rows * (1 - hd.current.offsetHeight / innerHeight),
                    )) /
                    rows,
              ),
          );
        });

        ctx.add("shut", () => done(false));
        api.current = ctx;
        return () => setMenu(null);
      },
    );
    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    document.querySelector("main").inert = !!menu;
    if (!menu) return;
    api.current.open();
    const onKey = (e) => e.key === "Escape" && api.current.close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [menu]);

  const toggle = () =>
    menu
      ? api.current.close()
      : setMenu({ wide: api.current.conditions.wide, stamp: new Date() });

  // LastWriteTime is the visitor's own date and time, read when the listing is printed.
  let lw = "",
    listing = "";
  if (menu && !menu.wide) {
    const d = menu.stamp,
      day = d.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time = d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      w = Math.max(day.length + time.length + 1, 13) + 3,
      [mode, lwt, name] = t.cols;
    lw = `${day} ${time}`.padEnd(w);
    listing = `\n    ${t.dir}\n\n${mode}    ${lwt.padEnd(w)}${name}\n${"-".repeat(mode.length)}    ${"-".repeat(lwt.length).padEnd(w)}${"-".repeat(name.length)}`;
  }

  return (
    <>
      <header
        ref={hd}
        className={`hd fixed inset-x-0 top-0 z-20 flex items-start justify-between pt-[calc(18px+env(safe-area-inset-top,0px))] pb-3.5 ${gutter}`}
      >
        <a href="/">
          <NavLabel section={menu ? here : section} />
        </a>
        <button
          ref={flip}
          type="button"
          aria-expanded={!!menu}
          aria-controls="menu"
          onClick={toggle}
          className="inline-flex cursor-pointer items-center gap-2.5 py-1.5 text-base font-bold"
        >
          {menu ? t.flipBack : t.flip}
          <i
            aria-hidden="true"
            className="size-[22px] rounded-full bg-underside shadow-[inset_-11px_0_0_var(--color-signal)] outline-1 outline-underside-fg"
          />
        </button>
      </header>

      <div
        id="menu"
        ref={box}
        hidden={!menu}
        onClick={(e) => e.target.closest('a[href^="#"]') && api.current.shut()}
        className={
          menu?.wide
            ? "fixed inset-0 z-15 text-underside-fg"
            : `fixed inset-0 z-15 flex flex-col justify-between gap-5 overflow-auto bg-underside pt-[calc(var(--hh)+12px)] pb-[calc(24px+env(safe-area-inset-bottom,0px))] font-mono text-[length:clamp(13px,3.4vw,15px)] leading-[1.65] text-underside-fg ${gutter}`
        }
      >
        {menu?.wide && (
          <>
            <div className="absolute inset-0 bg-underside" />
            <nav aria-label={t.label}>
              {t.links
                .filter(([label]) => label !== here)
                .map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    data-tab
                    className="@container absolute top-0 left-0 block overflow-hidden rounded-[14px] bg-bg text-fg opacity-0 shadow-[0_24px_60px_-24px_rgb(0_0_0/.7)] outline-1 outline-[color-mix(in_srgb,var(--color-muted)_35%,transparent)] hover:text-forest hover:outline-3 hover:outline-gold focus-visible:text-forest focus-visible:outline-3 focus-visible:outline-gold"
                  >
                    <span className="flex h-[max(24px,8cqi)] items-center bg-surface px-[3cqi] font-mono text-[length:max(10px,3cqi)] text-muted">
                      <span className="truncate rounded-full bg-bg px-[1em] py-[.3em]">
                        {t.domain}
                        {label.toLowerCase()}
                      </span>
                    </span>
                    <span className="block px-[6cqi] pt-[6cqi] font-heading text-[length:15cqi] leading-[.9] font-medium tracking-[-0.02em]">
                      {label}
                    </span>
                  </a>
                ))}
            </nav>
            <Row className="absolute right-[max(16px,4vw)] bottom-[calc(20px+env(safe-area-inset-bottom,0px))] left-[max(16px,4vw)]" />
          </>
        )}
        {menu && !menu.wide && (
          <>
            <div>
              <p className="whitespace-pre">
                <span className="text-gold">{t.prompt}</span>
                <span data-cmd />
              </p>
              <nav aria-label={t.label}>
                <p className="whitespace-pre opacity-70">{listing}</p>
                {t.links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    aria-current={label === here ? "page" : undefined}
                    className="group relative block h-[1.65em] overflow-hidden"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 origin-bottom whitespace-pre"
                    >
                      {`${t.mode}  ${lw}${label.toLowerCase()}`}
                    </span>
                    <span
                      data-big
                      className="absolute bottom-0 left-0 origin-bottom [transform:scaleY(0)] font-heading text-[length:clamp(44px,9vh,108px)] leading-none font-medium tracking-[-0.02em] whitespace-pre"
                    >
                      <span
                        aria-hidden="true"
                        className="hidden align-[.2em] font-mono text-[.4em] font-bold text-signal group-hover:inline group-focus-visible:inline"
                      >
                        &gt;
                      </span>
                      {label}
                      {label === here && (
                        <span
                          aria-hidden="true"
                          className="font-mono text-sm font-normal tracking-normal"
                        >
                          {t.hereArrow}
                        </span>
                      )}
                    </span>
                  </a>
                ))}
              </nav>
              <p data-p2 hidden className="whitespace-pre">
                <span className="text-gold">{t.prompt2}</span>
                <span />
                <i className="inline-block h-[1.1em] w-[.6em] bg-underside-fg align-[-.2em]" />
              </p>
            </div>
            <Row />
          </>
        )}
      </div>
      {menu?.wide && (
        <span
          ref={chip}
          aria-hidden="true"
          className="pointer-events-none fixed z-17 rounded-full bg-underside px-2.5 py-1 font-mono text-xs text-underside-fg opacity-0"
        >
          {t.here}
        </span>
      )}
    </>
  );
}
