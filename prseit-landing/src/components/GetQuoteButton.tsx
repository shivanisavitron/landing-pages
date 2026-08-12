import { useState } from "react";
import { createPortal } from "react-dom";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

const RECIPIENT_EMAIL = "connect@savitron.ai";

// Get a free access key at https://web3forms.com (sign up with
// connect@savitron.ai so submissions land there) and put it in .env as
// VITE_WEB3FORMS_ACCESS_KEY. Web3Forms access keys are meant to be used
// client-side — this is not a secret the way a normal API key is.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

type FormState = {
  name: string;
  email: string;
  phone: string;
  description: string;
};

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", description: "" };

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-700/70">{label}</span>
      {children}
    </label>
  );
}

function GetQuoteButton({
  product,
  className,
}: {
  product: "ParseIt" | "Atithi";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  function updateField(field: keyof FormState) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function closeModal() {
    setOpen(false);
    setStatus("idle");
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Quote Request — ${product}`,
          from_name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.description,
          product,
          to: RECIPIENT_EMAIL,
        }),
      });

      const result = await response.json();
      setStatus(result.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex items-center gap-1.5 rounded-full border border-brand-500 px-5 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        }
      >
        Get Quote
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-ink-900/50"
            onClick={closeModal}
          >
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <div
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-floating sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {status === "sent" ? (
                  <div className="py-4 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                        <path
                          d="M5 13l4.5 4.5L19 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink-900">
                      Your query has been submitted
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700/60">
                      Our team will contact you soon.
                    </p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-6 w-full rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-ink-900">Request a Quote</h2>
                      <button
                        type="button"
                        onClick={closeModal}
                        aria-label="Close"
                        className="text-xl leading-none text-ink-700/50 transition-colors hover:text-ink-900"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-700/60">
                      Tell us a bit about what you need for {product} &mdash; we&apos;ll get
                      back to you by email.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                      <FormField label="Name">
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={updateField("name")}
                          className="mt-1 w-full rounded-lg border border-cream-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                        />
                      </FormField>
                      <FormField label="Email">
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={updateField("email")}
                          className="mt-1 w-full rounded-lg border border-cream-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                        />
                      </FormField>
                      <FormField label="Phone Number">
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={updateField("phone")}
                          className="mt-1 w-full rounded-lg border border-cream-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                        />
                      </FormField>
                      <FormField label="Description">
                        <textarea
                          rows={4}
                          value={form.description}
                          onChange={updateField("description")}
                          className="mt-1 w-full resize-none rounded-lg border border-cream-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
                        />
                      </FormField>

                      {status === "error" && (
                        <p className="text-sm font-medium text-rose-500">
                          Something went wrong sending your request. Please try again, or
                          email us directly at {RECIPIENT_EMAIL}.
                        </p>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="flex-1 rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-ink-900/30"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="flex-1 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
                        >
                          {status === "sending" ? "Sending…" : "Submit"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default GetQuoteButton;
