// dependencies
import React from "react";
import Cookies from "js-cookie";

// session imports
import { useSession } from "next-auth/client";
import SessionSchema from "schema/SessionSchema";

interface Props {
  title: string;
  address: string;
  coordinates: number[];
  setInputValue: any;
  hidePopup: any;
}

const Hit = (props: Props) => {
  const user: SessionSchema = useSession()[0] as any;

  const handleHitClick = async () => {
    // if the user is authenticated, make an api request to update their coordinates, else store them in a cookie
    if (user) {
      try {
        await fetch(
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
              displayName: props.title,
            }),
          }
        );
      } catch (err) {
        console.log(err);
      }
    }

    Cookies.set("coviUserLocationLong", props.coordinates[0].toString());
    Cookies.set("coviUserLocationLat", props.coordinates[1].toString());
    Cookies.set("coviUserLocationDisplay", props.title);

    // set the input value to the title of what they select and then hide the popup
    props.setInputValue(props.title);
    props.hidePopup();
  };

  return (
    <div
      className="flex flex-col justify-center gap-1 py-4 px-3 border-b border-gray-300 text-gray-700 select-none hover:bg-gray-300 cursor-pointer"
      onClick={handleHitClick}
    >
      <span className="truncate">{props.title}</span>
      <span className="truncate text-xs text-gray-600" title={props.address}>{props.address}</span>
    </div>
  );
};

export default Hit;
