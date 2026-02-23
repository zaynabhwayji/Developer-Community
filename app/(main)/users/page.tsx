import Link from "next/link";
export const metadata = {
    title: 'Users - Developer Community',
    description: 'Discover all community member',
};

interface User {
  name: string;
  username: string;
  bio: string;
   avatar?: string;
}

const UsersPage = async () => {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load users");
  }
  
  const users: User[] = await res.json();

  return (
<main className="max-w-6xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6 text-gray-900">
    DevCommunity Users
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.map((user) => (
      <Link
        key={user.username}
        href={`/users/${user.username}`}
        className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <img
          src={user.avatar || "/avatar.png"}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border"
        />

        <div>
          <h2 className="font-semibold text-gray-900">
            {user.name}
          </h2>
          <p className="text-gray-500 text-sm">
            @{user.username}
          </p>
          {user.bio && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>
      </Link>
    ))}
  </div>
</main>
  );
};

export default UsersPage;

