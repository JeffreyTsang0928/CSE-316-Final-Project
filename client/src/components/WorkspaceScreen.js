import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import YouTubePlayer from './YoutubePlayer.js'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js'
import AddSongCard from './AddSongCard.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const {published} = props;
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    let workspace= <Box/>
    let addSongCard = <AddSongCard/>;

    if(store.currentList && store.currentList.published){
        addSongCard = "";
    }

    if(store.currentList!=null){
        workspace = <Box id="song-cards">
        <Box>
        <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '100%', width: '100%'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                        published = {published}
                    />
                ))  
            }
            {/* <AddSongCard/> */}
            {addSongCard}
        </List>            
        { modalJSX }
        </Box>
        <EditToolbar published={published}/>
    </Box>
    }
    return (
        workspace
    )
}

export default WorkspaceScreen;