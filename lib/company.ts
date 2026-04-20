/** Official company & contact details (single source of truth for the site). */
export const COMPANY = {
  legalName: "Opsver AI",
  domain: "opsverai.com",
  websiteUrl: "https://opsverai.com",
  foundedDisplay: "5 April 2024",
  founder: {
    name: "Brandon Keller",
    role: "Founder & CEO",
  },
  address: {
    street: "405 Lexington Ave",
    city: "New York",
    state: "NY",
    postalCode: "10174",
    country: "United States",
    oneLine: "405 Lexington Ave, New York, NY 10174, United States",
  },
  phone: {
    e164: "+12128645937",
    display: "+1 (212) 864-5937",
    telHref: "tel:+12128645937",
  },
  email: "support@opsverai.com",
} as const;

export const companyMailto = `mailto:${COMPANY.email}` as const;

export const companyMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=405+Lexington+Ave%2C+New+York%2C+NY+10174" as const;

export const companyLinkedInUrl = "https://www.linkedin.com/company/opsver-ai/" as const;
