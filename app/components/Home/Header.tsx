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
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Header() {
    const cart = useSelector((state: RootState) => state.cart.items);
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);


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
                                {/* Sidebar content here */}
                                <li>
                                    <a>Sidebar Item 1</a>
                                </li>
                                <li>
                                    <a>Sidebar Item 2</a>
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
                    <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <div className="relative">
                            <FaRegHeart className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="absolute -right-3 -top-3 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                0
                            </span>
                        </div>
                        <span className="text-xs hidden lg:block">
                            Wishlist
                        </span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                            <BsCart3 className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="absolute -right-3 -top-3 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {totalCount}
                            </span>
                        </div>
                        <span className="text-xs hidden lg:block">Cart</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div>
                            <FiUser className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="text-xs hidden lg:block">Account</span>
                    </div>
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
                            <a href="/shop" className="hover:text-primary">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href="" className="hover:text-primary">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="" className="hover:text-primary">
                                Contact Us
                            </a>
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
        </div>
    );
}
