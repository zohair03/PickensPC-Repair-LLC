import React from "react";
import Link from "next/link";
import Image from "next/image";

const socilLinks = () => {
  return (
    <div className="flex gap-4 mt-2">
      <Link
        href=""
        target="_blank"
        className="transition-transform duration-600 hover:-translate-y-1 text-white hover:text-primary transition-colors flex flex-col items-center justify-center"
      >
        <Image
          src="/icons/just-dial-logo.webp"
          alt="Just Dial Logo"
          width={70}
          height={70}
          style={{ width: 'auto', height: 'auto' }}
          className=""
        />
      </Link>
    </div>
  );
};

export default socilLinks;
