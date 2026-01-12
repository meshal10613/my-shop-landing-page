"use client";

import Image from "next/image";
import React, { useState } from "react";
import cash from "@/app/assets/cash.png";
import bkash from "@/app/assets/bkash.png";
import nogod from "@/app/assets/nogod.png";
import { FaArrowLeftLong, FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { MdDone } from "react-icons/md";
import {
    addToCheckout,
    removeFromChekout,
    removeItemFromCheckout,
} from "@/store/slice/checkoutSlice";
import Swal from "sweetalert2";

interface CheckoutFormData {
    fullName: string;
    phoneNumber: string;
    address: string;
}

const CheckoutPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const checkout = useSelector((state: RootState) => state.checkout.items);
    const user = useSelector((state: RootState) => state.user.user);
    const subTotal = checkout.reduce(
        (sum, item) => sum + item.productPrice * item.count,
        0
    );
    const grandTotal = checkout.reduce(
        (sum, item) => sum + item.salePrice * item.count,
        0
    );
    const [payment, setPayment] = useState("cod");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<CheckoutFormData>({
        fullName: "",
        phoneNumber: "",
        address: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleConfirmOrder = async () => {
        if (formData.fullName.length < 1)
            return setError("Please enter your name");
        if (formData.phoneNumber.length < 1)
            return setError("Please enter your phone number");
        if (!/^\d{11}$/.test(formData.phoneNumber))
            return setError("Your phone number must be 11 digits");
        if (formData.address.length < 1)
            return setError("Please enter your address");
        if (payment.length < 1)
            return setError("Please select a payment method");
        if (
            formData.fullName.length > 0 &&
            formData.phoneNumber.length > 0 &&
            formData.address.length > 0 &&
            payment.length > 0
        ) {
            setLoading(true);
            const orderItem = checkout.map((item) => ({
                product: item.productId,
                name: item.name,
                price: item.salePrice,
                quantity: item.count,
                originalProductPrice: item.buyingPrice,
                imageURL: item.image,
                variant: item._id,
                category: item.category?.[0] ?? null,
            }));
            const paymentData = {
                orderItem: orderItem,
                user: user?._id,
                shippingPrice: "0",
                mobileNumber: formData.phoneNumber,
                fullName: formData.fullName,
                totalAmount: `${subTotal}`,
                afterDiscountPrice: `${grandTotal}`,
                originalProductPrice: `${subTotal}`,
                couponDiscount: `${subTotal - grandTotal}`,
                orderType: "website",
                shippingAddress: {
                    address: formData.address,
                    email: user?.email,
                    firstName: formData.fullName,
                    phone: formData.phoneNumber,
                    note: "",
                },
                paymentDetails: payment,
            };
            console.log(paymentData);
            try {
                const response = await fetch(
                    `https://ecommerce-saas-server-wine.vercel.app/api/v1/order`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "store-id": `0000121`,
                        },
                        body: JSON.stringify(paymentData),
                    }
                );

                const data = await response.json();
                if (data.success && data.statusCode === 201) {
                    Swal.fire({
                        title: "Congratulations!",
                        text: `${data.message}`,
                        icon: "success",
                        confirmButtonColor: "#3BB77E",
                    });
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-1 lg:col-span-2 mx-5">
                <h2 className="text-xl lg:text-2xl font-semibold">
                    Delivery Address
                </h2>
                <div className="divider"></div>
                <div className="flex flex-col lg:flex-row gap-5 items-center w-full justify-between mb-5">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name *"
                        className="input border-2 border-gray-200 focus:outline-none w-full"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number *"
                        className="input border-2 border-gray-200 focus:outline-none w-full"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    name="address"
                    placeholder="Full Address *"
                    className="textarea border-2 border-gray-200 focus:outline-none w-full mb-5"
                    required
                    value={formData.address}
                    onChange={handleChange}
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
                        <Image src={bkash} alt="bkash" className="w-20" />
                        <h4 className="text-base font-semibold">Bkash</h4>
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
                        <Image src={nogod} alt="nogod" className="w-20" />
                        <h4 className="text-base font-semibold">Nagad</h4>
                    </div>
                </div>
            </div>
            <div className="col-span-1 mx-5">
                <h2 className="text-xl lg:text-2xl font-semibold">
                    Order Items ({checkout.length})
                </h2>
                <div className="divider"></div>
                {checkout.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 p-2 rounded-md mb-5 flex items-center gap-3 relative"
                    >
                        <Image
                            src={item.image}
                            alt={item.name ?? ""}
                            width={50}
                            height={50}
                        />
                        <div className="flex flex-col">
                            <h2 className="text-base font-semibold">
                                {item.name}
                            </h2>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs text-gray-500">
                                    Category: {item?.category?.[0]}
                                </span>
                                <span className="text-xs text-gray-500">
                                    Color: {item.attributes.Color}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    onClick={() =>
                                        dispatch(
                                            removeFromChekout({
                                                _id: item._id,
                                                color: item.attributes.Color,
                                            })
                                        )
                                    }
                                    className="p-1 w-5 h-5 flex items-center justify-center cursor-pointer bg-gray-300"
                                >
                                    -
                                </span>
                                <span>{item.count}</span>
                                <span
                                    onClick={() =>
                                        dispatch(addToCheckout(item))
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
                                    dispatch(
                                        removeItemFromCheckout({
                                            _id: item._id,
                                            color: item.attributes.Color,
                                        })
                                    )
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
                    <Link href="/cart" className="flex items-center gap-2">
                        <FaArrowLeftLong /> Back to Cart
                    </Link>
                    <button
                        onClick={handleConfirmOrder}
                        className={`btn w-40 btn-primary text-white ${
                            loading ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                    >
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <MdDone size={20} /> Confirm Order
                            </span>
                        )}
                    </button>
                </div>
                {error && <span className="text-red-500">{error}</span>}
            </div>
        </div>
    );
};

export default CheckoutPage;
