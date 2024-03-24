import {AppBar , Toolbar} from "@mui/material";
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
            <Link to="/home" style={{fontWeight:"bold"}}> HOME </Link>
            <Link to="/about" style={{fontWeight:"bold"}}> MY-SECTION </Link>
            <Link to="/contact" style={{fontWeight:"bold"}}> CONTACT </Link>
            <Link to="/" style={{fontWeight:"bold"}}> LOGOUT </Link>
        </Nav>
    </Component>
  )
}

export default Navbar