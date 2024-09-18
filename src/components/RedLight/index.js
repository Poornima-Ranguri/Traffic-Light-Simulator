import React from "react";

const RedLight = ({ active, countdown }) => {
  return (
    <div
      style={{
        backgroundColor: active ? "red" : "gray",
        height: 100,
        width: 100,
        borderRadius: 50,
        margin: 20,
        transition: "background-color 1s",
      }}
    >
      
    </div>
  );
};

export default RedLight;
