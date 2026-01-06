"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Link from "next/link";
import { ProductsType } from "./Home/Products";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slice/cartSlice";

export default function ShopProducts() {
    const dispatch = useDispatch<AppDispatch>();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Price Low To High");
    const [selectedFilter, setSelectedFilter] = useState("BDT 0 - BDT 500");

    const sortOptions = [
        { label: "Price Low To High", value: "asc" },
        { label: "Price High To Low", value: "desc" },
    ];
    const filterOptions = [
        "BDT 0 - BDT 500",
        "BDT 501 - BDT 1500",
        "BDT 501 - BDT 1500",
        "BDT 2501 - BDT 5000",
    ];
    const [products, setProducts] = useState<ProductsType[]>([]);
    useEffect(() => {
        fetch(
            `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?limit=10&page=${currentPage}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "store-id": `0000121`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data.data);
                // setTotalPage(data.data.meta.page);
                setTotalPage(2);
            })
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, [currentPage]);

    const handlePrevious = (page: number) => {
        if (page > 1) {
            setCurrentPage(page - 1);
        }
    };

    const handleNext = (page: number) => {
        if (page < totalPage) {
            setCurrentPage(page + 1);
        }
    };

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
                                        <li key={option.label}>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedSort(option.label);
                                                    setSortOpen(false);
                                                }}
                                                className={
                                                    selectedSort === option.label
                                                        ? "active"
                                                        : ""
                                                }
                                            >
                                                {option.label}
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
                            key={product._id}
                            className="bg-white shadow-xl p-3 max-w-60 mx-auto space-y-3 h-full flex flex-col relative"
                        >
                            <FaRegHeart
                                size={20}
                                className="text-gray-400 absolute top-2 right-2 cursor-pointer hover:text-red-500"
                            />

                            <div className="h-36 flex items-center justify-center overflow-hidden">
                                <Link href={`/products/${product._id}`}>
                                    <Image
                                        src={
                                            product.imageURLs?.[0]
                                                ? product.imageURLs?.[0]
                                                : ""
                                        }
                                        alt={`image-${product._id}`}
                                        width={150}
                                        height={150}
                                        className="mx-auto transition-all hover:scale-110 cursor-pointer object-cover"
                                    />
                                </Link>
                            </div>
                            <h2 className="text-[14px] md:text-xl font-semibold text-primary">
                                BDT {product.salePrice}{" "}
                                <span className="text-gray-400 line-through">
                                    BDT{product.productPrice}
                                </span>
                            </h2>
                            <p className="text-[10px] md:text-xs lg:text-[14px] font-semibold">
                                {product.name}
                            </p>
                            <div className="flex items-center gap-3">
                                <button onClick={() => dispatch(addToCart(product._id))} className="btn btn-sm border-2 border-primary text-primary transition-all hover:border-none hover:bg-primary hover:text-white hover:scale-110">
                                    Add To Cart
                                </button>
                                <Link href={`/products/${product._id}`} className="btn btn-sm transition-all border-none bg-primary text-white hover:scale-110">
                                    Order Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end gap-2 my-10">
                <div
                    onClick={() => handlePrevious(currentPage)}
                    className="flex items-center p-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer"
                >
                    <MdKeyboardDoubleArrowLeft />
                    Previous
                </div>
                {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                    (page) => (
                        <div
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`
                            px-3 py-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer
                            ${
                                page === currentPage
                                    ? "bg-primary text-black"
                                    : "bg-white"
                            }
                        `}
                        >
                            {page}
                        </div>
                    )
                )}
                <div
                    onClick={() => handleNext(currentPage)}
                    className="flex items-center p-2 border border-gray-400 text-xs lg:text-base xl:text-xl font-semibold cursor-pointer"
                >
                    <MdKeyboardDoubleArrowRight /> Next
                </div>
            </div>
        </div>
    );
}
