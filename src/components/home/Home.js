import React, { useContext } from 'react'
import Banner from '../banner/Banner'
import Categories from '../category/Categories'
import { Grid } from '@mui/material';
import Navbar from '../navbar/Navbar';
import { userContext } from '../context/MyContext';
import DisplayPosts from '../displayPosts/DisplayPosts';

const Home = () => {
  const {userData} = useContext(userContext);
  console.log(userData)
  return (
    <div>
      <Navbar/>
        <Banner />

        <Grid container>
            <Grid item xs={12} sm={2} lg={2}>
            <Categories />
            </Grid>

            <Grid container item xs={12} sm={10} lg={10} style={{backgroundColor:"#2C3531"}}>
            <DisplayPosts />
            </Grid>
        </Grid>
        
    </div>
  )
}

export default Home