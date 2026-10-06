import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import TextAndImageSection from "@/components/sections/textAndImageSection";
import FinalCta from "@/components/sections/finalCtaSection";
import Faqs from "@/components/sections/faqSection";
import { SystemUpgradesMetaContent, SystemUpgradesHeroContent, SystemUpgradesSection1, SystemUpgradesSection2, SystemUpgradesSection3, SystemUpgradesFaqsContent, SystemUpgradesFinalCtaContent } from "@/cms/content/indiviualServicesContent";


export const metadata = {
    title: SystemUpgradesMetaContent.metaTitle,
    description: SystemUpgradesMetaContent.metaDescription,
    keywords: SystemUpgradesMetaContent.metaKeywords,
};

const SystemTuneUpsAndUpgrades = () => {
    return (
        <>
            <SubpageHero content={SystemUpgradesHeroContent}/>
            <TextAndImageSection content={SystemUpgradesSection1}/>
            <TextAndImageSection bgColor="bg-section-bg" content={SystemUpgradesSection2} imageLeft={true}/>
            <TextAndImageSection content={SystemUpgradesSection3}/>
            <Faqs bgColor="bg-section-bg" content={SystemUpgradesFaqsContent} />
            <FinalCta content={SystemUpgradesFinalCtaContent}/>
        </>
    );
};

export default SystemTuneUpsAndUpgrades;