import React from "react";

interface Props {
  href?: string;
  onClick?: any;
  children: any;
  className?: string;
}

const Button = (props: Props) => {
  return (
    <a href={props.href || ""} className={`flex items-center content-center justify-center ${props.className}`} onClick={props.onClick} style={{"padding": "0.7rem 0.8rem"}}>
      {props.children}
    </a>
  );
};

export default Button;
