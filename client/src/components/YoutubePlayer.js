import React from 'react';
import YouTube from 'react-youtube';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store/index.js';
import Box from '@mui/material/Box';


export default function YouTubePlayer() {

    const { store } = useContext(GlobalStoreContext);

    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST

    let noSongs=true;
    let playlist = [];
    if(store.currentList){
        console.log("there is a current list")
        if(store.currentList.songs.length){
            playlist = store.currentList.songs
            noSongs = false;
        }
    }
    // let playlist =[
    //     "fIuPyIs4S4c"
    // ]


    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = store.songPlaying;
    console.log("current song: " + currentSong)
    if(playlist.length>0){
        console.log("youtube id in player: " + playlist[currentSong].youTubeId)
    }

    const playerOptions = {
        height: '300',
        width: '500',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong].youTubeId;
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        console.log("incremented song!");
        // currentSong++;
        // currentSong = currentSong % playlist.length;
        store.incSong();
        
    }

    // function decSong(){
    //     if(currentSong!=0){
    //         currentSong--;
    //         currentSong = currentSong % playlist.length;
    //     }
    // }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
            loadAndPlayCurrentSong(player);
        }
    }

    if(!store.currentList || noSongs){
        //RENDERS WHEN THERE IS NO SONG TO PLAY
        return(
            <Box sx={{width:'500px', height:'300px', bgcolor:'black'}}>

            </Box>
        )
    }

    return <YouTube
        videoId={playlist[currentSong].youTubeId}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />;

}