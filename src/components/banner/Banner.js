import { Box, Typography , styled } from '@mui/material'
import React from 'react'
import image from "../../assets/blog_banner.jpg"


const Banner = () => {
    const Image = styled(Box)`
    background-image : url(${image});
    background-repeat: no-repeat;
    background-position: center; 
    width:100%;
    height:50vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:start;
    `
    const Title = styled(Typography)`
    font-size:25px;
    font-weight:bold;
    color:#2C3531;
    line-height:1;
    margin:15px;
    `
    const SubTitle = styled(Typography)`
    font-size:25px;
    color:#2C3531;
    line-height:1;
    margin:15px;
    `
  return (
    <Image>
        <Title> Blog </Title>
        <SubTitle> Write and post </SubTitle>
    </Image>
  )
}

export default Banner