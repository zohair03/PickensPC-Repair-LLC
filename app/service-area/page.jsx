import React from "react";
import SubpageHero from "@/components/sections/subpageHero";
import { ServiceAreaheroContent } from "@/cms/content/content";


export const metadata = {
    title: "Service Area | Pickens PC Repair",
    description: "Computer reparing shop and refurbhish laptop selling",
};

const ServiceArea = () => {
    return (
        <>
            <SubpageHero isClickToCall={true} content={ServiceAreaheroContent}/>
        </>
    );
};

export default ServiceArea;