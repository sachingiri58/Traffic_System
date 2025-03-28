import React, { useEffect, useState } from "react";
import InputSection from "./components/InputSection";
import ProcessButton from "./components/ProcessButton";
import TrafficSimulation from "./components/TrafficSimulation";
import TraditionalTrafficSimulation from "./components/TraditionalTrafficSimulation";
import axios from "axios";

const CircularTimerComparison = ({ traditionalTime, calculatedTime }) => {
    const maxTime = Math.max(traditionalTime, calculatedTime);
    const traditionalPercent = (traditionalTime / maxTime) * 100;
    const calculatedPercent = (calculatedTime / maxTime) * 100;
  
    return (
      <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Timer Comparison { '( Per Cycle )'}</h1>
        <div className="flex space-x-12">
          {/* Traditional Timer */}
          <div className="relative flex flex-col items-center">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-300"
                cx="50%"
                cy="50%"
                r="45%"
                strokeWidth="10"
                fill="none"
                stroke="currentColor"
              />
              <circle
                className="text-blue-500 animate-fill-blue"
                cx="50%"
                cy="50%"
                r="45%"
                strokeWidth="10"
                fill="none"
                stroke="currentColor"
                strokeDasharray="282.74"
                strokeDashoffset="282.74"
                strokeLinecap="round"
                style={{
                  strokeDashoffset: `${
                    282.74 - (traditionalPercent / 100) * 282.74
                  }`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-blue-600">{traditionalTime}s</p>
              <p className="text-sm text-gray-500">Traditional</p>
            </div>
          </div>
  
          {/* Calculated Timer */}
          <div className="relative flex flex-col items-center">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-300"
                cx="50%"
                cy="50%"
                r="45%"
                strokeWidth="10"
                fill="none"
                stroke="currentColor"
              />
              <circle
                className="text-green-500 animate-fill-green"
                cx="50%"
                cy="50%"
                r="45%"
                strokeWidth="10"
                fill="none"
                stroke="currentColor"
                strokeDasharray="282.74"
                strokeDashoffset="282.74"
                strokeLinecap="round"
                style={{
                  strokeDashoffset: `${
                    282.74 - (calculatedPercent / 100) * 282.74
                  }`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-green-600">{calculatedTime}s</p>
              <p className="text-sm text-gray-500">Dynamic</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
const App = () => {
  const [inputs, setInputs] = useState(Array(4).fill(null));
  const [isSimulating, setIsSimulating] = useState(false);
  const [vehicleCount, setVehicleCount] = useState([]);
  const [isFinish, setFinish] = useState(false);
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [lightTimers, setLightTimers] = useState([]);

  const calculateTimer = (count) => {
    if (count < 10) return 5;
    if (count < 20) return 10;
    if (count < 30) return 15;
    return 20;
  };

  // Update lightTimers and count when vehicleCount changes
  useEffect(() => {
    const timers = vehicleCount.map((count) => calculateTimer(count));
    setLightTimers(timers);
    setCount(timers.reduce((acc, timer) => acc + timer, 0));
  }, [vehicleCount]);
  useEffect(() => {
    if (count === 0) return; // Skip if count isn't set
  
    const interval = setInterval(() => {
      setIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex >= count + 2) {
          setFinish(true); // Mark as finished
          clearInterval(interval); // Clear timer
        }
        return newIndex;
      });
    }, 1000);
  
    return () => clearInterval(interval); // Cleanup
  }, [count]);
  

  const handleInputChange = (index, file) => {
    const newInputs = [...inputs];
    newInputs[index] = file;
    setInputs(newInputs);
  };

  const handleProcess = async () => {
    const formData = new FormData();
    inputs.forEach((file) => formData.append("image", file));

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setVehicleCount(response.data.vehicle_counts);
    } catch (error) {
      console.error(error);
    }

    setIsSimulating(true);
  };

  return (
    <>
      <div className="container mx-auto py-8   font-bold">
        <div className="left-screen ">
          
          <div className="flex flex-row justify-around items-center">
         
                
          <div className="text-sm text-gray-900 mt-4 text-center">
          <h1 className="text-3xl font-bold mb-8 text-center ">
            Traffic Management System
          </h1>
      <p><strong className=" text-xl text-orange-400">How it works:</strong></p>
      <ul className="list-disc list-inside mt-2 text-gray-900 text-base">
        <li>Upload images of vehicles at each route.</li>
        <li>Click <strong className="text-green-600">Process</strong> to analyze the data.</li>
        <li>Watch dynamic traffic light adjustments in real time!</li>
      </ul>
      {}
      
    </div>

                <div>
                <InputSection inputs={inputs} onInputChange={handleInputChange} />
                <div className="max-w-md mx-auto mt-12 mb-10">
            <ProcessButton
              onClick={handleProcess}
              disabled={inputs.some((input) => !input)}
            />
          </div>
                </div>

          </div>
          
         
        </div>
        <div className="flex justify-between items-center mx-72 font-bold text-3xl text-bold text-bg">
            <div className="traditional">Traditional</div>
            <div className="dynamic">Dynamic</div>
        </div>
        <div className="flex justify-around">
          {isSimulating && (
            <TraditionalTrafficSimulation vehicle_data={vehicleCount} />
          )}
          {isSimulating && <TrafficSimulation vehicle_data={vehicleCount} />}
        </div>
      </div>
      {isFinish &&
  <>
    <CircularTimerComparison traditionalTime={20*4} calculatedTime={count}/>
    {console.log('Simulation finished.')}

    
    
  </>
}

    </>
  );
};

export default App;
