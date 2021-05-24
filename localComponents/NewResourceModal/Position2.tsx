import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import ReactMapGl from "react-map-gl";

// functions
import {
  autoDetectLocation,
  locationSearchHandler,
} from "~util/searchablePopupUtil";

/// components
import SearchablePopup from "~components/SearchablePopup";
import Input from "~components/Input";

// contexts
import { useHereContext } from "~contexts/HereContext";
import { debounce } from "debounce";

const Position2 = ({ formData, setFormData }) => {
  const hereToken = useHereContext();

  // mapbox config

  const [mapConfig, setMapConfig] = useState({
    latitude: formData.location.coordinates.lat || 20.5937,
    longitude: formData.location.coordinates.long || 78.9629,
    zoom: 7,
    width: "full",
    height: "25rem",
  });

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        <ReactMapGl
          {...mapConfig}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          onViewportChange={(newConfig) => setMapConfig(newConfig)}
          mapStyle="mapbox://styles/fullstackslayer/ckot5udo10j7f17lkzeaf566l"
          className="rounded-xl"
        >
          <SearchablePopup
            input={{
              placeholder: "Enter Location",
              heading: "Location",
              className: "bg-white shadow-xl bg-opacity-85 p-3 m-3 rounded-lg",
              subClassName:
                "ct-text-color-1 text-sm font-medium bg-transparent",
              prepend: <i className="fal fa-map-marker-alt"></i>,
              append: <i className="fas fa-caret-down"></i>,
              value: formData.location.displayName,
            }}
            dropdown={{
              className: "bg-white mx-3 shadow-xl",
              result: {
                containerClassName:
                  "border-b border-gray-100 hover:bg-gray-100",
                headingClassName: "ct-text-color-1",
                subHeadingClassName: "text-gray-300",
              },
            }}
            searchHandler={{
              handler: locationSearchHandler,
              extraParams: { hereToken },
            }}
            loader={true}
            resultClickHandler={{
              handler: ({ result, setInputValue, setIsVisible }) => {
                setInputValue(result.heading);
                setIsVisible(false);
                setMapConfig((cur) => ({
                  ...cur,
                  latitude: result.coordinates.lat,
                  longitude: result.coordinates.long,
                }));
                setFormData((cur) => ({
                  ...cur,
                  location: {
                    coordinates: {
                      lat: result.coordinates.lat,
                      long: result.coordinates.long,
                    },
                    displayName: result.heading,
                  },
                }));
              },
            }}
          />
        </ReactMapGl>
      </div>
    </>
  );
};

export default Position2;
