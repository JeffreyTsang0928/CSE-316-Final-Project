import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';
import { GlobalStoreContext } from '../store/index.js';
import YouTubePlayer from './YoutubePlayer.js';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import VideoController from './VideoController.js';



function VideoPlayerSpace(){
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex)
        console.log("setting tab to " + newTabIndex)
    }
    return(
        <Box id="video-player-workspace">
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} >
                    <Tab label=<b>Player</b> sx={{ border: 1, borderRadius: 1, borderBottom: 0 }}/>
                    <Tab label=<b>Comments</b> sx={{ border: 1, borderRadius: 1, borderBottom: 0 } }/>
                </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                <Box>
                    <YouTubePlayer />
                    <Typography align='center'>
                        <b>Now Playing</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Playlist:</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Song #:</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Title:</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Artist:</b>
                    </Typography>
                </Box>
                )}
                {tabIndex === 1 && (
                <Box>
                    Comments
                </Box>
                )}
            </Box>
            <VideoController />
        </Box>
    )
}

export default VideoPlayerSpace;