import React from "react";

const Cathedral = () => {
  return (
    <>
      {/* Ground */}
      <a-plane
        color="#8B4513"
        rotation="-90 0 0"
        width="20"
        height="30"
        position="0 0 0"
      ></a-plane>

      {/* Walls */}
      <a-box
        color="#D3D3D3"
        depth="30"
        height="10"
        width="1"
        position="-10 5 0"
      ></a-box>
      <a-box
        color="#D3D3D3"
        depth="30"
        height="10"
        width="1"
        position="10 5 0"
      ></a-box>
      <a-box
        color="#D3D3D3"
        depth="1"
        height="10"
        width="20"
        position="0 5 -15"
      ></a-box>

      {/* Roof */}
      <a-box
        color="#696969"
        depth="30"
        height="1"
        width="20"
        position="0 10 0"
      ></a-box>

      {/* Stained Glass Windows */}
      <a-plane
        src="https://example.com/stained-glass.jpg"
        height="5"
        width="2"
        position="-10 5 -5"
        rotation="0 90 0"
      ></a-plane>
      <a-plane
        src="https://example.com/stained-glass.jpg"
        height="5"
        width="2"
        position="10 5 -5"
        rotation="0 -90 0"
      ></a-plane>

      {/* Altar */}
      <a-box
        color="#FFD700"
        depth="2"
        height="1"
        width="3"
        position="0 1 -13"
      ></a-box>

      {/* Benches */}
      {[...Array(4)].map((_, i) => (
        <a-box
          key={i}
          color="#8B4513"
          depth="2"
          height="0.5"
          width="6"
          position={`0 0.5 ${-10 + i * 4}`}
        ></a-box>
      ))}

      {/* Barriers */}
      <a-box
        depth="31"
        height="1"
        width="1"
        position="-10 0.5 0"
        visible="false"
      ></a-box>
      <a-box
        depth="31"
        height="1"
        width="1"
        position="10 0.5 0"
        visible="false"
      ></a-box>
      <a-box
        depth="1"
        height="1"
        width="20"
        position="0 0.5 15"
        visible="false"
      ></a-box>
    </>
  );
};

export default Cathedral;
