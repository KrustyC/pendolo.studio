import * as THREE from "three";

/** Matches links, CTAs, form controls, disclosure triggers, common aria roles — anything that expects a semantic click */
const INTERACTIVE_ROOT_SELECTOR = [
  "a[href]",
  'button:not([disabled])',
  'input:not([type="hidden"]):not(:disabled)',
  "textarea:not(:disabled)",
  "select:not(:disabled)",
  "option",
  '[role="button"]:not([aria-disabled="true"])',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="menuitem"]',
  '[role="menuitemradio"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="tab"]',
  "summary",
  '[contenteditable="true"]',
  '[data-pendolo-no-chrome]',
].join(",");

/** True when spawning would steal focus from meaningful UI clicks */
export function blocksChromeSpawn(e: PointerEvent): boolean {
  if (e.defaultPrevented) return true;
  if (e.button !== 0) return true;
  if ((e.pointerType === "mouse" || e.pointerType === "pen") && (e.ctrlKey || e.metaKey || e.altKey)) {
    return true;
  }

  const touchesInteractive = (el: Element | null) => Boolean(el?.closest(INTERACTIVE_ROOT_SELECTOR));

  const inFixedChrome = (el: Element | null) =>
    Boolean(el?.closest("[data-navbar], [data-pendolo-footer]"));

  if (e.target instanceof Element && (touchesInteractive(e.target) || inFixedChrome(e.target))) {
    return true;
  }

  const top = document.elementFromPoint(e.clientX, e.clientY);
  if (top instanceof Element && (touchesInteractive(top) || inFixedChrome(top))) {
    return true;
  }

  return false;
}

/** Only on homepage hero overlay (pendulum backdrop + copy) — avoids surprise spawns on nav/footer */
export function isPointerInHeroSection(clientX: number, clientY: number): boolean {
  const el = document.querySelector<HTMLElement>("[data-pendolo-hero]");
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
}
