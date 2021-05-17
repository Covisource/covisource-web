import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

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
