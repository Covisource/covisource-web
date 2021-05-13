import React, { useState } from "react";

// components
import Button from "~components/General/Button";
import NavItem from "./NavItem";
import { Menu } from "@headlessui/react";

// session
import { useSession } from "next-auth/client";

// schema
import SessionSchema from "~schema/SessionSchema";

const Navbar = () => {
  const user: SessionSchema = useSession()[0] as any;

  return (
    <div className="flex items-center justify-between container mx-auto p-4">
      {/* Logo */}
      <div className="hidden lg:flex items-center gap-10">
        <span className="text-2xl font-extrabold tracking-wide">
          CoviSource
        </span>
        <div className="hidden lg:flex items-center gap-8">
          <NavItem
            title="Partner"
            icon={<i className="far fa-handshake-alt"></i>}
            link="/partner"
            hamburger={false}
          />
          <NavItem
            title="Donate"
            icon={<i className="far fa-hands-usd"></i>}
            link="/donate"
            hamburger={false}
          />
        </div>
      </div>

      {/* Haburger Menu */}
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
              <Menu.Items className="lg:hidden absolute right-0 w-56 mt-2 origin-top-right bg-gray-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col gap-3">
                  <div>
                    <NavItem
                      title="Add Resource"
                      icon={<i className="fas fa-plus"></i>}
                      link="/add-resource"
                      hamburger={true}
                    />
                    <NavItem
                      title="Partner"
                      icon={<i className="fas fa-handshake-alt"></i>}
                      link="/partner"
                      hamburger={true}
                    />
                    <NavItem
                      title="Donate"
                      icon={<i className="fas fa-hands-usd"></i>}
                      link="/donate"
                      hamburger={true}
                    />

                    {!user ? (
                      <Button
                        href="/login"
                        className="bg-gray-50 ct-text-color rounded-md ct-font-mont font-semibold text-sm py-2"
                      >
                        Login
                      </Button>
                    ) : (
                      <img
                        src={user.picture}
                        alt="Profile Photo"
                        className="rounded-full object-contain w-10 h-10 mr-4"
                      />
                    )}
                  </div>
                </div>
              </Menu.Items>
            </>
          )}
        </Menu>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        <i className="far fa-search text-lg ct-text-color-1"></i>
        <Button className="border border-gray-300 ct-text-color-1 rounded-lg ct-font-mont font-semibold text-sm py-2">
          Create Resource
        </Button>
        {!user ? (
          <Button
            href="/login"
            className="bg-gray-50 ct-text-color-3 rounded-md ct-font-mont font-semibold text-sm py-2"
          >
            Login
          </Button>
        ) : (
          <img
            src={user.picture}
            alt="Profile Photo"
            className="rounded-full object-contain w-10 h-10 mr-4"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
