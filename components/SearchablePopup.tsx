import { debounce } from "debounce";
import React, { useEffect, useRef, useState } from "react";

// components
import Input from "~components/Input";

interface InputProps {
  id?: string;
  className?: string;
  subClassName?: string;
  placeholder?: string;
  prepend?: any;
  append?: any;
  value?: any;
  style?: object;
}

interface ResultProps {
  containerClassName?: string;
  headingClassName?: string;
  subHeadingClassName?: string;
}

interface DropdownProps {
  id?: string;
  className?: string;
  result?: ResultProps;
}

interface SearchHandlerProps {
  handler: any;
  extraParams?: object;
}

interface WhenInputEmptyProps {
  componentArray: any[];
  componentClickHandler?: any;
  extraParams?: object;
}

interface ResultClickHandlerProps {
  handler: any;
  extraParams?: object;
}

interface Props {
  input?: InputProps;
  dropdown?: DropdownProps;

  searchHandler: SearchHandlerProps;
  resultClickHandler: ResultClickHandlerProps;

  loader?: boolean;
  containerClassName?: string;

  whenInputEmpty?: WhenInputEmptyProps;
}

const NewSearchablePopup: React.FC<Props> = (props) => {
  // state
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState(props.input.value || "");

  // refs
  const dropdownRef = useRef(null);

  // functions
  const handleClickOutside = (e) => {
    if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
      return;
    }
    setIsVisible(false);
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    props.searchHandler.handler({
      input: inputValue,
      setLoading,
      setInputValue,
      setResults,
      setIsVisible,
      ...props.searchHandler.extraParams,
    });
  };

  // use effects
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

  let resultsToRender = [];

  if (results?.length > 0) {
    resultsToRender = results.map((result) => {
      return (
        <div
          className={`flex flex-col justify-center gap-1 py-4 px-3 select-none cursor-pointer ${props.dropdown?.result.containerClassName}`}
          onClick={() => {
            props.resultClickHandler.handler({
              input: inputValue,
              setLoading,
              setInputValue,
              setResults,
              setIsVisible,
              result,
              ...props.resultClickHandler.extraParams,
            });
          }}
        >
          <span className={`truncate ${props.dropdown?.result.headingClassName}`}>{result.heading}</span>
          <span
            className={`truncate text-xs text-gray-300 ${props.dropdown?.result.subHeadingClassName}`}
            title={result.subHeading}
          >
            {result.subHeading}
          </span>
        </div>
      );
    });
  }

  if (inputValue === "") {
    resultsToRender = props.whenInputEmpty?.componentArray.map((component) => {
      return (
        <div
          onClick={() =>
            props.whenInputEmpty?.componentClickHandler({
              input: inputValue,
              setLoading,
              setInputValue,
              setResults,
              setIsVisible,
              component,
              ...props.searchHandler.extraParams,
            })
          }
        >
          {component}
        </div>
      );
    });
  }

  return (
    <div className={`relative ${props.containerClassName}`}>
      <Input
        id={props.input.id}
        className={props.input.className}
        subClassName={props.input.subClassName}
        placeholder={props.input.placeholder}
        append={props.input.append}
        value={inputValue}
        onChange={handleSearch}
        onFocus={() => {
          setIsVisible(true);
        }}
        style={props.input.style}
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
            props.input.prepend
          )
        }
      />
      {isVisible && (
        <div
          className={`absolute top-16 rounded-lg overflow-y-auto overflow-x-hidden z-50 ${
            props.dropdown?.className || ""
          }`}
          id={props.dropdown?.id || ""}
          ref={dropdownRef}
        >
          {resultsToRender}
        </div>
      )}
    </div>
  );
};

export default NewSearchablePopup;
