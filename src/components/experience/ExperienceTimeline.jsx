import { useEffect, useRef } from "react";
import {
  EXPERIENCE_TIMELINE_DATA,
  EXPERIENCE_STORY_FRAGMENTS,
  TRACK_UNITS,
} from "./experienceTimelineData";

const N = 110; // sample count — smooth enough for this curve, cheap to rebuild every frame
const SPIRAL_CX = 800;
const SPIRAL_CY = 450; // true vertical center of the 900-tall viewBox
const SPIRAL_START_R = 16;
const SPIRAL_TURNS = 2.2;
const SPIRAL_MAX_ANGLE = SPIRAL_TURNS * Math.PI * 2;
const SPIRAL_MAX_R = 330;
const SPIRAL_GROWTH = (SPIRAL_MAX_R - SPIRAL_START_R) / SPIRAL_MAX_ANGLE;
const SPIRAL_SQUASH = 0.62;
const SPIRAL_START_ANGLE = -Math.PI * 0.5;
const LINE_Y0 = 450; // vertical center of the 900-tall viewBox — was 130 (near the top)
const LINE_WIDTH = 1600;
// The first stretch of the spiral is reserved for pure line growth — the
// curve should visibly establish itself before any milestone appears.
const LEAD_IN = 0.14;
const DRAW_END = 0.22; // 0 -> DRAW_END: spiral draws itself
const MORPH_END = 0.34; // DRAW_END -> MORPH_END: spiral uncurls into the line
const TRACK_VW = 380; // track width in vw — kept proportional to TRACK_UNITS so inter-item spacing is unchanged
// y (0-900 space) for the background story fragments. Each fragment picks
// upper or lower via its own `band` field (see experienceTimelineData.js) —
// upper is only used where it's confirmed clear of a top-anchored card's
// content box, since the longest one reaches all the way to y≈450.
const STORY_Y_UPPER = 320; // clear of the line's top edge (~375) with margin
const STORY_Y_LOWER = 555; // clear of the line's bottom edge (~525) and the nearest bottom card (starts at y=590 minimum)
const PAN_MULT = (TRACK_VW - 100) / 100;
// The pan finishes slightly before the wrap's scroll range actually ends,
// so the last item gets to rest fully settled in view for a beat instead
// of the section handing off to what's next the instant it locks in place.
const PAN_END = 0.94;

function spiralPoint(t) {
  const r = SPIRAL_START_R + SPIRAL_GROWTH * t;
  const angle = SPIRAL_START_ANGLE + t;
  return {
    x: SPIRAL_CX + r * Math.cos(angle),
    y: SPIRAL_CY + r * Math.sin(angle) * SPIRAL_SQUASH,
  };
}

function linePoint(i) {
  const t = i / N;
  const x = t * LINE_WIDTH;
  const y =
    LINE_Y0 +
    34 * Math.sin(t * Math.PI * 2.3) +
    12 * Math.sin(t * Math.PI * 5.1 + 1.2);
  return { x, y };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(t) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function pathFrom(points) {
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} `;
  for (let i = 1; i < points.length; i++) {
    d += `L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)} `;
  }
  return d;
}

const SPIRAL_POINTS = Array.from({ length: N + 1 }, (_, i) =>
  spiralPoint((i / N) * SPIRAL_MAX_ANGLE),
);
const LINE_POINTS = Array.from({ length: N + 1 }, (_, i) => linePoint(i));
const ORIGIN_POINT = spiralPoint(0);

// Where each milestone sits on the spiral (compact label) — evenly spaced
// by angle across the post-lead-in stretch of the curve.
const SPIRAL_ITEM_POSITIONS = EXPERIENCE_TIMELINE_DATA.map((item, i) => {
  const t =
    (LEAD_IN + (i / (EXPERIENCE_TIMELINE_DATA.length - 1)) * (1 - LEAD_IN)) *
    SPIRAL_MAX_ANGLE;
  const p = spiralPoint(t);
  const outward = Math.cos(SPIRAL_START_ANGLE + t) >= 0 ? 1 : -1;
  return { x: p.x, y: p.y, t, outward };
});

function wobbledLinePoints(tSec) {
  return LINE_POINTS.map((p, i) => {
    const wob =
      16 * Math.sin(tSec * 0.5 + i * 0.05) +
      8 * Math.sin(tSec * 0.85 + i * 0.11 + 1.7);
    return { x: p.x, y: p.y + wob };
  });
}

// Internships render as a thickened stretch of the SAME wobble curve. Slice
// the per-frame point array to just the span so the overlay rides exactly on
// top of the base road instead of cutting a straight chord across it.
const INTERNSHIPS = EXPERIENCE_TIMELINE_DATA.map((item, idx) => ({ item, idx }))
  .filter(({ item }) => item.kind === "internship")
  .map(({ item, idx }) => ({
    idx,
    ongoing: !!item.ongoing,
    t0: item.spanStart / TRACK_UNITS, // span start as a fraction of the unwound line
    t1: item.spanEnd / TRACK_UNITS,
  }));

function segmentPath(points, t0, t1) {
  const n = points.length - 1;
  const i0 = Math.max(0, Math.floor(t0 * n));
  const i1 = Math.min(n, Math.ceil(t1 * n));
  return pathFrom(points.slice(i0, i1 + 1));
}

function ExperienceTimeline() {
  const wrapRef = useRef(null);
  const headerRef = useRef(null);
  const headerInnerRef = useRef(null);
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const originDotRef = useRef(null);
  const progressNoteRef = useRef(null);
  const trackRef = useRef(null);
  const captionRef = useRef(null);
  const yearGroupRef = useRef(null);
  const yrDotRefs = useRef([]);
  const yrLabelRefs = useRef([]);
  const itemRefs = useRef([]);
  const storyRefs = useRef([]);
  const segRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const headerEl = headerRef.current;
    const headerInnerEl = headerInnerRef.current;
    const pathEl = pathRef.current;
    const glowEl = glowRef.current;
    const dotEl = dotRef.current;
    const originDotEl = originDotRef.current;
    const progressNoteEl = progressNoteRef.current;
    const trackEl = trackRef.current;
    const captionEl = captionRef.current;
    const yearGroupEl = yearGroupRef.current;

    // Precompute both full path strings once — never rebuilt inside the
    // render loop except during the brief morph window, which is the only
    // phase that actually needs per-frame interpolation.
    const spiralPathD = pathFrom(SPIRAL_POINTS);
    const linePathD = pathFrom(LINE_POINTS);
    pathEl.setAttribute("d", spiralPathD);
    const spiralLen = pathEl.getTotalLength();
    pathEl.setAttribute("d", linePathD);
    const lineLen = pathEl.getTotalLength();
    pathEl.setAttribute("d", spiralPathD);

    // Segment lengths are effectively constant (only the tiny per-frame
    // wobble changes them) — measure once here, never inside render().
    // getTotalLength() forces synchronous layout; calling it per frame per
    // segment stalls the whole rAF loop and text reveals stop firing.
    const segLens = INTERNSHIPS.map((seg) => {
      pathEl.setAttribute("d", segmentPath(LINE_POINTS, seg.t0, seg.t1));
      return pathEl.getTotalLength();
    });
    pathEl.setAttribute("d", spiralPathD);

    let currentShape = "spiral";
    let rafId;

    // Only do any work while the section is actually near the viewport —
    // otherwise this loop keeps rebuilding 100+ point SVG paths every frame
    // forever, including while the user is scrolled somewhere else
    // entirely, which is wasted work that can make the whole page feel janky.
    let nearViewport = false;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        nearViewport = entries[0].isIntersecting;
      },
      { rootMargin: "30% 0px 30% 0px" },
    );
    visibilityObserver.observe(wrap);

    // One-time fade/rise/unblur for the header, independent of the
    // per-frame scroll-driven opacity and push-out below so it can't fight
    // or lag behind that tightly-synced animation. Keyed to the header
    // actually entering the viewport (not the generous rAF-gating margin
    // above, which fires while it's still well below the fold — using that
    // for this made the whole transition play out off-screen, unseen).
    const headerVisibilityObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headerInnerEl.classList.add("settled");
          headerVisibilityObserver.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    headerVisibilityObserver.observe(headerEl);

    function render(nowMs) {
      if (!nearViewport) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const tSec = nowMs / 1000;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, total > 0 ? -rect.top / total : 0),
      );

      // The seed point matters until the spiral has fully drawn itself —
      // after that its job is done.
      originDotEl.classList.toggle("origin-fade", progress > DRAW_END);

      if (progress < DRAW_END) {
        // Phase 1: drawing the spiral.
        const drawT = progress / DRAW_END;
        if (currentShape !== "spiral") {
          pathEl.setAttribute("d", spiralPathD);
          currentShape = "spiral";
        }
        pathEl.classList.remove("dimmed");
        pathEl.style.strokeDasharray = spiralLen;
        pathEl.style.strokeDashoffset = spiralLen * (1 - drawT);
        const activeAngle = drawT * SPIRAL_MAX_ANGLE;
        SPIRAL_ITEM_POSITIONS.forEach((pos, i) => {
          const lit = pos.t <= activeAngle + 0.001;
          yrDotRefs.current[i]?.classList.toggle("lit", lit);
          yrLabelRefs.current[i]?.classList.toggle("lit", lit);
        });
        yearGroupEl.style.opacity = 1;
        dotEl.style.opacity = 0;
        progressNoteEl.classList.remove("show");
        trackEl.classList.remove("show");
        captionEl.style.opacity = 1 - drawT * 0.3;
        // The header stays put, fully present, for the entire draw — it
        // only gets pushed out once the spiral starts becoming a line.
        headerEl.style.opacity = 1;
        headerEl.style.transform = "translateY(0px)";
      } else if (progress < MORPH_END) {
        // Phase 2: the same path uncurls from the spiral into the straight line.
        const morphT = smoothstep(
          (progress - DRAW_END) / (MORPH_END - DRAW_END),
        );
        const pts = SPIRAL_POINTS.map((p, i) => ({
          x: lerp(p.x, LINE_POINTS[i].x, morphT),
          y: lerp(p.y, LINE_POINTS[i].y, morphT),
        }));
        pathEl.setAttribute("d", pathFrom(pts));
        pathEl.classList.remove("dimmed");
        currentShape = "morphing";
        pathEl.style.strokeDasharray = "none";
        pathEl.style.strokeDashoffset = 0;
        yearGroupEl.style.opacity = 1 - morphT;
        dotEl.style.opacity = 0;
        segRefs.current.forEach((el) => el && (el.style.opacity = 0));
        progressNoteEl.classList.toggle("show", morphT > 0.6);
        trackEl.classList.toggle("show", morphT > 0.75);
        captionEl.style.opacity = Math.max(0, 0.7 - morphT);
        // Pushed out exactly across the morph — gone by the moment the
        // spiral finishes becoming a straight line.
        headerEl.style.opacity = 1 - morphT;
        headerEl.style.transform = `translateY(${-morphT * 36}px)`;
      } else {
        // Phase 3: the dim base line stays fully drawn the whole time — it
        // never vanishes and redraws, it just steps back. Layered on top,
        // the bright glow is a real reveal that grows from the very start
        // up to the dot — the traveled road is lit, the road ahead isn't —
        // but because the dim base underneath never disappears, there's
        // never a hard reset when this phase begins.
        const pts = wobbledLinePoints(tSec);
        const dLine = pathFrom(pts);
        pathEl.setAttribute("d", dLine);
        pathEl.style.strokeDasharray = "none";
        pathEl.style.strokeDashoffset = 0;
        pathEl.classList.add("dimmed");
        currentShape = "line";
        yearGroupEl.style.opacity = 0;
        headerEl.style.opacity = 0;

        const panProgress = Math.min(
          1,
          Math.max(0, (progress - MORPH_END) / (PAN_END - MORPH_END)),
        );

        // Internship segments: same wobble curve, thicker. Rather than
        // tracking raw scroll (which reads as "already there"), each segment
        // self-animates once the pan crosses its span start — a real draw-in
        // with the section's easing, matching how the cards reveal. The
        // per-frame work here is just keeping `d` on the wobble; the fill is
        // a CSS transition on stroke-dashoffset (see .et-stage-seg).
        INTERNSHIPS.forEach((seg, si) => {
          const el = segRefs.current[si];
          if (!el) return;
          el.setAttribute("d", segmentPath(pts, seg.t0, seg.t1));
          const entered = panProgress >= seg.t0;
          if (entered && !el.dataset.armed) {
            const segLen = segLens[si];
            el.dataset.armed = "1";
            el.style.strokeDasharray = segLen;
            el.style.strokeDashoffset = segLen; // start hidden
            requestAnimationFrame(() => {
              el.style.opacity = 1;
              // ongoing spans stop short of the tip — still in progress
              el.style.strokeDashoffset = seg.ongoing ? segLen * 0.18 : 0;
            });
          } else if (!entered && el.dataset.armed) {
            const segLen = segLens[si];
            delete el.dataset.armed;
            el.style.opacity = 0;
            el.style.strokeDashoffset = segLen;
          }
        });

        const dotLen = lineLen * panProgress;
        glowEl.setAttribute("d", dLine);
        glowEl.style.strokeDasharray = lineLen;
        glowEl.style.strokeDashoffset = lineLen - dotLen;

        progressNoteEl.classList.add("show");
        trackEl.classList.add("show");
        captionEl.style.opacity = 0;

        dotEl.style.opacity = Math.min(1, panProgress / 0.05);
        const dotPt = pathEl.getPointAtLength(dotLen);
        dotEl.setAttribute("cx", dotPt.x);
        dotEl.setAttribute("cy", dotPt.y);

        const vw = window.innerWidth;
        trackEl.style.transform = `translateX(${-(panProgress * PAN_MULT * vw)}px)`;

        let activeIdx = 0;
        itemRefs.current.forEach((el, i) => {
          const lit =
            panProgress >= EXPERIENCE_TIMELINE_DATA[i].x / TRACK_UNITS - 0.04;
          el?.classList.toggle("lit", lit);
          if (lit) activeIdx = i;
        });
        progressNoteEl.textContent = `${String(activeIdx + 1).padStart(2, "0")} / ${EXPERIENCE_TIMELINE_DATA.length}`;

        storyRefs.current.forEach((el, i) => {
          const lit =
            panProgress >=
            EXPERIENCE_STORY_FRAGMENTS[i].x / TRACK_UNITS - 0.04;
          el?.classList.toggle("lit", lit);
        });
      }

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      visibilityObserver.disconnect();
      headerVisibilityObserver.disconnect();
    };
  }, []);

  return (
    <section className="et-root">
      <div className="et-stage-wrap" ref={wrapRef}>
        <div className="et-stage">
          <div className="et-stage-header" ref={headerRef}>
            <div className="et-stage-header-inner" ref={headerInnerRef}>
              <p className="et-section-label">Where I've Spent My Time</p>
              <h2 className="et-section-heading">
                Experience &amp; <em>Achievements</em>
              </h2>
              <p className="et-hint">
                Scroll — one line, from spiral to open road
              </p>
            </div>
          </div>
          <p className="et-progress-note" ref={progressNoteRef}>
            {`01 / ${EXPERIENCE_TIMELINE_DATA.length}`}
          </p>
          <svg
            className="et-stage-svg"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
          >
            <circle
              className="et-origin-dot"
              ref={originDotRef}
              r="6"
              cx={ORIGIN_POINT.x}
              cy={ORIGIN_POINT.y}
            />
            <path className="et-stage-line" ref={pathRef} d="" />
            {INTERNSHIPS.map((seg, si) => (
              <path
                key={`seg-${seg.idx}`}
                ref={(el) => (segRefs.current[si] = el)}
                className={`et-stage-seg${seg.ongoing ? " ongoing" : ""}`}
                d=""
              />
            ))}
            <path className="et-stage-glow" ref={glowRef} d="" />
            <circle className="et-stage-dot" ref={dotRef} r="5" />
            <g ref={yearGroupRef}>
              {EXPERIENCE_TIMELINE_DATA.map((item, i) => {
                const pos = SPIRAL_ITEM_POSITIONS[i];
                return (
                  <g key={item.title}>
                    <circle
                      ref={(el) => (yrDotRefs.current[i] = el)}
                      className={`et-yr-dot${item.kind === "win" ? " win" : ""}`}
                      r="5"
                      cx={pos.x}
                      cy={pos.y}
                    />
                    <text
                      ref={(el) => (yrLabelRefs.current[i] = el)}
                      className="et-yr-label"
                      x={pos.x + pos.outward * 16}
                      y={pos.y + 4}
                      textAnchor={pos.outward > 0 ? "start" : "end"}
                    >
                      {item.short}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="et-track" ref={trackRef}>
            {EXPERIENCE_STORY_FRAGMENTS.map((frag, i) => (
              <p
                key={frag.text}
                ref={(el) => (storyRefs.current[i] = el)}
                className="et-story"
                style={{
                  left: `${(frag.x / TRACK_UNITS) * 100}%`,
                  top: `${((frag.band === "upper" ? STORY_Y_UPPER : STORY_Y_LOWER) / 900) * 100}%`,
                }}
              >
                {frag.text}
              </p>
            ))}
            {EXPERIENCE_TIMELINE_DATA.map((item, i) => (
              <div
                key={item.title}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`et-item${item.kind === "win" ? " win" : ""}${
                  item.kind === "internship" ? " internship" : ""
                }`}
                style={{
                  left: `${(item.x / TRACK_UNITS) * 100}%`,
                  top: `${(item.y / 900) * 100}%`,
                }}
              >
                <div className="et-marker">
                  <div className="et-marker-dot" />
                  <div className="et-marker-line" />
                </div>
                <div className="et-item-body">
                  <p className="et-item-tag">
                    {item.tag}
                    {item.ongoing && <span className="et-live">ongoing</span>}
                  </p>
                  <h3 className="et-item-title">{item.title}</h3>
                  <p className="et-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="et-stage-caption" ref={captionRef}>
            2023 — 2026, at a glance
          </p>
        </div>
      </div>

      <style>{`
        .et-root {
          /* Warm cream instead of purple — the shared background behind this
             section (WebLayout's DarkVeil shader) is already a moving
             purple/blue aurora, so a purple line would sink into it. Warm
             cream reads clearly against any part of that cool palette. */
          --et-accent: #f0e2bf;
          --et-accent-warm: #e8b563;
          --et-ink: #f3f1ec;
          --et-ink-dim: #b9b6c6;
          --et-ink-faint: #8a8697;
          position: relative;
          /* No background here on purpose — this sits directly on top of
             WebLayout's shared fixed background (gradient wash + DarkVeil +
             particles), same as every other section on the page. Painting
             our own backdrop would make this feel like a different themed
             page instead of part of the same site. */
          color: var(--et-ink);
          /* No overflow-x here: setting only one axis implicitly makes the
             other 'auto', which creates a scroll container on this element
             and silently breaks position:sticky inside .et-stage. The wide
             (300vw) horizontal track is already clipped by .et-stage's own
             overflow:hidden below, so this isn't needed. */
        }

        .et-stage-header {
          position: absolute; top: 0; left: 0; right: 0; z-index: 4;
          max-width: 74rem; margin: 0 auto; padding: clamp(1.5rem, 4vh, 2.75rem) clamp(1.5rem, 5vw, 3rem) 0;
          will-change: opacity, transform;
        }
        .et-stage-header-inner {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(6px);
          transition:
            opacity 1.1s cubic-bezier(.16,1,.3,1),
            transform 1.1s cubic-bezier(.16,1,.3,1),
            filter 1.1s cubic-bezier(.16,1,.3,1);
        }
        .et-stage-header-inner.settled {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        .et-section-label {
          font-family: var(--font-ui); font-weight: 800; font-size: 0.72rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--et-ink-faint); margin: 0 0 0.9rem;
        }
        .et-section-heading {
          font-family: var(--font-display); font-weight: 600; font-size: clamp(2rem, 4vw, 3rem);
          color: var(--et-ink); margin: 0 0 0.75rem;
        }
        .et-section-heading em { font-style: italic; font-weight: 300; color: var(--et-ink-dim); }
        .et-hint {
          font-family: var(--font-ui); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--et-ink-faint); margin: 0;
        }

        .et-stage-wrap { position: relative; height: 560vh; }
        .et-stage { position: sticky; top: 0; height: 100vh; overflow: hidden; }

        .et-stage-svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
        .et-stage-line {
          fill: none; stroke: var(--et-accent); stroke-width: 1.6; stroke-linecap: round;
          filter: drop-shadow(0 0 4px rgba(240,226,191,0.55));
          transition: opacity 0.7s ease, filter 0.7s ease;
        }
        .et-stage-line.dimmed { opacity: 0.3; filter: none; }
        .et-stage-glow {
          fill: none; stroke: var(--et-accent); stroke-width: 2; stroke-linecap: round;
          filter: drop-shadow(0 0 8px rgba(240,226,191,0.8));
        }
        .et-stage-dot { fill: var(--et-ink-dim); opacity: 0; }

        /* Internship = a stretch of time, drawn as a thicker warmer run of
           the road. Sits on top of the dim base line and under the bright
           glow. */
        .et-stage-seg {
          fill: none;
          stroke: var(--et-accent-warm);
          stroke-width: 4;
          stroke-linecap: round;
          opacity: 0;
          filter: drop-shadow(0 0 5px rgba(232, 181, 99, 0.5));
          transition:
            opacity 0.5s ease,
            stroke-dashoffset 0.9s cubic-bezier(.16, 1, .3, 1);
        }
        /* Ongoing: the JS parks strokeDashoffset short of the end so the
           span never visually "closes", and the whole run breathes to say
           it's still active. */
        .et-stage-seg.ongoing {
          animation: etSegBreathe 2.8s ease-in-out infinite;
        }
        @keyframes etSegBreathe {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(232, 181, 99, 0.4)); }
          50%      { filter: drop-shadow(0 0 9px rgba(232, 181, 99, 0.75)); }
        }

        .et-origin-dot {
          fill: var(--et-accent);
          transform-box: fill-box; transform-origin: center;
          animation: etOriginPulse 2.6s ease-in-out infinite;
        }
        .et-origin-dot.origin-fade { animation: none; opacity: 0; transition: opacity 0.4s ease; }
        @keyframes etOriginPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }

        .et-yr-dot { fill: var(--et-accent); opacity: 0; transition: opacity 0.45s ease; }
        .et-yr-dot.win { fill: var(--et-accent-warm); }
        .et-yr-dot.lit { opacity: 1; }
        .et-yr-label {
          font-family: var(--font-ui); font-weight: 800; font-size: 13px; fill: var(--et-ink);
          opacity: 0; transition: opacity 0.45s ease;
        }
        .et-yr-label.lit { opacity: 1; }

        .et-stage-caption {
          position: absolute; bottom: clamp(2rem, 6vh, 4rem); left: 50%; transform: translateX(-50%);
          font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--et-ink-faint); text-align: center; z-index: 2;
        }

        .et-track {
          position: absolute; top: 0; left: 0; width: ${TRACK_VW}vw; height: 100vh;
          will-change: transform, opacity; z-index: 2;
          opacity: 0; transition: opacity 0.5s ease;
        }
        .et-track.show { opacity: 1; }

        /* Unified timeline item styles */
        .et-item {
          position: absolute;
          max-width: 26rem;
          display: flex;
          gap: 1.2rem;
          transition: transform 0.5s cubic-bezier(.16,1,.3,1);
        }

        .et-item:hover .et-item-body {
          transform: translateX(6px);
        }

        .et-item-body {
          transition: transform 0.5s cubic-bezier(.16,1,.3,1);
        }

        /* Staggered reveals for active (.lit) items */
        .et-item-tag {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--et-accent);
          margin: 0 0 0.5rem 0;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          
          opacity: 0;
          transform: translateX(-12px);
          transition: 
            opacity 0.6s cubic-bezier(.16,1,.3,1), 
            transform 0.6s cubic-bezier(.16,1,.3,1),
            color 0.4s ease;
        }
        .et-item.lit .et-item-tag {
          opacity: 0.85;
          transform: translateX(0);
        }
        .et-item.win .et-item-tag {
          color: var(--et-accent-warm);
        }
        .et-item.internship .et-item-tag {
          color: var(--et-accent-warm);
        }

        /* Internship cards read as a place you *are*, not a result you got:
           a hairline warm rule down the left edge, slightly roomier body.
           The rule is only drawn once the card is lit — before that the card
           is transparent but still laid out, and a lone floating hairline
           reads as a stray line on the road. */
        .et-item.internship .et-item-body {
          padding-left: 1.1rem;
          /* marker (10px) + the flex gap (1.2rem) are gone — pull back so the
             card's left edge lands where competition card bodies sit. */
          margin-left: calc(-10px - 1.2rem + 1.1rem);
          border-left: 1px solid transparent;
          transition: border-color 0.6s ease;
        }
        .et-item.internship.lit .et-item-body {
          border-left-color: rgba(232, 181, 99, 0.35);
        }
        /* Internship cards don't get a marker at all. A competition card's
           dot reaches up to touch the road; an internship's tie to the
           timeline IS the warm road segment, which already sits on the line.
           A second dot floating in the gap between the segment and the
           (lower, taller) card just reads as a stray pulsing circle. */
        .et-item.internship .et-marker { display: none; }

        .et-live {
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--et-accent-warm);
          border: 1px solid rgba(232, 181, 99, 0.4);
          border-radius: 999px;
          padding: 0.12em 0.5em;
          margin-left: 0.7rem;
          position: relative;
        }
        .et-live::before {
          content: "";
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--et-accent-warm);
          margin-right: 0.4em;
          vertical-align: middle;
          animation: etLiveBlink 2s ease-in-out infinite;
        }
        @keyframes etLiveBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
        
        /* Tag horizontal dash line */
        .et-item-tag::after {
          content: "";
          width: 0;
          height: 1px;
          background: currentColor;
          opacity: 0.4;
          display: inline-block;
          vertical-align: middle;
          transition: width 0.6s cubic-bezier(.16,1,.3,1) 0.15s;
        }
        .et-item.lit .et-item-tag::after {
          width: 24px;
        }
        .et-item:hover .et-item-tag::after {
          width: 36px;
        }

        /* Title reveals with blur and springy slide */
        .et-item-title {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--et-ink);
          margin: 0;
          text-wrap: balance;
          
          opacity: 0;
          transform: translateY(16px);
          filter: blur(6px);
          transition: 
            opacity 0.7s cubic-bezier(.16,1,.3,1) 0.05s, 
            transform 0.7s cubic-bezier(.16,1,.3,1) 0.05s, 
            filter 0.7s cubic-bezier(.16,1,.3,1) 0.05s,
            letter-spacing 0.5s ease;
        }
        .et-item.lit .et-item-title {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        .et-item-title {
          font-size: clamp(1.7rem, 3vw, 2.5rem);
          line-height: 1.1;
        }
        
        /* Breathing letter-spacing on hover */
        .et-item:hover .et-item-title {
          letter-spacing: 0.015em;
        }

        /* Description reveals */
        .et-item-desc {
          font-family: var(--font-body);
          font-size: 0.94rem;
          line-height: 1.6;
          color: var(--et-ink-dim);
          margin: 0.6rem 0 0 0;
          text-wrap: pretty;
          
          opacity: 0;
          transform: translateY(12px);
          transition: 
            opacity 0.6s cubic-bezier(.16,1,.3,1) 0.12s, 
            transform 0.6s cubic-bezier(.16,1,.3,1) 0.12s;
        }
        .et-item.lit .et-item-desc {
          opacity: 0.95;
          transform: translateY(0);
        }

        /* Refined Node Markers (Direction 4) */
        .et-marker {
          flex: none;
          width: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.35rem;
        }
        
        .et-marker-dot {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--et-accent);
          box-shadow: 0 0 6px rgba(240, 226, 191, 0.7);
          opacity: 0;
          transform: scale(0.3);
          transition: 
            opacity 0.4s cubic-bezier(.16,1,.3,1), 
            transform 0.4s cubic-bezier(.16,1,.3,1),
            background-color 0.4s ease,
            box-shadow 0.4s ease;
        }
        .et-item.lit .et-marker-dot {
          opacity: 1;
          transform: scale(1);
        }
        .et-item.win .et-marker-dot {
          background: var(--et-accent-warm);
          box-shadow: 0 0 6px rgba(232, 181, 99, 0.8);
        }
        
        /* Outer pulsing beacon ring */
        .et-marker-dot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border: 1px solid var(--et-accent);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .et-item.lit .et-marker-dot::after {
          animation: etBeaconPulse 2.4s infinite ease-out;
        }
        
        .et-item.lit.win .et-marker-dot::after {
          border-color: var(--et-accent-warm);
        }
        
        @keyframes etBeaconPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .et-marker-line {
          width: 1px;
          flex: 1;
          margin-top: 6px;
          background: linear-gradient(to bottom, var(--et-accent), transparent);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: 
            opacity 0.6s cubic-bezier(.16,1,.3,1) 0.1s, 
            transform 0.6s cubic-bezier(.16,1,.3,1) 0.1s;
        }
        .et-item.lit .et-marker-line {
          opacity: 0.75;
          transform: scaleY(1);
        }
        .et-item.win .et-marker-line {
          background: linear-gradient(to bottom, var(--et-accent-warm), transparent);
        }

        .et-item-body {
          opacity: 1; /* Keep body opacity 1, let children stagger slide/fade */
        }

        /* Background narrative — quiet, italic, not attached to any card.
           Deliberately no tag/dot/marker so it never reads as a ninth
           achievement, just ambient text tracing the arc between them. */
        .et-story {
          position: absolute;
          transform: translate(-50%, calc(-50% + 8px));
          max-width: 15rem;
          text-align: center;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(0.7rem, 0.95vw, 0.88rem);
          line-height: 1.55;
          color: var(--et-ink-dim);
          text-wrap: balance;
          opacity: 0;
          pointer-events: none;
          transition:
            opacity 0.8s cubic-bezier(.16,1,.3,1),
            transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .et-story.lit {
          opacity: 0.82;
          transform: translate(-50%, -50%);
        }

        .et-progress-note {
          position: absolute; top: clamp(1.5rem, 5vh, 3rem); right: clamp(1.5rem, 6vw, 4rem);
          font-family: var(--font-ui); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--et-ink-faint); z-index: 3; opacity: 0; transition: opacity 0.6s ease;
        }
        .et-progress-note.show { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .et-stage-seg.ongoing,
          .et-live::before,
          .et-marker-dot::after { animation: none; }
        }
      `}</style>
    </section>
  );
}

export default ExperienceTimeline;
