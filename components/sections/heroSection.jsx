"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PrimaryBtn from "../ui/buttons/primaryBtn";
import SecondaryBtn from "../ui/buttons/secondaryBtn";
import HeroHeading from "../ui/texts/HeroHeading";
import HeroSubtitle from "../ui/texts/HeroSubtitle";
import { GlassBtn } from "../ui/buttons/GlassBtn";
import TertiaryBtn from "../ui/buttons/TertiaryBtn";
import { hero } from "../../cms/content/content";


const Hero = () => {

  const [isMounted, setIsMounted] = useState(false);

  // Mount animation for text entrance
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`${hero.bgImage} bg-cover h-[94vh] bg-center relative flex flex-col items-center justify-center max-[380px]:px-4 p-8 py-12 overflow-hidden bg-black`}>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 md:gap-6">
        <HeroHeading
          text={hero.heading}
          custom={`${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        />
        <HeroSubtitle
          text={hero.subtitle}
          custom={`${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        />
        <div
          className={`w-[90%] md:w-fit flex flex-col sm:flex-row gap-5 md:gap-5
                transition-all duration-700 ease-out
                ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <SecondaryBtn href={hero.href1} btnText={hero.btn1Text} custom="border border-light-blue" />
          <TertiaryBtn href={hero.href2} btnText={hero.btn2Text}/>
        </div>

      </div>
    </section>
  );
};

export default Hero;
