import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import FooterTop from "./FooterTop";
import { SubText, SubTitle } from "./text";
import { quickLinksData } from "@/constants/data";
import Link from "next/link";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <Container>
        <FooterTop />
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {/* 1. Logo + Description + Social */}
          <div className="space-y-4 max-w-xs">
            <Logo className="font-bold text-xl text-shop_light_green" />
            <SubText className="text-gray-700">
              Tradition trifft Natur – entdecke die Schätze Marokkos bei Bio Gewürze.
            </SubText>
            <div className="flex space-x-4 mt-2">
              <SocialMedia
                className="text-gray-600"
                iconClassName="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-shop_light_green hover:text-shop_light_green transition-colors duration-200"
                tooltipClassName="bg-gray-800 text-white"
              />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <SubTitle className="text-gray-900 font-semibold mb-4">Quick Links</SubTitle>
            <ul className="space-y-2 text-gray-700 text-sm">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green transition-colors duration-200 font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Categories */}
          <div>
            <SubTitle className="text-gray-900 font-semibold mb-4">Warum BIO-GEWÜRZE?</SubTitle>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>100% natürliche Produkte</li>
              <li>Nachhaltig & fair gehandelt</li>
              <li>Mit Liebe in Marokko handgefertigt</li>
              <li>Schneller & zuverlässiger Versand in ganz Europa</li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-shop_light_green">BIO-GEWÜRZE</span>. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;   