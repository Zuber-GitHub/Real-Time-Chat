import React, { useState } from 'react';
import Webcam from "react-webcam";
import { Modal } from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import { emojiActions } from '../store';
import {Button} from '@mui/material';


const WebcamComponent = () => <Webcam />;


const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

export const WebcamCapture = () => {
    

  
    const webcamRef = React.useRef(null);
    const cameraStatus = useSelector(state=>state.cameraStatus)
    
    const dispatch = useDispatch();
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
      
        dispatch(emojiActions.toggleFileAttachment(true))
        dispatch(emojiActions.toggleCamera(false))
        dispatch(emojiActions.toggleCamImage(imageSrc))
        });

        


    return (

      
        <div className="webcam-container" >
            <div className="webcam-img">

          <Webcam
                    audio={false}
                    height={500}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={520}
                    videoConstraints={videoConstraints}
                    mirrored={false}
                /> 
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
             
                    <Button  variant="contained" onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">Capture</Button>
                
            </div>
        </div>
        
      
    );
};