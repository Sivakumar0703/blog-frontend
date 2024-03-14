import styled from '@emotion/styled';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const Categories = () => {

    const categories = [
        {id:1 , category:"Movies"},
        {id:2 , category:"Food"},
        {id:3 , category:"Tech"},
        {id:4 , category:"Fashion"},
        {id:5 , category:"Music"}
    ];

    const TableStyling = styled(Table)`
     border-top : 1px solid white;
    `
    const StyledButton = styled(Button)`
     margin:20px;
     width:85%;
     background:#D9B08C;
     color:white;
     border : 1px solid white;

    `
  return (
    <div style={{border:"1px solid white"}}>
        <Link to="/write_blog" style={{textDecoration:"none"}}>
        <StyledButton> Create Blog </StyledButton>
        </Link>

        <TableStyling>

            <TableHead>
                <TableRow>
                    <TableCell>
                        All Categories
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                {category.category}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>

        </TableStyling>
    </div>
  )
}

export default Categories