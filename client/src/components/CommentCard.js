import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function CommentCard(props){
    const {body, user} = props;
    let cardClass = "comment-list-card";

    return(
        <Box sx={{borderRadius:"25px", p: "10px", bgcolor: 'white', marginTop: '15px', display: 'flex', p: 1}}>
            {body}
        </Box>
    )

}

export default CommentCard