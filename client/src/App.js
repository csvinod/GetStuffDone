import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home.js';
import Auth from './views/auth.js';
import CustDetails from './views/custDetails.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ServiceBrowser from './views/serviceBrowser.js';
import GarmentServices from './views/garmentServices.js';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCart from './views/shoppingCart.js';

function App() {

    // Define custom muted palette
    const mutedTheme = createTheme({
    palette: {
      primary: {
        main: '#818e7d', // Example muted green
      },
      secondary: {
        main: '#b5a6a6', // Example muted rose
      },
      // Add other colors like background, error, etc.
    },
    });


    return (

    <ThemeProvider theme={mutedTheme}>
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/custDetails" element={<CustDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/serviceBrowser" element={<ServiceBrowser />} />
            <Route path="/garmentServices" element={<GarmentServices />} />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            </Routes>
        </Router>
    </ThemeProvider>
    );

}

export default App
