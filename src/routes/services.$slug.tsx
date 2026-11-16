import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Building2,
  UserCheck,
  Wallet,
  Timer,
  Sparkles,
  CheckCircle2,
  FileText,
  MessageSquareWarning,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${s?.name ?? "Service"} — e-District Delhi 2.0` },
        {
          name: "description",
          content:
            s?.description ??
            "Service details: eligibility, documents, fees and timeline.",
        },
        { property: "og:title", content: `${s?.name ?? "Service"} — e-District Delhi 2.0` },
        {
          property: "og:description",
          content: s?.description ?? "Eligibility, documents, fees and timeline.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="container-page flex flex-1 flex-col items-center justify-center py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Service not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This service is not part of the preview catalogue yet.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/services">Browse all services</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const related = services
    .filter((s) => s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="bg-hero text-hero-foreground">
          <div className="container-page py-8">
            <nav className="flex items-center gap-1.5 text-xs text-hero-foreground/60" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-saffron">Home</Link>
              <ChevronRight className="h-3 w-3" aria-hidden />
              <Link to="/services" className="hover:text-saffron">Services</Link>
              <ChevronRight className="h-3 w-3" aria-hidden />
              <span className="text-hero-foreground">{service.name}</span>
            </nav>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">
              {service.name}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-hero-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-saffron" aria-hidden />
                {service.department}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <UserCheck className="h-4 w-4 text-saffron" aria-hidden />
                Processing authority: {service.authority}
              </span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                `Fee: ${service.fee}`,
                `Timeline: ${service.sla}`,
                service.mode,
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight">About</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight">Who can apply</h2>
              <ul className="mt-3 space-y-2">
                {service.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gov-green" aria-hidden />
                    <span className="text-muted-foreground">{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight">Documents required</h2>
              <div className="mt-3 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Document</th>
                      <th className="px-4 py-2.5 font-semibold">Accepted formats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {service.documents.map((d) => (
                      <tr key={d.doc} className="bg-card">
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2">
                            <FileText className="h-4 w-4 text-saffron" aria-hidden />
                            {d.doc}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{d.formats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight">How it works</h2>
              <ol className="mt-3 space-y-3">
                {service.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-display text-lg font-bold tracking-tight">
                Not the service you need?
              </h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
                If something goes wrong or you disagree with a decision, you can
                raise a grievance or file an appeal against any service.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link to="/help">Raise a grievance</Link>
              </Button>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h2 className="font-display text-base font-bold">Apply now</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <Wallet className="h-4 w-4 text-saffron" aria-hidden />
                  <dt className="text-muted-foreground">Fee</dt>
                  <dd className="ml-auto font-semibold">{service.fee}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Timer className="h-4 w-4 text-saffron" aria-hidden />
                  <dt className="text-muted-foreground">Published timeline</dt>
                  <dd className="ml-auto font-semibold">{service.sla}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Building2 className="h-4 w-4 text-saffron" aria-hidden />
                  <dt className="text-muted-foreground">Decided by</dt>
                  <dd className="ml-auto text-right text-xs font-semibold">{service.authority}</dd>
                </div>
              </dl>
              <Button className="mt-5 w-full" asChild>
                <Link to="/apply" search={{ service: service.slug }}>
                  Start application <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                Published timelines are target service levels, not guaranteed completion times.
              </p>
            </div>

            <div className="rounded-xl border bg-saffron-soft p-5">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold text-accent-foreground">
                <Sparkles className="h-4 w-4" aria-hidden />
                AI assistance on this service
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-accent-foreground/85">
                {service.aiSupport}
              </p>
              <p className="mt-3 text-[11px] font-semibold text-accent-foreground/70">
                AI explains — eligibility is always decided by an officer.
              </p>
            </div>

            {related.length > 0 && (
              <div className="rounded-xl border bg-card p-5">
                <h2 className="font-display text-sm font-bold">Related services</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: r.slug }}
                        className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
                      >
                        {r.shortName}
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
