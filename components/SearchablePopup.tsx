import React, { useRef, useState, useEffect } from "react";

// components
import Input from "~components/Input";

interface Props {
  inputId?: string;
  inputClassName?: string;
  inputSubClassName?: string;
  inputPlaceholder?: string;
  inputPrepend?: any;
  inputAppend?: any;
  inputValue?: string;
  searchHandler: any;
  containerClassName?: string;
  loader?: boolean;
}

const SearchablePopup: React.FC<Props> = (props) => {
  // state
  const [inputValue, setInputValue] = useState<string>(props.inputValue || "");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Input Change Handler
  const handleInputChange = async (e) => {
    setLoading(true);
    setInputValue(e.target.value);
    const insertIntoResult = await props.searchHandler(e);
    setResults(insertIntoResult);
    setLoading(false);
  };

  // Close popup when clicked outside of
  const node = useRef(null);

  const handleClickOutside = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={`relative ${props.containerClassName}`}>
      <Input
        placeholder={props.inputPlaceholder}
        className={props.inputClassName}
        subClassName={props.inputSubClassName}
        onChange={handleInputChange}
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

      {isVisible ? (
        <div
          className={
            "absolute top-16 rounded-lg max-h-96 overflow-y-auto overflow-x-hidden ct-bg-dark w-80"
          }
        >
          {results.length > 0 && results}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchablePopup;
