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
      if(category !== "all"){
        arrayOfPost = await axios.get(`http://localhost:5000/api/post`);
        const filtered = arrayOfPost.data?.post.filter((post)=> post.category === category);
       return setPost(filtered);
      }
        arrayOfPost = await axios.get(`http://localhost:5000/api/post`);
        console.log(arrayOfPost.data.post);
        setPost(arrayOfPost.data.post);
    }



    useEffect(()=>{
        getPost()
    },[category])

  return (
    // <div className='display-container'>
    <div className='display-container'>
        
       {
        post.length ? 
            post.map((singlePost)=>{
                
              // return  <Link to={`/view_post/${singlePost._id}/${singlePost.title}`} style={{textDecoration:"none",color:"inherit"}}> 
              return <MyCard post={singlePost} key={singlePost._id} /> 
              //  </Link> 
             
            })
        
        : <div> No Post Available </div>
       }
       
    </div>
  )
}

export default DisplayPosts