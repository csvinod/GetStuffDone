import Banner from "../components/AppBanner";
import ShoppingCart from "../components/ShoppingCart";
import '../styles/App.css';


function Cart() {
    return (
        <>
            <Banner/>
            <div className="App-page">
                <ShoppingCart/>
            </div>
        </>
    );

}

export default Cart;

