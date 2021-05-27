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
  return (
    <div className="relative p-5 rounded-lg w-full mb-5">
      {/* Header */}
      <div className="flex justify-between mb-3">
        <div className="font-extrabold flex items-center gap-2 text-xl">
          <span className="font-extrabold ct-text-accent">{qty || 1}x</span>
          <h1 className="truncate">{title}</h1>
        </div>

        {/* <div className="flex items-center gap-3 font-mont text-xs">
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
        </div> */}
      </div>

      {/* Description */}
      <p className="h-1/3 font-semibold text-sm ct-text-muted mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
        repudiandae, facere minima labore dolorem quibusdam maxime veritatis
        nobis, dolorum voluptatem ut ducimus amet id...
      </p>

      {/* Sub Footer */}
      <div className="flex justify-between items-center">
        <Button className="rounded-lg ct-bg-accent ct-text-inverted font-semibold px-4 py-3">
          Open
        </Button>

        <span className="flex items-center gap-2 font-bold text-md">
          <i className="fas fa-phone-alt"></i>
          +91 22 1234 5678
        </span>
      </div>

      {/* <span className="ct-text-primary text-xs font-semi">
            {creator?.userId
              ? `Posted By ${creator.userId.name}`
              : "Posted By Anonymous User"}
          </span> */}
    </div>
  );
};

export default Resource;
