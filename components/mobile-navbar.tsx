"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MobileNavBarProps {
  data: Category[];
}

const MobileNavBar = ({ data }: MobileNavBarProps) => {
  const [nav, setNav] = useState(false);
  const pathName = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathName === `/category/${route.id}`,
  }));
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items

  return (
    <div className="mx-auto flex items-center ">
      {/* Mobile Navigation Icon */}
      <div
        onClick={handleNav}
        className="z-20 block hover:cursor-pointer md:hidden"
      >
        {nav ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        className={
          nav
            ? "fixed left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center bg-bannerColor duration-100 ease-in-out md:hidden"
            : "fixed bottom-0 right-[-100%] top-0 w-full duration-100 ease-in-out"
        }
      >
        <Link
          onClick={() => setNav(false)}
          href={"/"}
          className={cn(
            " text-4xl font-medium transition-colors hover:text-buttonColor2",
            pathName === `/`
              ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
              : "text-muted",
          )}
        >
          Home
        </Link>
        {routes.map((route) => (
          <Link
            onClick={() => setNav(false)}
            key={route.href}
            href={route.href}
            className={cn(
              " text-4xl font-medium transition-colors hover:text-buttonColor2",
              route.active
                ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
                : "text-muted",
            )}
          >
            {route.label}
          </Link>
        ))}
        <Link
          onClick={() => setNav(false)}
          href={"/all"}
          className={cn(
            " text-4xl font-medium transition-colors hover:text-buttonColor2",
            pathName === `/all`
              ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
              : "text-muted",
          )}
        >
          All
        </Link>
        <Link
          onClick={() => setNav(false)}
          href={"/contact-us"}
          className={cn(
            "text-4xl font-medium transition-colors hover:text-buttonColor2",
            pathName === `/contact`
              ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
              : "text-muted",
          )}
        >
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavBar;
