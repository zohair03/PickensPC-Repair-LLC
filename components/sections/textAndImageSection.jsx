import Image from "next/image";
import PrimaryBtn from "../ui/buttons/primaryBtn";
import SecondaryBtn from "../ui/buttons/secondaryBtn";
import CallButton from "../ui/buttons/callButton";
import SocialLinks from "../ui/socialLinks";

const TextAndImage = ({ content, isCtaBtn=true, isClickToCall, customBtn, imageLeft = false, bgColor = "bg-white", socialLinks = false,
}) => {
  return (
    <section className={`${bgColor} p-8 lg:py-12 lg:px-16`}>
      <div
        className={`flex flex-col lg:flex-row ${imageLeft && "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}
      >
        <div className="w-full lg:w-1/2 flex flex-col items-center xl:items-start gap-5">
          <div className="flex flex-col gap-2 text-center lg:text-left items-center lg:items-start">
            <p className="label font-semibold text-center md:text-left tracking-widest">
              {content.label}
            </p>
            <h2 className="text-center lg:text-start max-[380px]:text-2xl text-h2 md:text-3xl lg:text-4xl font-serif sm:text-3xl max-[380px]:leading-12 leading-13 sm:leading-11 lg:leading-16">
              {content.heading}
            </h2>
          </div>
          <div className="font-sans max-[380px]:text-sm text-lg 2xl:text-xl text-start font-sans">
            {content.description}
          </div>
          {isCtaBtn ? (
            <div className="flex flex-col items-center justify-center lg:justify-start sm:flex-row gap-4 w-full">
              {isClickToCall ? (
                <CallButton custom={customBtn} btnText={content.cta} />
              ) : (
                <PrimaryBtn href={content.href} btnText={content.cta} />
              )}
            </div>
          ) : null}

          {socialLinks && (
            <SocialLinks/>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={content.image}
              alt="Service Detail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextAndImage;
