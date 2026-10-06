"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SubpageHero from "@/components/sections/subpageHero";
import { GalleryHeroContent, GalleryPageImage } from "@/cms/content/content";


const Gallery = () => {
    const { galleryImages } = GalleryPageImage;
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openImage = (index) => setSelectedIndex(index);
    const closeImage = () => setSelectedIndex(null);

    const goPrev = () =>
        setSelectedIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1,
        );

    const goNext = () =>
        setSelectedIndex((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1,
        );

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (selectedIndex === null) return;
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "Escape") closeImage();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex]);

    // Lock body scroll when lightbox open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedIndex]);

    return (
        <>
            <SubpageHero content={GalleryHeroContent} />
            <section className={`bg-[--color-section-bg] p-8 lg:py-12 lg:px-16`}>
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] rounded-2xl overflow-hidden cursor-pointer group"
                            onClick={() => openImage(index)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedIndex !== null && (
                    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
                        {/* Top Bar */}
                        <div className="flex justify-between items-center px-4 md:px-8 py-4 text-white">
                            {/* Counter */}
                            <p className="text-sm md:text-base font-medium">
                                {selectedIndex + 1} / {galleryImages.length}
                            </p>

                            {/* Close button */}
                            <button
                                onClick={closeImage}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Image Area */}
                        <div className="flex-1 flex items-center justify-center relative px-10 md:px-20">
                            {/* Prev Button */}
                            <button
                                onClick={goPrev}
                                className="absolute left-2 md:left-6 text-white hover:text-gray-300 transition-colors z-10 p-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            {/* Main Image */}
                            <div className="relative w-full max-w-4xl h-[55vh] sm:h-[65vh] md:h-[75vh]">
                                <Image
                                    src={galleryImages[selectedIndex].src}
                                    alt={galleryImages[selectedIndex].alt}
                                    fill
                                    sizes="90vw"
                                    className="object-contain"
                                />
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={goNext}
                                className="absolute right-2 md:right-6 text-white hover:text-gray-300 transition-colors z-10 p-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Click outside to close */}
                        <div className="absolute inset-0 z-[-1]" onClick={closeImage} />
                    </div>
                )}
            </section>
        </>
    );
};

export default Gallery;