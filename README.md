# Levon Frontend Assignment Reference Document

### General React Approach

1. **Component Structure**:
   - Create a **TrafficLight** component, which includes subcomponents:
     - `GreenLight`, `YellowLight`, and `RedLight` as separate child components that visually represent each light.
     - A **PedestrianButton** component for the pedestrian crossing request.
     - Optionally, an **EmergencyOverrideButton** for handling emergency vehicle overrides.
   - The **TrafficLight** component will maintain the main logic for transitioning between the lights.
2. **State Management**:
   - Use React's `useState` and `useEffect` hooks to manage the light sequence and pedestrian crossing.
   - Use a state variable like `currentLight` to track which light is currently active.
   - Another state variable for managing the pedestrian request (`pedestrianRequested`).
   - Use `setInterval` or `setTimeout` inside `useEffect` to implement the timer logic for transitions between the lights.
3. **Light Transitions**:
   - Use `useEffect` to handle light transitions based on the current light and timers.
   - Start with `Green`, transition to `Yellow` after 10 seconds, and then to `Red` after 3 seconds, and back to `Green` after 7 seconds.
   - Manage the pedestrian button click by adding logic that interrupts the normal light sequence after the current cycle and forces a transition to `Red` for a few seconds.
4. **Timers**:
   - Use JavaScript's `setTimeout` to manage delays for each light. The light transitions should occur automatically in the sequence, with each light staying on for its designated duration.
   - Implement a countdown timer for each light using a separate state variable and updating it at regular intervals.
5. **UI Interactions**:
   - Visually represent each light using CSS (e.g., `background-color: green/yellow/red`).
   - Create a button for pedestrians that, when clicked, sets a request to change the light to `Red` after the current cycle finishes.
   - CSS transitions can be used to smoothly change the lights from one state to another (e.g., `transition: background-color 1s`).

### useContext Approach (State Management Alternative to Redux)

1. **Context Setup**:
   - Create a `TrafficLightContext` using `React.createContext()` to hold the global state of the traffic light system.
   - Provide a `TrafficLightProvider` component that wraps the application and provides the context value.
2. **Initial State**:
   - The initial state could include:
     - `currentLight` to track which light is on.
     - `pedestrianRequested` to handle pedestrian crossing requests.
     - `emergencyOverride` for emergency vehicle handling.
     - `timers` for managing countdowns for each light.
3. **Reducer**:
   - Implement a reducer that handles actions such as:
     - `CHANGE_LIGHT` to change from `Green` to `Yellow` to `Red`.
     - `REQUEST_CROSSING` to set the pedestrian crossing request.
     - `EMERGENCY_OVERRIDE` to immediately switch the light for emergency vehicles.
     - `RESET_TIMER` to handle timer updates for each light's countdown.
4. **Dispatching Actions**:
   - Use the `useReducer` hook within the `TrafficLightProvider` to manage state updates based on the actions.
   - Dispatch the `CHANGE_LIGHT` action at intervals to rotate through the light sequence.
   - Dispatch `REQUEST_CROSSING` when the pedestrian button is clicked, to queue the red light after the current cycle.
5. **Context Consumption**:
   - Inside each component (e.g., `GreenLight`, `YellowLight`, `RedLight`), use the `useContext` hook to access the current state and determine which light is active.
   - The `PedestrianButton` will dispatch the `REQUEST_CROSSING` action when clicked.
   - The main `TrafficLight` component will handle the timer logic, dispatching the relevant actions at the end of each light's duration.
6. **Timers in useContext**:
   - Manage timers using `setTimeout` or `setInterval` within the reducer or in `useEffect` hooks, dispatching actions based on the remaining time for each light.
   - Ensure that all timeouts and intervals are cleared properly when needed, such as when a pedestrian requests crossing or in case of an emergency override.

### Key Considerations:

- **Pedestrian Requests**: When the pedestrian button is clicked, set a flag (`pedestrianRequested`) and ensure the current light sequence completes before transitioning to `Red`.
- **Emergency Override**: If an emergency override is triggered, interrupt the normal sequence and set the light to a state that allows emergency vehicles to pass.
- **Countdown Timer**: Display the remaining seconds for each light using a state variable that decreases over time and is reset upon each light change.
