import React from "react";

const Header = ({ position, setPosition }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 pb-3">
      <div>
        <h3 className="text-xl ct-font-mont font-bold">Upload A Resource</h3>
        <div className="flex flex-row space-x-4 pt-4 pb-4">
          <PositionButton
            pos={1}
            currentPos={position}
            setCurrentPos={setPosition}
          />
          <PositionText currentPos={position} pos={1} text="Step 1 - Basics" />

          <PositionButton
            pos={2}
            currentPos={position}
            setCurrentPos={setPosition}
          />
          <PositionText
            currentPos={position}
            pos={2}
            text="Step 2 - Location"
          />

          <PositionButton
            pos={3}
            currentPos={position}
            setCurrentPos={setPosition}
          />
          <PositionText currentPos={position} pos={3} text="Step 3 - Contact" />

          <PositionButton
            pos={4}
            currentPos={position}
            setCurrentPos={setPosition}
          />
          <PositionText currentPos={position} pos={4} text="Step 4 - Extra" />
        </div>
      </div>
    </div>
  );
};

const PositionButton = ({ pos, currentPos, setCurrentPos }) => {
  return (
    <button
      className={`w-10 h-10 rounded-full ${
        currentPos > pos ? "far fa-check" : ""
      }`}
      style={{
        backgroundColor:
          currentPos < pos
            ? "#dcdcdc"
            : currentPos === pos
            ? "#4563CB"
            : "#21C174",

        color: currentPos < pos ? "#5c5c5c" : "white",
      }}
      onClick={() => setCurrentPos(pos)}
    >
      {currentPos <= pos ? pos : ""}
    </button>
  );
};

const PositionText = ({ pos, currentPos, text }) => {
  return (
    <div className="flex flex-row">
      <span
        className={`text-sm ct-text-muted self-center pr-4 ${
          currentPos !== pos && "hidden"
        }`}
      >
        {text}
      </span>
      <div
        className={`h-0.5 w-8 self-center ${pos >= 4 && "hidden"}`}
        style={{
          backgroundColor:
            currentPos < pos
              ? "#dcdcdc"
              : currentPos === pos
              ? "#4563CB"
              : "#21C174",
        }}
      ></div>
    </div>
  );
};

export default Header;
