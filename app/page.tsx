"use client";

import { useState } from "react";
import Banner from "./components/Home/Banner";
import Categories from "./components/Home/Categories";
import Footer from "./components/Home/Footer";
import Header from "./components/Home/Header";
import Products from "./components/Home/Products";

export default function Home() {
    const [cart, setCart] = useState(0);
    return (
        <div className="max-w-324 mx-auto">
            <Header cart={cart} />
            <Banner/>
            <Categories/>
            <Products cart={cart} setCart={setCart} title="Popular Products"/>
            <Products cart={cart} setCart={setCart} title="All Products"/>
            <Footer/>
        </div>
    );
}
