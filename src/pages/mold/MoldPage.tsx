import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Footer from "../../components/Footer";
import QuoteForm from "../../components/QuoteForm";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-coal-800/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <div className="text-xl font-bold tracking-tight text-white">
          Mo<span className="text-brand-400">ld</span>
        </div>
        <nav className="flex items-center gap-3 sm:gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
          >
            Get Started
            <span aria-hidden="true">&rarr;</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-500">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

function FlowNode({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        {icon}
      </span>
      <div className="text-sm font-bold text-ink-900">{label}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <span className="text-brand-200" aria-hidden="true">
      <span className="block sm:hidden">&darr;</span>
      <span className="hidden sm:block">&rarr;</span>
    </span>
  );
}

function ProductFocus() {
  const { ref, inView } = useInView();
  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Product Focus</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Two files in. Only exceptions out.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700/70">
            Mold matches your Sale Sheet against Master Scheme data, column
            by column, and keeps only what actually needs your attention.
          </p>
        </div>

        <div
          ref={ref}
          className={`mx-auto mt-12 max-w-4xl rounded-3xl border border-brand-100 bg-brand-50/40 px-6 py-10 transition-all duration-700 sm:px-10 sm:py-12 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3">
            <FlowNode
              label="Master Scheme"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2 3.5h12M2 8h12M2 12.5h8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />
            <FlowArrow />
            <FlowNode
              label="Sale Sheet"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M3 2h7l3 3v9H3V2Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path d="M5.5 8.5h5M5.5 11h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              }
            />
            <FlowArrow />
            <FlowNode
              label="Column Mapping"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2 4.5h4M2 8h4M2 11.5h4M10 4.5h4M10 8h4M10 11.5h4M6 4.5l4 3.5-4 3.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <FlowArrow />
            <FlowNode
              label="Row Validation"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2 8a6 6 0 1 1 3.5 5.46"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path d="M6 8.5l1.7 1.7L11 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <FlowArrow />
            <FlowNode
              label="Exceptions Only"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M8 2 2 13.5h12L8 2Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path d="M8 6.5v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              }
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-cream-200 bg-cream-50 px-6 py-6 text-center sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-700/50">
            Best Fit
          </span>
          <p className="mt-2 text-sm leading-relaxed text-ink-700/70">
            Teams reconciling partner or channel sale sheets against master
            scheme data who need exceptions surfaced &mdash; without storing
            the source files.
          </p>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  num,
  title,
  description,
  from,
}: {
  num: string;
  title: string;
  description: string;
  from: "left" | "right";
}) {
  const { ref, inView } = useInView();
  const hiddenClass = from === "left" ? "-translate-x-10 opacity-0" : "translate-x-10 opacity-0";

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-cream-200 bg-white p-6 shadow-card transition-all duration-700 hover:-translate-y-1 hover:shadow-floating ${
        inView ? "translate-x-0 opacity-100" : hiddenClass
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
        {num}
      </span>
      <h3 className="mt-4 text-base font-bold leading-snug text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{description}</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-cream-50 py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            Upload. Map. Validate. Keep the exceptions.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700/70">
            Mold turns two CSVs into a clean set of exceptions, without ever
            warehousing the source sheets.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          <StepItem
            num="01"
            title="Upload Two Files"
            description="Bring a Master Scheme CSV and a Sale Sheet CSV &mdash; that's all Mold needs to start."
            from="left"
          />
          <StepItem
            num="02"
            title="Map the Columns"
            description="Configure how your sheet's columns line up with Master data, matching your existing structure instead of reformatting files."
            from="right"
          />
          <StepItem
            num="03"
            title="Validate Every Row"
            description="Every Sale row is checked against Master data before it reaches downstream systems."
            from="left"
          />
          <StepItem
            num="04"
            title="Store Only Failures"
            description="Exceptions are retained and raw data is not, keeping the footprint minimal."
            from="right"
          />
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-center lg:mt-24">
          <p className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Every row checked.{" "}
            <span className="text-brand-500">Only the exceptions kept.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function MoldPage() {
  const { ref: heroTextRef, inView: heroTextInView } = useInView(0.1);
  const { ref: heroVisualRef, inView: heroVisualInView } = useInView(0.1);
  const workflowSteps = [
    "Master Scheme",
    "Sale Sheet",
    "Column Mapping",
    "Row Validation",
    "Exceptions Only",
  ];

  return (
    <div className="relative bg-cream-50">
      <Navbar />

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(37,99,235,0.08),transparent_45%)]"
        />

        <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 pb-20 pt-4 sm:px-10 lg:flex-row lg:items-start lg:gap-8 lg:px-16 lg:pb-32 lg:pt-10">
          <div
            ref={heroTextRef}
            className={`w-full max-w-2xl text-center transition-all duration-700 lg:w-1/2 lg:text-left ${
              heroTextInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-500">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Data Validation
            </span>

            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              Reconcile Sale Data.
              <br />
              Store Only
              <br />
              the Exceptions.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-700/70 lg:mx-0">
              Upload a Master Scheme CSV and a Sale Sheet CSV, configure how
              the columns map to each other, and Mold validates every Sale
              row against the Master data &mdash; before it ever reaches
              downstream systems.
            </p>

            <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2 lg:mx-0 lg:justify-start">
              {workflowSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1.5 text-xs font-semibold text-brand-700">
                    {step}
                  </span>
                  {i < workflowSteps.length - 1 && (
                    <span className="text-brand-200" aria-hidden="true">
                      &rarr;
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row lg:justify-start">
              <a
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 sm:w-auto"
              >
                Get Started
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center rounded-full border border-ink-900/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-900/30 sm:w-auto"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div
            ref={heroVisualRef}
            className={`w-full transition-all duration-700 lg:w-1/2 lg:mt-10 ${
              heroVisualInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <QuoteForm product="Mold" />
          </div>
        </main>
      </div>

      <ProductFocus />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default MoldPage;
