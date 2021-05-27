import React, { useState } from "react";

// components
import Button from "~components/Button";
import NavItem from "./NavItem";
import { Menu } from "@headlessui/react";
import Link from "next/link";

// session
import { useSession } from "next-auth/client";

// schema
import SessionSchema from "~schema/SessionSchema";

const Navbar = ({ setIsResourceModalOpen, setIsLoginModalOpen, page }) => {
  const user: SessionSchema = useSession()[0] as any;

  return (
    <div
      className="flex items-center justify-between px-6 py-4"
      style={{ borderBottom: "1px solid #F3F3F4" }}
    >
      {/* Nav Links */}
      <div className="flex items-center gap-5">
        <i className="far fa-search"></i>
        <i
          className="far fa-plus cursor-pointer"
          onClick={() => setIsResourceModalOpen(true)}
        ></i>

        <NavItem title="Home" active={page === "home"} link="/" />
        <NavItem title="Donate" active={page === "donate"} link="/donate" />
        <NavItem
          title="Resources"
          active={page === "resources"}
          link="/resources"
        />
        <NavItem title="Connect" active={page === "connect"} link="/connect" />
      </div>

      {/* Logo */}
      <div className="absolute left-1/2" style={{ marginLeft: "-30px" }}>
        <img src="/logo-sm.png" alt="Covisource" className="h-12 w-12" />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-5">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <i className="far fa-globe"></i>
          <span className="text-sm font-bold">EN</span>
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2">
          <i className="far fa-map-marker-alt"></i>
          <span className="font-bold text-sm">India</span>
        </div>

        {/* Auth Section */}
        <div>
          <Button
            className="ct-bg-dark ct-text-inverted"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
