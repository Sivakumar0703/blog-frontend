import React from 'react';
import "./display.css";
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const MyCard = ({post}) => {

  const navigate = useNavigate();

  function customPadEnd(string,limit){
    if(string.length > limit){
      return  string.substring(0,limit)+"..."
    }
    return string
  }
  
  function viewPost(id,title){
    navigate(`/view_post/${id}`)
  }


  return (
    <Grid className='my-card' item lg={3} sm={6} xs={12} onClick={() => viewPost(post._id,post.title)} style={{cursor:"pointer"}}>
      <div className='post-image-container'>  <img src={post.image} alt={post.title} />  </div>
      <p style={{fontSize:"16px",opacity:"0.5"}}>{post.category}</p>
      <h3 style={{textAlign:"center"}}>{customPadEnd(post.title , 18)} </h3>
      <p style={{padding:"10px"}}>{customPadEnd(post.description , 60)} </p> 
      <hr/>
      <p style={{padding:"10px"}}>written by: <span>{post.author}</span> </p>
      <p style={{padding:"10px",opacity:"0.5"}}>posted on : <span>{post.createdAt.split("T")[0]}</span> </p>
     </Grid>
  )
}

export default MyCard