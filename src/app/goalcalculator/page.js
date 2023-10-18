"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function GoalCalculator() {

  const [userInput, setUserInput] = useState({
    amount: '250000',
    cagr: '15',
    period: '5',
  });

  const [errors, setErrors] = useState({
    amount: '',
    cagr: '',
    period: '',
  });

  const [contentAmount, setContentAmount] = useState();
  const [contentYear, setContentYear] = useState();
  const [monthlyAmount, setMonthlyAmount] = useState();

  const handleInputChange = (event) => {

    const { name, value } = event.target;

    if (value === '' || isNaN(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Please fill this required field.',
      }));

      setUserInput((prevFormData) => ({
        ...prevFormData,
        [name]: 0,
      }));

    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));

      setUserInput((prevFormData) => ({
        ...prevFormData,
        [name]: parseFloat(value),
      }));

    }
  };

  useEffect(() => {
    formCalculation();
  }, [userInput]);


  const formCalculation = () => {

    const { amount, cagr, period } = userInput;

    let totalCI = parseFloat(amount);
    let newCagr = parseFloat(cagr) / 100;
    let newDuration = parseFloat(period);

    var durInMonth = newDuration * 12;
    var t = 0;
    var monthlyAmt = 0;
    var profit;
    var result;
    var investedAmount;

    if (newDuration === 0) {
      profit = 0;
      result = totalCI;
      investedAmount = totalCI;
    }

    else {

      for (let i = durInMonth; i >= 1; i--) {
        t = Math.pow(1 + newCagr / 12, i);
        monthlyAmt += t;
      }

      result = totalCI / monthlyAmt;
      investedAmount = result * durInMonth;
      profit = totalCI - investedAmount;
    }

    const numToWord = (val) => {
      if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr';
      else if (val >= 100000) val = (val / 100000).toFixed(2) + ' L';
      else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K';
      return val;
    }

    if (isNaN(totalCI)) {
      totalCI = 0;
      setContentAmount(numToWord(parseInt(totalCI)));
    } else {
      setContentAmount(numToWord(parseInt(totalCI)));
    }

    if (isNaN(result)) {
      result = 0;
      setMonthlyAmount(numToWord(parseInt(result)))
    } else {
      setMonthlyAmount(numToWord(parseInt(result)))
    }

    if (isNaN(newDuration)) {
      newDuration = 0;
      setContentYear(numToWord(parseInt(newDuration)))
    } else {
      setContentYear(numToWord(parseInt(newDuration)))
    }
  }

  return (
    <section id="goalcalculator" className="bg-transparent pt-20   bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-14 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="text-2xl lg:text-3xl text-center sm:text-left font-medium mb-4">GOAL SIP Planner</h2>
        <div className="p-5 text-sm sm:text-base rounded-lg bg-white border border-lightgray" >
          <p>Plan for your Goals by using this calculator to determine the monthly SIP investments you need to make to reach a particular goal over a period of time.
          </p>
        </div>
        <div className="space-y-8 grid-cols-1 md:grid md:grid-cols-12 md:gap-12 md:space-y-0 py-4">
          <div className="col-span-4 bg-white p-5 rounded-lg border border-lightgray">
            <form className="my-6" action="#" method="POST">
              <div>
                <label className="text-sm">Expected Amount (In Rs)
                </label>
                <input
                  type="text"
                  name="amount"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  onChange={handleInputChange}
                  value={userInput.amount}
                />
                {errors.amount && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please enter a valid Amount</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm">Expected Annual Returns CAGR (%)</label>
                <input
                  type="text"
                  name="cagr"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={handleInputChange}
                  value={userInput.cagr}
                  required
                />
                {errors.cagr && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please enter a valid CAGR</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm">Investment Period (Yrs)
                </label>
                <input
                  type="text"
                  name="period"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  onChange={handleInputChange}
                  value={userInput.period}
                />
                {errors.period && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please enter a valid Period</div>}
              </div>
            </form>
          </div>
          <div className="col-span-8 bg-white bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center gap-5 p-5 rounded-lg border border-lightgray">
            <div className="text-center bg-white h-full w-full flex-col flex items-center justify-center p-4 rounded-md border border-lightgray">
              <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-600">GOAL TARGET</h3>
              <p className="text-lg md:text-xl font-medium text-gray-500">Rs. <span className="text-primaryColor text-lg md:text-xl font-medium">{contentAmount}</span> in <span className="text-primaryColor text-lg md:text-xl font-medium">{contentYear}</span> {contentYear > 1 ? <>Years</> : <>Year</>}</p>
            </div>
            <div className="h-full w-full bg-white rounded-md border border-lightgray">
              <div className="text-center w-full h-full flex flex-col items-center justify-center p-2">
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-600">To Accomplish your Target, You will need to Invest</h3>
                <p className="text-lg md:text-xl font-medium text-gray-500">Rs. <span className="text-primaryColor text-lg md:text-xl font-medium">{monthlyAmount}</span> Monthly for <span className="text-primaryColor text-lg md:text-xl font-medium">{contentYear}</span> {contentYear > 1 ? <>Years</> : <>Year</>}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
