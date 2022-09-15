import React, { useState } from 'react'
import { db, auth } from '../firebase'
import firebase from 'firebase'
import Card from '../UI/Card';
import emoji from '../assests/emoji.png';
import { emojiActions } from '../store';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data';
import { useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {storage} from '../firebase';
import { useSelector,useDispatch } from 'react-redux';

function SendMessage(props) {
   
    const [msg, setMsg] = useState('')
   // const [showEmojis, setShowEmojis] = useState(false);
   const dispatch = useDispatch();
   //const [typing, setTyping ] = useState();
   //const[err, setErr] = useState('some')

   const [files,setFiles] = useState(null)
   
   useEffect(() => {
    db.collection('Typing').doc('JyLfD9uRoeMQK1RP1cN6').onSnapshot(snapshot => {
        dispatch(emojiActions.toggleTyping(snapshot.data().typingState))
        
    })
   
   }, []);

   useEffect(()=>{
    console.log(files)
   },[files])



   const showEmojis = useSelector(state=>state.emojiShown);
   
    

    async function sendMessage(e) {
        e.preventDefault()
        dispatch(emojiActions.toggleFileAttachment(false))
        const { uid} = auth.currentUser

        if(!!msg){
            const response = await db.collection('messages').add({
                text: msg,
          
                uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                url:null,
                fileType:null
            })
            const prevRequest =await response.get()
            const prevData = prevRequest.data()
            db.collection("messages").doc(response.id).update({...prevData,id:response.id});
    
            setMsg('')
        }
        if(!!files){

            uploadFiles(files)
            

        }
       


      
        props.scroll.current.scrollIntoView({ behavior: 'smooth' })
        dispatch(emojiActions.userTyping(true))

    }

    function emojiHandler(){
        dispatch(emojiActions.toggleEmoji())
        console.log('clicked')
      
    }
    

    async function msgHandler(e){
        
            setMsg(e.target.value)
         
        
        
     
        
        dispatch(emojiActions.toggleTyping())
        const response = await db.collection('Typing').doc('JyLfD9uRoeMQK1RP1cN6').get()
        const data = response.data().typingState
        dispatch(emojiActions.toggleTyping(data))
        if(data && e.target.value.length===0){
            db.collection('Typing').doc('JyLfD9uRoeMQK1RP1cN6').update({typingState:false})
            
        }
        else{
            db.collection('Typing').doc('JyLfD9uRoeMQK1RP1cN6').update({typingState:true})
        }

        dispatch(emojiActions.userTyping(false))   
}

function fileHandler(e){
    const fileExt = e.target.files[0].type
    if(fileExt.includes('pdf') || fileExt.includes('image') || fileExt.includes('video')  ){
        dispatch(emojiActions.toggleFileAttachment(true))
        setTimeout(()=>{dispatch(emojiActions.toggleFileAttachment(false))},5000);
    setFiles(e.target.files[0])}
    

    
    }

function uploadFiles(file){

    
    dispatch(emojiActions.backDropToggle(true))
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on('state_changed', 
  (snapshot) => {
    
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    let fileUrl;
    const { uid} = auth.currentUser
   storage.ref('files').child(file.name).getDownloadURL().then(url=>{
    fileUrl = url;
   }).then(async()=>{
    const response = await db.collection('messages').add({
        text: '',
  
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        url:fileUrl,
        fileType:file.type
    })
    const prevRequest =await response.get()
    dispatch(emojiActions.backDropToggle(false))
    setFiles(null)
    const prevData = prevRequest.data()
    db.collection("messages").doc(response.id).update({...prevData,id:response.id});
 

   })
   
  }
);


}



  
    
    return (
        
        <div>
           
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                   
                <img alt='emoji' src={emoji} style={{height:'30px', width:'30px', marginTop:'10px',cursor:'pointer'}} onClick={emojiHandler}/>
                
                    <label htmlFor='files'>
                        <AttachFileIcon style={{margin:'15px', cursor:'pointer'}} />
                    </label>
                    <input id='files' type='file' style={{display:'none'}} accept='application/pdf,audio/*,video/*,image/*' onChange={fileHandler}/>
                    <input className='sendInput' style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={msgHandler} />
                    <button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</button>
                </div>
                
                
              {showEmojis && <Card><Picker data={data} onEmojiSelect={(e)=>setMsg(msg+e.native)}/></Card> }
                
                
            </form>
           
       
        </div>
        
    )
}

export default SendMessage;


