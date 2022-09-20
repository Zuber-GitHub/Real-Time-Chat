import React from 'react';
import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import { auth } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useSelector} from 'react-redux';
//import CameraModal from './UI/CameraModal';
import {WebcamCapture} from './components/Webcam';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { emojiActions } from './store';





function App() {

  
  const backDrop = useSelector(state=>state.backDrop);
  const cameraStatus = useSelector(state=>state.cameraStatus);
  const [user] = useAuthState(auth)
  const dispatch = useDispatch();
  return (
    <>
      {user ? <Chat /> : <SignIn />}
       
      <Backdrop open={backDrop}>
        <CircularProgress />
      </Backdrop>
      <Modal open={cameraStatus} 
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
       onClose={()=>{dispatch(emojiActions.toggleCamera())}}
       >
        <span style={{display:'flex', justifyContent:'center', height:'80vh',alignItems:'center'}}><WebcamCapture/></span>

      </Modal>

      
    </>
  );
}

export default App;
