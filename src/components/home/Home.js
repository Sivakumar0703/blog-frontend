import React from 'react'
import Banner from '../banner/Banner'
import Categories from '../category/Categories'
import { Grid } from '@mui/material'

const Home = () => {
  return (
    <div>
        <Banner />

        <Grid container>
            <Grid item xs={12} sm={2} lg={2}>
            <Categories />
            </Grid>

            <Grid container item xs={12} sm={10} lg={10} style={{backgroundColor:"#2C3531"}}>
            Home
            </Grid>
        </Grid>
        
    </div>
  )
}

export default Home