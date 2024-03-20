"use client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";

const NavBarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div className="flex items-center gap-x-2">
      <Button className="text-gray-600 hover:text-white">
        <ShoppingBag size={24} color="#757679" />
      </Button>
      <span className="text-muted hover:text-white">0</span>
    </div>
  );
};

export default NavBarActions;
