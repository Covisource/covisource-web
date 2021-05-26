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
      <div className="flex h-full">
        {/* {resources.map((resource, index) => {
          return <Resource key={index} title={resource.title} locationName={resource.location.displayName} description={resource.description} />;
        })} */}

        {/* sidebar */}
        <div className="h-full w-1/5 hidden md:block"></div>

        {/* main */}
        <div className="h-full w-3/5 ct-bg-muted"></div>

        {/* ads */}
        <div className="h-full w-1/5 hidden md:block"></div>
      </div>
    </Layout>
  );
};

export default index;
