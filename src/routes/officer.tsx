import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Inbox,
  AlertTriangle,
  Timer,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  FileText,
  MessageSquareWarning,
  History,
  LogOut,
  Check,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/officer")({
  head: () => ({
    meta: [
      { title: "Officer Workspace — e-District Delhi 2.0" },
      {
        name: "description",
        content:
          "Officer dashboard mockup: work queue, application review, verification, decisions, SLA monitoring and audit history.",
      },
      { property: "og:title", content: "Officer Workspace — e-District Delhi 2.0" },
      {
        property: "og:description",
        content: "Work queue, review, decisions and SLA monitoring for processing officers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OfficerPage,
});

const QUEUE = [
  {
    id: "EDL-2026-004821",
    service: "Income Certificate",
    applicant: "Ananya Sharma",
    stage: "Verification",
    sla: "3 days left",
    priority: "Normal",
    flag: false,
  },
  {
    id: "EDL-2026-004790",
    service: "Income Certificate",
    applicant: "Mohammed Arif",
    stage: "Verification",
    sla: "Overdue by 1 day",
    priority: "High",
    flag: true,
  },
  {
    id: "EDL-2026-004756",
    service: "EWS Certificate",
    applicant: "Sunita Devi",
    stage: "Verification",
    sla: "5 days left",
    priority: "Normal",
    flag: false,
  },
  {
    id: "EDL-2026-004702",
    service: "Old Age Pension",
    applicant: "Kishan Lal",
    stage: "Verification",
    sla: "9 days left",
    priority: "Normal",
    flag: false,
  },
  {
    id: "EDL-2026-004648",
    service: "Domicile Certificate",
    applicant: "Priya Verma",
    stage: "Verification",
    sla: "11 days left",
    priority: "Low",
    flag: false,
  },
];

const AUDIT = [
  "09:42 · R. Mehta opened EDL-2026-004790",
  "09:40 · R. Mehta approved EDL-2026-004711",
  "09:31 · System logged SLA alert on EDL-2026-004790",
  "09:12 · R. Mehta requested correction on EDL-2026-004690",
];

function OfficerPage() {
  const [selected, setSelected] = useState(QUEUE[1]!);

  return (
    <div className="flex min-h-screen flex-col bg-secondary/40">
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Officer bar */}
        <section className="border-b bg-card">
          <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Officer workspace · concept preview
              </p>
              <h1 className="font-display text-xl font-bold tracking-tight">
                Revenue Department · SDM Vasant Vihar
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold">R. Mehta</p>
                <p className="text-[11px] text-muted-foreground">Processing Officer · Level 2</p>
              </div>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Inbox, label: "Assigned to me", value: "14", tone: "" },
            { icon: Timer, label: "Pending verification", value: "32", tone: "" },
            { icon: AlertTriangle, label: "Overdue (SLA breach)", value: "5", tone: "text-destructive" },
            { icon: TrendingUp, label: "Avg turnaround", value: "3.2 days", tone: "" },
            { icon: CheckCircle2, label: "SLA compliance", value: "96%", tone: "text-gov-green" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-saffron-soft text-accent-foreground">
                <s.icon className={`h-4 w-4 ${s.tone}`} aria-hidden />
              </span>
              <p className={`mt-2 font-display text-2xl font-bold ${s.tone}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Queue + review */}
        <section className="container-page grid gap-6 pb-10 lg:grid-cols-[380px_1fr]">
          {/* Work queue */}
          <div className="rounded-xl border bg-card p-4">
            <h2 className="px-1 font-display text-sm font-bold uppercase tracking-wide">
              Work queue
            </h2>
            <p className="mt-1 px-1 text-xs text-muted-foreground">
              Assigned · pending · overdue · prioritised
            </p>
            <ul className="mt-3 space-y-2">
              {QUEUE.map((q) => (
                <li key={q.id}>
                  <button
                    onClick={() => setSelected(q)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selected.id === q.id
                        ? "border-primary bg-secondary/60 shadow-sm"
                        : "hover:bg-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-primary">{q.id}</span>
                      {q.flag && (
                        <Badge className="bg-destructive text-white hover:bg-destructive">
                          <AlertTriangle className="h-3 w-3" aria-hidden />
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-semibold">{q.applicant}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.service} · {q.stage}
                    </p>
                    <p
                      className={`mt-1 text-[11px] font-medium ${
                        q.sla.includes("Overdue") ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {q.sla} · priority {q.priority.toLowerCase()}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Case review */}
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold">{selected.service}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selected.id} · {selected.applicant} · submitted 24 Oct 2026
                  </p>
                </div>
                <Badge variant="secondary">{selected.stage}</Badge>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Declared details
                  </h3>
                  <dl className="mt-2 space-y-1.5 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Annual income</dt>
                      <dd className="font-medium">₹4,80,000</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Purpose</dt>
                      <dd className="font-medium">School admission</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">District</dt>
                      <dd className="font-medium">South West Delhi</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-lg bg-secondary/50 p-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Evidence checklist
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {[
                      ["Aadhaar card", true],
                      ["Proof of residence", true],
                      ["Self-declaration", true],
                      ["Salary slip / ITR", false],
                    ].map(([doc, ok]) => (
                      <li key={doc as string} className="flex items-center gap-2">
                        {ok ? (
                          <CheckCircle2 className="h-4 w-4 text-gov-green" aria-hidden />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden />
                        )}
                        <span className="text-muted-foreground">{doc as string}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-lg border bg-saffron-soft p-3.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" aria-hidden />
                <div>
                  <p className="text-xs font-semibold text-accent-foreground">
                    AI suggestion — human review required
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-accent-foreground/85">
                    Declared income is close to the threshold; one supporting
                    document is pending. A flag is not proof of fraud and never a
                    decision — verify against records.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button size="sm" className="bg-gov-green text-white hover:bg-gov-green/90">
                  <Check className="h-4 w-4" aria-hidden />
                  Record approval
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Request correction
                </Button>
                <Button size="sm" variant="outline" className="text-destructive">
                  <X className="h-4 w-4" aria-hidden />
                  Record rejection
                </Button>
                <Button size="sm" variant="ghost">
                  <FileText className="h-4 w-4" aria-hidden />
                  Ask for more documents
                </Button>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                AI recommendations are never the same as official findings or
                decisions. Every decision here is recorded in the audit history
                against your ID.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-5">
                <h2 className="font-display text-sm font-bold uppercase tracking-wide">
                  SLA monitoring
                </h2>
                <ul className="mt-3 space-y-2 text-xs">
                  {[
                    ["Cases near deadline (48h)", "6", "text-saffron"],
                    ["Cases past deadline", "5", "text-destructive"],
                    ["Escalated to supervisory level", "2", ""],
                  ].map(([k, v, tone]) => (
                    <li key={k} className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">{k}</span>
                      <span className={`font-display text-sm font-bold ${tone}`}>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
                  <History className="h-4 w-4 text-saffron" aria-hidden />
                  Audit history
                </h2>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {AUDIT.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <MessageSquareWarning className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/60" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
