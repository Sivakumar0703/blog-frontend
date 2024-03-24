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
  
  function viewPost(id){
    navigate(`/view_post/${id}`)
  }


  return (
    <Grid className='my-card' item lg={3} sm={6} xs={12} onClick={() => viewPost(post._id,post.title)} style={{cursor:"pointer"}}>
      <div className='post-image-container'>  <img src={post.image} alt={post.title} />  </div>
      <p style={{fontSize:"16px",opacity:"0.5",margin:"5px 0 0 5px"}}>{post.category}</p>
      <h3 style={{textAlign:"center"}}>{customPadEnd(post.title , 18)} </h3>
      <p style={{padding:"10px"}}  dangerouslySetInnerHTML={{__html: post?.description}} id="blog-content">
       </p>       
      <div className='card-footer'>
        <hr style={{opacity:"0.1"}}/>
        <div style={{display:"flex",justifyContent:"space-between",width:"100%",margin:"5px 0",padding:" 0 10px"}}>
        <span>@{post.author}</span>
        <span style={{opacity:"0.3"}}>{post.createdAt.split("T")[0]}</span>
        </div>
        
      </div>
     </Grid>
  )
}

export default MyCard