import React from "react";

const FinalCtaH2 = ({ text, custom }) => {
  return (
    <div>
      <h2
        className={`text-white max-[380px]:text-xl text-h2 md:text-3xl lg:text-5xl xl:text-4xl 2xl:text-5xl font-serif sm:text-3xl text-center max-[380px]:leading-10 leading-14 lg:leading-22 xl:leading-16 2xl:leading-22 ${custom}`}
      >
        {text}
      </h2>
    </div>
  );
};

export default FinalCtaH2;
