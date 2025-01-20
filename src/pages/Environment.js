import React from "react";

const Environment = () => {
  return (
    <>
      {/* Ground */}
      <a-plane
        src="#groundTexture"
        rotation="-90 0 0"
        width="50"
        height="50"
        position="0 0 0"
        material="repeat: 10 10"
      ></a-plane>

      {/* Sky */}
      <a-sky src="#skyTexture"></a-sky>

      {/* Trees (example decorations) */}
      <a-entity
        geometry="primitive: cone; height: 2; radiusBottom: 1"
        material="color: green"
        position="5 1 -5"
      ></a-entity>
      <a-entity
        geometry="primitive: cylinder; height: 2; radius: 0.2"
        material="color: brown"
        position="5 0 -5"
      ></a-entity>

      <a-entity
        geometry="primitive: cone; height: 2; radiusBottom: 1"
        material="color: green"
        position="-5 1 -10"
      ></a-entity>
      <a-entity
        geometry="primitive: cylinder; height: 2; radius: 0.2"
        material="color: brown"
        position="-5 0 -10"
      ></a-entity>
    </>
  );
};

export default Environment;
