"use client";

import React from "react";
import banner from "@/app/assets/banner1.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image, { StaticImageData } from "next/image";

const banners: StaticImageData[] = [banner, banner, banner];

export default function Banner() {
    return (
        <div className="container mx-auto">
            <Carousel
                showArrows={false}
                showStatus={false}
                showIndicators={true}
                infiniteLoop
                swipeable
                emulateTouch
				showThumbs={false}
            >
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className="relative w-full h-70 md:h-100 lg:h-120 overflow-hidden rounded-none md:rounded-md xl:rounded-xl"
                    >
                        {" "}
                        <Image
                            src={banner}
                            alt="Organic Honey Banner"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-end-safe">
                            <div className="text-left text-white px-6 max-w-4xl">
                                <p className="text-lg md:text-2xl lg:text-5xl tracking-wide mb-3 text-yellow-300">
                                    Get The Best
                                </p>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                                    Organic <span className="text-yellow-300">Honey</span>
                                </h1>

                                <p className="text-lg md:text-2xl lg:text-5xl tracking-wide mb-3 text-yellow-300">
                                    For Your Family
                                </p>

                                <div className="flex gap-5 lg:gap-10">
                                    <a
                                        href="#shop"
                                        className="bg-yellow-300 text-white font-semibold btn xl:btn-xl rounded-lg border-none text-lg transition-all hover:scale-110"
                                    >
                                        Order Now
                                    </a>

                                    <a
                                        href="#products"
                                        className="btn xl:btn-xl border-yellow-300 text-yellow-300 bg-transparent transition-all hover:scale-110 hover:text-white hover:bg-yellow-300"
                                    >
                                        View All Products
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
