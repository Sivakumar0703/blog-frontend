import Banner from '../banner/Banner'
import Categories from '../category/Categories'
import { Grid } from '@mui/material';
import Navbar from '../navbar/Navbar';
import "./myPage.css";
import MyBlogPost from './MyBlogPost';
import image from "../../assets/my-blog-page.jpg";

const MyPage = () => {
    
  return (
    <div>
      <Navbar/>
        <Banner image={image} text={false} />

<Grid container>
    <Grid item xs={12} sm={2} lg={2} style={{backgroundColor:"#116466"}}>
    <Categories page={"about"} />
    </Grid>

    <Grid container item xs={12} sm={10} lg={10} style={{backgroundColor:"#2C3531"}}>
    <MyBlogPost />
    </Grid>
</Grid>
    </div>
  )
}

export default MyPage