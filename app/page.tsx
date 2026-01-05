"use client";

import Banner from "./components/Home/Banner";
import Categories from "./components/Home/Categories";
import CategoryBottom from "./components/Home/CategoryBottom";
import Products from "./components/Home/Products";

export default function Home() {
    return (
        <div>
            <Banner/>
            <Categories/>
            <CategoryBottom/>
            <Products title="Popular Products"/>
            <Products title="All Products"/>
        </div>
    );
}
