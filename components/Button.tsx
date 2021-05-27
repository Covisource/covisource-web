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
          className={`flex justify-center items-center py-3 px-4 cursor-pointer select-none rounded-md ${props.className}`}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`inline-flex py-3 px-4 cursor-pointer select-none rounded-md ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
