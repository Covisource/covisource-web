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

const Navbar = ({ setIsResourceModalOpen, page }) => {
  const user: SessionSchema = useSession()[0] as any;

  return (
    <div className="flex items-center justify-between p-5">
      {/* Nav Links */}
      <div className="flex items-center gap-4">
        <i className="far fa-search"></i>
        <NavItem title="Home" active={page === "home"} link="/" />
        <NavItem title="Donate" active={page === "donate"} link="/donate" />
        <NavItem title="Partner" active={page === "partner"} link="/partner" />
        <NavItem title="About" active={page === "about"} link="/about" />
      </div>
    </div>
  );
};

export default Navbar;
