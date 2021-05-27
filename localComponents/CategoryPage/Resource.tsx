import React from "react";
import Button from "~components/Button";

const Resource = ({
  title,
  locationName,
  description,
  price,
  qty,
  creator,
  extraParameters,
}) => {
  console.log(creator);
  return (
    <div className="p-5 shadow-md rounded-lg w-full h-48 mb-5">
      <div className="w-2/3 h-full relative">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-1">
            <h1 className="font-semibold font-mont text-lg truncate">
              {title}
            </h1>
            <span className="ct-text-primary text-xs font-semi">
              {creator.userId
                ? `Posted By ${creator.userId.name}`
                : "Posted By Anonymous User"}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mont text-xs">
            {/* Positive Feedback */}
            <span className="flex items-center text-green-400 gap-1 font-semibold">
              <i className="fas fa-thumbs-up"></i>
              98%
            </span>
            <span className="flex items-center text-pink-500 gap-1 font-semibold">
              <i className="fas fa-thumbs-down"></i>
              2%
            </span>
            <span className="flex items-center gap-1 truncate font-semibold ">
              <span className="font-bold">Price: </span>
              <span className="font-bold">{price}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-bold">Qty: </span>
              <span className="font-bold">{qty || 1}</span>
            </span>
            {extraParameters.map((param, index) => {
              return param.value ? (
                <span className="flex items-center gap-1" key={index}>
                  <span className="font-bold">{param.name}: </span>
                  <span className="font-bold">{param.value}</span>
                </span>
              ) : (
                ""
              );
            })}
          </div>
        </div>

        {/* Description */}
        <p className="h-1/3 truncate font-mont text-xs ct-text-muted">
          {description || "No Description Provided..."}
        </p>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
};

export default Resource;
