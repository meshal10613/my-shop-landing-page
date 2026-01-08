import React from "react";
import AddReview from "../AddReview";
import ProductDescription from "../ProductDescription";
import ProductDetails from "../ProductDetails";
import { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    const res = await fetch(
        `https://ecommerce-saas-server-wine.vercel.app/api/v1/product/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "store-id": "0000121",
            },
            cache: "no-store",
        }
    );

    const data = await res.json();
    const product = data.data;

    return {
        title: `${product.name} | My Shop`,
        description: `Check out ${product.name} at My Shop.`,
    };
}

export default async function page({ params }: Props) {
    const { id } = await params;

    return (
        <div className="container mx-auto">
            <ProductDetails id={id} />
            <ProductDescription />
            <AddReview id={id} />
        </div>
    );
}
