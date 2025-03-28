import React from "react";

const TrafficLight = ({ position, timer,isGreen }) => {
  // const isGreen = timer > 5;

  const positionClasses = {
    top: "top-36 -rotate-180 right-1/3 mr-6 transform translate-x-full -translate-y-1/2",
    right: "right-48 top-1/2 -rotate-90 transform translate-x-1/2 translate-y-full ",
    bottom: "bottom-36 left-1/3 ml-7 transform -translate-x-full translate-y-1/2 ",
    left: "left-48 rotate-90 bottom-1/2 transform -translate-x-1/2 -translate-y-full ",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-8 h-16 bg-gray-800 rounded flex flex-col justify-around items-center z-10`}
    >
      <div className={`w-6 h-6 rounded-full ${isGreen ? "bg-gray-500" : "bg-red-500"}`}></div>
      <div className={`w-6 h-6 rounded-full ${isGreen ? "bg-green-500" : "bg-gray-500"}`}></div>
      <div className="text-white text-xs">{timer}</div>
    </div>
  );
};

export default TrafficLight;
