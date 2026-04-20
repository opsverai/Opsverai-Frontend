import { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronsRight } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
  /** Extra copy shown only in the detail popup (optional). */
  dialogDetails?: string;
}

export interface Feature197Props {
  features?: FeatureItem[];
  /** Anchor id for in-page navigation (e.g. `#use-cases`). */
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "Ready-to-Use UI Blocks",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    description:
      "Browse through our extensive collection of pre-built UI blocks designed with shadcn/ui. Each block is carefully crafted to be responsive, accessible, and easily customizable. Simply copy and paste the code into your project.",
  },
  {
    id: 2,
    title: "Tailwind CSS & TypeScript",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    description:
      "Built with Tailwind CSS for rapid styling and TypeScript for type safety. Our blocks leverage the full power of Tailwind's utility classes while maintaining clean, type-safe code that integrates seamlessly with your React projects.",
  },
  {
    id: 3,
    title: "Dark Mode & Customization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    description:
      "Every block supports dark mode out of the box and can be customized to match your brand. Modify colors, spacing, and typography using Tailwind's configuration. The shadcn/ui theming system makes it easy to maintain consistency across your site.",
  },
  {
    id: 4,
    title: "Accessibility First",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    description:
      "All blocks are built with accessibility in mind, following WCAG guidelines. They include proper ARIA labels, keyboard navigation support, and semantic HTML structure. Ensure your website is usable by everyone without extra effort.",
  },
];

const Feature197 = ({
  features = defaultFeatures,
  id,
  className,
  heading,
  subheading,
}: Feature197Props) => {
  const list = features.length > 0 ? features : defaultFeatures;
  const first = list[0];
  const [openValue, setOpenValue] = useState(`item-${first.id}`);
  const [activeTabId, setActiveTabId] = useState<number | null>(first.id);
  const [activeImage, setActiveImage] = useState(first.image);
  const [detailOpenForId, setDetailOpenForId] = useState<number | null>(null);

  const detailFeature = detailOpenForId !== null ? list.find((f) => f.id === detailOpenForId) : undefined;

  const handleOpenChange = (value: string) => {
    if (!value) return;
    setOpenValue(value);
    const idNum = Number(value.replace("item-", ""));
    const tab = list.find((f) => f.id === idNum);
    if (tab) {
      setActiveImage(tab.image);
      setActiveTabId(tab.id);
    }
  };

  return (
    <section id={id} className={cn("py-24 lg:py-32", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        {(heading || subheading) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {heading ? (
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{heading}</h2>
            ) : null}
            {subheading ? <p className="mt-4 text-lg text-muted-foreground">{subheading}</p> : null}
          </div>
        )}

        <div className="mb-12 flex w-full flex-col items-start gap-12 md:flex-row md:justify-between">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" value={openValue} onValueChange={handleOpenChange}>
              {list.map((tab) => (
                <AccordionPrimitive.Item
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className="border-b border-border"
                >
                  <AccordionPrimitive.Header className="flex w-full items-start gap-0">
                    <div className="min-w-0 flex-1">
                      <AccordionPrimitive.Trigger
                        className={cn(
                          "flex w-full items-center pb-2 pt-5 text-left font-medium transition-all hover:no-underline",
                        )}
                      >
                        <span
                          className={cn(
                            "text-xl font-semibold tracking-tight",
                            tab.id === activeTabId ? "text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {tab.title}
                        </span>
                      </AccordionPrimitive.Trigger>
                      <p className="pb-5 pr-2 text-sm font-normal leading-relaxed text-muted-foreground sm:pr-4">
                        {tab.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="group flex shrink-0 items-center justify-center self-start border-l border-border/80 px-3 py-5 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label={`Open details: ${tab.title}`}
                      onClick={() => setDetailOpenForId(tab.id)}
                    >
                      <ChevronsRight
                        className="h-5 w-5 transition-transform duration-450 ease-out-expo group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </button>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down md:data-[state=closed]:animate-none md:data-[state=open]:animate-none">
                    <div className="pb-4 pt-0 md:hidden">
                      <div className="mt-1">
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="h-full max-h-80 w-full rounded-md object-cover"
                        />
                      </div>
                    </div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-full overflow-hidden rounded-xl bg-muted md:block md:w-1/2">
            <img
              src={activeImage}
              alt={list.find((f) => f.id === activeTabId)?.title ?? "Feature preview"}
              className="aspect-[4/3] w-full rounded-md object-cover pl-4"
            />
            <button
              type="button"
              className="group absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-4 py-2.5 text-sm font-medium text-foreground shadow-depth-lg backdrop-blur-md transition-[transform,background-color,border-color] duration-450 ease-out-expo hover:border-primary/35 hover:bg-background"
              aria-label="Open details for the selected item"
              onClick={() => {
                if (activeTabId != null) setDetailOpenForId(activeTabId);
              }}
            >
              <span className="tracking-wide">Details</span>
              <ChevronsRight
                className="h-4 w-4 transition-transform duration-450 ease-out-expo group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={detailOpenForId !== null} onOpenChange={(open) => !open && setDetailOpenForId(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
          {detailFeature ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl sm:text-2xl">{detailFeature.title}</DialogTitle>
                <DialogDescription className="sr-only">Extended details for {detailFeature.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={detailFeature.image}
                  alt={detailFeature.title}
                  className="aspect-video w-full rounded-lg object-cover"
                />
                <p className="text-sm leading-relaxed text-muted-foreground">{detailFeature.description}</p>
                {detailFeature.dialogDetails ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">{detailFeature.dialogDetails}</p>
                ) : null}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export { Feature197 };
