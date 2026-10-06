"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import TopBar from "./topBar";
import NavLinks from "./navLinks";
import MegaMenu from "./megaMenu";
import MobileMenu from "./mobileMenu";
import PrimaryBtn from "../../ui/buttons/primaryBtn";
import CallButton from "../../ui/buttons/callButton";
import TertiaryBtn from "../../ui/buttons/TertiaryBtn";
import { aboutLinks, servicesLinks } from "./navData";
import BusinessInfo from "../../../cms/business Info/businessInfo"
import { AboutUsContent } from "../../../cms/content/content";
import { createClient } from '@/lib/supabase/client';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [megaClosing, setMegaClosing] = useState(false);
  const [navbarBottom, setNavbarBottom] = useState(0);
  const navbarRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setActiveMega(null);
    setMegaClosing(false);
    setMenuOpen(false);
  }, [pathname]);


  const updateNavbarBottom = () => {
    if (navbarRef.current) {
      const rect = navbarRef.current.getBoundingClientRect();
      setNavbarBottom(rect.bottom);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateNavbarBottom();
    }, 100);

    window.addEventListener("scroll", updateNavbarBottom);
    window.addEventListener("resize", updateNavbarBottom);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", updateNavbarBottom);
      window.removeEventListener("resize", updateNavbarBottom);
    };
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 300);
    } else {
      setMenuOpen(true);
    }
  };

  const openMega = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    updateNavbarBottom();
    setMegaClosing(false);
    setActiveMega(name);
  };

  const closeMega = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaClosing(true);
      setTimeout(() => {
        setActiveMega(null);
        setMegaClosing(false);
      }, 300);
    }, 100);
  };

  const cancelClose = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaClosing(false);
    setActiveMega(name);
  };

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  const links = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about", mega: "about" },
    { title: "Services", href: "/services", mega: "services" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact Us", href: "/contact" },
  ];
  const adminlinks = [
    { title: "Dashboard", href: "/admin" },
    { title: "Appointments", href: "/admin/appointments" },
    { title: "Create New Appointments", href: "/admin/schedule" },
  ];

  return (
    <nav className="">
      <div
        className="top-0 inset-x-0 fixed z-50 font-sans"
        ref={navbarRef}
      >
        {/* Row 1: TopBar (Responsive logic inside TopBar) */}
        <TopBar menuOpen={menuOpen} toggleMenu={toggleMenu} />

        {/* Row 2 (Desktop) / Rows 2 & 3 (Mobile) */}
        <div className="// liquid-glass-strong-light backdrop-blur-[5px]! bg-black/20 mx-0 relative px-4 md:px-16 2xl:px-30 py-4 lg:py-4">

          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center" onMouseLeave={closeMega}>
            {/* Logo */}
            <Link href="/">
              {BusinessInfo.isLogo ? (<Image
                src={BusinessInfo.Logo}
                alt="Repair IT MSP Logo"
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />) : (<p className="text-2xl font-bold leading-none text-center tracking-widest text-white tracking-widest uppercase">Pickens<br />PC Repair</p>)}
            </Link>

            {/* Desktop Nav Links */}
            <div className="flex-1 flex justify-center">
              <NavLinks activeMega={activeMega} setActiveMega={openMega} links={pathname.startsWith("/admin") ? adminlinks : links} />
            </div>

            {/* CTA Button */}
            {pathname.startsWith("/admin") ? (
              <PrimaryBtn onClick={handleLogout} btnText="Logout" type={"button"} />
            ) : (<PrimaryBtn btnText="Schedule Now" href="/book" />)}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex justify-between items-center gap-3">
            {/* Mobile Logo (Centered) */}
            <Link href="/" className="flex justify-center">
              {BusinessInfo.isLogo ? (<Image
                src={BusinessInfo.Logo}
                alt={`${BusinessInfo.Name} Logo`}
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />) : (<p className="text-xl font-bold leading-none text-center tracking-widest text-white tracking-widest uppercase">Pickens<br />PC Repair</p>)}
            </Link>

            {/* Mobile Buttons (Side by Side) */}
            <div className="flex flex-col items-center justify-center gap-3">
              <CallButton btnText="Call Us Now" custom={{ paddingInline: 'calc(var(--spacing) * 2)', width: '175px' }} />
              {/* <TertiaryBtn btnText="Contact Us" custom="sm:w-fit" /> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <MobileMenu closeMenu={toggleMenu} isClosing={menuClosing} />
        )}
      </div>

      {/* Mega Menus Portals */}
      {activeMega === "about" && (
        <MegaMenu
          items={aboutLinks}
          isClosing={megaClosing}
          navbarBottom={navbarBottom}
          onMouseEnter={() => cancelClose("about")}
          onMouseLeave={closeMega}
        />
      )}
      {activeMega === "services" && (
        <MegaMenu
          items={servicesLinks}
          isClosing={megaClosing}
          navbarBottom={navbarBottom}
          onMouseEnter={() => cancelClose("services")}
          onMouseLeave={closeMega}
        />
      )}
    </nav>
  );
};

export default Navbar;