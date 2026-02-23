import Link from 'next/link';
import { auth, signIn, signOut } from "@/auth"
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Welcome - Developer Community',
  description: 'A platform for developers to share programming knowledge',
};




export default async function WelcomePage() {
  const session = await auth(); 
  if (session) { redirect("/home"); }
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4 sm:px-6 lg:px-8 py-4">

      {/* Main Card*/}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md lg:max-w-2xl 
                      max-h-[calc(100vh-2rem)]
                      overflow-y-auto
                      p-6 sm:p-8 md:p-10 lg:p-12
                      transform hover:scale-[1.01] transition-transform duration-300">

        {/* Title */}
        <div className="text-center mb-3 lg:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                         font-bold text-gray-800 mb-1 lg:mb-2">
            Welcome to
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
               font-bold bg-gradient-to-r from-blue-600 to-purple-600
               bg-clip-text text-transparent
               break-words whitespace-normal
               leading-snug lg:leading-snug
               mb-2">
            Developer Community
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6 lg:mb-8 
                      text-xs sm:text-sm md:text-base lg:text-lg
                      leading-relaxed max-w-2xl mx-auto px-2">
          Share your programming knowledge, learn from others, and build your professional profile
        </p>

        {/* Buttons */}
        <div className="space-y-2 lg:space-y-3 max-w-xl mx-auto w-full">

          {/* Sign In Button */}
          <Link
            href="/signin"
            className="flex items-center justify-center gap-2 w-full 
                       bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                       py-2.5 sm:py-3 lg:py-4
                       px-4 lg:px-6 
                       text-xs sm:text-sm lg:text-base
                       rounded-xl lg:rounded-2xl 
                       transition-all duration-300 hover:shadow-lg 
                       hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="text-base sm:text-lg lg:text-xl">🔐</span>
            <span>Sign In</span>
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 w-full 
                       bg-purple-500 hover:bg-purple-600 text-white font-semibold 
                       py-2.5 sm:py-3 lg:py-4
                       px-4 lg:px-6 
                       text-xs sm:text-sm lg:text-base
                       rounded-xl lg:rounded-2xl 
                       transition-all duration-300 hover:shadow-lg 
                       hover:-translate-y-0.5 active:translate-y-0"
          >
            <span className="text-base sm:text-lg lg:text-xl">🚀</span>
            <span>Create Account</span>
          </Link>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4 lg:my-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="absolute bg-white px-3 lg:px-4 text-gray-500 
                           text-xs sm:text-sm lg:text-base">
              or
            </span>
          </div>
          {/* GitHub Button */}
          <div>
            <form action={async () => { "use server"; await signIn("github") }}>
              <button
                type="submit"
                className="flex items-center justify-center gap-2.5 w-full
             bg-gray-900 hover:bg-gray-800 text-white font-semibold
             py-3 px-5
             text-base
             rounded-xl
             transition-all duration-300 hover:shadow-lg
             hover:-translate-y-0.5 active:translate-y-0"
              >


                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
                  fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Sign In with GitHub</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-400 
                      text-xs sm:text-sm lg:text-base 
                      mt-6 lg:mt-8">
          Join <span className="font-semibold text-blue-500">500+</span> developers sharing their knowledge daily
        </p>
      </div>
    </div>
  );
}
