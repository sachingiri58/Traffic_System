import React, { useState, useEffect } from "react";
import TrafficLight from "./TrafficLight";
import {motion} from "framer-motion"
const RenderCarsLeftAnimated = ({ count }) => {
  const partSize = Math.ceil(count / 3); // Divide the cars into 3 parts

  // Create an array of car divs for each part
  const carDivs = Array.from({ length: count }).map((_, index) => {
    let xTranslation = 0;
    let yTranslation = 0;
    let xTransitionDelay = 0;
    let yTransitionDelay = 0;
    let rotationDelay = 0;

    // First group (Straight)
    if (index < partSize) {
      xTranslation = 600;
      yTranslation = 0;

      xTransitionDelay = 1.2 * index; // Adjust x translation delay
    }
    // Second group (Move 220px right, rotate 90 degrees, then 600px down)
    else if (index < partSize * 2) {
      xTranslation = 220; // Move to the right
      yTranslation = 600; // Move straight down

      // Delay for x transition and then rotation
      xTransitionDelay = 1.2 * index; // Adjust x translation delay
      rotationDelay = xTransitionDelay + 2; // Rotate after x transition
      yTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }
    // Third group (Move 180px right, rotate 90 degrees, then 600px up)
    else {
      xTranslation = 90; // Move further right
      yTranslation = -600; // Move up

      // Delay for x transition and then rotation
      xTransitionDelay = 0.9 * index; // Adjust x translation delay
      rotationDelay = xTransitionDelay + 4; // Rotate after x transition
      yTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }

    return (
      <motion.div
        key={index}
        className="w-4 h-6"
        animate={{
          x: xTranslation,
          transition: {
            duration: 2, // Time for x translation
            delay: xTransitionDelay, // Delay based on the car index
          },
        }}
      >
        <motion.img
          src="greencar-removebg-preview.png"
          alt={`Car ${index + 1}`}
          className="w-4 h-full object-cover"
          animate={{
            rotate: index >= partSize ? 90 : 0, // Rotate only for the second and third groups
            y: yTranslation,
            transition: {
              rotate: {
                duration: 1, // Time for rotatio
                delay: rotationDelay, // Rotate after x translation finishes
              },
              y: {
                duration: 2, // Time for y translation
                delay: yTransitionDelay, // Start y translation after rotation
              },
            },
          }}
        />
      </motion.div>
    );
  });

  return (
    <div className="grid grid-rows-3 grid-flow-col w-40 gap-1 ml-20 ">
      {carDivs}
    </div>
  );
};


const RenderCarsleft = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img src="greencar-removebg-preview.png" alt={`Car ${index + 1}`} className="w-4 h-full object-cover" />
    </div>
  ));

  return (
    <div className="grid grid-rows-3 grid-flow-col w-40 gap-1 ml-20">
      {carDivs}
    </div>
  );
};

const RenderCarsRighhtAnimated = ({ count }) => {
  const partSize = Math.ceil(count / 3); // Divide the cars into 3 parts

  // Create an array of car divs for each part
  const carDivs = Array.from({ length: count }).map((_, index) => {
    let xTranslation = 0;
    let yTranslation = 0;
    let xTransitionDelay = 0;
    let yTransitionDelay = 0;
    let rotationDelay = 0;

    // First group (Straight)
    if (index < partSize) {
      xTranslation = -600;
      yTranslation = 0;
      xTransitionDelay = 1.2 * index; // Adjust x translation delay
    }
    // Second group (Move 220px left, rotate 90 degrees, then 600px up)
    else if (index < partSize * 2) {
      xTranslation = -220; // Move to the left
      yTranslation = -600; // Move straight up
      xTransitionDelay = 1.2 * (index - partSize); // Adjust delay relative to this group
      rotationDelay = xTransitionDelay + 2; // Rotate after x translation
      yTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }
    // Third group (Move 90px left, rotate 90 degrees, then 600px down)
    else {
      xTranslation = -90; // Move slightly left
      yTranslation = 600; // Move down
      xTransitionDelay = 1.2 * (index - partSize * 2); // Adjust delay relative to this group
      rotationDelay = xTransitionDelay + 2; // Rotate after x translation
      yTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }

    return (
      <motion.div
        key={index}
        className="w-4 h-6"
        animate={{
          x: xTranslation,
          transition: {
            duration: 2, // Time for x translation
            delay: xTransitionDelay, // Delay based on the car index
          },
        }}
      >
        <motion.img
          src="redcar-removebg-preview.png"
          alt={`Car ${index + 1}`}
          className="w-4 h-full object-cover"
          animate={{
            rotate: index >= partSize ? 90 : 0, // Rotate only for the second and third groups
            y: yTranslation,
            transition: {
              rotate: {
                duration: 1, // Time for rotation
                delay: rotationDelay, // Rotate after x translation finishes
              },
              y: {
                duration: 2, // Time for y translation
                delay: yTransitionDelay, // Start y translation after rotation
              },
            },
          }}
        />
      </motion.div>
    );
  });

  return (
    <div className=" grid grid-rows-3 grid-flow-col w-40 gap-1 ml-[450px] mb-32">
      {carDivs}
    </div>
  );
};


const RenderCarsRighht = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img
        src="redcar-removebg-preview.png"
        alt={`Car ${index + 1}`}
        className="w-4 h-full object-cover"
      />
    </div>
  ));

  return (
    <div className="grid grid-rows-3 grid-flow-col ml-[450px] mb-32 gap-1">
      {carDivs}
    </div>
  );
};



const RenderCarsBottomAnimated = ({ count }) => {
  const partSize = Math.ceil(count / 3); // Divide the cars into 3 parts

  const carDivs = Array.from({ length: count }).map((_, index) => {
    let xTranslation = 0;
    let yTranslation = 0;
    let xTransitionDelay = 0;
    let yTransitionDelay = 0;
    let rotationDelay = 0;

    // First group (Straight up, -600px Y)
    if (index < partSize) {
      xTranslation = 0;
      yTranslation = -600;
      yTransitionDelay = 1.2 * index; // Adjust y translation delay
    }
    // Second group (Move 600px right, then -300px Y)
    else if (index < partSize * 2) {
      yTranslation = -200; // Move slightly up
      xTranslation = 600; // Move to the right
      yTransitionDelay = 1.2 * index; // Adjust x translation delay
      rotationDelay = yTransitionDelay + 2; // Rotate after x translation
      xTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }
    // Third group (Move 600px left, then -100px Y)
    else {
      yTranslation = -160; // Move slightly up
      xTranslation = -600; // Move left
      yTransitionDelay = 0.9 * index; // Adjust x translation delay
      rotationDelay = yTransitionDelay + 4; // Rotate after x translation
      xTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }

    return (
      <motion.div
        key={index}
        className="w-4 h-full"
        animate={{
          x: xTranslation,
          transition: {
            duration: 2, // Time for x translation
            delay: xTransitionDelay, // Delay based on the car index
          },
        }}
      >
        <motion.img
          src="whitecar-removebg-preview.png"
          alt={ `Car ${index + 1}`}
          className="w-4 h-6 object-cover"
          animate={{
            rotate: index >= partSize ? 90 : 0, // Rotate only for the second and third groups
            y: yTranslation,
            transition: {
              rotate: {
                duration: 1, // Time for rotation
                delay: rotationDelay, // Rotate after x translation finishes
              },
              y: {
                duration: 2, // Time for y translation
                delay: yTransitionDelay, // Start y translation after rotation
              },
            },
          }}
        />
      </motion.div>
    );
  });

  return (
    <div className={"grid grid-cols-3 grid-flow-row auto-rows-auto gap-1 mr-20 "+(count<10?" mt-40":" mt-72")}>
      {carDivs}
    </div>
  );
};




const RenderCardBottom = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img
        src="whitecar-removebg-preview.png"
        alt={`Car ${index + 1}`}
        className="w-4 h-full object-cover"
      />
    </div>
  ));

  return (
    <div className={"grid grid-cols-3 grid-flow-row auto-rows-auto gap-1 mr-20 "+(count<10?" mt-40":" mt-72")}>
      {carDivs}
    </div>
  );
};

const RenderCarsTopAnimated = ({ count }) => {
  const partSize = Math.ceil(count / 3); // Divide the cars into 3 parts

  const carDivs = Array.from({ length: count }).map((_, index) => {
    let xTranslation = 0;
    let yTranslation = 0;
    let xTransitionDelay = 0;
    let yTransitionDelay = 0;
    let rotationDelay = 0;

    // First group (Straight up, -600px Y)
    if (index < partSize) {
      xTranslation = 0;
      yTranslation = 600;
      yTransitionDelay = 1.2 * index; // Adjust y translation delay
    }
    // Second group (Move 600px right, then -300px Y)
    else if (index < partSize * 2) {
      yTranslation = 170; // Move slightly up
      xTranslation = -600; // Move to the right
      yTransitionDelay = 1.2 * index; // Adjust x translation delay
      rotationDelay = yTransitionDelay + 2; // Rotate after x translation
      xTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }
    // Third group (Move 600px left, then -100px Y)
    else {
      yTranslation = 30; // Move slightly up
      xTranslation = 600; // Move left
      yTransitionDelay = 0.9 * index; // Adjust x translation delay
      rotationDelay = yTransitionDelay + 4; // Rotate after x translation
      xTransitionDelay = rotationDelay + 1; // Ensure y starts after rotation
    }

    return (
      <motion.div
        key={index}
        className="w-4 h-6"
        animate={{
          x: xTranslation,
          transition: {
            duration: 2, // Time for x translation
            delay: xTransitionDelay, // Delay based on the car index
          },
        }}
      >
        <motion.img
          src="yellocar-removebg-preview.png"
          alt={`Car ${index + 1}`}
          className="w-4 h-full object-cover"
          animate={{
            rotate: index >= partSize ? 90 : 0, // Rotate only for the second and third groups
            y: yTranslation,
            transition: {
              rotate: {
                duration: 1, // Time for rotation
                delay: rotationDelay, // Rotate after x translation finishes
              },
              y: {
                duration: 2, // Time for y translation
                delay: yTransitionDelay, // Start y translation after rotation
              },
            },
          }}
        />
      </motion.div>
    );
  });

  return (
    <div className="grid grid-cols-3 grid-flow-row h-auto gap-1 ml-24 mt-10">
      {carDivs}
    </div>
  );
};

const RenderCarsTop = ({ count }) => {
  const carDivs = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-4 h-6">
      <img src="yellocar-removebg-preview.png" alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
    </div>
  ));

  return (
    <div className="grid grid-cols-3 grid-flow-row h-auto gap-1 ml-24 mt-10">
      {carDivs}
    </div>
  );
};

const TraditionalTrafficSimulation = ({ vehicle_data }) => {
    const [topRed,setRed]=useState(true)
    const [topGreen,setGreen]=useState(false)
//   const calculateTimer = (count) => {
//     if (count < 10) return 5;
//     if (count < 20) return 10;
//     if (count < 30) return 15;
//        return 20;
//   };

  const [activeLightIndex, setActiveLightIndex] = useState(0); // Active light (0: top, 1: right, 2: bottom, 3: left)
  const [lightTimers, setLightTimers] = useState([20,20,20,20]);
  const [currentTimer, setCurrentTimer] = useState(lightTimers[0]); // Timer for the active light

  const [laneOneTimer, setlaneOneTimer] = useState(0)
  const [laneTwoTimer, setlaneTwoTimer] = useState(lightTimers[0])
  const [laneThreeTimer, setlaneThreeTimer] = useState(lightTimers[0]+lightTimers[1])
  const [laneFourTimer, setlaneFourTimer] = useState(lightTimers[0]+lightTimers[1]+lightTimers[2])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(currentTimer)
      if(laneOneTimer > 0 ){
        setlaneOneTimer((prev) => prev - 1);
      }
      if(laneTwoTimer > 0){
        setlaneTwoTimer((prev) => prev - 1);
      }
      if(laneThreeTimer > 0 ){
        setlaneThreeTimer((prev) => prev - 1);
      }
      if(laneFourTimer > 0){
        setlaneFourTimer((prev) => prev - 1);
      }
      
      if (currentTimer > 0) {
        setCurrentTimer((prev) => prev - 1);
      } else {
        // Move to the next light
        setActiveLightIndex((prevIndex) => (prevIndex + 1) % 4);
        setCurrentTimer(lightTimers[(activeLightIndex + 1) % 4]); // Update timer for the next light
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [currentTimer, lightTimers, activeLightIndex]);


  return (
   <div className="relative w-full max-w-2xl h-[32rem] mx-auto mt-8 bg-green-200 border border-gray-300 ">
     {/* Vertical road */}
          <div className={"absolute left-1/2 top-0 bottom-0 w-40 bg-gray-600  transform -translate-x-1/2 overflow-hidden"+((activeLightIndex==0 || activeLightIndex==2 )?" z-50":"") }>
            {/* cars top */}
          {activeLightIndex!=0 &&  <RenderCarsTop count={vehicle_data[0]} />}  
            { activeLightIndex==0 && <RenderCarsTopAnimated count={vehicle_data[0]} /> }
    
    
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 transform -translate-x-1/2 overflow-hidden"></div>
            {activeLightIndex!=3 && <RenderCardBottom count={vehicle_data[3]} />}
            {activeLightIndex==3 && <RenderCarsBottomAnimated count={vehicle_data[3]} />}
          </div>
    
          {/* Horizontal road */}
          <div className="absolute top-1/2 left-0 right-0 h-40 bg-gray-600 transform -translate-y-1/2 overflow-hidden">
         
            {activeLightIndex!=1 && <RenderCarsleft count={vehicle_data[1]} />} 
            {activeLightIndex==1 &&  <RenderCarsLeftAnimated count={vehicle_data[1]} />}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 transform -translate-y-1/2 "></div>
            {activeLightIndex !=2 && <RenderCarsRighht count={vehicle_data[2]} />} 
        
            {activeLightIndex==2 && <RenderCarsRighhtAnimated count={vehicle_data[2]} />} 
    
            
          </div> 
      <TrafficLight
        position="top"
        timer={activeLightIndex === 0 ? currentTimer : laneOneTimer}
        isGreen={activeLightIndex === 0}
      />
      <TrafficLight
        position="right"
        timer={activeLightIndex === 2 ? currentTimer : laneThreeTimer}
        isGreen={activeLightIndex === 2}
      />
      <TrafficLight
        position="bottom"
        timer={activeLightIndex === 3 ? currentTimer : laneFourTimer}
        isGreen={activeLightIndex === 3}
      />
      <TrafficLight
        position="left"
        timer={activeLightIndex === 1 ? currentTimer : laneTwoTimer}
        isGreen={activeLightIndex === 1}
      />
    </div>
  );
};

export default TraditionalTrafficSimulation;
