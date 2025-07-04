"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Kein Produkt verfügbar
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        Es tut uns leid, aber es gibt derzeit keine Produkte, die auf{" "}
        <span className="text-base font-semibold text-darkColor">
          {selectedTab}
        </span>{" "}
        zutreffen.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="flex items-center space-x-2 text-shop_dark_green"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Wir füllen bald wieder auf</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500"
      >
        Bitte schauen Sie später wieder vorbei oder entdecken Sie unsere anderen Produktkategorien.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
