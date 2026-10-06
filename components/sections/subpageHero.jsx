"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import SecondaryBtn from "../ui/buttons/secondaryBtn";
import CallButton from "../ui/buttons/callButton";
import TertiaryBtn from "../ui/buttons/TertiaryBtn";
import HeroHeading from "../ui/texts/HeroHeading";
import HeroSubtitle from "../ui/texts/HeroSubtitle";


const SubpageHero = ({ content, isServicesPage, isCta2=true, isClickToCall=false }) => {

  const [isMounted, setIsMounted] = useState(false);

  // Mount animation for text entrance
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section
        className={`bg-cover bg-center ${content.bgImage} flex flex-col items-center justify-center relative pt-[20%] md:pt-[10%] xl:pt-[5%] 2xl:pt-[10%] pb-12 min-h-[55vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[50vh] xl:min-h-[70vh] 2xl:min-h-[60vh]`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="w-full relative z-10 h-full flex flex-col items-center justify-center gap-3 md:gap-5 px-6 sm:px-12 md:px-24 text-center">
          <HeroHeading
            text={content.heading}
            custom={`${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          />
          <HeroSubtitle
            text={content.subtitle}
            custom={`${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          />
          {/* Buttons */}
          <div className="w-[90%] md:w-fit flex flex-col sm:flex-row gap-5 md:gap-5">
            {
              isClickToCall ? (
                <CallButton btnText={content.btn1Text} />
              ) : (
                <SecondaryBtn href={content.href1} btnText={content.btn1Text} custom="border border-light-blue" />
              )
            }
            {
              isCta2 && (
                <TertiaryBtn href={content.href2} btnText={content.btn2Text} />
              )
            }
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="flex items-center justify-center gap-2 py-4 md:py-5 border-b border-gray-200 px-4">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-700 font-medium hover:text-primary transition-colors"
        >
          Home
        </Link>
        <Image
          src="/icons/right-icon.svg"
          alt="Arrow Icon"
          width={20}
          height={20}
        />
        {isServicesPage ? (
          <>
            <Link
              href="/services"
              className="text-lg font-semibold text-gray-700 font-medium hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Image
              src="/icons/right-icon.svg"
              alt="Arrow Icon"
              width={20}
              height={20}
            />
          </>
        ) : null}

        <span className="text-lg font-semibold text-primary font-medium">
          {content.breadcrumb}
        </span>
      </div>
    </>
  );
};

export default SubpageHero;