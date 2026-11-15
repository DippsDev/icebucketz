"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Placeholder contact details: replace with the real ones.
const contact = {
  phone: "+267 7X XXX XXX",
  whatsapp: "https://wa.me/2677XXXXXXX",
  instagram: "https://instagram.com/icebucketz",
  tiktok: "https://tiktok.com/@icebucketz",
};

const heading = "font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent";
const item = "text-sm text-foreground/70 transition-colors hover:text-accent";

export default function SiteFooter() {
  // The shop page is a full-screen menu, so it has no footer.
  if (usePathname() === "/shop") return null;

  return (
    <footer className="relative border-t border-accent/30 bg-[#0a1230]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-14">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-semibold tracking-[0.15em] text-accent">ICE BUCKETZ</p>
          <p className="mt-3 max-w-xs text-sm text-foreground/60">
            Ice-cold drink buckets, delivered across Gaborone and surrounding areas.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className={heading}>Explore</p>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/" className={item}>Home</Link></li>
            <li><Link href="/shop" className={item}>Shop</Link></li>
            <li><Link href="/order?bucket=build-a-bucket" className={item}>Build A Bucket</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className={heading}>Contact</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={item}>{contact.phone}</a></li>
            <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={item}>WhatsApp</a></li>
            <li><a href={contact.instagram} target="_blank" rel="noopener noreferrer" className={item}>Instagram</a></li>
            <li><a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className={item}>TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs uppercase tracking-[0.2em] text-foreground/40 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
          <p>© 2026 Ice Bucketz · Gaborone</p>
          <p>18+ only · Drink responsibly</p>
        </div>
      </div>
    </footer>
  );
}
