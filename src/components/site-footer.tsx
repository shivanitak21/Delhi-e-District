import { Link } from "@tanstack/react-router";
import { Landmark, Phone } from "lucide-react";

const POPULAR = [
  "Income Certificate",
  "SC / ST / OBC Certificate",
  "EWS Certificate",
  "Old Age Pension",
  "Marriage Registration",
  "Domicile Certificate",
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-secondary text-foreground">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-hero">
              <Landmark className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-bold">e-District Delhi</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-hero-foreground/75">
            One front door to government services. Rules, checks and decisions
            stay with the department that owns each service.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-saffron">
            Popular services
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-hero-foreground/80">
            {POPULAR.map((s) => (
              <li key={s}>
                <Link to="/services" className="hover:text-saffron hover:underline">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-saffron">
            Help & support
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-hero-foreground/80">
            <li>
              <Link to="/help" className="hover:text-saffron hover:underline">
                Frequently asked questions
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-saffron hover:underline">
                Raise a grievance
              </Link>
            </li>
            <li>
              <Link to="/track" className="hover:text-saffron hover:underline">
                Track an application
              </Link>
            </li>
            <li className="flex items-center gap-2 pt-1">
              <Phone className="h-3.5 w-3.5 text-saffron" aria-hidden />
              Helpline 1800-111-515 (24×7)
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-saffron">
            Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-hero-foreground/80">
            <li>DigiLocker — document wallet</li>
            <li>UMANG — mobile services</li>
            <li>Bhashini — multilingual & voice</li>
            <li>Department of Revenue, GNCTD</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-hero-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Government of NCT of Delhi · Concept mockup for review</p>
          <p>GIGW 3.0 aligned · DPDP privacy notice · Accessibility statement</p>
        </div>
      </div>
    </footer>
  );
}
