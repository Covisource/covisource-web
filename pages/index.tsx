import Layout from "~hoc/Layout";
import React, { useEffect } from "react";
import SearchBar from "~components/Landing/Search/SearchBar";
import TextLoop from "react-text-loop";

export default function Home() {
  const changingWords = ["Injections", "Medicine", "Plasma", "Oxygen"];

  return (
    <Layout page="home">
      <div className="flex flex-col justify-center h-full lg:w-3/5">
        <h1 className="ct-font-mont font-bold text-4xl lg:text-5xl xl:text-6xl mb-4">
          Find
          <TextLoop springConfig={{ stiffness: 180, damping: 8 }}>
            {changingWords.map((word, index) => (
              <span key={index} className="ct-text-grad ct-font-mont font-bold">
                {word}
              </span>
            ))}
          </TextLoop>
          <br />
          From Anywhere In
          <br />
          India.
        </h1>
        <p className="ct-font-mont ct-font-muted font-semibold text-md leading-5 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat
          nemo animi, numquam nulla
        </p>
        <SearchBar />
        <div className="flex items-center ct-font-mont font-semibold ct-font-muted gap-3">
          <span className="inline-block">1m+ users helped</span>
          <i className="fas fa-circle ct-circle-sep"></i>
          <span>500k Resources Uploaded</span>
          <i className="fas fa-circle ct-circle-sep"></i>
          <span>10k Vendors</span>
        </div>
      </div>
    </Layout>
  );
}
