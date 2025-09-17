"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { NAVIGATION_PUBLIC } from "@/constants/navigation";
import { usePathname } from "next/navigation";

import useIsScrolled from "@/hooks/isScrolled";
import { Button } from "@/components/ui/button";

function Header() {
  const pathname = usePathname();
  const isScrolled = useIsScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={clsx("fixed top-0 w-full bg-white shadow-lg z-40", {
          "bg-white/40 backdrop-blur": isScrolled,
        })}
      >
        <div className="px-4 py-3 md:container md:mx-auto md:max-w-[1200px] flex justify-between items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/logo/dark.svg"
              alt="Drivio"
              width={100}
              height={100}
              className="w-15 block"
            />
            <h1 className="text-black font-bold text-2xl font-poppins hidden lg:block">
              Drivio
            </h1>
          </Link>

          <button className="sm:hidden" onClick={() => setIsMenuOpen(true)}>
            <HiBars3BottomRight className="text-black w-8 h-8" />
          </button>

          <div className="hidden md:flex gap-x-3">
            {NAVIGATION_PUBLIC.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "text-black font-medium px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors duration-300 ease-in-out",
                  pathname === item.href &&
                    (isScrolled ? "bg-neutral-200/80" : "bg-neutral-200")
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href={"/register"}>
              <Button variant="default" className="cursor-pointer">
                LOGIN
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 font-poppins md:hidden"
          >
            <motion.div
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 bg-white h-full w-3/4 p-6 z-50"
            >
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-end mb-4 w-full">
                  <button onClick={() => setIsMenuOpen(false)}>
                    <HiXMark className="text-black w-8 h-8" />
                  </button>
                </div>
                <div className="flex flex-col mt-8">
                  {NAVIGATION_PUBLIC.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        "text-black font-medium px-4 py-5 rounded-md hover:bg-neutral-200 transition-colors duration-300 ease-in-out",
                        pathname === item.href && "bg-neutral-200"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-x-4">
                        {(pathname === item.href
                          ? item.iconActive
                          : item.icon)?.({ className: "w-6 h-6" })}
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-auto w-full flex flex-col gap-y-3 items-end">
                  <Link href={"/register"} className="w-full">
                    <Button variant="default" className="w-full h-12 text-base">
                      Register
                    </Button>
                  </Link>
                  <Link href={"/login"} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base border border-accent-foreground"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
