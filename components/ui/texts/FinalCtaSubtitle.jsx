import React from "react";

const FinalCtaSubtitle = ({ text }) => {
  return (
    <p className="mt-2 xl:mt-2 text-center font-sans font-semibold max-[380px]:text-sm text-base md:text-lg lg:text-2xl xl:text-xl 2xl:text-2xl max-[380px]:w-full w-[90%] md:w-auto xl:w-[80%] text-white/80">
      {text}
    </p>
  );
};

export default FinalCtaSubtitle;
