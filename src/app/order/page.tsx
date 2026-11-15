import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buckets } from "../buckets";
import OrderForm from "./order-form";

export const metadata: Metadata = {
  title: "Order | Ice Bucketz",
};

type SearchParams = Promise<{ bucket?: string }>;

export default function Order({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden px-4 py-6 sm:px-10 sm:py-8 lg:px-14 xl:px-20">
      {/* Background glows */}
      <div className="pointer-events-none absolute right-[10%] top-1/4 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#7cc4ff]/10 blur-[120px]" />

      {/* Back sits in the page corner, same spot as on the shop page */}
      <Link
        href="/shop"
        className="relative self-start rounded-full border border-foreground/70 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent sm:px-5 sm:py-2"
      >
        ← Back
      </Link>

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 py-6 lg:grid-cols-2 lg:gap-16">
        {/* Left: headline + how it works (desktop only) */}
        <section className="hidden lg:block">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-accent">Almost yours</p>
          <h1 className="mt-4 font-display text-6xl font-semibold leading-[0.95] xl:text-7xl">
            Ice cold.<br />
            <span className="text-accent">On the way.</span>
          </h1>

          <ol className="mt-12 space-y-6">
            {[
              ["Confirm your bucket", "Check your drinks and how many you want."],
              ["Add your details", "Name, number and where we should bring it."],
              ["We bring it ice cold", "Delivered or ready for pickup, chilled and packed."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/60 font-display font-semibold text-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display font-semibold uppercase tracking-wider">{title}</p>
                  <p className="mt-0.5 text-sm text-foreground/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-xs uppercase tracking-[0.3em] text-foreground/40">18+ only · Drink responsibly</p>
        </section>

        {/* Right: ticket */}
        <div className="mx-auto w-full max-w-md lg:mr-0">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-white/5" />}>
            <SelectedBucket searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function SelectedBucket({ searchParams }: { searchParams: SearchParams }) {
  const { bucket } = await searchParams;
  const selected = buckets.find((b) => b.slug === bucket);

  if (!selected) {
    return (
      <div className="rounded-3xl bg-foreground p-8 text-center text-background">
        <p className="font-display text-xl font-semibold">No bucket picked yet</p>
        <Link href="/shop" className="mt-5 inline-block rounded-full bg-accent px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Browse buckets
        </Link>
      </div>
    );
  }

  return <OrderForm bucket={selected} />;
}
