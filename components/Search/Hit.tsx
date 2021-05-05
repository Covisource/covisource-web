import React from "react";

interface Props {
  title: any;
  address: any;
}

const Hit = (props: Props) => {
  return (
    <div>
      {props.title}
      {props.address}
    </div>
  );
};

export default Hit;
