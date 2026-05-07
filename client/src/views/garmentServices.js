import Banner from "../elements/AppBanner";
import GarmentServicesInput from "../elements/GarmentServicesInput";
import '../styles/App.css';


function GarmentServices() {
    return (
        <>
            <Banner/>
            <div className="App-page">
                <GarmentServicesInput/>
            </div>
        </>
    );

}

export default GarmentServices
