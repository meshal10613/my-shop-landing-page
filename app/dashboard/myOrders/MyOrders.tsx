"use client";

import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export interface ShippingAddress {
    address: string;
    email: string;
    firstName: string;
    phone: string;
    note: string;
}

export interface OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    originalProductPrice: number;
    imageURL: string;
    variant: string;
    category: string;
}

export interface Order {
    _id: string;
    invoiceNumber: string;
    fullName: string;
    mobileNumber: string;
    shippingAddress: ShippingAddress;
    date: string;
    totalAmount: number;
    courierName: string;
    status: string;
    orderItem: OrderItem[];
}

const MyOrders = () => {
    // const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        fetch(
            "https://ecommerce-saas-server-wine.vercel.app/api/v1/order/user",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setOrders(data.data.data))
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, [token]);
    console.log(orders);
    return (
        <div className="overflow-x-auto w-full">
            <table className="table-auto min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Date
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Customer
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Amount
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Courier
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Status
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            View
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-700">
                                {new Date(order.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                <div>{order.fullName}</div>
                                <div className="text-gray-500">
                                    {order.mobileNumber}
                                </div>
                                <div className="text-gray-500">
                                    {order.shippingAddress.address}
                                </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                ${order.totalAmount}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                {order.courierName}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                {order.status}
                            </td>
                            <td className="px-4 py-2 text-sm text-blue-500">
                                <button
                                    // href={`/dashboard/orders/${order._id}`}
                                    className="hover:underline"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
