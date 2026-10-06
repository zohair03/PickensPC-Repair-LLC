import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import TextAndImageSection from "@/components/sections/textAndImageSection";
import FinalCta from "@/components/sections/finalCtaSection";
import Faqs from "@/components/sections/faqSection";
import { ComputerNetworkMetaContent, ComputerNetworkHeroContent, ComputerNetworkSection1, ComputerNetworkSection2, ComputerNetworkSection3, ComputerNetworkFaqsContent, ComputerNetworkFinalCtaContent } from "@/cms/content/indiviualServicesContent";


export const metadata = {
    title: ComputerNetworkMetaContent.metaTitle,
    description: ComputerNetworkMetaContent.metaDescription,
    keywords: ComputerNetworkMetaContent.metaKeywords,
};

const ComputerNetworking = () => {
    return (
        <>
            <SubpageHero content={ComputerNetworkHeroContent}/>
            <TextAndImageSection content={ComputerNetworkSection1}/>
            <TextAndImageSection bgColor="bg-section-bg" content={ComputerNetworkSection2} imageLeft={true}/>
            <TextAndImageSection content={ComputerNetworkSection3}/>
            <Faqs bgColor="bg-section-bg" content={ComputerNetworkFaqsContent} />
            <FinalCta content={ComputerNetworkFinalCtaContent}/>
        </>
    );
};

export default ComputerNetworking;