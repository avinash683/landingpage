"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${isVisible ? 'opacity-100' : 'opacity-0'
        } fixed bottom-4 right-4 z-50 bg-primaryColor text-white rounded-full w-10 h-10 transition-opacity flex items-center justify-center`}
      onClick={scrollToTop}
    >
      <img src='../images/noun-up-arrow.svg' alt='up-arrow' className='w-5 animate-bounce' />
    </button>
  );
};

export default BackToTopButton;
