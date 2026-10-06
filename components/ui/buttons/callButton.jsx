"use client";
import { useState } from "react";
import Image from "next/image";
import BusinessInfo from "../../../cms/business Info/businessInfo.js";

const PHONE_NUMBER = BusinessInfo.PrimaryContactNumber;

// Theme colors — change here to retheme
const theme = {
  bg:          "bg-primary-btn liquid-glass-strong-light",
  bgHover:     "hover:bg-primary-btn-hover",
  bgDisabled:  "disabled:bg-gray-400",
  text:        "text-primary-btn-text",
  textHover:   "hover:text-primary-btn-text-hover",
};

const sharedClasses = `
  cursor-pointer font-serif font-extralight text-[12px]
  rounded-full px-8 transition-all ease-in-out duration-300
  min-w-[90%] md:min-w-[220px] min-h-[50px]
  flex items-center justify-center
  relative overflow-hidden
  btn-primary btn-press liquid-glass-btn
`;

const CallButton = ({btnText, custom, disabled}) => {
  const [showNumber, setShowNumber] = useState(false);

  const colorClasses = `
    ${theme.bg} ${theme.bgHover} ${theme.text} ${theme.textHover}
    ${disabled ? theme.bgDisabled : ""}
  `;

  const handleClick = () => {
    setShowNumber(!showNumber);
  };

  return (
    <>
      {/* Desktop - toggle number on click */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`${sharedClasses} ${colorClasses} w-[240px] px-8 transition-all ease-in-out duration-300 min-w-[220px] min-h-[50px] hidden sm:flex items-center justify-center gap-2 ${custom ? custom : ""}`}
      >
        <Image
          src="/icons/call.svg"
          alt="Call icon"
          width={20}
          height={20}
          className="[filter:var(--color-primary-btn-icon)] hover:[filter:var(--color-primary-btn-icon-hover)]"
        />
        <div className="shimmer" />
        {showNumber ? PHONE_NUMBER : btnText}
      </button>

      {/* Mobile - direct phone call */}
      <a
        href={`tel:${PHONE_NUMBER.replace(/-/g, "")}`}
        className={`${sharedClasses} ${colorClasses} w-[214px] px-8 transition-all ease-in-out duration-300 min-w-[90%]  min-h-[50px] sm:hidden flex items-center justify-center gap-2`}
        style={custom} 
        suppressHydrationWarning={true}
      >
        <Image
          src="/icons/call.svg"
          alt="Call icon"
          width={20}
          height={20}
          className="[filter:var(--color-primary-btn-icon)] hover:[filter:var(--color-primary-btn-icon-hover)]"
        />
        <div className="shimmer" />
        {btnText}
      </a>
    </>
  );
};

export default CallButton;
