import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function VideoController() {
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
                        <FastRewindIcon fontSize='large'/>
                </Grid>
                <Grid>
                        <StopIcon fontSize='large'/>
                </Grid>
                <Grid>
                        <PlayArrowIcon fontSize='large'/>
                </Grid>
                <Grid>
                        <FastForwardIcon fontSize='large'/>
                </Grid>
            </Grid>
        </Box>


    )
}
export default VideoController;