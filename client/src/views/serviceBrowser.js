import Banner from "../elements/AppBanner";
import { TailoringServiceBrowser } from "../elements/TailoringServiceBrowser";
import '../styles/App.css';


function ServiceBrowser() {

    return (
        <>
            <Banner/>
            <div className="App-page">
                <TailoringServiceBrowser/>
            </div>
        </>
    );

}

export default ServiceBrowser;
