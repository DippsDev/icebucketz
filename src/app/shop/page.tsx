import type { Metadata } from "next";
import Link from "next/link";
import { buckets as options } from "../buckets";

export const metadata: Metadata = {
  title: "Shop | Ice Bucketz",
};

export default function Shop() {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* Left: main image 2 */}
      <div className="relative h-72 w-full shrink-0 overflow-hidden bg-gradient-to-b from-[#1f3a7a] via-[#16285a] to-[#0a1230] sm:h-96 lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,196,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-white/50">Main Image 2</span>
          {/* Replace with: <Image src="/shop.jpg" alt="" fill className="object-cover" /> */}
        </div>
      </div>

      {/* Right: menu */}
      <main className="flex w-full flex-col px-4 py-6 sm:px-10 sm:py-8 lg:w-1/2 lg:border-l lg:border-accent/30 lg:px-14 xl:px-20">
        <Link
          href="/"
          className="self-start rounded-full border border-foreground/70 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent sm:px-5 sm:py-2"
        >
          ← Back
        </Link>

        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-10 sm:py-14">
          <header className="text-center">
            <h1 className="font-display text-4xl font-semibold text-accent sm:text-5xl xl:text-6xl">Ice Buckets</h1>
          </header>

          <ul className="mt-12 space-y-8 sm:mt-14 sm:space-y-10">
            {options.map((o) => (
              <li key={o.slug}>
                <Link href={`/order?bucket=${o.slug}`} className="group block">
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <h2 className="font-display text-base font-semibold uppercase tracking-wider transition-colors group-hover:text-accent sm:text-lg">{o.name}</h2>
                    <span className="h-px flex-1 translate-y-[-4px] bg-accent/50" />
                    <span className="font-display text-base font-semibold text-accent sm:text-lg">{o.price}</span>
                  </div>
                  <p className="mt-1 pl-4 text-sm text-foreground/60 sm:pl-6">{o.ingredients}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
