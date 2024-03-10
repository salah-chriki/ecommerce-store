import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";

const NavBar = () => {
  const categories = fetch("https://api/stores/${params?.storeId}/categories");
  return (
    <Container>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-oxanium text-muted text-3xl font-bold">RPSHOP</p>
        </Link>
        <MainNav data={[]} />
      </div>
    </Container>
  );
};

export default NavBar;
