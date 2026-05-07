import { useLocation } from "react-router-dom";
import { Typography, Box, AppBar } from "@mui/material";
import { CartBadge } from "./CoreElements";

const Banner = () => {

    const location = useLocation();
    const { userID, userRecID } = location.state || {};

    return(
        <header className="App-header">
            <AppBar>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 5}}>
                    <Typography 
                        variant="h1" 
                        gutterBottom 
                        sx={{
                            flexGrow: 1, 
                            padding: 2, 
                            textAlign: 'center'
                        }}
                    >
                        GetStuffDone
                    </Typography>
                    <CartBadge userID={userID} userRecID={userRecID} />
                </Box>
            </AppBar>
        </header>
    );
}

export default Banner;
