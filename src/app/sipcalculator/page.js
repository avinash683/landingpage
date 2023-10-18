"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function BackSipCalculator() {

  const [profitMf, setProfitMf] = useState([])
  const [profitFd, setProfitFd] = useState([])
  const [chartDuration, setChartDuration] = useState();

  const [userInput, setUserInput] = useState({
    amount: '250000',
    cagr: '15',
    period: '10',
  });

  const [errors, setErrors] = useState({
    amount: '',
    cagr: '',
    period: '',
  });

  const [mutualFundAmount, setMutualFundAmount] = useState();
  const [sumInvestedAmount, setSumInvestedAmount] = useState();
  const [fdAmount, setFdAmount] = useState();
  const [cagrRate, setCagrRate] = useState();

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
    financeCalculation();
  }, [userInput]);

  const financeCalculation = () => {

    const { amount, cagr, period } = userInput;

    let rate, investedAmountMF, investedAmountFD;


    let amt = parseFloat(amount);
    rate = parseFloat(cagr) / 100;
    var newDuration = parseFloat(period);

    let durInMonth = newDuration * 12;

    var profitMF = [];
    var profitFD = [];

    let i, CI, totalCI = 0, t, totalCIFD = 0, CI1, t1;
    let timeMonth = durInMonth;
    let timeMonth1 = durInMonth;
    let investedAmount;

    if (newDuration === 0) {
      totalCI = amt;
      totalCIFD = amt;
      investedAmount = amt;
      var profit = 0;
      var profit1 = 0;
    }

    else {

      for (i = 1; i <= durInMonth; i++) {

        t = timeMonth / 12;

        CI = amt * Math.pow((1 + (rate / 12)), (12 * t));

        totalCI = totalCI + CI;
        investedAmountMF = amt * i;
        profitMF[i - 1] = parseInt(totalCI - investedAmountMF);

        timeMonth = timeMonth - 1;
      }

      for (i = 1; i <= durInMonth; i++) {
        t1 = timeMonth1 / 12;
        CI1 = amt * Math.pow((1 + (0.07 / 12)), (12 * t1));

        totalCIFD = totalCIFD + CI1;
        investedAmountFD = amt * i;
        profitFD[i - 1] = parseInt(totalCIFD - investedAmountFD);
        timeMonth1 = timeMonth1 - 1;
      }

      investedAmount = amt * durInMonth;
      profit = totalCI - investedAmount;
      profit1 = totalCIFD - investedAmount;
    }

    setChartDuration(newDuration);
    setProfitFd(profitFD);
    setProfitMf(profitMF);

    function numToWord(val) {
      if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr';
      else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lac';
      else if (val >= 1000) val = (val / 1000).toFixed(2) + 'K';
      return val;
    }

    totalCI = isNaN(totalCI) ? '0' : totalCI;
    rate = isNaN(totalCI) ? '0' : rate;
    investedAmount = isNaN(investedAmount) ? '0' : investedAmount;
    totalCIFD = isNaN(totalCIFD) ? '0' : totalCIFD;
    rate = isNaN(rate) ? '0' : rate;

    setMutualFundAmount(numToWord(parseInt(totalCI)))
    setFdAmount(numToWord(parseInt(totalCIFD)))
    setSumInvestedAmount(numToWord(parseInt(investedAmount)))
    setCagrRate(rate * 100);
  }

  const options = {
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: 'Profit Amount',
      },
    },
    xAxis: {
      title: {
        text: 'Years',
      },
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%Y',
      },
      tickInterval: 1,
      max: chartDuration,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
    },
    plotOptions: {
      series: {
        pointStart: 1,
      },
    },
    series: [
      {
        name: 'Mutual Funds',
        data: profitMf,
      },
      {
        name: 'Fixed Deposit',
        data: profitFd,
      },
    ],
  };

  return (

    <section id="sipcalculator" className="bg-cover bg-no-repeat pt-20"
      style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
      <div className="py-7 px-4 text-center sm:text-left mx-auto max-w-screen-xl sm:py-14 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="text-2xl lg:text-3xl text-center sm:text-left font-medium mb-4">SIP (Systematic Investment Plan) Planner</h2>
        <div className="p-5 rounded-lg bg-white border border-lightgray" >
          <p className="text-sm sm:text-base">A SIP (Systematic Investment Plan) is an investment strategy offered by mutual funds to investors.
            It is a disciplined approach to investing, where individuals can regularly invest a fixed amount of
            money at predefined intervals (usually monthly or quarterly) into a mutual fund of their choice.
            Each time a SIP installment is made, units of the mutual fund are purchased at the prevailing Net Asset
            Value (NAV) of the fund.</p>
          <br></br>
          <p className=" text-sm sm:text-base">Use the SIP calculator given below to determine the returns on their mutual fund investments made through SIP.</p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-12 md:gap-12 md:space-y-0 py-4">
          <div className="col-span-4 bg-white p-5 rounded-lg border-lightgray border">
            <form className="my-6">
              <div className="text-left">
                <label className="text-sm text-left">Monthly Amount (Rs)
                </label>
                <input
                  type="text"
                  name="amount"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.amount}
                  onChange={handleInputChange}
                />
                {errors.amount && <div className="font-medium text-sm mt-1 text-red-600">{errors.amount}</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm text-left">Expected Annual Returns CAGR (%)</label>
                <input
                  type="text"
                  name="cagr"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.cagr}
                  onChange={handleInputChange}
                />
                {errors.cagr && <div className="font-medium text-sm mt-1 text-red-600">{errors.cagr}</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm text-left">Investment Period (Yrs)
                </label>
                <input
                  type="text"
                  name="period"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.period}
                  onChange={handleInputChange}
                />
                {errors.period && <div className="font-medium text-sm mt-1 text-red-600">{errors.period}</div>}
              </div>
            </form>
          </div>
          <div className="col-span-8 bg-white flex flex-col items-center justify-center gap-5 p-5 rounded-lg border border-lightgray">
            <div className="text-center h-full w-full flex-col flex items-center justify-center p-4 rounded-md bg-white border border-lightgray">
              <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-600">Projected Mutual Funds Returns</h3>
              <p className="text-lg md:text-2xl font-medium text-gray-500">&#8377; <span className="text-primaryColor text-lg md:text-2xl font-medium">{mutualFundAmount}</span></p>
            </div>
            <div className="h-full w-full grid sm:grid-cols-3 gap-4 items-center justify-center">
              <div className="text-center rounded-md p-3 bg-white border border-lightgray">
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-600">FD Returns</h3>
                <p className="text-lg md:text-xl font-medium text-gray-500">&#8377; <span className="text-primaryColor text-lg md:text-xl font-medium">{fdAmount}</span></p>
              </div>
              <div className="text-center rounded-md p-3 bg-white border border-lightgray">
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-600">Total Sum Invested</h3>
                <p className="text-lg md:text-xl font-medium text-gray-500">&#8377; <span className="text-primaryColor text-lg md:text-xl font-medium">{sumInvestedAmount}</span></p>
              </div>
              <div className="text-center rounded-md p-3 bg-white border border-lightgray">
                <h3 className="font-semibold text-lg md:text-xl mb-2 text-gray-600">CAGR</h3>
                <p className="text-lg md:text-xl font-medium text-gray-500"><span className="text-primaryColor text-lg md:text-xl font-medium">{cagrRate}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="p-3 md:p-8 bg-white rounded-lg border border-lightgray">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </section>

  )
}