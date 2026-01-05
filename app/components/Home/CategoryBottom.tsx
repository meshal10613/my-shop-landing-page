import React from "react";
import l1 from "@/app/assets/l1.png";
import l2 from "@/app/assets/l2.png";
import l3 from "@/app/assets/l3.png";
import l4 from "@/app/assets/l4.png";
import Image from "next/image";

export default function CategoryBottom() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-[#F0E8D5] flex flex-col items-center justify-center pb-2 rounded-lg    w-100 lg:min-w-80 mx-auto">
                    <Image src={l1} alt="l1" />
                    <Image src={l2} alt="l2" className="relative -top-10" />
                    <p className="text-[14px] font-semibold text-center">
                        Get the <span className="text-primary">fresh food</span>{" "}
                        out of the farm
                    </p>
                </div>
                <div className="bg-[#F0E8D5] w-100 lg:min-w-80 mx-auto p-5 space-y-3 relative rounded-lg flex flex-col">
                    <p className="text-[27px] font-semibold">
                        <span className="text-primary">Organic Fruits</span>{" "}
                        Straight From Our Garden
                    </p>
                    <button className="btn w-fit bg-[#FF8080] text-white rounded-3xl">
                        Order Now
                    </button>
                    <Image
                        src={l3}
                        alt="l3"
                        className="relative lg:-bottom-5"
                    />
                </div>
                <div className="bg-[#E7EAF3] w-100 lg:min-w-80 mx-auto p-5 space-y-3 rounded-lg relative flex flex-col justify-between">
                    <h2 className="text-[25px] font-semibold">
                        <span className="text-primary">
                            Fresh <br /> Butchered
                        </span>{" "}
                        <br />
                        Meat Direct <br /> To Your <br /> Home
                    </h2>
                    <button className="btn bg-[#5778DB] text-white rounded-3xl">
                        Order Now
                    </button>
                    <Image
                        src={l4}
                        alt="l4"
                        className="absolute right-10 top-1/4 w-40 object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
