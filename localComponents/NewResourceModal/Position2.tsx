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
    latitude: 20.5937,
    longitude: 78.9629,
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
              className: "m-3",
              subClassName: "bg-transparent bg-opacity-80",
              style: {
                backdropFilter: "blur(20px)",
              },
              prepend: <i className="fal fa-map-marker-alt"></i>,
              append: <i className="fas fa-caret-down"></i>,
              placeholder: "Enter a location",
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
                setMapConfig((curr) => ({
                  ...curr,
                  latitude: result.coordinates.lat,
                  longitude: result.coordinates.long,
                }));

                debounce(
                  setFormData((cur) => ({
                    ...cur,
                    location: {
                      coordinates: {
                        lat: result.coordinates.lat,
                        long: result.coordinates.long,
                      },
                      displayName: result.heading,
                    },
                  })),
                  500
                );
              },
            }}
          />
        </ReactMapGl>
      </div>
    </>
  );
};

export default Position2;
