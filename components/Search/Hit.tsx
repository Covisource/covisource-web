import React from "react";

interface Props {
  title: string;
  address: string;
  coordinates: number[];
}

const Hit = (props: Props) => {
  const handleHitClick = async () => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/setUserLocation`)
  };

  return (
    <div
      className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-300 text-gray-700 select-none hover:bg-gray-300 cursor-pointer"
      onClick={handleHitClick}
    >
      <span className="truncate">{props.title}</span>
      <span className="truncate text-xs text-gray-600">{props.address}</span>
    </div>
  );
};

export default Hit;
