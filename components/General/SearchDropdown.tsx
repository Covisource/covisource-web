import React, { useRef, useState, useEffect } from "react";

// components
import Input from "~components/General/Input";
import LocationPopup from "~components/SearchDropdowns/LocationDropdown";

// functions
import { locationSearchHandler } from "~util/searchBoxFunctions";

// contexts
import { useHereContext } from "~contexts/HereContext";

interface Props {
  inputId?: string;
  inputClassName: string;
  inputSubClassName?: string;
  inputPlaceholder: string;
  inputPrepend?: any;
  inputAppend?: any;
  inputValue: string;
  searchType: "location" | "resource";
  loader?: boolean;
}

const SearchablePopup: React.FC<Props> = (props) => {
  // state
  const [inputValue, setInputValue] = useState<string>(props.inputValue || "");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // config
  const node = useRef(null);
  const hereToken = useHereContext();

  let popup;
  let inputChangeHandler;

  switch (props.searchType) {
    case "location":
      popup = (
        <div ref={node}>
          <LocationPopup
            hits={results}
            loading={loading}
            setInputValue={setInputValue}
            hidePopup={() => setIsVisible(false)}
          />
        </div>
      );
      inputChangeHandler = (e) => {
        setInputValue(e.target.value);
        locationSearchHandler(e, setResults, setLoading, hereToken);
      };
      break;
  }

  // Close popup when clicked outside of

  const handleClickOutsideForLocationPopup = (e) => {
    if (node.current && node.current.contains(e.target)) {
      // user clicks on the popup itself
      return;
    }
    // user clicks outside of the popup
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener(
        "mousedown",
        handleClickOutsideForLocationPopup
      );
    } else {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideForLocationPopup
      );
    }
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideForLocationPopup
      );
    };
  }, [isVisible]);

  return (
    <div className="relative w-1/3">
      <Input
        placeholder={props.inputPlaceholder}
        className={props.inputClassName}
        subClassName={props.inputSubClassName}
        onChange={inputChangeHandler}
        value={inputValue}
        id={props.inputId || ""}
        onFocus={() => setIsVisible(true)}
        prepend={
          props.loader && loading ? (
            <svg
              className="animate-spin h-4 w-4 rounded-full border-2 border-purple-500 border-opacity-50"
              style={{
                borderRightColor: "#E5E7EB",
                borderTopColor: "#E5E7EB",
              }}
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            props.inputPrepend
          )
        }
        append={props.inputAppend}
      />

      {isVisible ? popup : ""}
    </div>
  );
};

export default SearchablePopup;
