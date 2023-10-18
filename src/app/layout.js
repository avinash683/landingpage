"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import ThemeProvider from './theme-provider/page'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import axios from 'axios';
import ErrorComponent from '@/components/ErrorPage';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  const [errorPage, setErrorPage] = useState(true);
  const [title, setTitle] = useState("");
  const [favicon, setFavicon] = useState();

  useEffect(() => {

    const getTitle = async () => {
      let config = {
        method: 'get',
        url: `https://www.fundexpert.in/app/user?action=getIfaDetail&url=${window.location.origin}`,
      };

      axios.request(config)
        .then((response) => {
          const getData = response.data;
          setTitle(getData.data.title);
          setFavicon(getData.data.logo);
          localStorage.setItem('addedBy', getData.data.addedBy);
          setErrorPage(true);
        })
        .catch((error) => {
          setErrorPage(false)
          console.log(error);
        });
    }

    getTitle();

  }, []);

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <link rel="shortcut icon" href={favicon} />
      </head>
      <body className={inter.className}>
        {errorPage != false ?
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
          :
          <ErrorComponent />
        }
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js" async />
        <Script src="https://www.fundexpert.in/assets/js/validator.js" async />
      </body>
    </html>
  )
}