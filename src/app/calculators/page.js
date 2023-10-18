
import Link from 'next/link';
import React from 'react';

function CalculatorsComponent() {

  const featureData = [
    {
      id: 1,
      img: '../images/sipcal.svg',
      title: 'SIP Calculator',
      description: 'An SIP calculator is a tool that helps investors calculate the maturity value of their investments made through the SIP route.',
      link: '/sipcalculator'
    },
    {
      id: 2,
      img: '../images/goalcal.svg',
      title: 'Goal SIP Calculator',
      description: 'Plan for your Goals by using this calculator to determine the monthly SIP investments you need to make to reach a particular goal over a period of time.',
      link: '/goalcalculator'
    },
    {
      id: 3,
      img: '../images/swpcal.svg',
      title: 'SWP Regular Income Calculator',
      description: 'Plan your regular withdrawals and investment sustainability with our Systematic Withdrawal Plan (SWP) calculator.',
      link: '/swpcalculator'
    }
  ]

  return (
    <section id="swpcalculator" className="bg-transparent pt-20 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-20 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-screen mb-8 lg:mb-16">
          <div className='text-center mb-5 sm:mb-8'>
            <h1 className='text-2xl md:text-4xl mb-7 font-semibold'>Calculators</h1>
            <h4 className='text-[16px] sm:text-xl font-medium'>
              Provide answers to important financial questions using the wide range of calculators available on platform. Let&apos;s begin.
            </h4>
          </div>
          <div
            className="space-y-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:space-y-0"
          >
            {
              featureData.map((item, index) => (
                <Link key={item.id} href={item.link}>
                  <div className="my-4 sm:my-0 p-3 border border-mediumgray rounded-lg md:p-5 bg-gray-50 bg-opacity-20 backdrop-blur-md">
                    <div
                      className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-white border-2 md:h-12 md:w-12 dark:bg-primary-900"
                    >
                      <img src={item.img} alt="" className="w-5 md:w-6" />
                    </div>
                    <h3 className="mb-2 text-lg sm:text-xl font-bold dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base sm:min-h-[112.5px] md:min-h-[90px]">
                      {item.description}
                    </p>

                    <div className='flex items-center justify-between mt-2 font-semibold cursor-pointer'>
                      <h4>Calculate</h4>
                      <span>&gt;</span>
                    </div>

                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CalculatorsComponent;
