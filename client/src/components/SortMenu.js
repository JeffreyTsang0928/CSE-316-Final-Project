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

    function handleSortByLikes(event){
        event.stopPropagation();
        store.sortByLikes();
    }

    function handleSortByDislikes(event){
        event.stopPropagation();
        store.sortByDislikes();
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
                <Button variant='outlined' sx={{minWidth:'208px'}}
                onClick={(event)=>handleSortByLikes(event)}>Likes (High-Low)</Button>
            </Grid>
            <Grid item>
                <Button variant='outlined' sx={{minWidth:'208px'}}
                onClick={(event)=>handleSortByDislikes(event)}>Dislikes (High-Low)</Button>
            </Grid>
        </Grid>
    )
}
export default SortMenu