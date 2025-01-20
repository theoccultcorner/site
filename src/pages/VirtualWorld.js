import React, { useState, useEffect, useRef, useCallback } from "react";
import "aframe";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Cathedral from "./Cathedral";
import Lighting from "./Lighting";
import SimplePeer from "simple-peer";
import { io } from "socket.io-client";

const VirtualWorld = () => {
  const [position, setPosition] = useState({ x: 0, y: 1.6, z: 0 }); // User's position
  const [others, setOthers] = useState({}); // Other users
  const [peers, setPeers] = useState({}); // WebRTC peers
  const [isTalking, setIsTalking] = useState(false); // Voice chat state
  const userId = "uniqueUserId"; // Replace with a real unique user ID
  const socket = useRef(null); // Socket reference
  const userAudioStream = useRef(null); // Local audio stream

  // Initialize socket connection
  useEffect(() => {
    socket.current = io("http://localhost:3000"); // Replace with your signaling server URL

    const handleReceiveOffer = async ({ sdp, sender }) => {
      const peer = new SimplePeer({ initiator: false, trickle: false });
      peer.signal(sdp);
      peer.on("signal", (data) => {
        socket.current.emit("answer", { sdp: data, target: sender });
      });
      peer.on("stream", (stream) => {
        playAudioStream(stream, sender);
      });
      setPeers((prev) => ({ ...prev, [sender]: peer }));
    };

    const handleReceiveAnswer = ({ sdp, sender }) => {
      peers[sender]?.signal(sdp);
    };

    const handleReceiveIceCandidate = ({ candidate, sender }) => {
      peers[sender]?.signal(candidate);
    };

    socket.current.on("offer", handleReceiveOffer);
    socket.current.on("answer", handleReceiveAnswer);
    socket.current.on("ice-candidate", handleReceiveIceCandidate);

    return () => {
      socket.current.disconnect();
    };
  }, [peers]); // Include dependencies to avoid stale closures

  // Sync user position with Firebase and listen to others
  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const othersRef = ref(db, "users");

    set(userRef, position);

    const unsubscribe = onValue(othersRef, (snapshot) => {
      const data = snapshot.val();
      setOthers(data || {});
    });

    return () => {
      set(userRef, null);
      unsubscribe();
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

  const handleVoiceStart = useCallback(async () => {
    setIsTalking(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    userAudioStream.current = stream;

    Object.keys(others).forEach((otherId) => {
      if (otherId !== userId) {
        const peer = new SimplePeer({ initiator: true, trickle: false, stream });
        peer.on("signal", (data) => {
          socket.current.emit("offer", { sdp: data, target: otherId });
        });
        peer.on("stream", (remoteStream) => {
          playAudioStream(remoteStream, otherId);
        });
        setPeers((prev) => ({ ...prev, [otherId]: peer }));
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
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onMouseDown={handleVoiceStart} onMouseUp={handleVoiceStop}>
          {isTalking ? "Talking..." : "Talk"}
        </button>
      </div>

      <a-scene embedded style={{ width: "100%", height: "100vh" }}>
        <Lighting />
        <Cathedral />
        <a-entity
          gltf-model="https://cdn.aframe.io/test-models/models/gltf/kart.glb"
          position={`${position.x} ${position.y - 1.6} ${position.z}`}
          animation-mixer
          scale="0.5 0.5 0.5"
        ></a-entity>
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
