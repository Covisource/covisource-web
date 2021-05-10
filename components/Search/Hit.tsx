import { useSession } from "next-auth/client";
import React from "react";
import SessionSchema from "schema/SessionSchema";
import { usePopupOpenContext } from "~contexts/PopupOpenContext";

interface Props {
  title: string;
  address: string;
  coordinates: number[];
}

const Hit = (props: Props) => {
  const user: SessionSchema = useSession()[0] as any;

  // popup state
  const { setLocationBoxOpen } = usePopupOpenContext();

  const handleHitClick = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/setUserLocation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${user?.jwt}`,
        },
        body: JSON.stringify({
          coordinates: {
            long: props.coordinates[0],
            lat: props.coordinates[1],
          },
        }),
      }
    );

    (document.getElementById("navbarLocationSearch") as any).value =
      props.title;

    setLocationBoxOpen(false);
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
