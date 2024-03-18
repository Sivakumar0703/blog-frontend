import axios from 'axios';
import React, { useContext, useEffect , useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./display.css";
import Navbar from '../navbar/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import Comments from './comments/Comments';

const ViewPost = () => {
    const {id} = useParams();
    const [blog , setBlog] = useState();
    const [loading , setLoading] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    console.log(id);

    async function getMyPost(){
       try {
        setLoading(true);
        const post = await axios.get(`http://localhost:5000/api/post/getPostById/${id}`);
        console.log(post.data.blog);
        setBlog(post.data.blog[0]);
        setLoading(false);
       } catch (error) {
          console.log(error.response.data.message);
          setLoading(false);
       }
    }

    useEffect(()=>{
        getMyPost();
    },[])

    async function deletePost(){
      try {
        const deletePost =   await axios.delete(`http://localhost:5000/api/post/delete/${id}`);
        console.log(deletePost.data.message);
        toast.success(deletePost.data.message.toUpperCase());
        navigate("/home");
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message.toUpperCase());
      }

    }


  return (
    <div>
        <Navbar/>
        {
            loading  ? <span>loading...</span>
            : <div>
                <h1 style={{textAlign:"center" , fontSize:"30px",color:"white" , marginTop:"70px",marginBottom:"10px",wordBreak:"break-word"}}>{blog?.title}</h1>
                <div className='view-blog-image-container'> <img src={blog?.image}  alt="blog" /> </div>
                <div style={{display:"flex",margin:"10px",color:"white"}}><span>{blog?.author}</span>  <span style={{marginLeft:"auto"}}>{new Date(blog?.createdAt).toDateString()}</span></div>
                <div>
             {
                    userData?.email === blog?.email &&
                    <div style={{float:"right"}}> 
                    <Link to={`/update_post/${blog?._id}`}>  <EditIcon className='icon-styling'/>  </Link>
                    <DeleteIcon className='icon-styling' onClick={deletePost} /> 
                    </div>
                } 
            </div> <br/>
            <br/>
                <div style={{margin:"20px"}}> 
                    <p style={{color:"white",wordBreak:"break-word"}}>
                        {blog?.description}
                    </p>
                </div>
                <br/>
                <br/>

                <div>
                    <Comments />
                </div>
            </div>
            
        }
       
    </div>
  )
}

export default ViewPost