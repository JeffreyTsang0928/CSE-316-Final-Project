import Button from '@mui/material/Button';
import SortIcon from '@mui/icons-material/Sort';
import Grid from '@mui/material/Grid';
import { GlobalStoreContext } from '../store'
import {useContext} from 'react'
function SortMenu(){
    const {store} = useContext(GlobalStoreContext);

    function handleSortByName(event){
        event.stopPropagation();
        store.sortByName();
    }

    function handleSortByPublished(event){
        event.stopPropagation();
        store.sortByPublished();
    }


    return(
        <Grid container direction="column" alignItems='center' sx={{zIndex:100}}>
            <Grid item>
                <Button variant='outlined' sx={{minWidth:'208px'}}
                    onClick={(event)=>handleSortByName(event)}>Name (A-Z)</Button>
            </Grid>
            <Grid item>
                <Button variant='outlined' sx={{minWidth:'208px'}}
                onClick={(event)=>handleSortByPublished(event)}>Publish Date (Newest)</Button>
            </Grid>
            <Grid item>
                <Button variant='outlined' sx={{minWidth:'208px'}}>Likes (High-Low)</Button>
            </Grid>
            <Grid item>
                <Button variant='outlined' sx={{minWidth:'208px'}}>Dislikes (High-Low)</Button>
            </Grid>
        </Grid>
    )
}
export default SortMenu