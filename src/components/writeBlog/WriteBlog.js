
import { useEffect, useState} from 'react';
import { Button, FormControl, Icon, InputLabel, MenuItem, Select } from '@mui/material';
import image from "../../assets/create-blog-default.jpeg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./writeBlog.css";
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import QuillEditor from './Quill';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();
    const categories = ["All Category","Fashion","Food","Movies","Music","Tech"];
    const [loading , setLoading] = useState(false);

   
    function handleChange(e){
     setPost((prevPost) => ({...prevPost , [e.target.name]:e.target.value}))
    }

    function getSelectedCategory(e){
      setSelectedCategory(e.target.value); // for displaying
      post.category = e.target.value;
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
        
    },[file]);


async function publishTheBlog(){
  post.description = desc;
  try {
    if(post.title && post.description && post.image && post.email && post.author){
      const post_blog = await axios.post(`http://localhost:5000/api/post/create-post` , post );
      setPost(postBlog);
      setDesc("");
      setSelectedCategory("All Category");
      navigate('/home');
      toast.success(post_blog.data.message);
    } else {
      alert("Please fill all the field")
    }
  } catch (error) {
    toast.error(error.response.data.message)
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
        <div>
        <QuillEditor setDesc={setDesc}  />
        </div>

    </div>
  )
}

export default WriteBlog