import SiteHeader from "./site-header";

/** Stadium-shaped image frame. Swap the placeholder for <Image fill className="object-cover" /> */
function Stadium({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#1f3a7a] via-[#16285a] to-[#0a1230] shadow-2xl shadow-black/40 ring-1 ring-white/10 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,196,255,0.25),transparent_60%)]" />
      <span className="relative font-display text-sm uppercase tracking-[0.3em] text-white/50">{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <SiteHeader active="home" />

      {/* Hero */}
      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-10 px-4 pb-12 sm:px-6 sm:pb-16 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {/* Left */}
        <section className="order-2 flex flex-col items-center text-center lg:order-1">
          <span className="mb-6 h-1.5 w-1.5 rounded-full bg-accent" />
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] lg:text-5xl xl:text-6xl">
            <span className="font-semibold text-accent">Ice Bucket</span>
            <br />
            <span className="font-semibold text-accent">Delivery</span>{" "}
          </h1>
          <div className="mt-10 space-y-1 text-sm text-accent/90">
            <p>Only available in Gaborone</p>
            <p>and surrounding areas.</p>
          </div>
        </section>

        {/* Main image */}
        <div className="order-1 flex justify-center md:col-span-2 lg:order-2 lg:col-span-1">
          <Stadium label="Main Image" className="h-[380px] w-60 sm:h-[460px] sm:w-72 md:h-[520px] md:w-80 lg:h-[500px] lg:w-[300px] xl:h-[540px] xl:w-[340px]" />
        </div>

        {/* Right */}
        <section className="order-3 mt-8 flex flex-row items-center md:mt-0 justify-center gap-6 text-left sm:gap-10 md:flex-col md:gap-8 md:text-center lg:order-3">
          <Stadium label="Image 2" className="h-40 w-28 shrink-0 sm:h-52 sm:w-36" />
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-accent">Working Hours</h2>
            <div className="mt-4 space-y-1 text-sm text-accent/90">
              <p>Monday – Thursday</p>
              <p>Online orders only</p>
            </div>
            <div className="mt-4 space-y-1 text-sm font-bold uppercase tracking-wider text-accent">
              <p>Limited stock!</p>
              <p>Deliveries only!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
