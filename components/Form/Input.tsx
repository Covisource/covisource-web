import React from "react";

interface Props {
  className?: string;
  prepend?: any;
  append?: any;
  placeholder?: string;
  id?: string;
  onChange?: any;
  name?: string;
  type?: string;
}

const Input = (props: Props) => {
  return (
    <div className={"relative flex items-center " + props.className}>
      {props.prepend ? (
        <div className="absolute left-3">{props.prepend}</div>
      ) : (
        ""
      )}
      <input
        type={props.type || "text"}
        name={props.name}
        onChange={() => props.onChange}
        placeholder={props.placeholder || ""}
        id={props.id || ""}
        className={`w-full bg-gray-200 placeholder-gray-700 border-none rounded-lg h-12 focus:ring-gray-700 focus:ring-1 ${props.prepend ? "pl-10" : ""} ${props.append ? "pr-8" : ""}`}
      />
      {props.append ? (
        <div className="absolute right-2">{props.append}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
