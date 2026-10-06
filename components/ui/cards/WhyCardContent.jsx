import Image from "next/image";
import Link from "next/link";

const WhyCardContent = ({ card }) => (
  <>
    <div className="bg-why-card-icon-bg rounded-xl p-3 flex-shrink-0 flex items-center justify-center">
      <Image
        src={card.icon}
        alt="Icon"
        width={30}
        height={30}
        className="[filter:var(--color-why-card-icon)] md:w-[40px] md:h-[40px]"
      />
    </div>
    <div className="flex flex-col gap-3 items-start">
      <p className="max-[380px]:text-sm text-color-bodytext/80 text-base w-95/100 md:text-lg lg:text-xl xl:text-lg 2xl:text-xl">
        {card.text}
      </p>
      <Link
        href={card.href}
        className="flex justify-center items-center text-primary font-bold font-sans text-base md:text-base"
      >
        {card.linkText}
        <Image
          src="/icons/right-icon.svg"
          alt="Arrow Icon"
          width={16}
          height={16}
          className="[filter:var(--color-icon-primary)]"
        />
      </Link>
    </div>
  </>
);

export default WhyCardContent;