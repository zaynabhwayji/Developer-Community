"use client";
import { useState } from "react";
import { signinSchema } from "@/lib/signinSchema";
import Link from 'next/link';
import { redirect } from "next/navigation";

export default function SignInPage() {

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = signinSchema.safeParse(data);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message);
      return;
    }

    alert("Login successful! 🎉");
    redirect("/home");

  }


  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4 sm:px-6 lg:px-8 py-4">

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md lg:max-w-3xl 
                      max-h-[calc(100vh-2rem)]
                      p-6 sm:p-8 md:p-10 lg:p-12
                      transform hover:scale-[1.01] transition-transform duration-300">

        {/* Title */}
        <div className="text-center mb-4 lg:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                         font-bold text-gray-800 mb-2 lg:mb-3">
            Welcome Back
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
               font-semibold bg-gradient-to-r from-blue-600 to-purple-600
               bg-clip-text text-transparent
               break-words whitespace-normal
               leading-snug lg:leading-snug">
            Sign in to continue
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600
                      text-sm sm:text-base md:text-lg lg:text-xl
                      leading-relaxed max-w-2xl mx-auto px-2">
          Access your developer profile and share your knowledge with the community
        </p>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5 max-w-xl mx-auto w-full mb-6">

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
              className="w-full px-4 py-3 lg:py-4 
                         border-2 border-gray-300 rounded-xl lg:rounded-2xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                         transition-all duration-300
                         text-sm sm:text-base lg:text-lg"
              placeholder="your.email@example.com"
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
              className="w-full px-4 py-3 lg:py-4 
                         border-2 border-gray-300 rounded-xl lg:rounded-2xl
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                         transition-all duration-300
                         text-sm sm:text-base lg:text-lg"
              placeholder="••••••••"
            />
          </div>

          {/* Sign In Button */}

          <button
            type="submit"
            className=" flex items-center justify-center gap-2 w-full 
                       bg-blue-500 hover:bg-blue-600 text-white font-semibold  
                       py-3 sm:py-3.5 lg:py-4
                       px-4 lg:px-6 
                       text-sm sm:text-base lg:text-lg
                       rounded-xl lg:rounded-2xl 
                       transition-all duration-300 hover:shadow-lg 
                       hover:-translate-y-0.5 active:translate-y-0
                       mt-6"

          >

            <span className="text-lg sm:text-xl lg:text-2xl">🔐</span>
            <span>Sign In</span>
          </button>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6 lg:my-8 max-w-xl mx-auto mb-3">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="absolute bg-white px-3 lg:px-4 text-gray-500 
                         text-xs sm:text-sm lg:text-base">
            or
          </span>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Create Account
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
