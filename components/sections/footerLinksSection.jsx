import Link from "next/link";
import Image from "next/image";
import CallButton from "../ui/buttons/callButton";
import BusinessInfo from "@/cms/business Info/businessInfo";

// Foxframe Web Icon
const FoxframeWebLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#CECDCD" viewBox="0 0 631 477" height="24px" width="24px" >
    <path d="M 94.50,378.25 L 79.75,384.75 L 61.00,397.50 L 46.75,408.75 L 20.50,433.75 L 9.75,446.75 L 14.50,447.50 L 64.25,447.75 L 69.75,428.50 L 75.00,414.25 L 82.50,398.25 Z M 443.75,296.50 L 444.00,296.50 L 444.25,296.25 L 445.00,296.25 L 445.25,296.50 L 446.00,296.50 L 446.25,296.75 L 447.50,296.75 L 447.75,297.00 L 448.25,297.00 L 448.50,297.25 L 449.25,297.25 L 449.50,297.50 L 450.75,297.75 L 451.00,298.00 L 452.25,298.50 L 453.50,299.50 L 453.75,299.50 L 454.75,300.50 L 455.00,300.50 L 456.25,302.00 L 456.25,302.25 L 456.50,302.50 L 456.50,303.50 L 456.25,303.75 L 456.25,304.25 L 456.00,304.50 L 455.50,305.75 L 454.75,306.50 L 454.50,307.25 L 454.00,307.75 L 453.75,307.75 L 453.50,308.00 L 453.50,308.25 L 453.25,308.50 L 453.00,308.50 L 452.00,309.50 L 451.50,309.50 L 450.75,310.00 L 448.75,310.00 L 448.50,309.75 L 448.25,309.75 L 445.75,307.25 L 445.75,307.00 L 445.25,306.50 L 445.25,306.25 L 444.50,305.00 L 444.50,304.50 L 443.75,303.25 L 443.75,301.50 L 443.50,301.25 L 443.50,299.00 L 443.25,298.75 L 443.25,297.50 L 443.50,297.25 L 443.50,296.75 Z M 389.75,279.50 L 391.75,282.75 L 406.00,297.50 L 416.50,311.00 L 424.25,317.00 L 432.50,320.25 L 474.25,326.50 L 473.25,323.50 L 462.00,305.50 L 456.25,297.50 L 450.75,293.00 L 427.00,286.50 Z M 614.75,354.25 L 528.50,310.50 L 504.00,245.25 L 384.75,181.00 L 305.75,66.25 L 197.00,201.75 L 147.75,279.25 L 160.75,279.50 L 71.75,364.25 L 150.50,343.00 L 105.50,399.50 L 83.00,470.00 L 110.25,448.00 L 185.25,448.50 L 275.75,350.50 L 202.50,360.25 L 225.00,328.75 L 284.50,277.25 L 357.75,248.25 L 331.50,232.00 L 301.00,153.50 L 279.50,205.50 L 280.00,251.25 L 256.25,260.50 L 260.50,191.00 L 304.00,108.25 L 388.00,246.00 L 471.25,272.75 L 499.75,331.25 L 562.00,357.50 L 575.75,380.00 L 537.50,406.75 L 429.00,376.50 L 352.00,376.50 L 309.25,396.25 L 337.75,403.50 L 285.25,449.50 L 351.75,450.00 L 401.00,419.50 L 456.25,409.75 L 530.00,417.50 L 491.50,447.25 L 574.25,409.50 Z M 506.50,63.50 L 453.50,93.50 L 381.00,140.50 L 392.75,161.00 L 442.50,182.75 L 437.25,172.25 L 423.00,161.75 L 441.25,139.50 L 470.50,112.00 L 445.50,181.75 L 447.75,186.25 L 467.25,197.75 Z" fillRule="evenodd"/>
  </svg>
);

// Instagram Icon
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 shrink-0 text-zinc-600"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Facebook Icon
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 shrink-0 text-zinc-600"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// LinkedIn Icon
const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 shrink-0 text-zinc-600"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const quickLinks1 = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "FAQs", href: "/faqs" },
];

const quickLinks2 = [
  { title: "Contact Us", href: "/contact" },
  { title: "Services", href: "/services" },
  { title: "Gallery", href: "/gallery" },
];

const servicesLinks1 = [
  { title: "PC & Mac Repairs", href: "/services/pc-and-mac-repairs" },
  { title: "On-Site & In-Home Support", href: "/services/onsite-and-home-support" },
  { title: "Virus & Malware Removal", href: "/services/virus-and-malware-removal" },
  { title: "Data Backup & Recovery", href: "/services/data-backup-and-recovery" },
  { title: "Computer Networking", href: "/services/computer-networking" },
  { title: "System Tune-Ups & Upgrades", href: "/services/system-tune-ups-and-upgrades" },
];

const FooterLinks = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-footer-bg via-footer-bg to-[#071a40] text-white font-sans">
      {/* Floating orbs */}
      <div className="floating-orb floating-orb-1 top-[20%] left-[5%] opacity-50" />
      <div className="floating-orb floating-orb-3 bottom-[15%] right-[8%] opacity-40" />

      {/* Main Footer */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-6 px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        {/* Col 1 - Logo + CTA + Social */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-1/4">
          {/* Logo */}
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="logo-glow text-5xl lg:text-3xl xl:text-5xl text-red-500 flex flex-col items-center"
            >
              {BusinessInfo.isLogo ? (
                <Image
                  src={BusinessInfo.Logo}
                  alt="Repair IT MSP Logo"
                  width={100}
                  height={100}
                  className="object-cover rounded-lg"
                />
              ) : (
                <p className="text-3xl font-bold leading-none text-center tracking-widest text-white uppercase">
                  Pickens<br />PC Repair
                </p>
              )}
            </Link>
          </div>

          {/* CTA Button */}
          <div>
            <CallButton btnText="Call Us Now" />
          </div>

          {/* Social Icons */}
          <div className="mt-4 flex gap-7">
            <a className="hover:scale-120 active:scale-95 transition-all duration-200" href={BusinessInfo.SocialMedia.Facebook} target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a className="hover:scale-120 active:scale-95 transition-all duration-200" href={BusinessInfo.SocialMedia.Instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a className="hover:scale-120 active:scale-95 transition-all duration-200" href={BusinessInfo.SocialMedia.Linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {/* Col 2 - Quick Links — Glass Panel */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4 liquid-glass-card rounded-2xl p-6">
          <div className="glass-content flex flex-col gap-4">
            <h4 className="text-white text-left text-base lg:text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-3">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="flex flex-col gap-3">
                {quickLinks1.map((link) => (
                  <Link
                    key={link.title + link.href}
                    href={link.href}
                    className="text-footer-form-text/80 hover:text-footer-form-text-hover text-sm md:text-base transition-colors border-b border-white/10 pb-2"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {quickLinks2.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-footer-form-text/80 hover:text-footer-form-text-hover text-sm md:text-base transition-colors border-b border-white/10 pb-2"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Col 3 - Services — Glass Panel */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4 liquid-glass-card rounded-2xl p-6">
          <div className="glass-content flex flex-col gap-4">
            <h4 className="text-white text-left text-base lg:text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-3">
              Services
            </h4>
            <div className="">
              <div className="flex flex-col gap-3">
                {servicesLinks1.map((link) => (
                  <Link
                    key={link.title + link.href}
                    href={link.href}
                    className="text-footer-form-text/80 hover:text-footer-form-text-hover text-sm md:text-base transition-colors border-b border-white/10 pb-2"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Col 4 - Contact Us — Glass Panel */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4 liquid-glass-card rounded-2xl p-6">
          <div className="glass-content flex flex-col gap-4">
            <h4 className="text-white text-left text-base lg:text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-3">
              Contact Us
            </h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${BusinessInfo.PrimaryContactNumber}`} className="text-footer-form-text/80 hover:text-footer-form-text-hover text-sm md:text-base transition-colors">
                {BusinessInfo.PrimaryContactNumber}
              </a>
              <a href={`mailto:${BusinessInfo.Email}`} className="text-footer-form-text/80 hover:text-footer-form-text-hover text-sm md:text-base transition-colors">
                {BusinessInfo.Email}
              </a>
              <a
                href={BusinessInfo.GoogleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-form-text/80 hover:text-footer-form-text-hover text-sm md:text-base leading-relaxed transition-colors"
              >
                {BusinessInfo.Address}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <div className="relative z-10 border-t border-white/10 px-6 sm:px-10 lg:px-16 py-6 flex flex-col items-center gap-2 text-center">
        <p className="text-white/70 text-xs sm:text-sm">
          © 2026 &nbsp; The content on this website is owned by us and our
          licensors
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
          <Link href="/privacy-policy" className="hover:text-footer-form-text-hover transition-colors">
            Privacy Policy
          </Link>
          <Link href="/privacy-policy" className="hover:text-footer-form-text-hover transition-colors">
            Do Not Sell/Share My Personal Information
          </Link>
          <Link href="/admin" className="hover:text-footer-form-text-hover transition-colors">
            Admin Login
          </Link>
        </div>
      </div> */}
      
      <div className="xl:w-full relative z-10 border-t border-white/10 px-6 sm:px-10 lg:px-16 py-6 flex flex-col xl:flex-row items-center xl:justify-between gap-2 text-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-footer-text mt-1">
          <Link href={"/privacy-policy"} className="hover:text-footer-text-hover transition-colors">
            Privacy Policy
          </Link>
          <Link href={"/privacy-policy"} className="hover:text-footer-text-hover transition-colors">
            Do Not Sell/Share My Personal Information
          </Link>
          <Link href="/admin" className="hover:text-footer-form-text-hover transition-colors">
            Admin Login
          </Link>
        </div>
        <p className="text-footer-text text-xs sm:text-sm">
          © 2026 &nbsp; The content on this website is owned by us and our
          licensors
        </p>
        <div className="mt-2 xl:mt-0 flex gap-2 justify-center align-middle items-center">
          <FoxframeWebLogo/>
          <p className="text-xs sm:text-sm font-semibold text-white/80">Built by <Link href={"https://www.instagram.com/foxframe.web/"} target="_blank" className="underline underline-offset-3 decoration-white/40 hover:text-white hover:decoration-white/90  transition-colors duration-300 delay-150 ">Foxframe Web</Link></p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLinks;
