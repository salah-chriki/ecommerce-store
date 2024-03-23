import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavBarActions from "./navbar-actions";
import MobileNavBar from "./mobile-navbar";

const NavBar = async () => {
  const categories = await getCategories();
  return (
    <Container>
      <div className="container relative mx-auto flex h-16 items-center justify-between space-x-4 bg-heroColor px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex gap-x-2 lg:ml-0">
          <p className=" text-2xl font-bold text-muted">RPSHOP</p>
        </Link>
        <MainNav data={categories} />
        <div className="flex items-center justify-end px-3">
          <NavBarActions />
          <MobileNavBar data={categories} />
        </div>
      </div>
    </Container>
  );
};

export default NavBar;
