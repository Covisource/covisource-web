import React from "react";
import Input from "~components/Form/Input";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <img
          src="/logo.png"
          alt="CoviSource"
          className="hidden lg:block h-12"
        />
        <img src="/logo-sm.png" alt="CoviSource" className="lg:hidden h-12" />
      </div>
      <div>
        <Input
          className="w-72"
          placeholder="Find Resources..."
          prepend={<i className="fal fa-search"></i>}
        />
      </div>
    </div>
  );
};

export default Navbar;
