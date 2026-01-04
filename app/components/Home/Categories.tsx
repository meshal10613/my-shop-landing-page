"use client";

import React from "react";
import p1 from "@/app/assets/p1.png";
import p2 from "@/app/assets/p2.png";
import p3 from "@/app/assets/p3.png";
import p4 from "@/app/assets/p4.png";
import p5 from "@/app/assets/p5.png";
import p6 from "@/app/assets/p6.png";
import p7 from "@/app/assets/p7.png";
import Image, { StaticImageData } from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const categories: { id: number; image: StaticImageData }[] = [
    { id: 1, image: p1 },
    { id: 2, image: p2 },
    { id: 3, image: p3 },
    { id: 4, image: p4 },
    { id: 5, image: p5 },
    { id: 6, image: p6 },
    { id: 7, image: p7 },
];

export default function Categories() {
    return (
        <div className="container mx-auto">
            <div>
                <h2>Categories</h2>
                <div>
                    <Carousel
                        showArrows={true}
                        showStatus={false}
                        showIndicators={false}
                        infiniteLoop
                        swipeable
                        emulateTouch
                        showThumbs={false}
                    >
                        {categories.map((category) => (
                            <div key={category.id}>
                                <Image
                                    src={category.image}
                                    alt="Organic Honey Banner"
                                    className="w-40 h-40 mx-auto"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
