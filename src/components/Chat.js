import React, { useState, useEffect, useRef } from 'react'
import { db, auth } from '../firebase'
import SendMessage from './SendMessage'
import SignOut from './SignOut'
import { emojiActions } from '../store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import delBtn from '../assests/delBtn.png';
import {Switch} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';


function Chat() {
   
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const [deleteID, setDeleteID]  = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const photoURL = auth.currentUser.photoURL;
    const [dark, setDark] = useState(false);
    const typingState = useSelector(state=>state.typing);
    const [userType,setUserType] = useState(auth.currentUser.uid);
    const userId = auth.currentUser.uid;

    
    

    const wholeBody = document.getElementsByTagName('body')[0]
 
    const dispatch = useDispatch();
    const showEmojis = useSelector(state=>state.emojiShown);
    const fileAttached  = useSelector(state=>state.fileAttached);
    
 
  
    
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))

        })
        dispatch(emojiActions.backDropToggle(false))
        scroll.current.scrollIntoView({behavior:'smooth'});
        
        


    }, [])

    useEffect(() => {
        db.collection('Typing').doc('JyLfD9uRoeMQK1RP1cN6').onSnapshot(snapshot => {
            setUserType(snapshot.data().uid)
            
        })
       
       }, []);

    function emojiHandler(){
        if(showEmojis){
            dispatch(emojiActions.toggleEmoji())
        }
        else{
            return
        }

    }
    function deleteMessage(id){
        
        
        db.collection("messages").doc(id).delete().then(() => {
            console.log("Message successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setShowDelete(false)
    }
    function msgClickHandler(id){
        setDeleteID(id)
        setShowDelete(true)
        setTimeout(()=>setShowDelete(false),3000)
    }

    function darkTheme(){
        setDark(prev=>!prev)
        dark ? wholeBody.style.backgroundColor='white':wholeBody.style.backgroundColor='black';

    }

    console.log(typingState)

    
    return (
        <div>
            {showDelete && <img src={delBtn} alt='delete' style={{width:'30px',height:'30px',zIndex:'15',position:'fixed',top:'40px',right:'100px',cursor:'pointer'}} onClick={()=>deleteMessage(deleteID)}/>}
            <SignOut  />
            <span style={{position:'fixed',right:'2vh',top:'3vh', zIndex:'20'}}><Switch onChange={darkTheme}/></span>
            <img src={photoURL} alt='profile' style={{zIndex:'20',position:'fixed', top:'25px',left:'15px'}}/>
            <div className="msgs" onClick={emojiHandler}>
                {messages.map(({ createdAt,text, uid,id,url,fileType}) => (
                    <div>
                        {!!fileType?.includes('image') && <a href={url} target='blank'><img alt='imag' className={`${uid === auth.currentUser.uid ? 'imgMsg_sent' : 'img_Msgreceived'}`} src={url} /></a>}
                        {!!fileType?.includes('camImage') && <a href={url} target='blank'><img alt='imag' className={`${uid === auth.currentUser.uid ? 'imgMsg_sent' : 'img_Msgreceived'}`} src={url} /></a>}
                       
                      {  !!text && <div onClick={()=>msgClickHandler(id)} key={Math.random().toString()} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            
                            <p >{text}</p>
                           
                            
                        </div>}
                        {!!fileType?.includes('pdf') && <a href={url} target='blank'><LinkIcon className={`${uid === auth.currentUser.uid ? 'link_sent' : 'link_received'}`}/><iframe className={`${uid === auth.currentUser.uid ? 'pdf_sent' : 'pdf_Msgreceived'}`} src={url} style={{border:'none'}}/></a>}
                        {!!fileType?.includes('video') && <a href={url} target='blank'><video title='Video' className={`${uid === auth.currentUser.uid ? 'video_sent' : 'video_received'}`}>
                            <source src={url}/>
                            </video></a>}
                        

                   
                       
                        {/* {!!createdAt ? <div className = {`${uid === auth.currentUser.uid ? 'send' : 'receive'}`} >{createdAt.toDate().toDateString()}</div>: ''} */}
                    </div>
                ))}
            </div>
            {fileAttached && <h2  style={{position:'fixed', bottom:'12vh',right:'4vh'}}>Attachment</h2>}
            
            {typingState && userType!==userId && <p style={{position:'fixed', bottom:'10vh',right:'4vh'}}>typing...</p>}
            
            <SendMessage scroll={scroll}  />
            <div ref={scroll} ></div>
        </div>
    )
}

export default Chat;
