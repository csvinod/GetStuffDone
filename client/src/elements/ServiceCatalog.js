import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Typography, Chip, Link } from "@mui/material";
import { Grid, Box, CardMedia } from "@mui/material";
import { ContentHeader, IndianRupeeSymbol, SubHeader } from "./CoreElements";
import { getServiceTypes } from "../logic/apiClients/cust/CustOpsApiClient";

import img_tailoring_category_alteration from "../resources/images/tailoring_category_alteration.jpg";
import img_tailoring_category_fixing from "../resources/images/tailoring_category_fixing.jpg";
import img_tailoring_category_stitching from "../resources/images/tailoring_category_stitching.jpg";


function ServiceCategories() {

    const categories = [
        {
            name: "Alterations", 
            desc: "Adjust length, width and fit of your garment", 
            pic: img_tailoring_category_alteration
        },
        { 
            name: "Fixing", 
            desc: "Repair zips, buttons, hooks, elastic, etc.", 
            pic: img_tailoring_category_fixing
        },
        { 
            name: "Stitching & Patchwork", 
            desc: "Patch work, lining, and detailed stitching", 
            pic: img_tailoring_category_stitching
        },
    ];

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container>
                <Grid size={2} />
                <SubHeader displayText="Service Categories" />
            </Grid>
            <br/>
            <Grid container spacing={3} justifyContent="center" alignContent="center" >
                <br/>
                {
                    categories.map((cat) => {return( 
                        <Link 
                            justifyContent="center"
                            href="/garmentServices"
                            sx={{height: 250}}
                        >
                            <CardMedia
                                component="img"
                                height="250"
                                width="250"
                                src={cat.pic}
                                sx={{ objectFit: "fill" }}
                            >
                            </CardMedia>
                            <ContentHeader align="center" displayText={cat.name} />
                            <Typography align="center" variant="body">{cat.desc}</Typography>
                        </Link>
                    )})
                }
            </Grid>
            <br/>
            <br/>
        </>
    );
}

function ExpressServices() {

    const [allSvcTypes, setAllSvcTypes] = useState([]);
    const [loading, setLoading] = useState();
    
    useEffect(() => {
        async function getStaticData() {
            setLoading(true);

            var serviceTypeData = await getServiceTypes();
            // serviceTypeData = JSON.parse(serviceTypeData);
            console.log ("serviceTypeData:", serviceTypeData);
            setAllSvcTypes(serviceTypeData);

            setLoading(false);
        };
        getStaticData();
    }, []);

    if (loading) {
        return (
            <Typography>
                Loading...
            </Typography>
        );
    }


    const expressSvcs = [
        "Length: increase", 
        "Length: reduce", 
        "Fix button", 
        "Fix zip", 
        "Fix hook", 
        "Saree fall pico", 
    ];

    const itemColors = ["#addef4", "#ebd6e6", "#a6f6da", "#c6caf9", "#f6e1a6", "#f6b9a6ff"];

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container alignContent="center">
                <Grid size={2} />
                <Box
                    sx={{ 
                        display: 'flex', 
                        gap: 2 // Adds space between components
                    }}
                >
                    <SubHeader displayText="Express Services" align="center" />
                    <Chip sx={{backgroundColor:"#b0efb9"}} label="Fast" ></Chip>
                </Box>
            </Grid>
            <br/>
            <Grid container spacing={5} justifyContent="center" alignContent="center" >
                <br/>
                <Grid item size={2} />
                <Grid container spacing={5} justifyContent="flex-start" alignContent="center" >
                {
                    allSvcTypes.map((svc) => {
                        return(
                            expressSvcs.includes(svc.service_type) ? 
                                <Grid 
                                    item 
                                    size={3} 
                                    sx={{ 
                                        bgcolor: itemColors[Math.floor(Math.random() * itemColors.length)] 
                                    }} 
                                >
                                    <Link 
                                        justifyContent="center"
                                        href="/garmentServices"
                                        sx={{height: 150, width: 200}}
                                    >
                                        <ContentHeader align="center" displayText={svc.service_type} />
                                        <Box
                                            sx={{ 
                                                display: 'flex', 
                                                gap: 2, // Adds space between components
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Typography align="center" variant="body">{svc.price}</Typography>
                                            <Chip sx={{backgroundColor:"#e7eea1"}} label="24 Hrs" ></Chip>
                                        </Box>
                                    </Link>
                                </Grid>
                            : (null)
                        );
                    })
                }
                </Grid>
                <Grid size={2} />
            </Grid>
            <br/>
            <br/>
        </>
    );
}

function AllServices() {

    const [allSvcTypes, setAllSvcTypes] = useState([]);
    const [loading, setLoading] = useState();

    const {userID, userRecID} = useLocation().state || {};
    
    useEffect(() => {
        async function getStaticData() {
            setLoading(true);

            var serviceTypeData = await getServiceTypes();
            // serviceTypeData = JSON.parse(serviceTypeData);
            console.log ("serviceTypeData:", serviceTypeData);
            setAllSvcTypes(serviceTypeData);

            setLoading(false);
        };
        getStaticData();
    }, []);

    if (loading) {
        return (
            <Typography>
                Loading...
            </Typography>
        );
    }

    const itemColors = ["#addef4", "#ebd6e6", "#a6f6da", "#c6caf9", "#f6e1a6", "#f6b9a6ff"];

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container alignContent="center">
                <Grid size={2} />
                <Box
                    sx={{ 
                        display: 'flex', 
                        gap: 2 // Adds space between components
                    }}
                >
                    <SubHeader displayText="All Services" align="center" />
                </Box>
                <Grid size={2} />
            </Grid>
            <br/>
            <Grid container spacing={5} justifyContent="center" alignContent="center" >
                <Grid item size={2} />
                <Grid container spacing={5} justifyContent="flex-start" alignContent="center" >
                {
                    allSvcTypes.map((svc) => {
                        return(
                            <Grid 
                                item 
                                size={3} 
                                sx={{ 
                                    bgcolor: itemColors[Math.floor(Math.random() * itemColors.length)] 
                                }} 
                            >
                                <Link 
                                    component={RouterLink}
                                    to="/garmentServices"
                                    state={{ userID: userID, userRecID: userRecID, svcType: svc }}
                                    justifyContent="center"
                                    sx={{height: 150, width: 200}}
                                >
                                    <ContentHeader align="center" displayText={svc.service_type} />
                                    <Box
                                        sx={{ 
                                            display: 'flex', 
                                            gap: 2, // Adds space between components
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Typography align="center" variant="body">{<IndianRupeeSymbol/>}{svc.price}</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        );
                    })
                }
                </Grid>
                <Grid size={2} />
            </Grid>
            <br/>
            <br/>
        </>
    );
}


export { ServiceCategories, ExpressServices, AllServices };
