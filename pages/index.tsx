import Layout from "~hoc/Layout";
import React from "react";
import SearchBar from "~components/Landing/SearchBar";

export default function Home() {
  return (
    <Layout page="home">
      <div className="flex flex-col justify-center h-full lg:w-1/2">
        <h1 className="ct-font-mont font-bold text-4xl xl:text-5xl mb-4">
          Find{" "}
          <span className="ct-text-grad ct-font-mont font-bold">Plasma</span>
          <br />
          From Anywhere In
          <br />
          India.
        </h1>
        <p className="ct-font-mont ct-font-muted font-semibold text-md leading-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat
          nemo animi, numquam nulla
        </p>
        <SearchBar />
      </div>
    </Layout>
  );
}
