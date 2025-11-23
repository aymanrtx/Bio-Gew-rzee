import React from "react";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Kostenlose Lieferung",
    description: "Kostenloser Versand ab 49,99 $",
    icon: <Truck size={45} />,
  },
  {
    title: "Kostenlose Rückgabe",
    description: "Kostenloser Versand ab 49,99 $",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Kundensupport",
    description: "Freundlicher 24/7 Kundensupport",
    icon: <Headset size={45} />,
  },
  {
    title: "Geld-zurück-Garantie",
    description: "Qualitätsprüfung durch unser Team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ShopByBrands;
