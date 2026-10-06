import React from "react";

const Label = ({ label, custom }) => {
  return (
    <p className={`text-label-text font-sans uppercase font-semibold text-center text-sm md:text-lg ${custom}`}>
      {label}
    </p>
  );
};

export default Label;
