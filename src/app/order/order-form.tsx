"use client";

import { useState } from "react";

type Bucket = { slug: string; name: string; ingredients: string; price: string };

// Ticket style: light paper card on the dark page, dashed tear lines between sections.
const field =
  "w-full border-0 border-b-2 border-background/15 bg-transparent px-0 py-1.5 text-sm text-background placeholder:text-background/35 outline-none transition-colors focus:border-accent";
const label = "block font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-background/50";

function Tear() {
  return (
    <div className="relative -mx-5 my-4 sm:-mx-6" aria-hidden>
      <div className="border-t-2 border-dashed border-background/20" />
      <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-background" />
      <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-background" />
    </div>
  );
}

export default function OrderForm({ bucket }: { bucket: Bucket }) {
  const [qty, setQty] = useState(1);
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const custom = bucket.slug === "build-a-bucket";
  const unit = Number(bucket.price.replace(/\D/g, ""));

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-3xl bg-foreground px-5 py-5 text-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:px-6"
    >
      {/* Header */}
      <div className="text-center">
        <p className={label}>Ice Bucketz · Order</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase leading-none tracking-tight sm:text-3xl">{bucket.name}</h1>
        <p className="mt-2 text-xs text-background/60">{bucket.ingredients}</p>
      </div>

      <Tear />

      {/* Line item */}
      <div className="flex items-center justify-between">
        <div>
          <p className={label}>Price each</p>
          <p className="mt-1 font-display text-lg font-semibold">{bucket.price}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-background p-1 text-foreground">
          <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-full text-lg transition-colors hover:bg-accent">−</button>
          <span className="w-7 text-center font-display font-semibold">{qty}</span>
          <button type="button" aria-label="Increase" onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="h-8 w-8 rounded-full text-lg transition-colors hover:bg-accent">+</button>
        </div>
      </div>

      {custom && (
        <label className="mt-3 block">
          <span className={label}>Your drinks</span>
          <textarea rows={2} className={field + " resize-none"} placeholder="List the drinks you want" />
        </label>
      )}

      <Tear />

      {/* Details */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-1 rounded-full bg-background/10 p-1">
          {(["delivery", "pickup"] as const).map((m) => (
            <button key={m} type="button" onClick={() => setMethod(m)}
              className={`rounded-full py-2 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                method === m ? "bg-background text-foreground" : "text-background/60 hover:text-background"}`}>
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className={label}>Name</span>
            <input required className={field} placeholder="Your name" autoComplete="name" />
          </label>
          <label className="block">
            <span className={label}>Phone</span>
            <input type="tel" required className={field} placeholder="7X XXX XXX" autoComplete="tel" />
          </label>
        </div>
        {method === "delivery" && (
          <label className="block">
            <span className={label}>Address</span>
            <input required className={field} placeholder="Street, area, landmark" autoComplete="street-address" />
          </label>
        )}
        <label className="block">
          <span className={label}>Notes (optional)</span>
          <input className={field} placeholder="Anything we should know?" />
        </label>
      </div>

      <Tear />

      {/* Total */}
      <div className="flex items-end justify-between">
        <span className={label}>Total</span>
        <span className="font-display text-3xl font-bold text-accent">
          {custom && <span className="mr-1 text-base font-semibold">from</span>}P{unit * qty}
        </span>
      </div>

      <button type="submit"
        className="mt-4 w-full rounded-full bg-accent py-3.5 font-display text-sm font-semibold uppercase tracking-[0.25em] text-white transition-transform hover:scale-[1.02] active:scale-95">
        Place order
      </button>
    </form>
  );
}
