import React, { useState, useEffect } from "react";
import GreenLight from "../GreenLight";
import YellowLight from "../YellowLight";
import RedLight from "../RedLight";
import PedestrianButton from "../PedestrainButton";
import EmergencyOverrideButton from "../EmergencyOverrideButton";
import "./index.css";

const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState("Green");
  const [pedestrianRequested, setPedestrianRequested] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      switch (currentLight) {
        case "Green":
          setCurrentLight("Yellow");
          setCountdown(3);
          break;
        case "Yellow":
          setCurrentLight("Red");
          setCountdown(7);
          break;
        case "Red":
          setCurrentLight("Green");
          setCountdown(10);
          break;
        default:
          break;
      }
    }, 1000 * countdown);

    return () => clearInterval(intervalId);
  }, [currentLight, countdown]);
  const handlePedestrianRequest = () => {
    setPedestrianRequested(true);
    setTimeout(() => {
      setCurrentLight("Red");
      setPedestrianRequested(false);
    }, 3000);
  };

  return (
    <div className="app-container">
      <h1 className="heading">Traffic Light Simulator</h1>
      <GreenLight active={currentLight === "Green"} countdown={countdown} />
      <YellowLight active={currentLight === "Yellow"} countdown={countdown} />
      <RedLight active={currentLight === "Red"} countdown={countdown} />
      <div className="buttons-container">
        <PedestrianButton onClick={handlePedestrianRequest} />
        <EmergencyOverrideButton />
      </div>
    </div>
  );
};

export default TrafficLight;
