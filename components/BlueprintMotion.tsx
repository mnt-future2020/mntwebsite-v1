"use client";

import { useEffect } from "react";

// Behaviour for the blueprint page, attached by attribute so the markup stays
// declarative: [data-reveal] sections rise in with their [data-stagger] children,
// [data-decode] values scramble into place, [data-spot] cards carry a cursor
// spotlight, and #mnt-frame tilts and parallaxes. Ported from the design's own
// script so the timings match rather than approximate it.

const EASE = "cubic-bezier(.22,1,.36,1)";
const CHARS = "ACPUMB#$%<>/*01KX";

export default function BlueprintMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // ── Decode: scramble a value into place when it scrolls in ───────────────
    const decodeEls = Array.from(document.querySelectorAll<HTMLElement>("[data-decode]"));
    if (!reduce && decodeEls.length && typeof IntersectionObserver !== "undefined") {
      const run = (el: HTMLElement, delay: number) => {
        const text = el.getAttribute("data-decode") || el.textContent || "";
        const dur = 620;
        const t0 = performance.now() + delay;
        const step = (now: number) => {
          const p = (now - t0) / dur;
          if (p >= 1) {
            el.textContent = text;
            return;
          }
          if (p >= 0) {
            const settled = Math.floor(p * text.length);
            let out = "";
            for (let i = 0; i < text.length; i++) {
              out +=
                i < settled
                  ? text[i]
                  : text[i] === " "
                    ? " "
                    : CHARS[(Math.random() * CHARS.length) | 0];
            }
            el.textContent = out;
          }
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          run(e.target as HTMLElement, i * 110);
        });
      });
      decodeEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ── Hero: "buy from you" scrambles, then settles and gets the shine ──────
    const finalEl = document.getElementById("mnt-final");
    const dec = document.getElementById("mnt-decode");
    if (finalEl && dec) {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        finalEl.style.visibility = "visible";
        dec.style.display = "none";
      };
      if (reduce) {
        finish();
      } else {
        finalEl.style.visibility = "hidden";
        const text = "buy from you";
        const t0 = performance.now() + 980;
        const dur = 980;
        let raf = 0;
        const step = (now: number) => {
          if (done) return;
          const p = (now - t0) / dur;
          if (p >= 1) return finish();
          if (p >= 0) {
            const settled = Math.floor(p * text.length);
            let out = "";
            for (let i = 0; i < text.length; i++) {
              out +=
                i < settled
                  ? text[i]
                  : text[i] === " "
                    ? " "
                    : CHARS[(Math.random() * CHARS.length) | 0];
            }
            dec.textContent = out;
          }
          raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        const safety = setTimeout(finish, 2400);
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          clearTimeout(safety);
        });
      }
    }

    // ── Reveal: sections rise, their cards stagger behind them ───────────────
    if (!reduce && typeof IntersectionObserver !== "undefined") {
      const vh = window.innerHeight || 800;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
        (el) => el.getBoundingClientRect().top > vh * 0.85
      );
      if (sections.length) {
        const groups = new Map<HTMLElement, HTMLElement[]>();
        sections.forEach((sec) => {
          const cards = Array.from(sec.querySelectorAll<HTMLElement>("[data-stagger]"));
          cards.forEach((c, i) => {
            const d = `${120 + Math.min(i, 8) * 75}ms`;
            c.style.opacity = "0";
            c.style.transform = "translateY(20px)";
            c.style.transition = `opacity .8s ${EASE} ${d}, transform .8s ${EASE} ${d}`;
          });
          sec.style.opacity = "0";
          sec.style.transform = "translateY(20px)";
          sec.style.transition = `opacity .8s ${EASE}, transform .8s ${EASE}`;
          groups.set(sec, cards);
        });
        const showAll = (sec: HTMLElement) => {
          sec.style.opacity = "1";
          sec.style.transform = "none";
          groups.get(sec)?.forEach((c) => {
            c.style.opacity = "1";
            c.style.transform = "none";
          });
        };
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              showAll(e.target as HTMLElement);
              io.unobserve(e.target);
            });
          },
          { rootMargin: "0px 0px -10% 0px" }
        );
        sections.forEach((el) => io.observe(el));
        // Safety: only force sections already in view, in case IO misfires.
        const safety = setInterval(() => {
          const h = window.innerHeight || 800;
          sections.forEach((sec) => {
            if (sec.style.opacity === "0") {
              const r = sec.getBoundingClientRect();
              if (r.top < h * 0.92 && r.bottom > 0) showAll(sec);
            }
          });
        }, 1200);
        cleanups.push(() => {
          io.disconnect();
          clearInterval(safety);
        });
      }
    }

    // ── Frame parallax + tilt, and the cursor spotlight on cards ─────────────
    let par = 0;
    let tx = 0;
    let ty = 0;
    const applyFrame = () => {
      const fr = document.getElementById("mnt-frame");
      if (fr) {
        fr.style.transform = `translateY(${par.toFixed(1)}px) rotateX(${tx.toFixed(2)}deg) rotateY(${ty.toFixed(2)}deg)`;
      }
    };

    let spotEl: HTMLElement | null = null;
    const onSpot = (e: PointerEvent) => {
      const fr = document.getElementById("mnt-frame");
      if (fr && !reduce) {
        const r = fr.getBoundingClientRect();
        const inside =
          e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        tx = inside ? ((e.clientY - r.top) / r.height - 0.5) * -4.2 : 0;
        ty = inside ? ((e.clientX - r.left) / r.width - 0.5) * 4.2 : 0;
        applyFrame();
      }
      const el = (e.target as HTMLElement)?.closest?.("[data-spot]") as HTMLElement | null;
      if (spotEl && spotEl !== el) {
        spotEl.style.setProperty("--spot", "0");
        spotEl = null;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.setProperty("--spot", "1");
      spotEl = el;
    };

    // ── Header shrink + shadow ───────────────────────────────────────────────
    const onScroll = () => {
      const y = window.scrollY;
      const hd = document.getElementById("mnt-header");
      const hb = document.getElementById("mnt-headbar");
      if (hd) hd.style.boxShadow = y > 24 ? "0 12px 34px -22px rgba(11,21,36,0.4)" : "none";
      if (hb) hb.style.height = y > 24 ? "64px" : "78px";
      par = reduce ? 0 : Math.max(-34, -y * 0.055);
      applyFrame();
    };

    document.addEventListener("pointermove", onSpot, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => {
      document.removeEventListener("pointermove", onSpot);
      window.removeEventListener("scroll", onScroll);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
