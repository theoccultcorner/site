import React, { useState } from 'react';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core'; // Import Color3 directly
import '@babylonjs/core/Helpers/sceneHelpers';

const MicrophoneButton = ({ position, onClick, isListening }) => {
  return (
    <box
      name="microphoneButton"
      position={position}
      height={0.5}
      width={0.5}
      depth={0.1}
      onClick={onClick}
    >
      {/* Material will be added here */}
    </box>
  );
};

const Meta = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <Engine canvasId="babylonJS">
      <Scene clearColor={Color3.FromHexString('#CCCCCC')}> {/* Use Color3 directly */}
        {/* Microphone Button */}
        <MicrophoneButton
          position={new Vector3(0, 2, -3)}
          onClick={toggleListening}
          isListening={isListening}
        />

        {/* Ground */}
        <ground name="ground" width={50} height={50} subdivisions={2} />

        {/* Sky */}
        <hemisphericLight
          name="light"
          direction={Vector3.Up()}
          intensity={0.7}
        />
      </Scene>
    </Engine>
  );
};

export default Meta;
