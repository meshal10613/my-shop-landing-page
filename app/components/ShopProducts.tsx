"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Link from "next/link";
import { ProductsType, ProductVarient } from "./Home/Products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addToCartWithCount } from "@/store/slice/cartSlice";
import { addToWishList } from "@/store/slice/wishlistSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { addToCheckoutWithCount } from "@/store/slice/checkoutSlice";

export default function ShopProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const wishList = useSelector((state: RootState) => state.wishlist.items);
    const router = useRouter();

    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Price Low To High");
    const [selectedFilter, setSelectedFilter] = useState({
        label: "BDT 0 - BDT 500",
        min: 0,
        max: 500,
    });

    const sortOptions = [
        { label: "Price Low To High", value: "asc" },
        { label: "Price High To Low", value: "desc" },
    ];
    const filterOptions = [
        { label: "BDT 0 - BDT 500", min: 0, max: 500 },
        { label: "BDT 501 - BDT 1500", min: 501, max: 1500 },
        { label: "BDT 1501 - BDT 2500", min: 1501, max: 2500 },
        { label: "BDT 2501 - BDT 5000", min: 2501, max: 5000 },
    ];

    const addToCartRef = useRef<HTMLDialogElement | null>(null);
    const [cart, setCart] = useState<ProductsType>({} as ProductsType);
    const [count, setCount] = useState(1);
    const [active, setActive] = useState(cart?.attributes?.Color?.[0] ?? "");
    const [t, setT] = useState("");

    const [products, setProducts] = useState<ProductsType[]>([]);
    useEffect(() => {
        fetch(
            `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/website?limit=10&page=${currentPage}&sortBy=salePrice&sortOrder=${
                selectedSort === "Price Low To High" ? "asc" : "desc"
            }&minPrice=${selectedFilter.min}&maxPrice=${selectedFilter.max}${
                typeof category === "string" ? `&category=${category}` : ""
            }`,
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
                setTotalPage(data.data.meta.page);
            })
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, [currentPage, selectedSort, selectedFilter, category]);

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

    const handleMinus = (c: number) => {
        if (c === 1) return;
        setCount(c - 1);
    };

    const handlePlus = (c: number) => {
        setCount(c + 1);
    };

    const handleColor = (color: ProductVarient) => {
        if (active) return setActive("");

        setActive(color.attributes.Color);
    };

    const handleAddToCartModal = (product: ProductsType) => {
        setT("Add To Cart");
        setCart(product);
        addToCartRef.current?.showModal();
    };
    const checkoutModal = (product: ProductsType) => {
        setT("Checkout");
        setCart(product);
        addToCartRef.current?.showModal();
    };

    const handleAddToCart = () => {
        if (!active) return;

        if (t === "Add To Cart") {
            const p = cart?.variant?.find((p) => p.attributes.Color === active);
            if (!p) return;
            p.name = cart.name;
            p.category = cart.category;
            dispatch(
                addToCartWithCount({
                    count,
                    product: p,
                    productId: p._id,
                })
            );
            addToCartRef.current?.close();
            setCount(1);
        } else if (t === "Checkout") {
            const p = cart?.variant?.find((p) => p.attributes.Color === active);
            if (!p) return;
            p.name = cart.name;
            p.category = cart.category;
            dispatch(addToCheckoutWithCount({ count, product: p, productId: cart._id }));
            router.push("/checkout");
        } else return;
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
                                                    setSelectedSort(
                                                        option.label
                                                    );
                                                    setSortOpen(false);
                                                }}
                                                className={
                                                    selectedSort ===
                                                    option.label
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
                                    <span>{selectedFilter.label}</span>
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
                                            <li key={option.label}>
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
                                                    {option.label}
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
                            {wishList.find(
                                (item) => item._id === product._id
                            ) ? (
                                <FaHeart
                                    size={20}
                                    className="text-red-500 absolute top-2 right-2 cursor-not-allowed"
                                />
                            ) : (
                                <FaRegHeart
                                    onClick={() =>
                                        dispatch(addToWishList(product))
                                    }
                                    size={20}
                                    className="text-gray-400 absolute top-2 right-2 cursor-pointer"
                                />
                            )}

                            <div className="h-36 flex items-center justify-center overflow-hidden">
                                <Link
                                    href={`/products/${product._id}`}
                                    className="overflow-hidden"
                                >
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
                                <button
                                    onClick={() => handleAddToCartModal(product)}
                                    className="btn btn-sm border-2 border-primary text-primary transition-all hover:bg-primary hover:text-white hover:scale-110"
                                >
                                    Add To Cart
                                </button>
                                <button
                                    onClick={() => checkoutModal(product)}
                                    className="btn btn-sm transition-all border-none bg-primary text-white hover:scale-110"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {totalPage > 0 && (
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
            )}

            {/* Add to cart modal */}
            <dialog ref={addToCartRef} id="wishlist" className="modal">
                <div className="modal-box h-70 max-h-70 py-5 space-y-5">
                    <h2 className="text-xl font-semibold">{t}</h2>
                    <div className="flex items-center gap-5">
                        <p>Quantity:</p>
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
                    </div>
                    <div className="flex items-center gap-5">
                        <p>Color:</p>
                        <div>
                            {cart?.attributes?.Color &&
                                cart.attributes.Color.length > 0 && (
                                    <div className="flex items-center gap-3">
                                        {cart?.variant?.map((color) => (
                                            <div
                                                onClick={() =>
                                                    handleColor(color)
                                                }
                                                key={color._id}
                                                className={`flex items-center gap-2 border-2 border-gray-300 p-2 rounded-md cursor-pointer ${
                                                    active ===
                                                    color.attributes.Color
                                                        ? "border-primary"
                                                        : ""
                                                }`}
                                            >
                                                <Image
                                                    src={color?.image}
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
                    </div>
                    <button
                        onClick={() => handleAddToCart()}
                        className="btn btn-sm border-2 border-primary text-primary transition-all hover:bg-primary hover:text-white hover:scale-110"
                    >
                        Add To Cart
                    </button>
                </div>
                <form method="dialog" className="modal-backdrop" onClick={() => setCount(1)}>
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
