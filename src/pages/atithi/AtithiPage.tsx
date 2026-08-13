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
          Atit<span className="text-brand-400">hi</span>
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
            From day-to-day activity to your financial picture.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700/70">
            Atithi connects the operational side of your business with the
            financial side — automatically, so nothing has to be re-entered
            or reconciled by hand.
          </p>
        </div>

        <div
          ref={ref}
          className={`mx-auto mt-12 max-w-3xl rounded-3xl border border-brand-100 bg-brand-50/40 px-6 py-10 transition-all duration-700 sm:px-10 sm:py-12 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3">
            <FlowNode
              label="Business Activity"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M1.5 8h2.5l1.5-4 2 8 1.5-4h5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <FlowArrow />
            <FlowNode
              label="Transactions"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M3 5.5h10M11 3l2 2.5-2 2.5M13 10.5H3M5 8l-2 2.5 2 2.5"
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
              label="Accounts"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2 6.5 8 2l6 4.5M3 6.5V13h10V6.5M6.5 13V9.5h3V13"
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
              label="Financial Picture"
              icon={
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2 13.5h12M4 13.5V8m3.5 5.5V4.5M11 13.5V6.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
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
            Record. Track. Reconcile. Understand.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700/70">
            Atithi turns daily business activity into a clear financial
            picture, kept automatically in sync.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          <StepItem
            num="01"
            title="Record"
            description="Record bookings, expenses and payments as they happen."
            from="left"
          />
          <StepItem
            num="02"
            title="Track"
            description="Track business transactions and accounts in one place."
            from="right"
          />
          <StepItem
            num="03"
            title="Reconcile"
            description="Reconcile bank transactions with your records automatically."
            from="left"
          />
          <StepItem
            num="04"
            title="Understand"
            description="Understand your business through reports and financial insights."
            from="right"
          />
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-center lg:mt-24">
          <p className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Every transaction tracked.{" "}
            <span className="text-brand-500">Every number in control.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function AtithiPage() {
  const { ref: heroTextRef, inView: heroTextInView } = useInView(0.1);
  const { ref: heroVisualRef, inView: heroVisualInView } = useInView(0.1);
  const workflowSteps = [
    "Bookings",
    "Expenses",
    "Payments",
    "Accounts",
    "Reconciliation",
    "Reports",
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
              Financial Operations
            </span>

            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              Run Your Business.
              <br />
              Keep Your Finances
              <br />
              in Control.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-700/70 lg:mx-0">
              Atithi brings bookings, expenses, payments, accounts,
              reconciliation and financial reporting together in one
              connected platform.
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
            <QuoteForm product="Atithi" />
          </div>
        </main>
      </div>

      <ProductFocus />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default AtithiPage;
