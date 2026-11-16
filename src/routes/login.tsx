import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — e-District Delhi 2.0" },
      { name: "description", content: "Sign in with your mobile number or Aadhaar OTP to see your services dashboard." },
      { property: "og:title", content: "Sign in — e-District Delhi 2.0" },
      { property: "og:description", content: "Secure OTP sign-in to your Delhi e-District dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <form
          className="w-full max-w-sm rounded-3xl border bg-card p-8 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === "mobile") {
              setStep("otp");
              return;
            }
            signIn();
            navigate({ to: "/dashboard" });
          }}
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><Smartphone aria-hidden /></div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in / साइन इन</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use your mobile number linked to Aadhaar.</p>
          {step === "mobile" ? (
            <div className="mt-6 space-y-2"><Label htmlFor="m">Mobile number</Label><Input id="m" inputMode="numeric" defaultValue="98XXXXXX21" /></div>
          ) : (
            <div className="mt-6 space-y-2"><Label htmlFor="o">Enter 6-digit OTP</Label><Input id="o" inputMode="numeric" defaultValue="123456" /><p className="text-xs text-muted-foreground">Demo: any OTP works.</p></div>
          )}
          <Button type="submit" className="mt-6 w-full" size="lg">{step === "mobile" ? "Send OTP" : "Verify & continue"}</Button>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" aria-hidden />Demo sign-in for the client showcase.</p>
        </form>
      </main>
      <SiteFooter />
    </>
  );
}
