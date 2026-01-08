"use client";

import Image from "next/image";
import React, { useState } from "react";
import cash from "@/app/assets/cash.png";
import bkash from "@/app/assets/bkash.png";
import nogod from "@/app/assets/nogod.png";
import { FaArrowLeftLong, FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
    addToCart,
    removeFromCart,
    removeItemFromCart,
} from "@/store/slice/cartSlice";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { MdDone } from "react-icons/md";

const Checkout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    const subTotal = cart.reduce(
        (sum, item) => sum + item.productPrice * item.count,
        0
    );
    const grandTotal = cart.reduce(
        (sum, item) => sum + item.salePrice * item.count,
        0
    );

    const [payment, setPayment] = useState("cod");
    return (
        <>
            <head>
                <title>Checkout | My Shop</title>
            </head>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="col-span-1 lg:col-span-2 mx-5">
                        <h2 className="text-xl lg:text-2xl font-semibold">
                            Delivery Address
                        </h2>
                        <div className="divider"></div>
                        <div className="flex flex-col lg:flex-row gap-5 items-center w-full justify-between mb-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name *"
                                className="input border-2 border-gray-200 focus:outline-none w-full"
                                required
                            />
                            <input
                                type="text"
                                name="number"
                                placeholder="Phone Number *"
                                className="input border-2 border-gray-200 focus:outline-none w-full"
                                required
                            />
                        </div>
                        <textarea
                            name="review"
                            placeholder="Full Address *"
                            className="textarea border-2 border-gray-200 focus:outline-none w-full mb-5"
                            required
                        ></textarea>

                        <h2 className="text-xl lg:text-2xl font-semibold">
                            Select Payment Option
                        </h2>
                        <div className="divider"></div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <div
                                onClick={() => setPayment("cod")}
                                className={`flex flex-col items-center justify-center gap-2 border-2  rounded-md px-3 py-2 cursor-pointer relative ${
                                    payment === "cod"
                                        ? "border-black"
                                        : "border-gray-300"
                                }`}
                            >
                                {payment === "cod" && (
                                    <FaCircleCheck
                                        size={20}
                                        className="absolute left-5"
                                    />
                                )}
                                <Image
                                    src={cash}
                                    alt="cash-on-delivery"
                                    className="w-20"
                                />
                                <h4 className="text-base font-semibold">
                                    Cash on Delivery
                                </h4>
                            </div>
                            <div
                                onClick={() => setPayment("bkash")}
                                className={`flex flex-col items-center justify-center gap-2 border-2 rounded-md px-3 py-2 cursor-pointer relative ${
                                    payment === "bkash"
                                        ? "border-black"
                                        : "border-gray-300"
                                }`}
                            >
                                {payment === "bkash" && (
                                    <FaCircleCheck
                                        size={20}
                                        className="absolute left-5"
                                    />
                                )}
                                <Image
                                    src={bkash}
                                    alt="bkash"
                                    className="w-20"
                                />
                                <h4 className="text-base font-semibold">
                                    Bkash
                                </h4>
                            </div>
                            <div
                                onClick={() => setPayment("nagad")}
                                className={`flex flex-col items-center justify-center gap-2 border-2 rounded-md px-3 py-2 cursor-pointer relative ${
                                    payment === "nagad"
                                        ? "border-black"
                                        : "border-gray-300"
                                }`}
                            >
                                {payment === "nagad" && (
                                    <FaCircleCheck
                                        size={20}
                                        className="absolute left-5"
                                    />
                                )}
                                <Image
                                    src={nogod}
                                    alt="nogod"
                                    className="w-20"
                                />
                                <h4 className="text-base font-semibold">
                                    Nagad
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 mx-5">
                        <h2 className="text-xl lg:text-2xl font-semibold">
                            Order Items ({totalCount})
                        </h2>
                        <div className="divider"></div>
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="border border-gray-300 p-2 rounded-md mb-5 flex items-center gap-3 relative"
                            >
                                <Image
                                    src={item?.imageURLs?.[0]}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-col">
                                    <h2 className="text-base font-semibold">
                                        {item.name}
                                    </h2>
                                    <p className="text-xs">
                                        Category: {item.category}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart(item._id)
                                                )
                                            }
                                            className="p-1 w-5 h-5 flex items-center justify-center cursor-pointer bg-gray-300"
                                        >
                                            -
                                        </span>
                                        <span>{item.count}</span>
                                        <span
                                            onClick={() =>
                                                dispatch(addToCart(item))
                                            }
                                            className="p-1 w-5 h-5 flex items-center justify-center cursor-pointer bg-gray-300"
                                        >
                                            +
                                        </span>
                                        <span className="font-bold">
                                            ৳ {item.salePrice * item.count}
                                        </span>
                                        <span className="text-gray-300 line-through">
                                            ৳ {item.productPrice * item.count}
                                        </span>
                                    </div>
                                    <span
                                        onClick={() =>
                                            dispatch(removeItemFromCart(item))
                                        }
                                        className="w-8 h-8 hover:bg-gray-300 hover:text-red-500 rounded-full flex items-center justify-center cursor-pointer absolute right-2 top-1/3"
                                    >
                                        <RxCross2 />
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="divider"></div>
                        <div className="flex items-center justify-between mb-2 font-semibold">
                            <span>Subtotal:</span>
                            <span>৳ {subTotal}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 font-semibold">
                            <span>Discount:</span>
                            <span>- ৳ {subTotal - grandTotal}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2 font-semibold">
                            <span>Delivery Charge:</span>
                            <span>৳ 0</span>
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between mb-2 font-semibold">
                            <span>Grand Total:</span>
                            <span>৳ {grandTotal}</span>
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between">
                            <Link
                                href="/cart"
                                className="flex items-center gap-2"
                            >
                                <FaArrowLeftLong /> Back to Cart
                            </Link>
                            <button className="btn btn-primary text-white flex items-center justify-center">
                                <MdDone /> Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
