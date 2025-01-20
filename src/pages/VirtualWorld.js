import React, { useState, useEffect } from "react";
import "aframe";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Cathedral from "./Cathedral"; // Cathedral structure
import Lighting from "./Lighting"; // Lighting component

const VirtualWorld = () => {
  const [position, setPosition] = useState({ x: 0, y: 1.6, z: 0 }); // User's position
  const [others, setOthers] = useState({}); // Other users

  useEffect(() => {
    const db = getDatabase();
    const userId = "uniqueUserId"; // Replace with the logged-in user's unique ID
    const userRef = ref(db, `users/${userId}`);

    // Update user's position in the database
    set(userRef, position);

    // Listen for changes in other users' positions
    const othersRef = ref(db, "users");
    onValue(othersRef, (snapshot) => {
      const data = snapshot.val();
      setOthers(data || {});
    });

    return () => {
      set(userRef, null); // Remove user from database on unmount
    };
  }, [position]);

  const move = (direction) => {
    setPosition((prev) => {
      const newPosition = { ...prev };
      if (direction === "forward") newPosition.z -= 0.5;
      if (direction === "backward") newPosition.z += 0.5;
      if (direction === "left") newPosition.x -= 0.5;
      if (direction === "right") newPosition.x += 0.5;
      return newPosition;
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => move("forward")}>Forward</button>
        <button onClick={() => move("backward")}>Backward</button>
        <button onClick={() => move("left")}>Left</button>
        <button onClick={() => move("right")}>Right</button>
      </div>
      <a-scene embedded style={{ width: "100%", height: "100vh" }}>
        {/* Lighting */}
        <Lighting />

        {/* Cathedral Environment */}
        <Cathedral />

        {/* User's Avatar */}
        <a-entity
          gltf-model="https://cdn.aframe.io/test-models/models/gltf/kart.glb"
          position={`${position.x} ${position.y - 1.6} ${position.z}`}
          animation-mixer
          scale="0.5 0.5 0.5"
        ></a-entity>

        {/* Other Users' Avatars */}
        {Object.entries(others).map(([key, otherPosition]) => (
          <a-entity
            key={key}
            gltf-model="https://cdn.aframe.io/test-models/models/gltf/kart.glb"
            position={`${otherPosition.x} ${otherPosition.y - 1.6} ${otherPosition.z}`}
            animation-mixer
            scale="0.5 0.5 0.5"
          ></a-entity>
        ))}
      </a-scene>
    </div>
  );
};

export default VirtualWorld;
