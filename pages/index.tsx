import Layout from "~hoc/Layout";
import React, { useEffect } from "react";
import SearchBar from "localComponents/Home/SearchBar";
import TextLoop from "react-text-loop";

export default function Home() {
  const changingWords = [
    "Injections",
    "Medicine",
    "Plasma",
    "Oxygen",
    "Remdesivir",
    "Beds",
    "Tocilizumab",
    "Ventilators",
    "Staples",
  ];

  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/category/findCategory`);

  return (
    <Layout page="home">
      <div className="flex flex-col justify-center h-full lg:w-3/5">
        <div className=" mb-4">
          <span className="ct-font-mont font-bold text-4xl lg:text-5xl 2xl:text-6xl">
            Find{" "}
          </span>
          <TextLoop>
            {changingWords.map((word, index) => (
              <span
                key={index}
                className="ct-text-grad ct-font-mont font-bold text-4xl lg:text-5xl 2xl:text-6xl"
              >
                {word}
              </span>
            ))}
          </TextLoop>{" "}
          <span className="ct-font-mont font-bold text-4xl lg:text-5xl 2xl:text-6xl">
            <br /> From Anywhere In <br /> India.
          </span>
        </div>
        <p className="ct-font-mont ct-text-color-2 font-semibold text-md leading-5 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat
          nemo animi, numquam nulla
        </p>
        <SearchBar />
      </div>
    </Layout>
  );
}
