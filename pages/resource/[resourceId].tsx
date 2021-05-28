import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "~hoc/Layout";
import Link from "next/link";

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
      <div className="container mx-auto px-7 mt-5 overflow-hidden">
        <Link href="/">
          <a className="flex items-center gap-2 text-md ct-text-muted font-semibold">
            <i className="far fas fa-arrow-left"></i>
            Return to search results...
          </a>
        </Link>
        <div className="ml-7 mt-7">
          <div className="h-60 p-7 w-full flex flex-col gap-5 ct-bg-muted rounded-lg">
            <div>
              <h3 className="text-md">
                <span className="font-bold">Posted By</span>{" "}
                <span className="">Covibot</span>
              </h3>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold h-2/5 overflow-hidden">
              <span className="ct-text-accent font-extrabold">2x</span> Oxygen
              Cylinders Available In Greater Mumbai Area
            </h1>
            <div className="mt-auto flex justify-between items-baseline">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 font-bold text-xs">
                  <i className="fas fa-map-marker-alt"></i>
                  Udaipur, Rajasthan
                </span>
                <span className="flex items-center gap-2 font-bold text-xs">
                  <i className="fas fa-info-circle"></i>
                  5l canisters
                </span>
                <span className="flex items-center gap-2 font-bold text-xs">
                  <i className="fas fa-phone-alt"></i>
                  +91 22 1234 5678
                </span>
              </div>
              <h1 className="font-bold text-3xl">
                <i className="fas fa-rupee-sign mr-1"></i>
                999
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
