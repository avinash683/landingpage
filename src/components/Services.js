
import React from "react"
import Image from "next/image";

export default function Services() {

  const serviceData = [
    {
      id: 1,
      img: '../images/mutual-fund.svg',
      title: 'Mutual Funds',
      description: 'Empowering Your Financial Future: Explore Mutual Funds with Ease'
    },
    {
      id: 2,
      img: '../images/equity.svg',
      title: 'Equity',
      description: 'Unlocking the Potential of the Stock Market: Invest in Equities with Confidence'
    },

    {
      id: 3,
      img: '../images/life-insurance.svg',
      title: 'Life Insurance',
      description: `Securing Your Loved Ones' Futures: Simplifying Life Insurance Solutions`
    },

    {
      id: 4,
      img: '../images/health-insurance.svg',
      title: 'Health Insurance',
      description: 'Your Health, Our Priority: Embrace Peace of Mind with Health Insurance'
    },

    {
      id: 5,
      img: '../images/bonds.svg',
      title: 'Bonds',
      description: 'Diversify Your Portfolio: Bond Investments Made Simple'
    },

    {
      id: 6,
      img: '../images/nps.svg',
      title: 'NPS',
      description: 'Secure Retirement with NPS: Building Your Financial Foundation'
    },

    {
      id: 7,
      img: '../images/digital-will.svg',
      title: 'Digital Will',
      description: 'Ensuring Your Legacy Endures: Embrace Digital Will Services'
    },
    {
      id: 9,
      img: '../images/smallcase.png',
      title: 'Smallcase',
      description: 'Empowering Investors, Uniting Financial Experts: Smallcase, Your Trusted Financial Ecosystem'
    }
  ]

  return (
    <section id="services">
      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-20 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-screen mb-8 lg:mb-16">
          <h2
            className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-primaryColor dark:text-white"
          >
            Our Services
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Discover our diverse suite of services, providing innovative
            solutions for efficient payments, secure transactions, data-driven
            insights, and enhanced financial experiences.
          </p>
        </div>
        <div className="space-y-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:space-y-0"
        >
          {serviceData.map((item) => (
            <div key={item.id}
              className="p-3 border border-mediumgray rounded-lg md:p-5 bg-gray-50 bg-opacity-20 backdrop-blur-md dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-100 hover:scale-105 duration-300"
            >
              <div
                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-white border-2 md:h-12 md:w-12  dark:bg-primary-900"
              >
                <img
                  src={item.img}
                  className="w-5 md:w-6"
                  alt=""
                />
              </div>
              <h3 className="mb-2 text-lg md:text-xl font-bold dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
