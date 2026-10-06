import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import TextAndImageSection from "@/components/sections/textAndImageSection";
import FinalCta from "@/components/sections/finalCtaSection";
import Faqs from "@/components/sections/faqSection";
import { DataRecoveryBackupMetaContent, DataRecoveryBackupHeroContent, DataRecoveryBackupSection1, DataRecoveryBackupSection2, DataRecoveryBackupSection3, DataRecoveryBackupFaqsContent, DataRecoveryBackupFinalCtaContent } from "@/cms/content/indiviualServicesContent";


export const metadata = {
    title: DataRecoveryBackupMetaContent.metaTitle,
    description: DataRecoveryBackupMetaContent.metaDescription,
    keywords: DataRecoveryBackupMetaContent.metaKeywords,
};

const DataBackupAndRecovery = () => {
    return (
        <>
            <SubpageHero content={DataRecoveryBackupHeroContent}/>
            <TextAndImageSection content={DataRecoveryBackupSection1}/>
            <TextAndImageSection bgColor="bg-section-bg" content={DataRecoveryBackupSection2} imageLeft={true}/>
            <TextAndImageSection content={DataRecoveryBackupSection3}/>
            <Faqs bgColor="bg-section-bg" content={DataRecoveryBackupFaqsContent} />
            <FinalCta content={DataRecoveryBackupFinalCtaContent}/>
        </>
    );
};

export default DataBackupAndRecovery;