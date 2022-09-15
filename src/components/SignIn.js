import React from 'react'
import firebase from 'firebase'
import { auth } from '../firebase.js'



function SignIn() {
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        <>
 <div className="container">
  <div className="row">
    <div className="col-md-12 text-center">
      <h3 className="animate-charcter"> chatZ</h3>
    </div>
  </div>
</div>
        <div style={{ display: 'flex', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
            <button className='signInBtn' style={{ padding: '30px', fontSize: '20px', borderRadius: '50px', fontWeight: '600' }} onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
        </>
    )
}

export default SignIn

