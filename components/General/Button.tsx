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
        <span
          className={`grid place-items-center p-4 cursor-pointer select-none ${props.className}`}
        >
          {props.children}
        </span>
      </Link>
    );
  } else {
    return (
      <a
        className={`inline-flex p-4 px-7 cursor-pointer select-none ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }
};

export default Button;
