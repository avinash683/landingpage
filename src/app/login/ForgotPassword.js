"Use Client";
import React, { useState } from "react";
import $ from "jquery";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPasswordForm({ handleOtpForm, handleLoginForm, setCurrentForm }) {
  const { addedBy } = useContext(ThemeContext);

  const handleLoginPage = () => {
    setCurrentForm('loginForm');
  }

  const forgotInvalid = (error) => toast.error(error)

  const forgotpasswordemail = (event) => {
    event.preventDefault();
        const obj = {};
        // captcha token 
        obj.token = token;
        obj.captcha = 1;
        obj.email = $("#forgot-password-email-input").val();
        obj.addedBy = addedBy;
        obj.action = "forgotPasswordOTPFE";

        window.localStorage.setItem("forgotemail", obj.email);

        $.ajax({
          url: "https://www.fundexpert.in/app/user",
          data: obj,
          type: "post",
          dataType: "json",
          success: function (res) {
            if (res.success == false) {
              // alert(res.error);
              forgotInvalid(res.error);
            } else {
              handleOtpForm();
            }
          },
          error: function (res) {
            // alert(JSON.stringify(res));
            forgotInvalid('Something went wrong. Please try again')
          }
        });
  }

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
          <h2 className="text-xl font-bold text-primaryColor rounded-md">
            Forgot Password?
          </h2>
          <form className="mt-6" id="forgotpassword-email" onSubmit={forgotpasswordemail}>
            <div>
              <label className="block text-sm ">User ID/ PAN/ Email</label>
              <input
                type="text"
                name="email"
                id="forgot-password-email-input"
                placeholder=""
                className="w-full px-3 py-2 rounded-5 bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                autoFocus
              />
            </div>
            <button type="submit" className="font-semibold w-full rounded-5 px-5 py-2 mt-4 text-white bg-primaryColor hover:bg-primary_md transition ease-in-out duration-300  hover:shadow-lg" >
              Submit
            </button>
          </form>
          <p className="font-medium mt-3 text-primaryColor hover:underline cursor-pointer text-sm" onClick={handleLoginForm && handleLoginPage}
          >Back to Login</p>
        </div>
      </div>
    </>
  )
}