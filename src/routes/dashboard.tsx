import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, FileText, Gift, Plus, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categories, type Category } from "@/data/services";
import { citizen, dashItems, schemes, type ItemState } from "@/data/dashboard";
import { dict, speechLang, uiLangs, type UiLang } from "@/lib/dashboard-i18n";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — e-District Delhi 2.0" },
      { name: "description", content: "See pending, completed and compliant services and schemes you may be eligible for." },
      { property: "og:title", content: "My Dashboard — e-District Delhi 2.0" },
      { property: "og:description", content: "Your personal view of every Delhi e-District service and eligible scheme." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

const STATE_META: Record<ItemState, { icon: typeof Clock; tone: string }> = {
  action: { icon: AlertCircle, tone: "text-destructive bg-destructive/10" },
  pending: { icon: Clock, tone: "text-accent-foreground bg-accent" },
  done: { icon: CheckCircle2, tone: "text-gov-green bg-gov-green/10" },
};

function speak(text: string, lang: UiLang) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = speechLang[lang];
  window.speechSynthesis.speak(u);
}

function Dashboard() {
  const [lang, setLang] = useState<UiLang>("en");
  const [cat, setCat] = useState<Category | "all">("all");
  const [filter, setFilter] = useState<ItemState | "all">("all");
  const t = dict[lang];
  const items = useMemo(() => dashItems.filter((i) => (cat === "all" || i.category === cat) && (filter === "all" || i.state === filter)), [cat, filter]);
  const count = (s: ItemState) => dashItems.filter((i) => i.state === s).length;
  const label = (s: ItemState) => (s === "action" ? t.needAction : s === "pending" ? t.pending : t.done);

  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-secondary/50 pb-20">
        <section className="container-page py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.hello}, {citizen.name.split(" ")[0]} 👋</h1>
              <p className="mt-2 text-muted-foreground">{t.welcome}</p>
              <Button variant="ghost" size="sm" className="mt-1 -ml-3" onClick={() => speak(`${t.hello}. ${count("action")} ${t.needAction}. ${count("pending")} ${t.pending}. ${count("done")} ${t.done}.`, lang)}><Volume2 aria-hidden />{t.listen}</Button>
            </div>
            <div role="group" aria-label="Language" className="flex rounded-full border bg-card p-1">
              {uiLangs.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} aria-pressed={lang === l.code} className={`rounded-full px-3 py-1.5 text-sm ${lang === l.code ? "bg-foreground text-background" : "text-muted-foreground"}`}>{l.label}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {(["action", "pending", "done"] as ItemState[]).map((s) => {
              const M = STATE_META[s];
              return (
                <button key={s} onClick={() => setFilter(filter === s ? "all" : s)} aria-pressed={filter === s} className={`flex items-center gap-4 rounded-3xl border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 ${filter === s ? "ring-2 ring-ring" : ""}`}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${M.tone}`}><M.icon aria-hidden /></span>
                  <span><span className="block text-3xl font-semibold">{count(s)}</span><span className="text-sm text-muted-foreground">{label(s)}</span></span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="rounded-3xl border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-semibold">{t.byCategory}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["all", ...categories] as const).map((c) => (
                  <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-3.5 py-1.5 text-sm ${cat === c ? "border-foreground bg-foreground text-background" : "bg-background text-muted-foreground"}`}>
                    {c === "all" ? t.all : c} <span className="opacity-60">{c === "all" ? dashItems.length : dashItems.filter((i) => i.category === c).length}</span>
                  </button>
                ))}
              </div>
              <ul className="mt-5 divide-y">
                {items.map((i) => {
                  const M = STATE_META[i.state];
                  return (
                    <li key={i.title} className="flex flex-wrap items-center gap-4 py-4">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${M.tone}`}><M.icon className="h-5 w-5" aria-hidden /></span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{i.title}</p>
                        <p className="text-sm text-muted-foreground">{i.detail}</p>
                        <p className="text-xs text-muted-foreground">{i.category} · {i.date}</p>
                      </div>
                      <Badge variant="secondary">{label(i.state)}</Badge>
                      {i.state === "action" ? (
                        <Button size="sm" asChild><Link to="/track">{t.fix}</Link></Button>
                      ) : (
                        <Button size="sm" variant="outline" asChild><Link to="/track">{t.view}</Link></Button>
                      )}
                    </li>
                  );
                })}
                {items.length === 0 && <li className="py-8 text-center text-sm text-muted-foreground">—</li>}
              </ul>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border bg-card p-6 shadow-soft">
                <p className="text-sm text-muted-foreground">{citizen.district}</p>
                <p className="mt-1 font-semibold">{citizen.name}</p>
                <p className="mt-4 text-sm">{t.profile} · {citizen.profileComplete}%</p>
                <Progress value={citizen.profileComplete} className="mt-2" />
                <div className="mt-5 grid gap-2">
                  <Button asChild><Link to="/services"><Plus aria-hidden />{t.newService}</Link></Button>
                  <Button variant="outline"><FileText aria-hidden />{t.docs}</Button>
                </div>
              </div>
              <p className="rounded-2xl bg-accent p-4 text-sm text-accent-foreground">{t.tip}</p>
            </aside>
          </div>

          <section className="mt-10">
            <div className="flex items-center gap-2"><Gift className="h-5 w-5 text-primary" aria-hidden /><h2 className="text-xl font-semibold">{t.schemes}</h2></div>
            <p className="mt-1 text-sm text-muted-foreground">{t.schemesNote}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {schemes.map((s) => (
                <article key={s.name} className="flex flex-col rounded-3xl border bg-card p-6 shadow-soft">
                  <Badge variant={s.match === "Likely eligible" ? "default" : "secondary"} className="w-fit">{s.match === "Likely eligible" ? t.likely : t.check}</Badge>
                  <h3 className="mt-3 font-semibold">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.dept}</p>
                  <p className="mt-3 text-lg font-semibold text-primary">{s.benefit}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.why}: {s.why}</p>
                  <div className="mt-auto flex gap-2 pt-5">
                    {s.slug ? (
                      <Button size="sm" asChild><Link to="/services/$slug" params={{ slug: s.slug }}>{t.apply}</Link></Button>
                    ) : (
                      <Button size="sm" asChild><Link to="/services">{t.apply}</Link></Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => speak(`${s.name}. ${s.benefit}. ${s.why}`, lang)}><Volume2 aria-hidden />{t.listen}</Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
