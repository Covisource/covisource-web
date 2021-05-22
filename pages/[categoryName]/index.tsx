import React, { useEffect } from "react";
import { getAllResources } from "~util/searchablePopupUtil";
import Resource from "~localComponents/CategoryPage/Resource";
import axios from "axios";
import Cookies from "js-cookie";

export const getStaticPaths = async () => {
  const res: object[] = (await getAllResources()) as object[];
  const paths = res.map((category) => {
    return {
      params: {
        categoryName: ((category as any).name as string).toLowerCase(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { categoryName } = params;

  return { props: { categoryName } };
};

const index = ({ categoryName }) => {
  useEffect(() => {
    (async () => {
      const userLong = Cookies.get("coviUserLocationLong");
      const userLat = Cookies.get("coviUserLocationLat");
      const categories = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/findResource?long=${userLong}&lat=${userLat}&category=${categoryName}`
      );
      console.log(categories);
    })();
  }, []);
  return (
    <div>
      <Resource />
    </div>
  );
};

export default index;
