import React from "react";
import Button from "~components/Button";

const Resource = ({ resource }) => {
  return (
    <div className="relative rounded-lg w-full mb-6 ct-bg-muted">
      <div
        className="rounded-lg p-5 bg-white"
        style={{ boxShadow: "0px 4px 25px 1px #0000000D" }}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-3 relative">
          <div className="font-extrabold flex items-center gap-2 text-xl truncate">
            <span className="font-extrabold ct-text-accent">
              {resource.quantity || 1}x
            </span>
            <h1 className="truncate">{resource.title}</h1>
            <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 mt-1 truncate">
              <span className="font-medium">in</span>{" "}
              {resource.location?.displayName}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="h-11 overflow-hidden w-4/5 font-semibold text-sm ct-text-muted mb-5">
          {resource.description || "No Description Provided..."}
        </p>

        {/* Sub Footer */}
        <div className="flex items-center justify-between">
          <Button
            className="rounded-lg ct-bg-accent ct-text-inverted font-semibold"
            href={`/resource/${resource._id}`}
          >
            Open
          </Button>
          <span className="flex items-center gap-2 font-extrabold text-sm">
            {resource.phone && (
              <>
                <i className="fas fa-phone-alt"></i>
                <span className="font-extrabold text-sm">{resource.phone}</span>
              </>
            )}
            {resource.email && (
              <>
                <i className="fas fa-envelope-open"></i>
                <span className="font-extrabold text-sm">{resource.email}</span>
              </>
            )}
          </span>
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
            {resource.price || 0}
          </span>
        </div>
        <div className="flex items-center gap-2 truncate">
          <h2 className="text-sm">
            <span className="font-extrabold">Posted By</span>{" "}
            <span className="truncate">
              {resource.creator?.userId
                ? resource.creator.userId.name
                : "Anonymous User"}
            </span>
          </h2>
          <div className="hidden sm:grid place-items-center h-8 w-8 bg-gray-200 rounded-full">
            <i className="far fa-user"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
