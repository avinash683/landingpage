"use client";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useContext } from "react";
import $, { error } from 'jquery';
import { ThemeContext } from "@/app/theme-provider/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewPasswordForm({ handleLoginForm, setEmail, email }) {
  const { addedBy } = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevShowPassword => !prevShowPassword);
  };

  const newPasswordIncorrect = () => toast.error("Passwords do not match");
  const newPasswordError = (error) => toast.error(error)

  const newPasswordSuccess = () => {
    return new Promise((resolve) => {
      toast.success("Password Changed Successfully! Please login.", {
        onClose: () => {
          resolve(); // Resolve the Promise when the toast is closed
        },
        autoClose: 2000,
      });
    });
  }
  const handleNewPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      newPasswordIncorrect();
      return;
    }

    const obj = {};
    obj.passwordResetEmail = window.localStorage.getItem("forgotemail");
    obj.password = $("#newpassword1-input").val();
    obj.confirmpassword = $("#newpassword2-input").val();
    obj.action = "resetPasswordFE";
    obj.verificationCode = window.localStorage.getItem("otp");

    $.ajax({
      url: "https://www.fundexpert.in/app/user",
      data: obj,
      type: "post",
      dataType: "json",
      success: function (res) {
        if (res.success == false) {
          newPasswordError(res.error);
        } else {
          newPasswordSuccess().then(() => {
            setEmail(window.localStorage.getItem('forgotemail'));
            handleLoginForm();
          });
        }
      },
      error: function (res) {
        // alert(JSON.stringify(res));
        newPasswordError('Something went wrong. Please try again')
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
      <div className="bg-white p-5 flex items-center justify-center rounded-lg bg-opacity-50 border border-mediumgray max-w-3xl mx-auto"
      >
        <div className="px-5">
          <h2 className="text-xl font-bold text-[#002D74] rounded-md">
            Set New Password
          </h2>
          <form className="mt-6" id="forgotpassword-password" onSubmit={handleNewPassword} >
            <div>
              <label className="block text-sm">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name=""
                  id="newpassword1-input"
                  placeholder="********"
                  className="w-full px-3 py-2 rounded-5 bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                /><img src={showPassword ? '../images/eye-hidden.svg' : '../images/eye-show.svg'} alt="" onClick={togglePasswordVisibility} className="w-5 absolute top-6 right-3 cursor-pointer" />
              </div>

            </div>

            <div className="mt-4">
              <label className="block text-sm">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="newpassword2-input"
                  placeholder="********"
                  value={confirmPassword}
                  className="w-full px-3 py-2 rounded-5 bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                /><img src={showConfirmPassword ? '../images/eye-hidden.svg' : '../images/eye-show.svg'} alt="" onClick={toggleConfirmPasswordVisibility} className="w-5 absolute top-6 right-3 cursor-pointer" />
              </div>

            </div>

            <button type="submit" className="hover:shadow-lg font-semibold px-5 py-2 text-white rounded-5 w-full mt-4 bg-primaryColor hover:bg-primary_md transition ease-in-out duration-300">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}