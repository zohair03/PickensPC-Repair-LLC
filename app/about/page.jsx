import React from "react";
import TextAndImageSection from "@/components/sections/textAndImageSection";
import SubpageHero from "@/components/sections/subpageHero";
import { Abouthero, AboutSection1, AboutSection2 } from "@/cms/content/content";


export const metadata = {
    title: "About Us | Pickens PC Repair",
    description: "Computer reparing shop and refurbhish laptop selling",
};

const AboutUs = () => {
    return (
        <>
            <SubpageHero content={Abouthero}/>
            <TextAndImageSection content={AboutSection1}/>
            <TextAndImageSection bgColor="bg-section-bg" content={AboutSection2} imageLeft={true}/>
        </>
    );
};

export default AboutUs;