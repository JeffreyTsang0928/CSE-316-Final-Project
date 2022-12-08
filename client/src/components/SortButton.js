import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import Grid from '@mui/material/Grid';
import { useContext, useState } from 'react'
import SortMenu from './SortMenu';
import Box from '@mui/material/Box'



function SortButton(){
    const [menuOpen, setMenuOpen] = useState(false);

    function handleClickOnButton(event){
        event.stopPropagation();
        console.log("CLICKED ON BUTTON")
        setMenuOpen(!menuOpen)

    }


    let sortMenu=<SortMenu />
    if(!menuOpen){
        sortMenu =""
    }
    
    return(
        <Box>
        <Button
            onClick={(event)=>handleClickOnButton(event)}
        >
            Sort    
            <SortIcon/>
        </Button>
        <Box>{sortMenu}</Box>
        </Box>
        
    )
}
export default SortButton