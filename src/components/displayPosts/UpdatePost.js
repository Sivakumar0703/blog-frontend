
import React , {useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Box, Button, FormControl, Icon, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import image from "../../assets/create-blog-default.jpeg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "../writeBlog/writeBlog.css";
import Navbar from '../navbar/Navbar';
import { userContext } from '../context/MyContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {

    const {id} = useParams();
    // const[blog , setBlog] = useState();
    const[isUpdating , setIsUpdating] = useState(false);
    const[previousImage , setPreviousImage] = useState("");
    const navigate = useNavigate();
    

  const userData = JSON.parse(sessionStorage.getItem("user"));  
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
    // const [selectedCategory , setSelectedCategory] = useState("All Category");
    const [desc , setDesc] = useState("");
    
    const categories = ["All Category","Fashion","Food","Movies","Music","Tech"];
    const [loading , setLoading] = useState(false);
    const [previousImageUrl , setPreviousImageUrl] = useState("");


 
   

    

    function handleChange(e){
        setPost((prevPost) => ({...prevPost , [e.target.name]:e.target.value}))

    }

    function getSelectedCategory(e){
        // setSelectedCategory(e.target.value);
        post.category = e.target.value;
        console.log(e.target.value)
    }

    function setDescription(e){
      setDesc(e.target.value);
      // post.desc = e.target.value;
    }

    async function getMyPost(){
        try {
         setIsUpdating(true);
         const post = await axios.get(`http://localhost:5000/api/post/getPostById/${id}`);
         console.log(post.data.blog);
         setPost(post.data.blog[0]);
         setPreviousImage(post.data.blog[0].image.split("blog-images/")[1]);
         setPreviousImageUrl(post.data.blog[0].image);
         setIsUpdating(false);
        } catch (error) {
           console.log(error.response.data.message);
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
              console.log(getPic.data)
              setLoading(false);
               post.image = getPic.data.url;
            }
        }
        getImage(); // to get url 
        
        
    },[file])



async function updateTheBlog(){
  
  try {
    if(previousImageUrl !== post.image){
      console.log('image changed');
      post.imageHasChanged = true;
    }
      if(post.title && post.description && post.image && post.email && post.author && previousImage){
        await axios.put(`http://localhost:5000/api/post/update-post/${id}/${previousImage}` , post );
        navigate(`/view_post/${id}`);
        console.log(post , previousImage)
      } else {
        alert("Please fill all the field")
      } 
  } catch (error) {
    console.log("post error",error)
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
      <InputLabel id="category-label">All Category</InputLabel>
      <Select
        labelId="category-label"
        id="category-select"
        value={post.category}
        label="Select Category"
        // onChange={getSelectedCategory}
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

<textarea 
className='description'
rows={5} 
placeholder='Write Your Content Here'
name='description'
 value={post.description}
 onChange={handleChange}
//  onChange={setDescription}
 /> 
            </>
        }

    </div>
  )
}

export default UpdatePost