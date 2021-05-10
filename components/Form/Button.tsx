import React from "react";

interface Props {
  href?: string;
  onClick?: any;
  children: any;
  className?: string;
}

const Button = (props: Props) => {
  return (
    <a href={props.href || ""} className={`flex items-center content-center justify-center px-4 ${props.className}`} onClick={props.onClick}>
      {props.children}
    </a>
  );
};

export default Button;
