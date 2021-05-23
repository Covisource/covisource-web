import Layout from "~hoc/Layout";
import React, { useEffect } from "react";
import SearchBar from "~localComponents/Home/SearchBar";
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
    "Vaccines",
  ];

  return (
    <Layout page="home">
      <div className="flex flex-col items-center h-full pt-20">
        {/* Heading */}
        <div className="text-center mb-7">
          <span className="ct-font-mont font-bold text-6xl">
            Find{" "}
          </span>
          <TextLoop>
            {changingWords.map((word, index) => (
              <span
                key={index}
                className="ct-text-grad ct-font-mont font-bold text-6xl"
              >
                {word}
              </span>
            ))}
          </TextLoop>{" "}
          <span className="ct-font-mont font-bold text-6xl">
            <br /> From Anywhere In India.
          </span>
        </div>

        {/* Description */}
        <p className="ct-text-muted text-center text-xl font-semibold">
          Join the millions of Indian's using CoviSource to save lives.
        </p>
      </div>
    </Layout>
  );
}
