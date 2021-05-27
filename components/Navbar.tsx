import React, { useState } from "react";

// components
import Button from "~components/Button";
import NavItem from "./NavItem";
import Link from "next/link";
// session
import { useSession } from "next-auth/client";

// schema
import SessionSchema from "~schema/SessionSchema";

const Navbar = ({ setIsResourceModalOpen, setIsLoginModalOpen, page }) => {
  const user: SessionSchema = useSession()[0] as any;
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    const menuicon = document.getElementById("icon");
    if (menuicon.classList.contains("fa-bars")) {
      menuicon.classList.remove("fa-bars");
      menuicon.classList.add("fa-times");
    } else {
      menuicon.classList.remove("fa-times");
      menuicon.classList.add("fa-bars");
    }
    menuicon.classList.toggle("check");
    menu.classList.toggle("close");
    
  };
  return (
    <div
      className="flex items-center justify-between px-6 py-4 navbar"
      style={{ borderBottom: "1px solid #F3F3F4" }}
    >
      <div className="hamburgermenu">
        <div className="icon">
            <i
              className="fas fa-bars"
              id="icon"
              onClick={() => toggleMenu()}
            ></i>

        </div>
        <div>
          <div className="menu close" id="menu">
            <div className="content">
              <NavItem title="Home" active={page === "home"} link="/" />
              <NavItem
                title="Donate"
                active={page === "donate"}
                link="/donate"
              />
              <NavItem
                title="Resources"
                active={page === "resources"}
                link="/resources"
              />
              <NavItem
                title="Connect"
                active={page === "connect"}
                link="/connect"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-5 nav">
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
      <div className="flex items-center gap-5 ">
        {/* Language Selector */}
        <div className="flex items-center gap-2 nav">
          <i className="far fa-globe"></i>
          <span className="text-sm font-bold">EN</span>
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2 nav">
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
