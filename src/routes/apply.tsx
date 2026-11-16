import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Upload,
  FileText,
  Sparkles,
  ShieldCheck,
  PartyPopper,
  ClipboardList,
  Pencil,
  ScanLine,
  Send,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/data/services";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: (search["service"] as string) || "income-certificate",
  }),
  head: () => ({
    meta: [
      { title: "Apply Online — e-District Delhi 2.0" },
      {
        name: "description",
        content:
          "Guided online application: check eligibility, fill the form, upload documents and submit.",
      },
      { property: "og:title", content: "Apply Online — e-District Delhi 2.0" },
      {
        property: "og:description",
        content: "Guided online application with document checks and OCR assistance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyPage,
});

const STEPS = [
  { icon: ClipboardList, label: "Prepare" },
  { icon: Pencil, label: "Fill form" },
  { icon: ScanLine, label: "Upload" },
  { icon: Send, label: "Review & submit" },
] as const;

function ApplyPage() {
  const { service: slug } = Route.useSearch();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug) ?? services[0]!;
  const [step, setStep] = useState(0);
  const [declared, setDeclared] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const appId = "EDL-2026-004821";

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <div className="container-page flex flex-col items-center py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gov-green/10 text-gov-green">
              <PartyPopper className="h-8 w-8" aria-hidden />
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">
              Application submitted
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Your {service.name} application has been submitted to the{" "}
              {service.authority}. You will be notified at every stage.
            </p>
            <div className="mt-6 rounded-xl border bg-card px-8 py-5 text-left">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Application ID
              </p>
              <p className="mt-1 font-display text-2xl font-bold tracking-tight text-primary">
                {appId}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Fee of {service.fee} payable on the next screen · Timeline {service.sla}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/track">Track this application</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Stepper */}
        <section className="border-b bg-secondary/60">
          <div className="container-page py-6">
            <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/services" className="hover:underline">Services</Link>
              <ChevronRight className="inline h-3 w-3" aria-hidden />
              <Link to="/services/$slug" params={{ slug: service.slug }} className="hover:underline">
                {service.name}
              </Link>
              <ChevronRight className="inline h-3 w-3" aria-hidden />
              <span className="font-medium text-foreground">Apply</span>
            </nav>
            <ol className="mt-4 grid grid-cols-4 gap-2">
              {STEPS.map((s, i) => (
                <li key={s.label}>
                  <button
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      i === step
                        ? "border-primary bg-card shadow-sm"
                        : i < step
                          ? "border-gov-green/30 bg-card"
                          : "border-transparent bg-card/60 opacity-60"
                    }`}
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                  >
                    <span className="flex items-center gap-2">
                      {i < step ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-gov-green" aria-hidden />
                      ) : (
                        <s.icon className="h-4 w-4 shrink-0 text-saffron" aria-hidden />
                      )}
                      <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
                        Step {i + 1}
                      </span>
                    </span>
                    <span className="mt-1 block font-display text-xs font-semibold sm:text-sm">
                      {s.label}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_320px]">
          <div>
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight">
                    Check you are ready
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    For a {service.name}, the {service.authority} expects the
                    following. Have these ready before you start — the assistant
                    has checked your checklist and found nothing missing so far.
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <h2 className="flex items-center gap-2 font-display text-sm font-bold">
                    <ShieldCheck className="h-4 w-4 text-gov-green" aria-hidden />
                    Eligibility — as published
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {service.eligibility.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gov-green" aria-hidden />
                        <span className="text-muted-foreground">{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <h2 className="font-display text-sm font-bold">Documents to keep ready</h2>
                  <ul className="mt-3 space-y-2">
                    {service.documents.map((d) => (
                      <li key={d.doc} className="flex items-start gap-2 text-sm">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
                        <span className="text-muted-foreground">
                          {d.doc} <span className="text-xs">({d.formats})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border bg-saffron-soft p-4">
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-accent-foreground/90">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    AI assistance: {service.aiSupport} The assistant explains — it
                    never guarantees eligibility.
                  </p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight">
                    Fill the application form
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Only fields the department needs. Saved as you go — leave and
                    return any time from your drafts.
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName">Full name (as per Aadhaar)</Label>
                      <Input id="fullName" defaultValue="Ananya Sharma" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="fatherName">Father's / spouse's name</Label>
                      <Input id="fatherName" defaultValue="Rajesh Kumar Sharma" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="mobile">Mobile number</Label>
                      <Input id="mobile" defaultValue="+91 98••• •••42" inputMode="tel" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="district">District</Label>
                      <Input id="district" defaultValue="South West Delhi" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="address">Residential address</Label>
                      <Input
                        id="address"
                        defaultValue="H.No 24, Kh.No 15/2, Rangpuri, New Delhi – 110037"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="income">Annual family income (₹)</Label>
                      <Input id="income" defaultValue="4,80,000" inputMode="numeric" />
                      <p className="text-[11px] text-muted-foreground">
                        Shown on the certificate. Keep proof of this figure ready.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Input id="purpose" defaultValue="School admission — scholarship" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-start gap-3 rounded-lg bg-secondary p-3">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Aadhaar is optional here — you can use any approved ID proof.
                      We collect only what the department needs to decide this
                      application (DPDP consent notice).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight">
                    Upload documents
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    PDF or JPG, up to 2 MB each. The document reader reads your
                    uploads and suggests values — you review and confirm them.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      name: "Aadhaar card",
                      status: "Uploaded · reader read name & DOB",
                      ai: "Suggested: Ananya Sharma · 14/03/1996 — confirm",
                      done: true,
                    },
                    {
                      name: "Proof of residence",
                      status: "Uploaded · electricity bill detected",
                      ai: "Address matches your form — no conflict found",
                      done: true,
                    },
                    {
                      name: "Self-declaration of income",
                      status: "Uploaded",
                      ai: "Income figure ₹4,80,000 matches the form",
                      done: true,
                    },
                    {
                      name: "Salary slip / ITR (any one)",
                      status: "Required",
                      ai: "Missing — the verifier will ask for this if not attached",
                      done: false,
                    },
                  ].map((d) => (
                    <div
                      key={d.name}
                      className={`flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center ${
                        d.done ? "" : "border-destructive/40 bg-destructive/5"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          d.done ? "bg-gov-green/10 text-gov-green" : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {d.done ? (
                          <CheckCircle2 className="h-5 w-5" aria-hidden />
                        ) : (
                          <AlertTriangle className="h-5 w-5" aria-hidden />
                        )}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.status}</p>
                        <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-saffron-soft px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                          <Sparkles className="h-3 w-3" aria-hidden />
                          {d.ai}
                        </p>
                      </div>
                      {d.done ? (
                        <Button variant="outline" size="sm">Replace</Button>
                      ) : (
                        <Button size="sm">
                          <Upload className="h-4 w-4" aria-hidden />
                          Upload
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  A flag is not a proof of fraud and never a decision — every
                  suggestion is reviewed by you before submission and by an
                  officer afterwards.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight">
                    Review & submit
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Check everything. After submission, corrections are requested
                    through your dashboard — not by email.
                  </p>
                </div>
                <div className="overflow-hidden rounded-xl border bg-card">
                  <dl className="divide-y text-sm">
                    {[
                      ["Service", `${service.name} — ${service.department}`],
                      ["Applicant", "Ananya Sharma · +91 98••• •••42"],
                      ["Address", "H.No 24, Kh.No 15/2, Rangpuri, New Delhi – 110037"],
                      ["Annual family income", "₹4,80,000"],
                      ["Purpose", "School admission — scholarship"],
                      ["Documents attached", "3 of 4 · 1 optional supporting pending"],
                      ["Fee payable", service.fee],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-medium sm:ml-auto sm:text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
                  <Checkbox
                    id="declare"
                    checked={declared}
                    onCheckedChange={(v) => setDeclared(v === true)}
                    className="mt-0.5"
                  />
                  <div>
                    <Label htmlFor="declare" className="text-sm font-medium leading-snug">
                      I declare the information above is true to the best of my knowledge.
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      False information can lead to rejection and legal action
                      under the applicable rules.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    By submitting you agree to the privacy notice: your data is
                    used only to process this application, shared only with the
                    department that decides it, and retained per the published
                    retention policy. You can request access or correction any time.
                  </p>
                </div>
              </div>
            )}

            {/* Wizard nav */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Back
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep((s) => s + 1)}>
                  Continue <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              ) : (
                <Button
                  className="bg-gov-green text-white hover:bg-gov-green/90"
                  disabled={!declared}
                  onClick={() => setSubmitted(true)}
                >
                  <Send className="h-4 w-4" aria-hidden />
                  Submit application
                </Button>
              )}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-display text-sm font-bold">{service.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{service.authority}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="secondary">Fee {service.fee}</Badge>
                <Badge variant="secondary">{service.sla}</Badge>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold">
                <Sparkles className="h-4 w-4 text-saffron" aria-hidden />
                Assistant checklist
              </h2>
              <ul className="mt-3 space-y-2 text-xs">
                {[
                  "Eligibility criteria read",
                  "Form fields filled & validated",
                  "3 documents read by OCR",
                  "1 supporting document pending",
                ].map((t, i) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${i === 3 ? "text-destructive" : "text-gov-green"}`}
                      aria-hidden
                    />
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                Need help? Ask the assistant on any screen, or call 1800-111-515.
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() =>
                navigate({ to: "/apply", search: { service: "sc-st-obc-certificate" } })
              }
            >
              Preview another service's form
            </Button>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
