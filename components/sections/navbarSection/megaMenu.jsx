"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


const MegaMenu = ({ items, isClosing, navbarBottom, onMouseEnter, onMouseLeave }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  
  const rowHeight = 155;
  const visibleRows = 2;
  const peekAmount = 60;

  const totalRows = Math.ceil(items.length / 3);
  const needsScroll = totalRows > visibleRows;

  const maxHeight = needsScroll
    ? rowHeight * visibleRows + peekAmount
    : "auto";

  return createPortal(
    <div
      style={{ top: navbarBottom }}
      className={`liquid-glass-strong-light backdrop-blur-[5px]! mt-[-5px] mx-2 rounded-b-xl inset-x-0 fixed left-0 z-[45] ${
        isClosing ? "animate-slideUp" : "animate-slideDown"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        {/* Scrollable container with dynamic max height */}
        <div
          className="overflow-y-auto px-10 xl:px-40 py-10 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
          style={{
            maxHeight: needsScroll ? `${maxHeight}px` : "auto",
          }}
        >
          <div className="grid grid-cols-3 gap-x-6 gap-y-6">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="transition-transform duration-400 hover:-translate-y-2 hover:shadow-xl flex items-start gap-6 group rounded-xl p-3 transition-colors bg-white transition-all ease-in-out duration-600"
              >
                <div className="flex-shrink-0 w-[95px] h-[110px] relative rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-serif text-left text-gray-900 text-base leading-8 uppercase">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 font-sans text-sm leading-5">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator - only shows when there are more cards below */}
        {needsScroll && (
          <div className="flex justify-center items-center py-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex flex-col items-center gap-1 text-white/60">
              <p className="text-sm text-white font-medium">Scroll for more</p>
              <svg
                className="w-4 h-4 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default MegaMenu;