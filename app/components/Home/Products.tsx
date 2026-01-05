import React from "react";
import img1 from "@/app/assets/category1.png";
import img2 from "@/app/assets/category2.png";
import img3 from "@/app/assets/category3.png";
import img4 from "@/app/assets/category4.png";
import img5 from "@/app/assets/category5.png";
import img6 from "@/app/assets/category6.png";
import img7 from "@/app/assets/category7.png";
import img8 from "@/app/assets/category8.png";
import img9 from "@/app/assets/category9.png";
import img10 from "@/app/assets/category10.png";
import Image, { StaticImageData } from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

type ProductItems = {
    id: number;
    title: string;
    image: StaticImageData;
    basePrice: number;
    discountedPrice: number;
}[];

export const products: ProductItems = [
    {
        id: 1,
        title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
        image: img1,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 2,
        title: "All Natural Italian-Style Chicken Meatballs",
        image: img2,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 3,
        title: "Foster Farms Takeout Crispy Classic Buffalo Wings",
        image: img3,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 4,
        title: "Chobani Complete Vanilla Greek Yogurt",
        image: img4,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 5,
        title: "Encore Seafoods Stuffed Alaskan Salmon",
        image: img5,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 6,
        title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
        image: img6,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 7,
        title: "All Natural Italian-Style Chicken Meatballs",
        image: img7,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 8,
        title: "Foster Farms Takeout Crispy Classic Buffalo Wings",
        image: img8,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 9,
        title: "Chobani Complete Vanilla Greek Yogurt",
        image: img9,
        basePrice: 1900,
        discountedPrice: 1200,
    },
    {
        id: 10,
        title: "Encore Seafoods Stuffed Alaskan Salmon",
        image: img10,
        basePrice: 1900,
        discountedPrice: 1200,
    },
];
export default function Products({ title }: { title: string }) {
    return (
        <div className="container mx-auto my-10">
            {/* Popular Products */}
            <div className="my-10">
                <h2 className="text-xl lg:text-2xl font-semibold mb-10">
                    {title}
                </h2>
                <div className="grid grid-cols-2 md:gric-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-xl p-3 max-w-60 mx-auto space-y-3 h-full flex flex-col relative"
                        >
                            <FaRegHeart
                                size={20}
                                className="text-gray-400 absolute top-2 right-2 cursor-pointer hover:text-red-500"
                            />

                            <div className="h-36 flex items-center justify-center overflow-hidden">
                                <Link href={`/products/${product.id}`}>
                                    <Image
                                        src={product.image}
                                        alt={`image-${product.id}`}
                                        className="w-34 lg:w-37 h-auto mx-auto transition-all hover:scale-110 cursor-pointer"
                                    />
                                </Link>
                            </div>
                            <h2 className="text-[14px] md:text-xl font-semibold text-primary">
                                BDT {product.discountedPrice}{" "}
                                <span className="text-gray-400 line-through">
                                    BDT{product.basePrice}
                                </span>
                            </h2>
                            <p className="text-[10px] md:text-xs lg:text-[14px] font-semibold">
                                {product.title}
                            </p>
                            <div className="flex items-center gap-3">
                                <button className="btn btn-sm border-2 border-primary text-primary transition-all hover:border-none hover:bg-primary hover:text-white hover:scale-110">
                                    Add To Cart
                                </button>
                                <button className="btn btn-sm transition-all border-none bg-primary text-white hover:scale-110">
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
