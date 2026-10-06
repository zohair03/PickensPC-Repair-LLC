"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PrimaryBtn from "../ui/buttons/primaryBtn";
import { useInView } from "react-intersection-observer";
import H2 from "../ui/texts/H2";
import Label from "../ui/texts/Label";
import FaqItem from "../ui/FaqItem";


const Faqs = ({bgColor='bg-white', isImage=true, isButton=true, content }) => {
  const [openId, setOpenId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (!isMounted) {
    return (
      <section className="max-[380px]:px-5 p-8 lg:py-12 lg:px-16 2xl:px-50">
        <div className="flex flex-col gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-72 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
            <div className="w-full flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="hidden lg:block w-full lg:w-1/2 h-[480px] bg-gray-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={`${bgColor} relative overflow-hidden max-[380px]:px-5 p-8 lg:py-12 lg:px-16 2xl:px-50`}>

      <div className="relative z-10 flex flex-col gap-8 md:gap-12 items-center">

        <div
          className={`flex flex-col gap-2 text-center items-center transition-all duration-700 ease-out
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <Label label={content.label} />
          <H2 text={content?.heading} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full items-start">

          <div className="w-full  flex flex-col gap-1">
            {content.questions.map((faq, index) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                index={index}
                isVisible={inView}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>


          {isImage && (
            <div
              className={`hidden lg:block w-full lg:w-1/2 transition-all duration-700 ease-out delay-500
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative w-full h-[480px] rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <Image
                  src={content.image}
                  alt="FAQ Image"
                  fill
                  sizes="(max-width: 1024px) 0vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div
          className={`flex justify-center w-full sm:w-auto transition-all duration-700 ease-out delay-700
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {isButton && <PrimaryBtn custom={"py-1"} href={content.href} btnText={content.btnText} />}
        </div>

      </div>
    </section>
  );
};

export default Faqs;