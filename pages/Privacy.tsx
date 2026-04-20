import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { COMPANY, companyMailto, companyMapsUrl } from "@/lib/company";

type PolicySection = {
  title: string;
  content: React.ReactNode;
};

const sections: PolicySection[] = [
  {
    title: "Interpretation and Definitions",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Capitalized terms have defined meanings whether they appear in singular or plural.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Account:</strong> unique account created for You to access all or parts of the
            Service.
          </li>
          <li>
            <strong className="text-foreground">Affiliate:</strong> entity under common control (50%+ ownership/voting).
          </li>
          <li>
            <strong className="text-foreground">Company:</strong> {COMPANY.legalName}, with principal place of business at{" "}
            {COMPANY.address.oneLine}, operating{" "}
            <a
              href={COMPANY.websiteUrl}
              target="_blank"
              rel="external nofollow noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              {COMPANY.websiteUrl}
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">Cookies:</strong> small files placed on Your device to store browsing details and
            preferences.
          </li>
          <li>
            <strong className="text-foreground">Country:</strong> New York, United States.
          </li>
          <li>
            <strong className="text-foreground">Personal Data / Personal Information:</strong> any information related to an
            identified or identifiable individual.
          </li>
          <li>
            <strong className="text-foreground">Website:</strong>{" "}
            <a
              href={COMPANY.websiteUrl}
              target="_blank"
              rel="external nofollow noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              {COMPANY.websiteUrl}
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Collecting and Using Your Personal Data",
    content: (
      <>
        <h3 className="text-base font-semibold text-foreground">Types of Data Collected</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Personal Data (for example: name, email address, address details).</li>
          <li>Usage Data (for example: IP address, browser/device information, pages visited, timestamps, diagnostics).</li>
        </ul>
        <h3 className="mt-4 text-base font-semibold text-foreground">Tracking Technologies and Cookies</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We use cookies, web beacons, tags, and scripts to operate, improve, and analyze the Service. Where required by law,
          non-essential cookies are used only with Your consent, which You can withdraw at any time.
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Necessary / Essential Cookies (Session)</li>
          <li>Cookies Policy / Notice Acceptance Cookies (Persistent)</li>
          <li>Functionality Cookies (Persistent)</li>
        </ul>
      </>
    ),
  },
  {
    title: "How We Use Personal Data",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>To provide and maintain the Service and monitor usage.</li>
        <li>To manage Your account and requests.</li>
        <li>To perform contractual obligations.</li>
        <li>To contact You with updates, service/security notices, and relevant communications.</li>
        <li>For business transfers (e.g., merger, acquisition, restructuring).</li>
        <li>For analytics, trend analysis, campaign measurement, and product/service improvement.</li>
      </ul>
    ),
  },
  {
    title: "Sharing Your Personal Data",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>With service providers (operations, analytics, communications).</li>
        <li>For business transfers and corporate transactions.</li>
        <li>With affiliates and business partners.</li>
        <li>In public areas of the Service (where applicable).</li>
        <li>For any other purpose with Your consent.</li>
      </ul>
    ),
  },
  {
    title: "Retention of Your Personal Data",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We retain Personal Data only as long as needed for the purposes described in this Policy and to comply with legal
          obligations.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Account data: during account relationship + up to 24 months after closure.</li>
          <li>Support tickets/chats: up to 24 months.</li>
          <li>Analytics, server logs, and usage data: up to 24 months (or longer if legally required).</li>
          <li>Data may be deleted, aggregated, or anonymized earlier when no longer needed.</li>
        </ul>
      </>
    ),
  },
  {
    title: "International Transfers, Deletion, and Disclosure",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your data may be processed in locations with different data protection laws. We apply reasonable safeguards and security
          controls.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You may request access, correction, or deletion of Your Personal Data. We may retain specific information where legally
          required or where a lawful basis exists.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We may disclose Personal Data for business transactions, legal compliance, law enforcement requests, fraud prevention,
          safety, or protection against legal liability.
        </p>
      </>
    ),
  },
  {
    title: "Detailed Third-Party Processing",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Service providers may process data under their own privacy policies. Examples include Mouseflow, FreshDesk, and Google
          Places.
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Mouseflow:{" "}
            <a href="https://mouseflow.com/privacy/" target="_blank" rel="external nofollow noopener noreferrer" className="text-primary underline-offset-2 hover:underline">
              https://mouseflow.com/privacy/
            </a>
          </li>
          <li>
            FreshDesk:{" "}
            <a href="https://www.freshworks.com/privacy/" target="_blank" rel="external nofollow noopener noreferrer" className="text-primary underline-offset-2 hover:underline">
              https://www.freshworks.com/privacy/
            </a>
          </li>
          <li>
            Google:{" "}
            <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="external nofollow noopener noreferrer" className="text-primary underline-offset-2 hover:underline">
              https://www.google.com/intl/en/policies/privacy/
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        The Service does not address anyone under age 16. We do not knowingly collect data from children under 16. If such data
        is identified, we will take steps to remove it.
      </p>
    ),
  },
  {
    title: "Links to Other Websites",
    content: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Our Service may contain links to third-party websites not operated by Us. We are not responsible for third-party content,
        privacy policies, or practices.
      </p>
    ),
  },
  {
    title: "Changes to this Privacy Policy",
    content: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        We may update this Privacy Policy from time to time. Changes are effective when posted on this page, and we may notify You
        by email or a prominent notice before material changes become effective.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          If you have any questions about this Privacy Policy, contact us at{" "}
          <a href={companyMailto} className="text-primary underline-offset-2 hover:underline">
            {COMPANY.email}
          </a>
          , by phone at{" "}
          <a href={COMPANY.phone.telHref} className="text-primary underline-offset-2 hover:underline">
            {COMPANY.phone.display}
          </a>
          , or by mail at {COMPANY.address.oneLine}.
        </p>
        <p>
          <a
            href={companyMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            Open our address in Maps
          </a>
        </p>
      </div>
    ),
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background py-20 sm:py-24">
      <div className="container mx-auto min-w-0 max-w-5xl px-4 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
          <p className="w-full text-left text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:w-auto">
            Legal
          </p>
        </div>

        <header className="mb-8 rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 08, 2026</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information
            when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and
            use of information in accordance with this Privacy Policy.
          </p>
        </header>

        <div className="space-y-4 [&_a]:break-words [&_a]:[overflow-wrap:anywhere]">
          {sections.map((section, idx) => (
            <section key={section.title} className="min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-6 sm:p-7">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">Section {idx + 1}</p>
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              <div className="mt-4 min-w-0 [overflow-wrap:anywhere]">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
