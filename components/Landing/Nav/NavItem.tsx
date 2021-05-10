import React from "react";

const NavItem = ({ icon, title, hamburger }) => {
  if (!hamburger) {
    return (
      <a className="font-medium ct-font-mont flex items-center gap-2">
        {icon}
        {title}
      </a>
    );
  } else {
    return (
      <a className="flex items-center gap-2 font-medium ct-font-mont text-lg hover:bg-gray-700 p-2 rounded-lg cursor-pointer">
        {icon}
        {title}
      </a>
    );
  }
};

export default NavItem;
