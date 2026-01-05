"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { products } from "./Home/Products";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Link from "next/link";

export default function ShopProducts() {
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Price Low To High");
    const [selectedFilter, setSelectedFilter] = useState("BDT 0 - BDT 500");

    const sortOptions = ["Price Low To High", "Price High To Low"];
    const filterOptions = [
        "BDT 0 - BDT 500",
        "BDT 501 - BDT 1500",
        "BDT 501 - BDT 1500",
        "BDT 2501 - BDT 5000",
    ];
    return (
        <div className="my-10 container mx-auto">
            <h2 className="text-xl lg:text-2xl font-semibold mb-10">
                All Products
            </h2>
            <div className="flex flex-col md:flex-row gap-10 lg:gap-5 xl:gap-10">
                <div className="min-w-90 md:min-w-75 w-fit mx-auto h-fit bg-white shadow-xl p-0">
                    <div className="p-5">
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Sort By:
                        </label>
                        <div className="relative">
                            <div
                                className="dropdown w-full"
                                onClick={() => setSortOpen(!sortOpen)}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn w-full justify-between text-left normal-case font-normal"
                                >
                                    <span>{selectedSort}</span>
                                    {sortOpen ? (
                                        <IoIosArrowUp />
                                    ) : (
                                        <IoIosArrowDown />
                                    )}
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-1 z-10"
                                >
                                    {sortOptions.map((option) => (
                                        <li key={option}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedSort(option);
                                                    setSortOpen(false);
                                                }}
                                                className={
                                                    selectedSort === option
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                {option}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                {/* )} */}
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <label className="block text-sm font-medium text-base-content mb-2">
                            Filter By:
                        </label>
                        <div className="relative">
                            <div
                                className="dropdown w-full"
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn w-full justify-between text-left normal-case font-normal"
                                >
                                    <span>{selectedFilter}</span>
                                    {filterOpen ? (
                                        <IoIosArrowUp />
                                    ) : (
                                        <IoIosArrowDown />
                                    )}
                                </div>
                                {filterOpen && (
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-1 z-10 max-h-60 overflow-auto"
                                    >
                                        {filterOptions.map((option) => (
                                            <li key={option}>
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setSelectedFilter(
                                                            option
                                                        );
                                                        setFilterOpen(false);
                                                    }}
                                                    className={
                                                        selectedFilter ===
                                                        option
                                                            ? "active"
                                                            : ""
                                                    }
                                                >
                                                    {option}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-2 xl:gap-5 w-fit mx-auto">
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

            <div className="flex items-center justify-end gap-2 my-10">
                <div className="flex items-center p-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    <MdKeyboardDoubleArrowLeft />
                    Preveous
                </div>
                <div className="px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    1
                </div>
                <div className="px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    2
                </div>
                <div className="px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    3
                </div>
                <div className="px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    4
                </div>
                <div className="px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    5
                </div>
                <div className="px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    6
                </div>
                <div className="flex items-center p-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer">
                    <MdKeyboardDoubleArrowRight /> Next
                </div>
            </div>
        </div>
    );
}
