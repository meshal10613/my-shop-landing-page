import React from "react";
import AddReview from "../AddReview";
import ProductDescription from "../ProductDescription";
import { BsCart3 } from "react-icons/bs";
import honey from "@/app/assets/category1.png";
import {
    FaFacebookSquare,
    FaGooglePlusG,
    FaRegHeart,
    FaTwitter,
} from "react-icons/fa";
import Image from "next/image";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 lg:mx-auto items-center">
                <div>
                    <Image src={honey} alt="honey" className="w-full" />
                </div>
                <div className="space-y-5">
                    <p className="badge bg-[#D8F1E5] font-semibold text-primary p-3 rounded-3xl">
                        IN STOCK
                    </p>
                    <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold">
                        Seeds of Change Organic Quinoa, Brown
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
                                    checked={value === 3}
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
                            250 TK
                        </h2>
                        <h4 className="text-xl font-semibold text-gray-400 line-through">
                            34 TK
                        </h4>
                        <span className="text-primary">|</span>
                        <h6 className="text-gray-400">You Save TK. 37</h6>
                    </div>
                    <p className="text-gray-400">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Aliquam rem officia, corrupti reiciendis minima
                        nisi modi, quasi, odio minus dolore impedit fuga eum
                        eligendi.
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="btn btn-lg btn-primary text-white transition-all duration-300 hover:scale-110">
                            <BsCart3 />
                            Order Now
                        </button>
                        <div className="border border-gray-300 rounded-md p-4 flex items-center gap-5">
                            <h2 className="w-7 h-7 rounded-full bg-orange-400 text-white flex items-center justify-center text-xl cursor-pointer">
                                -
                            </h2>
                            <h2>2</h2>
                            <h2 className="w-7 h-7 rounded-full text-white bg-orange-400 flex items-center justify-center text-xl cursor-pointer">
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
                        <div className="flex items-center gap-3 cursor-pointer">
                            <FaRegHeart className="text-orange-500" /> Add to
                            Wishlist
                        </div>
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
            <ProductDescription />
            <AddReview id={id} />
        </div>
    );
}
