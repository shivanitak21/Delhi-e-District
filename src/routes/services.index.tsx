import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  FileBadge,
  Users,
  ShieldCheck,
  MapPin,
  Heart,
  FileHeart,
  HeartHandshake,
  IdCard,
  Landmark,
  Store,
  Baby,
  Accessibility,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { services, categories, DEPARTMENTS, type Category } from "@/data/services";

export const Route = createFileRoute("/services/")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    q?: string | undefined;
    category?: Category | undefined;
    department?: string | undefined;
  } => ({
    q: search["q"] as string | undefined,
    category: search["category"] as Category | undefined,
    department: search["department"] as string | undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Services — e-District Delhi 2.0" },
      {
        name: "description",
        content:
          "Browse all 453 Delhi government services by name, department or category. Eligibility, documents, fees and timelines for every service.",
      },
      { property: "og:title", content: "All Services — e-District Delhi 2.0" },
      {
        property: "og:description",
        content: "Browse all 453 Delhi government services by name, department or category.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
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
  Landmark,
  Store,
  Baby,
  Accessibility,
};

function ServicesPage() {
  const { q, category, department } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q);

  const filtered = useMemo(() => {
    const needle = (q || "").toLowerCase().trim();
    return services.filter((s) => {
      if (category && s.category !== category) return false;
      if (department && s.department !== department) return false;
      if (needle) {
        const hay = `${s.name} ${s.department} ${s.description} ${s.category}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [q, category, department]);

  const hasFilters = !!(q || category || department);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="bg-hero text-hero-foreground">
          <div className="container-page py-10">
            <nav className="text-xs text-hero-foreground/60" aria-label="Breadcrumb">
              Home / Services
            </nav>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
              All services
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-hero-foreground/75">
              453 services are being catalogued in the 2.0 programme —{" "}
              {services.length} are shown in this preview. Each entry carries its
              own rules, documents, fees and published timeline.
            </p>
            <div className="mt-6 flex max-w-2xl overflow-hidden rounded-lg bg-card shadow-lg">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  className="h-12 rounded-none border-0 pl-11 text-foreground"
                  placeholder="Search in everyday words — “proof of income”, “pension”…"
                  aria-label="Search services"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate({
                        to: "/services",
                        search: { q: query, category, department },
                      });
                    }
                  }}
                />
              </div>
              <Button className="rounded-none bg-saffron px-5 text-hero hover:bg-saffron/90" asChild>
                <button
                  onClick={() =>
                    navigate({ to: "/services", search: { q: query, category, department } })
                  }
                >
                  Search
                </button>
              </Button>
            </div>
          </div>
        </section>

        <section className="container-page grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="space-y-6">
            <div>
              <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
                <SlidersHorizontal className="h-4 w-4 text-saffron" aria-hidden />
                Category
              </h2>
              <div className="mt-3 flex flex-col items-start gap-1.5">
                <button
                  className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                    !category ? "bg-primary font-semibold text-primary-foreground" : "hover:bg-secondary"
                  }`}
                  onClick={() =>
                    navigate({ to: "/services", search: { q, department } })
                  }
                >
                  All categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                      category === c
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() =>
                      navigate({ to: "/services", search: { q, category: c, department } })
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-wide">
                Department
              </h2>
              <div className="mt-3 flex flex-col items-start gap-1.5">
                <button
                  className={`rounded-md px-2.5 py-1 text-sm transition-colors ${
                    !department ? "bg-primary font-semibold text-primary-foreground" : "hover:bg-secondary"
                  }`}
                  onClick={() => navigate({ to: "/services", search: { q, category } })}
                >
                  All departments
                </button>
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d}
                    className={`rounded-md px-2.5 py-1 text-left text-sm transition-colors ${
                      department === d
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() =>
                      navigate({ to: "/services", search: { q, category, department: d } })
                    }
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* List */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                {filtered.length} service{filtered.length === 1 ? "" : "s"}
                {hasFilters ? " matching your filters" : " in preview"}
              </p>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: "/services", search: {} })}
                >
                  Clear filters
                </Button>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {filtered.map((s) => {
                const Icon = ICONS[s.icon] ?? FileBadge;
                return (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all hover:border-saffron/50 hover:shadow-md sm:flex-row sm:items-center"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-saffron-soft text-accent-foreground">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="flex-1">
                      <h2 className="font-display text-[15px] font-semibold">{s.name}</h2>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                        {s.department} · {s.authority}
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                      <Badge variant="secondary">{s.category}</Badge>
                      <Badge variant="secondary">{s.fee}</Badge>
                      <Badge variant="secondary">{s.sla}</Badge>
                      <ArrowRight
                        className="hidden h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 sm:block"
                        aria-hidden
                      />
                    </div>
                  </Link>
                );
              })}
              {filtered.length === 0 && (
                <div className="rounded-xl border bg-card p-10 text-center">
                  <p className="font-display font-semibold">No services match that search</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try everyday words — for example “income proof” instead of “revenue certificate”.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
