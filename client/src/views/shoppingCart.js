import Banner from "../elements/AppBanner";
import TailoringCart from "../elements/TailoringCart";
import '../styles/App.css';


function ShoppingCart() {
    return (
        <>
            <Banner/>
            <div className="App-page">
                <TailoringCart/>
            </div>
        </>
    );

}

export default ShoppingCart
