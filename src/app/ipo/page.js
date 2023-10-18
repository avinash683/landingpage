"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";

export default function IpoComponent() {
  const [currentIpo, setCurrentIpo] = useState([]);
  const [closedIpo, setClosedIpo] = useState([]);
  const [upcomingIpo, setUpcomingIpo] = useState([]);
  const [ipoData, setIpoData] = useState();
  const { isLoggedIn, addedBy } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let config = {
      method: 'get',
      url: 'https://www.fundexpert.in/app/user?action=getIpoData',
    };

    axios.request(config)
      .then((response) => {
        setCurrentIpo(response.data.ipoData.currentArray);
        setClosedIpo(response.data.ipoData.closedArray);
        setUpcomingIpo(response.data.ipoData.futureArray);
        setIpoData(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIpoData(false);
        console.log(error);
      });

  }, [])

  const cardData = [
    {
      img: '../images/apply-acc.svg',
      title: `Apply even if you don't have an account with us`
    },
    {
      img: '../images/upi.svg',
      title: `Instant application VIA UPI`
    },
    {
      img: '../images/pay-shares.svg',
      title: `Pay only when you are allotted the shares`
    }
  ]

  return (
    <section id="ipoSection" className="bg-transparent pt-20 bg-cover bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
      <div className="px-4 mx-auto max-w-screen-xl pt-5 sm:px-6 lg:px-8 xl:px-10">
        <div className="py-5 md:py-10">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-10 md:mb-16">
            Apply For IPO
          </h2>
          <div className="w-full grid md:grid-cols-12 gap-5 md:gap-9 lg:gap-14 justify-between items-center" >
            {
              cardData.map((items, index) => (


                <div key={index} className="p-3 col-span-4 border border-lightgray h-full rounded-lg md:p-5 bg-white bg-opacity-50 backdrop-blur-md dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-100 hover:scale-105 duration-300"
                >
                  <div
                    className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-white border-2 lg:h-12 lg:w-12 dark:bg-primary-900"
                  >
                    <img
                      src={items.img}
                      className="w-5 md:w-6 h-5 md:h-6"
                      alt=""
                    />
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg text-gray-700 font-medium dark:text-white">
                    {items.title}
                  </h3>
                </div>
              ))
            }
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-10 md:gap-14 my-2 sm:my-5">

              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primaryColor border-opacity-50"></div>
            </div>
          ) : (

            !ipoData ?
              <>
                <h1 className="text-center text-2xl md:text-3xl text-primaryColor font-semibold my-2 md:my-16">
                  Oops! Something Went Wrong.
                </h1>
              </> :
              <div className="flex flex-col gap-9">
                <div className="my-9">
                  <h3 className="text-center text-xl md:text-2xl font-medium mb-5">ONGOING IPOS</h3>
                  <div className="relative overflow-x-auto p-3 bg-white rounded-lg shadow-md">
                    <table className="table-auto w-full text-left text-gray-700 dark:text-gray-400">
                      <thead className="font-semibold text-xs md:text-base border-b-2 border-primaryColor">
                        <tr>
                          <th className="py-3 px-2 min-w-[100px]">
                            COMPANY NAME
                          </th>
                          <th className="py-3 px-2 min-w-[100px]">
                            DATE
                          </th>
                          <th className="py-3 px-2 min-w-[100px]">
                            PRICE RANGE (RS)
                          </th>
                          <th className="py-3 px-2">
                            MIN QTY
                          </th>
                          <th className="py-3 px-2">
                            INVEST
                          </th>
                          <th className="py-3 px-2">
                            RHP/DRHP
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          currentIpo.map((item) => (
                            <tr key={item.id} className="bg-white border-b text-xs md:text-base dark:bg-gray-800 font-medium dark:border-gray-700">
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[75px]"><>{item.name}</></td>
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[75px]">{item.date}</td>
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[75px]">&#8377; {item.priceRange}</td>
                              <td className="py-3 px-2 text-xs md:text-sm">{item.minQuantity}</td>
                              <td className="py-3 px-2 text-xs md:text-sm">
                                {
                                  isLoggedIn ?
                                    <button onClick={() => window.location.href = `../app/#/ipo/${item.id}`} className="hover:shadow-md text-sm px-3 py-2 bg-primaryColor text-white rounded-5 hover:bg-primary_md transition ease-in-out duration-100">Invest</button>
                                    :
                                    <Link href='/login'>
                                      <button className="hover:shadow-md text-sm px-3 py-2 bg-primaryColor text-white rounded-5 hover:bg-primary_md transition ease-in-out duration-100">Invest</button>
                                    </Link>
                                }
                              </td>
                              <td className="py-3 px-2 text-center text-xs md:text-sm"><a href={item.rhpUrl} className="text-primaryColor">View</a></td>
                            </tr>
                          ))

                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="my-9">
                  <h3 className="text-center text-xl md:text-2xl font-medium mb-5">UPCOMING IPOS</h3>
                  <div className="relative overflow-x-auto p-3 bg-white rounded-lg shadow-md">
                    <table className="table-auto w-full text-left text-gray-700 dark:text-gray-400">
                      <thead className="font-semibold text-xs md:text-base border-b-2 border-primaryColor">
                        <tr>
                          <th className="py-3 px-2 min-w-[100px]">
                            COMPANY NAME
                          </th>
                          <th className="py-3 px-2 min-w-[100px]">
                            DATE
                          </th>
                          <th className="py-3 px-2 min-w-[100px]">
                            PRICE RANGE (RS)
                          </th>
                          <th className="py-3 px-2">
                            MIN QTY
                          </th>
                          <th className="py-3 px-2">
                            <Link href='/login'>INVEST</Link>

                          </th>
                          <th className="py-3 px-2">
                            RHP/DRHP
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          upcomingIpo.map((item) => (
                            <tr key={item.id} className="border-b font-medium">
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[100px]"><>{item.name}</></td>
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[100px]">{item.date}</td>
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[100px]">&#8377; {item.priceRange}</td>
                              <td className="py-3 px-2 text-xs md:text-sm ">{item.minQuantity}</td>
                              <td className="py-3 px-2 text-xs md:text-sm">
                                {
                                  isLoggedIn ?
                                    <button onClick={() => window.location.href = `../app/#/ipo/${item.id}`} className="hover:shadow-md text-sm px-3 py-2 bg-primaryColor text-white rounded-5 hover:bg-primary_md transition ease-in-out duration-100">Invest</button>
                                    :
                                    <Link href='/login'>
                                      <button className="hover:shadow-md text-sm px-3 py-2 bg-primaryColor text-white rounded-5 hover:bg-primary_md transition ease-in-out duration-100">Invest</button>
                                    </Link>
                                }
                              </td>
                              <td className="py-3 px-2 text-center text-xs md:text-sm"><a href={item.rhpUrl} className="text-primaryColor">View</a></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="my-9">
                  <h3 className="text-center text-xl md:text-2xl font-medium mb-5">CLOSED IPOS</h3>
                  <div className="relative overflow-x-auto p-3 bg-white rounded-lg shadow-md">
                    <table className="table-auto w-full text-left text-gray-700 dark:text-gray-400">
                      <thead className="font-semibold text-xs md:text-base border-b-2 border-primaryColor">
                        <tr>
                          <th className="py-3 px-2">
                            COMPANY NAME
                          </th>
                          <th className="py-3 px-2">
                            DATE
                          </th>
                          <th className="py-3 px-2">
                            PRICE RANGE (RS)
                          </th>
                          <th className="py-3 px-2">
                            MIN QTY
                          </th>
                          <th className="py-3 px-2">
                            <Link href='/login'>INVEST</Link>
                          </th>
                          <th className="py-3 px-2">
                            RHP/DRHP
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          closedIpo.map((item) => (
                            <tr key={item.id} className="border-b font-medium">
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[100px]"><>{item.name}</></td>
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[100px]">{item.date}</td>
                              <td className="py-3 px-2 text-xs md:text-sm min-w-[100px]">&#8377; {item.priceRange}</td>
                              <td className="py-3 px-2 text-xs md:text-sm">{item.minQuantity}</td>
                              <td className="py-3 px-2 text-xs md:text-sm">
                                {
                                  isLoggedIn ?
                                    <button onClick={() => window.location.href = `../app/#/ipo/${item.id}`} className="hover:shadow-md text-sm px-3 py-2 bg-primaryColor text-white rounded-5 hover:bg-primary_md transition ease-in-out duration-100">Invest</button>
                                    :
                                    <Link href='/login'>
                                      <button className="hover:shadow-md text-sm px-3 py-2 bg-primaryColor text-white rounded-5 hover:bg-primary_md transition ease-in-out duration-100">Invest</button>
                                    </Link>
                                }
                              </td>
                              <td className="py-3 px-2 text-xs text-center md:text-sm"><a href={item.rhpUrl} className="text-primaryColor">View</a></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </section>
  )
}        