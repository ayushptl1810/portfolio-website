import { useEffect } from "react";

export function useScrollToContact() {
  useEffect(() => {
    if (!sessionStorage.getItem("scrollToContact")) return;

    // Don't clear the flag until we've actually scrolled — React StrictMode
    // mounts/cleans up/remounts effects in dev, and clearing the flag
    // up-front means the (cancelled) first pass consumes it before the
    // surviving second pass ever gets to poll for the element.
    let attempts = 0;
    const maxAttempts = 40; // ~4s at 100ms intervals
    let timer;

    // Something else on route change (GSAP ScrollTrigger re-registering,
    // useScrollToTop, etc.) can knock a native smooth-scroll off course
    // right after it starts, so re-assert a few times instead of trusting
    // a single scrollIntoView call to survive uninterrupted.
    const reassertScroll = (el, reasserts = 5) => {
      el.scrollIntoView({ behavior: "smooth" });
      if (reasserts <= 0) return;
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top >= -10 && rect.top < window.innerHeight * 0.5;
        if (!inView) reassertScroll(el, reasserts - 1);
      }, 250);
    };

    const tryScroll = () => {
      const el = document.getElementById("contact");
      if (el) {
        sessionStorage.removeItem("scrollToContact");
        reassertScroll(el);
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        timer = setTimeout(tryScroll, 100);
      } else {
        sessionStorage.removeItem("scrollToContact");
      }
    };

    timer = setTimeout(tryScroll, 100);
    return () => clearTimeout(timer);
  }, []);
}
