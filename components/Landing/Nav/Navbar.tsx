import React from "react";
import Button from "~components/Form/Button";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xl font-extrabold tracking-wide">CoviSource</span>
      </div>
      <div className="flex items-center gap-8">
        <NavItem title="Add Resource" icon={<i className="fas fa-plus"></i>} />
        <NavItem title="Partner" icon={<i className="fas fa-handshake-alt"></i>} />
        <NavItem title="Donate" icon={<i className="fas fa-hands-usd"></i>} />
        <Button className="bg-gray-50 ct-text-color rounded-md ct-font-mont font-semibold text-sm py-2">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
