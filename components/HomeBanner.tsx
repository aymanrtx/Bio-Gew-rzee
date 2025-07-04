import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components/text";
import { banner_1 } from "@/images";

const HomeBanner = () => {
    return (
        <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-6 md:px-10 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 max-w-xl">
                <Title className="text-4xl lg:text-5xl font-bold leading-tight text-shop_dark_green tracking-tight">
  <span className="block text-shop_dark_green/90">Marokkos Schätze</span>
  <span className="block text-shop_dark_green text-opacity-80 italic text-3xl lg:text-4xl mt-1">
    Gewürze aus der Natur
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
            <div>
                <Image
                    src={banner_1}
                     alt="banner_1"
  className="hidden md:inline-flex w-48 lg:w-64 rounded-full object-cover shadow-lg"
  />
            </div>
        </div>
    );
};

export default HomeBanner;
