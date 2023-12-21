import React, { useState } from "react";
import Webcam from "react-webcam";
import style from "./style.module.css";
interface CameraProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCapture: (capturedImage: string) => void; // Add this line
}

const Camera: React.FC<CameraProps> = ({ isOpen, onClose, onCapture }) => {
  const webcamRef = React.useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      onCapture(imageSrc); 
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} className={`${style.videoCam}`} screenshotFormat="image/jpeg" />
     <div className="d-flex justify-content-center align-center">
     <button onClick={capture}>Capture</button>
      <button onClick={onClose}>Close Camera</button>
     </div>

      {capturedImage && (
        <div className={`${style.captureImgDiv}`}>
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default Camera;
