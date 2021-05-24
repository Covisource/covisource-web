import React from "react";

// positions
import Position1 from "~localComponents/NewResourceModal/Position1";
import Position2 from "~localComponents/NewResourceModal/Position2";
import Position3 from "~localComponents/NewResourceModal/Position3";

const Positions = ({ position, formData, setFormData }) => {
  let positionToReturn = <></>;

  switch (position) {
    case 1:
      positionToReturn = (
        <Position1 formData={formData} setFormData={setFormData} />
      );
      break;
    case 2:
      positionToReturn = (
        <Position2 formData={formData} setFormData={setFormData} />
      );
      break;
    case 2:
      positionToReturn = (
        <Position3 formData={formData} setFormData={setFormData} />
      );
      break;
  }

  return positionToReturn;
};

export default Positions;
