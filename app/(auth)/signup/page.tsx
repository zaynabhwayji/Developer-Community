"use client";
import { useState } from "react";
import React from 'react'
import { signupSchema } from "@/lib/signupSchema";
import Link from 'next/link';
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    setError("");
    setMessage("");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const result = signupSchema.safeParse(data);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });
    if (res.ok) {
      setMessage("Created successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      redirect("/signin");
    }
    else {
      setMessage("Failed to create account");
    }
  }



  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4 sm:px-6 lg:px-8 py-4">

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md lg:max-w-2xl 
                      max-h-[calc(100vh-1rem)]
                      p-6 sm:p-8 md:p-10 lg:p-12
                      transform hover:scale-[1.01] transition-transform duration-300">

        {/* Title */}
        <div className="text-center mb-4 lg:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                         font-bold text-gray-800 mb-2 lg:mb-3">
            Join Us Today
          </h1>
<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
               font-semibold bg-gradient-to-r from-blue-600 to-purple-600
               bg-clip-text text-transparent
               break-words whitespace-normal leading-tight">
  Create your account
</h2>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6 lg:mb-8 
                      text-sm sm:text-base md:text-lg lg:text-xl
                      leading-relaxed max-w-2xl mx-auto px-2">
          Start sharing your programming knowledge and connect with developers worldwide
        </p>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4 max-w-xl mx-auto w-full mb-5">

          {/* Full Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2.5 lg:py-3.5 
                         border-2 border-gray-300 rounded-xl lg:rounded-2xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                         transition-all duration-300
                         text-sm sm:text-base lg:text-lg"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm lg:text-base font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2.5 lg:py-3.5 
                         border-2 border-gray-300 rounded-xl lg:rounded-2xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                         transition-all duration-300
                         text-sm sm:text-base lg:text-lg"
              placeholder="your.email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm lg:text-base font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2.5 lg:py-3.5 
                         border-2 border-gray-300 rounded-xl lg:rounded-2xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                         transition-all duration-300
                         text-sm sm:text-base lg:text-lg"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Input */}
          <div className='mb-3'>
            <label htmlFor="confirmPassword" className="block text-sm lg:text-base font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-4 py-2.5 lg:py-3.5 
                         border-2 border-gray-300 rounded-xl lg:rounded-2xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                         transition-all duration-300
                         text-sm sm:text-base lg:text-lg"
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Create Account Button */}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full 
                       bg-purple-500 hover:bg-purple-600 text-white font-semibold 
                       py-3 sm:py-3.5 lg:py-4
                       px-4 lg:px-6 
                       text-sm sm:text-base lg:text-lg
                       rounded-xl lg:rounded-2xl 
                       transition-all duration-300 hover:shadow-lg 
                       hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="text-lg sm:text-xl lg:text-2xl">🚀</span>
            <span>Create Account</span>
          </button>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5 lg:my-6 max-w-xl mx-auto">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="absolute bg-white px-3 lg:px-4 text-gray-500 
                         text-xs sm:text-sm lg:text-base">
            or
          </span>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Back to Home */}
        <p className="text-center text-gray-400 text-xs sm:text-sm lg:text-base mt-4">
          <Link
            href="/"
            className="hover:text-gray-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
