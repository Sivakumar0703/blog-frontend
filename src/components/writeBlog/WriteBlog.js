
import React , {useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Box, Button, FormControl, Icon, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import image from "../../assets/create-blog-default.jpeg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./writeBlog.css";
import Navbar from '../navbar/Navbar';
import { userContext } from '../context/MyContext';
import axios from 'axios';

const WriteBlog = () => {

  const userData = JSON.parse(sessionStorage.getItem("user"));  
    const postBlog = {
        author:userData.name,
        title:"",
        description:"",
        image:"",
        category:"All Category",
        createdAt: new Date(),
        email:userData.email
    };

    const [post , setPost] = useState(postBlog);
    const [file , setFile] = useState();
    const [selectedCategory , setSelectedCategory] = useState("All Category");
    const [desc , setDesc] = useState("");
    
    const categories = ["All Category","Fashion","Food","Movies","Music","Tech"];
    const [loading , setLoading] = useState(false);


  console.log("userdata",userData)
   

    

    function handleChange(e){
        setPost((prevPost) => ({...prevPost , [e.target.name]:e.target.value}))

    }

    function getSelectedCategory(e){
        // setSelectedCategory(e.target.value);
        post.category = e.target.value;
    }

    function setDescription(e){
      setDesc(e.target.value);
      // post.desc = e.target.value;
    }

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



async function publishTheBlog(){
  try {
    if(post.title && post.description && post.image && post.email && post.author){
      const post_blog = await axios.post(`http://localhost:5000/api/post/create-post` , post );
      console.log(post_blog.data);
      setPost(postBlog);
    } else {
      console.log(post.title)
      console.log(post.description)
      console.log(post.image)
      console.log(post.email)
      console.log(post.author)
      alert("Please fill all the field")
    }
  } catch (error) {
    console.log("post error",error)
  }
}
    
    
  return (
    <div className='blog-container'>
        <Navbar/>

        <div className='image-container'>
        {loading?"loading" : <img src={!post.image?image : post.image} alt="blog"  /> }  

        </div>

        <form className='create-blog-form'>
            <label htmlFor="select-file">
                <Icon sx={{color:"#000"}}> <AddCircleIcon /> </Icon>
            </label>
            <input id="select-file" type="file" onChange={(e) => setFile(e.target.files[0])} style={{display:"none"}} />

            <input 
            className='title-input'
            placeholder='Blog Title' 
            name='title'
            onChange={(e) => handleChange(e)}
            />

            <FormControl className='select-category'>
              <InputLabel id="category-label">Choose Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={selectedCategory}
                label="Select Category"
                onChange={getSelectedCategory}
              >
                {
                    categories.map((category) => (
                        <MenuItem value={category} key={category}>{category}</MenuItem>
                    ))
                }  
              </Select>
            </FormControl>

            <Button variant="contained" onClick={publishTheBlog} className='publish-btn'> POST </Button>
        </form>

        <textarea 
        className='description'
        rows={5} 
        placeholder='Write Your Content Here'
        name='description'
         value={desc}
         onChange={setDescription}
         /> 

    </div>
  )
}

export default WriteBlog