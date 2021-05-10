import React from "react";

const NavItem = ({ icon, title }) => {
  return (
    <a className="font-medium ct-font-mont flex items-center gap-2">
      {icon}
      {title}
    </a>
  );
};

export default NavItem;
