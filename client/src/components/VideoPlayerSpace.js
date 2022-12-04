import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';
import { GlobalStoreContext } from '../store/index.js';
import YouTubePlayer from './YoutubePlayer.js';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



function VideoPlayerSpace(){
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex)
    }
    return(
        <Box id="video-player-workspace">
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Player" />
                    <Tab label="Comments" />
                </Tabs>
            </Box>
            <Box>


            </Box>
        </Box>
    )
}

export default VideoPlayerSpace;