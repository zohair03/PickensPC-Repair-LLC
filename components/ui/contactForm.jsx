"use client";
import { useState } from "react";
import PrimaryBtn from "./buttons/primaryBtn";

// Success Icon Component
const SuccessIcon = () => (
  <svg
    className="w-6 h-6 text-green-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Error Icon Component
const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-red-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

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

const ContactForm = ({ isGlass = false, submitUrl = '' }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear status when user starts typing
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Input classes based on glass mode
  const inputBaseClasses = isGlass
    ? "glass-input rounded-md p-3 md:p-4 text-base md:text-lg font-medium outline-none"
    : "border rounded-md p-3 md:p-4 text-base md:text-lg font-medium placeholder-[#2d3a4a] outline-none transition-all duration-300";

  const getInputErrorClasses = (fieldName) => {
    if (isGlass) return inputBaseClasses;

    if (fieldName === "email") {
      return `${inputBaseClasses} ${status.type === "error" && !formData.email
          ? "border-red-400 focus:border-red-500 bg-red-50"
          : status.type === "error" && formData.email && !validateEmail(formData.email)
            ? "border-red-400 focus:border-red-500 bg-red-50"
            : "border-[#9aa1ad] focus:border-primary"
        }`;
    }

    return `${inputBaseClasses} ${status.type === "error" && !formData[fieldName]
        ? "border-red-400 focus:border-red-500 bg-red-50"
        : "border-[#9aa1ad] focus:border-primary"
      }`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4 w-full">
      {/* Status Message */}
      {status.message && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border-l-4 animate-slideIn ${isGlass
              ? status.type === "success"
                ? "bg-green-500/20 border-green-400 text-green-300"
                : "bg-red-500/20 border-red-400 text-red-300"
              : status.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
        >
          {status.type === "success" ? <SuccessIcon /> : <ErrorIcon />}
          <span className="font-medium text-sm md:text-base">{status.message}</span>
        </div>
      )}

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="*Name:"
        value={formData.name}
        onChange={handleChange}
        className={`w-full ${getInputErrorClasses("name")}`}
      />

      {/* Email & Phone */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <input
          type="email"
          name="email"
          placeholder="*Email:"
          value={formData.email}
          onChange={handleChange}
          className={`w-full sm:w-1/2 ${getInputErrorClasses("email")}`}
        />
        <input
          type="tel"
          name="phone"
          placeholder="*Phone:"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full sm:w-1/2 ${getInputErrorClasses("phone")}`}
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="*Message:"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        className={`w-full ${getInputErrorClasses("message")} resize-none`}
      />

      {/* Button */}
      <div className="flex justify-center mt-2 md:mt-4">
        <PrimaryBtn
          type="submit"
          btnText={
            isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner />
                Sending...
              </span>
            ) : (
              "Send Message"
            )
          }
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default ContactForm;
