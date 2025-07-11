"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import logo from "@/public/assets/social.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import z from "zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoute";

const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min("3", "Password field id required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-sky-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Logo Section */}
          <div className="flex justify-center mb-4">
            <div className="relative w-[110px] h-[110px] rounded-full bg-gradient-to-br from-indigo-200 via-white to-sky-200 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={logo.src}
                  width={64}
                  height={64}
                  alt="logo"
                  className="drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Header Text */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">
              Login to your account below
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginSubmit)}
              className="space-y-6"
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                        className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={isTypePassword ? "password" : "text"}
                        placeholder="********"
                        {...field}
                        className="rounded-lg px-4 py-2 border focus:ring-2 focus:ring-indigo-300 focus:outline-none transition w-full"
                      />
                    </FormControl>
                    <button
                      className="absolute top-1/2 right-2 cursor-pointer"
                      type="button"
                      onClick={() => setIsTypePassword(!isTypePassword)}
                    >
                      {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="text-right text-sm text-indigo-600 hover:underline">
                <a href="/forgot-password">Forgot password?</a>
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Login"
                  className="w-full rounded-lg cursor-pointer"
                />
              </div>
            </form>
          </Form>

          {/* Signup Link */}
          <div className="mt-2 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href={WEBSITE_REGISTER}
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loginpage;
