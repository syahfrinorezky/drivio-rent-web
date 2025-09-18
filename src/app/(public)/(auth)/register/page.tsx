"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  HiEnvelope,
  HiKey,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchemaForm = z
  .object({
    email: z.string().email("Email must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterInput = z.infer<typeof registerSchemaForm>;

export default function Register() {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchemaForm),
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 400 && result.message) {
          setError("email", {
            message: result.message,
          });
          return;
        }
      }

      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const rules = [
    {
      label: "At least 8 characters",
      valid: password?.length >= 8,
    },
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password || ""),
    },
    {
      label: "At least one number (0-9)",
      valid: /[0-9]/.test(password || ""),
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen font-poppins">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-4/5"
      >
        <Card className="md:hidden">
          <CardHeader>
            <CardTitle className="text-center text-lg font-montserrat font-bold">
              REGISTER
            </CardTitle>
            <CardDescription className="text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="/api/register"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3"
            >
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="email" className="flex gap-x-2">
                  <HiEnvelope className="h-5 w-5" />
                  <span className="text-base text-neutral-700">Email</span>
                </Label>
                <Input
                  {...register("email")}
                  placeholder="Input your email"
                  className={
                    (clsx("border border-neutral-300 rounded-md p-2 text-sm"),
                    errors.email && "!border-red-500")
                  }
                />
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-red-500 text-xs"
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </div>
              <div className="flex flex-col gap-y-1">
                <Label htmlFor="password" className="flex gap-x-2">
                  <HiKey className="h-5 w-5" />
                  <span className="text-base text-neutral-700">Password</span>
                </Label>
                <div className="flex space-x-2">
                  <Input
                    {...register("password")}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={
                      (clsx("border border-neutral-300 rounded-md p-2 text-sm"),
                      errors.password && "!border-red-500")
                    }
                  />

                  <Button
                    type="button"
                    variant="default"
                    className="flex-shrink-0"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <HiEye className="h-5 w-5" />
                    ) : (
                      <HiEyeSlash className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  {rules.map((rule, index) => {
                    const isTouched = !!password;
                    const colorClass = rule.valid
                      ? "text-green-500"
                      : isTouched
                      ? "text-red-500"
                      : "text-neutral-400";
                    const dotClass = rule.valid
                      ? "bg-green-500"
                      : isTouched
                      ? "bg-red-500"
                      : "bg-neutral-400";
                    return (
                      <li
                        key={index}
                        className={clsx(
                          "flex items-center transition-colors duration-300",
                          colorClass
                        )}
                      >
                        <span
                          className={clsx(
                            "mr-2 h-3 w-3 flex-shrink-0 rounded-full transition-colors duration-300",
                            dotClass
                          )}
                        ></span>
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col gap-y-1">
                <Label htmlFor="confirmPassword" className="flex gap-x-2">
                  <HiLockClosed className="h-5 w-5" />
                  <span className="text-base text-neutral-700">
                    Confirm Password
                  </span>
                </Label>
                <div className="flex space-x-2">
                  <Input
                    {...register("confirmPassword")}
                    type={isShowConfirmPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={
                      (clsx("border border-neutral-300 rounded-md p-2 text-sm"),
                      errors.confirmPassword && "!border-red-500")
                    }
                  />
                  <Button
                    type="button"
                    variant="default"
                    className="flex-shrink-0"
                    onClick={() =>
                      setIsShowConfirmPassword(!isShowConfirmPassword)
                    }
                  >
                    {isShowConfirmPassword ? (
                      <HiEye className="h-5 w-5" />
                    ) : (
                      <HiEyeSlash className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-red-500 text-xs"
                    >
                      {errors.confirmPassword.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={
                isLoading ||
                !watch("email") ||
                !watch("password") ||
                !watch("confirmPassword")
              }
              onClick={handleSubmit(onSubmit)}
              className="w-full h-11"
            >
              {isLoading ? (
                <FaSpinner className="m-auto h-5 w-5 animate-spin" />
              ) : (
                "REGISTER"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
