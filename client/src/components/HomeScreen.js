import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import YouTubePlayer from './YoutubePlayer.js'
import VideoPlayerSpace from './VideoPlayerSpace';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(1150%, 10%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab sx={{transform:"translate(-20%, 0%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                Your Playlists
            </div>
            <Grid container id="list-selector-workspace">
                <Grid item xs={7}>
                    <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <VideoPlayerSpace/>
                    {/* <YouTubePlayer /> */}
                </Grid>
            </Grid>
        </div>)
}

export default HomeScreen;