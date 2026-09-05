// Chronological milestones shown in the ExperienceTimeline section.
// Every entry gets the same prominent treatment — these are all real
// highlights, not a mix of major and minor. x/y are positions in a shared
// 3400x900 coordinate space used to lay the items out along the unwound
// horizontal line (see ExperienceTimeline.jsx).
export const EXPERIENCE_TIMELINE_DATA = [
  {
    tag: "2025",
    short: "Regional Finalist",
    title: "Regional Finalist",
    desc: "Aavishkar '25 — a project reading EEG and EMG signals to predict hunger before it's consciously felt. The first real research problem chosen rather than assigned.",
    x: 250,
    y: 160,
  },
  {
    tag: "2025",
    short: "3rd Place",
    title: "3rd Place",
    desc: "DJS Sanshodhan — the same hunger-state model, re-entered and placed third, proof the first result wasn't a fluke.",
    x: 690,
    y: 620,
  },
  {
    tag: "2025",
    short: "ISRO IROC Finalist",
    title: "Finalist, ISRO IROC ’25",
    desc: "ISRO Robotics Challenge — a national student robotics competition, and a shift from research into something that had to actually work on hardware.",
    x: 1130,
    y: 180,
  },
  {
    tag: "Jan 2026 — Internship",
    short: "IIT Bombay Intern",
    title: "Research Intern, IIT Bombay",
    desc: "Taken on alongside a full course load back home — the first of two internships this year, and the first time the research came with a desk and a schedule attached to it.",
    x: 1570,
    y: 600,
  },
  {
    tag: "2026 — Winner",
    short: "IndiaNext Winner",
    title: "Winner, IndiaNext Hackathon",
    desc: "BuildStorm Track at KES Shroff College — first place among the competing teams, the first outright win after two near-misses.",
    kind: "win",
    x: 2010,
    y: 140,
  },
  {
    tag: "2026",
    short: "2nd Runner-Up",
    title: "2nd Runner-Up",
    desc: "DevHacks '26 — competed against 200+ teams for a top-three finish, in a room that made the earlier competitions look small.",
    x: 2450,
    y: 610,
  },
  {
    tag: "2026",
    short: "1st Runner-Up",
    title: "1st Runner-Up",
    desc: "Codefolio '26 at SPIT — second place in a competition about building portfolios, which is its own kind of fitting.",
    x: 2890,
    y: 170,
  },
  {
    tag: "Jul 2026 — Internship",
    short: "Falcon Skyworks",
    title: "CV & AI Intern, Falcon Skyworks",
    desc: "Computer vision and applied AI, in industry rather than research — the second internship this year, and the one where the work finally felt familiar.",
    x: 3330,
    y: 590,
  },
];

// A quiet narrative thread that runs between the milestones above — not
// attached to any single card, just ambient text tracing the three-year arc.
// `band` is "upper" (above the traveled-road line) or "lower" (below it) —
// see ExperienceTimeline.jsx's STORY_Y_UPPER/STORY_Y_LOWER. It's per-fragment
// rather than a simple alternation because it depends on real geometry: a
// fragment can only go "upper" if it doesn't horizontally overlap a
// top-anchored card's content box (measured against the longest one, Winner/
// IndiaNext Hackathon, which runs down to y≈450 — the line's own center).
export const EXPERIENCE_STORY_FRAGMENTS = [
  { x: 190, band: "lower", text: "It started with a question nobody in the room could quite answer yet —" },
  { x: 470, band: "lower", text: "something about hunger, and what the body says before words do." },
  { x: 910, band: "upper", text: "Two placements in, and it still wasn't really about winning." },
  { x: 1350, band: "lower", text: "Robotics came next — a different problem, the same appetite for it." },
  { x: 1790, band: "upper", text: "Then research folded into something with a desk, and mornings, and a schedule." },
  { x: 2230, band: "lower", text: "The first outright win landed quietly. No fireworks — just relief." },
  { x: 2670, band: "upper", text: "Two hundred teams in the room, and still a place on the podium." },
  { x: 3110, band: "lower", text: "By the second internship, it had stopped feeling like luck." },
  { x: 3520, band: "upper", text: "Three years in, and it's still the same road — just further along it." },
];

// TRACK_UNITS leaves empty space at both ends of the track: 250 units
// before the first item (a middle ground — 150 read as too tight, 345 as
// too far in) and 365 after the last (TRACK_UNITS minus the last item's x,
// unchanged from before so the trailing clearance stays the same).
export const TRACK_UNITS = 3695;
