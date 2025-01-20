import React, { useState, useEffect, useRef, useCallback } from "react";
import "aframe";
import SimplePeer from "simple-peer";
import { io } from "socket.io-client";

const VirtualWorld = () => {
  const [position, setPosition] = useState({ x: 0, y: 1.6, z: 0 }); // User's position
  const [others, setOthers] = useState({});
  const [peers, setPeers] = useState({});
  const [isTalking, setIsTalking] = useState(false);
  const socket = useRef(null);
  const userAudioStream = useRef(null);
  const userId = "uniqueUserId"; // Replace with a unique user ID

  useEffect(() => {
    socket.current = io("https://your-signaling-server.onrender.com"); // Update with Render URL

    socket.current.on("offer", handleReceiveOffer);
    socket.current.on("answer", handleReceiveAnswer);
    socket.current.on("ice-candidate", handleReceiveIceCandidate);

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleReceiveOffer = async ({ sdp, sender }) => {
    const peer = createPeer(false, sender);
    peer.signal(sdp);
  };

  const handleReceiveAnswer = ({ sdp, sender }) => {
    peers[sender]?.signal(sdp);
  };

  const handleReceiveIceCandidate = ({ candidate, sender }) => {
    peers[sender]?.signal(candidate);
  };

  const createPeer = (initiator, targetId) => {
    const peer = new SimplePeer({ initiator, trickle: false, stream: userAudioStream.current });
    peer.on("signal", (data) => {
      const type = initiator ? "offer" : "answer";
      socket.current.emit(type, { sdp: data, target: targetId });
    });
    peer.on("stream", (remoteStream) => {
      playAudioStream(remoteStream, targetId);
    });
    setPeers((prev) => ({ ...prev, [targetId]: peer }));
    return peer;
  };

  const handleVoiceStart = useCallback(async () => {
    setIsTalking(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    userAudioStream.current = stream;

    Object.keys(others).forEach((otherId) => {
      if (otherId !== userId) {
        createPeer(true, otherId);
      }
    });
  }, [others]);

  const handleVoiceStop = useCallback(() => {
    setIsTalking(false);
    userAudioStream.current?.getTracks().forEach((track) => track.stop());
    setPeers({});
  }, []);

  const playAudioStream = (stream, id) => {
    let audio = document.getElementById(`audio-${id}`);
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = `audio-${id}`;
      audio.srcObject = stream;
      audio.autoplay = true;
      document.body.appendChild(audio);
    }
  };

  return (
    <div>
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
        {isTalking ? "Talking..." : "Talk"}
      </button>

      <a-scene embedded style={{ width: "100%", height: "100vh" }}>
        <a-entity
          geometry="primitive: sphere; radius: 0.5"
          material="color: blue"
          position={`${position.x} ${position.y} ${position.z}`}
        ></a-entity>

        {Object.entries(others).map(([key, otherPosition]) => (
          <a-entity
            key={key}
            geometry="primitive: sphere; radius: 0.5"
            material="color: red"
            position={`${otherPosition.x} ${otherPosition.y} ${otherPosition.z}`}
          ></a-entity>
        ))}

        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    </div>
  );
};

export default VirtualWorld;
