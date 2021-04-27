import React from "react";
import { useAuthContext } from "~contexts/AuthContext";

interface Props {
  provider: string;
}

const SocialProvider = (props: Props) => {
  const auth = useAuthContext();

  let icon;
  let color;
  let clickHandler;

  switch (props.provider) {
    case "twitter":
      icon = <i className="fab fa-twitter"></i>;
      color = "blue-400";
      clickHandler = auth.twitterLogin;

      break;
    case "google":
      icon = <i className="fab fa-google"></i>;
      color = "red-400";
      clickHandler = auth.googleLogin;

      break;
    case "facebook":
      icon = <i className="fab fa-facebook-f"></i>;
      color = "blue-500";
      clickHandler = auth.facebookLogin;

      break;
    default:
      break;
  }

  return (
    <span
      className={`cursor-pointer transition-all w-12 h-12 grid place-items-center mr-2 border-2 border-gray-200 p-2 text-xl text-gray-600 rounded-full hover:border-transparent hover:text-gray-50 hover:bg-${color}`}
      style={{}}
      onClick={clickHandler}
    >
      {icon}
    </span>
  );
};

export default SocialProvider;
