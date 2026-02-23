import Link from "next/link";
import { auth } from "@/auth";
import User from "@/models/User";
import Connection from "@/lib/mongodb";

const Navbar = async () => {
  const session = await auth(); 

  let user = null;

  if (session?.user?.id) {
    await Connection();
    user = await User.findById(session.user.id);
  }

  return (
    <nav className="navbar">
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                         font-semibold bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent">DevCommunity</div>

 {/* Links */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">

        <Link
          href="/home"
          className="hover:text-blue-700 transition-colors duration-200"
        >
          Home
        </Link>

        <Link
          href="/users"
          className="hover:text-blue-700 transition-colors duration-200"
        >
          Users
        </Link>

        {session ? (
          <>
            <Link
              href={`/profile/${user?._id}`}
              className="hover:text-blue-700 transition-colors duration-200"
            >
              Profile
            </Link>

            <Link
              href="/posts/create"
              className="hover:text-blue-700 transition-colors duration-200"
            >
              Create Post
            </Link>

            <Link
              href="/api/auth/signout"
              className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:shadow-md"
            >
              Logout
            </Link>
          </>
        ) : (
          <Link
            href="/signin"
            className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    
    </nav>
  );
};

export default Navbar;