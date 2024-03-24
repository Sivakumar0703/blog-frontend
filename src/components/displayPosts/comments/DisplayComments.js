import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';


const DisplayComments = ({cmt}) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    async function deleteComment(){
    try {
        const deleteComment = await axios.delete(`http://localhost:5000/api/comment/delete/${cmt._id}`);
        toast.success(deleteComment.data.message.toUpperCase());
    } catch (error) {
        toast.error(error.response.data.message.toUpperCase());
    }        
    }

  return (
    <div style={{backgroundColor:"#4D4D4D",margin:"5px 10px",borderRadius:"5px"}}>
        <div style={{padding:"10px",display:"flex",justifyContent:"space-between"}}>
        <p style={{display:"inline-block",color:"white"}}>{cmt.name}&nbsp;&nbsp;-&nbsp;&nbsp;<span style={{opacity:"0.3"}}>{new Date(cmt.date).toDateString()}</span></p>
        {
            cmt.email === user.email ? <Icon sx={{cursor:"pointer"}}> <DeleteIcon onClick={deleteComment} sx={{color:"red"}} /> </Icon> : " "
        }
        </div>
        <p style={{padding:"10px"}} >{cmt.comment}</p>

    </div>
  )
}

export default DisplayComments