import Image from "next/image";

const StarRating = () => (
  <div className="flex gap-1 w-fit">
    {[...Array(5)].map((_, i) => (
      <Image
        key={i}
        src="/icons/reviews-star.svg"
        alt="star"
        width={18}
        height={18}
        className="color-review-star md:w-[20px] md:h-[20px]"
      />
    ))}
  </div>
);

const ReviewCardContent = ({ review }) => (
  <>
    <StarRating />
    <p className="text-color-bodytext/80 w-full sm:w-[85%] text-lg md:text-base">{review.review}</p>
    <p className="text-color-bodytext/80 font-bold text-lg md:text-base">- {review.name}</p>
  </>
);

export default ReviewCardContent;