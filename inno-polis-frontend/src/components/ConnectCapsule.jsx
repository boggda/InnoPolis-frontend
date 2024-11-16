import React, { useState } from "react";
import Capsule, { Environment } from "@usecapsule/react-sdk";
import { CapsuleModal } from "@usecapsule/react-sdk";
import "@usecapsule/react-sdk/styles.css";

const ConnectCapsuleButton = () => {
    const capsule = new Capsule(Environment.BETA, '8067d573e393b6070f5d684c7fbc250e');

    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Sign in with Capsule</button>
        <CapsuleModal
          capsule={capsule}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  };
  
  export default ConnectCapsuleButton;