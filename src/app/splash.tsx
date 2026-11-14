"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "icebucketz-splash-seen";

/** The favicon bucket redrawn as vectors, so it is sharp at any size. */
function Bucket() {
  return (
    <svg viewBox="0 0 1024 1024" className="splash-svg h-auto w-[min(55vw,38vh,320px)]" aria-hidden>
      <g className="fill-accent stroke-accent">
        {/* Ice cubes sit behind the bucket so they drop "into" it */}
        <rect className="splash-cube splash-cube-1" x="345" y="356" width="92" height="62" rx="8" strokeWidth="0" />
        <rect className="splash-cube splash-cube-2" x="464" y="352" width="96" height="66" rx="8" strokeWidth="0" />
        <rect className="splash-cube splash-cube-3" x="588" y="358" width="92" height="62" rx="8" strokeWidth="0" />

        <path
          className="splash-handle"
          d="M 268 470 L 250 470 L 250 455 A 262 262 0 0 1 774 455 L 774 470 L 756 470"
          fill="none"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path className="splash-body" d="M 282 437 L 742 437 L 684 838 L 340 838 Z" strokeWidth="0" />
      </g>
    </svg>
  );
}

export default function Splash() {
  const [state, setState] = useState<"showing" | "leaving" | "gone">("showing");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) {
      setState("gone");
      return;
    }
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (state === "showing") return;
    // Mark as seen only once it has actually played/closed
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    if (state === "gone") document.body.style.overflow = "";
  }, [state]);

  if (state === "gone") return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Age confirmation"
      onTransitionEnd={(e) => e.target === e.currentTarget && state === "leaving" && setState("gone")}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center px-4 text-center">
        <Bucket />
        <div className="splash-gate mt-2 flex max-w-sm flex-col items-center">
          <p className="font-display text-2xl font-semibold text-accent sm:text-3xl">18+ only</p>
          <p className="mt-2 text-sm text-foreground/70">
            This site contains alcohol-related products. You must be 18 or older to enter.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              autoFocus
              onClick={() => setState("leaving")}
              className="rounded-full bg-accent px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
            >
              I am 18 or older
            </button>
            <a
              href="https://www.google.com"
              className="rounded-full border border-foreground/50 px-6 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              Leave
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
