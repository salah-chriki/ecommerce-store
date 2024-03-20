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
    <nav className="flex justify-between space-x-4 mx-6 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-base font-medium transition-colors hover:text-buttonColor",
            route.active ? "text-buttonColor" : "text-muted"
          )}
        >
          {route.label}
        </Link>
      ))}
      <Link
        href={"/all"}
        className={cn(
          "text-base font-medium transition-colors hover:text-buttonColor",
          pathName === `/all` ? "text-buttonColor" : "text-muted"
        )}
      >
        All
      </Link>
      <Link
        href={"/contact-us"}
        className={cn(
          "text-base font-medium transition-colors hover:text-buttonColor",
          pathName === `/contact` ? "text-buttonColor" : "text-muted"
        )}
      >
        Contact Us
      </Link>
    </nav>
  );
};

export default MainNav;
