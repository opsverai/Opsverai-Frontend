import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { images } from "@/lib/publicImages";

/** In Next.js App Router, add `"use client"` at the top of this file. Vite + React runs entirely on the client for routed pages. */

const SQRT_5000 = Math.sqrt(5000);

/** Avatar files in /public (`22.webp`–`27.webp`). */
const GIRL_IMAGE_BY_NAME: Record<string, string> = {
  sophia: images.testimonial22,
  stephanie: images.testimonial27,
  marie: images.testimonial26,
};

const BOY_IMAGE_BY_NAME: Record<string, string> = {
  dan: images.testimonial25,
  andrey: images.testimonial24,
  jeremy: images.testimonial23,
};

function getTestimonialImage(by: string): string {
  const firstName = by.split(",")[0]?.trim().toLowerCase() ?? "";
  return GIRL_IMAGE_BY_NAME[firstName] ?? BOY_IMAGE_BY_NAME[firstName] ?? "";
}

const testimonialsSeed = [
  {
    testimonial: "My favorite solution in the market. We work 5x faster with Opsverai.",
    by: "Sophia, CEO at TechCorp",
  },
  {
    testimonial: "I'm confident my data is safe with Opsverai. I can't say that about other providers.",
    by: "Dan, CTO at SecureNet",
  },
  {
    testimonial: "I know it's cliche, but we were lost before we found Opsverai. Can't thank you guys enough!",
    by: "Stephanie, COO at InnovateCo",
  },
  {
    testimonial: "Opsverai's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie, CFO at FuturePlanning",
  },
  {
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andrey, Head of Design at CreativeSolutions",
  },
  {
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy, Product Manager at TimeWise",
  },
] as const;

const testimonials = testimonialsSeed.map((t, i) => ({
  tempId: i,
  testimonial: t.testimonial,
  by: t.by,
  imgSrc: getTestimonialImage(t.by),
}));

export type StaggerTestimonialItem = (typeof testimonials)[number];

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

function TestimonialCard({ position, testimonial, handleMove, cardSize }: TestimonialCardProps) {
  const isCenter = position === 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleMove(position)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleMove(position);
        }
      }}
      className={cn(
        "absolute top-1/2 left-1/2 cursor-pointer border-2 border-primary p-8 transition-all duration-500 ease-in-out",
        isCenter ? "z-10 bg-primary text-primary-foreground" : "z-0 bg-card text-card-foreground",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border)), 0 0 0 2px hsl(var(--primary))"
          : "0 0 0 2px hsl(var(--primary))",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      {testimonial.imgSrc ? (
        <img
          src={testimonial.imgSrc}
          alt={`${testimonial.by.split(",")[0]?.trim() ?? "Customer"}, Opsverai testimonial`}
          className="mb-4 h-14 w-12 bg-muted object-cover object-top"
          style={{
            boxShadow: "3px 3px 0px hsl(var(--background))",
          }}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="mb-4 h-14 w-12" aria-hidden />
      )}
      <h3
        className={cn(
          "text-base font-medium sm:text-xl",
          isCenter ? "text-primary-foreground" : "text-foreground",
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute right-8 bottom-8 left-8 mt-2 text-sm italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground",
        )}
      >
        · {testimonial.by}
      </p>
    </div>
  );
}

export type StaggerTestimonialsProps = {
  className?: string;
};

export function StaggerTestimonials({ className }: StaggerTestimonialsProps) {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<StaggerTestimonialItem[]>(() => [...testimonials]);
  const nextKeyRef = useRef(testimonials.length);

  const handleMove = (steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: nextKeyRef.current++ });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: nextKeyRef.current++ });
        }
      }
      return newList;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl bg-muted/30", className)} style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 === 1 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "border-2 border-border bg-background hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "border-2 border-border bg-background hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default StaggerTestimonials;
