import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import TextAndImageSection from "@/components/sections/textAndImageSection";
import FinalCta from "@/components/sections/finalCtaSection";
import Faqs from "@/components/sections/faqSection";
import { PCMacRepairsMetaContent, PCMacRepairsHeroContent, PCMacRepairsSection1, PCMacRepairsSection2, PCMacRepairsSection3, PCMacRepairsFaqsContent, PCMacRepairsFinalCtaContent } from "@/cms/content/indiviualServicesContent";


export const metadata = {
    title: PCMacRepairsMetaContent.metaTitle,
    description: PCMacRepairsMetaContent.metaDescription,
    keywords: PCMacRepairsMetaContent.metaKeywords,
};

const PCAndMacRepairs = () => {
    return (
        <>
            <SubpageHero content={PCMacRepairsHeroContent}/>
            <TextAndImageSection content={PCMacRepairsSection1}/>
            <TextAndImageSection bgColor="bg-section-bg" content={PCMacRepairsSection2} imageLeft={true}/>
            <TextAndImageSection content={PCMacRepairsSection3}/>
            <Faqs bgColor="bg-section-bg" content={PCMacRepairsFaqsContent} />
            <FinalCta content={PCMacRepairsFinalCtaContent}/>
        </>
    );
};

export default PCAndMacRepairs;