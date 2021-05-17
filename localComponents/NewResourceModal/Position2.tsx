import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import mapbox from "mapbox-gl";

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

const Position2 = () => {
  const hereToken = useHereContext();

  // mapbox config
  mapbox.accessToken = process.env.NEXT_PUBLIC_MABOX_TOKEN;

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [long, setLong] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  // initialize map
  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    mapRef.current = new mapbox.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: zoom,
    });
  });

  // handle map movement
  useEffect(() => {
    if (!mapRef.current) return; // wait for map to initialize
    mapRef.current.on("move", () => {
      setLong(mapRef.current.getCenter().lng.toFixed(4));
      setLat(mapRef.current.getCenter().lat.toFixed(4));
      setZoom(mapRef.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        <SearchablePopup
          input={{
            subClassName: "bg-gray-100",
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
            handler: ({ result, setInputValue, setIsVisible }) => {},
          }}
        />

        <div ref={mapContainerRef} className="rounded-lg" />

        <Input
          type="tel"
          placeholder="Phone"
          subClassName="bg-gray-100"
          prepend={<i className="fal fa-phone"></i>}
        />
      </div>
    </>
  );
};

export default Position2;
