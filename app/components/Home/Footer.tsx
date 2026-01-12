"use client";

import React from "react";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import a1 from "@/app/assets/a1.png";
import a2 from "@/app/assets/a2.png";
import a3 from "@/app/assets/a3.png";
import a4 from "@/app/assets/a4.png";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const hideHeaderFooter = pathname.startsWith("/dashboard");
    return (
        !hideHeaderFooter && (
            <div className="my-20 max-w-324 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 my-10">
                    <div className="flex items-center gap-5">
                        <Image src={a1} alt="a1" className="w-10" />
                        <div className="">
                            <h2 className="text-xl font-semibold">
                                Fastest Delivery
                            </h2>
                            <p className="text-base">
                                100% Free for all orders
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <Image src={a2} alt="a1" className="w-10" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                Great Support 24/7
                            </h2>
                            <p className="text-base">
                                We care your experiences
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <Image src={a3} alt="a1" className="w-10" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                90 Days Return
                            </h2>
                            <p className="text-base">90 Days Return</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <Image src={a4} alt="a1" className="w-10" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                secure Payment
                            </h2>
                            <p className="text-base">
                                100% Secure Payment Method
                            </p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
                    <Image src={logo} alt="footer-logo" />

                    <div>
                        <h2 className="text-[22px] md:text-2xl font-semibold text-center lg:text-left">
                            Store Address
                        </h2>
                        <p className="text-base md:text-xl text-center lg:text-left">
                            SAR Bhaban, Level-5 , Ka-78, Progoti Sarani, Kuril,
                            Vatara
                        </p>
                    </div>

                    <div>
                        <h2 className="text-[22px] md:text-2xl font-semibold text-center lg:text-left">
                            Contact No.
                        </h2>
                        <h3 className="text-base md:text-xl text-center lg:text-left">
                            +8801894844452
                        </h3>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <h2 className="text-xl font-semibold md:text-2xl">
                        Join Us On Social Media
                    </h2>
                    <div className="flex items-center gap-5 mb-10">
                        <FaFacebookF
                            size={25}
                            className="text-gray-400 hover:text-primary cursor-pointer"
                        />
                        <FaYoutube
                            size={25}
                            className="text-gray-400 hover:text-primary cursor-pointer"
                        />
                        <FaInstagram
                            size={25}
                            className="text-gray-400 hover:text-primary cursor-pointer"
                        />
                        <FaTwitter
                            size={25}
                            className="text-gray-400 hover:text-primary cursor-pointer"
                        />
                    </div>
                    <p className="text-base md:text-[18px] font-semibold text-gray-400">
                        @ 2026 All Rights Reserved
                    </p>
                    <p className="text-base md:text-[18px] font-semibold text-gray-400">
                        System developed by{" "}
                        <span className="text-black">Funnel Liner</span>
                    </p>
                </div>
            </div>
        )
    );
}
