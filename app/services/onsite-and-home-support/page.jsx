import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import TextAndImageSection from "@/components/sections/textAndImageSection";
import FinalCta from "@/components/sections/finalCtaSection";
import Faqs from "@/components/sections/faqSection";
import { OnSiteHomeSupportMetaContent, OnSiteHomeSupportHeroContent, OnSiteHomeSupportSection1, OnSiteHomeSupportSection2, OnSiteHomeSupportSection3, OnSiteHomeSupportFaqsContent, OnSiteHomeSupportFinalCtaContent } from "@/cms/content/indiviualServicesContent";


export const metadata = {
    title: OnSiteHomeSupportMetaContent.metaTitle,
    description: OnSiteHomeSupportMetaContent.metaDescription,
    keywords: OnSiteHomeSupportMetaContent.metaKeywords,
};

const OnSiteHomeSupport = () => {
    return (
        <>
            <SubpageHero content={OnSiteHomeSupportHeroContent}/>
            <TextAndImageSection content={OnSiteHomeSupportSection1}/>
            <TextAndImageSection bgColor="bg-section-bg" content={OnSiteHomeSupportSection2} imageLeft={true}/>
            <TextAndImageSection content={OnSiteHomeSupportSection3}/>
            <Faqs bgColor="bg-section-bg" content={OnSiteHomeSupportFaqsContent} />
            <FinalCta content={OnSiteHomeSupportFinalCtaContent}/>
        </>
    );
};

export default OnSiteHomeSupport;