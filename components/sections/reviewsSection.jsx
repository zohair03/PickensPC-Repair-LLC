"use client";
import React, { useState, useEffect } from "react";
import PrimaryBtn from "../ui/buttons/primaryBtn";
import { useInView } from "react-intersection-observer";
import Label from "../ui/texts/Label";
import H2 from "../ui/texts/H2";
import H2Subtitle from "../ui/texts/H2Subtitle";
import ReviewCard from "../ui/cards/ReviewCard";
import { TestimonialsContent } from "@/cms/content/content";


const Reviews = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="p-8 lg:py-12 lg:px-16 2xl:px-35">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[220px] bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="bg-[image:var(--color-section-bg-testimonials)] relative overflow-hidden p-8 lg:py-12 lg:px-16 2xl:px-35">
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        {/* Header */}
        <div
          className={`flex flex-col items-center text-center gap-4 transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex flex-col gap-2">
            <Label label={TestimonialsContent.label} />
            <H2 text={TestimonialsContent.heading} />
          </div>
          <H2Subtitle text={TestimonialsContent.subtitle} />
        </div>

        {/* Review Cards */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center items-stretch">
          {TestimonialsContent.cards.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={index}
              isVisible={inView}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-700 ease-out delay-700
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <PrimaryBtn href={TestimonialsContent.href} btnText={TestimonialsContent.btnText} />
        </div>
      </div>
    </section>
  );
};

export default Reviews;