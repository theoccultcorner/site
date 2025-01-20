import React, { useState, useEffect } from "react";
import "aframe";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Cathedral from "./Cathedral"; // Cathedral structure
import Lighting from "./Lighting"; // Lighting component
import { Joystick } from "react-joystick-component";
 // Joystick library
import { io } from "socket.io-client";

const VirtualWorld = () => {
  const [position, setPosition] = useState({ x: 0, y: 1.6, z: 0 }); // User's position
  const [others, setOthers] = useState({}); // Other users
  const [isGyroscope, setIsGyroscope] = useState(false); // Gyroscope mode
  const [isTalking, setIsTalking] = useState(false); // Voice chat state
  const socket = io("https://your-voice-chat-server.com"); // Replace with your WebRTC server URL

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

  const handleJoystickMove = (event) => {
    if (event.direction === "FORWARD") move("forward");
    if (event.direction === "BACKWARD") move("backward");
    if (event.direction === "LEFT") move("left");
    if (event.direction === "RIGHT") move("right");
  };

  const toggleGyroscope = () => {
    setIsGyroscope((prev) => !prev);
  };

  const handleVoiceStart = () => {
    setIsTalking(true);
    socket.emit("start-talking", { userId: "uniqueUserId" });
  };

  const handleVoiceStop = () => {
    setIsTalking(false);
    socket.emit("stop-talking", { userId: "uniqueUserId" });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => move("forward")}>Forward</button>
        <button onClick={() => move("backward")}>Backward</button>
        <button onClick={toggleGyroscope}>
          {isGyroscope ? "Disable Gyroscope" : "Enable Gyroscope"}
        </button>
        <button
          onMouseDown={handleVoiceStart}
          onMouseUp={handleVoiceStop}
          style={{
            backgroundColor: isTalking ? "red" : "blue",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Talk
        </button>
      </div>

      {isGyroscope ? (
        <p>Use your phone's movement to steer.</p>
      ) : (
        <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
          <Joystick
            size={100}
            baseColor="gray"
            stickColor="black"
            move={handleJoystickMove}
            stop={() => console.log("Joystick released")}
          />
        </div>
      )}

      <a-scene
        embedded
        style={{ width: "100%", height: "100vh" }}
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
      >
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
