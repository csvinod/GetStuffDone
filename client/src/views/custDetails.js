import Banner from "../elements/AppBanner";
import CustDetailsInput from "../elements/CustDetailsInput";
import '../styles/App.css';


function CustDetails() {
    return (
        <>
            <Banner/>
            <div className="App-page">
                <CustDetailsInput/>
            </div>
        </>
    );

}

export default CustDetails
