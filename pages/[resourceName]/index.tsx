import React from "react";
import { getAllResources } from "~util/searchablePopupUtil";

export const getStaticPaths = async () => {
  const res: object[] = (await getAllResources()) as object[];
  const paths = res.map((resource) => {
    return {
      params: {
        resourceName: ((resource as any).name as string).toLowerCase(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { resourceName } = params;

  return { props: { resourceName } };
};

const index = ({ resourceName }) => {
  return <div>{resourceName}</div>;
};

export default index;
