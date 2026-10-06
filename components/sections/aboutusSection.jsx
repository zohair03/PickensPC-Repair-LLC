import Image from "next/image";
import PrimaryBtn from "../ui/buttons/primaryBtn";
import Label from "../ui/texts/Label";
import H2 from "../ui/texts/H2";
import { AboutUsContent } from "../../cms/content/content";

const AboutUs = () => {
  return (
    <section className="bg-[image:var(--color-section-bg-aboutus)] relative overflow-hidden py-8 px-6 sm:px-12 lg:px-16 lg:py-12 xl:px-30 2xl:px-50">
      
      <div className="relative z-10 flex flex-col gap-12 lg:gap-10 items-center">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center items-center w-full">
          <div className="flex flex-col gap-2">
            <Label label={AboutUsContent.label} />
            <H2 text={AboutUsContent.heading} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-10 xl:gap-16 w-full">
          {/* Text Content */}

          {/* Overlapping Images — Glass borders */}
          <div className="relative w-full lg:w-1/2 h-[260px] sm:max-lg:h-[370px] sm:max-lg:w-[90%] lg:h-[400px] xl:h-[460px] flex-shrink-0">
            {/* Background image - right side, top aligned */}
            <div className="absolute right-0 top-0 w-[72%] h-[95%] rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Image
                src={AboutUsContent.image2}
                alt="About background"
                fill
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Foreground image - left side, vertically centered over bg image */}
            <div className="absolute left-0 top-[13%] w-[45%] h-[70%] rounded-2xl overflow-hidden z-10"
              style={{
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <Image
                src={AboutUsContent.image1}
                alt="About foreground"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-1/2 text-center lg:text-left items-center lg:items-start">
            <p className="text-color-bodytext max-[380px]:text-sm text-lg 2xl:text-xl text-start font-sans">
              {AboutUsContent.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-[-20px] w-full md:w-fit">
          <PrimaryBtn custom={"w-[80%]"} href={AboutUsContent.href} btnText={AboutUsContent.btnText} />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
