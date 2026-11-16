/**
 * Service catalogue for the Delhi e-District 2.0 mockup.
 * Content is derived from the client's research deck (services, departments,
 * documents, timelines, AI-support notes). Figures shown are illustrative
 * demo values for the client showcase, not verified official data.
 */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  department: string;
  authority: string;
  category: Category;
  description: string;
  fee: string;
  sla: string;
  mode: string;
  eligibility: string[];
  documents: { doc: string; formats: string }[];
  steps: string[];
  aiSupport: string;
  popular?: boolean;
  icon: string;
};

export type Category =
  | "Certificates"
  | "Pensions & Welfare"
  | "Registrations"
  | "Revenue & Property"
  | "Licences & Permits";

export const categories: Category[] = [
  "Certificates",
  "Pensions & Welfare",
  "Registrations",
  "Revenue & Property",
  "Licences & Permits",
];

export const CATEGORY_META: Record<Category, { blurb: string; icon: string }> = {
  Certificates: {
    blurb: "Income, caste, domicile, EWS and more",
    icon: "FileBadge",
  },
  "Pensions & Welfare": {
    blurb: "Old-age, disability and social security",
    icon: "HeartHandshake",
  },
  Registrations: {
    blurb: "Marriage, birth and society registration",
    icon: "BookCheck",
  },
  "Revenue & Property": {
    blurb: "Mutation, records and land documents",
    icon: "Landmark",
  },
  "Licences & Permits": {
    blurb: "Trade, shop and activity licences",
    icon: "BadgeCheck",
  },
};

export const services: Service[] = [
  {
    slug: "income-certificate",
    name: "Income Certificate",
    shortName: "Income Certificate",
    department: "Revenue Department",
    authority: "District Magistrate / SDM office",
    category: "Certificates",
    description:
      "An official proof of annual family income, used for school and college admissions, scholarships, fee concessions and welfare schemes.",
    fee: "₹25",
    sla: "7 working days",
    mode: "Fully online",
    eligibility: [
      "Applicant is a resident of Delhi",
      "Family income is within the limit required by the requesting institution",
      "Applicant is 18 years or older (a guardian may apply for minors)",
    ],
    documents: [
      { doc: "Aadhaar card (ID proof)", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Proof of residence (ration card, electricity bill)", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Self-declaration of income", formats: "PDF · up to 1 MB" },
      { doc: "Any one supporting proof (salary slip / ITR / affidavit)", formats: "PDF · up to 2 MB" },
    ],
    steps: [
      "Prepare: check eligibility and gather documents",
      "Fill the online application form",
      "Upload documents — OCR suggests values, you confirm them",
      "Review, sign the declaration and submit",
      "The SDM office verifies and records the decision",
      "Download the QR-verified certificate",
    ],
    aiSupport: "Explains requirements, builds a personal checklist and flags missing information before you submit.",
    popular: true,
    icon: "FileBadge",
  },
  {
    slug: "sc-st-obc-certificate",
    name: "SC / ST / OBC Certificate",
    shortName: "Caste Certificate",
    department: "Revenue Department",
    authority: "SDM office of your district",
    category: "Certificates",
    description:
      "Certifies membership of a Scheduled Caste, Scheduled Tribe or Other Backward Class, for reservations, scholarships and scheme benefits.",
    fee: "₹25",
    sla: "21 working days",
    mode: "Fully online",
    eligibility: [
      "Applicant belongs to the community listed in the Central / State list",
      "Applicant is a resident of Delhi",
      "Family has records proving community membership",
    ],
    documents: [
      { doc: "Aadhaar card", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Proof of residence", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Community proof of father / close relative", formats: "PDF · up to 2 MB" },
    ],
    steps: [
      "Check eligibility and gather community records",
      "Fill the online application form",
      "Upload documents",
      "SDM office verifies records",
      "Decision recorded by the authorised officer",
      "Download the QR-verified certificate",
    ],
    aiSupport: "Guides you to the right certificate service and flags weak or missing evidence for a human officer to review.",
    popular: true,
    icon: "Users",
  },
  {
    slug: "ews-certificate",
    name: "EWS Certificate",
    shortName: "EWS Certificate",
    department: "Revenue Department",
    authority: "SDM office of your district",
    category: "Certificates",
    description:
      "Economically Weaker Section certificate used for reservation in education and government recruitment.",
    fee: "₹25",
    sla: "14 working days",
    mode: "Fully online",
    eligibility: [
      "Family income is below the notified EWS limit",
      "Family does not own property beyond the notified limit",
      "Applicant is a resident of Delhi",
    ],
    documents: [
      { doc: "Aadhaar card", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Income proof (ITR / salary slip)", formats: "PDF · up to 2 MB" },
      { doc: "Property declaration", formats: "PDF · up to 1 MB" },
    ],
    steps: [
      "Check the income and property limits",
      "Fill the online application form",
      "Upload documents",
      "Verification by the SDM office",
      "Download the QR-verified certificate",
    ],
    aiSupport: "Organises your documents and explains the criteria — it never promises that you are eligible.",
    popular: true,
    icon: "ShieldCheck",
  },
  {
    slug: "domicile-certificate",
    name: "Domicile Certificate",
    shortName: "Domicile Certificate",
    department: "Revenue Department",
    authority: "SDM office of your district",
    category: "Certificates",
    description:
      "Proof that the applicant is a resident of Delhi, required by many state quotas and schemes.",
    fee: "₹25",
    sla: "14 working days",
    mode: "Fully online",
    eligibility: [
      "Applicant has resided in Delhi for the prescribed period",
      "Residence can be supported with official records",
    ],
    documents: [
      { doc: "Aadhaar card", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Long-term residence proof (school record, voter ID of parent)", formats: "PDF · up to 2 MB" },
      { doc: "Proof of current residence", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Check residence criteria",
      "Fill the online application form",
      "Upload residence evidence",
      "Verification by the SDM office",
      "Download the QR-verified certificate",
    ],
    aiSupport: "Explains the residence criteria and checks that your evidence set is complete before submission.",
    popular: true,
    icon: "MapPin",
  },
  {
    slug: "marriage-registration",
    name: "Marriage Registration",
    shortName: "Marriage Registration",
    department: "Revenue Department",
    authority: "Marriage Registration Office / SDM",
    category: "Registrations",
    description:
      "Registers a marriage and issues an official registration certificate accepted by banks, passport and visa authorities.",
    fee: "₹100",
    sla: "30 working days",
    mode: "Online booking + office visit",
    eligibility: [
      "Marriage solemnised within Delhi or either party resides in Delhi",
      "Both parties meet the legal age requirement",
    ],
    documents: [
      { doc: "Age proof of both parties", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Address proof of both parties", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Marriage photo / invitation", formats: "JPG · up to 5 MB" },
      { doc: "Witness ID proofs (two witnesses)", formats: "PDF · up to 2 MB" },
    ],
    steps: [
      "Fill the registration form online",
      "Upload documents for both parties",
      "Book the appointment slot",
      "Attend the office visit with witnesses",
      "Registrar records the registration",
      "Download the certificate",
    ],
    aiSupport: "Explains each step, guides the form and spots gaps before your appointment.",
    popular: true,
    icon: "Heart",
  },
  {
    slug: "surviving-member-certificate",
    name: "Surviving Member Certificate",
    shortName: "Surviving Member",
    department: "Revenue Department",
    authority: "SDM office of your district",
    category: "Certificates",
    description:
      "Certifies the surviving members of a deceased person's family, used for inheritance, pension transfer and compensation claims.",
    fee: "₹25",
    sla: "21 working days",
    mode: "Fully online",
    eligibility: [
      "A family member is deceased",
      "Applicant is a surviving family member and a Delhi resident",
    ],
    documents: [
      { doc: "Death certificate", formats: "PDF · up to 2 MB" },
      { doc: "ID proofs of all surviving members", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Address proof", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Gather the death certificate and member IDs",
      "Fill the online application listing all members",
      "Upload documents",
      "Verification, including local inquiry if required",
      "Download the certificate",
    ],
    aiSupport: "Explains when the certificate is needed and keeps your member list and documents consistent.",
    popular: true,
    icon: "FileHeart",
  },
  {
    slug: "old-age-pension",
    name: "Old Age Pension",
    shortName: "Old Age Pension",
    department: "Department of Social Welfare",
    authority: "District Social Welfare Officer",
    category: "Pensions & Welfare",
    description:
      "Monthly pension for senior citizens of Delhi meeting the age and residence criteria.",
    fee: "Free",
    sla: "30 working days",
    mode: "Fully online",
    eligibility: [
      "Applicant is 60 years or older",
      "Applicant is a resident of Delhi",
      "Family income is within the scheme limit",
    ],
    documents: [
      { doc: "Aadhaar card", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Age proof", formats: "PDF · up to 2 MB" },
      { doc: "Bank passbook (first page)", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Check the age and residence criteria",
      "Fill the pension application online",
      "Upload documents",
      "Verification by the Social Welfare Officer",
      "Sanction recorded; pension paid monthly to your bank account",
    ],
    aiSupport: "Explains the scheme and shows your application status — status answers come only from your authorised records.",
    popular: true,
    icon: "HeartHandshake",
  },
  {
    slug: "ration-card-services",
    name: "Ration Card (New / Correction)",
    shortName: "Ration Card",
    department: "Department of Food & Supplies",
    authority: "District Food & Supplies Officer",
    category: "Pensions & Welfare",
    description:
      "Apply for a new ration card or correct member details on an existing card for the public distribution system.",
    fee: "₹45",
    sla: "30 working days",
    mode: "Fully online",
    eligibility: [
      "Applicant household resides in Delhi",
      "Household is not already registered with another Delhi ration card",
    ],
    documents: [
      { doc: "Aadhaar cards of all members", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Proof of residence", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Fill the household details form",
      "Upload Aadhaar and residence proof",
      "Verification by the Food & Supplies office",
      "e-Ration card issued for download",
    ],
    aiSupport: "Routes you to the official food & supplies service and answers status questions when the system is integrated.",
    popular: true,
    icon: "IdCard",
  },
  {
    slug: "property-mutation",
    name: "Property / Mutation",
    shortName: "Property Mutation",
    department: "Revenue Department",
    authority: "Revenue / MCD records office",
    category: "Revenue & Property",
    description:
      "Records a change of ownership in property records after sale, inheritance or gift.",
    fee: "Varies by property value",
    sla: "45 working days",
    mode: "Online application + office visit",
    eligibility: [
      "Property lies within the jurisdiction applying",
      "Applicant has a registered title document",
    ],
    documents: [
      { doc: "Registered title deed", formats: "PDF · up to 5 MB" },
      { doc: "Latest property tax receipt", formats: "PDF, JPG · up to 2 MB" },
      { doc: "ID proof of applicant", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Fill the mutation application",
      "Upload title and tax documents",
      "Office verification and inquiry",
      "Mutation order recorded in records",
    ],
    aiSupport: "Explains the process and routes you to the correct department for your property type.",
    popular: false,
    icon: "Landmark",
  },
  {
    slug: "trade-licence",
    name: "Trade Licence",
    shortName: "Trade Licence",
    department: "Municipal Corporation of Delhi",
    authority: "Licence department, MCD",
    category: "Licences & Permits",
    description:
      "Licence to run a trade or business premises within municipal limits.",
    fee: "Varies by trade category",
    sla: "30 working days",
    mode: "Fully online",
    eligibility: [
      "Business premises lie within MCD limits",
      "Premises comply with the trade's zoning category",
    ],
    documents: [
      { doc: "Proof of premises (rent agreement / ownership)", formats: "PDF · up to 2 MB" },
      { doc: "ID proof", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Premises photo", formats: "JPG · up to 5 MB" },
    ],
    steps: [
      "Select the trade category",
      "Fill the licence application",
      "Upload documents",
      "Field inspection if required",
      "Licence issued for download",
    ],
    aiSupport: "Helps you find the right trade category and lists the exact documents for it.",
    popular: false,
    icon: "Store",
  },
  {
    slug: "birth-certificate",
    name: "Birth Certificate",
    shortName: "Birth Certificate",
    department: "Municipal Corporation of Delhi",
    authority: "Registrar of Births & Deaths",
    category: "Registrations",
    description:
      "Official record of birth, issued and downloadable for births registered in Delhi.",
    fee: "Free (within 21 days of birth)",
    sla: "7 working days",
    mode: "Fully online",
    eligibility: [
      "Birth is registered with the Delhi municipal records",
      "Applicant is the child, parent or legal guardian",
    ],
    documents: [
      { doc: "Hospital / institution birth record", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Parents' ID proof", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Search the birth record by registration number",
      "Confirm details",
      "Download the digitally signed certificate",
    ],
    aiSupport: "Helps locate the record and explains what to do if the registration details need correction.",
    popular: false,
    icon: "Baby",
  },
  {
    slug: "disability-pension",
    name: "Disability Pension",
    shortName: "Disability Pension",
    department: "Department of Social Welfare",
    authority: "District Social Welfare Officer",
    category: "Pensions & Welfare",
    description:
      "Monthly pension for residents of Delhi with certified disability meeting the scheme criteria.",
    fee: "Free",
    sla: "30 working days",
    mode: "Fully online",
    eligibility: [
      "Certified disability of the prescribed percentage",
      "Applicant is a resident of Delhi",
    ],
    documents: [
      { doc: "Disability certificate (UDID)", formats: "PDF · up to 2 MB" },
      { doc: "Aadhaar card", formats: "PDF, JPG · up to 2 MB" },
      { doc: "Bank passbook (first page)", formats: "PDF, JPG · up to 2 MB" },
    ],
    steps: [
      "Check the scheme criteria",
      "Fill the pension application online",
      "Upload documents",
      "Verification by the Social Welfare Officer",
      "Sanction recorded; pension paid monthly",
    ],
    aiSupport: "Explains the scheme and shows your application status from your authorised records only.",
    popular: false,
    icon: "Accessibility",
  },
];

export const DEPARTMENTS = Array.from(new Set(services.map((s) => s.department)));

export const announcements = [
  {
    date: "28 Oct 2026",
    title: "Pension applications now trackable in one place",
    body: "Old-age and disability pension applications from all districts appear in a single tracking view.",
  },
  {
    date: "24 Oct 2026",
    title: "QR verification for certificates",
    body: "Every issued certificate now carries a QR code that anyone can scan to verify authenticity.",
  },
  {
    date: "20 Oct 2026",
    title: "Services in your language",
    body: "The portal is being rolled out in Hindi and regional languages with voice support.",
  },
];

export type Application = {
  id: string;
  service: string;
  appliedOn: string;
  stage: number; // 0..4 index into STAGES
  status: "In progress" | "Correction requested" | "Delivered";
  slaLeft: string;
  timeline: { label: string; date?: string }[];
  note?: string;
};

export const STAGES = ["Submitted", "Verification", "Decision", "Delivered"] as const;

export const applications: Application[] = [
  {
    id: "EDL-2026-004821",
    service: "Income Certificate",
    appliedOn: "24 Oct 2026",
    stage: 2,
    status: "In progress",
    slaLeft: "4 days left of 7",
    timeline: [
      { label: "Submitted", date: "24 Oct 2026, 10:12 AM" },
      { label: "Verification", date: "27 Oct 2026, 11:40 AM" },
      { label: "Decision", date: "" },
      { label: "Delivered", date: "" },
    ],
  },
  {
    id: "EDL-2026-004310",
    service: "SC / ST / OBC Certificate",
    appliedOn: "14 Oct 2026",
    stage: 1,
    status: "Correction requested",
    slaLeft: "Paused — correct within 10 days",
    timeline: [
      { label: "Submitted", date: "14 Oct 2026, 9:05 AM" },
      { label: "Verification", date: "21 Oct 2026" },
      { label: "Decision", date: "" },
      { label: "Delivered", date: "" },
    ],
    note: "The SDM office asked you to re-upload the community proof of your father — the copy submitted is not fully readable.",
  },
  {
    id: "EDL-2026-003988",
    service: "Old Age Pension",
    appliedOn: "02 Oct 2026",
    stage: 4,
    status: "Delivered",
    slaLeft: "Sanctioned",
    timeline: [
      { label: "Submitted", date: "02 Oct 2026" },
      { label: "Verification", date: "09 Oct 2026" },
      { label: "Decision", date: "18 Oct 2026" },
      { label: "Delivered", date: "22 Oct 2026" },
    ],
  },
];
