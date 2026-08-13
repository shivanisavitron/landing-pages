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
          Parse<span className="text-brand-400">It</span>
        </div>
        <nav className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://parseit-dev.savitron.ai/login"
            target="_blank"
            rel="noopener noreferrer"
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

function MiniCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className}>
      <path
        d="M2 5.2 4 7.2 8 2.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

function FlowNode({
  label,
  tone,
  check,
}: {
  label: string;
  tone: "neutral" | "amber" | "green" | "blue";
  check?: boolean;
}) {
  const toneClasses = {
    neutral: "border-cream-200 bg-cream-50 text-ink-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    blue: "border-brand-200 bg-brand-50 text-brand-700",
  }[tone];

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-center text-sm font-semibold ${toneClasses}`}
    >
      {label}
      {check && <MiniCheckIcon className="h-3 w-3" />}
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

function LearnToImproveSection() {
  const { ref, inView } = useInView();
  const nodes: { label: string; tone: "neutral" | "amber" | "green" | "blue"; check?: boolean }[] = [
    { label: "Human Correction", tone: "neutral" },
    { label: "Candidate Pattern", tone: "neutral" },
    { label: "Pending Approval", tone: "amber" },
    { label: "Human Approval", tone: "green", check: true },
    { label: "Extraction Engine", tone: "blue" },
  ];

  return (
    <div
      ref={ref}
      className={`rounded-3xl border border-brand-100 bg-brand-50/40 px-6 py-12 transition-all duration-700 sm:px-12 sm:py-14 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <SectionEyebrow>Step 07</SectionEyebrow>
        <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-ink-900 sm:text-3xl">
          Corrections become improvements — only after approval.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-700/70">
          When a reviewer corrects an extraction, the correction becomes a candidate extraction
          pattern. It stays in Pending Approval until someone explicitly approves it.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center gap-3 sm:flex-row sm:gap-3">
            <FlowNode label={node.label} tone={node.tone} check={node.check} />
            {i < nodes.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-md rounded-full border border-brand-200 bg-white px-6 py-3 text-center text-sm font-semibold text-brand-700 shadow-sm">
        AI can suggest. Humans decide.
      </div>
    </div>
  );
}

function WhatParseItDoes() {
  const { ref, inView } = useInView();

  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>See It In Action</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            What ParseIt Does
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700/70">
            Watch a real document go from upload to reviewed, structured data —
            rules first, AI only when needed, and a human in the loop the
            whole way through.
          </p>
        </div>

        <div
          ref={ref}
          className={`mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-cream-200 bg-cream-50 shadow-card transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <video
            className="block h-auto w-full"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/parseit-demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
            From PDF to structured data — with humans in control.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700/70">
            ParseIt combines database-driven extraction rules with optional AI assistance, while
            keeping every extraction reviewable and every improvement approval-gated.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          <StepItem
            num="01"
            title="Log in to ParseIt"
            description="Sign in with your workspace credentials to access your document types, extraction rules, and review queue."
            from="left"
          />
          <StepItem
            num="02"
            title="Choose a document type"
            description="Start by selecting the document type you want to process. ParseIt uses the selected type to determine which fields and extraction rules should be applied."
            from="right"
          />
          <StepItem
            num="03"
            title="Upload your PDFs"
            description="Upload one or multiple PDF documents and let ParseIt prepare them for extraction."
            from="left"
          />
          <StepItem
            num="04"
            title="Extract structured fields"
            description="The database-driven rule engine extracts the fields defined for that document type. When the rules don't cover a particular layout, an optional LLM fallback can assist."
            from="right"
          />
          <StepItem
            num="05"
            title="Review and correct"
            description="Every extraction is reviewed by a person before it can be exported. Reviewers can correct values when something needs to be changed."
            from="left"
          />
          <StepItem
            num="06"
            title="Approve and export"
            description="Once the reviewer is satisfied with the extracted values, the document can be approved and exported as structured data."
            from="right"
          />
        </div>

        <div className="mt-20 lg:mt-28">
          <LearnToImproveSection />
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center lg:mt-20">
          <p className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            Automated extraction. <span className="text-brand-500">Human-controlled learning.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ParseItPage() {
  const { ref: heroTextRef, inView: heroTextInView } = useInView(0.1);
  const { ref: heroVisualRef, inView: heroVisualInView } = useInView(0.1);

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
              heroTextInView
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-500">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Document Intelligence
            </span>

            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              Turn Your PDFs Into
              <br />
              Structured,
              <br />
              Review-Ready Data.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-700/70 lg:mx-0">
              Select a document type, upload your PDFs, and ParseIt
              automatically extracts the fields you need using a
              database-driven rule engine, with optional AI fallback for
              unfamiliar layouts.
            </p>

            <div className="mx-auto mt-5 flex max-w-md items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3.5 text-left lg:mx-0">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                <MiniCheckIcon className="h-2.5 w-2.5" />
              </span>
              <p className="text-sm font-semibold leading-relaxed text-ink-900">
                Nothing is blindly automated. Every extraction is reviewed by
                a person, and corrections only improve the system after
                approval.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3.5 sm:flex-row lg:justify-start">
              <a
                href="https://parseit-dev.savitron.ai/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 sm:w-auto"
              >
                Start Processing
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
              heroVisualInView
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <QuoteForm product="ParseIt" />
          </div>
        </main>
      </div>

      <WhatParseItDoes />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default ParseItPage;
