import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';
import { GlobalStoreContext } from '../store/index.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function VideoController() {

    const { store } = useContext(GlobalStoreContext);

    function handleSkipSong(event){
        // event.stopPropagation();
        store.incSong();
    }

    function handlePrevSong(event){
        // event.stopPropagation();
        store.decSong();
    }
    
    function handlePauseSong(event){
        store.pauseSong();
    }

    function handlePlaySong(event){
        store.playSong();
    }

    let style = {
        border: 1,
        borderRadius: 1,
        bgcolor: "#fffde7",
        // width: 500,
        height: 36

    }

    return(
        <Box id="video-controller" sx={style}>
            <Grid container id="video-controller-grid" spacing={0} justifyContent="center">
                <Grid>
                        <FastRewindIcon sx ={{cursor: 'pointer'}}
                            fontSize='large'
                            onClick={(event) => {
                                handlePrevSong(event)
                                console.log("Going to prev song...");
                            }}
                            
                        />
                </Grid>
                <Grid>
                        <StopIcon sx ={{cursor: 'pointer'}}
                            fontSize='large'
                            onClick={(event) => {
                                handlePauseSong(event)
                                console.log("Pausing song...");
                            }}
                        />
                </Grid>
                <Grid>
                        <PlayArrowIcon sx ={{cursor: 'pointer'}}
                            fontSize='large'
                            onClick={(event) => {
                                handlePlaySong(event)
                                console.log("Playing song...");
                            }}
                        />
                </Grid>
                <Grid>
                        <FastForwardIcon sx ={{cursor: 'pointer'}}
                            fontSize='large' 
                            onClick={(event) => {
                                handleSkipSong(event)
                                console.log("Skipping song...");
                            }}
                        />
                </Grid>
            </Grid>
        </Box>


    )
}
export default VideoController;