import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function AddListButton(){

    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    return(
        <Fab 
            color="primary" 
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
            disabled = {store.allListsView || store.userListsView}
        >
            <AddIcon />
        </Fab>
    )

}


export default AddListButton