import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Fab, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Card, CardContent } from '@mui/material'; 
import { CardMedia } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ContentHeader, DropDown, ImageUpload, IndianRupeeSymbol } from "./CoreElements";
import { fetchCart, getGarmentTypes, addCustGarment, addGarmentService, getServiceTypes } from "../logic/apiClients/cust/CustOpsApiClient";

function GarmentServicesInput () {

    const navigate = useNavigate();
    const location = useLocation();

    const { userID, userRecID, svcType } = location.state || {};

    const [loading, setLoading] = useState(true);

    const [allGarments, setAllGarments] = useState([]);
    const [allSvcTypes, setAllSvcTypes] = useState([]);

    const [garment, setGarment] = useState();
    const [garmentGender, setGarmentGender] = useState("Female");
    const [garmentPic, setGarmentPic] = useState(null);
    const [garmentPicPreviewUrl, setGarmentPicPreviewUrl] = useState(null);
    const [refGarmentIncluded, setRefGarmentIncluded] = useState(false);
    const [refGarmentPic, setRefGarmentPic] = useState(null);
    const [refGarmentPicPreviewUrl, setRefGarmentPicPreviewUrl] = useState(null);
    const [desiredDeliveryDate, setDesiredDeliveryDate] = useState(null);
    const [instructions, setInstructions] = useState("");

    const [svcMeasure, setSvcMeasure] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    // addedServices: array of { svcName: string, measure: number }
    const [addedServices, setAddedServices] = useState([{ svcName: svcType.service_type, measure: 0 }]);
    // temporary selection while dialog is open: same shape as addedServices
    const [selectedServicesTemp, setSelectedServicesTemp] = useState([]);

    const [totalPrice, setTotalPrice] = useState(svcType.price || 0);

    const itemColor = ["#f6b9a6"];

    useEffect(() => {
        // Update total price whenever addedServices changes
        const price = addedServices.reduce((total, svc) => {
            const serviceType = allSvcTypes.find(s => s.service_type === svc.svcName);
            return total + (serviceType ? serviceType.price : 0);
        }, 0);
        setTotalPrice(price);
    }, [addedServices, allSvcTypes]);

    useEffect(() => {

        async function getStaticData() {
            setLoading(true);

            var garmentTypeData = await getGarmentTypes();
            // garmentTypeData = JSON.parse(garmentTypeData);
            console.log ("garmentTypeData:", garmentTypeData);
            setAllGarments(garmentTypeData);

            var garmentTypeData = await getGarmentTypes();
            // garmentTypeData = JSON.parse(garmentTypeData);
            console.log ("garmentTypeData:", garmentTypeData);
            setAllGarments(garmentTypeData);

            setGarment(garmentTypeData[0]);

            var serviceTypeData = await getServiceTypes();
            // serviceTypeData = JSON.parse(serviceTypeData);
            console.log ("serviceTypeData:", serviceTypeData);
            setAllSvcTypes(serviceTypeData);

            setLoading(false);
        };
        getStaticData();

        var garmentPicUrl = null;
        var refGarmentPicUrl = null;

        try {
            if (!garmentPic) {
                setGarmentPicPreviewUrl(null);
            } else {
                garmentPicUrl = URL.createObjectURL(garmentPic);
                setGarmentPicPreviewUrl(garmentPicUrl);
            }

            if (!refGarmentPic) {
                setRefGarmentIncluded(false);
                setRefGarmentPicPreviewUrl(null);
            } else {
                setRefGarmentIncluded(true);
                refGarmentPicUrl = URL.createObjectURL(refGarmentPic);
                setRefGarmentPicPreviewUrl(refGarmentPicUrl);
            }

        } catch (error) {
            console.error('Error setting image previews:', error);
            throw error;
        }
        
        // Cleanup: revoke the object URL when the component unmounts or file changes
        return (() => {
            URL.revokeObjectURL(garmentPicUrl);
            URL.revokeObjectURL(refGarmentPicUrl);
        })
    }, [garmentPic, refGarmentPic, svcType, userRecID]);


    if (loading) {
        return (
            <Typography>
                Loading...
            </Typography>
        );
    }

    const addSvc = (event) => {
        // When opening the dialog, initialize temp selection from saved selections
        if (!dialogOpen) {
            setSelectedServicesTemp([...addedServices]);
            setDialogOpen(true);
        } else {
            setDialogOpen(false);
        }
    }

    const toggleTempSelection = (svcName, checked) => {
        if (checked) {
            setSelectedServicesTemp(prev => prev.some(s => s.svcName === svcName) ? prev : [...prev, { svcName: svcName, measure: 0 }]);
        } else {
            setSelectedServicesTemp(prev => prev.filter(s => s.svcName !== svcName));
        }
    }

    const getTempServiceMeasure = (svcName) => {
        const svc = selectedServicesTemp.find(s => s.svcName === svcName);
        return svc ? svc.measure : 0;
    }

    const setTempServiceMeasure = (svcName, measure) => {
        setSelectedServicesTemp(prev => {
            const exists = prev.some(s => s.svcName === svcName);
            if (!exists) {
                return [...prev, { svcName: svcName, measure: measure }];
            }
            return prev.map(s => s.svcName === svcName ? { ...s, measure: measure } : s);
        });
    }

    const confirmSelection = () => {
        setAddedServices(selectedServicesTemp);
        setDialogOpen(false);
    }

    const cancelSelection = () => {
        // revert temp selection and close
        setSelectedServicesTemp(addedServices);
        setDialogOpen(false);
    }

    const updateAddedServiceMeasure = (svcName, measure) => {
        setAddedServices(prev => {
            const exists = prev.some(s => s.svcName === svcName);
            if (!exists) {
                return [...prev, { svcName: svcName, measure: measure }];
            }
            return prev.map(s => s.svcName === svcName ? { ...s, measure: measure } : s);
        });
    }

    const _process = async () => {
        console.log("Processing garment and services...", userID, userRecID);

        const cartData = await fetchCart(userRecID);
        console.log ("cartData:", cartData);

        const data = await addCustGarment(cartData.cartID, garment, garmentGender, garmentPic, refGarmentIncluded, refGarmentPic);
        console.log("Garment added: ", data);
        
        if (addedServices.length === 0) {
            // Ensure at least the primary service is added
            const primaryName = svcType && svcType.service_type ? svcType.service_type : null;
            if (primaryName) {
                addedServices.push({ svcName: primaryName, measure: parseFloat(svcMeasure) || 0 });
            }
        }
        for (const svc of addedServices) {
            const svcData = await addGarmentService(
                data.garmentRecID, svc.svcName, svc.measure);
            console.log("Service added: ", svcData);
        }

        navigate(
            "/serviceBrowser",
            {state: { 
                userID: userID, 
                userRecID: userRecID, 
                cartID: cartData.cartID,
            }} 
        );
    }

    return (
        <>
            <div>
                <br/>
                <br/>
                <Box
                    sx={{ 
                        display: 'flex',
                        height: 100,
                        width: 600, 
                        gap: 2, // Adds space between components
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: itemColor 
                    }}
                >
                    <ContentHeader align="center" displayText="Add Service Details" />
                </Box>
                <br/>
                <br/>
                <DropDown 
                    itemName="garmentType" 
                    displayLabel="Garment Type" 
                    itemValues={allGarments}
                    selected={garment}
                    callback={setGarment} 
                />
                <br/>
                <br/>
                <DropDown 
                    itemName="garmentGender" 
                    displayLabel="Garment For" 
                    itemValues={["Female", "Male"]} 
                    selected={garmentGender}
                    callback={setGarmentGender} 
                />
                <br/>
                <br/>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                    <Box>
                        <Typography variant="subtitle1">Help Us Identify the Garment</Typography>
                        <ImageUpload enabled={true} displayLabel="Upload Picture" callback={setGarmentPic} />
                    </Box>
                    <Card variant="outlined">
                        <CardMedia
                            component="img"
                            sx={{ height: 100, width: 100, objectFit: "contain" }}
                            image={garmentPicPreviewUrl}
                            alt=""
                        />
                    </Card>
                </Box>
                <br/>
                <br/>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                    <Box>
                        <Typography variant="subtitle1">Include Reference Garment? </Typography>
                        <ImageUpload enabled={true} displayLabel="Upload Picture" callback={setRefGarmentPic} />
                    </Box>
                    <Card variant="outlined">
                        <CardMedia
                            component="img"
                            sx={{ height: 100, width: 100, objectFit: "contain" }}
                            image={refGarmentPicPreviewUrl}
                            alt=""
                        />
                    </Card>
                </Box>
                <br/>
                <br/>
                {
                    addedServices.map((svc) => (
                        <Card>
                            <CardContent >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                                    <Typography variant="subtitle1" sx={{ width: 250}}>{svc.svcName}</Typography>
                                    <TextField
                                        id="svc-measure"
                                        variant="outlined"
                                        sx={{ width: 150 }}
                                        label="Adjust (Inches)"
                                        type="number"
                                        value={parseFloat(svc.measure)}
                                        min={0.00} step={0.25} 
                                        onChange={(e) => updateAddedServiceMeasure(svc.svcName, parseFloat(e.target.value) || 0)}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                }
                <br/>
                <br/>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
                    <Typography variant="subtitle1">More Services For Same Garment?</Typography>
                    <Fab id="add-more-services" color="primary" aria-label="add" onClick={addSvc}>
                        <AddIcon />
                    </Fab>
                </Box>
                <Dialog id="add-more-services-dialog" open={dialogOpen} onClose={cancelSelection} aria-labelledby="add-more-services-dialog-title">
                    <DialogTitle id="add-more-services-dialog-title">Select services</DialogTitle>
                    <DialogContent dividers sx={{ height: '250px', width: '450px', overflowY: 'auto', alignItems: 'center'}} >
                        <FormGroup>
                            {
                                allSvcTypes.map((svc) => (
                                    <Box key={svc.service_type} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, justifyContent: 'space-between'}}>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    value={svc.service_type}
                                                    checked={selectedServicesTemp.some(s => s.svcName === svc.service_type)}
                                                    onChange={(e) => toggleTempSelection(svc.service_type, e.target.checked)}
                                                />
                                            } 
                                            label={svc.service_type + " : " + svc.price} 
                                        />
                                        <TextField
                                            id={"measure_" + svc.service_type}
                                            variant="outlined"
                                            sx={{ width: 80, alignSelf: "right" }}
                                            label="Adjust (Inches)"
                                            type="number"
                                            value={getTempServiceMeasure(svc.service_type)}
                                            min={0.00} step={0.25} 
                                            onChange={(e) => setTempServiceMeasure(svc.service_type, parseFloat(e.target.value) || 0)}
                                        />
                                    </Box>
                                ))
                            }
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelSelection}>Cancel</Button>
                        <Button variant="contained" onClick={confirmSelection}>Confirm</Button>
                    </DialogActions>
                </Dialog>
                <br/>
                <br/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="needed-by-date"
                        variant="outlined"
                        label="Desired Date of Delivery"
                        value={desiredDeliveryDate}
                        onChange={(e) => setDesiredDeliveryDate(e) }
                        format="YYYY-MM-DD"
                    />
                </LocalizationProvider>
                <br/>
                <br/>
                <TextField
                    id="svc-instructions"
                    variant="outlined"
                    sx={{ width: 350 }}
                    label="Add Instructions"
                    multiline={true}
                    minRows={3}
                    maxRows={10}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
                <br/>
                <br/>
                <br/>
            </div>
            <div>
                <br/>
                <hr></hr>
                <br/>
                <Box sx={{ display: 'flex', alignItems: 'center', height: 100, width: 500, gap: 2, bgcolor: itemColor, justifyContent: "center"}} >
                    <ContentHeader displayText={
                            "Total Price: " + IndianRupeeSymbol() + totalPrice.toFixed(2)} />
                    <Button 
                        id="submit"
                        variant="contained" 
                        sx={{height: 64}}
                        onClick={() => _process()}>
                            Add To Order
                    </Button>
                </Box>
                <br/>
                <br/>
                <br/>
            </div>
        </>
    );

}

export default GarmentServicesInput
