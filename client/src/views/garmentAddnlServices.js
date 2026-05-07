import Banner from "../components/AppBanner";
import { GarmentAddnlServicesInput } from "../components/GarmentAddnlServicesInput";
import '../styles/App.css';


function GarmentAddnlServices() {
    return (
        <>
            <Banner/>
            <div className="App-page">
                <GarmentAddnlServicesInput/>
            </div>
        </>
    );

}

export default GarmentAddnlServices
