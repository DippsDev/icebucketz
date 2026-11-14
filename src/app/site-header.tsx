"use client";

import Link from "next/link";
import { useState } from "react";

const navLink =
  "relative z-10 font-display text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 sm:px-5 sm:py-2 transition-colors hover:text-accent";

type Key = "home" | "shop";

function CurvedLogo() {
  return (
    <Link href="/" aria-label="Ice Bucketz home" className="relative z-10 block text-accent">
      <svg viewBox="0 0 200 110" className="w-32 sm:w-44">
        <defs>
          <path id="arc-outer" d="M 20 95 A 80 80 0 0 1 180 95" />
          <path id="arc-inner" d="M 50 95 A 50 50 0 0 1 150 95" />
        </defs>
        <text className="font-display" fontSize="22" fontWeight="600" letterSpacing="4" fill="currentColor">
          <textPath href="#arc-outer" startOffset="50%" textAnchor="middle">ICE BUCKETZ</textPath>
        </text>
        <text className="font-display" fontSize="11" fontWeight="500" letterSpacing="3" fill="currentColor">
          <textPath href="#arc-inner" startOffset="50%" textAnchor="middle">GABORONE</textPath>
        </text>
        <text x="100" y="104" textAnchor="middle" fontSize="7" letterSpacing="3" fill="currentColor" opacity="0.8">
          EST. 2026
        </text>
      </svg>
    </Link>
  );
}

/** Pill outline that grows open from the centre when shown and shrinks back when hidden. */
function Outline({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 hidden rounded-full sm:block border border-foreground/70 transition-[transform,opacity] duration-300 ease-out ${
        on ? "scale-100 opacity-100" : "scale-x-50 scale-y-75 opacity-0"
      }`}
    />
  );
}

/** Header whose outline pill moves to whichever link is hovered, then back to the current page. */
export default function SiteHeader({ active = "home" }: { active?: Key }) {
  const [target, setTarget] = useState<Key>(active);

  const hover = (k: Key) => ({
    onMouseEnter: () => setTarget(k),
    onFocus: () => setTarget(k),
    onBlur: () => setTarget(active),
  });

  return (
    <header
      onMouseLeave={() => setTarget(active)}
      className="relative mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-start px-4 pt-4 sm:px-6 sm:pt-6"
    >
      <nav className="flex justify-start pt-4 pr-2 sm:justify-end sm:pt-6 sm:pr-8 md:pr-16">
        <Link href="/" className={navLink} {...hover("home")}>
          <Outline on={target === "home"} />
          Home
        </Link>
      </nav>
      <div className="flex flex-col items-center">
        <CurvedLogo />
        <div className="h-8 w-px bg-accent/70 sm:h-12" />
      </div>
      <nav className="flex justify-end pt-4 pl-2 sm:justify-start sm:pt-6 sm:pl-8 md:pl-16">
        <Link href="/shop" className={navLink} {...hover("shop")}>
          <Outline on={target === "shop"} />
          Shop
        </Link>
      </nav>
    </header>
  );
}
