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
    <div className="relative rounded-lg w-full mb-6 ct-bg-muted">
      <div
        className="rounded-lg p-5 bg-white"
        style={{ boxShadow: "0px 4px 25px 1px #0000000D" }}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-3 relative">
          <div className="font-extrabold flex items-center gap-2 text-xl truncate">
            <span className="font-extrabold ct-text-accent">{qty || 1}x</span>
            <h1 className="truncate">{title}</h1>
            <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 mt-1 truncate">
              <span className="font-medium">in</span> {locationName}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="h-1/3 font-semibold text-sm ct-text-muted mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          repudiandae, facere minima labore dolorem quibusdam maxime veritatis
          nobis, dolorum voluptatem ut ducimus amet id...
        </p>

        {/* Sub Footer */}
        <div className="flex items-center gap-1">
          <Button className="rounded-lg ct-bg-accent ct-text-inverted font-semibold">
            Open
          </Button>
          <Button className="rounded-lg ct-text-accent font-semibold">
            Contact Dealer
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <span
            className="flex items-center gap-1 font-semibold text-gray-700"
            style={{ fontSize: "17px" }}
          >
            <i className="far fa-rupee-sign"></i>
            {price}
          </span>
          {/* {extraParameters.map((param, index) => {
            return param.value ? (
              <span
                className="flex items-center gap-1 text-sm text-gray-700"
                key={index}
              >
                <span className="font-bold">{param.name}:</span> {param.value}
              </span>
            ) : (
              ""
            );
          })} */}
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Resource;

{
  /* <span className="ct-text-primary text-xs font-semi">
          {creator?.userId
            ? `Posted By ${creator.userId.name}`
            : "Posted By Anonymous User"}
        </span> */
}
