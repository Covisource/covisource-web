import React from "react";

interface Props {
  href?: string;
  onClick?: any;
  children: any;
  className?: string;
}

const Button = (props: Props) => {
  return (
    <a href={props.href || ""} className={`p-2 flex items-center justify-center text-lg rounded-lg ${props.className}`} onClick={props.onClick}>
      {props.children}
    </a>
  );
};

export default Button;
