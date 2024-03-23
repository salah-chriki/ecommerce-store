"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Category[];
}

const MainNav = ({ data }: MainNavProps) => {
  const pathName = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathName === `/category/${route.id}`,
  }));
  return (
    <nav className="mx-6 flex justify-between space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "hover:text-buttonColor2 text-base font-medium transition-colors",
            route.active
              ? "from-buttonColor2 inline-block bg-gradient-to-r to-buttonColor bg-clip-text text-transparent"
              : "text-muted",
          )}
        >
          {route.label}
        </Link>
      ))}
      <Link
        href={"/all"}
        className={cn(
          " hover:text-buttonColor2 text-base font-medium transition-colors",
          pathName === `/all`
            ? "from-buttonColor2 inline-block bg-gradient-to-r to-buttonColor bg-clip-text text-transparent"
            : "text-muted",
        )}
      >
        All
      </Link>
      <Link
        href={"/contact-us"}
        className={cn(
          "hover:text-buttonColor2 text-base font-medium transition-colors",
          pathName === `/contact`
            ? "from-buttonColor2 inline-block bg-gradient-to-r to-buttonColor bg-clip-text text-transparent"
            : "text-muted",
        )}
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default MainNav;
