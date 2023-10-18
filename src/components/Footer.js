"use client";

import React from "react"
import Link from "next/link";
import { Footer } from 'flowbite-react';

export default function FooterSection({ ifaData }) {

  const appStoreHref = ifaData?.links.appStore ? ifaData.links.appStore : "#";
  const playStoreHref = ifaData?.links.playStore ? ifaData.links.playStore : "#";

  const footerData = [
    {
      img: '../images/AMFILogo.png',
      text: `AMFI Registered Mutual Fund Distributor`,
      code: `${ifaData?.arnNumber}`
    },
    {
      img: '../images/BSestarMF.png',
      text: '100% Secure Payment Gateway',
      code: `BSE member code: ${ifaData?.bseMemberCode}`
    },
    {
      img: '../images/positivessl_trust_seal.png',
      text: 'SSL Enabled',
      code: '100% Secure Platform'
    }
  ]

  return (
    <Footer container className="px-0 py-0 bg-gradient-to-b from-white to-[#e8f3f8]" id="contact">
      <div className="py-10 px-4 mx-auto w-full max-w-screen-xl sm:pt-15 sm:pb-10  sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-end justify-start gap-4">
          <Link href='/'>
            <img className="h-10" src={ifaData.logo} alt="Logo" />
          </Link>
          <h4 className="text-lg text-primaryColor font-semibold">{ifaData.title}</h4>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="py-6 lg:pr-12 lg:w-1/3 flex flex-col gap-6">
            <div>
              <p className="text-base md:text-lg text-gray-600 font-medium">Helping you invest today for better tomorrow.</p>
            </div>

            <div
              className="flex items-center justify-start gap-2 sm:flex-row mt-3"
            >
              <a
                href={playStoreHref}
                className="transition ease-in-out hover:scale-105 duration-300"
              >
                <img
                  src='../images/google-play.png'
                  alt="play-store"
                  className="lg:h-9 h-7"
                />
              </a>
              <a href={appStoreHref} className="transition ease-in-out hover:scale-105 duration-300">
                <img
                  src='../images/apple-store2.svg'
                  alt="app-store"
                  className="lg:h-9 h-7"
                />
              </a>
            </div>
          </div>
          <div className="grid w-full sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-12 py-6 md:pl-10 md:justify-stretch md:items-stretch">
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-primaryColor mb-3 md:mb-6">CONTACT INFO</h3>
              <div className="flex flex-col item-center justify-center gap-3">
                <a href={`mailto:${ifaData.contactInfo.email}`} className="text-base text-gray-600 md:text-16 lg:text-20 font-medium">
                  {ifaData.contactInfo.email}
                </a>
                <a href={`tel:${ifaData.contactInfo.mobileNumber}`} className="text-base text-gray-600 md:text-16 lg:text-20 font-medium">
                  {ifaData.contactInfo.mobileNumber}
                </a>
                <p className="text-base md:text-16 lg:text-20 text-gray-600 font-medium">{ifaData.contactInfo.address}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-primaryColor mb-3 md:mb-6">RESOURCES</h3>
              <div className="flex flex-col item-center justify-center gap-3">
                <Link className="text-gray-600 text-base md:text-16 lg:text-20 font-medium" href='/sipcalculator'>SIP Calculator</Link>

                <Link className="text-gray-600 text-base md:text-16 lg:text-20 font-medium" href='/goalcalculator'>GOAL SIP Calculator</Link>

                <Link className="text-gray-600 text-base md:text-16 lg:text-20 font-medium" href='/swpcalculator'>SWP Calculator</Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-primaryColor mb-3 md:mb-6">QUICK LINK</h3>
              <div className="flex flex-col item-center justify-center gap-3">
                <a href="#" className="text-gray-600 text-base md:text-16 lg:text-20 font-medium">
                  Home
                </a>
                <a href="#aboutus" className="text-gray-600 text-base md:text-16 lg:text-20 font-medium">
                  About Us
                </a>
                <a href="#services" className="text-gray-600 text-base md:text-16 lg:text-20 font-medium">
                  Services
                </a>
                <a href="#features" className="text-gray-600 text-base md:text-16 lg:text-20 font-medium">
                  Features
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-3 items-center justify-center gap-10 my-8">
          {
            footerData.map((item, index) => (
              <div key={index} className="flex  items-center justify-center gap-2">
                <div className="flex w-3/4 flex-col items-center justify-start gap-2">
                  <img src={item.img} alt="" />
                  <p className="text-gray-600 text-center">{item.text}</p>
                  <p className="text-gray-600 text-center">{item.code}</p>
                </div>
              </div>
            ))
          }
        </div>
        <hr />
        <div className="w-full mt-8">
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-center text-gray-600 font-normal">Mutual fund investments are subject to market risks. Please read the scheme information and other related documents before investing. Past performance is not indicative of future returns.</p>
            <a className="text-primaryColor font-medium" href="https://amits.fundexpert.net/nfo/privacypolicy.html">Privacy Policy</a>
          </div>
          <div className="text-center text-gray-600 font-normal">
            <span>Developed by </span>
            <a
              className="text-primaryColor font-medium"
              href="#"
            >FundExpert</a>
          </div>
        </div>
      </div>
    </Footer>
  )
}
