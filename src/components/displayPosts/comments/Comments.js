import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Icon } from '@mui/material';
import "../display.css";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import DisplayComments from './DisplayComments';

const Comments = ({id}) => {
    
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const initialValue = {
        postId:id,
        name:userData.name,
        email:userData.email,
        comment:"",
        date:Date.now()
    };
    const [comment , setComment] = useState(initialValue);
    const [commentList , setCommentList] = useState([]);
    const [trigger,setTrigger] = useState(false);

    function handleChange(e){
        setComment((prev)=>({...prev , comment:e.target.value }) )
    }

    async function handleClick(){
        try {
            const postComment = await axios.post(`http://localhost:5000/api/comment/new` , comment);
            console.log(postComment.data);
            setTrigger(prev => !prev);
            setComment(initialValue);
            toast.success(postComment.data.message.toUpperCase());
        } catch (error) {
            toast.error(error.response.data.message.toUpperCase());
        }
    }

    async function getComments(){
        try {
            const allComments = await axios.get(`http://localhost:5000/api/comment/get/${id}`);
            setCommentList(allComments.data.comments);
        } catch (error) {
            toast.error(error.response.data.message.toUpperCase());
        }
    }

    useEffect(()=>{
        getComments()
    },[id,trigger]);

  return (
    <div>
    <div id='comment-section'>
        <Icon sx={{margin:"10px"}}> <AccountCircleIcon /> </Icon>
        <textarea
        placeholder='Type Your Comment' 
         rows={3}
         value={comment.comment}
         onChange={handleChange}
         className='comment-text-area'
        />
        <Button variant="contained" sx={{margin:"10px"}} onClick={handleClick} >Comment</Button>

    </div>
   
    <div className='display-all-comments'>
    {
      commentList &&  commentList.length > 0 ? commentList.map((cmt)=>(
            <DisplayComments cmt={cmt} />
        )) : " "
    }
</div>

</div>
  )
}

export default Comments