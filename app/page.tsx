import Banner from "./components/Home/Banner";
import Categories from "./components/Home/Categories";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";
import Products from "./components/Home/Products";

export default function Home() {
    return (
        <div className="max-w-324 mx-auto">
            <Header />
            <Banner/>
            <Categories/>
            <Products title="Popular Products"/>
            <Products title="All Products"/>
            <Footer/>
        </div>
    );
}
