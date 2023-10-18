"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import moment from "moment/moment";
import Link from "next/link";
import { ThemeContext } from "@/app/theme-provider/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NfoComponent() {
  const [nfoList, setNfoList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, addedBy } = useContext(ThemeContext);

  const nfoError = (error) => toast.error(error);

  useEffect(() => {
    let addedByValue = null;
    addedByValue = window.localStorage.getItem('addedBy');

    const nfoData = async () => {

      let config = {
        method: 'get',
        url: `https://www.fundexpert.in/app/mutualfund?action=getNFOFundsAddedBy&addedBy=${addedByValue}`,
      };

      axios.request(config)
        .then((response) => {
          setNfoList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          nfoError('Something went wrong');
        });
    }

    nfoData();

  }, [])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section id="nfoSection" className="bg-transparent pt-20 bg-cover bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
        <div className="px-4 mx-auto max-w-screen-xl pt-5 sm:px-6 lg:px-8 xl:px-10">
          <div className="py-5 md:py-10">
            <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10 md:mb-16">
              New Fund Offers
            </h2>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-10 md:gap-14">

                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primaryColor border-opacity-50"></div>
              </div>
            ) : (

              !nfoList ?
                <>
                  <h1 className="text-center text-2xl md:text-3xl text-primaryColor font-semibold my-10 md:my-16">
                    Oops! Something Went Wrong.
                  </h1>
                </> :
                <div className="flex flex-col items-center justify-center gap-10 md:gap-14">
                  {
                    nfoList.map((item) => (

                      <div key={item.id} className="p-5 bg-white rounded-3xl w-full md:w-[500px] border border-lightgray shadow-md">
                        <div className="">
                          <div className="max-w-[250px] mb-3 h-28 w-full mx-auto flex items-center justify-center">
                            <div className="">
                              <img src={item.fundHouse.logoUrl} alt="" className="w-full" />
                            </div>
                          </div>
                        </div>

                        <div className=" md:px-4 p-3 flex flex-col items-center justify-center shadow-md rounded-md bg-opacity-60 bg-[#E5EFFE] border border-lightgray">
                          <div className="flex flex-col gap-3 items-start justify-between p-2">
                            <h3 className="font-semibold text-sm sm:text-base text-primaryColor text-center">{item.name}</h3>
                          </div>
                          <div className="relative overflow-x-auto sm:rounded-lg w-full p-2">
                            <table className="w-full text-sm text-left dark:text-gray-400">
                              <thead className="dark:text-gray-400">
                                <tr className="">
                                  <th className=" uppercase dark:bg-gray-800 text-xs sm:text-sm text-gray-700 p-2 md:whitespace-nowrap">
                                    Minimum Investment
                                  </th>
                                  <td className=" font-medium text-xs sm:text-sm p-2 pl-4">
                                    {item.minPurchase}
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className=" dark:border-gray-700">
                                  <th className=" uppercase dark:bg-gray-800 text-xs sm:text-sm text-gray-700 p-2">
                                    Category
                                  </th>
                                  <td className=" font-medium text-xs sm:text-sm p-2 pl-4">
                                    {item.schemeType}
                                  </td>
                                </tr>
                                <tr className=" dark:border-gray-700">
                                  <th className="uppercase dark:bg-gray-800 text-xs sm:text-sm text-gray-700 p-2">
                                    NFO Period
                                  </th>
                                  <td className="font-medium text-xs sm:text-sm p-2 pl-4">
                                    {moment(item.startDate).format("Do MMMM, YYYY")} - {moment(item.endDate).format("Do MMMM, YYYY")}
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                          <div className="mb-1">
                            {
                              isLoggedIn ?
                                <button onClick={() => window.location.href = `../app/#/invest/flexi/${item.id}`} className="hover:shadow-lg w-[200px] bg-primaryColor hover:bg-primary_md text-white px-5 py-2 rounded-5 font-semibold transition ease-in-out duration-100">
                                  Buy Fund
                                </button>
                                :
                                <Link href='/login'>
                                  <button className="hover:shadow-lg w-[200px] bg-primaryColor hover:bg-primary_md text-white px-5 py-2 rounded-5 font-semibold transition ease-in-out duration-100">
                                    Buy Fund
                                  </button>
                                </Link>
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>

            )}
          </div>
        </div>
      </section>
    </>
  )
}
