
import React from "react";

export default function AboutUs() {
  return (
    <section id="aboutus" className="dark:bg-gray-900">
      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-20 sm:px-6 lg:px-8 xl:px-10">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2
            className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-primaryColor dark:text-white"
          >
            About Us
          </h2>
          <p className="mb-4 font-normal">
            We are AMFI registered financial Distributor of Mutual Funds and
            other Financial Products, with vast experiences in financial
            industry and serving a large number of happy investors.
          </p>
          <p className="mb-4 font-normal">
            We offer the complete range of financial products and insurance in
            a single platform and We help and guide you to choose the right
            financial products to help achieve your financial goals
            successfully.
          </p>
          <p className="font-normal">
            Our comprehensive online smart wealth management platform empowers
            you to have access to your entire wealth portfolio across Mutual
            Funds, Direct Equity, Fixed Deposits, Insurance etc at a single
            place.
          </p>
        </div>
      </div>
    </section>
  )
}