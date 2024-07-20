"use client";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";

const Header = () => {
  const [menu, setMenu] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("click", () => {
      setMenu(false);
    });
  }, []);
  return (
    <div className="flex h-[100px] min-w-full flex-col justify-center gap-3 px-6 py-3">
      <div className="self-right ml-auto hidden gap-6 text-xs sm:flex">
        <span>Help</span>
        <span>Orders & Returns</span>
        <span>Hi,john</span>
      </div>
      <div className="flex justify-between">
        <Link href="/categories" className="font-semibold md:text-2xl">
          ECOMMERCE
        </Link>
        <div className="hidden gap-4 self-end text-sm md:flex">
          <Link href="/categories">Categories</Link>
          <Link href="#">Sale</Link>
          <Link href="#">Clearance</Link>
          <Link href="#">New stock</Link>
          <Link href="#">Trending</Link>
        </div>
        <div className="hidden gap-4 self-end md:flex">
          <IoSearchOutline />
          <CiShoppingCart />
        </div>
        <div className="cursor-pointer self-center md:hidden">
          <RxHamburgerMenu
            onClick={(e) => {
              e.stopPropagation();
              setMenu((prev) => !prev);
            }}
          />
          {menu && (
            <div className="absolute left-0 top-[136px] flex h-[calc(100vh-136px)] w-full flex-col items-center justify-center bg-gray-100">
              <Link
                className="flex h-10 w-full items-center justify-center transition-all hover:bg-gray-200 active:scale-95"
                href="/categories"
              >
                Categories
              </Link>
              <Link
                className="flex h-10 w-full items-center justify-center transition-all hover:bg-gray-200 active:scale-95"
                href="#"
              >
                Sale
              </Link>
              <Link
                className="flex h-10 w-full items-center justify-center transition-all hover:bg-gray-200 active:scale-95"
                href="#"
              >
                Clearance
              </Link>
              <Link
                className="flex h-10 w-full items-center justify-center transition-all hover:bg-gray-200 active:scale-95"
                href="#"
              >
                New stock
              </Link>
              <Link
                className="flex h-10 w-full items-center justify-center transition-all hover:bg-gray-200 active:scale-95"
                href="#"
              >
                Trending
              </Link>
              <IoSearchOutline className="flex h-8 w-full items-center justify-center py-1.5 text-xs transition-all hover:bg-gray-200 active:scale-95" />
              <CiShoppingCart className="flex h-8 w-full items-center justify-center py-1.5 transition-all hover:bg-gray-200 active:scale-95" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
