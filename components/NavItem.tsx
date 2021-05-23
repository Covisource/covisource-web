import React from "react";
import Link from "next/link";

const NavItem = ({ title, link, active }) => {
  return (
    <Link href={link}>
      <a
        className={`text-md cursor-pointer select-none font-bold ${
          active ? "ct-text-main" : "ct-text-muted"
        }`}
      >
        {title}
      </a>
    </Link>
  );
};

export default NavItem;
