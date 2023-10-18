'use client'

import { createContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [ifaData, setIfaData] = useState();
  const [addedBy, setAddedBy] = useState();

  useEffect(() => {

    const ifaDataHandle = async () => {
      let config = {
        method: 'get',
        url: `https://www.fundexpert.in/app/user?action=getIfaDetail&url=https://ifa.fundexpert.net`,
      };

      axios.request(config)
        .then((response) => {
          const ifaDetails = response.data;
          setIfaData(ifaDetails.data);
          setAddedBy(ifaDetails.data.addedBy);
          window.localStorage.setItem('addedBy', ifaDetails.data.addedBy);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    // 
    const checkSession = async () => {
      console.log('called');
      const obj = {};
      obj.action = "checkSession"

      try {
        const response = await axios.get('https://staging.fundexpert.in/app/user', {
          params: obj
        });

        const res = response.data;

        if (res.success === false) {
          console.log("session exists");
          window.localStorage.setItem('sessionExist', true);
          setIsLoggedIn(true);
          //alert("false..");
        }
        else {
          console.log("session not exists");
          window.localStorage.setItem('sessionExist', false);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error:', error);
        console.log('error ' + JSON.stringify(error));
      }
    };

    ifaDataHandle();
    checkSession();

  }, []);

  return <ThemeContext.Provider value={{ ifaData, setIfaData, addedBy, isLoggedIn, setIsLoggedIn }}>{children}</ThemeContext.Provider>
}