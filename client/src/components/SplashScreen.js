import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            {/* Playlister */}
            <img src="https://i.ibb.co/6NM0Rgz/playlisterlogo.png" id="playlister-logo"/>
            Create and share your playlists with the world!
            <div id="splash-screen-buttons">
                <Button sx={{color:"white", mt:"20px", ml:"85px", width:180, fontSize: 13, fontWeight: 'bold'}}variant="contained" component={Link} to="/login">Log in</Button>
                <Button sx={{color:"white", mt:"20px", ml:"85px", width:180, fontSize: 13, fontWeight: 'bold'}}variant="contained" component={Link} to="/register">Create Account</Button>
                <Button sx={{color:"white", mt:"20px", ml:"85px", width:180, fontSize: 13, fontWeight: 'bold'}}variant="contained" >Continue as guest</Button>
            </div>        
        </div>
    )
}