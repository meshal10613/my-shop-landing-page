"use client";

import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { GoSearch } from "react-icons/go";
import {
    FaFacebookF,
    FaInstagram,
    FaRegHeart,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { RxCross2 } from "react-icons/rx";
import { useRef } from "react";
import { addToCart } from "@/store/slice/cartSlice";
import { removeFromWishList } from "@/store/slice/wishlistSlice";
import { ProductsType, ProductVarient } from "./Products";
import { logout } from "@/store/slice/userSlice";
import Swal from "sweetalert2";

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.items);
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const user = useSelector((state: RootState) => state.user.user);
    const totalCart = cart.length;
    const totalWishlist = wishlist.reduce((sum, item) => sum + item.count, 0);

    const wishlistRef = useRef<HTMLDialogElement | null>(null);

    const handleWishlist = () => {
        wishlistRef.current?.showModal();
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3BB77E",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                localStorage.removeItem("token");
                Swal.fire({
                    title: "Logged out!",
                    text: "You have been logged out.",
                    icon: "success",
                    confirmButtonColor: "#3BB77E",
                    confirmButtonText: "Done!",
                });
            }
        });
    };

    return (
        <div className="container mx-auto">
            <div className="flex lg:hidden items-center justify-between px-6 bg-primary py-4">
                <div className="flex items-center gap-5">
                    <FaFacebookF
                        size={20}
                        className="text-white cursor-pointer"
                    />
                    <FaYoutube
                        size={20}
                        className="text-white cursor-pointer"
                    />
                    <FaInstagram
                        size={20}
                        className="text-white cursor-pointer"
                    />
                    <FaTwitter
                        size={20}
                        className="text-white cursor-pointer"
                    />
                </div>

                <div className="relative">
                    <input
                        type="text"
                        className="input h-7 border-none focus:border-none focus:outline-none"
                        placeholder="Search here..."
                    />
                    <GoSearch
                        size={20}
                        className="text-gray-400 cursor-pointer absolute top-1/4 right-2"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between px-3 md:px-6 lg:px-0 py-5">
                <div className="flex items-center gap-2">
                    <div className="drawer w-fit">
                        <input
                            id="my-drawer-1"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <label
                            htmlFor="my-drawer-1"
                            className="lg:hidden w-10 h-10 flex items-center justify-center"
                        >
                            <BiCategory className="text-primary w-7 h-7 cursor-pointer" />
                        </label>
                        <div className="drawer-side">
                            <label
                                htmlFor="my-drawer-1"
                                aria-label="close sidebar"
                                className="drawer-overlay"
                            ></label>
                            <ul className="menu bg-base-200 min-h-full w-100 p-4">
                                <label
                                    htmlFor="my-drawer-1"
                                    className="absolute right-4 top-4 btn btn-ghost w-10 h-10 rounded-full btn-sm"
                                >
                                    <RxCross2 className="w-5 h-5 rounded-full" />
                                </label>
                                <Link href={`/`} className="mb-5 w-fit">
                                    <Image
                                        src={logo}
                                        alt="logo"
                                        className="w-30 md:w-40 h-auto object-contain cursor-pointer"
                                    />
                                </Link>
                                <li className="font-semibold text-primary hover:bg-primary hover:text-white rounded-lg">
                                    <Link href={`/`} className="mx-auto">
                                        Home
                                    </Link>
                                </li>
                                <li className="font-semibold text-primary hover:bg-primary hover:text-white rounded-lg">
                                    <Link href={`/shop`} className="mx-auto">
                                        Shop
                                    </Link>
                                </li>
                                <li className="font-semibold text-primary hover:bg-primary hover:text-white rounded-lg">
                                    <Link
                                        href={`/about-us`}
                                        className="mx-auto"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="font-semibold text-primary hover:bg-primary hover:text-white rounded-lg">
                                    <Link
                                        href={`/contact-us`}
                                        className="mx-auto"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link href={`/`}>
                        <Image
                            src={logo}
                            alt="logo"
                            className="w-30 md:w-40 h-auto object-contain cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="hidden lg:block mx-auto min-w-92">
                    <div className="join w-full">
                        <div>
                            <div>
                                <input
                                    className="input join-item border-primary focus:outline-none"
                                    placeholder="Search here..."
                                />
                            </div>
                        </div>
                        <button className="btn join-item btn-primary text-white">
                            <GoSearch />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-5 lg:gap-10 w-fit">
                    <div
                        onClick={handleWishlist}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                        <div className="relative">
                            <FaRegHeart className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="absolute -right-3 -top-3 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {totalWishlist}
                            </span>
                        </div>
                        <span className="text-xs hidden lg:block">
                            Wishlist
                        </span>
                    </div>
                    <Link
                        href={`/cart`}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="relative">
                            <BsCart3 className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="absolute -right-3 -top-3 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {totalCart}
                            </span>
                        </div>
                        <span className="text-xs hidden lg:block">Cart</span>
                    </Link>
                    {user ? (
                        <div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button">
                                    <Image
                                        src={user.profileImgURL ?? "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"}
                                        alt={user.name}
                                        width={30}
                                        height={30}
                                        className="rounded-full cursor-pointer"
                                    />
                                </div>
                                <ul
                                    tabIndex={-1}
                                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                                >
                                    <li className="transition-all duration-300 hover:bg-primary hover:text-white">
                                        <a>{user.name}</a>
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        className="transition-all duration-300 hover:bg-primary hover:text-white"
                                    >
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href={`/login`}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div>
                                <FiUser className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-xs hidden lg:block">
                                Account
                            </span>
                        </Link>
                    )}
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="divider"></div>
            </div>

            <div className="hidden lg:flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="btn w-fit bg-primary text-white flex items-center justify-center">
                        <BiCategory />
                        Browse Categories
                        <IoIosArrowDown />
                    </div>
                    <ul className="flex items-center gap-5">
                        <li>
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" className="hover:text-primary">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about-us"
                                className="hover:text-primary"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact-us"
                                className="hover:text-primary"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-5">
                    <FaFacebookF
                        size={20}
                        className="text-gray-400 hover:text-primary cursor-pointer"
                    />
                    <FaYoutube
                        size={20}
                        className="text-gray-400 hover:text-primary cursor-pointer"
                    />
                    <FaInstagram
                        size={20}
                        className="text-gray-400 hover:text-primary cursor-pointer"
                    />
                    <FaTwitter
                        size={20}
                        className="text-gray-400 hover:text-primary cursor-pointer"
                    />
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="divider"></div>
            </div>

            <dialog ref={wishlistRef} id="wishlist" className="modal">
                <div className="modal-box h-70 max-h-70 py-5 overflow-y-scroll">
                    {wishlist.map((product: ProductsType, index) => (
                        <div key={index} className="">
                            <div className="flex items-center mb-3 gap-3 relative">
                                <Image
                                    src={product?.imageURLs?.[0]}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-col items-baseline gap-2">
                                    <h2 className="font-semibold">
                                        {product.name}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            const p = {
                                                ...(product
                                                    ?.variant?.[0] as ProductVarient),
                                                name: product.name,
                                                category: product.category,
                                                productId: product._id,
                                                count: 1
                                            };
                                            dispatch(addToCart(p));
                                        }}
                                        className="hover:text-primary hover:underline cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <span
                                    onClick={() =>
                                        dispatch(
                                            removeFromWishList(product._id)
                                        )
                                    }
                                    className="w-8 h-8 hover:bg-gray-300 hover:text-red-500 rounded-full flex items-center justify-center cursor-pointer absolute right-2 top-1/3"
                                >
                                    <RxCross2 />
                                </span>
                            </div>
                            <div className="divider"></div>
                        </div>
                    ))}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
