"use client";
import { useState } from "react";
import Link from "next/link";
import ContactForm from "./contactForm";
import BusinessInfo from "@/cms/business Info/businessInfo";

// Copy Icon
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-zinc-900"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

// Phone Icon
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-zinc-900"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Check Icon
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-green-600"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// GitHub Icon
const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 shrink-0 text-zinc-600"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Instagram Icon
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 shrink-0 text-zinc-600"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Facebook Icon
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 shrink-0 text-zinc-600"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// LinkedIn Icon
const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 shrink-0 text-zinc-600"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Location Icon
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4.5 h-4.5 text-zinc-500"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Clock Icon
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4.5 h-4.5 text-zinc-500"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ContactInfo = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = BusinessInfo.Email || "info@pickenspcrepair.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-[url('/images/why-bg.webp')] bg-center bg-cover w-full text-zinc-900 py-8 md:py-12 px-8 sm:px-12 xl:px-35 flex flex-col lg:flex-row gap-15 font-sans border-t border-zinc-200">
      <div className="w-full max-w-5xl xl:pl-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 md:gap-10 lg:gap-5">
        {/* Left Column: Let's Connect & Follow Me */}
        <div className="flex flex-col gap-5 justify-start">
          {/* Let's Connect */}
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-xl md:text-2xl 2xl:text-3xl text-center lg:text-left">
              Contact Us
            </h2>

            <div className="flex flex-col gap-3.5 w-full max-w-[420px]">
              {/* Book a Call Button */}
              <a
                href={`tel:${BusinessInfo.PrimaryContactNumber}`}
                className="w-full xl:w-[65%] py-4 px-5 border border-zinc-300 hover:border-zinc-400 rounded-xl flex items-center gap-3 font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100 active:scale-[0.99] text-sm sm:text-base bg-white shadow-sm"
                suppressHydrationWarning={true}
              >
                <PhoneIcon />
                {BusinessInfo.PrimaryContactNumber}
              </a>
              {/* Email Button */}
              <button
                onClick={handleCopy}
                className="w-full xl:w-[65%] bg-white hover:bg-zinc-100/80 active:scale-[0.99] text-zinc-900 font-bold rounded-xl flex items-center gap-3 py-4 px-5 cursor-pointer select-none transition-all duration-200 border border-zinc-200 shadow-sm relative"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span className="text-sm sm:text-base font-bold tracking-normal truncate">
                  {emailAddress}
                </span>
                {copied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs py-1.5 px-3 rounded-md shadow-lg font-normal">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
          {/* Business Address */}
          <div className="flex flex-col gap-5">
            <h2 className="text-sm font-light tracking-tight text-black/80 font-serif">
              Our Location
            </h2>
            <div className="w-full max-w-[420px]">
              <a
                href={BusinessInfo.GoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white border border-zinc-200 rounded-xl flex items-start gap-4 py-4.5 px-5 transition-all duration-200 hover:bg-zinc-50 active:scale-[0.99] shadow-sm"
              >
                <span className="mt-1 shrink-0">
                  <LocationIcon />
                </span>
                <span className="text-sm sm:text-base text-zinc-800 leading-relaxed font-semibold">
                  {BusinessInfo.Address}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Location & Hours */}
        <div className="flex flex-col gap-5 justify-start">
          {/* Business Hours */}
          <div className="flex flex-col gap-5">
            <h2 className="text-sm font-light tracking-tight text-black/80 font-serif">
              Business Hours
            </h2>
            <div className="w-full max-w-[420px] bg-white border border-zinc-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
                <span className="shrink-0">
                  <ClockIcon />
                </span>
                <span className="text-sm sm:text-base font-bold text-zinc-900">
                  Working Schedule
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {BusinessInfo.BusinessHours.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-0.5">
                    <span className={"text-sm sm:text-base font-bold text-zinc-900"}>
                      {item.Day}
                    </span>
                    <span className={"text-sm sm:text-base font-medium text-zinc-900"}>
                      {item.Timing}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Follow Me */}
          <div className="flex flex-col gap-5">
            <h2 className="text-sm font-light tracking-tight text-black/80 font-serif">
              Follow Us
            </h2>
            <div className="flex flex-wrap gap-3.5">
              {/* Facebook */}
              <Link
                href={BusinessInfo.SocialMedia.Facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-white border border-zinc-200 rounded-xl py-3 px-5 text-sm sm:text-base text-zinc-700 font-semibold transition-all duration-200 hover:text-zinc-900 hover:bg-zinc-50 active:scale-95 gap-2 shadow-sm"
              >
                <FacebookIcon />
                Facebook
              </Link>
              {/* Instagram */}
              {BusinessInfo.SocialMedia.Instagram && (
                <Link
                  href={BusinessInfo.SocialMedia.Instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white border border-zinc-200 rounded-xl py-3 px-5 text-sm sm:text-base text-zinc-700 font-semibold transition-all duration-200 hover:text-zinc-900 hover:bg-zinc-50 active:scale-95 gap-2 shadow-sm"
                >
                  <InstagramIcon />
                  Instagram
                </Link>
              )}

              {/* LinkedIn */}
              {BusinessInfo.SocialMedia.Linkedin && (
                <Link
                  href={BusinessInfo.SocialMedia.Linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white border border-zinc-200 rounded-xl py-3 px-5 text-sm sm:text-base text-zinc-700 font-semibold transition-all duration-200 hover:text-zinc-900 hover:bg-zinc-50 active:scale-95 gap-2 shadow-sm"
                >
                  <LinkedinIcon />
                  LinkedIn
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <div className="relative z-10 flex flex-col gap-5 items-start w-full rounded-2xl">
          <div className="glass-content flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-xl md:text-2xl 2xl:text-3xl ">
                Send Us A Message
              </h3>
              <p className="w-full md:w-[80%] font-sans text-base md:text-[18px] font-medium text-black/70">
                Have a question or need assistance? Fill out the form below and our
              </p>
            </div>

            <div className="w-full">
              <ContactForm isGlass={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
