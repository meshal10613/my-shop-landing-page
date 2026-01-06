"use client";

import React, { useState } from "react";

export default function AddReview({ id }: { id: string }) {
    const [rating, setRating] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
		const reviewData = {
			id,
			...data,
		};
		console.log(reviewData)
    };
    return (
        <div className="space-y-5 w-full mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mx-5">
                Add a review
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:max-w-[60%] gap-5 mx-5"
            >
                <div className="flex items-center gap-2">
                    <label className="text-base md:text-xl font-semibold">
                        Your Rating
                    </label>
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
                                required
                                checked={rating === value}
								value={value}
                                onChange={() => setRating(value)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-base md:text-xl font-semibold">
                        Your Review *
                    </label>
                    <textarea
                        name="review"
                        id=""
                        className="textarea border-2 border-gray-200 focus:outline-none w-full"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label className="text-base md:text-xl font-semibold">
                        Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-lg border-2 border-gray-200 focus:outline-none w-full"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-base md:text-xl font-semibold">
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="input border-2 border-gray-200 focus:outline-none w-full"
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="saveData"
                        className="checkbox checkbox-xs rounded-md"
                    />
                    <span>
                        Save my name, email, and website in this browser for the
                        next time I comment.
                    </span>
                </div>
                <button
                    type="submit"
                    className="btn w-fit btn-lg btn-primary text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
