"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/sections/navbarSection/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide Navbar on /admin and all its subroutes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}