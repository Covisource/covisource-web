import React from "react";
import axios from "axios";

// Components
import Button from "~components/Button";

const TogglerButtons = ({ position, setPosition, handleSubmit, validate }) => {
  return (
    <div className="mt-4 w-full flex items-center gap-2 justify-end">
      {position > 1 && (
        <Button
          className="px-7 py-4 rounded-md bg-gray-200"
          onClick={() => setPosition((curr) => curr - 1)}
        >
          Previous
        </Button>
      )}
      {position < 4 && (
        <Button
          className="ct-bg-accent ct-text-inverted px-7 py-4 rounded-md"
          onClick={() => {
            // if the validation function returns true, increment the position
            if (validate()) {
              setPosition((curr) => curr + 1);
            }
          }}
        >
          Next
        </Button>
      )}
      {position === 4 && (
        <Button
          className="ct-bg-grad ct-text-inverted px-7 py-4 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default TogglerButtons;
