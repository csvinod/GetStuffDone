import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, FormControlLabel, Alert, AlertTitle } from "@mui/material";
import { Typography, InputLabel, Button, Select, MenuItem, Switch } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


function MainHeader(props) {

    const { displayText, align } = props;

    return (
        <>
            <Typography variant="h3" align={align || "justify"} gutterBottom>
                {displayText}
            </Typography>
        </>
    );
}

function SubHeader(props) {

    const { displayText, align } = props;

    return (
        <>
            <Typography variant="h4" align={align || "justify"} gutterBottom>
                {displayText}
            </Typography>
        </>
    );
}

function ContentHeader(props) {

    const { displayText, align } = props;
    
    return (
        <>
            <br/>
            <Typography variant="h5" align={align || "justify"} gutterBottom>
                {displayText}
            </Typography>
            <br/>
        </>
    );
}

function IndianRupeeSymbol() {
    return ("\u20B9");
}

function DropDown(props) {

    // expects props: itemName, displayLabel, itemValues(array), callback(function)
    const {itemName, displayLabel, itemValues, selected, callback} = props;

    const [itemValue, setItemValue] = useState(selected || itemValues[0]);

    return (
        <FormControl sx={{ m: 1, minWidth: 150 }} size="medium">
            <InputLabel id={`${itemName}-label`} >{displayLabel}</InputLabel>
            <Select
                labelId={`${itemName}-simple-select-label`}
                id={`${itemName}-simple-select`}
                label="Service"
                sx={{ width: 225 }}
                value={itemValue}
                onChange={(e) => {setItemValue(e.target.value); callback(e.target.value)}}
            >
                {
                    itemValues.map((entry) => (
                        <MenuItem key={entry} value={entry}>{entry}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );    
}

function ImageUpload(props) {

    // expects props: displayLabel, enabled(true/false), callback(function)
    const {displayLabel, enabled, callback} = props;

    const handleFileChange = (event) => {
        const currentFile = event.target.files[0];
        callback(currentFile); // return data to parent component
    };

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            disabled={!enabled}
            startIcon={<CloudUploadIcon />}
        >
            {displayLabel}
            <VisuallyHiddenInput
                type="file"
                accept="image/*" 
                onChange={handleFileChange}
                single
            />
        </Button>
    );
}

function OnOffSwitch(props) {

    // expects props: itemName, mainLabel, switchLabel, initiallyOn(true=on, false=off), callback(function)
    const {itemName, mainLabel, switchLabel, initiallyOn, callback} = props;

    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">{mainLabel}</FormLabel>
            <FormControlLabel
                control={
                    <Switch checked={initiallyOn} onChange={event => {callback(event.target.checked)}} name={itemName} />
                }
                label={switchLabel}
            />
        </FormControl>
    );
}

function CartBadge(props) {

    const { cartSize } = props;
    const navigate = useNavigate();

    const { userID, userRecID } = props;

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleClick = () => {
        navigate(
            "/shoppingCart",
            {state: {
                userID: userID, 
                userRecID: userRecID, 
            }} 
        );
    }    

    return (
        <IconButton aria-label="cart">
        <StyledBadge badgeContent={cartSize || ""} color="secondary" onClick={handleClick}>
            <ShoppingCartIcon />
        </StyledBadge>
        </IconButton>
    );
}

function StatusArea(props) {
    const { showAlert, callback} = props;
    if (!showAlert) {
        return (<></>);
    }
    return (
        <>
            <Alert severity="success" onClose={() => {callback(false)}}>
                <AlertTitle>Success</AlertTitle>
                Your order is confirmed!
            </Alert>
        </>        
    );
}


export { MainHeader, SubHeader, ContentHeader, IndianRupeeSymbol, DropDown, ImageUpload, OnOffSwitch, CartBadge, StatusArea };
