import Button from '@mui/material/Button';
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            {/* Playlister */}
            <img src="https://i.ibb.co/6NM0Rgz/playlisterlogo.png" id="playlister-logo"/>
            Create and share your playlists with the world!
            <div id="splash-screen-buttons">
                <Button sx={{color:"black", mt:"20px", ml:"85px", width:180, fontSize: 13, fontWeight: 'bold', border: 2}}variant="outlined" >Login</Button>
                <Button sx={{color:"black", mt:"20px", ml:"85px", width:180, fontSize: 13, fontWeight: 'bold', border: 2}}variant="outlined" >Create Account</Button>
                <Button sx={{color:"black", mt:"20px", ml:"85px", width:180, fontSize: 13, fontWeight: 'bold', border: 2}}variant="outlined" >Continue as guest</Button>
            </div>        
        </div>
    )
}