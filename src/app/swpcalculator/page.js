"use client";
import React from "react";
import { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default function SwpCalculator() {
  const [investmentData, setInvestmentData] = useState([]);
  const [capitalLeftChart, setCapitalLeftChart] = useState();
  const [yearChart, setYearChart] = useState();


  const [userInput, setUserInput] = useState({
    amount: '2500000',
    monthlyExpense: '50000',
    assetAllocationDebt: '70',
    assetAllocationEquity: '30',
    equityReturns: '15',
    debtReturns: '8',
    yearlyExpense: '5',
  });

  const [errors, setErrors] = useState({
    amount: '',
    monthlyExpense: '',
    assetAllocationDebt: '',
    assetAllocationEquity: '',
    equityReturns: '',
    debtReturns: '',
    yearlyExpense: '',
  });

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
  }, [userInput])

  const financeCalculation = () => {

    const { amount, monthlyExpense, assetAllocationDebt, assetAllocationEquity, equityReturns, debtReturns, yearlyExpense } = userInput;

    let amountValue = parseFloat(amount);
    let monthlyExpenseValue = parseFloat(monthlyExpense);
    let assetAllocationDebtValue = parseFloat(assetAllocationDebt);
    let assetAllocationEquityValue = parseFloat(assetAllocationEquity);
    let equityReturnsValue = (parseFloat(equityReturns) + 100) / 100;
    let debtReturnsValue = (parseFloat(debtReturns) + 100) / 100;
    let yearlyExpenseValue = (parseFloat(yearlyExpense) + 100) / 100;

    (assetAllocationDebtValue + assetAllocationEquityValue) !== 100 && alert("Kindly enter valid input for Asset Allocation(Debt) And Asset Allocation(Equity) because addition of Asset Allocation(Debt) and Asset Allocation(Equity) should be equal to 100");

    let preExpenseValue = 0;
    let yearlyAppreciation = 0;
    let expense = 0;
    let capitalLeft = 1;
    let debtCapital = 0;
    let equityCapital = 0;
    let i = 0;
    const data = [];

    let expenseArray = [], capitalLeftArray = [], debtCapitalArray = [], equityCapitalArray = [], yearlyAppreciationArray = [], preExpenseValueArray = [];

    while (capitalLeft > 0 && i < 20) {

      if (i === 0) {
        expense = parseFloat(monthlyExpenseValue * 12);
        debtCapital = parseFloat(((amountValue * assetAllocationDebtValue) / 100) * debtReturnsValue);
        equityCapital = parseFloat(((amountValue * assetAllocationEquityValue) / 100) * equityReturnsValue);
        preExpenseValue = parseFloat(debtCapital + equityCapital);
        yearlyAppreciation = parseFloat(preExpenseValue - amountValue);
        capitalLeft = parseFloat(preExpenseValue - expense);

        capitalLeftArray.push(capitalLeft);
        expenseArray.push(expense);
        debtCapitalArray.push(debtCapital);
        equityCapitalArray.push(equityCapital);
        yearlyAppreciationArray.push(yearlyAppreciation);
        preExpenseValueArray.push(preExpenseValue);
      }
      else if (i === 1) {
        expense = parseFloat((monthlyExpenseValue * 12) * yearlyExpenseValue);
        debtCapital = parseFloat((debtCapitalArray[i - 1] - expenseArray[i - 1] * 0.7) * debtReturnsValue);
        equityCapital = parseFloat((equityCapitalArray[i - 1] - expenseArray[i - 1] * 0.3) * equityReturnsValue);
        preExpenseValue = parseFloat(debtCapital + equityCapital);
        yearlyAppreciation = parseFloat(preExpenseValue - capitalLeftArray[i - 1]);
        capitalLeft = parseFloat(preExpenseValue - expense);

        capitalLeftArray.push(capitalLeft);
        expenseArray.push(expense);
        debtCapitalArray.push(debtCapital);
        equityCapitalArray.push(equityCapital);
        yearlyAppreciationArray.push(yearlyAppreciation);
        preExpenseValueArray.push(preExpenseValue);
      }
      else {
        console.log(yearlyExpenseValue)
        expense = parseFloat(expenseArray[i - 1] * yearlyExpenseValue);
        debtCapital = parseFloat((debtCapitalArray[i - 1] - expenseArray[i - 1] * 0.7) * debtReturnsValue);
        equityCapital = parseFloat((equityCapitalArray[i - 1] - expenseArray[i - 1] * 0.3) * equityReturnsValue);
        preExpenseValue = parseFloat(debtCapital + equityCapital);
        yearlyAppreciation = parseFloat(preExpenseValue - capitalLeftArray[i - 1]);
        capitalLeft = parseFloat(preExpenseValue - expense);

        capitalLeftArray.push(capitalLeft);
        expenseArray.push(expense);
        debtCapitalArray.push(debtCapital);
        equityCapitalArray.push(equityCapital);
        yearlyAppreciationArray.push(yearlyAppreciation);
        preExpenseValueArray.push(preExpenseValue);
      }

      data.push({
        year: i + 1,
        preExpenseValue: preExpenseValue.toFixed(2),
        expense: expense.toFixed(2),
        yearlyAppreciation: yearlyAppreciation.toFixed(2),
        capitalLeft: capitalLeft.toFixed(2),
        debtCapital: debtCapital.toFixed(2),
        equityCapital: equityCapital.toFixed(2),
      });
      i++;
    }
    setCapitalLeftChart(capitalLeftArray)
    setYearChart(data.year)
    setInvestmentData(data)
  }
  const options = {
    chart: {
      type: "area",
    },

    title: {
      text: 'Account Balance',
    },

    credits: {
      enabled: false,
    },

    yAxis: {
      title: {
        text: "Lacs",
      },
      labels: {
        formatter: function () {
          return this.value / 100000;
        },
      },
    },

    xAxis: {
      title: {
        text: "End Of The Year",
      },
      categories: yearChart,
      tickmarkPlacement: "on",
    },

    tooltip: {
      split: true,
      valuePrefix: "Rs. ",
    },

    plotOptions: {
      area: {
        fillColor: "#497cb6",
        stacking: "normal",
        lineColor: "#003974",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#003974",
        },
      },
    },

    series: [
      {
        name: "Balance Left",
        data: capitalLeftChart,
      },
    ],
  };

  return (
    <section id="swpcalculator" className="bg-transparent pt-20 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(../images/hero-banner3.jpg)` }}>
      <div className="py-10 px-4 mx-auto max-w-screen-xl sm:py-14 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="text-2xl lg:text-3xl text-center sm:text-left font-medium mb-4">SWP (Systematic Withdrawal Plan) Calculator</h2>
        <div className="p-5 rounded-lg bg-white border border-lightgray" >
          <p className="text-sm sm:text-base">SWP (Systematic Withdrawal Plan) is an investment approach designed to provide regular income for
            individuals, particularly retirees or investors seeking consistent earnings. With this strategy, a fixed
            amount of money is withdrawn at regular intervals from the individual&#39;s investment portfolio. The intervals
            can be chosen based on the person&#39;s financial requirements and preferences, ranging from monthly and quarterly
            to semi-annually or annually.</p>
          <br></br>
          <p className="text-sm sm:text-base">Use the SWP calculator given below to determine the amount you can withdraw from your lump sum investments.</p>
        </div>
        <div className="space-y-8 grid-cols-1 md:grid md:grid-cols-12 md:gap-12 md:space-y-0 py-8">
          <div className="col-span-4 bg-white p-5 rounded-lg border border-lightgray">
            <form className="text-left">
              <div>
                <label className="text-sm">Total Amount In Funds (Rs)
                </label>
                <input
                  type="text"
                  name="amount"
                  id=""
                  value={userInput.amount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
                {errors.amount && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please enter a valid Amount</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm ">Monthly expense (Rs)</label>
                <input
                  type="text"
                  name="monthlyExpense"
                  id=""

                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={userInput.monthlyExpense}
                  onChange={handleInputChange}
                  required
                />
                {errors.monthlyExpense && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please fill this required field</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm ">Asset Allocation (Debt) (%)
                </label>
                <input
                  type="text"
                  name="assetAllocationDebt"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.assetAllocationDebt}
                  onChange={handleInputChange}
                />
                {errors.assetAllocationDebt && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please fill this required field</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm ">Asset Allocation (Equity) (%)
                </label>
                <input
                  type="text"
                  name="assetAllocationEquity"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.assetAllocationEquity}
                  onChange={handleInputChange}
                />
                {errors.assetAllocationEquity && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please fill this required field</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm ">Expected Equity returns In Funds (%)
                </label>
                <input
                  type="text"
                  name="equityReturns"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.equityReturns}
                  onChange={handleInputChange}
                />
                {errors.equityReturns && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please fill this required field</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm ">Expected Debt returns In Funds (%)
                </label>
                <input
                  type="text"
                  name="debtReturns"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.debtReturns}
                  onChange={handleInputChange}
                />
                {errors.debtReturns && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please fill this required field.</div>}
              </div>

              <div className="mt-4">
                <label className="block text-sm ">Yearly Expense Inflation (%)
                </label>
                <input
                  type="text"
                  name="yearlyExpense"
                  id=""
                  className="w-full px-3 py-2 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={userInput.yearlyExpense}
                  onChange={handleInputChange}
                />
                {errors.yearlyExpense && <div className="font-medium text-sm mt-1 text-red-600" id="amountError">Please fill this required field.</div>}
              </div>
            </form>
          </div>
          <div className="col-span-8 bg-white flex flex-col items-stretch justify-center gap-5 p-5 rounded-lg border border-lightgray">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>

        <div className="relative overflow-x-auto p-3 bg-white rounded-lg border border-lightgray">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className="font-semibold text-xs md:text-base border-b-2 border-darkgray">
              <tr>
                <th className="py-3 px-2 font-medium">
                  End Of Year
                </th>
                <th className="py-3 px-2 font-medium">
                  Pre-Expense Value
                </th>
                <th className="py-3 px-2 font-medium">
                  Expense
                </th>
                <th className="py-3 px-2 font-medium">
                  Year Appreciation
                </th>
                <th className="py-3 px-2 font-medium">
                  Capital Left
                </th>
                <th className="py-3 px-2 font-medium">
                  Debt Capital
                </th>
                <th className="py-3 px-2 font-medium">
                  Equity Capital
                </th>
              </tr>
            </thead>
            <tbody>
              {investmentData.map((item) => (
                <tr key={item.year} className="bg-white border-b text-black font-normal dark:border-gray-700">
                  <td className="py-3 px-2 text-xs md:text-sm">{item.year}</td>
                  <td className="py-3 px-2 text-xs md:text-sm">{item.preExpenseValue}</td>
                  <td className="py-3 px-2 text-xs md:text-sm">{item.expense}</td>
                  <td className="py-3 px-2 text-xs md:text-sm">{item.yearlyAppreciation}</td>
                  <td className="py-3 px-2 text-xs md:text-sm">{item.capitalLeft}</td>
                  <td className="py-3 px-2 text-xs md:text-sm">{item.debtCapital}</td>
                  <td className="py-3 px-2 text-xs md:text-sm">{item.equityCapital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}