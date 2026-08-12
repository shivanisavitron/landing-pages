import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
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
    <header className="sticky top-0 z-30 border-b border-cream-200/70 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <img src="/LogoSavitron-transparent.png" alt="Savitron.ai" className="h-8 w-auto" />
        <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 sm:inline">
          Product Hub
        </span>
      </div>
    </header>
  );
}

// Each product is a self-contained entry. To add a future product once its
// page exists, add one entry here (and its route in App.tsx) — nothing else
// on this page needs to change.
type ProductEntry = {
  name: string;
  accent: string;
  slug: string;
  tagline: string;
  description: string;
  icon: ReactNode;
};

const PRODUCTS: ProductEntry[] = [
  {
    name: "Parse",
    accent: "It",
    slug: "parseit",
    tagline: "Document Intelligence",
    description:
      "Document intelligence and PDF data extraction — rules first, AI when needed, humans always in control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="11.5" cy="13.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M13.4 15.4 15.5 17.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Atit",
    accent: "hi",
    slug: "atithi",
    tagline: "Business Operations",
    description:
      "Business operations and financial management — bookings, expenses, payments and accounts in one place.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M4 20V6a1 1 0 0 1 1-1h6l2 2h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M8 13.5 10.5 16 16 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ProductCard({ product, index }: { product: ProductEntry; index: number }) {
  const { ref, inView } = useInView<HTMLAnchorElement>();
  const fromLeft = index % 2 === 0;

  return (
    <Link
      to={`/${product.slug}`}
      ref={ref}
      className={`group flex flex-col rounded-2xl border border-gold-500/25 bg-coal-900 p-8 shadow-card transition-all duration-700 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-floating sm:p-10 ${
        inView
          ? "translate-x-0 opacity-100"
          : `opacity-0 ${fromLeft ? "-translate-x-8" : "translate-x-8"}`
      }`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
        {product.icon}
      </span>

      <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-white">
        {product.name}
        <span className="text-gold-400">{product.accent}</span>
      </h3>
      <span className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-500">
        {product.tagline}
      </span>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">{product.description}</p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors group-hover:text-gold-300">
        Explore {product.name}
        {product.accent}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </Link>
  );
}

function HomePage() {
  return (
    <div className="relative bg-cream-50">
      <Navbar />

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,167,44,0.10),transparent_50%)]"
        />

        <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-16 text-center sm:px-10 sm:pt-20 lg:px-16 lg:pb-32 lg:pt-24">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Savitron.ai &mdash; Products
          </span>

          <h1 className="mx-auto mt-5 max-w-3xl text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.2rem]">
            Solutions Built for Smarter Business Operations
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-600">
            Savitron develops specialized products for automation, data,
            finance and business operations — each one built to solve a
            specific operational problem, not a generic one.
          </p>
        </main>
      </div>

      <section className="relative bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
