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

    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }

    function handlePublishList(event){
        event.stopPropagation();
        store.publishPlaylist();
    }

    function handleDuplicateList(event){
        event.stopPropagation();
        console.log("duplicating list with name: " + store.currentList.name);
        store.duplicateList(store.currentList);
    }

    async function handleDeleteList(event){
        event.stopPropagation();
        store.markListForDeletion(store.currentList._id);
    }

    return (
        <div id="edit-toolbar">
            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={(event) => {
                    handleUndo(event)
                    console.log("undoing!");
                }}
                sx={{m:1}}
                variant="contained">
                    Undo
            </Button>
            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={(event) => {
                    handleRedo(event)
                    console.log("redoing!");
                }}
                sx={{m:1}}
                variant="contained">
                    Redo
            </Button>
            <Button 
                disabled={store.currentList.published}
                id='publish-button'
                onClick={(event) => {
                    handlePublishList(event)
                    console.log("publishing list!");
                }}
                sx={{ml:38}}
                variant="contained">
                    Publish
            </Button>
            <Button 
                disabled={!store.canClose()}
                id='delete-button'
                onClick={(event) => {
                    handleDeleteList(event)
                    console.log("deleting list!");
                }}
                sx={{m:1}}
                variant="contained">
                    Delete
            </Button>
            <Button 
                disabled={!store.canClose()}
                id='duplicate-button'
                onClick={(event) => {
                    handleDuplicateList(event)
                    console.log("duplicating list!");
                }}
                variant="contained">
                    Duplicate
            </Button>
        </div>
    )
}

export default EditToolbar;