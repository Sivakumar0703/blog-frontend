import {useState , useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import "../displayPosts/display.css";
import MyCard from '../displayPosts/MyCard';
import { toast } from 'react-toastify';

const MyBlogPost = () => {

    const[post , setPost] = useState([]);
    const [searchParams] = useSearchParams();
    let category = searchParams.get("category");
    const token = JSON.parse(sessionStorage.getItem("user")).token;


    async function getPost(){
      try {    
      let arrayOfPost;
      if(category && category !== "all"){
        arrayOfPost  = await axios.get(`http://localhost:5000/api/post/get-my-post`,{
            headers:{
              Authorization : `Bearer ${token}`
            }
          });
        const filtered = arrayOfPost.data?.posts.filter((post)=> post.category === category);
       return setPost(filtered);
      } 
      arrayOfPost  = await axios.get(`http://localhost:5000/api/post/get-my-post`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      });
        setPost(arrayOfPost.data.posts);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }



    useEffect(()=>{
        getPost()
    },[category])

  return (
    <div className='display-container'>

    {
      post.length ? 
         post.map((singlePost)=>{
        return <MyCard post={singlePost} key={singlePost._id} /> 
        })
     
     : <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}> <p style={{color:"white"}}>No Post Available</p> </div>
    }
    
 </div>
  )
}

export default MyBlogPost