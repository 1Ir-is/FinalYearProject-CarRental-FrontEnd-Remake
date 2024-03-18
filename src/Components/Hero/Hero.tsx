import React from "react";
import { Link } from "react-router-dom";
import hero from "./car.webp";
import "./Hero.css";

interface Props {}

const Hero = (props: Props) => {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
          Welcome to car rent service
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum blanditiis esse accusantium dignissimos labore laborum. Veniam, corporis mollitia temporibus, in quaerat vero deleniti amet dolorem repudiandae, pariatur nam dolore! Impedit neque sit ad temporibus quam similique dolor ipsam praesentium sunt.
          </p>

        </div>
        <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
          <img src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
