"use client";
import PrimaryBtn from "../ui/buttons/primaryBtn";
import { useState } from "react";

const ContactPageSignUpSection = ({content}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "error" | ""

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setTimeout(() => setStatus(""), 2500);
      return;
    }

    console.log("Newsletter signup:", email);
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus(""), 3000);
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <section className="w-full px-4 sm:px-2 md:px-4 py-4">
      <div className="w-full bg-gradient-to-b from-white to-gray-200  border border-dashed border-gray-400 rounded-2xl px-6 sm:px-10 md:px-16 py-14 sm:py-16 md:py-20 flex flex-col items-center justify-center text-center">
        {/* Heading */}
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-zinc-900 tracking-tight">
          {content.heading}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-zinc-500 font-sans font-normal max-w-sm sm:max-w-xl leading-relaxed">
          {content.subHeading}
        </p>

        {/* Input + Button */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2.5 w-full max-w-md"
        >
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status) setStatus("");
            }}
            className={`flex-1 bg-white rounded-xl py-3.5 px-5 text-sm sm:text-base text-zinc-900 placeholder-zinc-400 font-sans font-medium outline-none border transition-colors duration-200 ${status === "error"
              ? "border-red-400 focus:border-red-500"
              : "border-zinc-200 focus:border-zinc-400"
              }`}
          />
          {/* <button
            type="submit"
            className="bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98] text-white text-sm sm:text-base font-semibold font-sans rounded-xl py-3.5 px-6 transition-all duration-200 cursor-pointer shrink-0"
          >
            Sign up
          </button> */}

          {/* Button */}
          <div className="flex justify-center">
            <PrimaryBtn
              type="submit"
              btnText={
                isLoading ? (
                  <span className="flex items-center gap-2">
                    <LoadingSpinner />
                    Sending...
                  </span>
                ) : (
                  content.cta
                )
              }
              custom="rounded-xl min-h-[54px]"
              disabled={isLoading}
            />
          </div>

        </form>

        {/* Status Message */}
        {status === "success" && (
          <p className="mt-4 text-sm text-green-600 font-medium font-sans animate-[fadeIn_0.3s_ease-out]">
            Thanks for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-500 font-medium font-sans animate-[fadeIn_0.3s_ease-out]">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
};

export default ContactPageSignUpSection;
