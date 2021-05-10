import React, { useState } from "react";
import Button from "~components/Form/Button";
import NavItem from "./NavItem";
import { Menu } from "@headlessui/react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between container mx-auto">
      <>
        <div>
          <span className="text-2xl font-extrabold tracking-wide">
            CoviSource
          </span>
        </div>

        <div className="relative">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="lg:hidden px-3 py-2 rounded-md text-gray-50 hover:bg-gray-700 text-2xl cursor-pointer focus:outline-none">
                  {open ? (
                    <i className="fal fa-times"></i>
                  ) : (
                    <i className="fal fa-bars"></i>
                  )}
                </Menu.Button>
                <Menu.Items className="lg:hidden absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <a>KJSBFJHDUJHsfbjhk</a>
                  </div>
                </Menu.Items>
              </>
            )}
          </Menu>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <NavItem
            title="Add Resource"
            icon={<i className="fas fa-plus"></i>}
          />
          <NavItem
            title="Partner"
            icon={<i className="fas fa-handshake-alt"></i>}
          />
          <NavItem title="Donate" icon={<i className="fas fa-hands-usd"></i>} />
          <Button className="bg-gray-50 ct-text-color rounded-md ct-font-mont font-semibold text-sm py-2">
            Login
          </Button>
        </div>
      </>
    </div>
  );
};

export default Navbar;
