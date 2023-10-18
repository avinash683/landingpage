"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/app/theme-provider/page";

export default function Navbar() {
  const { ifaData, isLoggedIn } = useContext(ThemeContext);
  const [navbarChange, setNavbarChange] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let navbar = window.sessionStorage.getItem('navbar')
    if (navbar === 'false') {
      setNavbarChange(false);
    }
  }, [])


  const HandleNavbarChange = () => {
    setNavbarChange(false);
    window.sessionStorage.setItem('navbar', false)
  }

  const HandleHomeChange = () => {
    setNavbarChange(true);
    window.sessionStorage.setItem('navbar', true)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const HandleToggleNavbarChange = () => {
    toggleDropdown();
    // HandleNavbarChange();
  }

  const HandleToggleHomeChange = () => {
    toggleDropdown();
    HandleHomeChange();
  }

  return ifaData && (
    <header className="bg-[#EBF4F8] fixed top-0 w-full z-50">
      <div className=" mx-auto max-w-screen-xl px-3 sm:px-6 lg:px-8 xl:px-10 w-full">
        <nav className="py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex items-center justify-center gap-3">
                <div>
                  <Link href="/" onClick={HandleHomeChange}>
                    <img alt="Logo" className="mr-3 h-10 sm:h-12" src={ifaData?.logo} />
                  </Link>
                </div>
                <div className="hidden lg:flex items-center justify-between gap-6">
                  <Link className="link text-sm font-medium text-black hover:text-primary_md" onClick={HandleHomeChange} href="/">Home</Link>
                  <a className="text-sm font-medium text-black hover:text-primary_md" href="#aboutus">About Us</a>
                  <a className="text-sm font-medium text-black hover:text-primary_md" href="#services">Services</a>
                  <a className="text-sm font-medium text-black hover:text-primary_md" href="#features">Features</a>
                  <a className="text-sm font-medium text-black hover:text-primary_md" href="#contact">Contact</a>
                  <Link  className="link text-sm font-medium text-black hover:text-primary_md" href="/nfo">NFO</Link>
                  <Link  className="link text-sm font-medium text-black hover:text-primary_md" href="/ipo">IPO</Link>
                  <Link  className="link text-sm font-medium text-black hover:text-primary_md" href="/calculators">Calculators</Link>
              </div>
              </div>
              <div className="flex items-center justify-center gap-4">

                {isLoggedIn ?
                  <>
                    <button onClick={() => { window.location.href = '../app/#/start' }} className=" px-5 py-2 rounded-5 text-sm sm:text-base bg-primaryColor hover:bg-primary_md text-white font-semibold hover:text-white hover:bg-white! transition ease-in-out delay-50 hover:scale-105 duration-300">Go To Dashboard</button>
                  </>
                  :
                  <>
                    <Link href="/login">
                      <button className=" px-5 py-2 hidden sm:block rounded-5 text-sm sm:text-base bg-primaryColor hover:bg-primary_md text-white font-semibold hover:text-white hover:bg-white! transition ease-in-out delay-50 hover:scale-105 duration-300">Log In</button>
                    </Link>
                    <Link href="/signup">
                      <button className="bg-white hidden sm:block rounded-5 px-5 py-2 border-[0.8px] border-primaryColor text-primaryColor border-5 font-semibold transition ease-in-out hover:scale-105 duration-100">Sign Up</button>
                    </Link>
                  </>
                }
                <div className="lg:hidden flex items-center">
                  <button
                    onClick={toggleDropdown}
                    className="text-primaryColor w-8 h-8  rounded-sm hover:text-gray-300 focus:outline-none transition duration-1000 ease-in-out"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {isOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      )}
                    </svg>
                  </button>
                </div>

              </div>

            </div>
            {/* Mobile Dropdown */}
            {isOpen && (
              <div className="lg:hidden text-md min-h-screen text-center mt-2 p-4 bg-white bg-opacity-30 shadow-md border border-gray-200 rounded-lg flex flex-col justify-start items-center gap-2">
                {isLoggedIn ?
                  <></>
                  :
                  <>
                    <Link onClick={HandleToggleNavbarChange} href='/login' className="w-full sm:hidden"><button className="w-full bg-primaryColor rounded-5 py-2 font-bold text-white hover:bg-primary_md">Login</button></Link>

                    <Link onClick={HandleToggleNavbarChange} href='/signup' className="w-full sm:hidden "><button className="w-full bg-white rounded-5 py-2 font-bold text-primaryColor hover:bg-gray-100 border border-primaryColor">Sign Up</button></Link>
                  </>
                }
                <Link className="link py-2 font-medium text-primaryColor hover:text-primary_md" href="/" onClick={HandleToggleHomeChange}>Home</Link>
                {navbarChange &&
                  <>
                    <a onClick={toggleDropdown}
                      className="block px-4 py-2 font-medium text-primaryColor hover:text-primary_md"
                      href="#aboutus"
                    >
                      About Us
                    </a>
                    <a onClick={toggleDropdown}
                      className="block px-4 py-2 font-medium text-primaryColor hover:text-primary_md"
                      href="#services"
                    >
                      Services
                    </a>
                    <a onClick={toggleDropdown}
                      className="block px-4 py-2 font-medium text-primaryColor hover:text-primary_md"
                      href="#features"
                    >
                      Features
                    </a>
                    <a onClick={toggleDropdown}
                      className="block px-4 py-2 font-medium text-primaryColor hover:text-primary_md"
                      href="#contact"
                    >
                      Contact
                    </a>
                  </>}
                <Link onClick={HandleToggleNavbarChange} className=" py-2 font-medium text-primaryColor hover:text-primary_md" href="/nfo">NFO</Link>
                <Link onClick={HandleToggleNavbarChange} className=" py-2 font-medium text-primaryColor hover:text-primary_md" href="/ipo">IPO</Link>
                <Link onClick={HandleToggleNavbarChange} className="py-2 font-medium text-primaryColor hover:text-primary_md" href="/calculators">Calculators</Link>

              </div>
            )}


          </div>
        </nav>
      </div>
    </header>
  )
}