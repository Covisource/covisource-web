// dependencies
import React from "react";
import Cookies from "js-cookie";

interface Props {
  title: string;
  setInputValue: any;
  hidePopup: any;
}

const Hit = (props: Props) => {
  const handleHitClick = async () => {
    // set the input value to the title of what they select and then hide the popup
    props.setInputValue(props.title);
    props.hidePopup();
  };

  return (
    <div
      className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-700 ct-text-color-3 select-none hover:bg-gray-900 cursor-pointer"
      onClick={handleHitClick}
    >
      <span className="truncate">{props.title}</span>
    </div>
  );
};

export default Hit;
