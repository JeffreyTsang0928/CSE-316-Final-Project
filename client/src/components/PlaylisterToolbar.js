import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups'; //All lists button
import PersonIcon from '@mui/icons-material/Person'; //Users button
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'


function PlaylisterToolbar(){
    const [text, setText] = useState("");
    const { store } = useContext(GlobalStoreContext);

    let myListsHighlighted=false;
    let allListsHighlighted=false;
    let usersListsHighlighted=false;

    if(store.allListsView){
        allListsHighlighted=true;
    }
    else if(store.userListsView){
        usersListsHighlighted=true;
    }
    else{
        myListsHighlighted=true;
    }


    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.setFilterText(text);
            setText("");
        }
    }

    function handleClickMyListsButton(event){
        console.log("clicked on my lists button");
        event.stopPropagation();
        store.setMyListsView();
    }


    function handleClickAllListsButton(event){
        console.log("clicked on all lists button")
        event.stopPropagation();
        store.setAllListsView();
        console.log("CURR SET OF IDNAME PAIRS:")
        console.log(store.idNamePairs)
    }

    function handleClickUserListsButton(event){
        event.stopPropagation();
        store.setUserListsView();
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    return(
        <Box id="playlister-toolbar"
            sx={{mt:0.5}}
        >
            <Grid container>
                <Grid item>
                    <Button>
                        <HomeIcon
                            onClick={(event) => handleClickMyListsButton(event)}
                            color={(myListsHighlighted) ? 'success' : 'primary'}
                        /> 
                    </Button>
                </Grid>

                <Grid item>
                    <Button>
                        <GroupsIcon 
                            onClick={(event)=> handleClickAllListsButton(event)
                            
                        }
                        color={(allListsHighlighted) ? 'success' : 'primary'}
                        />
                    </Button>
                </Grid>

                <Grid item>
                    <Button>
                        <PersonIcon
                            color={(usersListsHighlighted) ? 'success' : 'primary'}
                            onClick={(event)=> handleClickUserListsButton(event)}
                        />
                    </Button>
                </Grid>

                <Grid item
                 sx={{ml:6, mt:-2.15, mr: 80, fontSize:"14pt", width: "500px"}}> 
                    <TextField
                        margin="normal"
                        size="small"
                        className='toolbar-searchbar'
                        onKeyPress={handleKeyPress}
                        onChange={handleUpdateText}
                        label="Search"
                        fullWidth
                        inputProps={{style: {fontSize: 14}}}
                        InputLabelProps={{style: {fontSize: 14}}}
                    />
                </Grid>
                <Grid item>
                    <Button>
                        Sort <SortIcon/>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

}

export default PlaylisterToolbar;