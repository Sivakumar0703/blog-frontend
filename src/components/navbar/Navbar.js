import React from 'react'
import {AppBar , Toolbar, Typography} from "@mui/material";
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Navbar = () => {

    const Component = styled(AppBar)`
    background:#2C3531;
    color: black;
    `
    const Nav = styled(Toolbar)`
    justify-content:center;
    & > a {
        padding:20px;
        color:#116466 ;
        text-decoration : none;
    }
    `
  return (
    <Component>
        <Nav>
            <Link to="/home" > HOME </Link>
            <Link to="/about" > ABOUT </Link>
            <Link to="/contact" > CONTACT </Link>
            <Link to="/" > LOGOUT </Link>
        </Nav>
    </Component>
  )
}

export default Navbar