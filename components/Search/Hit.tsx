import React from "react";

const Hit = (props) => {
  return (
    <div className="flex items-center gap-2 py-3 px-2 border-b border-gray-300 text-gray-700">
      <div className="">
        <i className="fal fa-radar text-2xl"></i>
      </div>
      <div className="flex flex-col">
        <span className="truncate">{props.title}</span>
      </div>
    </div>
  );
};

export default Hit;
