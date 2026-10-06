import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import { ServicesHeroContent, ServicesPageCardsContent } from "@/cms/content/content";
import Services from "@/components/sections/servicesSection";

export const metadata = {
    title: "Services | Pickens PC Repair",
    description: "Computer reparing shop and refurbhish laptop selling",
};

const ServicesPage = () => {
    return (
        <>
            <SubpageHero content={ServicesHeroContent}/>
            <Services content={ServicesPageCardsContent}/>
        </>
    );
};

export default ServicesPage;