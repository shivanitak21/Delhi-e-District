/** Demo citizen profile for the post-login dashboard mockup. All values are illustrative. */
import type { Category } from "./services";

export type ItemState = "pending" | "action" | "done";
export type DashItem = { title: string; category: Category; state: ItemState; detail: string; date: string; slug?: string };

export const citizen = {
  name: "Sunita Sharma",
  district: "South West Delhi",
  age: 62,
  familySize: 4,
  annualIncome: "₹2.4 lakh",
  profileComplete: 80,
};

export const dashItems: DashItem[] = [
  { title: "Income Certificate", category: "Certificates", state: "pending", detail: "With SDM office for decision · 4 days left", date: "24 Oct 2026", slug: "income-certificate" },
  { title: "SC / ST / OBC Certificate", category: "Certificates", state: "action", detail: "Re-upload father's community proof", date: "14 Oct 2026", slug: "sc-st-obc-certificate" },
  { title: "Domicile Certificate", category: "Certificates", state: "done", detail: "Issued · QR verified", date: "12 Jun 2026", slug: "domicile-certificate" },
  { title: "Old Age Pension", category: "Pensions & Welfare", state: "done", detail: "₹2,500 credited on 1 Nov", date: "22 Oct 2026", slug: "old-age-pension" },
  { title: "Ration Card correction", category: "Pensions & Welfare", state: "pending", detail: "Verification by Food & Supplies office", date: "30 Oct 2026", slug: "ration-card-services" },
  { title: "Marriage Registration (son)", category: "Registrations", state: "done", detail: "Certificate downloaded", date: "03 Mar 2026", slug: "marriage-registration" },
  { title: "Birth Certificate (grandchild)", category: "Registrations", state: "action", detail: "Confirm parent's name spelling", date: "05 Nov 2026", slug: "birth-certificate" },
  { title: "Property Mutation", category: "Revenue & Property", state: "pending", detail: "Office inquiry scheduled 18 Nov", date: "01 Oct 2026", slug: "property-mutation" },
  { title: "Property tax 2026–27", category: "Revenue & Property", state: "done", detail: "Paid · compliant", date: "15 Jun 2026" },
  { title: "Trade Licence renewal", category: "Licences & Permits", state: "action", detail: "Renewal due in 20 days", date: "Due 01 Dec 2026", slug: "trade-licence" },
];

export type Scheme = { name: string; dept: string; benefit: string; why: string; match: "Likely eligible" | "Check eligibility"; slug?: string };
export const schemes: Scheme[] = [
  { name: "Senior Citizen Health Cover (Ayushman Vay Vandana)", dept: "Health & Family Welfare", benefit: "Up to ₹5 lakh free treatment per year", why: "You are 60+ years old", match: "Likely eligible" },
  { name: "Mukhyamantri Tirth Yatra Yojana", dept: "Revenue Department", benefit: "Free pilgrimage trip with one attendant", why: "You are 60+ and a Delhi resident", match: "Likely eligible" },
  { name: "Disability Pension", dept: "Social Welfare", benefit: "₹2,500 per month", why: "Needs a disability certificate (UDID)", match: "Check eligibility", slug: "disability-pension" },
  { name: "Ladli Scheme (granddaughter)", dept: "Women & Child Development", benefit: "Savings bond up to ₹36,000", why: "Family income below ₹1 lakh limit needs checking", match: "Check eligibility" },
];
