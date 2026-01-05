import React from "react";
import Banner from "../components/Home/Banner";
import CategoryBottom from "../components/Home/CategoryBottom";
import ShopProducts from "../components/ShopProducts";

export default function page() {
    return (
        <div>
            <Banner/>
            <ShopProducts/>
			<CategoryBottom/>
        </div>
    );
}
