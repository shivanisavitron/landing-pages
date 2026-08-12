import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm6.5 0h3.8v1.8h.05c.53-1 1.83-2 3.77-2C21 8.8 22 11 22 15.2V21h-4v-5.3c0-1.3-.02-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 8.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.4 4.6 12 4.6 12 4.6s-4.4 0-7.1.3c-.4 0-1.3.1-2.1 1C2.2 6.6 2 8.2 2 8.2S1.8 10 1.8 11.9v1.2C1.8 15 2 16.8 2 16.8s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.3.3 7.3.3s4.4 0 7.1-.3c.4 0 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.8.2-3.7v-1.2c0-1.9-.2-3.7-.2-3.7ZM9.9 15.3V8.7l6 3.3-6 3.3Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.5 3.66 1.45 5.2L2 22l5.1-1.6a9.7 9.7 0 0 0 4.94 1.36c5.44 0 9.84-4.4 9.84-9.84C21.9 6.4 17.5 2 12.04 2Zm0 17.8c-1.6 0-3.1-.44-4.4-1.24l-.32-.2-3 .94.96-2.9-.22-.32a7.9 7.9 0 0 1-1.26-4.26c0-4.4 3.6-8 8.02-8 4.42 0 8 3.6 8 8s-3.58 7.98-7.98 7.98Zm4.4-6c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.38.1-.5.1-.12.24-.3.36-.44.12-.14.16-.24.24-.4.08-.16.04-.3-.04-.42-.08-.12-.5-1.2-.68-1.64-.18-.42-.36-.36-.5-.37h-.44c-.15 0-.4.06-.6.3-.2.24-.78.76-.78 1.85 0 1.1.8 2.15.9 2.3.1.14 1.5 2.3 3.7 3.14 2.2.84 2.2.56 2.6.53.4-.04 1.3-.53 1.48-1.04.18-.5.18-.94.13-1.03-.05-.1-.2-.16-.44-.28Z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5 12 13l8-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialButton({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white/80 transition-colors hover:bg-gold-500/20 hover:text-gold-400"
    >
      {children}
    </a>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs font-bold uppercase tracking-[0.16em] text-gold-500">{children}</div>
  );
}

function FooterLink({
  href,
  internal,
  children,
}: {
  href: string;
  internal?: boolean;
  children: ReactNode;
}) {
  const className = "text-sm text-white/70 transition-colors hover:text-gold-400";
  if (internal) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-coal-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img src="/LogoSavitron-transparent.png" alt="Savitron.ai" className="h-9 w-auto" />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              AI and Business Performance Accelerator &mdash; combining domain
              expertise, full-stack AI and cloud engineering to deliver
              measurable outcomes.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialButton href="https://www.linkedin.com/company/savitron-ai" label="LinkedIn">
                <LinkedInIcon />
              </SocialButton>
              <SocialButton href="https://www.youtube.com" label="YouTube">
                <YouTubeIcon />
              </SocialButton>
              <SocialButton href="https://wa.me/919916600370" label="WhatsApp">
                <WhatsAppIcon />
              </SocialButton>
              <SocialButton href="mailto:connect@savitron.ai" label="Email">
                <MailIcon className="h-4 w-4" />
              </SocialButton>
            </div>
          </div>

          <div>
            <FooterHeading>Navigation</FooterHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink href="/" internal>
                  Home
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/our-solutions">Our Solutions</FooterLink>
              </li>
              <li>
                <FooterLink href="/" internal>
                  Our Products
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/our-team">Our Team</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/careers">Careers</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/insights">Insights</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/contact-us">Contact Us</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/privacy-policy">Privacy Policy</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Our Products</FooterHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink href="https://doculens.savitron.ai">DocuLens</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/datamasseur">DataMasseur</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/amp">AMP</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/recon">Recon</FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/insights">Insights</FooterLink>
              </li>
              <li>
                <FooterLink href="/atithi" internal>
                  Atithi
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://savitron.ai/skimaa">Skimaa</FooterLink>
              </li>
              <li>
                <FooterLink href="/" internal>
                  All Products
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Get In Touch</FooterHeading>
            <div className="mt-4 space-y-4 text-sm text-white/70">
              <div className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>
                  1st Floor, Orchid Business Park, Sohna Road, Sector 48,
                  Gurugram, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-gold-500" />
                <a href="mailto:connect@savitron.ai" className="transition-colors hover:text-gold-400">
                  connect@savitron.ai
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-500" />
                <a href="tel:+919916600370" className="transition-colors hover:text-gold-400">
                  +91 99166 00370
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          &copy; {year} Savitron.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
