import TertiaryBtn from "../buttons/TertiaryBtn";

const ServiceCardContent = ({ service }) => {
  return (
    <div className="liquid-glass-strong-light absolute bottom-0 left-0 right-0 p-5 mx-3 mb-3 rounded-xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-left font-serif max-[380px]:text-lg text-2xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-2xl 3xl:text-3xl leading-relaxed">
          {service.title}
        </h3>
        <p className="text-white/80 font-sans text-base leading-relaxed line-clamp-3">
          {service.description}
        </p>
        <TertiaryBtn href={service.href} btnText={service.btnText} custom={"mt-2"} />
      </div>
    </div>
  );
};

export default ServiceCardContent;

// style={{
//         background: 'rgba(0, 0, 0, 0.35)',
//         backdropFilter: 'blur(16px) saturate(1.4)',
//         WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
//         border: '1px solid rgba(255, 255, 255, 0.08)',
//         boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
//       }}