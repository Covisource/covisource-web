import React from "react";

interface Props {
  className?: string;
  subClassName?: string;
  prepend?: any;
  append?: any;
  heading?: any;
  placeholder?: string;
  id?: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  onKeyDown?: any;
  name?: string;
  type?: string;
  value?: string;
  style?: object;
  subStyle?: object;
}

const Input = (props: Props) => {
  return (
    <div
      className={`relative flex items-center ${props.className}`}
      style={props.style}
    >
      {props.prepend ? (
        <div className="absolute left-3">{props.prepend}</div>
      ) : (
        ""
      )}
      <div
        className={`flex flex-col gap-1 w-full ${props.prepend ? "pl-10" : ""} ${
          props.append ? "pr-8" : ""
        }`}
      >
        <h1 className="font-bold">{props.heading}</h1>
        <input
          type={props.type || "text"}
          name={props.name}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          placeholder={props.placeholder || ""}
          value={props.value}
          id={props.id || ""}
          autoComplete="off"
          style={props.subStyle}
          className={`p-0 w-full font-semibold border-none focus:ring-0 text-sm ct-text-muted ct-placeholder-muted ${
            props.subClassName || ""
          }`}
        />
      </div>
      {props.append ? (
        <div className="absolute right-2">{props.append}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
