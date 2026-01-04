"use client";

import React from "react";
import p1 from "@/app/assets/p1.png";
import p2 from "@/app/assets/p2.png";
import p3 from "@/app/assets/p3.png";
import p4 from "@/app/assets/p4.png";
import p5 from "@/app/assets/p5.png";
import p6 from "@/app/assets/p6.png";
import p7 from "@/app/assets/p7.png";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import l1 from "@/app/assets/l1.png";
import l2 from "@/app/assets/l2.png";
import l3 from "@/app/assets/l3.png";
import l4 from "@/app/assets/l4.png";

const categories = [
    { id: 1, image: p1, name: "Fruits" },
    { id: 2, image: p2, name: "Vegitables" },
    { id: 3, image: p3, name: "Food & Chips" },
    { id: 4, image: p4, name: "Dairy Goods" },
    { id: 5, image: p5, name: "Meals" },
    { id: 6, image: p6, name: "Fish & Seafoods" },
    { id: 7, image: p7, name: "Tea & Coffe" },
];

const responsive = {
    "2xl": { breakpoint: { max: 4000, min: 1536 }, items: 7 },
    xl: { breakpoint: { max: 1535, min: 1280 }, items: 6 },
    lg: { breakpoint: { max: 1279, min: 1024 }, items: 5 },
    md: { breakpoint: { max: 1023, min: 464 }, items: 3 },
    sm: { breakpoint: { max: 463, min: 0 }, items: 3 },
};

export default function Categories() {
    return (
        <section className="my-10">
            <div className="container mx-auto px-4">
                <h2 className="text-xl lg:text-2xl font-semibold mb-10">
                    Categories
                </h2>

                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    arrows={true}
                    partialVisible={false}
                    centerMode={false}
                    containerClass="pb-8"
                    itemClass="px-4"
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="text-center group cursor-pointer bg-white shadow-xl py-5"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-4 overflow-hiddenshadow-xl transition-all duration-300 group-hover:scale-110">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-lg text-gray-400 group-hover:text-primary transition-colors">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-[#F0E8D5] flex flex-col items-center justify-center pb-2 rounded-lg    w-100 lg:min-w-80 mx-auto">
                    <Image src={l1} alt="l1" />
                    <Image src={l2} alt="l2" className="relative -top-10" />
                    <p className="text-[14px] font-semibold text-center">
                        Get the <span className="text-primary">fresh food</span>{" "}
                        out of the farm
                    </p>
                </div>
                <div className="bg-[#F0E8D5] w-100 lg:min-w-80 mx-auto p-5 space-y-3 relative rounded-lg flex flex-col">
                    <p className="text-[27px] font-semibold">
                        <span className="text-primary">Organic Fruits</span>{" "}
                        Straight From Our Garden
                    </p>
                    <button className="btn w-fit bg-[#FF8080] text-white rounded-3xl">
                        Order Now
                    </button>
                    <Image src={l3} alt="l3" className="relative lg:-bottom-5" />
                </div>
                <div className="bg-[#E7EAF3] w-100 lg:min-w-80 mx-auto p-5 space-y-3 rounded-lg relative flex flex-col justify-between">
                    <h2 className="text-[25px] font-semibold">
                        <span className="text-primary">Fresh <br /> Butchered</span>{" "} <br />
                        Meat Direct <br /> To Your <br /> Home
                    </h2>
                    <button className="btn bg-[#5778DB] text-white rounded-3xl">
                        Order Now
                    </button>
                    <Image src={l4} alt="l4" className="absolute right-10 top-1/4 w-40 object-cover" />
                </div>
            </div>
        </section>
    );
}
