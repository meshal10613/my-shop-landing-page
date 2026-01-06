import React from "react";
import AddReview from "../AddReview";
import ProductDescription from "../ProductDescription";
import ProductDetails from "../ProductDetails";


interface Props {
    params: Promise<{ id: string }>;
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
