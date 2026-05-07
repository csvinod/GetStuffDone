import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Container, Stack, Button, Grid, Divider } from "@mui/material";
import { Card, CardContent, List, ListItem, ListItemText} from "@mui/material";
import { ContentHeader, IndianRupeeSymbol, StatusArea } from "./CoreElements";
import { getServiceTypes, fetchCart, getCustGarments, getGarmentServices, confirmOrder } from "../logic/apiClients/cust/CustOpsApiClient";

function TailoringCart () {

    const location = useLocation();

    const { userID, userRecID } = location.state || {};
    console.log('Received userID:', userID);

    const [cartID, setCartID] = useState(null);

    const [loading, setLoading] = useState(true);
    const [allSvcTypes, setAllSvcTypes] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [itemServices, setItemServices] = useState([]);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        async function getData() {
            setLoading(true);

            var serviceTypeData = await getServiceTypes();
            console.log ("serviceTypeData:", JSON.stringify(serviceTypeData));
            setAllSvcTypes(serviceTypeData);

            const cartData = await fetchCart(userRecID);
            console.log ("cartData:", JSON.stringify(cartData));
            setCartID(cartData.cartID);
            
            var cartItemsData = await getCustGarments(cartData.cartID);
            console.log ("cartItemsData:", JSON.stringify(cartItemsData));
            setCartItems(cartItemsData);

            setItemServices([]);
            for (const item of cartItemsData) {
                var itemServicesData = await getGarmentServices(item.rec_id);
                console.log ("itemServicesData for garment id " + item.rec_id + ": ", JSON.stringify(itemServicesData));
                setItemServices(prevState => [...prevState, ...itemServicesData]);
            }

            setLoading(false);
            console.log ("Cart size: " + cartItemsData.length + ", Services size: " + itemServicesData.length);

        };
        getData();

    }, [userRecID]);

    if (loading) {
        return (
            <>
                <div>
                    <Typography>
                        Loading...
                    </Typography>
                </div>
            </>
        );
    }
    
    const confirmCartItems = async() => {
        var orderData = await confirmOrder(cartID);
        console.log ("confirmOrder:", orderData);
        setShowAlert(true);
    }

    const computeCartPrice = () => {
        var cartTotal = parseFloat(0.00);
        cartItems.map(cartItem => {return(
            cartTotal = cartTotal + computeCartItemPrice(cartItem)
        )});
        return cartTotal;
    }

    const computeCartItemPrice = (cartItem) => {
        var cartTotal = parseFloat(0.00);
        itemServices.map((svc) => {return(
            cartTotal = cartTotal + computeServicePrice(svc.svc_type)
        )});
        return cartTotal;
    }

    const computeServicePrice = (inputSvcType) => {
        var foundPrice = parseFloat(0.00);
        const foundSvc = allSvcTypes.find(svc => svc.service_type === inputSvcType);
        if (foundSvc !== undefined) {
            foundPrice = parseFloat(foundSvc.price);
        }
        return foundPrice;
    }


    return (
        <>
            <div align="center">
                <ContentHeader displayText="Your Cart" />
                <Grid container sx={{width: 800}} spacing={2} alignItems="flex-start">
                    <Grid sx={{flexGrow: 1}} >
                        <Container>
                            <br/>
                            <br/>
                            <ContentHeader displayText="Items In Your Cart" />
                            <br/>
                            <Typography variant="h6" align="left" >{"Services: " + itemServices.length} </Typography>
                            <br/>
                            <Stack spacing={2}>
                                {
                                    cartItems.map((cartItem, index) => {return(
                                        <Card>
                                            <CardContent align="left">
                                                <Typography variant="h6" align="left">{(index+1) + ": " + cartItem.garment} </Typography>
                                                <Typography align="left">For {cartItem.garment_gender} person</Typography>
                                                <Typography align="left">Reference Garment: {cartItem.refGarmentIncluded? "Yes" : "No"}</Typography>
                                                <Divider style={{ backgroundColor: 'darkgray' }} sx={{ borderBottomWidth: 3 }} />
                                                <br/>
                                                <List>
                                                    {
                                                        itemServices.filter(svc => 
                                                                svc.cart_garment_id === cartItem.cart_garment_id
                                                            ).map((svc) => { return(
                                                                <ListItem disablePadding>
                                                                    <ListItemText primary={svc.svc_type + " -- " + svc.svc_measure_inches + " inches: " + IndianRupeeSymbol() + computeServicePrice(svc.svc_type) } />
                                                                </ListItem>
                                                            )})
                                                    }
                                                </List>
                                                <Divider style={{ backgroundColor: 'darkgray' }} sx={{ borderBottomWidth: 3 }} />
                                                <Typography variant="h6" align="left" >{"Item Total: " + IndianRupeeSymbol() + computeCartItemPrice(cartItem)} </Typography>
                                            </CardContent>
                                        </Card>
                                    );})
                                }
                            </Stack>
                        </Container>
                    </Grid>
                    <Grid>
                        <Divider orientation="vertical" style={{ backgroundColor: 'darkgray' }} sx={{ rightBottomWidth: 3 }} />
                    </Grid>
                    <Grid>
                        <br/>
                        <br/>
                        <Card sx={{ width: 275 }} >
                            <CardContent align="center">
                                <ContentHeader displayText="Cart Summary"></ContentHeader>
                                <Typography>
                                    Cart Total: <IndianRupeeSymbol/> {computeCartPrice().toFixed(2)}
                                </Typography>
                                <br/>
                                <Button 
                                    id="submit"
                                    variant="contained" 
                                    onClick={() => confirmCartItems()}>
                                        Confirm Order
                                </Button>
                            </CardContent>
                        </Card>
                        <Card sx={{ width: 275 }} >
                            <StatusArea showAlert={showAlert} callback={setShowAlert} />
                        </Card>
                    </Grid>
                </Grid>
                <br/>
                <br/>
            </div>
        </>
    );

}

export default TailoringCart;
