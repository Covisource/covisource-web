import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "~hoc/Layout";

export const getStaticPaths = async () => {
  const res: object[] = (
    await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/findResource`
    )
  ).data.data;

  const paths = res.map((resource) => {
    return {
      params: {
        resourceId: (resource as any)._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { resourceId } = params;

  const res = (
    await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/findById/${resourceId}`
    )
  ).data.data;

  return {
    props: {
      resource: res,
    },
  };
};

const index = ({ resource }) => {
  return (
    <Layout page="resources">
      <div>{resource.title}</div>
    </Layout>
  );
};

export default index;
