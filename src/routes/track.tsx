import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  Download,
  QrCode,
  MessageSquareWarning,
  Clock,
  FileText,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { applications, STAGES } from "@/data/services";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Applications — e-District Delhi 2.0" },
      {
        name: "description",
        content:
          "Track your applications: stage, next step, timeline and SLA. Download QR-verified certificates when delivered.",
      },
      { property: "og:title", content: "Track Applications — e-District Delhi 2.0" },
      {
        property: "og:description",
        content: "Track applications, respond to corrections and download certificates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="bg-hero text-hero-foreground">
          <div className="container-page py-10">
            <h1 className="font-display text-3xl font-bold tracking-tight">My applications</h1>
            <p className="mt-2 max-w-2xl text-sm text-hero-foreground/75">
              Every application shows its current stage, the next step, and the
              published timeline it is being measured against. Notifications
              arrive on SMS and in-app.
            </p>
          </div>
        </section>

        <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {applications.map((app) => {
              const isDelivered = app.status === "Delivered";
              const isCorrection = app.status === "Correction requested";
              return (
                <article key={app.id} className="rounded-xl border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-lg font-bold">{app.service}</h2>
                        <Badge
                          className={
                            isDelivered
                              ? "bg-gov-green text-white hover:bg-gov-green"
                              : isCorrection
                                ? "bg-destructive text-white hover:bg-destructive"
                                : "bg-saffron text-hero hover:bg-saffron"
                          }
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {app.id} · Applied on {app.appliedOn}
                      </p>
                    </div>
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                      <Clock className="h-3.5 w-3.5 text-saffron" aria-hidden />
                      {app.slaLeft}
                    </p>
                  </div>

                  {/* Timeline */}
                  <ol className="mt-6 grid grid-cols-4 gap-2">
                    {STAGES.map((stage, i) => {
                      const done = i < app.stage || (isDelivered && i <= 3);
                      const current = i === app.stage && !isDelivered;
                      return (
                        <li key={stage} className="relative">
                          <div className="flex items-center gap-2">
                            {done ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-gov-green" aria-hidden />
                            ) : current ? (
                              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                                <span className="absolute h-5 w-5 animate-ping rounded-full bg-saffron/30" />
                                <Circle className="h-5 w-5 text-saffron" aria-hidden />
                              </span>
                            ) : (
                              <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" aria-hidden />
                            )}
                            <span className="truncate text-[11px] font-semibold sm:text-xs">
                              {stage}
                            </span>
                          </div>
                          <p className="mt-1 pl-7 text-[10px] leading-tight text-muted-foreground">
                            {app.timeline[i]?.date || (current ? "In progress" : "Pending")}
                          </p>
                        </li>
                      );
                    })}
                  </ol>

                  {app.note && (
                    <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-3.5">
                      <MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
                      <div>
                        <p className="text-xs font-semibold text-destructive">
                          Action needed — correction requested
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{app.note}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {isDelivered ? (
                      <>
                        <Button size="sm">
                          <Download className="h-4 w-4" aria-hidden />
                          Download certificate
                        </Button>
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4" aria-hidden />
                          Verify certificate
                        </Button>
                      </>
                    ) : isCorrection ? (
                      <Button size="sm">
                        <FileText className="h-4 w-4" aria-hidden />
                        Respond to correction
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        View details
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}

            <div className="rounded-xl border border-dashed bg-card/60 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Applied at a counter or through a Common Service Centre? Enter the
                application ID to track it here.
              </p>
              <Button size="sm" variant="outline" className="mt-3">
                Track by application ID
              </Button>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold">
                <Bell className="h-4 w-4 text-saffron" aria-hidden />
                Latest notifications
              </h2>
              <ul className="mt-3 space-y-3 text-xs">
                <li>
                  <p className="font-semibold">Today, 11:40 AM</p>
                  <p className="text-muted-foreground">
                    EDL-2026-004821 moved to Verification at the SDM office.
                  </p>
                </li>
                <li>
                  <p className="font-semibold">21 Oct</p>
                  <p className="text-muted-foreground">
                    Correction requested on EDL-2026-004310 — respond within 10 days.
                  </p>
                </li>
                <li>
                  <p className="font-semibold">22 Oct</p>
                  <p className="text-muted-foreground">
                    Pension sanctioned — first payment on the 1st of next month.
                  </p>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-display text-sm font-bold">Document wallet</h2>
              <ul className="mt-3 space-y-2 text-xs">
                {[
                  "Income certificate — issued Mar 2025",
                  "Domicile certificate — issued Jan 2024",
                  "e-Ration card — member of HH-2763",
                ].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="h-3.5 w-3.5 text-saffron" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Open document wallet
              </Button>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Something wrong? Raise a grievance with the application ID — it is
              tracked to closure.{" "}
              <Link to="/help" className="font-semibold text-primary hover:underline">
                Raise now
              </Link>
            </p>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
