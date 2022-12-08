import React from 'react';
import YouTube from 'react-youtube';
import { useContext, useState } from 'react'
import {useRef} from 'react';
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store/index.js';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CommentCard from './CommentCard.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function CommentSection(props){
    const [text, setText] = useState("");
    const { store } = useContext(GlobalStoreContext);

    function handleUpdateText(event) {
        setText(event.target.value);
    }
    // function handleKeyPress(event) {
    //     if (event.code === "Enter") {
    //         //do something

    //     }
    // }



    function handleSubmit(event){
        let body = text;
        console.log("COMMENT BODY: " + body);
        if(store.currentList!=null){
            store.commentOnList(body);
            comments = store.getCurrentListComments();
        }
        
    }

    let comments = []
    if(store.currentList){
        comments = store.getCurrentListComments();
    }

    return(
        <Grid container id='comment-cards'>
            <Grid item xs={12}>
                <List 
                id="playlist-cards" 
                sx={{maxHeight: '400px', width: '100%', overflow: 'scroll'}}
                >
                {
                    comments.map((body, index) => (
                        <CommentCard
                            user={body.userName}
                            body={body.body}
                        />
                    ))  
                }
            </List>
            </Grid>
            <Grid item xs={12}>
                <TextField
                            margin="normal"
                            size="small"
                            className='toolbar-searchbar'
                            onChange={handleUpdateText}
                            label="Comment"
                            fullWidth
                            inputProps={{style: {fontSize: 14}}}
                            InputLabelProps={{style: {fontSize: 14}}}
                        /> 
                <Box alignItems='right'>
                    <Button
                    sx={{m:1}}
                    variant="contained"
                    onClick={(event) => handleSubmit(event)}
                    disabled = {store.currentList && !store.currentList.published}
                    >
                        Submit
                    </Button> 
                </Box>
            </Grid>
        </Grid>
    )
}
export default CommentSection