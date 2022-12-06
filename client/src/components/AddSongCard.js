import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function AddSongCard(){

    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }

    let cardClass = "list-card unselected-list-card";
    return(
        <Grid container
            id="add-song-card"
            className={cardClass}
            onClick={handleAddNewSong}
            justifyContent='center'
            width='97.5%'
        >
            <Grid item>
                <AddIcon sx={{fontSize: '36px'}}/>
            </Grid>

        </Grid>
    )

}
export default AddSongCard