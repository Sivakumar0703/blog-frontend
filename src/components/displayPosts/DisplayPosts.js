import axios from 'axios';
import {useState , useEffect} from 'react'
import MyCard from './MyCard';
import "./display.css";
import { useSearchParams } from 'react-router-dom';

const DisplayPosts = () => {

    const[post , setPost] = useState([]);
    const [searchParams] = useSearchParams();
    let category = searchParams.get("category");


    async function getPost(){
      let arrayOfPost;
      if(category && category !== "all"){
        arrayOfPost = await axios.get(`http://localhost:5000/api/post`);
        const filtered = arrayOfPost.data?.post.filter((post)=> post.category === category);
       return setPost(filtered);
      }
        arrayOfPost = await axios.get(`http://localhost:5000/api/post`);
        setPost(arrayOfPost.data.post);
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
        
        : <div style={{marginTop:"15px",display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}> <span style={{color:"white"}}>No Post Available</span> </div>
       }
    </div>
  )
}

export default DisplayPosts