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
    const { idNamePair, selected } = props;

    const toggleAccordion = () => {
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
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

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

    let selectClass = "unselected-list-card";
    let currentSelected = false;
    let bgcolor = 'white';
    if (store.currentList != null && store.currentList._id === idNamePair._id){
        bgcolor='yellow';
        currentSelected=true;
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    
    let cardElement =
        
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                className={selectClass} 
                sx={{borderRadius:"25px", p: "10px", bgcolor: bgcolor, marginTop: '15px', display: 'flex', p: 1 }}
                style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt' }}
                // button
                onClick={(event) => {
                    handleLoadList(event, idNamePair._id)
                    console.log("heheh");
                }}
            >
                <Accordion expanded={expand && currentSelected} sx={{width: '100%', height: '100%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon 
                                onClick={toggleAccordion}
                                fontSize='36px'
                            />}
                        
                    >
                        <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                                <EditIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <IconButton onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} aria-label='delete'>
                                <DeleteIcon style={{fontSize:'48pt'}} />
                            </IconButton>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                        <WorkspaceScreen />
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