import React from "react";

const HeroHeading = ({ text, custom }) => {
  return (
    <h1
      className={`flex justify-center items-center font-serif text-color-herotext max-[380px]:text-xl text-[25px] pt-25 sm:text-5xl md:text-4xl lg:text-5xl xl:text-4xl 2xl:text-6xl text-center sm:w-4/5 max-[380px]:leading-10 leading-12 md:leading-16 lg:leading-18 xl:leading-18 2xl:leading-28
              transition-all duration-700 ease-out ${custom}`}
      style={{ transitionDelay: "100ms" }}
    >
      {text}
    </h1>
  );
};

export default HeroHeading;

// ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}