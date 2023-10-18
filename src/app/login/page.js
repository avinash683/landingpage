"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ForgotPasswordForm from "./ForgotPassword";
import OtpForm from "./OtpForm";
import NewPasswordForm from "./NewPassword";
import axios from "axios";
import $ from 'jquery';
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";
import Image from "next/image";
import Script from "next/script";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const { ifaData, addedBy, isLoggedIn, setIsLoggedIn } = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentForm, setCurrentForm] = useState('loginForm');

  const appStoreHref = ifaData?.links.appStore ? ifaData.links.appStore : "#";
  const playStoreHref = ifaData?.links.playStore ? ifaData.links.playStore : "#";

  const loginInvalid = (error) => toast.error(error);

  if (isLoggedIn == true) {
    window.sessionStorage.setItem('navbar', true)
    window.location.href = '../'
  }

  const handleLoginForm = () => {
    setCurrentForm('loginForm')
  }

  const handleForgotPassword = () => {
    setCurrentForm('forgotPassword')
  }

  const handleOtpForm = () => {
    setCurrentForm('otpForm')
  }

  const handleNewPassword = () => {
    setCurrentForm('newPassword')
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();
        var obj = {};
        // captcha token
        obj.token = token;
        obj.captcha = 1;
        obj.action = "login";
        obj.email = $("#login-form").find("#email-input").val();
        obj.password = $("#login-form").find("#password-input-login").val();
        obj.addedBy = addedBy;

        console.log(obj);

        $.ajax({
          url: "https://www.fundexpert.in/app/user",
          type: "post",
          dataType: "json",
          data: obj,
          async: true,
          success: function (data) {
            if (data.success == true) {
              setIsLoggedIn(true);
              window.location.href = "../app/#/start";
              window.localStorage.setItem('sessionExist', true);
            } else {
              loginInvalid(data.error);
              // console.log(data);
            }
          },
        });
  };

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
          className="min-h-screen flex items-start justify-center bg-transparent md:pt-28 pt-14 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}
        >
          <div
            className="items-center px-4 py-8 max-w-screen-md lg:grid sm:px-6 lg:px-8 xl:px-10 mx-auto gap-2"
          >
            {currentForm === 'loginForm' && (
              <div className="bg-white bg-opacity-50 px-3 py-4 sm:p-5 flex flex-col md:flex-row gap-3 rounded-lg border border-mediumgray max-w-3xl mx-auto"
              >
                <div className="px-3 sm:px-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-1 items-center sm:items-start">
                    <div className="flex items-center justify-start">
                      <a href="#" alt=''><img
                        alt="Flowbite React Logo"
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
                <div className="px-3 sm:px-5">
                  <h2 className="text-lg sm:text-2xl font-bold text-primaryColor rounded-md">
                    Login
                  </h2>
                  <p className="text-sm mt-2 sm:mt-4 text-primaryColor">
                    If you have an account, please login
                  </p>
                  <form className="mt-3 sm:mt-6" id="login-form" onSubmit={handleLogin}>
                    <div>
                      <label className="inline text-sm">User ID/ PAN/ Email </label>
                      <span className="group relative -bottom-[2px]">
                        <button className="shadow-sm"><img className="w-3" src='../images/info.svg' alt="Info" /></button>
                        <span className="absolute w-64 -top-24 -left-32 sm:left-0 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                          If you have multiple accounts with same PAN, Mobile or email, use UserId to login. <br />
                          If you don&#39;t know your userid, pls ask your advisor Or try login with PAN or email or Mobile.
                        </span>
                      </span>
                      <input
                        type="text"
                        name=""
                        value={email}
                        id="email-input"
                        placeholder=""
                        className="w-full px-3 py-2 rounded-5 bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name=""
                          id="password-input-login"
                          placeholder="********"
                          className="w-full px-3 py-2 rounded-5 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="off"
                        /><img src={showPassword ? '../images/eye-hidden.svg' : '../images/eye-show.svg'} alt="" onClick={togglePasswordVisibility} className="w-5 absolute top-6 right-3 cursor-pointer" />
                      </div>
                    </div>

                    <p className="font-medium text-left text-primaryColor cursor-pointer text-sm pt-2 pb-3 hover:underline"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </p>

                    <button type="submit" className="font-semibold px-5 py-2 rounded-5 w-full text-white bg-primaryColor hover:bg-primary_md transition ease-in-out duration-400 hover:shadow-lg">
                      Log In
                    </button>
                  </form>
                  <div className="text-sm flex justify-between items-center mt-3">
                    <p>Don&#39;t have an account?</p>
                    <Link className=" text-primaryColor font-semibold whitespace-nowrap hover:underline" href="/signup">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {currentForm === 'forgotPassword' && (
              <ForgotPasswordForm handleOtpForm={handleOtpForm} handleLoginForm={handleLoginForm} setCurrentForm={setCurrentForm} currentForm={currentForm} />
            )}

            {currentForm === 'otpForm' &&
              (<OtpForm handleNewPassword={handleNewPassword} />)
            }

            {currentForm === 'newPassword' &&
              (
                <NewPasswordForm handleLoginForm={handleLoginForm} setEmail={setEmail} email={email} />
              )}
          </div>
          <Script src="https://www.fundexpert.in/assets/js/validator.js" async />
        </section>
      </>)
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