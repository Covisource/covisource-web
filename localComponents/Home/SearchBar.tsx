import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

// components
import SearchablePopup from "~components/SearchablePopup";
import Button from "~components/Button";

// contexts
import { useHereContext } from "~contexts/HereContext";

// functions
import {
  autoDetectLocation,
  getAllResources,
  locationSearchHandler,
  resourceSearchHandler,
} from "~util/searchablePopupUtil";

const SearchBar = () => {
  const userLocationInCookie = Cookies.get("coviUserLocationDisplay");
  const hereToken = useHereContext();
  const [allResources, setAllResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");

  useEffect(() => {
    const getResources = async () => {
      setAllResources((await getAllResources()) || []);
    };
    getResources();
  }, []);

  return (
    <div
      className="relative hidden md:flex sm:flex items-center ct-shadow transition-all mb-10 bg-white rounded-xl sm:w-35 md:w-144 lg:w-160 h-18"
      id="searchbar_home"
    >
      <SearchablePopup
        input={{
          className: "w-full",
          subClassName: "ct-text-color-1 text-sm font-medium bg-transparent",
          prepend: (
            <i className="fas fa-map-marker-alt ct-text-color-1 text-xl"></i>
          ),
          heading: "Location",
          placeholder: "Enter a location",
          value: userLocationInCookie || "",
        }}
        dropdown={{
          className: "bg-gray-300 w-72 shadow-xl",
          result: {
            containerClassName: "border-b border-gray-200 hover:bg-gray-200",
            headingClassName: "ct-text-color-1",
            subHeadingClassName: "text-gray-500",
          },
        }}
        searchHandler={{
          handler: locationSearchHandler,
          extraParams: { hereToken },
        }}
        loader={true}
        whenInputEmpty={{
          componentArray: [
            <div className="flex items-center gap-2 py-4 px-3 select-none hover:bg-gray-200 cursor-pointer ">
              <i className="fal fa-radar text-xl text-purple-400"></i>
              <div className="flex flex-col justify-center gap-1">
                <span className="text-purple-400 font-semibold font-mont">
                  Auto Detect Location
                </span>
                <span className="text-xs text-gray-400">
                  Click Allow If Your Browser Prompts You
                </span>
              </div>
            </div>,
          ],
          componentClickHandler: autoDetectLocation,
        }}
        resultClickHandler={{
          handler: ({ result, setInputValue, setIsVisible }) => {
            Cookies.set(
              "coviUserLocationLong",
              result.coordinates.long.toString()
            );
            Cookies.set(
              "coviUserLocationLat",
              result.coordinates.lat.toString()
            );
            Cookies.set("coviUserLocationDisplay", result.heading);

            setInputValue(result.heading);
            setIsVisible(false);
          },
        }}
        containerClassName="w-1/3"
      />
      <span className="h-9 ct-bg-muted ml-1" style={{ width: "1px" }}></span>
      <SearchablePopup
        input={{
          subClassName: "ct-text-color-1 text-sm font-medium bg-transparent",
          prepend: <i className="fas fa-shapes ct-text-color-1 text-lg"></i>,
          heading: "Resource",
          placeholder: "Choose a Resource",
        }}
        dropdown={{
          className: "bg-gray-300 w-full shadow-xl",
          result: {
            containerClassName: "border-b border-gray-200 hover:bg-gray-200",
            headingClassName: "ct-text-color-1",
            subHeadingClassName: "text-gray-500",
          },
        }}
        searchHandler={{
          handler: resourceSearchHandler,
        }}
        resultClickHandler={{
          handler: ({ result, setInputValue, setIsVisible }) => {
            setInputValue(result.heading);
            setSelectedResource(result.heading);
            setIsVisible(false);
          },
        }}
        whenInputEmpty={{
          componentArray: allResources.map((resource: any, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-200 ct-text-color-1 select-none hover:bg-gray-200 cursor-pointer"
              >
                <span className="truncate resource" title={resource.heading}>
                  {resource.heading}
                </span>
              </div>
            );
          }),
          componentClickHandler: ({
            component,
            setInputValue,
            setIsVisible,
          }) => {
            setInputValue(component.props.children.props.title);
            setSelectedResource(component.props.children.props.title);
            setIsVisible(false);

            console.log(component);
          },
        }}
        containerClassName="w-2/3"
      />
      <Button
        className="ct-bg-accent absolute right-2 py-4 rounded-xl text-gray-200"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/${
          selectedResource.toLowerCase() || ""
        }`}
      >
        <i className="far fa-search"></i>
      </Button>
    </div>
  );
};

export default SearchBar;
