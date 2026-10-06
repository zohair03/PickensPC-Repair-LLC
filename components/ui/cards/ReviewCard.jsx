"use client";
import ReviewCardContent from "./ReviewCardContent";

const ReviewCard = ({ review, index, isVisible }) => (
  <div
    className={`transition-transform duration-400 hover:-translate-y-2 liquid-glass-card-light iridescent-border border border-black/14 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-xl max-[380px]:px-4 max-[380px]:py-8 px-8 py-8 md:py-10 lg:max-xl:px-0 text-center flex flex-col items-center justify-center gap-5 flex-shrink-0 transition-all duration-700 ease-out transform
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="glass-content flex flex-col items-center justify-center gap-5 w-full">
      <ReviewCardContent review={review} />
    </div>
  </div>
);

export default ReviewCard;