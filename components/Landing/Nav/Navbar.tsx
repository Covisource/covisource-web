import React, { useState } from "react";
import Button from "~components/Form/Button";
import NavItem from "./NavItem";

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between container mx-auto">
      <div>
        <span className="text-2xl font-extrabold tracking-wide">
          CoviSource
        </span>
      </div>

      <div className="lg:hidden px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 text-2xl cursor-pointer">
        {mobileNavOpen ? (
          <i className="fal fa-times"></i>
        ) : (
          <i className="fal fa-bars"></i>
        )}
      </div>
      <div className="hidden lg:flex items-center gap-8">
        <NavItem title="Add Resource" icon={<i className="fas fa-plus"></i>} />
        <NavItem
          title="Partner"
          icon={<i className="fas fa-handshake-alt"></i>}
        />
        <NavItem title="Donate" icon={<i className="fas fa-hands-usd"></i>} />
        <Button className="bg-gray-50 ct-text-color rounded-md ct-font-mont font-semibold text-sm py-2">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
