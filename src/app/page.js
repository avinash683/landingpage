"use client";
import { HeroSection, AboutUs, Services, Features, DownloadApp, FooterSection, BackToTopButton } from '@/components'

import { ThemeContext } from './theme-provider/page';

import { useContext } from 'react';

export default function Home() {
  const { ifaData } = useContext(ThemeContext);




  return ifaData && (
    <main className="pt-16 min-h-[100vh] bg-cover bg-no-repeat" style={{ backgroundImage: `url(images/hero-banner3.jpg)` }}>
      <HeroSection ifaData={ifaData} />
      <AboutUs />
      <Services />
      <Features />
      <DownloadApp ifaData={ifaData} />
      <FooterSection ifaData={ifaData} />
      <BackToTopButton />
    </main>
  )
}
