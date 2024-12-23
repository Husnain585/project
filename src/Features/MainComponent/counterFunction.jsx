import React, { useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import { FaArrowTrendUp, FaGift} from "react-icons/fa6";
import { FaHandHolding } from "react-icons/fa6";

const CounterUp = () => {
  const counterUp = (element, options) => {
    const defaultOptions = {
      time: 400,
      delay: 10,
    };
    const settings = { ...defaultOptions, ...options };

    let currentValue = 0;
    const targetValue = parseInt(element.textContent.replace(/,/g, ""), 10);
    const duration = settings.time / settings.delay;
    const increment = targetValue / duration;

    const updateValue = () => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }
      const formattedValue = currentValue.toLocaleString(); // Adds commas to the number
      element.textContent = formattedValue;
    };

    const interval = setInterval(updateValue, settings.delay);
  };

  useEffect(() => {
    const elements = [
      { id: "counter1", time: 700, delay: 20 },
      { id: "counter2", time: 800, delay: 18 },
      { id: "counter3", time: 900, delay: 16 },
      { id: "counter4", time: 700, delay: 14 },
    ];

    elements.forEach(({ id, time, delay }) => {
      const element = document.getElementById(id);
      if (element) {
        counterUp(element, { time, delay });
      }
    });
  }, []);

  return (
    <div className="w-[100]">
      <div className="grid grid-cols-1 md:grid-cols-4 h-40 gap-x-10 items-center">
         {/* Spacer */}
        <div className="bg-gray-100  p-4 text-center rounded shadow-xl ">
          <h5 className="text-2xl font-bold text-blue-500" id="counter1">
            720 
          </h5>
          <FaGift  className="relative text-blue-500 left-44 bottom-6 scale-150"/>
          <p className="text-gray-700 font-semibold">  Products</p>
        </div>
        <div className="bg-gray-100 p-4 text-center rounded shadow-xl">
          <h5 className="text-2xl font-bold text-blue-500" id="counter2">
            4920
          </h5>
          <FaHandHolding  className="relative text-blue-500 left-44 bottom-6 scale-150"/>
          <p className="text-gray-700 font-semibold">Sales</p>
        </div>
        <div className="bg-gray-100 p-4 text-center rounded shadow-xl">
          <h5 className="text-2xl font-bold text-blue-500" id="counter3">
              3899
          </h5>
          <FaTruck  className="relative text-blue-500 left-44 bottom-6 scale-150"/>
          <p className="text-gray-700 font-semibold">Delivery</p>
        </div>
        <div className="bg-gray-100 p-4 text-center rounded shadow-xl">
          <h5 className="text-2xl font-bold text-blue-500" id="counter4">
            25
          </h5>
          <FaArrowTrendUp  className="relative text-blue-500 left-40 bottom-5 scale-150"/>
          <p className="text-gray-700 font-semibold">increase</p>
        </div>
        <div></div> {/* Spacer */}
      </div>
    </div>
  );
};

export default CounterUp;
