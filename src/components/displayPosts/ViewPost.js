import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./display.css";
import Navbar from '../navbar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { toast } from 'react-toastify';
import Comments from './comments/Comments';
import  DOMPurify from "dompurify";


const ViewPost = () => {
    const {id} = useParams();
    const [blog , setBlog] = useState();
    const [loading , setLoading] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

   

    async function getMyPost(){
       try {
        setLoading(true);
        const post = await axios.get(`http://localhost:5000/api/post/getPostById/${id}`);
        setBlog(post.data.blog[0]);
        setLoading(false);
       } catch (error) {
          toast(error.response.data.message);
          setLoading(false);
       }
    }

    useEffect(()=>{
      const content = document.getElementById("setContent");
        getMyPost(content);
    },[])

    async function deletePost(){
      try {
        const deletePost =   await axios.delete(`http://localhost:5000/api/post/delete/${id}`);
        toast.success(deletePost.data.message.toUpperCase());
        navigate("/home");
      } catch (error) {
        toast.error(error.response.data.message.toUpperCase());
      }

    }


  return (
    <div style={{backgroundColor:"white"}}>
        <Navbar/>
        {
            loading  ? <span>loading...</span>
            : <div>
                <h1 id="view-post-heading">{blog?.title}</h1>
                <div className='view-blog-image-container'> <img src={blog?.image}  alt="blog" /> </div>
                <div style={{display:"flex",margin:"10px 10px 0",color:"#116466"}}>
                  <span style={{fontSize:"35px",display:"flex",alignItems:"center"}}> <span>{blog?.author}</span> <span><EditNoteIcon style={{fontSize:"35px",paddingTop:"15px"}}/></span> </span>  
                  <span style={{marginLeft:"auto",opacity:"0.5"}}>{new Date(blog?.createdAt).toDateString()}</span></div>
                <div>
             {
                    userData?.email === blog?.email &&
                    <div style={{float:"right"}}> 
                    <Link to={`/update_post/${blog?._id}`}><EditIcon className='icon-styling icon-styling-edit' fontSize='large' sx={{border:"1px solid blue" , color:"blue"}}/></Link>
                    <DeleteIcon className='icon-styling icon-styling-delete' fontSize='large' onClick={deletePost} sx={{border:"1px solid red" , color:"red"}} /> 
                    </div>
                } 
            </div> <br/>
            <br/>
                <div style={{margin:"0 10px 0 40px" , backgroundColor:"#F8F8FF"}} id="setContent" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(blog?.description)}}> 
                </div>
                <br/>
                <br/>

                <div>
                    <Comments  id={id} />
                </div>
            </div>
            
        }
       
    </div>
  )
}

export default ViewPost