import { SectionReveal } from "@/components/landing/SectionReveal";
import { FooterTapedDesign } from "@/components/ui/footer-taped-design";

const Footer = () => {
  return (
    <footer className="glass-footer border-t border-border bg-muted/10 py-10 md:py-14 lg:py-16">
      <SectionReveal>
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <FooterTapedDesign />
        </div>
      </SectionReveal>
    </footer>
  );
};

export default Footer;
