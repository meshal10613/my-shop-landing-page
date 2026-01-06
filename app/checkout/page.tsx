"use client";

import { AppDispatch, RootState } from "@/store";
import { addToCart, removeFromCart } from "@/store/slice/cartSlice";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Checkout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    const subTotal = cart.reduce((sum, item) => sum + item.productPrice * item.count, 0);
    const grandTotal = cart.reduce((sum, item) => sum + item.salePrice * item.count, 0);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mx-3">
                <div className="col-span-1 lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl lg:text-2xl font-semibold">My Cart</h2>
                        <h4 className="bg-primary text-white btn">{totalCount} Items</h4>
                    </div>
                    <div className="divider"></div>

                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr className="text-left">
                                    <th className="p-4">Product</th>
                                    <th className="p-4 text-center">
                                        Quantity
                                    </th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4 text-right">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item._id} className="">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={item.imageURLs[0]}
                                                    alt={item.name}
                                                    width={60}
                                                    height={60}
                                                    className="rounded-md"
                                                />
                                                <div>
                                                    <h2 className="font-semibold">
                                                        {item.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-500">
                                                        Category:{" "}
                                                        {item.category[0]}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaMinus onClick={() => dispatch(removeFromCart(item._id))} className="cursor-pointer" />
                                                <span className="font-medium">
                                                    {item.count}
                                                </span>
                                                <FaPlus onClick={() => dispatch(addToCart(item))} className="cursor-pointer" />
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <p className="font-semibold">
                                                ৳{item.salePrice}
                                            </p>
                                            <p className="text-sm line-through text-gray-400">
                                                ৳{item.productPrice}
                                            </p>
                                        </td>

                                        <td className="p-4 text-right font-semibold">
                                            ৳{item.count * item.salePrice}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-4 lg:hidden">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-lg p-4 shadow-sm"
                            >
                                <div className="flex gap-4">
                                    <Image
                                        src={item.imageURLs[0]}
                                        alt={item.name}
                                        width={70}
                                        height={10}
                                        className="rounded-md"
                                    />

                                    <div className="flex-1">
                                        <h2 className="font-semibold">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Category: {item.category[0]}
                                        </p>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <FaMinus onClick={() => dispatch(removeFromCart(item._id))} className="cursor-pointer" />
                                                <span>{item.count}</span>
                                                <FaPlus onClick={() => dispatch(addToCart(item))} className="cursor-pointer" />
                                            </div>

                                            <div className="text-right">
                                                <p className="font-semibold">
                                                    ৳{item.salePrice}
                                                </p>
                                                <p className="text-sm line-through text-gray-400">
                                                    ৳{item.productPrice}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-2 text-right font-semibold">
                                            Total: ৳
                                            {item.count * item.salePrice}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3 p-3 border-2 border-[#E7E7E8] rounded-md h-fit">
                    <h2 className="text-xl font-semibold text-left">Order Summary</h2>
                    <div className="divider"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Subtotal</p>
                        <p className="text-xl">৳ {subTotal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xl">Discount</p>
                        <p className="text-xl">৳ {grandTotal - subTotal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-semibold">Grand Total</p>
                        <p className="text-xl font-semibold">৳ {grandTotal}</p>
                    </div>
                    <button className="btn btn-block btn-primary text-white">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
