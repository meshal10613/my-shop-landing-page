"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import {
    FaFacebookSquare,
    FaGooglePlusG,
    FaHeart,
    FaRegHeart,
    FaTwitter,
} from "react-icons/fa";
import { ProductsType } from "../components/Home/Products";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addToCartWithCount } from "@/store/slice/cartSlice";
import { useRouter } from "next/navigation";
import { addToWishList } from "@/store/slice/wishlistSlice";

export default function ProductDetails({ id }: { id: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const wishList = useSelector((state: RootState) => state.wishlist.items);
    const router = useRouter();
    const [count, setcount] = useState(0);
    const [product, setProduct] = useState<ProductsType | null>(null);

    useEffect(() => {
        fetch(
            `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "store-id": `0000121`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setProduct(data.data))
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, [id]);

    const handleMinus = (c: number) => {
        if (c === 0) return;
        setcount(c - 1);
    };

    const handlePlus = (c: number) => {
        setcount(c + 1);
    };

    const handleOrder = (product: ProductsType) => {
        if (count === 0) return;

        dispatch(
            addToCartWithCount({
                product,
                count,
            })
        );
        router.push("/cart");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 lg:mx-auto items-center">
            <div className="flex flex-col overflow-hidden">
                <div className="relative bg-white rounded-xl overflow-hidden">
                    <div className="relative flex items-center justify-center">
                        <Image
                            src={
                                product?.imageURLs?.[0] || "/app/assets/a1.png"
                            }
                            alt="Main product display"
                            width={400}
                            height={400}
                            className="object-contain p-8"
                            priority
                        />

                        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition">
                            <BiChevronLeft className="w-6 h-6 text-green-800" />
                        </button>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition">
                            <BiChevronRight className="w-6 h-6 text-green-800" />
                        </button>
                    </div>
                </div>
                {/* <div className="grid grid-cols-4 gap-4">
					{
						product?.imageURLs?.map((img, index) => (
							<div key={index} className="relative bg-white rounded-xl overflow-hidden">
								<div className="relative">
									<Image
										src={img}
										alt="Main product display"
										width={100}
										height={100}
										className="object-contain"
										priority
									/>
								</div>
							</div>
						))
					}
				</div> */}
            </div>
            <div className="space-y-5">
                <p className="badge bg-[#D8F1E5] font-semibold text-primary p-3 rounded-3xl">
                    IN STOCK
                </p>

                <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold">
                    {product?.name}
                </h2>
                <div className="flex items-center gap-5">
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <input
                                key={value}
                                type="radio"
                                name={`rating`}
                                className="mask mask-star-2 bg-orange-400"
                                aria-label={`${value} star${
                                    value > 1 ? "s" : ""
                                }`}
                                value={value}
                                checked={value === product?.ratingValue}
                                readOnly
                            />
                        ))}
                    </div>
                    <h2 className="text-base font-semibold">
                        5 Ratings / 53 reviews
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl xl:text-3xl font-semibold">
                        {product?.salePrice} TK
                    </h2>
                    <h4 className="text-xl font-semibold text-gray-400 line-through">
                        {product?.productPrice} TK
                    </h4>
                    <span className="text-primary">|</span>
                    <h6 className="text-gray-400">
                        You Save TK. {product?.discount}
                    </h6>
                </div>
                <p className="text-gray-400">{product?.description}</p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleOrder(product as ProductsType)}
                        className="btn btn-lg btn-primary text-white transition-all duration-300 hover:scale-110"
                    >
                        <BsCart3 />
                        Order Now
                    </button>
                    <div className="border border-gray-300 rounded-md p-4 flex items-center gap-5">
                        <h2
                            onClick={() => {
                                handleMinus(count);
                            }}
                            className="w-7 h-7 rounded-full bg-[#DFDFDF] text-white flex items-center justify-center text-xl cursor-pointer"
                        >
                            -
                        </h2>
                        <h2>{count}</h2>
                        <h2
                            onClick={() => {
                                handlePlus(count);
                            }}
                            className="w-7 h-7 rounded-full text-white bg-orange-400 flex items-center justify-center text-xl cursor-pointer"
                        >
                            +
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <div className="flex flex-col gap-4">
                        <h2>Color</h2>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#FD9173] hover:border border-gray-400 cursor-pointer"></div>
                            <div className="w-7 h-7 rounded-full bg-black"></div>
                            <div className="w-7 h-7 rounded-full bg-[#F0F0F0]"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2>Size</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full border border-gray-400 cursor-pointer flex items-center justify-center hover:bg-primary hover:text-white">
                                s
                            </span>
                            <div className="w-7 h-7 rounded-full border border-gray-400 cursor-pointer flex items-center justify-center hover:bg-primary hover:text-white">
                                M
                            </div>
                            <div className="w-7 h-7 rounded-full border border-gray-400 cursor-pointer flex items-center justify-center hover:bg-primary hover:text-white">
                                L
                            </div>
                        </div>
                    </div>
                    {wishList.find((item) => item._id === product?._id) ? (
                        <div className="flex items-center gap-3 cursor-not-allowed">
                            <FaHeart
                                size={20}
                                className="text-red-500"
                            />
                            <span>In Wishlist</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 cursor-pointer">
                            <FaRegHeart
                                onClick={() =>
                                    dispatch(
                                        addToWishList(product as ProductsType)
                                    )
                                }
                                size={20}
                                className="text-gray-400"
                            />
                            <span>Add to Wishlist</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-5">
                    <h1>Share: </h1>
                    <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-[#D8F1E5] text-primary flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer">
                            <FaGooglePlusG size={20} />
                        </span>
                        <span className="w-10 h-10 rounded-full bg-[#D8F1E5] text-primary flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer">
                            <FaFacebookSquare size={20} />
                        </span>
                        <span className="w-10 h-10 rounded-full bg-[#D8F1E5] text-primary flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer">
                            <FaTwitter size={20} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
