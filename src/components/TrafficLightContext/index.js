import { createContext, useReducer, useEffect } from "react";

const initialState = {
  currentLight: "Green",
  pedestrianRequested: false,
  emergencyOverride: false,
  timers: {
    green: 10,
    yellow: 3,
    red: 7,
  },
  countdown: 10,
};

const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LIGHT":
      return { ...state, currentLight: action.payload };
    case "REQUEST_CROSSING":
      return { ...state, pedestrianRequested: true };
    case "EMERGENCY_OVERRIDE":
      return { ...state, emergencyOverride: true };
    case "RESET_TIMER":
      return { ...state, countdown: state.timers[state.currentLight] };
    case "UPDATE_COUNTDOWN":
      return { ...state, countdown: state.countdown - 1 };
    default:
      return state;
  }
};

const TrafficLightContext = createContext();

const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (state.countdown === 0) {
        // Change light sequence
        switch (state.currentLight) {
          case "Green":
            dispatch({ type: "CHANGE_LIGHT", payload: "Yellow" });
            break;
          case "Yellow":
            dispatch({ type: "CHANGE_LIGHT", payload: "Red" });
            break;
          case "Red":
            dispatch({ type: "CHANGE_LIGHT", payload: "Green" });
            break;
          default:
            break;
        }
        // Reset countdown
        dispatch({ type: "RESET_TIMER" });
      } else {
        dispatch({ type: "UPDATE_COUNTDOWN" });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.countdown, state.currentLight]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export { TrafficLightProvider, TrafficLightContext };
