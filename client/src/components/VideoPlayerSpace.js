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

    const { store } = useContext(GlobalStoreContext);

    let playlistName = "";
    let songTitle = "";
    let songArtist = "";
    let songNumber = store.songPlaying;
    if(store.currentList != null){
        playlistName = store.currentList.name;
        if(store.currentList.songs.length){
            songTitle = store.currentList.songs[songNumber].title;
            songArtist = store.currentList.songs[songNumber].artist;
        }
    }

    function handleSwitchToComments(event){
        console.log("clicked on comments")
        event.stopPropagation();
        if(store.player!=null){
            store.unsetPlayer();
        }
    }







    return(
        <Box id="video-player-workspace">
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} >
                    <Tab label=<b>Player</b> sx={{ border: 1, borderRadius: 1, borderBottom: 0 }}/>
                    <Tab label=<b>Comments</b> sx={{ border: 1, borderRadius: 1, borderBottom: 0 }}
                        onClick={(event) => handleSwitchToComments(event)}
                    />
                </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                <Box>
                    <YouTubePlayer currTab={tabIndex}/>
                    <Typography align='center'>
                        <b>Now Playing</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Playlist: {playlistName}</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Song #: {songNumber}</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Title: {songTitle}</b>
                    </Typography>
                    <Typography align='left'>
                        <b>Artist: {songArtist}</b>
                    </Typography>
                    <VideoController />
                </Box>
                )}
                {tabIndex === 1 && (
                <Box>
                    Comments
                </Box>
                )}
            </Box>
            
        </Box>
    )
}

export default VideoPlayerSpace;