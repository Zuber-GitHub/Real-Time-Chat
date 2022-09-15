
import React from 'react'
import { auth } from '../firebase.js'


function SignOut() {
    return (
       
        <div style={{
            display: 'flex', justifyContent: 'center', position: 'fixed', width: '100%', backgroundColor: '#FAFAFA', top: 0, borderBottom: 'solid 1px lightgray', zIndex: '10', height:'10vh',alignItems:'center'
        }}>
            <button style={{ padding: '15px', fontSize: '15px', borderRadius: '20px', fontWeight: '600', height:'20px', lineHeight:'0px' }} onClick={() => auth.signOut()}>Sign Out</button>
        </div>
        
    )
}

export default SignOut;
