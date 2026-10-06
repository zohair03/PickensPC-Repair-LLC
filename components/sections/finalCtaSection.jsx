'use client';
import React, { useState, useEffect } from "react";
import SecondaryBtn from "../ui/buttons/secondaryBtn";
import TertiaryBtn from "../ui/buttons/TertiaryBtn";
import CallButton from "../ui/buttons/callButton";
import { GlassBtn } from "../ui/buttons/GlassBtn";
import { useInView } from "react-intersection-observer";
import Label from "../ui/texts/Label";
import FinalCtaH2 from "../ui/texts/FinalCtaH2";
import FinalCtaSubtitle from "../ui/texts/FinalCtaSubtitle";

const FinalCta = ({content, height = "min-sm:h-[70vh]"}) => {

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
      <section
        className={`${content.image} flex flex-col items-center justify-center relative min-h-[65vh] ${height} md:h-[60vh] lg:min-h-[40vh] xl:min-h-[70vh] bg-cover bg-center max-[380px]:py-15 p-8 py-12 lg:py-12 lg:px-16`}
      />
    );
  }

  return (
    <section
      ref={ref}
      className={`${content.image} flex flex-col items-center justify-center relative min-h-[65vh] ${height} md:h-[60vh] lg:min-h-[40vh] xl:min-h-[70vh] bg-cover bg-center max-[380px]:py-15 p-8 py-12 lg:py-12 lg:px-16`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center gap-6 md:gap-7 z-10 px-4 sm:px-8">

        {/* Label + Heading + Subtitle */}
        <div
          className={`flex flex-col lg:gap-4 text-center items-center transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <Label label={content.label} custom="text-white mb-1 lg:mb-[-12px]" />
          <FinalCtaH2 text={content.heading} custom={`leading-relaxed`} />
          <FinalCtaSubtitle text={content.subtitle} />
        </div>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center transition-all duration-700 ease-out delay-300
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <CallButton btnText={content.btn1Text} href={content.href1} />
          <TertiaryBtn href={content.href2} btnText={content.btn2Text} />
        </div>
      </div>
    </section>
  );
};

export default FinalCta;