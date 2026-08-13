import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

const RECIPIENT_EMAIL = "connect@savitron.ai";

type FormState = {
  name: string;
  email: string;
  phone: string;
  description: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", description: "" };

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-700/70">{label}</span>
      {children}
    </label>
  );
}

function QuoteForm({ product }: { product: "ParseIt" | "Atithi" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function updateField(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function resetForm() {
    setStatus("idle");
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          description: form.description,
          product,
        }),
      });

      const result = await response.json();
      setStatus(result.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="quote-form" className="mx-auto w-full max-w-lg scroll-mt-28">
      <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-card sm:p-6">
        {status === "sent" ? (
          <div className="py-1 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M5 13l4.5 4.5L19 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-base font-bold text-ink-900">
              Your query has been submitted
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-700/60">
              Our team will contact you soon.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-4 w-full rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Send Another Request
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-base font-bold text-ink-900">Request a Quote</h2>
            <p className="mt-1 text-xs leading-relaxed text-ink-700/60">
              Tell us a bit about what you need for {product} &mdash; we&apos;ll get back to
              you by email.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
              <FormField label="Name">
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  className="mt-1 w-full rounded-lg border border-cream-200 px-3 py-1.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                />
              </FormField>
              <FormField label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  className="mt-1 w-full rounded-lg border border-cream-200 px-3 py-1.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                />
              </FormField>
              <FormField label="Phone Number">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={updateField("phone")}
                  className="mt-1 w-full rounded-lg border border-cream-200 px-3 py-1.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                />
              </FormField>
              <FormField label="Description">
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={updateField("description")}
                  className="mt-1 w-full resize-none rounded-lg border border-cream-200 px-3 py-1.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                />
              </FormField>

              {status === "error" && (
                <p className="text-xs font-medium text-rose-500">
                  Something went wrong sending your request. Please try again, or email us
                  directly at {RECIPIENT_EMAIL}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default QuoteForm;
