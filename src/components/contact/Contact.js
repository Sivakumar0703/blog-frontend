import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import contact from "../../assets/contact.jpg";
import "./contact.css";
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';


const Contact = () => {

    const user = JSON.parse(sessionStorage.getItem("user"));
    const [message , setMessage] = useState("");
    

    async function sendFeedback(){
        try {
            const data = {
                name:user.name,
                email:user.email,
                message:message
            }
            const sendMsg = await axios.post(`http://localhost:5000/api/feedback` , data);
            setMessage("");
            toast.success(sendMsg.data.message.toUpperCase());
        } catch (error) {
            toast.error(error.response.data.message.toUpperCase());

        }
    }
    
  return (
    <div style={{height:"100vh",width:"100%",backgroundColor:"#116466",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Navbar/>
        <div className='contact-container'>
        <div className='head-section'>
            
            <img src={contact} alt="contact" />

        </div>

        <div className='msg-area'>
        <p className='contact-heading'>CONTACT</p> <br/>

        <label htmlFor='UserName' className='feedback-label' >USER NAME</label>
        <input id="UserName"  value={user.name} className='feedback-input' readOnly /> <br/>

        <label htmlFor='my-email' className='feedback-label'>Email</label>
        <input id="my-email"  value={user.email} className='feedback-input' readOnly /> <br/>

        <textarea
        style={{padding:"10px",color:"#D9B08C",fontSize:"22px",backgroundColor:"none",marginBottom:"1px solid white"}}
        rows={5}
        placeholder='Leave Your Msg Here...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />  <br/>
        <Button variant="contained" style={{cursor:"pointer"}} onClick={sendFeedback}>Send <SendIcon/></Button>  <br/>
        </div>

    </div>
    </div>
  )
}

export default Contact