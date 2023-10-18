
import React from "react";
import Image from "next/image";

export default function Features() {

  const featureData = [
    {
      id: 1,
      img: '../images/paperwork.svg',
      title: 'Zero Paperwork',
      description: 'Seamless on-boarding, quick and simple'
    },
    {
      id: 2,
      img: '../images/portfolio.svg',
      title: 'Monitor your Entire Portfolio',
      description: 'See your complete portfolio in a single place, in few clicks'
    },
    {
      id: 3,
      img: '../images/safe-secure.svg',
      title: 'Safe and Secure',
      description: 'Bank Grade Security'
    },
    {
      id: 4,
      img: '../images/zero-fee.svg',
      title: 'Zero Fees',
      description: 'We charge nothing from our Clients'
    },
    {
      id: 5,
      img: '../images/asset-allocation.svg',
      title: 'Assistance for Asset Allocation',
      description: 'Get customized Asset Allocation'
    },
    {
      id: 6,
      img: '../images/one-click.svg',
      title: 'One Click Transact',
      description: 'In few clicks, Invest/Redeem/Insure, All in hassle-free manner'
    }
  ]

  return (
    <section id="features" className="dark:bg-gray-900 bg-transparent">

      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-20 sm:px-6 lg:px-8 xl:px-10">

        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2
            className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-primaryColor dark:text-white"
          >
            Our Features
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Experience the Next Level: Exploring Our Key Features.
          </p>
        </div>

        <div
          className="space-y-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:space-y-0"
        >
          {featureData.map((item) => {
            return <div key={item.id} className="p-3 border border-mediumgray rounded-lg md:p-5 bg-gray-50 bg-opacity-20 backdrop-blur-md dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-100 hover:scale-105 duration-300">
              <div
                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-white border-2 md:h-12 md:w-12 dark:bg-primary-900"
              >
                <img src={item.img} alt="" className="w-5 md:w-6" />
              </div>
              <h3 className="mb-2 text-lg md:text-xl font-bold dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          })}
        </div>
      </div>

    </section>
  )
}