import React from "react"

export default function ErrorComponent() {
  return (
    <section
      className="min-h-screen flex items-start justify-center pt-14 bg-transparent md:pt-28  bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>

      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-20 sm:px-6 lg:px-8 xl:px-10">
        <div
          className="items-center justify-center lg:py-4 flex flex-col"
        >
          <h1 className="text-primaryColor text-xl sm:text-4xl font-semibold">Oops! Something went wrong</h1>
        </div>
      </div>
    </section>
  )
}