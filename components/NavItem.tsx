import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  link?: string;
  active?: boolean;
  onClick?: any;
}

const NavItem: React.FC<Props> = (props) => {
  return props.link ? (
    <Link href={props.link}>
      <a
        className={`text-md cursor-pointer select-none font-bold ${
          props.active ? "ct-text-main" : "ct-text-muted"
        }`}
      >
        {props.title}
      </a>
    </Link>
  ) : (
    <a
      className={`text-md cursor-pointer select-none font-bold ${
        props.active ? "ct-text-main" : "ct-text-muted"
      }`}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.title}
    </a>
  );
};

export default NavItem;
