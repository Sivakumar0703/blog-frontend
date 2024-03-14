
import React , {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import { Box, Button, FormControl, Icon, InputBase } from '@mui/material';
import image from "../../assets/create-blog-default.jpeg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextareaAutosize } from '@mui/base';

const WriteBlog = () => {

    const postBlog = {
        author:"",
        title:"",
        description:"",
        image:"",
        category:"",
        createdAt: new Date()
    };

    const [post , setPost] = useState(postBlog);
    const [file , setFile] = useState();

    const Image = styled("img")({
    height:"50vh",
    width:"100%",
    objectFit:"cover"
    });

    const BlogContainer = styled(Box)`
      margin: 50px 50px
    `
    const MyFormControl = styled(FormControl)`
    display:flex;
    flex-direction:row;
    margin-top:10px;
    `

    const InputField = styled(InputBase)`
    margin:0 30px;
    flex:1;
    font-size:25px;
    `

    function handleChange(e){
        setPost((prevPost) => ({...prevPost , [e.target.name]:e.target.value}))
    }

    // saving the blog image to DB 
    useEffect(()=>{
        const getImage = () => {
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
            }
        }
    },[file])


    
    
  return (
    <BlogContainer>
        <Image src={image} alt="blog"  />

        <MyFormControl>
            <label htmlFor="select-file">
                <Icon sx={{color:"#000"}}> <AddCircleIcon /> </Icon>
            </label>
            <input id="select-file" type="file" onChange={(e) => setFile(e.target.files[0])} style={{display:"none"}} />

            <InputField 
            placeholder='Blog Title' 
            name='title'
            onChange={(e) => handleChange(e)}
             />

            <Button variant="contained"> POST </Button>
        </MyFormControl>

        <textarea 
        rows={5} 
        style={{width:"100%",marginTop:"10px",padding:"15px"}}
        placeholder='Write Your Content Here'
        name='description'
        onChange={(e) => handleChange(e)}
         /> 

    </BlogContainer>
  )
}

export default WriteBlog