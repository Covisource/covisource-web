import React from "react";

const NavItem = ({ icon, title, hamburger, link }) => {
  if (!hamburger) {
    return (
      <a className="font-semibold ct-font-mont ct-text-color-1 flex items-center gap-2 text-sm cursor-pointer select-none">
        {icon}
        {title}
      </a>
    );
  } else {
    return (
      <a href={link} className="flex items-center gap-2 font-medium ct-font-mont text-lg hover:bg-gray-700 p-2 rounded-lg cursor-pointer select-none">
        {icon}
        {title}
      </a>
    );
  }
};

export default NavItem;
