import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth";

const NAV = [
  { label: "Home", to: "/" },
  { label: "All Services", to: "/services" },
  { label: "Track Application", to: "/track" },
  { label: "Grievances", to: "/help", hash: "grievances" },
  { label: "Help", to: "/help" },
  { label: "My Dashboard", to: "/dashboard" },
  { label: "Officer", to: "/officer" },
];

export function SiteHeader() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const signedIn = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 bg-glass backdrop-blur-xl">
      <div className="bg-secondary text-muted-foreground">
        <div className="container-page flex min-h-9 items-center justify-between gap-3 py-1.5 text-[11px] sm:text-xs">
          <p>Government of National Capital Territory of Delhi</p>
          <a href="#main" className="shrink-0 underline-offset-4 hover:underline">Skip to content</a>
        </div>
      </div>
      <div className="border-b">
        <div className="container-page flex min-h-16 items-center justify-between gap-4 py-2">
          <Link to="/" className="flex shrink-0 items-center gap-2.5 font-display text-[17px] font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-foreground text-background text-xl" aria-hidden>e</span>
            e-District Delhi
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Button key={item.label} variant="ghost" asChild className={`rounded-lg px-3 text-xs font-normal ${matchRoute({ to: item.to, fuzzy: item.to !== "/" }) && !item.hash ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                <Link to={item.to} hash={item.hash ?? ""}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {signedIn ? (
              <Button size="sm" variant="outline" className="hidden sm:inline-flex" onClick={handleSignOut}>
                <LogOut aria-hidden />
                Sign out
              </Button>
            ) : (
              <Button size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/login">
                  <UserRound aria-hidden />
                  Sign in
                </Link>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu"><Menu aria-hidden /></Button></SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader><SheetTitle className="text-left">e-District Delhi</SheetTitle></SheetHeader>
                <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                  {NAV.map((item) => <Button key={item.label} variant="ghost" asChild className="justify-start"><Link to={item.to} hash={item.hash ?? ""}>{item.label}</Link></Button>)}
                  {signedIn ? (
                    <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                      <LogOut aria-hidden />
                      Sign out
                    </Button>
                  ) : (
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/login">
                        <UserRound aria-hidden />
                        Sign in
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
