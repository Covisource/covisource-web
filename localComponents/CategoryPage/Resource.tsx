import React from "react";

const Resource = ({ title, locationName, description }) => {
  return (
    <div className="ct-shadow p-3 rounded-lg w-72 h-36 relative">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="font-semibold font-mont text-md truncate">{title}</h1>
        <h2 className="flex items-center gap-1 font-semibold font-mont text-xs truncate">
          <i className="fal fa-map-marker-alt"></i>
          {locationName}
        </h2>
      </div>

      {/* Description */}
      <p className="h-1/3 truncate font-mont text-xs">
        {description || "No Description Provided..."}
      </p>

      {/* Footer */}
      <div className="flex gap-2 absolute bottom-3 right-3">
        <span className="ct-text-color-1 font-mont font-semibold text-sm">
          Call Vendor
        </span>
        <span className="text-purple-500 font-mont font-semibold text-sm">
          Open
        </span>
      </div>
    </div>
  );
};

export default Resource;
