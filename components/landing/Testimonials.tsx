import { SectionReveal } from "@/components/landing/SectionReveal";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

const Testimonials = () => {
  return (
    <section id="testimonials" className="overflow-hidden py-24 lg:py-32">
      <SectionReveal>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
              Trusted by teams who need startup blueprints, not scattered notes.
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Entrepreneurs, creators, and innovation programs use Opsverai to move from raw ideas to structured concepts with
              clear models, positioning, and execution plans stakeholders can act on.
            </p>
          </div>

          <StaggerTestimonials className="border border-border/40" />
        </div>
      </SectionReveal>
    </section>
  );
};

export default Testimonials;
