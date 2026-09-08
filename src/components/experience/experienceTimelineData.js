// Chronological milestones shown in the ExperienceTimeline section.
// x/y are positions in a shared 3695x900 coordinate space used to lay the
// items out along the unwound horizontal line (see ExperienceTimeline.jsx).
// ENTRIES MUST STAY IN CHRONOLOGICAL ORDER AND `x` MUST STAY ASCENDING —
// the layout, spiral spacing and pan reveal are all index-driven.
//
// kind:
//   "win"        — an outright first place (warm accent).
//   "internship" — a stretch of TIME, not a placement. Rendered as a
//                  thickened SEGMENT of the road between `spanStart` and
//                  `spanEnd` (same coord space as x), card anchored to the
//                  segment midpoint. `ongoing: true` means no closing cap —
//                  the segment stays open at its leading edge because the
//                  internship is still in progress.
//   (unset)      — a competition placement: a single point on the line.
export const EXPERIENCE_TIMELINE_DATA = [
  {
    tag: "2025",
    short: "ISRO IROC Finalist",
    title: "Finalist, ISRO IROC ’25",
    desc: "ISRO Robotics Challenge — a national student competition, and where the whole thing started: a drone that had to actually fly, not just work on paper.",
    x: 250,
    y: 120,
  },
  {
    tag: "2025",
    short: "Regional Finalist",
    title: "Regional Finalist",
    desc: "Aavishkar '25 — a project reading EEG and EMG signals to predict hunger before it's consciously felt. The first research problem chosen rather than assigned.",
    x: 690,
    y: 620,
  },
  {
    tag: "Jan 2026 — present",
    short: "IIT Bombay",
    title: "Research Intern, IIT Bombay",
    desc: "Taken on alongside a full course load back home — the first of two internships this year, and the first time the research came with a desk and a schedule attached to it.",
    kind: "internship",
    ongoing: true,
    spanStart: 960,
    spanEnd: 1300,
    x: 1130,
    y: 545, // taller card (ONGOING pill + left rule) — sits higher so it clears the viewport bottom
  },
  {
    tag: "2026",
    short: "2nd Runner-Up",
    title: "2nd Runner-Up",
    desc: "DevHacks '26 — competed against 200+ teams for a top-three finish, in a room that made every earlier competition look small.",
    x: 1640,
    y: 120,
  },
  {
    tag: "2026",
    short: "3rd Place",
    title: "3rd Place",
    desc: "DJS Sanshodhan — the hunger-state model brought back and reworked, this time placing among the top three at a dedicated research symposium.",
    x: 2050,
    y: 610,
  },
  {
    tag: "2026 — Winner",
    short: "IndiaNext Winner",
    title: "Winner, IndiaNext Hackathon",
    desc: "BuildStorm Track at KES Shroff College — first place among the competing teams, and the first outright win after a run of near-misses.",
    kind: "win",
    x: 2460,
    y: 115,
  },
  {
    tag: "2026",
    short: "1st Runner-Up",
    title: "1st Runner-Up",
    desc: "Codefolio '26 at SPIT — second place in a competition about building portfolios, which is its own kind of fitting.",
    x: 2890,
    y: 155,
  },
  {
    tag: "Jul 2026 — present",
    short: "Falcon Skyworks",
    title: "CV & AI Intern, Falcon Skyworks",
    desc: "Computer vision and applied AI, in industry rather than research — the second internship this year, and the one where the work finally felt familiar.",
    kind: "internship",
    ongoing: true,
    spanStart: 3230,
    spanEnd: 3570,
    x: 3400,
    y: 545, // taller card (ONGOING pill + left rule) — sits higher so it clears the viewport bottom
  },
];

// A quiet narrative thread that runs between the milestones above — not
// attached to any single card, just ambient text tracing the arc. `band` is
// "upper" (above the traveled-road line) or "lower" (below it) — see
// ExperienceTimeline.jsx's STORY_Y_UPPER/STORY_Y_LOWER. It's per-fragment
// rather than a simple alternation because it depends on real geometry: a
// fragment can only go "upper" where it doesn't horizontally overlap a
// top-anchored card's content box (measured against the longest top card,
// which runs down to y≈450 — the line's own center).
export const EXPERIENCE_STORY_FRAGMENTS = [
  { x: 190, band: "lower", text: "It began with a drone that had to fly — no partial credit for a good idea that stayed on the ground." },
  { x: 470, band: "lower", text: "Then a quieter question: what the body says about hunger before the mind catches up." },
  { x: 870, band: "upper", text: "Two finals in, and it still wasn't really about placing." },
  { x: 1420, band: "upper", text: "Research picked up a desk, and mornings, and a schedule — the internship made it a job." },
  { x: 1850, band: "lower", text: "The hackathons came thick after that — bigger rooms, more teams, less room to hide." },
  { x: 2230, band: "lower", text: "The old hunger model came back around, reworked, and placed again." },
  { x: 2660, band: "lower", text: "The first outright win landed quietly. No fireworks — just relief." },
  { x: 3110, band: "lower", text: "By the second internship, in industry this time, it had stopped feeling like luck." },
  { x: 3520, band: "upper", text: "Three years in, and it's still the same road — just further along it." },
];

// TRACK_UNITS leaves empty space at both ends of the track: ~250 units
// before the first item and ~295 after the last.
export const TRACK_UNITS = 3695;
