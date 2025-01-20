import React from "react";

const Lighting = () => {
  return (
    <>
      {/* Ambient Light */}
      <a-light type="ambient" color="#FFFFFF" intensity="0.5"></a-light>

      {/* Directional Light */}
      <a-light
        type="directional"
        color="#FFFFFF"
        intensity="0.8"
        position="-1 5 -3"
      ></a-light>

      {/* Point Light for Altar */}
      <a-light
        type="point"
        color="#FFD700"
        intensity="1"
        position="0 5 -13"
      ></a-light>
    </>
  );
};

export default Lighting;
