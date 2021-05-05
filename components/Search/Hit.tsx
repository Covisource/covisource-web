import React from "react";

const Hit = (props) => {
  return (
    <div className="flex flex-col justify-center gap-2 py-3 px-2 border-b border-gray-300 text-gray-700">
        <span className="truncate">{props.title}</span>
        <span className="truncate text-sm text-gray-600">{props.address}</span>
      </div>
  );
};

export default Hit;
