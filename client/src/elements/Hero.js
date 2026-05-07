import { Box, Grid, Typography, Button } from "@mui/material";
import { MainHeader, ContentHeader } from "./CoreElements";
import { ServiceCategories, ExpressServices } from "./ServiceCatalog";


function Splash() { 
    return (
        <>
            <br/>
            <Grid id="splash" container spacing={2} justifyContent="center" alignContent="center" >
                <Grid id="left-spacer" size={2} />
                <Grid id="headline" size={4}>
                    <MainHeader displayText="Easy tailoring services for all your clothes — from tiny fixes to custom fits." ></MainHeader>
                    <ContentHeader displayText="Trusted tailors.   Reliable timelines.   Clear pricing." />
                </Grid>
                <Grid id="spacer1" size={1} />
                <Grid id="login" size={3} >
                    <Box
                        sx={{ 
                            width: 400, 
                            height: 200, 
                            borderRadius: 2, // You can use numbers (0-12) or a specific pixel value like '8px'
                            backgroundColor: 'primary.main',
                        }}
                        align="center"
                    >
                        <br/>
                        <br/>
                        <Typography variant="h5" justifyContent="center" align="center">Sign up now!</Typography>
                        <Typography variant="body" justifyContent="center" align="center">Or Login if Already Registered</Typography>
                        <br/>
                        <br/>
                        <Button variant="contained" label="signUp" href="./auth" >Sign Up / Sign In</Button>
                    </Box>
                </Grid>
                <Grid id="right-spacer" size={2} />
            </Grid>
            <br/>
        </>
    );
}


function Features() {
    const features = [
        { title: "Guaranteed timelines", desc: "Each service lists a clear delivery window so you can plan." },
        { title: "Expert tailors", desc: "Experienced professionals for handling all your needs." },
        { title: "Upfront pricing", desc: "No surprises. See rates, delivery, taxes & fees before you pay." },
        { title: "Pickup & delivery", desc: "We arrange logistics so you don’t have to leave home." },
    ];

    return (
        <>
            <div>
                <br/>
                <Grid container spacing={3} justifyContent="center" alignContent="center" >
                    <Grid size={1} />
                    {
                        features.map(feature => {return (
                            <Grid size={2} >
                                <Box borderRadius="16px" height="150px" backgroundColor="#bea06eff" sx={{padding: "16px"}} >
                                    <ContentHeader align="center" displayText={feature.title} />
                                    <Typography align="center" variant="body">{feature.desc}</Typography>
                                </Box>
                            </Grid>
                        );})
                    }
                    <Grid size={1} />
                </Grid>
                <br/>
            </div>
        </>
    );
}


function Hero () {

    return (
        <>
            <div align="center" alignContent="center" >
                <Splash />
                <Features />
                <ServiceCategories />
                <ExpressServices />
                <br/>
                <span/>
                <br/>
            </div>
        </>
    );
}

export { Hero };
