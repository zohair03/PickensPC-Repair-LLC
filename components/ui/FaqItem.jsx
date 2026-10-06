"use client";
import FaqItemContent from "./FaqItemContent";

const FaqItem = ({ faq, isOpen, onToggle, index, isVisible }) => (
  <div
    className={`liquid-glass-card-light iridescent-border rounded-xl px-5 py-4 md:px-6 md:py-5 mb-3 cursor-pointer transition-all duration-700 ease-out transform
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    style={{ transitionDelay: `${index * 100}ms` }}
    onClick={onToggle}
  >
    <div className="glass-content flex justify-between items-start gap-4">
      <FaqItemContent faq={faq} isOpen={isOpen} />
      <div className="bg-plus-bg liquid-glass-strong-light btn-press hover:scale-105 active:scale-95 flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full  flex items-center justify-center transition-transform duration-300">
        <span className="text-plus-icon text-xl font-light leading-none">
          {isOpen ? "−" : "+"}
        </span>
      </div>
    </div>
  </div>
);

export default FaqItem;