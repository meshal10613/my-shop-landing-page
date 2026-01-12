"use client";

import Image from "next/image";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "@/app/assets/logo.png";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex h-screen">
            <aside
                className={`
                            bg-gray-100 text-primary w-64
                            fixed md:relative md:translate-x-0
                            transform top-0 left-0
                            transition-transform duration-300 ease-in-out
                            ${
                                sidebarOpen
                                    ? "translate-x-0"
                                    : "-translate-x-full"
                            } 
                            md:translate-x-0 h-screen shadow-2xl p-2
                        `}
            >
                <div className="flex items-center justify-between md:justify-center my-4 mb-10">
                    <Image src={logo} alt="logo" className="cursor-pointer" onClick={() => router.push("/")} />
                    <span
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-8 h-8 hover:bg-gray-300 hover:text-red-500 rounded-full md:hidden flex items-center justify-center cursor-pointer"
                    >
                        <RxCross2 />
                    </span>
                </div>
                <nav className="mt-4 flex flex-col justify-between mb-10">
                    <ul>
                        <li className={`p-2 hover:bg-primary hover:text-white cursor-pointer ${
                    pathname === "/dashboard/myOrders" ? "bg-primary text-white" : ""
                }`}>
                            <Link href={`/dashboard/myOrders`}>My Orders</Link>
                        </li>
                    </ul>
                </nav>
                {/* <button className="btn btn-block p-2 bg-primary text-white cursor-pointer">
                    Logout
                </button> */}
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="p-4 bg-gray-100 md:hidden flex items-center">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-2xl focus:outline-none"
                    >
                        <MdMenu />
                    </button>
                    <h1 className="ml-4 text-xl font-bold">Dashboard</h1>
                </header>

                <div className="p-6 overflow-auto">{children}</div>
            </div>
        </div>
    );
}
