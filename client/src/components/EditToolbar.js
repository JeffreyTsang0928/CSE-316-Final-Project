import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }
    function handleClose(event) {
        event.stopPropagation();
        store.closeCurrentList();
    }
    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={(event) => {
                    handleAddNewSong(event)
                    console.log("adding song");
                }}
                variant="contained">
                <AddIcon />
            </Button>
            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={(event) => {
                    handleUndo(event)
                    console.log("undoing!");
                }}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={(event) => {
                    handleRedo(event)
                    console.log("redoing!");
                }}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={(event) => {
                    handleClose(event)
                    console.log("closing list!");
                }}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;