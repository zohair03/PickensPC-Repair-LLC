import SubpageHero from "@/components/sections/subpageHero";
import ContactInfo from "@/components/ui/ContactInfo";
import { ContactHeroContent, ContactFaqContent } from "@/cms/content/content";
import Faqs from "@/components/sections/faqSection";

export const metadata = {
    title: "Contact Us | Pickens PC Repair",
    description: "Computer reparing shop and refurbhish laptop selling",
};

const Contact = () => {
    return (
        <>
            <SubpageHero content={ContactHeroContent} isCta2={false} isClickToCall={true}/>
            <ContactInfo />
            <Faqs bgColor="bg-section-bg" isButton={false} isImage={false} content={ContactFaqContent} />
        </>
    );
};

export default Contact;