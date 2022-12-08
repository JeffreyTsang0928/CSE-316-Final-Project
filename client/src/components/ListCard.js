import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { bgcolor } from '@mui/system';
import WorkspaceScreen from './WorkspaceScreen';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expand, setExpand] = useState(false);
    const { idNamePair } = props;

    const toggleAccordion = (event) => {
        // event.stopPropagation();
        if(event.detail==2){
            event.stopPropagation();
        }
        setExpand((prev) => !prev);
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }

        //we dont currently want to load a list in a new screen
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive && !store.listNameActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    // async function handleDeleteList(event, id) {
    //     event.stopPropagation();
    //     let _id = event.target.id;
    //     _id = ("" + _id).substring("delete-list-".length);
    //     store.markListForDeletion(id);
    // }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        // event.stopPropagation();
        if(event.detail == 1){
            handleLoadList(event, idNamePair._id)
        }
        else if (event.detail === 2 && !idNamePair.published) {
            event.stopPropagation();
            console.log("double clicked");
            handleToggleEdit(event)
        }
    }







    let selectClass = "unselected-list-card";
    let currentSelected = false;
    let bgcolor = 'white';
    if(idNamePair.published){
        bgcolor='#e3f2fd'
    }
    if (store.currentList != null && store.currentList._id === idNamePair._id){
        bgcolor='#fff59d';
        currentSelected=true;
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    //TODO: Figure out how to only render these things if the playlist is published
    let likes="";
    let published = idNamePair.published;
    let listens = idNamePair.listens
    console.log("likes: " + idNamePair.likes)
    // console.log("---------------NOT IN FOR LOOP")
    // console.log(store.publishedIdNamePairs);
    // for(let i=0; i<publishedIdNamePairs.length; i++){
    //     console.log("-----------------IN FOR LOOP")
    //     if(store.publishedIdNamePairs[i]==idNamePair){
    //         published = true;
    //     }
    // }

    let publishDate="-"
    if(published){
        console.log("-----------ID NAME PAIR IN PUBLISHED SET-----------");
        likes=<Box sx={{flexDirection:'row'}}>
        <IconButton >
            <ThumbUpOffAltIcon sx={{fontSize:'36px'}}/>
            {idNamePair.likes}
        </IconButton>

            <IconButton >
                <ThumbDownOffAltIcon sx={{fontSize:'36px'}} />
                {idNamePair.dislikes}
            </IconButton>
            <Box sx={{fontSize:'12px', mt:3, alignContent: 'left'}}>Listens: <Box color='red'>{idNamePair.listens}</Box></Box>
        </Box>
        publishDate=idNamePair.updatedAt;
        let date = new Date(publishDate)
        console.log("****************************************DATE: " + date);
        // publishDate = Date.toLocaleDateString()
        publishDate = date;
    }

    
    let cardElement =
        
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                className={selectClass} 
                sx={{borderRadius:"25px", p: "10px", bgcolor: bgcolor, marginTop: '15px', display: 'flex', p: 1}}
                style={{transform:"translate(1%,0%)", width: '98%', fontSize: '20pt' }}
                onClick={(event) => {
                    handleClick(event)
                }}
            >
                <Accordion expanded={expand && currentSelected} sx={{width: '100%', height: '100%', bgcolor:bgcolor}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon 
                                onClick={(event) => toggleAccordion(event)}
                                fontSize='36px'
                            />}
                        
                    >
                        <Box sx={{ p: 1, flexGrow: 1, flexDirection: 'row' }}>{idNamePair.name}
                            <Box sx={{fontSize:'12px', mt:3}}>By: {idNamePair.createdBy}</Box>
                            <Box sx={{fontSize:'12px', mt:3}}>Published: {publishDate.toString().substring(0,15)}</Box>
                        </Box>
                        
                        {/* <Box sx={{ p: 1 }}>
                            <IconButton >
                                <ThumbUpOffAltIcon sx={{fontSize:'36px'}}/>
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton >
                                <ThumbDownOffAltIcon sx={{fontSize:'36px'}} />
                            </IconButton>
                        </Box> */}
                        {likes}
                    </AccordionSummary>
                    <AccordionDetails>
                        <WorkspaceScreen published={published}/>
                    </AccordionDetails>
                </Accordion>

            </ListItem>
            


    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;