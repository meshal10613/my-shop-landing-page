"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slice/cartSlice";

export type ProductsType = {
    _id: string;
    name: string;
    sku: string;
    path: string;
    description: string;
    category: string;
    subCategory: string[];
    productColor: string[];
    saleCount: number;
    quantity: number;
    buyingPrice: number;
    productPrice: number;
    salePrice: number;
    discount: number;
    brand: string;
    tags: string[];
    imageURLs: (string | StaticImport)[];
    youtube?: string;
    size: string[];
    ratingValue: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    wholesalePrice?: number;
    wholesaleStatus?: string;
    advance?: number;
    free_delivery?: boolean;
    imageURLs2?: string[] | StaticImport[];
};

export default function Products({ title }: { title: string }) {
    const dispatch = useDispatch<AppDispatch>();

    const [products, setProducts] = useState<ProductsType[]>([]);
    useEffect(() => {
        fetch(
            "https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website",
            {
                headers: {
                    "Content-Type": "application/json",
                    "store-id": `0000121`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setProducts(data.data.data))
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, []);

    return (
        <div className="container mx-auto my-10">
            <div className="my-10">
                <h2 className="text-xl lg:text-2xl font-semibold mb-10">
                    {title}
                </h2>
                <div className="grid grid-cols-2 md:gric-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
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
                                        src={product.imageURLs?.[0] ? product.imageURLs[0] : ""}
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
        </div>
    );
}
