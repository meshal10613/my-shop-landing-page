import React from "react";
import Banner from "../components/Home/Banner";
import CategoryBottom from "../components/Home/CategoryBottom";
import ShopProducts from "../components/ShopProducts";


export default function page() {
    return (
        <>
            <head>
                <title>Shop | My Shop</title>
                <meta
                    name="description"
                    content={`Check out shop page at My Shop.`}
                />
            </head>
            <Banner />
            <ShopProducts />
            <CategoryBottom />
        </>
    );
}
