"use client";
import WhyCardContent from "./WhyCardContent";

const WhyCard = ({ card, index, isVisible }) => (
  <div
    className={`liquid-glass-card-light iridescent-border border border-black/14 transition-transform duration-600 hover:-translate-y-2 w-full xl:w-1/3 p-4 pb-6 rounded-2xl flex items-start gap-4 transition-all duration-700 ease-out transform
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="glass-content flex items-start gap-4 w-full">
      <WhyCardContent card={card} />
    </div>
  </div>
);

export default WhyCard;