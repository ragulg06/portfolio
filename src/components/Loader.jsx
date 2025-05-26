import React from "react";
import { Html } from "@react-three/drei";

const CanvasLoader = () => {
  return (
    <Html center>
      <div className="flex justify-center items-center h-full">
        <div className="canvas-loader"></div>
      </div>
    </Html>
  );
};

export default CanvasLoader;