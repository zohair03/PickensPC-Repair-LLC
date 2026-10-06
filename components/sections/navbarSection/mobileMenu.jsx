"use client";
import Link from "next/link";
import CallButton from "../../ui/buttons/callButton";
import PrimaryBtn from "@/components/ui/buttons/primaryBtn";
import { useState } from "react";
import { aboutLinks, servicesLinks } from "./navData";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from '@/lib/supabase/client';


const MobileMenu = ({ closeMenu, isClosing }) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <>
      {/* Backdrop - click outside to close */}
      <div className="fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm" onClick={closeMenu} />

      {/* Menu Panel — Liquid Glass */}
      <div
        className={`liquid-glass-strong-light backdrop-blur-[1px]! mx-2 mt-[-5px] z-[-1] rounded-b-xl relative lg:hidden flex flex-col items-center gap-2 py-8 text-white font-semibold text-lg ${isClosing ? "animate-slideUp" : "animate-slideDown"
          }`}
        style={{ maxHeight: "75vh", overflowY: "auto" }}
      >


        {pathname.startsWith("/admin") ? (
          <>
            <Link
              href="/admin"
              className="w-full text-center py-3 text-navbar-link hover:text-navbar-link-hover transition-colors"
            >
              DASHBOARD
            </Link>
            <Link
              href="/admin/appointments"
              className="w-full text-center py-3 text-navbar-link hover:text-navbar-link-hover transition-colors"
            >
              APPOINTMENTS
            </Link>
            <Link
              href="/admin/schedule"
              className="w-full text-center py-3 text-navbar-link hover:text-navbar-link-hover transition-colors"
            >
              CREATE NEW APPOINTMENTS
            </Link>
          </>
        ) : (
          <>
            {/* Home */}
            <Link
              href="/"
              className="text-navbar-link hover:text-navbar-link-hover w-fit text-center py-3 transition-colors"
            >
              HOME
            </Link>

            {/* About - link + separate arrow toggle */}
            <div className="w-full">
              <div className="flex items-center justify-center gap-2">
                <Link
                  href="/about"
                  className="text-navbar-link hover:text-navbar-link-hover py-3 transition-colors"
                >
                  ABOUT
                </Link>
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="p-2 hover:text-navbar-link-hover transition-colors"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* About Sublinks */}
              {aboutOpen && (
                <div className="flex flex-col items-center gap-2 pb-3 animate-slideDown">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="text-base font-normal text-navbar-link hover:text-navbar-link-hover transition-colors py-1"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services - link + separate arrow toggle */}
            <div className="w-full">
              <div className="flex items-center justify-center gap-2">
                <Link
                  href="/services"
                  onClick={closeMenu}
                  className="py-3 text-navbar-link hover:text-navbar-link-hover transition-colors"
                >
                  SERVICES
                </Link>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="p-2 hover:text-navbar-link-hover transition-colors"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Services Sublinks */}
              {servicesOpen && (
                <div className="flex flex-col items-center gap-2 pb-3 animate-slideDown">
                  {servicesLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="text-base font-normal text-navbar-link hover:text-navbar-link-hover transition-colors py-1"
                    >
                      {link.title}
                    </Link>
                  ))}

                </div>
              )}
            </div>

            {/* Gallery */}
            <Link
              href="/gallery"
              className="w-full text-center py-3 text-navbar-link hover:text-navbar-link-hover transition-colors"
            >
              GALLERY
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="w-full text-center py-3 text-navbar-link hover:text-navbar-link-hover transition-colors"
            >
              CONTACT
            </Link>
          </>
        )}


        {/* CTA Button */}
        <div className="mt-4 mb-4">
          {pathname.startsWith("/admin") ? (
            <PrimaryBtn onClick={handleLogout} btnText="Logout" type={"button"} />
          ) : (<CallButton btnText="Schedule Now" />)}
        </div>

      </div>
    </>
  );
};

export default MobileMenu;