import React from "react";
import Link from "next/link";

interface Props {
  href?: string;
  onClick?: any;
  children: any;
  className?: string;
  disabled?: boolean;
}

const Button = (props: Props) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <button
          className={`grid place-items-center p-4 cursor-pointer select-none ${props.className}`}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`inline-flex p-4 px-7 cursor-pointer select-none ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
