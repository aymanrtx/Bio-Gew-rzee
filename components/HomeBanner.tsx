import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components/text";
import { banner_1 } from "@/images";

const HomeBanner = () => {
    return (
        <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-6 md:px-10 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Left Text Section */}
            <div className="space-y-5 max-w-xl">
                <Title className="text-4xl lg:text-5xl font-bold leading-tight text-shop_dark_green tracking-tight">
                    <span className="block text-shop_dark_green/90">
                        Schönheit, Authentizität, Geschmack
                    </span>
                </Title>

                <p className="text-shop_dark_green/80 text-sm lg:text-base">
                    &quot;Von Erde zu Tisch - rein und natürlich.&quot;
                </p>

                <Link
                    href={"/shop"}
                    className="bg-shop_dark_green/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
                >
                    Jetzt kaufen
                </Link>
            </div>

            {/* Right Image Section */}
            <div className="relative w-48 h-48 lg:w-60 lg:h-60">
                <Image
                    src={banner_1}
                    alt="banner_1"
                    fill
                    className="rounded-full object-cover shadow-lg filter brightness-90 contrast-90"
                />
            </div>

        </div>
    );
};

export default HomeBanner;
