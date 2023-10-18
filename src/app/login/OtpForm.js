"use client";
import React, { useEffect } from "react";
import axios from 'axios';
import $, { error } from 'jquery';
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OtpForm({ handleNewPassword }) {
  const { addedBy } = useContext(ThemeContext);

  useEffect(() => {
    otpInfo();
  }, []);

  const otpInfo = () => toast.info("You will receive an OTP for confirmation");
  const otpInvalid = (error) => toast.error(error);

  const otpSuccess = () => {
    return new Promise((resolve) => {
      toast.success("OTP verified Successfully!", {
        onClose: () => {
          resolve(); // Resolve the Promise when the toast is closed
        },
        autoClose: 2000,
      });
    });
  }

  const enterotp = (event) => {
    event.preventDefault();

    const obj = {};
    obj.email = window.localStorage.getItem("forgotemail");
    obj.addedBy = addedBy;
    obj.otp = $("#otp-input").val().split(" ").join("");
    obj.action = "confirmOTPFE";

    window.localStorage.setItem("otp", obj.otp);

    $.ajax({
      url: "https://www.fundexpert.in/app/user",
      data: obj,
      type: "post",
      dataType: "json",
      success: function (res) {
        if (res.success == false) {
          otpInvalid("Invalid OTP");
        } else {
          otpSuccess().then(() => {
            handleNewPassword();
          })
        }
      },
      error: function (res) {
        // alert("error " + JSON.stringify(res));
        otpInvalid('Something went wrong. Please try again');
      }
    });
  };

  return (
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
      <div className="bg-white p-5 flex items-center justify-center rounded-lg bg-opacity-50 border border-mediumgray max-w-3xl mx-auto">
        <div className="px-5">
          <div className="flex justify-center items-center mb-2">
            <svg
              className="w-10 h-10 dark:text-white text-primaryColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path
                d="m17.351 3.063-8-3a1.009 1.009 0 0 0-.7 0l-8 3A1 1 0 0 0 0 4a19.394 19.394 0 0 0 8.47 15.848 1 1 0 0 0 1.06 0A19.394 19.394 0 0 0 18 4a1 1 0 0 0-.649-.937Zm-3.644 4.644-5 5A1 1 0 0 1 8 13c-.033 0-.065 0-.1-.005a1 1 0 0 1-.733-.44l-2-3a1 1 0 0 1 1.664-1.11l1.323 1.986 4.138-4.138a1 1 0 0 1 1.414 1.414h.001Z"
              />
            </svg>
          </div>
          <h2
            className="text-xl text-center font-bold text-primaryColor rounded-md"
          >
            Enter OTP Code
          </h2>
          <form className="mt-2" id="forgotpassword-otp" onSubmit={enterotp}>
            <div>
              <input
                type="number"
                name="otp"
                id="otp-input"
                className="w-full text-center px-3 py-2 rounded-5 bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                autoFocus
              />
            </div>

            <button type="submit" className="hover:shadow-lg font-semibold rounded-5 w-full px-5 py-2 text-white mt-4 bg-primaryColor hover:bg-primary_md transition ease-in-out duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}