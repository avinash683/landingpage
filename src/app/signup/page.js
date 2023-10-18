"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";
import $, { error } from 'jquery';
import axios from "axios";
import Image from "next/image";
import Script from "next/script";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupForm() {
  const { addedBy, isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const { ifaData } = useContext(ThemeContext);
  const appStoreHref = ifaData?.links.appStore ? ifaData.links.appStore : "#";
  const playStoreHref = ifaData?.links.playStore ? ifaData.links.playStore : "#";

  if (isLoggedIn == true) {
    window.sessionStorage.setItem('navbar', true)
    window.location.href = '../';
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const signUpError = (error) => toast.error(error);

  const handleSignup = (event) => {
    event.preventDefault();
        var obj = {};
        // captcha token 
        obj.token = token;
        obj.captcha = 1;
        obj.action = "signup";
        obj.email = $("#signup-form").find("#email-input").val().toString();
        obj.name = $("#signup-form").find("#name-input").val();
        obj.mobileNumber = $("#signup-form").find("#number-input").val().toString();
        obj.password = $("#signup-form").find("#password-input-signup").val();
        obj.addedBy = addedBy;
        obj.ref = "";

        $.ajax({
          url: "https://www.fundexpert.in/app/user",
          type: "post",
          dataType: "json",
          data: obj,
          success: function (data) {
            if (data.success) {
              window.location.href = "../app/#/portfolio";
              window.localStorage.setItem('sessionExist', true);
              setIsLoggedIn(true);
              window.location.href = '../'
            } else {
              signUpError(data.error);
              window.localStorage.setItem('sessionExist', false);
            }
          },
          error: function (data) {
            console.log(data);
          }
        });
  }

  return !isLoggedIn ?
    ifaData && (
      <>
        <ToastContainer
          position="bottom-right"
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
        <section
          className="min-h-screen flex items-start justify-center pt-14 bg-transparent md:pt-28  bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
          <div
            className="items-center justify-center px-4 py-8 max-w-screen-md lg:grid sm:px-6 lg:px-8 xl:px-10 mx-auto gap-2"
          >
            <div className="bg-white bg-opacity-50 px-3 py-4 sm:p-5 flex flex-col md:flex-row gap-3 rounded-lg border border-mediumgray max-w-3xl mx-auto"
            >
              <div className="px-3 sm:px-5 flex flex-col justify-between">
                <div className="flex flex-col gap-1 items-center sm:items-start">
                  <div className="flex items-center justify-start">
                    <a href="#" alt=''><img
                      alt="Logo"
                      className="mr-3 h-9 sm:h-11"
                      src={ifaData.logo}
                    /></a>
                    <h2 className="text-lg font-semibold text-primaryColor">{ifaData.title}</h2>
                  </div>
                  <p className=" text-gray-700 font-medium my-1 sm:my-3 text-center sm:text-left">Helping you invest today for better tomorrow</p>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <h4 className=" text-gray-700 font-semibold mb-1">Get the App</h4>
                  <div className="flex">
                    <a href={playStoreHref}><img src='../images/google_play-icon.svg' alt="" className="w-10" /></a>
                    <a href={appStoreHref}><img src='../images/apple-store-icon.svg' alt="" className="w-10" /></a>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-5">
                <h2 className="text-lg sm:text-2xl font-bold text-primaryColor rounded-md">
                  Sign Up
                </h2>
                <form className="mt-3 sm:mt-6" id="signup-form" onSubmit={handleSignup}>
                  <div>
                    <label className="text-sm">Name

                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name-input"
                      placeholder="Enter your name"
                      pattern="[a-zA-Z][a-zA-Z ]{1,}"
                      className="w-full px-3 py-2 rounded-5 bg-white placeholder-gray-400 placeholder:text-base mt-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email-input"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-5 bg-white mt-2 placeholder-gray-400 placeholder:text-base focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm">Mobile</label>
                    <input
                      type="number"
                      name=""
                      id="number-input"
                      maxLength={10}
                      placeholder="Enter your mobile number"
                      className=" w-full px-3 py-2 rounded-5 bg-white placeholder-gray-400 placeholder:text-base mt-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div className="my-4">
                    <label className="block text-sm">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name=""
                        id="password-input-signup"
                        placeholder="********"
                        minLength={8}
                        className="w-full px-3 py-2 rounded-5 bg-white placeholder-gray-400 placeholder:text-base mt-2 focus:border-blue-500 focus:bg-white"
                        required

                      /><img src={showPassword ? '../images/eye-hidden.svg' : '../images/eye-show.svg'} alt="" onClick={togglePasswordVisibility} className="w-5 absolute top-6 right-3 cursor-pointer" /></div>
                  </div>

                  <button
                    type="submit"
                    className="hover:shadow-lg w-full px-5 py-2 font-semibold bg-primaryColor rounded-5 text-white hover:bg-primary_md transition ease-in-out duration-400"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="text-sm flex justify-between items-center mt-3">
                  <p>Already have an account?</p>
                  <Link href='/login' className="text-primaryColor link font-semibold whitespace-nowrap hover:underline">Login now</Link>
                </div>
              </div>

            </div>
          </div>

          <Script src="https://www.fundexpert.in/assets/js/validator.js" async />
        </section>
      </>
    )
    : (
      <>
        <section
          className="min-h-screen flex items-start justify-center bg-transparent md:pt-28 pt-14 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}
        >
          <div
            className="items-center px-4 py-8 max-w-screen-md lg:grid sm:px-6 lg:px-8 xl:px-10 mx-auto gap-2"
          >
            <div className="flex flex-col items-center justify-center gap-10 md:gap-14">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primaryColor border-opacity-50"></div>
            </div>
          </div>
        </section>

      </>)
}