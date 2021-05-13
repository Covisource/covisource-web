import React from "react";
import Link from "next/link";

interface Props {
  href?: string;
  onClick?: any;
  children: any;
  className?: string;
}

const Button = (props: Props) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <a
          className={`flex items-center content-center justify-center px-4 cursor-pointer select-none ${props.className}`}
          // onClick={props.onClick || ""}
        >
          {props.children}
        </a>
      </Link>
    );
  } else {
    return (
      <a
        className={`flex items-center content-center justify-center px-4 cursor-pointer select-none ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }
};

export default Button;
