import React from 'react';
import './App.css';
import Chat from './components/Chat';
import SignIn from './components/SignIn';
import { auth } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth';

import { Backdrop, CircularProgress } from "@material-ui/core";



import { useSelector} from 'react-redux';



function App() {

  
  const backDrop = useSelector(state=>state.backDrop)
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? <Chat /> : <SignIn />}
       
      <Backdrop open={backDrop}>
        <CircularProgress />
      </Backdrop>
    </>
  );
}

export default App;
