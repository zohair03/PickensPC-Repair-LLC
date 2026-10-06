import BusinessInfo from "@/cms/business Info/businessInfo";

const MapSection = () => {
  // Replace with your actual coordinates
  const lat = 43.0642;
  const lng = -88.1235;
  const zoom = 14;
  const businessName = "RN Infotech";

  return (
    <div className="p-0 w-full">
      <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[450px]">
        <iframe
          src={BusinessInfo.SocialMedia.GMB}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${businessName} Location`}
        />
      </div>
    </div>
  );
};

export default MapSection;