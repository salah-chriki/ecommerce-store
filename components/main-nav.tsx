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
    <nav className="mx-6 hidden justify-between space-x-4 md:flex lg:space-x-6">
      <Link
        href={"/"}
        className={cn(
          " text-base font-medium transition-colors hover:text-buttonColor2",
          pathName === `/`
            ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
            : "text-muted",
        )}
      >
        Home
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-medium transition-colors hover:text-buttonColor2",
            route.active
              ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
              : "text-muted",
          )}
        >
          {route.label}
        </Link>
      ))}
      <Link
        href={"/all"}
        className={cn(
          " text-base font-medium transition-colors hover:text-buttonColor2",
          pathName === `/all`
            ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
            : "text-muted",
        )}
      >
        All
      </Link>
      <Link
        href={"/contact-us"}
        className={cn(
          "text-base font-medium transition-colors hover:text-buttonColor2",
          pathName === `/contact-us`
            ? "inline-block bg-gradient-to-r from-buttonColor2 to-buttonColor bg-clip-text text-transparent"
            : "text-muted",
        )}
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default MainNav;
