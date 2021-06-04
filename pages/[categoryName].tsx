import React, { useEffect, useState } from "react";
import { getAllResources } from "~util/searchablePopupUtil";
import Resource from "~localComponents/CategoryPage/Resource";
import axios from "axios";
import Cookies from "js-cookie";
import Layout from "~hoc/Layout";

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
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      const userLong = Cookies.get("coviUserLocationLong");
      const userLat = Cookies.get("coviUserLocationLat");
      const resources = (
        await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/findResource?long=${userLong}&lat=${userLat}&category=${categoryName}`
        )
      ).data;
      setResources(resources.data);
    })();
  }, []);

  return (
    <Layout page="resources">
      <div className="flex justify-center h-full">
        {/* main */}

        <div className="h-full p-5 w-full lg:w-160">
          <h1 className="text-lg font-bold mb-3">
            {resources.length} Results Found For{" "}
            {(categoryName as string).charAt(0).toUpperCase() +
              (categoryName as string).slice(1)}{" "}
            Near You
          </h1>
          <div className="flex flex-wrap gap-1">
            {resources.map((resource, index) => {
              return <Resource key={index} resource={resource} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
