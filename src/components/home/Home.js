import React, { useContext } from 'react'
import Banner from '../banner/Banner'
import Categories from '../category/Categories'
import { Grid } from '@mui/material';
import Navbar from '../navbar/Navbar';
import DisplayPosts from '../displayPosts/DisplayPosts';
import image from "../../assets/blog_banner.jpg"

const Home = () => {  
  return (
    <div>
      <Navbar/>
        <Banner image={image} text={true} />

        <Grid container>
            <Grid item xs={12} sm={2} lg={2} style={{backgroundColor:"#116466"}}>
            <Categories page={"home"} />
            </Grid>

            <Grid container item xs={12} sm={10} lg={10} style={{backgroundColor:"#2C3531"}}>
            <DisplayPosts />
            </Grid>
        </Grid>
        
    </div>
  )
}

export default Home