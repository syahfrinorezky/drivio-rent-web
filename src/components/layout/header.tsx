"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { NAVIGATION_PUBLIC } from "@/constants/navigation";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 w-full bg-white dark:bg-neutral-900 shadow-md z-40 "
        )}
      >
        <div className="container mx-auto px-4 py-3 md:p-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-x-2">
            <Image
              src="/logo/dark.svg"
              alt="Drivio"
              width={100}
              height={100}
              className="w-15 block dark:hidden"
            />
            <Image
              src="/logo/white.svg"
              alt="Drivio"
              width={100}
              height={100}
              className="w-15 hidden dark:block"
            />
            <h1 className="text-black dark:text-white font-bold text-2xl font-poppins hidden lg:block">
              Drivio
            </h1>
          </Link>

          <button className="sm:hidden" onClick={() => setIsMenuOpen(true)}>
            <HiBars3BottomRight className="text-white w-8 h-8" />
          </button>
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
          >
            <motion.div
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ x: 200 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 bg-white dark:bg-neutral-800 h-full w-3/4 p-6 z-50"
            >
              <div className="w-full flex flex-col">
                <div className="flex justify-between mb-4">
                  <ThemeToggle />
                  <button onClick={() => setIsMenuOpen(false)}>
                    <HiXMark className="text-black dark:text-white w-8 h-8" />
                  </button>
                </div>

                <div className="flex flex-col mt-8">
                  {NAVIGATION_PUBLIC.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        "text-black dark:text-white text-lg font-medium px-4 py-5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors duration-300 ease-in-out",
                        pathname === item.href &&
                          "bg-neutral-200 dark:bg-neutral-900"
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
