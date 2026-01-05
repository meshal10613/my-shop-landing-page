import React from "react";
import AddReview from "../AddReview";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    return (
        <div>
            <div>{id}</div>
            <AddReview />
        </div>
    );
}
