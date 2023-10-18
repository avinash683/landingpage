"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function DownloadApp({ ifaData }) {

  const appStoreHref = ifaData?.links.appStore ? ifaData.links.appStore : "#";
  const playStoreHref = ifaData?.links.playStore ? ifaData.links.playStore : "#";

  //  Carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '../images/app-dashboard.png',
    '../images/app-products.png',
    '../images/app-calculator.png',
  ];

  const sliderBtn = [
    {
      title: 'Dashboard',
      description: "Your Centralized Financial Hub: Real-time Overview and Insights to Monitor, Track, and Optimize Your Financial Health"
    },
    {
      title: 'Products',
      description: "Discover a Comprehensive Range of Innovative Financial Products to Manage Your Finances and Achieve Your Financial Goals"
    },
    {
      title: 'Calculator',
      description: "Empowering Your Financial Planning with Powerful and User-Friendly Calculators for Better Insights and Informed Decisions"
    }
  ]

  const slideInterval = 3000;
  let intervalId;

  useEffect(() => {

    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    intervalId = setInterval(nextSlide, slideInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="dark:bg-gray-900">
      <div className="py-10 px-4 mx-auto max-w-screen-xl lg:py-20  sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-screen text-center mb-8 lg:mb-16">
          <h2
            className="mb-4  text-3xl md:text-4xl tracking-tight font-extrabold text-primaryColor dark:text-white"
          >
            Download the App
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400 mb-5">
            Transact seamlessly, switching between our app and website.
            Download the APP now
          </p>
          <div className="flex gap-3 justify-center items-center ">
            <a href={playStoreHref} className=" transition ease-in-out hover:scale-105 duration-300">
              <img src='../images/google-play.png' alt="" className="h-10 md:h-12" />
            </a>
            <a href={appStoreHref} className=" transition ease-in-out hover:scale-105 duration-300">
              <img src='../images/apple-store2.svg' alt="" className="h-10 md:h-12" />
            </a>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-8 md:mt-0">

          <div
            className="space-y-8 grid-cols-1 md:grid md:grid-cols-2 md:gap-12 md:space-y-0"
          >
            <div
              className="relative z-10 mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem]  h-[450px] w-[225px] sm:h-[530px] sm:w-[265px]"
            >

              <div
                className="h-[46px] w-[3px] sm:w-[5px] bg-primary_md dark:bg-gray-800 absolute -left-[16px] sm:-left-[17px] top-[124px] rounded-l-lg"
              ></div>
              <div
                className="h-[46px] w-[3px] sm:w-[5px] bg-primary_md dark:bg-gray-800 absolute -left-[16px] sm:-left-[17px] top-[178px] rounded-l-lg"
              ></div>
              <div
                className="h-[64px] w-[3px] sm:w-[5px] bg-primary_md dark:bg-gray-800 absolute -right-[16px] sm:-right-[17px] top-[142px] rounded-r-lg"
              ></div>
              <div
                className="rounded-[2rem] overflow-hidden w-full h-[100%] bg-white dark:bg-gray-800"
                id="myTabContent"
              >
                <div
                  id="dashboard"
                  className="relative overflow-hidden z-10"
                >

                  <img
                    src={images[currentSlide]}
                    alt=''
                    className="object-cover transition-opacity duration-500"
                    style={{ opacity: 1 }}
                  />
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=''
                      className={`w-full h-full object-cover transition-opacity duration-500 absolute top-0 left-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  ))}
                </div>
              </div>
              <div
                className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] z-0"
              >
                <svg
                  viewBox="0 0 558 558"
                  width="500"
                  height="500"
                  fill="none"
                  aria-hidden="true"
                  className="motion-safe:animate-spin duration-4000 ease-in-out text-primaryColor"
                >
                  <defs>
                    <linearGradient
                      id=":R3b76:"
                      x1="79"
                      y1="16"
                      x2="105"
                      y2="237"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#13B5C8"></stop>
                      <stop
                        offset="1"
                        stopColor="#13B5C8"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    opacity=".2"
                    d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
                    stroke="#13B5C8"
                  ></path>
                  <path
                    d="M1 279C1 125.465 125.465 1 279 1"
                    stroke="url(#:R3b76:)"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Carousel */}
            <div className="flex flex-col items-center justify-between gap-4 mt-2">
              {sliderBtn.map((item, index) => (

                <button key={index}
                  onClick={() => {
                    clearInterval(intervalId);
                    setCurrentSlide(index);
                  }}
                  className={`${index === currentSlide ? 'bg-white' : 'bg-white'
                    } active:scale-100 focus:border-primaryColor focus:border-md focus:shadow-md
                transition ease-in hover:scale-105 duration-300 shadow-md p-4 relative z-10 rounded-lg flex flex-col items-start justify-center bg-white`}
                >
                  <div
                    className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
                  >
                    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
                      <circle
                        cx="16"
                        cy="16"
                        r="16"
                        fill="#A3A3A3"
                        fillOpacity="0.2"
                      ></circle>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
                        fill="#737373"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
                        fill="#A3A3A3"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white active:text-primaryColor ">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-left ">
                    {item.description}
                  </p>
                </button>

              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}