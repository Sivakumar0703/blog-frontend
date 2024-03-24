
import React , { useEffect, useState} from 'react';
import { Button, FormControl, Icon, InputLabel, MenuItem, Select } from '@mui/material';
import image from "../../assets/create-blog-default.jpeg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../writeBlog/writeBlog.css";
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import QuillEditor from '../writeBlog/Quill';
import {toast} from "react-toastify"

const UpdatePost = () => {

    const {id} = useParams();
    const[isUpdating , setIsUpdating] = useState(false);
    const[previousImage , setPreviousImage] = useState("");
    const navigate = useNavigate();
    const postBlog = {
        author:"",
        title:"",
        description:"",
        image:"",
        category:"",
        createdAt:"",
        updatedAt: new Date(),
        email:""
    };
    const [post , setPost] = useState(postBlog);
    const [file , setFile] = useState();
    const [desc , setDesc] = useState("");   
    const categories = ["All Category","Fashion","Food","Movies","Music","Tech"];
    const [loading , setLoading] = useState(false);
    const [previousImageUrl , setPreviousImageUrl] = useState("");

    function handleChange(e){
      setPost((prevPost) => ({...prevPost , [e.target.name]:e.target.value}))
    }

    async function getMyPost(){
        try {
         setIsUpdating(true);
         const post = await axios.get(`http://localhost:5000/api/post/getPostById/${id}`);
         setPost(post.data.blog[0]);
         setPreviousImage(post.data.blog[0].image.split("blog-images/")[1]);
         setPreviousImageUrl(post.data.blog[0].image);
         setIsUpdating(false);
        } catch (error) {
          toast(error.response.data.message);
          setIsUpdating(false);
        }
     }

    useEffect(()=>{
        getMyPost()
    },[])

    // saving the blog image to DB 
    useEffect(()=>{
        const getImage = async() => {
            if(file){
              setLoading(true);
              const data = new FormData();
              data.append("name",file.name);
              data.append("file",file);
              const getPic =  await axios.post('http://localhost:5000/api/upload/file',data);
              setLoading(false);
              post.image = getPic.data.url;
            }
        }
        getImage(); // to get image url 
            
    },[file])



async function updateTheBlog(){
  
  try {
    post.description = desc;
    if(previousImageUrl !== post.image){
      post.imageHasChanged = true;
    }
      if(post.title && post.description && post.image && post.email && post.author && previousImage){
        await axios.put(`http://localhost:5000/api/post/update-post/${id}/${previousImage}` , post );
        navigate(`/view_post/${id}`);
      } else {
        alert("Please fill all the field")
      } 
  } catch (error) {
    toast(error.response.data.message);
  }
}
    
    
  return (
    <div className='blog-container'>
        {
            isUpdating ? "Loading..."
            : <>
            <Navbar/>

<div className='image-container'>
{loading?"loading" : <img src={!post.image?image : post.image} alt="blog"  /> }  

</div>

<form className='create-blog-form'>
    <label htmlFor="select-file">
        <Icon sx={{color:"#000",cursor:"pointer"}}> <AddCircleIcon /> </Icon>
    </label>
    <input id="select-file" type="file" onChange={(e) => setFile(e.target.files[0])} style={{display:"none"}} />

    <input 
    className='title-input'
    placeholder='Blog Title' 
    name='title'
    value={post.title}
    onChange={(e) => handleChange(e)}
    />

    <FormControl className='select-category'>
      <InputLabel id="category-label">{post.category}</InputLabel>
      <Select
        labelId="category-label"
        id="category-select"
        value={post.category}
        label="Select Category"
        onChange={handleChange}
        name="category"
      >
        {
            categories.map((category) => (
                <MenuItem value={category} key={category}>{category}</MenuItem>
            ))
        }  
      </Select>
    </FormControl>

    <Button variant="contained" onClick={updateTheBlog} className='publish-btn'> UPDATE </Button>
</form>

 <QuillEditor setDesc={setDesc} previousContent={post.description} />

     </>
    }

    </div>
  )
}

export default UpdatePost