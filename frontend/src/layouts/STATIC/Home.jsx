import React from "react";
import Sections from "./sections/Sections";
import Circle from "../../assets/circle-large.png";
import Svg from "./sections/Svg";
import { useState } from "react";
import { Testimonials } from "./sections/Testimonials";
import "./scss/Home.scss";
import { Footer } from "./sections/Footer";
import { Section3 } from "./sections/Section3";
const Home = () => {
  const [testimonials] = useState([
    {
      id: 1,
      title: "Stay productive, wherever you are",
      heading:
        "Never let location be an issue when accessing your files. Taskyo has you covered for all your notes storage !",
    },
  ]);
  return (
    <div className="hero-page">
      <Sections />
      <Svg />
      <Testimonials testimonials={testimonials} />
      <Section3 />
      <Footer />
    </div>
  );
};

export default Home;
