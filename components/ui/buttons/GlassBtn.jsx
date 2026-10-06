import React from "react";

export function GlassBtn({ children, className = "", ...props }) {
  return (
    <button
      className={`liquid-glass-strong-light min-w-[90%] md:min-w-[220px] min-h-[50px] font-serif font-extralight text-[12px] px-8 py-4 flex items-center gap-3 rounded-full py-3 px-8 text-sm font-medium cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}



