import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageSquarePlus,
  Phone,
  Mail,
  MapPin,
  Send,
  ChevronDown,
  Accessibility,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services } from "@/data/services";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Grievances — e-District Delhi 2.0" },
      {
        name: "description",
        content:
          "FAQs, helpline and grievance submission with tracking to closure for all Delhi e-District services.",
      },
      { property: "og:title", content: "Help & Grievances — e-District Delhi 2.0" },
      {
        property: "og:description",
        content: "FAQs, helpline and grievance submission with tracking to closure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

const FAQS = [
  {
    q: "How do I find a service if I don't know its official name?",
    a: "Search in everyday words — “proof of my income” finds the Income Certificate. You can also describe your need to the assistant, which suggests the official service and the department that owns it.",
  },
  {
    q: "Is Aadhaar mandatory for every application?",
    a: "No. Aadhaar is used only where a service's rules require it. Every application accepts alternative approved ID proofs, and the privacy notice on each form shows exactly what is collected.",
  },
  {
    q: "The published timeline has passed. What can I do?",
    a: "The timeline shown is a service-level target, not a guarantee. If your application crosses it, an SLA alert reaches the department and you can raise a grievance quoting your application ID — it is tracked to closure.",
  },
  {
    q: "How will I know if the officer needs something from me?",
    a: "Correction requests arrive as notifications on SMS and in your applications dashboard, in plain language, with the exact document or field to fix and a deadline to respond.",
  },
  {
    q: "How do I verify a certificate I have received?",
    a: "Every issued certificate carries a QR code. Scanning it shows the certificate details as recorded by the issuing authority, so anyone can confirm it is genuine.",
  },
  {
    q: "Is the AI assistant's answer an official decision?",
    a: "No. The assistant explains published requirements, builds checklists and flags missing information. Eligibility, verification and decisions are always made by an authorised officer.",
  },
  {
    q: "Can I apply in Hindi or another language?",
    a: "Yes. The portal is being rolled out in Hindi and regional languages with voice support, so you can read, fill forms and get help in the language you are comfortable with.",
  },
  {
    q: "I don't have a smartphone or internet. Can I still apply?",
    a: "You can apply through any Common Service Centre or the district facilitation counter, or call the 24×7 helpline for step-by-step help. Your application appears in this portal for tracking.",
  },
];

function HelpPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="bg-hero text-hero-foreground">
          <div className="container-page py-10">
            <h1 className="font-display text-3xl font-bold tracking-tight">Help & grievances</h1>
            <p className="mt-2 max-w-2xl text-sm text-hero-foreground/75">
              Answers in plain language, a 24×7 helpline, and grievances that are
              tracked to closure with the application ID.
            </p>
          </div>
        </section>

        <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight">
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="mt-4">
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-semibold">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div id="grievances" className="scroll-mt-40">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Raise a grievance
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Quote your application ID if you have one — grievances linked to
                an application go straight to the deciding department.
              </p>
              {submitted ? (
                <div className="mt-5 rounded-xl border border-gov-green/30 bg-gov-green/5 p-6">
                  <p className="font-display text-base font-bold text-gov-green">
                    Grievance registered — GRV-2026-018204
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You will receive updates by SMS. Track it any time from{" "}
                    <a href="/track" className="font-semibold text-primary hover:underline">
                      your applications
                    </a>
                    . Grievances are answered within the published response time.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-5 grid gap-4 rounded-xl border bg-card p-5 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="gName">Your name</Label>
                    <Input id="gName" required placeholder="Full name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gMobile">Mobile number</Label>
                    <Input id="gMobile" required inputMode="tel" placeholder="+91" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gService">Related service</Label>
                    <Select defaultValue="income-certificate">
                      <SelectTrigger id="gService" className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {s.shortName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="gAppId">Application ID (optional)</Label>
                    <Input id="gAppId" placeholder="EDL-2026-…" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="gDetail">What went wrong?</Label>
                    <Textarea
                      id="gDetail"
                      required
                      rows={4}
                      placeholder="Describe the issue in your own words — in any supported language."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="bg-gov-green text-white hover:bg-gov-green/90">
                      <Send className="h-4 w-4" aria-hidden />
                      Submit grievance
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="font-display text-sm font-bold">Contact & support</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
                  <span>
                    Helpline <span className="font-semibold">1800-111-515</span>
                    <span className="block text-xs text-muted-foreground">24×7 · all services</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
                  <span>
                    help@edistrict.delhi.gov.in
                    <span className="block text-xs text-muted-foreground">Replies within 2 working days</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" aria-hidden />
                  <span>
                    District facilitation centres
                    <span className="block text-xs text-muted-foreground">
                      Every district · walk-in help with forms and uploads
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold">
                <Accessibility className="h-4 w-4 text-saffron" aria-hidden />
                Accessibility
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                The portal is built for keyboard-only use, screen readers and
                plain language, aligned to GIGW 3.0. Increase text size or switch
                contrast from the top bar.
              </p>
            </div>
            <div className="rounded-xl border bg-saffron-soft p-5">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold text-accent-foreground">
                <MessageSquarePlus className="h-4 w-4" aria-hidden />
                Not sure where to start?
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-accent-foreground/85">
                Ask the assistant in your own words, or search the catalogue —
                “proof of income”, “pension for senior citizen”, “marriage proof”.
              </p>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
