import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { COMPANY, companyMailto, companyMapsUrl } from "@/lib/company";

type TermsSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const sections: TermsSection[] = [
  {
    id: "interpretation-definitions",
    title: "Interpretation and Definitions",
    content: (
      <>
        <h3 className="text-lg font-semibold text-foreground">Interpretation</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The words whose initial letters are capitalized have meanings defined under the following conditions. The following
          definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </p>
        <h3 className="mt-5 text-lg font-semibold text-foreground">Definitions</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Affiliate</strong> means an entity that controls, is controlled by, or is under
            common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other
            securities entitled to vote for election of directors or other managing authority.
          </li>
          <li>
            <strong className="text-foreground">Country</strong> refers to: New York, United States.
          </li>
          <li>
            <strong className="text-foreground">Company</strong> refers to {COMPANY.legalName}, with principal place of business
            at {COMPANY.address.oneLine}.
          </li>
          <li>
            <strong className="text-foreground">Device</strong> means any device that can access the Service such as a computer, a
            cell phone, or a digital tablet.
          </li>
          <li>
            <strong className="text-foreground">Service</strong> refers to the Website.
          </li>
          <li>
            <strong className="text-foreground">Terms and Conditions</strong> (also referred to as "Terms") means these Terms and
            Conditions, including any documents expressly incorporated by reference.
          </li>
          <li>
            <strong className="text-foreground">Third-Party Social Media Service</strong> means any services or content provided by
            a third party that is displayed, included, made available, or linked to through the Service.
          </li>
          <li>
            <strong className="text-foreground">Website</strong> refers to {COMPANY.domain}, accessible from{" "}
            <a
              href={COMPANY.websiteUrl}
              target="_blank"
              rel="external nofollow noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {COMPANY.websiteUrl}
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">You</strong> means the individual, company, or legal entity accessing or using the
            Service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "acknowledgment",
    title: "Acknowledgment",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of
          these Terms and Conditions then You may not access the Service.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          You represent that You are over the age of 18. Your access to and use of the Service is also subject to Our Privacy
          Policy.
        </p>
      </>
    ),
  },
  {
    id: "links",
    title: "Links to Other Websites",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any
          third-party websites or services.
        </p>
        <h3 className="mt-5 text-lg font-semibold text-foreground">Links from a Third-Party Social Media Service</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your use of any Third-Party Social Media Service is governed by that service&apos;s terms and privacy policies.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever,
        including without limitation if You breach these Terms and Conditions.
      </p>
    ),
  },
  {
    id: "liability-disclaimer",
    title: "Limitation of Liability and Disclaimer",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The entire liability of the Company and any of its suppliers under any provision of these Terms shall be limited to the
          amount actually paid by You through the Service or 100 USD if You haven&apos;t purchased anything through the Service.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranty of any kind, to the maximum
          extent permitted under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "governing-law-disputes",
    title: "Governing Law and Disputes Resolution",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The laws of New York, United States, excluding its conflicts of law rules, shall govern these Terms and Your use of the
          Service.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by
          contacting the Company.
        </p>
      </>
    ),
  },
  {
    id: "other-legal",
    title: "Other Legal Terms",
    content: (
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>For EU users, mandatory provisions of the law of Your country of residence still apply.</li>
        <li>
          You represent and warrant that You are not located in a country subject to U.S. embargo and are not on any prohibited or
          restricted parties list.
        </li>
        <li>If any provision is unenforceable, the remaining provisions continue in full force and effect.</li>
        <li>Failure to enforce a right is not a waiver of that right.</li>
        <li>If translated versions exist, the original English text prevails in case of dispute.</li>
      </ul>
    ),
  },
  {
    id: "changes-contact",
    title: "Changes and Contact",
    content: (
      <>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We
          will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect.
        </p>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            If you have any questions about these Terms and Conditions, contact us at{" "}
            <a href={companyMailto} className="font-medium text-primary underline-offset-2 hover:underline">
              {COMPANY.email}
            </a>
            , by phone at{" "}
            <a href={COMPANY.phone.telHref} className="font-medium text-primary underline-offset-2 hover:underline">
              {COMPANY.phone.display}
            </a>
            , or by mail at {COMPANY.address.oneLine}.
          </p>
          <p>
            <a
              href={companyMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Open our address in Maps
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function Terms() {
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Terms and Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: April 08, 2026</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Please read these terms and conditions carefully before using Our Service.
          </p>
        </header>

        <div className="space-y-4 [&_a]:break-words [&_a]:[overflow-wrap:anywhere]">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-6 sm:p-7"
              aria-labelledby={`${section.id}-title`}
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">Section {idx + 1}</p>
              <h2 id={`${section.id}-title`} className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 min-w-0 [overflow-wrap:anywhere]">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
