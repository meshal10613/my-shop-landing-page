import React from "react";

export default function ProductDescription() {
    return (
        <div className="container mx-auto mt-12">
            <div className="tabs tabs-lift">
                <input
                    type="radio"
                    name="my_tabs_3"
                    className="tab"
                    aria-label="Description"
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    Tab content 1
                </div>

                <input
                    type="radio"
                    name="my_tabs_3"
                    className="tab"
                    aria-label="Additional Information"
                    defaultChecked
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    Tab content 2
                </div>

                <input
                    type="radio"
                    name="my_tabs_3"
                    className="tab"
                    aria-label={`Reviews (${9})`}
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    Tab content 3
                </div>
            </div>
        </div>
    );
}
