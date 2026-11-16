import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Sparkles,
  ArrowRight,
  FileBadge,
  Users,
  ShieldCheck,
  MapPin,
  Heart,
  FileHeart,
  HeartHandshake,
  IdCard,
  Megaphone,
  QrCode,
  Upload,
  ClipboardCheck,
  BadgeCheck,
  ScanLine,
  Languages,
  LockKeyhole,
  Eye,
  Accessibility,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  services,
  announcements,
  categories,
  CATEGORY_META,
  type Category,
} from "@/data/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "e-District Delhi 2.0 — One front door to 453 services" },
      {
        name: "description",
        content:
          "Apply online for income, caste, EWS and domicile certificates, pensions and registrations. Track every application and download QR-verified certificates.",
      },
      { property: "og:title", content: "e-District Delhi 2.0 — One front door to 453 services" },
      {
        property: "og:description",
        content:
          "Find service information, apply online, upload documents, track applications and download certificates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ICONS: Record<string, typeof FileBadge> = {
  FileBadge,
  Users,
  ShieldCheck,
  MapPin,
  Heart,
  FileHeart,
  HeartHandshake,
  IdCard,
  Landmark: ShieldCheck,
  Store: BadgeCheck,
  Baby: Users,
  Accessibility,
};

const CATEGORY_ICONS: Record<Category, typeof FileBadge> = {
  Certificates: FileBadge,
  "Pensions & Welfare": HeartHandshake,
  Registrations: ClipboardCheck,
  "Revenue & Property": ShieldCheck,
  "Licences & Permits": BadgeCheck,
};

function Index() {
  const popular = services.filter((s) => s.popular);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="bg-background">
          <div className="container-page apple-intro">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-foreground">Delhi e-District 2.0 <span className="font-normal text-muted-foreground">· concept preview</span></p>
              <h1 className="apple-title mt-4">One front door to 453 government services of Delhi.</h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Find the right service, apply online, upload documents once and track every step. Rules, checks and decisions stay with the department that owns each service.</p>
              <form className="mx-auto mt-7 flex min-w-0 max-w-xl gap-2" onSubmit={(event) => { event.preventDefault(); navigate({ to: "/services", search: { q: query } }); }}>
                <Input className="h-[52px] min-w-0 flex-1 rounded-full" placeholder="Search services — try income certificate" aria-label="Search services" value={query} onChange={(event) => setQuery(event.target.value)} />
                <Button type="submit" className="h-[52px] shrink-0 px-5">Search</Button>
              </form>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {["Income certificate", "Domicile", "Old-age pension"].map((chip) => <Button key={chip} variant="link" size="sm" asChild className="font-normal"><Link to="/services" search={{ q: chip === "Old-age pension" ? "pension" : chip }}>{chip}<ArrowRight className="size-3" /></Link></Button>)}
              </div>
            </div>
            <div className="mt-8 grid items-center gap-5 rounded-[24px] bg-secondary px-6 py-5 lg:grid-cols-[1fr_2fr]">
              <div>
              <h2 className="text-lg font-semibold">Track your application</h2>
              <p className="mt-1 text-sm text-muted-foreground">See the stage, next step and timeline.</p>
              </div>
              <form className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => { event.preventDefault(); navigate({ to: "/track" }); }}>
                <div>
                <label className="mb-1 block text-xs text-muted-foreground" htmlFor="home-reference">Application ID</label>
                <Input id="home-reference" placeholder="EDL-2026-004821" />
                </div><div>
                <label className="mb-1 block text-xs text-muted-foreground" htmlFor="home-mobile">Registered mobile</label>
                <Input id="home-mobile" inputMode="numeric" placeholder="10-digit number" />
                </div>
                <Button type="submit" variant="outline" className="h-12">Track application<ArrowRight /></Button>
              </form>
            </div>
          </div>
        </section>

        <section className="container-page pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Apply for a service", detail: "Find & understand", to: "/services", icon: FileBadge },
              { title: "Track an application", detail: "Every stage, one place", to: "/track", icon: ClipboardCheck },
              { title: "QR-verified certificates", detail: "Download & verify", to: "/track", icon: QrCode },
              { title: "Raise a grievance", detail: "Help & support", to: "/help", icon: Megaphone },
            ].map((item, index) => <Button key={item.title} variant="ghost" asChild className={`h-auto justify-start whitespace-normal rounded-[18px] p-5 text-left ${index === 3 ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "bg-secondary"}`}><Link to={item.to}><item.icon className="mr-1 size-5 shrink-0" aria-hidden /><span><span className="block text-sm font-semibold">{item.title}</span><span className="mt-1 block text-xs font-normal opacity-70">{item.detail}</span></span></Link></Button>)}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 border-b pb-8 sm:grid-cols-4">
            {[["453", "services in the catalogue"], ["21", "departments connected"], ["7–45", "days published SLA per service"], ["100%", "certificates QR-verified"]].map(([value, label]) => <div key={label}><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}
          </div>
        </section>

        {/* Popular services */}
        <section className="container-page py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold">
                Most applied-for services
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Every service shows its official name, department and processing authority first.
              </p>
            </div>
            <Button variant="ghost" className="hidden shrink-0 sm:inline-flex" asChild>
              <Link to="/services">
                All 453 services <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((s) => {
              const Icon = ICONS[s.icon] ?? FileBadge;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="apple-service group flex flex-col rounded-[24px] bg-secondary p-6"
                >
                  <span className="flex h-14 w-14 items-center justify-center text-accent-foreground">
                    <Icon className="h-9 w-9" strokeWidth={1.25} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
                    {s.shortName}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.department}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">{s.fee}</Badge>
                    <Badge variant="secondary" className="text-[10px]">{s.sla}</Badge>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    View details <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Browse by category */}
        <section className="bg-secondary/60">
          <div className="container-page py-16">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              By name, department or life event — search in everyday words.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat];
                const count = services.filter((s) => s.category === cat).length;
                return (
                  <Link
                    key={cat}
                    to="/services"
                    search={{ category: cat }}
                    className="apple-service rounded-[24px] bg-card p-6"
                  >
                    <Icon className="h-6 w-6 text-saffron" aria-hidden />
                    <h3 className="mt-3 font-display text-sm font-semibold">{cat}</h3>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      {CATEGORY_META[cat].blurb}
                    </p>
                    <p className="mt-2 text-[11px] font-semibold text-primary">
                      {count} in preview · part of 453
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works + announcements */}
        <section className="container-page grid gap-10 py-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              How an application works
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Search,
                  title: "1 · Find & understand",
                  body: "Search in everyday words. Eligibility, documents, fee and timeline are clear before you start.",
                },
                {
                  icon: Upload,
                  title: "2 · Apply & upload",
                  body: "A guided form with validation. OCR reads your uploads and suggests values — you confirm them.",
                },
                {
                  icon: ClipboardCheck,
                  title: "3 · Verification & decision",
                  body: "Routed to the department that owns the service. Corrections are requested in plain language.",
                },
                {
                  icon: QrCode,
                  title: "4 · Download certificate",
                  body: "Get the official certificate with a QR code anyone can scan to verify it is genuine.",
                },
              ].map((s) => (
                <div key={s.title} className="rounded-xl border bg-card p-5">
                  <s.icon className="h-6 w-6 text-saffron" aria-hidden />
                  <h3 className="mt-3 font-display text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border bg-saffron-soft p-5">
              <h3 className="flex items-center gap-2 font-display text-sm font-bold text-accent-foreground">
                <Sparkles className="h-4 w-4" aria-hidden />
                The AI assistant assists — people decide
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-accent-foreground/85">
                It explains requirements, builds checklists and flags missing
                information. It never decides eligibility, never invents a
                status, and never rejects an application. Unsure answers go to a
                human.
              </p>
            </div>
          </div>

          <aside>
            <h2 className="font-display text-2xl font-bold tracking-tight">Updates</h2>
            <div className="mt-4 space-y-3">
              {announcements.map((a) => (
                <article key={a.title} className="rounded-xl border bg-card p-4">
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    <Megaphone className="h-3.5 w-3.5 text-saffron" aria-hidden />
                    {a.date}
                  </p>
                  <h3 className="mt-1.5 font-display text-sm font-semibold leading-snug">{a.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-4 rounded-[18px] bg-primary p-5 text-primary-foreground">
              <h3 className="font-display text-sm font-semibold">Helpline 24×7</h3>
              <p className="mt-1 text-xs text-primary-foreground/80">
                Call 1800-111-515, or raise and track a grievance online.
              </p>
              <Button
                size="sm"
                className="mt-3 bg-background text-foreground hover:bg-secondary"
                asChild
              >
                <Link to="/help">Raise a grievance</Link>
              </Button>
            </div>
          </aside>
        </section>

        {/* Trust strip */}
        <section className="bg-foreground text-background">
          <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ScanLine,
                title: "DPI integrations",
                body: "Aadhaar (optional), DigiLocker, UPI and UMANG — used only where authorised.",
              },
              {
                icon: Languages,
                title: "Bhashini & voice",
                body: "Services in your language with voice input, so language is never a barrier.",
              },
              {
                icon: LockKeyhole,
                title: "Privacy by design",
                body: "Minimal data, clear notices and consent. Aadhaar is not mandatory for every workflow.",
              },
              {
                icon: Eye,
                title: "Auditable by design",
                body: "Every access and decision is logged. GIGW 3.0 accessibility aligned.",
              },
            ].map((t) => (
              <div key={t.title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-saffron-soft text-accent-foreground">
                  <t.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold">{t.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-primary-foreground/70">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
