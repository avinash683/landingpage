"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";
export default function HeroSection({ ifaData }) {

  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoggedIn } = useContext(ThemeContext);


  const images = [
    '../images/app-dashboard.png',
    '../images/app-products.png',
    '../images/app-calculator.png',
  ];

  const slideInterval = 3000;

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };
    const intervalId = setInterval(nextSlide, slideInterval);
    return () => clearInterval(intervalId);
  }, []);

  const appStoreHref = ifaData?.links.appStore ? ifaData.links.appStore : "#";
  const playStoreHref = ifaData?.links.playStore ? ifaData.links.playStore : "#";

  return (
    <section
      className="dark:bg-gray-900 min-h-[90vh] mx-auto pb-9 sm:pb-0 pt-6 lg:pt-5 flex items-center justify-center"
    >
      <div className="px-4 pt-3 mx-auto max-w-screen-xl sm:py-5 sm:px-6 lg:px-8 xl:px-10">
        <div
          className="items-start lg:py-4 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8"
        >
          <div className="flex flex-col my-4 sm:my-6 md:pt-14 gap-y-6">
            <h1
              className="sm:mb-4 font-medium tracking-tight leading-9 text-gray-900 text-[34px] sm:text-5xl lg:text-6xl dark:text-white"
            >
              Welcome to the smart investment platform of <span className='text-primaryColor text-[34px] sm:text-5xl font-medium lg:text-6xl'>{ifaData.title}</span>
            </h1>

            <p
              className="mb-4 text-base sm:text-xl font-normal text-gray-500 dark:text-gray-400"
            >
              Dedicated to helping you seize the opportunities of today&#39;s
              dynamic financial landscape, making informed and strategic
              investments that pave the path to a brighter, more prosperous
              tomorrow.





            </p>
            <div className="flex items-center justify-start gap-3 space-x-2">

              <a href={appStoreHref} className='transition ease-in-out delay-50 hover:scale-105 duration-300'>
                <img
                  src="../images/apple-store2.svg"
                  alt=""
                  className="h-10"
                />
              </a>

              <a href={playStoreHref} className='transition ease-in-out delay-50 hover:scale-105 duration-300'>
                <img
                  src="../images/google-play.png"
                  alt=""
                  className="h-10"
                />
              </a>
            </div>
          </div>
          <div
            className="w-full flex flex-col justify-center items-center md:items-end"
          >
            <div
              className="relative z-10 bg-gray-300 border-gray-300 border-[14px] rounded-[2.5rem] h-[450px] w-[225px] sm:h-[530px] sm:w-[265px]"
            >
              <div
                className="h-[46px] w-[3px] bg-gray-600 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"
              ></div>
              <div
                className="h-[46px] w-[3px] bg-gray-600 dark:bg-gray-800 absolute -left-[17px] top-[126px] rounded-l-lg"
              ></div>
              <div
                className="h-[64px] w-[3px] bg-gray-600 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"
              ></div>
              <div
                className="rounded-[2rem] overflow-hidden w-full h-[100%] bg-white dark:bg-gray-800"
              >
                <div
                  className="relative overflow-hidden"
                >

                  <img
                    src={images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: 1 }}
                  />
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-500 absolute top-0 left-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </section>

  )
}