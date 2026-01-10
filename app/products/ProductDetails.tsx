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
// import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addToCart, addToCartWithCount } from "@/store/slice/cartSlice";
import { useRouter } from "next/navigation";
import { addToWishList } from "@/store/slice/wishlistSlice";
import {
    ImageSrc,
    ProductsType,
    ProductVarient,
} from "../components/Home/Products";

import placeholder from "@/app/assets/category1.png";

export default function ProductDetails({ id }: { id: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const wishList = useSelector((state: RootState) => state.wishlist.items);
    const router = useRouter();

    const [count, setCount] = useState(0);
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [active, setActive] = useState(product?.attributes?.Color?.[0] ?? "");
    const [currentImage, setCurrentImage] = useState<ImageSrc>(placeholder);

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
            .then((data) => {
                setProduct(data.data);
                setCurrentImage(data.data.imageURLs[0]);
            })
            .catch((err) => console.error("Failed to fetch product:", err));
    }, [id]);

    const handleMinus = (c: number) => {
        if (c === 0) return;
        setCount(c - 1);
    };

    const handlePlus = (c: number) => {
        setCount(c + 1);
    };

    const handleOrder = (product: ProductsType) => {
        if (count === 0) return;
        if (active) {
            const p = product?.variant?.find(
                (p) => p.attributes.Color === active
            );
            if (p) {
                p.name = product.name;
                p.category = product.category;
                dispatch(
                    addToCartWithCount({
                        count,
                        product: p,
                    })
                );
            }

            return router.push("/checkout");
        }
        const data: ProductVarient | undefined = product?.variant?.[0];
        if (data) {
            data.name = product.name;
            data.category = product.category;
            dispatch(
                addToCartWithCount({
                    count,
                    product: data,
                })
            );
            return router.push("/checkout");
        }
        return;
    };

    const handleAddToCart = (product: ProductsType) => {
        if(active){
            const p = product?.variant?.find(
                (p) => p.attributes.Color === active
            );
            if (p) {
                p.name = product.name;
                p.category = product.category;
                dispatch(addToCart(p));
            }
            return
        }
        const p = {
            ...(product?.variant?.[0] as ProductVarient),
            name: product?.name,
            category: product?.category,
        };
        dispatch(addToCart(p));
    };

    const handleColor = (color: ProductVarient) => {
        if (active) return setActive("");

        setActive(color.attributes.Color);
        setCurrentImage(color.image ?? "");
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5 lg:mx-auto items-center">
            <div className="flex flex-col overflow-hidden">
                <div className="relative bg-white rounded-xl overflow-hidden">
                    <div className="relative flex items-center justify-center">
                        <Image
                            src={currentImage}
                            alt={product?.name ?? "Product"}
                            width={400}
                            height={400}
                            className="object-contain p-8"
                            priority
                        />

                        {/* <button
                            onClick={setPreviousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 hover:shadow-lg transition cursor-pointer"
                        >
                            <BiChevronLeft className="w-6 h-6 text-green-800" />
                        </button>
                        <button
                            onClick={setNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 hover:shadow-lg transition cursor-pointer"
                        >
                            <BiChevronRight className="w-6 h-6 text-green-800" />
                        </button> */}
                    </div>
                </div>

                {product?.imageURLs?.length ? (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {product.imageURLs.map((img, idx) => (
                            <div
                                onClick={() => setCurrentImage(img)}
                                key={idx}
                                className={`relative bg-white rounded-xl overflow-hidden cursor-pointer w-fit`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
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

                {product?.description && (
                    <div
                        className="text-gray-400 py-1 prose max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    />
                )}

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => product && handleOrder(product)}
                        className="btn btn-lg btn-primary text-white transition-all duration-300 hover:scale-110"
                    >
                        <BsCart3 /> Order Now
                    </button>
                    <div className="border border-gray-300 rounded-md p-4 flex items-center gap-5">
                        <h2
                            onClick={() => handleMinus(count)}
                            className="w-7 h-7 rounded-full bg-[#DFDFDF] text-white flex items-center justify-center text-xl cursor-pointer"
                        >
                            -
                        </h2>
                        <h2>{count}</h2>
                        <h2
                            onClick={() => handlePlus(count)}
                            className="w-7 h-7 rounded-full text-white bg-orange-400 flex items-center justify-center text-xl cursor-pointer"
                        >
                            +
                        </h2>
                    </div>
                    <button
                        onClick={() => handleAddToCart(product as ProductsType)}
                        className="btn lg:btn-lg border-2 border-primary text-primary transition-all hover:border-none hover:bg-primary hover:text-white hover:scale-110"
                    >
                        Add To Cart
                    </button>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-2">
                        <h2>Color:</h2>
                        {product?.attributes?.Color &&
                            product.attributes.Color.length > 0 && (
                                <div className="flex items-center gap-3">
                                    {product?.variant?.map((color) => (
                                        <div
                                            onClick={() => handleColor(color)}
                                            key={color._id}
                                            className={`flex items-center gap-2 border-2 border-gray-300 p-2 rounded-md cursor-pointer ${
                                                active ===
                                                color.attributes.Color
                                                    ? "border-primary"
                                                    : ""
                                            }`}
                                        >
                                            <Image
                                                src={
                                                    color?.image
                                                        ? color?.image
                                                        : placeholder
                                                }
                                                alt={color.attributes.Color}
                                                width={20}
                                                height={20}
                                            />
                                            <span>
                                                {color.attributes.Color}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>

                    {wishList.find((item) => item._id === product?._id) ? (
                        <div className="flex items-center gap-3 cursor-not-allowed">
                            <FaHeart size={20} className="text-red-500" />
                            <span>In Wishlist</span>
                        </div>
                    ) : (
                        <div
                            onClick={() =>
                                product && dispatch(addToWishList(product))
                            }
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <FaRegHeart size={20} className="text-gray-400" />
                            <span>Add to Wishlist</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-5 mt-5">
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
