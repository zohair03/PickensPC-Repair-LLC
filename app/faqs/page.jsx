import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import Faqs from "@/components/sections/faqSection";
import { FaqsHeroContent, FaqsPageContent } from "@/cms/content/content";

export const metadata = {
    title: "FAQs | Pickens PC Repair",
    description: "Computer reparing shop and refurbhish laptop selling",
};

const FAQs = () => {
    return (
        <>
            <SubpageHero content={FaqsHeroContent} />
            <Faqs isImage={false} faqs={FaqsPageContent.questions} content={FaqsPageContent} />
        </>
    );
};

export default FAQs;